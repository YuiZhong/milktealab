# Minimal Severity Validator Stub Planning Round 1｜最小 Severity Validator Stub 规划

## 0. 文件定位

本文件只规划未来最小 severity validator / lint 脚本的输入、输出、CLI 和报错格式。

本文件不是：

- validator script
- schema
- CSV / JSON / JS
- generated severity data
- runtime data
- allowed values
- official threshold table
- official scoreMultiplier table
- golden expected source

本轮不创建脚本，不创建真实 CSV / JSON，不生成 generated severity，不影响 runtime / data / golden，不自动修改 final score / final feedback / final accident / golden expected，也不开放 implementation。

## 1. 为什么需要这一步

`reports/human_review/severityValidatorLintPlanning.round1.md` 已规划 error / warning / info 检查项。

`reports/human_review/severitySampleSheetCsvJsonShapePlanning.round1.md` 已规划 future CSV / JSON shape。

在创建真实 sample CSV / JSON 或 validator script 前，需要先定义最小 validator stub 的输入、输出和边界。

目标是避免第一版 validator 过重、误判机制、偷偷变成 generated severity 管线，或让 future sample rows 被误读成 runtime data。

## 2. First Validator Stub Scope

未来第一版 validator 只应做：

- 读取一个 future severity sample CSV 或 JSON。
- 检查 required columns / fields。
- 检查 `rowId` 唯一。
- 检查 `proposedDraftId` 是否在已审阅 proposal list 中。
- 检查 `enabled` 是否 false。
- 检查 dangerous gates 是否 false。
- 检查 `thresholdStatus` / `scoreMultiplierStatus` 是否未 approved。
- 检查 threshold draft 是否标 illustrative / draft / notApproved。
- 检查 high / medium / low 没有被当 numeric source。
- 检查 `displayNameDraft` / `rowId` 没有被当 stable ID。
- 输出 human-friendly error / warning / info。

第一版 validator 不应做：

- 不读取 runtime recipe。
- 不运行 `tasteJudge`。
- 不生成 generated severity。
- 不计算真正 severity。
- 不判断某杯饮品是否事故。
- 不修改 CSV / JSON。
- 不修改 source data。
- 不修改 golden expected。
- 不输出 shadow result。
- 不接 runtime。

## 3. Future Input Shape

未来 CLI 可以支持类似输入：

```bash
node scripts/content/validateSeveritySampleRows.js content_sheets/examples/severity_sample_rows.sample.csv
```

或：

```bash
node scripts/content/validateSeveritySampleRows.js content_sheets/examples/severity_sample_rows.sample.json
```

本轮不创建 `scripts/content/validateSeveritySampleRows.js`，也不创建 sample CSV / JSON。

输入边界：

- CSV / JSON 只是 human editing source / planning sample source。
- runtime 不读取 CSV / JSON。
- validator 读取的是 sample sheet rows，不读取游戏 runtime result。
- `proposedDraftId` list 必须来自已审阅 planning material 或 future explicit allowed planning list，不得由 validator 自己发明。

## 4. Future Output Shape

未来 validator console 输出可以类似：

```text
Severity sample rows validation
Rows: 18
Errors: 0
Warnings: 3
Info: 6

Errors:
- [SEV-R1-004] canAffectRuntime is true, but dry-run rows cannot affect runtime.

Warnings:
- [SEV-R1-004] acid light severity may be too harsh; review freshness boundary.

Info:
- proposedDraftId coverage: taste_sweet_overload=3, taste_acid_overload=3 ...
```

输出原则：

- error 必须阻塞后续 build / generated severity planning。
- warning 需要用户 + ChatGPT review，但不一定阻塞。
- info 只做统计。
- 报错必须中文友好，或至少给中文解释。
- 不要只输出 `invalid enum` 这类机器话。

## 5. Exit Code Planning

未来退出码建议：

- errors > 0：exit 1。
- errors = 0：exit 0。
- warnings 默认不阻塞。
- 未来可考虑 `--strict` 让 warnings 变阻塞，但第一版不建议过度设计。

本轮不实现 CLI。

## 6. Minimum Check Groups

### 6.1 Structure Checks

- required columns / fields。
- `rowId` unique。
- required fields non-empty。

### 6.2 Gate Checks

- `enabled=false`。
- `canEnterGeneratedSeverity=false`。
- `canEnterShadow=false`。
- `canAffectRuntime=false`。
- `canChangeGoldenExpected=false`。

### 6.3 Status Checks

- `thresholdStatus` not approved / active。
- `scoreMultiplierStatus` not approved / active。
- `feedbackIntensityStatus` not approved / active。

### 6.4 Identity Checks

- `proposedDraftId` known in current reviewed proposal list。
- `rowId` not used as stable ID。
- `displayNameDraft` not used as key。
- reports / concept refs not treated as allowed values。

### 6.5 Numeric-First Checks

- high / medium / low not used as numeric source。
- threshold draft, if present, is illustrative / notApproved。
- `numericSourceStatus` not approved unless future source exists。

### 6.6 Boundary Warnings

- `notThis` missing or too short。
- `preferenceNotes` missing for preference-sensitive mechanisms。
- `taste_acid_overload` light may be too harsh。
- `texture_solid_overload` missing “not necessarily impossible to suck up”。
- `texture_low_drinkability` boundary unclear against solid / dairy / syrupy texture。
- `mouthCoating` shared boundary lacks note if used。

## 7. Human-Friendly Messages

未来报错要面向非程序员。

不要只写：

```text
invalid enum
```

要写：

```text
这一行把 canAffectRuntime 设成 true 了，但当前 dry-run 不允许影响玩家结果。
```

不要只写：

```text
threshold approved forbidden
```

要写：

```text
这一行的 thresholdStatus 看起来像 approved，但当前所有阈值都只能是 illustrative / notApproved。
```

第一版 validator 的价值是让制作人和 ChatGPT 快速看到哪里误开 gate、哪里把草稿写成正式规则、哪里把中文显示名当 key，而不是把表格变成程序员专用材料。

## 8. First Implementation Guardrail

如果未来实现第一版 validator，仍必须另开任务。

未来第一版实现最多应允许：

- 新增 `scripts/content/validateSeveritySampleRows.js`。
- 读取 explicit sample CSV / JSON。
- 输出 error / warning / info。
- 执行 `node --check`。
- 用最小 sample file 做 validation。

未来第一版实现仍不允许：

- 改 runtime / data / generated / golden。
- 生成 generated severity。
- 接 shadow。
- 创建 active validator allowed values。
- 读取 report markdown 作为 validator input。

如果没有真实 sample file，应先创建 sample file planning / sample file task，不要让 validator 读取 report markdown。

## 9. Recommended Next Step

以下是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT Review This Minimal Validator Stub Planning

审阅第一版 validator 是否够轻、是否不误判机制。

### Option B｜Create Severity Sample CSV / JSON Example Files

在 shape 和 stub planning 通过后，创建真实 sample CSV / JSON。

仍不实现 validator。

### Option C｜Implement Minimal Validator Stub

只有在 sample files 存在，或同一明确任务同时批准创建 sample files 后，才考虑实现。

不接 runtime / generated severity。

Recommendation:

建议下一步先由用户 + ChatGPT review 本 stub planning。若通过，下一步优先创建 severity sample CSV / JSON example files，而不是直接实现 validator。
