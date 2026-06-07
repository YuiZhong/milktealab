(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;
const { getFlavorProfile } = window.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES || {};

const flavorSummaryMetrics = {
  flavorIntensity: "flavorIntensity",
  aromaPressure: "aromaPressure",
  beverageFit: "beverageFit",
  dessertFit: "dessertFit",
  savoryRisk: "savoryRisk",
  noveltyRisk: "noveltyRisk",
  identityConflictRisk: "identityConflictRisk",
  dominantPotential: "dominantPotential"
};

function createEmptyFlavorValues() {
  return Object.fromEntries(Object.keys(flavorSummaryMetrics).map(metric => [metric, 0]));
}

function roundFlavorValue(value) {
  return Math.round(clamp(value));
}

function addUnique(target, items) {
  if (!Array.isArray(items)) return;
  items.forEach(item => {
    if (item && !target.includes(item)) target.push(item);
  });
}

function getProfileValue(profile, metric) {
  if (metric === "flavorIntensity") {
    return ((profile.identityStrength || 0) + (profile.aromaPressure || 0) + (profile.dominantPotential || 0)) / 3;
  }

  if (metric === "identityConflictRisk") {
    return ((profile.identityStrength || 0) * (profile.noveltyRisk || 0)) / 100;
  }

  return profile[metric] || 0;
}

function addFlavorRisks(values, risks) {
  if (values.aromaPressure >= 60) risks.push("high_aroma_pressure_risk");
  if (values.noveltyRisk >= 55) risks.push("high_novelty_risk");
  if (values.savoryRisk >= 35) risks.push("savory_identity_risk");
  if (values.beverageFit > 0 && values.beverageFit <= 55) risks.push("low_beverage_fit_risk");
}

function getItemFlavorProfile(item, options = {}) {
  const override = options?.profilesByIngredientId?.[item.ingredientId]?.flavorProfile;
  if (override && typeof override === "object") return override;
  if (typeof options?.getFlavorProfile === "function") return options.getFlavorProfile(item);
  if (!getFlavorProfile) return null;
  if (item.ingredientId) return getFlavorProfile({ ingredientId: item.ingredientId });
  return getFlavorProfile({ name: item.name });
}

function buildFlavorSummary(context, options = {}) {
  const values = createEmptyFlavorValues();
  const tags = [];
  const risks = [];
  const evidence = [];
  let dominantSource = null;

  context.activeCup.forEach(item => {
    const profile = getItemFlavorProfile(item, options);
    const ratio = item.ratio || 0;
    const ratioWeight = ratio / 100;

    if (!profile) {
      addUnique(tags, ["flavor_profile_missing"]);
      return;
    }

    addUnique(tags, profile.flavorFamilies);
    addUnique(tags, profile.aromaTags);
    addUnique(tags, profile.identityTags);

    const dominantContribution = (profile.dominantPotential || 0) * ratioWeight;
    if (!dominantSource || dominantContribution > dominantSource.contribution) {
      dominantSource = {
        contribution: dominantContribution,
        identityTag: profile.identityTags?.[0] || null
      };
    }

    Object.keys(flavorSummaryMetrics).forEach(metric => {
      const sourceValue = getProfileValue(profile, metric);
      const contribution = sourceValue * ratioWeight;
      values[metric] += contribution;

      if (contribution !== 0) {
        evidence.push({
          metric,
          sourceLayer: "flavor",
          sourceType: "ingredient",
          sourceId: item.ingredientId || null,
          ratio,
          contribution: roundFlavorValue(contribution)
        });
      }
    });
  });

  Object.keys(values).forEach(metric => {
    values[metric] = roundFlavorValue(values[metric]);
  });

  if (dominantSource?.identityTag && dominantSource.contribution >= 12) {
    addUnique(tags, [`dominant:${dominantSource.identityTag}`]);
  }

  addFlavorRisks(values, risks);

  return {
    values,
    tags,
    risks,
    evidence,
    metadata: {
      schemaVersion: "flavorSummary.v0.0.6.8",
      sourceLayer: "flavor",
      profileSource: options.profileSource || "runtime_legacy_profile",
      weightsEnabled: false,
      readonly: true
    }
  };
}

window.MILK_TEA_LAB_FLAVOR_SUMMARY_ENGINE = {
  buildFlavorSummary
};
})();
