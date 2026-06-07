#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "../..");
const defaultSampleRowsPath = "content_sheets/examples/severity_sample_rows.sample.json";
const defaultOutPath = "reports/debug/generatedSeverityShadow.sample.json";

const runtimeScriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js",
  "data/combinationRules.js",
  "data/drinkTypeRules.js",
  "data/accidentRules.js",
  "data/structureAccidentRules.js",
  "data/proportionSegmentRules.js",
  "data/synergyRules.js",
  "data/feedbackTexts.js",
  "core/recipeEngine.js",
  "core/scoreEngine.js",
  "data/generated/feedbackTexts.generated.js",
  "core/feedbackRuntimeAdapter.js",
  "core/feedbackEngine.js",
  "core/tasteContext.js",
  "core/drinkStructureAnalyzer.js",
  "core/textureProfileAnalyzer.js",
  "core/ingredientAnalyzer.js",
  "core/ruleRefHelper.js",
  "core/ingredientGroupHelper.js",
  "core/proportionSegmentRuleEngine.js",
  "core/proportionAnalyzer.js",
  "core/accidentRuleEngine.js",
  "core/structureAccidentRuleEngine.js",
  "core/accidentAnalyzer.js",
  "core/combinationAnalyzer.js",
  "core/drinkTypeAnalyzer.js",
  "core/tasteSummaryEngine.js",
  "core/textureSummaryEngine.js",
  "core/flavorSummaryEngine.js",
  "core/summaryCandidateEngine.js",
  "core/candidatePriorityShellEngine.js",
  "core/tasteJudge.js",
  "data/goldenSamples.js"
];

