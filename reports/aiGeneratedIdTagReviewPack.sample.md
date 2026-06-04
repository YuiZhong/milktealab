# AI-generated ID / tag naming review pack sample

> 本报告是 v0.0.7.38 的 proof / sample report，用来验证“AI / Codex 生成或沿用的 ID / tag / rule 命名审查出口”是否适合制作人、ChatGPT 与 Codex 共同复查。
>
> 本报告不批准任何 ID / tag / rule。它不是 registry、不是 enum、不是 schema、不是 validator input、不是 generated data，也不是 runtime source-of-truth。
>
> 本报告不允许任何条目进入 runtime、generated data、validator、registry、partial takeover 或 active takeover。
>
> 本报告只展示少量代表性风险项，覆盖 accidentTypeId、sampleId、feedbackTag / candidate tag、ruleId、priorityBand、sourceLayer / triggerMetric 与 displayName dependency。完整 inventory 仍应以后续正式审计为准。

## 0. 使用边界

- 只读用途：帮助识别命名、层级、语义和 future validator 风险。
- 不做定稿：不要从本报告直接复制 ID 到 registry / validator / generated data / runtime。
- 不做迁移：不要因为本报告指出风险就立即重命名 legacy ID。
- 不做接管：任何影响玩家最终 score / feedback / accident / type 的改动都必须另走机制审查、制作人 review 与 golden 记录。
- 不当 source-of-truth：本报告引用的源码、docs、sample sheet 只是证据入口，不是新的稳定 ID 来源。

## Gate reminders

- 没有 review pack，不得进入 registry。
- 没有 review pack，不得进入 validator accepted values。
- 没有 review pack，不得进入 generated severity data。
- 没有 review pack，不得做 generated feedback partial / active takeover。
- 没有 review pack，不得把 candidate / risk tag 映射成 runtime feedbackTag。
- 没有 review pack，不得把 accidentAnalyzer legacy item 迁移到 severity table。
- 没有 review pack，不得改 golden expected。
- 没有 review pack，不得重命名已被 runtime / golden / generated 引用的 ID。
- 没有 provenance / traceability，不得进入任何 source-of-truth。
- review pack 本身不是批准机制。
- 本 sample report 不能被 future Codex 当作正式 ID 审计结论。

## 与既有 docs / reports 的关系

- `docs/V0_0_7_ID_INVENTORY.md` 是 inventory，不是 registry。
- `reports/stableIdSourceCollector.sample.md` 只是 observed evidence，不是 registry。
- `reports/mechanismReviewPack.sample.md` 是机制 review pack 结构 proof，不是批准记录。
- 本轮 `reports/aiGeneratedIdTagReviewPack.sample.md` 是 AI / Codex naming review proof，不是正式 ID 审计结论。
- 后续如果要形成正式 ID 审计结论，需要单独任务，且必须进入 review / decision / migration plan。
- candidate severity sheet validator 不能早于这些 review / source-of-truth gate。

## A. Human Review Zone / 制作人审核区

只需要先看本区。每个条目都可以标记是否需要继续设计、补说明、进入迁移计划，或暂时保持 legacy。

审核状态建议：

- `pending`: 待定。
- `needs_more_context`: 需要更多上下文。
- `revise`: 需要修改。
- `reject`: 暂不采用。
- `keep_observed`: 先保持当前观察状态。
- `do_not_promote`: 不应升级为正式字段或接管依据。
- `split_required`: 可能需要拆分语义。

常见问题标签可直接写中文，例如：按原料拆机制、sampleId 混进机制主键、草案 ID 被当正式 ID、旧 tag 语义误导、sourceLayer 被 ID 名称覆盖、priorityBand 和 severity 混用、中文显示名当系统主键、缺少 source-of-truth。

### AIRP-001｜flavor_durian_overload

- itemType: accidentTypeId
- title / shortName: 榴莲原料名混进事故机制
- observedOrProposedValue: `flavor_durian_overload`
- proposedMeaningCN: 榴莲风味过载事故
- playerVisibleImpact: 当前已出现在 legacy / golden 相关链路中，不能直接改名。
- exampleUseCase: `data/accidentRules.js` 中榴莲极端原料事故；`data/goldenSamples.js` 中极端榴莲样本 expected。
- whyItMatters: 名称按单个原料拆事故机制，容易诱导 future Codex 继续新增 `flavor_xxx_overload` 型事故类型。
- producerQuestion: 未来是否保留为 legacy 特例，还是迁移到更泛化的 flavor identity / extreme ingredient 机制？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-002｜extreme_lemon_accident

