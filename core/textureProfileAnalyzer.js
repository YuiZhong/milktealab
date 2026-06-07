(function() {
const { clamp, displayName } = window.MILK_TEA_LAB_HELPERS;
const { getTextureProfile, zeroEffects } = window.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES;

function roundMetric(value) {
  return Math.round(clamp(value));
}

function emptyEffectTotals() {
  return Object.fromEntries(Object.keys(zeroEffects).map(key => [key, 0]));
}

function getProfileForItem(item, options) {
  const override = options?.profilesByIngredientId?.[item.ingredientId]?.textureProfile;
  if (override && typeof override === "object") {
    return {
      form: "playtest_anchor",
      textureFamily: "playtest_anchor",
      tags: [],
      effects: { ...zeroEffects, ...override }
    };
  }
  if (typeof options?.getTextureProfile === "function") {
    return options.getTextureProfile(item);
  }
  return getTextureProfile(item);
}

function analyzeTextureProfile(context, options = {}) {
  const effects = emptyEffectTotals();
  const tags = new Set();
  const missingProfiles = [];
  const familyWeights = new Map();

  context.activeCup.forEach(item => {
    const name = displayName(item.name);
    const profile = getProfileForItem(item, options);
    const ratioWeight = item.ratio / 100;

    if (!profile) {
      missingProfiles.push(name);
      return;
    }

    Object.entries(profile.effects || {}).forEach(([key, value]) => {
      if (key in effects) {
        effects[key] += value * ratioWeight;
      }
    });

    (profile.tags || []).forEach(tag => tags.add(tag));

    if (profile.textureFamily) {
      familyWeights.set(
        profile.textureFamily,
        (familyWeights.get(profile.textureFamily) || 0) + item.ratio
      );
    }
  });

  const dominantFamilies = [...familyWeights.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([family, ratio]) => ({ family, ratio: roundMetric(ratio) }));

  return {
    effects: Object.fromEntries(
      Object.entries(effects).map(([key, value]) => [key, roundMetric(value)])
    ),
    tags: [...tags],
    dominantFamilies,
    missingProfiles: [...new Set(missingProfiles)]
  };
}

window.MILK_TEA_LAB_TEXTURE_PROFILE_ANALYZER = {
  analyzeTextureProfile
};
})();
