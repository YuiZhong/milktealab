#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..", "..");
const defaultCsv = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.11.csv";
const defaultJson = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.11.json";

const scriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js"
];

const fields = [
  "ingredientId",
  "displayName",
  "category",
  "hasTasteProfile",
  "hasTextureProfile",
  "hasFlavorProfile",
  "currentTasteValuesJson",
  "currentTextureEffectsJson",
  "currentFlavorValuesJson",
  "proposedTasteValuesJson",
  "proposedTextureEffectsJson",
  "proposedFlavorValuesJson",
  "proposalMode",
  "sourceNeeded",
  "suggestedSourceKeywords",
  "sourceNotes",
  "confidence",
  "reviewStatus",
  "producerComment",
  "aiComment",
  "canApplyToRuntime",
  "canAffectFinalScore",
  "canAffectGoldenExpected",
  "sourceStatus",
  "draftStatus"
];

const suggestedSourceKeywords = {
  tea_black: "black tea pH bitterness tannin caffeine flavor profile milk tea",
  tea_green: "green tea pH bitterness catechins freshness milk tea",
  tea_oolong: "oolong tea roast bitterness tannin aroma milk tea",
  tea_jasmine: "jasmine tea floral aroma bitterness tannin beverage profile",
  tea_puer: "puer tea earthy fermented bitterness tannin mouthfeel milk tea",
  dairy_milk: "whole milk fat content lactose sweetness mouthfeel dairy flavor",
  dairy_thick_milk: "evaporated milk milk solids fat content mouthfeel milk tea",
  dairy_cream: "heavy cream fat content viscosity mouthfeel dairy beverage",
  dairy_coconut_milk: "coconut milk fat content viscosity sweetness tropical flavor beverage",
  dairy_oat_milk: "oat milk viscosity sweetness cereal flavor mouthfeel beverage",
  dairy_non_dairy_creamer: "non dairy creamer fat powder sweetness mouthfeel milk tea",
  liquid_water: "water beverage dilution neutral pH mouthfeel",
  liquid_sparkling_water: "sparkling water carbonation acidity pH freshness beverage",
  liquid_coffee: "coffee bitterness acidity roast caffeine milk tea beverage",
  fruit_lemon: "lemon juice pH acidity sugar brix citrus flavor beverage",
  fruit_strawberry: "strawberry sugar brix acidity aroma fruit beverage",
  fruit_mango: "mango brix sweetness acidity pulp viscosity tropical beverage",
  fruit_durian: "durian sugar fat aroma sulfur compounds texture beverage",
  fruit_watermelon: "watermelon brix sweetness water content freshness beverage",
  fruit_grape: "grape brix acidity tannin aroma beverage",
  fruit_peach: "peach brix acidity aroma fruit beverage",
  fruit_lychee: "lychee brix acidity floral aroma beverage",
  flavor_matcha: "matcha bitterness astringency caffeine powder sediment beverage",
  flavor_cocoa: "cocoa powder bitterness fat sediment chocolate beverage",
  sweetener_white_sugar: "sucrose sweetness threshold brix beverage",
  sweetener_honey: "honey sugar composition sweetness viscosity acidity beverage",
  sweetener_brown_sugar: "brown sugar molasses sweetness brix caramel flavor beverage",
  sweetener_caramel: "caramel syrup sugar brix viscosity flavor beverage",
  seasoning_sea_salt: "sea salt salinity taste threshold beverage",
  topping_pearl: "tapioca pearl texture chewiness starch bubble tea",
  topping_coconut_jelly: "coconut jelly nata de coco texture chewiness beverage",
  topping_pudding: "pudding texture gel softness sweetness milk tea topping",
  topping_grass_jelly: "grass jelly texture herbal bitterness gel beverage",
  topping_taro_ball: "taro ball starch chewiness texture bubble tea topping",
  topping_oreo_crumble: "oreo crumbs sugar fat texture sediment beverage",
  topping_taro_paste: "taro paste starch viscosity texture sweetness beverage",
  topping_cheese_foam: "cheese foam milk tea fat cream salt texture"
};

