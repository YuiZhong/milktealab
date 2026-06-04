#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");

const SOURCE_FILES = [
  { file: "data/ingredients.js", sourceKind: "runtime data" },
  { file: "data/accidentRules.js", sourceKind: "runtime data" },
  { file: "data/structureAccidentRules.js", sourceKind: "runtime data" },
  { file: "data/drinkTypeRules.js", sourceKind: "runtime data" },
  { file: "data/feedbackTexts.js", sourceKind: "runtime data" },
  { file: "data/generated/feedbackTexts.generated.json", sourceKind: "generated data" },
  { file: "data/goldenSamples.js", sourceKind: "golden samples" },
  { file: "core/summaryCandidateEngine.js", sourceKind: "summary candidate" },
  { file: "core/candidatePriorityShellEngine.js", sourceKind: "priority shell" },
  { file: "content_sheets/examples/candidate_severity_rules.sample.csv", sourceKind: "sample sheet draft" },
  { file: "content_sheets/examples/candidate_severity_rules.sample.json", sourceKind: "sample sheet draft" },
  { file: "content_sheets/examples/feedback_texts.sample.csv", sourceKind: "content sheet sample" },
  { file: "content_sheets/examples/feedback_texts.sample.json", sourceKind: "content sheet sample" }
];

const SUGGESTED_STATUSES = new Set([
  "observed_runtime_source",
  "registry_candidate_requires_review",
  "candidate_only",
  "risk_tag_only",
  "sample_only",
  "draft_only",
  "generated_only",
  "migration_candidate",
  "needs_note",
  "needs_review"
]);

const HIGH_RISK_CANDIDATE_TAGS = new Set([
  "aroma_pressure",
  "identity_conflict",
  "low_beverage_fit",
  "savory_identity",
  "texture_sediment",
  "novelty"
]);

const MIGRATION_CANDIDATES = new Set([
  "dairy_fat_overload",
  "flavor_durian_overload",
  "industrial_creamer_overload",
  "texture_taro_overload",
  "texture_oreo_overload",
  "texture_topping_overload",
  "taste_strong_flavor_overload",
  "texture_straw_resistance"
]);

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const outFile = outIndex === -1 ? null : args[outIndex + 1];

if (outIndex !== -1 && !outFile) {
  fail("Missing output path after --out.");
}

