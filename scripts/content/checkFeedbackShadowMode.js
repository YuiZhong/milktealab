#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "../..");

const baseScriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js",
  "data/combinationRules.js",
  "data/drinkTypeRules.js",
  "data/accidentRules.js",
  "data/structureAccidentRules.js",
  "data/proportionSegmentRules.js",
  "data/synergyRules.js",
  "data/feedbackTexts.js",
  "core/recipeEngine.js",
  "core/scoreEngine.js",
  "core/feedbackEngine.js",
  "core/tasteContext.js",
  "core/drinkStructureAnalyzer.js",
  "core/textureProfileAnalyzer.js",
  "core/ingredientAnalyzer.js",
  "core/ruleRefHelper.js",
  "core/ingredientGroupHelper.js",
  "core/proportionSegmentRuleEngine.js",
  "core/proportionAnalyzer.js",
  "core/accidentRuleEngine.js",
  "core/structureAccidentRuleEngine.js",
  "core/accidentAnalyzer.js",
  "core/combinationAnalyzer.js",
  "core/drinkTypeAnalyzer.js",
  "core/tasteSummaryEngine.js",
  "core/textureSummaryEngine.js",
  "core/flavorSummaryEngine.js",
  "core/summaryCandidateEngine.js",
  "core/candidatePriorityShellEngine.js",
  "core/tasteJudge.js"
];

const shadowScriptFiles = baseScriptFiles.flatMap(file => {
  if (file !== "core/feedbackEngine.js") return [file];
  return [
    "data/generated/feedbackTexts.generated.js",
    "core/feedbackRuntimeAdapter.js",
    file
  ];
});

const samples = [
  {
    id: "classic_shadow",
    cup: [
      { name: "红茶", ratio: 45 },
      { name: "牛奶", ratio: 40 },
      { name: "珍珠", ratio: 15 }
    ],
    expectedShadowTag: "classic"
  },
  {
    id: "acid_shadow",
    cup: [
      { name: "柠檬", ratio: 100 }
    ],
    expectedShadowTag: "acid_accident"
  }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createRuntime(scriptFiles) {
  const math = Object.create(Math);
  math.random = () => 0;

  const context = {
    console,
    Math: math,
    module: { exports: {} }
  };
  context.globalThis = context;
  context.window = context;

  vm.createContext(context);

  scriptFiles.forEach(file => {
    const fullPath = path.join(repoRoot, file);
    const code = fs.readFileSync(fullPath, "utf8");
    vm.runInContext(code, context, { filename: file });
  });

  return context;
}

function evaluate(context, cup) {
  return context.MILK_TEA_LAB_TASTE_JUDGE.evaluateCup(cup);
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function assertFinalResultUnchanged(sample, baseline, shadow) {
  assert(shadow.feedback === baseline.feedback, `${sample.id}: final feedback should stay legacy`);
  assert(shadow.score === baseline.score, `${sample.id}: score should not change`);
  assert(shadow.type === baseline.type, `${sample.id}: result.type should not change`);
  assert(shadow.accidentTypeId === baseline.accidentTypeId, `${sample.id}: accidentTypeId should not change`);
  assert(shadow.drinkTypeId === baseline.drinkTypeId, `${sample.id}: drinkTypeId should not change`);
  assert(shadow.outcomeTypeId === baseline.outcomeTypeId, `${sample.id}: outcomeTypeId should not change`);
  assert(sameJson(shadow.feedbackTags, baseline.feedbackTags), `${sample.id}: feedbackTags should not change`);
}

function assertShadow(sample, result) {
  const shadow = result.generatedFeedbackShadow;

  assert(shadow, `${sample.id}: generatedFeedbackShadow should exist`);
  assert(shadow.enabled === true, `${sample.id}: shadow should be enabled`);
  assert(shadow.mode === "shadow", `${sample.id}: shadow mode should be shadow`);
  assert(shadow.affectsFinalFeedback === false, `${sample.id}: shadow should not affect final feedback`);
  assert(shadow.affectsFinalResult === false, `${sample.id}: shadow should not affect final result`);
  assert(shadow.source === "generatedFeedbackTexts", `${sample.id}: shadow source should be generatedFeedbackTexts`);
  assert(shadow.metadata?.readonly === true, `${sample.id}: shadow metadata should be readonly`);
  assert(shadow.metadata?.generatedDataAvailable === true, `${sample.id}: generated data should be available`);
  assert(shadow.metadata?.adapterAvailable === true, `${sample.id}: adapter should be available`);
  assert(Array.isArray(shadow.candidates), `${sample.id}: shadow candidates should be an array`);
  assert(shadow.candidates.length > 0, `${sample.id}: shadow candidates should include generated records`);
  assert(
    shadow.candidates.some(candidate => candidate.feedbackTag === sample.expectedShadowTag),
    `${sample.id}: shadow candidates should include ${sample.expectedShadowTag}`
  );
  assert(
    !shadow.candidates.some(candidate => candidate.zhCN && result.feedback.includes(candidate.zhCN)),
    `${sample.id}: generated zhCN should not be used as final feedback`
  );
}

function main() {
  try {
    const baselineRuntime = createRuntime(baseScriptFiles);
    const shadowRuntime = createRuntime(shadowScriptFiles);

    samples.forEach(sample => {
      const baseline = evaluate(baselineRuntime, sample.cup);
      const shadow = evaluate(shadowRuntime, sample.cup);

      assertFinalResultUnchanged(sample, baseline, shadow);
      assertShadow(sample, shadow);
    });

    console.log("Feedback shadow mode check passed");
    console.log(`Samples checked: ${samples.length}`);
    console.log("Final feedback unchanged: true");
    console.log("Generated shadow affects final feedback: false");
  } catch (error) {
    console.error(`Feedback shadow mode check failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
