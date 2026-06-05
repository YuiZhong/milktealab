#!/usr/bin/env node
"use strict";

const { stableIdRegistry } = require("../../data/stableIdRegistry.js");

const REQUIRED_FIELDS = [
  "id",
  "idFamily",
  "status",
  "humanMeaning",
  "sourceLayer",
  "sourceSummary",
  "triggerMetricCandidates",
  "evidenceNotes",
  "blockedEvidence",
  "boundaryNotes",
  "historicalLinks",
  "canEnterValidator",
  "canEnterGeneratedSeverity",
  "canAffectRuntime",
  "reviewNotes"
];

const ALLOWED_CURRENT_IDS = new Set([
  "taste_acid_overload",
  "texture_solid_overload"
]);

const EXPECTED_SOURCE_LAYERS = new Map([
  ["taste_acid_overload", "taste"],
  ["texture_solid_overload", "texture"]
]);

const ALLOWED_SOURCE_LAYERS = new Set([
  "taste",
  "texture"
]);

const ALLOWED_STATUS = "reviewed_candidate_not_approved";

const FORBIDDEN_STATUSES = new Set([
  "approved_stable",
  "approved stable",
  "active",
  "runtime_enabled"
]);

const FORBIDDEN_CURRENT_IDS = new Set([
  "texture_low_drinkability",
  "texture_straw_resistance",
  "texture_taro_overload",
  "texture_oreo_overload",
  "texture_topping_overload",
  "flavor_durian_overload",
  "dairy_fat_overload",
  "industrial_creamer_overload",
  "taste_strong_flavor_overload"
]);

const FORBIDDEN_ID_FAMILIES = new Set([
  "feedbackTag",
  "candidateTag",
  "outcomeTypeId",
  "drinkStructure"
]);

const REQUIRED_NON_EMPTY_ARRAY_FIELDS = [
  "triggerMetricCandidates",
  "evidenceNotes",
  "blockedEvidence",
  "boundaryNotes",
  "reviewNotes"
];

const LEGACY_TEXTURE_IDS = new Set([
  "texture_taro_overload",
  "texture_oreo_overload",
  "texture_topping_overload"
]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function validateEntry(entry, index, errors) {
  const label = isPlainObject(entry) && isNonEmptyString(entry.id) ? entry.id : `entry[${index}]`;

  if (!isPlainObject(entry)) {
    errors.push(`${label} should be a plain object`);
    return;
  }

  REQUIRED_FIELDS.forEach(field => {
    if (!(field in entry)) {
      errors.push(`${label} is missing required field: ${field}`);
    }
  });

  if (!ALLOWED_CURRENT_IDS.has(entry.id)) {
    errors.push(`${label} is not in the allowed current registry scaffold IDs`);
  }

  if (FORBIDDEN_CURRENT_IDS.has(entry.id)) {
    errors.push(`${label} is forbidden as a current registry scaffold entry`);
  }

  if (entry.idFamily !== "accidentTypeId") {
    errors.push(`${label}.idFamily should be accidentTypeId`);
  }

  if (FORBIDDEN_ID_FAMILIES.has(entry.idFamily)) {
    errors.push(`${label}.idFamily is forbidden in this accidentTypeId-only scaffold`);
  }

  if (entry.status !== ALLOWED_STATUS) {
    errors.push(`${label}.status should be ${ALLOWED_STATUS}`);
  }

  if (FORBIDDEN_STATUSES.has(entry.status)) {
    errors.push(`${label}.status must not be ${entry.status}`);
  }

  ["humanMeaning", "sourceLayer", "sourceSummary"].forEach(field => {
    if (!isNonEmptyString(entry[field])) {
      errors.push(`${label}.${field} should be a non-empty string`);
    }
  });

  if (!ALLOWED_SOURCE_LAYERS.has(entry.sourceLayer)) {
    errors.push(`${label}.sourceLayer should be one of: ${Array.from(ALLOWED_SOURCE_LAYERS).join(", ")}`);
  }

  const expectedSourceLayer = EXPECTED_SOURCE_LAYERS.get(entry.id);
  if (expectedSourceLayer && entry.sourceLayer !== expectedSourceLayer) {
    errors.push(`${label}.sourceLayer should be ${expectedSourceLayer}`);
  }

  REQUIRED_NON_EMPTY_ARRAY_FIELDS.forEach(field => {
    if (!hasStringArray(entry[field])) {
      errors.push(`${label}.${field} should be a non-empty string array`);
    }
  });

  if (!Array.isArray(entry.historicalLinks)) {
    errors.push(`${label}.historicalLinks should be an array`);
  } else {
    entry.historicalLinks.forEach((link, linkIndex) => {
      const linkLabel = `${label}.historicalLinks[${linkIndex}]`;

      if (!isPlainObject(link)) {
        errors.push(`${linkLabel} should be a plain object`);
        return;
      }

      if (!isNonEmptyString(link.id)) {
        errors.push(`${linkLabel}.id should be a non-empty string`);
      }

      if (!isNonEmptyString(link.relation)) {
        errors.push(`${linkLabel}.relation should be a non-empty string`);
      } else if (!link.relation.includes("historical")) {
        errors.push(`${linkLabel}.relation should include historical`);
      }
    });
  }

  if (entry.canEnterValidator !== false) {
    errors.push(`${label}.canEnterValidator must be false`);
  }

  if (entry.canEnterGeneratedSeverity !== false) {
    errors.push(`${label}.canEnterGeneratedSeverity must be false`);
  }

  if (entry.canAffectRuntime !== false) {
    errors.push(`${label}.canAffectRuntime must be false`);
  }
}

function validateRegistry(entries) {
  const errors = [];

  if (!Array.isArray(entries)) {
    return ["stableIdRegistry should export an array"];
  }

  const seenIds = new Set();

  entries.forEach((entry, index) => {
    validateEntry(entry, index, errors);

    if (isPlainObject(entry) && isNonEmptyString(entry.id)) {
      if (seenIds.has(entry.id)) {
        errors.push(`${entry.id} is duplicated`);
      }
      seenIds.add(entry.id);
    }
  });

  const unexpectedCurrentIds = Array.from(seenIds).filter(id => !ALLOWED_CURRENT_IDS.has(id));
  unexpectedCurrentIds.forEach(id => {
    errors.push(`${id} is not allowed in this minimal registry scaffold`);
  });

  ALLOWED_CURRENT_IDS.forEach(id => {
    if (!seenIds.has(id)) {
      errors.push(`${id} is missing from the minimal registry scaffold`);
    }
  });

  if (entries.length !== ALLOWED_CURRENT_IDS.size) {
    errors.push(`stableIdRegistry should contain exactly ${ALLOWED_CURRENT_IDS.size} entries`);
  }

  LEGACY_TEXTURE_IDS.forEach(id => {
    if (seenIds.has(id)) {
      errors.push(`${id} must remain historical and must not be a current registry entry`);
    }
  });

  return errors;
}

function main() {
  const errors = validateRegistry(stableIdRegistry);

  if (errors.length > 0) {
    console.error("Stable ID registry check failed:");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Stable ID registry check passed.");
  console.log(`Checked ${stableIdRegistry.length} entries.`);
  console.log("No approved_stable entries.");
  console.log("No runtime-enabled entries.");
  console.log("No forbidden current IDs.");
}

main();
