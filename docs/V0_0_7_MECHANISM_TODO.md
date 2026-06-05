# v0.0.7.x Mechanism TODO / Audit Debt

## 0. 文档定位

本文档是 v0.0.7.x 机制 / ID / 内容管线债务正本。

它不是版本流水账，不替代 `docs/VERSION_LOG.md`；它也不是完整设计文档，不替代 `docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。它用于持续追踪四轮用户 / ChatGPT 审计后已经确认的 P1 / P2 债务、解决时机、阻塞门槛和推荐路线。

本文件不表示这些债务已经解决。后续任务不能把这里的 TODO 当成已完成事实，也不能为了“清债”顺手改 runtime、ID、generated data、golden expected 或文案。

`docs/STABLE_ID_NAMING_GUARDRAIL.md` 是长期稳定 ID / 命名 / 审查流程正本，适用于 v0.0.7.x 以及后续所有阶段。本文档只记录 v0.0.7.x 阶段债务、gate 和 TODO；涉及 ID 审计、validator、generated severity data、partial / active takeover 或新增 stable ID / tag / ruleId 的任务，必须引用长期正本，不在本文档复制完整流程。

## 1. 当前总体结论

四轮人工 / AI 审计覆盖：

1. 目录结构 + docs / 当前版本状态一致性。
2. ID / 命名 / 机制层级。
3. core / data / scripts 的 if 地狱与数据化边界。
4. content_sheets / generated / reports / golden 链路。

当前结论：

- P0：暂无。
- P1：存在若干机制 / ID / validator / legacy 迁移债务，必须在对应 gate 前解决，不能带到 v0.0.7.x 机制收口之后。
- P2：存在 docs / housekeeping / 轻技术债，不阻塞当前机制推进，但应择机整理。

### v0.0.7.69 post-v0.0.7.68 checkpoint

v0.0.7.68-candidate 已冻结，accidentTypeId 第一批候选线阶段性收口。

当前已完成：

- `taste_acid_overload` 已进入 minimal registry scaffold。
- `texture_solid_overload` 已进入 minimal registry scaffold。
- 两项均为 `reviewed_candidate_not_approved`。
- 两项均不能进入 validator / generated severity / runtime。
- `scripts/content/checkStableIdRegistry.js` 是只读检查脚本。

仍未完成 / 排队：

- `texture_low_drinkability` 边界。
- `texture_straw_resistance` final decision。
- feedbackTag / candidate tag 线。
- drinkStructure 线。
- broader accidentAnalyzer route。
- reviewed registry / schema task。
- active validator / generated severity / shadow / partial takeover。

下一步原则：

- 先开会整理当前主线还剩什么。
- 不要继续自动新增 review pack / sample pack / proposal pack。
- 不要跳 validator。
- 不要把 v0.0.7.68 scaffold 写成 approved registry / schema / validator。

### v0.0.7.52 P1 TODO review

v0.0.7.52 新增 `reports/p1TodoReview.v0.0.7.52.md`，用于复盘 P1-1 到 P1-8 在 v0.0.7.51 source-of-truth / registry / schema design 之后的真实剩余状态。

该 review 明确：

- P1 标题保留不等于所有 P1 都从零未做；多项 P1 已完成 guardrail、inventory、review pack、decision split、source-of-truth design 或局部 migration。
- 前置审计 / guardrail / report / 局部 migration 完成不等于 final gate solved。
- P1-1 / P1-2 / P1-3 当前更适合合并成 reviewed registry shape proposal，而不是直接实现 validator。
- P1-5 / P1-7 可合并规划为 feedbackTag / candidate tag source-of-truth 工作包；v0.0.7.56 已把候选项整理成 review pack，但还没有 producer decisions / registry / validator / copy-pool expansion。
- P1-6 仍适合作为 drinkStructureAnalyzer displayName staged plan 独立后续阶段。
- P1-8 final audit 仍应后置，不应现在启动。

### v0.0.7.53 reviewed registry shape proposal

v0.0.7.53 新增 `reports/stableIdRegistryShapeProposal.v0.0.7.53.md`，把 v0.0.7.51 source-of-truth design 和 v0.0.7.52 P1 review 推荐的下一刀整理成可审查的 registry shape proposal。

该 proposal 记录：

- future registry entry common fields。
- status vocabulary proposal。
- ID family row shape。
- accidentTypeId proposal slice。
- feedbackTag proposal slice。
- future validator relationship。
- human review questions。

该 report 不是 registry、schema、enum、validator 或 allowed values；不批准任何 ID，也不表示 P1-1 / P1-2 / P1-3 已解决。后续仍需要 reviewed registry entry sample pack、registry candidate review、source notes、producer / ChatGPT decision 和 validator design gate。

### v0.0.7.54 registry entry sample pack

v0.0.7.54 新增 `reports/stableIdRegistryEntrySamplePack.v0.0.7.54.md`，把 v0.0.7.53 的 registry shape proposal 应用到少量 sample entries，供制作人 / ChatGPT 审查字段、status、blocked gate 和 human review question 是否可读。

该 sample pack 覆盖：

- `accidentTypeId` sample entries，例如 `texture_low_drinkability`、`texture_solid_overload`、historical texture old IDs、`flavor_durian_overload`、`dairy_fat_overload`、`texture_straw_resistance`。
- `outcomeTypeId` sample entry：`flavor_identity_conflict`。
- `feedbackTag` / `candidateTag` sample entries：`bubble_conflict`、`aroma_pressure`、`identity_conflict`。

该 report 仍不是 registry、schema、enum、validator 或 allowed values；不批准任何 ID，不把 `texture_low_drinkability` / `texture_solid_overload` 写成 `approved_stable`，也不让 historical texture old IDs 回流 current validator / generated severity input。后续仍需要 registry candidate review、source notes、producer / ChatGPT decision 和 validator design gate。

### v0.0.7.55 accidentTypeId registry candidate review pack

v0.0.7.55 新增 `reports/accidentTypeIdRegistryCandidateReviewPack.v0.0.7.55.md`，把 accidentTypeId 候选项整理成人工可审查的 review pack。

该 review pack 覆盖：

- current observed generalized / rule IDs：`taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload`。
- runtime review candidates：`flavor_durian_overload`、`dairy_fat_overload`、`industrial_creamer_overload`、`taste_strong_flavor_overload`、`texture_straw_resistance`。
- historical migrated texture old IDs：`texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload`。

该 report 仍不是 registry、schema、enum、validator input 或 allowed values；不批准任何 accidentTypeId，不把 `texture_low_drinkability` / `texture_solid_overload` 写成 `approved_stable`，也不让 historical texture old IDs 回流 current registry / validator / generated severity input。后续仍需要 producer / ChatGPT decision、source notes、reviewed registry / schema task 和 validator design gate。

### v0.0.7.56 feedbackTag / candidate tag registry candidate review pack

v0.0.7.56 新增 `reports/feedbackTagCandidateReviewPack.v0.0.7.56.md`，把 feedbackTag、candidate tag、risk tag、copy direction 和 outcomeTypeId 边界整理成人工可审查的 review pack。

该 review pack 覆盖：

- runtime observed feedbackTag review：`bubble_conflict`、`greasy_overload`、`straw_disaster`、`straw_followup`。
- candidate / risk / copy direction review：`aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`。
- outcomeTypeId boundary：`flavor_identity_conflict`。

该 report 仍不是 registry、schema、enum、validator input、allowed values、generated feedback data 或 runtime source-of-truth；不批准任何 feedbackTag、candidateTag、risk tag、copy direction 或 outcomeTypeId。`flavor_identity_conflict` 仍是 outcomeTypeId，不是 feedbackTag；`identity_conflict` 仍是 candidate / risk tag，不是 outcomeTypeId 或 runtime feedbackTag；`bubble_conflict` 仍保持气泡 + 厚重 / 口感冲突追评窄语义，不泛化为 flavor identity conflict。P1-5 / P1-7 仍未解决，后续仍需要 producer / ChatGPT decision、feedbackTag source-of-truth / registry 设计、文案池扩容 review 和 generated feedback / severity gate。

### v0.0.7.57 accidentTypeId likely-stable notes review

v0.0.7.57 新增 `reports/accidentTypeIdLikelyStableNotesReview.v0.0.7.57.md`，从 v0.0.7.55 accidentTypeId review pack 中只挑三个最稳的事故机制候选做 notes review / decision-prep：

- `taste_acid_overload`
- `texture_low_drinkability`
- `texture_solid_overload`

该 report 不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把三项写成 `approved_stable`，也不让 historical texture old IDs 回流 current registry / validator / generated severity input。本轮只是补 sourceLayer、sourceSummary / triggerMetric 候选、evidence 边界、相邻机制边界和 remaining gates，供后续 producer / ChatGPT decision 使用。

### v0.0.7.58 accidentTypeId first-batch decision draft

v0.0.7.58 新增 `reports/accidentTypeIdFirstBatchDecisionDraft.v0.0.7.58.md`，只围绕三个最稳 accidentTypeId 整理第一批 future registry candidate 的人工决策草案：

- `taste_acid_overload`
- `texture_low_drinkability`
- `texture_solid_overload`

该 report 是 producer / ChatGPT decision draft，不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把三项写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。推荐决策为：`taste_acid_overload` -> `candidate_for_future_registry_after_notes`，`texture_low_drinkability` -> `needs_boundary_notes_before_candidate`，`texture_solid_overload` -> `candidate_for_future_registry_after_notes`。feedbackTag、drinkStructure、durian / dairy / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.59 accidentTypeId first-batch decision record

v0.0.7.59 新增 `reports/accidentTypeIdFirstBatchDecisionRecord.v0.0.7.59.md`，把 v0.0.7.58 的草案收束为更明确的人类可读决策记录。

本轮只记录三个 accidentTypeId 的当前决策方向：

- `taste_acid_overload` -> `first_batch_candidate_pending_source_notes`
- `texture_solid_overload` -> `first_batch_candidate_pending_source_notes`
- `texture_low_drinkability` -> `boundary_notes_required_before_first_batch_candidate`

该 decision record 仍不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把三项写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。`texture_low_drinkability` 仍需先补和 `texture_straw_resistance` / `texture_solid_overload` 的 boundary notes，feedbackTag、drinkStructure、durian / dairy / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.60 accidentTypeId first-batch source notes sync

v0.0.7.60 新增 `reports/accidentTypeIdFirstBatchSourceNotes.v0.0.7.60.md`，只给两个 first-batch candidate 补 source notes / triggerMetric notes / evidence boundary：

- `taste_acid_overload`
- `texture_solid_overload`

该 report 记录：

- `taste_acid_overload` 的 `sourceLayer=taste`、`sourceSummary=tasteSummary`、`triggerMetricDraft=acidity / acidLoad / future acidPressure`，并明确 lemon / hawthorn / passionfruit 等只能作为 evidence，不拆成 ingredient-specific accidentTypeId。
- `texture_solid_overload` 的 `sourceLayer=texture`、`sourceSummary=textureSummary / structure texture summary`、`triggerMetricDraft=solidLoad / textureRatio / liquidSupport / lowLiquidSupport`，并明确 pearl / taro ball / pudding / grass jelly / coconut jelly 等只能作为 evidence，不拆成 topping-specific accidentTypeId。
- historical `texture_topping_overload` 只作为 pre-v0.0.7.49 legacy reference，不回流 current registry / validator / generated severity input。

该 source notes sync 仍不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把任何 ID 写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。`texture_low_drinkability` 只在 boundary / Not This Round 语境出现，本轮不处理；feedbackTag、drinkStructure、durian / dairy / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.61 accidentTypeId first-batch candidate notes record

v0.0.7.61 新增 `reports/accidentTypeIdFirstBatchCandidateNotesRecord.v0.0.7.61.md`，把 v0.0.7.60 的 source notes 收束为后续 registry candidate gate 可审查的 candidate notes record。

本轮只处理两个 accidentTypeId：

- `taste_acid_overload`
- `texture_solid_overload`

两项都记录为：

```text
candidateRecordStatus: candidate_notes_recorded_not_approved
```

该 candidate notes record 仍不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把任何 ID 写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。`texture_low_drinkability` 只在 boundary / Not This Round 语境出现，本轮不处理；historical `texture_topping_overload` 不回流 current registry / validator / generated severity input；feedbackTag、drinkStructure、durian / dairy / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.62 minimal accidentTypeId registry candidate gate design

v0.0.7.62 新增 `reports/accidentTypeIdRegistryCandidateGate.v0.0.7.62.md`，只为两个 first-batch accidentTypeId candidate 设计进入 future registry candidate 前的最小 gate：

- `taste_acid_overload`
- `texture_solid_overload`

两项 gate result 均为：

```text
passes_minimal_candidate_gate_with_notes
```

这只表示它们的 candidate notes 已足够进入后续 future registry candidate record；仍不是 `approved_stable`，不是 registry entry，不是 schema，不是 validator input，不是 allowed values，也不能进入 generated severity / runtime。

`texture_low_drinkability` 是本轮 explicit non-pass / boundary context：它重要，但仍需先补 `texture_straw_resistance` / `texture_solid_overload` 边界 notes，不能借本轮 gate 被推进为 first-batch candidate。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.63 minimal accidentTypeId registry candidate record

v0.0.7.63 新增 `reports/accidentTypeIdRegistryCandidateRecord.v0.0.7.63.md`，只记录两个已通过 minimal candidate gate 的 accidentTypeId 作为 first-batch future registry candidates：

- `taste_acid_overload`
- `texture_solid_overload`

两项 candidateRecord 均为：

```text
first_batch_future_registry_candidate_not_approved
```

这只表示它们可以进入后续 reviewed registry / schema task 的候选记录；仍不是 `approved_stable`，不是 registry entry，不是 schema，不是 validator input，不是 allowed values，也不能进入 generated severity / runtime。

`texture_low_drinkability` 是本轮 explicit non-candidate / Not This Round：它重要，但仍需先补 `texture_straw_resistance` / `texture_solid_overload` 边界 notes，不能借 `texture_solid_overload` 的 gate result 或 candidate record 被推进。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.64 first-batch accidentTypeId source index / readiness review

v0.0.7.64 新增 `reports/accidentTypeIdFirstBatchSourceIndex.v0.0.7.64.md`，只为已经进入 first-batch future registry candidate record 的两个 accidentTypeId 做 source index / readiness review：

- `taste_acid_overload`
- `texture_solid_overload`

两项 readiness 均记录为：

```text
ready_for_minimal_registry_candidate_preparation_not_approval
```

这只表示它们已有 sourceLayer / sourceSummary / triggerMetric candidates / evidence / boundary notes，可进入后续 minimal registry candidate preparation；仍不是 `approved_stable`，不是 registry entry，不是 schema，不是 validator input，不是 allowed values，也不能进入 generated severity / runtime。

`texture_low_drinkability` 是本轮 explicit exclusion / Not This Round：它仍需先补 `texture_straw_resistance` / `texture_solid_overload` 边界 notes。historical `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 仍只作历史记录，不回流 current registry / validator / generated severity / runtime。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor / straw resistance final decision 暂不处理。

