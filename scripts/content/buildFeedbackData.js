#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const DEFAULT_OUTPUT = "data/generated/feedbackTexts.generated.json";

const REQUIRED_HEADERS = [
  "textId",
  "feedbackTag",
  "scene",
  "zhCN",
  "tone",
  "minScore",
  "maxScore",
  "accidentTypeId",
  "drinkTypeId",
  "outcomeTypeId",
  "audienceId",
  "enabled",
  "notes"
];

const OPTIONAL_ID_FIELDS = ["accidentTypeId", "drinkTypeId", "outcomeTypeId", "audienceId"];

function usage() {
  console.log("Usage: node scripts/content/buildFeedbackData.js <feedback_texts.csv> [--out <output.json>]");
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {
    sourcePath: null,
    outPath: DEFAULT_OUTPUT
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--out") {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error("--out requires a path");
      }
      result.outPath = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    if (result.sourcePath) {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    result.sourcePath = arg;
  }

  return result;
}

function runValidator(sourcePath) {
  const validatorPath = path.resolve(__dirname, "validateFeedbackSheet.js");
  const result = spawnSync(process.execPath, [validatorPath, sourcePath], {
    encoding: "utf8"
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const stdout = result.stdout || "";
  const errors = Number((stdout.match(/^Errors:\s*(\d+)/m) || [])[1] || 0);
  const warnings = Number((stdout.match(/^Warnings:\s*(\d+)/m) || [])[1] || 0);

  return {
    status: result.status,
    signal: result.signal,
    errors,
    warnings
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let quotedField = false;

  function pushField() {
    row.push(field);
    field = "";
    quotedField = false;
  }

  function pushRow() {
    pushField();
    rows.push(row);
    row = [];
  }

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === "\"") {
        if (next === "\"") {
          field += "\"";
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === "\"") {
      if (field.length === 0 && !quotedField) {
        inQuotes = true;
        quotedField = true;
        continue;
      }
      throw new Error("Unexpected quote in CSV");
    }

    if (char === ",") {
      pushField();
      continue;
    }

    if (char === "\n" || char === "\r") {
      pushRow();
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      continue;
    }

    field += char;
  }

  if (inQuotes) {
    throw new Error("Unclosed quote in CSV");
  }

  if (field.length || row.length) {
    pushRow();
  }

  return rows.filter((item, index) => {
    const isBlank = item.every(value => value === "");
    const isLast = index === rows.length - 1;
    return !(isBlank && isLast);
  });
}

function parseBoolean(value) {
  return value === "TRUE" || value === "true";
}

function parseScore(value) {
  if (value === "") return null;
  return Number(value);
}

function parseOptionalId(value) {
  return value === "" ? null : value;
}

function addToGroup(groups, key, textId) {
  if (!groups[key]) groups[key] = [];
  groups[key].push(textId);
}

function toRecord(row) {
  return {
    textId: row.textId,
    feedbackTag: row.feedbackTag,
    scene: row.scene,
    zhCN: row.zhCN,
    tone: row.tone,
    minScore: parseScore(row.minScore),
    maxScore: parseScore(row.maxScore),
    accidentTypeId: parseOptionalId(row.accidentTypeId),
    drinkTypeId: parseOptionalId(row.drinkTypeId),
    outcomeTypeId: parseOptionalId(row.outcomeTypeId),
    audienceId: parseOptionalId(row.audienceId),
    enabled: parseBoolean(row.enabled),
    notes: row.notes
  };
}

function readSheet(sourcePath) {
  const text = fs.readFileSync(sourcePath, "utf8").replace(/^\ufeff/, "");
  const rows = parseCsv(text);
  if (!rows.length) {
    throw new Error("CSV has no rows");
  }

  const [header, ...dataRows] = rows;
  const missingHeaders = REQUIRED_HEADERS.filter(name => !header.includes(name));
  if (missingHeaders.length) {
    throw new Error(`CSV missing required headers: ${missingHeaders.join(", ")}`);
  }

  return dataRows.map(values => {
    const row = {};
    header.forEach((name, index) => {
      row[name] = values[index] ?? "";
    });
    return row;
  });
}

function buildData(sourcePath, validation) {
  const rows = readSheet(sourcePath);
  const textsById = {};
  const textsByTag = {};
  const textsByScene = {};
  const enabledTextIdsByTag = {};
  const enabledTextIdsByScene = {};

  rows.forEach(row => {
    const record = toRecord(row);
    textsById[record.textId] = record;
    addToGroup(textsByTag, record.feedbackTag, record.textId);
    addToGroup(textsByScene, record.scene, record.textId);
    if (record.enabled) {
      addToGroup(enabledTextIdsByTag, record.feedbackTag, record.textId);
      addToGroup(enabledTextIdsByScene, record.scene, record.textId);
    }
  });

  const records = Object.values(textsById);
  const enabledCount = records.filter(record => record.enabled).length;

  return {
    schemaVersion: "feedbackTexts.generated.v0.0.7.9",
    generatedFrom: path.relative(process.cwd(), path.resolve(sourcePath)),
    textsById,
    textsByTag,
    textsByScene,
    enabledTextIdsByTag,
    enabledTextIdsByScene,
    metadata: {
      readonly: true,
      sourceType: "generated",
      stableIdRequired: true,
      affectsRuntime: false,
      generatedBy: "scripts/content/buildFeedbackData.js",
      validation: {
        errors: validation.errors,
        warnings: validation.warnings
      },
      valueEncoding: {
        enabled: "boolean",
        scoreEmpty: null,
        optionalIdEmpty: null
      },
      counts: {
        total: records.length,
        enabled: enabledCount,
        disabled: records.length - enabledCount
      }
    }
  };
}

function writeJson(outPath, data) {
  const resolvedPath = path.resolve(outPath);
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return resolvedPath;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv);
  } catch (error) {
    console.error(error.message);
    usage();
    process.exitCode = 1;
    return;
  }

  if (!args.sourcePath) {
    usage();
    process.exitCode = 1;
    return;
  }

  const sourcePath = path.resolve(args.sourcePath);
  const outPath = path.resolve(args.outPath);
  const validation = runValidator(sourcePath);

  if (validation.status !== 0 || validation.errors > 0) {
    console.error("Build stopped because feedback sheet validation failed.");
    process.exitCode = validation.status || 1;
    return;
  }

  if (validation.warnings > 0) {
    console.log("");
    console.log(`Build continuing with ${validation.warnings} validation warning(s).`);
  }

  try {
    const data = buildData(sourcePath, validation);
    const writtenPath = writeJson(outPath, data);
    console.log("");
    console.log("Feedback data build");
    console.log(`Source: ${sourcePath}`);
    console.log(`Output: ${writtenPath}`);
    console.log(`Rows: ${data.metadata.counts.total}`);
    console.log(`Enabled: ${data.metadata.counts.enabled}`);
    console.log(`Disabled: ${data.metadata.counts.disabled}`);
    console.log(`Validation warnings: ${data.metadata.validation.warnings}`);
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