- itemType: sampleId
- title / shortName: golden sampleId 像事故机制名
- observedOrProposedValue: `extreme_lemon_accident`
- proposedMeaningCN: 极端柠檬事故测试样本
- playerVisibleImpact: 当前是 golden / review 定位用样本身份，不应进入机制规则主键。
- exampleUseCase: `data/goldenSamples.js` 中酸度事故样本。
- whyItMatters: 名称像事故类型，容易被误写进 `accidentTypeId` 或 `ruleId`。
- producerQuestion: 后续 severity / threshold 表格中是否只允许它作为 sampleId / report sample 引用？
- reviewStatus: do_not_promote
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-003｜aroma_pressure

- itemType: candidate tag / risk tag
- title / shortName: 香气风险名误入 feedbackTag
- observedOrProposedValue: `aroma_pressure`
- proposedMeaningCN: 香气压力风险
- playerVisibleImpact: 当前不应作为 runtime feedbackTag 直接进入文案选择。
- exampleUseCase: `core/summaryCandidateEngine.js` 的 `feedbackTags: ["aroma_pressure"]` 与 `triggerMetric: "aromaPressure"`。
- whyItMatters: 它更像 summary candidate 的风险语义；如果直接写入 feedbackTag 字段，会误导 validator 以为它已经是文案池标签。
- producerQuestion: 未来是否需要把它设计为 feedbackTag？如果需要，应先走 feedbackTag mapping review / producer review。
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-004｜bubble_conflict

- itemType: runtime observed feedbackTag
- title / shortName: 旧 feedbackTag 被泛化使用
- observedOrProposedValue: `bubble_conflict`
- proposedMeaningCN: 气泡 + 厚重 / 口感冲突追评
- playerVisibleImpact: 当前可观察为 legacy feedbackTag，但不代表适合泛化到 flavor identity conflict。
- exampleUseCase: `data/feedbackTexts.js` 中 `bubble_conflict` 文案池映射；`core/feedbackEngine.js` 中气泡 / 厚重触发。
- whyItMatters: 它的语义偏具体口感冲突，如果被泛化为 generic flavor identity conflict，会污染后续 severity / threshold 示例。
- producerQuestion: 是否需要保留为窄语义 legacy feedbackTag，并为 flavor identity conflict 另设计 review 后的 tag？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-005｜texture_dairy_fat_load_draft

- itemType: draft ruleId
- title / shortName: draft ruleId 被当正式规则
- observedOrProposedValue: `texture_dairy_fat_load_draft`
- proposedMeaningCN: 奶脂 / 厚重负担草案规则行
- playerVisibleImpact: 当前只是 sample sheet 草案，不接 runtime。
- exampleUseCase: `candidate_severity_rules.sample.csv` 中 disabled draft row。
- whyItMatters: `draft` 只能表示样例草案，不能被 future Codex 当成正式 ruleId 注册。
- producerQuestion: 这类 draft 是否需要先进入机制 review pack，再决定是否进入 future registry / schema？
- reviewStatus: do_not_promote
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-006｜dairy_fat_overload + sourceLayer=texture

