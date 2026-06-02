(function() {
const { sumIngredientGroup } = window.MILK_TEA_LAB_INGREDIENT_GROUP_HELPER;
const { has } = window.MILK_TEA_LAB_HELPERS;
const { drinkTypeRules, defaultType } = window.MILK_TEA_LAB_DRINK_TYPE_RULES;

function analyzeFruitTeaBlend(context) {
  const teaCandidates = ["茉莉茶", "绿茶", "乌龙茶", "红茶"];
  const fruitCandidates = ["桃子", "葡萄", "荔枝", "草莓", "西瓜", "芒果"];
  const teaTotal = context.sumRatios(teaCandidates);
  const fruits = fruitCandidates
    .map(name => ({ name, ratio: context.ratioOf(name) }))
    .filter(item => item.ratio > 0);
  const lemon = context.ratioOf("柠檬");
  const fruitCount = fruits.length + (lemon > 0 && lemon <= 15 ? 1 : 0);
  const fruitTotal = fruits.reduce((sum, item) => sum + item.ratio, 0) + Math.min(lemon, 15);
  const dairyTotal = sumIngredientGroup(context, "dairy");
  const highFatDairyTotal = sumIngredientGroup(context, "highFatDairy");
  const strawTotal = sumIngredientGroup(context, "strawResistance");
  const disruptiveTotal = dairyTotal + highFatDairyTotal + context.ratioOf("咖啡") + context.ratioOf("榴莲") + context.ratioOf("奥利奥碎") + context.ratioOf("芋泥") + Math.max(0, strawTotal - 12);

  if (teaTotal < 25 || fruitCount < 2 || fruitTotal < 32 || disruptiveTotal > 18) return null;

  const primaryTea = teaCandidates
    .map(name => ({ name, ratio: context.ratioOf(name) }))
    .sort((left, right) => right.ratio - left.ratio)[0];
  if (!primaryTea || primaryTea.ratio <= 0) return null;

  const bubble = context.ratioOf("气泡水");
  const sweetSupport = context.sumRatios(["蜂蜜", "白糖"]);
  const waterSupport = context.sumRatios(["纯水", "气泡水"]);
  let score = 16;
  let cap = 88;
  const add = { fresh: 18, fruit: 18, tea: 8, photo: 8, odd: -8 };

  if (primaryTea.name === "茉莉茶") {
    score += 5;
    add.fresh += 5;
    add.photo += 3;
  } else if (primaryTea.name === "绿茶") {
    score += 4;
    add.fresh += 5;
  } else if (primaryTea.name === "乌龙茶") {
    score += 2;
    add.tea += 3;
  } else if (primaryTea.name === "红茶") {
    score += 1;
    add.fresh -= 2;
  }

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

  const typeMap = {
    茉莉茶: "水果茉莉茶",
    绿茶: "水果绿茶",
    乌龙茶: "水果乌龙茶",
    红茶: "水果红茶"
  };
  const type = bubble >= 10 ? "气泡水果茶" : typeMap[primaryTea.name] || "花果茶";
  const note = bubble >= 10
    ? "茶、水果和气泡的结构成立，清爽感很足，但气泡不是万能满分按钮。"
    : `${primaryTea.name}和水果搭得自然，像一杯认真做过功课的花果茶。`;

  return { type, score, add, cap, note };
}

function compare(left, op, right) {
  if (op === ">=") return left >= right;
  if (op === ">") return left > right;
  if (op === "<=") return left <= right;
  if (op === "<") return left < right;
  if (op === "===") return left === right;
  return false;
}

function matchesCondition(condition, attr, names, score) {
  if (condition.all) return condition.all.every(item => matchesCondition(item, attr, names, score));
  if (condition.any) return condition.any.some(item => matchesCondition(item, attr, names, score));
  if (condition.ingredient) return has(condition.ingredient, names);
  if (condition.allIngredients) return condition.allIngredients.every(name => has(name, names));
  if (condition.anyIngredient) return condition.anyIngredient.some(name => has(name, names));
  if (condition.attr) return compare(attr[condition.attr] || 0, condition.op, condition.value);
  if (condition.score) return compare(score, condition.score, condition.value);
  return false;
}

function inferType(attr, names, score) {
  const matchedRule = drinkTypeRules.find(rule => matchesCondition(rule.when, attr, names, score));
  return matchedRule?.type || defaultType;
}

function inferAudience(attr, names, score) {
  const audience = [];
  const plantMilk = has("植脂奶", names);
  if (score >= 58 && attr.cost <= 55) audience.push("学生");
  if (score >= 60 && attr.sweet <= 58 && !plantMilk) audience.push("白领");
  if (attr.sweet <= 35 && attr.bubble <= 25 && attr.odd <= 25 && attr.greasy < 55 && !plantMilk) audience.push("老人");
  if (attr.photo >= 48 || (attr.fruit >= 35 && attr.milk >= 24)) audience.push("情侣");
  if (attr.sweet <= 30 && attr.thick <= 38 && !plantMilk) audience.push("健身党");
  if (attr.odd >= 48 || has("榴莲", names)) audience.push("猎奇党");
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

window.MILK_TEA_LAB_DRINK_TYPE_ANALYZER = {
  analyzeFruitTeaBlend,
  inferType,
  inferAudience
};
})();
