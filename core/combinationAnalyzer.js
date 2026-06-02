(function() {
const { multiIngredientRules } = window.MILK_TEA_LAB_COMBINATION_RULES;
const { comboRules } = window.MILK_TEA_LAB_SYNERGY_RULES;
const { has } = window.MILK_TEA_LAB_HELPERS;
const { hasRuleRef } = window.MILK_TEA_LAB_RULE_REF_HELPER;

function getCombinationRuleRefs(rule) {
  if (!rule || typeof rule !== "object") return [];
  if (Array.isArray(rule.refs)) return rule.refs;
  if (Array.isArray(rule.ingredientRefs)) return rule.ingredientRefs;
  if (Array.isArray(rule.ingredientIds)) return rule.ingredientIds;
  if (Array.isArray(rule.names)) return rule.names;
  return [];
}

function hasAllCombinationRefs(context, refs) {
  if (!context || !Array.isArray(refs) || !refs.length) return false;
  return refs.every(ref => hasRuleRef(context, ref));
}

function hasAllLegacyNames(names, refs) {
  if (!Array.isArray(names) || !Array.isArray(refs) || !refs.length) return false;
  return refs.every(ref => typeof ref === "string" && has(ref, names));
}

function findComboMatches(kind, contextOrNames) {
  return comboRules.filter(rule => {
    const refs = getCombinationRuleRefs(rule);
    if (rule.kind !== kind) return false;
    if (Array.isArray(contextOrNames)) return hasAllLegacyNames(contextOrNames, refs);
    return hasAllCombinationRefs(contextOrNames, refs);
  });
}

function getTeaMixRule() {
  return multiIngredientRules.teaMix;
}

window.MILK_TEA_LAB_COMBINATION_ANALYZER = {
  findComboMatches,
  getCombinationRuleRefs,
  hasAllCombinationRefs,
  getTeaMixRule
};
})();
