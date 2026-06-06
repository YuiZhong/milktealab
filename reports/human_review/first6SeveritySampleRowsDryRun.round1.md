# First 6 Severity Sample Rows Dry-Run Round 1｜第一批 Severity 样例行试填

## 0. 文件定位

本文件是 v0.0.8 planning-only 阶段的人类审批 / 制作人评审材料，用于验证 `reports/human_review/candidateSeveritySampleSheetShape.round1.md` 规划的 severity sample sheet shape 是否够用。

本文件只为第一批 6 个 `proposedDraftId` 试填 light / medium / heavy 示例行。

本文件不是：

- CSV
- JSON / JS
- Google Sheets 文件
- schema
- validator input
- allowed values
- generated severity data
- runtime data
- official threshold table
- official scoreMultiplier table
- official feedback intensity table
- golden expected source

本文件不创建真实 CSV / JSON / JS / schema / validator，不填写正式 threshold，不填写正式 `scoreMultiplier`，不填写正式 feedback intensity，不生成 generated severity，不影响 runtime / final result / golden expected。

所有 sample rows 都是 illustrative / draft / notApproved。

所有 rows 必须保持：

- `enabled=false`
- `canEnterGeneratedSeverity=false`
- `canEnterShadow=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`

如本文出现示意区间，均为 `illustrative_only / notApproved`，不是正式阈值。

## 1. 制作人怎么看本表

制作人主要看：

- 轻 / 中 / 重体感是否符合真实喝饮品的感觉。
- 这条机制的 `notThis` 是否能防止误伤真实饮品。
- 哪些轻度表现应该只是提示，不应该重罚。
- 哪些重度表现才应该进入强反馈或高 severity 讨论。
- 哪些顾客偏好 / tolerance 可能影响同一强度的评价。

制作人不需要批准机器字段、正式阈值、正式 `scoreMultiplier` 或正式 feedback intensity。

本 dry-run 不把 high / medium / low 当成计算主数据。未来正式计算必须读取 numeric triggerMetric / numeric summary；中文档位和 light / medium / heavy 只是 human-readable label / review hint。

## 2. Shared gate values for every sample row

下表适用于本文所有 18 条 sample rows。

| gate | value |
|---|---|
| `enabled` | false |
| `reviewStatus` | dry_run_notApproved |
| `thresholdStatus` | illustrative_only_notApproved |
| `scoreMultiplierStatus` | blank_tbd_notApproved |
| `feedbackIntensityStatus` | draft_notApproved |
| `canEnterGeneratedSeverity` | false |
| `canEnterShadow` | false |
| `canAffectRuntime` | false |
| `canChangeGoldenExpected` | false |
| `nextRequiredGate` | user + ChatGPT review of dry-run shape and sample rows |

## 3. Dry-run rows

### 3.1 `taste_sweet_overload`

Mechanism draft: 甜度过载。甜味强到压住饮品平衡，但不按糖 / 蜂蜜 / 糖浆 / 果酱等具体来源拆机制。

Primary direction: `sweetnessLoad`

Preference note: 高甜可能是部分客群偏好，轻 / 中 / 重需要保留 tolerance 空间。

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-001 | `taste_sweet_overload` | 甜度过载 | taste | `sweetnessLoad` | light / 轻度 | light_draft | 明显偏甜，但仍可能被高甜偏好客群接受。 | illustrative_only: lower sweet overload band | blank / TBD | mild_draft | 不是糖浆 / 蜂蜜 / 果酱专属事故；不是所有高甜都差。 |
| SEV-R1-002 | `taste_sweet_overload` | 甜度过载 | taste | `sweetnessLoad` | medium / 中度 | medium_draft | 甜味压住茶 / 奶 / 果味，喝完有明显腻感。 | illustrative_only: middle sweet overload band | blank / TBD | clear_draft | 不是单一甜味来源事故；不是普通甜口饮品。 |
| SEV-R1-003 | `taste_sweet_overload` | 甜度过载 | taste | `sweetnessLoad` | heavy / 重度 | heavy_draft | 甜到像糖浆饮料，其他层次基本被盖掉。 | illustrative_only: upper sweet overload band | blank / TBD | strong_draft | 不是“喜欢甜”的客群偏好本身；不是 feedback 文案梗。 |

### 3.2 `taste_acid_overload`

Mechanism draft: 酸度过载。酸味从清爽偏酸走向失衡，但不按柠檬 / 山楂 / 百香果等具体酸源拆机制。

Primary direction: `acidityLoad`

