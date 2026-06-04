# Mechanism Review Pack Sample Report

## 0. Report Positioning

This file is a sample proof for the mechanism / generated output review pack shape.

It is not a formal review conclusion. It is not a registry, validator input, generated data, source-of-truth file, migration plan, or runtime approval list.

This report does not approve any ID, tag, rule, mapping, sample, or legacy branch. It only checks whether the review pack structure is readable, traceable, and strict enough for future producer / ChatGPT review.

Gate reminders:

- Without review pack, a Codex-generated mechanism item cannot enter registry.
- Without review pack, it cannot enter validator accepted values.
- Without review pack, it cannot enter generated severity data.
- Without review pack, generated feedback cannot move to partial / active takeover.
- Without review pack, candidate / risk tags cannot be mapped to runtime `feedbackTag`.
- Without review pack, accidentAnalyzer legacy items cannot migrate to severity table.
- Without review pack, golden expected cannot be changed.
- Without review pack, IDs referenced by runtime / golden / generated data cannot be renamed.
- No provenance means no source-of-truth.
- The review pack itself is not an approval mechanism.

Relationship to existing reports:

- `reports/stableIdSourceCollector.sample.md` records observed evidence only; it is not a registry.
- `reports/feedbackShadowReview.sample.md` is the precedent for producer-friendly copy candidate review.
- `reports/mechanismReviewPack.sample.md` is the general mechanism review pack proof.
- A generator script is a separate future task; this sample does not implement one.

## A. Human Review Zone / 制作人审核区

本区给制作人先看。你只需要判断：这些名字、机制方向、玩家可见影响和备注是否容易误导；是否需要保留、改名、拆分、暂缓或拒绝。

可填 `reviewStatus`：

- `pending`
- `needs_more_context`
- `revise`
- `reject`
- `keep_observed`
- `do_not_promote`
- `split_required`

自然语言问题标签可以直接写中文，例如：像原料不是机制、像样本不是机制、sourceLayer 不清楚、triggerMetric 不清楚、不能给玩家看、可以做候选但别接 runtime、需要改名计划、来源不清楚、先别让 Codex 继续引用。

### MRP-001｜dairy_fat_overload legacy accident

- reviewItemId: `MRP-001`
- title / shortName: 奶脂 / 厚重负担旧事故
- itemType: `accident_migration_candidate`
- proposedMeaningCN: 当前 legacy 事故分支，用来表达奶脂、厚乳、淡奶油、植脂奶造成的厚重负担。
- playerVisibleImpact: 当前会影响玩家最终事故、分数和反馈；不能在本 report 里改。
- exampleUseCase: 厚乳 70% + 淡奶油 20% + 植脂奶 10% 的油腻负担样本。
- whyItMatters: ID 里有 `dairy`，但后续 severity sample 已把一条草案按 texture / fatLoad 方向解释；如果未来迁移时只看 ID 名称，容易误读 sourceLayer。
- producerQuestion: 玩家体验上，它更像“奶脂过载”，还是更像“质地太厚 / 喝不动”？是否需要后续拆命名或只加说明？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-002｜texture_dairy_fat_load_draft sample rule

- reviewItemId: `MRP-002`
- title / shortName: 奶脂厚重负担草案规则
- itemType: `severity_rule_draft`
- proposedMeaningCN: 借用现有 `dairy_fat_overload` 事故大类，但用 `textureSummary.fatLoad` / drinkability 方向表达厚重负担。
- playerVisibleImpact: 当前无玩家影响；样例行仍是 disabled draft。
- exampleUseCase: 未来 severity 表可能用来描述“太厚、太腻、喝起来有负担”的严重度草案。
- whyItMatters: 它测试 review pack 能否区分 `ruleId`、`accidentTypeId`、`sourceLayer`、`triggerMetric`，而不是被 ID 名称牵着走。
- producerQuestion: 这个方向是否能作为后续“厚重负担”调参入口？是否需要改成人类更容易理解的说明？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-003｜aroma_pressure candidate / risk tag

