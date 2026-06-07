#!/usr/bin/env node
"use strict";

const {
  scoringRegistryMetadata,
  sourceLayers,
  severityLevels,
  scoreRuleStatuses,
  pressureKeys,
  triggerMetrics,
  scoreRules
} = require("../../data/scoringRuleRegistry.js");

const ALLOWED_AVAILABILITY = new Set([
  "observed",
  "observed_summary_metric_proxy",
  "draft_profile_only",
  "missing_summary_mapping"
]);

const FORBIDDEN_STATUS_TEXT = [
  "approved",
  "active",
  "runtime",
  "final",
  "enabled"
];

const FORBIDDEN_KEY_TEXT = [
  "display",
  "displayName",
  "name",
  "sample",
  "recipe",
  "golden",
  "ingredient",
  "zh",
  "cn"
];

const PRESSURE_KEY_PATTERN = /^[a-z][A-Za-z0-9]*$/;
const TRIGGER_METRIC_PATTERN = /^[a-z][A-Za-z0-9]*$/;
const RULE_ID_PATTERN = /^draft_[a-z0-9]+(?:_[a-z0-9]+)*$/;
const NON_ASCII_PATTERN = /[^\x00-\x7F]/;

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasForbiddenText(value) {
  if (!isNonEmptyString(value)) return false;
  return FORBIDDEN_KEY_TEXT.some(fragment => value.includes(fragment));
}

function hasForbiddenStatus(value) {
  if (!isNonEmptyString(value)) return true;
  if (scoreRuleStatuses.includes(value)) return false;
  const normalized = value.toLowerCase();
  return FORBIDDEN_STATUS_TEXT.some(fragment => normalized.includes(fragment));
}

function requireFalse(entry, field, label, errors) {
  if (entry[field] !== false) {
    errors.push(`${label}.${field} must be false`);
  }
}

function requireRegistryFalse(field, errors) {
  if (scoringRegistryMetadata?.[field] !== false) {
    errors.push(`scoringRegistryMetadata.${field} must be false`);
  }
}

function validateAllowedValues(errors) {
  if (!Array.isArray(sourceLayers) || sourceLayers.length === 0) {
    errors.push("sourceLayers should be a non-empty array");
  }

  if (!Array.isArray(severityLevels) || severityLevels.length === 0) {
    errors.push("severityLevels should be a non-empty array");
  }

  if (!Array.isArray(scoreRuleStatuses) || scoreRuleStatuses.length === 0) {
    errors.push("scoreRuleStatuses should be a non-empty array");
  }

  const statusSet = new Set(scoreRuleStatuses);
  ["draft_non_final", "review_only", "disabled", "deprecated"].forEach(status => {
    if (!statusSet.has(status)) {
      errors.push(`scoreRuleStatuses is missing ${status}`);
    }
  });

  scoreRuleStatuses.forEach(status => {
    if (hasForbiddenStatus(status)) {
      errors.push(`scoreRuleStatus must not contain runtime / final wording: ${status}`);
    }
  });

  const severitySet = new Set(severityLevels);
  ["info", "light", "medium", "heavy", "critical"].forEach(level => {
    if (!severitySet.has(level)) {
      errors.push(`severityLevels is missing ${level}`);
    }
  });
}

function validateMetadata(errors) {
  if (!isPlainObject(scoringRegistryMetadata)) {
    errors.push("scoringRegistryMetadata should be a plain object");
    return;
  }

  [
    "canAffectFinalScore",
    "canAffectRuntime",
    "canAffectGoldenExpected",
    "activeValidator",
    "runtimeData",
    "generatedData"
  ].forEach(field => requireRegistryFalse(field, errors));
}

function validateKeyShape(value, pattern, label, errors) {
  if (!isNonEmptyString(value)) {
    errors.push(`${label} should be a non-empty string`);
    return;
  }

  if (!pattern.test(value)) {
    errors.push(`${label} has invalid shape: ${value}`);
  }

  if (NON_ASCII_PATTERN.test(value)) {
    errors.push(`${label} must not contain non-ASCII / display text: ${value}`);
  }

  if (/\s/.test(value)) {
    errors.push(`${label} must not contain whitespace: ${value}`);
  }

  if (hasForbiddenText(value)) {
    errors.push(`${label} must not contain display/sample/ingredient wording: ${value}`);
  }
}

