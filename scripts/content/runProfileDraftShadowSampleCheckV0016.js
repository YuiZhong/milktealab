#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..", "..");
const draftPath = path.join(
  repoRoot,
  "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.json"
);

const prePatchScripts = [
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
  "data/generated/feedbackTexts.generated.js",
  "core/feedbackRuntimeAdapter.js",
  "core/feedbackEngine.js",
  "core/tasteContext.js",
  "core/drinkStructureAnalyzer.js",
];

const postPatchScripts = [
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
  "core/generatedSeveritySuggestionEngine.js",
  "core/tasteJudge.js",
];

const samples = [
  {
    name: "经典奶茶",
    recipe: [
      { ingredientId: "tea_black", ratio: 50 },
      { ingredientId: "dairy_milk", ratio: 40 },
      { ingredientId: "sweetener_white_sugar", ratio: 10 },
    ],
  },
  {
    name: "乌龙厚乳",
    recipe: [
      { ingredientId: "tea_oolong", ratio: 50 },
      { ingredientId: "dairy_thick_milk", ratio: 35 },
      { ingredientId: "sweetener_white_sugar", ratio: 15 },
    ],
  },
  {
    name: "咖啡牛奶",
    recipe: [
      { ingredientId: "liquid_coffee", ratio: 45 },
      { ingredientId: "dairy_milk", ratio: 45 },
      { ingredientId: "sweetener_white_sugar", ratio: 10 },
    ],
  },
  {
    name: "柠檬高酸压力",
    recipe: [
      { ingredientId: "fruit_lemon", ratio: 90 },
      { ingredientId: "liquid_water", ratio: 10 },
    ],
  },
  {
    name: "白糖高甜压力",
    recipe: [
      { ingredientId: "sweetener_white_sugar", ratio: 90 },
      { ingredientId: "liquid_water", ratio: 10 },
    ],
  },
  {
    name: "咖啡高苦压力",
    recipe: [
      { ingredientId: "liquid_coffee", ratio: 90 },
      { ingredientId: "liquid_water", ratio: 10 },
    ],
  },
  {
    name: "淡奶油高奶脂压力",
    recipe: [
      { ingredientId: "dairy_cream", ratio: 90 },
      { ingredientId: "liquid_water", ratio: 10 },
    ],
  },
  {
    name: "珍珠固体负载",
    recipe: [
      { ingredientId: "topping_pearl", ratio: 70 },
      { ingredientId: "dairy_milk", ratio: 30 },
    ],
  },
  {
    name: "芋泥低流动性",
    recipe: [
      { ingredientId: "topping_taro_paste", ratio: 70 },
      { ingredientId: "dairy_milk", ratio: 30 },
    ],
  },
  {
    name: "奥利奥沉淀粉泥",
    recipe: [
      { ingredientId: "topping_oreo_crumble", ratio: 60 },
      { ingredientId: "dairy_milk", ratio: 40 },
    ],
  },
  {
    name: "榴莲牛奶",
    recipe: [
      { ingredientId: "fruit_durian", ratio: 50 },
      { ingredientId: "dairy_milk", ratio: 40 },
      { ingredientId: "sweetener_white_sugar", ratio: 10 },
    ],
  },
  {
    name: "榴莲咖啡冲突",
    recipe: [
      { ingredientId: "fruit_durian", ratio: 45 },
      { ingredientId: "liquid_coffee", ratio: 45 },
      { ingredientId: "sweetener_white_sugar", ratio: 10 },
    ],
  },
  {
    name: "仙草奶茶",
    recipe: [
      { ingredientId: "tea_black", ratio: 45 },
      { ingredientId: "dairy_milk", ratio: 35 },
      { ingredientId: "topping_grass_jelly", ratio: 15 },
      { ingredientId: "sweetener_white_sugar", ratio: 5 },
    ],
  },
  {
    name: "抹茶牛奶",
    recipe: [
      { ingredientId: "flavor_matcha", ratio: 15 },
      { ingredientId: "dairy_milk", ratio: 70 },
      { ingredientId: "sweetener_white_sugar", ratio: 15 },
    ],
  },
  {
    name: "可可牛奶",
    recipe: [
      { ingredientId: "flavor_cocoa", ratio: 15 },
      { ingredientId: "dairy_milk", ratio: 70 },
      { ingredientId: "sweetener_white_sugar", ratio: 15 },
    ],
  },
];