### v0.0.7.65 minimal accidentTypeId registry candidate preparation

v0.0.7.65 新增 `reports/accidentTypeIdRegistryCandidatePreparation.v0.0.7.65.md`，只把已经完成 source index / readiness review 的两个 accidentTypeId 整理成后续 reviewed registry / schema task 可接收的最小候选材料：

- `taste_acid_overload`
- `texture_solid_overload`

两项 preparationStatus 均记录为：

```text
candidate_preparation_ready_for_reviewed_registry_task_not_approval
```

这只表示它们已经复用 v0.0.7.59-v0.0.7.64 的 decision record、source notes、candidate notes record、minimal gate、candidate record 和 source index 结论，可进入后续 reviewed registry / schema task plan；仍不是 `approved_stable`，不是 registry entry，不是 schema，不是 validator input，不是 allowed values，也不能进入 generated severity / runtime。

`texture_low_drinkability` 是本轮 explicit exclusion / Not This Round：它仍需先补 `texture_straw_resistance` / `texture_solid_overload` 边界 notes。historical `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 仍只作历史记录，不回流 current registry / validator / generated severity / runtime。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor / straw resistance final decision 暂不处理。

v0.0.7.65 明确下一步不应继续为这两个 ID 新增 review pack / sample pack / proposal pack；下一步应是 reviewed registry / schema task plan，用来决定最小 registry / schema task 如何接收这两个 candidate。

### v0.0.7.66 minimal registry / schema task plan

v0.0.7.66 新增 `reports/minimalRegistrySchemaTaskPlan.v0.0.7.66.md`，只为已经完成 minimal candidate preparation 的两个 accidentTypeId 定义后续 reviewed registry / schema task 的最小任务边界：

- `taste_acid_overload`
- `texture_solid_overload`

该 task plan 只定义 future task 的最小 scope、candidate intake requirements、future task shape、gate、validator boundary 和 anti-bloat rule。它不是 registry、schema、enum、validator input、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把任何 ID 写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。

v0.0.7.66 明确：future validator 只能读取 reviewed registry / schema，不能读取本 report、collector output、sample sheets、generated observations、docs prose、review pack / sample pack / proposal pack rows 作为 allowed values。

`texture_low_drinkability` 是本轮 explicit exclusion / Not This Round：它仍需先补 `texture_straw_resistance` / `texture_solid_overload` 边界 notes。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor / straw resistance final decision 暂不处理。

v0.0.7.66 明确下一步不应继续为 `taste_acid_overload` 和 `texture_solid_overload` 新增 review pack / sample pack / proposal pack；下一步应是 minimal accidentTypeId registry / schema task specification，用来决定如果创建最小 registry / schema，具体改哪些文件、字段、测试和禁止事项。

### v0.0.7.67 minimal accidentTypeId registry / schema task specification

v0.0.7.67 新增 `reports/minimalAccidentTypeRegistrySchemaSpecification.v0.0.7.67.md`，把 v0.0.7.66 task plan 收束成 future minimal accidentTypeId registry / schema implementation task 的规格说明。

本轮只围绕：

- `taste_acid_overload`
- `texture_solid_overload`

该 specification 只规定 future implementation 如果开工，应该如何控制最小范围、future files、entry fields、future read-only check script、validation commands 和 forbidden implementation expansion。它可以讨论 future files，例如 `data/stableIdRegistry.js` 与 `scripts/content/checkStableIdRegistry.js`，但本轮不创建这些文件。

该 specification 不是 registry、schema、enum、validator、check script、allowed values 或 generated severity data；不批准任何 accidentTypeId，不把任何 ID 写成 `approved_stable`，也不让任何条目进入 validator / generated severity / runtime。

`texture_low_drinkability` 仍是 explicit exclusion / Not This Round。feedbackTag、drinkStructure、durian / dairy / industrial creamer / strong flavor、`texture_straw_resistance` final decision、generated severity、partial takeover 和 runtime takeover 均不处理。

v0.0.7.67 明确下一步如果继续，才可考虑 `v0.0.7.68｜minimal accidentTypeId registry scaffold`：只创建极小 registry draft 与只读 check script，不接 runtime，不做 validator active enforcement，不生成 allowed values / generated severity，也不做 partial takeover。

### v0.0.7.68 minimal accidentTypeId registry scaffold

v0.0.7.68 创建了第一刀极小 implementation scaffold：

- `data/stableIdRegistry.js`
- `scripts/content/checkStableIdRegistry.js`

本轮 registry scaffold 只包含：

- `taste_acid_overload`
- `texture_solid_overload`

两项均为 `reviewed_candidate_not_approved`，且：

```text
canEnterValidator = false
canEnterGeneratedSeverity = false
canAffectRuntime = false
```

`scripts/content/checkStableIdRegistry.js` 只做只读结构检查和 hard forbidden condition 检查。它不是 active validator，不生成 allowed values，不读取 collector output 当 registry，不接 runtime，不接 generated severity，也不接 content sheets。

本轮没有加入 `texture_low_drinkability`。historical `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 没有作为 current entry 回流；`texture_topping_overload` 只作为 `texture_solid_overload` 的 historical link note 出现。feedbackTag / candidateTag / outcomeTypeId / drinkStructure，以及 durian / dairy / industrial creamer / strong flavor / straw resistance final decision 均未处理。

