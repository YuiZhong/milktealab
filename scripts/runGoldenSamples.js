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
  "core/ruleRefHelper.js",
  "core/ingredientGroupHelper.js",
  "core/proportionSegmentRuleEngine.js",
  "core/proportionAnalyzer.js",
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

function getAccidentTypeIds(result) {
  const accidentTypeIds = [
    ...(Array.isArray(result?.accidentTypeIds) ? result.accidentTypeIds : []),
    ...(result?.accidentTypeId ? [result.accidentTypeId] : [])
  ];
  return [...new Set(accidentTypeIds.filter(Boolean))];
}

function getDrinkTypeIds(result) {
  const drinkTypeIds = [
    ...(Array.isArray(result?.drinkTypeIds) ? result.drinkTypeIds : []),
    ...(result?.drinkTypeId ? [result.drinkTypeId] : [])
  ];
  return [...new Set(drinkTypeIds.filter(Boolean))];
}

function getAudienceIds(result) {
  const audienceIds = [
    ...(Array.isArray(result?.audienceIds) ? result.audienceIds : []),
    ...(result?.audienceId ? [result.audienceId] : [])
  ];
  return [...new Set(audienceIds.filter(Boolean))];
}

function formatIds(ids) {
  return `[${ids.join(", ")}]`;
}

function checkIdIncludes(label, actualIds, expectedIds, failures) {
  if (!expectedIds?.length) return;
  const missingIds = expectedIds.filter(id => !actualIds.includes(id));
  if (missingIds.length) {
    failures.push(`expected ${label} ${formatIds(expectedIds)} but got ${formatIds(actualIds)}`);
  }
}

function checkIdIncludesAny(label, actualIds, expectedIds, failures) {
  if (!expectedIds?.length) return;
  if (!expectedIds.some(id => actualIds.includes(id))) {
    failures.push(`expected ${label} to include one of ${formatIds(expectedIds)} but got ${formatIds(actualIds)}`);
  }
}

function checkForbiddenIds(label, actualIds, forbiddenIds, failures) {
  if (!forbiddenIds?.length) return;
  const matchedIds = forbiddenIds.filter(id => actualIds.includes(id));
  if (matchedIds.length) {
    failures.push(`expected ${label} not to include ${formatIds(forbiddenIds)} but got ${formatIds(actualIds)}`);
  }
}

function normalizeSampleItem(item, ingredientRegistry, sampleId) {
  if (item?.name) return { ...item };

  const ref = item?.ingredientRef || item?.ingredientId || item?.id;
  const meta = ingredientRegistry.normalizeIngredientRef(ref);

  if (!meta) {
    throw new Error(`sample ${sampleId} has unknown ingredient ref: ${JSON.stringify(item)}`);
  }

  return {
    ...item,
    name: meta.name,
    ingredientId: meta.id
  };
}

function normalizeSampleCup(sample, ingredientRegistry) {
  if (!Array.isArray(sample.cup)) {
    throw new Error(`sample ${sample.id} cup should be an array`);
  }

  return sample.cup.map(item => normalizeSampleItem(item, ingredientRegistry, sample.id));
}

function checkSample(sample, result) {
  const failures = [];
  const expectations = sample.expectations || {};
  const feedback = result?.feedback || "";
  const type = result?.type || "";
  const score = result?.score;
  const accidentTypeIds = getAccidentTypeIds(result);
  const drinkTypeIds = getDrinkTypeIds(result);
  const audienceIds = getAudienceIds(result);

  if (!result) {
    failures.push("evaluateCup returned null");
    return failures;
  }

  checkIncludes("type", type, expectations.typeIncludes, failures);
  checkIncludesAny("type", type, expectations.typeIncludesAny, failures);
  checkForbidden("type", type, expectations.forbiddenTypeIncludes, failures);
  checkIdIncludes("accidentTypeIdIncludes", accidentTypeIds, expectations.accidentTypeIdIncludes, failures);
  checkIdIncludesAny("accidentTypeIdIncludesAny", accidentTypeIds, expectations.accidentTypeIdIncludesAny, failures);
  checkForbiddenIds("forbiddenAccidentTypeIdIncludes", accidentTypeIds, expectations.forbiddenAccidentTypeIdIncludes, failures);
  checkIdIncludes("drinkTypeIdIncludes", drinkTypeIds, expectations.drinkTypeIdIncludes, failures);
  checkIdIncludesAny("drinkTypeIdIncludesAny", drinkTypeIds, expectations.drinkTypeIdIncludesAny, failures);
  checkForbiddenIds("forbiddenDrinkTypeIdIncludes", drinkTypeIds, expectations.forbiddenDrinkTypeIdIncludes, failures);
  checkIdIncludes("audienceIdIncludes", audienceIds, expectations.audienceIdIncludes, failures);
  checkIdIncludesAny("audienceIdIncludesAny", audienceIds, expectations.audienceIdIncludesAny, failures);
  checkForbiddenIds("forbiddenAudienceIdIncludes", audienceIds, expectations.forbiddenAudienceIdIncludes, failures);
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
  const ingredientRegistry = runtime.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const { goldenSamples } = runtime.MILK_TEA_LAB_GOLDEN_SAMPLES;

  let passed = 0;
  const failed = [];

  goldenSamples.forEach(sample => {
    let result = null;
    let failures = [];

    try {
      const cup = normalizeSampleCup(sample, ingredientRegistry);
      result = evaluateCup(cup);
      failures = checkSample(sample, result);
    } catch (error) {
      failures = [error.message];
    }

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
