(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;

const schemaVersion = "unifiedScoring.v0.0.8.24";
const baseScore = 88;

const pressureRules = [
  {
    pressureKey: "sweetnessPressure",
    sourceLayer: "taste",
    triggerMetric: "sweetness",
    summaryKey: "tasteSummary",
    pressureScale: 3.8,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -78 },
      { min: 80, severityLevel: "heavy", scoreDelta: -68 },
      { min: 55, severityLevel: "medium", scoreDelta: -24 },
      { min: 28, severityLevel: "light", scoreDelta: -6 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "acidPressure",
    sourceLayer: "taste",
    triggerMetric: "acidity",
    summaryKey: "tasteSummary",
    pressureScale: 2.85,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -74 },
      { min: 78, severityLevel: "heavy", scoreDelta: -64 },
      { min: 48, severityLevel: "medium", scoreDelta: -20 },
      { min: 26, severityLevel: "light", scoreDelta: -5 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "bitterPressure",
    sourceLayer: "taste",
    triggerMetric: "bitterness",
    summaryKey: "tasteSummary",
    pressureScale: 3.7,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -72 },
      { min: 78, severityLevel: "heavy", scoreDelta: -64 },
      { min: 45, severityLevel: "medium", scoreDelta: -18 },
      { min: 22, severityLevel: "light", scoreDelta: -5 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "fatPressure",
    sourceLayer: "texture",
    triggerMetric: "fatLoad",
    summaryKey: "textureSummary",
    pressureScale: 1.9,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -72 },
      { min: 78, severityLevel: "heavy", scoreDelta: -62 },
      { min: 48, severityLevel: "medium", scoreDelta: -18 },
      { min: 26, severityLevel: "light", scoreDelta: -5 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "solidLoadPressure",
    sourceLayer: "texture",
    triggerMetric: "solidLoad",
    summaryKey: "textureSummary",
    pressureScale: 1,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -72 },
      { min: 80, severityLevel: "heavy", scoreDelta: -60 },
      { min: 56, severityLevel: "medium", scoreDelta: -19 },
      { min: 30, severityLevel: "light", scoreDelta: -5 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "lowFlowPressure",
    sourceLayer: "texture",
    triggerMetric: "drinkabilityPenalty",
    summaryKey: "textureSummary",
    pressureScale: 1.25,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -76 },
      { min: 78, severityLevel: "heavy", scoreDelta: -66 },
      { min: 45, severityLevel: "medium", scoreDelta: -21 },
      { min: 20, severityLevel: "light", scoreDelta: -6 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "strongIdentityPressure",
    sourceLayer: "flavor",
    triggerMetric: "aromaPressure",
    summaryKey: "flavorSummary",
    alternateMetrics: ["dominantPotential", "identityConflictRisk"],
    pressureScale: 1.08,
    metricScales: {
      aromaPressure: 1.08,
      dominantPotential: 1.08,
      identityConflictRisk: 2.1
    },
    bands: [
      { min: 92, severityLevel: "critical", scoreDelta: -58 },
      { min: 82, severityLevel: "heavy", scoreDelta: -44 },
      { min: 60, severityLevel: "medium", scoreDelta: -20 },
      { min: 36, severityLevel: "light", scoreDelta: -6 }
    ],
    status: "draft_non_final"
  }
];

const futurePressureDirections = [
  { pressureKey: "powderPressure", summaryKey: "textureSummary", metrics: ["sedimentRisk", "viscosity"] },
  { pressureKey: "saltinessPressure", summaryKey: "tasteSummary", metrics: ["saltiness"] },
  { pressureKey: "astringencyPressure", summaryKey: "tasteSummary", metrics: ["astringency"] },
  { pressureKey: "syrupinessPressure", summaryKey: "textureSummary", metrics: ["syrupiness"] },
  { pressureKey: "stickinessPressure", summaryKey: "textureSummary", metrics: ["stickiness"] }
];

const supportTargets = {
  bitterPressure: [
    { supportKey: "dairySupport", ratio: 0.42 },
    { supportKey: "sweetnessBalance", ratio: 0.28 }
  ],
  acidPressure: [
    { supportKey: "sweetnessBalance", ratio: 0.24 }
  ],
  strongIdentityPressure: [
    { supportKey: "dairySupport", ratio: 0.25 },
    { supportKey: "sweetnessBalance", ratio: 0.18 },
    { supportKey: "fitSupport", ratio: 0.32 },
    { supportKey: "identitySupport", ratio: 0.24 }
  ],
  solidLoadPressure: [
    { supportKey: "liquidSupport", ratio: 0.35 }
  ],
  lowFlowPressure: [
    { supportKey: "liquidSupport", ratio: 0.32 }
  ]
};

const secondaryContributionFactors = [1, 0.65, 0.45, 0.35, 0.25];

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function rounded(value) {
  return Math.round(value);
}

function getValues(input, summaryKey) {
  return input?.[summaryKey]?.values || {};
}

function getMetricValue(input, summaryKey, metric) {
  const value = getValues(input, summaryKey)[metric];
  return isNumber(value) ? value : null;
}

function selectBand(rule, observedValue) {
  if (!isNumber(observedValue)) return null;
  return [...rule.bands]
    .sort((left, right) => right.min - left.min)
    .find(band => observedValue >= band.min) || null;
}

function toPressureValue(rawValue, rule, metric) {
  if (!isNumber(rawValue)) return null;
  const scale = isNumber(rule.metricScales?.[metric])
    ? rule.metricScales[metric]
    : isNumber(rule.pressureScale)
      ? rule.pressureScale
      : 1;
  return clamp(rawValue * scale);
}

function observeRuleMetric(input, rule) {
  const primaryValue = getMetricValue(input, rule.summaryKey, rule.triggerMetric);
  const values = [
    {
      metric: rule.triggerMetric,
      value: primaryValue,
      pressureValue: toPressureValue(primaryValue, rule, rule.triggerMetric)
    },
    ...(Array.isArray(rule.alternateMetrics)
      ? rule.alternateMetrics.map(metric => ({
        metric,
        value: getMetricValue(input, rule.summaryKey, metric),
        pressureValue: toPressureValue(getMetricValue(input, rule.summaryKey, metric), rule, metric)
      }))
      : [])
  ].filter(item => isNumber(item.value) && isNumber(item.pressureValue));

  if (!values.length) return { metric: rule.triggerMetric, value: null };
  return values.sort((left, right) => right.pressureValue - left.pressureValue)[0];
}

function buildPressureObservations(input, warnings) {
  return pressureRules.map(rule => {
    const observedMetric = observeRuleMetric(input, rule);
    if (!isNumber(observedMetric.value)) {
      warnings.push(`missing_metric:${rule.pressureKey}:${rule.triggerMetric}`);
      return {
        pressureKey: rule.pressureKey,
        sourceLayer: rule.sourceLayer,
        triggerMetric: rule.triggerMetric,
        observedValue: null,
        severityLevel: "info",
        rawScoreDelta: 0,
        rawPenalty: 0,
        adjustedPenalty: 0,
        status: rule.status,
        matched: false,
        reason: `${rule.pressureKey} missing numeric ${rule.triggerMetric}; kept as warning only.`
      };
    }

    const pressureValue = observedMetric.pressureValue;
    const band = selectBand(rule, pressureValue);
    const rawScoreDelta = band ? band.scoreDelta : 0;
    const rawPenalty = Math.abs(rawScoreDelta);
    return {
      pressureKey: rule.pressureKey,
      sourceLayer: rule.sourceLayer,
      triggerMetric: observedMetric.metric,
      rawMetricValue: rounded(observedMetric.value),
      observedValue: rounded(pressureValue),
      severityLevel: band?.severityLevel || "info",
      rawScoreDelta,
      rawPenalty,
      adjustedPenalty: rawPenalty,
      status: rule.status,
      matched: Boolean(band),
      reason: band
        ? `${rule.pressureKey} observed raw ${rounded(observedMetric.value)} as pressure ${rounded(pressureValue)} / ${band.severityLevel}.`
        : `${rule.pressureKey} observed raw ${rounded(observedMetric.value)} as pressure ${rounded(pressureValue)} below draft threshold.`
    };
  });
}

function supportMetric(value) {
  return isNumber(value) ? clamp(value) : 0;
}

function buildSupportState(input) {
  const taste = getValues(input, "tasteSummary");
  const texture = getValues(input, "textureSummary");
  const flavor = getValues(input, "flavorSummary");

  const sweetness = supportMetric(taste.sweetness);
  const sweetnessPenalty = sweetness >= 72 ? Math.max(0, 95 - sweetness) * 0.35 : Math.min(sweetness, 55);
  const drinkability = supportMetric(texture.drinkability);
  const liquidNeed = supportMetric(texture.liquidSupportNeed);
  const fit = Math.max(supportMetric(flavor.beverageFit), supportMetric(flavor.dessertFit));
  const conflict = supportMetric(flavor.identityConflictRisk);

  return {
    dairySupport: clamp(supportMetric(taste.milkiness) + supportMetric(taste.creaminess) * 0.55),
    sweetnessBalance: clamp(sweetnessPenalty),
    liquidSupport: clamp(drinkability - liquidNeed * 0.35),
    fitSupport: clamp(fit),
    identitySupport: clamp(fit - conflict * 0.45)
  };
}

function severitySupportCap(severityLevel) {
  if (severityLevel === "critical") return 0.22;
  if (severityLevel === "heavy") return 0.32;
  if (severityLevel === "medium") return 0.45;
  if (severityLevel === "light") return 0.55;
  return 0;
}

function applySupport(pressures, supportState, warnings) {
  const balances = [];

  pressures.forEach(pressure => {
    if (!pressure.matched || pressure.rawPenalty <= 0) return;

    const targets = pressure.triggerMetric === "identityConflictRisk"
      ? []
      : supportTargets[pressure.pressureKey] || [];
    if (!targets.length) return;

    const maxSupport = pressure.rawPenalty * severitySupportCap(pressure.severityLevel);
    let supportTotal = 0;

    targets.forEach(target => {
      const supportValue = supportState[target.supportKey];
      if (!isNumber(supportValue) || supportValue <= 0) {
        if (pressure.severityLevel === "medium" || pressure.severityLevel === "heavy" || pressure.severityLevel === "critical") {
          warnings.push(`missing_support_metric:${pressure.pressureKey}:${target.supportKey}`);
        }
        return;
      }

      const supportAmount = Math.min(
        maxSupport - supportTotal,
        pressure.rawPenalty * (supportValue / 100) * target.ratio
      );
      if (supportAmount <= 0) return;

      supportTotal += supportAmount;
      balances.push({
        supportKey: target.supportKey,
        pressureKey: pressure.pressureKey,
        supportValue: rounded(supportValue),
        bufferAmount: rounded(supportAmount),
        reason: `${target.supportKey} buffers ${pressure.pressureKey} as draft generic support, not as a recipe exception.`
      });
    });

    pressure.adjustedPenalty = rounded(Math.max(0, pressure.rawPenalty - Math.min(supportTotal, maxSupport)));
  });

  return balances;
}

function checkFuturePressureWarnings(input, warnings) {
  futurePressureDirections.forEach(direction => {
    const values = direction.metrics
      .map(metric => getMetricValue(input, direction.summaryKey, metric))
      .filter(isNumber);
    if (!values.length) {
      warnings.push(`missing_metric:${direction.pressureKey}:official_mapping_not_available`);
    }
  });
}

function buildAggregation(pressures) {
  const active = pressures
    .filter(pressure => pressure.matched && pressure.adjustedPenalty > 0)
    .sort((left, right) => right.adjustedPenalty - left.adjustedPenalty);

  const contributions = active.map((pressure, index) => {
    const factor = secondaryContributionFactors[index] || secondaryContributionFactors[secondaryContributionFactors.length - 1];
    return {
      pressureKey: pressure.pressureKey,
      severityLevel: pressure.severityLevel,
      adjustedPenalty: pressure.adjustedPenalty,
      contributionFactor: factor,
      finalPenaltyContribution: rounded(pressure.adjustedPenalty * factor)
    };
  });

  const totalPenalty = contributions.reduce((total, item) => total + item.finalPenaltyContribution, 0);
  const dominantPressure = contributions[0]?.pressureKey || null;

  return {
    baseScore,
    totalPenalty,
    diminishingReturnsEnabled: true,
    secondaryContributionFactors,
    contributions,
    dominantPressure,
    explanation: "Primary pressure counts fully; secondary pressures use capped diminishing contribution."
  };
}

function buildScoreReasons(pressures, balances, aggregation) {
  const pressureReasons = aggregation.contributions.slice(0, 4).map(item => {
    const pressure = pressures.find(entry => entry.pressureKey === item.pressureKey);
    return `${item.pressureKey}: ${pressure?.observedValue ?? "n/a"} / ${item.severityLevel} / -${item.finalPenaltyContribution}`;
  });

  const balanceReasons = balances.slice(0, 3).map(item =>
    `${item.supportKey} buffered ${item.pressureKey} by ${item.bufferAmount}`
  );

  return [...pressureReasons, ...balanceReasons];
}

function buildConfidence(warnings, pressures) {
  const activePressureCount = pressures.filter(pressure => pressure.matched).length;
  if (activePressureCount >= 4 && warnings.length <= 4) return "medium";
  return "low";
}

function buildUnifiedScoring(input = {}) {
  const warnings = [
    "playtest score takeover only; does not affect feedback, result type, accident, drinkType, outcome, or golden expected.",
    "first version favors simple, explainable, reversible scoring over tuned-looking sample fit."
  ];
  const pressures = buildPressureObservations(input, warnings);
  const supportState = buildSupportState(input);
  const balances = applySupport(pressures, supportState, warnings);
  checkFuturePressureWarnings(input, warnings);
  const aggregation = buildAggregation(pressures);
  const score = rounded(clamp(baseScore - aggregation.totalPenalty));
  const legacyScore = isNumber(input.legacyScore) ? rounded(clamp(input.legacyScore)) : null;

  return {
    schemaVersion,
    mode: "playtest_score_takeover",
    playtestOnly: true,
    scoreTakeoverOnly: true,
    affectsScore: true,
    affectsFeedback: false,
    affectsResultType: false,
    affectsAccident: false,
    affectsGoldenExpected: false,
    score,
    legacyScore,
    scoreDeltaFromLegacy: isNumber(legacyScore) ? score - legacyScore : null,
    confidence: buildConfidence(warnings, pressures),
    pressures,
    balances,
    supportState,
    aggregation,
    dominantPressure: aggregation.dominantPressure,
    scoreReasons: buildScoreReasons(pressures, balances, aggregation),
    warnings
  };
}

window.MILK_TEA_LAB_UNIFIED_SCORING_ENGINE = {
  buildUnifiedScoring
};
})();