这仍不表示 P1-1 / P1-2 / P1-3 / P1-4 solved：当前只是最小 registry scaffold + read-only check script，不是 approved source-of-truth、schema、active validator、allowed values、generated severity 或 runtime takeover。

## 2. P0 / P1 / P2 定义

- P0：立即阻塞，必须马上修，否则不能继续开发或冻结 candidate。当前四轮审计结果：P0 暂无。
- P1：当前 runtime 不一定已坏，但若不在指定门槛前处理，后续会造成机制混乱、ID 扩散、validator 错误、generated data 污染或 partial / active 接管风险。P1 必须在对应 gate 前解决。
- P2：不阻塞当前机制推进，但建议在合适时机整理，避免长期文档污染、开发体验变差或小技术债累积。

## 3. 阻塞门槛总览

| Gate | 之前必须完成 |
|---|---|
| AI 生成 ID 与机制命名审计开工前 | 已读取 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 并遵守其审计流程 |
| 新增 stable ID / feedbackTag / ruleId 进入表格前 | 分层确认、语义审查、source-of-truth 确认 |
| validate candidate severity sheet 实现前 | 已明确 known stable ID source of truth；若无，应先设计 registry / enum / schema |
| severity generated data build 前 | candidate severity sheet validator |
| severity shadow 输出前 | generated severity validator / structure check |
| severity partial takeover 前 | ID 命名审计、golden shadow expected、制作人 review |
| severity / threshold 表引用 `feedbackTag` 前 | 已读取 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`，并确认引用的是 reviewed feedbackTag source-of-truth，不是 candidate / risk tag |
| generated feedback partial takeover 前 | feedbackTag registry / 文案池扩充 / review pack 审核 |
| accidentAnalyzer 迁移路线设计前 | 已读取 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`，并确认迁移不改变 runtime / golden / generated 引用 |
| registry / validator / generated data 接收 Codex 生成机制内容前 | 已读取 `docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md`，并完成 human / ChatGPT 可审查 review pack gate |
| mechanism review pack generator 实现前 | 已用 `reports/mechanismReviewPack.sample.md` 或等价样例 proof 验证 item 结构、provenance、decision summary 和 machine appendix 可审查 |
| structure / operation / production 规则 active 依赖 `drinkStructureAnalyzer` 前 | 已读取 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`，并完成 metadata source-of-truth、shadow compare、review pack 和 staged migration plan |
| collector / source-of-truth cleanup 或 registry design 前 | historical / pre-version legacy ID 语气已清理，避免把已迁出的 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 误读为 current active runtime ID、registry current ID 或 generated severity input |
| source-of-truth / registry / schema design 后、validator 实现前 | 已确认 observed ≠ approved；collector output 只作为 drift check / evidence，不是 allowed values generator |
| v0.0.7.x 机制 final 收口前 | AI 生成 ID 与机制命名审计、accidentAnalyzer 迁移路线、drinkStructureAnalyzer 去中文 Set 计划 |

## 4. P1 TODO

### P1-1｜AI 生成 ID 与机制命名审计

- 风险：AI / Codex 生成或沿用的 ID 可能看起来稳定，却混用了机制、样本、文案、severity 或 source 层级。
- 当前状态：v0.0.7.27 已建立 guardrail；v0.0.7.38 已新增 `reports/aiGeneratedIdTagReviewPack.sample.md` 作为 AI-generated ID / tag naming review pack proof；v0.0.7.39 已新增 `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md` 作为正式 naming review pack；v0.0.7.40 已新增 `reports/aiGeneratedIdTagNamingDecisionSplit.v0.0.7.40.md`，记录制作人 / ChatGPT decision split 和 `taste_conflict` -> `flavor_identity_conflict` 迁移影响审计；v0.0.7.41 已执行该 one-shot migration，使当前 outcomeTypeId 改为 `flavor_identity_conflict`，legacy `taste_conflict` 仅保留为迁移前历史记录；v0.0.7.42 已补充 post-migration outcome / candidate tag / feedbackTag 边界 notes；v0.0.7.53 已新增 reviewed registry shape proposal，把 ID family、status 和 review gate 转成可审查材料；v0.0.7.54 已新增 registry entry sample pack，把少量 sample entries 转成可读 review rows；v0.0.7.55 已新增 accidentTypeId registry candidate review pack，把事故 ID 候选项和 historical old IDs 转成可审查问题；v0.0.7.57 已对三个 likely-stable accidentTypeId 候选补充 source notes review；v0.0.7.58 已把这三个 ID 转成第一批人工决策草案；v0.0.7.59 已将草案收束为 first-batch decision record；v0.0.7.60 已为 `taste_acid_overload` / `texture_solid_overload` 补 source notes / triggerMetric notes / evidence boundary；v0.0.7.61 已将这两项收束为 `candidate_notes_recorded_not_approved` 的 candidate notes record；v0.0.7.62 已为这两项设计 minimal registry candidate gate，并记录为 `passes_minimal_candidate_gate_with_notes`；v0.0.7.63 已把这两项记录为 `first_batch_future_registry_candidate_not_approved` 的 first-batch future registry candidate record；v0.0.7.64 已为这两项建立 source index / readiness review，并记录为 `ready_for_minimal_registry_candidate_preparation_not_approval`；v0.0.7.65 已将这两项整理为 `candidate_preparation_ready_for_reviewed_registry_task_not_approval` 的 minimal candidate preparation；v0.0.7.66 已为这两项定义 minimal registry / schema task plan；v0.0.7.67 已为这两项定义 minimal registry / schema task specification；v0.0.7.68 已创建最小 `data/stableIdRegistry.js` scaffold 和只读 `scripts/content/checkStableIdRegistry.js`。当前仍待 reviewed schema / active validator / generated severity / runtime takeover 等后续 gate，P1-1 仍未解决。
- 为什么重要：ID 一旦进入 docs、sample sheet、generated data、golden 或 runtime，会被后续 AI 当成事实来源。
- 必须在什么时候前解决：正式调参前；`candidate_severity_rules` 进入 generated data 前；severity / threshold partial takeover 前；v0.0.7.x 机制部分 final 收口前。
- 建议路线：按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 的长期审计流程，先列出 `accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`textId`、`sampleId`、`ruleId`、`candidateId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer`、`sourceSummary`、`triggerMetric` 以及 profile / tag / generated sample 中的 draft ID，再检查层级是否混用；可用 `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md` 作为正式 review pack 审查材料，并用 `reports/aiGeneratedIdTagNamingDecisionSplit.v0.0.7.40.md` 追踪已记录的制作人方向、技术下一步和迁移影响面。v0.0.7.41 已完成 `taste_conflict` -> `flavor_identity_conflict` one-shot migration，但这只解决一个 outcome ID 迁移点，不等于完成 P1-1；后续仍需 source-of-truth / registry design、ID inventory review 和 gate 审查。
- 禁止误处理：不要顺手重命名已有 ID；不要把疑似问题直接改成新事实；不要把 `reports/aiGeneratedIdTagReviewPack.sample.md`、`reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md` 或 `reports/aiGeneratedIdTagNamingDecisionSplit.v0.0.7.40.md` 当作 registry、enum、schema、validator input、generated data 或 runtime source-of-truth；需要迁移时单独开任务并保护 runtime、golden、docs、content_sheets、checks 和 generated 引用。