function parseArgs(argv) {
  const args = {
    out: defaultOutPath,
    sampleRows: defaultSampleRowsPath,
    sampleId: null,
    limit: 1
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.out = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--sample") {
      args.sampleRows = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--sample-id") {
      args.sampleId = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--limit") {
      const parsed = Number.parseInt(argv[index + 1], 10);
      if (!Number.isFinite(parsed) || parsed < 1) {
        throw new Error("--limit must be a positive integer");
      }
      args.limit = parsed;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function repoPath(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(repoPath(relativePath), "utf8"));
}

function runValidator(sampleRowsPath) {
  execFileSync(
    "node",
    ["scripts/content/validateSeveritySampleRows.js", sampleRowsPath],
    { cwd: repoRoot, stdio: "pipe" }
  );
}

function createRuntime() {
  const math = Object.create(Math);
  math.random = () => 0;

  const context = {
    console,
    Math: math,
    module: { exports: {} }
  };
  context.globalThis = context;
  context.window = context;

  vm.createContext(context);

  runtimeScriptFiles.forEach(file => {
    const fullPath = repoPath(file);
    const code = fs.readFileSync(fullPath, "utf8");
    vm.runInContext(code, context, { filename: file });
  });

  return context;
}

function normalizeSampleItem(item, ingredientRegistry, sampleId) {
  if (item?.name) return { ...item };

  const ref = item?.ingredientRef || item?.ingredientId || item?.id;
  const meta = ingredientRegistry.normalizeIngredientRef(ref);

  if (!meta) {
    throw new Error(`sample ${sampleId} has unknown ingredient ref: ${JSON.stringify(item)}`);
  }

  return {
    ...item,
    name: meta.name,
    ingredientId: meta.id
  };
}

function normalizeSampleCup(sample, ingredientRegistry) {
  if (!Array.isArray(sample.cup)) {
    throw new Error(`sample ${sample.id} cup should be an array`);
  }
  return sample.cup.map(item => normalizeSampleItem(item, ingredientRegistry, sample.id));
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function pickSamples(goldenSamples, sampleId, limit) {
  if (sampleId) {
    const sample = goldenSamples.find(item => item.id === sampleId);
    if (!sample) {
      throw new Error(`Unknown golden sample id: ${sampleId}`);
    }
    return [sample];
  }
  return goldenSamples.slice(0, limit);
}

function getArrayIds(result, pluralKey, singularKey) {
  return [
    ...(Array.isArray(result?.[pluralKey]) ? result[pluralKey] : []),
    ...(result?.[singularKey] ? [result[singularKey]] : [])
  ].filter(Boolean);
}

function buildLegacySnapshots(samples) {
  const runtime = createRuntime();
  const { evaluateCup } = runtime.MILK_TEA_LAB_TASTE_JUDGE;
  const ingredientRegistry = runtime.MILK_TEA_LAB_INGREDIENT_REGISTRY;

  return samples.map(sample => {
    const cup = normalizeSampleCup(sample, ingredientRegistry);
    const result = evaluateCup(cup);

    return {
      sampleId: sample.id,
      sampleTitle: sample.name,
      recipe: cup.map(item => ({
        ingredientId: item.ingredientId || null,
        name: item.name,
        ratio: item.ratio
      })),
      score: result?.score ?? null,
      type: result?.type ?? null,
      feedback: result?.feedback ?? null,
      accidentTypeId: result?.accidentTypeId ?? null,
      drinkTypeId: result?.drinkTypeId ?? null,
      outcomeTypeId: result?.outcomeTypeId ?? null,
      feedbackTags: getArrayIds(result, "feedbackTags", "feedbackTag"),
      tasteSummary: cloneJson(result?.tasteSummary),
      textureSummary: cloneJson(result?.textureSummary),
      flavorSummary: cloneJson(result?.flavorSummary),
      summaryCandidates: cloneJson(result?.summaryCandidates),
      candidatePriorityShell: cloneJson(result?.candidatePriorityShell),
      readonly: true,
      affectsFinalResult: false,
      affectsGoldenExpected: false
    };
  });
}

function getSummaryForLayer(snapshot, sourceLayer) {
  const normalized = String(sourceLayer || "").toLowerCase();
  if (normalized.includes("taste")) return { name: "tasteSummary", summary: snapshot.tasteSummary };
  if (normalized.includes("texture")) return { name: "textureSummary", summary: snapshot.textureSummary };
  if (normalized.includes("flavor")) return { name: "flavorSummary", summary: snapshot.flavorSummary };
  return { name: "unknown", summary: null };
}

function hasUnsafeGate(row) {
  return [
    row.enabled,
    row.canEnterGeneratedSeverity,
    row.canEnterShadow,
    row.canAffectRuntime,
    row.canChangeGoldenExpected
  ].some(value => value !== false);
}

function buildMatch(row, legacySnapshots) {
  if (hasUnsafeGate(row)) {
    return {
      matchState: "blocked_by_gate",
      matchReason: "One or more dangerous gates are not false.",
      evidence: []
    };
  }

  if (!legacySnapshots.length) {
    return {
      matchState: "missing_summary",
      matchReason: "No legacy snapshot is available.",
      evidence: []
    };
  }

  const evidence = [];
  let sawSummary = false;
  let sawExactMetric = false;
  let positiveMetric = false;

  legacySnapshots.forEach(snapshot => {
    const { name, summary } = getSummaryForLayer(snapshot, row.sourceLayer);
    const values = summary?.values && typeof summary.values === "object" ? summary.values : null;
    const valueKeys = values ? Object.keys(values) : [];
    const exactValue = values ? values[row.triggerMetricDirection] : undefined;

    if (summary) sawSummary = true;
    if (typeof exactValue === "number") {
      sawExactMetric = true;
      positiveMetric = positiveMetric || exactValue > 0;
    }

    evidence.push({
      sampleId: snapshot.sampleId,
      sourceSummary: name,
      summaryAvailable: Boolean(summary),
      triggerMetricDirection: row.triggerMetricDirection,
      exactMetricAvailable: typeof exactValue === "number",
      observedValueDraft: typeof exactValue === "number" ? exactValue : null,
      availableValueKeys: valueKeys,
      note: "Shadow-only evidence; not official triggerMetric mapping."
    });
  });

  if (!sawSummary) {
    return {
      matchState: "missing_summary",
      matchReason: "The selected snapshot does not contain the requested summary layer.",
      evidence
    };
  }

  if (!sawExactMetric) {
    return {
      matchState: "unavailable_metric",
      matchReason: `No exact runtime summary metric exists for triggerMetricDirection "${row.triggerMetricDirection}". The proof did not invent a mapping.`,
      evidence
    };
  }

  return {
    matchState: positiveMetric ? "metric_observed_positive" : "metric_observed_zero",
    matchReason: positiveMetric
      ? "An exact numeric summary metric is available and positive; shadow observation only, not final accident, official severity, or official triggerMetric registry hit."
      : "An exact numeric summary metric is available but not positive; shadow observation only, not final accident, official severity, or official triggerMetric registry hit.",
    evidence
  };
}

function getSourceCommit() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
  } catch (_error) {
    return null;
  }
}

