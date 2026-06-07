#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..", "..");
const draftPath = path.join(
  repoRoot,
  "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.json"
);

const profileSource = "v0.0.8.15_proposed_profile_draft";

const prePatchScripts = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js",
  "data/ingredientCompositionTags.js",
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
  "core/unifiedScoringEngine.js",
  "core/drinkTypeComposer.js",
  "core/unifiedFeedbackComposer.js",
  "core/unifiedJudgmentEngine.js",
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
    name: "黑糖珍珠奶茶",
    recipe: [
      { ingredientId: "tea_black", ratio: 40 },
      { ingredientId: "dairy_milk", ratio: 35 },
      { ingredientId: "sweetener_brown_sugar", ratio: 15 },
      { ingredientId: "topping_pearl", ratio: 10 },
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
    name: "芒果奶茶",
    recipe: [
      { ingredientId: "tea_black", ratio: 35 },
      { ingredientId: "dairy_milk", ratio: 35 },
      { ingredientId: "fruit_mango", ratio: 20 },
      { ingredientId: "sweetener_white_sugar", ratio: 10 },
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
    name: "芒果咖啡牛奶",
    recipe: [
      { ingredientId: "liquid_coffee", ratio: 35 },
      { ingredientId: "dairy_milk", ratio: 35 },
      { ingredientId: "fruit_mango", ratio: 20 },
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

function parseProposedProfileCell(row, fieldName) {
  const warnings = [];
  const value = row[fieldName];

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { profile: value, warnings };
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:empty_string`);
      return { profile: {}, warnings };
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:parsed_non_object`);
        return { profile: {}, warnings };
      }
      if (!Object.keys(parsed).length) {
        warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:empty_object`);
      }
      return { profile: parsed, warnings };
    } catch (error) {
      warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:parse_failed:${error.message}`);
      return { profile: {}, warnings };
    }
  }

  if (value === undefined || value === null) {
    warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:missing`);
    return { profile: {}, warnings };
  }

  warnings.push(`${row.ingredientId || row.displayName || "unknown"}:${fieldName}:unsupported_type_${typeof value}`);
  return { profile: {}, warnings };
}

function loadProfileDraft() {
  const raw = readJson(draftPath);
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const byId = new Map();
  const byDisplayName = new Map();
  const warnings = [];

  rows.forEach((row) => {
    const proposedTaste = parseProposedProfileCell(row, "proposedTasteValuesJson");
    const proposedTexture = parseProposedProfileCell(row, "proposedTextureEffectsJson");
    const proposedFlavor = parseProposedProfileCell(row, "proposedFlavorValuesJson");
    warnings.push(...proposedTaste.warnings, ...proposedTexture.warnings, ...proposedFlavor.warnings);

    const normalized = {
      ingredientId: row.ingredientId,
      displayName: row.displayName,
      proposedTasteProfile: proposedTaste.profile,
      proposedTextureProfile: proposedTexture.profile,
      proposedFlavorProfile: proposedFlavor.profile,
    };
    if (normalized.ingredientId) {
      byId.set(normalized.ingredientId, normalized);
    }
    if (normalized.displayName) {
      byDisplayName.set(normalized.displayName, normalized);
    }
  });

  return { raw, byId, byDisplayName, warnings };
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

function getUnifiedScoring(result) {
  return result && result.unifiedScoring
    ? result.unifiedScoring
    : null;
}

function getUnifiedJudgment(result) {
  return result && result.unifiedJudgment
    ? result.unifiedJudgment
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
  const delta = getNumber(scoreSuggestion.scoreDelta ?? scoreSuggestion.scoreDeltaDraft);
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

function formatUnifiedScoring(unifiedScoring) {
  if (!unifiedScoring) {
    return "n/a";
  }
  const score = getNumber(unifiedScoring.score);
  const delta = getNumber(unifiedScoring.scoreDeltaFromLegacy);
  const dominantPressure = unifiedScoring.dominantPressure || "none";
  const parts = [];
  if (score !== null) {
    parts.push(`unified:${Math.round(score)}`);
  }
  if (delta !== null) {
    parts.push(`delta:${Math.round(delta)}`);
  }
  parts.push(`dominant:${dominantPressure}`);
  return parts.join(" / ");
}

function formatUnifiedJudgment(unifiedJudgment) {
  if (!unifiedJudgment) {
    return "n/a";
  }
  const composed = unifiedJudgment.composedDrinkType || null;
  const unifiedFeedback = unifiedJudgment.unifiedFeedback || null;
  return [
    `type:${unifiedJudgment.type || "n/a"}`,
    `accident:${unifiedJudgment.accidentTypeId || "none"}`,
    `drink:${unifiedJudgment.drinkTypeId || "none"}`,
    `outcome:${unifiedJudgment.outcomeTypeId || "none"}`,
    `composed:${composed?.composedTypeLabel || "none"}`,
    `broad:${composed?.drinkTypeId || "none"}`,
    `feedbackTone:${unifiedFeedback?.tone || "none"}`,
    `feedbackSource:${unifiedFeedback?.sourcePressure?.pressureKey || unifiedJudgment.dominantPressure || "none"}`,
    `tags:${Array.isArray(unifiedJudgment.feedbackTags) ? unifiedJudgment.feedbackTags.join("+") || "none" : "none"}`
  ].join(" / ");
}

function formatScoreReasons(unifiedScoring) {
  const reasons = Array.isArray(unifiedScoring?.scoreReasons) ? unifiedScoring.scoreReasons : [];
  return reasons.slice(0, 3).join("; ") || "none";
}

function getValue(result, summaryKey, metric) {
  const value = result && result[summaryKey] && result[summaryKey].values
    ? result[summaryKey].values[metric]
    : null;
  return getNumber(value) ?? 0;
}

function buildInitialReviewLabel(result) {
  const score = getNumber(result && (result.unifiedScoring?.score ?? result.legacyScore ?? result.score));
  const sweetness = getValue(result, "tasteSummary", "sweetness");
  const bitterness = getValue(result, "tasteSummary", "bitterness");
  const milkiness = getValue(result, "tasteSummary", "milkiness");
  const fatLoad = getValue(result, "textureSummary", "fatLoad");
  const solidLoad = getValue(result, "textureSummary", "solidLoad");
  const strawResistance = getValue(result, "textureSummary", "strawResistance");
  const drinkabilityPenalty = getValue(result, "textureSummary", "drinkabilityPenalty");
  const beverageFit = getValue(result, "flavorSummary", "beverageFit");
  const dessertFit = getValue(result, "flavorSummary", "dessertFit");
  const identityConflictRisk = getValue(result, "flavorSummary", "identityConflictRisk");

  if (sweetness >= 80 && score !== null && score >= 30) {
    return "needs_review: high sweetness pressure may be too lenient";
  }
  if ((solidLoad >= 80 || strawResistance >= 65 || drinkabilityPenalty >= 50) && score !== null && score <= 10) {
    return "intuitive: extreme texture pressure is visible";
  }
  if (fatLoad >= 70 && score !== null && score <= 10) {
    return "intuitive: extreme fat load pressure is visible";
  }
  if (identityConflictRisk >= 35 && score !== null && score <= 10) {
    return "needs_review: strong identity support / conflict balance";
  }
  if (milkiness >= 20 && (beverageFit >= 80 || dessertFit >= 75) && score !== null && score <= 70) {
    return "needs_review: dairy support / drink expectation may be underweighted";
  }
  if (bitterness >= 35 && milkiness >= 15 && score !== null && score <= 70) {
    return "needs_review: bitter pressure balance may be underweighted";
  }
  return "observe";
}

function buildRowNote(draft) {
  if (!draft.warnings.length) {
    return "parsed proposed profile draft; no parse warnings";
  }
  return `parse warnings: ${draft.warnings.length}`;
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
    const currentUnifiedScoring = getUnifiedScoring(currentResult);
    const draftUnifiedScoring = getUnifiedScoring(draftResult);
    const currentUnifiedJudgment = getUnifiedJudgment(currentResult);
    const draftUnifiedJudgment = getUnifiedJudgment(draftResult);

    return {
      sampleName: sample.name,
      recipe: recipeLabel(draftWindow, sample.recipe),
      legacyScore: formatScore(currentResult.legacyScore || currentResult.score),
      currentRuntimeSuggestion: formatScoreDelta(currentSuggestion),
      currentRuntimeUnifiedScore: formatUnifiedScoring(currentUnifiedScoring),
      currentRuntimeUnifiedJudgment: formatUnifiedJudgment(currentUnifiedJudgment),
      profileDraftShadow: formatScoreDelta(draftSuggestion),
      profileDraftUnifiedScore: formatUnifiedScoring(draftUnifiedScoring),
      profileDraftUnifiedJudgment: formatUnifiedJudgment(draftUnifiedJudgment),
      profileDraftScoreReasons: formatScoreReasons(draftUnifiedScoring),
      profileDraftTopSignals: collectSignals(draftResult),
      initialReviewLabel: buildInitialReviewLabel(draftResult),
      warningOrNote: buildRowNote(draft),
      shadowObservationBoundary:
        "debug_only; v0.0.8.15 draft profile values are not runtime data",
    };
  });

  console.log("# v0.0.8.15 Profile Draft Shadow Sample Check");
  console.log("");
  console.log(`sourceDraft: ${path.relative(repoRoot, draftPath)}`);
  console.log(`profileSource: ${profileSource}`);
  console.log("runtimeData: false");
  console.log("affectsFinalScore: false");
  console.log("affectsGoldenExpected: false");
  console.log("debugOnly: true");
  console.log(`draftRows: ${draft.raw.metadata && draft.raw.metadata.rowCount ? draft.raw.metadata.rowCount : draft.raw.rows.length}`);
  console.log(`parseWarnings: ${draft.warnings.length ? draft.warnings.join("; ") : "none"}`);
  console.log("runtimeBoundary: read-only shadow observation; no runtime/data/generated/golden writes");
  console.log("");
  console.log("| sample | recipe | legacy score | current runtime draft suggestion | current runtime unified score | current runtime unified judgment | v0.0.8.15 proposed profile draft suggestion | v0.0.8.15 proposed profile unified score | v0.0.8.15 proposed profile unified judgment | score reasons | key observed pressures | warning / note | initial review label | boundary |");
  console.log("|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|");
  rows.forEach((row) => {
    console.log(
      `| ${escapeMarkdown(row.sampleName)} | ${escapeMarkdown(row.recipe)} | ${escapeMarkdown(row.legacyScore)} | ${escapeMarkdown(row.currentRuntimeSuggestion)} | ${escapeMarkdown(row.currentRuntimeUnifiedScore)} | ${escapeMarkdown(row.currentRuntimeUnifiedJudgment)} | ${escapeMarkdown(row.profileDraftShadow)} | ${escapeMarkdown(row.profileDraftUnifiedScore)} | ${escapeMarkdown(row.profileDraftUnifiedJudgment)} | ${escapeMarkdown(row.profileDraftScoreReasons)} | ${escapeMarkdown(row.profileDraftTopSignals)} | ${escapeMarkdown(row.warningOrNote)} | ${escapeMarkdown(row.initialReviewLabel)} | ${escapeMarkdown(row.shadowObservationBoundary)} |`
    );
  });
}

main();
