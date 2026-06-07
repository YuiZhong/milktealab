(function() {
const schemaVersion = "generatedSeveritySuggestion.v0.0.8.4";

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

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
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

function buildMetricAvailability(result) {
  const metricMap = collectSummaryMetricMap(result);
  const observedMetricMap = new Map(Array.from(metricMap.values())
    .sort((left, right) => left.metric.localeCompare(right.metric))
    .map(item => ({
      ...item,
      availability: item.observedValue > 0 ? "metric_observed_positive" : "metric_observed_zero",
      officialTriggerMetric: false,
      affectsRuntime: false,
      note: "Existing runtime summary metric is visible to the suggestion layer only."
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
      officialTriggerMetric: false,
      affectsRuntime: false,
      note: "Future triggerMetric direction is not read as runtime source in this overlay."
    }));

  return [...prioritizedMetrics, ...unavailableFutureDirections, ...remainingObservedMetrics];
}

function buildSeverityObservations(result) {
  const candidates = Array.isArray(result?.summaryCandidates?.candidates)
    ? result.summaryCandidates.candidates
    : [];

  return candidates.slice(0, 8).map(candidate => ({
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
    affectsRuntime: false,
    note: "Observed from current readonly summaryCandidates; not official generated severity."
  }));
}

function buildWarnings(result) {
  const warnings = [
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
  const legacyScore = isNumber(result?.score) ? result.score : null;

  return {
    schemaVersion,
    ...nonFinalFlags,
    mode: "ui_debug_suggestion",
    scoreSuggestion: {
      legacyScore,
      suggestedScore: legacyScore,
      scoreDelta: 0,
      confidence: "low",
      reason: "尚未启用正式 threshold / scoreMultiplier，因此建议分数暂时等于旧系统分数。"
    },
    severityObservations: buildSeverityObservations(result),
    metricAvailability: buildMetricAvailability(result),
    warnings: buildWarnings(result)
  };
}

window.MILK_TEA_LAB_GENERATED_SEVERITY_SUGGESTION_ENGINE = {
  buildGeneratedSeveritySuggestion
};
})();
