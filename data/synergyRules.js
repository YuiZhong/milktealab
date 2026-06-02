(function() {
const { comboRules } = window.MILK_TEA_LAB_COMBINATION_RULES;
const heavyFlavorNames = ["厚乳", "淡奶油", "奶盖", "牛奶", "椰奶", "榴莲", "芋泥", "奥利奥碎"];
const dairyNames = ["牛奶", "厚乳", "淡奶油", "椰奶", "燕麦奶", "植脂奶", "奶盖"];
const highFatDairyNames = ["厚乳", "淡奶油", "奶盖", "植脂奶"];
const strawResistanceNames = ["芋泥", "奥利奥碎", "珍珠", "芋圆", "布丁", "仙草", "椰果"];
const clearLiquidNames = ["纯水", "气泡水", "咖啡", "红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"];

const heavyFlavorRefs = ["dairy_thick_milk", "dairy_cream", "topping_cheese_foam", "dairy_milk", "dairy_coconut_milk", "fruit_durian", "topping_taro_paste", "topping_oreo_crumble"];
const dairyRefs = ["dairy_milk", "dairy_thick_milk", "dairy_cream", "dairy_coconut_milk", "dairy_oat_milk", "dairy_non_dairy_creamer", "topping_cheese_foam"];
const highFatDairyRefs = ["dairy_thick_milk", "dairy_cream", "topping_cheese_foam", "dairy_non_dairy_creamer"];
const strawResistanceRefs = ["topping_taro_paste", "topping_oreo_crumble", "topping_pearl", "topping_taro_ball", "topping_pudding", "topping_grass_jelly", "topping_coconut_jelly"];
const clearLiquidRefs = ["liquid_water", "liquid_sparkling_water", "liquid_coffee", "tea_black", "tea_green", "tea_oolong", "tea_jasmine", "tea_puer"];

const ingredientGroups = {
  heavyFlavor: heavyFlavorRefs,
  dairy: dairyRefs,
  highFatDairy: highFatDairyRefs,
  strawResistance: strawResistanceRefs,
  clearLiquid: clearLiquidRefs
};

window.MILK_TEA_LAB_SYNERGY_RULES = {
  comboRules,
  ingredientGroups,
  heavyFlavorRefs,
  dairyRefs,
  highFatDairyRefs,
  strawResistanceRefs,
  clearLiquidRefs,
  heavyFlavorNames,
  dairyNames,
  highFatDairyNames,
  strawResistanceNames,
  clearLiquidNames
};
})();
