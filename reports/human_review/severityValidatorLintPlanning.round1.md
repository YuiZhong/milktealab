# Severity Validator / Lint Planning Round 1｜Severity 防呆检查规划

## 0. 文件定位

本文件是 v0.0.8 planning-only 阶段的 Severity Validator / Lint Planning report。

它只规划未来 validator / lint 应该检查哪些错误、提醒哪些风险、汇总哪些信息；它不是：

- validator script
- schema
- CSV / JSON / JS
- generated severity data
- runtime data
- allowed values
- official threshold table
- official scoreMultiplier table
- official feedback intensity table
- golden expected source

本文件不实现 validator，不生成 generated severity，不影响 final score / final feedback / final accident / golden expected。

## 1. 为什么需要这一刀

`reports/human_review/first6SeveritySampleRowsDryRun.round1.md` 已为第一批 6 个 `proposedDraftId` 试填 18 条 light / medium / heavy dry-run 示例行。

`reports/human_review/first6SeveritySampleRowsReview.round1.md` 已记录用户 + ChatGPT 接受这些示例行作为 planning checkpoint。

下一步不能直接进入 CSV / generated severity。进入任何 sheet、schema、validator 或 generated severity 之前，必须先明确 future validator / lint 要防哪些错误，避免 dry-run 材料被误读成正式阈值、正式 `scoreMultiplier`、正式 allowed values 或 runtime data。

## 2. Lint 设计原则

- Validator / lint 是防错层，不是机制判断层。
- Validator / lint 只报告 error / warning / info，不自动修复。
- Validator / lint 不决定一杯饮品是否事故。
- Validator / lint 不调 threshold、`scoreMultiplier` 或 feedback copy。
- Validator / lint 不为具体样例、具体原料组合或中文文案写例外规则。
- Validator / lint 不输出 runtime data。
- Validator / lint 不开放 generated severity、generated severity shadow、partial takeover 或 active takeover。

## 3. Error Checks｜必须阻止的错误

### 3.1 Structure / Gate Errors

未来 lint 应将以下情况视为 error：

- 缺少 required columns。
- required field 为空。
- `rowId` 重复。
- `proposedDraftId` 为空。
- `triggerMetricDirection` 为空。
- `enabled` 不是 `false`。
- dangerous gates 没有保持 false：
  - `canEnterGeneratedSeverity`
  - `canEnterShadow`
  - `canAffectRuntime`
  - `canChangeGoldenExpected`

### 3.2 Identity / ID Errors

未来 lint 应将以下情况视为 error：

- `proposedDraftId` 不在当前已审阅 proposal list 中。
- 使用 `displayNameDraft` 作为 key。
- 使用 `rowId` 作为 stable ID。
- 缺少 source refs，例如 source review file、source concept ref 或 dry-run 来源。
- 将 unknown stable ID 当作 approved。
- 将 reports、concept ref 或 dry-run row 当作 allowed values。

### 3.3 Numeric / Threshold Errors

未来 lint 应将以下情况视为 error：

- `thresholdStatus` 被标成 approved / active。
- draft threshold min / max 没有明确 `illustrative` / `draft` / `notApproved` 语境。
- 阈值看起来像正式值，但没有 human note 说明它只是示意。
- `thresholdMin` 大于 `thresholdMax`。
- 将 high / medium / low 当作 numeric source。
- `numericSourceStatus` 被标成 approved，但没有正式来源。

### 3.4 ScoreMultiplier / Feedback Errors

未来 lint 应将以下情况视为 error：

- `scoreMultiplierStatus` 被标成 approved / active。
- `scoreMultiplierDraft` 填入正式数字，但没有 draft / notApproved 语境。
- `feedbackIntensityStatus` 被标成 approved。
- feedback wording 反向创造了新 mechanism ID。
- 涉及 feedback intensity 的 row 缺少 `feedbackCopyBoundary`。

### 3.5 Runtime / Generated Errors

未来 lint 应将以下情况视为 error：

- 任一 row 允许进入 generated severity。
- 任一 row 允许进入 generated severity shadow。
- 任一 row 允许影响 runtime。
- 任一 row 允许修改 golden expected。
- 相关 gate 字段出现 `true`。

## 4. Warning Checks｜需要制作人 / ChatGPT 复看的风险

未来 lint 可将以下情况视为 warning：

- `notThis` 太短，或没有覆盖相邻机制。
- preference-sensitive mechanism 缺少 `preferenceNotes`。
- `taste_acid_overload` 的 light row 写得太像事故，可能误伤清爽果茶。
- `texture_solid_overload` 缺少“小料多不一定吸不上来”边界。
- `texture_low_drinkability` 与固体小料、奶脂油腻、糖浆胶质黏稠的边界不清。
- `taste_astringency_overload` 缺少 taste / special sensation boundary。
- `severityExperience` 太像正式反馈文案。
- `scoreMultiplier` blank / TBD 可以接受，但有 threshold draft 却没有 review notes 时应提醒。
- numeric threshold 缺少“illustrative only”人类说明。
- `mouthCoating` 同时服务 dairy fat / gummy sticky 等方向时，缺少 shared metric boundary note。

## 5. Info Checks｜只做汇总，不阻止

未来 lint 可汇总以下 info：

- total rows。
- rows per `proposedDraftId`。
- coverage per `severityLevelDraft`。
- `enabled=false` count。
- dangerous gates false count。
- rows with `thresholdDraft`。
- `scoreMultiplier` blank / TBD count。
- `preferenceNotes` coverage。
- `notThis` coverage。

这些 info 只帮助制作人和 ChatGPT 看表，不代表通过或批准。

## 6. First Implementation Boundary｜未来第一版实现边界

如果未来另开任务实现最小 validator / lint，第一版只应读取 future sample sheet / dry-run rows。

第一版可以检查：

- 表结构。
- ID / source refs。
- dangerous gates。
- status 字段。
- numeric-first boundary。
- displayName-key prevention。

第一版不应：

- 读取 runtime recipes。
- 运行 `tasteJudge`。
- 生成 generated severity。
- 修改 CSV / JSON / source files。
- 修改 golden expected。
- 输出 shadow result。
- 影响 runtime。

本文件本身不实现第一版 validator。

## 7. Human-Friendly Error Wording｜给非程序员看的报错方式

未来 lint 报错应尽量让制作人看得懂。

不要只写：

```text
invalid enum
```

应写成类似：

```text
这一行把 canAffectRuntime 设成 true 了，但当前 dry-run 不允许影响玩家结果。
```

不要只写：

```text
thresholdStatus invalid
```

应写成类似：

```text
这一行的阈值看起来像正式值，但状态没有标成 illustrative_only / notApproved。
```

Lint 的目标是帮人类及时发现误开 gate、误把草稿当正式规则、误把中文文案当 key，而不是给制作人增加机器术语负担。

## 8. Recommended Next Step

以下是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT Review This Lint Planning

先审阅本文件，确认 future lint 的 error / warning / info 分类是否合理。

### Option B｜Severity Sample Sheet CSV / JSON Shape Planning

如果本 lint planning 通过，可以继续规划 future CSV / JSON shape，但仍不创建正式 CSV / JSON，不生成 generated severity。

### Option C｜Minimal Validator Stub Planning

可以规划未来最小 validator stub 的输入 / 输出 / 报错格式，但不实现脚本。

Recommendation:

建议下一步先由用户 + ChatGPT review 本 lint planning。通过后，再选择 CSV / JSON shape planning 或 minimal validator stub planning；不要直接实现 validator，也不要直接进入 generated severity。