function fail(message) {
  console.error(`collectStableIdSources: ${message}`);
  process.exit(1);
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function readText(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function parseCsv(text) {
  const body = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    const next = body[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0];
  return rows
    .slice(1)
    .filter(rawRow => rawRow.some(value => value !== ""))
    .map(rawRow => Object.fromEntries(headers.map((header, index) => [header, rawRow[index] || ""])));
}

function parseCsvFile(file) {
  return parseCsv(readText(file));
}

function collectPropertyStrings(text, propertyName) {
  const matches = [];
  const pattern = new RegExp(`\\b${propertyName}\\s*:\\s*"([^"]+)"`, "g");
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function collectArrayStringsByProperty(text, propertyName) {
  const matches = [];
  const pattern = new RegExp(`\\b${propertyName}\\s*:\\s*\\[([^\\]]*)\\]`, "g");
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push(...collectQuotedStrings(match[1]));
  }
  return matches;
}

function collectQuotedStrings(text) {
  const matches = [];
  const pattern = /"([^"]+)"/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function collectObjectKeys(text, objectName) {
  const start = text.indexOf(`const ${objectName} = {`);
  if (start === -1) return [];

  let cursor = text.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (; cursor < text.length; cursor += 1) {
    const char = text[cursor];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end = cursor;
        break;
      }
    }
  }
  if (end === -1) return [];

  const body = text.slice(start, end + 1);
  const keys = [];
  const keyPattern = /^\s*([A-Za-z0-9_]+)\s*:/gm;
  let match;
  while ((match = keyPattern.exec(body)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

function addObservation(observedSources, observation) {
  if (!observation.observedValue) return;
  if (!SUGGESTED_STATUSES.has(observation.suggestedStatus)) {
    fail(`Unexpected suggestedStatus "${observation.suggestedStatus}" for ${observation.observedValue}.`);
  }

  const normalized = {
    observedValue: observation.observedValue,
    observedLayer: observation.observedLayer,
    sourceFile: observation.sourceFile,
    sourceKind: observation.sourceKind,
    observedUsage: observation.observedUsage,
    suggestedStatus: observation.suggestedStatus,
    requiresReview: Boolean(observation.requiresReview),
    notes: observation.notes || ""
  };
  const key = [
    normalized.observedValue,
    normalized.observedLayer,
    normalized.sourceFile,
    normalized.sourceKind,
    normalized.observedUsage,
    normalized.suggestedStatus
  ].join("\u0000");
  observedSources.set(key, normalized);
}

function addRowsFromFields(observedSources, rows, sourceFile, sourceKind, fieldMap, statusResolver) {
  rows.forEach(row => {
    Object.entries(fieldMap).forEach(([field, observedLayer]) => {
      const value = normalizeCell(row[field]);
      if (!value) return;
      const resolved = statusResolver({ field, observedLayer, value, row });
      addObservation(observedSources, {
        observedValue: value,
        observedLayer,
        sourceFile,
        sourceKind,
        observedUsage: field,
        suggestedStatus: resolved.suggestedStatus,
        requiresReview: resolved.requiresReview,
        notes: resolved.notes
      });
    });
  });
}

function normalizeCell(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function addPropertyObservations(observedSources, text, sourceFile, sourceKind, propertyName, observedLayer, suggestedStatus, notes = "", requiresReview = false) {
  collectPropertyStrings(text, propertyName).forEach(value => {
    addObservation(observedSources, {
      observedValue: value,
      observedLayer,
      sourceFile,
      sourceKind,
      observedUsage: propertyName,
      suggestedStatus,
      requiresReview,
      notes
    });
  });
}

function addArrayPropertyObservations(observedSources, text, sourceFile, sourceKind, propertyName, observedLayer, suggestedStatus, notes = "", requiresReview = false) {
  collectArrayStringsByProperty(text, propertyName).forEach(value => {
    addObservation(observedSources, {
      observedValue: value,
      observedLayer,
      sourceFile,
      sourceKind,
      observedUsage: `${propertyName}[]`,
      suggestedStatus,
      requiresReview,
      notes
    });
  });
}

function runtimeIdStatus(value) {
  if (MIGRATION_CANDIDATES.has(value)) {
    return {
      suggestedStatus: "migration_candidate",
      requiresReview: true,
      notes: "Observed in current runtime/golden sources, but naming may need future review before wider severity takeover."
    };
  }
  return {
    suggestedStatus: "observed_runtime_source",
    requiresReview: false,
    notes: "Observed in current runtime-like source; this is evidence, not a final registry entry."
  };
}

function draftStatus(value, field) {
  if (!value) {
    return { suggestedStatus: "draft_only", requiresReview: false, notes: "" };
  }
  if (field === "feedbackTag") {
    return {
      suggestedStatus: "draft_only",
      requiresReview: true,
      notes: "Sample sheet draft field; must be reviewed before use by any registry or validator."
    };
  }
  return {
    suggestedStatus: "draft_only",
    requiresReview: field !== "ruleId",
    notes: "Observed in disabled sample sheet draft; not a registry source."
  };
}

function collectIngredientSources(observedSources) {
  const file = "data/ingredients.js";
  const text = readText(file);
  collectPropertyStrings(text, "id")
    .filter(value => /^(tea|dairy|liquid|fruit|flavor|sweetener|seasoning|topping)_/.test(value))
    .forEach(value => {
      addObservation(observedSources, {
        observedValue: value,
        observedLayer: "ingredientId",
        sourceFile: file,
        sourceKind: "runtime data",
        observedUsage: "ingredientMeta.id",
        suggestedStatus: "observed_runtime_source",
        requiresReview: false,
        notes: "Observed in ingredient metadata."
      });
    });
}

function collectAccidentRuleSources(observedSources) {
  const file = "data/accidentRules.js";
  const text = readText(file);
  addPropertyObservations(observedSources, text, file, "runtime data", "ingredientId", "ingredientId", "observed_runtime_source", "Observed rule ingredient reference.");
  collectPropertyStrings(text, "accidentTypeId").forEach(value => {
    const status = runtimeIdStatus(value);
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: "accidentTypeId",
      sourceFile: file,
      sourceKind: "runtime data",
      observedUsage: "accidentTypeId",
      ...status
    });
  });
  addArrayPropertyObservations(observedSources, text, file, "runtime data", "tags", "candidateTag", "risk_tag_only", "Rule tags are observed rule/candidate signals, not automatically runtime feedbackTag.", true);
}

function collectStructureAccidentSources(observedSources) {
  const file = "data/structureAccidentRules.js";
  const text = readText(file);
  collectPropertyStrings(text, "accidentTypeId").forEach(value => {
    const status = runtimeIdStatus(value);
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: "accidentTypeId",
      sourceFile: file,
      sourceKind: "runtime data",
      observedUsage: "accidentTypeId",
      ...status
    });
  });
  ["requiredTags", "tags"].forEach(propertyName => {
    addArrayPropertyObservations(observedSources, text, file, "runtime data", propertyName, "profileTag", "needs_review", "Structure tags are observed source tags and must stay separated from feedbackTag.", true);
  });
}

