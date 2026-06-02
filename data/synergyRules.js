(function() {
const { comboRules } = window.MILK_TEA_LAB_COMBINATION_RULES;
const heavyFlavorNames = ["厚乳", "淡奶油", "奶盖", "牛奶", "椰奶", "榴莲", "芋泥", "奥利奥碎"];
const dairyNames = ["牛奶", "厚乳", "淡奶油", "椰奶", "燕麦奶", "植脂奶", "奶盖"];
const highFatDairyNames = ["厚乳", "淡奶油", "奶盖", "植脂奶"];
const strawResistanceNames = ["芋泥", "奥利奥碎", "珍珠", "芋圆", "布丁", "仙草", "椰果"];
const clearLiquidNames = ["纯水", "气泡水", "咖啡", "红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"];

const ingredientGroups = {
  heavyFlavor: heavyFlavorNames,
  dairy: dairyNames,
  highFatDairy: highFatDairyNames,
  strawResistance: strawResistanceNames,
  clearLiquid: clearLiquidNames
};

window.MILK_TEA_LAB_SYNERGY_RULES = {
  comboRules,
  ingredientGroups,
  heavyFlavorNames,
  dairyNames,
  highFatDairyNames,
  strawResistanceNames,
  clearLiquidNames
};
})();
