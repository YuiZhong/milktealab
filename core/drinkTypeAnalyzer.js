(function() {
const { sumIngredientGroup } = window.MILK_TEA_LAB_INGREDIENT_GROUP_HELPER;
const { hasRuleRef, ratioOfRuleRef, sumRuleRefs } = window.MILK_TEA_LAB_RULE_REF_HELPER;
const { has } = window.MILK_TEA_LAB_HELPERS;
const { drinkTypeRules, defaultType, defaultTypeId } = window.MILK_TEA_LAB_DRINK_TYPE_RULES;
const audienceIdByName = {
  "学生": "student",
  "白领": "office_worker",
  "老人": "elderly",
  "情侣": "couple",
  "健身党": "fitness",
  "猎奇党": "novelty_seeker",
  "网红打卡党": "influencer"
};

const fruitTeaTeaRefs = [
  { displayName: "茉莉茶", ref: { ingredientId: "tea_jasmine" }, scoreBonus: 5, add: { fresh: 5, photo: 3 }, type: "水果茉莉茶", drinkTypeId: "fruit_jasmine_tea" },
  { displayName: "绿茶", ref: { ingredientId: "tea_green" }, scoreBonus: 4, add: { fresh: 5 }, type: "水果绿茶", drinkTypeId: "fruit_green_tea" },
  { displayName: "乌龙茶", ref: { ingredientId: "tea_oolong" }, scoreBonus: 2, add: { tea: 3 }, type: "水果乌龙茶", drinkTypeId: "fruit_oolong_tea" },
  { displayName: "红茶", ref: { ingredientId: "tea_black" }, scoreBonus: 1, add: { fresh: -2 }, type: "水果红茶", drinkTypeId: "fruit_black_tea" }
];

const fruitTeaFruitRefs = [
  { name: "桃子", ref: { ingredientId: "fruit_peach" } },
  { name: "葡萄", ref: { ingredientId: "fruit_grape" } },
  { name: "荔枝", ref: { ingredientId: "fruit_lychee" } },
  { name: "草莓", ref: { ingredientId: "fruit_strawberry" } },
  { name: "西瓜", ref: { ingredientId: "fruit_watermelon" } },
  { name: "芒果", ref: { ingredientId: "fruit_mango" } }
];

const fruitTeaDisruptiveRefs = [
  { ingredientId: "liquid_coffee" },
  { ingredientId: "fruit_durian" },
  { ingredientId: "topping_oreo_crumble" },
  { ingredientId: "topping_taro_paste" }
];

const fruitTeaSweetSupportRefs = [
  { ingredientId: "sweetener_honey" },
  { ingredientId: "sweetener_white_sugar" }
];

const fruitTeaWaterSupportRefs = [
  { ingredientId: "liquid_water" },
  { ingredientId: "liquid_sparkling_water" }
];

function analyzeFruitTeaBlend(context) {
  const teaTotal = sumRuleRefs(context, fruitTeaTeaRefs.map(item => item.ref));
  const fruits = fruitTeaFruitRefs
    .map(item => ({ name: item.name, ratio: ratioOfRuleRef(context, item.ref) }))
    .filter(item => item.ratio > 0);
  const lemon = ratioOfRuleRef(context, { ingredientId: "fruit_lemon" });
  const fruitCount = fruits.length + (lemon > 0 && lemon <= 15 ? 1 : 0);
  const fruitTotal = fruits.reduce((sum, item) => sum + item.ratio, 0) + Math.min(lemon, 15);
  const dairyTotal = sumIngredientGroup(context, "dairy");
  const highFatDairyTotal = sumIngredientGroup(context, "highFatDairy");
  const strawTotal = sumIngredientGroup(context, "strawResistance");
  const disruptiveTotal = dairyTotal + highFatDairyTotal + sumRuleRefs(context, fruitTeaDisruptiveRefs) + Math.max(0, strawTotal - 12);

  if (teaTotal < 25 || fruitCount < 2 || fruitTotal < 32 || disruptiveTotal > 18) return null;

  const primaryTea = fruitTeaTeaRefs
    .map(item => ({ ...item, ratio: ratioOfRuleRef(context, item.ref) }))
    .sort((left, right) => right.ratio - left.ratio)[0];
  if (!primaryTea || primaryTea.ratio <= 0) return null;

  const bubble = ratioOfRuleRef(context, { ingredientId: "liquid_sparkling_water" });
  const sweetSupport = sumRuleRefs(context, fruitTeaSweetSupportRefs);
  const waterSupport = sumRuleRefs(context, fruitTeaWaterSupportRefs);
  let score = 16;
  let cap = 88;
  const add = { fresh: 18, fruit: 18, tea: 8, photo: 8, odd: -8 };

  score += primaryTea.scoreBonus || 0;
  Object.entries(primaryTea.add || {}).forEach(([key, value]) => {
    add[key] = (add[key] || 0) + value;
  });

  if (fruitCount === 2) {
    score += 4;
  } else if (fruitCount === 3) {
    score += 2;
  } else if (fruitCount >= 4) {
    score -= 6;
    add.odd += 8;
    cap = 84;
  }

  if (sweetSupport >= 6 && sweetSupport <= 14) score += 3;
  if (waterSupport >= 5 && waterSupport <= 25) score += 2;
  if (bubble >= 10 && bubble <= 30) {
    score += 3;
    add.bubble = 6;
    cap = 95;
  } else if (bubble > 30) {
    cap = 91;
  }

  const typeResult = bubble >= 10
    ? { type: "气泡水果茶", drinkTypeId: "sparkling_fruit_tea" }
    : { type: primaryTea.type || "花果茶", drinkTypeId: primaryTea.drinkTypeId || "flower_fruit_tea" };
  const note = bubble >= 10
    ? "茶、水果和气泡的结构成立，清爽感很足，但气泡不是万能满分按钮。"
    : `${primaryTea.displayName}和水果搭得自然，像一杯认真做过功课的花果茶。`;

  return { ...typeResult, score, add, cap, note };
}

function compare(left, op, right) {
  if (op === ">=") return left >= right;
  if (op === ">") return left > right;
  if (op === "<=") return left <= right;
  if (op === "<") return left < right;
  if (op === "===") return left === right;
  return false;
}

function getSingleDrinkTypeRef(condition) {
  if (condition.ingredientId) return { ingredientId: condition.ingredientId };
  if (condition.ingredientRef) return condition.ingredientRef;
  if (condition.ref) return condition.ref;
  return null;
}

function getAnyDrinkTypeRefs(condition) {
  return condition.anyRefs || condition.anyIngredientRefs || condition.anyIngredientIds || null;
}

function getAllDrinkTypeRefs(condition) {
  return condition.allRefs || condition.allIngredientRefs || condition.allIngredientIds || condition.refs || condition.ingredientIds || null;
}

function hasDrinkTypeRef(context, ref) {
  if (!context || !ref) return false;
  return hasRuleRef(context, ref);
}

function hasAnyDrinkTypeRefs(context, refs = []) {
  return Array.isArray(refs) && refs.some(ref => hasDrinkTypeRef(context, ref));
}

function hasAllDrinkTypeRefs(context, refs = []) {
  return Array.isArray(refs) && refs.length > 0 && refs.every(ref => hasDrinkTypeRef(context, ref));
}

function hasLegacyIngredient(context, names, name) {
  // Legacy compatibility only for rule rows that have not yet migrated to ingredientId refs.
  return has(name, names) || hasDrinkTypeRef(context, name);
}

function matchesCondition(condition, attr, names, score, context) {
  if (condition.all) return condition.all.every(item => matchesCondition(item, attr, names, score, context));
  if (condition.any) return condition.any.some(item => matchesCondition(item, attr, names, score, context));
  const singleRef = getSingleDrinkTypeRef(condition);
  if (singleRef) return hasDrinkTypeRef(context, singleRef);
  const allRefs = getAllDrinkTypeRefs(condition);
  if (allRefs) return hasAllDrinkTypeRefs(context, allRefs);
  const anyRefs = getAnyDrinkTypeRefs(condition);
  if (anyRefs) return hasAnyDrinkTypeRefs(context, anyRefs);
  if (condition.ingredient) return hasLegacyIngredient(context, names, condition.ingredient);
  if (condition.allIngredients) return condition.allIngredients.every(name => hasLegacyIngredient(context, names, name));
  if (condition.anyIngredient) return condition.anyIngredient.some(name => hasLegacyIngredient(context, names, name));
  if (condition.attr) return compare(attr[condition.attr] || 0, condition.op, condition.value);
  if (condition.score) return compare(score, condition.score, condition.value);
  return false;
}

function inferTypeResult(attr, names, score, context = null) {
  const matchedRule = drinkTypeRules.find(rule => matchesCondition(rule.when, attr, names, score, context));
  if (matchedRule) {
    return {
      type: matchedRule.type,
      drinkTypeId: matchedRule.drinkTypeId
    };
  }
  return {
    type: defaultType,
    drinkTypeId: defaultTypeId
  };
}

function inferType(attr, names, score, context = null) {
  return inferTypeResult(attr, names, score, context).type;
}

function hasAudienceIngredient(context, names, name, ref) {
  // Prefer stable refs; names remain only as legacy compatibility for old callers.
  return hasDrinkTypeRef(context, ref) || has(name, names);
}

function inferAudience(attr, names, score, context = null) {
  const audience = [];
  const plantMilk = hasAudienceIngredient(context, names, "植脂奶", { ingredientId: "dairy_non_dairy_creamer" });
  const durian = hasAudienceIngredient(context, names, "榴莲", { ingredientId: "fruit_durian" });
  if (score >= 58 && attr.cost <= 55) audience.push("学生");
  if (score >= 60 && attr.sweet <= 58 && !plantMilk) audience.push("白领");
  if (attr.sweet <= 35 && attr.bubble <= 25 && attr.odd <= 25 && attr.greasy < 55 && !plantMilk) audience.push("老人");
  if (attr.photo >= 48 || (attr.fruit >= 35 && attr.milk >= 24)) audience.push("情侣");
  if (attr.sweet <= 30 && attr.thick <= 38 && !plantMilk) audience.push("健身党");
  if (attr.odd >= 48 || durian) audience.push("猎奇党");
  if (attr.photo >= 52 || attr.odd >= 55) audience.push("网红打卡党");
  if (!audience.length) {
    if (plantMilk) {
      audience.push("学生");
    } else if (attr.greasy >= 65) {
      audience.push("学生");
    } else {
      audience.push("学生", "白领");
    }
  }
  return audience.slice(0, 4);
}

function inferAudienceResult(attr, names, score, context = null) {
  const audience = inferAudience(attr, names, score, context);
  const audienceIds = audience
    .map(name => audienceIdByName[name])
    .filter(Boolean);

  return { audience, audienceIds };
}

window.MILK_TEA_LAB_DRINK_TYPE_ANALYZER = {
  analyzeFruitTeaBlend,
  inferTypeResult,
  inferType,
  inferAudience,
  inferAudienceResult
};
})();
