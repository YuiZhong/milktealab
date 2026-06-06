# Registry Candidate Proposal Round 1｜第一批 Registry Candidate 提案

## 0. 文件定位

本文件是 registry candidate proposal report。

本文件把 6 个 accepted proposal wording 整理成 registry candidate proposal rows，用于用户 + ChatGPT 审阅。

本文件不是：

- approved stable registry
- runtime registry
- schema
- enum
- validator input
- allowed values
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不批准 stable ID。

本文件不创建真实 registry file。

本文件不创建 schema / enum / validator。

本文件不生成 allowed values。

本文件不允许任何 row 进入 runtime / generated / golden。

后续若要把任何 row 提升为 approved stable registry，必须另开 explicit approval task。

## 1. Source and Protocol Compliance

本轮来源：

- `reports/human_review/draftIdProposalReview.round1.md`
- `reports/human_review/registryCandidateRowShapePlanning.round1.md`
- `reports/human_review/draftIdNamingReviewProtocol.round1.md`
- `reports/human_review/sourceOfTruthRegistryPlanning.round1.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`

本轮使用已规划的 registry candidate row shape。

本轮没有从零设计 ID flow。

本轮没有修改 L1 正本。

本轮没有创建 registry / schema / validator。

本轮没有修改 `data/stableIdRegistry.js` 或 `scripts/content/checkStableIdRegistry.js`。

## 2. Registry Candidate Proposal Rows

说明：

- `candidateRowId` 是本 report 内部临时 row ref，不是 stable ID。
- `proposedDraftId` 仍只是 proposal wording，不是 approved stable ID。
- `canEnterRegistryCandidate=false` 在本 report 中表示：不能进入真实 registry candidate storage / source-of-truth。
- 所有危险 gate 必须保持 false。

### 2.1 RCP-R1-01｜`taste_sweet_overload`

- candidateRowId: RCP-R1-01
- proposedDraftId: `taste_sweet_overload`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 甜度过载
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TASTE-R1-02
- sourceConceptName: 甜度过载
- sourceReviewFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C002
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-01
- sourceEvidenceSummary: approved concept draft confirms sweet overload as a keep concept; draft ID proposal review accepted the wording as proposal only.
- dominantSourceLayer: taste
- sourceLayerEvidence: taste layer concept; sweetness load / intensity evidence planned from taste summary.
- isCrossLayer: false
- crossLayerNotes: none
- mechanismDefinition: 甜味过强，从有点太甜到甜度灾难，导致甜味压住饮品平衡。
- notThis: 不是糖 / 蜂蜜 / 糖浆 / 果酱等具体甜味来源事故；不是 feedbackTag；不是 runtime rule。
- antiIfNotes: 不按具体甜味来源拆机制；甜味来源只能作为 evidence / intensity source。
- legacyObservedIds: `taste_sweet_overload_candidate`; `sweet_overload`; `sweet_overload_risk`
- legacyClassification: related_candidate_or_risk_stem_not_runtime_observed
- reuseRationale: no approved stable found; proposal aligns with existing candidate / risk stem and current taste naming direction.
- migrationRisk: low-to-medium; future review should confirm `sweet` wording remains preferred over `sweetness` before approval.
- deprecatedOrSupersededIds: none
- blockedLegacyIds: none
- possibleMetricDirections: sweetnessLoad / sweetIntensity, 非正式 triggerMetric
- severityBoundaryNotes: 轻中重属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: future sweet tolerance possible; current no customer system.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: feedback intensity may vary with severity later; feedback copy must not create a separate mechanism ID.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable candidate proposal with gates closed
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review

### 2.2 RCP-R1-02｜`taste_acid_overload`

