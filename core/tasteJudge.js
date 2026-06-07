(function() {
const { clamp, pick } = window.MILK_TEA_LAB_HELPERS;
const scoreEngine = window.MILK_TEA_LAB_SCORE_ENGINE;
const feedbackEngine = window.MILK_TEA_LAB_FEEDBACK_ENGINE;
const { createTasteContext } = window.MILK_TEA_LAB_TASTE_CONTEXT;
const { analyzeDrinkStructure } = window.MILK_TEA_LAB_DRINK_STRUCTURE_ANALYZER;
const tasteSummaryEngine = window.MILK_TEA_LAB_TASTE_SUMMARY_ENGINE;
const textureSummaryEngine = window.MILK_TEA_LAB_TEXTURE_SUMMARY_ENGINE;
const flavorSummaryEngine = window.MILK_TEA_LAB_FLAVOR_SUMMARY_ENGINE;
const summaryCandidateEngine = window.MILK_TEA_LAB_SUMMARY_CANDIDATE_ENGINE;
const candidatePriorityShellEngine = window.MILK_TEA_LAB_CANDIDATE_PRIORITY_SHELL_ENGINE;
const generatedSeveritySuggestionEngine = window.MILK_TEA_LAB_GENERATED_SEVERITY_SUGGESTION_ENGINE;
const unifiedScoringEngine = window.MILK_TEA_LAB_UNIFIED_SCORING_ENGINE;
const unifiedJudgmentEngine = window.MILK_TEA_LAB_UNIFIED_JUDGMENT_ENGINE;
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
  return ingredientIds.includes("fruit_lemon") && ingredientIds.includes("dairy_milk");
}

function isDairyFatOverloadAccident(accident) {
  // Legacy display type fallback stays only for pre-ID accidents.
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
  "口感冲突": "flavor_identity_conflict",
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

function createEmptySummaryCandidates() {
  return {
    candidates: [],
    byType: {
      accident: [],
      outcome: [],
      drinkType: [],
      feedback: []
    },
    metadata: {
      schemaVersion: "summaryCandidates.v0.0.6.12",
      readonly: true,
      weightsEnabled: false,
      affectsFinalResult: false
    }
  };
}

function createEmptyCandidatePriorityShell() {
  return {
    orderedCandidates: [],
    byPriorityBand: {
      hard_physical: [],
      texture_drinkability: [],
      taste_overload: [],
      flavor_identity: [],
      normal_conflict: [],
      positive_synergy: [],
      type_classification: [],
      feedback_hint: []
    },
    topCandidates: {
      accident: null,
      outcome: null,
      drinkType: null,
      feedback: []
    },
    metadata: {
      schemaVersion: "candidatePriorityShell.v0.0.6.15",
      readonly: true,
      affectsFinalResult: false,
      weightsEnabled: false,
      source: "summaryCandidates"
    }
  };
}

function buildSummaryCandidates(tasteSummary, textureSummary, flavorSummary) {
  if (!summaryCandidateEngine?.buildSummaryCandidates) return createEmptySummaryCandidates();
  return summaryCandidateEngine.buildSummaryCandidates({ tasteSummary, textureSummary, flavorSummary });
}

function buildCandidatePriorityShell(summaryCandidates) {
  if (!candidatePriorityShellEngine?.buildCandidatePriorityShell) return createEmptyCandidatePriorityShell();
  return candidatePriorityShellEngine.buildCandidatePriorityShell(summaryCandidates);
}

function readScoreTakeoverQueryFlag() {
  try {
    if (!window.location?.search) return null;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("scoreTakeover")) return null;
    return params.get("scoreTakeover");
  } catch (error) {
    return null;
  }
}

function readJudgmentTakeoverQueryFlag() {
  try {
    if (!window.location?.search) return null;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("judgmentTakeover")) return null;
    return params.get("judgmentTakeover");
  } catch (error) {
    return null;
  }
}

function readScoreTakeoverStorageFlag() {
  try {
    if (!window.localStorage) return null;
    return window.localStorage.getItem("MILK_TEA_LAB_SCORE_TAKEOVER_TRIAL");
  } catch (error) {
    return null;
  }
}

function readJudgmentTakeoverStorageFlag() {
  try {
    if (!window.localStorage) return null;
    return window.localStorage.getItem("MILK_TEA_LAB_JUDGMENT_TAKEOVER_TRIAL");
  } catch (error) {
    return null;
  }
}

function isTruthyDebugFlag(value) {
  return ["1", "true", "yes", "on", "debug"].includes(String(value || "").toLowerCase());
}

