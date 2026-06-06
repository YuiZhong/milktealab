# Candidate Severity Sample Sheet Shape Round 1｜Severity 样例表形状规划

## 0. 文件定位

本文件只规划 future severity sample sheet / Google Sheets / CSV 的人类可读表格形状。

本文件不是：

- 真实 CSV
- Google Sheets 文件
- JSON / JS
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

后续若要创建真实 sample sheet / CSV / JSON / validator / generated severity shadow，必须另开任务并由用户明确批准。

## 1. 为什么需要这一步

`reports/human_review/candidateSeverityRuleSchemaReview.round1.md` 已经规划 future severity rule row 字段，但字段较多。

`reports/human_review/registryCandidateFieldSplit.round1.md` 已确认：用户 / 制作人不应手填机器字段，也不应被英文 key 和安全 gate 淹没。

本轮目标是把未来 severity 表格拆成几个清楚区域：

- 人类可读区
- 身份与来源区
- 指标与数值区
- 评分、文案、偏好区
- 安全门与审查区

这样 future first 6 severity sample rows dry-run 可以在清晰结构下试填，同时避免填表地狱。

这一步仍然不填正式数值，不创建真实表格，不创建 validator，不生成 generated severity。

## 2. 中文字段速读 / 制作人可读性

| field | 中文解释 | 制作人是否需要手填 |
|---|---|---|
| `rowId` | 表格行编号，只是表格内部编号，不是系统 ID。 | 不手填。 |
| `targetCandidateRef` | 这行服务哪个候选机制，目前只能引用 proposal / candidate material。 | 不手填。 |
| `proposedDraftId` | 草案机制 ID，还不是正式 stable ID。 | 通常只审顺不顺眼。 |
| `displayNameDraft` | 中文显示名草案，给人看，不是主键。 | 可以审。 |
| `sourceLayer` | 主要来源层，例如 taste / texture / flavor。 | 可以审是否错层。 |
| `triggerMetricDirection` | 未来可能读取的指标方向，不是正式 triggerMetric。 | 可以审方向是否符合直觉。 |
| `numericSourceStatus` | 数值来源状态，例如 draft / missing / futureSummary。 | 不手填。 |
| `humanSeverityLabel` | 给人看的轻 / 中 / 重说明，不是计算主数据。 | 重点审。 |
| `severityLevelDraft` | 严重度草案词，不是正式枚举。 | 可以审体感。 |
| `thresholdDraftMin` / `thresholdDraftMax` | 示意阈值区间，本轮不填正式值。 | 通常不手填。 |
| `thresholdStatus` | 阈值状态，必须能表达 illustrative / tbd / notApproved。 | 不手填。 |
| `scoreMultiplierDraft` | 分数倍率草案，本轮不填正式值。 | 不手填。 |
| `scoreMultiplierStatus` | 分数倍率状态，必须能表达 blank / tbd / notApproved。 | 不手填。 |
| `feedbackIntensityDraft` | 未来文案强度草案，不是正式文案。 | 可以审语气方向。 |
| `preferenceNotes` | 顾客偏好 / tolerance 备注。 | 可以审方向。 |
| `notThis` | 这条规则不应该误判什么。 | 重点审。 |
| `reviewNotes` | 制作人 / ChatGPT 审查备注。 | 可以补中文自由备注。 |
| `enabled` | 是否启用；本阶段必须 false / draft-only。 | 不手填。 |
| `canEnterGeneratedSeverity` | 是否可进入 generated severity；本阶段必须 false。 | 不手填。 |
| `canEnterShadow` | 是否可进入 shadow；本阶段必须 false。 | 不手填。 |
| `canAffectRuntime` | 是否影响玩家结果；本阶段必须 false。 | 不手填。 |
| `canChangeGoldenExpected` | 是否可改 golden expected；本阶段必须 false。 | 不手填。 |

用户 / 制作人主要看中文解释、机制定义、轻中重体感、`notThis`、是否误伤真实饮品、是否需要顾客偏好。

用户不需要手填机器 gate、`rowId`、source refs、正式阈值或正式倍率。

英文 key 是给 Codex / future tooling 用的；人类入口必须中文友好。

## 3. 推荐表格结构

本节只规划 future sample sheet 分区，不创建真实表格。

### 3.1 Human-readable block｜人类可读区

建议列：

- `displayNameDraft`
- `mechanismDefinition`
- `humanSeverityLabel`
- `severityExperience`
- `notThis`
- `producerNotes`

用途：