重点检查：

- 是否按原料拆机制。
- 是否把 sampleId 混进机制主键。
- 是否把 severity 后缀混进 `accidentTypeId`。
- 是否把 `displayName` / `zhCN` 当主键。
- 是否旧 tag 语义误导新机制。
- 是否草案 ID 被误当正式 ID。
- 是否 ID 名称覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。

### P1-2｜known stable ID source of truth / registry / enum / schema

- 风险：future validator 如果没有明确 ID 来源，容易退回 substring / suffix 猜合法性。
- 当前状态：v0.0.7.27 已明确 validator 前置条件；v0.0.7.51 已更新 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`，明确 observed ≠ approved、collector output ≠ registry、historical legacy reference ≠ current allowed value，并设计 future registry / schema 形态；v0.0.7.53 已新增 `reports/stableIdRegistryShapeProposal.v0.0.7.53.md`，提出 registry entry fields、status vocabulary 和 family shape；v0.0.7.54 已新增 sample pack 测试未来 row shape；v0.0.7.55 已新增 accidentTypeId candidate review pack；v0.0.7.57 已新增 likely-stable notes review，帮助后续 producer / ChatGPT decisions；v0.0.7.58 已新增 first-batch decision draft；v0.0.7.59 已新增 first-batch decision record；v0.0.7.60 已新增 first-batch source notes sync；v0.0.7.61 已新增 first-batch candidate notes record；v0.0.7.62 已新增 minimal candidate gate design；v0.0.7.63 已新增 first-batch future registry candidate record；v0.0.7.64 已新增 first-batch source index / readiness review；v0.0.7.65 已新增 minimal candidate preparation；v0.0.7.66 已新增 minimal registry / schema task plan；v0.0.7.67 已新增 minimal registry / schema task specification；v0.0.7.68 已新增最小 `data/stableIdRegistry.js` scaffold 和只读 `scripts/content/checkStableIdRegistry.js`，但两项 entry 仍是 `reviewed_candidate_not_approved`，`canEnter*` 仍为 false。尚未新增 enum / JSON schema，也未实现 active validator / allowed values generator；当前 scaffold / check script 不等于 approved source of truth。
- 为什么重要：validator 是防错层，不能自己变成新的字符串 if 地狱。
- 必须在什么时候前解决：validate candidate severity sheet 正式实现前；任何 generated severity data build 前。
- 建议路线：先按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 和 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md` 决定 known stable ID 来源；collector 只能提供 observed evidence / drift check，不能直接生成 allowed values。可选来源包括现有 data / rules 中经 review 的 stable ID、统一 ID registry、generated schema、明确 enum / allowed values。
- 禁止误处理：不能写 `inferFromStringPatterns()` 之类从字符串模式反推 known ID 集合；字符串后缀 / substring 只能做 lint / warning。

### P1-3｜candidate severity sheet validator

- 风险：`content_sheets/examples/candidate_severity_rules.sample.csv` 当前只是草案，没有 validator 保护。
- 当前状态：CSV / JSON 健康，所有样例行 disabled / draft，但还不能进入 build / generated data。v0.0.7.53 只提出 registry shape proposal；v0.0.7.54 只提供 registry entry sample pack；v0.0.7.55 只提供 accidentTypeId registry candidate review pack；v0.0.7.57 只提供 likely-stable notes review；v0.0.7.58 只提供 first-batch decision draft；v0.0.7.59 只提供 first-batch decision record；v0.0.7.60 只提供 first-batch source notes sync；v0.0.7.61 只提供 first-batch candidate notes record；v0.0.7.62 只提供 minimal candidate gate design；v0.0.7.63 只提供 first-batch future registry candidate record；v0.0.7.64 只提供 first-batch source index / readiness review；v0.0.7.65 只提供 minimal candidate preparation；v0.0.7.66 只提供 minimal registry / schema task plan；v0.0.7.67 只提供 minimal registry / schema task specification；v0.0.7.68 只提供最小 registry scaffold 和只读 check script，且不生成 allowed values、不作为 active validator。这些产物仍未提供 validator 可读取的 approved registry / schema。
- 为什么重要：没有 validator 就 build，会污染 generated data 并放大 ID / schema 错误。
- 必须在什么时候前解决：severity sheet 进入 build / generated data 前。
- 建议路线：先实现只读 validator，检查 UTF-8 with BOM、表头完整、`ruleId` 唯一、`enabled` 合法、`candidateType` 合法、known stable ID 引用合法、`accidentTypeId` 不误用原料 / severity / sample 语义、`triggerMin` / `triggerMax` / `scoreMultiplier` 区间合法，并禁止 `displayName` / `zhCN` / sampleId 当主键。
- 禁止误处理：validator 不能为具体 sample、中文文案或单个原料写例外。

