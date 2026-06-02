(function() {
const feedbackTexts = window.MILK_TEA_LAB_FEEDBACK_TEXTS || {};
const feedbackPools = feedbackTexts.feedbackPools || {};
const fallbackFeedbackTagPools = {
  accident: "accident",
  straw_disaster: "strawDisaster",
  greasy_overload: "greasyOverload",
  acid_accident: "acidAccident",
  weird: "weird",
  classic: "classic",
  premium: "premium",
  fresh: "fresh",
  sweet: "sweet",
  dessert: "dessertRich",
  durian: "durianMilk",
  bubble_conflict: "bubbleConflict",
  normal_good: "good",
  straw_followup: "strawFollowup",
  thick_followup: "thickFollowup",
  thick_straw_followup: "thickStrawFollowup",
  acid_milk_conflict: "acidMilkConflict"
};
const feedbackTagPools = feedbackTexts.feedbackTagPools || fallbackFeedbackTagPools;
const { pick } = window.MILK_TEA_LAB_HELPERS;

function pickByTag(tag) {
  const poolName = feedbackTagPools[tag];
  const pool = feedbackPools[poolName] || feedbackPools[tag];
  return pool ? pick(pool) : "";
}

function normalizeFeedbackTags(input) {
  if (Array.isArray(input)) return input;
  if (!input || typeof input !== "object") return [];
  if (Array.isArray(input.feedbackTags)) return input.feedbackTags;
  if (Array.isArray(input.tags)) return input.tags;
  return [];
}

function getKnownFeedbackTag(tags) {
  return normalizeFeedbackTags(tags).find(tag => feedbackTagPools[tag] || feedbackPools[tag]) || null;
}

function getLegacyPrimaryFeedbackTag(notes) {
  if (notes[0]?.includes("红茶和牛奶")) return "classic";
  if (notes[0]?.includes("乌龙")) return "premium";
  if (notes[0]?.includes("牛奶把榴莲")) return "durian";
  return null;
}

function getPrimaryFeedbackTag(attr, score, notes, hasAccident, tags = []) {
  const knownFeedbackTag = getKnownFeedbackTag(tags);
  if (knownFeedbackTag) return knownFeedbackTag;

  if (hasAccident) {
    if (attr.straw >= 65 || (attr.thick >= 78 && attr.straw >= 48)) return "straw_disaster";
    if (attr.greasy >= 68) return "greasy_overload";
    if (attr.acid >= 70) return "acid_accident";
    return "accident";
  }
  if (attr.thick >= 70 && attr.straw < 48) return "dessert";
  const legacyTag = getLegacyPrimaryFeedbackTag(notes);
  if (legacyTag) return legacyTag;
  if (score >= 72) return attr.fresh >= 50 ? "fresh" : "normal_good";
  if (score >= 56) return attr.tea >= 28 && attr.milk >= 24 ? "classic" : "normal_good";
  if (attr.sweet >= 72 && attr.odd < 48) return "sweet";
  return "weird";
}

function getFollowupTags(attr) {
  const tags = [];
  if (attr.straw >= 70) tags.push("straw_followup");
  if (attr.thick >= 78 && attr.straw < 70 && attr.greasy < 68) tags.push("thick_followup");
  if (attr.thick >= 78 && attr.straw >= 70) tags.push("thick_straw_followup");
  if (attr.acid >= 62 && attr.milk >= 28) tags.push("acid_milk_conflict");
  if (attr.bubble >= 50 && attr.thick >= 58) tags.push("bubble_conflict");
  return tags;
}

function getFeedbackTags(attr, score, notes, hasAccident = false, options = {}) {
  const sourceTags = normalizeFeedbackTags(options);
  const primaryTag = getPrimaryFeedbackTag(attr, score, notes, hasAccident, sourceTags);
  return [...new Set([primaryTag, ...getFollowupTags(attr)].filter(Boolean))];
}

function makeFeedback(attr, score, notes, hasAccident = false, options = {}) {
  const parts = [];
  if (notes.length) parts.push(hasAccident ? notes[0] : pick(notes));

  getFeedbackTags(attr, score, notes, hasAccident, options).forEach(tag => {
    parts.push(pickByTag(tag));
  });

  return [...new Set(parts)].slice(0, 3).join(" ");
}

window.MILK_TEA_LAB_FEEDBACK_ENGINE = {
  getPrimaryFeedbackTag,
  getFollowupTags,
  getFeedbackTags,
  makeFeedback
};
})();
