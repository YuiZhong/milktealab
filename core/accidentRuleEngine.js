(function() {
const { pick } = window.MILK_TEA_LAB_HELPERS;
const { accidentRules } = window.MILK_TEA_LAB_ACCIDENT_RULES;

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
      if (matchedIngredients.has(rule.ingredient)) {
        return false;
      }
      const matched = matchesRatio(context.ratioOf(rule.ingredient), rule);
      if (matched) {
        matchedIngredients.add(rule.ingredient);
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
