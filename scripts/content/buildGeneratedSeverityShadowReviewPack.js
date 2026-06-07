#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");
const defaultInputPath = "reports/debug/generatedSeverityShadow.multiSample.sample.json";
const defaultOutPath = "reports/human_review/generatedSeverityShadowReview.sample.md";

const REQUIRED_FLAGS = {
  readonly: true,
  affectsFinalResult: false,
  affectsScore: false,
  affectsFeedback: false,
  affectsResultType: false,
  affectsGoldenExpected: false,
  runtimeData: false,
  generatedSeverityData: false,
  partialTakeoverEnabled: false,
  activeTakeoverEnabled: false
};

function parseArgs(argv) {
  const args = {
    input: defaultInputPath,
    out: defaultOutPath
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--out") {
      args.out = argv[index + 1];
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function repoPath(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(repoPath(relativePath), "utf8"));
}

function assertSafeShadow(data) {
  const unsafe = Object.entries(REQUIRED_FLAGS)
    .filter(([key, expected]) => data?.[key] !== expected)
    .map(([key, expected]) => `${key} expected ${expected}, got ${data?.[key]}`);

  if (unsafe.length) {
    throw new Error(`Unsafe generated severity shadow input:\n${unsafe.join("\n")}`);
  }
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function truncateText(value, maxLength = 56) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function tableCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ")
    .trim();
}

function formatCounts(counts) {
  const entries = Object.entries(counts);
  if (!entries.length) return "none";
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
}

function formatList(values) {
  const unique = [...new Set(values.filter(Boolean))];
  return unique.length ? unique.join(" / ") : "none";
}

function summarizeRecipe(snapshot) {
  const recipe = Array.isArray(snapshot.recipe) ? snapshot.recipe : [];
  if (!recipe.length) return "";
  return recipe
    .slice(0, 4)
    .map(item => `${item.name || item.ingredientId || "unknown"} ${item.ratio ?? "?"}`)
    .join(", ");
}

function summarizeCandidate(group) {
  const first = group[0] || {};
  const matchCounts = countBy(group, item => item.matchState);
  const allUnavailable = group.every(item => item.matchState === "unavailable_metric");
  const observed = group.some(item => String(item.matchState || "").startsWith("metric_observed"));
  let producerNote = "需要后续映射和阈值审查。";

  if (allUnavailable) {
    producerNote = "还没有同名 runtime metric；系统没有发明映射。";
  } else if (observed) {
    producerNote = "只是观察到同名指标，不代表事故触发或正式 severity。";
  }

  return {
    proposedDraftId: first.proposedDraftId,
    displayNameDraft: first.displayNameDraft,
    sourceLayer: first.sourceLayer,
    triggerMetricDirection: first.triggerMetricDirection,
    rowCount: group.length,
    matchSummary: formatCounts(matchCounts),
    producerNote
  };
}

function buildMarkdown(data, inputPath) {
  const legacySnapshots = Array.isArray(data.legacySnapshots) ? data.legacySnapshots : [];
  const shadowCandidates = Array.isArray(data.shadowCandidates) ? data.shadowCandidates : [];
  const matchCounts = countBy(shadowCandidates, item => item.matchState);
  const grouped = Object.values(
    shadowCandidates.reduce((groups, candidate) => {
      const key = candidate.proposedDraftId || "unknown";
      groups[key] = groups[key] || [];
      groups[key].push(candidate);
      return groups;
    }, {})
  );
  const candidateSummaries = grouped.map(summarizeCandidate);
  const observedDirections = shadowCandidates
    .filter(item => String(item.matchState || "").startsWith("metric_observed"))
    .map(item => item.triggerMetricDirection);
  const unavailableDirections = shadowCandidates
    .filter(item => item.matchState === "unavailable_metric")
    .map(item => item.triggerMetricDirection);
  const unsafeFlags = Object.entries(REQUIRED_FLAGS).filter(([key, expected]) => data[key] !== expected);
  const sourceCommit = data.metadata?.sourceCommit || "unknown";

  const lines = [];
  lines.push("# Generated Severity Shadow Review Pack Sample｜生成 severity shadow 人类速读包");
  lines.push("");
  lines.push("> 本文件基于 debug-only / read-only shadow output 自动生成，供制作人 / ChatGPT 快速阅读。");
  lines.push("> 它不是 runtime data，不是 generated severity，不改 final score / feedback / result.type / accident，不改 golden expected。");
  lines.push("> 它不代表 proposedDraftId / triggerMetricDirection 已正式批准；当前 shadow 主要观察 metric availability，不是正式事故触发。");
  lines.push("");
  lines.push("## 0. 速读结论");
  lines.push("");
  lines.push(`- 读取 legacySnapshots：${legacySnapshots.length} 个。`);
  lines.push(`- 读取 shadowCandidates：${shadowCandidates.length} 条。`);
  lines.push(`- metric_observed_positive：${matchCounts.metric_observed_positive || 0} 条，只表示现有 summary 看到了同名指标且值 > 0。`);
  lines.push(`- unavailable_metric：${matchCounts.unavailable_metric || 0} 条，表示当前没有同名 runtime summary metric，系统没有发明映射。`);
  lines.push(`- unsafe final flags：${unsafeFlags.length === 0 ? "未发现" : unsafeFlags.map(([key]) => key).join(", ")}。`);
  lines.push("- 本轮可以用于制作人粗看 shadow 覆盖情况。");
  lines.push("- 仍不能用于 runtime / generated severity / partial takeover / active takeover。");
  lines.push("");
  lines.push("## 1. 样本总览｜Legacy snapshots");
  lines.push("");
  lines.push("| sampleId | 样本标题 | 旧系统分数 | 旧系统类型 | 旧系统事故 | drinkTypeId | feedbackTags | 一句话摘要 |");
  lines.push("|---|---|---:|---|---|---|---|---|");
  legacySnapshots.forEach(snapshot => {
    const summary = truncateText(snapshot.feedback || summarizeRecipe(snapshot), 56);
    lines.push([
      tableCell(snapshot.sampleId),
      tableCell(snapshot.sampleTitle),
      tableCell(snapshot.score),
      tableCell(snapshot.type),
      tableCell(snapshot.accidentTypeId || "none"),
      tableCell(snapshot.drinkTypeId || "none"),
      tableCell(formatList(snapshot.feedbackTags || [])),
      tableCell(summary)
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });
  lines.push("");
  lines.push("## 2. Shadow candidate 总览");
  lines.push("");
  lines.push("| proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | severity rows 数量 | matchState 汇总 | 制作人备注 |");
  lines.push("|---|---|---|---|---:|---|---|");
  candidateSummaries.forEach(item => {
    lines.push([
      tableCell(item.proposedDraftId),
      tableCell(item.displayNameDraft),
      tableCell(item.sourceLayer),
      tableCell(item.triggerMetricDirection),
      tableCell(item.rowCount),
      tableCell(item.matchSummary),
      tableCell(item.producerNote)
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  });
  lines.push("");
  lines.push("## 3. 指标可见性摘要｜Metric availability");
  lines.push("");
  lines.push("- `metric_observed_positive`：现有 summary 里看到了同名指标且值 > 0。它只是观察到指标，不是事故触发、不是 severity 命中、不是扣分。");
  lines.push("- `unavailable_metric`：目前没有同名 runtime summary metric；系统没有发明映射。");
  lines.push(`- 可观察到的 direction：${formatList(observedDirections)}。`);
  lines.push(`- 暂不可观察到的 direction：${formatList(unavailableDirections)}。`);
  lines.push("- 原因：现有 summary 字段名不同，或尚无 formal triggerMetric registry。");
  lines.push("");
  lines.push("## 4. 需要制作人之后关注的问题");
  lines.push("");
  lines.push("- 未来是否把 `sweetnessLoad` 映射到 `sweetness`，还是另建更精确 metric？");
  lines.push("- `acidityLoad` 是否等同 `acidity`，还是需要 `acidPressure` / `acidSharpness` 等？");
  lines.push("- `lowFlowPenalty` 是否应映射到 `drinkabilityPenalty` / `drinkability` / `viscosity` / `sedimentRisk` 的组合？");
  lines.push("- `solidLoad` 现在能被观察到，但 light / medium / heavy 阈值仍未正式定义。");
  lines.push("- 目前不能把 `metric_observed_positive` 当成事故触发。");
  lines.push("");
  lines.push("## 5. 机器详情附录");
  lines.push("");
  lines.push(`- source JSON path: \`${inputPath}\``);
  lines.push(`- schemaVersion: \`${data.schemaVersion || "unknown"}\``);
  lines.push(`- sourceCommit: \`${sourceCommit}\``);
  lines.push(`- legacySnapshotCount: ${legacySnapshots.length}`);
  lines.push(`- shadowCandidateCount: ${shadowCandidates.length}`);
  lines.push(`- matchState counts: ${formatCounts(matchCounts)}`);
  lines.push("- non-final flags summary:");
  Object.entries(REQUIRED_FLAGS).forEach(([key, expected]) => {
    lines.push(`  - ${key}: ${data[key]} (expected ${expected})`);
  });
  lines.push("");
  lines.push("> 本附录只帮助追溯 shadow proof，不是 runtime source，不是 generated severity source。");
  lines.push("");

  return `${lines.join("\n")}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = readJson(args.input);
  assertSafeShadow(data);
  const markdown = buildMarkdown(data, args.input);
  const outPath = repoPath(args.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, markdown, "utf8");
  console.log(`Generated severity shadow review pack written: ${args.out}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