- candidateRowId: RCP-R1-02
- proposedDraftId: `taste_acid_overload`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 酸度过载
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TASTE-R1-03
- sourceConceptName: 酸度过载
- sourceReviewFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C003
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-02
- sourceEvidenceSummary: approved concept draft confirms acid overload; dry-run found current observed / scaffold evidence but not approved stable.
- dominantSourceLayer: taste
- sourceLayerEvidence: taste layer concept; acidity load / acid intensity planned from taste summary.
- isCrossLayer: false
- crossLayerNotes: none
- mechanismDefinition: 酸味过强，从清爽偏酸到酸度爆炸，导致饮品被酸度接管。
- notThis: 不是柠檬事故、山楂事故、百香果事故；不是 flavor identity conflict；不是 novelty / weirdness。
- antiIfNotes: 不按柠檬 / 山楂 / 百香果 / 青柠 / 酸梅等酸味来源拆机制。
- legacyObservedIds: `taste_acid_overload`
- legacyClassification: existing_observed_and_scaffold_reviewed_candidate_not_approved
- reuseRationale: reuse avoids duplicate acid overload ID and aligns with observed direction.
- migrationRisk: medium; existing scaffold status remains reviewed_candidate_not_approved and must not be upgraded by this report.
- deprecatedOrSupersededIds: none
- blockedLegacyIds: none
- possibleMetricDirections: acidityLoad / acidIntensity, 非正式 triggerMetric
- severityBoundaryNotes: 清爽偏酸、明显太酸、酸度爆炸属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: future acid tolerance possible; current no customer system.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: acid feedback wording can vary later; wording cannot create extra acid-source mechanisms.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable reuse proposal with gates closed
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review

### 2.3 RCP-R1-03｜`taste_bitter_overload`

- candidateRowId: RCP-R1-03
- proposedDraftId: `taste_bitter_overload`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 苦味过载
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TASTE-R1-04
- sourceConceptName: 苦味过载
- sourceReviewFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C004
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-03
- sourceEvidenceSummary: approved concept draft confirms bitter overload; proposal review accepted `bitter` wording while noting `bitternessLoad` may remain future metric direction.
- dominantSourceLayer: taste
- sourceLayerEvidence: taste layer concept; bitterness load / bitter intensity planned from taste summary.
- isCrossLayer: false
- crossLayerNotes: customer preference sensitivity is expected, but sourceLayer remains taste.
- mechanismDefinition: 苦味过强，茶 / 咖啡 / 可可 / 抹茶可贡献苦味，但机制关注苦味负担本身。
- notThis: 不是“所有苦味都扣分”；不是茶事故、咖啡事故、抹茶事故、可可事故。
- antiIfNotes: 不按茶 / 咖啡 / 抹茶 / 可可拆机制；来源只能作为 evidence / intensity source。
- legacyObservedIds: `taste_bitterness_overload_candidate`; `bitterness_overload`; `bitterness_overload_risk`
- legacyClassification: related_candidate_or_risk_stem_not_runtime_observed
- reuseRationale: user + ChatGPT accepted `bitter` wording for consistency; `bitternessLoad` remains a possible metric direction.
- migrationRisk: medium; future review should confirm `taste_bitter_overload` vs `taste_bitterness_overload` before approval.
- deprecatedOrSupersededIds: none
- blockedLegacyIds: none
- possibleMetricDirections: bitternessLoad / bitterIntensity, 非正式 triggerMetric
- severityBoundaryNotes: 苦味明显、太苦、苦到压住整杯属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: customerPreferenceSensitive; future tolerance needed for espresso / strong tea / bitter coffee preferences.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: feedback intensity can mention bitter load; it must not imply all bitterness is an accident.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable candidate proposal with naming review question retained
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review

### 2.4 RCP-R1-04｜`taste_astringency_overload`

- candidateRowId: RCP-R1-04
- proposedDraftId: `taste_astringency_overload`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 涩感 / 收敛感过强
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TASTE-R1-06
- sourceConceptName: 涩感 / 收敛感过强
- sourceReviewFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C006
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-04
- sourceEvidenceSummary: approved concept draft keeps astringency / drying sensation separate from bitter overload and generic strong stimulation.
- dominantSourceLayer: taste / special sensation boundary
- sourceLayerEvidence: taste-approved concept with special sensation boundary notes; `astringency` metric / evidence exists in summary context.
- isCrossLayer: true
- crossLayerNotes: taste / special sensation boundary; selected taste prefix for first batch but sourceLayer review remains required before stable approval.
- mechanismDefinition: 涩感 / 收敛感过强，口腔发干、发紧、刮舌，强茶感或植物收敛感造成负担。
- notThis: 不是苦味过载；不是辣感、麻感或酒精灼烧；不是 generic strong stimulation umbrella。
- antiIfNotes: 不按红茶 / 乌龙 / 咖啡拆；不并回 generic strong stimulation。
- legacyObservedIds: `astringency`
- legacyClassification: metric_or_summary_evidence_not_accidentTypeId
- reuseRationale: `astringency` noun form better matches mechanism / metric concept than `astringent`.
- migrationRisk: medium-to-high; final prefix may require future sensation-family review.
- deprecatedOrSupersededIds: none
- blockedLegacyIds: `taste_astringent_overload` as old wording only; not used as current proposal.
- possibleMetricDirections: astringencyLoad / tanninPressure / dryingSensation, 非正式 triggerMetric
- severityBoundaryNotes: 轻微发干、明显涩感、强收敛刮舌属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: customerPreferenceSensitive; tea / coffee tolerance may differ.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: feedback can describe drying / tightening sensation later; it must not merge this channel into bitter overload.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable candidate proposal with sourceLayer boundary risk retained
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review, including taste prefix vs future sensation family review

