#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CHINESE_RE = /[\u3400-\u9fff]/;
const STABLE_ID_RE = /^[a-z][a-z0-9_]*$/;

function usage() {
  console.log("Usage: node scripts/content/validateGeneratedFeedbackData.js <feedbackTexts.generated.json>");
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function addIssue(list, pathLabel, message) {
  list.push({ path: pathLabel, message });
}

function formatIssue(issue) {
  return `- ${issue.path}: ${issue.message}`;
}

function isStableId(value) {
  return typeof value === "string" && STABLE_ID_RE.test(value) && !CHINESE_RE.test(value) && !/\s/.test(value);
}

function hasChinese(value) {
  return typeof value === "string" && CHINESE_RE.test(value);
}

function readJson(filePath, errors) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    addIssue(errors, "file", `file does not exist: ${filePath}`);
    return { resolvedPath, data: null };
  }

  try {
    const text = fs.readFileSync(resolvedPath, "utf8");
    return { resolvedPath, data: JSON.parse(text) };
  } catch (error) {
    addIssue(errors, "file", `JSON parse failed: ${error.message}`);
    return { resolvedPath, data: null };
  }
}

function validateTopLevel(data, errors) {
  if (!isPlainObject(data)) {
    addIssue(errors, "root", "generated feedback data must be an object");
    return;
  }

  if (!data.schemaVersion) {
    addIssue(errors, "schemaVersion", "schemaVersion is required");
  }
  if (!data.generatedFrom) {
    addIssue(errors, "generatedFrom", "generatedFrom is required");
  }
  ["textsById", "textsByTag", "textsByScene", "metadata"].forEach(field => {
    if (!isPlainObject(data[field])) {
      addIssue(errors, field, `${field} must be an object`);
    }
  });
}

function validateMetadata(metadata, errors) {
  if (!isPlainObject(metadata)) return;

  if (metadata.readonly !== true) {
    addIssue(errors, "metadata.readonly", "metadata.readonly must be true");
  }
  if (metadata.sourceType !== "generated") {
    addIssue(errors, "metadata.sourceType", "metadata.sourceType must be \"generated\"");
  }
  if (metadata.stableIdRequired !== true) {
    addIssue(errors, "metadata.stableIdRequired", "metadata.stableIdRequired must be true");
  }
  if ("affectsRuntime" in metadata && metadata.affectsRuntime !== false) {
    addIssue(errors, "metadata.affectsRuntime", "metadata.affectsRuntime must be false before runtime adapter is implemented");
  }
}

function validateTextRecord(textId, record, errors, warnings) {
  const label = `textsById.${textId}`;

  if (!isPlainObject(record)) {
    addIssue(errors, label, "text record must be an object");
    return;
  }

  if (textId !== record.textId) {
    addIssue(errors, label, "object key must match item.textId");
  }
  if (!record.textId) {
    addIssue(errors, `${label}.textId`, "textId is required");
  } else if (!isStableId(record.textId)) {
    addIssue(errors, `${label}.textId`, "textId must be a stable ID and cannot contain Chinese, spaces, or display text");
  }
  if (!record.feedbackTag) {
    addIssue(errors, `${label}.feedbackTag`, "feedbackTag is required");
  } else if (!isStableId(record.feedbackTag)) {
    addIssue(errors, `${label}.feedbackTag`, "feedbackTag must be a stable ID and cannot be Chinese display text");
  }
  if (!record.scene) {
    addIssue(errors, `${label}.scene`, "scene is required");
  } else if (hasChinese(record.scene)) {
    addIssue(errors, `${label}.scene`, "scene must not be Chinese display text");
  }
  if (!Object.prototype.hasOwnProperty.call(record, "zhCN")) {
    addIssue(errors, `${label}.zhCN`, "zhCN field is required");
  }
  if (typeof record.enabled !== "boolean") {
    addIssue(errors, `${label}.enabled`, "enabled must be boolean");
  }
  ["minScore", "maxScore"].forEach(field => {
    const value = record[field];
    if (value !== null && typeof value !== "number") {
      addIssue(errors, `${label}.${field}`, `${field} must be number or null`);
    }
  });
  if (record.enabled === true && record.zhCN === "") {
    addIssue(errors, `${label}.zhCN`, "enabled text must not have empty zhCN");
  }
  if (record.notes !== undefined && hasChinese(textId) && record.notes) {
    addIssue(warnings, label, "notes is producer-only metadata; textId must remain the mechanism key");
  }
}

