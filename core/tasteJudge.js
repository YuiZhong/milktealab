(function() {
const { clamp, pick } = window.MILK_TEA_LAB_HELPERS;
const scoreEngine = window.MILK_TEA_LAB_SCORE_ENGINE;
const feedbackEngine = window.MILK_TEA_LAB_FEEDBACK_ENGINE;
const { createTasteContext } = window.MILK_TEA_LAB_TASTE_CONTEXT;
const { analyzeDrinkStructure } = window.MILK_TEA_LAB_DRINK_STRUCTURE_ANALYZER;
const tasteSummaryEngine = window.MILK_TEA_LAB_TASTE_SUMMARY_ENGINE;
const textureSummaryEngine = window.MILK_TEA_LAB_TEXTURE_SUMMARY_ENGINE;
const ingredientAnalyzer = window.MILK_TEA_LAB_INGREDIENT_ANALYZER;
const proportionAnalyzer = window.MILK_TEA_LAB_PROPORTION_ANALYZER;
const accidentAnalyzer = window.MILK_TEA_LAB_ACCIDENT_ANALYZER;
const combinationAnalyzer = window.MILK_TEA_LAB_COMBINATION_ANALYZER;
const drinkTypeAnalyzer = window.MILK_TEA_LAB_DRINK_TYPE_ANALYZER;

function getRuleIngredientIds(rule) {
  const refs = [
    ...(Array.isArray(rule?.ingredientIds) ? rule.ingredientIds : []),
    ...(Array.isArray(rule?.refs) ? rule.refs : []),
    ...(Array.isArray(rule?.ingredientRefs) ? rule.ingredientRefs : [])
  ];

  return refs
    .map(ref => {
      if (typeof ref === "string") return ref;
      if (ref && typeof ref === "object") return ref.ingredientId || ref.id || null;
      return null;
    })
    .filter(Boolean);
}

function isLemonMilkConflict(rule) {
  const ingredientIds = getRuleIngredientIds(rule);
  if (ingredientIds.includes("fruit_lemon") && ingredientIds.includes("dairy_milk")) return true;
  return Array.isArray(rule?.names) && rule.names.includes("柠檬") && rule.names.includes("牛奶");
}

function isDairyFatOverloadAccident(accident) {
  return accident.accidentTypeId === "dairy_fat_overload" || accident.type === "奶脂过载";
}

function addUniqueTags(target, tags) {
  if (!Array.isArray(tags)) return;
  tags.forEach(tag => {
    if (tag && !target.includes(tag)) target.push(tag);
  });
}

function getCombinationFeedbackTags(rule) {
  if (Array.isArray(rule.feedbackTags)) return rule.feedbackTags;
  const ids = Array.isArray(rule.ingredientIds) ? rule.ingredientIds : [];
  if (ids.includes("tea_black") && ids.includes("dairy_milk")) return ["classic"];
  if (ids.includes("tea_oolong") && ids.includes("dairy_thick_milk")) return ["premium"];
  return [];
}

function getSegmentFeedbackTags(tags) {
  if (!Array.isArray(tags)) return [];
  if (tags.includes("durian_medium") && tags.includes("dairy_supported")) return ["durian"];
  return [];
}

function getAccidentFeedbackTags(accident) {
  const tags = [...(accident.tags || [])];
  if (accident.accidentTypeId === "dairy_fat_overload") tags.push("greasy_overload");
  if (accident.accidentTypeId === "texture_straw_resistance") tags.push("straw_disaster");
  if (tags.includes("acid_accident")) tags.push("acid_accident");
  return tags;
}

const outcomeTypeIdByDisplayType = {
  "口感冲突": "taste_conflict",
  "口感事故": "texture_accident_outcome",
  "奶脂过载": "dairy_fat_overload",
  "猎奇实验品": "novelty_experiment",
  "工业奶茶": "industrial_creamer_overload",
  "实验特调": "experimental_special"
};

function inferOutcomeTypeId(type, accidentTypeId, drinkTypeId) {
  if (accidentTypeId || drinkTypeId) return null;
  return outcomeTypeIdByDisplayType[type] || null;
}

function evaluateCup(cup) {
  const context = createTasteContext(cup);
  if (!context.activeCup.length || context.totalRatio() !== 100) return null;
  context.structure = analyzeDrinkStructure(context);
  const tasteSummary = tasteSummaryEngine?.buildTasteSummary(context) || null;
  const textureSummary = textureSummaryEngine?.buildTextureSummary(context) || null;

  const attr = ingredientAnalyzer.analyzeBaseAttributes(context);
  const score = scoreEngine.createScoreState(54);
  const accidentNotes = [];
  const badNotes = [];
  const goodNotes = [];
  const segmentNotes = [];
  const generalNotes = [];
  const sourceFeedbackTags = [];
  let forcedType = null;
  let forcedDrinkTypeId = null;

  const segmentResult = proportionAnalyzer.applyProportionSegments(context, attr);
  scoreEngine.addScore(score, segmentResult.scoreDelta);
  segmentNotes.push(...segmentResult.notes);
  addUniqueTags(sourceFeedbackTags, segmentResult.tags);
  addUniqueTags(sourceFeedbackTags, getSegmentFeedbackTags(segmentResult.tags));

  const accidents = accidentAnalyzer.detectAccidents(context).sort((left, right) => left.cap - right.cap);
  const primaryAccident = accidents[0] || null;
  accidents.forEach(accident => {
    scoreEngine.addScore(score, accident.score);
    scoreEngine.applyScoreCap(score, accident.cap);
    forcedType = forcedType || accident.type;
    ingredientAnalyzer.applyAttributeBoost(attr, accident.add);
    accidentNotes.push(accident.note);
    addUniqueTags(sourceFeedbackTags, getAccidentFeedbackTags(accident));
  });

  combinationAnalyzer.findComboMatches("bad", context).forEach(rule => {
    scoreEngine.addScore(score, rule.score);
    ingredientAnalyzer.applyAttributeBoost(attr, rule.add);
    forcedType = forcedType || (isLemonMilkConflict(rule) ? "口感事故" : "口感冲突");
    badNotes.push(rule.note);
    addUniqueTags(sourceFeedbackTags, rule.feedbackTags);
  });

  if (!accidents.length && !badNotes.length) {
    const fruitTeaBlend = drinkTypeAnalyzer.analyzeFruitTeaBlend(context);
    if (fruitTeaBlend) {
      scoreEngine.addScore(score, fruitTeaBlend.score);
      scoreEngine.applyScoreCap(score, fruitTeaBlend.cap);
      forcedType = forcedType || fruitTeaBlend.type;
      forcedDrinkTypeId = forcedDrinkTypeId || fruitTeaBlend.drinkTypeId;
      ingredientAnalyzer.applyAttributeBoost(attr, fruitTeaBlend.add);
      goodNotes.push(fruitTeaBlend.note);
      addUniqueTags(sourceFeedbackTags, fruitTeaBlend.feedbackTags);
    }

    combinationAnalyzer.findComboMatches("good", context).forEach(rule => {
      scoreEngine.addScore(score, rule.score);
      ingredientAnalyzer.applyAttributeBoost(attr, rule.add);
      goodNotes.push(rule.note);
      addUniqueTags(sourceFeedbackTags, getCombinationFeedbackTags(rule));
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

  const hasMilkFatAccident = accidents.some(isDairyFatOverloadAccident);

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
  const inferredTypeResult = forcedType
    ? null
    : drinkTypeAnalyzer.inferTypeResult(attr, context.normalizedNames, finalScore, context);
  const type = forcedType || inferredTypeResult.type;
  const drinkTypeId = forcedDrinkTypeId || inferredTypeResult?.drinkTypeId;
  const audienceResult = drinkTypeAnalyzer.inferAudienceResult(attr, context.normalizedNames, finalScore, context);
  const { audience, audienceIds } = audienceResult;
  const priorityNotes = accidentNotes.length
    ? accidentNotes
    : badNotes.length
      ? badNotes
      : goodNotes.length
        ? goodNotes
        : segmentNotes.length
          ? [segmentNotes[0]]
          : generalNotes;
  const feedbackOptions = { feedbackTags: sourceFeedbackTags };
  const feedbackTags = feedbackEngine.getFeedbackTags(attr, finalScore, priorityNotes, accidents.length > 0, feedbackOptions);
  const feedback = feedbackEngine.makeFeedback(attr, finalScore, priorityNotes, accidents.length > 0, feedbackOptions);

  const result = { attr, score: finalScore, type, audience, audienceIds, feedback, feedbackTags, tasteSummary, textureSummary };
  if (primaryAccident?.accidentTypeId) {
    result.accidentTypeId = primaryAccident.accidentTypeId;
  }
  if (drinkTypeId && !primaryAccident?.accidentTypeId && !badNotes.length) {
    result.drinkTypeId = drinkTypeId;
  }
  const outcomeTypeId = inferOutcomeTypeId(result.type, result.accidentTypeId, result.drinkTypeId);
  if (outcomeTypeId) {
    result.outcomeTypeId = outcomeTypeId;
  }
  return result;
}

window.MILK_TEA_LAB_TASTE_JUDGE = {
  evaluateCup
};
})();