function runScript(context, relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(fullPath, "utf8");
  vm.runInContext(source, context, { filename: relativePath });
}

function createContext() {
  const window = {};
  const context = {
    console,
    Math,
    JSON,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Date,
    RegExp,
    Set,
    Map,
    window,
  };
  window.window = window;
  window.globalThis = window;
  window.location = { search: "" };
  window.localStorage = {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {},
  };
  context.globalThis = window;
  return vm.createContext(context);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function normalizeJsonCell(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {};
}

function loadProfileDraft() {
  const raw = readJson(draftPath);
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const byId = new Map();
  const byDisplayName = new Map();

  rows.forEach((row) => {
    const proposedTasteProfile = normalizeJsonCell(row.proposedTasteValuesJson);
    const proposedTextureProfile = normalizeJsonCell(row.proposedTextureEffectsJson);
    const proposedFlavorProfile = normalizeJsonCell(row.proposedFlavorValuesJson);
    const normalized = {
      ingredientId: row.ingredientId,
      displayName: row.displayName,
      proposedTasteProfile,
      proposedTextureProfile,
      proposedFlavorProfile,
    };
    if (normalized.ingredientId) {
      byId.set(normalized.ingredientId, normalized);
    }
    if (normalized.displayName) {
      byDisplayName.set(normalized.displayName, normalized);
    }
  });

  return { raw, byId, byDisplayName };
}

function buildRuntime(profileDraft) {
  const context = createContext();
  prePatchScripts.forEach((script) => runScript(context, script));
  if (profileDraft) {
    applyProfileDraft(context.window, profileDraft);
  }
  postPatchScripts.forEach((script) => runScript(context, script));
  return context.window;
}

function findDraftRow(window, draft, ref) {
  const registry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const normalized = registry && typeof registry.normalizeIngredientRef === "function"
    ? registry.normalizeIngredientRef(ref)
    : null;
  const id = normalized && normalized.id ? normalized.id : null;
  const name = normalized && normalized.displayName ? normalized.displayName : ref;
  return (id && draft.byId.get(id)) || (name && draft.byDisplayName.get(name)) || null;
}

function applyProfileDraft(window, draft) {
  const tasteApi = window.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES;
  const textureApi = window.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES;
  const flavorApi = window.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES;

  if (tasteApi && typeof tasteApi.getTasteProfile === "function") {
    const originalGetTasteProfile = tasteApi.getTasteProfile.bind(tasteApi);
    tasteApi.getTasteProfile = function getDraftTasteProfile(ref) {
      const original = originalGetTasteProfile(ref) || {};
      const row = findDraftRow(window, draft, ref);
      if (!row || !Object.keys(row.proposedTasteProfile).length) {
        return original;
      }
      return {
        ...original,
        ...row.proposedTasteProfile,
        calculationProfile: original.calculationProfile || {},
      };
    };
  }

  if (textureApi && typeof textureApi.getTextureProfile === "function") {
    const originalGetTextureProfile = textureApi.getTextureProfile.bind(textureApi);
    textureApi.getTextureProfile = function getDraftTextureProfile(ref) {
      const original = originalGetTextureProfile(ref) || {};
      const row = findDraftRow(window, draft, ref);
      if (!row || !Object.keys(row.proposedTextureProfile).length) {
        return original;
      }
      return {
        ...original,
        effects: {
          ...(original.effects || {}),
          ...row.proposedTextureProfile,
        },
      };
    };
  }

  if (flavorApi && typeof flavorApi.getFlavorProfile === "function") {
    const originalGetFlavorProfile = flavorApi.getFlavorProfile.bind(flavorApi);
    flavorApi.getFlavorProfile = function getDraftFlavorProfile(ref) {
      const original = originalGetFlavorProfile(ref) || {};
      const row = findDraftRow(window, draft, ref);
      if (!row || !Object.keys(row.proposedFlavorProfile).length) {
        return original;
      }
      return {
        ...original,
        ...row.proposedFlavorProfile,
      };
    };
  }
}

function getIngredientName(window, ingredientId) {
  const registry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const normalized = registry.normalizeIngredientRef(ingredientId);
  return normalized && (normalized.displayName || normalized.name)
    ? normalized.displayName || normalized.name
    : ingredientId;
}

function getNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getScoreSuggestion(result) {
  return result && result.generatedSeveritySuggestion && result.generatedSeveritySuggestion.scoreSuggestion
    ? result.generatedSeveritySuggestion.scoreSuggestion
    : null;
}

function collectSignals(result) {
  const tasteValues = (result.tasteSummary && result.tasteSummary.values) || {};
  const textureValues = (result.textureSummary && result.textureSummary.values) || {};
  const flavorValues = (result.flavorSummary && result.flavorSummary.values) || {};
  const pairs = [
    ["sweet", tasteValues.sweetness],
    ["acid", tasteValues.acidity],
    ["bitter", tasteValues.bitterness],
    ["astringency", tasteValues.astringency],
    ["solidLoad", textureValues.solidLoad],
    ["drinkabilityPenalty", textureValues.drinkabilityPenalty],
    ["strawResistance", textureValues.strawResistance],
    ["fatLoad", textureValues.fatLoad],
    ["viscosity", textureValues.viscosity],
    ["sedimentRisk", textureValues.sedimentRisk],
    ["flavorIntensity", flavorValues.flavorIntensity],
    ["aromaPressure", flavorValues.aromaPressure],
    ["identityConflictRisk", flavorValues.identityConflictRisk],
  ]
    .map(([label, value]) => ({ label, value: getNumber(value) }))
    .filter((item) => item.value !== null && item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  return pairs.map((item) => `${item.label}:${Math.round(item.value)}`).join(", ") || "none";
}

function formatScore(value) {
  const numberValue = getNumber(value);
  return numberValue === null ? "n/a" : String(Math.round(numberValue));
}

function formatScoreDelta(scoreSuggestion) {
  if (!scoreSuggestion) {
    return "n/a";
  }
  const delta = getNumber(scoreSuggestion.scoreDeltaDraft);
  const suggested = getNumber(scoreSuggestion.suggestedScore);
  const parts = [];
  if (suggested !== null) {
    parts.push(`suggested:${Math.round(suggested)}`);
  }
  if (delta !== null) {
    parts.push(`delta:${Math.round(delta)}`);
  }
  return parts.length ? parts.join(" / ") : "n/a";
}

function recipeLabel(window, recipe) {
  return recipe
    .map((item) => `${getIngredientName(window, item.ingredientId)}${item.ratio}`)
    .join(" + ");
}

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function main() {
  const draft = loadProfileDraft();
  const currentWindow = buildRuntime(null);
  const draftWindow = buildRuntime(draft);

  const rows = samples.map((sample) => {
    const currentResult = currentWindow.MILK_TEA_LAB_TASTE_JUDGE.evaluateCup(sample.recipe);
    const draftResult = draftWindow.MILK_TEA_LAB_TASTE_JUDGE.evaluateCup(sample.recipe);
    const currentSuggestion = getScoreSuggestion(currentResult);
    const draftSuggestion = getScoreSuggestion(draftResult);

    return {
      sampleName: sample.name,
      recipe: recipeLabel(draftWindow, sample.recipe),
      legacyScore: formatScore(currentResult.legacyScore || currentResult.score),
      currentRuntimeSuggestion: formatScoreDelta(currentSuggestion),
      profileDraftShadow: formatScoreDelta(draftSuggestion),
      profileDraftTopSignals: collectSignals(draftResult),
      shadowObservationBoundary:
        "debug_only; v0.0.8.15 draft profile values are not runtime data",
    };
  });

  console.log("# v0.0.8.15 Profile Draft Shadow Sample Check");
  console.log("");
  console.log(`sourceDraft: ${path.relative(repoRoot, draftPath)}`);
  console.log(`draftRows: ${draft.raw.metadata && draft.raw.metadata.rowCount ? draft.raw.metadata.rowCount : draft.raw.rows.length}`);
  console.log("runtimeBoundary: read-only shadow observation; no runtime/data/generated/golden writes");
  console.log("");
  console.log("| sample | recipe | legacy score | current suggestion | v0.0.8.15 draft shadow | top draft signals | boundary |");
  console.log("|---|---|---:|---|---|---|---|");
  rows.forEach((row) => {
    console.log(
      `| ${escapeMarkdown(row.sampleName)} | ${escapeMarkdown(row.recipe)} | ${escapeMarkdown(row.legacyScore)} | ${escapeMarkdown(row.currentRuntimeSuggestion)} | ${escapeMarkdown(row.profileDraftShadow)} | ${escapeMarkdown(row.profileDraftTopSignals)} | ${escapeMarkdown(row.shadowObservationBoundary)} |`
    );
  });
}

main();
