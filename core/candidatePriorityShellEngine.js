(function() {
const priorityBandOrder = [
  "hard_physical",
  "texture_drinkability",
  "taste_overload",
  "flavor_identity",
  "normal_conflict",
  "positive_synergy",
  "type_classification",
  "feedback_hint"
];

const priorityBandAliases = {
  texture_blocking: "hard_physical",
  texture_load: "texture_drinkability",
  flavor_fit: "flavor_identity",
  positive_combo: "positive_synergy"
};

const candidateTypeFallbackBands = {
  accident: "normal_conflict",
  outcome: "normal_conflict",
  drinkType: "type_classification",
  feedback: "feedback_hint"
};

const metadata = {
  schemaVersion: "candidatePriorityShell.v0.0.6.15",
  readonly: true,
  affectsFinalResult: false,
  weightsEnabled: false,
  source: "summaryCandidates"
};

function cloneValue(value) {
  if (Array.isArray(value)) return value.map(cloneValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneValue(item)]));
  }
  return value;
}

function cloneCandidate(candidate) {
  return cloneValue(candidate);
}

function createEmptyByPriorityBand() {
  return Object.fromEntries(priorityBandOrder.map(priorityBand => [priorityBand, []]));
}

function createEmptyTopCandidates() {
  return {
    accident: null,
    outcome: null,
    drinkType: null,
    feedback: []
  };
}

function createEmptyCandidatePriorityShell() {
  return {
    orderedCandidates: [],
    byPriorityBand: createEmptyByPriorityBand(),
    topCandidates: createEmptyTopCandidates(),
    metadata: { ...metadata }
  };
}

function getCandidatePriorityBand(candidate) {
  const priorityBand = candidate?.priorityBand;
  if (priorityBandAliases[priorityBand]) return priorityBandAliases[priorityBand];
  if (priorityBandOrder.includes(priorityBand)) return priorityBand;
  return candidateTypeFallbackBands[candidate?.candidateType] || "feedback_hint";
}

function getPriorityBandIndex(candidate) {
  const priorityBand = getCandidatePriorityBand(candidate);
  const index = priorityBandOrder.indexOf(priorityBand);
  return index === -1 ? priorityBandOrder.length : index;
}

function sortCandidates(candidates) {
  return candidates
    .map((candidate, index) => ({ candidate, index }))
    .sort((left, right) => {
      const bandDelta = getPriorityBandIndex(left.candidate) - getPriorityBandIndex(right.candidate);
      if (bandDelta !== 0) return bandDelta;
      return left.index - right.index;
    })
    .map(item => cloneCandidate(item.candidate));
}

function fillByPriorityBand(target, candidates) {
  candidates.forEach(candidate => {
    const priorityBand = getCandidatePriorityBand(candidate);
    target[priorityBand].push(candidate);
  });
}

function fillTopCandidates(target, candidates) {
  candidates.forEach(candidate => {
    if (candidate.candidateType === "accident" && !target.accident) {
      target.accident = candidate;
    }
    if (candidate.candidateType === "outcome" && !target.outcome) {
      target.outcome = candidate;
    }
    if (candidate.candidateType === "drinkType" && !target.drinkType) {
      target.drinkType = candidate;
    }
    if (candidate.candidateType === "feedback") {
      target.feedback.push(candidate);
    }
  });
}

function buildCandidatePriorityShell(summaryCandidates) {
  const shell = createEmptyCandidatePriorityShell();
  const candidates = Array.isArray(summaryCandidates?.candidates)
    ? sortCandidates(summaryCandidates.candidates)
    : [];

  shell.orderedCandidates = candidates;
  fillByPriorityBand(shell.byPriorityBand, candidates);
  fillTopCandidates(shell.topCandidates, candidates);

  return shell;
}

window.MILK_TEA_LAB_CANDIDATE_PRIORITY_SHELL_ENGINE = {
  buildCandidatePriorityShell
};
})();