- reviewItemId: `MRP-003`
- title / shortName: 香气压力候选风险名
- itemType: `tag_proposal`
- proposedMeaningCN: 风味 / 香气层里“香气压迫感太强”的候选风险语义。
- playerVisibleImpact: 当前不应直接影响玩家文案；它不是已审过的 runtime 文案池标签。
- exampleUseCase: 榴莲、香精感或强风味组合导致闻起来太冲。
- whyItMatters: `aroma_pressure` 已出现在 summary / candidate 风险语义中，但不能自动变成 `feedbackTag`。
- producerQuestion: “香气压力”作为未来文案方向是否成立？如果成立，是否需要先做反馈标签 mapping review？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-004｜flavor_aroma_pressure_feedback_draft sample rule

- reviewItemId: `MRP-004`
- title / shortName: 香气压力反馈草案规则
- itemType: `severity_rule_draft`
- proposedMeaningCN: candidate severity sample 中的 feedback draft，用来示意未来可能围绕 `flavorSummary.aromaPressure` 做反馈审查。
- playerVisibleImpact: 当前无玩家影响；`feedbackTag` 字段为空，不能接 runtime。
- exampleUseCase: 未来可能需要专门文案解释“香气太冲”，但当前还没有正式文案池标签。
- whyItMatters: 这条样例测试“草案行可以记录方向，但不能把未审标签写进稳定字段”。
- producerQuestion: 这个方向是否值得保留为候选？如果保留，后续应走文案 / feedbackTag mapping review。
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-005｜bubble_conflict mapping boundary

- reviewItemId: `MRP-005`
- title / shortName: 气泡冲突标签边界
- itemType: `feedback_tag_mapping`
- proposedMeaningCN: `bubble_conflict` 当前可观察为 runtime feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评，不应泛化成通用风味身份冲突。
- playerVisibleImpact: 如果误用，玩家可能在不是气泡冲突的风味身份问题里看到错误反馈。
- exampleUseCase: `taste_conflict` / flavor identity conflict 草案行不应默认绑定 `bubble_conflict`。
- whyItMatters: 这是旧标签语义误导新机制的典型风险。
- producerQuestion: 这个标签是否只保留在气泡 / 厚重 / 口感冲突方向？是否需要另起一个更泛化的 future tag？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-006｜hard_physical priorityBand

- reviewItemId: `MRP-006`
- title / shortName: 硬物理阻断优先级分组
- itemType: `registry_candidate`
- proposedMeaningCN: candidate priority shell 中的粗优先级分组，表示吸管 / 结构物理阻断这类需要优先看的候选。
- playerVisibleImpact: 当前 readonly，不直接改变玩家最终结果。
- exampleUseCase: `texture_straw_resistance` 这类吸不上来、结构堵住的候选排在更高优先级。
- whyItMatters: `priorityBand` 不是 severity，也不是扣分档，不能被未来 validator 当作 score 或机制严重度。
- producerQuestion: “硬物理阻断”这个分组是否符合人类理解？是否需要更容易审的中文说明？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

### MRP-007｜extreme_lemon_accident sampleId

- reviewItemId: `MRP-007`
- title / shortName: 极端柠檬测试样本身份
- itemType: `display_name_key_risk`
- proposedMeaningCN: golden sample / review sample 的测试身份，用来定位一个极端酸度案例。
- playerVisibleImpact: 当前只用于测试定位；不应成为玩家可见事故类型或机制主键。
- exampleUseCase: 柠檬 85% + 绿茶 + 气泡水 + 蜂蜜的极端酸度测试样本。
- whyItMatters: `extreme_lemon_accident` 看起来像事故名，但它只是 sampleId；如果 future Codex 把它写进 `accidentTypeId` 或 `ruleId`，会造成按样本拆机制。
- producerQuestion: 这个测试样本名是否保留用于测试定位？是否需要更清楚标注“不是机制 ID”？
- reviewStatus:
- producerComment:
- suggestedRewrite:
- issueTagsNaturalLanguage:

## B. ChatGPT Technical Review Zone / 技术负责人审查区

本区给 ChatGPT / 技术负责人审边界。它不是批准结果，只列出当前样例条目的技术风险和下一道 gate。

### MRP-001 Technical Review

