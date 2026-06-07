(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;
const drinkTypeComposer = window.MILK_TEA_LAB_DRINK_TYPE_COMPOSER;
const unifiedFeedbackComposer = window.MILK_TEA_LAB_UNIFIED_FEEDBACK_COMPOSER;

const schemaVersion = "unifiedJudgment.v0.0.8.34";

const pressureJudgmentRules = {
  sweetnessPressure: {
    type: "味觉过载（试玩）",
    feedbackTags: ["sweet"],
    feedback: "甜味压力过高，几乎没有被其他味道平衡。",
    missingStableIdWarning: "missing_stable_accident_type:sweetnessPressure"
  },
  acidPressure: {
    type: "味觉事故（试玩）",
    accidentTypeId: "taste_acid_overload",
    feedbackTags: ["acid_accident"],
    feedback: "酸度压力已经压过清爽感，需要更明确的甜度、茶感或水感支撑。"
  },
  bitterPressure: {
    type: "味觉过载（试玩）",
    feedbackTags: ["weird"],
    feedback: "苦味压力偏高；如果没有乳基或甜味承接，会让整杯显得生硬。",
    missingStableIdWarning: "missing_stable_accident_type:bitterPressure"
  },
  fatPressure: {
    type: "奶脂过载（试玩）",
    accidentTypeId: "dairy_fat_overload",
    feedbackTags: ["greasy_overload"],
    feedback: "奶脂负担明显，喝得动，但入口和下咽后的压力会变重。"
  },
  solidLoadPressure: {
    type: "质地事故（试玩）",
    accidentTypeId: "texture_solid_overload",
    feedbackTags: ["straw_disaster"],
    feedback: "固体小料负载过高，喝一口更像在做咀嚼训练。"
  },
  lowFlowPressure: {
    type: "质地事故（试玩）",
    accidentTypeId: "texture_low_drinkability",
    feedbackTags: ["straw_disaster"],
    feedback: "低流动性压力偏高，整杯开始变得难以顺畅饮用。"
  },
  combinedTextureBurdenPressure: {
    type: "质地事故（试玩）",
    accidentTypeId: "texture_solid_overload",
    feedbackTags: ["straw_disaster"],
    feedback: "小料、粉碎物和糊状负担叠在一起，已经不像正常饮品，而像一杯需要认真咀嚼的质地事故。"
  },
  strongIdentityPressure: {
    type: "风味冲突（试玩）",
    outcomeTypeId: "novelty_experiment",
    feedbackTags: ["weird"],
    feedback: "风味身份非常强，需要足够支撑；支撑不足时会压过整杯。"
  }
};

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function rounded(value) {
  return Math.round(value);
}

function getActivePressures(unifiedScoring) {
  return (Array.isArray(unifiedScoring?.pressures) ? unifiedScoring.pressures : [])
    .filter(pressure => pressure?.matched && pressure.adjustedPenalty > 0)
    .sort((left, right) => right.adjustedPenalty - left.adjustedPenalty);
}

function getDominantPressure(unifiedScoring) {
  const activePressures = getActivePressures(unifiedScoring);
  if (!activePressures.length) return null;
  const dominantKey = unifiedScoring?.dominantPressure;
  return activePressures.find(pressure => pressure.pressureKey === dominantKey) || activePressures[0];
}

function shouldTreatAsAccident(pressure, score) {
  if (!pressure) return false;
  if (pressure.severityLevel === "critical" || pressure.severityLevel === "heavy") return true;
  return pressure.severityLevel === "medium" && isNumber(score) && score <= 42;
}

function compactPressureForJudgment(pressure) {
  if (!pressure) return null;
  return {
    pressureKey: pressure.pressureKey || null,
    sourceLayer: pressure.sourceLayer || null,
    triggerMetric: pressure.triggerMetric || null,
    severityLevel: pressure.severityLevel || null,
    observedValue: isNumber(pressure.observedValue) ? rounded(pressure.observedValue) : null,
    adjustedPenalty: isNumber(pressure.adjustedPenalty) ? rounded(pressure.adjustedPenalty) : null
  };
}

function buildDrinkTypeCandidate(input, warnings) {
  const composedDrinkType = drinkTypeComposer?.composeDrinkType
    ? drinkTypeComposer.composeDrinkType({
      recipeItems: input.recipeItems,
      tasteSummary: input.tasteSummary,
      textureSummary: input.textureSummary,
      flavorSummary: input.flavorSummary,
      unifiedScoring: input.unifiedScoring
    })
    : null;

  if (composedDrinkType) {
    (Array.isArray(composedDrinkType.warnings) ? composedDrinkType.warnings : []).forEach(warning => {
      warnings.push(`drink_type_composer:${warning}`);
    });
    return {
      type: `${composedDrinkType.composedTypeLabel || composedDrinkType.broadTypeLabel || "实验特调"}（试玩）`,
      drinkTypeId: composedDrinkType.drinkTypeId || null,
      outcomeTypeId: null,
      feedbackTags: composedDrinkType.drinkTypeId === "flavor_conflict" ? ["weird"] : [],
      reason: `drinkType composer matched ${composedDrinkType.drinkTypeId || "none"} from ingredient composition tags.`,
      composedDrinkType
    };
  }

  warnings.push("drink_type_composer_unavailable_fallback_used");
  return {
    type: "实验特调（试玩）",
    drinkTypeId: "experimental_special",
    outcomeTypeId: null,
    reason: "没有更明确的试玩 drink type candidate 命中。"
  };
}

function buildPressureJudgmentFromPressure(pressure, score, warnings, reason) {
  const rule = pressure ? pressureJudgmentRules[pressure.pressureKey] : null;

  if (!pressure || !rule || !shouldTreatAsAccident(pressure, score)) {
    return null;
  }

  if (rule.missingStableIdWarning) warnings.push(rule.missingStableIdWarning);

  return {
    pressure,
    type: rule.type,
    accidentTypeId: rule.accidentTypeId || null,
    drinkTypeId: null,
    outcomeTypeId: rule.outcomeTypeId || null,
    feedbackTags: rule.feedbackTags,
    feedback: rule.feedback,
    reason: reason || `${pressure.pressureKey} reached ${pressure.severityLevel} as playtest unified judgment.`
  };
}

function buildPressureJudgment(input, warnings) {
  const pressure = getDominantPressure(input.unifiedScoring);
  return buildPressureJudgmentFromPressure(
    pressure,
    input.unifiedScoring?.score,
    warnings
  );
}

function getPressureByKey(unifiedScoring, pressureKey) {
  const pressures = Array.isArray(unifiedScoring?.pressures) ? unifiedScoring.pressures : [];
  return pressures.find(pressure => pressure?.pressureKey === pressureKey) || null;
}

function buildTextureFloorBlockerPressure(unifiedScoring) {
  const structuralCoherence = unifiedScoring?.structuralCoherence || {};
  if (!structuralCoherence.blockedByTexturePressure) return null;

  const blockerKeys = Array.isArray(structuralCoherence.floorBlockerKeys)
    ? structuralCoherence.floorBlockerKeys
    : [];
  const pressureKeys = Array.isArray(structuralCoherence.floorBlockerPressureKeys)
    ? structuralCoherence.floorBlockerPressureKeys
    : [];
  const pressureKey = pressureKeys.includes("lowFlowPressure")
    ? "lowFlowPressure"
    : pressureKeys.includes("combinedTextureBurdenPressure")
      ? "combinedTextureBurdenPressure"
    : pressureKeys.includes("solidLoadPressure") || blockerKeys.includes("highTextureModifierLoad")
      ? "solidLoadPressure"
      : null;
  if (!pressureKey) return null;

  const existingPressure = getPressureByKey(unifiedScoring, pressureKey);
  if (existingPressure) {
    return {
      ...existingPressure,
      severityLevel: existingPressure.severityLevel === "info" || existingPressure.severityLevel === "light"
        ? "medium"
        : existingPressure.severityLevel,
      matched: true,
      adjustedPenalty: isNumber(existingPressure.adjustedPenalty) && existingPressure.adjustedPenalty > 0
        ? existingPressure.adjustedPenalty
        : 1,
      reason: `${pressureKey} selected because structural score floor was blocked by texture pressure.`
    };
  }

  return {
    pressureKey,
    sourceLayer: "texture",
    triggerMetric: pressureKey === "lowFlowPressure" ? "drinkabilityPenalty" : "solidLoad",
    observedValue: null,
    severityLevel: "medium",
    adjustedPenalty: 1,
    matched: true,
    reason: `${pressureKey} selected because structural score floor was blocked by texture pressure.`
  };
}

function buildStructuralFloorJudgment(input, warnings) {
  const unifiedScoring = input.unifiedScoring || {};
  const pressure = buildTextureFloorBlockerPressure(unifiedScoring);
  if (!pressure) return null;
  const score = unifiedScoring.score;
  if (!isNumber(score) || score > 42) return null;

  return buildPressureJudgmentFromPressure(
    pressure,
    score,
    warnings,
    `${pressure.pressureKey} selected as accident-dominant display because structural floor was blocked by texture pressure.`
  );
}

function buildAccidentDominantJudgment(input, warnings) {
  return buildPressureJudgment(input, warnings)
    || buildStructuralFloorJudgment(input, warnings);
}

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function buildSupportReason(unifiedScoring) {
  const balances = Array.isArray(unifiedScoring?.balances) ? unifiedScoring.balances : [];
  const strongBalances = balances
    .filter(item => item.bufferAmount >= 3)
    .slice(0, 2)
    .map(item => `${item.supportKey} buffered ${item.pressureKey}`);
  return strongBalances.length ? strongBalances.join("; ") : null;
}

function buildFeedback(judgment, drinkTypeCandidate, unifiedScoring) {
  const supportReason = buildSupportReason(unifiedScoring);
  const base = judgment?.feedback || "这杯当前没有明显事故，结构大体成立，可以进入试玩反馈。";
  const support = supportReason ? ` 支撑观察：${supportReason}。` : "";
  const source = judgment
    ? " 这是 playtest unified judgment 文案，不反向驱动系统。"
    : ` 类型判断：${drinkTypeCandidate.reason}。`;
  return `${base}${support}${source}`;
}

function buildJudgmentReasons(judgment, drinkTypeCandidate, unifiedScoring, displayPriorityReason) {
  const reasons = [];
  if (displayPriorityReason) reasons.push(displayPriorityReason);
  if (judgment) reasons.push(judgment.reason);
  if (drinkTypeCandidate?.reason) reasons.push(drinkTypeCandidate.reason);
  (Array.isArray(unifiedScoring?.scoreReasons) ? unifiedScoring.scoreReasons : []).slice(0, 3).forEach(reason => {
    reasons.push(reason);
  });
  return reasons;
}

function buildUnifiedJudgment(input = {}) {
  const unifiedScoring = input.unifiedScoring || {};
  const warnings = [
    "playtest unified judgment takeover only; not final production takeover.",
    "does not affect golden expected; legacy route remains available for rollback/debug."
  ];
  const drinkTypeCandidate = buildDrinkTypeCandidate(input, warnings);
  const pressureJudgment = buildAccidentDominantJudgment(input, warnings);
  const finalCandidate = pressureJudgment || drinkTypeCandidate || {};
  const displayTypeSource = pressureJudgment ? "accident_dominant" : "composed_drink_type";
  const normalComposedTypeLabel = drinkTypeCandidate?.composedDrinkType?.composedTypeLabel || null;
  const problemDisplayType = pressureJudgment?.type || null;
  const primaryDisplayType = finalCandidate.type || "实验特调（试玩）";
  const displayPriorityReason = pressureJudgment
    ? `display_priority:accident_dominant:${pressureJudgment.pressure?.pressureKey || "unknown_pressure"}; normal composed label kept for debug only.`
    : "display_priority:composed_drink_type:no accident-dominant pressure selected.";
  const score = isNumber(unifiedScoring.score) ? rounded(clamp(unifiedScoring.score)) : null;
  const legacy = input.legacyComparison || {};
  const fallbackFeedbackTags = uniqueItems([
    ...(Array.isArray(finalCandidate.feedbackTags) ? finalCandidate.feedbackTags : []),
    pressureJudgment ? "accident" : "normal_good"
  ]);
  const unifiedFeedback = unifiedFeedbackComposer?.buildUnifiedFeedback
    ? unifiedFeedbackComposer.buildUnifiedFeedback({
      pressureJudgment,
      drinkTypeCandidate,
      finalCandidate,
      unifiedScoring
    })
    : null;
  (Array.isArray(unifiedFeedback?.warnings) ? unifiedFeedback.warnings : []).forEach(warning => {
    warnings.push(`unified_feedback_composer:${warning}`);
  });
  const feedback = unifiedFeedback?.feedback || buildFeedback(pressureJudgment, drinkTypeCandidate, unifiedScoring);
  const feedbackTags = Array.isArray(unifiedFeedback?.feedbackTags) && unifiedFeedback.feedbackTags.length
    ? uniqueItems(unifiedFeedback.feedbackTags)
    : fallbackFeedbackTags;

  return {
    schemaVersion,
    mode: "playtest_unified_judgment_takeover",
    playtestOnly: true,
    profileSource: input.profileSource || unifiedScoring.profileSource || "runtime_legacy_profile",
    affectsScore: true,
    affectsFeedback: true,
    affectsResultType: true,
    affectsAccident: true,
    affectsDrinkType: true,
    affectsOutcome: true,
    affectsGoldenExpected: false,
    score,
    type: primaryDisplayType,
    displayTypeSource,
    primaryDisplayType,
    problemDisplayType,
    normalComposedTypeLabel,
    composerDrinkTypeId: drinkTypeCandidate?.composedDrinkType?.drinkTypeId || drinkTypeCandidate?.drinkTypeId || null,
    displayPriorityReason,
    accidentTypeId: finalCandidate.accidentTypeId || null,
    drinkTypeId: finalCandidate.drinkTypeId || null,
    outcomeTypeId: finalCandidate.outcomeTypeId || null,
    composedDrinkType: drinkTypeCandidate?.composedDrinkType || null,
    feedback,
    feedbackTags,
    unifiedFeedback,
    dominantPressure: unifiedScoring.dominantPressure || null,
    displayPriorityPressure: compactPressureForJudgment(pressureJudgment?.pressure || null),
    scoreReasons: Array.isArray(unifiedScoring.scoreReasons) ? unifiedScoring.scoreReasons : [],
    judgmentReasons: buildJudgmentReasons(pressureJudgment, drinkTypeCandidate, unifiedScoring, displayPriorityReason),
    warnings,
    legacyComparison: {
      legacyScore: legacy.legacyScore ?? null,
      legacyType: legacy.legacyType || null,
      legacyAccidentTypeId: legacy.legacyAccidentTypeId || null,
      legacyDrinkTypeId: legacy.legacyDrinkTypeId || null,
      legacyOutcomeTypeId: legacy.legacyOutcomeTypeId || null,
      legacyFeedback: legacy.legacyFeedback || null
    }
  };
}

window.MILK_TEA_LAB_UNIFIED_JUDGMENT_ENGINE = {
  buildUnifiedJudgment
};
})();
