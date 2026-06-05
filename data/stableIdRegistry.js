"use strict";

const stableIdRegistry = [
  {
    id: "taste_acid_overload",
    idFamily: "accidentTypeId",
    status: "reviewed_candidate_not_approved",
    humanMeaning: "酸爆了 / 酸度过载",
    sourceLayer: "taste",
    sourceSummary: "tasteSummary",
    triggerMetricCandidates: ["acidity", "acidLoad", "acidPressure"],
    evidenceNotes: [
      "Acidic ingredients are evidence only.",
      "High acid ratio and tasteSummary acid-pressure evidence may support this mechanism."
    ],
    blockedEvidence: [
      "No ingredient-specific accident IDs.",
      "No sampleId / displayName / player copy as triggerMetric.",
      "No severity suffix.",
      "No novelty / weirdness as acid overload."
    ],
    boundaryNotes: [
      "Distinct from flavor identity conflict.",
      "Distinct from novelty / weirdness.",
      "Distinct from bitterness / astringency.",
      "Distinct from feedbackTag."
    ],
    historicalLinks: [],
    canEnterValidator: false,
    canEnterGeneratedSeverity: false,
    canAffectRuntime: false,
    reviewNotes: [
      "First-batch future registry candidate only; not approved stable."
    ]
  },
  {
    id: "texture_solid_overload",
    idFamily: "accidentTypeId",
    status: "reviewed_candidate_not_approved",
    humanMeaning: "小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足",
    sourceLayer: "texture",
    sourceSummary: "textureSummary",
    triggerMetricCandidates: ["solidLoad", "textureRatio", "liquidSupport", "lowLiquidSupport"],
    evidenceNotes: [
      "Concrete toppings are evidence only.",
      "High solid load, low liquid support, and structure / texture summary evidence may support this mechanism."
    ],
    blockedEvidence: [
      "No topping-specific accident IDs.",
      "No player copy as triggerMetric.",
      "No every straw problem as solid overload.",
      "No historical texture_topping_overload returning as current ID."
    ],
    boundaryNotes: [
      "Distinct from texture_low_drinkability.",
      "Distinct from texture_straw_resistance.",
      "Concrete topping names may appear in evidence / notes / feedback copy, not accidentTypeId."
    ],
    historicalLinks: [
      {
        id: "texture_topping_overload",
        relation: "historical_pre_v0_0_7_49_legacy_reference_only"
      }
    ],
    canEnterValidator: false,
    canEnterGeneratedSeverity: false,
    canAffectRuntime: false,
    reviewNotes: [
      "First-batch future registry candidate only; not approved stable."
    ]
  }
];

module.exports = {
  stableIdRegistry
};