- technicalReviewStatus: `keep_legacy_for_now`
- layerCorrectness: observed legacy accident branch; future migration layer not decided.
- sourceOfTruthStatus: current runtime branch exists, but future severity source-of-truth is not designed.
- stableIdRisk: not stable as a future reviewed registry item; only observed in current runtime / golden / docs.
- displayTextKeyRisk: medium; current branch writes player-visible type text.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium; current feedback uses `greasy_overload`, mapping still needs producer review before active takeover.
- sourceLayerTriggerMetricRisk: high; ID name can mislead, so sourceLayer / triggerMetric must win over ID prefix.
- legacyMigrationRisk: high; moving it could alter score / accident / feedback.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: high.
- goldenImpact: possible if migrated.
- recommendedGate: accidentAnalyzer migration review pack, then migration plan.
- blockerReason: needs_source_of_truth and needs migration plan before any severity table move.

### MRP-002 Technical Review

- technicalReviewStatus: `draft_only`
- layerCorrectness: correct as sample rule draft; not a runtime rule.
- sourceOfTruthStatus: no future severity source-of-truth yet.
- stableIdRisk: not stable; `draft` suffix must stay sample-only.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: medium; references `greasy_overload`, but feedback mapping review is still needed for active use.
- sourceLayerTriggerMetricRisk: medium; source fields say texture / textureSummary / fatLoad, so they must not be overridden by `dairy` in the accident ID.
- legacyMigrationRisk: medium; relates to MRP-001.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: no current impact, high if promoted without review.
- goldenImpact: none now.
- recommendedGate: candidate severity validator design only after ID source-of-truth and review pack proof.
- blockerReason: draft_only; cannot enter validator accepted values or generated data.

### MRP-003 Technical Review

- technicalReviewStatus: `candidate_only`
- layerCorrectness: currently summary / candidate risk semantics, not runtime feedbackTag.
- sourceOfTruthStatus: needs_mapping_review.
- stableIdRisk: not stable as future reviewed feedbackTag.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: high if copied into `feedbackTag`.
- feedbackTagMappingRisk: high.
- sourceLayerTriggerMetricRisk: medium; should stay tied to flavorSummary / aromaPressure until reviewed.
- legacyMigrationRisk: low.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: high if promoted directly.
- goldenImpact: none now.
- recommendedGate: feedbackTag mapping review / producer review.
- blockerReason: do_not_promote until source-of-truth and mapping review exist.

### MRP-004 Technical Review

- technicalReviewStatus: `needs_mapping_review`
- layerCorrectness: acceptable as disabled sample row, not as runtime feedback rule.
- sourceOfTruthStatus: needs_source_of_truth.
- stableIdRisk: not stable; draft rule only.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: high if `aroma_pressure` is later copied into `feedbackTag`.
- feedbackTagMappingRisk: high.
- sourceLayerTriggerMetricRisk: medium; source fields are flavor / flavorSummary / aromaPressure.
- legacyMigrationRisk: low.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: no current impact, high if promoted without review.
- goldenImpact: none now.
- recommendedGate: feedbackTag mapping review, then source-of-truth design if producer wants this direction.
- blockerReason: needs_source_of_truth; no reviewed feedbackTag yet.

### MRP-005 Technical Review

- technicalReviewStatus: `observed_not_stable / blocked_no_provenance_for_generic_mapping`
- layerCorrectness: observed runtime feedbackTag, but proposed generic flavor identity use is wrong-layer risk.
- sourceOfTruthStatus: observed evidence exists for current tag; no provenance supports generic flavor identity mapping.
- stableIdRisk: not stable as future reviewed generic tag.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: medium.
- feedbackTagMappingRisk: high; old tag semantics can be over-generalized.
- sourceLayerTriggerMetricRisk: high if mapped to flavor identity conflict without a reviewed triggerMetric.
- legacyMigrationRisk: low.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: high if mapped into generated partial takeover.
- goldenImpact: none now.
- recommendedGate: feedbackTag mapping review and producer review.
- blockerReason: blocked_wrong_layer for generic conflict; blocked_no_provenance for proposed broad use.

### MRP-006 Technical Review

