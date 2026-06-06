# Severity Sample Sheet CSV / JSON Shape Planning Round 1｜Severity 样例表 CSV / JSON 形状规划

## 0. 文件定位

本文件只规划 future severity sample sheet 的 CSV / JSON 文件形状。

本文件不是：

- CSV
- JSON / JS
- schema
- validator input
- generated severity data
- runtime data
- official threshold table
- official scoreMultiplier table
- golden expected source

本文件不创建真实文件，不实现 validator，不生成 generated severity，不影响 runtime / data / golden，不自动修改 final score / final feedback / final accident / golden expected，也不开放 implementation。

## 1. 为什么需要这一步

`reports/human_review/candidateSeveritySampleSheetShape.round1.md` 已规划人类可读表格结构。

`reports/human_review/first6SeveritySampleRowsDryRun.round1.md` 已用 18 条示例行验证表格可以承载第一批 6 个 `proposedDraftId` 的 light / medium / heavy dry-run。

`reports/human_review/severityValidatorLintPlanning.round1.md` 已规划 future lint / validator 要检查什么。

在创建真实 sample CSV / JSON 前，需要先规划文件形状，避免未来表格一落地就被误读成 runtime data、allowed values、official threshold table 或 generated severity source。

## 2. CSV Shape Planning

本节只规划 future CSV 可以有哪些列，不创建 CSV。

### 2.1 Human-readable columns｜人类可读列

建议列：

- `displayNameDraft`
- `mechanismDefinition`
- `humanSeverityLabel`
- `severityExperience`
- `notThis`
- `producerNotes`

这些列给制作人看，用于判断机制定义、轻 / 中 / 重体感、误伤风险和中文备注。它们不作为机器计算主数据。

### 2.2 Identity / source columns｜身份与来源列

建议列：

- `rowId`
- `proposedDraftId`
- `targetCandidateRef`
- `idFamily`
- `candidateType`
- `sourceLayer`
- `sourceReviewFile`
- `sourceReviewItems`

边界：

- `rowId` 只是 CSV 行编号，不是 stable ID。
- `displayNameDraft` 不能当 key。
- `proposedDraftId` 仍不是 approved stable ID。
- source columns 只用于追踪来源，不创建 allowed values。

### 2.3 Metric / numeric columns｜指标与数值列

建议列：

- `triggerMetricDirection`
- `numericSourceStatus`
- `numericSummaryRefDraft`
- `metricDirection`
- `thresholdDraftMin`
- `thresholdDraftMax`
- `thresholdOperatorDraft`
- `thresholdStatus`

边界：

- 本阶段只允许 illustrative / draft / notApproved。
- high / medium / low 不得作为 numeric source。
- threshold draft 若出现，必须明确不是正式 threshold。
- numeric summary / triggerMetric 仍是 future planning，不是 runtime source。

### 2.4 Score / feedback / preference columns｜评分 / 文案 / 偏好列

建议列：

- `severityLevelDraft`
- `severityStatus`
- `scoreMultiplierDraft`
- `scoreMultiplierStatus`
- `feedbackIntensityDraft`
- `feedbackIntensityStatus`
- `preferenceNotes`
- `feedbackCopyBoundary`

边界：

- `scoreMultiplierDraft` 初期建议 blank / TBD。
- `feedbackIntensityDraft` 不是正式反馈文案。
- preference notes 只记录 future tolerance / preference 空间，不创建顾客系统。
- feedback copy 不能反向创造新 mechanism ID。

### 2.5 Gate / review columns｜安全门与审查列

建议列：

- `enabled`
- `reviewStatus`
- `canEnterGeneratedSeverity`
- `canEnterShadow`
- `canAffectRuntime`
- `canChangeGoldenExpected`
- `nextRequiredGate`
- `reviewNotes`

边界：

- 本阶段 `enabled` 必须为 false。
- 所有 dangerous gates 必须为 false。
- review columns 只记录审查状态，不批准 runtime / generated severity。

## 3. CSV Human-Editing Rules｜人类编辑规则

