#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const inputJson = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.14.json";
const defaultCsv = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.csv";
const defaultJson = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.json";

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

const scaleNotes = [
  "0 = 完全没有 / 几乎不贡献该属性",
  "1-20 = 轻微，只作为背景",
  "21-40 = 明显，但不主导",
  "41-60 = 强，会明显影响配方",
  "61-80 = 很强，是该属性代表性原料",
  "81-100 = 极强 / 极端 / 几乎一定主导",
  "制作人锚点标尺：如果一杯饮料是 90% 某味觉锚点 + 10% 水或茶，应稳定触发约 80 左右的未来重度事故阈值。",
  "因此主锚点原料本身通常应接近 90-100；少量误伤控制交给比例、threshold、severityLevel、scoreMultiplier、drinkType expectation、positive synergy、customer preference 和 score aggregation。",
  "每个基础味觉 / 质地属性只设一个主锚点；非锚点按锚点排序，不为了怕误伤而压低材料事实值。",
  "布尔值仍为 true / false；tags / aromaTags / pairHints 不是数值。",
  "legacy taste directional fields freshness / heaviness / viscosity 仍可能保留负数作为方向修正；本轮不把负数扩散到其他字段。",
  "saltiness 是 review-only schema gap draft field，不是 runtime profile 字段。"
];

const tastePatches = {
  tea_black: { aromaImpact: 45, bitterness: 50, freshness: 20, heaviness: 10, tea: 65 },
  tea_green: { acidity: 5, aromaImpact: 38, bitterness: 35, freshness: 65, tea: 60 },
  tea_oolong: { aromaImpact: 55, bitterness: 42, freshness: 32, heaviness: 18, tea: 62 },
  tea_jasmine: { aromaImpact: 65, bitterness: 24, freshness: 60, tea: 50 },
  tea_puer: { aromaImpact: 68, bitterness: 58, freshness: -6, heaviness: 42, isStrongAroma: true, tea: 70, viscosity: 10, weirdness: 18 },
  dairy_milk: { heaviness: 24, milkiness: 45, sweetness: 12, viscosity: 10 },
  dairy_thick_milk: { freshness: -18, heaviness: 58, isHighFat: true, milkiness: 70, sweetness: 18, viscosity: 28 },
  dairy_cream: { freshness: -24, heaviness: 70, isHighFat: true, milkiness: 64, sweetness: 16, viscosity: 36 },
  dairy_coconut_milk: { aromaImpact: 35, freshness: 18, heaviness: 32, milkiness: 50, sweetness: 18, viscosity: 18 },
  dairy_oat_milk: { aromaImpact: 20, heaviness: 28, milkiness: 38, sweetness: 14, viscosity: 18 },
  dairy_non_dairy_creamer: { freshness: -16, heaviness: 42, isHighFat: true, milkiness: 50, sweetness: 30, viscosity: 18, weirdness: 35 },
  liquid_water: { freshness: 40, heaviness: -20, viscosity: -15 },
  liquid_sparkling_water: { acidity: 10, freshness: 70, heaviness: -20, viscosity: -12, weirdness: 8 },
  liquid_coffee: { acidity: 22, aromaImpact: 78, bitterness: 90, heaviness: 28, isStrongAroma: true, weirdness: 18 },
  fruit_lemon: { acidity: 92, aromaImpact: 55, freshness: 72, heaviness: -12, sweetness: 5, viscosity: -6 },
  fruit_strawberry: { acidity: 35, aromaImpact: 50, freshness: 50, sweetness: 45, viscosity: 8 },
  fruit_mango: { acidity: 20, aromaImpact: 62, freshness: 35, heaviness: 32, sweetness: 60, viscosity: 32 },
  fruit_durian: { aromaImpact: 88, freshness: -28, heaviness: 62, isStrongAroma: true, strawResistance: 35, sweetness: 42, viscosity: 55, weirdness: 78 },
  fruit_watermelon: { aromaImpact: 28, freshness: 78, heaviness: -8, sweetness: 35, viscosity: -4 },
  fruit_grape: { acidity: 32, aromaImpact: 42, freshness: 48, sweetness: 48 },
  fruit_peach: { acidity: 18, aromaImpact: 52, freshness: 42, sweetness: 50 },
  fruit_lychee: { acidity: 12, aromaImpact: 68, freshness: 45, isStrongAroma: true, sweetness: 58, weirdness: 10 },
  flavor_matcha: { aromaImpact: 70, bitterness: 65, freshness: 25, heaviness: 25, isStrongAroma: true, tea: 58, viscosity: 18, weirdness: 18 },
  flavor_cocoa: { aromaImpact: 68, bitterness: 60, freshness: -12, heaviness: 36, isStrongAroma: true, viscosity: 22, weirdness: 12 },
  sweetener_white_sugar: { sweetness: 95 },
  sweetener_honey: { acidity: 8, aromaImpact: 45, heaviness: 16, sweetness: 78, viscosity: 35 },
  sweetener_brown_sugar: { aromaImpact: 60, bitterness: 10, freshness: -8, heaviness: 34, sweetness: 82, viscosity: 30 },
  sweetener_caramel: { aromaImpact: 65, bitterness: 12, freshness: -8, heaviness: 30, sweetness: 76, viscosity: 45 },
  seasoning_sea_salt: { aromaImpact: 5, saltiness: 85, schemaGap: "saltiness_not_in_runtime_profile_yet", sweetness: 0, weirdness: 10 },
  topping_pearl: { heaviness: 28, strawResistance: 65, sweetness: 18, viscosity: 12 },
  topping_coconut_jelly: { freshness: 38, heaviness: 14, strawResistance: 42, sweetness: 14, viscosity: 10 },
  topping_pudding: { heaviness: 28, milkiness: 22, strawResistance: 26, sweetness: 36, viscosity: 22 },
  topping_grass_jelly: { bitterness: 12, freshness: 18, heaviness: 18, strawResistance: 24, weirdness: 10 },
  topping_taro_ball: { heaviness: 32, strawResistance: 60, sweetness: 24, viscosity: 18 },
  topping_oreo_crumble: { aromaImpact: 58, bitterness: 18, freshness: -18, heaviness: 48, strawResistance: 48, sweetness: 50, viscosity: 36, weirdness: 16 },
  topping_taro_paste: { aromaImpact: 35, freshness: -24, heaviness: 68, strawResistance: 78, sweetness: 38, viscosity: 75, weirdness: 18 },
  topping_cheese_foam: { aromaImpact: 45, freshness: -20, heaviness: 58, isHighFat: true, milkiness: 55, strawResistance: 8, sweetness: 20, viscosity: 28 }
};