### P1-4｜accidentAnalyzer legacy 内容判断迁移路线

- 风险：`core/accidentAnalyzer.js` 仍是旧事故判断集中区，后续若继续堆具体 if，会拖慢数据化迁移。
- 当前状态：当前不建议大改；v0.0.7.34 已新增 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` 作为只读 mapping / inventory；v0.0.7.44 已新增 `reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md`，把 legacy accidents 分成 special candidate、generalize later、source notes、split review、data-driven notes 和 compatibility-only；v0.0.7.45 已新增 `reports/textureContentAccidentMigrationPlan.v0.0.7.45.md`，记录 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 的 future target plan；v0.0.7.46 已完成 `texture_taro_overload` -> `texture_low_drinkability` actual migration；v0.0.7.47 已完成 `texture_oreo_overload` -> `texture_low_drinkability` actual migration；v0.0.7.48 已补充机制 ID 节制原则与玩家展示分层边界，防止后续迁移把 recipe、sample、文案梗或 review item 反向写进机制 ID；v0.0.7.49 已完成 `texture_topping_overload` -> `texture_solid_overload` actual migration；v0.0.7.55 已将 accidentTypeId candidates 整理成 producer / ChatGPT review questions；v0.0.7.57 已对 `taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload` 做 likely-stable notes review；v0.0.7.58 已为这三项整理 first-batch decision draft；v0.0.7.59 已将草案收束为 decision record；v0.0.7.60 已为 `taste_acid_overload` / `texture_solid_overload` 补 source notes / evidence boundary；v0.0.7.61 已将这两项收束为 candidate notes record；v0.0.7.62 已为这两项设计 minimal registry candidate gate；v0.0.7.63 已将这两项记录为 first-batch future registry candidates；v0.0.7.64 已将这两项整理成 source index / readiness review；v0.0.7.65 已将这两项整理成 minimal candidate preparation；v0.0.7.66 已为这两项定义 minimal registry / schema task plan；v0.0.7.67 已为这两项定义 minimal registry / schema task specification；v0.0.7.68 已创建这两项的最小 registry scaffold 和只读 check script，但仍未批准、未接 active validator。texture content-specific staged migration 三步已完成，但 accidentAnalyzer broader migration route、approved source-of-truth / schema、active validator / generated severity / shadow / partial takeover gates 仍未解决，P1-4 未解决。
- 为什么重要：severity / threshold active 接管前，应明确哪些 legacy 判断保留，哪些迁入 summary / candidate / severity table。
- 必须在什么时候前解决：severity / threshold active 接管前；v0.0.7.x 机制收口前。
- 建议路线：以 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`、`reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md` 和 `reports/textureContentAccidentMigrationPlan.v0.0.7.45.md` 为输入，先完成 producer review、source-of-truth / registry design、shadow / golden review、staged migration plan，并在 validator design 前确认 known accidentTypeId source；再决定哪些保留 legacy、哪些迁移，不做一次性大重构。
- 禁止误处理：不要现在大改 `accidentAnalyzer.js`；不要为了清债直接改评分、事故、feedback 或 golden expected；不要把 v0.0.7.44 / v0.0.7.45 reports 当作 registry、validator input、generated data 或 runtime source-of-truth。

已知具体内容判断包括：

- `dairy_fat_overload`
- `industrial_creamer_overload`
- historical / pre-v0.0.7.46 `texture_taro_overload`
- historical / pre-v0.0.7.47 `texture_oreo_overload`
- historical / pre-v0.0.7.49 `texture_topping_overload`
- `taste_strong_flavor_overload`
- `texture_straw_resistance`

补充记录：inventory 也覆盖当前 rule engine / structure rule 相关事故，如 `taste_acid_overload`、`flavor_durian_overload`、`texture_low_drinkability`、`texture_solid_overload`，以及 legacy texture dedupe fallback。该覆盖不代表迁移完成。

v0.0.7.45-v0.0.7.49 texture content-specific migration 状态：

- `texture_taro_overload` -> `texture_low_drinkability` actual migration 已于 v0.0.7.46 完成；旧 ID 只应作为 historical / pre-v0.0.7.46 legacy note 保留。
- `texture_oreo_overload` -> `texture_low_drinkability` actual migration 已于 v0.0.7.47 完成；旧 ID 只应作为 historical / pre-v0.0.7.47 legacy note 保留。
- `texture_topping_overload` -> `texture_solid_overload` actual migration 已于 v0.0.7.49 完成；旧 ID 只应作为 historical / pre-v0.0.7.49 legacy note 保留。

该阶段不新增 `texture_paste_overload` / `texture_sediment_overload` / `texture_topping_specific_overload`，也不把 ingredient personality 写进 future `accidentTypeId`。芋泥、奥利奥和具体小料个性应保留在 evidence / notes / feedback copy。taro / Oreo / topping 已完成最小 runtime migration 与 golden guard；仍需 source-of-truth / registry / schema 设计、legacy collector / source wording cleanup、feedback review、generated reference audit 和 broader accidentAnalyzer migration review。

v0.0.7.48 补充长期 guardrail：机制 ID 要少而稳，不应为单个组合、recipe、golden sample、文案梗、制作人备注或 review pack item 创建新的 `accidentTypeId` / `outcomeTypeId` / mechanism ID。玩家展示 `type` 和 feedback copy 可以因 evidence 不同而不同，但不能反向拆出新的 mechanism ID；可以分开演，但不能分开建身份证。

### P1-5｜summaryCandidateEngine candidate tag / feedbackTags registry 边界