- 给制作人判断“这个机制和轻中重是否符合直觉”。
- 帮助识别误伤真实饮品、边界混淆和文案体感问题。
- 不作为正式计算主数据。

### 3.2 Identity / source block｜身份与来源区

建议列：

- `rowId`
- `targetCandidateRef`
- `proposedDraftId`
- `idFamily`
- `candidateType`
- `sourceLayer`
- `sourceReviewFile`
- `sourceReviewItems`

用途：

- 追溯这行来自哪里。
- 防止 `displayNameDraft` / 中文名变成主键。
- 记录 proposal / review material 来源。
- `rowId` 只是表格内部编号，不是 stable ID。

### 3.3 Metric / numeric block｜指标与数值区

建议列：

- `triggerMetricDirection`
- `numericSourceStatus`
- `numericSummaryRefDraft`
- `metricDirection`
- `thresholdDraftMin`
- `thresholdDraftMax`
- `thresholdOperatorDraft`
- `thresholdStatus`

用途：

- 表示未来怎么用 numeric summary / numeric load 判断 severity。
- 本轮不填正式数值。
- high / medium / low 不能替代 numeric source。
- 如果 future dry-run 需要示意数值，必须同时标明 illustrative_only / draft / notApproved。

### 3.4 Score / feedback / preference block｜评分、文案、偏好区

建议列：

- `severityLevelDraft`
- `severityStatus`
- `scoreMultiplierDraft`
- `scoreMultiplierStatus`
- `feedbackIntensityDraft`
- `feedbackIntensityStatus`
- `preferenceNotes`
- `feedbackCopyBoundary`

用途：

- 规划未来 severity、扣分倍率、文案强度和顾客偏好如何连接。
- 本轮不填正式 `scoreMultiplier`。
- 本轮不填正式 feedback 文案。
- 顾客偏好只做 notes / future tolerance planning，不创建 customer system。

### 3.5 Gate / review block｜安全门与审查区

建议列：

- `enabled`
- `reviewStatus`
- `canEnterGeneratedSeverity`
- `canEnterShadow`
- `canAffectRuntime`
- `canChangeGoldenExpected`
- `nextRequiredGate`
- `reviewNotes`

用途：

- 防止 draft sample row 被误当 active rule。
- 本阶段所有 dangerous gates 必须 false。
- `enabled` 默认 false / draft-only。
- 只有后续明确任务和用户批准后，才允许进入真实 CSV / validator / generated severity shadow planning。

## 4. Required vs optional columns

### 4.1 Required core columns

未来 sample row dry-run 最少必须包含：

- `rowId`
- `proposedDraftId`
- `displayNameDraft`
- `sourceLayer`
- `triggerMetricDirection`
- `numericSourceStatus`
- `humanSeverityLabel`
- `severityLevelDraft`
- `thresholdStatus`
- `scoreMultiplierStatus`
- `enabled`
- `reviewStatus`
- `canEnterGeneratedSeverity`
- `canEnterShadow`
- `canAffectRuntime`
- `canChangeGoldenExpected`
- `nextRequiredGate`
- `notThis`

### 4.2 Required if applicable

- `preferenceNotes`
- `feedbackCopyBoundary`
- `numericSummaryRefDraft`
- `thresholdOperatorDraft`
- `thresholdDraftMin`
- `thresholdDraftMax`

说明：

- 只有 future sample row 需要表达区间示意时才填 threshold draft。
- 即使填了示意数值，也必须标 `thresholdStatus=illustrative_only` 或类似状态，不得写 approved。

### 4.3 Optional / notes

- `mechanismDefinition`
- `severityExperience`
- `producerNotes`
- `reviewNotes`
- `sourceReviewFile`
- `sourceReviewItems`
- `feedbackIntensityDraft`

### 4.4 Machine-checkable later

未来 validator / lint 可检查：

- required columns 是否存在。
- `enabled` 是否 false。
- dangerous gates 是否 false。
- `proposedDraftId` 是否仍非 approved stable。
- `thresholdStatus` 是否非 approved。
- `scoreMultiplierStatus` 是否非 approved。
- `thresholdDraftMin` / `thresholdDraftMax` 若存在，是否明确只是示意并非正式。
- 是否误用 high / medium / low 作为 numeric source。
- 是否把 `displayNameDraft` 当 key。
- 是否把 report `rowId` 当 stable ID。

本轮不创建 validator。

## 5. Numeric-first and draft-value policy

表格可以有 `humanSeverityLabel`，例如“轻度 / 中度 / 重度”，但计算主数据必须来自 numeric triggerMetric / numeric summary。

本轮不创建正式 numeric source。

