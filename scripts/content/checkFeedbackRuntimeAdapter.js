#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createFeedbackRuntimeAdapter } = require("../../core/feedbackRuntimeAdapter.js");

const repoRoot = path.resolve(__dirname, "../..");
const generatedPath = path.join(repoRoot, "data/generated/feedbackTexts.generated.json");

function readGeneratedData() {
  return JSON.parse(fs.readFileSync(generatedPath, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasTextId(records, textId) {
  return records.some(record => record.textId === textId);
}

function ids(records) {
  return records.map(record => record.textId);
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertFrozen(record, message) {
  assert(Object.isFrozen(record), message);
}

function main() {
  const data = readGeneratedData();
  const dataBeforeChecks = cloneJson(data);
  const adapter = createFeedbackRuntimeAdapter(data);
  const metadata = adapter.getMetadata();

  assert(adapter.isAvailable(), "adapter should be available for generated feedback data");
  assert(metadata.available === true, "metadata.available should be true");
  assert(metadata.readonly === true, "metadata.readonly should be true");
  assert(metadata.generatedMetadata?.readonly === true, "generated metadata should preserve readonly direction");
  assert(metadata.generatedMetadata?.sourceType === "generated", "generated metadata should preserve sourceType");
  assert(metadata.generatedMetadata?.stableIdRequired === true, "generated metadata should preserve stable ID direction");

  const classic = adapter.getTextById("feedback_classic_001");
  assert(classic?.textId === "feedback_classic_001", "getTextById should return feedback_classic_001");
  assertFrozen(classic, "getTextById should return a frozen candidate copy");
  assert(adapter.getTextById("missing_text_id") === null, "missing textId should return null");
  assert(adapter.getTextById(classic.zhCN) === null, "getTextById should not query by zhCN");

  try {
    classic.zhCN = "polluted text";
  } catch (error) {
    assert(error instanceof TypeError, "mutating a frozen candidate should throw TypeError in strict mode");
  }
  assert(adapter.getTextById("feedback_classic_001").zhCN === data.textsById.feedback_classic_001.zhCN, "mutating returned text should not pollute source data");

  const strawTexts = adapter.getTextsByTag("straw_disaster");
  assert(strawTexts.length === 2, "straw_disaster should return enabled candidates");
  assert(strawTexts.every(record => record.enabled === true), "getTextsByTag should default to enabled records");
  assert(ids(strawTexts).includes("feedback_straw_disaster_001"), "straw_disaster should include first stable textId");
  assert(ids(strawTexts).includes("feedback_straw_disaster_002"), "straw_disaster should include second stable textId");
  assert(adapter.getTextsByTag("吸管刚插进去就提交了辞职信").length === 0, "getTextsByTag should not query by zhCN");

  const accidentTexts = adapter.getTextsByScene("accident");
  assert(accidentTexts.length === 5, "accident scene should return enabled candidates");
  assert(accidentTexts.every(record => record.scene === "accident"), "getTextsByScene should filter by scene");
  assert(accidentTexts.every(record => record.enabled === true), "getTextsByScene should default to enabled records");

  const followupTexts = adapter.getTextsByScene("followup");
  assert(followupTexts.length === 2, "followup scene should return enabled followup candidates");
  assert(followupTexts.every(record => record.scene === "followup"), "followup query should only return followup scene");

  const defaultWeirdTexts = adapter.getTextsByTag("weird");
  assert(!hasTextId(defaultWeirdTexts, "feedback_disabled_idea_001"), "disabled text should be excluded by default");

  const allWeirdTexts = adapter.getTextsByTag("weird", { includeDisabled: true });
  assert(hasTextId(allWeirdTexts, "feedback_disabled_idea_001"), "includeDisabled should include disabled text");
  assert(adapter.getTextsByScene("normal", { includeDisabled: true }).length === 4, "includeDisabled should include disabled normal-scene text");

  const lowScoreTexts = adapter.getEnabledTexts({ score: 20 });
  assert(hasTextId(lowScoreTexts, "feedback_acid_accident_001"), "score filter should match low-score accident text");
  assert(!hasTextId(lowScoreTexts, "feedback_classic_001"), "score filter should exclude out-of-range text");

  const accidentFilterTexts = adapter.getEnabledTexts({ scene: "accident" });
  assert(accidentFilterTexts.length === 5, "scene filter should return accident candidates");

  const tagFilterTexts = adapter.getEnabledTexts({ feedbackTag: "greasy_overload" });
  assert(tagFilterTexts.length === 2, "feedbackTag filter should return greasy overload candidates");

  const accidentTypeTexts = adapter.getEnabledTexts({ accidentTypeId: "texture_straw_resistance" });
  assert(accidentTypeTexts.length === 2, "accidentTypeId filter should return straw resistance candidates");

  const premiumTexts = adapter.getEnabledTexts({ drinkTypeId: "premium_thick_milk_tea" });
  assert(hasTextId(premiumTexts, "feedback_premium_001"), "stable ID filter should match premium text");

  const outcomeTexts = adapter.getEnabledTexts({ outcomeTypeId: "taste_conflict" });
  assert(hasTextId(outcomeTexts, "feedback_bubble_conflict_001"), "outcomeTypeId filter should match conflict text");

  const teasingTexts = adapter.getEnabledTexts({ tone: "teasing" });
  assert(hasTextId(teasingTexts, "feedback_durian_001"), "tone filter should match teasing text");

  const rangeTexts = adapter.getEnabledTexts({ minScore: 80, maxScore: 100 });
  assert(hasTextId(rangeTexts, "feedback_classic_001"), "score range should overlap classic text");
  assert(!hasTextId(rangeTexts, "feedback_acid_accident_001"), "score range should exclude non-overlapping accident text");

  const tagQueryCopy = adapter.getTextsByTag("straw_disaster")[0];
  try {
    tagQueryCopy.tone = "classic";
  } catch (error) {
    assert(error instanceof TypeError, "mutating tag query result should throw TypeError in strict mode");
  }
  assert(adapter.getTextsByTag("straw_disaster")[0].tone === data.textsById.feedback_straw_disaster_001.tone, "mutating tag result should not pollute later query results");
  assert(JSON.stringify(data) === JSON.stringify(dataBeforeChecks), "adapter checks should not mutate generated data object");

  const unavailableAdapter = createFeedbackRuntimeAdapter({});
  const unavailableMetadata = unavailableAdapter.getMetadata();
  assert(unavailableAdapter.isAvailable() === false, "invalid data should create unavailable adapter");
  assert(unavailableAdapter.getEnabledTexts().length === 0, "unavailable adapter should return no enabled texts");
  assert(unavailableMetadata.available === false, "unavailable metadata should mark available false");
  assert(unavailableMetadata.issues.length > 0, "unavailable metadata should include issues");
  assert(unavailableAdapter.getTextById("feedback_classic_001") === null, "unavailable adapter should not fallback to legacy text");

  console.log("Feedback runtime adapter check passed");
  console.log(`Source: ${generatedPath}`);
  console.log(`Texts checked: ${Object.keys(data.textsById).length}`);
}

main();