### 2.5 RCP-R1-05｜`texture_low_drinkability`

- candidateRowId: RCP-R1-05
- proposedDraftId: `texture_low_drinkability`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 水泥感 / 粉泥感 / 低流动性
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TEX-R1-02
- sourceConceptName: 水泥感 / 粉泥感 / 低流动性
- sourceReviewFile: `reports/human_review/approvedConceptList.texture.round1.draft.md`
- sourceReviewItems: C002
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-05
- sourceEvidenceSummary: approved texture concept covers powdery / muddy / low-flow drinkability; dry-run found observed and migration evidence.
- dominantSourceLayer: texture / drinkability
- sourceLayerEvidence: texture / drinkability approved concept; low flow and slurry evidence planned from texture summary.
- isCrossLayer: false
- crossLayerNotes: may use straw resistance as expression / severity cue, not as standalone mechanism.
- mechanismDefinition: 粉泥、糊、低流动性导致水泥感 / 喝不动，从轻微粉感到重度吸不上来。
- notThis: 不是吸管阻力独立机制；不是芋泥事故、奥利奥事故或粉类事故。
- antiIfNotes: 不按芋泥 / 奥利奥 / 粉类 / 沉积来源拆机制；不写具体原料比例 if。
- legacyObservedIds: `texture_low_drinkability`; `texture_taro_overload`; `texture_oreo_overload`
- legacyClassification: existing_observed_reuse_candidate_with_historical_migrations
- reuseRationale: reuse avoids duplicate low-flow / cement / slurry IDs.
- migrationRisk: medium-to-high; needs boundary vs `texture_straw_resistance` and `texture_solid_overload`.
- deprecatedOrSupersededIds: `texture_taro_overload`; `texture_oreo_overload` as historical ingredient-specific migration evidence only
- blockedLegacyIds: none
- possibleMetricDirections: slurryLoad / pasteLoad / powderLoad / lowFlowPenalty, 非正式 triggerMetric
- severityBoundaryNotes: 轻微粉感 / 沙感到重度水泥感 / 吸不上来属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: future thick / heavy texture tolerance possible; current no customer system.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: feedback may describe powdery, slurry, cement-like, or hard-to-drink experiences; it must not create ingredient-specific mechanisms.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable reuse proposal with boundary mini-review recommended before approval
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review, including boundary vs straw resistance and solid overload

### 2.6 RCP-R1-06｜`texture_solid_overload`

