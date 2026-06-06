# Candidate Severity Rule Schema Review Round 1｜Severity 数值规则表 Schema 规划

## 0. 文件定位

本文件是 v0.0.8 planning-only 阶段的人类审批 / 制作人评审材料，用于规划 future candidate severity rule / threshold table 的字段形状、中文解释、gate 边界和第一批 6 个概念的 metric / severity 方向。

本文件不是：

- schema
- CSV / JSON / JS
- validator input
- generated severity data
- runtime source
- stable ID approval source
- registry candidate approval source
- official threshold table
- official scoreMultiplier table
- official feedback intensity table
- golden expected source

本轮不创建正式表格，不创建 validator，不创建 generated data，不填写正式 threshold / `scoreMultiplier` / feedback intensity，不影响 final feedback / final result。

后续如果要进入 sample sheet / schema / validator / generated severity shadow，必须另开明确任务，并经过用户 + ChatGPT 审核。

## 1. 为什么需要这一刀

第一批 6 个 proposal wording 已经完成 draft ID proposal review 与 registry candidate proposal rows，但它们仍不是 approved stable ID、registry candidate 或 allowed values。

在后续进入 severity table / threshold / `scoreMultiplier` 之前，需要先明确一层结构边界：

- `accidentTypeId` 表示“这是什么事故机制”。
- severity rule row 表示“这个机制在某个数值区间有多严重”。
- 同一机制的轻 / 中 / 重表现不应拆成多个 `accidentTypeId`。
- trigger metric、threshold、`severityLevel`、`scoreMultiplier` 和反馈强度必须走数据化规则，而不是散落进 engine if。

这一刀只做 schema planning，目的是让未来制作人能看懂“表里每列干什么”，也让 Codex 后续结构化时不从零设计 severity workflow。

## 2. 基础原则

- 同一事故机制内部允许轻度 / 中度 / 重度连续谱。
- 严重度应由 triggerMetric 数值区间、`severityLevel`、`scoreMultiplier`、feedback intensity 和 rule row 表达。
- rule row 不是 `accidentTypeId`。
- `ruleId` 可以携带 low / medium / high 等 rule-level semantics；`accidentTypeId` 不得携带 severity。
- 未来 ingredient profile / summary / triggerMetric 应优先支持 numeric values / numeric load，而不是只使用 high / medium / low 档位。
- high / medium / low 或中文档位可以作为 human-readable label / review hint，但不能作为正式计算主数据。
- severity rule 应读取数值型 triggerMetric，或读取可验证的 numeric summary / numeric load。
- threshold / `scoreMultiplier` / feedback intensity 当前都不是正式值。
- 本文件中的数值、等级和文案方向仅作示意，不是 runtime data。
- generated severity 仍关闭；generated severity shadow / partial / active takeover 仍未开放。
- Existing generated feedback shadow, if present, remains non-final and does not affect final feedback / final result.

## 3. Future Severity Rule Row Shape

### 3.1 Identity / Target Fields

| field | 中文解释 | planning note |
|---|---|---|
| `ruleId` | 规则行 ID | 只标识某条 severity rule row，可包含 light / medium / heavy 等 rule-level 语义；不是 `accidentTypeId`。 |
| `enabled` | 是否启用 | planning / draft 阶段默认 false；未过 gate 不得影响 runtime。 |
| `targetIdFamily` | 目标 ID 家族 | 例如 `accidentTypeId`；本轮不创建 allowed values。 |
| `targetId` | 目标正式 ID | 只有目标已 approved stable 时才填写；本轮第一批 6 项不应当作正式 ID。 |
| `targetCandidateRef` | 目标候选引用 | 指向 proposal / candidate row / review material，供追踪。 |
| `candidateType` | 候选类型 | 例如 draft / registryCandidate / approvedStable；本轮只讨论 future shape。 |

### 3.2 Source / Traceability Fields

| field | 中文解释 | planning note |
|---|---|---|
| `sourceRegistryCandidateRef` | registry candidate 来源引用 | 指向 registry candidate proposal row；不是批准。 |
| `sourceReviewFile` | 来源评审文件 | 记录来自哪个 human review report。 |
| `sourceConceptRef` | 来源概念编号 | 例如 C001 / C002 或 approved concept draft ref；不是 stable ID。 |
| `sourceLayer` | 来源层 | taste / texture / flavor / structure / specialSensation 等。 |
| `sourceSummary` | 来源 summary | 用人话概括该规则来自什么机制方向。 |
| `sourceEvidence` | 来源证据 | 可记录制作人备注、样例、golden-like 线索；不是 golden expected。 |
| `sourceNotes` | 来源备注 | 解释边界、不要做什么、仍待决策事项。 |

### 3.3 Trigger Metric Fields