- technicalReviewStatus: `needs_source_of_truth`
- layerCorrectness: priorityBand, not severityLevel or scoreMultiplier.
- sourceOfTruthStatus: observed in candidate priority shell and golden expectations; future registry not designed.
- stableIdRisk: not stable as future enum until source-of-truth is explicit.
- displayTextKeyRisk: low.
- sampleIdLeakRisk: low.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: low.
- sourceLayerTriggerMetricRisk: medium; should not imply a specific triggerMetric by itself.
- legacyMigrationRisk: low.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: low now, medium if used to drive score later.
- goldenImpact: existing structural expected references only.
- recommendedGate: source-of-truth / enum design before validator uses priorityBand.
- blockerReason: needs_source_of_truth.

### MRP-007 Technical Review

- technicalReviewStatus: `blocked_wrong_layer / do_not_promote`
- layerCorrectness: correct only as sampleId.
- sourceOfTruthStatus: source is golden sample file, not mechanism registry.
- stableIdRisk: not stable as mechanism ID.
- displayTextKeyRisk: medium; name contains player-readable accident wording.
- sampleIdLeakRisk: high.
- candidateTagLeakRisk: low.
- feedbackTagMappingRisk: low.
- sourceLayerTriggerMetricRisk: medium if inferred from sample name.
- legacyMigrationRisk: low.
- validatorReadiness: no.
- generatedDataReadiness: no.
- runtimeTakeoverRisk: high if promoted.
- goldenImpact: direct sample locator only; do not change expected from this report.
- recommendedGate: keep sample-only; add notes if future Codex confuses it.
- blockerReason: blocked_wrong_layer; sampleId cannot become accidentTypeId / ruleId.

## C. Decision Summary / 决策摘要

### MRP-001 Decision

- decision: `keep_as_observed_only`
- allowedNextStep: migration review pack / technical inventory continuation.
- blockedGate: severity generated data, severity partial takeover.
- requiredFollowup: legacy migration plan and producer review before any runtime-affecting change.
- owner: ChatGPT + user.
- canEnterRegistry: no.
- canEnterValidator: no.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: yes.
- requiresGoldenUpdate: only if a future task intentionally changes final behavior.
- requiresMigrationPlan: yes.

### MRP-002 Decision

- decision: `needs_validator_design`
- allowedNextStep: keep as disabled sample evidence for future validator design discussion.
- blockedGate: generated severity data build.
- requiredFollowup: source-of-truth design, validator design, producer / technical review.
- owner: ChatGPT + Codex, with user review.
- canEnterRegistry: no.
- canEnterValidator: not yet.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: yes.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: maybe, because it touches legacy dairy/fat load meaning.

### MRP-003 Decision

- decision: `needs_mapping_review`
- allowedNextStep: feedbackTag mapping review discussion.
- blockedGate: runtime feedbackTag mapping, generated feedback partial takeover.
- requiredFollowup: producer review and feedbackTag source-of-truth design if this direction continues.
- owner: user + ChatGPT.
- canEnterRegistry: no.
- canEnterValidator: no.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: yes.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: no.

### MRP-004 Decision

- decision: `candidate_for_future`
- allowedNextStep: remain a disabled sample draft and review pack item.
- blockedGate: validator accepted values, generated data, runtime feedback.
- requiredFollowup: decide whether `aroma_pressure` becomes a reviewed feedback direction.
- owner: user + ChatGPT.
- canEnterRegistry: no.
- canEnterValidator: no.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: yes.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: no.

### MRP-005 Decision

- decision: `needs_mapping_review`
- allowedNextStep: explicit feedbackTag mapping / producer review.
- blockedGate: generic flavor identity conflict feedback mapping.
- requiredFollowup: decide whether to keep `bubble_conflict` narrow and whether a separate future tag is needed.
- owner: user + ChatGPT.
- canEnterRegistry: no.
- canEnterValidator: no.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: yes.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: no.

### MRP-006 Decision

- decision: `needs_registry_design`
- allowedNextStep: source-of-truth / enum design for priorityBand if validator needs it.
- blockedGate: validator accepted values for priorityBand.
- requiredFollowup: decide explicit source for `priorityBand` values.
- owner: ChatGPT + Codex, with user review.
- canEnterRegistry: no.
- canEnterValidator: not yet.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: maybe, for wording / priority meaning.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: no.

