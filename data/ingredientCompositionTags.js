(function(root) {
const compositionTagMetadata = {
  schemaVersion: "ingredientCompositionTags.v0.0.8.26",
  playtestOnly: true,
  runtimeData: false,
  generatedData: false,
  affectsScoring: false,
  affectsGoldenExpected: false,
  purpose: "stable input tags for future composable drink type display"
};

const ingredientCompositionTags = [
  {
    ingredientId: "tea_black",
    compositionTags: ["tea", "black_tea", "roasted"],
    roleTags: ["base", "carrier"],
    baseTags: ["tea_base"],
    identityTags: ["black_tea"],
    displayRole: "base",
    labelPart: { zh: "红茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "tea_green",
    compositionTags: ["tea", "green_tea", "fresh"],
    roleTags: ["base", "carrier"],
    baseTags: ["tea_base"],
    identityTags: ["green_tea"],
    displayRole: "base",
    labelPart: { zh: "绿茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "tea_oolong",
    compositionTags: ["tea", "oolong_tea", "roasted", "premium"],
    roleTags: ["base", "carrier"],
    baseTags: ["tea_base"],
    identityTags: ["oolong_tea"],
    displayRole: "base",
    labelPart: { zh: "乌龙茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / aromaTags; labelPart is display only."
  },
  {
    ingredientId: "tea_jasmine",
    compositionTags: ["tea", "jasmine_tea", "floral", "fresh"],
    roleTags: ["base", "carrier", "flavor"],
    baseTags: ["tea_base"],
    identityTags: ["jasmine_tea"],
    displayRole: "base",
    labelPart: { zh: "茉莉茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "tea_puer",
    compositionTags: ["tea", "puer_tea", "earthy", "fermented"],
    roleTags: ["base", "carrier"],
    baseTags: ["tea_base"],
    identityTags: ["puer_tea"],
    displayRole: "base",
    labelPart: { zh: "普洱茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "dairy_milk",
    compositionTags: ["dairy", "milk"],
    roleTags: ["base", "carrier", "support"],
    baseTags: ["dairy_base"],
    identityTags: ["milk"],
    displayRole: "base",
    labelPart: { zh: "牛奶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Dairy support and base identity; labelPart is display only."
  },
  {
    ingredientId: "dairy_thick_milk",
    compositionTags: ["dairy", "thick_milk", "creamy"],
    roleTags: ["base", "carrier", "support"],
    baseTags: ["dairy_base"],
    identityTags: ["thick_milk"],
    displayRole: "base",
    labelPart: { zh: "厚乳" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Dairy base with stronger mouthfeel; labelPart is display only."
  },
  {
    ingredientId: "dairy_cream",
    compositionTags: ["dairy", "cream", "dessert", "rich"],
    roleTags: ["support", "texture", "flavor"],
    baseTags: ["dairy_base"],
    identityTags: ["cream"],
    displayRole: "modifier",
    labelPart: { zh: "奶油" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Cream can name dessert-like drinks but remains non-combo identity."
  },
  {
    ingredientId: "dairy_coconut_milk",
    compositionTags: ["dairy", "coconut", "tropical", "creamy"],
    roleTags: ["base", "carrier", "support", "flavor"],
    baseTags: ["dairy_base"],
    identityTags: ["coconut_milk"],
    displayRole: "base",
    labelPart: { zh: "椰奶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Dairy-like base plus coconut identity; labelPart is display only."
  },
  {
    ingredientId: "dairy_oat_milk",
    compositionTags: ["dairy", "oat_milk", "grain"],
    roleTags: ["base", "carrier", "support"],
    baseTags: ["dairy_base"],
    identityTags: ["oat_milk"],
    displayRole: "base",
    labelPart: { zh: "燕麦奶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Plant dairy base identity; labelPart is display only."
  },
  {
    ingredientId: "dairy_non_dairy_creamer",
    compositionTags: ["dairy", "creamer", "industrial"],
    roleTags: ["base", "carrier", "support"],
    baseTags: ["dairy_base"],
    identityTags: ["non_dairy_creamer", "industrial"],
    displayRole: "base",
    labelPart: { zh: "植脂奶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Industrial dairy-like base identity; labelPart is display only."
  },
  {
    ingredientId: "liquid_water",
    compositionTags: ["water", "neutral"],
    roleTags: ["base", "carrier", "dilution"],
    baseTags: ["water_base"],
    identityTags: ["water"],
    displayRole: "base",
    labelPart: { zh: "水" },
    excludeFromComposedTypeLabel: true,
    schemaGaps: [],
    notes: "Water is a carrier and usually hidden in composed labels."
  },
  {
    ingredientId: "liquid_sparkling_water",
    compositionTags: ["water", "sparkling", "fresh"],
    roleTags: ["base", "carrier", "sparkling"],
    baseTags: ["water_base", "sparkling_base"],
    identityTags: ["sparkling_water"],
    displayRole: "base",
    labelPart: { zh: "气泡" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Sparkling can appear in fruit drink labels; labelPart is display only."
  },
  {
    ingredientId: "liquid_coffee",
    compositionTags: ["coffee", "roasted", "strong_identity"],
    roleTags: ["base", "carrier", "flavor"],
    baseTags: ["coffee_base"],
    identityTags: ["coffee"],
    displayRole: "base",
    labelPart: { zh: "咖啡" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Coffee can be base or primary identity; context is for future composer."
  },
  {
    ingredientId: "fruit_lemon",
    compositionTags: ["fruit", "citrus", "fresh"],
    roleTags: ["flavor", "acid_balance"],
    baseTags: [],
    identityTags: ["lemon"],
    displayRole: "primary_identity",
    labelPart: { zh: "柠檬" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_strawberry",
    compositionTags: ["fruit", "berry", "dessert"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["strawberry"],
    displayRole: "primary_identity",
    labelPart: { zh: "草莓" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_mango",
    compositionTags: ["fruit", "tropical_fruit", "dessert"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["mango"],
    displayRole: "primary_identity",
    labelPart: { zh: "芒果" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_durian",
    compositionTags: ["fruit", "tropical_fruit", "controversial", "strong_identity"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["durian", "strong_identity", "controversial"],
    displayRole: "primary_identity",
    labelPart: { zh: "榴莲" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Strong identity fruit; no combo-specific drinkTypeId is implied."
  },
  {
    ingredientId: "fruit_watermelon",
    compositionTags: ["fruit", "melon", "fresh"],
    roleTags: ["flavor", "hydration"],
    baseTags: [],
    identityTags: ["watermelon"],
    displayRole: "primary_identity",
    labelPart: { zh: "西瓜" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_grape",
    compositionTags: ["fruit", "berry"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["grape"],
    displayRole: "primary_identity",
    labelPart: { zh: "葡萄" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_peach",
    compositionTags: ["fruit", "stone_fruit", "floral"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["peach"],
    displayRole: "primary_identity",
    labelPart: { zh: "桃子" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "fruit_lychee",
    compositionTags: ["fruit", "tropical_fruit", "floral"],
    roleTags: ["flavor"],
    baseTags: [],
    identityTags: ["lychee"],
    displayRole: "primary_identity",
    labelPart: { zh: "荔枝" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Uses flavor profile identityTags / flavorFamilies; labelPart is display only."
  },
  {
    ingredientId: "flavor_matcha",
    compositionTags: ["tea", "matcha", "dessert", "herbal", "strong_identity"],
    roleTags: ["flavor", "powder"],
    baseTags: [],
    identityTags: ["matcha", "strong_identity"],
    displayRole: "primary_identity",
    labelPart: { zh: "抹茶" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Not a fruit and not tea_base; old UI category is display-only legacy."
  },
  {
    ingredientId: "flavor_cocoa",
    compositionTags: ["cocoa", "dessert", "roasted", "strong_identity"],
    roleTags: ["flavor", "powder"],
    baseTags: [],
    identityTags: ["cocoa", "strong_identity"],
    displayRole: "primary_identity",
    labelPart: { zh: "可可" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Not a fruit; old UI category is display-only legacy."
  },
  {
    ingredientId: "sweetener_white_sugar",
    compositionTags: ["sweetener"],
    roleTags: ["sweetener", "balance"],
    baseTags: [],
    identityTags: ["white_sugar"],
    displayRole: "hidden_balance",
    labelPart: { zh: "白糖" },
    excludeFromComposedTypeLabel: true,
    schemaGaps: [],
    notes: "Important taste/balance input, but should not compose labels such as white sugar milk tea."
  },
  {
    ingredientId: "sweetener_honey",
    compositionTags: ["sweetener", "floral"],
    roleTags: ["sweetener", "balance"],
    baseTags: [],
    identityTags: ["honey"],
    displayRole: "modifier",
    labelPart: { zh: "蜂蜜" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Can display as modifier; labelPart is display only."
  },
  {
    ingredientId: "sweetener_brown_sugar",
    compositionTags: ["sweetener", "caramelized"],
    roleTags: ["sweetener", "balance"],
    baseTags: [],
    identityTags: ["brown_sugar"],
    displayRole: "modifier",
    labelPart: { zh: "黑糖" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Can display as modifier; labelPart is display only."
  },
  {
    ingredientId: "sweetener_caramel",
    compositionTags: ["sweetener", "caramelized"],
    roleTags: ["sweetener", "balance"],
    baseTags: [],
    identityTags: ["caramel"],
    displayRole: "modifier",
    labelPart: { zh: "焦糖" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Can display as modifier; labelPart is display only."
  },
  {
    ingredientId: "seasoning_sea_salt",
    compositionTags: ["seasoning", "savory"],
    roleTags: ["seasoning", "balance"],
    baseTags: [],
    identityTags: ["sea_salt"],
    displayRole: "modifier",
    labelPart: { zh: "海盐" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: ["saltiness"],
    notes: "Can display as modifier; saltiness remains schema gap."
  },
  {
    ingredientId: "topping_pearl",
    compositionTags: ["topping", "starch"],
    roleTags: ["topping", "texture"],
    baseTags: [],
    identityTags: ["pearl"],
    displayRole: "modifier",
    labelPart: { zh: "珍珠" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_coconut_jelly",
    compositionTags: ["topping", "tropical", "coconut"],
    roleTags: ["topping", "texture"],
    baseTags: [],
    identityTags: ["coconut_jelly"],
    displayRole: "modifier",
    labelPart: { zh: "椰果" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_pudding",
    compositionTags: ["topping", "dessert", "dairy"],
    roleTags: ["topping", "texture", "dessert"],
    baseTags: [],
    identityTags: ["pudding"],
    displayRole: "modifier",
    labelPart: { zh: "布丁" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_grass_jelly",
    compositionTags: ["topping", "herbal"],
    roleTags: ["topping", "texture"],
    baseTags: [],
    identityTags: ["grass_jelly"],
    displayRole: "modifier",
    labelPart: { zh: "仙草" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_taro_ball",
    compositionTags: ["topping", "starch"],
    roleTags: ["topping", "texture"],
    baseTags: [],
    identityTags: ["taro_ball"],
    displayRole: "modifier",
    labelPart: { zh: "芋圆" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_oreo_crumble",
    compositionTags: ["topping", "dessert", "cocoa"],
    roleTags: ["topping", "texture", "dessert"],
    baseTags: [],
    identityTags: ["oreo"],
    displayRole: "modifier",
    labelPart: { zh: "奥利奥" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Topping broad tag plus concrete identity for future composed labels."
  },
  {
    ingredientId: "topping_taro_paste",
    compositionTags: ["topping", "starch", "dessert"],
    roleTags: ["topping", "texture", "flavor"],
    baseTags: [],
    identityTags: ["taro_paste"],
    displayRole: "modifier",
    labelPart: { zh: "芋泥" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Taro paste keeps concrete identity for labels; not a combo drinkTypeId."
  },
  {
    ingredientId: "topping_cheese_foam",
    compositionTags: ["topping", "dairy", "dessert", "savory"],
    roleTags: ["topping", "texture", "support"],
    baseTags: [],
    identityTags: ["cheese_foam"],
    displayRole: "modifier",
    labelPart: { zh: "奶盖" },
    excludeFromComposedTypeLabel: false,
    schemaGaps: [],
    notes: "Cheese foam keeps concrete modifier identity; labelPart is display only."
  }
];

function cloneArray(value) {
  return Array.isArray(value) ? [...value] : [];
}

function cloneEntry(entry) {
  return {
    ingredientId: entry.ingredientId,
    compositionTags: cloneArray(entry.compositionTags),
    roleTags: cloneArray(entry.roleTags),
    baseTags: cloneArray(entry.baseTags),
    identityTags: cloneArray(entry.identityTags),
    displayRole: entry.displayRole,
    labelPart: { ...entry.labelPart },
    excludeFromComposedTypeLabel: entry.excludeFromComposedTypeLabel,
    schemaGaps: cloneArray(entry.schemaGaps),
    notes: entry.notes
  };
}

function listIngredientCompositionTags() {
  return ingredientCompositionTags.map(cloneEntry);
}

function getIngredientCompositionTags(ingredientId) {
  const entry = ingredientCompositionTags.find(item => item.ingredientId === ingredientId);
  return entry ? cloneEntry(entry) : null;
}

root.MILK_TEA_LAB_INGREDIENT_COMPOSITION_TAGS = {
  compositionTagMetadata,
  ingredientCompositionTags,
  listIngredientCompositionTags,
  getIngredientCompositionTags
};

if (typeof module !== "undefined") {
  module.exports = root.MILK_TEA_LAB_INGREDIENT_COMPOSITION_TAGS;
}
})(typeof window !== "undefined" ? window : globalThis);