Boundary note: 需要保护清爽偏酸，不误伤正常水果茶。

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-004 | `taste_acid_overload` | 酸度过载 | taste | `acidityLoad` | light / 轻度 | light_draft | 清爽偏酸，已经能感觉酸味偏前，但不一定是事故。 | illustrative_only: lower acid overload band | blank / TBD | mild_draft | 不是清爽水果茶；不是柠檬专属机制。 |
| SEV-R1-005 | `taste_acid_overload` | 酸度过载 | taste | `acidityLoad` | medium / 中度 | medium_draft | 明显太酸，酸味开始压住甜味、茶感或奶感。 | illustrative_only: middle acid overload band | blank / TBD | clear_draft | 不是山楂 / 百香果等酸源专属事故。 |
| SEV-R1-006 | `taste_acid_overload` | 酸度过载 | taste | `acidityLoad` | heavy / 重度 | heavy_draft | 酸度爆炸，入口刺激感强，整杯被酸味接管。 | illustrative_only: upper acid overload band | blank / TBD | strong_draft | 不是风味身份冲突；不是 novelty / weirdness。 |

### 3.3 `taste_bitter_overload`

Mechanism draft: 苦味过载。苦味负担过高，但不按茶 / 咖啡 / 抹茶 / 可可等来源拆机制。

Primary direction: `bitternessLoad`

Preference note: 咖啡、浓茶或苦味偏好客群可能接受更高苦味。

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-007 | `taste_bitter_overload` | 苦味过载 | taste | `bitternessLoad` | light / 轻度 | light_draft | 苦味明显，但可能像浓茶 / 咖啡风格。 | illustrative_only: lower bitter overload band | blank / TBD | mild_draft | 不是所有苦味都不好；不是茶事故。 |
| SEV-R1-008 | `taste_bitter_overload` | 苦味过载 | taste | `bitternessLoad` | medium / 中度 | medium_draft | 苦味压住甜、奶或风味层次，普通客群会觉得偏难喝。 | illustrative_only: middle bitter overload band | blank / TBD | clear_draft | 不是咖啡 / 抹茶 / 可可专属机制。 |
| SEV-R1-009 | `taste_bitter_overload` | 苦味过载 | taste | `bitternessLoad` | heavy / 重度 | heavy_draft | 苦到整杯发硬，其他体验被苦味统治。 | illustrative_only: upper bitter overload band | blank / TBD | strong_draft | 不是客群 tolerance 本身；不是单一原料比例 if。 |

### 3.4 `taste_astringency_overload`

Mechanism draft: 涩感 / 收敛感过强。口腔发干、发紧、刮舌，但不并回苦味，也不并回 generic strong stimulation。

Primary direction: `astringencyLoad`

Boundary note: 这是 taste / special sensation boundary；最终 source family 仍需后续 review。

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-010 | `taste_astringency_overload` | 涩感 / 收敛感过强 | taste / special sensation boundary | `astringencyLoad` | light / 轻度 | light_draft | 轻微发干，像茶感偏强的收敛尾巴。 | illustrative_only: lower astringency overload band | blank / TBD | mild_draft | 不是苦味过载；不是茶类专属事故。 |
| SEV-R1-011 | `taste_astringency_overload` | 涩感 / 收敛感过强 | taste / special sensation boundary | `astringencyLoad` | medium / 中度 | medium_draft | 明显涩感，口腔发紧，喝完有刮舌感。 | illustrative_only: middle astringency overload band | blank / TBD | clear_draft | 不是辣 / 麻 / 酒精灼烧；不是 generic strong stimulation umbrella。 |
| SEV-R1-012 | `taste_astringency_overload` | 涩感 / 收敛感过强 | taste / special sensation boundary | `astringencyLoad` | heavy / 重度 | heavy_draft | 强收敛感，像口腔被抽干，刮舌明显。 | illustrative_only: upper astringency overload band | blank / TBD | strong_draft | 不是按红茶 / 乌龙 / 咖啡拆机制。 |

### 3.5 `texture_low_drinkability`

Mechanism draft: 水泥感 / 粉泥感 / 低流动性。核心是粉泥、糊、低流动性、吸管吃力。

Primary direction: `lowFlowPenalty`

Supporting directions: `slurryLoad` / `pasteLoad` / `powderLoad`

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-013 | `texture_low_drinkability` | 水泥感 / 粉泥感 / 低流动性 | texture / drinkability | `lowFlowPenalty` | light / 轻度 | light_draft | 轻微粉感 / 沙感，流动性还在，但喝起来有粉浆尾巴。 | illustrative_only: lower low-flow band | blank / TBD | mild_draft | 不是小料固体很多；不是奶脂油腻；不是糖浆胶质黏稠。 |
| SEV-R1-014 | `texture_low_drinkability` | 水泥感 / 粉泥感 / 低流动性 | texture / drinkability | `lowFlowPenalty` | medium / 中度 | medium_draft | 粉泥感明显，喝着费劲，吸管开始像在搬运糊状物。 | illustrative_only: middle low-flow band | blank / TBD | clear_draft | 不是芋泥 / 奥利奥 / 粉类来源专属事故；不是 standalone straw resistance mechanism。 |
| SEV-R1-015 | `texture_low_drinkability` | 水泥感 / 粉泥感 / 低流动性 | texture / drinkability | `lowFlowPenalty` | heavy / 重度 | heavy_draft | 水泥感，几乎吸不上来，饮用性被粉泥 / 糊状结构压垮。 | illustrative_only: upper low-flow band | blank / TBD | strong_draft | 不是八宝粥感；不是“料多但还能喝”的固体负载。 |