function validateIndexObject(indexName, index, textsById, errors) {
  if (!isPlainObject(index)) return;

  Object.entries(index).forEach(([key, ids]) => {
    if (hasChinese(key)) {
      addIssue(errors, `${indexName}.${key}`, "index key must not be Chinese display text");
    }
    if (!Array.isArray(ids)) {
      addIssue(errors, `${indexName}.${key}`, "index value must be an array of textIds");
      return;
    }

    const seen = new Set();
    ids.forEach((textId, indexPosition) => {
      const idLabel = `${indexName}.${key}[${indexPosition}]`;
      if (typeof textId !== "string") {
        addIssue(errors, idLabel, "indexed textId must be a string");
        return;
      }
      if (seen.has(textId)) {
        addIssue(errors, idLabel, `duplicate indexed textId "${textId}"`);
      }
      seen.add(textId);
      if (!textsById[textId]) {
        addIssue(errors, idLabel, `index points to missing textId "${textId}"`);
      }
    });
  });
}

function validateRequiredMembership(textsById, indexName, index, fieldName, errors) {
  if (!isPlainObject(index)) return;

  Object.values(textsById).forEach(record => {
    if (!isPlainObject(record)) return;
    const key = record[fieldName];
    const textId = record.textId;
    if (!key || !textId) return;

    if (!Array.isArray(index[key]) || !index[key].includes(textId)) {
      addIssue(errors, `${indexName}.${key}`, `missing textId "${textId}" for ${fieldName} "${key}"`);
    }
  });
}

function validateEnabledIndex(indexName, index, textsById, errors) {
  if (!isPlainObject(index)) return;
  validateIndexObject(indexName, index, textsById, errors);

  Object.entries(index).forEach(([key, ids]) => {
    if (!Array.isArray(ids)) return;
    ids.forEach((textId, indexPosition) => {
      const record = textsById[textId];
      if (record && record.enabled !== true) {
        addIssue(errors, `${indexName}.${key}[${indexPosition}]`, `disabled textId "${textId}" must not be in enabled index`);
      }
    });
  });
}

function validateGeneratedFeedbackData(filePath) {
  const errors = [];
  const warnings = [];
  const { resolvedPath, data } = readJson(filePath, errors);

  validateTopLevel(data, errors);
  if (!isPlainObject(data)) {
    return {
      file: resolvedPath,
      errors,
      warnings,
      info: { texts: 0, tags: 0, scenes: 0 }
    };
  }

  validateMetadata(data.metadata, errors);

  const textsById = isPlainObject(data.textsById) ? data.textsById : {};
  Object.entries(textsById).forEach(([textId, record]) => {
    validateTextRecord(textId, record, errors, warnings);
  });

  validateIndexObject("textsByTag", data.textsByTag, textsById, errors);
  validateRequiredMembership(textsById, "textsByTag", data.textsByTag, "feedbackTag", errors);
  validateIndexObject("textsByScene", data.textsByScene, textsById, errors);
  validateRequiredMembership(textsById, "textsByScene", data.textsByScene, "scene", errors);

  validateEnabledIndex("enabledTextIdsByTag", data.enabledTextIdsByTag, textsById, errors);
  validateEnabledIndex("enabledTextIdsByScene", data.enabledTextIdsByScene, textsById, errors);

  return {
    file: resolvedPath,
    errors,
    warnings,
    info: {
      texts: Object.keys(textsById).length,
      tags: isPlainObject(data.textsByTag) ? Object.keys(data.textsByTag).length : 0,
      scenes: isPlainObject(data.textsByScene) ? Object.keys(data.textsByScene).length : 0
    }
  };
}

function printReport(result) {
  console.log("Generated feedback data validation");
  console.log(`File: ${result.file}`);
  console.log(`Texts: ${result.info.texts}`);
  console.log(`Tags: ${result.info.tags}`);
  console.log(`Scenes: ${result.info.scenes}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

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
  const [, , generatedPath] = process.argv;

  if (!generatedPath) {
    usage();
    process.exitCode = 1;
    return;
  }

  const result = validateGeneratedFeedbackData(generatedPath);
  printReport(result);
  process.exitCode = result.errors.length ? 1 : 0;
}

main();