- candidateRowId: RCP-R1-06
- proposedDraftId: `texture_solid_overload`
- idFamily: accidentTypeId
- candidateType: accident
- displayNameDraft: 八宝粥感 / 固体小料负载过高
- proposalStatus: registry_candidate_proposal_pending_review
- sourceApprovedConceptRef: AC-TEX-R1-01
- sourceConceptName: 八宝粥感 / 固体小料负载过高
- sourceReviewFile: `reports/human_review/approvedConceptList.texture.round1.draft.md`
- sourceReviewItems: C001, C008 merged
- sourcePlanningFile: `reports/human_review/structuringCandidatePlan.round1.md`
- sourcePlanningRef: STRUCT-R1-06
- sourceEvidenceSummary: approved texture concept covers solid-load drink form collapse; dry-run found observed / scaffold and legacy topping evidence.
- dominantSourceLayer: texture / drink structure
- sourceLayerEvidence: texture / drink structure approved concept; solid load and liquid support evidence planned from texture summary / drink structure.
- isCrossLayer: false
- crossLayerNotes: product form boundary may be relevant, but mechanism remains solid-load / drink-structure accident.
- mechanismDefinition: 固体小料负载过高，饮品形态被压垮，喝起来更像八宝粥或甜品碗。
- notThis: 不是某个具体 topping 的事故；不是“需要勺子”独立机制；不是低流动性 / 水泥感。
- antiIfNotes: 不按珍珠 / 芋圆 / 布丁 / 椰果等具体小料拆机制；不写具体小料组合 if。
- legacyObservedIds: `texture_solid_overload`; `texture_topping_overload`
- legacyClassification: existing_observed_and_scaffold_reviewed_candidate_not_approved_with_legacy_topping_reference
- reuseRationale: reuse generalized solid-load mechanism instead of topping-specific IDs.
- migrationRisk: medium; needs boundary vs low drinkability and straw resistance.
- deprecatedOrSupersededIds: `texture_topping_overload` as legacy topping-specific reference only
- blockedLegacyIds: none
- possibleMetricDirections: solidLoad / toppingLoad / liquidSupport / chewLoad, 非正式 triggerMetric
- severityBoundaryNotes: 小料略多、明显像甜品碗、饮品形态被压垮属于同一机制连续谱，不拆 accidentTypeId。
- scoreMultiplierStatus: not_defined
- thresholdStatus: not_defined
- customerPreferenceNotes: future tolerance for lots of toppings possible; current no customer system.
- feedbackTagStatus: none / not_registered
- feedbackCopyBoundary: feedback can mention spoon / dessert bowl / straw fatigue later; wording must not create topping-specific IDs.
- reviewStatus: pending_user_chatgpt_registry_candidate_review
- reviewer: user + ChatGPT pending
- producerDecision: proposal wording accepted only
- chatgptTechnicalDecision: suitable reuse proposal with boundary review recommended before approval
- canEnterRegistryCandidate: false
- canEnterApprovedStableRegistry: false
- canEnterValidator: false
- canEnterGeneratedSeverity: false
- canAffectRuntime: false
- canChangeGoldenExpected: false
- nextRequiredGate: user + ChatGPT registry candidate review, including boundary vs low drinkability and straw resistance

## 3. Shared False Gates

Every row has:

- `canEnterRegistryCandidate=false`
- `canEnterApprovedStableRegistry=false`
- `canEnterValidator=false`
- `canEnterGeneratedSeverity=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`

Even though this is a “registry candidate proposal report,” these rows are not actual registry candidates until a later explicit approval task.

Here `canEnterRegistryCandidate=false` means the row cannot enter actual registry candidate storage / source-of-truth yet.

If any future task wants to flip a gate to `true`, it must be a separate explicit approval / takeover task.

## 4. Open Review Questions

- Are these 6 rows too heavy to fill by hand? Should future actual rows split required vs optional fields?
- Should `taste_astringency_overload` remain taste-prefixed before stable approval?
- Do `texture_low_drinkability` and `texture_solid_overload` boundaries need a separate mini-review before approval?
- Should registry candidate row shape be converted into a CSV / JSON schema only after this review?
- Which fields are required for future validator and which are only review notes?

## 5. Next Possible Step

以下只是候选，不是命令，也不开放 implementation。

### Option A｜User + ChatGPT Review Registry Candidate Proposal Rows

审阅 6 行是否过重、是否足够安全、是否有命名 / layer / legacy 风险。

### Option B｜Registry Candidate Required-vs-Optional Field Split

在创建真实 registry / schema 前，把 row shape 拆成必填 / 可选 / notes。

### Option C｜Candidate Severity Rule Schema Review

开始讨论 severity table 如何承接这 6 个概念。

仍不填正式阈值 / `scoreMultiplier`。

### Recommendation

先由用户 + ChatGPT 审阅本 registry candidate proposal report。

不建议直接创建 registry file / schema / validator。

## 6. Explicit Non-Goals

本轮不做：

- 不生成 approved stable ID。
- 不创建 actual registry candidate source-of-truth。
- 不创建 registry / enum / schema / validator。
- 不生成 allowed values。
- 不生成正式 triggerMetric。
- 不填正式阈值 / `scoreMultiplier`。
- 不改 `data/stableIdRegistry.js`。
- 不改 `scripts/content/checkStableIdRegistry.js`。
- 不改 runtime / core / data / generated / golden。
- 不开放 implementation / batch content / generated severity / generated feedback / takeover。