function validateSharedEntry(entry, label, errors) {
  if (!isPlainObject(entry)) {
    errors.push(`${label} should be a plain object`);
    return false;
  }

  if (!scoreRuleStatuses.includes(entry.status)) {
    errors.push(`${label}.status should be one of: ${scoreRuleStatuses.join(", ")}`);
  }

  if (hasForbiddenStatus(entry.status)) {
    errors.push(`${label}.status must not contain approved / active / runtime / final wording`);
  }

  if (!sourceLayers.includes(entry.sourceLayer)) {
    errors.push(`${label}.sourceLayer should be one of: ${sourceLayers.join(", ")}`);
  }

  ["canAffectFinalScore", "canAffectRuntime", "canAffectGoldenExpected"].forEach(field =>
    requireFalse(entry, field, label, errors)
  );

  return true;
}

function validateUnique(items, keyName, label, errors) {
  if (!Array.isArray(items)) {
    errors.push(`${label} should be an array`);
    return new Set();
  }

  const seen = new Set();
  items.forEach((entry, index) => {
    const key = entry?.[keyName];
    if (!isNonEmptyString(key)) return;
    if (seen.has(key)) {
      errors.push(`${label}.${key} is duplicated`);
    }
    seen.add(key);
  });
  return seen;
}

function validatePressureKeys(errors) {
  const seen = validateUnique(pressureKeys, "key", "pressureKeys", errors);
  if (!Array.isArray(pressureKeys)) return seen;

  pressureKeys.forEach((entry, index) => {
    const label = `pressureKeys[${index}]`;
    if (!validateSharedEntry(entry, label, errors)) return;
    validateKeyShape(entry.key, PRESSURE_KEY_PATTERN, `${label}.key`, errors);

    if (!ALLOWED_AVAILABILITY.has(entry.availability)) {
      errors.push(`${label}.availability should be one of: ${Array.from(ALLOWED_AVAILABILITY).join(", ")}`);
    }

    if (!Array.isArray(entry.triggerMetrics)) {
      errors.push(`${label}.triggerMetrics should be an array`);
    }
  });

  return seen;
}

function validateTriggerMetrics(errors) {
  const seen = validateUnique(triggerMetrics, "key", "triggerMetrics", errors);
  if (!Array.isArray(triggerMetrics)) return seen;

  triggerMetrics.forEach((entry, index) => {
    const label = `triggerMetrics[${index}]`;
    if (!validateSharedEntry(entry, label, errors)) return;
    validateKeyShape(entry.key, TRIGGER_METRIC_PATTERN, `${label}.key`, errors);

    if (!ALLOWED_AVAILABILITY.has(entry.availability)) {
      errors.push(`${label}.availability should be one of: ${Array.from(ALLOWED_AVAILABILITY).join(", ")}`);
    }
  });

  return seen;
}

function validateScoreRules(knownPressureKeys, knownTriggerMetrics, errors) {
  validateUnique(scoreRules, "ruleId", "scoreRules", errors);
  if (!Array.isArray(scoreRules)) return;

  scoreRules.forEach((entry, index) => {
    const label = `scoreRules[${index}]`;
    if (!validateSharedEntry(entry, label, errors)) return;
    validateKeyShape(entry.ruleId, RULE_ID_PATTERN, `${label}.ruleId`, errors);

    if (!knownPressureKeys.has(entry.pressureKey)) {
      errors.push(`${label}.pressureKey is not registered: ${entry.pressureKey}`);
    }

    if (!knownTriggerMetrics.has(entry.triggerMetric)) {
      errors.push(`${label}.triggerMetric is not registered: ${entry.triggerMetric}`);
    }

    if (!Array.isArray(entry.severityLevels) || entry.severityLevels.length === 0) {
      errors.push(`${label}.severityLevels should be a non-empty array`);
    } else {
      entry.severityLevels.forEach(level => {
        if (!severityLevels.includes(level)) {
          errors.push(`${label}.severityLevels contains unknown level: ${level}`);
        }
      });
    }
  });
}

function validateRegistry() {
  const errors = [];

  validateMetadata(errors);
  validateAllowedValues(errors);
  const knownPressureKeys = validatePressureKeys(errors);
  const knownTriggerMetrics = validateTriggerMetrics(errors);
  validateScoreRules(knownPressureKeys, knownTriggerMetrics, errors);

  return errors;
}

function main() {
  const errors = validateRegistry();

  if (errors.length > 0) {
    console.error("Scoring rule registry check failed:");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Scoring rule registry check passed.");
  console.log(`Checked ${pressureKeys.length} pressure keys.`);
  console.log(`Checked ${triggerMetrics.length} trigger metrics.`);
  console.log(`Checked ${scoreRules.length} score rule entries.`);
  console.log("No active / final / approved statuses.");
  console.log("All registry entries are blocked from final score, runtime, and golden expected.");
}

main();
