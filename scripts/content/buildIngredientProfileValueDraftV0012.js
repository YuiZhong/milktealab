#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const inputJson = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.11.json";
const defaultCsv = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.12.csv";
const defaultJson = "content_sheets/drafts/ingredient_profile_value_draft.v0.0.8.12.json";

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

const sourceReferences = [
  {
    id: "USDA_FDC",
    label: "USDA FoodData Central",
    url: "https://fdc.nal.usda.gov/",
    use: "ingredient composition baseline for dairy, fruit, sweetener, salt, coffee, cocoa, starch-heavy foods, and toppings"
  },
  {
    id: "FDA_APPROX_PH",
    label: "FDA / CFSAN approximate pH of foods and food products",
    url: "https://www.fda.gov/food/food-safety-during-emergencies/approximate-ph-foods-and-food-products",
    use: "pH / acidity sanity checks for fruits, milk, coffee, cocoa, tea-like beverages, and other foods"
  },
  {
    id: "TEA_REVIEW",
    label: "peer-reviewed tea chemistry reviews",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4055352/",
    use: "tea polyphenols, catechins, caffeine, bitterness, astringency, and aroma direction"
  },
  {
    id: "COFFEE_REVIEW",
    label: "peer-reviewed coffee chemistry reviews",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10857931/",
    use: "coffee caffeine, chlorogenic acids, acidity, roast aroma, and bitterness direction"
  },
  {
    id: "COCOA_REVIEW",
    label: "peer-reviewed cocoa / chocolate composition reviews",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/",
    use: "cocoa polyphenols, methylxanthines, bitterness, roasted notes, and powder sediment direction"
  },
  {
    id: "STARCH_TEXTURE",
    label: "food science references on starch gelatinization / pasting / gel texture",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8067799/",
    use: "tapioca / taro / starch paste viscosity, chewiness, sediment, and low-flow texture direction"
  }
];

const missingTasteProposals = {
  flavor_matcha: {
    acidity: 0,
    aromaImpact: 18,
    bitterness: 18,
    freshness: 8,
    heaviness: 6,
    isHighFat: false,
    isStrongAroma: true,
    milkiness: 0,
    strawResistance: 0,
    sweetness: 0,
    tags: ["tea", "powder", "earthy"],
    tea: 20,
    textureRisk: true,
    viscosity: 4,
    weirdness: 2,
    worksInFreshDrinks: false
  },
  flavor_cocoa: {
    acidity: 0,
    aromaImpact: 18,
    bitterness: 16,
    freshness: -4,
    heaviness: 10,
    isHighFat: false,
    isStrongAroma: true,
    milkiness: 0,
    strawResistance: 0,
    sweetness: 0,
    tags: ["cocoa", "roasted", "powder"],
    tea: 0,
    textureRisk: true,
    viscosity: 6,
    weirdness: 2,
    worksInFreshDrinks: false
  },
  sweetener_caramel: {
    acidity: 0,
    aromaImpact: 12,
    bitterness: 2,
    freshness: -2,
    heaviness: 4,
    isHighFat: false,
    isStrongAroma: false,
    milkiness: 0,
    strawResistance: 0,
    sweetness: 24,
    tags: ["sweetener", "caramelized"],
    tea: 0,
    textureRisk: false,
    viscosity: 5,
    weirdness: 0,
    worksInFreshDrinks: false
  },
  seasoning_sea_salt: {
    acidity: 0,
    aromaImpact: 2,
    bitterness: 0,
    freshness: 0,
    heaviness: 0,
    isHighFat: false,
    isStrongAroma: false,
    milkiness: 0,
    strawResistance: 0,
    sweetness: 0,
    tags: ["seasoning", "salty"],
    tea: 0,
    textureRisk: false,
    viscosity: 0,
    weirdness: 8,
    worksInFreshDrinks: false
  }
};

