(function() {
const schemaVersion = "drinkTypeComposer.v0.0.8.29";

const allowedBroadTypeIds = new Set([
  "milk_tea",
  "fruit_tea",
  "fruit_drink",
  "sparkling_fruit_drink",
  "coffee_drink",
  "coffee_milk_drink",
  "dessert_milk_drink",
  "composed_drink",
  "flavor_conflict",
  "novelty_experiment",
  "taste_overload",
  "texture_accident"
]);

const typeRules = [
  {
    ruleId: "sparkling_plus_fruit",
    drinkTypeId: "sparkling_fruit_drink",
    broadTypeLabel: "气泡果饮",
    requiredTags: ["sparkling", "fruit"],
    priority: 96,
    labelMode: "single_primary_plus_suffix",
    labelSuffix: "气泡果饮"
  },
  {
    ruleId: "tea_plus_fruit",
    drinkTypeId: "fruit_tea",
    broadTypeLabel: "水果茶",
    requiredTags: ["tea", "fruit"],
    requiredBaseTags: ["tea_base"],
    priority: 92,
    labelMode: "single_primary_plus_suffix",
    labelSuffix: "茶"
  },
  {
    ruleId: "tea_plus_dairy",
    drinkTypeId: "milk_tea",
    broadTypeLabel: "奶茶",
    requiredTags: ["tea", "dairy"],
    requiredBaseTags: ["tea_base", "dairy_base"],
    priority: 94,
    labelMode: "base_only"
  },
  {
    ruleId: "bean_brew_plus_dairy",
    drinkTypeId: "coffee_milk_drink",
    broadTypeLabel: "咖啡乳饮",
    requiredTags: ["coffee", "dairy"],
    requiredBaseTags: ["coffee_base", "dairy_base"],
    priority: 84,
    labelMode: "base_only",
    baseLabel: "咖啡牛奶"
  },
  {
    ruleId: "fruit_plus_water",
    drinkTypeId: "fruit_drink",
    broadTypeLabel: "果饮",
    requiredTags: ["fruit", "water"],
    requiredBaseTags: ["water_base"],
    priority: 78,
    labelMode: "single_primary_plus_suffix",
    labelSuffix: "果饮"
  },
  {
    ruleId: "bean_brew_base",
    drinkTypeId: "coffee_drink",
    broadTypeLabel: "咖啡饮",
    requiredTags: ["coffee"],
    requiredBaseTags: ["coffee_base"],
    priority: 58,
    labelMode: "base_only"
  },
  {
    ruleId: "dairy_plus_dessert",
    drinkTypeId: "dessert_milk_drink",
    broadTypeLabel: "奶感甜品饮",
    requiredTags: ["dairy", "dessert"],
    priority: 54,
    labelMode: "single_primary_plus_suffix",
    labelSuffix: "牛奶"
  }
];

const modifierOrder = new Map([
  ["brown_sugar", 10],
  ["caramel", 12],
  ["honey", 14],
  ["sea_salt", 16],
  ["pearl", 20],
  ["grass_jelly", 22],
  ["taro_ball", 24],
  ["taro_paste", 26],
  ["coconut_jelly", 28],
  ["pudding", 30],
  ["oreo", 32],
  ["cheese_foam", 34],
  ["cream", 40]
]);

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function getCompositionApi() {
  return window.MILK_TEA_LAB_INGREDIENT_COMPOSITION_TAGS || null;
}

function cloneTags(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getIngredientId(item) {
  return item && typeof item.ingredientId === "string" ? item.ingredientId : null;
}

function collectRecipeItems(input) {
  return Array.isArray(input.recipeItems)
    ? input.recipeItems.map(item => ({
      ingredientId: getIngredientId(item),
      ratio: isNumber(item?.ratio) ? item.ratio : null
    }))
    : [];
}

function buildTaggedEntries(recipeItems, warnings) {
  const api = getCompositionApi();
  if (!api?.getIngredientCompositionTags) {
    warnings.push("drink_type_composer_missing_composition_tag_api");
    return [];
  }

  return recipeItems
    .map((item, index) => {
      if (!item.ingredientId) {
        warnings.push(`drink_type_composer_missing_ingredient_id:${index}`);
        return null;
      }
      const entry = api.getIngredientCompositionTags(item.ingredientId);
      if (!entry) {
        warnings.push(`drink_type_composer_missing_composition_tags:${item.ingredientId}`);
        return null;
      }
      return {
        ...entry,
        ratio: item.ratio,
        compositionTags: cloneTags(entry.compositionTags),
        roleTags: cloneTags(entry.roleTags),
        baseTags: cloneTags(entry.baseTags),
        identityTags: cloneTags(entry.identityTags),
        labelPart: entry.labelPart || {}
      };
    })
    .filter(Boolean);
}

function collectTagSet(entries, fields) {
  return new Set(entries.flatMap(entry => fields.flatMap(field => cloneTags(entry[field]))));
}

function hasAllTags(tagSet, requiredTags) {
  return requiredTags.every(tag => tagSet.has(tag));
}

function findBestRule(tagSet, baseTagSet) {
  return typeRules
    .filter(rule => hasAllTags(tagSet, rule.requiredTags) && hasAllTags(baseTagSet, rule.requiredBaseTags || []))
    .sort((left, right) => right.priority - left.priority)[0] || null;
}

function getLabelText(entry) {
  return typeof entry?.labelPart?.zh === "string" ? entry.labelPart.zh : "";
}

function canEnterLabel(entry) {
  return entry && entry.excludeFromComposedTypeLabel !== true && getLabelText(entry);
}

function getPrimaryIdentityEntries(entries) {
  return entries
    .filter(entry => entry.displayRole === "primary_identity" && canEnterLabel(entry))
    .sort((left, right) => (right.ratio || 0) - (left.ratio || 0));
}

function modifierPriority(entry) {
  const keys = [...cloneTags(entry.identityTags), ...cloneTags(entry.compositionTags)];
  const known = keys
    .map(key => modifierOrder.has(key) ? modifierOrder.get(key) : null)
    .filter(isNumber);
  return known.length ? Math.min(...known) : 100;
}

function getModifierEntries(entries) {
  return entries
    .filter(entry => entry.displayRole === "modifier" && canEnterLabel(entry))
    .sort((left, right) => {
      const priorityDelta = modifierPriority(left) - modifierPriority(right);
      if (priorityDelta !== 0) return priorityDelta;
      return (right.ratio || 0) - (left.ratio || 0);
    });
}

function buildBaseLabel(rule, primaryEntries) {
  const fallback = rule?.baseLabel || rule?.broadTypeLabel || "实验特调";
  const firstPrimary = primaryEntries[0];
  if (!rule || !firstPrimary || primaryEntries.length !== 1) return fallback;
  if (rule.labelMode !== "single_primary_plus_suffix") return fallback;
  return `${getLabelText(firstPrimary)}${rule.labelSuffix || ""}`;
}

function isEntryCoveredByBaseLabel(entry, baseLabel) {
  const label = getLabelText(entry);
  return Boolean(label && baseLabel && baseLabel.includes(label));
}

function getVisiblePrimaryEntries(primaryEntries, baseLabel) {
  return primaryEntries.filter(entry => !isEntryCoveredByBaseLabel(entry, baseLabel));
}

function buildLabel(rule, entries, reasonCodes, warnings) {
  const primaryEntries = getPrimaryIdentityEntries(entries);
  const modifierEntries = getModifierEntries(entries);
  const visibleModifiers = modifierEntries.slice(0, 2);
  const baseLabel = buildBaseLabel(rule, primaryEntries);
  const visiblePrimaryEntries = getVisiblePrimaryEntries(primaryEntries, baseLabel).slice(0, 2);
  const visibleIdentityEntries = [...visibleModifiers, ...visiblePrimaryEntries];
  const modifierPrefix = modifierEntries.length > 3
    ? "多料"
    : visibleIdentityEntries.map(getLabelText).join("");

  if (modifierEntries.length > 3) {
    warnings.push("drink_type_composer_many_modifiers_used_multi_label");
    reasonCodes.push("modifier_strategy:multi_label");
  } else if (visibleModifiers.length) {
    reasonCodes.push(`modifier_count:${visibleModifiers.length}`);
  }
  if (visiblePrimaryEntries.length) {
    reasonCodes.push(`primary_identity_count:${visiblePrimaryEntries.length}`);
  }

  const labelParts = [
    ...visibleModifiers.map(entry => ({
      source: "modifier",
      ingredientId: entry.ingredientId,
      text: getLabelText(entry)
    })),
    ...visiblePrimaryEntries.map(entry => ({
      source: "primary_identity",
      ingredientId: entry.ingredientId,
      text: getLabelText(entry)
    })),
    {
      source: "base",
      ingredientId: null,
      text: baseLabel
    }
  ];

  return {
    composedTypeLabel: `${modifierPrefix}${baseLabel}`,
    labelParts
  };
}

function getPressure(unifiedScoring, pressureKey) {
  const pressures = Array.isArray(unifiedScoring?.pressures) ? unifiedScoring.pressures : [];
  return pressures.find(pressure => pressure?.pressureKey === pressureKey) || null;
}

function shouldUseFlavorFallback(input, entries) {
  const pressure = getPressure(input.unifiedScoring, "strongIdentityPressure");
  const severePressure = pressure && (pressure.severityLevel === "heavy" || pressure.severityLevel === "critical" || pressure.adjustedPenalty >= 18);
  const strongEntries = entries.filter(entry => {
    const tags = collectTagSet([entry], ["compositionTags", "identityTags"]);
    return tags.has("strong_identity") || tags.has("controversial");
  });
  return Boolean(severePressure || strongEntries.length >= 3);
}

function buildFallback(reason, reasonCodes, warnings, drinkTypeId = "novelty_experiment", label = "实验特调") {
  if (!allowedBroadTypeIds.has(drinkTypeId)) {
    warnings.push(`drink_type_composer_unregistered_broad_type:${drinkTypeId}`);
  }
  reasonCodes.push(reason);
  return {
    schemaVersion,
    playtestOnly: true,
    drinkTypeId,
    composedTypeLabel: label,
    broadTypeLabel: label,
    identityTags: [],
    modifierIdentityTags: [],
    labelParts: [{ source: "fallback", ingredientId: null, text: label }],
    confidence: "low",
    reasonCodes,
    fallbackReason: reason,
    warnings
  };
}

function composeDrinkType(input = {}) {
  const warnings = [
    "playtest drink type composer only; not final production taxonomy.",
    "uses stable ingredientId composition tags; labelPart is display-only."
  ];
  const reasonCodes = [];
  const recipeItems = collectRecipeItems(input);
  const entries = buildTaggedEntries(recipeItems, warnings);

  if (!entries.length) {
    return buildFallback("fallback:no_composition_entries", reasonCodes, warnings);
  }

  const tagSet = collectTagSet(entries, ["compositionTags", "roleTags", "baseTags", "identityTags"]);
  const baseTagSet = collectTagSet(entries, ["baseTags"]);
  const bestRule = findBestRule(tagSet, baseTagSet);
  const identityTags = uniqueItems(entries.flatMap(entry => entry.identityTags));
  const modifierEntries = getModifierEntries(entries);
  const modifierIdentityTags = uniqueItems(modifierEntries.flatMap(entry => entry.identityTags));

  if (shouldUseFlavorFallback(input, entries)) {
    return {
      ...buildFallback("fallback:strong_identity_pressure", reasonCodes, warnings, "flavor_conflict", "风味冲突"),
      identityTags,
      modifierIdentityTags
    };
  }

  if (!bestRule) {
    return {
      ...buildFallback("fallback:no_matching_broad_rule", reasonCodes, warnings),
      identityTags,
      modifierIdentityTags
    };
  }

  if (!allowedBroadTypeIds.has(bestRule.drinkTypeId)) {
    warnings.push(`drink_type_composer_unregistered_broad_type:${bestRule.drinkTypeId}`);
  }

  reasonCodes.push(`matched_rule:${bestRule.ruleId}`);
  const label = buildLabel(bestRule, entries, reasonCodes, warnings);
  const confidence = warnings.some(warning => warning.includes("missing")) ? "medium" : "high";

  return {
    schemaVersion,
    playtestOnly: true,
    drinkTypeId: bestRule.drinkTypeId,
    composedTypeLabel: label.composedTypeLabel,
    broadTypeLabel: bestRule.broadTypeLabel,
    identityTags,
    modifierIdentityTags,
    labelParts: label.labelParts,
    confidence,
    reasonCodes,
    fallbackReason: null,
    warnings
  };
}

window.MILK_TEA_LAB_DRINK_TYPE_COMPOSER = {
  composeDrinkType
};
})();
