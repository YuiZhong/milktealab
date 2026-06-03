(function(root) {
const ADAPTER_VERSION = "feedbackRuntimeAdapter.v0.0.7.12";
const REQUIRED_TEXT_FIELDS = ["textId", "feedbackTag", "scene", "enabled"];
const FILTER_FIELDS = ["scene", "feedbackTag", "tone", "accidentTypeId", "drinkTypeId", "outcomeTypeId"];

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function isFilled(value) {
  return value !== undefined && value !== null && value !== "";
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function cloneText(record) {
  return record ? Object.freeze({ ...record }) : null;
}

function cloneTexts(records) {
  return Object.freeze(records.map(cloneText));
}

function addIssue(issues, path, message) {
  issues.push({ path, message });
}

function validateGeneratedData(data) {
  const issues = [];

  if (!isPlainObject(data)) {
    addIssue(issues, "root", "generated feedback data must be an object");
    return issues;
  }

  ["textsById", "textsByTag", "textsByScene", "metadata"].forEach(field => {
    if (!isPlainObject(data[field])) {
      addIssue(issues, field, `${field} must be an object`);
    }
  });

  if (!isPlainObject(data.textsById)) return issues;

  Object.entries(data.textsById).forEach(([textId, record]) => {
    const label = `textsById.${textId}`;
    if (!isPlainObject(record)) {
      addIssue(issues, label, "text record must be an object");
      return;
    }
    if (record.textId !== textId) {
      addIssue(issues, label, "object key must match item.textId");
    }
    REQUIRED_TEXT_FIELDS.forEach(field => {
      if (!hasOwn(record, field)) {
        addIssue(issues, `${label}.${field}`, `${field} is required`);
      }
    });
    if (typeof record.textId !== "string") {
      addIssue(issues, `${label}.textId`, "textId must be a string");
    }
    if (typeof record.feedbackTag !== "string") {
      addIssue(issues, `${label}.feedbackTag`, "feedbackTag must be a string");
    }
    if (typeof record.scene !== "string") {
      addIssue(issues, `${label}.scene`, "scene must be a string");
    }
    if (typeof record.enabled !== "boolean") {
      addIssue(issues, `${label}.enabled`, "enabled must be boolean");
    }
  });

  return issues;
}

function getIndexIds(data, indexName, key) {
  const index = data[indexName];
  const ids = isPlainObject(index) ? index[key] : null;
  return Array.isArray(ids) ? ids : [];
}

function getRecordsByIds(textsById, ids) {
  return ids.map(textId => textsById[textId]).filter(Boolean);
}

function scoreIncludes(record, score) {
  const minScore = typeof record.minScore === "number" ? record.minScore : -Infinity;
  const maxScore = typeof record.maxScore === "number" ? record.maxScore : Infinity;
  return score >= minScore && score <= maxScore;
}

function scoreRangeOverlaps(record, minScore, maxScore) {
  const recordMin = typeof record.minScore === "number" ? record.minScore : -Infinity;
  const recordMax = typeof record.maxScore === "number" ? record.maxScore : Infinity;
  const queryMin = typeof minScore === "number" ? minScore : -Infinity;
  const queryMax = typeof maxScore === "number" ? maxScore : Infinity;
  return recordMax >= queryMin && recordMin <= queryMax;
}

function matchesFilters(record, filters = {}) {
  if (!record) return false;

  if (filters.enabledOnly !== false && record.enabled !== true) {
    return false;
  }

  const hasScore = typeof filters.score === "number";
  if (hasScore && !scoreIncludes(record, filters.score)) {
    return false;
  }

  const hasScoreRange = typeof filters.minScore === "number" || typeof filters.maxScore === "number";
  if (!hasScore && hasScoreRange && !scoreRangeOverlaps(record, filters.minScore, filters.maxScore)) {
    return false;
  }

  return FILTER_FIELDS.every(field => !isFilled(filters[field]) || record[field] === filters[field]);
}

function filterRecords(records, options = {}) {
  const filters = {
    ...options,
    enabledOnly: options.includeDisabled === true ? false : options.enabledOnly
  };
  return records.filter(record => matchesFilters(record, filters));
}

function createUnavailableAdapter(metadata) {
  const frozenMetadata = Object.freeze(cloneJson(metadata));
  const emptyTexts = Object.freeze([]);

  return Object.freeze({
    isAvailable: () => false,
    getTextById: () => null,
    getTextsByTag: () => emptyTexts,
    getTextsByScene: () => emptyTexts,
    getEnabledTexts: () => emptyTexts,
    getMetadata: () => cloneJson(frozenMetadata)
  });
}

function createFeedbackRuntimeAdapter(generatedFeedbackData) {
  const issues = validateGeneratedData(generatedFeedbackData);
  const baseMetadata = {
    adapterVersion: ADAPTER_VERSION,
    readonly: true,
    available: issues.length === 0,
    issues,
    generatedMetadata: cloneJson(generatedFeedbackData?.metadata || null)
  };

  if (issues.length) {
    return createUnavailableAdapter(baseMetadata);
  }

  const data = generatedFeedbackData;
  const textsById = data.textsById;

  function getTextById(textId) {
    if (typeof textId !== "string") return null;
    return cloneText(textsById[textId] || null);
  }

  function getTextsByTag(feedbackTag, options = {}) {
    if (typeof feedbackTag !== "string") return Object.freeze([]);
    const indexName = options.includeDisabled === true ? "textsByTag" : "enabledTextIdsByTag";
    const fallbackIndexName = "textsByTag";
    const ids = getIndexIds(data, indexName, feedbackTag);
    const fallbackIds = ids.length ? ids : getIndexIds(data, fallbackIndexName, feedbackTag);
    return cloneTexts(filterRecords(getRecordsByIds(textsById, fallbackIds), {
      ...options,
      feedbackTag
    }));
  }

  function getTextsByScene(scene, options = {}) {
    if (typeof scene !== "string") return Object.freeze([]);
    const indexName = options.includeDisabled === true ? "textsByScene" : "enabledTextIdsByScene";
    const fallbackIndexName = "textsByScene";
    const ids = getIndexIds(data, indexName, scene);
    const fallbackIds = ids.length ? ids : getIndexIds(data, fallbackIndexName, scene);
    return cloneTexts(filterRecords(getRecordsByIds(textsById, fallbackIds), {
      ...options,
      scene
    }));
  }

  function getEnabledTexts(filters = {}) {
    return cloneTexts(Object.values(textsById).filter(record => matchesFilters(record, {
      ...filters,
      enabledOnly: true
    })));
  }

  function getMetadata() {
    return cloneJson(baseMetadata);
  }

  return Object.freeze({
    isAvailable: () => true,
    getTextById,
    getTextsByTag,
    getTextsByScene,
    getEnabledTexts,
    getMetadata
  });
}

const api = {
  createFeedbackRuntimeAdapter
};

root.MILK_TEA_LAB_FEEDBACK_RUNTIME_ADAPTER = api;

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
})(typeof window !== "undefined" ? window : globalThis);