### MRP-007 Decision

- decision: `blocked_wrong_layer`
- allowedNextStep: keep as golden sample ID only.
- blockedGate: any mechanism ID / ruleId / accidentTypeId use.
- requiredFollowup: none unless future Codex proposes it as mechanism ID.
- owner: Codex must stop and ask user / ChatGPT if this happens.
- canEnterRegistry: no.
- canEnterValidator: no.
- canEnterGeneratedData: no.
- canAffectRuntime: no.
- requiresProducerReview: no for current sample-only use; yes if promoted.
- requiresGoldenUpdate: no.
- requiresMigrationPlan: no.

## D. Machine Appendix / 机器详情附录

机器详情用于追溯来源，一般不用制作人逐项细看。

### MRP-001 Machine Details

- rawSourceFile: `core/accidentAnalyzer.js`
- rawLineOrSection: `80-99`
- sourceKind: runtime legacy branch
- observedLayer: accidentAnalyzer final accident logic
- observedUsage: sets type / score / accidentTypeId / feedback tag candidates
- currentStatus: observed legacy branch, not migration approval
- suggestedStatus: keep legacy for now; review before migration
- sourceLayerCandidate: texture / drinkability direction needs review
- sourceSummaryCandidate: textureSummary
- triggerMetricCandidate: fatLoad / drinkability risk
- relatedAccidentTypeId: `dairy_fat_overload`
- relatedFeedbackTag: `greasy_overload`
- relatedRuleId: `texture_dairy_fat_load_draft`
- relatedSampleId: `greasy_overload`, `greasy_overload_id_equivalence`
- relatedGoldenSample: `data/goldenSamples.js:434-461`
- currentRuntimeImpact: yes
- currentGeneratedImpact: none from this report
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`, `docs/V0_0_7_ID_INVENTORY.md`
- testCoverage: golden samples cover dairy fat overload paths
- knownWarnings: ID name can mislead sourceLayer
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-002 Machine Details

- rawSourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`
- rawLineOrSection: `4`
- sourceKind: disabled sample sheet draft
- observedLayer: candidate severity sample
- observedUsage: human-editable draft row only
- currentStatus: draft only
- suggestedStatus: keep disabled until validator / source-of-truth exist
- sourceLayerCandidate: texture
- sourceSummaryCandidate: textureSummary
- triggerMetricCandidate: fatLoad
- relatedAccidentTypeId: `dairy_fat_overload`
- relatedFeedbackTag: `greasy_overload`
- relatedRuleId: `texture_dairy_fat_load_draft`
- relatedSampleId: none
- relatedGoldenSample: greasy overload samples, indirectly
- currentRuntimeImpact: no
- currentGeneratedImpact: no
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_MECHANISM_TODO.md`, `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- testCoverage: none specific; golden regression should remain unchanged
- knownWarnings: draft row must not enter generated severity data
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-003 Machine Details