const texturePatches = {
  dairy_milk: { drinkabilityPenalty: 2, fatLoad: 18 },
  dairy_thick_milk: { drinkabilityPenalty: 14, fatLoad: 58 },
  dairy_cream: { drinkabilityPenalty: 18, fatLoad: 92 },
  dairy_coconut_milk: { drinkabilityPenalty: 8, fatLoad: 42 },
  dairy_oat_milk: { drinkabilityPenalty: 8, fatLoad: 24, sediment: 10 },
  dairy_non_dairy_creamer: { drinkabilityPenalty: 16, fatLoad: 55 },
  liquid_water: { drinkabilityPenalty: 0, fatLoad: 0 },
  liquid_sparkling_water: { drinkabilityPenalty: 0, fatLoad: 0 },
  liquid_coffee: { drinkabilityPenalty: 4 },
  fruit_lemon: { liquidSupportNeed: 4 },
  fruit_strawberry: { drinkabilityPenalty: 6, liquidSupportNeed: 15, solidLoad: 18, strawResistance: 8 },
  fruit_mango: { drinkabilityPenalty: 16, liquidSupportNeed: 32, pasteRisk: 24, solidLoad: 28, strawResistance: 18 },
  fruit_durian: { drinkabilityPenalty: 38, liquidSupportNeed: 55, pasteRisk: 58, solidLoad: 55, strawResistance: 42 },
  fruit_watermelon: { drinkabilityPenalty: 0, solidLoad: 4 },
  fruit_grape: { liquidSupportNeed: 12, solidLoad: 12, strawResistance: 6 },
  fruit_peach: { liquidSupportNeed: 12, solidLoad: 12, strawResistance: 6 },
  fruit_lychee: { liquidSupportNeed: 10, solidLoad: 10, strawResistance: 5 },
  flavor_matcha: { drinkabilityPenalty: 16, liquidSupportNeed: 28, pasteRisk: 25, sediment: 35 },
  flavor_cocoa: { drinkabilityPenalty: 18, liquidSupportNeed: 34, pasteRisk: 32, sediment: 42 },
  sweetener_honey: { drinkabilityPenalty: 4 },
  sweetener_brown_sugar: { drinkabilityPenalty: 5, sediment: 5 },
  sweetener_caramel: { drinkabilityPenalty: 8 },
  topping_pearl: { chewiness: 88, drinkabilityPenalty: 28, liquidSupportNeed: 35, solidLoad: 85, strawResistance: 68 },
  topping_coconut_jelly: { chewiness: 55, drinkabilityPenalty: 14, liquidSupportNeed: 22, solidLoad: 58, strawResistance: 42 },
  topping_pudding: { chewiness: 15, drinkabilityPenalty: 12, gelSoftness: 70, liquidSupportNeed: 20, solidLoad: 42, strawResistance: 26 },
  topping_grass_jelly: { chewiness: 12, drinkabilityPenalty: 10, gelSoftness: 64, liquidSupportNeed: 18, solidLoad: 40, strawResistance: 24 },
  topping_taro_ball: { chewiness: 82, drinkabilityPenalty: 30, liquidSupportNeed: 38, pasteRisk: 20, solidLoad: 78, strawResistance: 62 },
  topping_oreo_crumble: { drinkabilityPenalty: 35, liquidSupportNeed: 68, pasteRisk: 58, sediment: 75, solidLoad: 58, strawResistance: 48 },
  topping_taro_paste: { drinkabilityPenalty: 84, liquidSupportNeed: 88, pasteRisk: 93, sediment: 28, solidLoad: 70, strawResistance: 82 },
  topping_cheese_foam: { drinkabilityPenalty: 16, fatLoad: 76, foamLayer: 82, solidLoad: 10, strawResistance: 8 }
};

