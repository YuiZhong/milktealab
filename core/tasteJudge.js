(function() {
const { clamp, pick } = window.MILK_TEA_LAB_HELPERS;
const scoreEngine = window.MILK_TEA_LAB_SCORE_ENGINE;
const feedbackEngine = window.MILK_TEA_LAB_FEEDBACK_ENGINE;
const { createTasteContext } = window.MILK_TEA_LAB_TASTE_CONTEXT;
const { analyzeDrinkStructure } = window.MILK_TEA_LAB_DRINK_STRUCTURE_ANALYZER;
const ingredientAnalyzer = window.MILK_TEA_LAB_INGREDIENT_ANALYZER;
const proportionAnalyzer = window.MILK_TEA_LAB_PROPORTION_ANALYZER;
const accidentAnalyzer = window.MILK_TEA_LAB_ACCIDENT_ANALYZER;
const combinationAnalyzer = window.MILK_TEA_LAB_COMBINATION_ANALYZER;
const drinkTypeAnalyzer = window.MILK_TEA_LAB_DRINK_TYPE_ANALYZER;

function evaluateCup(cup) {
  const context = createTasteContext(cup);
  if (!context.activeCup.length || context.totalRatio() !== 100) return null;
  context.structure = analyzeDrinkStructure(context);

  const attr = ingredientAnalyzer.analyzeBaseAttributes(context);
  const score = scoreEngine.createScoreState(54);
  const accidentNotes = [];
  const badNotes = [];
  const goodNotes = [];
  const segmentNotes = [];
  const generalNotes = [];
  let forcedType = null;

  const segmentResult = proportionAnalyzer.applyProportionSegments(context, attr);
  scoreEngine.addScore(score, segmentResult.scoreDelta);
  segmentNotes.push(...segmentResult.notes);

  const accidents = accidentAnalyzer.detectAccidents(context).sort((left, right) => left.cap - right.cap);
  accidents.forEach(accident => {
    scoreEngine.addScore(score, accident.score);
    scoreEngine.applyScoreCap(score, accident.cap);
    forcedType = forcedType || accident.type;
    ingredientAnalyzer.applyAttributeBoost(attr, accident.add);
    accidentNotes.push(accident.note);
  });

  combinationAnalyzer.findComboMatches("bad", context.names).forEach(rule => {
    scoreEngine.addScore(score, rule.score);
    ingredientAnalyzer.applyAttributeBoost(attr, rule.add);
    forcedType = forcedType || (rule.names.includes("柠檬") && rule.names.includes("牛奶") ? "口感事故" : "口感冲突");
    badNotes.push(rule.note);
  });

  if (!accidents.length && !badNotes.length) {
    const fruitTeaBlend = drinkTypeAnalyzer.analyzeFruitTeaBlend(context);
    if (fruitTeaBlend) {
      scoreEngine.addScore(score, fruitTeaBlend.score);
      scoreEngine.applyScoreCap(score, fruitTeaBlend.cap);
      forcedType = forcedType || fruitTeaBlend.type;
      ingredientAnalyzer.applyAttributeBoost(attr, fruitTeaBlend.add);
      goodNotes.push(fruitTeaBlend.note);
    }

    combinationAnalyzer.findComboMatches("good", context.names).forEach(rule => {
      scoreEngine.addScore(score, rule.score);
      ingredientAnalyzer.applyAttributeBoost(attr, rule.add);
      goodNotes.push(rule.note);
    });
  }

  const teaCount = context.countByCategory("茶类");
  const toppingCount = context.countByCategory("小料");
  const dairyCount = context.countByCategory("乳类");
  const flavorCount = context.countByCategory("水果/风味");
  const teaMixRule = combinationAnalyzer.getTeaMixRule();

  if (teaCount >= teaMixRule.minCount) {
    attr.odd += teaMixRule.add.oddBase + (teaCount - teaMixRule.minCount) * teaMixRule.add.oddPerExtra;
    attr.tea += teaMixRule.add.tea;
    attr.difficulty += teaMixRule.add.difficulty;
    scoreEngine.addScore(score, teaMixRule.score);
    generalNotes.push(teaMixRule.note);
  }
  if (toppingCount >= 3) {
    attr.thick += 16;
    attr.difficulty += 8;
    scoreEngine.addScore(score, -7);
    generalNotes.push("小料很多，喝一口像在杯子里寻宝，也像在做咀嚼训练。");
  }
  if (dairyCount >= 3) {
    attr.thick += 14;
    attr.milk += 10;
    attr.odd += 8;
    scoreEngine.addScore(score, -6);
  }
  if (flavorCount >= 4) {
    attr.fruit += 14;
    attr.odd += 10;
    scoreEngine.addScore(score, -7);
  }

  const hasMilkFatAccident = accidents.some(accident => accident.type === "奶脂过载");

  if (attr.thick >= 70 && attr.straw < 48 && !hasMilkFatAccident) {
    attr.fresh -= 18;
    attr.cost += 8;
    attr.difficulty += 6;
    attr.greasy += 10;
    scoreEngine.addScore(score, -10);
    generalNotes.push(pick([
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "好喝是好喝，就是喝完胃可能想请半天假。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "它不像奶茶，更像一份假装成饮料的甜品。",
      "第一口很幸福，第三口开始需要勇气。"
    ]));
  }

  scoreEngine.applyAttributeScore(score, attr, context.activeCup.length);

  Object.keys(attr).forEach(key => {
    attr[key] = Math.round(clamp(attr[key]));
  });

  const finalScore = scoreEngine.finalizeScore(score);
  const type = forcedType || drinkTypeAnalyzer.inferType(attr, context.normalizedNames, finalScore);
  const audience = drinkTypeAnalyzer.inferAudience(attr, context.normalizedNames, finalScore);
  const priorityNotes = accidentNotes.length
    ? accidentNotes
    : badNotes.length
      ? badNotes
      : goodNotes.length
        ? goodNotes
        : segmentNotes.length
          ? [segmentNotes[0]]
          : generalNotes;
  const feedback = feedbackEngine.makeFeedback(attr, finalScore, priorityNotes, accidents.length > 0);

  return { attr, score: finalScore, type, audience, feedback };
}

window.MILK_TEA_LAB_TASTE_JUDGE = {
  evaluateCup
};
})();
