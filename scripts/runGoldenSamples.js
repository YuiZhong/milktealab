const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");

const scriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
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
  "core/proportionSegmentRuleEngine.js",
  "core/proportionAnalyzer.js",
  "core/ruleRefHelper.js",
  "core/accidentRuleEngine.js",
  "core/structureAccidentRuleEngine.js",
  "core/accidentAnalyzer.js",
  "core/combinationAnalyzer.js",
  "core/drinkTypeAnalyzer.js",
  "core/tasteJudge.js",
  "data/goldenSamples.js"
];

function createRuntime() {
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

function includesAny(text, candidates = []) {
  return candidates.some(candidate => text.includes(candidate));
}

function checkIncludes(label, text, candidates, failures) {
  if (!candidates?.length) return;
  candidates.forEach(candidate => {
    if (!text.includes(candidate)) {
      failures.push(`${label} should include "${candidate}"`);
    }
  });
}

function checkIncludesAny(label, text, candidates, failures) {
  if (!candidates?.length) return;
  if (!includesAny(text, candidates)) {
    failures.push(`${label} should include one of: ${candidates.join(", ")}`);
  }
}

function checkForbidden(label, text, candidates, failures) {
  if (!candidates?.length) return;
  candidates.forEach(candidate => {
    if (text.includes(candidate)) {
      failures.push(`${label} should not include "${candidate}"`);
    }
  });
}

function checkSample(sample, result) {
  const failures = [];
  const expectations = sample.expectations || {};
  const feedback = result?.feedback || "";
  const type = result?.type || "";
  const score = result?.score;

  if (!result) {
    failures.push("evaluateCup returned null");
    return failures;
  }

  checkIncludes("type", type, expectations.typeIncludes, failures);
  checkIncludesAny("type", type, expectations.typeIncludesAny, failures);
  checkForbidden("type", type, expectations.forbiddenTypeIncludes, failures);
  checkIncludesAny("feedback", feedback, expectations.feedbackIncludesAny, failures);
  checkForbidden("feedback", feedback, expectations.feedbackForbiddenAny, failures);

  if (typeof expectations.scoreMin === "number" && score < expectations.scoreMin) {
    failures.push(`score ${score} is below ${expectations.scoreMin}`);
  }
  if (typeof expectations.scoreMax === "number" && score > expectations.scoreMax) {
    failures.push(`score ${score} is above ${expectations.scoreMax}`);
  }

  return failures;
}

function main() {
  const runtime = createRuntime();
  const { evaluateCup } = runtime.MILK_TEA_LAB_TASTE_JUDGE;
  const { goldenSamples } = runtime.MILK_TEA_LAB_GOLDEN_SAMPLES;

  let passed = 0;
  const failed = [];

  goldenSamples.forEach(sample => {
    const result = evaluateCup(sample.cup);
    const failures = checkSample(sample, result);
    const status = failures.length ? "FAIL" : "PASS";
    const summary = result ? `${result.type} / ${result.score}分` : "no result";

    console.log(`[${status}] ${sample.id} ${sample.name} - ${summary}`);
    if (failures.length) {
      failures.forEach(failure => console.log(`  - ${failure}`));
      failed.push({ sample, failures });
    } else {
      passed += 1;
    }
  });

  console.log("");
  console.log(`Golden samples: ${passed}/${goldenSamples.length} passed`);

  if (failed.length) {
    process.exitCode = 1;
  }
}

main();
