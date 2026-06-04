# AI-generated ID / tag naming review pack｜v0.0.7.39

## 0. Report Positioning / 使用边界

本报告是 v0.0.7.39 的正式 AI-generated ID / tag naming review pack。

它用于把当前 repo、docs、reports、sample sheet 和 generated shadow content 中已经观察到的 ID / tag / rule / sample / candidate / source 字段放到同一份可审查材料里，帮助用户和 ChatGPT 判断：

- 哪些只是 observed。
- 哪些需要 notes。
- 哪些 needs review。
- 哪些是 migration candidate。
- 哪些 gate 仍阻塞 validator / generated data / partial takeover。

本报告不是批准结论。

- 不是 registry。
- 不是 enum。
- 不是 schema。
- 不是 validator input。
- 不是 generated data。
- 不是 runtime source-of-truth。
- 不批准任何 ID / tag / rule。
- 不允许任何条目进入 runtime / generated data / validator / registry / partial takeover / active takeover。
- 不重命名任何已有 ID。
- 不改变玩家最终 score / feedback / accident / drinkType / result.type / golden expected。

> v0.0.7.41 migration note:
> This report is a pre-migration review pack. Any `taste_conflict` occurrence in this report is a historical / pre-v0.0.7.41 observation.
> Current effective flavor identity conflict outcomeTypeId is `flavor_identity_conflict`.
> This note does not approve any ID / tag / rule and does not turn this report into registry, validator input, generated data, or runtime source-of-truth.
- P1-1 不能视为已解决；本轮只表示已经形成正式 review pack，仍待用户 / ChatGPT 决策、migration plan 或 source-of-truth 任务。

## 1. Executive Summary / 速读结论

- 本报告共整理 14 个 review item，覆盖 accidentTypeId、outcomeTypeId、drinkTypeId、feedbackTag / candidate tag / risk tag、textId、sampleId、ruleId / draftId、candidateId、priorityBand、severityHint、severityLevel、sourceLayer / sourceSummary / triggerMetric、profile / structure / displayName dependency。
- 多数 item 当前只能保持 observed / needs note / needs review / migration candidate 状态，不能进入 validator、generated data 或 runtime 接管。
- `aroma_pressure` 仍不能当 runtime feedbackTag。
- `bubble_conflict` 仍不能泛化为 generic flavor identity conflict。
- `priorityBand` 仍不能当 severityLevel / scoreMultiplier。
- `sampleId` 仍不能当 mechanism key。
- ID 名称不能覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。
- candidate severity sheet validator 仍在后面，不能早于 review / source-of-truth gate。

## A. Human Review Zone / 制作人审核区

本区给制作人和非程序员先看。你只需要判断这些名字、标签和字段含义是否容易误导，是否需要保留观察、补说明、复查、迁移计划或暂缓。

reviewStatus 可填：

- pending
- needs_more_context
- revise
- reject
- keep_observed
- do_not_promote
- split_required

常见中文问题标签可直接写：像原料不是机制、像样本不是机制、像文案不是主键、语义太宽、sourceLayer 不清楚、triggerMetric 不清楚、疑似 sampleId 泄漏、疑似 candidate tag 泄漏、疑似显示文案主键、需要改名计划、可以做候选但别接 runtime、先别让 Codex 继续引用。

### AIRP39-001｜基础事故机制 ID

- reviewItemId: AIRP39-001
- title / shortName: 酸度与吸管阻力这类基础事故机制
- itemType: accidentTypeId
- observedOrProposedValue: `taste_acid_overload`, `texture_straw_resistance`
- proposedMeaningCN: 酸度过载、吸管阻力事故这类已经反复出现在 runtime / golden / generated shadow / sample sheet 的事故机制。
- playerVisibleImpact: 当前会参与玩家最终事故或 golden 断言；本报告不改它们。
- exampleUseCase: 极端柠檬事故、吸管阻力事故、generated feedback accident 文案。
- whyItMatters: 这些 ID 相对清楚，但仍需要 source-of-truth notes，避免 future validator 从字符串猜合法性。
- producerQuestion: 这些机制名是否符合制作人理解？是否需要补中文说明，而不是改名？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-002｜按原料 / 内容拆出来的 legacy 事故 ID

- reviewItemId: AIRP39-002
- title / shortName: 榴莲、芋泥、奥利奥等 legacy 事故名
- itemType: accidentTypeId
- observedOrProposedValue: `flavor_durian_overload`, `industrial_creamer_overload`, `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload`, `taste_strong_flavor_overload`
- proposedMeaningCN: 已存在的 legacy 事故 ID，其中一些包含具体原料或内容语义。
- playerVisibleImpact: 当前可能影响事故、分数、反馈或 golden；不能在本报告里改名。
- exampleUseCase: 榴莲事故、植脂奶工业感、芋泥 / 奥利奥 / 小料过载、强风味过载。
- whyItMatters: 这些 ID 容易诱导 future Codex 继续按原料拆机制。
- producerQuestion: 未来它们应保留为 legacy 特例，还是进入迁移计划，转为更泛化的 flavor / texture / taste 机制？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-003｜结构 / 可饮用性事故 ID

- reviewItemId: AIRP39-003
- title / shortName: 奶脂厚重、低可饮用性和固体过载
- itemType: accidentTypeId
- observedOrProposedValue: `dairy_fat_overload`, `texture_low_drinkability`, `texture_solid_overload`
- proposedMeaningCN: 厚重负担、喝不动、固体太多等结构 / 可饮用性事故方向。
- playerVisibleImpact: `dairy_fat_overload` 当前已经影响 final accident / feedback；结构规则也可能影响最终事故追加。
- exampleUseCase: 奶脂过载、半固体低可饮用性、高质地低液体支撑。
- whyItMatters: `dairy_fat_overload` 名称含 dairy，但 sample sheet 已把相关草案钉为 `sourceLayer=texture` / `triggerMetric=fatLoad`；ID 名称不能覆盖 source 字段。
- producerQuestion: 玩家体验上这些更像“奶脂过载”还是“质地太厚 / 喝不动”？后续是否需要 notes 或迁移计划？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-004｜Outcome 结果 ID

