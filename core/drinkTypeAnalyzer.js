(function() {
const {
  dairyNames,
  highFatDairyNames,
  strawResistanceNames
} = window.MILK_TEA_LAB_SYNERGY_RULES;
const { has, hasAny } = window.MILK_TEA_LAB_HELPERS;

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
  const dairyTotal = context.sumRatios(dairyNames);
  const highFatDairyTotal = context.sumRatios(highFatDairyNames);
  const strawTotal = context.sumRatios(strawResistanceNames);
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

function inferType(attr, names, score) {
  if (attr.straw >= 70 || (score < 38 && attr.straw >= 55)) return "口感事故";
  if (attr.greasy >= 78 && attr.straw < 50) return "奶脂过载";
  if (has("榴莲", names) && attr.milk >= 45 && attr.odd < 55) return attr.thick >= 58 ? "榴莲奶昔" : "榴莲牛乳";
  if (has("草莓", names) && (has("牛奶", names) || has("淡奶油", names) || has("厚乳", names))) return "甜品奶昔";
  if (attr.thick >= 68 && attr.straw < 50 && attr.odd < 58) return "甜品奶昔";
  if (attr.odd >= 62 || score < 38) return "猎奇实验品";
  if (has("气泡水", names) && has("柠檬", names)) return "清爽水果茶";
  if (has("气泡水", names) && hasAny(names, ["西瓜", "葡萄", "桃子", "绿茶"]) && attr.odd < 45) return "气泡水果茶";
  if (attr.bubble >= 36 && attr.fruit >= 26 && attr.fresh >= 42) return "清爽水果茶";
  if (has("乌龙茶", names) && (has("厚乳", names) || has("奶盖", names)) && attr.odd < 45) return "高级厚乳款";
  if (has("黑糖", names) && has("珍珠", names) && attr.tea >= 26 && attr.milk >= 24 && attr.odd < 45) return "黑糖珍珠奶茶";
  if (attr.tea >= 30 && attr.milk >= 26 && attr.odd < 45) return "经典奶茶";
  if (has("咖啡", names) && attr.milk >= 18) return "咖啡特调";
  if (attr.thick >= 50 && (attr.fruit >= 25 || attr.sweet >= 45)) return "甜品奶昔";
  if (attr.fruit >= 35 && attr.fresh >= 34) return "果味特调";
  if (attr.tea >= 34 && attr.fresh >= 28) return "茶香轻饮";
  return "实验特调";
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