本轮不填正式 threshold。

如果未来 dry-run 需要示例数值，只能标为 illustrative_only / draft / notApproved。

`scoreMultiplierDraft` 初期建议保持 blank / TBD，而不是急着填数字。

不允许把 high / medium / low 作为正式计算主数据。

## 6. First 6 concept fit check

以下只是 fit check，用来确认第一批 6 个 `proposedDraftId` 能放进这个 sample sheet shape。

本轮不填真实 6 行，不创建 sample CSV。

### 6.1 `taste_sweet_overload`

- triggerMetricDirection: `sweetnessLoad`
- humanSeverityLabel 可以表达：偏甜 / 太甜 / 甜度灾难
- preferenceNotes 重要，因为高甜可能是偏好
- notThis：不是糖 / 蜂蜜 / 糖浆 / 果酱专属机制

### 6.2 `taste_acid_overload`

- triggerMetricDirection: `acidityLoad`
- humanSeverityLabel 可以表达：清爽偏酸 / 明显太酸 / 酸度爆炸
- 注意 freshness boundary，避免误伤清爽偏酸
- notThis：不是柠檬 / 山楂 / 百香果专属机制

### 6.3 `taste_bitter_overload`

- triggerMetricDirection: `bitternessLoad`
- humanSeverityLabel 可以表达：苦味明显 / 太苦 / 苦到压住整杯
- customer tolerance important
- notThis：不是茶事故、咖啡事故、抹茶事故、可可事故

### 6.4 `taste_astringency_overload`

- triggerMetricDirection: `astringencyLoad`
- humanSeverityLabel 可以表达：轻微发干 / 明显涩感 / 强收敛刮舌
- taste / sensation boundary 需要备注
- notThis：不是苦味过载；不是辣 / 麻 / 酒精灼烧；不是 generic strong stimulation

### 6.5 `texture_low_drinkability`

- triggerMetricDirection: `lowFlowPenalty`
- humanSeverityLabel 可以表达：轻微粉感 / 粉泥感 / 水泥感 / 吸不上来
- notThis 必须排除小料固体负载、奶脂油腻、糖浆胶质黏稠
- 可备注 `slurryLoad` / `pasteLoad` / `powderLoad` 作为 supporting directions

### 6.6 `texture_solid_overload`

- triggerMetricDirection: `solidLoad`
- humanSeverityLabel 可以表达：小料略多 / 像甜品碗 / 八宝粥感 / 饮品形态被压垮
- 可辅助 `chewLoad` / `liquidSupport`
- notThis 必须排除粉泥低流动性、奶脂油腻、糖浆胶质黏稠
- 必须明确小料多不一定吸不上来

## 7. Future sample row dry-run policy

后续若进入 first 6 sample rows dry-run，可以为每个机制试填 light / medium / heavy 示例行。

但所有示例行必须保持 draft / illustrative：

- `enabled=false`
- `canEnterGeneratedSeverity=false`
- `canEnterShadow=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`
- threshold / `scoreMultiplier` 不能标 approved
- 如果出现示意数值，必须写明不是正式阈值
- 不允许从 sample sheet 直接生成 runtime data

## 8. Recommended next options

以下是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT review this sample sheet shape

审阅字段是否够轻、是否中文友好、是否足够防越界。

### Option B｜First 6 Severity Sample Rows Dry-Run

在这个 shape 通过后，为 6 个机制各试填 light / medium / heavy 示例行。

仍不创建真实 CSV / JSON / validator / generated data。

### Option C｜Severity Sample Sheet CSV/JSON Shape Planning

设计未来真实 sample CSV / JSON 文件形态。

不填真实数值。

Recommendation:

建议下一步先由用户 + ChatGPT 审阅本 shape。

如果通过，再做 First 6 Severity Sample Rows Dry-Run。

不建议直接创建 CSV / JSON / validator / generated data。

## 9. Explicit non-goals

本轮不做：

- 不创建真实 `content_sheets/` 文件。
- 不创建 CSV / JSON / JS。
- 不创建 schema / enum / validator。
- 不生成 generated severity。
- 不填正式 numeric values。
- 不填正式 threshold。
- 不填正式 `scoreMultiplier`。
- 不填正式 feedback intensity。
- 不批准 stable ID。
- 不批准 registry candidate。
- 不生成 allowed values。
- 不改 `data/stableIdRegistry.js`。
- 不改 `scripts/content/checkStableIdRegistry.js`。
- 不改 runtime / core / data / generated / golden。
- 不做 shadow / partial / active takeover。