function buildShadowCandidates(rows, legacySnapshots) {
  return rows.map(row => {
    const match = buildMatch(row, legacySnapshots);
    return {
      shadowCandidateId: `SHADOW-${row.rowId}`,
      sourceSampleRowId: row.rowId,
      proposedDraftId: row.proposedDraftId,
      displayNameDraft: row.displayNameDraft,
      sourceLayer: row.sourceLayer,
      triggerMetricDirection: row.triggerMetricDirection,
      humanSeverityLabel: row.humanSeverityLabel,
      severityLevelDraft: row.severityLevelDraft,
      matchState: match.matchState,
      matchReason: match.matchReason,
      evidence: match.evidence,
      notThis: row.notThis,
      preferenceNotes: row.preferenceNotes,
      affectsFinalResult: false,
      canAffectRuntime: false,
      canChangeGoldenExpected: false
    };
  });
}

function buildOutput(args) {
  runValidator(args.sampleRows);

  const sampleRows = readJson(args.sampleRows);
  const rows = Object.values(sampleRows.rowsById || {});
  const runtime = createRuntime();
  const { goldenSamples } = runtime.MILK_TEA_LAB_GOLDEN_SAMPLES;
  const selectedSamples = pickSamples(goldenSamples, args.sampleId, args.limit);
  const legacySnapshots = buildLegacySnapshots(selectedSamples);
  const shadowCandidates = buildShadowCandidates(rows, legacySnapshots);

  return {
    schemaVersion: "generatedSeverityShadow.proof.v0.0.8",
    sourceType: "debug_shadow_proof",
    readonly: true,
    affectsFinalResult: false,
    affectsScore: false,
    affectsFeedback: false,
    affectsResultType: false,
    affectsGoldenExpected: false,
    runtimeData: false,
    generatedSeverityData: false,
    partialTakeoverEnabled: false,
    activeTakeoverEnabled: false,
    proposedDraftIdsAreApprovedStableIds: false,
    triggerMetricDirectionsAreOfficialRegistry: false,
    sourceSampleRowsAreRuntimeData: false,
    validatorIsActiveValidator: false,
    metadata: {
      generatedAt: null,
      sourceCommit: getSourceCommit(),
      builderMode: "node_only_debug_readonly_proof",
      shadowCandidateCount: shadowCandidates.length,
      legacySnapshotCount: legacySnapshots.length,
      sampleRowsSchemaVersion: sampleRows.schemaVersion || null
    },
    source: {
      sampleRowsFile: args.sampleRows,
      validatorCommand: `node scripts/content/validateSeveritySampleRows.js ${args.sampleRows}`,
      legacySnapshotSource: args.sampleId ? "golden_sample_by_id" : "golden_samples_first_n",
      sampleId: args.sampleId,
      limit: args.limit
    },
    legacySnapshots,
    shadowCandidates,
    warnings: [
      "This is debug-only generatedSeverityShadow proof output.",
      "No formal triggerMetric registry is available; unavailable_metric is expected.",
      "This output must not be read by runtime or copied into data/generated."
    ],
    fallbackReason: shadowCandidates.every(candidate => candidate.matchState === "unavailable_metric")
      ? "all_trigger_metric_directions_unavailable_as_official_runtime_metrics"
      : null
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const output = buildOutput(args);
  const outPath = repoPath(args.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Generated severity shadow proof written: ${args.out}`);
  console.log(`shadowCandidates: ${output.shadowCandidates.length}`);
  console.log(`legacySnapshots: ${output.legacySnapshots.length}`);
}

if (require.main === module) {
  main();
}