- reviewItemId: AIRP39-004
- title / shortName: 风味冲突和猎奇实验 outcome
- itemType: outcomeTypeId
- observedOrProposedValue: legacy `taste_conflict` / current `flavor_identity_conflict`, `novelty_experiment`
- proposedMeaningCN: 味道冲突 / 猎奇实验这类结果候选。
- playerVisibleImpact: `taste_conflict` 在本 report 生成时曾出现在 golden / generated / sample sheet；v0.0.7.41 后当前有效 outcomeTypeId 是 `flavor_identity_conflict`。`novelty_experiment` 当前更偏 candidate-only。
- exampleUseCase: 气泡奶油冲突、风味身份冲突、榴莲猎奇风险。
- whyItMatters: legacy `taste_conflict` 名字里有 taste，但不代表 sourceLayer 必须是 taste；v0.0.7.41 后的 `flavor_identity_conflict` 也不能只靠名字反推 sourceLayer。outcome ID 不能被误读成 sourceLayer。
- producerQuestion: 这些 outcome 名称是否适合表达玩家看到的结果？是否需要拆分“味道冲突”和“猎奇实验”方向？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-005｜饮品类型 ID

- reviewItemId: AIRP39-005
- title / shortName: runtime 规则和 analyzer special path 里的饮品类型
- itemType: drinkTypeId
- observedOrProposedValue: `classic_milk_tea`, `fresh_fruit_tea`, `premium_thick_milk_tea`, `durian_milkshake`, `durian_milk`, `dessert_milkshake`, `sparkling_fruit_tea`, `brown_sugar_pearl_milk_tea`, `coffee_special`, `fruit_special`, `light_tea_drink`, `experimental_special`, `fruit_jasmine_tea`, `fruit_green_tea`, `fruit_oolong_tea`, `fruit_black_tea`, `flower_fruit_tea`
- proposedMeaningCN: 饮品类型身份，包括规则表定义和 analyzer 的水果茶 special path。
- playerVisibleImpact: 当前可影响玩家最终饮品类型。
- exampleUseCase: 经典奶茶、清爽水果茶、高级厚乳款、榴莲奶昔、水果茉莉茶等。
- whyItMatters: 有些 ID 来自规则表，有些来自 analyzer special path；后续 registry / source-of-truth 需要记录来源，不能只看字符串。
- producerQuestion: 这些类型是否需要统一说明来源？水果茶分支是否需要后续从 displayName fallback 迁移？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-006｜runtime / generated feedbackTag

- reviewItemId: AIRP39-006
- title / shortName: 已观察到的文案选择标签
- itemType: feedbackTag
- observedOrProposedValue: `accident`, `acid_accident`, `acid_milk_conflict`, `bubble_conflict`, `classic`, `premium`, `durian`, `greasy_overload`, `straw_disaster`, `normal_good`, `weird`, `fresh`, `sweet`, `dessert`, `thick_followup`, `straw_followup`, `thick_straw_followup`
- proposedMeaningCN: 当前 runtime feedback pool、generated shadow 文案或 golden 中可观察的文案选择标签。
- playerVisibleImpact: 当前部分 tag 会影响玩家看到的反馈文案。
- exampleUseCase: 酸度事故文案、奶脂过载文案、吸管阻力文案、气泡厚重追评、经典奶茶文案。
- whyItMatters: observed runtime / generated tag 不等于 future reviewed feedbackTag；同名跨层需要 notes。
- producerQuestion: 哪些文案标签语义太宽？哪些需要拆分、补文案池或制作人 review？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-007｜candidate / risk tag

