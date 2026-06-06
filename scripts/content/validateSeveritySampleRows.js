#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const EXPECTED_ROW_COUNT = 18;
const EXPECTED_ROWS_PER_ID = 3;
const CSV_BOM = Buffer.from([0xef, 0xbb, 0xbf]);

const KNOWN_PROPOSED_DRAFT_IDS = [
  "taste_sweet_overload",
  "taste_acid_overload",
  "taste_bitter_overload",
  "taste_astringency_overload",
  "texture_low_drinkability",
  "texture_solid_overload"
];

const REQUIRED_FIELDS = [
  "rowId",
  "proposedDraftId",
  "displayNameDraft",
  "sourceLayer",
  "triggerMetricDirection",
  "humanSeverityLabel",
  "severityLevelDraft",
  "severityExperience",
  "thresholdDraftMin",
  "thresholdDraftMax",
  "thresholdStatus",
  "scoreMultiplierDraft",
  "scoreMultiplierStatus",
  "feedbackIntensityDraft",
  "feedbackIntensityStatus",
  "notThis",
  "preferenceNotes",
  "enabled",
  "reviewStatus",
  "canEnterGeneratedSeverity",
  "canEnterShadow",
  "canAffectRuntime",
  "canChangeGoldenExpected",
  "nextRequiredGate"
];

const DANGEROUS_GATES = [
  "enabled",
  "canEnterGeneratedSeverity",
  "canEnterShadow",
  "canAffectRuntime",
  "canChangeGoldenExpected"
];

const ALLOW_EMPTY_FIELDS = new Set(["thresholdDraftMin", "thresholdDraftMax"]);
const EXACT_STATUS_VALUES = {
  thresholdStatus: "illustrative_only_notApproved",
  scoreMultiplierStatus: "blank_tbd_notApproved",
  feedbackIntensityStatus: "draft_notApproved"
};

const JSON_FALSE_METADATA = [
  "runtimeData",
  "officialThresholds",
  "officialScoreMultipliers",
  "rowIdIsStableId",
  "proposedDraftIdIsApprovedStableId",
  "containsGeneratedSeverity",
  "canChangeGoldenExpected"
];

const JSON_TRUE_METADATA = ["validatorRequiredBeforeUse"];
const JSON_TOP_LEVEL_FIELDS = [
  "schemaVersion",
  "sourceType",
  "affectsRuntime",
  "generatedSeverityEnabled",
  "rowsById",
  "rowIdsByProposedDraftId",
  "rowIdsBySourceLayer",
  "metadata"
];

function usage() {
  console.log("Usage: node scripts/content/validateSeveritySampleRows.js <severity_sample_rows.csv|json>");
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasUtf8Bom(buffer) {
  return buffer.length >= 3 && buffer[0] === CSV_BOM[0] && buffer[1] === CSV_BOM[1] && buffer[2] === CSV_BOM[2];
}

function addIssue(list, rowId, message) {
  list.push({ rowId, message });
}

function formatIssue(issue) {
  return `- [${issue.rowId}] ${issue.message}`;
}

function normalizeBoolean(value, format) {
  if (format === "json") {
    return value === true || value === false ? value : null;
  }

  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return null;
}

function isApprovedOrActiveStatus(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("notapproved") || normalized.includes("not_approved")) {
    return false;
  }
  return normalized.includes("approved") || normalized.includes("active");
}

function isNumberLike(value) {
  return /^-?\d+(?:\.\d+)?$/.test(String(value || "").trim());
}