function collectDrinkTypeSources(observedSources) {
  const file = "data/drinkTypeRules.js";
  const text = readText(file);
  addPropertyObservations(observedSources, text, file, "runtime data", "ingredientId", "ingredientId", "observed_runtime_source", "Observed drink type ingredient reference.");
  addArrayPropertyObservations(observedSources, text, file, "runtime data", "anyIngredientIds", "ingredientId", "observed_runtime_source", "Observed drink type ingredient reference.");
  addArrayPropertyObservations(observedSources, text, file, "runtime data", "allIngredientIds", "ingredientId", "observed_runtime_source", "Observed drink type ingredient reference.");
  addPropertyObservations(observedSources, text, file, "runtime data", "drinkTypeId", "drinkTypeId", "observed_runtime_source", "Observed drink type rule identity.");
  addPropertyObservations(observedSources, text, file, "runtime data", "defaultTypeId", "drinkTypeId", "observed_runtime_source", "Observed default drink type identity.");
}

function collectFeedbackTextSources(observedSources) {
  const file = "data/feedbackTexts.js";
  const text = readText(file);
  collectObjectKeys(text, "feedbackTagPools").forEach(value => {
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: "feedbackTag",
      sourceFile: file,
      sourceKind: "runtime data",
      observedUsage: "feedbackTagPools key",
      suggestedStatus: "observed_runtime_source",
      requiresReview: false,
      notes: "Observed in current runtime feedback tag pool mapping."
    });
  });
}

function collectGeneratedFeedbackSources(observedSources) {
  const file = "data/generated/feedbackTexts.generated.json";
  const data = readJson(file);
  Object.values(data.textsById || {}).forEach(row => {
    [
      ["textId", "textId"],
      ["feedbackTag", "feedbackTag"],
      ["accidentTypeId", "accidentTypeId"],
      ["drinkTypeId", "drinkTypeId"],
      ["outcomeTypeId", "outcomeTypeId"]
    ].forEach(([field, observedLayer]) => {
      const value = normalizeCell(row[field]);
      if (!value) return;
      addObservation(observedSources, {
        observedValue: value,
        observedLayer,
        sourceFile: file,
        sourceKind: "generated data",
        observedUsage: `textsById.${field}`,
        suggestedStatus: "generated_only",
        requiresReview: field !== "textId",
        notes: "Observed in generated feedback data; generated observation is not a registry decision."
      });
    });
  });
}

function collectGoldenSources(observedSources) {
  const file = "data/goldenSamples.js";
  const text = readText(file);
  collectPropertyStrings(text, "id").forEach(value => {
    if (!/^[a-z0-9_]+$/.test(value)) return;
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: "sampleId",
      sourceFile: file,
      sourceKind: "golden samples",
      observedUsage: "sample id",
      suggestedStatus: "sample_only",
      requiresReview: false,
      notes: "Golden sample identity; must not enter mechanism rule keys."
    });
  });
  addArrayPropertyObservations(observedSources, text, file, "golden samples", "drinkTypeIdIncludes", "drinkTypeId", "registry_candidate_requires_review", "Observed golden expected value; candidate evidence only.");
  addArrayPropertyObservations(observedSources, text, file, "golden samples", "accidentTypeIdIncludes", "accidentTypeId", "registry_candidate_requires_review", "Observed golden expected value; candidate evidence only.");
  addArrayPropertyObservations(observedSources, text, file, "golden samples", "outcomeTypeIdIncludes", "outcomeTypeId", "registry_candidate_requires_review", "Observed golden expected value; candidate evidence only.");
  addArrayPropertyObservations(observedSources, text, file, "golden samples", "feedbackTagIncludes", "feedbackTag", "registry_candidate_requires_review", "Observed golden expected value; candidate evidence only.");
  addArrayPropertyObservations(observedSources, text, file, "golden samples", "priorityBandIncludes", "priorityBand", "registry_candidate_requires_review", "Observed golden expected value; candidate evidence only.");
}