| field | 中文解释 | planning note |
|---|---|---|
| `triggerMetric` | 触发指标 | 用来判断是否触发 / 触发多重的结构化指标名；本轮只列方向。 |
| `triggerMetricStatus` | 指标状态 | draft / proposed / needsValidation / approved 等未来状态；本轮不批准。 |
| `metricDirection` | 指标方向 | 例如 higher_is_worse / lower_is_worse / range_based。 |
| `metricUnit` | 指标单位 | 分数、比例、归一化 0-100 等；本轮不定正式单位。 |
| `metricAggregation` | 指标聚合方式 | max / weighted sum / layer summary 等未来方向；本轮不实现。 |
| `numericLoad` | 数值负载 | 未来用于承载可计算的 numeric value / numeric load；high / medium / low 不能替代它。 |
| `numericSummaryRef` | 数值 summary 引用 | 指向可验证的 numeric summary 字段；本轮不创建正式字段。 |
| `metricEvidence` | 指标证据 | 为什么这个 metric 能代表该机制。 |
| `metricNotThis` | 指标反例 | 明确哪些东西不应被这个 metric 误判。 |

### 3.4 Threshold Fields

| field | 中文解释 | planning note |
|---|---|---|
| `thresholdMin` | 阈值下限 | 未来用于区间判断；本轮不填正式值。 |
| `thresholdMax` | 阈值上限 | 未来用于区间判断；本轮不填正式值。 |
| `thresholdOperator` | 阈值比较方式 | 例如 `>=`、`<`、`between`；本轮只规划字段。 |
| `thresholdStatus` | 阈值状态 | draft / illustrative / needsGolden / needsProducerReview 等。 |
| `thresholdNotes` | 阈值备注 | 记录为什么需要这个区间、是否只是示意。 |

### 3.5 Severity Fields

| field | 中文解释 | planning note |
|---|---|---|
| `severityLevel` | 严重度等级 | 未来可用 light / medium / heavy 等；本轮不定正式枚举。 |
| `severityStatus` | 严重度状态 | draft / proposed / approved 等未来状态。 |
| `severityLabelDraft` | 制作人可读等级名 | 例如轻微 / 明显 / 严重；不是正式反馈文案。 |
| `severityRank` | 排序权重 | 用于同一机制内排序；不是最终扣分。 |
| `severitySourceValue` | 严重度来源数值 | 指向实际用于判断等级的 numeric triggerMetric / numeric summary；不应只填 high / medium / low。 |
| `severityNotes` | 严重度备注 | 记录“为什么这算轻 / 中 / 重”。 |

### 3.6 Score / Feedback Fields

| field | 中文解释 | planning note |
|---|---|---|
| `scoreMultiplier` | 分数倍率 | 属于 scoring layer；本轮不填正式值。 |
| `scoreMultiplierStatus` | 分数倍率状态 | draft / illustrative / needsTuning / approved 等。 |
| `scoreImpactNotes` | 扣分影响备注 | 说明预期对评分的影响，不等于正式评分。 |
| `feedbackIntensity` | 文案强度 | 例如 mild / clear / strong；本轮不定正式文案。 |
| `feedbackIntensityStatus` | 文案强度状态 | draft / needsCopyReview / approved 等。 |
| `feedbackTagRefs` | 反馈标签引用 | 未来可能引用 feedbackTag；本轮不生成 feedbackTag。 |
| `feedbackCopyBoundary` | 文案边界 | 明确文案不能把机制拆成新 ID。 |

### 3.7 Preference / Audience Fields

| field | 中文解释 | planning note |
|---|---|---|
| `customerPreferenceMode` | 顾客偏好处理方式 | 未来表达不同客群对同一强度的容忍 / 加减分；本轮不实现顾客系统。 |
| `toleranceProfileRef` | 容忍度 profile 引用 | 未来可能接 audience tolerance；本轮不创建 customerTag / audienceId。 |
| `preferenceNotes` | 偏好备注 | 记录“有人可能喜欢高甜 / 高苦 / 小料多”等制作人判断。 |
| `preferenceStatus` | 偏好状态 | draft / parkingLot / futurePlanning 等。 |

### 3.8 Review / Gate Fields

| field | 中文解释 | planning note |
|---|---|---|
| `reviewStatus` | 总审查状态 | 本轮只允许 planning / draft / needsReview 语境。 |
| `producerReviewStatus` | 制作人审查状态 | 由用户 / 制作人判断，不由 Codex 自动批准。 |
| `chatgptTechnicalReviewStatus` | ChatGPT 技术审查状态 | 可记录结构可行性，不等于批准。 |
| `canEnterGeneratedSeverity` | 是否可进入 generated severity | 本轮必须为 false。 |
| `canEnterShadow` | 是否可进入 shadow | 本轮必须为 false；后续若开放需另行任务。 |
| `canAffectRuntime` | 是否影响 runtime | 本轮必须为 false。 |
| `canChangeGoldenExpected` | 是否可改 golden expected | 本轮必须为 false。 |
| `nextRequiredGate` | 下一步 gate | 例如 producer review / schema draft / validator design / shadow-only approval。 |

