# Human Review Reports｜人类审批 / 制作人评审材料

本目录用于集中放置需要用户 / 制作人审批的评审材料。

可放置的材料包括：

- review pack
- candidate 文案审核包
- concept candidates 审核包
- generated shadow review
- 需要用户 keep / revise / reject / pending 的材料

本目录不是 source-of-truth，不是 runtime data，也不是 active stage TODO。

本目录内容不能自动修改 golden expected，不能自动接管 final feedback / final result。

机器详情可以存在，但必须服务于人类审核，不反向成为机制正本。

## 模板与样例

- `conceptReview.template.md` 用于自然语言 scenario / concept candidates 审核；它审的是“场景 / 机制概念”。
- `tasteConceptReview.round1.md` 记录第一轮 taste layer concept candidates 的制作人审核结果；它不是 approved concept list、source-of-truth 或 runtime data。
- `approvedConceptList.taste.round1.draft.md` 整理第一轮 taste layer 已通过 / 修正概念的 approved concept list draft；它不是 stable ID、registry candidate 或 runtime data。
- `specialSensationConceptReview.round1.md` 记录第一轮 special sensation sub-channel concept candidates 的制作人审核结果；它不是 approved concept list、source-of-truth 或 runtime data。
- `approvedConceptList.specialSensation.round1.draft.md` 整理第一轮 special sensation sub-channel 已通过概念的 approved concept list draft；它不是 stable ID、registry candidate 或 runtime data。
- `textureConceptReview.round1.md` 记录第一轮质地 / 可饮用性 concept candidates 的制作人审核结果；它不是 approved concept list。
- `approvedConceptList.texture.round1.draft.md` 整理第一轮 texture / drinkability 已通过概念的 approved concept list draft；它不是 stable ID、registry candidate 或 runtime data。
- `flavorStructureConceptReview.round1.md` 记录第一轮风味 / 饮品结构冲突 concept candidates 的制作人审核结果；它不是 approved concept list、source-of-truth 或 runtime data。
- `approvedConceptList.flavorStructure.round1.draft.md` 整理第一轮 flavor / structure 已通过概念的 approved concept list draft；它不是 stable ID、registry candidate 或 runtime data。
- `v0.0.8ConceptReviewCheckpoint.md` 汇总 texture / flavor / taste 三条基础概念线的 concept review checkpoint；它不是 source-of-truth、stable ID、registry 或 runtime data。
- `structuringCandidatePlan.round1.md` 记录第一批适合后续结构化规划的自然语言概念范围；它不是 stable ID、registry candidate 或 runtime data。
- `sourceOfTruthRegistryPlanning.round1.md` 记录 source-of-truth / registry / enum / schema 前置规划；它不是 registry、schema、validator 或 runtime data。
- `draftIdNamingReviewProtocol.round1.md` 记录 draft ID naming review protocol；它不是 ID list、registry、schema 或 runtime data。
- `draftIdProposalDryRun.round1.md` 记录第一批 6 个概念的 draft ID proposal dry-run；它不是 stable ID list、registry candidate、allowed values、schema 或 runtime data。
- `draftIdProposalReview.round1.md` 记录第一批 6 个 proposedDraftId 的 proposal wording 审阅结论；它不是 stable ID list、registry、schema、allowed values 或 runtime data。
- `registryCandidateRowShapePlanning.round1.md` 规划 future registry candidate row shape；它不是 registry、schema、validator、allowed values 或 runtime data。
- `registryCandidateProposal.round1.md` 记录第一批 6 个 proposedDraftId 的 registry candidate proposal rows；它不是 approved stable registry、schema、validator、allowed values 或 runtime data。
- `registryCandidateFieldSplit.round1.md` 规划 registry candidate 字段轻重分层；它不是 registry、schema、validator、allowed values 或 runtime data。
- `candidateSeverityRuleSchemaReview.round1.md` 规划 future candidate severity rule / threshold table fields；它不是 schema、validator、generated severity 或 runtime data。
- `triggerMetricDirectionReview.round1.md` 审阅第一批 6 个机制的 triggerMetric direction；它不是 metric registry、schema、validator、generated data 或 runtime data。
- `triggerMetricDirectionReviewRecord.round1.md` 记录用户 + ChatGPT 对 triggerMetric direction review 的审阅结论；它不是 metric registry、schema、validator、allowed values 或 runtime data。
- `feedbackShadowReview.sample.md` 用于 feedback shadow review 样例；它审的是“候选反馈文案”。

这些材料都不是 source-of-truth，也不是 runtime data。

`reports/` 根目录仍保留历史审计 / closure / decision reports；不要把整个 `reports/` 目录迁入本目录。