- itemType: accidentTypeId with source fields
- title / shortName: ID 名称覆盖 sourceLayer 风险
- observedOrProposedValue: `dairy_fat_overload`
- proposedMeaningCN: 奶脂 / 厚重负担事故
- playerVisibleImpact: 当前 legacy ID 已被引用，不能因为名字看起来像 dairy 就直接改名。
- exampleUseCase: `candidate_severity_rules.sample.csv` 写明 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad`。
- whyItMatters: ID 名称不能覆盖 sourceLayer / sourceSummary / triggerMetric；否则会把 texture / drinkability 问题误读为 flavor identity 问题。
- producerQuestion: 是否需要在后续 ID 审计中给该 legacy ID 加强 notes，或设计迁移计划？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-007｜hard_physical

- itemType: priorityBand
- title / shortName: priorityBand 被误当 severity
- observedOrProposedValue: `hard_physical`
- proposedMeaningCN: 硬性物理事故优先级分组
- playerVisibleImpact: 当前用于 candidate 排序 / shadow expected，不应直接代表 severity 或扣分。
- exampleUseCase: `core/candidatePriorityShellEngine.js` 的 priority band order；golden shadow expected 中的 `priorityBandIncludes`。
- whyItMatters: priorityBand 是粗优先级，不是 severityLevel，也不是 scoreMultiplier。
- producerQuestion: future severity sheet 是否需要独立字段 `severityLevel`，并禁止从 priorityBand 直接推出扣分？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP-008｜baseLiquidNames / item.name

- itemType: displayName dependency
- title / shortName: 中文显示名参与结构分类
- observedOrProposedValue: `baseLiquidNames` / `item.name -> getTasteProfile(item.name)`
- proposedMeaningCN: 中文显示名参与结构分类
- playerVisibleImpact: 当前是 legacy structure analyzer 依赖，不应顺手重写。
- exampleUseCase: `core/drinkStructureAnalyzer.js` 中中文 Set 和 `item.name` profile 查询。
- whyItMatters: 中文显示名 / displayName 不是稳定机制主键；但替换它需要 metadata source-of-truth、shadow compare、review pack 与 golden 回归。
- producerQuestion: 是否先保持 legacy，等 categoryId / profileTag / operationProfile 来源设计后再迁移？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

## B. ChatGPT Technical Review Zone / 技术负责人审查区

本区用于检查每个条目的层级、来源、风险和阻塞 gate。它不代表最终结论。

### AIRP-001｜flavor_durian_overload

- technicalReviewStatus: needs_rename_plan
- observedLayer: accidentTypeId
- intendedLayer: accidentTypeId / legacy special case
- layerCorrectness: questionable because name is ingredient-specific
- sourceOfTruthStatus: observed in existing data / golden; no new source-of-truth created here
- stableIdRisk: high if copied as pattern for new accident types
- namingRisk: ingredient-specific mechanism split
- displayTextKeyRisk: low for this item
- sampleIdLeakRisk: low
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: medium, because flavor prefix may hide broader mechanism intent
- prioritySeverityMixRisk: low
- legacyMigrationRisk: migration_candidate
- validatorReadiness: blocked_no_provenance for new similar IDs
- generatedDataReadiness: do_not_promote
- runtimeTakeoverRisk: high if renamed without migration
- goldenImpact: existing references require explicit golden review before any migration
- recommendedGate: ID inventory / migration plan before severity active takeover
- blockerReason: existing references plus ingredient-specific naming risk

### AIRP-002｜extreme_lemon_accident

- technicalReviewStatus: sample_only
- observedLayer: sampleId
- intendedLayer: sampleId
- layerCorrectness: correct only if kept out of mechanism keys
- sourceOfTruthStatus: golden sample source
- stableIdRisk: high if reused as accidentTypeId / ruleId
- namingRisk: sample name looks like mechanism name
- displayTextKeyRisk: low
- sampleIdLeakRisk: high
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: low
- prioritySeverityMixRisk: low
- legacyMigrationRisk: low
- validatorReadiness: should be rejected outside sample/report fields
- generatedDataReadiness: do_not_promote
- runtimeTakeoverRisk: high if leaked into accidentTypeId
- goldenImpact: sample identity only
- recommendedGate: candidate severity validator must reject sampleId in ruleId / accidentTypeId
- blockerReason: sampleId must not become mechanism source-of-truth

### AIRP-003｜aroma_pressure

- technicalReviewStatus: risk_tag_only
- observedLayer: summary candidate risk / feedback hint
- intendedLayer: source metric / candidate risk
- layerCorrectness: not correct as future reviewed feedbackTag without mapping review
- sourceOfTruthStatus: observed in summary candidate; not feedbackTag source-of-truth
- stableIdRisk: high if treated as feedbackTag
- namingRisk: medium
- displayTextKeyRisk: low
- sampleIdLeakRisk: low
- candidateTagLeakRisk: high
- feedbackTagMappingRisk: high
- sourceLayerTriggerMetricRisk: medium, should remain tied to `flavorSummary.aromaPressure`
- prioritySeverityMixRisk: low
- legacyMigrationRisk: low
- validatorReadiness: needs_source_of_truth before any feedbackTag validation
- generatedDataReadiness: do_not_promote
- runtimeTakeoverRisk: high if generated feedback uses it without review
- goldenImpact: none unless final feedback / expected changes
- recommendedGate: feedbackTag mapping review before generated partial takeover
- blockerReason: candidate tag is not a future reviewed feedbackTag

### AIRP-004｜bubble_conflict

- technicalReviewStatus: ambiguous_cross_layer
- observedLayer: runtime observed feedbackTag
- intendedLayer: narrow feedbackTag for bubble / thick texture conflict
- layerCorrectness: correct only for narrow legacy context
- sourceOfTruthStatus: observed in legacy feedback pool; not future semantic approval
- stableIdRisk: medium if "observed" is mistaken for reviewed meaning
- namingRisk: high for generic flavor identity conflict reuse
- displayTextKeyRisk: low
- sampleIdLeakRisk: low
- candidateTagLeakRisk: medium
- feedbackTagMappingRisk: high
- sourceLayerTriggerMetricRisk: high if mapped to flavor identity conflict without proof
- prioritySeverityMixRisk: low
- legacyMigrationRisk: keep_legacy_for_now
- validatorReadiness: needs_mapping_review for new severity / threshold references
- generatedDataReadiness: do_not_promote for generic conflict rows
- runtimeTakeoverRisk: medium
- goldenImpact: only if final feedback routing changes
- recommendedGate: feedbackTag mapping review / producer review before reuse
- blockerReason: narrow legacy tag should not be generalized by name alone

### AIRP-005｜texture_dairy_fat_load_draft

- technicalReviewStatus: draft_only
- observedLayer: ruleId in sample sheet
- intendedLayer: draft rule row identity
- layerCorrectness: acceptable only as disabled sample draft
- sourceOfTruthStatus: sample-only draft
- stableIdRisk: high if copied into registry
- namingRisk: medium
- displayTextKeyRisk: low
- sampleIdLeakRisk: low
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: low because source fields are explicit
- prioritySeverityMixRisk: medium if draft score fields are filled before review
- legacyMigrationRisk: low
- validatorReadiness: should be accepted only as draft / disabled sample until registry exists
- generatedDataReadiness: do_not_promote
- runtimeTakeoverRisk: high if enabled without validator / review
- goldenImpact: none while disabled and not generated runtime data
- recommendedGate: mechanism review pack before any severity generated data
- blockerReason: draft suffix is not stable status

### AIRP-006｜dairy_fat_overload + sourceLayer=texture

- technicalReviewStatus: needs_rename_plan
- observedLayer: accidentTypeId with explicit source fields in sample
- intendedLayer: texture / drinkability severity source
- layerCorrectness: acceptable only if source fields override name interpretation
- sourceOfTruthStatus: existing legacy ID plus sample explanation; no new registry
- stableIdRisk: medium because name can mislead future AI
- namingRisk: high
- displayTextKeyRisk: low
- sampleIdLeakRisk: low
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: high; must follow `sourceLayer=texture`, `sourceSummary=textureSummary`, `triggerMetric=fatLoad`
- prioritySeverityMixRisk: low
- legacyMigrationRisk: migration_candidate
- validatorReadiness: needs_source_of_truth plus notes
- generatedDataReadiness: blocked until validator knows source-of-truth and source fields
- runtimeTakeoverRisk: high if sourceLayer is inferred from ID prefix
- goldenImpact: existing legacy expected references require careful review
- recommendedGate: ID naming audit and legacy migration plan before severity partial takeover
- blockerReason: ID name cannot override structured source fields

### AIRP-007｜hard_physical

- technicalReviewStatus: candidate_only
- observedLayer: priorityBand
- intendedLayer: candidate priority grouping
- layerCorrectness: correct only as priorityBand
- sourceOfTruthStatus: existing priority shell order
- stableIdRisk: medium if treated as severity
- namingRisk: low
- displayTextKeyRisk: low
- sampleIdLeakRisk: low
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: low
- prioritySeverityMixRisk: high
- legacyMigrationRisk: low
- validatorReadiness: must validate priorityBand separately from severityLevel
- generatedDataReadiness: do_not_use_as_score_multiplier
- runtimeTakeoverRisk: medium if severity inferred from priority
- goldenImpact: shadow expected includes priorityBand, not score expected
- recommendedGate: severity schema must keep priorityBand / severityLevel / scoreMultiplier separate
- blockerReason: priority is ordering, not severity math

### AIRP-008｜baseLiquidNames / item.name

- technicalReviewStatus: needs_migration_plan
- observedLayer: displayName dependency in structure analyzer
- intendedLayer: legacy displayName classification fallback
- layerCorrectness: tolerated legacy, not future mechanism key
- sourceOfTruthStatus: no categoryId / profileTag source-of-truth created here
- stableIdRisk: high if displayName becomes future key
- namingRisk: low
- displayTextKeyRisk: high
- sampleIdLeakRisk: low
- candidateTagLeakRisk: low
- feedbackTagMappingRisk: low
- sourceLayerTriggerMetricRisk: medium
- prioritySeverityMixRisk: low
- legacyMigrationRisk: migration_candidate
- validatorReadiness: blocked until metadata source-of-truth exists
- generatedDataReadiness: do_not_promote displayName fields
- runtimeTakeoverRisk: high if rewritten without shadow compare
- goldenImpact: any migration needs golden regression and review pack
- recommendedGate: metadata source-of-truth / shadow compare before structure migration
- blockerReason: displayName dependency requires staged migration, not direct replacement

## C. Decision Summary / 决策摘要

| reviewItemId | decision | allowedNextStep | blockedGate | requiredFollowup | owner | canEnterRegistry | canEnterValidator | canEnterGeneratedData | canAffectRuntime | requiresProducerReview | requiresGoldenUpdate | requiresMigrationPlan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AIRP-001 | needs_rename_plan | inventory / migration discussion | new accidentTypeId pattern | decide legacy keep vs migration | ChatGPT + user | no | no | no | no | yes | yes if changed | yes |
| AIRP-002 | sample_only | keep as golden / report sample | mechanism key usage | validator must reject sampleId leaks | Codex + ChatGPT | no | no as mechanism ID | no | no | no | no | no |
| AIRP-003 | needs_mapping_review | feedbackTag mapping review | feedbackTag field / partial takeover | decide whether aromaPressure needs reviewed tag | producer + ChatGPT | no | no | no | no | yes | no | no |
| AIRP-004 | ambiguous_cross_layer | keep narrow legacy context | generic flavor conflict reuse | mapping review and producer review | producer + ChatGPT | no | no for generic conflict | no | no | yes | yes if routing changes | maybe |
| AIRP-005 | draft_only | mechanism review pack | registry / generated severity data | keep disabled until validator / review | Codex + ChatGPT | no | no | no | no | yes before use | no | no |
| AIRP-006 | needs_rename_plan | add notes / migration plan | sourceLayer inference / partial takeover | legacy naming audit | ChatGPT + user | no new entry | no until source-of-truth | no | no | yes if changed | yes if changed | yes |
| AIRP-007 | candidate_only | keep separate schema fields | severity math | validate priorityBand separately | Codex + ChatGPT | no new entry | no as severity | no as score | no | no | no | no |
| AIRP-008 | needs_rename_plan | metadata source-of-truth design | runtime structure migration | category/profile source design + shadow compare | ChatGPT + user | no | no | no | no | yes if UX changes | yes if changed | yes |

## D. Machine Appendix / 机器详情附录

### AIRP-001 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: ingredient-specific accidentTypeId naming risk
- sourceEvidence: existing legacy rule and golden references
- rawSourceFile: `data/accidentRules.js`; `data/goldenSamples.js`; `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- sourceFile: `data/accidentRules.js`
- rawLineOrSection: `accidentTypeId: "flavor_durian_overload"` in accident rules and golden expected
- sourceLineOrSection: `data/accidentRules.js` durian overload rule; `data/goldenSamples.js` expected accident
- originalObservedValue: `flavor_durian_overload`
- proposedNewValue: none
- targetLayer: accidentTypeId
- intendedDestination: review only, not registry / validator / generated data / runtime
- sourceKind: legacy runtime / golden / docs
- observedLayer: accidentTypeId
- observedUsage: durian extreme ingredient accident
- currentStatus: existing referenced legacy ID
- suggestedStatus: migration_candidate / needs_review
- sourceLayerCandidate: flavor
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedIds: `fruit_durian`, `durian_accident`, `extreme_ingredient`
- relatedExistingIds: `fruit_durian`, `durian_accident`, `extreme_ingredient`
- relatedSamples: extreme durian golden samples
- whyCodexProposedThis: selected as representative accidentTypeId naming risk from existing repo evidence
- confidenceLevel: medium
- uncertaintyNotes: migration target requires future user / ChatGPT review
- currentRuntimeImpact: existing legacy behavior
- currentGeneratedImpact: none from this report
- currentReviewPackImpact: review only
- referencedDocs: stable ID guardrail, legacy inventory, mechanism TODO
- testCoverage: golden samples cover existing behavior
- knownWarnings: ingredient-specific mechanism naming
- rawCodexOutputExcerpt:
  - `accidentTypeId: "flavor_durian_overload"`
