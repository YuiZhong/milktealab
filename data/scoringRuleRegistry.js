"use strict";

const scoringRegistryMetadata = {
  registryKind: "non_final_scoring_gate",
  schemaVersion: "scoringRuleRegistry.v0.0.8.22",
  canAffectFinalScore: false,
  canAffectRuntime: false,
  canAffectGoldenExpected: false,
  activeValidator: false,
  runtimeData: false,
  generatedData: false,
  note: "Minimum registry / validator gate for future scoring work; not an active runtime registry."
};

const sourceLayers = [
  "taste",
  "texture",
  "flavor",
  "structure",
  "balance",
  "aggregation"
];

const severityLevels = [
  "info",
  "light",
  "medium",
  "heavy",
  "critical"
];

const scoreRuleStatuses = [
  "draft_non_final",
  "review_only",
  "disabled",
  "deprecated"
];

const pressureKeys = [
  {
    key: "sweetnessPressure",
    sourceLayer: "taste",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["sweetness"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Reads current sweetness only as a non-final pressure direction."]
  },
  {
    key: "acidPressure",
    sourceLayer: "taste",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["acidity"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Reads current acidity only as a non-final pressure direction."]
  },
  {
    key: "bitterPressure",
    sourceLayer: "taste",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["bitterness"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Reads current bitterness only as a non-final pressure direction."]
  },
  {
    key: "fatPressure",
    sourceLayer: "texture",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["fatLoad"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Represents mouthfeel burden direction; not an official fat severity rule."]
  },
  {
    key: "solidLoadPressure",
    sourceLayer: "texture",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["solidLoad"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Represents topping / chew load direction; not a runtime accident trigger."]
  },
  {
    key: "lowFlowPressure",
    sourceLayer: "texture",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["drinkabilityPenalty"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Represents low-flow direction; not an official low drinkability rule."]
  },
  {
    key: "powderPressure",
    sourceLayer: "texture",
    status: "review_only",
    availability: "missing_summary_mapping",
    triggerMetrics: ["sediment", "pasteRisk"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: [
      "Current summaries expose related sedimentRisk / viscosity, but no official powderPressure mapping exists."
    ]
  },
  {
    key: "combinedTextureBurdenPressure",
    sourceLayer: "texture",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["combinedTextureBurden"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: [
      "Combines structure load, topping / texture ratio, sediment and viscosity as a playtest-only texture burden pressure."
    ]
  },
  {
    key: "strongIdentityPressure",
    sourceLayer: "flavor",
    status: "draft_non_final",
    availability: "observed_summary_metric_proxy",
    triggerMetrics: ["aromaPressure", "dominantPotential"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Represents strong flavor identity direction; support / conflict scoring is not implemented here."]
  },
  {
    key: "saltinessPressure",
    sourceLayer: "taste",
    status: "review_only",
    availability: "missing_summary_mapping",
    triggerMetrics: [],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Future taste field; not currently available as official scoring input."]
  },
  {
    key: "astringencyPressure",
    sourceLayer: "taste",
    status: "review_only",
    availability: "missing_summary_mapping",
    triggerMetrics: ["astringency"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Astringency is observable, but pressure / scoring mapping is not official."]
  },
  {
    key: "syrupinessPressure",
    sourceLayer: "texture",
    status: "review_only",
    availability: "missing_summary_mapping",
    triggerMetrics: [],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Future syrupy mouthfeel direction; no official summary mapping yet."]
  },
  {
    key: "stickinessPressure",
    sourceLayer: "texture",
    status: "review_only",
    availability: "missing_summary_mapping",
    triggerMetrics: [],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false,
    notes: ["Future sticky / adhesive mouthfeel direction; no official summary mapping yet."]
  }
];

const triggerMetrics = [
  {
    key: "sweetness",
    sourceLayer: "taste",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "acidity",
    sourceLayer: "taste",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "bitterness",
    sourceLayer: "taste",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "fatLoad",
    sourceLayer: "texture",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "solidLoad",
    sourceLayer: "texture",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "drinkabilityPenalty",
    sourceLayer: "texture",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "combinedTextureBurden",
    sourceLayer: "texture",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "sediment",
    sourceLayer: "texture",
    availability: "draft_profile_only",
    status: "review_only",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "pasteRisk",
    sourceLayer: "texture",
    availability: "draft_profile_only",
    status: "review_only",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "aromaPressure",
    sourceLayer: "flavor",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "identityStrength",
    sourceLayer: "flavor",
    availability: "draft_profile_only",
    status: "review_only",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    key: "dominantPotential",
    sourceLayer: "flavor",
    availability: "observed",
    status: "draft_non_final",
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  }
];

const scoreRules = [
  {
    ruleId: "draft_taste_sweetness",
    pressureKey: "sweetnessPressure",
    triggerMetric: "sweetness",
    sourceLayer: "taste",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy", "critical"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_texture_solid_load",
    pressureKey: "solidLoadPressure",
    triggerMetric: "solidLoad",
    sourceLayer: "texture",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_texture_fat_load",
    pressureKey: "fatPressure",
    triggerMetric: "fatLoad",
    sourceLayer: "texture",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_texture_drinkability_penalty",
    pressureKey: "lowFlowPressure",
    triggerMetric: "drinkabilityPenalty",
    sourceLayer: "texture",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_texture_combined_burden",
    pressureKey: "combinedTextureBurdenPressure",
    triggerMetric: "combinedTextureBurden",
    sourceLayer: "texture",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy", "critical"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_taste_acidity",
    pressureKey: "acidPressure",
    triggerMetric: "acidity",
    sourceLayer: "taste",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_taste_bitterness",
    pressureKey: "bitterPressure",
    triggerMetric: "bitterness",
    sourceLayer: "taste",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  },
  {
    ruleId: "draft_flavor_strong_identity",
    pressureKey: "strongIdentityPressure",
    triggerMetric: "aromaPressure",
    sourceLayer: "flavor",
    status: "draft_non_final",
    severityLevels: ["light", "medium", "heavy", "critical"],
    canAffectFinalScore: false,
    canAffectRuntime: false,
    canAffectGoldenExpected: false
  }
];

module.exports = {
  scoringRegistryMetadata,
  sourceLayers,
  severityLevels,
  scoreRuleStatuses,
  pressureKeys,
  triggerMetrics,
  scoreRules
};
