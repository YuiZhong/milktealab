# Generated Severity Shadow Builder Planning Round 1｜Generated Severity Shadow Builder 规划

## 0. 文件定位

本文件只规划 future generated severity shadow builder 的最小职责、输入、输出、执行方式和测试边界。

本文件不是：

- shadow builder implementation
- generated severity data
- runtime data
- schema / active validator / allowed values
- formal threshold / scoreMultiplier / triggerMetric / stable ID approval
- final score / final feedback / final accident / golden expected source
- partial / active takeover permission

本文件不实现脚本，不生成 generated severity，不接 runtime，不修改 final score / final feedback / final accident / golden expected。

## 1. 为什么需要这一步

`reports/human_review/generatedSeverityShadowShapePlanning.round1.md` 已规划 future `generatedSeverityShadow` 输出结构。

`reports/human_review/generatedSeverityShadowReadPathPlanning.round1.md` 已规划 future shadow builder 的输入来源 / read path。

`reports/human_review/preShadowGateReview.round1.md` 已确认当前状态可以进入 shape / read path / builder planning，但不能直接进入 implementation。

真正实现 builder 前，需要先定义：

- builder 的最小职责是什么。
- 它未来读什么、输出什么。
- 它应该以什么执行方式运行。
- 它需要通过哪些测试边界。
- 它绝对不能做什么。

本轮仍不写代码，不创建 generated data，不接 runtime。

## 2. Future builder role

Future generated severity shadow builder 的职责应保持很小：

- 读取 severity sample rows example CSV / JSON。
- 在读取 sample rows 前要求 `scripts/content/validateSeveritySampleRows.js` 通过。
- 接收或读取 current result snapshot / golden sample result snapshot。
- 只读访问 `tasteSummary`、`textureSummary`、`flavorSummary`、`summaryCandidates`、`candidatePriorityShell`。
- 基于 sample rows 和可见 evidence 生成 `generatedSeverityShadow`。
- 对每条 sample row 输出 `matchState`、evidence、warnings、legacy comparison。
- 输出 side-channel observation，并明确 `affectsFinalResult=false`。

Builder 是 debug / review / shadow observation tool，不是 final judge，不是 scoring engine。

## 3. Future input contract

### 3.1 Sample rows input

Future builder 可优先读取：

- `content_sheets/examples/severity_sample_rows.sample.json`

CSV 可作为人类编辑 source；JSON 可作为 first builder input candidate。

Sample rows 使用前必须先通过 `scripts/content/validateSeveritySampleRows.js`。

这些 sample rows 仍只是 planning examples，不是 generated severity source，不是 runtime data，不是 official threshold / scoreMultiplier。

### 3.2 Result snapshot input

Future builder 可以接收 current result snapshot，例如来自 golden runner 或 debug harness 的只读结果：

- `score`
- `type`
- `feedback`
- `accidentTypeId`
- `drinkTypeId`
- `outcomeTypeId`
- `feedbackTags`
- `tasteSummary`
- `textureSummary`
- `flavorSummary`
- `summaryCandidates`
- `candidatePriorityShell`

这些字段只能只读观察：

- no mutation
- no override
- no golden update
- no final feedback replacement
- no final result replacement

### 3.3 Optional config

Future builder 可以有只影响 shadow report 细节的 optional config：

- `includeUnmatchedRows`
- `includeUnavailableMetricRows`
- `includeLegacyComparison`
- `maxCandidates`
- `debugMode`

Config 只能影响 shadow report detail，不能影响 final result。

## 4. Future output contract

Future builder 可输出：

- `generatedSeverityShadow.metadata`
- `generatedSeverityShadow.rows` / `generatedSeverityShadow.shadowCandidates`
- `generatedSeverityShadow.legacyComparison`
- `generatedSeverityShadow.warnings`
- `generatedSeverityShadow.fallbackReason`

任何 future output 必须带上 hard non-final flags：