- 风险：readonly candidate / 风险语义可能被误当 runtime feedbackTag。
- 当前状态：`core/summaryCandidateEngine.js` 中存在 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty` 等 candidate / feedbackTags。v0.0.7.33 已新增 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 记录 mapping 边界；v0.0.7.40 再次确认 candidate / risk tag 不能自动成为 runtime feedbackTag；v0.0.7.42 明确 `identity_conflict` 仍是 candidate / risk tag，不是 runtime feedbackTag，也不能因字符串接近 `flavor_identity_conflict` 就被当成 outcomeTypeId；v0.0.7.43 已新增 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md`，将 candidate / risk tag、runtime-observed feedbackTag、generated / shadow tag 和 producer review 问题拆开记录；v0.0.7.56 已新增 `reports/feedbackTagCandidateReviewPack.v0.0.7.56.md`，把 feedbackTag / candidate tag / outcomeTypeId 候选项整理成人工可审查表。尚未新增 registry / validator，也未解决该 P1。
- 为什么重要：这些 tag 当前服务 readonly candidate / 风险语义，不应自动等同于 runtime 文案池 tag。
- 必须在什么时候前处理：任何 validator / generated data 消费这些 tag 前；generated feedback partial / active 接管前；severity / threshold 使用 `feedbackTag` 字段前。
- 建议路线：以 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 和 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md` 为边界，后续再做 feedbackTag source-of-truth / mapping review / registry 设计，明确哪些只是风险语义，哪些需要制作人文案方向 review，哪些需要文案池扩容后才能进入 partial / active takeover 讨论。
- 禁止误处理：不要把 `aroma_pressure` 这类风险名直接写入 runtime `feedbackTag` 字段。

### P1-6｜drinkStructureAnalyzer 中文显示名 Set 残留

- 风险：`core/drinkStructureAnalyzer.js` 中仍有中文显示名 Set，例如茶类、风味、小料、调味等分类。
- 当前状态：当前可运行，但与“显示文案不当系统主键”原则不完全一致。v0.0.7.37 已新增 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`，只读整理 displayName Set、`item.name -> getTasteProfile`、displayName-keyed profile fallback 和相邻中文 category / drinkType 依赖；这只是 inventory / migration plan，不代表 P1-6 已解决。
- 为什么重要：显示名、本地化或 alias 改动可能影响结构分析。
- 必须在什么时候前处理：正式本地化前；结构 / operation / production 规则 active 依赖 `drinkStructureAnalyzer` 前；v0.0.7.x 机制收口审计中至少形成处理计划。
- 建议路线：以 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md` 为输入，先设计 metadata candidate / source-of-truth，再做 shadow compare、mechanism review pack 和 staged replacement；不要直接把中文 Set 换成新的 if 或未审计 tags。
- 禁止误处理：不要一次性重写所有结构分析。

### P1-7｜feedbackTag 语义边界与文案池扩容

- 风险：旧 feedbackTag 语义可能误导新机制，薄文案池也会影响 generated feedback active 接管。
- 当前状态：`bubble_conflict` 是当前可观察的 runtime feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评；`aroma_pressure` 当前不是 runtime 文案池 feedbackTag；多个 generated feedback tags 只有 1 条文案。v0.0.7.33 已把这些边界写入 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`；v0.0.7.40 再次确认 `bubble_conflict` 不得泛化为 generic flavor identity conflict，`aroma_pressure` / `identity_conflict` 等只能作为 future copy direction candidate，不能直接进入玩家文案选择；v0.0.7.42 再次固定 `bubble_conflict` 不是 `flavor_identity_conflict` 的唯一或默认文案标签；v0.0.7.43 已新增 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md`，把 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`bubble_conflict`、`greasy_overload`、`straw_disaster` 等 tag 的制作人 review 问题和技术 gate 拆开记录；v0.0.7.56 已新增 `reports/feedbackTagCandidateReviewPack.v0.0.7.56.md`，继续把 `straw_followup`、runtime observed tag、candidate / risk tag 和 `flavor_identity_conflict` outcome boundary 纳入 review pack。但尚未完成 registry / 文案池扩容 / active 接管前 review。
- 为什么重要：feedback partial / active 接管前，文案池和 tag 语义必须经过制作人 review。
- 必须在什么时候前处理：generated feedback partial / active 接管前；`feedbackTag` 被 severity / threshold 表引用前。
- 建议路线：先用 mapping design 和 v0.0.7.43 decision split 做制作人审核，再决定扩写、拆分、保留 candidate-only、保持窄语义或弃用哪些 tag；随后再设计 feedbackTag source-of-truth / registry、validator、generated feedback partial takeover gate。
- 禁止误处理：不要把 `bubble_conflict` 泛化到 flavor identity conflict；不要把 `aroma_pressure` 当已注册 runtime 文案池 tag。

### P1-8｜v0.0.7.x 机制部分 final 审计

- 风险：多个 shadow / generated / validator / review pack 逐步进入后，机制边界可能被小步改动冲散。
- 当前状态：尚未做 final 审计。
- 为什么重要：机制部分收口前必须确认没有把草案、样本、显示文案或 generated data 误接进 final result。
- 必须在什么时候前完成：v0.0.7.x 机制部分 final candidate 前；任何 partial / active 接管扩大前。
- 建议路线：集中复核 ID、summary / candidate / priority、validator、generated data、review pack、golden expected 更新理由。
- 禁止误处理：不要把 final 审计变成大改实现任务；审计先判断，再拆小任务。

审计必须确认：

- 没有按原料拆事故机制。
- `sampleId` / `accidentTypeId` / `displayName` 未混用。
- `priorityBand` / `severityHint` 未当成 severity / `scoreMultiplier`。
- generated / candidate / priority 没有过早接管 final result。
- validator / generated data / review pack 没有绕过 guardrail。
- golden expected 更新是有意识产品判断。

## 5. P2 TODO

### P2-1｜README 当前版本信息过期

当前 README 仍可能显示旧版本，例如 v0.0.4.0。不影响 runtime，但会误导新对话 / 新 Codex。建议在后续 docs housekeeping 中处理。

### P2-2｜AI_CONTEXT 当前状态段过长 / 有历史噪音

`docs/AI_CONTEXT.md` 作为恢复入口仍然重要，但当前状态段已经较长，且夹杂部分旧解释。后续可做瘦身，不阻塞当前机制推进。

### P2-3｜index.html 页面显示版本与 candidate 版本语义不同

页面可能仍显示最近 runtime / UI 版本，例如 v0.0.7.19，而 Git candidate 已到 v0.0.7.27+。需要明确：

```text
页面版本 = runtime / UI 可见版本
Git candidate = 项目开发版本
```

建议后续 UI / runtime 任务中处理或在 docs 中说明。

### P2-4｜feedback 文案池薄

多个 `feedbackTag` 只有 1 条文案。不阻塞 shadow，但 active 接管前需要扩充和制作人 review。

### P2-5｜generated schema version 后续需关注

当前 generated feedback schema version 如果长期停留在旧版本，不一定是 bug；但 schema 变更时必须同步更新，避免未来误判。

### P2-6｜.DS_Store / Mac 元数据 housekeeping

不影响机制。后续可清理 / 确认 `.gitignore`。

### P2-7｜CSV parser 重复

`validateFeedbackSheet.js` 和 `buildFeedbackData.js` 存在 CSV parser 重复。当前不阻塞，后续可抽 helper。

## 6. 不应立即处理 / 不应乱改的内容

- 不要现在重命名 `dairy_fat_overload`、`flavor_durian_overload`，也不要把 historical `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 重新包装成 current ID。
- 这些 ID 可能已经被 runtime、golden、docs 或 generated data 引用，应进入后续 ID 审计，而不是顺手改名。
- 不要现在大改 `core/accidentAnalyzer.js`。
- 不要把 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` 当作迁移许可；它只是 inventory，不是 runtime 改造方案。
- 不要把 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md` 当作迁移许可；它只是 inventory / migration plan，不是 runtime 改造方案。
- 不要现在重写 `core/drinkStructureAnalyzer.js`。
- 不要直接把中文 Set / displayName dependency 替换成未经 review 的 `categoryId` / profile tag / operation profile。
- 不要为了清理 displayName 依赖而绕过 metadata source-of-truth、shadow compare、mechanism review pack 和 golden 回归。
- 不要现在 active 接管 severity / threshold。
- 不要现在扩 generated feedback active 接管范围。
- 不要因为玩家展示 `type` 不同、feedback 文案不同、某条 golden sample 或 review pack item 很具体，就反向创建新的 mechanism ID。
- 不要把已迁出的 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 在 collector / source-of-truth 文案中继续写成 current active runtime ID、current migration candidate、registry stable current ID 或 generated severity input；这些旧 ID 只能以 historical / pre-version legacy reference 语气出现。
- 不要为了清理 docs 而删除历史上下文正本。
- 不要把 P1 / P2 写成已解决。

## 7. 后续建议路线

可考虑按以下顺序推进：