- reviewItemId: AIRP39-007
- title / shortName: 只读 candidate 风险名
- itemType: candidate tag / risk tag
- observedOrProposedValue: `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, `novelty`, `sweet_overload`, `bitterness_overload`, `texture_heavy`, `low_drinkability`
- proposedMeaningCN: summary candidate / rule 风险语义，不等于玩家文案标签。
- playerVisibleImpact: 当前不应直接影响玩家最终 feedback。
- exampleUseCase: 香气压力、身份冲突、低饮品适配、咸味身份、沉淀风险、甜味 / 苦味过载。
- whyItMatters: candidate / risk tag 不能自动成为 runtime feedbackTag；`aroma_pressure` 当前不是 runtime 文案池 feedbackTag。
- producerQuestion: 哪些风险名值得未来做成玩家文案方向？哪些只适合留在机器解释里？
- reviewStatus: do_not_promote
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-008｜feedback 文案 textId

- reviewItemId: AIRP39-008
- title / shortName: generated feedback text IDs
- itemType: textId
- observedOrProposedValue: `feedback_classic_001`, `feedback_bubble_conflict_001`, `feedback_disabled_idea_001`
- proposedMeaningCN: 单条文案 ID，只标识具体文案。
- playerVisibleImpact: enabled 文案可能在 shadow / future partial review 中出现；disabled 文案不应被视为 active 文案。
- exampleUseCase: 经典奶茶文案、气泡冲突追评、禁用想法样例。
- whyItMatters: textId 不能代表机制、事故、ruleId 或 candidateId。
- producerQuestion: 是否需要在文案评审表里继续保持 textId 只作为“文案编号”？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-009｜golden / review sampleId

- reviewItemId: AIRP39-009
- title / shortName: 测试样本身份
- itemType: sampleId
- observedOrProposedValue: `classic_milk_tea`, `extreme_lemon_accident`, `straw_resistance_accident`, `bubble_cream_conflict`
- proposedMeaningCN: golden samples / review pack / 测试定位用的样本身份。
- playerVisibleImpact: 当前只用于测试和 review 定位；不能成为机制主键。
- exampleUseCase: 经典奶茶、极端柠檬事故、吸管阻力事故、气泡奶油冲突。
- whyItMatters: `extreme_lemon_accident` 看起来像事故名，但它是 sampleId，不是 accidentTypeId / ruleId。
- producerQuestion: 是否需要在后续 report 中更明确标注 sampleId 只是样本？
- reviewStatus: do_not_promote
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-010｜candidate severity draft ruleId

- reviewItemId: AIRP39-010
- title / shortName: disabled 草案规则行
- itemType: ruleId / draftId
- observedOrProposedValue: `taste_acid_overload_draft`, `texture_straw_resistance_draft`, `texture_dairy_fat_load_draft`, `flavor_aroma_pressure_feedback_draft`, `flavor_identity_conflict_outcome_draft`
- proposedMeaningCN: candidate severity sample sheet 中 disabled draft 行的规则身份。
- playerVisibleImpact: 当前不接 runtime，不影响玩家。
- exampleUseCase: 酸度过载、吸管阻力、奶脂厚重、香气压力反馈、风味身份冲突 outcome 草案。
- whyItMatters: disabled draft 也会被 future Codex 读取；draft ruleId 不应进入 registry / validator / generated data。
- producerQuestion: 这些草案是否适合作为“未来可审查方向”，还是有些应该删掉或拆分？
- reviewStatus: do_not_promote
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-011｜summary candidateId

- reviewItemId: AIRP39-011
- title / shortName: taste / texture / flavor candidate IDs
- itemType: candidateId
- observedOrProposedValue: `taste_*_candidate`, `texture_*_candidate`, `flavor_*_candidate`
- proposedMeaningCN: summary candidate 层的候选身份，不是最终事故 / outcome / drinkType。
- playerVisibleImpact: 当前为只读 candidate / shadow 解释，不应直接接管 final result。
- exampleUseCase: `taste_acid_overload_candidate`, `texture_straw_resistance_candidate`, `flavor_aroma_pressure_candidate`。
- whyItMatters: candidateId 可以引用 accidentTypeId / outcomeTypeId，但自身不是最终结果 ID。
- producerQuestion: 这些 candidate 名称是否需要更多中文说明，避免被误认为玩家结果？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-012｜priorityBand / severityHint / severityLevel

- reviewItemId: AIRP39-012
- title / shortName: 优先级分组和严重度边界
- itemType: priorityBand / severityHint / severityLevel
- observedOrProposedValue: `hard_physical`, `texture_drinkability`, `taste_overload`, `flavor_identity`, `normal_conflict`, `positive_synergy`, `type_classification`, `feedback_hint`, aliases `texture_blocking`, `texture_load`, `flavor_fit`, `positive_combo`; severityHint `low` / `medium` / `high`; severityLevel empty / unset / draft。
- proposedMeaningCN: candidate 排序分组、候选提示严重度、未来真正调参 severity 层。
- playerVisibleImpact: 当前不应直接影响最终扣分。
- exampleUseCase: hard_physical 用于吸管阻力候选排序；severityHint 用于候选提示；severityLevel 在 sample sheet 当前为空。
- whyItMatters: priorityBand 不是 severity，severityHint 不是最终 severity，不能从 priorityBand 直接推出 scoreMultiplier。
- producerQuestion: “优先看”与“扣多重”是否应在后续表格里继续分开？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-013｜sourceLayer / sourceSummary / triggerMetric

- reviewItemId: AIRP39-013
- title / shortName: 来源层、summary 和触发指标
- itemType: sourceLayer / sourceSummary / triggerMetric
- observedOrProposedValue: sourceLayer `taste` / `texture` / `flavor`; sourceSummary `tasteSummary` / `textureSummary` / `flavorSummary` / `summaryCandidates`; triggerMetric `acidity`, `sweetness`, `bitterness`, `strawResistance`, `solidLoad`, `drinkability`, `fatLoad`, `sedimentRisk`, `aromaPressure`, `noveltyRisk`, `savoryRisk`, `beverageFit`, `identityConflictRisk`
- proposedMeaningCN: 机制候选来自哪一层、读哪份 summary、由哪个 metric 触发。
- playerVisibleImpact: 当前主要用于解释和未来 validator / generated data 设计；不应直接改变玩家结果。
- exampleUseCase: `dairy_fat_overload` sample row 写明 `sourceLayer=texture` / `triggerMetric=fatLoad`；`aroma_pressure` 来自 `flavorSummary.aromaPressure`。
- whyItMatters: 不得根据 ID 字符串前缀反推 sourceLayer；triggerMetric 需要 per-sourceSummary schema。
- producerQuestion: 这些机器字段是否需要更清楚的中文解释，方便后续 review？
- reviewStatus: needs_more_context
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### AIRP39-014｜profile / structure / displayName dependency

- reviewItemId: AIRP39-014
- title / shortName: 显示名和中文 category 依赖
- itemType: profile / structure / displayName dependency
- observedOrProposedValue: `baseLiquidNames`, `flavorNames`, `textureNames`, `sweetenerNames`, `item.name -> getTasteProfile(item.name)`, `ingredientMeta.category`, `ingredientTextureProfiles` displayName-keyed profiles, `context.countByCategory("茶类" / "小料" / "乳类" / "水果/风味")`, drinkTypeAnalyzer primary tea displayName logic, drinkTypeRules legacy ingredient fields
- proposedMeaningCN: 当前 legacy 结构 / 类型 / profile 路径中仍有显示名和中文 category 参与判断。
- playerVisibleImpact: 当前可能影响 structure summary、drink type 或 final score；不能在本报告里重写。
- exampleUseCase: `drinkStructureAnalyzer` 中文 Set、`tasteJudge` 中文 category count、`drinkTypeAnalyzer` primary tea 中文名逻辑。
- whyItMatters: 显示名 / 中文 / 人类可读 label 不能作为长期系统主键；但当前 legacy 不能顺手替换。
- producerQuestion: 后续是否先做 metadata source-of-truth 和 shadow compare，再考虑迁移？
- reviewStatus: keep_observed
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

## B. ChatGPT Technical Review Zone / 技术负责人审查区

### AIRP39-001 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: accidentTypeId
- intendedLayer: accidentTypeId
- layerCorrectness: mostly correct as observed runtime / golden mechanism IDs.
- sourceOfTruthStatus: observed in runtime / golden / generated / sample sheet, but no formal registry.
- stableIdRisk: not stable as future registry entry until source-of-truth design confirms.
- namingRisk: low to medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium because related feedbackTags appear in generated content.
- sourceLayerTriggerMetricRisk: medium; source fields must stay explicit.
- prioritySeverityMixRisk: medium for future severity table.
- legacyMigrationRisk: low for `taste_acid_overload`, medium for `texture_straw_resistance`.
- validatorReadiness: needs source-of-truth.
- generatedDataReadiness: not yet.
- runtimeTakeoverRisk: no new risk from this report.
- goldenImpact: current golden references exist; no change.
- recommendedGate: source-of-truth / registry design before validator.
- blockerReason: no formal known ID source yet.

### AIRP39-002 Technical Review

- technicalReviewStatus: needs_rename_plan
- observedLayer: accidentTypeId
- intendedLayer: legacy accidentTypeId / migration candidate.
- layerCorrectness: questionable for future design because several names include ingredient or content semantics.
- sourceOfTruthStatus: observed in runtime / docs / inventory; no formal registry.
- stableIdRisk: not stable as future pattern.
- namingRisk: high.
- displayTextKeyRisk: medium for notes / labels.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium.
- sourceLayerTriggerMetricRisk: high.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: high.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if renamed without migration.
- goldenImpact: likely if any rename or trigger change happens.
- recommendedGate: accidentAnalyzer migration review pack and ID naming decision.
- blockerReason: legacy references and naming ambiguity.

### AIRP39-003 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: accidentTypeId with source fields.
- intendedLayer: structure / drinkability accident direction.
- layerCorrectness: acceptable only when sourceLayer / sourceSummary / triggerMetric are explicit.
- sourceOfTruthStatus: observed but not formalized.
- stableIdRisk: not stable as future registry entry without notes.
- namingRisk: high for `dairy_fat_overload`.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium through `greasy_overload`.
- sourceLayerTriggerMetricRisk: high.
- prioritySeverityMixRisk: medium.
- legacyMigrationRisk: high.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if sourceLayer inferred from ID prefix.
- goldenImpact: possible if migration changes final accident.
- recommendedGate: source field schema + migration plan before severity validator.
- blockerReason: source meaning must be nailed down before build / generated data.

### AIRP39-004 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: outcomeTypeId
- intendedLayer: outcome candidate / final outcome.
- layerCorrectness: legacy `taste_conflict` was observed before v0.0.7.41; current effective outcomeTypeId is `flavor_identity_conflict`. `novelty_experiment` is candidate-only until source-of-truth review.
- sourceOfTruthStatus: mixed observed layers.
- stableIdRisk: not stable for candidate-only outcome.
- namingRisk: medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium for novelty.
- feedbackTagMappingRisk: medium.
- sourceLayerTriggerMetricRisk: high because legacy `taste_conflict` must not force sourceLayer=taste, and current `flavor_identity_conflict` still must be explained through explicit source fields.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: medium.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: medium.
- goldenImpact: possible for taste conflict samples.
- recommendedGate: outcome source-of-truth review.
- blockerReason: outcome ID and sourceLayer must remain separate.

### AIRP39-005 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: drinkTypeId
- intendedLayer: drink type identity.
- layerCorrectness: observed through rules and analyzer special paths.
- sourceOfTruthStatus: mixed runtime rule and analyzer sources.
- stableIdRisk: not stable as formal registry until source-of-truth is designed.
- namingRisk: low to medium.
- displayTextKeyRisk: high for primary tea displayName fallback.
- sampleIdLeakRisk: medium where sampleId equals drinkTypeId string.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium because some feedbackTags share words like classic / premium.
- sourceLayerTriggerMetricRisk: low.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: medium.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if analyzer special path is rewritten.
- goldenImpact: likely if drinkType routing changes.
- recommendedGate: drinkType source-of-truth notes and displayName fallback plan.
- blockerReason: rule source and analyzer special path are not unified.

### AIRP39-006 Technical Review

- technicalReviewStatus: needs_mapping_review
- observedLayer: feedbackTag
- intendedLayer: feedback text selection tag.
- layerCorrectness: mixed runtime observed and generated shadow layers.
- sourceOfTruthStatus: no formal feedbackTag registry.
- stableIdRisk: not stable as future reviewed tag.
- namingRisk: medium.
- displayTextKeyRisk: medium.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium where strings overlap generated / candidate layers.
- feedbackTagMappingRisk: high.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: medium.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready for active takeover.
- runtimeTakeoverRisk: high for generated feedback partial / active takeover.
- goldenImpact: possible if final feedback changes.
- recommendedGate: feedbackTag mapping review / producer review.
- blockerReason: observed runtime tag is not enough for future reviewed source.

### AIRP39-007 Technical Review

- technicalReviewStatus: risk_tag_only
- observedLayer: candidate / risk tag.
- intendedLayer: summary candidate explanation.
- layerCorrectness: correct only as candidate / risk semantics.
- sourceOfTruthStatus: no feedbackTag source-of-truth.
- stableIdRisk: not stable.
- namingRisk: medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: high.
- feedbackTagMappingRisk: high.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: medium.
- legacyMigrationRisk: low.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if mapped to feedbackTag.
- goldenImpact: none unless final feedback changes.
- recommendedGate: feedbackTag mapping review and source-of-truth design.
- blockerReason: candidate / risk tag cannot be promoted by string match.

### AIRP39-008 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: textId.
- intendedLayer: single feedback text identity.
- layerCorrectness: correct if kept as text identity only.
- sourceOfTruthStatus: generated shadow data / sample sheet.
- stableIdRisk: not stable as mechanism ID.
- namingRisk: low.
- displayTextKeyRisk: medium if zhCN becomes key.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium through related feedbackTag.
- sourceLayerTriggerMetricRisk: low.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: low.
- validatorReadiness: text validator exists for feedback sheet, but not ID registry.
- generatedDataReadiness: generated shadow only.
- runtimeTakeoverRisk: high if disabled text becomes active accidentally.
- goldenImpact: possible if final feedback changes.
- recommendedGate: producer review before active feedback use.
- blockerReason: textId is not mechanism identity.

### AIRP39-009 Technical Review

- technicalReviewStatus: sample_only
- observedLayer: sampleId.
- intendedLayer: golden / review sample identity.
- layerCorrectness: correct only in sample / test fields.
- sourceOfTruthStatus: golden samples / reports.
- stableIdRisk: not stable as mechanism ID.
- namingRisk: high for accident-like samples.
- displayTextKeyRisk: medium.
- sampleIdLeakRisk: high.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: low.
- sourceLayerTriggerMetricRisk: low.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: low.
- validatorReadiness: validator should reject sampleId in mechanism key fields.
- generatedDataReadiness: not applicable.
- runtimeTakeoverRisk: high if sampleId leaks into runtime IDs.
- goldenImpact: sample identity only.
- recommendedGate: candidate severity validator design.
- blockerReason: sampleId cannot become mechanism key.

### AIRP39-010 Technical Review

- technicalReviewStatus: draft_only
- observedLayer: ruleId / draftId.
- intendedLayer: disabled sample rule identity.
- layerCorrectness: acceptable only as disabled draft.
- sourceOfTruthStatus: sample sheet only.
- stableIdRisk: not stable.
- namingRisk: medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium for feedback draft row.
- feedbackTagMappingRisk: high for aroma / identity rows.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: medium.
- legacyMigrationRisk: low.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if enabled without review.
- goldenImpact: none while disabled / not generated runtime data.
- recommendedGate: candidate severity sheet validator after source-of-truth design.
- blockerReason: draft row is not accepted mechanism data.

### AIRP39-011 Technical Review

- technicalReviewStatus: candidate_only
- observedLayer: candidateId.
- intendedLayer: readonly summary candidate identity.
- layerCorrectness: correct only as candidate layer.
- sourceOfTruthStatus: summaryCandidateEngine rules.
- stableIdRisk: not stable as final result ID.
- namingRisk: medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium.
- feedbackTagMappingRisk: medium.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: medium.
- legacyMigrationRisk: low.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready for runtime.
- runtimeTakeoverRisk: medium if partial takeover reads candidates as final.
- goldenImpact: shadow expected only unless final changes.
- recommendedGate: candidate / severity shadow review before takeover.
- blockerReason: candidateId is not final result identity.

### AIRP39-012 Technical Review

- technicalReviewStatus: needs_note
- observedLayer: priorityBand / severityHint / severityLevel.
- intendedLayer: candidate ordering / hint / future tuning layer.
- layerCorrectness: correct only if kept separated.
- sourceOfTruthStatus: priority shell + sample sheet, no severity registry.
- stableIdRisk: not stable as score model.
- namingRisk: medium.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: low.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: high.
- legacyMigrationRisk: low.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if priority becomes score.
- goldenImpact: likely if severity changes score.
- recommendedGate: severity schema / validator design after source-of-truth.
- blockerReason: priorityBand / severityHint / severityLevel must not collapse into one field.

### AIRP39-013 Technical Review

- technicalReviewStatus: needs_source_of_truth
- observedLayer: sourceLayer / sourceSummary / triggerMetric.
- intendedLayer: structured source references.
- layerCorrectness: conceptually correct, but per-sourceSummary metric schema not formalized.
- sourceOfTruthStatus: no formal schema.
- stableIdRisk: not stable as validator input until schema exists.
- namingRisk: medium.
- displayTextKeyRisk: medium if notes / display text are used.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium.
- feedbackTagMappingRisk: medium.
- sourceLayerTriggerMetricRisk: high.
- prioritySeverityMixRisk: medium.
- legacyMigrationRisk: medium.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if source inferred from ID prefix.
- goldenImpact: possible if trigger semantics change.
- recommendedGate: sourceSummary / triggerMetric schema design.
- blockerReason: triggerMetric must come from schema, not displayName / notes.

### AIRP39-014 Technical Review

- technicalReviewStatus: needs_rename_plan
- observedLayer: displayName dependency / category text / profile fallback.
- intendedLayer: legacy compatibility and future metadata source.
- layerCorrectness: tolerated legacy, not future source-of-truth.
- sourceOfTruthStatus: no categoryId / structureRole source-of-truth yet.
- stableIdRisk: not stable as mechanism key.
- namingRisk: medium.
- displayTextKeyRisk: high.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: low.
- sourceLayerTriggerMetricRisk: medium.
- prioritySeverityMixRisk: low.
- legacyMigrationRisk: high.
- validatorReadiness: not ready.
- generatedDataReadiness: not ready.
- runtimeTakeoverRisk: high if rewritten without shadow compare.
- goldenImpact: likely if structure / type / score changes.
- recommendedGate: metadata source-of-truth + shadow compare + review pack.
- blockerReason: displayName / Chinese category cannot be silently replaced.

## C. Decision Summary / 决策摘要

> Gate wording rule:
> In this report, `canEnterRegistry`, `canEnterValidator`, `canEnterGeneratedData`, and `canAffectRuntime` are hard gate fields.
> `no` means the item cannot enter that layer from this report.
> Future entry requires a separate user / ChatGPT decision, migration plan, source-of-truth / registry design, validator design, and/or golden review task.
> This report must not be read as pre-approval for any future registry, validator, generated data, partial takeover, or runtime change.

| reviewItemId | decision | nextReviewStep | blockedGate | requiredFollowup | owner | canEnterRegistry | canEnterValidator | canEnterGeneratedData | canAffectRuntime | requiresProducerReview | requiresGoldenUpdate | requiresMigrationPlan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AIRP39-001 | needs_note | source-of-truth notes | candidate severity validator | define known ID source | ChatGPT + Codex | no | no | no | no | maybe | no | maybe |
| AIRP39-002 | needs_rename_plan | legacy migration review | new accident ID pattern | decide keep / notes / migration | user + ChatGPT | no | no | no | no | yes | yes if changed | yes |
| AIRP39-003 | needs_note | source field notes | severity generated data | document sourceLayer / triggerMetric | ChatGPT + Codex | no | no | no | no | yes if changed | yes if changed | yes |
| AIRP39-004 | needs_technical_review | outcome source review | outcome validator | separate outcome ID from sourceLayer | ChatGPT | no | no | no | no | maybe | yes if final changes | maybe |
| AIRP39-005 | needs_note | drinkType source map | drinkType validator / registry | document rule vs analyzer source | ChatGPT + Codex | no | no | no | no | maybe | yes if changed | yes |
| AIRP39-006 | needs_mapping_review | feedbackTag mapping review | feedback partial takeover | producer review / tag notes | producer + ChatGPT | no | no | no | no | yes | yes if final feedback changes | maybe |
| AIRP39-007 | needs_mapping_review | candidate/risk tag review | feedbackTag field / generated partial | decide candidate-only vs feedbackTag | producer + ChatGPT | no | no | no | no | yes | no | no |
| AIRP39-008 | keep_as_observed_only | text review | active feedback use | producer review for enabled / disabled text | producer | no | no | no | no | yes before active | yes if final feedback changes | no |
| AIRP39-009 | keep_as_observed_only | sample notes | mechanism key usage | validator rejects sampleId leaks | Codex + ChatGPT | no | no | no | no | no | no | no |
| AIRP39-010 | do_not_promote | candidate severity validator design | generated severity build | keep disabled until validator / review | Codex + ChatGPT | no | no | no | no | yes before use | no | no |
| AIRP39-011 | keep_as_observed_only | shadow review | partial takeover | keep candidate layer separate | ChatGPT + Codex | no | no | no | no | no | yes if final changes | no |
| AIRP39-012 | needs_validator_design | severity schema design | scoreMultiplier / severity build | separate priority / hint / severity | ChatGPT + Codex | no | no | no | no | maybe | yes if score changes | no |
| AIRP39-013 | needs_registry_design | source schema design | candidate severity validator | sourceSummary / triggerMetric schema | ChatGPT + Codex | no | no | no | no | no | yes if final changes | no |
| AIRP39-014 | needs_rename_plan | metadata source design | structure runtime migration | shadow compare + review pack | user + ChatGPT | no | no | no | no | yes | yes if changed | yes |

## D. Machine Appendix / 机器详情附录

机器详情只用于追溯，不是批准依据。

### AIRP39-001

- rawSourceFile: `data/accidentRules.js`, `core/accidentAnalyzer.js`, `data/goldenSamples.js`, `content_sheets/examples/candidate_severity_rules.sample.*`, `data/generated/feedbackTexts.generated.json`
- rawLineOrSection: `taste_acid_overload` in accident rules and golden expected; `texture_straw_resistance` in accidentAnalyzer and generated feedback.
- sourceKind: runtime / golden / generated shadow / sample sheet evidence.
- observedUsage: current accident IDs and sample rows.
- currentStatus: observed runtime / golden IDs; not formal registry entries.
- suggestedStatus: keep observed with notes.
- sourceLayerCandidate: taste / texture.
- sourceSummaryCandidate: tasteSummary / textureSummary.
- triggerMetricCandidate: acidity / strawResistance.
- relatedAccidentTypeId: `taste_acid_overload`, `texture_straw_resistance`
- relatedFeedbackTag: `acid_accident`, `straw_disaster`
- relatedRuleId: `taste_acid_overload_draft`, `texture_straw_resistance_draft`
- relatedSampleId: `extreme_lemon_accident`, `straw_resistance_accident`
- relatedGoldenSample: acid and straw golden samples.
- currentRuntimeImpact: yes, existing behavior.
- currentGeneratedImpact: generated feedback references exist.
- currentReviewPackImpact: review only.
- referencedDocs: ID inventory, source-of-truth design, mechanism TODO.
- testCoverage: golden samples cover current behavior.
- knownWarnings: source-of-truth still needed.

### AIRP39-002

- rawSourceFile: `data/accidentRules.js`, `core/accidentAnalyzer.js`, `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- rawLineOrSection: durian accident rules; accidentAnalyzer legacy overload branches.
- sourceKind: legacy runtime / docs inventory.
- observedUsage: final-impact legacy accidents.
- currentStatus: observed legacy IDs; not permission to copy pattern.
- suggestedStatus: needs review / migration candidate.
- sourceLayerCandidate: taste / texture / flavor depending on branch.
- sourceSummaryCandidate: future summary mapping not finalized.
- triggerMetricCandidate: aromaPressure, solidLoad, sedimentRisk, flavorIntensity, industrialCreamerRatio, toppingLoad.
- relatedAccidentTypeId: `flavor_durian_overload`, `industrial_creamer_overload`, `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload`, `taste_strong_flavor_overload`
- relatedFeedbackTag: rule-dependent legacy feedbackTags.
- relatedRuleId:
- relatedSampleId: durian / oreo related golden samples where present.
- relatedGoldenSample: high durian oddity, oreo overload.
- currentRuntimeImpact: yes.
- currentGeneratedImpact: none from this report.
- currentReviewPackImpact: review only.
- referencedDocs: legacy inventory, stable ID guardrail.
- testCoverage: golden covers selected behavior.
- knownWarnings: ingredient/content-specific accident naming.

