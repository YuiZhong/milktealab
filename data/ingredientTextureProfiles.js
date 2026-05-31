(function() {
const zeroEffects = {
  solidLoad: 0,
  strawResistance: 0,
  chewiness: 0,
  gelSoftness: 0,
  pasteRisk: 0,
  sediment: 0,
  liquidSupportNeed: 0,
  fatLoad: 0,
  foamLayer: 0,
  drinkabilityPenalty: 0
};

function profile(form, textureFamily, tags, effects) {
  return {
    form,
    textureFamily,
    tags,
    effects: { ...zeroEffects, ...effects }
  };
}

const ingredientTextureProfiles = {
  红茶: profile("liquid", "clear_liquid", ["tea_base", "clear_liquid"], {}),
  绿茶: profile("liquid", "clear_liquid", ["tea_base", "clear_liquid", "fresh_base"], {}),
  乌龙茶: profile("liquid", "clear_liquid", ["tea_base", "clear_liquid"], { drinkabilityPenalty: 1 }),
  茉莉茶: profile("liquid", "clear_liquid", ["tea_base", "clear_liquid", "floral_base"], {}),
  普洱茶: profile("liquid", "clear_liquid", ["tea_base", "clear_liquid", "earthy_body"], { drinkabilityPenalty: 2 }),
  纯水: profile("liquid", "clear_liquid", ["clear_liquid", "dilution"], {}),
  气泡水: profile("liquid", "clear_liquid", ["clear_liquid", "carbonated"], {}),
  咖啡: profile("liquid", "liquid_base", ["coffee_base", "light_body"], { drinkabilityPenalty: 2 }),

  牛奶: profile("liquid", "liquid_dairy", ["dairy_liquid"], { fatLoad: 12, drinkabilityPenalty: 1 }),
  厚乳: profile("liquid", "liquid_dairy", ["dairy_liquid", "thick_dairy"], { fatLoad: 38, drinkabilityPenalty: 8 }),
  淡奶油: profile("liquid", "liquid_dairy", ["dairy_liquid", "cream_heavy"], { fatLoad: 48, drinkabilityPenalty: 12 }),
  椰奶: profile("liquid", "plant_dairy", ["plant_milk", "tropical_body"], { fatLoad: 20, drinkabilityPenalty: 3 }),
  燕麦奶: profile("liquid", "plant_dairy", ["plant_milk", "grain_body"], { fatLoad: 16, sediment: 4, drinkabilityPenalty: 4 }),
  植脂奶: profile("liquid", "plant_dairy", ["plant_milk", "synthetic_body"], { fatLoad: 34, drinkabilityPenalty: 8 }),

  珍珠: profile("large_particle", "large_chewy_topping", ["large_particle", "coarse_straw_required", "chewy", "sticky"], { solidLoad: 48, strawResistance: 42, chewiness: 48, liquidSupportNeed: 12, drinkabilityPenalty: 8 }),
  芋圆: profile("large_particle", "large_chewy_topping", ["large_particle", "coarse_straw_required", "chewy", "sticky", "starchy"], { solidLoad: 46, strawResistance: 40, chewiness: 44, pasteRisk: 8, liquidSupportNeed: 14, drinkabilityPenalty: 9 }),
  椰果: profile("large_particle", "large_chewy_topping", ["large_particle", "coarse_straw_required", "elastic", "crunchy"], { solidLoad: 36, strawResistance: 32, chewiness: 30, liquidSupportNeed: 8, drinkabilityPenalty: 4 }),

  布丁: profile("soft_gel", "soft_gel_topping", ["soft_gel", "slippery", "dessert_topping", "sweet_gel"], { solidLoad: 28, strawResistance: 18, gelSoftness: 46, chewiness: 8, liquidSupportNeed: 8, drinkabilityPenalty: 4 }),
  仙草: profile("soft_gel", "soft_gel_topping", ["soft_gel", "slippery", "herbal_jelly", "bitter_when_heavy"], { solidLoad: 26, strawResistance: 16, gelSoftness: 42, chewiness: 6, liquidSupportNeed: 8, drinkabilityPenalty: 4 }),

  奥利奥碎: profile("crumb", "crumbly_sediment", ["crumbly", "powdery", "sediment", "dessert_crumble"], { solidLoad: 42, strawResistance: 36, pasteRisk: 34, sediment: 52, liquidSupportNeed: 46, drinkabilityPenalty: 18 }),
  芋泥: profile("paste", "starchy_paste", ["paste", "starchy", "thickener", "low_flow"], { solidLoad: 58, strawResistance: 52, pasteRisk: 62, sediment: 18, liquidSupportNeed: 58, drinkabilityPenalty: 36 }),
  奶盖: profile("foam_cream", "cream_layer", ["foam", "cream_layer", "fat_layer"], { solidLoad: 8, strawResistance: 4, fatLoad: 44, foamLayer: 56, drinkabilityPenalty: 10 }),
  榴莲: profile("fruit_pulp", "heavy_fruit_pulp", ["fruit_pulp", "heavy_aroma", "paste_risk"], { solidLoad: 38, strawResistance: 34, pasteRisk: 36, liquidSupportNeed: 36, drinkabilityPenalty: 22 }),

  柠檬: profile("liquid_pulp", "fruit_juice", ["fruit_juice", "acidic"], { liquidSupportNeed: 2 }),
  草莓: profile("fruit_pulp", "light_fruit_pulp", ["fruit_pulp", "soft_fruit"], { solidLoad: 8, strawResistance: 4, liquidSupportNeed: 8, drinkabilityPenalty: 2 }),
  芒果: profile("fruit_pulp", "thick_fruit_pulp", ["fruit_pulp", "thick_fruit"], { solidLoad: 14, strawResistance: 8, pasteRisk: 10, liquidSupportNeed: 16, drinkabilityPenalty: 5 }),
  西瓜: profile("liquid_pulp", "fruit_juice", ["fruit_juice", "watery_fruit"], {}),
  葡萄: profile("fruit_pulp", "light_fruit_pulp", ["fruit_pulp"], { solidLoad: 6, strawResistance: 3, liquidSupportNeed: 6 }),
  桃子: profile("fruit_pulp", "light_fruit_pulp", ["fruit_pulp", "soft_fruit"], { solidLoad: 6, strawResistance: 3, liquidSupportNeed: 6 }),
  荔枝: profile("fruit_pulp", "light_fruit_pulp", ["fruit_pulp", "soft_fruit"], { solidLoad: 6, strawResistance: 3, liquidSupportNeed: 6 }),
  抹茶: profile("powder", "fine_powder", ["powder", "fine_sediment"], { sediment: 12, pasteRisk: 8, liquidSupportNeed: 10, drinkabilityPenalty: 4 }),
  可可: profile("powder", "fine_powder", ["powder", "fine_sediment", "dessert_powder"], { sediment: 16, pasteRisk: 10, liquidSupportNeed: 12, drinkabilityPenalty: 5 }),

  白糖: profile("dissolved_sweetener", "dissolved_sweetener", ["dissolves"], {}),
  蜂蜜: profile("syrup", "syrup_sweetener", ["syrup", "viscous_sweetener"], { drinkabilityPenalty: 1 }),
  黑糖: profile("syrup", "syrup_sweetener", ["syrup", "molasses_body"], { sediment: 2, drinkabilityPenalty: 2 }),
  焦糖: profile("syrup", "syrup_sweetener", ["syrup", "caramel_body"], { drinkabilityPenalty: 2 }),
  海盐: profile("dissolved_seasoning", "dissolved_seasoning", ["dissolves"], {})
};

window.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES = {
  ingredientTextureProfiles,
  zeroEffects
};
})();