CSV 给人类 / Google Sheets / Excel 审阅时必须中文友好。

如果未来创建 CSV，应使用 UTF-8 with BOM，避免中文乱码。

表格顶部或配套 docs 必须有中文字段说明。英文 key 可以保留给机器，但人类入口必须有中文解释。

`notes` / `producerNotes` 可用自然中文，不要求用户写枚举。

中文显示名、中文备注、反馈文案不能成为主键。

CSV 不能直接被 runtime 读取。CSV 只是 human editing source / review source，不是 generated severity data，也不是 allowed values。

## 4. JSON Shape Planning

本节只规划 future JSON 可如何承载 CSV 内容，不创建 JSON。

建议 JSON shape：

```json
{
  "schemaVersion": "severitySampleRows.draft.v0.0.8",
  "sourceType": "planning_sample",
  "affectsRuntime": false,
  "generatedSeverityEnabled": false,
  "rowsById": {},
  "rowIdsByProposedDraftId": {},
  "rowIdsBySourceLayer": {},
  "metadata": {}
}
```

边界：

- JSON 只是 future generated / normalized shape 草案。
- `rowsById` key 使用 `rowId`，但 `rowId` 仍不是 stable ID。
- `proposedDraftId` 仍不是 approved stable ID。
- JSON 不等于 generated severity。
- JSON 不可被 runtime 读取。
- `affectsRuntime` 必须为 false。
- `generatedSeverityEnabled` 必须为 false。

## 5. CSV -> JSON Conversion Boundary

未来如果从 CSV 转 JSON，转换层只能做通用格式化。

允许：

- TRUE / FALSE 转 boolean。
- 空字符串转 null。
- 行按 `rowId` 建索引。
- 按 `proposedDraftId` / `sourceLayer` 分组。
- 保留中文 notes。
- 写入 readonly metadata。

禁止：

- 自动批准 threshold。
- 自动生成 `scoreMultiplier`。
- 自动改 `enabled=true`。
- 自动打开 generated severity / shadow / runtime gate。
- 根据 `displayNameDraft` 或中文 notes 判断机制。
- 根据某条 sample row 写特殊 if。
- 从 CSV 直接生成 runtime data。

## 6. Required Validation Before Any Real CSV / JSON

未来如果真的创建 CSV / JSON，必须先有 validator / lint。

至少应检查：

- required columns 存在。
- `rowId` 唯一。
- `proposedDraftId` 在已审阅 proposal list。
- `enabled=false`。
- all dangerous gates false。
- `thresholdStatus` 非 approved。
- `scoreMultiplierStatus` 非 approved。
- threshold draft 若存在，必须是 illustrative / notApproved。
- high / medium / low 不能当 numeric source。
- `displayNameDraft` / `rowId` 不能当 stable ID。
- source refs 可追溯。
- UTF-8 with BOM / 中文可读性。

本轮不实现 validator。

## 7. Relation to First 6 Dry-Run Rows

`reports/human_review/first6SeveritySampleRowsDryRun.round1.md` 的 18 条 rows 可作为 future CSV / JSON 的 shape reference。

本轮不把 18 条 rows 搬运成 CSV / JSON。

本轮也不把 18 条 rows 升级为 approved rules。

未来若创建真实 sample file，仍必须另开任务、运行 validator / lint，并保持 gates false。

## 8. Recommended Next Step

以下是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT Review This CSV / JSON Shape Planning

审阅 shape 是否够轻、是否中文友好、是否边界足够安全。

### Option B｜Minimal Validator Stub Planning

设计未来第一版 validator stub 的输入 / 输出 / 报错格式。

本 option 不实现脚本。

### Option C｜Create Sample CSV / JSON Files

只有用户明确批准后才可考虑。

即使未来创建真实文件，也仍不能接 runtime / generated severity。

Recommendation:

建议下一步做 Minimal Validator Stub Planning，而不是直接创建 CSV / JSON 文件。先把 validator stub 设计清楚，再考虑真实文件。