### AIRP39-003

- rawSourceFile: `core/accidentAnalyzer.js`, `data/structureAccidentRules.js`, `content_sheets/examples/candidate_severity_rules.sample.*`
- rawLineOrSection: dairy branch, structure accident rules, sample row with `sourceLayer=texture`.
- sourceKind: legacy runtime / structure rules / sample draft.
- observedUsage: dairy fat / low drinkability / solid overload accident directions.
- currentStatus: observed; source fields still need formal source-of-truth.
- suggestedStatus: needs note / migration candidate.
- sourceLayerCandidate: texture.
- sourceSummaryCandidate: textureSummary.
- triggerMetricCandidate: fatLoad / drinkability / solidLoad.
- relatedAccidentTypeId: `dairy_fat_overload`, `texture_low_drinkability`, `texture_solid_overload`
- relatedFeedbackTag: `greasy_overload`, `low_drinkability`, `texture_heavy`
- relatedRuleId: `texture_dairy_fat_load_draft`
- relatedSampleId: greasy / solid taro samples.
- relatedGoldenSample: dairy fat / solid load golden samples.
- currentRuntimeImpact: yes for legacy branches and structure accidents.
- currentGeneratedImpact: generated feedback references `dairy_fat_overload`.
- currentReviewPackImpact: review only.
- referencedDocs: ID source-of-truth design, mechanism TODO.
- testCoverage: golden covers current behavior.
- knownWarnings: ID name must not override source fields.

