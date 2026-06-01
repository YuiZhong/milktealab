(function() {
const { pick } = window.MILK_TEA_LAB_HELPERS;
const { proportionSegmentRules } = window.MILK_TEA_LAB_PROPORTION_SEGMENT_RULES;
const {
  ratioOfRuleRef,
  sumRuleRefs
} = window.MILK_TEA_LAB_RULE_REF_HELPER;

function matchesLowerBound(ratio, rule) {
  if (typeof rule.minRatioExclusive === "number" && ratio <= rule.minRatioExclusive) return false;
  if (typeof rule.minRatioInclusive === "number" && ratio < rule.minRatioInclusive) return false;
  return true;
}

function matchesUpperBound(ratio, rule) {
  if (typeof rule.maxRatioExclusive === "number" && ratio >= rule.maxRatioExclusive) return false;
  if (typeof rule.maxRatioInclusive === "number" && ratio > rule.maxRatioInclusive) return false;
  return true;
}

function matchesRatioSum(context, condition) {
  const refs = condition.refs || condition.ingredientRefs || condition.ingredientIds || condition.names;
  const ratio = sumRuleRefs(context, refs);
  if (typeof condition.minExclusive === "number" && ratio <= condition.minExclusive) return false;
  if (typeof condition.minInclusive === "number" && ratio < condition.minInclusive) return false;
  if (typeof condition.maxExclusive === "number" && ratio >= condition.maxExclusive) return false;
  if (typeof condition.maxInclusive === "number" && ratio > condition.maxInclusive) return false;
  return true;
}

function matchesContext(context, rule) {
  if (rule.requiredRatioSums?.some(condition => !matchesRatioSum(context, condition))) return false;
  if (rule.anyRatioSums?.length && !rule.anyRatioSums.some(condition => matchesRatioSum(context, condition))) return false;
  return true;
}

function applyAdd(attr, add = {}) {
  Object.entries(add).forEach(([key, value]) => {
    attr[key] += value;
  });
}

function applyProportionSegmentRules(context, attr) {
  const notes = [];
  const tags = [];
  const matchedRuleIds = [];
  let scoreDelta = 0;

  proportionSegmentRules.forEach(rule => {
    const ratio = ratioOfRuleRef(context, rule);
    if (!matchesLowerBound(ratio, rule) || !matchesUpperBound(ratio, rule)) return;
    if (!matchesContext(context, rule)) return;

    scoreDelta += rule.score || 0;
    applyAdd(attr, rule.add);
    if (rule.notes?.length) notes.push(pick(rule.notes));
    if (rule.tags?.length) tags.push(...rule.tags);
    matchedRuleIds.push(rule.id);
  });

  return { scoreDelta, notes, tags, matchedRuleIds };
}

window.MILK_TEA_LAB_PROPORTION_SEGMENT_RULE_ENGINE = {
  applyProportionSegmentRules
};
})();
