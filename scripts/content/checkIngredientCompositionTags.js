#!/usr/bin/env node
"use strict";

globalThis.window = globalThis.window || globalThis;

require("../../data/ingredients.js");

const {
  compositionTagMetadata,
  ingredientCompositionTags
} = require("../../data/ingredientCompositionTags.js");

const ingredientMeta = globalThis.MILK_TEA_LAB_INGREDIENTS?.ingredientMeta || {};

const ALLOWED_DISPLAY_ROLES = new Set([
  "base",
  "primary_identity",
  "modifier",
  "hidden_balance",
  "texture_only"
]);

const STABLE_TAG_PATTERN = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const FORBIDDEN_COMBO_TAGS = new Set([
  "peach_tea",
  "strawberry_tea",
  "lemon_tea",
  "durian_milk",
  "cocoa_milk",
  "matcha_milk",
  "pearl_milk_tea",
  "taro_ball_milk_tea",
  "grass_jelly_milk_tea",
  "coconut_jelly_fruit_drink"
]);
const FORBIDDEN_DISPLAY_TAGS = [
  "水果/风味",
  "茶类",
  "乳类",
  "液体",
  "调味",
  "小料",
  "桃子",
  "草莓",
  "榴莲",
  "珍珠",
  "奶茶"
];
const REQUIRED_ARRAY_FIELDS = [
  "compositionTags",
  "roleTags",
  "baseTags",
  "identityTags",
  "schemaGaps"
];
const REQUIRED_FIELDS = [
  "ingredientId",
  ...REQUIRED_ARRAY_FIELDS,
  "displayRole",
  "labelPart",
  "excludeFromComposedTypeLabel",
  "notes"
];
const CONCRETE_TOPPING_IDENTITY = new Map([
  ["topping_pearl", "pearl"],
  ["topping_coconut_jelly", "coconut_jelly"],
  ["topping_pudding", "pudding"],
  ["topping_grass_jelly", "grass_jelly"],
  ["topping_taro_ball", "taro_ball"],
  ["topping_oreo_crumble", "oreo"],
  ["topping_taro_paste", "taro_paste"],
  ["topping_cheese_foam", "cheese_foam"]
]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStableTags(tags, fieldLabel, errors) {
  if (!Array.isArray(tags)) {
    errors.push(`${fieldLabel} should be an array`);
    return;
  }

  tags.forEach(tag => {
    if (!isNonEmptyString(tag)) {
      errors.push(`${fieldLabel} contains empty/non-string tag`);
      return;
    }

    if (!STABLE_TAG_PATTERN.test(tag)) {
      errors.push(`${fieldLabel} contains non-stable tag: ${tag}`);
    }

    if (FORBIDDEN_COMBO_TAGS.has(tag)) {
      errors.push(`${fieldLabel} contains forbidden combo tag: ${tag}`);
    }

    if (FORBIDDEN_DISPLAY_TAGS.includes(tag)) {
      errors.push(`${fieldLabel} contains display text/category as key: ${tag}`);
    }

    if (/[\u4e00-\u9fff]/.test(tag)) {
      errors.push(`${fieldLabel} contains Chinese display text: ${tag}`);
    }

    if (/\s/.test(tag)) {
      errors.push(`${fieldLabel} contains whitespace: ${tag}`);
    }
  });
}

function validateEntry(entry, index, ingredientIds, errors) {
  const label = isPlainObject(entry) && isNonEmptyString(entry.ingredientId)
    ? entry.ingredientId
    : `entry[${index}]`;

  if (!isPlainObject(entry)) {
    errors.push(`${label} should be a plain object`);
    return;
  }

  REQUIRED_FIELDS.forEach(field => {
    if (!(field in entry)) {
      errors.push(`${label} is missing required field: ${field}`);
    }
  });

  if (!ingredientIds.has(entry.ingredientId)) {
    errors.push(`${label} is not present in data/ingredients.js`);
  }

  ["compositionTags", "roleTags", "identityTags"].forEach(field => {
    if (!Array.isArray(entry[field]) || entry[field].length === 0) {
      errors.push(`${label}.${field} should be a non-empty array`);
    }
  });

  REQUIRED_ARRAY_FIELDS.forEach(field => {
    validateStableTags(entry[field], `${label}.${field}`, errors);
  });

  if (!ALLOWED_DISPLAY_ROLES.has(entry.displayRole)) {
    errors.push(`${label}.displayRole should be one of: ${Array.from(ALLOWED_DISPLAY_ROLES).join(", ")}`);
  }

  if (typeof entry.excludeFromComposedTypeLabel !== "boolean") {
    errors.push(`${label}.excludeFromComposedTypeLabel should be boolean`);
  }

  if (!isPlainObject(entry.labelPart)) {
    errors.push(`${label}.labelPart should be a plain object`);
  } else if (!isNonEmptyString(entry.labelPart.zh)) {
    errors.push(`${label}.labelPart.zh should be a non-empty display string`);
  }

  if (!isNonEmptyString(entry.notes)) {
    errors.push(`${label}.notes should be a non-empty string`);
  }

  if (entry.ingredientId === "sweetener_white_sugar") {
    if (entry.displayRole !== "hidden_balance") {
      errors.push("sweetener_white_sugar.displayRole must be hidden_balance");
    }

    if (entry.excludeFromComposedTypeLabel !== true) {
      errors.push("sweetener_white_sugar.excludeFromComposedTypeLabel must be true");
    }
  }

  const requiredToppingIdentity = CONCRETE_TOPPING_IDENTITY.get(entry.ingredientId);
  if (requiredToppingIdentity) {
    if (entry.displayRole !== "modifier") {
      errors.push(`${label}.displayRole should be modifier for concrete topping identity`);
    }

    if (!entry.identityTags?.includes(requiredToppingIdentity)) {
      errors.push(`${label}.identityTags should include concrete identity ${requiredToppingIdentity}`);
    }

    if (entry.identityTags?.length === 1 && entry.identityTags[0] === "topping") {
      errors.push(`${label}.identityTags must not be only topping`);
    }
  }

  if (entry.ingredientId === "flavor_matcha") {
    if (entry.baseTags.includes("tea_base")) {
      errors.push("flavor_matcha must not be marked as tea_base");
    }

    if (entry.compositionTags.includes("fruit")) {
      errors.push("flavor_matcha must not inherit fruit composition from old UI category");
    }

    ["matcha", "dessert"].forEach(tag => {
      if (!entry.compositionTags.includes(tag)) {
        errors.push(`flavor_matcha.compositionTags should include ${tag}`);
      }
    });
  }

  if (entry.ingredientId === "flavor_cocoa") {
    if (entry.compositionTags.includes("fruit")) {
      errors.push("flavor_cocoa must not inherit fruit composition from old UI category");
    }

    ["cocoa", "dessert"].forEach(tag => {
      if (!entry.compositionTags.includes(tag)) {
        errors.push(`flavor_cocoa.compositionTags should include ${tag}`);
      }
    });
  }
}

function validateIngredientCompositionTags() {
  const errors = [];
  const ingredientIds = new Set(Object.values(ingredientMeta).map(meta => meta.id).filter(Boolean));

  if (!isPlainObject(compositionTagMetadata)) {
    errors.push("compositionTagMetadata should be a plain object");
  } else {
    [
      "runtimeData",
      "generatedData",
      "affectsScoring",
      "affectsGoldenExpected"
    ].forEach(field => {
      if (compositionTagMetadata[field] !== false) {
        errors.push(`compositionTagMetadata.${field} must be false`);
      }
    });
  }

  if (!Array.isArray(ingredientCompositionTags)) {
    errors.push("ingredientCompositionTags should be an array");
    return errors;
  }

  const seen = new Set();
  ingredientCompositionTags.forEach((entry, index) => {
    if (isPlainObject(entry) && isNonEmptyString(entry.ingredientId)) {
      if (seen.has(entry.ingredientId)) {
        errors.push(`${entry.ingredientId} is duplicated`);
      }
      seen.add(entry.ingredientId);
    }

    validateEntry(entry, index, ingredientIds, errors);
  });

  const missingIds = Array.from(ingredientIds).filter(id => !seen.has(id));
  const extraIds = Array.from(seen).filter(id => !ingredientIds.has(id));
  if (missingIds.length > 0) {
    errors.push(`missing ingredient composition tags: ${missingIds.join(", ")}`);
  }
  if (extraIds.length > 0) {
    errors.push(`extra ingredient composition tags: ${extraIds.join(", ")}`);
  }
  if (ingredientCompositionTags.length !== ingredientIds.size) {
    errors.push(`expected ${ingredientIds.size} entries, got ${ingredientCompositionTags.length}`);
  }

  return errors;
}

const errors = validateIngredientCompositionTags();

if (errors.length > 0) {
  console.error("Ingredient composition tag check failed:");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Ingredient composition tag check passed.");
console.log(`Checked ${ingredientCompositionTags.length} ingredient composition tag entries.`);
console.log("All tags are stable IDs; labelPart.zh is display-only.");
console.log("No recipe-combo drinkType tags or runtime/generated/golden gates.");