### 3.6 `texture_solid_overload`

Mechanism draft: 八宝粥感 / 固体小料负载过高。核心是固体小料多、要嚼、液体支撑不足，饮品形态像甜品碗。

Primary direction: `solidLoad`

Supporting directions: `chewLoad` / `liquidSupport`

| rowId | proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | humanSeverityLabel | severityLevelDraft | severityExperience | thresholdDraftRange | scoreMultiplierDraft | feedbackIntensityDraft | notThis |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SEV-R1-016 | `texture_solid_overload` | 八宝粥感 / 固体小料负载过高 | texture / drink structure | `solidLoad` | light / 轻度 | light_draft | 小料略多，咀嚼感强，但仍像饮品。 | illustrative_only: lower solid-load band | blank / TBD | mild_draft | 不是粉泥低流动性；不是水泥感。 |
| SEV-R1-017 | `texture_solid_overload` | 八宝粥感 / 固体小料负载过高 | texture / drink structure | `solidLoad` | medium / 中度 | medium_draft | 像甜品碗，喝一口要嚼很久，液体支撑开始不够。 | illustrative_only: middle solid-load band | blank / TBD | clear_draft | 不是珍珠 / 芋圆 / 布丁等具体小料专属事故。 |
| SEV-R1-018 | `texture_solid_overload` | 八宝粥感 / 固体小料负载过高 | texture / drink structure | `solidLoad` | heavy / 重度 | heavy_draft | 八宝粥感，饮品形态被固体小料压垮，像在吃而不是喝。 | illustrative_only: upper solid-load band | blank / TBD | strong_draft | 不等于一定吸不上来；不是奶脂油腻或糖浆胶质黏稠。 |

## 4. Gate matrix for all rows

| rowId | enabled | canEnterGeneratedSeverity | canEnterShadow | canAffectRuntime | canChangeGoldenExpected | reviewStatus |
|---|---|---|---|---|---|---|
| SEV-R1-001 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-002 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-003 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-004 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-005 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-006 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-007 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-008 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-009 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-010 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-011 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-012 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-013 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-014 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-015 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-016 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-017 | false | false | false | false | false | dry_run_notApproved |
| SEV-R1-018 | false | false | false | false | false | dry_run_notApproved |

## 5. What this dry-run checks

This dry-run suggests the planned shape can carry:

- proposed draft identity
- source layer
- trigger metric direction
- human-readable light / medium / heavy experience
- illustrative-only threshold placeholder
- blank / TBD score multiplier
- draft-only feedback intensity direction
- `notThis` boundary
- false dangerous gates

It also shows where the current shape may need future review:

- taste sweetness / bitterness require customer tolerance notes.
- taste acidity needs a freshness boundary.
- astringency keeps a taste / special sensation source-layer question.
- low drinkability must stay separate from solid load, dairy greasiness, and syrupy stickiness.
- solid overload must state that solid load does not necessarily mean impossible to suck up.

## 6. Explicit non-goals

本 dry-run 不做：

- 不创建 CSV / JSON / JS。
- 不创建 schema / validator。
- 不创建 metric registry。
- 不生成 generated severity。
- 不填写正式 threshold。
- 不填写正式 `scoreMultiplier`。
- 不填写正式 feedback intensity。
- 不批准 `severityLevel` enum。
- 不批准 `proposedDraftId` 为 stable ID。
- 不创建 registry candidate。
- 不生成 allowed values。
- 不改 runtime / core / data / generated。
- 不改 golden expected。
- 不开放 generated severity shadow / partial / active takeover。
- 不把示例行写成正式规则。

## 7. Recommended next options

以下是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT review this dry-run

审阅 18 条示例行是否能让制作人看懂轻 / 中 / 重体感、`notThis` 和误伤风险。

### Option B｜Refine sample sheet shape

如果本 dry-run 暴露字段过重、字段不足或中文解释不够清楚，先回到 `candidateSeveritySampleSheetShape.round1.md` 调整形状。

### Option C｜Future CSV / JSON sample sheet planning

只有在用户明确批准后，才规划真实 CSV / JSON 文件形态。

仍不直接进入 schema / validator / generated severity / runtime。

Recommendation:

建议先由用户 + ChatGPT 审阅本 dry-run。若 18 条示例行能被制作人顺畅理解，再讨论是否进入真实 sheet / CSV / JSON shape planning。