## 4. 中文字段速读 / 制作人可读性

| field | 给制作人的解释 |
|---|---|
| `ruleId` | 某一条“轻 / 中 / 重规则”的编号，不是事故 ID。 |
| `targetId` | 这条规则未来可能对应的正式机制 ID；本轮不填正式 ID。 |
| `triggerMetric` | 未来机器要看的“数值指标”，例如甜度负载、粉浆感、固体负载。 |
| `numericLoad` | 未来真正用于计算的“数值负载”；不能只靠 high / medium / low 文字档位。 |
| `thresholdMin` / `thresholdMax` | 未来判断轻中重的数值区间；本轮不定正式线。 |
| `severityLevel` | 轻 / 中 / 重这类严重程度等级。 |
| `scoreMultiplier` | 扣分倍率或评分影响，不是事故身份。 |
| `feedbackIntensity` | 文案说得轻一点还是狠一点。 |
| `customerPreferenceMode` | 不同客群是否对同一强度更能接受。 |
| `canEnterGeneratedSeverity` | 是否允许进入自动生成 severity 数据；本轮是 no。 |
| `canAffectRuntime` | 是否会影响玩家实际结果；本轮是 no。 |

制作人不需要手填所有机器字段。制作人主要判断：

- 这个机制方向是否成立。
- 轻 / 中 / 重的体感是否合理。
- 哪些饮品会被误伤。
- 哪些顾客可能喜欢或能接受。
- 文案强度是否符合真实体验。
- 中文档位是否好理解，但不把中文档位当正式计算数据。

数字字段、gate 字段和机器字段后续由 ChatGPT / Codex / validator draft 帮助结构化，但不能自动批准。

## 5. First 6 Concept Mapping

### 5.1 `taste_sweet_overload`

| item | planning direction |
|---|---|
| sourceLayer | taste |
| possibleMetricDirections | `sweetnessLoad` / `sweetIntensity` |
| severity continuum | 正常甜 -> 偏甜 -> 太甜 -> 甜度灾难 |
| key risk | 高甜对部分客群可能是偏好，不应自动重罚。 |
| not this | 不按糖浆 / 蜂蜜 / 果酱等具体来源拆 accidentTypeId。 |
| official threshold | none in this round |

### 5.2 `taste_acid_overload`

| item | planning direction |
|---|---|
| sourceLayer | taste |
| possibleMetricDirections | `acidityLoad` / `acidIntensity` |
| severity continuum | 清爽偏酸 -> 明显太酸 -> 酸度爆炸 |
| key risk | 果酸清爽感和酸到失衡需要分开。 |
| not this | 不按柠檬 / 山楂 / 百香果等具体酸源拆 accidentTypeId。 |
| official threshold | none in this round |

### 5.3 `taste_bitter_overload`

| item | planning direction |
|---|---|
| sourceLayer | taste |
| possibleMetricDirections | `bitternessLoad` / `bitterIntensity` |
| severity continuum | 苦味明显 -> 太苦 -> 苦到压住整杯 |
| key risk | 咖啡 / 浓茶爱好者可能接受更高苦味。 |
| not this | 不按咖啡 / 茶 / 可可等来源拆 accidentTypeId。 |
| official threshold | none in this round |

### 5.4 `taste_astringency_overload`

| item | planning direction |
|---|---|
| sourceLayer | taste / special sensation boundary |
| possibleMetricDirections | `astringencyLoad` / `tanninPressure` / `dryingSensation` |
| severity continuum | 轻微发干 -> 明显涩感 -> 强收敛刮舌 |
| key risk | 涩感可能和茶感、苦味、特殊刺激边界相邻。 |
| not this | 不把涩感按单一茶类 / 单个原料拆 accidentTypeId。 |
| official threshold | none in this round |

### 5.5 `texture_low_drinkability`

| item | planning direction |
|---|---|
| sourceLayer | texture / drinkability |
| possibleMetricDirections | `slurryLoad` / `pasteLoad` / `powderLoad` / `lowFlowPenalty` |
| severity continuum | 轻微粉感 -> 粉泥感 -> 水泥感 -> 吸不上来 |
| key risk | 低可饮用性不能和吸管阻力、芋泥、奥利奥等单项原料概念混在一起。 |
| not this | 不按芋泥 / 奥利奥 / 粉类来源拆 accidentTypeId；吸管阻力不自动成为 standalone mechanism。 |
| official threshold | none in this round |

