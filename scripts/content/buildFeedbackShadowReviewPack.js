#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "../..");
const defaultOutputPath = "reports/human_review/feedbackShadowReview.sample.md";
const sampleIds = [
  "classic_milk_tea",
  "extreme_lemon_accident",
  "straw_resistance_accident"
];

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
  "core/tasteJudge.js",
  "data/goldenSamples.js"
];

const shadowScriptFiles = baseScriptFiles.flatMap(file => {
  if (file !== "core/feedbackEngine.js") return [file];
  return [
    "data/generated/feedbackTexts.generated.js",
    "core/feedbackRuntimeAdapter.js",
    file
  ];
});

function parseArgs(argv) {
  const args = { out: defaultOutputPath };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.out = argv[index + 1];
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.out) {
    throw new Error("--out requires a path");
  }

  return args;
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

function normalizeSampleItem(item, ingredientRegistry) {
  const ref = item?.ingredientRef || item?.ingredientId || item?.id || item?.name;
  const meta = ingredientRegistry.normalizeIngredientRef(ref);

  if (!meta) {
    if (item?.name) return { ...item };
    throw new Error(`Unknown ingredient ref: ${JSON.stringify(item)}`);
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

  return sample.cup.map(item => normalizeSampleItem(item, ingredientRegistry));
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function buildLegacySummary(result) {
  return {
    feedback: result?.feedback || "",
    score: result?.score ?? null,
    type: result?.type || "",
    accidentTypeId: result?.accidentTypeId || null,
    drinkTypeId: result?.drinkTypeId || null,
    outcomeTypeId: result?.outcomeTypeId || null,
    feedbackTags: Array.isArray(result?.feedbackTags) ? result.feedbackTags : []
  };
}

function buildShadowSummary(shadow) {
  return {
    enabled: shadow?.enabled === true,
    mode: shadow?.mode || null,
    affectsFinalFeedback: shadow?.affectsFinalFeedback ?? null,
    affectsFinalResult: shadow?.affectsFinalResult ?? null,
    source: shadow?.source || null,
    fallbackReason: shadow?.fallbackReason || null,
    candidates: Array.isArray(shadow?.candidates)
      ? shadow.candidates.map(candidate => ({
        textId: candidate.textId || null,
        feedbackTag: candidate.feedbackTag || null,
        scene: candidate.scene || null,
        tone: candidate.tone || null,
        zhCN: candidate.zhCN || "",
        minScore: candidate.minScore ?? null,
        maxScore: candidate.maxScore ?? null,
        accidentTypeId: candidate.accidentTypeId || null,
        drinkTypeId: candidate.drinkTypeId || null,
        outcomeTypeId: candidate.outcomeTypeId || null,
        matchReason: "feedbackTag"
      }))
      : [],
    metadata: cloneJson(shadow?.metadata || {})
  };
}

function buildReviewItem(sample, baselineResult, shadowResult) {
  const legacy = buildLegacySummary(shadowResult);
  const baselineLegacy = buildLegacySummary(baselineResult);
  const shadow = buildShadowSummary(shadowResult?.generatedFeedbackShadow);

  return {
    schemaVersion: "feedbackShadowReview.v0.0.7.22",
    source: {
      goldenSampleId: sample.id,
      recipeName: sample.name,
      recipe: sample.cup.map(item => ({
        ingredientId: item.ingredientId || null,
        name: item.name || "",
        ratio: item.ratio
      }))
    },
    legacy,
    shadow,
    checks: {
      needsHumanReview: true,
      shadowAffectsFinalFeedback: shadow.affectsFinalFeedback === true,
      finalFeedbackChanged: legacy.feedback !== baselineLegacy.feedback,
      scoreChanged: legacy.score !== baselineLegacy.score,
      typeChanged: legacy.type !== baselineLegacy.type,
      feedbackTagsChanged: !sameJson(legacy.feedbackTags, baselineLegacy.feedbackTags),
      fallbackReason: shadow.fallbackReason,
      candidateCount: shadow.candidates.length
    },
    review: {
      reviewStatus: "",
      preferredTextId: "",
      issueTags: "",
      suggestedRewrite: "",
      producerComment: ""
    }
  };
}

function markdownValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "(none)";
  if (value === null || value === undefined || value === "") return "(none)";
  return String(value);
}

function renderProducerCandidates(candidates) {
  if (!candidates.length) {
    return "- 暂无 generated shadow 候选文案。";
  }

  return candidates.map((candidate, index) => [
    `${index + 1}. ${markdownValue(candidate.textId)} / ${markdownValue(candidate.feedbackTag)} / ${markdownValue(candidate.scene)} / ${markdownValue(candidate.tone)}`,
    `   文案：${markdownValue(candidate.zhCN)}`,
    "   候选审核：",
    "   - reviewStatus（审核状态）:",
    "   - issueTags（问题标签）:",
    "   - suggestedRewrite（建议改写）:",
    "   - producerComment（制作人备注）:"
  ].join("\n")).join("\n\n");
}

function renderMachineCandidates(candidates) {
  if (!candidates.length) {
    return "- (no generated candidates)";
  }

  return candidates.map(candidate => [
    `- ${markdownValue(candidate.textId)} / ${markdownValue(candidate.feedbackTag)} / ${markdownValue(candidate.scene)} / ${markdownValue(candidate.tone)}`,
    `  - zhCN: ${markdownValue(candidate.zhCN)}`,
    `  - scoreRange: ${markdownValue(candidate.minScore)} - ${markdownValue(candidate.maxScore)}`,
    `  - resultIds: accident=${markdownValue(candidate.accidentTypeId)}, drink=${markdownValue(candidate.drinkTypeId)}, outcome=${markdownValue(candidate.outcomeTypeId)}`,
    `  - matchReason: ${markdownValue(candidate.matchReason)}`
  ].join("\n")).join("\n");
}

function renderProducerReviewItem(item) {
  return [
    `## ${item.source.goldenSampleId}｜${item.source.recipeName}`,
    "",
    "### 旧反馈（当前玩家看到）",
    markdownValue(item.legacy.feedback),
    "",
    "### 新候选文案（后台 shadow，不会影响玩家）",
    "",
    "填写提示：",
    "- reviewStatus 可填：keep 保留=1；revise 修改=2；reject 不要=3；pending 待定=4",
    "- issueTags 可直接写中文，例如：AI味浓、太狠、不好笑、触发不对、太平、太长、太抽象、想留但要改",
    "",
    renderProducerCandidates(item.shadow.candidates),
    "",
    "### 整组备注",
    "",
    "- needsNewText（是否还需要新增文案）:",
    "- preferredTextId（最喜欢哪条，可选）:",
    "- producerComment（整体备注）:",
    ""
  ].join("\n");
}

function renderMachineAppendixItem(item) {
  return [
    `## ${item.source.goldenSampleId}｜${item.source.recipeName}`,
    "",
    "### Recipe",
    item.source.recipe.map(ingredient =>
      `- ${markdownValue(ingredient.name)} (${markdownValue(ingredient.ingredientId)}): ${ingredient.ratio}%`
    ).join("\n"),
    "",
    "### Legacy Final Output",
    `- feedback: ${markdownValue(item.legacy.feedback)}`,
    `- score: ${markdownValue(item.legacy.score)}`,
    `- result.type: ${markdownValue(item.legacy.type)}`,
    `- feedbackTags: ${markdownValue(item.legacy.feedbackTags)}`,
    `- accidentTypeId: ${markdownValue(item.legacy.accidentTypeId)}`,
    `- drinkTypeId: ${markdownValue(item.legacy.drinkTypeId)}`,
    `- outcomeTypeId: ${markdownValue(item.legacy.outcomeTypeId)}`,
    "",
    "### Generated Shadow",
    `- enabled: ${markdownValue(item.shadow.enabled)}`,
    `- mode: ${markdownValue(item.shadow.mode)}`,
    `- source: ${markdownValue(item.shadow.source)}`,
    `- affectsFinalFeedback: ${markdownValue(item.shadow.affectsFinalFeedback)}`,
    `- affectsFinalResult: ${markdownValue(item.shadow.affectsFinalResult)}`,
    `- fallbackReason: ${markdownValue(item.shadow.fallbackReason)}`,
    `- checkedFeedbackTags: ${markdownValue(item.shadow.metadata.checkedFeedbackTags || [])}`,
    "",
    "### Candidate Details",
    renderMachineCandidates(item.shadow.candidates),
    "",
    "### Machine Checks",
    `- needsHumanReview: ${markdownValue(item.checks.needsHumanReview)}`,
    `- shadowAffectsFinalFeedback: ${markdownValue(item.checks.shadowAffectsFinalFeedback)}`,
    `- finalFeedbackChanged: ${markdownValue(item.checks.finalFeedbackChanged)}`,
    `- scoreChanged: ${markdownValue(item.checks.scoreChanged)}`,
    `- typeChanged: ${markdownValue(item.checks.typeChanged)}`,
    `- feedbackTagsChanged: ${markdownValue(item.checks.feedbackTagsChanged)}`,
    `- fallbackReason: ${markdownValue(item.checks.fallbackReason)}`,
    `- candidateCount: ${markdownValue(item.checks.candidateCount)}`,
    ""
  ].join("\n");
}

function renderMarkdown(items) {
  return [
    "# 制作人审核区",
    "",
    "这份报告主要给制作人审“新文案候选是否适合”。只需要看本区即可完成文案初审。",
    "",
    "机器详情集中放在后文附录，一般不用看。",
    "",
    "- 每条候选都可以单独 keep / revise / reject / pending。",
    "- 多条候选可以同时 keep，未来可随机或按权重使用。",
    "- preferredTextId 只是最喜欢哪条，不代表只能保留一条。",
    "",
    "- report 类型：制作人评审材料，不是 runtime data。",
    "- generated shadow 不接管最终反馈。",
    "- 本报告不会自动判断文案好坏，不会自动改文案，不会自动修改 golden expected。",
    "- generatedAt：not recorded for deterministic sample output。",
    "",
    ...items.map(renderProducerReviewItem),
    "# 机器详情附录",
    "",
    "本附录主要给 ChatGPT / Codex 检查数据结构和 shadow 输出，一般不用制作人逐项理解。",
    "",
    ...items.map(renderMachineAppendixItem)
  ].join("\n");
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const baselineRuntime = createRuntime(baseScriptFiles);
    const shadowRuntime = createRuntime(shadowScriptFiles);
    const baselineJudge = baselineRuntime.MILK_TEA_LAB_TASTE_JUDGE;
    const shadowJudge = shadowRuntime.MILK_TEA_LAB_TASTE_JUDGE;
    const ingredientRegistry = shadowRuntime.MILK_TEA_LAB_INGREDIENT_REGISTRY;
    const samples = shadowRuntime.MILK_TEA_LAB_GOLDEN_SAMPLES.goldenSamples.filter(sample =>
      sampleIds.includes(sample.id)
    );

    if (samples.length !== sampleIds.length) {
      const foundIds = samples.map(sample => sample.id);
      const missingIds = sampleIds.filter(sampleId => !foundIds.includes(sampleId));
      throw new Error(`Missing review samples: ${missingIds.join(", ")}`);
    }

    const reviewItems = samples.map(sample => {
      const cup = normalizeSampleCup(sample, ingredientRegistry);
      const sampleForReport = { ...sample, cup };
      return buildReviewItem(
        sampleForReport,
        baselineJudge.evaluateCup(cup),
        shadowJudge.evaluateCup(cup)
      );
    });

    const outputPath = path.resolve(repoRoot, args.out);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${renderMarkdown(reviewItems)}\n`, "utf8");

    console.log("Feedback shadow review pack generated");
    console.log(`Output: ${path.relative(repoRoot, outputPath)}`);
    console.log(`Samples: ${reviewItems.map(item => item.source.goldenSampleId).join(", ")}`);
  } catch (error) {
    console.error(`Feedback shadow review pack failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