const sourceResearch = {
  tea_black: {
    confidence: "medium",
    sourceNotes: "参考茶化学综述：红茶经氧化形成较深色和较强茶感，茶多酚 / 咖啡因支持苦感、涩感和茶香基线；当前 tea / bitterness / roasted-malty 方向合理，但仍需制作人确认奶茶语境中的强度。",
    aiComment: "保留现有 profile 作为第一轮参考基线；不因旧分数或 golden 反推调整。"
  },
  tea_green: {
    confidence: "medium",
    sourceNotes: "参考茶化学综述：绿茶保留较多儿茶素，常见清鲜、草本、轻苦涩方向；当前 freshness / tea / mild bitterness 方向符合资料基线，需后续制作人口味校准。",
    aiComment: "当前数值作为 source-referenced baseline；后续重点看清爽偏苦是否误伤真实绿茶。"
  },
  tea_oolong: {
    confidence: "medium",
    sourceNotes: "参考茶化学与乌龙加工常识：乌龙介于绿茶与红茶之间，带焙火 / 花香 / 茶感，苦涩与香气均可中等偏强；当前 aromaImpact / tea / roasted-floral 方向可保留。",
    aiComment: "保留现有 profile；后续需要制作人判断乌龙是否应比红茶更香而不更苦。"
  },
  tea_jasmine: {
    confidence: "medium",
    sourceNotes: "参考茶与花香窨制方向：茉莉茶以花香和清爽感为核心，苦感通常不应压过花香；当前 floral / freshness / moderate tea baseline 合理。",
    aiComment: "保留现有 profile；后续重点校准花香压制力和清爽度。"
  },
  tea_puer: {
    confidence: "medium",
    sourceNotes: "参考茶化学和发酵茶方向：普洱常见发酵、土壤、陈香、厚重和苦涩感；当前 earthy / heaviness / strong tea direction 合理，但强度需要人工确认。",
    aiComment: "保留现有 profile；注意它可能是偏好型强身份，不应简单等同事故。"
  },
  dairy_milk: {
    confidence: "medium",
    sourceNotes: "参考 USDA FoodData Central 乳品成分：牛奶含乳糖、蛋白和乳脂，支持轻甜、乳感、轻脂肪负载与顺滑口感；当前 milkiness / fatLoad baseline 合理。",
    aiComment: "保留现有 profile；后续可按全脂 / 低脂版本拆数据，但本轮不创建新原料。"
  },
  dairy_thick_milk: {
    confidence: "medium",
    sourceNotes: "参考浓缩乳 / evaporated milk 食品成分方向：乳固体和乳脂相对集中，口感更厚、更奶、更甜感；当前 high milkiness / heaviness / fatLoad 方向合理。",
    aiComment: "保留现有 profile；后续需制作人确认厚乳是否更接近奶香增强还是脂肪负担。"
  },
  dairy_cream: {
    confidence: "medium",
    sourceNotes: "参考 USDA FoodData Central heavy cream：高乳脂支持明显厚重、奶油香、fatLoad 和黏稠口感；当前 cream fatLoad / heaviness 方向合理。",
    aiComment: "保留现有 profile；它会影响油腻负担，但不应直接等同低可饮用性。"
  },
  dairy_coconut_milk: {
    confidence: "medium",
    sourceNotes: "参考 USDA FoodData Central coconut milk 与椰乳成分：椰奶有植物脂肪、椰香和热带身份，质地可比水更厚；当前 coconut / tropical / moderate fatLoad 方向合理。",
    aiComment: "保留现有 profile；后续需分清椰奶香气身份和奶脂油腻事故。"
  },
  dairy_oat_milk: {
    confidence: "medium",
    sourceNotes: "参考 USDA FoodData Central oat milk 与燕麦饮料成分：燕麦基底带谷物香、轻甜、一定黏度和悬浮感；当前 grain / mild milkiness / sediment direction 合理。",
    aiComment: "保留现有 profile；后续需制作人评审燕麦粉感是否应提高。"
  },
  dairy_non_dairy_creamer: {
    confidence: "medium",
    sourceNotes: "参考植脂末 / non-dairy creamer 常见组成：植物油脂、糖 / 糊精和乳化体系会带甜感、奶感、工业感与脂肪负担；当前 highFat / industrial / weirdness 方向合理但需人工定性。",
    aiComment: "保留现有 profile；此类原料更依赖产品设定，confidence 不升高。"
  },
  liquid_water: {
    confidence: "high",
    sourceNotes: "参考水作为饮料稀释基底：中性、低粘度、无糖无香气，主要提供 dilution / freshness 支撑；当前 neutral / viscosity-negative 方向合理。",
    aiComment: "保留现有 profile；这是稀释和承载基线，不是风味机制。"
  },
  liquid_sparkling_water: {
    confidence: "medium",
    sourceNotes: "参考碳酸水资料：二氧化碳带来气泡刺激、清爽感和轻酸感；当前 carbonation / freshness / light acidity 方向合理。",
    aiComment: "保留现有 profile；后续可区分清凉刺激和酸感，但本轮不建新机制。"
  },
  liquid_coffee: {
    confidence: "medium",
    sourceNotes: "参考咖啡化学综述：咖啡含咖啡因、绿原酸和焙烤风味物质，支持苦味、酸度、焙烤香和强风味身份；当前 bitterness / aromaImpact / roast direction 合理。",
    aiComment: "保留现有 profile；后续校准咖啡酸苦平衡时应先看资料与制作人直觉。"
  },
  fruit_lemon: {
    confidence: "high",
    sourceNotes: "参考 FDA pH 表与 USDA 食品资料：柠檬汁是强酸性水果基底，糖度相对低，柑橘香明显；当前 high acidity / freshness / citrus aroma 方向合理。",
    aiComment: "保留现有 profile；柠檬作为酸度证据，不应被拆成专属事故 ID。"
  },
  fruit_strawberry: {
    confidence: "medium",
    sourceNotes: "参考 USDA fruit data 与 FDA pH 范围：草莓有一定糖酸平衡、浆果香和果肉颗粒；当前 sweetness / acidity / fruit solidLoad direction 合理。",
    aiComment: "保留现有 profile；后续制作人需确认草莓果肉在饮品中是清爽还是果酱厚重。"
  },
  fruit_mango: {
    confidence: "medium",
    sourceNotes: "参考 USDA mango data 与水果质地常识：芒果甜度、热带香和果肉稠度较明显；当前 sweetness / tropical / viscosity / pasteRisk direction 合理。",
    aiComment: "保留现有 profile；芒果泥感应和粉泥低流动性分开看。"
  },
  fruit_durian: {
    confidence: "medium",
    sourceNotes: "参考 USDA durian data 与榴莲风味资料：榴莲含糖和一定脂肪 / 碳水，气味强、质地厚、争议性高；当前 strong_identity / heaviness / pasteRisk direction 合理。",
    aiComment: "保留现有 profile；它是强身份与厚重质地，不应只用 weirdness 解释。"
  },
  fruit_watermelon: {
    confidence: "high",
    sourceNotes: "参考 USDA watermelon data：西瓜含水量高、甜度清淡、酸度低，适合作为清爽水果基线；当前 freshness / low heaviness / light sweetness direction 合理。",
    aiComment: "保留现有 profile；后续重点看西瓜香气是否过弱。"
  },
  fruit_grape: {
    confidence: "medium",
    sourceNotes: "参考 USDA grape data 与水果酸甜常识：葡萄有糖酸平衡、果皮可能带轻涩 / 单宁感，饮品中常体现多汁甜酸；当前 sweetness / acidity / juicy direction 合理。",
    aiComment: "保留现有 profile；后续可讨论葡萄皮涩是否需要单独证据字段。"
  },
  fruit_peach: {
    confidence: "medium",
    sourceNotes: "参考 USDA peach data：桃子糖酸较柔和，香气偏花果、质感柔软；当前 sweet / floral / soft profile 合理。",
    aiComment: "保留现有 profile；后续校准桃子香气强度和清爽度。"
  },
  fruit_lychee: {
    confidence: "medium",
    sourceNotes: "参考 USDA lychee data 与荔枝风味资料：荔枝甜感和花香 / 香水感明显，酸度较低；当前 sweetness / floral / perfumed direction 合理。",
    aiComment: "保留现有 profile；需防止荔枝香气压制被误判为普通甜。"
  },
  flavor_matcha: {
    confidence: "medium",
    sourceNotes: "参考茶粉 / 抹茶资料：抹茶是粉末态茶，带茶多酚、咖啡因、苦涩、草本 / 海苔样绿感和沉淀风险；本轮补 proposed taste baseline，但仍只是草案。",
    aiComment: "补齐缺失 taste draft；粉末沉淀和苦涩应由制作人复核。"
  },
  flavor_cocoa: {
    confidence: "medium",
    sourceNotes: "参考 cocoa review 与 USDA cocoa powder：可可粉有多酚 / 甲基黄嘌呤导致的苦味、烘烤巧克力香和粉末沉淀；本轮补 proposed taste baseline。",
    aiComment: "补齐缺失 taste draft；可可甜味通常来自加糖，不应把可可本体写太甜。"
  },
  sweetener_white_sugar: {
    confidence: "high",
    sourceNotes: "参考 USDA sucrose / sugar data：白糖主要提供蔗糖甜味，几乎不提供酸、苦、香气或质地；当前 clean sweetness direction 合理。",
    aiComment: "保留现有 profile；它是甜度基准，不是风味身份核心。"
  },
  sweetener_honey: {
    confidence: "medium",
    sourceNotes: "参考 USDA honey data：蜂蜜以糖类为主，带黏度、轻酸性和花香 / 蜂蜜身份；当前 sweetness / aroma / viscosity direction 合理。",
    aiComment: "保留现有 profile；后续需制作人判断蜂蜜香气是否会压过茶。"
  },
  sweetener_brown_sugar: {
    confidence: "medium",
    sourceNotes: "参考 brown sugar / molasses composition：黑糖以甜味为主，带糖蜜、焦香、厚重和轻微苦味；当前 molasses / heaviness / caramelized direction 合理。",
    aiComment: "保留现有 profile；黑糖是风味甜味，不只是甜度数字。"
  },
  sweetener_caramel: {
    confidence: "medium",
    sourceNotes: "参考 caramel syrup / caramelized sugar 资料：焦糖是高糖 + 焦香 / 烘烤甜香方向，常伴随一定黏度；本轮补 proposed taste baseline。",
    aiComment: "补齐缺失 taste draft；具体甜度和黏度取决于糖浆浓度，需制作人 review。"
  },
  seasoning_sea_salt: {
    confidence: "low",
    sourceNotes: "参考 sea salt / sodium chloride 基础味觉资料：海盐主要提供咸味和风味平衡；当前系统缺少正式 saltiness numeric 字段，本轮只用 draft tags / weirdness 提醒，不创建 schema。",
    aiComment: "资料方向明确但 schema 表达不足；needs follow-up，不得直接接 runtime。"
  },
  topping_pearl: {
    confidence: "medium",
    sourceNotes: "参考 tapioca / cassava starch 和珍珠质地资料：珍珠主要提供淀粉凝胶咀嚼、固体负载和吸管阻力；当前 chewiness / solidLoad / strawResistance direction 合理。",
    aiComment: "保留现有 profile；小料多不等于低流动性，需要和水泥感分开。"
  },
  topping_coconut_jelly: {
    confidence: "medium",
    sourceNotes: "参考椰果 / nata de coco 凝胶类小料常识：椰果偏弹韧、清爽、固体负载较高但不粉泥；当前 chewiness / solidLoad / fresh coconut direction 合理。",
    aiComment: "保留现有 profile；它是小料固体负载，不是粉浆或奶脂。"
  },
  topping_pudding: {
    confidence: "medium",
    sourceNotes: "参考 pudding / custard gel 食品资料：布丁提供软凝胶、甜感、奶香和小料固体负载；当前 gelSoftness / dessert flavor direction 合理。",
    aiComment: "保留现有 profile；后续可调整 gelSoftness 和 strawResistance 的关系。"
  },
  topping_grass_jelly: {
    confidence: "low",
    sourceNotes: "参考 grass jelly 作为草本凝胶小料的食品常识：仙草偏软凝胶、草本、轻苦 / 清凉方向；公开定量资料有限，需制作人 review。",
    aiComment: "保留现有 profile；source_limited，后续应补中文食品资料或品牌样本。"
  },
  topping_taro_ball: {
    confidence: "medium",
    sourceNotes: "参考芋圆 / tapioca starch 类小料常识：芋圆提供淀粉弹韧、咀嚼负载和固体负载，可有轻微糯 / 粉感；当前 chewiness / solidLoad direction 合理。",
    aiComment: "保留现有 profile；它和芋泥 pasteRisk 不是同一质地事故。"
  },
  topping_oreo_crumble: {
    confidence: "medium",
    sourceNotes: "参考 cookie crumb / cocoa biscuit 组成：饼干碎提供糖、油脂、可可烘烤香、碎屑沉淀和糊嘴风险；当前 sediment / pasteRisk / dessert identity direction 合理。",
    aiComment: "保留现有 profile；需注意奥利奥碎不是单纯固体小料，也有粉泥感风险。"
  },
  topping_taro_paste: {
    confidence: "medium",
    sourceNotes: "参考 taro / starch paste texture：芋泥以淀粉糊状、厚重、低流动性和需液体支撑为主；当前 pasteRisk / strawResistance / solidLoad direction 合理。",
    aiComment: "保留现有 profile；它是粉泥低流动性方向的关键原料。"
  },
  topping_cheese_foam: {
    confidence: "medium",
    sourceNotes: "参考 cream cheese / dairy foam 组成和奶盖饮品常识：奶盖提供乳脂、泡沫层、咸甜乳香与口腔覆膜负担；当前 fatLoad / foamLayer / savoryRisk direction 合理。",
    aiComment: "保留现有 profile；奶盖油腻负担不等于吸不动，应与 low drinkability 分开。"
  }
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
      schemaVersion: "ingredientProfileValueDraft.v0.0.8.12",
      runtimeData: false,
      generatedData: false,
      draftWorkspaceOnly: true,
      sourceReferencedValuesProvided: true,
      sourceReferenceMode: "all_37_first_pass_broad_food_science_references",
      canApplyToRuntime: false,
      canAffectFinalScore: false,
      canAffectGoldenExpected: false,
      rowCount: rows.length,
      sourceReferences,
      notes: "All rows are source-referenced first-pass drafts for human review. Proposed values are review-only baselines or missing-profile draft fills; they are not runtime data, generated data, official profile values, scoring rules, threshold values, or golden expected changes."
    },
    rows
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function proposalModeFor(row, proposedTaste) {
  const hasMissingTasteFill = row.currentTasteValuesJson === "{}" && Object.keys(proposedTaste).length > 0;
  if (hasMissingTasteFill) return "source_referenced_first_pass_missing_taste_proposed_review_only";
  return "source_referenced_first_pass_current_snapshot_baseline_review_only";
}

