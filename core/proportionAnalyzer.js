(function() {
const {
  dairyNames,
  highFatDairyNames
} = window.MILK_TEA_LAB_SYNERGY_RULES;
const proportionSegmentRuleEngine = window.MILK_TEA_LAB_PROPORTION_SEGMENT_RULE_ENGINE;

function applyProportionSegments(context, attr) {
  const ruleResult = proportionSegmentRuleEngine.applyProportionSegmentRules(context, attr);
  const notes = [...ruleResult.notes];
  const tags = [...ruleResult.tags];
  const matchedRuleIds = [...ruleResult.matchedRuleIds];
  let scoreDelta = ruleResult.scoreDelta;
  const taro = context.ratioOf("芋泥");
  const oreo = context.ratioOf("奥利奥碎");
  const bubble = context.ratioOf("气泡水");
  const cream = context.ratioOf("淡奶油");
  const dairyTotal = context.sumRatios(dairyNames);
  const highFatDairyTotal = context.sumRatios(highFatDairyNames);
  const toppingTotal = context.sumRatios(["珍珠", "芋圆", "布丁", "仙草", "椰果"]);
  const fruitSupport = context.sumRatios(["柠檬", "西瓜", "葡萄", "桃子", "草莓", "芒果", "荔枝"]);
  const teaSupport = context.sumRatios(["红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"]);
  const sweetSupport = context.sumRatios(["蜂蜜", "白糖", "黑糖", "焦糖"]);

  if (dairyTotal >= 65 && dairyTotal <= 80) {
    attr.fresh -= 8;
    attr.thick += 8;
    attr.greasy += 6;
    scoreDelta -= highFatDairyTotal >= 50 ? 8 : 3;
    notes.push(highFatDairyTotal >= 50 ? "奶脂感开始变重，顺滑是真的，负担也开始出现。" : "这杯偏奶偏厚，更像甜品饮，清爽度会低一点。");
  }

  if (cream > 0 && cream <= 20) {
    scoreDelta += 5;
    attr.photo += 5;
    notes.push("淡奶油让它像甜品，但还没到负担阶段。");
  }

  if (taro > 0 && taro <= 15) {
    attr.thick += 4;
    attr.straw += 4;
    scoreDelta += 3;
    notes.push("芋泥只是增加一点甜品感，还没有把吸管拉进苦战。");
  } else if (taro <= 35 && taro > 15) {
    attr.thick += 14;
    attr.straw += 12;
    attr.sweet += 4;
    scoreDelta += 2;
    notes.push("芋泥成为主风味，甜品感很强，喝起来会更饱。");
  } else if (taro <= 50 && taro > 35) {
    attr.thick += 24;
    attr.straw += 24;
    attr.greasy += 8;
    scoreDelta -= 12;
    notes.push("芋泥比例很高，吸管阻力和饱腹感都明显上来了。");
  }

  if (oreo > 0 && oreo <= 10) {
    attr.sweet += 4;
    attr.straw += 3;
    scoreDelta += 3;
    notes.push("奥利奥碎只是点缀，饼干香有了，吸管还撑得住。");
  } else if (oreo <= 25 && oreo > 10) {
    attr.sweet += 8;
    attr.straw += 12;
    scoreDelta += 1;
    notes.push("奥利奥存在感很强，已经往甜品饮方向走了。");
  } else if (oreo > 25) {
    attr.straw += 24;
    attr.thick += 10;
    scoreDelta -= 10;
    notes.push("奥利奥碎太多，固形物感开始挑战吸管。");
  }

  if (toppingTotal >= 20 && toppingTotal <= 35) {
    attr.straw += 12;
    attr.difficulty += 6;
    scoreDelta += 2;
    notes.push("小料很多，学生可能会喜欢，吸管阻力也确实上来了。");
  } else if (toppingTotal > 35) {
    attr.straw += 28;
    attr.difficulty += 10;
    scoreDelta -= 12;
    notes.push("小料已经过量，喝一口像在给吸管安排体能测试。");
  }

  if (bubble >= 10 && bubble <= 40) {
    attr.fresh += 8;
    attr.bubble += 8;
    if (fruitSupport >= 15 || teaSupport >= 25) scoreDelta += 5;
  } else if (bubble > 70 && fruitSupport < 10 && teaSupport < 20 && sweetSupport < 8) {
    attr.fresh -= 6;
    scoreDelta -= 8;
    notes.push("气泡水很多，但支撑风味太少，喝起来有点空。");
  }

  return { scoreDelta, notes, tags, matchedRuleIds };
}

window.MILK_TEA_LAB_PROPORTION_ANALYZER = {
  applyProportionSegments
};
})();