### AIRP39-004

- rawSourceFile: `data/goldenSamples.js`, `core/summaryCandidateEngine.js`, `content_sheets/examples/candidate_severity_rules.sample.*`, `data/generated/feedbackTexts.generated.json`
- rawLineOrSection: pre-v0.0.7.41 `taste_conflict` expected / generated row; current effective outcomeTypeId is `flavor_identity_conflict`; `novelty_experiment` summary candidate.
- sourceKind: golden / candidate / generated shadow / sample draft.
- observedUsage: outcome identity and candidate outcome.
- currentStatus: mixed observed and candidate-only.
- suggestedStatus: needs technical review.
- sourceLayerCandidate: flavor for identity conflict draft; not inferred from legacy `taste_conflict` or the current `flavor_identity_conflict` ID string alone.
- sourceSummaryCandidate: flavorSummary / summaryCandidates.
- triggerMetricCandidate: identityConflictRisk / noveltyRisk.
- relatedAccidentTypeId:
- relatedFeedbackTag: `bubble_conflict` should not be automatic generic mapping.
- relatedRuleId: `flavor_identity_conflict_outcome_draft`
- relatedSampleId: `bubble_cream_conflict`
- relatedGoldenSample: bubble conflict samples.
- currentRuntimeImpact: current outcome expected exists.
- currentGeneratedImpact: pre-v0.0.7.41 generated feedback had a `taste_conflict` row; v0.0.7.41 generated feedback uses `flavor_identity_conflict`.
- currentReviewPackImpact: review only.
- referencedDocs: feedbackTag mapping design, source-of-truth design.
- testCoverage: golden outcome expected exists.
- knownWarnings: outcome ID is not sourceLayer.

