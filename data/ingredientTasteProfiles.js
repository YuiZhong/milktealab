(function() {
const { baseProfiles } = window.MILK_TEA_LAB_INGREDIENTS;
const { displayName } = window.MILK_TEA_LAB_HELPERS;

const futureRecipeOptions = {
  temperature: ["ice", "room", "warm", "hot"],
  iceLevel: ["extra", "normal", "less", "light", "none"],
  sugarLevel: ["full", "seventy", "half", "thirty", "zero", "noExtra"],
  sweetenerType: ["whiteSugar", "fructose", "honey", "brownSugar", "substitute", "none"]
};

const tasteProfiles = {
  红茶: { sweetness: 0, acidity: 0, bitterness: 16, tea: 24, milkiness: 0, freshness: 6, heaviness: 2, viscosity: 0, aromaImpact: 10, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["tea", "classic"] },
  绿茶: { sweetness: 0, acidity: 2, bitterness: 12, tea: 22, milkiness: 0, freshness: 18, heaviness: 0, viscosity: 0, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["tea", "fresh"] },
  乌龙茶: { sweetness: 0, acidity: 0, bitterness: 14, tea: 24, milkiness: 0, freshness: 10, heaviness: 4, viscosity: 0, aromaImpact: 14, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["tea", "premium"] },
  茉莉茶: { sweetness: 0, acidity: 0, bitterness: 8, tea: 18, milkiness: 0, freshness: 16, heaviness: 0, viscosity: 0, aromaImpact: 16, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["tea", "floral"] },
  普洱茶: { sweetness: 0, acidity: 0, bitterness: 18, tea: 28, milkiness: 0, freshness: 0, heaviness: 10, viscosity: 2, aromaImpact: 18, weirdness: 4, strawResistance: 0, isHighFat: false, isStrongAroma: true, worksInFreshDrinks: false, textureRisk: false, tags: ["tea", "earthy"] },
  牛奶: { sweetness: 4, acidity: 0, bitterness: 0, tea: 0, milkiness: 24, freshness: 0, heaviness: 10, viscosity: 5, aromaImpact: 4, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: false, tags: ["dairy"] },
  厚乳: { sweetness: 8, acidity: 0, bitterness: 0, tea: 0, milkiness: 30, freshness: -8, heaviness: 28, viscosity: 12, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: true, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["dairy", "highFat"] },
  淡奶油: { sweetness: 12, acidity: 0, bitterness: 0, tea: 0, milkiness: 24, freshness: -12, heaviness: 32, viscosity: 14, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: true, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["dairy", "highFat"] },
  椰奶: { sweetness: 6, acidity: 0, bitterness: 0, tea: 0, milkiness: 18, freshness: 6, heaviness: 8, viscosity: 4, aromaImpact: 12, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["dairy", "tropical"] },
  燕麦奶: { sweetness: 4, acidity: 0, bitterness: 0, tea: 0, milkiness: 16, freshness: 0, heaviness: 8, viscosity: 5, aromaImpact: 4, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: false, tags: ["dairy", "plant"] },
  植脂奶: { sweetness: 12, acidity: 0, bitterness: 0, tea: 0, milkiness: 16, freshness: -6, heaviness: 12, viscosity: 4, aromaImpact: 5, weirdness: 12, strawResistance: 0, isHighFat: true, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["dairy", "industrial", "cheap", "healthConcern"] },
  纯水: { sweetness: 0, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 10, heaviness: -8, viscosity: -6, aromaImpact: 0, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["liquid", "dilution"] },
  气泡水: { sweetness: 0, acidity: 4, bitterness: 0, tea: 0, milkiness: 0, freshness: 24, heaviness: -10, viscosity: -8, aromaImpact: 4, weirdness: 2, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["liquid", "bubble", "fresh"] },
  咖啡: { sweetness: 0, acidity: 3, bitterness: 24, tea: 0, milkiness: 0, freshness: 0, heaviness: 8, viscosity: 2, aromaImpact: 22, weirdness: 4, strawResistance: 0, isHighFat: false, isStrongAroma: true, worksInFreshDrinks: false, textureRisk: false, tags: ["coffee", "bitter"] },
  柠檬: { sweetness: 0, acidity: 32, bitterness: 0, tea: 0, milkiness: 0, freshness: 22, heaviness: -6, viscosity: -4, aromaImpact: 14, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "acid"] },
  草莓: { sweetness: 13, acidity: 8, bitterness: 0, tea: 0, milkiness: 0, freshness: 12, heaviness: 2, viscosity: 2, aromaImpact: 14, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "dessert"] },
  芒果: { sweetness: 18, acidity: 2, bitterness: 0, tea: 0, milkiness: 0, freshness: 8, heaviness: 8, viscosity: 8, aromaImpact: 16, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "tropical"] },
  榴莲: { sweetness: 12, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: -10, heaviness: 30, viscosity: 26, aromaImpact: 34, weirdness: 30, strawResistance: 18, isHighFat: false, isStrongAroma: true, worksInFreshDrinks: false, textureRisk: true, tags: ["fruit", "controversial", "sticky"] },
  西瓜: { sweetness: 9, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 22, heaviness: -4, viscosity: -2, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "fresh"] },
  葡萄: { sweetness: 13, acidity: 8, bitterness: 0, tea: 0, milkiness: 0, freshness: 12, heaviness: 0, viscosity: 0, aromaImpact: 12, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit"] },
  桃子: { sweetness: 15, acidity: 2, bitterness: 0, tea: 0, milkiness: 0, freshness: 10, heaviness: 0, viscosity: 0, aromaImpact: 14, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "floral"] },
  荔枝: { sweetness: 18, acidity: 1, bitterness: 0, tea: 0, milkiness: 0, freshness: 9, heaviness: 0, viscosity: 0, aromaImpact: 16, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["fruit", "floral"] },
  芋泥: { sweetness: 12, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: -10, heaviness: 28, viscosity: 32, aromaImpact: 6, weirdness: 4, strawResistance: 34, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "paste"] },
  白糖: { sweetness: 25, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 0, heaviness: 0, viscosity: 0, aromaImpact: 0, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["sweetener"] },
  蜂蜜: { sweetness: 21, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 4, heaviness: 2, viscosity: 3, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: false, tags: ["sweetener", "natural"] },
  黑糖: { sweetness: 26, acidity: 0, bitterness: 2, tea: 0, milkiness: 0, freshness: -2, heaviness: 6, viscosity: 4, aromaImpact: 12, weirdness: 0, strawResistance: 0, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: false, tags: ["sweetener", "classic"] },
  珍珠: { sweetness: 6, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 0, heaviness: 6, viscosity: 4, aromaImpact: 2, weirdness: 0, strawResistance: 28, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "chewy"] },
  奶盖: { sweetness: 8, acidity: 0, bitterness: 0, tea: 0, milkiness: 20, freshness: -8, heaviness: 22, viscosity: 10, aromaImpact: 8, weirdness: 0, strawResistance: 0, isHighFat: true, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "dairy", "highFat"] },
  奥利奥碎: { sweetness: 15, acidity: 0, bitterness: 4, tea: 0, milkiness: 0, freshness: -8, heaviness: 14, viscosity: 10, aromaImpact: 12, weirdness: 3, strawResistance: 30, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "cookie"] },
  芋圆: { sweetness: 8, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 0, heaviness: 8, viscosity: 5, aromaImpact: 2, weirdness: 0, strawResistance: 30, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "chewy"] },
  布丁: { sweetness: 11, acidity: 0, bitterness: 0, tea: 0, milkiness: 6, freshness: 0, heaviness: 7, viscosity: 6, aromaImpact: 4, weirdness: 0, strawResistance: 24, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "dessert"] },
  仙草: { sweetness: 0, acidity: 0, bitterness: 6, tea: 0, milkiness: 0, freshness: 4, heaviness: 4, viscosity: 3, aromaImpact: 3, weirdness: 2, strawResistance: 22, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: false, textureRisk: true, tags: ["topping", "herbal"] },
  椰果: { sweetness: 4, acidity: 0, bitterness: 0, tea: 0, milkiness: 0, freshness: 8, heaviness: 2, viscosity: 2, aromaImpact: 5, weirdness: 0, strawResistance: 20, isHighFat: false, isStrongAroma: false, worksInFreshDrinks: true, textureRisk: true, tags: ["topping", "fruit"] }
};

function getTasteProfile(name) {
  const normalizedName = displayName(name);
  return {
    ...(tasteProfiles[normalizedName] || {}),
    calculationProfile: baseProfiles[normalizedName] || {}
  };
}

window.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES = {
  futureRecipeOptions,
  tasteProfiles,
  getTasteProfile,
  getCalculationProfile(name) {
    return getTasteProfile(name).calculationProfile;
  }
};
})();
