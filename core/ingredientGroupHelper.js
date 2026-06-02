(function() {
const { ingredientGroups = {} } = window.MILK_TEA_LAB_SYNERGY_RULES || {};
const { resolveRuleIngredientRef, hasRuleRef, sumRuleRefs } = window.MILK_TEA_LAB_RULE_REF_HELPER;

function getIngredientGroupRefs(groupKey) {
  const refs = ingredientGroups[groupKey];
  return Array.isArray(refs) ? [...refs] : [];
}

function sumIngredientGroup(context, groupKey) {
  return sumRuleRefs(context, getIngredientGroupRefs(groupKey));
}

function hasAnyIngredientGroup(context, groupKey) {
  return getIngredientGroupRefs(groupKey).some(ref => hasRuleRef(context, ref));
}

function validateIngredientGroups() {
  const entries = Object.entries(ingredientGroups);
  const missingRefs = entries.flatMap(([groupKey, refs]) => {
    if (!Array.isArray(refs)) return [{ groupKey, ref: null }];
    return refs
      .filter(ref => !resolveRuleIngredientRef(ref))
      .map(ref => ({ groupKey, ref }));
  });

  return {
    ok: missingRefs.length === 0,
    totalGroups: entries.length,
    missingRefs
  };
}

window.MILK_TEA_LAB_INGREDIENT_GROUP_HELPER = {
  getIngredientGroupRefs,
  sumIngredientGroup,
  hasAnyIngredientGroup,
  validateIngredientGroups
};
})();
