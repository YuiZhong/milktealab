# v0.0.7.x Mechanism / Generated Output Review Pack Gate Design

> Stage-bound document / 阶段限定文档
>
> 本文件是 v0.0.7.x 阶段专属材料，用于记录该阶段的 TODO、inventory、design draft、gate、audit debt 或迁移证据。
>
> 它不是长期正本，不替代 `docs/DOCS_SOURCE_OF_TRUTH.md`、`docs/TASTE_DECISION_MODEL.md`、`docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。
>
> v0.0.7.x 结束后，本文件必须移出 `AGENTS.md` / `docs/AI_CONTEXT.md` 的长期必读列表，只能作为 historical / stage support 按需读取。
>
> 未完成且仍有效的债务应迁移到下一阶段 TODO；长期有效原则应沉淀进 L1 正本。
>
> 如果本文与 L1 正本冲突，以 L1 正本为准。

## 0. 文档定位

本文是 mechanism / generated output review pack gate 的设计文档。

它用于回答：

- 后续 Codex 生成的 ID / tag / rule / mapping / migration suggestion 应该如何整理出来审查。
- 用户负责审哪些制作人方向、玩家体验和文案语义。
- ChatGPT / 技术负责人负责审哪些技术边界、ID 层级、source-of-truth 和越级风险。
- 哪些字段必须出现在 human review 区。
- 哪些字段必须放到 machine appendix。
- 什么情况下 review pack 只能给出 `needs review` / `blocked`，不能进入 registry / validator / generated data。
- review pack 如何防止 Codex 把草案内容直接“合法化”。
- review pack 如何防止 Codex 输出变成黑箱，让用户和 ChatGPT 不知道它生成了什么、为什么生成、来自哪里、准备进入哪一层。

本文不是正式 review pack report，不是 generator script，不是 registry，不是 validator，不是 generated data，也不是 ID 生成器。

本轮边界：

- 不实现 generator。
- 不生成 sample report。
- 不新增 registry / schema / enum。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime。
- 不批准任何 ID / tag / rule。
- 不改变 score、feedback、accident、type、`result.type` 或 golden expected。
- 不把任何 P1 写成 solved。

## 1. Review Pack 适用对象

以下 Codex / AI 生成、整理、盘点或建议内容，进入 registry / validator / generated data / runtime / golden / player-visible output 前，必须先进入 review pack gate：

- new stable ID proposal
- `accidentTypeId` / `outcomeTypeId` / `drinkTypeId` proposal
- `feedbackTag` proposal
- candidate / risk tag proposal
- `ruleId` proposal
- `sampleId` proposal
- `candidateId` proposal
- `sourceLayer` / `sourceSummary` / `triggerMetric` proposal
- `priorityBand` / `severityHint` / `severityLevel` proposal
- candidate severity rule draft
- feedbackTag mapping draft
- accidentAnalyzer migration suggestion
- drinkStructureAnalyzer displayName Set migration suggestion
- generated feedback partial takeover candidate
- generated severity data candidate
- golden expected update suggestion
- validator warning that could affect future registry / generated data / runtime
- any Codex-generated batch list that may later be cited as project fact

规则：

- 只要会影响 registry / validator / generated data / runtime / golden / player-visible output，就必须进入 review pack。
- Codex 不能把“我认为合理”的 generated output 直接写进 registry / validator / generated data。
- Codex 不能只在完成报告里用自然语言总结这些内容，必须进入结构化 review pack / review gate。
- 对批量输出，不能只有 aggregate summary；每条关键项都必须有独立记录。

## 2. Review Pack 总体结构

推荐结构：

```text
A. Human Review Zone / 制作人审核区
B. ChatGPT Technical Review Zone / 技术负责人审查区
C. Decision Summary / 决策摘要
D. Machine Appendix / 机器详情附录
```

结构要求：

- 人类审核区在前。
- 机器详情附录在后。
- 不要让用户在机器字段里找重点。
- 每条候选都要有独立 `reviewStatus` / `producerComment` / `technicalRisk` / `gateImpact`。
- 支持多条候选同时 keep / revise / reject。
- 不要求用户填写程序化枚举，必须允许自然语言备注。
- 不能只有 aggregate summary；每条 Codex 生成、建议或观察到的关键项都必须可追踪。
- 不能把高风险项只藏在 Machine Appendix，Human Review Zone 必须至少有对应提醒。

## 3. Human Review Zone 字段设计

Human Review Zone 面向制作人和非程序员用户。它回答“这个东西作为玩家体验、文案语义或制作方向是否合适”。

建议字段：

| field | purpose |
|---|---|
| `reviewItemId` | review pack 内部条目 ID，不是 stable runtime ID。 |
| `title` / `shortName` | 制作人可读标题。 |
| `itemType` | 条目类型，例如 ID proposal、migration candidate、feedbackTag mapping。 |
| `proposedMeaningCN` | 这个候选想表达的人类语义。 |
| `playerVisibleImpact` | 可能影响玩家看到的哪些内容。 |
| `exampleUseCase` | 可能出现在哪类配方 / 事故 / 文案场景。 |
| `whyItMatters` | 为什么这个候选值得审。 |
| `producerQuestion` | 希望制作人回答的问题。 |
| `reviewStatus` | 制作人审查状态。 |
| `producerComment` | 制作人自然语言备注。 |
| `suggestedRewrite` | 如果是文案 / 命名方向，可填写建议改写。 |
| `issueTagsNaturalLanguage` | 自然语言问题标签。 |

制作人可用自然语言反馈，例如：

- 这个词太 AI。
- 这个反馈玩家看不懂。
- 可以做候选但别给玩家看。
- 这个像风味冲突，不像气泡冲突。
- 这个 ID 看起来像原料，不像机制。
- 这个先别进正式表。
- 这个可以保留但要改名。
- 这个机制方向对，但文案太狠。
- 我不懂代码，但这个玩家体验不对。
- 这个先别让 Codex 接着引用。

## 4. ChatGPT Technical Review Zone 字段设计

ChatGPT Technical Review Zone 面向技术复查和机制边界审查。它回答“这个东西是否越级、混层、缺 source-of-truth，或会污染后续 registry / validator / generated data”。

建议字段：

| field | purpose |
|---|---|
| `technicalReviewStatus` | 技术审查状态。 |
| `layerCorrectness` | ID / tag / rule 是否处在正确层级。 |
| `sourceOfTruthStatus` | 是否有明确 source-of-truth。 |
| `stableIdRisk` | 是否把 draft / sample / candidate 当 stable。 |
| `displayTextKeyRisk` | 是否把 displayName / zhCN / 文案当主键。 |
| `sampleIdLeakRisk` | sampleId 是否泄漏到机制主键。 |
| `candidateTagLeakRisk` | candidate / risk tag 是否泄漏到 feedbackTag。 |
| `feedbackTagMappingRisk` | feedbackTag 语义是否被泛化或误用。 |
| `sourceLayerTriggerMetricRisk` | sourceLayer / triggerMetric 是否被 ID 名称覆盖。 |
| `legacyMigrationRisk` | legacy 迁移是否可能改变 runtime / golden。 |
| `validatorReadiness` | 是否足以进入 validator design。 |
| `generatedDataReadiness` | 是否足以进入 generated data。 |
| `runtimeTakeoverRisk` | 是否可能越级影响 runtime / partial / active takeover。 |
| `goldenImpact` | 是否会影响 golden expected。 |
| `recommendedGate` | 下一道 gate。 |
| `blockerReason` | 阻塞原因。 |

ChatGPT / 技术负责人应检查：

- 是否把 observed 当 stable。
- 是否把 draft / sample-only / candidate-only 当正式 ID。
- 是否把 candidate / risk tag 当 feedbackTag。
- 是否把 sampleId 当机制主键。
- 是否把 displayName / zhCN / 文案当主键。
- 是否按原料拆机制。
- 是否把 severity 写进 `accidentTypeId`。
- 是否让 `sourceLayer` / `triggerMetric` 被 ID 名称覆盖。
- 是否为了某个 golden sample 硬编码。
- 是否会改变玩家最终 score / feedback / accident / type / golden expected。
- 是否需要拆成更小任务。
- 是否缺少 provenance，导致无法审查。
- 是否有“看起来合理但没有 source-of-truth”的伪稳定项。

## 5. Provenance / Traceability 字段设计

Provenance / traceability 是 review pack 的防黑箱核心。每条候选都必须说明它来自哪里、为什么被提出、想进入哪一层。

建议字段：

- `generatedByTask`
- `generatedReason`
- `sourceEvidence`
- `sourceFile`
- `sourceLineOrSection`
- `originalObservedValue`
- `proposedNewValue`
- `targetLayer`
- `intendedDestination`
- `referencedDocs`
- `relatedExistingIds`
- `relatedSamples`
- `whyCodexProposedThis`
- `confidenceLevel`
- `uncertaintyNotes`

规则：

- 如果没有明确来源，必须标记 `needs_more_context` 或 `blocked_no_source`。
- 不能把 `Codex inferred` 当作 source-of-truth。
- 不能从 docs prose / notes / displayName / zhCN 反向抽成正式机制事实。
- 对批量生成内容，必须保留每条 item 的单独 provenance，不能只说“批量生成自规则”。
- 没有 provenance / traceability 的条目不得进入任何 source-of-truth。

## 6. Decision Summary 字段设计

Decision Summary 是 review pack 的收口区。它不直接批准 runtime 接管，只记录当前 review 后允许进入哪一个下一步。

建议字段：

- `decision`
- `allowedNextStep`
- `blockedGate`
- `requiredFollowup`
- `owner`
- `canEnterRegistry`
- `canEnterValidator`
- `canEnterGeneratedData`
- `canAffectRuntime`
- `requiresProducerReview`
- `requiresGoldenUpdate`
- `requiresMigrationPlan`

可用 `decision` 状态：

- `keep_as_observed_only`
- `needs_note`
- `needs_producer_review`
- `needs_technical_review`
- `needs_rename_plan`
- `needs_mapping_review`
- `needs_registry_design`
- `needs_validator_design`
- `reject_for_now`
- `candidate_for_future`
- `approved_for_next_design_step`
- `blocked_no_source`
- `blocked_wrong_layer`
- `blocked_black_box`

不要把以下词作为正向状态使用：

- `approved_for_runtime`
- `approved_for_active_takeover`
- `stable`
- `registered`
- `allowed`

如果必须出现这些词，必须写成否定语义，例如 `not stable`、`not registered`、`not allowed`。

## 7. Machine Appendix 字段设计

Machine Appendix 可以包含技术字段，但不能挤在人类主审核路径前面。

建议字段：

- `rawSourceFile`
- `rawLineOrSection`
- `sourceKind`
- `observedLayer`
- `observedUsage`
- `currentStatus`
- `suggestedStatus`
- `sourceLayerCandidate`
- `sourceSummaryCandidate`
- `triggerMetricCandidate`
- `relatedAccidentTypeId`
- `relatedFeedbackTag`
- `relatedRuleId`
- `relatedSampleId`
- `relatedGoldenSample`
- `currentRuntimeImpact`
- `currentGeneratedImpact`
- `currentReviewPackImpact`
- `referencedDocs`
- `testCoverage`
- `knownWarnings`
- `rawCodexOutputExcerpt`
- `diffReference`

Machine Appendix 的职责是追溯，不是让制作人在机器字段里做主要判断。

## 8. Gate Rules

Review pack gate 的基本规则：

- 没有 review pack，不得进入 registry。
- 没有 review pack，不得进入 validator allowed values。
- 没有 review pack，不得进入 generated severity data。
- 没有 review pack，不得做 generated feedback partial / active takeover。
- 没有 review pack，不得把 candidate / risk tag 映射成 runtime feedbackTag。
- 没有 review pack，不得把 accidentAnalyzer legacy item 迁移到 severity table。
- 没有 review pack，不得改 golden expected。
- 没有 review pack，不得重命名已被 runtime / golden / generated 引用的 ID。
- 没有 provenance / traceability，不得进入任何 source-of-truth。
- 只要 review pack item 的 decision 是 pending / needs review / blocked，就不得进入 registry / validator / generated data / runtime。

Review pack 本身也不是批准机制。Review pack 只是审查出口，真正批准仍需要用户 / ChatGPT 明确结论和后续任务。

## 9. Review Pack Item Types

未来 schema 可考虑以下 `itemType` 草案，但本轮不创建 schema / enum 文件：

- `id_proposal`
- `tag_proposal`
- `feedback_tag_mapping`
- `accident_migration_candidate`
- `severity_rule_draft`
- `trigger_metric_proposal`
- `source_layer_mapping`
- `generated_feedback_candidate`
- `generated_severity_candidate`
- `golden_expected_change`
- `display_name_key_risk`
- `legacy_compatibility_risk`
- `validator_warning`
- `registry_candidate`
- `deprecation_candidate`
- `black_box_generated_item`
- `provenance_gap`

这些只是 future schema 草案，不是 enum 文件，不是 allowed values，也不代表任何条目已可进入 registry。

## 10. Review Status / Issue Tag 设计

制作人友好的 reviewStatus 可考虑：

- `keep_observed`
- `revise`
- `reject`
- `pending`
- `needs_more_context`
- `split_required`
- `do_not_promote`

自然语言 issue tags 可包含：

- 语义太宽
- 像原料不是机制
- 像样本不是机制
- 玩家看不懂
- 太像 AI
- 文案太狠
- 不能给玩家看
- 可以做候选但别接 runtime
- 需要拆成两个 tag
- 需要改名计划
- sourceLayer 不清楚
- triggerMetric 不清楚
- 疑似显示文案主键
- 疑似 sampleId 泄漏
- 疑似 candidate tag 泄漏
- 来源不清楚
- Codex 自己推断的
- 看起来像稳定 ID 但没注册
- 先别让 Codex 继续引用

这些标签是审核语言，不是机制判断字段。它们不应直接变成 runtime rule。

## 11. 与既有 docs / reports 的关系

本文承接：

- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/V0_0_7_ID_INVENTORY.md`
- `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- `reports/stableIdSourceCollector.sample.md`
- `reports/feedbackShadowReview.sample.md`

关系说明：

- `reports/stableIdSourceCollector.sample.md` 只提供 observed evidence，不是 registry。
- `reports/feedbackShadowReview.sample.md` 是文案候选审查包的先例。
- `reports/mechanismReviewPack.sample.md` 是 v0.0.7.36 的 sample proof，用少量真实项目材料验证本文设计的 review pack 结构是否可读、可审、可追溯。
- 本文的 mechanism review pack gate 是更通用的机制内容审查出口。
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` 后续应通过这个 review pack gate 进入 migration review。
- `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 后续应通过这个 review pack gate 进入 registry / review pack draft。
- candidate severity sheet validator 不能早于 review pack gate。

v0.0.7.36 sample proof 边界：

- `reports/mechanismReviewPack.sample.md` 不是正式 review 结论。
- 它不是 generator script，不是 registry，不是 validator input，不是 generated data，也不是 source-of-truth。
- 它不批准任何 ID / tag / rule 进入 runtime、generated data、validator accepted values 或 registry。
- 它只验证 review pack 结构是否能承载 Human Review Zone、ChatGPT Technical Review Zone、Decision Summary 和 Machine Appendix。
- 后续如需批量生成 review pack，应另开 generator script 任务，并继续遵守本文 gate rules。

## 12. 后续建议路线

本轮完成后，下一步可考虑：

- `v0.0.7.36｜drinkStructureAnalyzer displayName Set inventory / migration plan`
- `v0.0.7.36｜AI-generated ID / tag review pack proof`
- mechanism review pack generator script design / proof

candidate severity sheet validator design / implementation 仍然在后面，不是本轮下一步默认。

以上只是可考虑路线，不代表已经决定。本轮不推进 v0.0.7.36。

## 13. 禁止事项

本轮绝对不要：

- 不要新增 review pack generator script。
- 不要在未明确任务要求的情况下生成新的 sample review pack report；v0.0.7.36 已新增的 `reports/mechanismReviewPack.sample.md` 是单独授权的 proof，不代表后续任务可自动生成 review pack，也不批准任何 ID / tag / rule 进入 registry / validator / generated data / runtime。
- 不要新增 registry / schema / enum。
- 不要实现 validator。
- 不要新增 generated data。
- 不要改 runtime。
- 不要改 data。
- 不要改 generated feedback / severity data。
- 不要改 content_sheets。
- 不要改 golden expected。
- 不要改 score / accident / feedback / `result.type`。
- 不要批准任何 ID / tag / rule。
- 不要把 P1 写成 solved。
- 不要推进 v0.0.7.36。
- 不要 push。
- 不要 tag。