1. 冻结本 TODO / audit debt 文档 candidate。
2. 读取并遵守 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
3. 以 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` 为输入，读取 `docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md`，让 Codex 生成的机制内容先有可审查出口；v0.0.7.34 已完成 inventory，v0.0.7.35 已完成 review pack gate design，但 P1-4 未解决。
4. v0.0.7.36 已新增 `reports/mechanismReviewPack.sample.md`，作为 mechanism / generated output review pack proof / sample report；它只是结构 proof，不是正式 review 结论，不批准任何 ID / tag / rule，也不表示 P1 已解决。
5. 后续可考虑根据 sample proof 再设计 review pack generator；在 generator / review pack gate 成熟前，不应让 registry / validator / generated data 接收 Codex 生成机制内容。
6. v0.0.7.37 已新增 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`，记录 `drinkStructureAnalyzer` 中文显示名 Set、profile fallback 和相邻 category / drinkType 显示文案依赖；P1-6 仍未解决，后续还需要 metadata candidate、shadow compare、review pack 和 staged migration。
7. v0.0.7.38 已新增 `reports/aiGeneratedIdTagReviewPack.sample.md`，作为 AI 生成 ID 与机制命名复审的 review pack proof；它只是审查出口样例，不批准任何 ID / tag / rule，也不表示 P1-1 已解决。
8. v0.0.7.39 已新增 `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`，作为正式 AI-generated ID / tag naming review pack；它仍不是批准结论，不是 registry / validator input / generated data / runtime source-of-truth，也不表示 P1-1 已解决。
9. v0.0.7.40 已新增 `reports/aiGeneratedIdTagNamingDecisionSplit.v0.0.7.40.md`，记录制作人 / ChatGPT decision split，并只读审计 `taste_conflict` -> `flavor_identity_conflict` 的迁移影响面；该 report 不执行迁移，不批准任何 ID / tag / rule 进入 registry / validator / generated data / runtime，也不表示 P1-1 已解决。
10. v0.0.7.41 已将 legacy `taste_conflict` 受控迁移为当前 `flavor_identity_conflict` outcomeTypeId，并同步 runtime mapping、golden expected、content sheets、generated feedback data、adapter check 和当前事实 docs / reports；该迁移不新增 registry / validator，不改变 `identity_conflict` candidate / risk tag 或 `bubble_conflict` feedbackTag 语义，也不表示 P1-1 / P1-5 / P1-7 已解决。
11. v0.0.7.42 已补充迁移后的 outcome / candidate tag / feedbackTag 边界 notes：`flavor_identity_conflict` 是当前 outcomeTypeId；`identity_conflict` 仍是 candidate / risk tag；`bubble_conflict` 仍是窄语义 feedbackTag；legacy `taste_conflict` 只作 historical note。该补充不代表 P1-1 / P1-5 / P1-7 已解决。
12. v0.0.7.43 已新增 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md`，作为 feedbackTag mapping review split / source-of-truth precheck；它只拆分制作人 review 和技术 gate，不批准任何 feedbackTag 进入 registry / validator / generated data / runtime，也不表示 P1-5 / P1-7 已解决。
13. 后续可继续用 v0.0.7.43 report 做制作人 review，先决定 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty` 是否仅保留 candidate/risk 语义，是否需要新玩家文案方向，以及 `bubble_conflict`、`greasy_overload`、`straw_disaster` 是否需要保持窄语义或扩充文案池。
14. v0.0.7.44 已新增 `reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md`，把 legacy accidentAnalyzer / accident rules / structure rules 的事故分成 special candidate、generalize later、source notes、split review、data-driven notes 和 compatibility-only；它不迁移 runtime，不让任何 `accidentTypeId` 进入 registry / validator / generated data / runtime，也不表示 P1-4 已解决。
15. 后续可用 v0.0.7.44 report 做制作人 / ChatGPT review，先确认榴莲 / 植脂奶是否保留特殊机制候选，芋泥 / 奥利奥 / 小料是否未来泛化迁移，`dairy_fat_overload` 的 texture / fatLoad notes，`taste_strong_flavor_overload` 是否拆分，以及结构事故 append / suppression 边界。
16. v0.0.7.45 已新增 `reports/textureContentAccidentMigrationPlan.v0.0.7.45.md`，记录 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 的 future target plan：taro / Oreo 倾向 `texture_low_drinkability`，topping 倾向 `texture_solid_overload`；它不迁移 runtime，不新增 `accidentTypeId`，不表示 P1-4 已解决。
17. v0.0.7.46 已完成 staged order 的第一步：`texture_taro_overload` -> `texture_low_drinkability` actual migration；保留原 score / cap / type / add / note，并新增 `taro_low_drinkability_migration` golden sample 保护 taro branch 新事故 ID。旧 `texture_taro_overload` 只保留为 historical / pre-v0.0.7.46 legacy note。该迁移不表示 P1-4 已解决。
18. v0.0.7.47 已完成 staged order 的第二步：`texture_oreo_overload` -> `texture_low_drinkability` actual migration；保留原 score / cap / type / add / note，并新增 `oreo_low_drinkability_migration` golden sample 保护 Oreo branch 新事故 ID。旧 `texture_oreo_overload` 只保留为 historical / pre-v0.0.7.47 legacy note。该迁移不表示 P1-4 已解决。
19. v0.0.7.48 已补充机制 ID 节制原则、机制 ID 与玩家展示分层边界，以及 collector / source 旧 ID historical cleanup 待办。该 guardrail 不迁 topping，不新增 ID，不新增 registry / validator，也不表示 P1-4 已解决。
20. v0.0.7.49 已完成 staged order 的第三步：`texture_topping_overload` -> `texture_solid_overload` actual migration；保留原 score / cap / type / add / note，并新增 `topping_solid_overload_migration` golden sample 保护 topping branch 新事故 ID。旧 `texture_topping_overload` 只保留为 historical / pre-v0.0.7.49 legacy note。该迁移不表示 P1-4 已解决。
21. 做 feedbackTag source-of-truth / registry / schema 设计，明确 runtime observed、generated / shadow、candidate / risk、rule tag、sample draft tag 的分层来源。
22. v0.0.7.50 已清理 collector / source 文案中已迁出旧 ID 的 current-active 语气：`texture_taro_overload` 只能作为 historical / pre-v0.0.7.46 legacy reference，`texture_oreo_overload` 只能作为 historical / pre-v0.0.7.47 legacy reference，`texture_topping_overload` 只能作为 historical / pre-v0.0.7.49 legacy reference；该 cleanup 不创建 registry / schema / validator，也不表示 P1-4 已解决。
23. v0.0.7.51 已更新 source-of-truth / registry / schema design docs，明确 observed ≠ approved、collector output ≠ registry、runtime observed / golden / generated / sample draft / review pack / historical reference 的分层来源，并把已迁出的三项 texture old IDs 固定为 historical / pre-version legacy reference。该 design 不创建 registry / schema / validator，也不批准任何 ID。
24. v0.0.7.52 已新增 `reports/p1TodoReview.v0.0.7.52.md`，复盘 P1-1 到 P1-8 的真实剩余状态。结论是：P1 标题保留不等于从零未做，前置工作完成也不等于 final gate solved。
25. v0.0.7.53 已新增 `reports/stableIdRegistryShapeProposal.v0.0.7.53.md`，把 collector observed evidence、legacy inventory、feedbackTag mapping design 和 review pack decision split 汇总为人工可审的 registry shape proposal；该 report 不创建 registry / schema / validator 文件，也不批准任何 ID。
26. v0.0.7.54 已新增 `reports/stableIdRegistryEntrySamplePack.v0.0.7.54.md`，把 v0.0.7.53 的字段 / status vocabulary 应用到少量样例行供制作人 / ChatGPT 审查；该 sample pack 不是 registry，不批准任何 ID，也不提供 validator allowed values。
27. v0.0.7.55 已新增 `reports/accidentTypeIdRegistryCandidateReviewPack.v0.0.7.55.md`，把 current observed generalized IDs、runtime review candidates 和 historical migrated texture old IDs 转成人工可审问题；该 review pack 不是 registry，不批准任何 accidentTypeId，也不提供 validator allowed values。
28. v0.0.7.56 已新增 `reports/feedbackTagCandidateReviewPack.v0.0.7.56.md`，把 runtime observed feedbackTag、candidate / risk tag、copy direction 和 outcomeTypeId boundary 转成人工可审问题；该 review pack 不是 registry，不批准任何 feedbackTag / candidateTag / outcomeTypeId，也不提供 validator allowed values。
29. v0.0.7.57 已新增 `reports/accidentTypeIdLikelyStableNotesReview.v0.0.7.57.md`，只对 `taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload` 三个 likely-stable accidentTypeId 候选补 sourceLayer / sourceSummary / triggerMetric / evidence / boundary notes；该 notes review 不是 registry，不批准任何 accidentTypeId，也不提供 validator allowed values。
30. v0.0.7.58 已新增 `reports/accidentTypeIdFirstBatchDecisionDraft.v0.0.7.58.md`，只围绕上述三个事故 ID 整理第一批 future registry candidate 的人工决策草案：`taste_acid_overload` 和 `texture_solid_overload` 推荐为 `candidate_for_future_registry_after_notes`，`texture_low_drinkability` 推荐为 `needs_boundary_notes_before_candidate`。该 draft 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不展开 feedbackTag / drinkStructure / 其他 runtime candidates。
31. v0.0.7.59 已新增 `reports/accidentTypeIdFirstBatchDecisionRecord.v0.0.7.59.md`，把 v0.0.7.58 草案收束为 decision record：`taste_acid_overload` 和 `texture_solid_overload` 记录为 `first_batch_candidate_pending_source_notes`，`texture_low_drinkability` 记录为 `boundary_notes_required_before_first_batch_candidate`。该 record 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不展开 feedbackTag / drinkStructure / 其他 runtime candidates。
32. v0.0.7.60 已新增 `reports/accidentTypeIdFirstBatchSourceNotes.v0.0.7.60.md`，只给 `taste_acid_overload` 和 `texture_solid_overload` 补 sourceLayer / sourceSummary / triggerMetric / evidence notes；该 source notes sync 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`。
33. v0.0.7.61 已新增 `reports/accidentTypeIdFirstBatchCandidateNotesRecord.v0.0.7.61.md`，把 `taste_acid_overload` 和 `texture_solid_overload` 收束为 `candidate_notes_recorded_not_approved` 的 candidate notes record；该 record 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`。
34. v0.0.7.62 已新增 `reports/accidentTypeIdRegistryCandidateGate.v0.0.7.62.md`，只为 `taste_acid_overload` 和 `texture_solid_overload` 设计 minimal future registry candidate gate；两项结果为 `passes_minimal_candidate_gate_with_notes`。该 gate design 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`，只把它列为 explicit non-pass / boundary context。
35. v0.0.7.63 已新增 `reports/accidentTypeIdRegistryCandidateRecord.v0.0.7.63.md`，只记录 `taste_acid_overload` 和 `texture_solid_overload` 作为 `first_batch_future_registry_candidate_not_approved`；该 candidate record 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`，只把它列为 explicit non-candidate / Not This Round。
36. v0.0.7.64 已新增 `reports/accidentTypeIdFirstBatchSourceIndex.v0.0.7.64.md`，只为 `taste_acid_overload` 和 `texture_solid_overload` 建 docs / report 层 source index / readiness review；两项 readiness 为 `ready_for_minimal_registry_candidate_preparation_not_approval`。该 source index 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`，只把它列为 explicit exclusion / boundary context。
37. v0.0.7.65 已新增 `reports/accidentTypeIdRegistryCandidatePreparation.v0.0.7.65.md`，只把 `taste_acid_overload` 和 `texture_solid_overload` 整理成 `candidate_preparation_ready_for_reviewed_registry_task_not_approval` 的 minimal candidate preparation；该 preparation 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也不处理 `texture_low_drinkability`，只把它列为 explicit exclusion / boundary context。
38. v0.0.7.66 已新增 `reports/minimalRegistrySchemaTaskPlan.v0.0.7.66.md`，设计最小 registry / schema task 如何接收这两个 candidate；该 task plan 不批准任何 accidentTypeId，不创建 registry / schema / validator / allowed values，也明确不再为这两个 ID 继续新增 review pack / sample pack / proposal pack。
39. v0.0.7.67 已新增 `reports/minimalAccidentTypeRegistrySchemaSpecification.v0.0.7.67.md`，设计 future minimal accidentTypeId registry / schema implementation task 的最小规格：如果创建最小 registry / schema，具体可讨论哪些 future files、字段、read-only check script、测试和禁止事项；该 specification 不创建 registry / schema / validator / check script / allowed values，也不批准任何 accidentTypeId。
40. v0.0.7.68 已创建 `data/stableIdRegistry.js` 极小 registry scaffold 与 `scripts/content/checkStableIdRegistry.js` 只读 check script；它只收录 `taste_acid_overload` / `texture_solid_overload`，不接 runtime，不做 active validator enforcement，不生成 allowed values / generated severity，也不做 partial takeover。
41. v0.0.7.69 已在 v0.0.7.68-candidate 冻结后同步 checkpoint：accidentTypeId 第一批候选线阶段性收口，后续应先开会整理当前主线还剩什么，再决定是否进入 schema / validator boundary 小任务；不要把当前 scaffold 直接升级成 approved registry / allowed values。
42. feedbackTag producer review decisions 仍可作为并行候选，但不应直接实现 generated feedback active takeover、generated severity 或 partial takeover。
43. 另一个可考虑方向是继续 accidentAnalyzer broader route review：确认 legacy if thresholds、dedupe fallback、structure rule append / suppression、score / cap / feedbackTags 与 producer review gate。
44. drinkStructureAnalyzer displayName staged plan 保持独立，不应插队成 runtime rewrite。
45. 在 legacy、drinkStructure、ID、feedbackTag、accidentTypeId、review pack gate 都有明确边界后，再设计 candidate severity sheet validator；validator 不能提前把尚未审清楚的 Codex 生成内容“合法化”。
46. validator design 通过复查后，才考虑实现 validate candidate severity sheet 和 generated severity validator / structure check。
47. 最后再考虑 severity generated data build、shadow、partial takeover。

以上只是可考虑路线，不代表已经决定。

## 8. 新任务开工前检查清单

v0.0.7.x 机制相关任务开工前，Codex 应先确认：

- 是否已读取本文件。
- 是否已读取 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 本任务是否会触碰 P1 gate。
- 若任务涉及 `accidentAnalyzer` / accidentTypeId / severity takeover，是否已读取 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`。
- 若任务涉及 `drinkStructureAnalyzer` / structure metrics / structure tags / operation 或 production 规则，是否已读取 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`，并确认不把 displayName / 中文 category / notes 当机制 key。
- 若任务会把 Codex 生成内容送入 registry / validator / generated data / runtime / golden，是否已读取 `docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md` 并准备 review pack gate。
- 若任务会批量生成 mechanism review pack，是否已参考 `reports/mechanismReviewPack.sample.md` 的 sample proof，并确认不会把 proof 当 approval / registry / validator input。
- 若要实现 validator，是否已有 known stable ID source of truth。
- 是否把 collector observed row、runtime observed ID、golden expected、generated data observation、sample sheet draft 或 review pack item 误当 approved stable ID；如果会，应停止并回到 source-of-truth review。
- 若要 build generated severity data，是否已有 candidate severity sheet validator。
- 若要进入 shadow / partial / active，是否已有 generated validator、golden shadow expected 和制作人 review。
- 是否会重命名已有 ID；如果会，是否已有迁移计划。
- 是否会把 sampleId、displayName、`zhCN`、旧 tag 或 ID 字符串前缀当机制事实。
- 是否会为单个组合、recipe、golden sample、文案梗、制作人备注或 review pack item 创建新的机制 ID；如果会，应停止并复查。
- 是否会因玩家展示 `type` 或 feedback copy 不同而反向拆分 `accidentTypeId` / `outcomeTypeId`；如果会，应把具体性放回 evidence / rule / sample / copy / notes。
- 是否会引用 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload`；如果会，应确认其语境是 historical / pre-v0.0.7.46 / pre-v0.0.7.47 / pre-v0.0.7.49 legacy reference，而不是 current active runtime ID、registry current ID 或 generated severity input。
- 是否会改变玩家最终 score、feedback、accident、type 或 golden expected；如果会，是否有产品理由和 golden 更新计划。
