(function() {
const { getCalculationProfile } = window.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES;

const attributeKeys = [
  "fresh",
  "thick",
  "sweet",
  "acid",
  "tea",
  "milk",
  "fruit",
  "bubble",
  "straw",
  "greasy",
  "odd",
  "cost",
  "difficulty",
  "photo"
];

function createInitialAttributes() {
  return {
    fresh: 10,
    thick: 8,
    sweet: 6,
    acid: 0,
    tea: 0,
    milk: 0,
    fruit: 0,
    bubble: 0,
    straw: 0,
    greasy: 0,
    odd: 0,
    cost: 0,
    difficulty: 0,
    photo: 8
  };
}

function applyAttributeBoost(attr, boost) {
  Object.entries(boost).forEach(([key, value]) => {
    attr[key] += value;
  });
}

function analyzeBaseAttributes(context) {
  const attr = createInitialAttributes();
  context.activeCup.forEach(item => {
    const profile = getCalculationProfile(item.name);
    const weight = item.ratio / 32;
    attributeKeys.forEach(key => {
      attr[key] += (profile[key] || 0) * weight;
    });
  });
  return attr;
}

window.MILK_TEA_LAB_INGREDIENT_ANALYZER = {
  analyzeBaseAttributes,
  applyAttributeBoost
};
})();