- diffReference: no runtime diff in this task

### AIRP-002 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: sampleId / mechanism ID confusion risk
- sourceEvidence: golden sample identity
- rawSourceFile: `data/goldenSamples.js`; `reports/stableIdSourceCollector.sample.md`; `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- sourceFile: `data/goldenSamples.js`
- rawLineOrSection: `id: "extreme_lemon_accident"`
- sourceLineOrSection: golden sample `id` field
- originalObservedValue: `extreme_lemon_accident`
- proposedNewValue: none
- targetLayer: sampleId
- intendedDestination: review only, not registry / validator / generated data / runtime
- sourceKind: golden sample / docs
- observedLayer: sampleId
- observedUsage: test sample identity
- currentStatus: sample-only
- suggestedStatus: do_not_promote
- sourceLayerCandidate:
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedIds: `taste_acid_overload`, lemon recipe evidence
- relatedExistingIds: `taste_acid_overload`
- relatedSamples: `extreme_lemon_accident`
- whyCodexProposedThis: selected because name looks like accident mechanism but is a sample
- confidenceLevel: high
- uncertaintyNotes: none for current layer; future validator behavior still needs design
- currentRuntimeImpact: none as mechanism ID
- currentGeneratedImpact: none
- currentReviewPackImpact: sample selection / review label
- referencedDocs: stable ID guardrail sampleId section
- testCoverage: golden sample exists
- knownWarnings: sample name resembles accident mechanism
- rawCodexOutputExcerpt:
  - `sampleId: extreme_lemon_accident`
- diffReference: no data diff in this task

### AIRP-003 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: candidate / risk tag can be mistaken for feedbackTag
- sourceEvidence: summary candidate engine and feedbackTag mapping docs
- rawSourceFile: `core/summaryCandidateEngine.js`; `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`; `content_sheets/examples/candidate_severity_rules.sample.csv`
- sourceFile: `core/summaryCandidateEngine.js`
- rawLineOrSection: `feedbackTags: ["aroma_pressure"]`; sample row has blank feedbackTag after v0.0.7.26 ambiguity fix
- sourceLineOrSection: aroma pressure candidate block
- originalObservedValue: `aroma_pressure`
- proposedNewValue: none
- targetLayer: candidate risk / feedback hint
- intendedDestination: review only, not feedbackTag registry / validator / generated data / runtime
- sourceKind: readonly candidate / docs / sample sheet
- observedLayer: summary candidate risk tag
- observedUsage: aromaPressure feedback candidate
- currentStatus: not a future reviewed feedbackTag
- suggestedStatus: needs_mapping_review
- sourceLayerCandidate: flavor
- sourceSummaryCandidate: flavorSummary
- triggerMetricCandidate: aromaPressure
- relatedIds: `flavor_aroma_pressure_candidate`, `high_aroma_pressure_risk`
- relatedExistingIds: `flavor_aroma_pressure_candidate`, `high_aroma_pressure_risk`
- relatedSamples: none
- whyCodexProposedThis: selected because it has repeatedly appeared as candidate risk but is not a reviewed feedbackTag
- confidenceLevel: high
- uncertaintyNotes: future feedbackTag status requires mapping review / producer review
- currentRuntimeImpact: none as final feedback tag
- currentGeneratedImpact: should remain out of generated feedback until reviewed
- currentReviewPackImpact: review warning
- referencedDocs: feedbackTag mapping design
- testCoverage: golden shadow may observe risk/candidate fields
- knownWarnings: candidate tag leak into feedbackTag field
- rawCodexOutputExcerpt:
  - `feedbackTags: ["aroma_pressure"]`
- diffReference: no script / data diff in this task

### AIRP-004 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: runtime observed feedbackTag semantic generalization risk
- sourceEvidence: legacy feedback pool and mapping docs
- rawSourceFile: `data/feedbackTexts.js`; `core/feedbackEngine.js`; `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`; `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- sourceFile: `data/feedbackTexts.js`
- rawLineOrSection: `bubble_conflict: "bubbleConflict"` and legacy feedback push
- sourceLineOrSection: feedbackTag pool mapping and feedbackEngine bubble / thick branch
- originalObservedValue: `bubble_conflict`
- proposedNewValue: none
- targetLayer: feedbackTag
- intendedDestination: review only, not generic conflict registry / validator / generated data / runtime takeover
- sourceKind: runtime observed feedbackTag / docs warning
- observedLayer: feedbackTag
- observedUsage: bubble / thick texture conflict follow-up
- currentStatus: observable legacy feedbackTag with narrow semantics, not future semantic approval
- suggestedStatus: keep_legacy_for_now / needs_mapping_review for reuse
- sourceLayerCandidate: texture / feedback
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedIds: `bubbleConflict`, bubble texture evidence
- relatedExistingIds: `bubbleConflict`
- relatedSamples: feedback text sample rows using `bubble_conflict`
- whyCodexProposedThis: selected because observed runtime tag can be over-generalized by future AI
- confidenceLevel: high
- uncertaintyNotes: current runtime semantics are narrow; future mapping needs producer review
- currentRuntimeImpact: existing final feedback may use it
- currentGeneratedImpact: no new generated usage from this report
- currentReviewPackImpact: semantic warning
- referencedDocs: feedbackTag mapping design and source-of-truth design
- testCoverage: golden final feedback may cover legacy behavior
- knownWarnings: should not map to generic flavor identity conflict
- rawCodexOutputExcerpt:
  - `bubble_conflict: "bubbleConflict"`
