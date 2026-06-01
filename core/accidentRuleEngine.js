(function() {
const { pick } = window.MILK_TEA_LAB_HELPERS;
const { accidentRules } = window.MILK_TEA_LAB_ACCIDENT_RULES;
const { resolveRuleIngredientRef, ratioOfRuleRef } = window.MILK_TEA_LAB_RULE_REF_HELPER;

function matchesRatio(ratio, rule) {
  if (typeof rule.ratioMinExclusive === "number" && ratio <= rule.ratioMinExclusive) {
    return false;
  }
  if (typeof rule.ratioMinInclusive === "number" && ratio < rule.ratioMinInclusive) {
    return false;
  }
  return true;
}

function evaluateAccidentRules(context) {
  const matchedIngredients = new Set();

  return accidentRules
    .filter(rule => {
      const meta = resolveRuleIngredientRef(rule);
      const ingredientKey = meta?.id || rule.ingredientId || rule.ingredientRef || rule.ingredient || rule.id;
      if (matchedIngredients.has(ingredientKey)) {
        return false;
      }
      const matched = matchesRatio(ratioOfRuleRef(context, rule), rule);
      if (matched) {
        matchedIngredients.add(ingredientKey);
      }
      return matched;
    })
    .map(rule => ({
      id: rule.id,
      type: rule.type,
      cap: rule.cap,
      score: rule.score,
      add: { ...rule.add },
      note: pick(rule.notes),
      tags: [...(rule.tags || [])]
    }));
}

window.MILK_TEA_LAB_ACCIDENT_RULE_ENGINE = {
  evaluateAccidentRules
};
})();
