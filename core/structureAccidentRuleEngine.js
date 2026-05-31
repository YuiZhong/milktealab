(function() {
const { pick } = window.MILK_TEA_LAB_HELPERS;
const { structureAccidentRules } = window.MILK_TEA_LAB_STRUCTURE_ACCIDENT_RULES;

const conditionChecks = {
  solidLoadMin: (structure, value) => structure.solidLoad >= value,
  strawResistanceMin: (structure, value) => structure.strawResistance >= value,
  drinkabilityMax: (structure, value) => structure.drinkability <= value,
  baseLiquidRatioMax: (structure, value) => structure.baseLiquidRatio <= value,
  textureRatioMin: (structure, value) => structure.textureRatio >= value,
  textureBalanceMax: (structure, value) => structure.textureBalance <= value,
  requiredTags: (structure, value) => value.every(tag => structure.tags.includes(tag)),
  blockedTags: (structure, value) => value.every(tag => !structure.tags.includes(tag))
};

function matchesConditions(structure, conditions = {}) {
  return Object.entries(conditions).every(([key, value]) => {
    const check = conditionChecks[key];
    return check ? check(structure, value) : true;
  });
}

function evaluateStructureAccidentRules(structure) {
  if (!structure) return [];

  return structureAccidentRules
    .filter(rule => matchesConditions(structure, rule.conditions))
    .map(rule => ({
      id: rule.id,
      type: rule.type,
      cap: rule.cap,
      score: rule.score,
      add: { ...rule.add },
      note: pick(rule.notes),
      tags: [...rule.tags]
    }));
}

window.MILK_TEA_LAB_STRUCTURE_ACCIDENT_RULE_ENGINE = {
  evaluateStructureAccidentRules
};
})();
