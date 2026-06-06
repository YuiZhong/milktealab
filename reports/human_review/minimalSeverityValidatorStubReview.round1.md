# Minimal Severity Validator Stub Review Round 1｜最小 Severity Validator Stub 审阅记录

## 0. 文件定位

本文件只记录用户 + ChatGPT 对第一版 `scripts/content/validateSeveritySampleRows.js` 的审阅结论。

本文件不是：

- validator implementation task
- schema
- generated severity data
- runtime data
- allowed values
- official threshold table
- official scoreMultiplier table
- official feedback intensity table
- runtime validator
- active validator

本文件不批准正式 threshold / scoreMultiplier / feedback intensity，不自动修改 final score / final feedback / final accident / golden expected，也不开放 shadow / partial / active takeover。

## 1. Review conclusion

`scripts/content/validateSeveritySampleRows.js` 可作为第一版 minimal offline validator / lint stub。

它当前只校验 `content_sheets/examples/severity_sample_rows.sample.csv` 和 `content_sheets/examples/severity_sample_rows.sample.json` 这类 planning sample。

它可以作为后续真实 sample CSV / JSON workflow 的第一道防呆工具，防止 planning examples 被误读成正式 threshold、正式 scoreMultiplier、generated severity、runtime data 或 allowed values。

它不是 runtime validator，不是 active validator，不是 registry validator，也不是 generated severity validator。

## 2. Accepted capabilities

当前已接受能力：

- 支持 CSV / JSON 两种输入。
- CSV 检查 UTF-8 with BOM。
- 检查 required fields。
- 检查 18 rows。
- 检查 6 个 known proposedDraftId：
  - `taste_sweet_overload`
  - `taste_acid_overload`
  - `taste_bitter_overload`
  - `taste_astringency_overload`
  - `texture_low_drinkability`
  - `texture_solid_overload`
- 检查 dangerous gates 必须为 false：
  - `enabled`
  - `canEnterGeneratedSeverity`
  - `canEnterShadow`
  - `canAffectRuntime`
  - `canChangeGoldenExpected`
- 检查 `thresholdStatus` / `scoreMultiplierStatus` / `feedbackIntensityStatus` 未批准。
- 检查 `scoreMultiplierDraft` 不应是正式数字。
- 检查 JSON metadata，包括：
  - `runtimeData=false`
  - `officialThresholds=false`
  - `officialScoreMultipliers=false`
  - `containsGeneratedSeverity=false`
  - `canChangeGoldenExpected=false`
- 输出 human-friendly errors / warnings / info。
- warning 默认不阻塞；error exit 1。
- CSV parser 不是简单 `split(",")`，可以处理基本引号 / 逗号 / 换行。

## 3. Accepted boundaries

该 validator 不读取 runtime recipe。

该 validator 不运行 `tasteJudge`。

该 validator 不生成 generated severity。

该 validator 不计算真正 severity。

该 validator 不判断某杯饮品是否事故。

该 validator 不修改 CSV / JSON。

该 validator 不修改 source data。

该 validator 不修改 golden expected。

该 validator 不输出 shadow result。

该 validator 不接 runtime。

该 validator 不创建 allowed values。

该 validator 不把 `proposedDraftId` 升级成 stable ID。

## 4. Non-blocking future hardening

以下是非阻塞后续增强项，不影响当前 checkpoint：

- 可以考虑精确检查 JSON `schemaVersion=severitySampleRows.sample.v0.0.8`。
- 可以考虑精确检查 JSON `sourceType=planning_sample`。
- 可以考虑未来增加 `--strict`，但第一版不必做。
- 可以考虑未来接入更多 sample 文件，但必须另开任务。
- 可以考虑未来 hardening README / CLI 输出，但不阻塞当前 checkpoint。

## 5. Recommended next step

以下是候选，不是命令，不开放 implementation。

### Option A: Pre-Shadow Gate Review / Source-of-truth Boundary Check

确认当前 sample validator stub + sample CSV / JSON 是否足够进入 shadow shape planning。

需要判断：

- 哪些 debt 会阻塞 first shadow。
- 哪些 debt 只阻塞 generated build。
- 哪些 debt 只阻塞 partial / active takeover。
- source-of-truth / registry / validator / sample sheet 边界是否足够清楚。

本 option 仍不实现 shadow，不生成 runtime data。

### Option B: Generated Severity Shadow Shape Planning

设计 future `generatedSeverityShadow` 输出结构。

应在 Pre-Shadow Gate Review / Source-of-truth Boundary Check 通过后再做。

不实现 shadow，不生成 runtime data。

### Option C: Severity Sample Data Build Planning

设计 future CSV / JSON 如何被 build 成 normalized data。

不生成 generated severity，不接 runtime。

### Option D: Validator Hardening

补 schemaVersion / sourceType 精确检查。

只有用户明确需要时再做。

Recommendation:

建议下一步先做 Pre-Shadow Gate Review / Source-of-truth Boundary Check，而不是直接进入 Generated Severity Shadow Shape Planning。