### AIRP39-005

- rawSourceFile: `data/drinkTypeRules.js`, `core/drinkTypeAnalyzer.js`, `data/goldenSamples.js`, `data/generated/feedbackTexts.generated.json`
- rawLineOrSection: drinkTypeRules entries; fruit tea special path; generated feedback drinkTypeId rows.
- sourceKind: runtime rules / analyzer / golden / generated shadow.
- observedUsage: final drink type identity.
- currentStatus: observed runtime IDs with mixed source paths.
- suggestedStatus: needs note.
- sourceLayerCandidate:
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedDrinkTypeId: all listed drinkTypeId values in Human Review Zone.
- relatedFeedbackTag: `classic`, `premium`, `fresh`, `durian`.
- relatedSampleId: `classic_milk_tea`, `premium_oolong_milk`, fruit tea samples.
- relatedGoldenSample: normal drink type samples.
- currentRuntimeImpact: yes.
- currentGeneratedImpact: generated feedback references selected drinkTypeIds.
- currentReviewPackImpact: review only.
- referencedDocs: ID inventory, drinkStructure displayName inventory.
- testCoverage: golden drinkType expected exists for selected samples.
- knownWarnings: analyzer special path uses primary tea displayName.

### AIRP39-006

- rawSourceFile: `data/feedbackTexts.js`, `core/feedbackEngine.js`, `content_sheets/examples/feedback_texts.sample.csv`, `data/generated/feedbackTexts.generated.json`, `data/goldenSamples.js`
- rawLineOrSection: feedbackTag pools, generated tag index, golden feedbackTag expected.
- sourceKind: runtime feedback pool / generated shadow / golden.
- observedUsage: feedback text selection.
- currentStatus: observed tag strings with mixed layers.
- suggestedStatus: needs mapping review.
- sourceLayerCandidate:
- sourceSummaryCandidate:
- triggerMetricCandidate:
- relatedFeedbackTag: all listed runtime / generated feedbackTags.
- relatedRuleId:
- relatedSampleId: samples with feedback expected.
- relatedGoldenSample: classic / acid / straw / bubble / greasy samples.
- currentRuntimeImpact: yes for runtime pools.
- currentGeneratedImpact: generated shadow uses subset.
- currentReviewPackImpact: review only.
- referencedDocs: feedbackTag mapping design.
- testCoverage: golden feedbackTag checks exist.
- knownWarnings: `bubble_conflict` has narrow semantics; same-string cross-layer tags need notes.

