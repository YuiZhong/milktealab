(function() {
const { multiIngredientRules } = window.MILK_TEA_LAB_COMBINATION_RULES;
const { comboRules } = window.MILK_TEA_LAB_SYNERGY_RULES;
const { has } = window.MILK_TEA_LAB_HELPERS;

function findComboMatches(kind, names) {
  return comboRules.filter(rule => rule.kind === kind && rule.names.every(name => has(name, names)));
}

function getTeaMixRule() {
  return multiIngredientRules.teaMix;
}

window.MILK_TEA_LAB_COMBINATION_ANALYZER = {
  findComboMatches,
  getTeaMixRule
};
})();
