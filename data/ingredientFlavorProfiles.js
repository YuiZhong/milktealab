(function(root) {
const DEFAULT_METADATA = {
  sourceLayer: "flavor",
  schemaVersion: "ingredientFlavorProfile.v0.0.6.7",
  weightsEnabled: false,
  readonly: true
};

const VALUE_KEYS = [
  "beverageFit",
  "dessertFit",
  "savoryRisk",
  "noveltyRisk",
  "identityStrength",
  "aromaPressure",
  "dominantPotential"
];

function profile({
  flavorFamilies,
  aromaTags,
  identityTags,
  beverageFit,
  dessertFit,
  savoryRisk,
  noveltyRisk,
  identityStrength,
  aromaPressure,
  dominantPotential,
  pairHints
}) {
  return {
    flavorFamilies,
    aromaTags,
    identityTags,
    beverageFit,
    dessertFit,
    savoryRisk,
    noveltyRisk,
    identityStrength,
    aromaPressure,
    dominantPotential,
    pairHints,
    metadata: { ...DEFAULT_METADATA }
  };
}

const flavorProfilesByIngredientId = {
  tea_black: profile({
    flavorFamilies: ["tea"],
    aromaTags: ["malty", "classic", "roasted"],
    identityTags: ["black_tea"],
    beverageFit: 92,
    dessertFit: 62,
    savoryRisk: 5,
    noveltyRisk: 5,
    identityStrength: 58,
    aromaPressure: 38,
    dominantPotential: 48,
    pairHints: ["dairy", "brown_sugar", "honey"]
  }),
  tea_green: profile({
    flavorFamilies: ["tea", "fresh"],
    aromaTags: ["grassy", "fresh", "light"],
    identityTags: ["green_tea"],
    beverageFit: 90,
    dessertFit: 48,
    savoryRisk: 8,
    noveltyRisk: 8,
    identityStrength: 55,
    aromaPressure: 34,
    dominantPotential: 46,
    pairHints: ["citrus", "sparkling", "honey"]
  }),
  tea_oolong: profile({
    flavorFamilies: ["tea"],
    aromaTags: ["roasted", "floral", "premium"],
    identityTags: ["oolong_tea"],
    beverageFit: 92,
    dessertFit: 58,
    savoryRisk: 6,
    noveltyRisk: 8,
    identityStrength: 62,
    aromaPressure: 44,
    dominantPotential: 52,
    pairHints: ["dairy", "cream", "brown_sugar"]
  }),
  tea_jasmine: profile({
    flavorFamilies: ["tea", "floral"],
    aromaTags: ["floral", "bright", "fresh"],
    identityTags: ["jasmine_tea"],
    beverageFit: 90,
    dessertFit: 52,
    savoryRisk: 8,
    noveltyRisk: 10,
    identityStrength: 65,
    aromaPressure: 48,
    dominantPotential: 54,
    pairHints: ["citrus", "lychee", "honey"]
  }),
  tea_puer: profile({
    flavorFamilies: ["tea", "earthy"],
    aromaTags: ["earthy", "fermented", "deep"],
    identityTags: ["puer_tea"],
    beverageFit: 78,
    dessertFit: 42,
    savoryRisk: 18,
    noveltyRisk: 22,
    identityStrength: 72,
    aromaPressure: 58,
    dominantPotential: 62,
    pairHints: ["dairy", "brown_sugar", "oat"]
  }),
  dairy_milk: profile({
    flavorFamilies: ["dairy"],
    aromaTags: ["creamy", "mild"],
    identityTags: ["milk"],
    beverageFit: 88,
    dessertFit: 72,
    savoryRisk: 8,
    noveltyRisk: 4,
    identityStrength: 42,
    aromaPressure: 24,
    dominantPotential: 28,
    pairHints: ["tea", "coffee", "cocoa"]
  }),
  dairy_thick_milk: profile({
    flavorFamilies: ["dairy"],
    aromaTags: ["creamy", "rich", "milky"],
    identityTags: ["thick_milk"],
    beverageFit: 82,
    dessertFit: 82,
    savoryRisk: 8,
    noveltyRisk: 8,
    identityStrength: 55,
    aromaPressure: 38,
    dominantPotential: 42,
    pairHints: ["black_tea", "oolong", "brown_sugar"]
  }),
  dairy_cream: profile({
    flavorFamilies: ["dairy", "dessert"],
    aromaTags: ["creamy", "rich", "buttery"],
    identityTags: ["cream"],
    beverageFit: 72,
    dessertFit: 90,
    savoryRisk: 10,
    noveltyRisk: 10,
    identityStrength: 58,
    aromaPressure: 44,
    dominantPotential: 45,
    pairHints: ["berry", "cocoa", "coffee"]
  }),
  dairy_coconut_milk: profile({
    flavorFamilies: ["dairy", "tropical"],
    aromaTags: ["coconut", "creamy", "tropical"],
    identityTags: ["coconut_milk"],
    beverageFit: 82,
    dessertFit: 78,
    savoryRisk: 8,
    noveltyRisk: 14,
    identityStrength: 64,
    aromaPressure: 48,
    dominantPotential: 54,
    pairHints: ["mango", "pineapple", "coffee"]
  }),
  dairy_oat_milk: profile({
    flavorFamilies: ["dairy", "grain"],
    aromaTags: ["grain", "mild", "nutty"],
    identityTags: ["oat_milk"],
    beverageFit: 78,
    dessertFit: 62,
    savoryRisk: 12,
    noveltyRisk: 12,
    identityStrength: 48,
    aromaPressure: 30,
    dominantPotential: 34,
    pairHints: ["coffee", "black_tea", "caramel"]
  }),
  dairy_non_dairy_creamer: profile({
    flavorFamilies: ["dairy", "industrial"],
    aromaTags: ["creamy", "synthetic", "sweet"],
    identityTags: ["non_dairy_creamer", "industrial"],
    beverageFit: 55,
    dessertFit: 48,
    savoryRisk: 16,
    noveltyRisk: 36,
    identityStrength: 52,
    aromaPressure: 42,
    dominantPotential: 34,
    pairHints: ["black_tea", "coffee", "brown_sugar"]
  }),
  liquid_water: profile({
    flavorFamilies: ["neutral"],
    aromaTags: ["neutral", "clean"],
    identityTags: ["water"],
    beverageFit: 70,
    dessertFit: 20,
    savoryRisk: 0,
    noveltyRisk: 0,
    identityStrength: 5,
    aromaPressure: 0,
    dominantPotential: 0,
    pairHints: ["tea", "fruit", "sweetener"]
  }),
  liquid_sparkling_water: profile({
    flavorFamilies: ["neutral", "sparkling"],
    aromaTags: ["carbonated", "fresh", "bright"],
    identityTags: ["sparkling_water"],
    beverageFit: 88,
    dessertFit: 28,
    savoryRisk: 4,
    noveltyRisk: 18,
    identityStrength: 38,
    aromaPressure: 12,
    dominantPotential: 24,
    pairHints: ["citrus", "watermelon", "grape"]
  }),
  liquid_coffee: profile({
    flavorFamilies: ["coffee", "roasted"],
    aromaTags: ["roasted", "bitter", "deep"],
    identityTags: ["coffee"],
    beverageFit: 82,
    dessertFit: 72,
    savoryRisk: 16,
    noveltyRisk: 18,
    identityStrength: 82,
    aromaPressure: 72,
    dominantPotential: 78,
    pairHints: ["milk", "cream", "caramel"]
  }),
  fruit_lemon: profile({
    flavorFamilies: ["citrus", "fruit"],
    aromaTags: ["bright", "zesty", "fresh"],
    identityTags: ["lemon"],
    beverageFit: 90,
    dessertFit: 45,
    savoryRisk: 5,
    noveltyRisk: 15,
    identityStrength: 65,
    aromaPressure: 55,
    dominantPotential: 55,
    pairHints: ["tea", "sparkling", "honey"]
  }),
  fruit_strawberry: profile({
    flavorFamilies: ["berry", "fruit", "dessert"],
    aromaTags: ["sweet", "jammy", "bright"],
    identityTags: ["strawberry"],
    beverageFit: 86,
    dessertFit: 88,
    savoryRisk: 4,
    noveltyRisk: 10,
    identityStrength: 68,
    aromaPressure: 50,
    dominantPotential: 58,
    pairHints: ["cream", "milk", "cocoa"]
  }),
  fruit_mango: profile({
    flavorFamilies: ["tropical_fruit", "fruit"],
    aromaTags: ["tropical", "sweet", "ripe"],
    identityTags: ["mango"],
    beverageFit: 88,
    dessertFit: 80,
    savoryRisk: 6,
    noveltyRisk: 12,
    identityStrength: 72,
    aromaPressure: 56,
    dominantPotential: 64,
    pairHints: ["coconut", "sparkling", "cream"]
  }),
  fruit_durian: profile({
    flavorFamilies: ["tropical_fruit", "controversial"],
    aromaTags: ["fermented", "rich", "pungent"],
    identityTags: ["durian", "strong_identity", "controversial"],
    beverageFit: 36,
    dessertFit: 68,
    savoryRisk: 18,
    noveltyRisk: 86,
    identityStrength: 95,
    aromaPressure: 92,
    dominantPotential: 90,
    pairHints: ["coconut", "cream", "mango"]
  }),
  fruit_watermelon: profile({
    flavorFamilies: ["melon", "fruit", "fresh"],
    aromaTags: ["watery", "fresh", "light"],
    identityTags: ["watermelon"],
    beverageFit: 88,
    dessertFit: 44,
    savoryRisk: 4,
    noveltyRisk: 8,
    identityStrength: 48,
    aromaPressure: 24,
    dominantPotential: 34,
    pairHints: ["sparkling", "mint", "citrus"]
  }),
  fruit_grape: profile({
    flavorFamilies: ["berry", "fruit"],
    aromaTags: ["juicy", "sweet", "tart"],
    identityTags: ["grape"],
    beverageFit: 86,
    dessertFit: 58,
    savoryRisk: 5,
    noveltyRisk: 8,
    identityStrength: 58,
    aromaPressure: 40,
    dominantPotential: 48,
    pairHints: ["sparkling", "tea", "honey"]
  }),
  fruit_peach: profile({
    flavorFamilies: ["stone_fruit", "fruit", "floral"],
    aromaTags: ["soft", "floral", "sweet"],
    identityTags: ["peach"],
    beverageFit: 88,
    dessertFit: 68,
    savoryRisk: 4,
    noveltyRisk: 8,
    identityStrength: 60,
    aromaPressure: 44,
    dominantPotential: 50,
    pairHints: ["jasmine", "sparkling", "cream"]
  }),
  fruit_lychee: profile({
    flavorFamilies: ["tropical_fruit", "floral"],
    aromaTags: ["floral", "sweet", "perfumed"],
    identityTags: ["lychee"],
    beverageFit: 86,
    dessertFit: 62,
    savoryRisk: 5,
    noveltyRisk: 14,
    identityStrength: 64,
    aromaPressure: 50,
    dominantPotential: 54,
    pairHints: ["jasmine", "green_tea", "sparkling"]
  }),
  flavor_matcha: profile({
    flavorFamilies: ["tea", "dessert", "herbal"],
    aromaTags: ["green", "earthy", "powdery"],
    identityTags: ["matcha", "strong_identity"],
    beverageFit: 78,
    dessertFit: 86,
    savoryRisk: 16,
    noveltyRisk: 22,
    identityStrength: 82,
    aromaPressure: 66,
    dominantPotential: 76,
    pairHints: ["milk", "cream", "red_bean"]
  }),
  flavor_cocoa: profile({
    flavorFamilies: ["cocoa", "dessert", "roasted"],
    aromaTags: ["chocolate", "roasted", "rich"],
    identityTags: ["cocoa", "strong_identity"],
    beverageFit: 78,
    dessertFit: 90,
    savoryRisk: 10,
    noveltyRisk: 16,
    identityStrength: 78,
    aromaPressure: 62,
    dominantPotential: 72,
    pairHints: ["milk", "cream", "oreo"]
  }),
  sweetener_white_sugar: profile({
    flavorFamilies: ["sweetener"],
    aromaTags: ["clean", "sweet"],
    identityTags: ["white_sugar"],
    beverageFit: 78,
    dessertFit: 78,
    savoryRisk: 0,
    noveltyRisk: 0,
    identityStrength: 18,
    aromaPressure: 0,
    dominantPotential: 8,
    pairHints: ["tea", "fruit", "dairy"]
  }),
  sweetener_honey: profile({
    flavorFamilies: ["sweetener", "floral"],
    aromaTags: ["floral", "warm", "natural"],
    identityTags: ["honey"],
    beverageFit: 82,
    dessertFit: 76,
    savoryRisk: 4,
    noveltyRisk: 8,
    identityStrength: 48,
    aromaPressure: 32,
    dominantPotential: 32,
    pairHints: ["lemon", "green_tea", "jasmine"]
  }),
  sweetener_brown_sugar: profile({
    flavorFamilies: ["sweetener", "caramelized"],
    aromaTags: ["molasses", "warm", "deep"],
    identityTags: ["brown_sugar"],
    beverageFit: 84,
    dessertFit: 82,
    savoryRisk: 6,
    noveltyRisk: 8,
    identityStrength: 56,
    aromaPressure: 42,
    dominantPotential: 44,
    pairHints: ["milk", "black_tea", "pearl"]
  }),
  sweetener_caramel: profile({
    flavorFamilies: ["sweetener", "caramelized", "dessert"],
    aromaTags: ["caramel", "toasty", "warm"],
    identityTags: ["caramel"],
    beverageFit: 82,
    dessertFit: 86,
    savoryRisk: 6,
    noveltyRisk: 8,
    identityStrength: 58,
    aromaPressure: 44,
    dominantPotential: 46,
    pairHints: ["coffee", "milk", "cocoa"]
  }),
  seasoning_sea_salt: profile({
    flavorFamilies: ["seasoning", "savory"],
    aromaTags: ["salty", "clean"],
    identityTags: ["sea_salt"],
    beverageFit: 48,
    dessertFit: 42,
    savoryRisk: 62,
    noveltyRisk: 28,
    identityStrength: 44,
    aromaPressure: 8,
    dominantPotential: 26,
    pairHints: ["cream", "caramel", "cheese_foam"]
  }),
  topping_pearl: profile({
    flavorFamilies: ["topping", "starch"],
    aromaTags: ["mild", "chewy", "sweet"],
    identityTags: ["pearl"],
    beverageFit: 78,
    dessertFit: 62,
    savoryRisk: 4,
    noveltyRisk: 8,
    identityStrength: 42,
    aromaPressure: 8,
    dominantPotential: 18,
    pairHints: ["brown_sugar", "milk", "black_tea"]
  }),
  topping_coconut_jelly: profile({
    flavorFamilies: ["topping", "tropical"],
    aromaTags: ["coconut", "fresh", "light"],
    identityTags: ["coconut_jelly"],
    beverageFit: 76,
    dessertFit: 58,
    savoryRisk: 4,
    noveltyRisk: 10,
    identityStrength: 40,
    aromaPressure: 18,
    dominantPotential: 20,
    pairHints: ["mango", "sparkling", "fruit"]
  }),
  topping_pudding: profile({
    flavorFamilies: ["topping", "dessert", "dairy"],
    aromaTags: ["custard", "sweet", "creamy"],
    identityTags: ["pudding"],
    beverageFit: 72,
    dessertFit: 84,
    savoryRisk: 6,
    noveltyRisk: 8,
    identityStrength: 52,
    aromaPressure: 30,
    dominantPotential: 30,
    pairHints: ["milk", "caramel", "black_tea"]
  }),
  topping_grass_jelly: profile({
    flavorFamilies: ["topping", "herbal"],
    aromaTags: ["herbal", "cooling", "bitter"],
    identityTags: ["grass_jelly"],
    beverageFit: 70,
    dessertFit: 48,
    savoryRisk: 12,
    noveltyRisk: 18,
    identityStrength: 54,
    aromaPressure: 28,
    dominantPotential: 32,
    pairHints: ["milk", "brown_sugar", "tea"]
  }),
  topping_taro_ball: profile({
    flavorFamilies: ["topping", "starch"],
    aromaTags: ["starchy", "mild", "sweet"],
    identityTags: ["taro_ball"],
    beverageFit: 74,
    dessertFit: 70,
    savoryRisk: 6,
    noveltyRisk: 10,
    identityStrength: 44,
    aromaPressure: 12,
    dominantPotential: 22,
    pairHints: ["milk", "brown_sugar", "taro"]
  }),
  topping_oreo_crumble: profile({
    flavorFamilies: ["topping", "dessert", "cocoa"],
    aromaTags: ["cookie", "cocoa", "crumbly"],
    identityTags: ["oreo", "strong_identity"],
    beverageFit: 66,
    dessertFit: 92,
    savoryRisk: 8,
    noveltyRisk: 28,
    identityStrength: 78,
    aromaPressure: 58,
    dominantPotential: 64,
    pairHints: ["cream", "milk", "cocoa"]
  }),
  topping_taro_paste: profile({
    flavorFamilies: ["topping", "starch", "dessert"],
    aromaTags: ["taro", "earthy", "sweet"],
    identityTags: ["taro", "paste"],
    beverageFit: 62,
    dessertFit: 80,
    savoryRisk: 14,
    noveltyRisk: 24,
    identityStrength: 70,
    aromaPressure: 42,
    dominantPotential: 58,
    pairHints: ["milk", "cream", "brown_sugar"]
  }),
  topping_cheese_foam: profile({
    flavorFamilies: ["topping", "dairy", "dessert"],
    aromaTags: ["creamy", "salty", "cheesy"],
    identityTags: ["cheese_foam"],
    beverageFit: 70,
    dessertFit: 78,
    savoryRisk: 24,
    noveltyRisk: 22,
    identityStrength: 66,
    aromaPressure: 48,
    dominantPotential: 46,
    pairHints: ["tea", "fruit", "sea_salt"]
  })
};

function cloneProfile(flavorProfile) {
  if (!flavorProfile) return null;
  return {
    flavorFamilies: [...flavorProfile.flavorFamilies],
    aromaTags: [...flavorProfile.aromaTags],
    identityTags: [...flavorProfile.identityTags],
    beverageFit: flavorProfile.beverageFit,
    dessertFit: flavorProfile.dessertFit,
    savoryRisk: flavorProfile.savoryRisk,
    noveltyRisk: flavorProfile.noveltyRisk,
    identityStrength: flavorProfile.identityStrength,
    aromaPressure: flavorProfile.aromaPressure,
    dominantPotential: flavorProfile.dominantPotential,
    pairHints: [...flavorProfile.pairHints],
    metadata: { ...flavorProfile.metadata }
  };
}

function resolveIngredientId(ref) {
  if (!ref) return null;
  if (typeof ref === "string" && flavorProfilesByIngredientId[ref]) return ref;

  const registry = root.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  if (!registry) return null;

  return registry.getIngredientId?.(ref) || registry.normalizeIngredientRef?.(ref)?.id || null;
}

function getFlavorProfile(ref) {
  const ingredientId = resolveIngredientId(ref);
  return cloneProfile(flavorProfilesByIngredientId[ingredientId]);
}

function listFlavorProfiles() {
  return Object.entries(flavorProfilesByIngredientId).map(([ingredientId, flavorProfile]) => ({
    ingredientId,
    ...cloneProfile(flavorProfile)
  }));
}

function validateIngredientFlavorProfiles() {
  const registry = root.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const ingredientIds = registry?.listIngredients?.().map(meta => meta.id).filter(Boolean) || [];
  const profileIds = Object.keys(flavorProfilesByIngredientId);
  const ingredientIdSet = new Set(ingredientIds);
  const profileIdSet = new Set(profileIds);
  const missingProfileIds = ingredientIds.filter(id => !profileIdSet.has(id));
  const extraProfileIds = profileIds.filter(id => ingredientIds.length > 0 && !ingredientIdSet.has(id));
  const displayNameKeys = profileIds.filter(id => /[\u4e00-\u9fff]/.test(id));
  const invalidProfiles = profileIds.filter(id => {
    const flavorProfile = flavorProfilesByIngredientId[id];
    return !Array.isArray(flavorProfile.flavorFamilies)
      || !Array.isArray(flavorProfile.aromaTags)
      || !Array.isArray(flavorProfile.identityTags)
      || !Array.isArray(flavorProfile.pairHints)
      || VALUE_KEYS.some(key => typeof flavorProfile[key] !== "number")
      || flavorProfile.metadata?.sourceLayer !== "flavor"
      || flavorProfile.metadata?.schemaVersion !== DEFAULT_METADATA.schemaVersion
      || flavorProfile.metadata?.readonly !== true
      || flavorProfile.metadata?.weightsEnabled !== false;
  });

  return {
    ok: missingProfileIds.length === 0
      && extraProfileIds.length === 0
      && displayNameKeys.length === 0
      && invalidProfiles.length === 0,
    totalIngredients: ingredientIds.length,
    totalProfiles: profileIds.length,
    missingProfileIds,
    extraProfileIds,
    displayNameKeys,
    invalidProfiles
  };
}

root.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES = {
  flavorProfilesByIngredientId,
  getFlavorProfile,
  listFlavorProfiles,
  validateIngredientFlavorProfiles
};

if (typeof module !== "undefined") {
  module.exports = root.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES;
}
})(typeof window !== "undefined" ? window : globalThis);