### AIRP39-007

- rawSourceFile: `core/summaryCandidateEngine.js`, `data/structureAccidentRules.js`, `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
- rawLineOrSection: summary candidate rules and feedbackTags arrays.
- sourceKind: readonly candidate / risk semantics.
- observedUsage: candidate explanation / shadow structure.
- currentStatus: candidate-only or risk tag; not runtime feedbackTag.
- suggestedStatus: do not promote.
- sourceLayerCandidate: taste / texture / flavor.
- sourceSummaryCandidate: tasteSummary / textureSummary / flavorSummary.
- triggerMetricCandidate: sweetness / bitterness / sedimentRisk / aromaPressure / identityConflictRisk / beverageFit / noveltyRisk.
- relatedFeedbackTag: candidate / risk tags listed in Human Review Zone.
- relatedCandidateId: taste / texture / flavor candidates.
- currentRuntimeImpact: no final feedback effect from this report.
- currentGeneratedImpact: not generated runtime data.
- currentReviewPackImpact: review only.
- referencedDocs: feedbackTag mapping design, mechanism TODO.
- testCoverage: golden shadow structure checks selected candidates.
- knownWarnings: candidate tag cannot become feedbackTag by string match.

### AIRP39-008

- rawSourceFile: `content_sheets/examples/feedback_texts.sample.csv`, `data/generated/feedbackTexts.generated.json`
- rawLineOrSection: textId rows and generated records.
- sourceKind: content sheet / generated shadow.
- observedUsage: single feedback text identity.
- currentStatus: observed generated shadow text IDs.
- suggestedStatus: keep as text identity only.
- relatedFeedbackTag: `classic`, `bubble_conflict`, `weird`
- currentRuntimeImpact: none from this report.
- currentGeneratedImpact: generated shadow records exist.
- currentReviewPackImpact: review only.
- referencedDocs: stable ID guardrail textId section.
- testCoverage: generated checks in prior versions; golden final feedback unchanged here.
- knownWarnings: disabled text must not become active accidentally.

### AIRP39-009

- rawSourceFile: `data/goldenSamples.js`, review reports.
- rawLineOrSection: sample `id` fields.
- sourceKind: golden / report sample identity.
- observedUsage: test定位 / review grouping.
- currentStatus: sample-only.
- suggestedStatus: keep as observed only.
- relatedSampleId: listed sampleIds.
- currentRuntimeImpact: no as mechanism ID.
- currentGeneratedImpact: none.
- currentReviewPackImpact: sample selection only.
- referencedDocs: stable ID guardrail sampleId section.
- testCoverage: golden samples.
- knownWarnings: sampleId can look like mechanism ID.

### AIRP39-010

- rawSourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`, `.json`
- rawLineOrSection: all disabled draft rows.
- sourceKind: human-editable sample sheet draft.
- observedUsage: candidate severity schema proof only.
- currentStatus: disabled draft.
- suggestedStatus: do not promote.
- sourceLayerCandidate: taste / texture / flavor.
- sourceSummaryCandidate: tasteSummary / textureSummary / flavorSummary.
- triggerMetricCandidate: acidity / strawResistance / fatLoad / aromaPressure / identityConflictRisk.
- relatedAccidentTypeId: `taste_acid_overload`, `texture_straw_resistance`, `dairy_fat_overload`
- relatedOutcomeTypeId: legacy `taste_conflict` / current `flavor_identity_conflict` after v0.0.7.41
- relatedFeedbackTag: `acid_accident`, `straw_disaster`, `greasy_overload`; blank for risky draft rows.
- relatedRuleId: listed draft ruleIds.
- currentRuntimeImpact: no.
- currentGeneratedImpact: no.
- currentReviewPackImpact: review only.
- referencedDocs: source-of-truth design, mechanism TODO.
- testCoverage: CSV / JSON health only, no severity validator yet.
- knownWarnings: disabled draft can still mislead future Codex.