- diffReference: no runtime diff in this task

### AIRP-005 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: draft ruleId can be mistaken for registry-ready ruleId
- sourceEvidence: candidate severity sample sheet disabled row
- rawSourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`; `content_sheets/examples/candidate_severity_rules.sample.json`
- sourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`
- rawLineOrSection: `ruleId: texture_dairy_fat_load_draft`, `enabled=FALSE`
- sourceLineOrSection: CSV row with `texture_dairy_fat_load_draft`
- originalObservedValue: `texture_dairy_fat_load_draft`
- proposedNewValue: none
- targetLayer: draft ruleId
- intendedDestination: review only, not registry / validator / generated data / runtime
- sourceKind: sample sheet draft
- observedLayer: ruleId
- observedUsage: disabled candidate severity rule sample
- currentStatus: draft-only
- suggestedStatus: do_not_promote
- sourceLayerCandidate: texture
- sourceSummaryCandidate: textureSummary
- triggerMetricCandidate: fatLoad
- relatedIds: `dairy_fat_overload`, `texture_drinkability`
- relatedExistingIds: `dairy_fat_overload`, `texture_drinkability`
- relatedSamples: candidate severity sample row only
- whyCodexProposedThis: selected because sample sheet draft IDs are easy for future Codex to over-promote
- confidenceLevel: high
- uncertaintyNotes: no validator exists yet for candidate severity sheet
- currentRuntimeImpact: none
- currentGeneratedImpact: none
- currentReviewPackImpact: proof item
- referencedDocs: mechanism TODO, stable ID guardrail
- testCoverage: JSON / CSV health only, no validator yet
- knownWarnings: draft suffix must not be treated as stable state
- rawCodexOutputExcerpt:
  - `texture_dairy_fat_load_draft,FALSE,accident,dairy_fat_overload`
