#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

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

const REQUIRED_FIELDS = ["textId", "feedbackTag", "scene", "tone", "enabled"];
const OPTIONAL_ID_FIELDS = ["accidentTypeId", "drinkTypeId", "outcomeTypeId", "audienceId"];

const SCENE_VALUES = new Set(["normal", "accident", "followup", "fallback"]);
const TONE_VALUES = new Set(["classic", "teasing", "cute", "premium", "warning", "explanatory", "weird"]);
const ENABLED_VALUES = new Set(["TRUE", "FALSE", "true", "false"]);
const BROAD_TONES = new Set(["classic"]);

const CHINESE_RE = /[\u3400-\u9fff]/;
const STABLE_ID_RE = /^[a-z][a-z0-9_]*$/;
const WIDE_SCORE_RANGE = 40;

function usage() {
  console.log("Usage: node scripts/content/validateFeedbackSheet.js <feedback_texts.csv>");
}

function formatIssue(issue) {
  return `- row ${issue.row}: ${issue.message}`;
}

function addIssue(list, row, message) {
  list.push({ row, message });
}

function hasUtf8Bom(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let quotedField = false;
  let rowNumber = 1;

  function pushField() {
    row.push(field);
    field = "";
    quotedField = false;
  }

  function pushRow() {
    pushField();
    rows.push({ rowNumber, values: row });
    row = [];
  }

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === "\"") {
        if (next === "\"") {
          field += "\"";
          i += 1;
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
      throw new Error(`Unexpected quote at row ${rowNumber}`);
    }

    if (char === ",") {
      pushField();
      continue;
    }

    if (char === "\n" || char === "\r") {
      pushRow();
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      rowNumber += 1;
      continue;
    }

    field += char;
  }

  if (inQuotes) {
    throw new Error(`Unclosed quote at row ${rowNumber}`);
  }

  if (field.length || row.length) {
    pushRow();
  }

  return rows.filter((item, index) => {
    const isBlank = item.values.every(value => value === "");
    const isLast = index === rows.length - 1;
    return !(isBlank && isLast);
  });
}

function parseScore(value, fieldName, rowNumber, errors) {
  if (value === "") return null;

  const score = Number(value);
  if (!Number.isFinite(score)) {
    addIssue(errors, rowNumber, `${fieldName} must be a number when filled`);
    return null;
  }

  if (score < 0 || score > 100) {
    addIssue(errors, rowNumber, `${fieldName} must be between 0 and 100`);
  }

  return score;
}

function isEnabled(value) {
  return value === "TRUE" || value === "true";
}

function isStableId(value) {
  return STABLE_ID_RE.test(value) && !CHINESE_RE.test(value) && !/\s/.test(value);
}

function validateHeader(header, errors, warnings) {
  const headerSet = new Set(header);

  REQUIRED_HEADERS.forEach(name => {
    if (!headerSet.has(name)) {
      addIssue(errors, "header", `missing required header "${name}"`);
    }
  });

  const extraHeaders = header.filter(name => !REQUIRED_HEADERS.includes(name));
  if (extraHeaders.length) {
    addIssue(warnings, "header", `extra headers are ignored: ${extraHeaders.join(", ")}`);
  }
}