### AIRP39-011

- rawSourceFile: `core/summaryCandidateEngine.js`, `data/goldenSamples.js`
- rawLineOrSection: `candidateId` fields and golden shadow expected.
- sourceKind: readonly candidate engine / golden shadow.
- observedUsage: candidate identity and debug / shadow output.
- currentStatus: candidate-only.
- suggestedStatus: keep observed only.
- sourceLayerCandidate: taste / texture / flavor.
- sourceSummaryCandidate: tasteSummary / textureSummary / flavorSummary.
- triggerMetricCandidate: rule-specific trigger metrics.
- relatedCandidateId: taste / texture / flavor candidate groups.
- currentRuntimeImpact: readonly / no final takeover.
- currentGeneratedImpact: none from this report.
- currentReviewPackImpact: review only.
- referencedDocs: architecture docs and mechanism TODO.
- testCoverage: golden shadow structure checks selected candidates.
- knownWarnings: candidateId is not final result ID.

### AIRP39-012

- rawSourceFile: `core/candidatePriorityShellEngine.js`, `core/summaryCandidateEngine.js`, `content_sheets/examples/candidate_severity_rules.sample.*`, `data/goldenSamples.js`
- rawLineOrSection: priorityBand order / aliases; severityHint rules; empty severityLevel in sample.
- sourceKind: readonly priority shell / sample sheet / golden shadow.
- observedUsage: candidate ordering and future severity placeholder.
- currentStatus: separated fields.
- suggestedStatus: keep separated.
- relatedRuleId: candidate severity draft rows.
- relatedSampleId: golden shadow samples.
- currentRuntimeImpact: candidate ordering only.
- currentGeneratedImpact: no severity generated data.
- currentReviewPackImpact: review only.
- referencedDocs: architecture docs, mechanism TODO.
- testCoverage: golden priorityBandIncludes checks.
- knownWarnings: priorityBand / severityHint / severityLevel must not collapse.

### AIRP39-013

- rawSourceFile: `core/summaryCandidateEngine.js`, `content_sheets/examples/candidate_severity_rules.sample.*`, `data/goldenSamples.js`
- rawLineOrSection: sourceLayer / sourceSummary / triggerMetric fields.
- sourceKind: summary candidate / sample sheet / golden shadow.
- observedUsage: source tracing and future validator schema.
- currentStatus: observed but no per-sourceSummary schema.
- suggestedStatus: needs source-of-truth / schema design.
- sourceLayerCandidate: taste / texture / flavor.
- sourceSummaryCandidate: tasteSummary / textureSummary / flavorSummary / summaryCandidates.
- triggerMetricCandidate: all listed metrics.
- currentRuntimeImpact: no direct final takeover.
- currentGeneratedImpact: no severity generated data.
- currentReviewPackImpact: review only.
- referencedDocs: stable ID guardrail, source-of-truth design.
- testCoverage: golden shadow evidence checks selected metrics.
- knownWarnings: do not infer sourceLayer from ID prefix.

### AIRP39-014

- rawSourceFile: `core/drinkStructureAnalyzer.js`, `core/tasteJudge.js`, `core/drinkTypeAnalyzer.js`, `data/ingredients.js`, `data/ingredientTextureProfiles.js`, `data/drinkTypeRules.js`
- rawLineOrSection: displayName Sets, `getTasteProfile(item.name)`, `countByCategory("茶类")`, primary tea name logic, legacy ingredient fields.
- sourceKind: legacy runtime / profile fallback / docs inventory.
- observedUsage: structure analysis, scoring category counts, drink type analyzer special path.
- currentStatus: legacy dependency.
- suggestedStatus: keep observed until metadata source-of-truth and staged migration.
- relatedDrinkTypeId: fruit tea special path drinkTypeIds.
- currentRuntimeImpact: yes.
- currentGeneratedImpact: none from this report.
- currentReviewPackImpact: review only.
- referencedDocs: drinkStructure displayName inventory, stable ID guardrail, mechanism TODO.
- testCoverage: golden covers current behavior broadly.
- knownWarnings: displayName / category text cannot be long-term mechanism key.

## E. Gate Impact / 后续 gate 影响

| Gate | Current impact | Status |
|---|---|---|
| feedbackTag registry / mapping review | runtime, generated, candidate and risk tag layers remain mixed | still blocked |
| known stable ID source-of-truth / registry design | accidentTypeId, outcomeTypeId, drinkTypeId, source fields still need explicit source | still blocked |
| candidate severity sheet validator | cannot start from string patterns or this report as accepted values | still blocked |
| severity generated data build | no validator / source-of-truth yet | still blocked |
| generated feedback partial / active takeover | feedbackTag review and producer review still needed | still blocked |
| accidentAnalyzer migration | legacy IDs require migration plan and golden protection | still blocked |
| drinkStructureAnalyzer migration | displayName dependencies require metadata source, shadow compare and review pack | still blocked |
| v0.0.7.x mechanism final audit | P1-1 / P1-4 / P1-5 / P1-6 / P1-7 remain open | still blocked |

## F. What This Report Does NOT Do / 本报告不做什么

- 不实现 validator。
- 不新增 registry / enum / schema。
- 不新增 generated data。
- 不改 runtime。
- 不改 data。
- 不改 generated feedback / generated severity。
- 不改 content_sheets。
- 不改 golden expected。
- 不重命名任何 ID。
- 不修改 score / accident / feedback / drinkType / result.type。
- 不把 sample report 当正式 source-of-truth。
- 不把正式 review pack 当批准机制。
- 不把 P1-1 / P1-5 / P1-7 / P1-4 / P1-6 写成 solved。
- 不从 docs prose 反向抽 ID 当 validator input。
- 不让 validator / generated / registry 顺序提前。
