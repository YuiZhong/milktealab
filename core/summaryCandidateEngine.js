(function() {
const candidateTypes = ["accident", "outcome", "drinkType", "feedback"];

const summaryCandidatesMetadata = {
  schemaVersion: "summaryCandidates.v0.0.6.12",
  readonly: true,
  weightsEnabled: false,
  affectsFinalResult: false
};

const summaryCandidateMetadata = {
  schemaVersion: "summaryCandidate.v0.0.6.12",
  readonly: true,
  weightsEnabled: false,
  source: "summary"
};

const riskCandidateRules = [
  {
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    risk: "acid_overload_risk",
    candidateId: "taste_acid_overload_candidate",
    candidateType: "accident",
    triggerMetric: "acidity",
    thresholds: { warning: 24, accident: 60 },
    priorityBand: "taste_overload",
    severityHint: "medium",
    feedbackTags: ["acid_accident"],
    accidentTypeId: "taste_acid_overload",
    ruleFamilyId: "taste_overload_rules"
  },
  {
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    risk: "sweet_overload_risk",
    candidateId: "taste_sweet_overload_candidate",
    candidateType: "feedback",
    triggerMetric: "sweetness",
    thresholds: { warning: 22 },
    priorityBand: "taste_overload",
    severityHint: "low",
    feedbackTags: ["sweet_overload"],
    ruleFamilyId: "taste_overload_rules"
  },
  {
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    risk: "bitterness_overload_risk",
    candidateId: "taste_bitterness_overload_candidate",
    candidateType: "feedback",
    triggerMetric: "bitterness",
    thresholds: { warning: 18 },
    priorityBand: "taste_overload",
    severityHint: "low",
    feedbackTags: ["bitterness_overload"],
    ruleFamilyId: "taste_overload_rules"
  },
  {
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    risk: "high_straw_resistance_risk",
    candidateId: "texture_straw_resistance_candidate",
    candidateType: "accident",
    triggerMetric: "strawResistance",
    thresholds: { warning: 65 },
    priorityBand: "texture_blocking",
    severityHint: "high",
    feedbackTags: ["straw_disaster"],
    accidentTypeId: "texture_straw_resistance",
    ruleFamilyId: "texture_blocking_rules"
  },
  {
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    risk: "high_solid_load_risk",
    candidateId: "texture_solid_overload_candidate",
    candidateType: "accident",
    triggerMetric: "solidLoad",
    thresholds: { warning: 65 },
    priorityBand: "texture_load",
    severityHint: "medium",
    feedbackTags: ["texture_heavy"],
    accidentTypeId: "texture_solid_overload",
    ruleFamilyId: "texture_load_rules"
  },
  {
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    risk: "low_drinkability_risk",
    candidateId: "texture_low_drinkability_candidate",
    candidateType: "accident",
    triggerMetric: "drinkability",
    thresholds: { warning: 45 },
    priorityBand: "texture_blocking",
    severityHint: "medium",
    feedbackTags: ["low_drinkability"],
    accidentTypeId: "texture_low_drinkability",
    ruleFamilyId: "texture_drinkability_rules"
  },
  {
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    risk: "fat_load_risk",
    candidateId: "texture_fat_load_candidate",
    candidateType: "feedback",
    triggerMetric: "fatLoad",
    thresholds: { warning: 30 },
    priorityBand: "texture_load",
    severityHint: "low",
    feedbackTags: ["greasy_overload"],
    ruleFamilyId: "texture_load_rules"
  },
  {
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    risk: "sediment_risk",
    candidateId: "texture_sediment_candidate",
    candidateType: "feedback",
    triggerMetric: "sedimentRisk",
    thresholds: { warning: 30 },
    priorityBand: "texture_load",
    severityHint: "low",
    feedbackTags: ["texture_sediment"],
    ruleFamilyId: "texture_load_rules"
  },
  {
    sourceSummary: "flavorSummary",
    sourceLayer: "flavor",
    risk: "high_aroma_pressure_risk",
    candidateId: "flavor_aroma_pressure_candidate",
    candidateType: "feedback",
    triggerMetric: "aromaPressure",
    thresholds: { warning: 60 },
    priorityBand: "flavor_identity",
    severityHint: "medium",
    feedbackTags: ["aroma_pressure"],
    ruleFamilyId: "flavor_identity_rules"
  },
  {
    sourceSummary: "flavorSummary",
    sourceLayer: "flavor",
    risk: "high_novelty_risk",
    candidateId: "flavor_novelty_candidate",
    candidateType: "outcome",
    triggerMetric: "noveltyRisk",
    thresholds: { warning: 55 },
    priorityBand: "flavor_identity",
    severityHint: "medium",
    feedbackTags: ["novelty"],
    outcomeTypeId: "novelty_experiment",
    ruleFamilyId: "flavor_identity_rules"
  },
  {
    sourceSummary: "flavorSummary",
    sourceLayer: "flavor",
    risk: "savory_identity_risk",
    candidateId: "flavor_savory_identity_candidate",
    candidateType: "feedback",
    triggerMetric: "savoryRisk",
    thresholds: { warning: 35 },
    priorityBand: "flavor_identity",
    severityHint: "medium",
    feedbackTags: ["savory_identity"],
    ruleFamilyId: "flavor_identity_rules"
  },
  {
    sourceSummary: "flavorSummary",
    sourceLayer: "flavor",
    risk: "low_beverage_fit_risk",
    candidateId: "flavor_low_beverage_fit_candidate",
    candidateType: "feedback",
    triggerMetric: "beverageFit",
    thresholds: { warning: 55 },
    priorityBand: "flavor_fit",
    severityHint: "low",
    feedbackTags: ["low_beverage_fit"],
    ruleFamilyId: "flavor_fit_rules"
  }
];

const valueCandidateRules = [
  {
    sourceSummary: "flavorSummary",
    sourceLayer: "flavor",
    candidateId: "flavor_identity_conflict_candidate",
    candidateType: "feedback",
    triggerMetric: "identityConflictRisk",
    minValue: 18,
    thresholds: { warning: 18 },
    priorityBand: "flavor_identity",
    severityHint: "medium",
    feedbackTags: ["identity_conflict"],
    ruleFamilyId: "flavor_identity_rules"
  }
];

function createEmptyByType() {
  return Object.fromEntries(candidateTypes.map(type => [type, []]));
}

function createEmptySummaryCandidates() {
  return {
    candidates: [],
    byType: createEmptyByType(),
    metadata: { ...summaryCandidatesMetadata }
  };
}

function hasRisk(summary, risk) {
  return Array.isArray(summary?.risks) && summary.risks.includes(risk);
}

function getTriggerValue(summary, metric) {
  const value = summary?.values?.[metric];
  return typeof value === "number" ? value : null;
}

function getEvidence(summary, metric) {
  if (!Array.isArray(summary?.evidence)) return [];
  return summary.evidence
    .filter(item => item?.metric === metric)
    .map(item => ({ ...item }));
}

function getSourceSummary(summaries, sourceSummary) {
  return summaries?.[sourceSummary] || null;
}

function isValueRuleMatched(rule, summary) {
  const value = getTriggerValue(summary, rule.triggerMetric);
  if (value === null) return false;
  if (typeof rule.minValue === "number" && value < rule.minValue) return false;
  if (typeof rule.maxValue === "number" && value > rule.maxValue) return false;
  return true;
}

function createCandidate(rule, summary) {
  return {
    candidateId: rule.candidateId,
    candidateType: rule.candidateType,
    sourceLayer: rule.sourceLayer,
    sourceSummary: rule.sourceSummary,
    triggerMetric: rule.triggerMetric,
    triggerValue: getTriggerValue(summary, rule.triggerMetric),
    thresholds: { ...(rule.thresholds || {}) },
    evidence: getEvidence(summary, rule.triggerMetric),
    priorityBand: rule.priorityBand || null,
    severityHint: rule.severityHint || null,
    feedbackTags: Array.isArray(rule.feedbackTags) ? [...rule.feedbackTags] : [],
    accidentTypeId: rule.accidentTypeId || null,
    outcomeTypeId: rule.outcomeTypeId || null,
    drinkTypeId: rule.drinkTypeId || null,
    ruleFamilyId: rule.ruleFamilyId || null,
    metadata: { ...summaryCandidateMetadata }
  };
}

function addCandidate(result, candidate) {
  result.candidates.push(candidate);
  if (Array.isArray(result.byType[candidate.candidateType])) {
    result.byType[candidate.candidateType].push(candidate);
  }
}

function buildSummaryCandidates({ tasteSummary, textureSummary, flavorSummary } = {}) {
  const result = createEmptySummaryCandidates();
  const summaries = { tasteSummary, textureSummary, flavorSummary };

  riskCandidateRules.forEach(rule => {
    const summary = getSourceSummary(summaries, rule.sourceSummary);
    if (!hasRisk(summary, rule.risk)) return;
    addCandidate(result, createCandidate(rule, summary));
  });

  valueCandidateRules.forEach(rule => {
    const summary = getSourceSummary(summaries, rule.sourceSummary);
    if (!isValueRuleMatched(rule, summary)) return;
    addCandidate(result, createCandidate(rule, summary));
  });

  return result;
}

window.MILK_TEA_LAB_SUMMARY_CANDIDATE_ENGINE = {
  buildSummaryCandidates
};
})();
