#!/usr/bin/env node

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

function main() {
  const data = readGeneratedData();
  const adapter = createFeedbackRuntimeAdapter(data);
  const metadata = adapter.getMetadata();

  assert(adapter.isAvailable(), "adapter should be available for generated feedback data");
  assert(metadata.available === true, "metadata.available should be true");
  assert(metadata.readonly === true, "metadata.readonly should be true");

  const classic = adapter.getTextById("feedback_classic_001");
  assert(classic?.textId === "feedback_classic_001", "getTextById should return feedback_classic_001");
  assert(adapter.getTextById("missing_text_id") === null, "missing textId should return null");
  assert(adapter.getTextById(classic.zhCN) === null, "getTextById should not query by zhCN");

  const strawTexts = adapter.getTextsByTag("straw_disaster");
  assert(strawTexts.length === 2, "straw_disaster should return enabled candidates");
  assert(strawTexts.every(record => record.enabled === true), "getTextsByTag should default to enabled records");

  const accidentTexts = adapter.getTextsByScene("accident");
  assert(accidentTexts.length === 5, "accident scene should return enabled candidates");
  assert(accidentTexts.every(record => record.scene === "accident"), "getTextsByScene should filter by scene");

  const defaultWeirdTexts = adapter.getTextsByTag("weird");
  assert(!hasTextId(defaultWeirdTexts, "feedback_disabled_idea_001"), "disabled text should be excluded by default");

  const allWeirdTexts = adapter.getTextsByTag("weird", { includeDisabled: true });
  assert(hasTextId(allWeirdTexts, "feedback_disabled_idea_001"), "includeDisabled should include disabled text");

  const lowScoreTexts = adapter.getEnabledTexts({ score: 20 });
  assert(hasTextId(lowScoreTexts, "feedback_acid_accident_001"), "score filter should match low-score accident text");
  assert(!hasTextId(lowScoreTexts, "feedback_classic_001"), "score filter should exclude out-of-range text");

  const premiumTexts = adapter.getEnabledTexts({ drinkTypeId: "premium_thick_milk_tea" });
  assert(hasTextId(premiumTexts, "feedback_premium_001"), "stable ID filter should match premium text");

  const unavailableAdapter = createFeedbackRuntimeAdapter({});
  assert(unavailableAdapter.isAvailable() === false, "invalid data should create unavailable adapter");
  assert(unavailableAdapter.getEnabledTexts().length === 0, "unavailable adapter should return no enabled texts");
  assert(unavailableAdapter.getMetadata().available === false, "unavailable metadata should mark available false");

  console.log("Feedback runtime adapter check passed");
  console.log(`Source: ${generatedPath}`);
  console.log(`Texts checked: ${Object.keys(data.textsById).length}`);
}

main();