function parseArgs(argv) {
  const args = { csv: defaultCsv, json: defaultJson };
  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--csv" && argv[index + 1]) {
      args.csv = argv[index + 1];
      index += 1;
    } else if (arg === "--json" && argv[index + 1]) {
      args.json = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

function createRuntime() {
  const context = {
    console,
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

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (!value || typeof value !== "object") return value;
  return Object.keys(value).sort().reduce((result, key) => {
    result[key] = sortValue(value[key]);
    return result;
  }, {});
}

function jsonCell(value) {
  return JSON.stringify(sortValue(value || {}));
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function writeCsv(outPath, rows) {
  const csv = [
    fields.join(","),
    ...rows.map(row => fields.map(field => csvEscape(row[field])).join(","))
  ].join("\n");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `\ufeff${csv}\n`, "utf8");
}

function writeJson(outPath, rows) {
  const payload = {
    metadata: {
      schemaVersion: "ingredientProfileValueDraft.v0.0.8.11",
      runtimeData: false,
      generatedData: false,
      draftWorkspaceOnly: true,
      sourceReferencedValuesProvided: false,
      canApplyToRuntime: false,
      canAffectFinalScore: false,
      canAffectGoldenExpected: false,
      rowCount: rows.length,
      notes: "All proposed value fields are intentionally empty. This workspace captures current profile snapshots and source research fields only; it is not runtime data, generated data, or source-of-truth."
    },
    rows
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function buildRows() {
  const runtime = createRuntime();
  const registry = runtime.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const tasteProfiles = runtime.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES.tasteProfiles || {};
  const textureProfiles = runtime.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES.ingredientTextureProfiles || {};
  const flavorProfiles = runtime.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES.flavorProfilesByIngredientId || {};
  const ingredients = registry.listIngredients();

  return ingredients.map(ingredient => {
    const tasteProfile = tasteProfiles[ingredient.name] || null;
    const textureProfile = textureProfiles[ingredient.name] || null;
    const flavorProfile = flavorProfiles[ingredient.id] || null;

    return {
      ingredientId: ingredient.id,
      displayName: ingredient.name,
      category: ingredient.category,
      hasTasteProfile: tasteProfile ? "TRUE" : "FALSE",
      hasTextureProfile: textureProfile ? "TRUE" : "FALSE",
      hasFlavorProfile: flavorProfile ? "TRUE" : "FALSE",
      currentTasteValuesJson: jsonCell(tasteProfile),
      currentTextureEffectsJson: jsonCell(textureProfile?.effects || {}),
      currentFlavorValuesJson: jsonCell(flavorProfile),
      proposedTasteValuesJson: "{}",
      proposedTextureEffectsJson: "{}",
      proposedFlavorValuesJson: "{}",
      proposalMode: "blank_no_source_referenced_values",
      sourceNeeded: "TRUE",
      suggestedSourceKeywords: suggestedSourceKeywords[ingredient.id] || `${ingredient.name} beverage profile pH brix texture flavor`,
      sourceNotes: "",
      confidence: "unverified",
      reviewStatus: "needs_source_research",
      producerComment: "",
      aiComment: "",
      canApplyToRuntime: "FALSE",
      canAffectFinalScore: "FALSE",
      canAffectGoldenExpected: "FALSE",
      sourceStatus: "needs_web_research",
      draftStatus: "draft_workspace_only"
    };
  });
}

function main() {
  const args = parseArgs(process.argv);
  const rows = buildRows();
  const csvPath = path.resolve(repoRoot, args.csv);
  const jsonPath = path.resolve(repoRoot, args.json);

  writeCsv(csvPath, rows);
  writeJson(jsonPath, rows);

  console.log(`Ingredient profile value draft CSV written: ${path.relative(repoRoot, csvPath)}`);
  console.log(`Ingredient profile value draft JSON written: ${path.relative(repoRoot, jsonPath)}`);
  console.log(`Rows: ${rows.length}`);
  console.log("Proposed values: blank_no_source_referenced_values");
  console.log("Runtime gates: canApplyToRuntime=false, canAffectFinalScore=false, canAffectGoldenExpected=false");
}

if (require.main === module) {
  main();
}
