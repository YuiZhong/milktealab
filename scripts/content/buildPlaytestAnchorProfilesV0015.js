#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const sourcePath = path.join(
  repoRoot,
  "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.json"
);
const outputPath = path.join(repoRoot, "data/playtestAnchorProfiles.v0.0.8.15.js");

const requiredAnchors = [
  ["fruit_lemon", "tasteProfile", "acidity", 92],
  ["sweetener_white_sugar", "tasteProfile", "sweetness", 95],
  ["liquid_coffee", "tasteProfile", "bitterness", 90],
  ["dairy_cream", "textureProfile", "fatLoad", 92],
  ["topping_taro_paste", "textureProfile", "pasteRisk", 93],
  ["topping_pearl", "textureProfile", "chewiness", 88],
  ["topping_pearl", "textureProfile", "solidLoad", 85],
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseProfileCell(row, fieldName) {
  const value = row[fieldName];
  const label = `${row.ingredientId || row.displayName || "unknown"}:${fieldName}`;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label}: missing proposed profile JSON`);
  }

  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label}: proposed profile must be an object`);
  }
  return parsed;
}

function buildProfiles(raw) {
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  if (rows.length !== 37) {
    throw new Error(`expected 37 rows, got ${rows.length}`);
  }

  const seenIds = new Set();
  const profilesByIngredientId = {};

  rows.forEach(row => {
    if (!row.ingredientId) {
      throw new Error(`row missing ingredientId: ${row.displayName || "(unknown)"}`);
    }
    if (seenIds.has(row.ingredientId)) {
      throw new Error(`duplicate ingredientId: ${row.ingredientId}`);
    }
    seenIds.add(row.ingredientId);

    profilesByIngredientId[row.ingredientId] = {
      displayName: row.displayName || "",
      tasteProfile: parseProfileCell(row, "proposedTasteValuesJson"),
      textureProfile: parseProfileCell(row, "proposedTextureEffectsJson"),
      flavorProfile: parseProfileCell(row, "proposedFlavorValuesJson"),
    };
  });

  return profilesByIngredientId;
}

function verifyAnchors(profilesByIngredientId) {
  requiredAnchors.forEach(([ingredientId, profileKey, metric, expected]) => {
    const actual = profilesByIngredientId[ingredientId]?.[profileKey]?.[metric];
    if (actual !== expected) {
      throw new Error(`${ingredientId}.${profileKey}.${metric} expected ${expected}, got ${actual}`);
    }
  });
}

function writeOutput(profilesByIngredientId) {
  const payload = {
    metadata: {
      schemaVersion: "playtestAnchorProfiles.v0.0.8.30",
      profileSource: "ingredient_profile_value_draft.v0.0.8.15",
      playtestOnly: true,
      runtimeDefaultForUnifiedJudgment: true,
      affectsLegacy: false,
      affectsGoldenExpected: false,
      rowCount: Object.keys(profilesByIngredientId).length,
      sourcePath: "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.15.json",
    },
    profilesByIngredientId,
  };

  const source = `(function(root) {
root.MILK_TEA_LAB_PLAYTEST_ANCHOR_PROFILES_V0015 = ${JSON.stringify(payload, null, 2)};

if (typeof module !== "undefined") {
  module.exports = root.MILK_TEA_LAB_PLAYTEST_ANCHOR_PROFILES_V0015;
}
})(typeof window !== "undefined" ? window : globalThis);
`;

  fs.writeFileSync(outputPath, source, "utf8");
}

function main() {
  const raw = readJson(sourcePath);
  const profilesByIngredientId = buildProfiles(raw);
  verifyAnchors(profilesByIngredientId);
  writeOutput(profilesByIngredientId);
  console.log("playtest anchor profiles built");
  console.log(`source: ${path.relative(repoRoot, sourcePath)}`);
  console.log(`output: ${path.relative(repoRoot, outputPath)}`);
  console.log(`rows: ${Object.keys(profilesByIngredientId).length}/37`);
  requiredAnchors.forEach(([ingredientId, profileKey, metric, expected]) => {
    console.log(`anchor: ${ingredientId}.${profileKey}.${metric}=${expected}`);
  });
}

main();
