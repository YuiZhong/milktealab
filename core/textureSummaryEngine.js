(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;
const { getTextureProfile } = window.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES;
const textureProfileAnalyzer = window.MILK_TEA_LAB_TEXTURE_PROFILE_ANALYZER;

const textureEffectMetrics = {
  solidLoad: "solidLoad",
  strawResistance: "strawResistance",
  chewiness: "chewiness",
  gelLoad: "gelSoftness",
  viscosity: "pasteRisk",
  sedimentRisk: "sediment",
  liquidSupportNeed: "liquidSupportNeed",
  fatLoad: "fatLoad",
  foamLoad: "foamLayer",
  drinkabilityPenalty: "drinkabilityPenalty"
};

const structureMetrics = ["solidLoad", "strawResistance", "drinkability", "textureBalance"];
function roundTextureValue(value) {
  return Math.round(clamp(value));
}

function createEmptyTextureValues() {
  return {
    solidLoad: 0,
    strawResistance: 0,
    drinkability: 0,
    textureBalance: 0,
    chewiness: 0,
    gelLoad: 0,
    viscosity: 0,
    sedimentRisk: 0,
    liquidSupportNeed: 0,
    fatLoad: 0,
    foamLoad: 0,
    drinkabilityPenalty: 0,
    combinedTextureBurden: 0
  };
}

function addUnique(target, items) {
  if (!Array.isArray(items)) return;
  items.forEach(item => {
    if (item && !target.includes(item)) target.push(item);
  });
}

function addTextureRisks(values, risks) {
  if (values.solidLoad >= 65) risks.push("high_solid_load_risk");
  if (values.strawResistance >= 65) risks.push("high_straw_resistance_risk");
  if (values.drinkability > 0 && values.drinkability < 45) risks.push("low_drinkability_risk");
  if (values.fatLoad >= 30) risks.push("fat_load_risk");
  if (values.sedimentRisk >= 30) risks.push("sediment_risk");
}

function getProfileForItem(item, options) {
  const override = options?.profilesByIngredientId?.[item.ingredientId]?.textureProfile;
  if (override && typeof override === "object") {
    return { effects: { ...override } };
  }
  if (typeof options?.getTextureProfile === "function") return options.getTextureProfile(item);
  return getTextureProfile({ ingredientId: item.ingredientId, name: item.name });
}

function addIngredientEvidence(context, evidence, options) {
  context.activeCup.forEach(item => {
    const profile = getProfileForItem(item, options);
    const ratio = item.ratio || 0;
    const ratioWeight = ratio / 100;

    Object.entries(textureEffectMetrics).forEach(([metric, effectKey]) => {
      const sourceValue = profile?.effects?.[effectKey] || 0;
      const contribution = sourceValue * ratioWeight;
      if (contribution !== 0) {
        evidence.push({
          metric,
          sourceLayer: "texture",
          sourceType: "ingredient",
          sourceId: item.ingredientId || null,
          ratio,
          contribution: roundTextureValue(contribution)
        });
      }
    });
  });
}

function addStructureEvidence(structure, evidence) {
  structureMetrics.forEach(metric => {
    if (typeof structure?.[metric] !== "number") return;
    evidence.push({
      metric,
      sourceLayer: "texture",
      sourceType: "structure",
      sourceId: "drinkStructure",
      contribution: roundTextureValue(structure[metric])
    });
  });
}

function getCompositionEntry(ingredientId) {
  const compositionTagsApi = window.MILK_TEA_LAB_INGREDIENT_COMPOSITION_TAGS;
  return compositionTagsApi?.getIngredientCompositionTags && ingredientId
    ? compositionTagsApi.getIngredientCompositionTags(ingredientId)
    : null;
}

function cloneTags(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function hasAnyTag(tags, expectedTags) {
  return expectedTags.some(tag => tags.has(tag));
}

function buildTextureCompositionBurden(context, values) {
  let textureModifierRatio = 0;
  let starchOrPowderRatio = 0;

  context.activeCup.forEach(item => {
    const entry = getCompositionEntry(item.ingredientId);
    const tags = new Set([
      ...cloneTags(entry?.compositionTags),
      ...cloneTags(entry?.roleTags)
    ]);
    const ratio = typeof item.ratio === "number" ? item.ratio : 0;
    const isTextureModifier = entry?.displayRole === "modifier"
      && hasAnyTag(tags, ["topping", "texture"]);
    const isStarchOrPowder = hasAnyTag(tags, ["starch", "powder"]);

    if (isTextureModifier) textureModifierRatio += ratio;
    if (isStarchOrPowder) starchOrPowderRatio += ratio;
  });

  const pressure = roundTextureValue(
    values.solidLoad * 0.35
    + values.strawResistance * 0.22
    + values.drinkabilityPenalty * 0.3
    + values.sedimentRisk * 0.35
    + values.viscosity * 0.32
    + textureModifierRatio * 0.58
    + starchOrPowderRatio * 0.22
  );

  return {
    pressure,
    textureModifierRatio: roundTextureValue(textureModifierRatio),
    starchOrPowderRatio: roundTextureValue(starchOrPowderRatio)
  };
}

function buildTextureSummary(context, options = {}) {
  const values = createEmptyTextureValues();
  const profileSummary = textureProfileAnalyzer?.analyzeTextureProfile(context, options) || {
    effects: {},
    tags: [],
    dominantFamilies: [],
    missingProfiles: []
  };
  const structure = context.structure || {};
  const tags = [];
  const risks = [];
  const evidence = [];

  Object.entries(textureEffectMetrics).forEach(([metric, effectKey]) => {
    values[metric] = roundTextureValue(profileSummary.effects?.[effectKey] || 0);
  });

  structureMetrics.forEach(metric => {
    if (typeof structure[metric] === "number") {
      values[metric] = roundTextureValue(Math.max(values[metric] || 0, structure[metric]));
    }
  });

  const combinedTextureBurden = buildTextureCompositionBurden(context, values);
  values.combinedTextureBurden = combinedTextureBurden.pressure;

  addUnique(tags, profileSummary.tags);
  addUnique(tags, structure.tags);
  if (profileSummary.missingProfiles?.length) tags.push("texture_profile_missing");

  addTextureRisks(values, risks);
  addIngredientEvidence(context, evidence, options);
  addStructureEvidence(structure, evidence);

  return {
    values,
    tags,
    risks,
    evidence,
    metadata: {
      schemaVersion: "textureSummary.v0.0.8.34",
      sourceLayer: "texture",
      profileSource: options.profileSource || "runtime_legacy_profile",
      combinedTextureBurden,
      weightsEnabled: false,
      readonly: true
    }
  };
}

window.MILK_TEA_LAB_TEXTURE_SUMMARY_ENGINE = {
  buildTextureSummary
};
})();