function collectSummaryCandidateSources(observedSources) {
  const file = "core/summaryCandidateEngine.js";
  const text = readText(file);
  addPropertyObservations(observedSources, text, file, "summary candidate", "candidateId", "candidateId", "candidate_only", "Candidate layer identity, not final result identity.", true);
  addPropertyObservations(observedSources, text, file, "summary candidate", "candidateType", "candidateType", "candidate_only", "Candidate type enum-like value.", true);
  addPropertyObservations(observedSources, text, file, "summary candidate", "sourceLayer", "sourceLayer", "registry_candidate_requires_review", "Observed source layer value from candidate schema.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "sourceSummary", "sourceSummary", "registry_candidate_requires_review", "Observed source summary value from candidate schema.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "triggerMetric", "triggerMetric", "registry_candidate_requires_review", "Observed trigger metric from candidate schema; must be checked against sourceSummary.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "priorityBand", "priorityBand", "registry_candidate_requires_review", "Observed candidate priority band.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "severityHint", "severityHint", "registry_candidate_requires_review", "Observed candidate hint, not final severity.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "accidentTypeId", "accidentTypeId", "registry_candidate_requires_review", "Observed candidate reference.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "outcomeTypeId", "outcomeTypeId", "registry_candidate_requires_review", "Observed candidate reference.");
  addPropertyObservations(observedSources, text, file, "summary candidate", "drinkTypeId", "drinkTypeId", "registry_candidate_requires_review", "Observed candidate reference.");
  collectArrayStringsByProperty(text, "feedbackTags").forEach(value => {
    const isHighRisk = HIGH_RISK_CANDIDATE_TAGS.has(value);
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: isHighRisk ? "riskTag" : "candidateTag",
      sourceFile: file,
      sourceKind: "summary candidate",
      observedUsage: "feedbackTags[]",
      suggestedStatus: isHighRisk ? "risk_tag_only" : "candidate_only",
      requiresReview: true,
      notes: "Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag."
    });
  });
}

function collectPriorityShellSources(observedSources) {
  const file = "core/candidatePriorityShellEngine.js";
  const text = readText(file);
  const priorityBandOrderBlock = text.match(/const priorityBandOrder = \[([\s\S]*?)\];/);
  if (priorityBandOrderBlock) {
    collectQuotedStrings(priorityBandOrderBlock[1]).forEach(value => {
      addObservation(observedSources, {
        observedValue: value,
        observedLayer: "priorityBand",
        sourceFile: file,
        sourceKind: "priority shell",
        observedUsage: "priorityBandOrder[]",
        suggestedStatus: "observed_runtime_source",
        requiresReview: false,
        notes: "Observed priority shell ordering value."
      });
    });
  }
  collectObjectKeys(text, "priorityBandAliases").forEach(value => {
    addObservation(observedSources, {
      observedValue: value,
      observedLayer: "priorityBand",
      sourceFile: file,
      sourceKind: "priority shell",
      observedUsage: "priorityBandAliases key",
      suggestedStatus: "registry_candidate_requires_review",
      requiresReview: true,
      notes: "Observed alias value; should be explicit if used by validator."
    });
  });
  const aliasesBlock = text.match(/const priorityBandAliases = {([\s\S]*?)};/);
  if (aliasesBlock) {
    collectQuotedStrings(aliasesBlock[1]).forEach(value => {
      addObservation(observedSources, {
        observedValue: value,
        observedLayer: "priorityBand",
        sourceFile: file,
        sourceKind: "priority shell",
        observedUsage: "priorityBandAliases value",
        suggestedStatus: "observed_runtime_source",
        requiresReview: false,
        notes: "Observed priority shell alias target."
      });
    });
  }
}