- diffReference: no content sheet diff in this task

### AIRP-006 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: ID name can override explicit source fields if future AI infers layer from prefix
- sourceEvidence: legacy accident ID plus candidate severity sample source fields
- rawSourceFile: `core/accidentAnalyzer.js`; `content_sheets/examples/candidate_severity_rules.sample.csv`; `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- sourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`
- rawLineOrSection: `accidentTypeId: "dairy_fat_overload"` and sample row source fields
- sourceLineOrSection: sample row with `sourceLayer=texture`, `sourceSummary=textureSummary`, `triggerMetric=fatLoad`
- originalObservedValue: `dairy_fat_overload`
- proposedNewValue: none
- targetLayer: accidentTypeId with source fields
- intendedDestination: review only, not registry / validator / generated data / runtime
- sourceKind: legacy runtime / sample sheet / docs guardrail
- observedLayer: accidentTypeId
- observedUsage: dairy / fat load accident with texture source in sample row
- currentStatus: legacy referenced ID requiring notes
- suggestedStatus: migration_candidate / needs_migration_plan
- sourceLayerCandidate: texture
- sourceSummaryCandidate: textureSummary
- triggerMetricCandidate: fatLoad
- relatedIds: `texture_dairy_fat_load_draft`, `greasy_overload`
- relatedExistingIds: `texture_dairy_fat_load_draft`, `greasy_overload`
- relatedSamples: candidate severity sample row
- whyCodexProposedThis: selected to enforce "ID name cannot override sourceLayer / sourceSummary / triggerMetric"
- confidenceLevel: high
- uncertaintyNotes: legacy naming migration requires future plan
- currentRuntimeImpact: existing accident behavior
- currentGeneratedImpact: none
- currentReviewPackImpact: source-field warning
- referencedDocs: source-of-truth design, stable ID guardrail
- testCoverage: golden covers existing behavior
- knownWarnings: ID prefix cannot infer sourceLayer
- rawCodexOutputExcerpt:
  - `sourceLayer=texture`
  - `triggerMetric=fatLoad`