function asNumber(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return null;
  const numberValue = Number(trimmed);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function combinedText(row) {
  return [
    row.displayNameDraft,
    row.sourceLayer,
    row.triggerMetricDirection,
    row.humanSeverityLabel,
    row.severityLevelDraft,
    row.severityExperience,
    row.notThis,
    row.preferenceNotes,
    row.nextRequiredGate
  ].join(" ");
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
      throw new Error(`Unexpected quote at CSV row ${rowNumber}`);
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
    throw new Error(`Unclosed quote at CSV row ${rowNumber}`);
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

function readCsv(filePath, errors) {
  const resolvedPath = path.resolve(filePath);
  let buffer;
  try {
    buffer = fs.readFileSync(resolvedPath);
  } catch (error) {
    addIssue(errors, "file", `无法读取文件：${error.message}`);
    return { resolvedPath, format: "csv", rows: [], header: [] };
  }

  if (!hasUtf8Bom(buffer)) {
    addIssue(errors, "file", "CSV 必须使用 UTF-8 with BOM，避免 Excel / Numbers 直接打开中文乱码。");
  }

  let parsedRows;
  try {
    const text = buffer.toString("utf8").replace(/^\uFEFF/, "");
    parsedRows = parseCsv(text);
  } catch (error) {
    addIssue(errors, "file", `CSV 解析失败：${error.message}`);
    return { resolvedPath, format: "csv", rows: [], header: [] };
  }

  if (!parsedRows.length) {
    addIssue(errors, "header", "CSV 必须有表头和数据行。");
    return { resolvedPath, format: "csv", rows: [], header: [] };
  }

  const header = parsedRows[0].values;
  const rows = [];
  parsedRows.slice(1).forEach(({ rowNumber, values }) => {
    if (values.length !== header.length) {
      addIssue(errors, `CSV row ${rowNumber}`, `列数不匹配：表头 ${header.length} 列，这一行 ${values.length} 列。`);
      return;
    }

    const record = {};
    header.forEach((name, index) => {
      record[name] = values[index] ?? "";
    });
    rows.push({ rowNumber, record });
  });

  return { resolvedPath, format: "csv", rows, header };
}

function readJson(filePath, errors) {
  const resolvedPath = path.resolve(filePath);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    addIssue(errors, "file", `JSON 解析失败：${error.message}`);
    return { resolvedPath, format: "json", rows: [], data: null };
  }

  if (!isPlainObject(data)) {
    addIssue(errors, "root", "JSON 顶层必须是 object。");
    return { resolvedPath, format: "json", rows: [], data };
  }

  JSON_TOP_LEVEL_FIELDS.forEach(field => {
    if (!Object.prototype.hasOwnProperty.call(data, field)) {
      addIssue(errors, field, `JSON 顶层缺少 ${field}。`);
    }
  });

  if (data.affectsRuntime !== false) {
    addIssue(errors, "affectsRuntime", "affectsRuntime 必须是 boolean false，当前样例不能影响 runtime。");
  }
  if (data.generatedSeverityEnabled !== false) {
    addIssue(errors, "generatedSeverityEnabled", "generatedSeverityEnabled 必须是 boolean false，当前样例不能开启 generated severity。");
  }

  if (!isPlainObject(data.rowsById)) {
    addIssue(errors, "rowsById", "rowsById 必须是 object。");
  }
  if (!isPlainObject(data.rowIdsByProposedDraftId)) {
    addIssue(errors, "rowIdsByProposedDraftId", "rowIdsByProposedDraftId 必须是 object。");
  }
  if (!isPlainObject(data.rowIdsBySourceLayer)) {
    addIssue(errors, "rowIdsBySourceLayer", "rowIdsBySourceLayer 必须是 object。");
  }
  validateJsonMetadata(data.metadata, errors);

  const rows = [];
  if (isPlainObject(data.rowsById)) {
    Object.entries(data.rowsById).forEach(([rowId, record]) => {
      if (!isPlainObject(record)) {
        addIssue(errors, rowId, "rowsById 中每一项都必须是 object。");
        return;
      }
      if (record.rowId !== rowId) {
        addIssue(errors, rowId, "JSON rowsById 的 key 必须等于 row.rowId；但 rowId 仍不是 stable ID。");
      }
      rows.push({ rowNumber: rowId, record });
    });
  }

  validateJsonIndexes(data, rows, errors);
  return { resolvedPath, format: "json", rows, data };
}

function validateJsonMetadata(metadata, errors) {
  if (!isPlainObject(metadata)) {
    addIssue(errors, "metadata", "metadata 必须存在且必须是 object，用来声明这些样例不是 runtime / generated 数据。");
    return;
  }

  JSON_FALSE_METADATA.forEach(field => {
    if (metadata[field] !== false) {
      addIssue(errors, `metadata.${field}`, `${field} 必须是 boolean false，避免样例被误当作正式数据。`);
    }
  });

  JSON_TRUE_METADATA.forEach(field => {
    if (metadata[field] !== true) {
      addIssue(errors, `metadata.${field}`, `${field} 必须是 boolean true，说明后续使用前必须先过 validator / review。`);
    }
  });
}

function validateJsonIndexes(data, rows, errors) {
  const rowIds = new Set(rows.map(({ record }) => record.rowId).filter(Boolean));

  if (isPlainObject(data.rowIdsByProposedDraftId)) {
    Object.entries(data.rowIdsByProposedDraftId).forEach(([proposedDraftId, ids]) => {
      if (!Array.isArray(ids)) {
        addIssue(errors, `rowIdsByProposedDraftId.${proposedDraftId}`, "索引值必须是 rowId array。");
        return;
      }
      ids.forEach(rowId => {
        if (!rowIds.has(rowId)) {
          addIssue(errors, `rowIdsByProposedDraftId.${proposedDraftId}`, `索引指向不存在的 rowId：${rowId}`);
        }
      });
    });
  }

  if (isPlainObject(data.rowIdsBySourceLayer)) {
    Object.entries(data.rowIdsBySourceLayer).forEach(([sourceLayer, ids]) => {
      if (!Array.isArray(ids)) {
        addIssue(errors, `rowIdsBySourceLayer.${sourceLayer}`, "索引值必须是 rowId array。");
        return;
      }
      ids.forEach(rowId => {
        if (!rowIds.has(rowId)) {
          addIssue(errors, `rowIdsBySourceLayer.${sourceLayer}`, `索引指向不存在的 rowId：${rowId}`);
        }
      });
    });
  }
}

function validateHeader(header, errors) {
  const headerSet = new Set(header);
  REQUIRED_FIELDS.forEach(field => {
    if (!headerSet.has(field)) {
      addIssue(errors, "header", `缺少必需列 ${field}。`);
    }
  });

  header.forEach(name => {
    if (name === "stableId" || name === "approvedStableId" || name === "accidentTypeId" || name === "approvedAccidentTypeId") {
      addIssue(errors, "header", `CSV 不应出现 ${name} 这类正式 ID 列，避免把 sample row 或 displayName 当成 approved ID。`);
    }
  });
}

function validateRows(rows, format, errors, warnings) {
  const rowIds = new Map();
  const rowsByProposedDraftId = new Map();
  const severityCoverage = new Map();
  let allDangerousGatesFalse = true;

  if (rows.length !== EXPECTED_ROW_COUNT) {
    addIssue(errors, "rows", `当前 sample 应为 ${EXPECTED_ROW_COUNT} 条数据行，实际为 ${rows.length} 条。`);
  }

  rows.forEach(({ rowNumber, record }) => {
    const rowId = record.rowId || `row ${rowNumber}`;

    REQUIRED_FIELDS.forEach(field => {
      if (!Object.prototype.hasOwnProperty.call(record, field)) {
        addIssue(errors, rowId, `缺少必需字段 ${field}。`);
        return;
      }
      if (!ALLOW_EMPTY_FIELDS.has(field) && record[field] === "") {
        addIssue(errors, rowId, `${field} 不能为空；如果只是草稿，也需要明确写出草稿状态或说明。`);
      }
    });

    if (record.rowId) {
      if (rowIds.has(record.rowId)) {
        addIssue(errors, rowId, `rowId 重复；首次出现于 ${rowIds.get(record.rowId)}。rowId 只是样例行编号，也必须唯一。`);
      } else {
        rowIds.set(record.rowId, rowNumber);
      }
    }

    if (!KNOWN_PROPOSED_DRAFT_IDS.includes(record.proposedDraftId)) {
      addIssue(errors, rowId, `proposedDraftId "${record.proposedDraftId}" 不在当前已审阅的 6 个 proposal 中，不能进入本 sample。`);
    }

    if (record.proposedDraftId) {
      if (!rowsByProposedDraftId.has(record.proposedDraftId)) {
        rowsByProposedDraftId.set(record.proposedDraftId, []);
      }
      rowsByProposedDraftId.get(record.proposedDraftId).push(record);
    }

    if (record.severityLevelDraft) {
      severityCoverage.set(record.severityLevelDraft, (severityCoverage.get(record.severityLevelDraft) || 0) + 1);
    }

    DANGEROUS_GATES.forEach(field => {
      const normalized = normalizeBoolean(record[field], format);
      if (normalized !== false) {
        allDangerousGatesFalse = false;
        addIssue(errors, rowId, `${field} 必须保持 false；当前 dry-run 不能影响 generated severity、shadow、runtime 或 golden expected。`);
      }
    });

    Object.entries(EXACT_STATUS_VALUES).forEach(([field, expectedValue]) => {
      if (record[field] !== expectedValue) {
        addIssue(errors, rowId, `${field} 当前应为 ${expectedValue}；这表示它仍是草稿 / 未批准。`);
      }
      if (isApprovedOrActiveStatus(record[field])) {
        addIssue(errors, rowId, `${field} 看起来像 approved / active，但当前所有 threshold / multiplier / feedback intensity 都不能被批准。`);
      }
    });

    if (isNumberLike(record.scoreMultiplierDraft)) {
      addIssue(errors, rowId, "scoreMultiplierDraft 看起来像正式数字；当前必须保持 blank / TBD / notApproved。");
    }

    const min = asNumber(record.thresholdDraftMin);
    const max = asNumber(record.thresholdDraftMax);
    if (min !== null && max !== null && min > max) {
      addIssue(errors, rowId, "thresholdDraftMin 大于 thresholdDraftMax；即使是示意阈值也不能倒挂。");
    }
    if ((min !== null || max !== null) && !/illustrative|draft|notapproved/i.test(String(record.thresholdStatus))) {
      addIssue(errors, rowId, "这一行写了 threshold draft，但 thresholdStatus 没有明确 illustrative / draft / notApproved。");
    }

    if (record.numericSourceStatus && isApprovedOrActiveStatus(record.numericSourceStatus)) {
      addIssue(errors, rowId, "numericSourceStatus 看起来像 approved，但当前没有正式 numeric source，不能把文字档位当计算主数据。");
    }

    validateIdentityGuard(record, rowId, errors);
    validateBoundaryWarnings(record, rowId, warnings);
  });

  KNOWN_PROPOSED_DRAFT_IDS.forEach(proposedDraftId => {
    const count = (rowsByProposedDraftId.get(proposedDraftId) || []).length;
    if (count !== EXPECTED_ROWS_PER_ID) {
      addIssue(errors, proposedDraftId, `每个 proposedDraftId 应有 ${EXPECTED_ROWS_PER_ID} 条 light / medium / heavy rows，实际为 ${count} 条。`);
    }
  });

  validateMechanismBoundaryWarnings(rows, warnings);

  return {
    proposedDraftIdCoverage: KNOWN_PROPOSED_DRAFT_IDS.map(proposedDraftId => {
      const count = (rowsByProposedDraftId.get(proposedDraftId) || []).length;
      return `${proposedDraftId}=${count}`;
    }),
    severityLevelDraftCoverage: [...severityCoverage.entries()].map(([level, count]) => `${level}=${count}`),
    allDangerousGatesFalse
  };
}

function validateIdentityGuard(record, rowId, errors) {
  const forbiddenStableFields = [
    "stableId",
    "approvedStableId",
    "accidentTypeId",
    "approvedAccidentTypeId",
    "allowedValue",
    "runtimeId"
  ];

  forbiddenStableFields.forEach(field => {
    if (!Object.prototype.hasOwnProperty.call(record, field)) return;
    const value = String(record[field] || "").trim();
    if (!value) return;
    if (value === record.rowId || value === record.displayNameDraft || value === record.proposedDraftId) {
      addIssue(errors, rowId, `${field} 把 sample row / displayName / proposedDraftId 当成正式 ID；本文件不能创建 allowed values。`);
    } else {
      addIssue(errors, rowId, `${field} 不应出现在当前 dry-run sample 中；本文件不能批准 stable ID / accidentTypeId。`);
    }
  });
}

function validateBoundaryWarnings(record, rowId, warnings) {
  const notThis = String(record.notThis || "").trim();
  const preferenceNotes = String(record.preferenceNotes || "").trim();
  if (!notThis || notThis.length < 10) {
    addIssue(warnings, rowId, "notThis 边界太短，制作人后续可能看不出它不是什么。");
  }
  if (!preferenceNotes) {
    addIssue(warnings, rowId, "preferenceNotes 为空；偏好 / tolerance 空间可能需要制作人复看。");
  }

  if (/mouthCoating/i.test(combinedText(record)) && !/边界|boundary|共用|shared|相邻|dairy|syrup|胶质|奶脂/.test(combinedText(record))) {
    addIssue(warnings, rowId, "mouthCoating 可能同时服务奶脂油腻和糖浆胶质，需要 boundary note。");
  }
}

function validateMechanismBoundaryWarnings(rows, warnings) {
  const byId = new Map();
  rows.forEach(({ record }) => {
    const proposedDraftId = record.proposedDraftId;
    if (!byId.has(proposedDraftId)) byId.set(proposedDraftId, []);
    byId.get(proposedDraftId).push(record);
  });

  const acidLight = (byId.get("taste_acid_overload") || []).find(row => /light/.test(row.severityLevelDraft || ""));
  if (acidLight) {
    const text = combinedText(acidLight);
    if (!/清爽|freshness/i.test(text) || !/不一定/.test(text)) {
      addIssue(warnings, acidLight.rowId || "taste_acid_overload", "酸度 light row 应保留“清爽 / 不一定事故 / freshness boundary”，避免误伤清爽果茶。");
    }
  }

  const solidText = (byId.get("texture_solid_overload") || []).map(combinedText).join(" ");
  if (solidText && !/小料多不一定吸不上来|不等于一定吸不上来|不一定吸不上来/.test(solidText)) {
    addIssue(warnings, "texture_solid_overload", "小料固体负载需要写清“小料多不一定吸不上来”。");
  }

  const lowDrinkText = (byId.get("texture_low_drinkability") || []).map(combinedText).join(" ");
  if (lowDrinkText && !/(固体|小料).*(奶脂|dairy).*(糖浆|胶质|syrup)|不是小料固体.*不是奶脂.*不是糖浆/.test(lowDrinkText)) {
    addIssue(warnings, "texture_low_drinkability", "低可饮用性需要排除 solid / dairy / syrupy texture，避免混成泛泛 texture overload。");
  }

  const astringencyText = (byId.get("taste_astringency_overload") || []).map(combinedText).join(" ");
  if (astringencyText && !/taste.*special sensation|special sensation.*taste|特殊刺激|taste \/ special sensation/i.test(astringencyText)) {
    addIssue(warnings, "taste_astringency_overload", "涩感需要保留 taste / special sensation boundary。");
  }
}

function validateSeveritySampleRows(filePath) {
  const errors = [];
  const warnings = [];
  const ext = path.extname(filePath).toLowerCase();
  let readResult;

  if (ext === ".csv") {
    readResult = readCsv(filePath, errors);
    validateHeader(readResult.header, errors);
  } else if (ext === ".json") {
    readResult = readJson(filePath, errors);
  } else {
    const resolvedPath = path.resolve(filePath);
    addIssue(errors, "file", "只支持 .csv 或 .json 输入。");
    readResult = { resolvedPath, format: "unknown", rows: [] };
  }

  const coverage = validateRows(readResult.rows, readResult.format, errors, warnings);
  const info = [
    `proposedDraftId coverage: ${coverage.proposedDraftIdCoverage.join(", ")}`,
    `severityLevelDraft coverage: ${coverage.severityLevelDraftCoverage.join(", ") || "none"}`,
    `all dangerous gates false: ${coverage.allDangerousGatesFalse}`
  ];

  return {
    file: readResult.resolvedPath,
    format: readResult.format,
    rowCount: readResult.rows.length,
    errors,
    warnings,
    info
  };
}

function printSection(title, items, formatter) {
  console.log("");
  console.log(`${title}:`);
  if (!items.length) {
    console.log("- none");
    return;
  }
  items.forEach(item => {
    console.log(formatter(item));
  });
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    usage();
    process.exit(1);
  }

  const result = validateSeveritySampleRows(filePath);

  console.log("Severity sample rows validation");
  console.log(`File: ${result.file}`);
  console.log(`Format: ${result.format}`);
  console.log(`Rows: ${result.rowCount}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  console.log(`Info: ${result.info.length}`);

  printSection("Errors", result.errors, formatIssue);
  printSection("Warnings", result.warnings, formatIssue);
  printSection("Info", result.info, item => `- ${item}`);

  process.exit(result.errors.length > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}