### 5.6 `texture_solid_overload`

| item | planning direction |
|---|---|
| sourceLayer | texture / drinkability |
| possibleMetricDirections | `solidLoad` / `toppingLoad` / `liquidSupport` / `chewLoad` |
| severity continuum | 小料略多 -> 像甜品碗 -> 八宝粥感 -> 饮品形态被压垮 |
| key risk | 小料多对部分玩家 / 顾客可能是喜好，需要区分“丰富”和“喝不动”。 |
| not this | 不按珍珠 / 芋圆 / 布丁 / 椰果等具体小料拆 accidentTypeId。 |
| official threshold | none in this round |

## 6. Required / Optional / Machine-Checkable Fields

### 6.1 Required Core Fields

未来如果进入 candidate severity rule row，建议最小 required core fields 包括：

- `ruleId`
- `enabled`
- `targetIdFamily`
- `targetId` or `targetCandidateRef`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `triggerMetricStatus`
- numeric value / numeric load source, such as future `numericLoad` or `numericSummaryRef`
- `severityLevel`
- `severityStatus`
- `thresholdStatus`
- `scoreMultiplierStatus`
- `reviewStatus`
- `canEnterGeneratedSeverity`
- `canEnterShadow`
- `canAffectRuntime`
- `canChangeGoldenExpected`
- `nextRequiredGate`

在未明确开放前，危险 gate 必须保持 false：

- `canEnterGeneratedSeverity=false`
- `canEnterShadow=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`

### 6.2 Required If Applicable

- `customerPreferenceMode`
- `toleranceProfileRef`
- `feedbackTagRefs`
- `feedbackCopyBoundary`
- `metricAggregation`
- `numericLoad`
- `numericSummaryRef`
- `thresholdMin`
- `thresholdMax`

这些字段并非每条 planning row 都必须马上填写，但一旦该方向被使用，就需要明确状态和边界。

### 6.3 Optional Notes

- `sourceNotes`
- `metricEvidence`
- `thresholdNotes`
- `severityNotes`
- `scoreImpactNotes`
- `preferenceNotes`

这些字段服务于人类理解和后续审查，不应替代正式 schema。

### 6.4 Machine / Script Checkable Later

后续如果进入 schema / validator design，可以考虑检查：

- `ruleId` 不重复。
- `targetId` / `targetCandidateRef` 指向合法来源。
- `severityLevel` 使用受控词汇。
- severity rule 必须能追溯到 numeric triggerMetric / numeric summary，不能只靠 high / medium / low label 计算。
- 危险 gate 默认 false。
- `enabled` 未过 gate 不得为 true。
- `accidentTypeId` 不包含 light / medium / heavy / severe / 0_40 等 severity 语义。
- required fields 不缺失。
- threshold 字段不能把 illustrative value 误标成 approved value。

本轮不创建这些 validator。

### 6.5 Report-Only Fields

以下内容应留在 report / review material，不应直接塞进机器表：

- 长篇制作人解释。
- 人话例子。
- open questions。
- round number / report meta。
- “这个方向我喜欢”这类自由备注。

## 7. Open Questions

- 未来 `severityLevel` 是否使用 light / medium / heavy，还是中文可读等级与机器枚举双轨。
- `scoreMultiplier` 是否只表达扣分倍率，还是还要表达加分 / 容忍。
- 顾客偏好应在 severity rule row 内表达，还是另设 audience tolerance table。
- threshold 是统一 0-100，还是不同 metric 有不同单位。
- generated severity shadow 的第一刀是否只读输出 report，不接 final feedback。

这些问题都不在本轮定案。

## 8. Next Possible Step

可选下一步是让用户 + ChatGPT 审阅本 report，确认：

- 字段是否够看得懂。
- 制作人是否愿意用这样的表审核轻 / 中 / 重。
- 第一批 6 个概念的 metric / severity 方向是否合理。
- 哪些字段应进入未来 sample sheet，哪些只留在 report。

审阅通过后，才可以讨论 future sample sheet / schema draft / validator design / generated severity shadow 的单独任务。

## 9. Explicit Non-Goals

本轮明确不做：

- 不生成 stable ID。
- 不生成 registry candidate。
- 不生成 allowed values。
- 不创建 registry / enum / schema / validator。
- 不创建 CSV / JSON / JS。
- 不生成 generated severity。
- 不填写正式 threshold。
- 不填写正式 `scoreMultiplier`。
- 不填写正式 feedback intensity。
- 不改 runtime。
- 不改 core。
- 不改 data。
- 不改 generated。
- 不改 golden expected。
- 不开放 implementation / batch content / generated severity / takeover。
- 不 push。
- 不 tag。
