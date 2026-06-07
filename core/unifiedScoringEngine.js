(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;

const schemaVersion = "unifiedScoring.v0.0.8.34";
const baseScore = 84;

const pressureRules = [
  {
    pressureKey: "sweetnessPressure",
    sourceLayer: "taste",
    triggerMetric: "sweetness",
    summaryKey: "tasteSummary",
    pressureScale: 1,
    bands: [
      { min: 84, severityLevel: "critical", scoreDelta: -78 },
      { min: 72, severityLevel: "heavy", scoreDelta: -58 },
      { min: 50, severityLevel: "medium", scoreDelta: -17 },
      { min: 32, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "acidPressure",
    sourceLayer: "taste",
    triggerMetric: "acidity",
    summaryKey: "tasteSummary",
    pressureScale: 1,
    bands: [
      { min: 82, severityLevel: "critical", scoreDelta: -74 },
      { min: 68, severityLevel: "heavy", scoreDelta: -58 },
      { min: 46, severityLevel: "medium", scoreDelta: -16 },
      { min: 30, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "bitterPressure",
    sourceLayer: "taste",
    triggerMetric: "bitterness",
    summaryKey: "tasteSummary",
    pressureScale: 1,
    bands: [
      { min: 82, severityLevel: "critical", scoreDelta: -70 },
      { min: 68, severityLevel: "heavy", scoreDelta: -54 },
      { min: 42, severityLevel: "medium", scoreDelta: -17 },
      { min: 28, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "fatPressure",
    sourceLayer: "texture",
    triggerMetric: "fatLoad",
    summaryKey: "textureSummary",
    pressureScale: 1,
    bands: [
      { min: 82, severityLevel: "critical", scoreDelta: -74 },
      { min: 68, severityLevel: "heavy", scoreDelta: -58 },
      { min: 46, severityLevel: "medium", scoreDelta: -16 },
      { min: 28, severityLevel: "light", scoreDelta: -4 }
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
      { min: 85, severityLevel: "critical", scoreDelta: -74 },
      { min: 74, severityLevel: "heavy", scoreDelta: -58 },
      { min: 56, severityLevel: "medium", scoreDelta: -19 },
      { min: 34, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "lowFlowPressure",
    sourceLayer: "texture",
    triggerMetric: "drinkabilityPenalty",
    summaryKey: "textureSummary",
    pressureScale: 1,
    bands: [
      { min: 82, severityLevel: "critical", scoreDelta: -74 },
      { min: 66, severityLevel: "heavy", scoreDelta: -58 },
      { min: 46, severityLevel: "medium", scoreDelta: -18 },
      { min: 30, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "combinedTextureBurdenPressure",
    sourceLayer: "texture",
    triggerMetric: "combinedTextureBurden",
    summaryKey: "textureSummary",
    pressureScale: 1,
    bands: [
      { min: 90, severityLevel: "critical", scoreDelta: -76 },
      { min: 74, severityLevel: "heavy", scoreDelta: -60 },
      { min: 58, severityLevel: "medium", scoreDelta: -24 },
      { min: 40, severityLevel: "light", scoreDelta: -4 }
    ],
    status: "draft_non_final"
  },
  {
    pressureKey: "strongIdentityPressure",
    sourceLayer: "flavor",
    triggerMetric: "aromaPressure",
    summaryKey: "flavorSummary",
    alternateMetrics: ["dominantPotential", "identityConflictRisk"],
    pressureScale: 1,
    metricScales: {
      aromaPressure: 1,
      dominantPotential: 1,
      identityConflictRisk: 1.9
    },
    bands: [
      { min: 88, severityLevel: "critical", scoreDelta: -54 },
      { min: 74, severityLevel: "heavy", scoreDelta: -38 },
      { min: 58, severityLevel: "medium", scoreDelta: -15 },
      { min: 40, severityLevel: "light", scoreDelta: -4 }
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
    { supportKey: "dairySupport", ratio: 0.75 },
    { supportKey: "sweetnessBalance", ratio: 0.5 }
  ],
  acidPressure: [
    { supportKey: "sweetnessBalance", ratio: 0.45 }
  ],
  strongIdentityPressure: [
    { supportKey: "dairySupport", ratio: 0.5 },
    { supportKey: "sweetnessBalance", ratio: 0.35 },
    { supportKey: "fitSupport", ratio: 0.55 },
    { supportKey: "identitySupport", ratio: 0.45 }
  ],
  solidLoadPressure: [
    { supportKey: "liquidSupport", ratio: 0.55 }
  ],
  lowFlowPressure: [
    { supportKey: "liquidSupport", ratio: 0.55 }
  ]
};

const identityConflictSupportTargets = [
  { supportKey: "dairySupport", ratio: 2.2 },
  { supportKey: "sweetnessBalance", ratio: 1.1 }
];

const secondaryContributionFactors = [1, 0.35, 0.22, 0.14, 0.08];

const structuralScoreFloors = {
  milk_tea: 74,
  coffee_milk_drink: 70,
  dessert_milk_drink: 72,
  fruit_tea: 70,
  fruit_drink: 66
};

const structuralFloorBlockingTexturePressures = new Set([
  "lowFlowPressure",
  "solidLoadPressure",
  "combinedTextureBurdenPressure"
]);

const texturePressureScoreCaps = {
  medium: 25,
  heavy: 18,
  critical: 12
};

const highTextureModifierRatioThreshold = 55;

const visibleIdentityFitDrinkTypes = new Set([
  "milk_tea",
  "coffee_milk_drink",
  "dessert_milk_drink",
  "fruit_tea",
  "fruit_drink",
  "sparkling_fruit_drink",
  "coffee_drink"
]);

const visibleIdentityFitScoreBonus = {
  modifier: 2,
  primary_identity: 2
};

const visibleIdentityFitMaxBonus = 4;

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
    fitSupport: clamp(fit - conflict * 0.6),
    identitySupport: clamp(fit - conflict * 0.45)
  };
}

function severitySupportCap(severityLevel) {
  if (severityLevel === "critical") return 0.25;
  if (severityLevel === "heavy") return 0.5;
  if (severityLevel === "medium") return 0.75;
  if (severityLevel === "light") return 0.85;
  return 0;
}

function getSupportTargets(pressure) {
  if (pressure.pressureKey === "strongIdentityPressure" && pressure.triggerMetric === "identityConflictRisk") {
    return identityConflictSupportTargets;
  }
  return supportTargets[pressure.pressureKey] || [];
}

function getSupportCap(pressure) {
  if (pressure.pressureKey === "strongIdentityPressure" && pressure.triggerMetric === "identityConflictRisk") {
    if (pressure.severityLevel === "critical") return 0.55;
    if (pressure.severityLevel === "heavy") return 0.8;
  }
  return severitySupportCap(pressure.severityLevel);
}

function applySupport(pressures, supportState, warnings) {
  const balances = [];

  pressures.forEach(pressure => {
    if (!pressure.matched || pressure.rawPenalty <= 0) return;

    const targets = getSupportTargets(pressure);
    if (!targets.length) return;

    const maxSupport = pressure.rawPenalty * getSupportCap(pressure);
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

function applyConflictAdjustments(input, pressures) {
  const adjustments = [];
  const taste = getValues(input, "tasteSummary");

  pressures.forEach(pressure => {
    if (
      pressure.pressureKey !== "strongIdentityPressure" ||
      pressure.triggerMetric !== "identityConflictRisk" ||
      !pressure.matched ||
      pressure.adjustedPenalty <= 0 ||
      (pressure.severityLevel !== "heavy" && pressure.severityLevel !== "critical")
    ) {
      return;
    }

    const roastedBitterSignal = Math.max(
      supportMetric(taste.coffeeRoast),
      supportMetric(taste.bitterness) * 0.8
    );
    const conflictSignal = supportMetric(pressure.observedValue);
    const extraPenalty = rounded(Math.min(
      22,
      Math.max(0, (roastedBitterSignal - 26) * 1.8 + (conflictSignal - 74))
    ));
    if (extraPenalty <= 0) return;

    pressure.adjustedPenalty += extraPenalty;
    adjustments.push({
      adjustmentKey: "roastedBitterIdentityConflict",
      pressureKey: pressure.pressureKey,
      roastedBitterSignal: rounded(roastedBitterSignal),
      conflictSignal: rounded(conflictSignal),
      extraPenalty,
      reason: "Roasted / bitter signal aggravates strong identity conflict as a generic balance rule, not as a recipe exception."
    });
  });

  return adjustments;
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

  const rawTotalPenalty = contributions.reduce((total, item) => total + item.finalPenaltyContribution, 0);
  const hasHeavyOrCritical = active.some(pressure =>
    pressure.severityLevel === "heavy" || pressure.severityLevel === "critical"
  );
  const totalPenaltyCap = hasHeavyOrCritical ? 88 : 42;
  const totalPenalty = Math.min(rawTotalPenalty, totalPenaltyCap);
  const dominantContribution = contributions.find(item =>
    item.severityLevel !== "light" || item.finalPenaltyContribution >= 6
  );
  const dominantPressure = dominantContribution?.pressureKey || null;

  return {
    baseScore,
    rawTotalPenalty,
    totalPenalty,
    totalPenaltyCap,
    diminishingReturnsEnabled: true,
    secondaryContributionFactors,
    contributions,
    dominantPressure,
    explanation: "Primary pressure counts fully; secondary pressures use capped diminishing contribution; non-severe stacks are capped."
  };
}

function getDrinkTypeComposerOutput(input, warnings) {
  const composer = window.MILK_TEA_LAB_DRINK_TYPE_COMPOSER;
  if (!composer?.composeDrinkType || !Array.isArray(input?.recipeItems) || !input.recipeItems.length) {
    return null;
  }
  const composed = composer.composeDrinkType({
    recipeItems: input.recipeItems,
    tasteSummary: input.tasteSummary,
    textureSummary: input.textureSummary,
    flavorSummary: input.flavorSummary
  });
  (Array.isArray(composed?.warnings) ? composed.warnings : []).forEach(warning => {
    warnings.push(`structural_coherence:${warning}`);
  });
  return composed || null;
}

function cloneTags(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getCompositionEntry(ingredientId) {
  const api = window.MILK_TEA_LAB_INGREDIENT_COMPOSITION_TAGS;
  return api?.getIngredientCompositionTags && ingredientId
    ? api.getIngredientCompositionTags(ingredientId)
    : null;
}

function getHighTextureModifierLoadBlockers(input) {
  return (Array.isArray(input?.recipeItems) ? input.recipeItems : [])
    .map(item => {
      const entry = getCompositionEntry(item?.ingredientId);
      const tags = new Set([
        ...cloneTags(entry?.compositionTags),
        ...cloneTags(entry?.roleTags)
      ]);
      const ratio = isNumber(item?.ratio) ? item.ratio : null;
      const isTextureModifier = entry?.displayRole === "modifier"
        && (tags.has("topping") || tags.has("texture"))
        && isNumber(ratio)
        && ratio >= highTextureModifierRatioThreshold;
      return isTextureModifier
        ? {
          ingredientId: item.ingredientId,
          ratio: rounded(ratio),
          blockerKey: "highTextureModifierLoad"
        }
        : null;
    })
    .filter(Boolean);
}

function getStructuralFloorTextureBlockers(activePressures) {
  return activePressures.filter(pressure => (
    structuralFloorBlockingTexturePressures.has(pressure.pressureKey)
    && (pressure.severityLevel === "medium"
      || pressure.severityLevel === "heavy"
      || pressure.severityLevel === "critical")
  ));
}

function getTextureBlockerScoreCap(blocker) {
  if (blocker?.pressureKey === "combinedTextureBurdenPressure" && blocker?.severityLevel === "medium") {
    return 32;
  }
  return texturePressureScoreCaps[blocker?.severityLevel];
}

function getTexturePressureScoreCap(textureBlockers) {
  const caps = textureBlockers
    .map(getTextureBlockerScoreCap)
    .filter(isNumber);
  return caps.length > 0 ? Math.min(...caps) : null;
}

function isMediumOrHigherPressure(pressure) {
  return pressure?.severityLevel === "medium"
    || pressure?.severityLevel === "heavy"
    || pressure?.severityLevel === "critical";
}

function buildStructuralCoherence(input, pressures, aggregation, warnings) {
  const composedDrinkType = getDrinkTypeComposerOutput(input, warnings);
  const drinkTypeId = composedDrinkType?.drinkTypeId || null;
  const baseFloor = structuralScoreFloors[drinkTypeId] || null;
  const active = pressures.filter(pressure => pressure.matched && pressure.adjustedPenalty > 0);
  const hasHeavyOrCritical = active.some(pressure =>
    pressure.severityLevel === "heavy" || pressure.severityLevel === "critical"
  );
  const textureFloorBlockers = getStructuralFloorTextureBlockers(active);
  const textureModifierLoadBlockers = getHighTextureModifierLoadBlockers(input);
  const blockedByTexturePressure = textureFloorBlockers.length > 0 || textureModifierLoadBlockers.length > 0;
  const floorBlockerPressureKeys = textureFloorBlockers.map(pressure => pressure.pressureKey);
  const floorBlockerKeys = [
    ...floorBlockerPressureKeys,
    ...textureModifierLoadBlockers.map(item => item.blockerKey)
  ];
  const scoreCap = blockedByTexturePressure
    ? Math.min(
      ...[
        getTexturePressureScoreCap(textureFloorBlockers),
        textureModifierLoadBlockers.length ? texturePressureScoreCaps.medium : null
      ].filter(isNumber)
    )
    : null;
  const mediumCount = active.filter(pressure => pressure.severityLevel === "medium").length;
  const scoreFloor = !hasHeavyOrCritical && !blockedByTexturePressure && isNumber(baseFloor)
    ? Math.max(0, baseFloor - Math.max(0, mediumCount - 1) * 4)
    : null;

  if (blockedByTexturePressure) {
    warnings.push(`structural_floor_blocked_by_texture_pressure:${floorBlockerKeys.join("+")}`);
  }

  return {
    enabled: true,
    composedDrinkType,
    drinkTypeId,
    broadTypeLabel: composedDrinkType?.broadTypeLabel || null,
    scoreFloor,
    scoreCap,
    blockedByTexturePressure,
    floorBlockerPressureKeys,
    floorBlockerKeys,
    textureModifierLoadBlockers,
    applied: isNumber(scoreFloor) && scoreFloor > baseScore - aggregation.totalPenalty,
    reason: blockedByTexturePressure
      ? `Structural floor blocked by texture pressure or high texture modifier load: ${floorBlockerKeys.join(", ")}.`
      : isNumber(scoreFloor)
      ? `${drinkTypeId} gives a generic structural coherence floor when no heavy/critical pressure is active.`
      : drinkTypeId
        ? `${drinkTypeId} has no structural floor or is blocked by heavy/critical pressure.`
        : "No broad drink type floor was available."
  };
}

function getVisibleIdentityFitEntries(composedDrinkType) {
  const labelParts = Array.isArray(composedDrinkType?.labelParts) ? composedDrinkType.labelParts : [];
  return labelParts.filter(part =>
    (part?.source === "modifier" || part?.source === "primary_identity")
    && part.ingredientId
  );
}

function buildVisibleIdentityFitSupport(structuralCoherence, pressures) {
  const composedDrinkType = structuralCoherence?.composedDrinkType || null;
  const drinkTypeId = composedDrinkType?.drinkTypeId || null;
  const entries = getVisibleIdentityFitEntries(composedDrinkType);
  const blockingPressures = pressures
    .filter(pressure => pressure?.matched && pressure.adjustedPenalty > 0 && isMediumOrHigherPressure(pressure))
    .map(pressure => pressure.pressureKey);

  if (!visibleIdentityFitDrinkTypes.has(drinkTypeId)) {
    return {
      enabled: false,
      applied: false,
      scoreBonus: 0,
      drinkTypeId,
      entries,
      blockingPressures,
      reason: "No eligible broad drink type for visible identity fit support."
    };
  }

  if (!entries.length) {
    return {
      enabled: false,
      applied: false,
      scoreBonus: 0,
      drinkTypeId,
      entries,
      blockingPressures,
      reason: "No visible modifier or primary identity to support drink completeness."
    };
  }

  if (blockingPressures.length || structuralCoherence?.blockedByTexturePressure) {
    return {
      enabled: false,
      applied: false,
      scoreBonus: 0,
      drinkTypeId,
      entries,
      blockingPressures,
      reason: "Visible identity fit support blocked by medium-or-higher pressure."
    };
  }

  const rawBonus = entries.reduce((total, entry) => {
    return total + (visibleIdentityFitScoreBonus[entry.source] || 0);
  }, 0);
  const scoreBonus = Math.min(rawBonus, visibleIdentityFitMaxBonus);

  return {
    enabled: true,
    applied: scoreBonus > 0,
    scoreBonus,
    drinkTypeId,
    entries: entries.map(entry => ({
      source: entry.source,
      ingredientId: entry.ingredientId
    })),
    blockingPressures,
    reason: `Visible identity / modifier fit supports ${drinkTypeId} completeness without overriding pressure.`
  };
}

function buildScoreReasons(pressures, balances, aggregation, structuralCoherence, conflictAdjustments, visibleIdentityFitSupport) {
  const pressureReasons = aggregation.contributions.slice(0, 4).map(item => {
    const pressure = pressures.find(entry => entry.pressureKey === item.pressureKey);
    return `${item.pressureKey}: ${pressure?.observedValue ?? "n/a"} / ${item.severityLevel} / -${item.finalPenaltyContribution}`;
  });

  const balanceReasons = balances.slice(0, 3).map(item =>
    `${item.supportKey} buffered ${item.pressureKey} by ${item.bufferAmount}`
  );

  const structuralReasons = structuralCoherence?.applied
    ? [`structuralCoherence floor ${structuralCoherence.scoreFloor} from ${structuralCoherence.drinkTypeId}`]
    : structuralCoherence?.blockedByTexturePressure
      ? [`structuralCoherence floor blocked by texture pressure (${structuralCoherence.floorBlockerKeys.join(", ")}); texture score cap ${structuralCoherence.scoreCap}`]
    : [];

  const conflictReasons = conflictAdjustments.slice(0, 2).map(item =>
    `${item.adjustmentKey} added ${item.extraPenalty} to ${item.pressureKey}`
  );

  const visibleIdentityReasons = visibleIdentityFitSupport?.applied
    ? [`visibleIdentityFitSupport +${visibleIdentityFitSupport.scoreBonus} from ${visibleIdentityFitSupport.entries.map(entry => entry.source).join("+")}`]
    : [];

  return [...pressureReasons, ...visibleIdentityReasons, ...balanceReasons, ...conflictReasons, ...structuralReasons];
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
  const conflictAdjustments = applyConflictAdjustments(input, pressures);
  checkFuturePressureWarnings(input, warnings);
  const aggregation = buildAggregation(pressures);
  const structuralCoherence = buildStructuralCoherence(input, pressures, aggregation, warnings);
  const visibleIdentityFitSupport = buildVisibleIdentityFitSupport(structuralCoherence, pressures);
  const rawScore = rounded(clamp(baseScore - aggregation.totalPenalty));
  const scoreBeforeTextureCap = rounded(clamp(isNumber(structuralCoherence.scoreFloor)
    ? Math.max(rawScore, structuralCoherence.scoreFloor)
    : rawScore));
  const scoreBeforeVisibleIdentityFitSupport = rounded(clamp(isNumber(structuralCoherence.scoreCap)
    ? Math.min(scoreBeforeTextureCap, structuralCoherence.scoreCap)
    : scoreBeforeTextureCap));
  const score = rounded(clamp(scoreBeforeVisibleIdentityFitSupport + visibleIdentityFitSupport.scoreBonus));
  const legacyScore = isNumber(input.legacyScore) ? rounded(clamp(input.legacyScore)) : null;

  return {
    schemaVersion,
    mode: "playtest_score_takeover",
    playtestOnly: true,
    scoreTakeoverOnly: true,
    profileSource: input.profileSource || "runtime_legacy_profile",
    affectsScore: true,
    affectsFeedback: false,
    affectsResultType: false,
    affectsAccident: false,
    affectsGoldenExpected: false,
    score,
    rawScoreBeforeStructuralFloor: rawScore,
    scoreBeforeTextureCap,
    scoreBeforeVisibleIdentityFitSupport,
    legacyScore,
    scoreDeltaFromLegacy: isNumber(legacyScore) ? score - legacyScore : null,
    confidence: buildConfidence(warnings, pressures),
    pressures,
    balances,
    conflictAdjustments,
    supportState,
    structuralCoherence,
    visibleIdentityFitSupport,
    aggregation,
    dominantPressure: aggregation.dominantPressure,
    scoreReasons: buildScoreReasons(pressures, balances, aggregation, structuralCoherence, conflictAdjustments, visibleIdentityFitSupport),
    warnings
  };
}

window.MILK_TEA_LAB_UNIFIED_SCORING_ENGINE = {
  buildUnifiedScoring
};
})();