| flag | required value |
|---|---|
| `affectsFinalResult` | false |
| `affectsScore` | false |
| `affectsFeedback` | false |
| `affectsResultType` | false |
| `affectsGoldenExpected` | false |
| `runtimeData` | false |
| `generatedSeverityData` | false |
| `proposedDraftIdsAreApprovedStableIds` | false |
| `triggerMetricDirectionsAreOfficialRegistry` | false |
| `sourceSampleRowsAreRuntimeData` | false |
| `validatorIsActiveValidator` | false |

## 5. Match logic boundary

Future minimal matching logic 可以很保守：

- 如果 `triggerMetricDirection` 在 summary values 里有明显可见值，builder 可做 availability / observation comparison。
- 如果缺少 metric，输出 `unavailable_metric`。
- 如果缺少 summary，输出 `missing_summary`。
- 如果 row gate 不安全，输出 `blocked_by_gate`。
- 如果 evidence 模糊，输出 `needs_human_review`。

`matched` 只是 observation，不是 final accident。

`unmatched` 不表示 sample row 错误。

Builder 不得生成 official severity、official `scoreMultiplier`，也不得发明 triggerMetric mapping。

## 6. First builder execution mode

Future first implementation should be Node-only debug script, not browser runtime.

Possible future command examples:

```bash
node scripts/content/buildGeneratedSeverityShadow.js --sample content_sheets/examples/severity_sample_rows.sample.json --golden-sample <sampleId>
```

```bash
node scripts/content/buildGeneratedSeverityShadow.js --sample content_sheets/examples/severity_sample_rows.sample.json --snapshot reports/.../sampleResultSnapshot.json
```

These are examples only. This round creates no script.

Node-only is safer because it avoids accidental browser runtime wiring.

Future builder must not:

- attach to `index.html` / browser runtime
- read sample CSV / JSON directly from browser runtime
- write output to `data/generated`

## 7. Future test boundary

Future implementation must test:

- validator passes first
- builder script `node --check` passes
- output metadata contains all non-final flags
- builder does not modify input files
- builder does not modify core / data / generated / golden
- builder does not change golden final output
- output is parseable
- if output file is created, it goes to `reports/human_review` or `reports/debug`, not `data/generated`

No UI smoke is required unless a future task explicitly adds browser runtime behavior. First builder should not use browser runtime.

## 8. Hard forbidden behavior

Future builder must not:

- read report prose as runtime source
- read README prose as runtime source
- treat `proposedDraftId` as approved stable ID
- treat `triggerMetricDirection` as official registry
- treat `rowId` as stable ID
- treat `displayNameDraft` as key
- generate official threshold
- generate `scoreMultiplier`
- write `data/generated`
- write golden expected
- change `result.score`
- change `result.feedback`
- change `result.type`
- change final accident
- perform partial / active takeover
- read `generatedSeverityShadow` back into final result

## 9. Open decisions before implementation

Before any implementation, these decisions remain open:

- result snapshot source: golden runner / debug harness / manual snapshot
- output location: stdout / `reports/debug` / `reports/human_review` / no disk
- selected golden samples for first observation
- sample result snapshot format
- mapping `triggerMetricDirection` to `summary.values`
- whether missing metric makes every row `unavailable_metric`
- whether builder may read `summaryCandidates` / `candidatePriorityShell`
- separation between generated feedback shadow and generated severity shadow

## 10. Recommended next step

These are options, not commands.

### Option A: User + ChatGPT review this builder planning

Review whether the future builder's minimal role, inputs, outputs, execution mode and test boundary are safe enough.

### Option B: Sample Result Snapshot Planning

Define the future read-only result snapshot shape before any builder code.

### Option C: Minimal Generated Severity Shadow Builder Implementation

Only after builder planning and snapshot / input decisions pass, implement a Node-only, read-only, debug-only builder with no runtime / generated / golden writes.

Recommendation:

建议先由用户 + ChatGPT review 本 builder planning。如果通过，下一步优先做 Sample Result Snapshot Planning，而不是直接实现 builder。
