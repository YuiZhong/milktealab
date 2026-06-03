(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;
const { getTasteProfile } = window.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES;

const tasteSummaryMetrics = {
  sweetness: "sweetness",
  acidity: "acidity",
  bitterness: "bitterness",
  astringency: "astringency",
  teaStrength: "tea",
  milkiness: "milkiness",
  creaminess: "creaminess",
  coffeeRoast: "coffeeRoast",
  freshness: "freshness",
  cloyingRisk: "cloyingRisk",
  acidSharpness: "acidSharpness",
  tasteBalance: "tasteBalance"
};

function createEmptyTasteValues() {
  return Object.fromEntries(Object.keys(tasteSummaryMetrics).map(metric => [metric, 0]));
}

function roundTasteValue(value) {
  return Math.round(clamp(value));
}

function buildTasteSummary(context) {
  const values = createEmptyTasteValues();
  const tags = [];
  const evidence = [];

  context.activeCup.forEach(item => {
    const profile = getTasteProfile({ ingredientId: item.ingredientId, name: item.name });
    const ratio = item.ratio || 0;
    const ratioWeight = ratio / 100;

    Object.entries(tasteSummaryMetrics).forEach(([metric, profileKey]) => {
      const sourceValue = profile[profileKey] || 0;
      const contribution = sourceValue * ratioWeight;
      values[metric] += contribution;
      if (contribution !== 0) {
        evidence.push({
          metric,
          sourceLayer: "taste",
          sourceType: "ingredient",
          sourceId: item.ingredientId || null,
          ratio,
          contribution: roundTasteValue(contribution)
        });
      }
    });

    (profile.tags || []).forEach(tag => {
      if (tag && !tags.includes(tag)) tags.push(tag);
    });
  });

  Object.keys(values).forEach(metric => {
    values[metric] = roundTasteValue(values[metric]);
  });

  const risks = [];
  if (values.acidity >= 24) risks.push("acid_overload_risk");
  if (values.sweetness >= 22) risks.push("sweet_overload_risk");
  if (values.bitterness >= 18) risks.push("bitterness_overload_risk");

  return {
    values,
    tags,
    risks,
    evidence,
    metadata: {
      schemaVersion: "tasteSummary.v0.0.6.1",
      sourceLayer: "taste",
      weightsEnabled: false,
      readonly: true
    }
  };
}

window.MILK_TEA_LAB_TASTE_SUMMARY_ENGINE = {
  buildTasteSummary
};
})();