function collectCandidateSeveritySampleSources(observedSources) {
  const csvFile = "content_sheets/examples/candidate_severity_rules.sample.csv";
  const jsonFile = "content_sheets/examples/candidate_severity_rules.sample.json";
  const fieldMap = {
    ruleId: "ruleId",
    candidateType: "candidateType",
    accidentTypeId: "accidentTypeId",
    outcomeTypeId: "outcomeTypeId",
    drinkTypeId: "drinkTypeId",
    feedbackTag: "feedbackTag",
    sourceLayer: "sourceLayer",
    sourceSummary: "sourceSummary",
    triggerMetric: "triggerMetric",
    priorityBand: "priorityBand",
    severityHint: "severityHint",
    severityLevel: "severityLevel"
  };

  [
    { file: csvFile, rows: parseCsvFile(csvFile) },
    { file: jsonFile, rows: readJson(jsonFile) }
  ].forEach(source => {
    addRowsFromFields(
      observedSources,
      source.rows,
      source.file,
      "sample sheet draft",
      fieldMap,
      ({ field, value }) => draftStatus(value, field)
    );
  });
}

function collectFeedbackSheetSources(observedSources) {
  const csvFile = "content_sheets/examples/feedback_texts.sample.csv";
  const jsonFile = "content_sheets/examples/feedback_texts.sample.json";
  const fieldMap = {
    textId: "textId",
    feedbackTag: "feedbackTag",
    accidentTypeId: "accidentTypeId",
    drinkTypeId: "drinkTypeId",
    outcomeTypeId: "outcomeTypeId"
  };
  const resolver = ({ field }) => {
    if (field === "textId") {
      return {
        suggestedStatus: "generated_only",
        requiresReview: false,
        notes: "Feedback text identity from sample source; build output still needs validation before runtime use."
      };
    }
    return {
      suggestedStatus: "registry_candidate_requires_review",
      requiresReview: true,
      notes: "Feedback sample source reference; useful evidence, not a registry decision."
    };
  };

  [
    { file: csvFile, rows: parseCsvFile(csvFile) },
    { file: jsonFile, rows: readJson(jsonFile) }
  ].forEach(source => {
    addRowsFromFields(observedSources, source.rows, source.file, "content sheet sample", fieldMap, resolver);
  });
}

function collectObservedSources() {
  const observedSources = new Map();
  collectIngredientSources(observedSources);
  collectAccidentRuleSources(observedSources);
  collectStructureAccidentSources(observedSources);
  collectDrinkTypeSources(observedSources);
  collectFeedbackTextSources(observedSources);
  collectGeneratedFeedbackSources(observedSources);
  collectGoldenSources(observedSources);
  collectSummaryCandidateSources(observedSources);
  collectPriorityShellSources(observedSources);
  collectCandidateSeveritySampleSources(observedSources);
  collectFeedbackSheetSources(observedSources);
  return Array.from(observedSources.values()).sort((left, right) => {
    return [
      left.observedLayer.localeCompare(right.observedLayer),
      left.observedValue.localeCompare(right.observedValue),
      left.sourceFile.localeCompare(right.sourceFile),
      left.observedUsage.localeCompare(right.observedUsage)
    ].find(delta => delta !== 0) || 0;
  });
}

function summarizeLayers(observedSources) {
  const byLayer = new Map();
  observedSources.forEach(item => {
    if (!byLayer.has(item.observedLayer)) {
      byLayer.set(item.observedLayer, {
        observedLayer: item.observedLayer,
        observedValueCount: new Set(),
        sourceFileCount: new Set(),
        observationCount: 0,
        reviewCount: 0
      });
    }
    const summary = byLayer.get(item.observedLayer);
    summary.observedValueCount.add(item.observedValue);
    summary.sourceFileCount.add(item.sourceFile);
    summary.observationCount += 1;
    if (item.requiresReview) summary.reviewCount += 1;
  });

  return Array.from(byLayer.values())
    .map(item => ({
      observedLayer: item.observedLayer,
      observedValueCount: item.observedValueCount.size,
      sourceFileCount: item.sourceFileCount.size,
      observationCount: item.observationCount,
      reviewCount: item.reviewCount
    }))
    .sort((left, right) => left.observedLayer.localeCompare(right.observedLayer));
}

function escapeMarkdown(value) {
  return String(value)
    .replace(/\|/g, "\\|")
    .replace(/\n/g, "<br>");
}

function renderTable(headers, rows) {
  const headerLine = `| ${headers.join(" | ")} |`;
  const dividerLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const bodyLines = rows.map(row => `| ${headers.map(header => escapeMarkdown(row[header] ?? "")).join(" | ")} |`);
  return [headerLine, dividerLine, ...bodyLines].join("\n");
}

