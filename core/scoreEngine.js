(function() {
const { clamp } = window.MILK_TEA_LAB_HELPERS;

function createScoreState(initialScore = 54, initialCap = 100) {
  return {
    value: initialScore,
    cap: initialCap
  };
}

function addScore(scoreState, delta) {
  scoreState.value += delta;
}

function applyScoreCap(scoreState, cap) {
  scoreState.cap = Math.min(scoreState.cap, cap);
}

function applyAttributeScore(scoreState, attr, ingredientCount) {
  scoreState.value += attr.fresh * 0.12 + attr.photo * 0.06 + Math.min(attr.tea, 60) * 0.06 + Math.min(attr.milk, 60) * 0.06;
  scoreState.value -= Math.max(0, attr.sweet - 68) * 0.22;
  scoreState.value -= Math.max(0, attr.thick - 76) * 0.2;
  scoreState.value -= Math.max(0, attr.straw - 62) * 0.34;
  scoreState.value -= Math.max(0, attr.greasy - 68) * 0.32;
  scoreState.value -= attr.odd * 0.45;
  scoreState.value -= Math.max(0, ingredientCount - 6) * 6;
}

function finalizeScore(scoreState) {
  return Math.round(clamp(Math.min(scoreState.value, scoreState.cap)));
}

window.MILK_TEA_LAB_SCORE_ENGINE = {
  createScoreState,
  addScore,
  applyScoreCap,
  applyAttributeScore,
  finalizeScore
};
})();
