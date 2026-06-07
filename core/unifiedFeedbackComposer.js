(function() {
const schemaVersion = "unifiedFeedbackComposer.v0.0.8.28";

const pressureFeedbackTagByKey = {
  sweetnessPressure: "taste_sweet_overload",
  acidPressure: "taste_acid_overload",
  bitterPressure: "taste_bitter_pressure",
  fatPressure: "texture_fat_pressure",
  solidLoadPressure: "texture_solid_overload",
  lowFlowPressure: "texture_low_flow",
  strongIdentityPressure: "flavor_strong_identity"
};

const balanceFeedbackTagByKey = {
  dairySupport: "balance_dairy_support",
  sweetnessBalance: "balance_sweetness_support"
};

const supportLabelByKey = {
  dairySupport: "乳基支撑",
  sweetnessBalance: "甜味平衡",
  liquidSupport: "液体支撑",
  fitSupport: "饮品 / 甜品适配",
  identitySupport: "风味身份支撑"
};

const pressureCopyByTag = {
  taste_sweet_overload: {
    tone: "pressure_warning",
    text: "甜味压力已经成为主角，其他结构托不住它，喝起来会明显发腻。"
  },
  taste_acid_overload: {
    tone: "pressure_warning",
    text: "酸度压力已经超过清爽范围，需要更多支撑，不然会变成刺口的酸。"
  },
  taste_bitter_pressure: {
    tone: "pressure_warning",
    text: "苦味压力偏高，乳基或甜味如果托不住，就会显得生硬。"
  },
  texture_fat_pressure: {
    tone: "pressure_warning",
    text: "奶脂负担明显，喝得动，但入口和下咽后的压力会变重。"
  },
  texture_solid_overload: {
    tone: "accident_warning",
    text: "固体负载过高，饮用重点会从喝变成嚼。"
  },
  texture_low_flow: {
    tone: "accident_warning",
    text: "低流动性压力明显，整杯不够顺畅。"
  },
  flavor_strong_identity: {
    tone: "experimental_warning",
    text: "风味身份很强，需要合适载体托住；支撑不足时会显得互相抢戏。"
  }
};

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function rounded(value) {
  return Math.round(value);
}

function uniqueItems(items) {
  return [...new Set((Array.isArray(items) ? items : []).filter(Boolean))];
}

function getActivePressures(unifiedScoring) {
  return (Array.isArray(unifiedScoring?.pressures) ? unifiedScoring.pressures : [])
    .filter(pressure => pressure?.matched && pressure.adjustedPenalty > 0)
    .sort((left, right) => (right.adjustedPenalty || 0) - (left.adjustedPenalty || 0));
}

function getDominantPressure(unifiedScoring, pressureJudgment) {
  if (pressureJudgment?.pressure) return pressureJudgment.pressure;
  const activePressures = getActivePressures(unifiedScoring);
  if (!activePressures.length) return null;
  const dominantKey = unifiedScoring?.dominantPressure;
  return activePressures.find(pressure => pressure.pressureKey === dominantKey) || activePressures[0];
}

function compactPressure(pressure) {
  if (!pressure) return null;
  const observedValue = isNumber(pressure.observedValue)
    ? rounded(pressure.observedValue)
    : isNumber(pressure.rawMetricValue)
      ? rounded(pressure.rawMetricValue)
      : null;
  return {
    pressureKey: pressure.pressureKey || null,
    sourceLayer: pressure.sourceLayer || null,
    triggerMetric: pressure.triggerMetric || null,
    severityLevel: pressure.severityLevel || null,
    observedValue
  };
}

function getSupportBalances(unifiedScoring, dominantPressure) {
  const balances = Array.isArray(unifiedScoring?.balances) ? unifiedScoring.balances : [];
  return balances
    .filter(balance => balance?.bufferAmount > 0)
    .filter(balance => !dominantPressure || balance.pressureKey === dominantPressure.pressureKey)
    .sort((left, right) => (right.bufferAmount || 0) - (left.bufferAmount || 0))
    .slice(0, 2);
}

function buildSupportSentence(balances) {
  if (!balances.length) return "";
  const labels = balances
    .map(balance => supportLabelByKey[balance.supportKey] || balance.supportKey)
    .filter(Boolean);
  if (!labels.length) return "";
  return `不过${labels.join("、")}仍提供了一点缓冲。`;
}

function buildFeedbackTags({ pressureTag, balances, drinkTypeCandidate, finalCandidate }) {
  const balanceTags = balances
    .map(balance => balanceFeedbackTagByKey[balance.supportKey])
    .filter(Boolean);
  const outcomeTag = finalCandidate?.outcomeTypeId ? "flavor_conflict" : null;
  const composedTag = drinkTypeCandidate?.composedDrinkType?.composedTypeLabel ? "drinktype_composed_label" : null;
  return uniqueItems([
    "playtest_feedback",
    pressureTag,
    ...balanceTags,
    outcomeTag,
    composedTag
  ]);
}

function buildFeedbackText({ pressureTag, dominantPressure, balances, drinkTypeCandidate, finalCandidate }) {
  const pressureCopy = pressureTag ? pressureCopyByTag[pressureTag] : null;
  const supportSentence = buildSupportSentence(balances);
  const composedLabel = drinkTypeCandidate?.composedDrinkType?.composedTypeLabel || null;

  if (pressureCopy && dominantPressure) {
    return {
      tone: pressureCopy.tone,
      text: `${pressureCopy.text}${supportSentence ? ` ${supportSentence}` : ""}`
    };
  }

  if (finalCandidate?.outcomeTypeId) {
    return {
      tone: "experimental_warning",
      text: `这杯方向有实验感，但当前风味压力还需要制作人判断是否成立。${supportSentence ? ` ${supportSentence}` : ""}`
    };
  }

  if (composedLabel) {
    return {
      tone: "encouraging",
      text: `这杯${composedLabel}的方向是成立的，主体身份清楚，适合继续微调。${supportSentence ? ` ${supportSentence}` : ""}`
    };
  }

  return {
    tone: "neutral",
    text: `这杯当前没有明显事故，结构大体成立，可以进入试玩反馈。${supportSentence ? ` ${supportSentence}` : ""}`
  };
}

function buildReasons({ dominantPressure, balances, drinkTypeCandidate, finalCandidate }) {
  const reasons = [];
  if (dominantPressure?.pressureKey) {
    reasons.push(`source_pressure:${dominantPressure.pressureKey}`);
  }
  balances.forEach(balance => {
    if (balance?.supportKey) reasons.push(`source_balance:${balance.supportKey}`);
  });
  if (drinkTypeCandidate?.drinkTypeId) {
    reasons.push(`source_drink_type:${drinkTypeCandidate.drinkTypeId}`);
  }
  if (finalCandidate?.outcomeTypeId) {
    reasons.push(`source_outcome:${finalCandidate.outcomeTypeId}`);
  }
  if (drinkTypeCandidate?.composedDrinkType?.composedTypeLabel) {
    reasons.push("source_composed_label:display_only");
  }
  return reasons;
}

function buildUnifiedFeedback(input = {}) {
  const unifiedScoring = input.unifiedScoring || {};
  const pressureJudgment = input.pressureJudgment || null;
  const drinkTypeCandidate = input.drinkTypeCandidate || null;
  const finalCandidate = input.finalCandidate || {};
  const dominantPressure = getDominantPressure(unifiedScoring, pressureJudgment);
  const pressureTag = dominantPressure ? pressureFeedbackTagByKey[dominantPressure.pressureKey] : null;
  const balances = getSupportBalances(unifiedScoring, dominantPressure);
  const feedbackTags = buildFeedbackTags({
    pressureTag,
    balances,
    drinkTypeCandidate,
    finalCandidate
  });
  const feedbackCopy = buildFeedbackText({
    pressureTag,
    dominantPressure,
    balances,
    drinkTypeCandidate,
    finalCandidate
  });
  const warnings = [
    "playtest_unified_feedback_only:not_final_copy_system",
    "feedback_tag_registry_missing:playtest_only_tags",
    "legacy_feedback_not_used_for_unified_feedback"
  ];

  if (dominantPressure && !pressureTag) {
    warnings.push(`missing_feedback_tag_for_pressure:${dominantPressure.pressureKey}`);
  }

  return {
    schemaVersion,
    playtestOnly: true,
    feedback: feedbackCopy.text,
    feedbackTags,
    tone: feedbackCopy.tone,
    sourcePressure: compactPressure(dominantPressure),
    sourceOutcome: finalCandidate?.outcomeTypeId || null,
    sourceDrinkTypeId: drinkTypeCandidate?.drinkTypeId || finalCandidate?.drinkTypeId || null,
    sourceComposedTypeLabel: drinkTypeCandidate?.composedDrinkType?.composedTypeLabel || null,
    reasons: buildReasons({ dominantPressure, balances, drinkTypeCandidate, finalCandidate }),
    warnings
  };
}

window.MILK_TEA_LAB_UNIFIED_FEEDBACK_COMPOSER = {
  buildUnifiedFeedback
};
})();