function renderReport(observedSources) {
  const layerSummaries = summarizeLayers(observedSources);
  const layerRows = layerSummaries.map(item => ({
    "observed layer": item.observedLayer,
    "observed value count": item.observedValueCount,
    "source file count": item.sourceFileCount,
    "observation count": item.observationCount,
    "requires review count": item.reviewCount
  }));
  const observationRows = observedSources.map(item => ({
    "observed value": item.observedValue,
    "observed layer": item.observedLayer,
    "source file": item.sourceFile,
    "source kind": item.sourceKind,
    "observed usage": item.observedUsage,
    "suggested status": item.suggestedStatus,
    "requires review": item.requiresReview ? "yes" : "no",
    notes: item.notes
  }));

  return [
    "# Stable ID Source Collector Sample Report",
    "",
    "## 0. Report positioning",
    "",
    "This report is a collector proof report. It is not a registry, not an allowed values list, not validator input, and not generated data.",
    "",
    "Observed does not mean final. Seeing an ID or tag here does not mean it has been reviewed, registered, approved, or made stable. The collector does not make mechanism decisions and does not finish naming review.",
    "",
    "The collector output is useful as evidence for future registry design and drift checks only. Any future validator still needs an explicit source-of-truth design and human / ChatGPT review before treating values as enforceable.",
    "",
    "## 1. Scanned sources",
    "",
    ...SOURCE_FILES.map(source => `- \`${source.file}\` (${source.sourceKind})`),
    "",
    "Docs prose is intentionally not scanned as a fact source.",
    "",
    "## 2. Layer summary",
    "",
    renderTable(["observed layer", "observed value count", "source file count", "observation count", "requires review count"], layerRows),
    "",
    "## 3. Observed source table",
    "",
    renderTable(["observed value", "observed layer", "source file", "source kind", "observed usage", "suggested status", "requires review", "notes"], observationRows),
    "",
    "## 4. High-risk boundary reminders",
    "",
    "- `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, and `novelty` are observed candidate / risk tags. They must not be automatically treated as runtime feedbackTag.",
    "- `bubble_conflict` is observed as a feedbackTag, but it must not be generalized to flavor identity conflict without review.",
    "- `dairy_fat_overload` should be kept as observed, but any severity sample use needs notes that sourceLayer / sourceSummary / triggerMetric control its current meaning.",
    "- `flavor_durian_overload`, `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload`, `industrial_creamer_overload`, and similar legacy or ingredient-specific IDs should not be renamed in place. Treat them as migration candidates or mechanism review items.",
    "- Candidate severity draft ruleIds remain sample sheet draft identities and must not enter any registry by collection alone.",
    "- Golden sampleId values are test identities only and must not become mechanism rule keys.",
    "",
    "## 5. Drift check / future use",
    "",
    "- If runtime sources later show a new observed ID but a future reviewed source-of-truth file does not contain it, report it for review. Do not auto-add it.",
    "- If a future reviewed source-of-truth file contains an ID that no runtime, golden, generated, or sheet source references, report it for review. Do not auto-delete it.",
    "- This collector provides evidence and drift hints only. It does not decide legality, quality, mechanism meaning, or runtime takeover readiness.",
    ""
  ].join("\n");
}

function printSummary(observedSources) {
  const layerSummaries = summarizeLayers(observedSources);
  console.log("Stable ID source collector proof");
  console.log(`Scanned sources: ${SOURCE_FILES.length}`);
  console.log(`Observed source rows: ${observedSources.length}`);
  console.log(`Observed layers: ${layerSummaries.length}`);
  console.log("Important: collector output is observed evidence only; it is not a registry, not validator input, and not generated data.");
  layerSummaries.forEach(item => {
    console.log(`- ${item.observedLayer}: ${item.observedValueCount} values, ${item.reviewCount} rows require review`);
  });
}

function main() {
  SOURCE_FILES.forEach(source => {
    const filePath = path.join(ROOT, source.file);
    if (!fs.existsSync(filePath)) fail(`Source file not found: ${source.file}`);
  });

  const observedSources = collectObservedSources();
  printSummary(observedSources);

  if (outFile) {
    const absoluteOut = path.resolve(ROOT, outFile);
    fs.mkdirSync(path.dirname(absoluteOut), { recursive: true });
    fs.writeFileSync(absoluteOut, renderReport(observedSources), "utf8");
    console.log(`Report written: ${toPosix(path.relative(ROOT, absoluteOut))}`);
  }
}

main();