- rawSourceFile: `reports/stableIdSourceCollector.sample.md`
- rawLineOrSection: `297`
- sourceKind: observed candidate / risk tag evidence
- observedLayer: summary / candidate risk semantics
- observedUsage: risk / candidate marker
- currentStatus: candidate-only
- suggestedStatus: needs feedbackTag mapping review before any promotion
- sourceLayerCandidate: flavor
- sourceSummaryCandidate: flavorSummary
- triggerMetricCandidate: aromaPressure
- relatedAccidentTypeId: none
- relatedFeedbackTag: none
- relatedRuleId: `flavor_aroma_pressure_feedback_draft`
- relatedSampleId: none
- relatedGoldenSample: none
- currentRuntimeImpact: no
- currentGeneratedImpact: no
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md:33-34`
- testCoverage: n/a
- knownWarnings: must not be copied to `feedbackTag`
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-004 Machine Details

- rawSourceFile: `content_sheets/examples/candidate_severity_rules.sample.csv`
- rawLineOrSection: `5`
- sourceKind: disabled sample sheet draft
- observedLayer: candidate severity sample
- observedUsage: future feedback direction sketch
- currentStatus: draft only
- suggestedStatus: blocked until mapping review and source-of-truth exist
- sourceLayerCandidate: flavor
- sourceSummaryCandidate: flavorSummary
- triggerMetricCandidate: aromaPressure
- relatedAccidentTypeId: none
- relatedFeedbackTag: blank by design
- relatedRuleId: `flavor_aroma_pressure_feedback_draft`
- relatedSampleId: none
- relatedGoldenSample: none
- currentRuntimeImpact: no
- currentGeneratedImpact: no
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`, `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- testCoverage: CSV / JSON health only in future tasks
- knownWarnings: if `aroma_pressure` becomes a tag, it needs explicit review
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-005 Machine Details

- rawSourceFile: `data/feedbackTexts.js`
- rawLineOrSection: `100`
- sourceKind: observed runtime feedback tag pool key
- observedLayer: runtime feedback text pool
- observedUsage: current feedback selection category
- currentStatus: observed runtime tag, not generic flavor identity mapping
- suggestedStatus: keep narrow until mapping review
- sourceLayerCandidate: texture / carbonation / follow-up context, not generic flavor identity by default
- sourceSummaryCandidate: needs review
- triggerMetricCandidate: needs review
- relatedAccidentTypeId: none
- relatedFeedbackTag: `bubble_conflict`
- relatedRuleId: `flavor_identity_conflict_outcome_draft` should keep feedbackTag blank
- relatedSampleId: none
- relatedGoldenSample: none
- currentRuntimeImpact: current tag exists
- currentGeneratedImpact: no new impact from this report
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md:34`
- testCoverage: existing feedback golden paths only
- knownWarnings: cannot be generalized to flavor identity conflict
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-006 Machine Details

- rawSourceFile: `core/candidatePriorityShellEngine.js`
- rawLineOrSection: `2-10`
- sourceKind: runtime readonly candidate priority shell constant
- observedLayer: candidate priority shell
- observedUsage: coarse priority order
- currentStatus: observed priorityBand value
- suggestedStatus: source-of-truth needed before validator uses it
- sourceLayerCandidate: n/a
- sourceSummaryCandidate: n/a
- triggerMetricCandidate: n/a
- relatedAccidentTypeId: `texture_straw_resistance`
- relatedFeedbackTag: none
- relatedRuleId: none
- relatedSampleId: straw resistance golden samples
- relatedGoldenSample: `data/goldenSamples.js:68-70`, `data/goldenSamples.js:535-537`
- currentRuntimeImpact: readonly candidate shell only
- currentGeneratedImpact: no
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/STABLE_ID_NAMING_GUARDRAIL.md`, `reports/stableIdSourceCollector.sample.md:266-268`
- testCoverage: golden structural assertions
- knownWarnings: priorityBand is not severityLevel / scoreMultiplier
- rawCodexOutputExcerpt: n/a
- diffReference: n/a

### MRP-007 Machine Details

- rawSourceFile: `data/goldenSamples.js`
- rawLineOrSection: `217`
- sourceKind: golden sample ID
- observedLayer: test / golden sample layer
- observedUsage: sample locator
- currentStatus: sample-only
- suggestedStatus: do not promote
- sourceLayerCandidate: n/a
- sourceSummaryCandidate: n/a
- triggerMetricCandidate: n/a
- relatedAccidentTypeId: `taste_acid_overload`, but only through sample expected behavior
- relatedFeedbackTag: `acid_accident`, but only through expected feedback
- relatedRuleId: none
- relatedSampleId: `extreme_lemon_accident`
- relatedGoldenSample: `extreme_lemon_accident`
- currentRuntimeImpact: no direct runtime identity
- currentGeneratedImpact: no
- currentReviewPackImpact: sample proof only
- referencedDocs: `docs/V0_0_7_ID_INVENTORY.md:71`, `reports/stableIdSourceCollector.sample.md:319`
- testCoverage: golden sample itself
- knownWarnings: sampleId must not become mechanism ID
- rawCodexOutputExcerpt: n/a
- diffReference: n/a
