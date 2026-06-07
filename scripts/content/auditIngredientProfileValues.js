const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..", "..");
const defaultOut = "reports/debug/ingredientProfileValueReadiness.sample.md";

const scriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js",
  "data/calibrationPresets.js"
];

const tasteSummaryValueKeys = [
  "sweetness",
  "acidity",
  "bitterness",
  "astringency",
  "teaStrength",
  "milkiness",
  "creaminess",
  "coffeeRoast",
  "freshness",
  "cloyingRisk",
  "acidSharpness",
  "tasteBalance"
];

const tasteSummarySourceKeys = [
  "sweetness",
  "acidity",
  "bitterness",
  "astringency",
  "tea",
  "milkiness",
  "creaminess",
  "coffeeRoast",
  "freshness",
  "cloyingRisk",
  "acidSharpness",
  "tasteBalance"
];

const textureSummaryValueKeys = [
  "solidLoad",
  "strawResistance",
  "drinkability",
  "textureBalance",
  "chewiness",
  "gelLoad",
  "viscosity",
  "sedimentRisk",
  "liquidSupportNeed",
  "fatLoad",
  "foamLoad",
  "drinkabilityPenalty"
];

const textureSummarySourceKeys = [
  "solidLoad",
  "strawResistance",
  "chewiness",
  "gelSoftness",
  "pasteRisk",
  "sediment",
  "liquidSupportNeed",
  "fatLoad",
  "foamLayer",
  "drinkabilityPenalty"
];

const flavorSummaryValueKeys = [
  "flavorIntensity",
  "aromaPressure",
  "beverageFit",
  "dessertFit",
  "savoryRisk",
  "noveltyRisk",
  "identityConflictRisk",
  "dominantPotential"
];

const flavorSummarySourceKeys = [
  "beverageFit",
  "dessertFit",
  "savoryRisk",
  "noveltyRisk",
  "identityStrength",
  "aromaPressure",
  "dominantPotential"
];

const draftScoreDeltaDependencies = [
  {
    metric: "solidLoad",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    profilePath: "ingredientTextureProfiles[*].effects.solidLoad -> textureSummary.values.solidLoad",
    needs: "正式 threshold / severityLevel / scoreMultiplier / drinkType expectation / positive synergy / customer preference review"
  },
  {
    metric: "fatLoad",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    profilePath: "ingredientTextureProfiles[*].effects.fatLoad -> textureSummary.values.fatLoad",
    needs: "奶脂负担资料参考、口感边界、正式 threshold / severityLevel / scoreMultiplier review"
  },
  {
    metric: "drinkabilityPenalty",
    sourceSummary: "textureSummary",
    sourceLayer: "texture",
    profilePath: "ingredientTextureProfiles[*].effects.drinkabilityPenalty -> textureSummary.values.drinkabilityPenalty",
    needs: "低流动性资料参考、drinkability / strawResistance 边界、正式 threshold / scoreMultiplier review"
  },
  {
    metric: "acidity",
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    profilePath: "tasteProfiles[*].acidity -> tasteSummary.values.acidity",
    needs: "pH / 酸味强度资料参考、饮品类型预期、正式 threshold / scoreMultiplier review"
  },
  {
    metric: "bitterness",
    sourceSummary: "tasteSummary",
    sourceLayer: "taste",
    profilePath: "tasteProfiles[*].bitterness -> tasteSummary.values.bitterness",
    needs: "苦味 / 茶感 / 咖啡资料参考、客群 tolerance、正式 threshold / scoreMultiplier review"
  }
];