- diffReference: no runtime diff in this task

### AIRP-007 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: priorityBand can be mistaken for severityLevel / scoreMultiplier
- sourceEvidence: candidate priority shell and golden shadow expected
- rawSourceFile: `core/candidatePriorityShellEngine.js`; `data/goldenSamples.js`; `docs/TASTE_ENGINE_ARCHITECTURE.md`
- sourceFile: `core/candidatePriorityShellEngine.js`
- rawLineOrSection: `priorityBandOrder` and `priorityBandIncludes`
- sourceLineOrSection: priority band order array
- originalObservedValue: `hard_physical`
- proposedNewValue: none
- targetLayer: priorityBand
- intendedDestination: review only, not severity table / validator / generated data / runtime scoring
- sourceKind: runtime candidate shell / golden shadow / docs
- observedLayer: priorityBand
- observedUsage: candidate ordering group
- currentStatus: candidate priority field
- suggestedStatus: keep separate from severityLevel
- sourceLayerCandidate:
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedIds: `texture_blocking`, `texture_drinkability`, `taste_overload`
- relatedExistingIds: `texture_blocking`, `texture_drinkability`, `taste_overload`
- relatedSamples: golden shadow expected priorityBandIncludes
- whyCodexProposedThis: selected because priorityBand / severity / scoreMultiplier boundary is a recurring guardrail
- confidenceLevel: high
- uncertaintyNotes: future severity schema still needs separate design
- currentRuntimeImpact: candidate order only
- currentGeneratedImpact: none
- currentReviewPackImpact: schema warning
- referencedDocs: architecture docs
- testCoverage: shadow golden expected checks structure
- knownWarnings: priorityBand is not scoreMultiplier
- rawCodexOutputExcerpt:
  - `priorityBandOrder = ["hard_physical", ...]`
