(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;
const { getTasteProfile } = window.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES;

// v0.0.5.3 transition lists: keep role detection centralized until these roles move into data tables.
const baseLiquidNames = new Set(["红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶", "牛奶", "厚乳", "淡奶油", "椰奶", "燕麦奶", "植脂奶", "纯水", "气泡水", "咖啡"]);
const flavorNames = new Set(["柠檬", "草莓", "芒果", "榴莲", "西瓜", "葡萄", "桃子", "荔枝", "抹茶", "可可"]);
const textureNames = new Set(["珍珠", "椰果", "布丁", "仙草", "芋圆", "奥利奥碎", "芋泥", "奶盖"]);
const sweetenerNames = new Set(["白糖", "蜂蜜", "黑糖", "焦糖", "海盐"]);

function hasTag(profile, tag) {
  return profile.tags?.includes(tag);
}

function isBaseLiquidIngredient(name, profile) {
  return baseLiquidNames.has(name) || hasTag(profile, "tea") || hasTag(profile, "dairy") || hasTag(profile, "liquid") || hasTag(profile, "coffee");
}

function isFlavorIngredient(name, profile) {
  return flavorNames.has(name) || hasTag(profile, "fruit") || hasTag(profile, "floral") || hasTag(profile, "tropical") || hasTag(profile, "controversial");
}

function isTextureIngredient(name, profile) {
  return textureNames.has(name) || hasTag(profile, "topping") || hasTag(profile, "paste") || hasTag(profile, "chewy") || hasTag(profile, "cookie");
}

function isSweetenerIngredient(name, profile) {
  return sweetenerNames.has(name) || hasTag(profile, "sweetener");
}

function roundMetric(value) {
  return Math.round(clamp(value));
}

function analyzeDrinkStructure(context) {
  let baseLiquidRatio = 0;
  let flavorRatio = 0;
  let textureRatio = 0;
  let sweetenerRatio = 0;
  let weightedSolid = 0;
  let weightedStraw = 0;
  let weightedViscosity = 0;

  context.activeCup.forEach(item => {
    const profile = getTasteProfile(item.name);
    const calculationProfile = profile.calculationProfile || {};
    const viscosity = Math.max(0, profile.viscosity ?? calculationProfile.thick ?? 0);
    const strawResistance = Math.max(0, profile.strawResistance ?? calculationProfile.straw ?? 0);
    const textureRisk = profile.textureRisk ? 1 : 0;

    if (isTextureIngredient(item.name, profile)) {
      textureRatio += item.ratio;
    } else if (isSweetenerIngredient(item.name, profile)) {
      sweetenerRatio += item.ratio;
    } else if (isFlavorIngredient(item.name, profile)) {
      flavorRatio += item.ratio;
    } else if (isBaseLiquidIngredient(item.name, profile)) {
      baseLiquidRatio += item.ratio;
    }

    weightedSolid += item.ratio * (
      (isTextureIngredient(item.name, profile) ? 0.8 : 0) +
      strawResistance / 120 +
      viscosity / 180 +
      textureRisk * 0.18
    );
    weightedStraw += item.ratio * (strawResistance / 30);
    weightedViscosity += item.ratio * (viscosity / 40);
  });

  const liquidSupport = baseLiquidRatio + Math.max(0, sweetenerRatio * 0.2);
  const lowLiquidPenalty = Math.max(0, textureRatio + flavorRatio * 0.25 - liquidSupport);
  const solidLoad = roundMetric(weightedSolid + lowLiquidPenalty * 0.35);
  const strawResistance = roundMetric(weightedStraw + Math.max(0, textureRatio - baseLiquidRatio) * 0.25);
  const drinkability = roundMetric(100 - solidLoad * 0.55 - strawResistance * 0.45 + baseLiquidRatio * 0.25 - lowLiquidPenalty * 0.25);
  const textureBalance = roundMetric(100 - Math.abs(textureRatio - baseLiquidRatio * 0.45) - weightedViscosity * 0.3 - strawResistance * 0.18);
  const tags = [];
  const notes = [];

  if (baseLiquidRatio >= 55) tags.push("liquid_supported");
  if (baseLiquidRatio < 35) tags.push("low_liquid_support");
  if (textureRatio >= 35) tags.push("texture_forward");
  if (solidLoad >= 65) tags.push("high_solid_load");
  if (strawResistance >= 65) tags.push("high_straw_resistance");
  if (drinkability < 45) tags.push("low_drinkability");
  if (textureBalance >= 65) tags.push("balanced_texture");

  if (tags.includes("low_liquid_support")) notes.push("液体骨架偏少，后续可作为流动性风险来源。");
  if (tags.includes("high_solid_load")) notes.push("固体负载偏高，后续可作为质地事故来源。");
  if (tags.includes("high_straw_resistance")) notes.push("吸管阻力偏高，后续可统一供事故和反馈读取。");
  if (!notes.length) notes.push("饮品结构暂无明显后台风险标签。");

  // All numeric structure metrics are normalized to 0-100 for future tests and data-table tuning.
  return {
    baseLiquidRatio: roundMetric(baseLiquidRatio),
    flavorRatio: roundMetric(flavorRatio),
    textureRatio: roundMetric(textureRatio),
    sweetenerRatio: roundMetric(sweetenerRatio),
    solidLoad,
    drinkability,
    strawResistance,
    textureBalance,
    notes,
    tags
  };
}

window.MILK_TEA_LAB_DRINK_STRUCTURE_ANALYZER = {
  analyzeDrinkStructure,
  isBaseLiquidIngredient,
  isFlavorIngredient,
  isTextureIngredient,
  isSweetenerIngredient
};
})();
