(function() {
const schemaVersion = "generatedSeveritySuggestion.v0.0.8.6";

const nonFinalFlags = {
  readonly: true,
  affectsFinalResult: false,
  affectsScore: false,
  affectsFeedback: false,
  affectsResultType: false,
  affectsGoldenExpected: false
};

const summarySources = [
  { key: "tasteSummary", label: "taste" },
  { key: "textureSummary", label: "texture" },
  { key: "flavorSummary", label: "flavor" }
];

const futureDirections = [
  "sweetnessLoad",
  "acidityLoad",
  "bitternessLoad",
  "astringencyLoad",
  "lowFlowPenalty"
];

const priorityRuntimeMetrics = ["solidLoad", "sweetness", "acidity", "bitterness", "fatLoad", "drinkability"];

const draftScoreSuggestionRules = [
  {
    ruleId: "draft_texture_solid_load",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    metric: "solidLoad",
    displayName: "固体小料负载",
    direction: "penalty",
    confidence: "low",
    reason: "观察到 solidLoad 偏高，建议轻度下修；当前阈值仍为 draft，不影响最终结果。",
    bands: [
      { min: 20, severityLevelDraft: "light", scoreDeltaDraft: -2 },
      { min: 40, severityLevelDraft: "medium", scoreDeltaDraft: -5 },
      { min: 60, severityLevelDraft: "heavy", scoreDeltaDraft: -9 }
    ]
  },
  {
    ruleId: "draft_texture_fat_load",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    metric: "fatLoad",
    displayName: "奶脂负担",
    direction: "penalty",
    confidence: "low",
    reason: "观察到 fatLoad 偏高，建议轻度下修；当前阈值仍为 draft，不影响最终结果。",
    bands: [
      { min: 20, severityLevelDraft: "light", scoreDeltaDraft: -2 },
      { min: 35, severityLevelDraft: "medium", scoreDeltaDraft: -5 },
      { min: 55, severityLevelDraft: "heavy", scoreDeltaDraft: -8 }
    ]
  },
  {
    ruleId: "draft_texture_drinkability_penalty",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    metric: "drinkabilityPenalty",
    displayName: "低流动性压力",
    direction: "penalty",
    confidence: "low",
    reason: "观察到 drinkabilityPenalty，建议轻度下修；这不是正式低流动性事故触发。",
    bands: [
      { min: 15, severityLevelDraft: "light", scoreDeltaDraft: -2 },
      { min: 30, severityLevelDraft: "medium", scoreDeltaDraft: -5 },
      { min: 50, severityLevelDraft: "heavy", scoreDeltaDraft: -9 }
    ]
  },
  {
    ruleId: "draft_taste_acidity",
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    metric: "acidity",
    displayName: "酸度压力",
    direction: "penalty",
    confidence: "low",
    reason: "观察到 acidity 偏高，建议轻度下修；酸度阈值仍为 draft，不影响最终结果。",
    bands: [
      { min: 20, severityLevelDraft: "light", scoreDeltaDraft: -1 },
      { min: 40, severityLevelDraft: "medium", scoreDeltaDraft: -4 },
      { min: 65, severityLevelDraft: "heavy", scoreDeltaDraft: -8 }
    ]
  },
  {
    ruleId: "draft_taste_bitterness",
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    metric: "bitterness",
    displayName: "苦味压力",
    direction: "penalty",
    confidence: "low",
    reason: "观察到 bitterness 偏高，建议轻度下修；苦味阈值仍为 draft，不影响最终结果。",
    bands: [
      { min: 18, severityLevelDraft: "light", scoreDeltaDraft: -1 },
      { min: 35, severityLevelDraft: "medium", scoreDeltaDraft: -3 },
      { min: 55, severityLevelDraft: "heavy", scoreDeltaDraft: -6 }
    ]
  }
];

const profileBoundaryNote = "原料 profile 描述材料事实；如果建议分不符合直觉，优先校准判定 / scoring 系统，除非确认 profile 本身偏离现实。";

const defaultAdjustmentTargets = [
  "threshold",
  "severityLevel",
  "scoreMultiplier",
  "positiveSynergy",
  "drinkTypeExpectation",
  "scoreAggregation",
  "customerPreference",
  "profileFactualCheck"
];

const adjustmentTargetsByMetric = {
  solidLoad: [
    "threshold",
    "severityLevel",
    "scoreMultiplier",
    "drinkTypeExpectation",
    "positiveSynergy",
    "scoreAggregation",
    "customerPreference",
    "profileFactualCheck"
  ],
  fatLoad: [
    "threshold",
    "severityLevel",
    "scoreMultiplier",
    "drinkTypeExpectation",
    "positiveSynergy",
    "scoreAggregation",
    "customerPreference",
    "profileFactualCheck"
  ],
  drinkabilityPenalty: [
    "threshold",
    "severityLevel",
    "scoreMultiplier",
    "drinkTypeExpectation",
    "positiveSynergy",
    "scoreAggregation",
    "customerPreference",
    "profileFactualCheck"
  ],
  acidity: [
    "threshold",
    "severityLevel",
    "scoreMultiplier",
    "positiveSynergy",
    "drinkTypeExpectation",
    "scoreAggregation",
    "customerPreference",
    "profileFactualCheck"
  ],
  bitterness: [
    "threshold",
    "severityLevel",
    "scoreMultiplier",
    "positiveSynergy",
    "drinkTypeExpectation",
    "scoreAggregation",
    "customerPreference",
    "profileFactualCheck"
  ]
};

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function metricKey(sourceSummary, metric) {
  return `${sourceSummary}:${metric}`;
}

function collectSummaryMetricMap(result) {
  const metricMap = new Map();

  summarySources.forEach(source => {
    const values = result?.[source.key]?.values;
    if (!values || typeof values !== "object") return;

    Object.entries(values).forEach(([metric, value]) => {
      if (!isNumber(value)) return;
      metricMap.set(metric, {
        metric,
        sourceSummary: source.key,
        sourceLayer: source.label,
        observedValue: value
      });
    });
  });

  return metricMap;
}

function selectDraftBand(rule, observedValue) {
  if (!isNumber(observedValue)) return null;
  return [...rule.bands]
    .sort((left, right) => right.min - left.min)
    .find(band => observedValue >= band.min) || null;
}

function buildDraftRuleObservations(result) {
  const metricMap = collectSummaryMetricMap(result);

  return draftScoreSuggestionRules
    .map(rule => {
      const metric = metricMap.get(rule.metric);
      if (!metric || metric.sourceSummary !== rule.sourceSummary) return null;

      const band = selectDraftBand(rule, metric.observedValue);
      if (!band) return null;

      return {
        observationType: "draft_score_rule_matched",
        ruleId: rule.ruleId,
        sourceSummary: rule.sourceSummary,
        sourceLayer: rule.sourceLayer,
        metric: rule.metric,
        displayName: rule.displayName,
        observedValue: metric.observedValue,
        direction: rule.direction,
        severityLevelDraft: band.severityLevelDraft,
        scoreDeltaDraft: band.scoreDeltaDraft,
        confidence: rule.confidence,
        reason: rule.reason,
        affectsFinalResult: false,
        affectsRuntime: false,
        officialSeverity: false,
        officialTriggerMetric: false,
        requiresHumanReview: true,
        note: "Draft score suggestion only; not official threshold, not final accident, not generated severity takeover."
      };
    })
    .filter(Boolean);
}

function buildMetricAvailability(result, draftRuleObservations) {
  const metricMap = collectSummaryMetricMap(result);
  const draftMetricKeys = new Set(draftRuleObservations.map(observation =>
    metricKey(observation.sourceSummary, observation.metric)
  ));
  const observedMetricMap = new Map(Array.from(metricMap.values())
    .sort((left, right) => left.metric.localeCompare(right.metric))
    .map(item => ({
      ...item,
      availability: item.observedValue > 0 ? "metric_observed_positive" : "metric_observed_zero",
      usedForScoreSuggestionDraft: draftMetricKeys.has(metricKey(item.sourceSummary, item.metric)),
      officialTriggerMetric: false,
      affectsRuntime: false,
      note: "Existing runtime summary metric is visible to the suggestion layer only; draft usage does not make it official."
    }))
    .map(item => [item.metric, item]));
  const prioritizedMetrics = priorityRuntimeMetrics
    .map(metric => observedMetricMap.get(metric))
    .filter(Boolean);
  const remainingObservedMetrics = Array.from(observedMetricMap.values())
    .filter(item => !priorityRuntimeMetrics.includes(item.metric));

  const unavailableFutureDirections = futureDirections
    .filter(metric => !metricMap.has(metric))
    .map(metric => ({
      metric,
      sourceSummary: null,
      sourceLayer: null,
      observedValue: null,
      availability: "needs_official_mapping_or_threshold",
      usedForScoreSuggestionDraft: false,
      officialTriggerMetric: false,
      affectsRuntime: false,
      note: "Future triggerMetric direction is not read as runtime source in this overlay."
    }));

  return [...prioritizedMetrics, ...unavailableFutureDirections, ...remainingObservedMetrics];
}

function buildSeverityObservations(result, draftRuleObservations) {
  const candidates = Array.isArray(result?.summaryCandidates?.candidates)
    ? result.summaryCandidates.candidates
    : [];

  const summaryCandidateObservations = candidates.slice(0, 8).map(candidate => ({
    observationType: "summary_candidate_observed",
    candidateId: candidate.candidateId || null,
    candidateType: candidate.candidateType || null,
    sourceLayer: candidate.sourceLayer || null,
    sourceSummary: candidate.sourceSummary || null,
    triggerMetric: candidate.triggerMetric || null,
    triggerValue: isNumber(candidate.triggerValue) ? candidate.triggerValue : null,
    priorityBand: candidate.priorityBand || null,
    severityHint: candidate.severityHint || null,
    officialSeverity: false,
    affectsFinalResult: false,
    affectsRuntime: false,
    note: "Observed from current readonly summaryCandidates; not official generated severity."
  }));

  return [...draftRuleObservations, ...summaryCandidateObservations];
}

function buildScoreSuggestion(result, draftRuleObservations) {
  const legacyScore = isNumber(result?.score) ? result.score : null;
  if (!isNumber(legacyScore)) {
    return {
      legacyScore,
      suggestedScore: null,
      scoreDelta: 0,
      confidence: "low",
      reason: "旧系统分数不可观察，因此本轮不生成建议分数。"
    };
  }

  const totalScoreDeltaDraft = draftRuleObservations.reduce((total, observation) =>
    total + (isNumber(observation.scoreDeltaDraft) ? observation.scoreDeltaDraft : 0), 0);
  const suggestedScore = clampScore(legacyScore + totalScoreDeltaDraft);
  const scoreDelta = suggestedScore - legacyScore;

  if (!draftRuleObservations.length) {
    return {
      legacyScore,
      suggestedScore,
      scoreDelta,
      confidence: "low",
      reason: "当前没有命中 draft score rule，建议分数暂时等于旧系统分数。"
    };
  }

  const observationText = draftRuleObservations
    .slice(0, 3)
    .map(observation => `${observation.displayName || observation.metric} ${observation.scoreDeltaDraft}`)
    .join(" / ");

  return {
    legacyScore,
    suggestedScore,
    scoreDelta,
    confidence: "low",
    reason: `基于 ${draftRuleObservations.length} 条现有 summary metric draft rule，建议分数调整 ${scoreDelta}（${observationText}）；当前阈值仍为 draft，不影响最终结果。`
  };
}

function buildLikelyAdjustmentTargets(draftRuleObservations) {
  const targets = draftRuleObservations.flatMap(observation =>
    adjustmentTargetsByMetric[observation.metric] || defaultAdjustmentTargets
  );
  const orderedTargets = uniqueItems([...targets, ...defaultAdjustmentTargets]);
  const profileIndex = orderedTargets.indexOf("profileFactualCheck");
  if (profileIndex >= 0) {
    orderedTargets.splice(profileIndex, 1);
    orderedTargets.push("profileFactualCheck");
  }
  return orderedTargets;
}

function buildCalibrationReview(scoreSuggestion, draftRuleObservations) {
  if (!scoreSuggestion || scoreSuggestion.scoreDelta === 0) {
    return {
      status: "no_delta_observed",
      humanReadableStatus: "暂无建议分差",
      shouldTrustSuggestion: false,
      reviewPrompt: "本轮新系统没有建议调整分数，可先观察其他样本。",
      likelyAdjustmentTargets: [],
      profileFactualIssueLikely: false,
      note: profileBoundaryNote
    };
  }

  const targets = buildLikelyAdjustmentTargets(draftRuleObservations);
  return {
    status: "needs_review",
    humanReadableStatus: "待制作人判断",
    shouldTrustSuggestion: false,
    reviewPrompt: "新系统建议分数与旧系统不同。请判断这次调整是否符合直觉；如果不符合，优先检查 threshold / severityLevel / scoreMultiplier / positive synergy / drinkType expectation / score aggregation / customer preference，而不是直接改原料 profile。",
    likelyAdjustmentTargets: targets,
    profileFactualIssueLikely: false,
    note: profileBoundaryNote
  };
}

function buildWarnings(result) {
  const warnings = [
    "Draft scoreDelta only affects generatedSeveritySuggestion.scoreSuggestion.suggestedScore.",
    "No active generated severity thresholds or scoreMultiplier table are enabled.",
    "This overlay does not read sample CSV / JSON / markdown reports as runtime source.",
    "Observed metrics and candidates do not override final score, feedback, result type, accident, or golden expected."
  ];

  if (!result?.summaryCandidates?.candidates?.length) {
    warnings.push("No summary candidate was observed for this cup.");
  }

  return warnings;
}

function buildGeneratedSeveritySuggestion(result) {
  const draftRuleObservations = buildDraftRuleObservations(result);
  const scoreSuggestion = buildScoreSuggestion(result, draftRuleObservations);

  return {
    schemaVersion,
    ...nonFinalFlags,
    mode: "ui_debug_suggestion",
    scoreSuggestion,
    calibrationReview: buildCalibrationReview(scoreSuggestion, draftRuleObservations),
    severityObservations: buildSeverityObservations(result, draftRuleObservations),
    metricAvailability: buildMetricAvailability(result, draftRuleObservations),
    warnings: buildWarnings(result)
  };
}

window.MILK_TEA_LAB_GENERATED_SEVERITY_SUGGESTION_ENGINE = {
  buildGeneratedSeveritySuggestion
};
})();