function isScoreTakeoverTrialRequested() {
  const queryValue = readScoreTakeoverQueryFlag();
  if (queryValue !== null) return isTruthyDebugFlag(queryValue);
  return isTruthyDebugFlag(readScoreTakeoverStorageFlag());
}

function isJudgmentTakeoverTrialRequested() {
  const queryValue = readJudgmentTakeoverQueryFlag();
  if (queryValue !== null) return isTruthyDebugFlag(queryValue);
  return isTruthyDebugFlag(readJudgmentTakeoverStorageFlag());
}

function createScoreTakeoverState(legacyScore, generatedSeveritySuggestion, unifiedScoring, unifiedJudgment) {
  const suggestedScore = generatedSeveritySuggestion?.scoreSuggestion?.suggestedScore;
  const hasValidSuggestedScore = Number.isFinite(suggestedScore);
  const unifiedScore = Number.isFinite(unifiedScoring?.score)
    ? Math.round(clamp(unifiedScoring.score))
    : null;
  const unifiedJudgmentScore = Number.isFinite(unifiedJudgment?.score)
    ? Math.round(clamp(unifiedJudgment.score))
    : null;
  const hasValidUnifiedScore = Number.isFinite(unifiedScore);
  const takeoverRequested = isScoreTakeoverTrialRequested();
  const judgmentTakeoverRequested = isJudgmentTakeoverTrialRequested();
  const judgmentTakeoverEnabled = judgmentTakeoverRequested && Number.isFinite(unifiedJudgmentScore);
  const scoreTakeoverEnabled = !judgmentTakeoverEnabled && takeoverRequested && hasValidUnifiedScore;
  const generatedSuggestedScore = hasValidSuggestedScore ? Math.round(clamp(suggestedScore)) : null;

  return {
    score: judgmentTakeoverEnabled ? unifiedJudgmentScore : scoreTakeoverEnabled ? unifiedScore : legacyScore,
    legacyScore,
    generatedSuggestedScore,
    unifiedScore,
    unifiedJudgmentScore,
    unifiedScoreDeltaFromLegacy: hasValidUnifiedScore ? unifiedScore - legacyScore : null,
    dominantPressure: unifiedScoring?.dominantPressure || null,
    scoreReasons: Array.isArray(unifiedScoring?.scoreReasons) ? unifiedScoring.scoreReasons : [],
    scoreSource: judgmentTakeoverEnabled ? "playtest_unified_judgment" : scoreTakeoverEnabled ? "playtest_unified_score" : "legacy",
    scoreTakeoverMode: takeoverRequested ? "debug_flag" : "off",
    judgmentTakeoverMode: judgmentTakeoverRequested ? "debug_flag" : "off",
    scoreTakeoverEnabled,
    judgmentTakeoverEnabled,
    scoreTakeoverNote: scoreTakeoverEnabled
      ? "已开启 Playtest unified score takeover；只覆盖最终分数，反馈 / 类型 / 事故仍保持旧系统。"
      : judgmentTakeoverEnabled
        ? "已开启 Playtest unified judgment takeover；分数、类型、事故和反馈使用 unified judgment 试玩输出。"
        : takeoverRequested
        ? "Debug 分数接管开关已开启，但 unified score 不可用或非法，已自动回退旧系统分数。"
        : "默认使用旧系统分数。仅在 Debug 试验时使用 ?scoreTakeover=1 或 localStorage MILK_TEA_LAB_SCORE_TAKEOVER_TRIAL=1。"
  };
}

