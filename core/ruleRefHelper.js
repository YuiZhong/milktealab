(function() {
const ingredientRegistry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;

function getRuleRefCandidate(ruleOrRef) {
  if (!ruleOrRef) return null;
  if (typeof ruleOrRef === "string") return ruleOrRef;
  if (typeof ruleOrRef !== "object") return null;

  if (ruleOrRef.ingredientRef) return ruleOrRef.ingredientRef;
  if (ruleOrRef.ingredientId) return { ingredientId: ruleOrRef.ingredientId };
  if (ruleOrRef.id) return { id: ruleOrRef.id };
  if (ruleOrRef.ingredient) return ruleOrRef.ingredient;
  if (ruleOrRef.name) return { name: ruleOrRef.name };
  return null;
}

function getFallbackName(ruleOrRef) {
  if (!ruleOrRef) return null;
  if (typeof ruleOrRef === "string") return ruleOrRef;
  if (typeof ruleOrRef !== "object") return null;
  if (typeof ruleOrRef.ingredient === "string") return ruleOrRef.ingredient;
  if (typeof ruleOrRef.name === "string") return ruleOrRef.name;
  if (typeof ruleOrRef.ingredientRef === "string") return ruleOrRef.ingredientRef;
  return null;
}

function resolveRuleIngredientRef(ruleOrRef) {
  const ref = getRuleRefCandidate(ruleOrRef);
  return ingredientRegistry?.normalizeIngredientRef(ref) || null;
}

function ratioOfRuleRef(context, ruleOrRef) {
  if (!context) return 0;

  const meta = resolveRuleIngredientRef(ruleOrRef);
  if (meta && typeof context.ratioOfRef === "function") {
    return context.ratioOfRef({ ingredientId: meta.id });
  }

  const fallbackName = meta?.name || getFallbackName(ruleOrRef);
  if (fallbackName && typeof context.ratioOf === "function") {
    return context.ratioOf(fallbackName);
  }

  return 0;
}

function hasRuleRef(context, ruleOrRef) {
  if (!context) return false;

  const meta = resolveRuleIngredientRef(ruleOrRef);
  if (meta && typeof context.hasIngredientRef === "function") {
    return context.hasIngredientRef({ ingredientId: meta.id });
  }

  return ratioOfRuleRef(context, ruleOrRef) > 0;
}

function sumRuleRefs(context, refs = []) {
  if (!context || !Array.isArray(refs) || refs.length === 0) return 0;

  if (typeof context.sumRatiosByRefs === "function") {
    return context.sumRatiosByRefs(refs);
  }

  if (typeof context.sumRatios === "function") {
    const names = refs
      .map(ref => resolveRuleIngredientRef(ref)?.name || getFallbackName(ref))
      .filter(Boolean);
    return context.sumRatios(names);
  }

  return refs.reduce((sum, ref) => sum + ratioOfRuleRef(context, ref), 0);
}

window.MILK_TEA_LAB_RULE_REF_HELPER = {
  resolveRuleIngredientRef,
  ratioOfRuleRef,
  hasRuleRef,
  sumRuleRefs
};
})();