- diffReference: no script diff in this task

### AIRP-008 raw details

- generatedByTask: v0.0.7.38 AI-generated ID / tag naming review pack proof
- generatedReason: displayName dependency can become hidden system key
- sourceEvidence: drinkStructureAnalyzer displayName Sets and inventory docs
- rawSourceFile: `core/drinkStructureAnalyzer.js`; `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`
- sourceFile: `core/drinkStructureAnalyzer.js`
- rawLineOrSection: `baseLiquidNames`, `flavorNames`, `item.name -> getTasteProfile(item.name)`
- sourceLineOrSection: top-level displayName Sets and `getTasteProfile(item.name)` call site
- originalObservedValue: `baseLiquidNames` / `item.name`
- proposedNewValue: none
- targetLayer: displayName dependency
- intendedDestination: review only, not categoryId / profileTag / registry / validator / runtime migration
- sourceKind: legacy runtime / docs inventory
- observedLayer: displayName dependency
- observedUsage: structure classification
- currentStatus: inventory / migration plan, not runtime change permission
- suggestedStatus: keep_legacy_for_now until metadata source-of-truth
- sourceLayerCandidate: texture / structure
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedIds: future categoryId / profileTag not created here
- relatedExistingIds: none created by this task
- relatedSamples: none
- whyCodexProposedThis: selected because v0.0.7.37 inventory identified displayName-keyed structure risks
- confidenceLevel: high
- uncertaintyNotes: replacement requires metadata source-of-truth and staged shadow compare
- currentRuntimeImpact: existing structure analysis
- currentGeneratedImpact: none
- currentReviewPackImpact: displayName key warning
- referencedDocs: drinkStructure displayName inventory, mechanism TODO
- testCoverage: golden samples cover current behavior broadly
- knownWarnings: direct replacement would be risky without shadow compare
- rawCodexOutputExcerpt:
  - `baseLiquidNames.has(name)`
  - `getTasteProfile(item.name)`
- diffReference: no runtime diff in this task

## 5. 后续可考虑

- 让用户 / ChatGPT 复查本 proof 是否便于判断 ID / tag 命名风险。
- 将 review fields 调整为更适合批量审计的表格或 CSV，但仍不得自动批准 ID。
- 在正式 AI 生成 ID 与机制命名 inventory 中引用本 proof 的结构，而不是把本 proof 当成 source-of-truth。
- 在 validator / registry / generated data 任务前，先确认 known stable ID source-of-truth。