function parseArgs(argv) {
  const args = { out: defaultOut };
  for (let index = 2; index < argv.length; index += 1) {
    if (argv[index] === "--out" && argv[index + 1]) {
      args.out = argv[index + 1];
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

function valueKeysFromObject(source, ignoredKeys = []) {
  const ignored = new Set(ignoredKeys);
  return Object.entries(source || {})
    .filter(([key, value]) => !ignored.has(key) && typeof value === "number" && Number.isFinite(value))
    .map(([key]) => key)
    .sort();
}

function countKeys(rows, getKeys) {
  const counts = new Map();
  rows.forEach(row => {
    getKeys(row).forEach(key => counts.set(key, (counts.get(key) || 0) + 1));
  });
  return [...counts.entries()].sort((left, right) => left[0].localeCompare(right[0]));
}

function yesNo(value) {
  return value ? "yes" : "no";
}

function joinKeys(keys) {
  return keys.length ? keys.join(", ") : "-";
}

function tableCell(value) {
  return String(value ?? "-").replaceAll("|", "\\|").replaceAll("\n", "<br>");
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map(row => `| ${row.map(tableCell).join(" | ")} |`)
  ].join("\n");
}

function makeBulletList(items) {
  if (!items.length) return "- 无。";
  return items.map(item => `- ${item}`).join("\n");
}

function buildAudit() {
  const runtime = createRuntime();
  const registry = runtime.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const tasteProfiles = runtime.MILK_TEA_LAB_INGREDIENT_TASTE_PROFILES.tasteProfiles || {};
  const textureProfiles = runtime.MILK_TEA_LAB_INGREDIENT_TEXTURE_PROFILES.ingredientTextureProfiles || {};
  const flavorProfiles = runtime.MILK_TEA_LAB_INGREDIENT_FLAVOR_PROFILES.flavorProfilesByIngredientId || {};
  const calibrationPresets = runtime.MILK_TEA_LAB_CALIBRATION_PRESETS?.calibrationPresets || [];
  const ingredients = registry.listIngredients();

  const coverageRows = ingredients.map(ingredient => {
    const tasteProfile = tasteProfiles[ingredient.name] || null;
    const textureProfile = textureProfiles[ingredient.name] || null;
    const flavorProfile = flavorProfiles[ingredient.id] || null;
    const tasteValueKeys = valueKeysFromObject(tasteProfile, ["tags"]);
    const textureValueKeys = valueKeysFromObject(textureProfile?.effects);
    const flavorValueKeys = valueKeysFromObject(flavorProfile, [
      "flavorFamilies",
      "aromaTags",
      "identityTags",
      "pairHints",
      "metadata"
    ]);
    const notes = [];
    if (!tasteProfile) notes.push("missing tasteProfile");
    if (!textureProfile) notes.push("missing textureProfile");
    if (!flavorProfile) notes.push("missing flavorProfile");
    if (tasteProfile && !tasteProfile.metadata) notes.push("taste lacks metadata/source note");
    if (textureProfile && !textureProfile.metadata) notes.push("texture lacks metadata/source note");
    if (flavorProfile && !flavorProfile.confidence) notes.push("flavor lacks confidence/review status");

    return {
      ingredientId: ingredient.id,
      name: ingredient.name,
      category: ingredient.category,
      hasTasteProfile: Boolean(tasteProfile),
      tasteValueKeys,
      hasTextureProfile: Boolean(textureProfile),
      textureValueKeys,
      hasFlavorProfile: Boolean(flavorProfile),
      flavorValueKeys,
      notes
    };
  });

  const tasteCoverage = coverageRows.filter(row => row.hasTasteProfile).length;
  const textureCoverage = coverageRows.filter(row => row.hasTextureProfile).length;
  const flavorCoverage = coverageRows.filter(row => row.hasFlavorProfile).length;
  const missingTaste = coverageRows.filter(row => !row.hasTasteProfile);
  const missingTexture = coverageRows.filter(row => !row.hasTextureProfile);
  const missingFlavor = coverageRows.filter(row => !row.hasFlavorProfile);

  const tasteKeyCounts = countKeys(coverageRows, row => row.tasteValueKeys);
  const textureKeyCounts = countKeys(coverageRows, row => row.textureValueKeys);
  const flavorKeyCounts = countKeys(coverageRows, row => row.flavorValueKeys);
  const calibrationIngredientIds = [...new Set(calibrationPresets.flatMap(preset =>
    preset.cup.map(item => item.ingredientId).filter(Boolean)
  ))];

  return {
    ingredients,
    coverageRows,
    counts: {
      totalIngredients: ingredients.length,
      tasteCoverage,
      textureCoverage,
      flavorCoverage,
      missingTaste: missingTaste.length,
      missingTexture: missingTexture.length,
      missingFlavor: missingFlavor.length
    },
    missingTaste,
    missingTexture,
    missingFlavor,
    tasteKeyCounts,
    textureKeyCounts,
    flavorKeyCounts,
    calibrationIngredientIds
  };
}

function renderKeyCounts(title, counts, summaryKeys) {
  const rows = counts.map(([key, count]) => [
    key,
    count,
    summaryKeys.includes(key) ? "yes" : "no"
  ]);
  return [
    `### ${title}`,
    "",
    markdownTable(["valueKey", "profileCount", "usedByCurrentSummaryPath"], rows)
  ].join("\n");
}

function renderReport(audit) {
  const { counts } = audit;
  const coverageRows = audit.coverageRows.map(row => [
    row.ingredientId,
    row.name,
    row.category,
    yesNo(row.hasTasteProfile),
    joinKeys(row.tasteValueKeys),
    yesNo(row.hasTextureProfile),
    joinKeys(row.textureValueKeys),
    yesNo(row.hasFlavorProfile),
    joinKeys(row.flavorValueKeys),
    row.notes.length ? row.notes.join("; ") : "-"
  ]);

  const dependencyRows = draftScoreDeltaDependencies.map(item => [
    item.metric,
    item.sourceLayer,
    item.sourceSummary,
    item.profilePath,
    "yes",
    "no",
    "no",
    item.needs
  ]);

  const calibrationNames = audit.calibrationIngredientIds
    .map(id => audit.ingredients.find(ingredient => ingredient.id === id))
    .filter(Boolean)
    .map(ingredient => `${ingredient.name} (${ingredient.id})`);

  return `# Ingredient Profile Value Readiness Audit

> 本报告是只读 inventory / readiness audit。
> 它不代表原料数值正确，不修改任何原料 profile，不做联网资料校准，不生成正式 ingredient value draft。
> 当前不能用它判断新系统建议分是否准确；现在只能说明材料事实层已有多少数据、缺什么结构。
> 后续批量原料数值阶段应结合联网资料、食品数据、论文、pH、糖度、脂肪 / 固体 / 质地常识，再由 ChatGPT + 用户进行游戏化校正。

## 0. 速读结论

- 原料总数：${counts.totalIngredients}
- taste profile 覆盖：${counts.tasteCoverage}/${counts.totalIngredients}，缺失 ${counts.missingTaste}
- texture profile 覆盖：${counts.textureCoverage}/${counts.totalIngredients}，缺失 ${counts.missingTexture}
- flavor profile 覆盖：${counts.flavorCoverage}/${counts.totalIngredients}，缺失 ${counts.missingFlavor}
- 当前 generatedSeveritySuggestion draft scoreDelta 读取的 metrics：${draftScoreDeltaDependencies.map(item => item.metric).join(", ")}
- 当前读取路径：taste metrics 来自 taste profile -> tasteSummary；texture metrics 来自 texture profile / drink structure -> textureSummary。
- 当前所有 draft scoreDelta metrics 都未正式校准，不应直接用于 final score、final feedback、final result 或 golden expected。
- 下一步建议：不要继续肉眼调误伤；应先做资料参考的 profile value draft，或先对 8-12 个核心原料做更细 readiness split。

## 1. Profile coverage table

中文显示名只用于 report 展示，不作为判断主键。

${markdownTable([
    "ingredientId",
    "displayName / name",
    "category",
    "hasTasteProfile",
    "tasteValueKeys",
    "hasTextureProfile",
    "textureValueKeys",
    "hasFlavorProfile",
    "flavorValueKeys",
    "notes"
  ], coverageRows)}

## 2. Metric inventory

${renderKeyCounts("tasteProfile / tasteSummary value keys", audit.tasteKeyCounts, tasteSummarySourceKeys)}

${renderKeyCounts("textureProfile / textureSummary value keys", audit.textureKeyCounts, textureSummarySourceKeys)}

${renderKeyCounts("flavorProfile / flavorSummary value keys", audit.flavorKeyCounts, flavorSummarySourceKeys)}

## 3. Draft scoreDelta dependency

${markdownTable([
    "metric",
    "layer",
    "sourceSummary",
    "current observation path",
    "observable now",
    "officially calibrated",
    "safe for final score",
    "needs next"
  ], dependencyRows)}

## 4. Obvious readiness gaps

### Missing profile coverage

- 缺 tasteProfile：${audit.missingTaste.length ? audit.missingTaste.map(row => `${row.name} (${row.ingredientId})`).join(", ") : "无"}
- 缺 textureProfile：${audit.missingTexture.length ? audit.missingTexture.map(row => `${row.name} (${row.ingredientId})`).join(", ") : "无"}
- 缺 flavorProfile：${audit.missingFlavor.length ? audit.missingFlavor.map(row => `${row.name} (${row.ingredientId})`).join(", ") : "无"}

### Metadata / review status gaps

- taste profile 当前主要是 numeric values + tags，没有统一 evidence / source note / confidence / review status metadata。
- texture profile 当前主要是 form / textureFamily / tags / effects，没有统一 evidence / source note / confidence / review status metadata。
- flavor profile 有基础 metadata，但没有逐原料 confidence / review status / external source note。
- 当前不判断任何原料数值是否真实准确，因为本轮未联网、未查 pH / 糖度 / 脂肪 / 质地资料。

### Draft scoreDelta gaps

- 仍缺正式 threshold / severityLevel / scoreMultiplier。
- 仍缺 drinkType expectation / positive synergy / customer preference 对同一 metric 的调节。
- 仍缺正式 triggerMetric registry / validator / generated severity data。
- 当前 draft scoreDelta 只是 UI debug suggestion，不应被当成正式评分来源。

## 5. Recommended next step

建议下一步进入第一批联网资料参考 ingredient profile value draft planning / small batch，或先挑 8-12 个核心原料做资料参考草案。

可优先覆盖当前 calibration presets 中的核心原料：

${makeBulletList(calibrationNames)}

额外建议纳入第一批的小型核心原料：

- 红茶
- 绿茶
- 乌龙茶
- 牛奶
- 厚乳
- 淡奶油
- 奶盖
- 珍珠
- 芋泥
- 奥利奥碎
- 柠檬
- 气泡水
- 蜂蜜

注意：本轮只建议，不生成任何新数值，不创建 CSV / JSON profile draft，不写入 \`data/generated\`。
`;
}

function main() {
  const args = parseArgs(process.argv);
  const outPath = path.resolve(repoRoot, args.out);
  const audit = buildAudit();
  const report = renderReport(audit);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, report, "utf8");

  console.log(`Ingredient profile value readiness audit written: ${path.relative(repoRoot, outPath)}`);
  console.log(`Ingredients: ${audit.counts.totalIngredients}`);
  console.log(`Taste coverage: ${audit.counts.tasteCoverage}/${audit.counts.totalIngredients}`);
  console.log(`Texture coverage: ${audit.counts.textureCoverage}/${audit.counts.totalIngredients}`);
  console.log(`Flavor coverage: ${audit.counts.flavorCoverage}/${audit.counts.totalIngredients}`);
  console.log(`Draft scoreDelta metrics: ${draftScoreDeltaDependencies.map(item => item.metric).join(", ")}`);
}

if (require.main === module) {
  main();
}