function evaluateCup(cup) {
  const context = createTasteContext(cup);
  if (!context.activeCup.length || context.totalRatio() !== 100) return null;
  context.structure = analyzeDrinkStructure(context);
  const tasteSummary = tasteSummaryEngine?.buildTasteSummary(context) || null;
  const textureSummary = textureSummaryEngine?.buildTextureSummary(context) || null;
  const flavorSummary = flavorSummaryEngine?.buildFlavorSummary(context) || null;
  const summaryCandidates = buildSummaryCandidates(tasteSummary, textureSummary, flavorSummary);
  const candidatePriorityShell = buildCandidatePriorityShell(summaryCandidates);

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

  const teaCount = context.countByCategoryId("tea");
  const toppingCount = context.countByCategoryId("topping");
  const dairyCount = context.countByCategoryId("dairy");
  const flavorCount = context.countByCategoryId("flavor");
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

  const legacyScore = scoreEngine.finalizeScore(score);
  const inferredTypeResult = forcedType
    ? null
    : drinkTypeAnalyzer.inferTypeResult(attr, context.normalizedNames, legacyScore, context);
  const type = forcedType || inferredTypeResult.type;
  const drinkTypeId = forcedDrinkTypeId || inferredTypeResult?.drinkTypeId;
  const audienceResult = drinkTypeAnalyzer.inferAudienceResult(attr, context.normalizedNames, legacyScore, context);
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
  const feedbackTags = feedbackEngine.getFeedbackTags(attr, legacyScore, priorityNotes, accidents.length > 0, feedbackOptions);
  const feedback = feedbackEngine.makeFeedback(attr, legacyScore, priorityNotes, accidents.length > 0, feedbackOptions);
  const legacyAccidentTypeId = primaryAccident?.accidentTypeId || null;
  const legacyDrinkTypeId = drinkTypeId || null;
  const legacyTypeRoute = forcedType
    ? primaryAccident
      ? "legacy_accident_route"
      : "legacy_forced_type_route"
    : "legacy_drink_type_analyzer";

  const result = {
    attr,
    score: legacyScore,
    legacyScore,
    legacyScoreSource: "legacy_score_engine",
    legacyFinalScoreRoute: "legacy_score_engine",
    legacyAccidentTypeId,
    legacyDrinkTypeId,
    legacyOutcomeTypeId: null,
    legacyType: type,
    legacyTypeRoute,
    legacyPrimaryNotes: priorityNotes.slice(0, 3),
    generatedSuggestedScore: null,
    scoreSource: "legacy",
    scoreTakeoverMode: "off",
    scoreTakeoverEnabled: false,
    scoreTakeoverNote: "默认使用旧系统分数。",
    type,
    audience,
    audienceIds,
    feedback,
    feedbackTags,
    tasteSummary,
    textureSummary,
    flavorSummary,
    summaryCandidates,
    candidatePriorityShell
  };
  if (legacyAccidentTypeId) {
    result.accidentTypeId = legacyAccidentTypeId;
  }
  if (legacyDrinkTypeId && !legacyAccidentTypeId && !badNotes.length) {
    result.drinkTypeId = legacyDrinkTypeId;
  }
  const outcomeTypeId = inferOutcomeTypeId(result.type, result.accidentTypeId, result.drinkTypeId);
  result.legacyOutcomeTypeId = outcomeTypeId || null;
  if (outcomeTypeId) {
    result.outcomeTypeId = outcomeTypeId;
  }
  if (feedbackEngine.buildGeneratedFeedbackShadow) {
    result.generatedFeedbackShadow = feedbackEngine.buildGeneratedFeedbackShadow({
      feedbackTags,
      score: legacyScore,
      accidentTypeId: result.accidentTypeId,
      drinkTypeId: result.drinkTypeId,
      outcomeTypeId: result.outcomeTypeId
    });
  }
  if (generatedSeveritySuggestionEngine?.buildGeneratedSeveritySuggestion) {
    result.generatedSeveritySuggestion = generatedSeveritySuggestionEngine.buildGeneratedSeveritySuggestion(result);
  }
  if (unifiedScoringEngine?.buildUnifiedScoring) {
    result.unifiedScoring = unifiedScoringEngine.buildUnifiedScoring({
      tasteSummary,
      textureSummary,
      flavorSummary,
      summaryCandidates,
      candidatePriorityShell,
      legacyScore
    });
  }
  if (unifiedJudgmentEngine?.buildUnifiedJudgment) {
    result.unifiedJudgment = unifiedJudgmentEngine.buildUnifiedJudgment({
      tasteSummary,
      textureSummary,
      flavorSummary,
      summaryCandidates,
      candidatePriorityShell,
      recipeItems: context.activeCup.map(item => ({
        ingredientId: item.ingredientId,
        ratio: item.ratio
      })),
      unifiedScoring: result.unifiedScoring,
      legacyComparison: {
        legacyScore,
        legacyType: type,
        legacyAccidentTypeId,
        legacyDrinkTypeId,
        legacyOutcomeTypeId: result.legacyOutcomeTypeId,
        legacyFeedback: feedback
      }
    });
  }
  Object.assign(result, createScoreTakeoverState(legacyScore, result.generatedSeveritySuggestion, result.unifiedScoring, result.unifiedJudgment));
  if (result.judgmentTakeoverEnabled && result.unifiedJudgment) {
    result.type = result.unifiedJudgment.type;
    result.feedback = result.unifiedJudgment.feedback;
    result.feedbackTags = Array.isArray(result.unifiedJudgment.feedbackTags) ? result.unifiedJudgment.feedbackTags : [];
    result.accidentTypeId = result.unifiedJudgment.accidentTypeId || null;
    result.drinkTypeId = result.unifiedJudgment.drinkTypeId || null;
    result.outcomeTypeId = result.unifiedJudgment.outcomeTypeId || null;
  }
  return result;
}

window.MILK_TEA_LAB_TASTE_JUDGE = {
  evaluateCup
};
})();