const flavorPatches = {
  tea_black: { aromaPressure: 48, identityStrength: 62, dominantPotential: 52 },
  tea_green: { aromaPressure: 42, identityStrength: 58, dominantPotential: 50 },
  tea_oolong: { aromaPressure: 58, identityStrength: 68, dominantPotential: 58 },
  tea_jasmine: { aromaPressure: 68, identityStrength: 72, dominantPotential: 62 },
  tea_puer: { aromaPressure: 70, identityStrength: 78, dominantPotential: 68 },
  dairy_cream: { aromaPressure: 55, identityStrength: 65, dominantPotential: 55 },
  dairy_coconut_milk: { aromaPressure: 60, identityStrength: 70, dominantPotential: 60 },
  dairy_non_dairy_creamer: { aromaPressure: 48, identityStrength: 58, noveltyRisk: 42 },
  liquid_coffee: { aromaPressure: 82, identityStrength: 88, dominantPotential: 82 },
  fruit_lemon: { aromaPressure: 68, identityStrength: 75, dominantPotential: 65 },
  fruit_strawberry: { aromaPressure: 58, identityStrength: 72, dominantPotential: 62 },
  fruit_mango: { aromaPressure: 68, identityStrength: 78, dominantPotential: 70 },
  fruit_durian: { aromaPressure: 94, identityStrength: 96, dominantPotential: 92 },
  fruit_lychee: { aromaPressure: 68, identityStrength: 74, dominantPotential: 66 },
  flavor_matcha: { aromaPressure: 76, identityStrength: 86, dominantPotential: 78 },
  flavor_cocoa: { aromaPressure: 74, identityStrength: 82, dominantPotential: 76 },
  sweetener_honey: { aromaPressure: 45, identityStrength: 55, dominantPotential: 38 },
  sweetener_brown_sugar: { aromaPressure: 62, identityStrength: 68, dominantPotential: 56 },
  sweetener_caramel: { aromaPressure: 68, identityStrength: 72, dominantPotential: 60 },
  seasoning_sea_salt: { aromaPressure: 12, identityStrength: 50, dominantPotential: 32, savoryRisk: 75 },
  topping_oreo_crumble: { aromaPressure: 65, identityStrength: 82, dominantPotential: 70 },
  topping_taro_paste: { aromaPressure: 50, identityStrength: 75, dominantPotential: 65 },
  topping_cheese_foam: { aromaPressure: 58, identityStrength: 72, dominantPotential: 55, savoryRisk: 30 }
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

function parseJsonCell(value) {
  if (!value || value === "{}") return {};
  return JSON.parse(value);
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

function mergePatch(base, patch) {
  return {
    ...(base || {}),
    ...(patch || {})
  };
}

function appendNote(text, note) {
  const base = String(text || "").trim();
  if (!base) return note;
  if (base.includes(note)) return base;
  return `${base} ${note}`;
}

function writeCsv(outPath, rows) {
  const csv = [
    fields.join(","),
    ...rows.map(row => fields.map(field => csvEscape(row[field])).join(","))
  ].join("\n");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `\ufeff${csv}\n`, "utf8");
}

function writeJson(outPath, rows, sourceReferences) {
  const payload = {
    metadata: {
      schemaVersion: "ingredientProfileValueDraft.v0.0.8.15",
      scaleRecalibration: true,
      anchorScaleCorrection: true,
      runtimeData: false,
      generatedData: false,
      draftWorkspaceOnly: true,
      sourceReferencedValuesProvided: true,
      sourceReferenceMode: "anchor_scale_corrected_from_v0_0_8_14_scale_recalibration_draft",
      canApplyToRuntime: false,
      canAffectFinalScore: false,
      canAffectGoldenExpected: false,
      basedOn: "ingredient_profile_value_draft.v0.0.8.14",
      rowCount: rows.length,
      sourceReferences: sourceReferences || [],
      scaleNotes,
      notes: "All rows are v0.0.8.15 anchor scale correction drafts for human review. Proposed values are not runtime data, generated data, official profile values, scoring rules, threshold values, or golden expected changes."
    },
    rows
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function buildRows() {
  const inputPath = path.join(repoRoot, inputJson);
  const payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  return {
    sourceReferences: payload.metadata?.sourceReferences || [],
    rows: payload.rows.map(row => {
      const proposedTaste = mergePatch(parseJsonCell(row.proposedTasteValuesJson), tastePatches[row.ingredientId]);
      const proposedTexture = mergePatch(parseJsonCell(row.proposedTextureEffectsJson), texturePatches[row.ingredientId]);
      const proposedFlavor = mergePatch(parseJsonCell(row.proposedFlavorValuesJson), flavorPatches[row.ingredientId]);
      const scaleNote = "v0.0.8.15 anchor scale correction: 主锚点按 90% 锚点 + 10% 水/茶应稳定触发约 80 重度阈值的制作人标尺上调；current* remains runtime snapshot.";
      const schemaGapNote = row.ingredientId === "seasoning_sea_salt"
        ? " Sea salt includes review-only saltiness draft field; saltiness_not_in_runtime_profile_yet."
        : "";

      return {
        ...row,
        proposedTasteValuesJson: jsonCell(proposedTaste),
        proposedTextureEffectsJson: jsonCell(proposedTexture),
        proposedFlavorValuesJson: jsonCell(proposedFlavor),
        proposalMode: "anchor_scale_corrected_v0_0_8_15_review_only",
        sourceNeeded: "TRUE",
        sourceNotes: appendNote(row.sourceNotes, `${scaleNote}${schemaGapNote}`),
        confidence: row.confidence || "medium",
        reviewStatus: row.reviewStatus || "needs_producer_review",
        producerComment: "",
        aiComment: appendNote(row.aiComment, `按制作人确认的锚点标尺再校正 proposed 值；少量误伤控制留给比例 / threshold / severity / scoring 层，仍需制作人 review，不接 runtime。${schemaGapNote}`),
        canApplyToRuntime: "FALSE",
        canAffectFinalScore: "FALSE",
        canAffectGoldenExpected: "FALSE",
        sourceStatus: row.sourceStatus || "source_referenced_first_pass",
        draftStatus: "draft_anchor_scale_correction_review_only_not_runtime"
      };
    })
  };
}

function validateRows(rows) {
  const ids = new Set();
  if (rows.length !== 37) throw new Error(`Expected 37 rows, got ${rows.length}`);

  rows.forEach(row => {
    if (!row.ingredientId) throw new Error("Missing ingredientId");
    if (ids.has(row.ingredientId)) throw new Error(`Duplicate ingredientId: ${row.ingredientId}`);
    ids.add(row.ingredientId);
    ["sourceNotes", "confidence", "reviewStatus", "aiComment"].forEach(field => {
      if (!String(row[field] || "").trim()) throw new Error(`Missing ${field} for ${row.ingredientId}`);
    });
    ["canApplyToRuntime", "canAffectFinalScore", "canAffectGoldenExpected"].forEach(field => {
      if (row[field] !== "FALSE") throw new Error(`${field} must be FALSE for ${row.ingredientId}`);
    });
    const proposedTaste = parseJsonCell(row.proposedTasteValuesJson);
    if (!Object.keys(proposedTaste).length) {
      throw new Error(`Missing proposedTasteValuesJson for ${row.ingredientId}`);
    }
  });
}

function main() {
  const args = parseArgs(process.argv);
  const { rows, sourceReferences } = buildRows();
  validateRows(rows);

  const csvPath = path.resolve(repoRoot, args.csv);
  const jsonPath = path.resolve(repoRoot, args.json);

  writeCsv(csvPath, rows);
  writeJson(jsonPath, rows, sourceReferences);

  console.log(`Ingredient profile value draft CSV written: ${path.relative(repoRoot, csvPath)}`);
  console.log(`Ingredient profile value draft JSON written: ${path.relative(repoRoot, jsonPath)}`);
  console.log(`Rows: ${rows.length}`);
  console.log("Anchor scale correction: true");
  console.log("Runtime gates: canApplyToRuntime=false, canAffectFinalScore=false, canAffectGoldenExpected=false");
}

if (require.main === module) {
  main();
}