function buildRows() {
  const inputPath = path.join(repoRoot, inputJson);
  const payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  return payload.rows.map(row => {
    const research = sourceResearch[row.ingredientId];
    if (!research) {
      throw new Error(`Missing source research entry for ${row.ingredientId}`);
    }

    const currentTaste = parseJsonCell(row.currentTasteValuesJson);
    const currentTexture = parseJsonCell(row.currentTextureEffectsJson);
    const currentFlavor = parseJsonCell(row.currentFlavorValuesJson);
    const proposedTaste = Object.keys(currentTaste).length > 0
      ? currentTaste
      : (missingTasteProposals[row.ingredientId] || {});
    const proposedTexture = currentTexture;
    const proposedFlavor = currentFlavor;
    const lowConfidence = research.confidence === "low";

    return {
      ...row,
      proposedTasteValuesJson: jsonCell(proposedTaste),
      proposedTextureEffectsJson: jsonCell(proposedTexture),
      proposedFlavorValuesJson: jsonCell(proposedFlavor),
      proposalMode: proposalModeFor(row, proposedTaste),
      sourceNeeded: "TRUE",
      sourceNotes: research.sourceNotes,
      confidence: research.confidence,
      reviewStatus: lowConfidence ? "needs_follow_up_source_review" : "needs_producer_review",
      producerComment: "",
      aiComment: research.aiComment,
      canApplyToRuntime: "FALSE",
      canAffectFinalScore: "FALSE",
      canAffectGoldenExpected: "FALSE",
      sourceStatus: lowConfidence ? "source_limited_first_pass" : "source_referenced_first_pass",
      draftStatus: "draft_review_only_not_runtime"
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
  console.log("Source referenced first pass: 37/37");
  console.log("Runtime gates: canApplyToRuntime=false, canAffectFinalScore=false, canAffectGoldenExpected=false");
}

if (require.main === module) {
  main();
}