function validateRows(rows, header, errors, warnings) {
  const records = [];
  const textIds = new Map();
  const feedbackTagCounts = new Map();
  const sceneCounts = new Map();
  const toneCounts = new Map();
  let enabledCount = 0;
  let disabledCount = 0;

  rows.forEach(({ rowNumber, values }) => {
    if (values.length !== header.length) {
      addIssue(errors, rowNumber, `column count mismatch: expected ${header.length}, got ${values.length}`);
      return;
    }

    const record = {};
    header.forEach((name, index) => {
      record[name] = values[index] ?? "";
    });

    REQUIRED_FIELDS.forEach(field => {
      if (!record[field]) {
        addIssue(errors, rowNumber, `${field} is required`);
      }
    });

    if (record.textId) {
      if (!isStableId(record.textId)) {
        addIssue(errors, rowNumber, "textId must be a stable ID and cannot contain Chinese, spaces, or display text");
      }
      if (textIds.has(record.textId)) {
        addIssue(errors, rowNumber, `duplicate textId "${record.textId}" first used at row ${textIds.get(record.textId)}`);
      } else {
        textIds.set(record.textId, rowNumber);
      }
    }

    if (record.feedbackTag) {
      if (!isStableId(record.feedbackTag)) {
        addIssue(errors, rowNumber, "feedbackTag must be a stable ID and cannot be Chinese display text");
      }
      feedbackTagCounts.set(record.feedbackTag, (feedbackTagCounts.get(record.feedbackTag) || 0) + 1);
    }

    if (record.scene && !SCENE_VALUES.has(record.scene)) {
      addIssue(errors, rowNumber, `scene must be one of: ${[...SCENE_VALUES].join(", ")}`);
    }

    if (record.tone) {
      if (!TONE_VALUES.has(record.tone)) {
        addIssue(errors, rowNumber, `tone must be one of: ${[...TONE_VALUES].join(", ")}`);
      }
      if (BROAD_TONES.has(record.tone)) {
        addIssue(warnings, rowNumber, `tone "${record.tone}" is broad; producer review may be useful`);
      }
    }

    if (record.enabled && !ENABLED_VALUES.has(record.enabled)) {
      addIssue(errors, rowNumber, "enabled must be TRUE, FALSE, true, or false");
    }

    const enabled = isEnabled(record.enabled);
    if (enabled) {
      enabledCount += 1;
      if (!record.zhCN) {
        addIssue(errors, rowNumber, "enabled row must have zhCN text");
      }
    } else {
      disabledCount += 1;
      if (!record.zhCN) {
        addIssue(warnings, rowNumber, "disabled row has empty zhCN text");
      }
    }

    const minScore = parseScore(record.minScore, "minScore", rowNumber, errors);
    const maxScore = parseScore(record.maxScore, "maxScore", rowNumber, errors);
    if (minScore !== null && maxScore !== null) {
      if (minScore > maxScore) {
        addIssue(errors, rowNumber, "minScore must be less than or equal to maxScore");
      }
      if (maxScore - minScore > WIDE_SCORE_RANGE) {
        addIssue(warnings, rowNumber, `score range is wide (${minScore}-${maxScore})`);
      }
    }

    OPTIONAL_ID_FIELDS.forEach(field => {
      if (record[field] && !isStableId(record[field])) {
        addIssue(errors, rowNumber, `${field} must be a stable ID and cannot contain Chinese or spaces`);
      }
    });

    if (record.scene === "accident" && OPTIONAL_ID_FIELDS.every(field => !record[field])) {
      addIssue(warnings, rowNumber, "accident scene has no optional stable ID reference");
    }

    if (!record.notes) {
      addIssue(warnings, rowNumber, "notes is empty");
    }

    if (record.scene) {
      sceneCounts.set(record.scene, (sceneCounts.get(record.scene) || 0) + 1);
    }
    if (record.tone) {
      toneCounts.set(record.tone, (toneCounts.get(record.tone) || 0) + 1);
    }

    records.push(record);
  });

  feedbackTagCounts.forEach((count, tag) => {
    if (count === 1) {
      addIssue(warnings, "summary", `feedbackTag "${tag}" has only 1 row`);
    }
  });

  return {
    rows: records.length,
    enabled: enabledCount,
    disabled: disabledCount,
    feedbackTags: [...feedbackTagCounts.keys()].sort(),
    scenes: [...sceneCounts.keys()].sort(),
    tones: [...toneCounts.keys()].sort()
  };
}

function validateFeedbackSheet(filePath) {
  const errors = [];
  const warnings = [];
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    addIssue(errors, "file", `file does not exist: ${filePath}`);
    return {
      file: resolvedPath,
      errors,
      warnings,
      info: { rows: 0, enabled: 0, disabled: 0, feedbackTags: [], scenes: [], tones: [] }
    };
  }

  const buffer = fs.readFileSync(resolvedPath);
  if (!hasUtf8Bom(buffer)) {
    addIssue(errors, "file", "CSV must be UTF-8 with BOM for Excel-readable Chinese text");
  }

  let parsedRows = [];
  try {
    const text = buffer.toString("utf8").replace(/^\ufeff/, "");
    parsedRows = parseCsv(text);
  } catch (error) {
    addIssue(errors, "parser", `CSV parse failed: ${error.message}`);
  }

  if (!parsedRows.length) {
    addIssue(errors, "file", "CSV has no rows");
    return {
      file: resolvedPath,
      errors,
      warnings,
      info: { rows: 0, enabled: 0, disabled: 0, feedbackTags: [], scenes: [], tones: [] }
    };
  }

  const [headerRow, ...dataRows] = parsedRows;
  const header = headerRow.values;
  validateHeader(header, errors, warnings);

  const info = validateRows(dataRows, header, errors, warnings);

  return {
    file: resolvedPath,
    errors,
    warnings,
    info
  };
}

function printReport(result) {
  console.log("Feedback sheet validation");
  console.log(`File: ${result.file}`);
  console.log(`Rows: ${result.info.rows}`);
  console.log(`Enabled: ${result.info.enabled}`);
  console.log(`Disabled: ${result.info.disabled}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  console.log(`FeedbackTags: ${result.info.feedbackTags.join(", ") || "(none)"}`);
  console.log(`Scenes: ${result.info.scenes.join(", ") || "(none)"}`);
  console.log(`Tones: ${result.info.tones.join(", ") || "(none)"}`);

  if (result.errors.length) {
    console.log("");
    console.log("Error details:");
    result.errors.forEach(issue => console.log(formatIssue(issue)));
  }

  if (result.warnings.length) {
    console.log("");
    console.log("Warning details:");
    result.warnings.forEach(issue => console.log(formatIssue(issue)));
  }
}

function main() {
  const [, , csvPath] = process.argv;

  if (!csvPath) {
    usage();
    process.exitCode = 1;
    return;
  }

  const result = validateFeedbackSheet(csvPath);
  printReport(result);
  process.exitCode = result.errors.length ? 1 : 0;
}

main();
