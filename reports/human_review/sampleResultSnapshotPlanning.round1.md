# Sample Result Snapshot Planning Round 1｜Sample Result Snapshot 规划

## 0. 文件定位

本文件只规划 future generated severity shadow builder 所需的 sample result snapshot 结构。

本文件不是：

- snapshot implementation
- generated severity data
- runtime data
- schema / active validator / allowed values
- formal threshold / scoreMultiplier / triggerMetric / stable ID approval
- final score / final feedback / final accident / golden expected source
- shadow / partial / active takeover permission

本文件不创建 snapshot 文件，不实现 builder，不生成 generated severity，不接 runtime，不影响 final result / golden expected。

## 1. 为什么需要这一步

`reports/human_review/generatedSeverityShadowBuilderPlanning.round1.md` 已规划 future generated severity shadow builder 的最小职责、输入 / 输出、执行方式和测试边界。

真正 builder 需要读取当前试喝结果的只读快照，才能把 severity sample rows 与现有 legacy result、summary 和 candidate evidence 做 shadow-only comparison。

在实现 builder 前，必须先定义：

- snapshot 里有哪些字段。
- snapshot 字段来源是什么。
- 哪些字段只能只读观察。
- 哪些字段不能写回 runtime。
- snapshot 和 final result / golden expected 的硬边界。

本轮仍不写代码。

## 2. Snapshot source options

### 2.1 Golden runner snapshot

Future snapshot 可由 golden runner / golden debug harness 产出某个 sample 的 result snapshot。

优点：

- 可复现。
- 适合 first shadow。
- 不需要 browser runtime。

边界：

- 不改 golden expected。
- 不把 shadow mismatch 自动写回 golden。
- 不改变 runner assertions。

### 2.2 Manual debug snapshot

Future snapshot 可用手工导出的 result JSON 作为输入。

优点：

- 简单。
- 适合早期 proof。

边界：

- 不能作为 source-of-truth。
- 不能用于 official generated severity。

### 2.3 Browser runtime snapshot

Future snapshot 可考虑 browser runtime 来源，但第一版不推荐。

原因：

- 容易引入 UI / cache / async / browser state 风险。
- 不适合 first builder。

Recommendation:

第一版优先使用 Node-only golden runner / debug harness snapshot，不走 browser runtime。

## 3. Minimal snapshot fields

Future snapshot 最小字段可包括：

- `sampleId`
- `sampleTitle`
- recipe / ingredients snapshot
- `result.score`
- `result.type`
- `result.feedback`
- `result.accidentTypeId`
- `result.drinkTypeId`
- `result.outcomeTypeId`
- `result.feedbackTags`
- `result.tasteSummary`
- `result.textureSummary`
- `result.flavorSummary`
- `result.summaryCandidates`
- `result.candidatePriorityShell`
- `metadata`

这些都是只读观察字段，不允许 shadow builder 修改。

## 4. Metadata fields

Snapshot metadata 应包含：

| field | suggested value / role |
|---|---|
| `sourceType` | `golden_runner_snapshot` / `debug_snapshot` |
| `readonly` | true |
| `affectsFinalResult` | false |
| `affectsGoldenExpected` | false |
| `generatedSeverityInput` | false |
| `runtimeData` | false |
| `createdFor` | `generatedSeverityShadowPlanning` |
| `sourceCommit` | source commit for traceability |
| `sampleId` | source sample id |
| `notes` | human notes only |

Metadata 是边界说明，不是 approval。

## 5. Snapshot shape proposal

示意结构如下，但本轮不创建 JSON 文件：

```json
{
  "schemaVersion": "sampleResultSnapshot.shapeDraft.v0.0.8",
  "sourceType": "golden_runner_snapshot",
  "readonly": true,
  "affectsFinalResult": false,
  "affectsGoldenExpected": false,
  "generatedSeverityInput": false,
  "runtimeData": false,
  "sample": {
    "sampleId": "",
    "title": "",
    "recipe": []
  },
  "legacyResult": {
    "score": null,
    "type": "",
    "feedback": "",
    "accidentTypeId": null,
    "drinkTypeId": null,
    "outcomeTypeId": null,
    "feedbackTags": []
  },
  "summaries": {
    "tasteSummary": {},
    "textureSummary": {},
    "flavorSummary": {}
  },
  "candidates": {
    "summaryCandidates": [],
    "candidatePriorityShell": {}
  },
  "metadata": {}
}
```

这是 shape proposal，不是正式 schema，不是 runtime data。

## 6. Read-only boundary

Snapshot 是输入快照，不是可写 result。

Future builder 不能：

- 修改 snapshot。
- 把 shadow 结果写回 snapshot。
- 把 snapshot 写回 golden expected。
- 把 snapshot 当作 runtime data。
- 把 snapshot 写入 `data/generated`。
- 把 snapshot 当作 official result source。

## 7. Relationship to generatedSeverityShadow

Snapshot 的职责是给 future `generatedSeverityShadow` 提供只读 evidence：

- snapshot 提供 legacy comparison 的输入。
- snapshot 提供 summary / candidate evidence 的只读来源。
- severity sample rows 提供 shadow candidate rows。
- builder 只是比较 sample rows 与 snapshot evidence。
- `generatedSeverityShadow` 输出 observation，不影响 snapshot / result。

## 8. Missing fields / unavailable data policy

Future snapshot 如果缺字段，应按 observation 处理：

- 缺 `tasteSummary`：shadow row 可输出 `missing_summary`。
- 缺 specific `triggerMetricDirection`：输出 `unavailable_metric`。
- 缺 `summaryCandidates`：仍可输出 `limited_shadow` / `needs_human_review`。
- 缺 `candidatePriorityShell`：不阻塞 shape，但会限制 priority comparison。
- 缺 `accidentTypeId` / `feedbackTags`：legacy comparison 标 `unknown` / `not_available`。

缺字段不应触发 runtime fallback hack。

缺字段不应让 builder 临时补 summary。

缺字段不应改 final result。

## 9. Implementation blockers before snapshot creation

真正创建 snapshot 文件 / extractor 前，需要另开任务决定：

- snapshot 来源：golden runner 还是 debug harness。
- snapshot 输出路径：`reports/debug` 还是 `reports/human_review`。
- 是否输出一个 sample 还是多个 sample。
- snapshot 是否保存 recipe ingredients。
- 是否需要脱敏 / 压缩字段。
- 如何确保 snapshot 生成不改 golden expected。
- 如何测试 final result unchanged。

## 10. Recommended next step

These are options, not commands.

### Option A: User + ChatGPT review this snapshot shape

审阅 snapshot 字段是否足够、是否太重、边界是否安全。

### Option B: Sample Result Snapshot Extractor Planning

设计 future extractor 如何从 golden runner / debug harness 输出 snapshot。

This option still does not implement extractor.

### Option C: Minimal Generated Severity Shadow Builder Implementation

只有在 snapshot extractor / input decision 通过后考虑。

This option must remain Node-only / read-only and must not connect to runtime / generated / golden.

Recommendation:

建议下一步先由用户 + ChatGPT review 本 snapshot planning。如果通过，下一步做 Sample Result Snapshot Extractor Planning。不建议直接实现 builder。
