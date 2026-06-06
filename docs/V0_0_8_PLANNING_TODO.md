# V0.0.8 Planning TODO｜内容管线 / Review Pack / Registry-Validator 规划

## 0. 文件定位 / 非开工声明

本文件是 v0.0.8.x planning TODO / active stage TODO，用于承接 v0.0.7 docs closure checkpoint 之后的下一阶段施工图。

本文件只做 planning，不开放 implementation。

本文件不开放：

- batch content generation
- generated severity
- generated severity shadow / partial / active takeover
- generated feedback takeover
- runtime takeover
- new stable ID / feedbackTag / triggerMetric / ingredient profile generation

本文件不表示 P1 solved，不替代 L1 正本，不批准任何 ID / tag / registry / validator / generated data。

## 1. 当前唯一主线

当前唯一主线是把内容生产管线从原则整理成可执行规划。

规划重点：

- Scenario first, ID later。
- approved concept list。
- review pack。
- draft ID。
- registry candidate。
- validator gate。
- traceability。

本阶段前半段先规划和建立流程，不直接生产大量内容，不直接进入 runtime / generated / golden。

### Single-line workflow / Parking Lot

v0.0.8.x 默认一次只推进一条内容设计线。当前线未形成清晰 checkpoint 前，不并行开启另一条同级内容线。新想法、新债务和相邻方向先进入 Parking Lot；只有明确阻塞当前线的问题，才临时处理，并在解除阻塞后回到原主线。

当前例子：texture / drinkability round 1 已推进到 approved concept list draft 后，才适合讨论下一条 flavor / structure conflict review。这只是协作节奏说明，不开放 implementation。

## 2. 必读正本 / 裁决关系

- `docs/DOCS_SOURCE_OF_TRUTH.md` 管文档层级、阶段 TODO 生命周期和冲突裁决。
- `docs/STABLE_ID_NAMING_GUARDRAIL.md` 管 stable ID / tag / registry / validator / generated data guardrail。
- `docs/TASTE_DECISION_MODEL.md` 管判定模型、priority vs severity、事故层级和全判定层反 if 地狱。
- `docs/VERSION_LOG.md` 是版本流水入口。
- `reports/**` 是历史证据，不自动升级为当前事实。

如果本文件与 L1 正本冲突，以 L1 正本为准。

## 3. v0.0.7 迁移状态

`v0.0.7-docs-closure-checkpoint` 是 docs rescue / closure checkpoint tag。

它不是：

- candidate tag
- formal release tag
- v0.0.8 implementation permission
- P1 solved 证明

当前迁移前提：

- P0-A / P0-B / P0-C resolved。
- P1 split accepted but not solved。
- 剩余债务必须先进入本 planning TODO 的桶，后续 implementation 仍需用户明确批准。

## 4. P1 Debt 迁移清单

本节按 `reports/v0.0.7ClosureAuditP1Split.md` 和 `docs/V0_0_7_MECHANISM_TODO.md` 迁移债务，但不写成 solved。

| bucket | items | boundary |
|---|---|---|
| migrate to v0.0.8 planning | AI-generated ID / mechanism naming audit | 只规划 review / gate，不生成新 ID |
| migrate to v0.0.8 planning | known stable ID source-of-truth / registry / enum / schema planning | 只规划，不升级 scaffold / check script |
| migrate to v0.0.8 planning | candidate severity sheet validator planning | 只规划 validator，不生成 severity data |
| migrate to v0.0.8 planning | candidate tag / feedbackTags registry boundary planning | 只规划边界，不接 runtime feedback |
| migrate to v0.0.8 planning | feedbackTag semantic boundary / copy pool expansion planning | 只规划 review，不批量扩写 |
| migrate to v0.0.8 planning | batch content authoring workflow planning | 只规划流程，不做 batch content |
| legacy support / monitor only | accidentAnalyzer legacy content judgment migration route | legacy support 不等于 solved，本轮不重构 |
| legacy support / monitor only | drinkStructureAnalyzer displayName Set residue | legacy support 不等于 solved，本轮不重构 |
| Parking Lot / later candidate | formal release / candidate tag discussion | 不在本 planning TODO 内创建 tag |
| Parking Lot / later candidate | large-scale threshold / profile / severity tuning | 需要后续专门阶段和审批 |

## 5. 目标工作流：Scenario first, ID later

长期流程：

1. ChatGPT 根据用户设定主题 / 场景生成自然语言 scenario / concept candidates。
2. 用户作为制作人审核、删除、合并、改名、确认。
3. 形成 approved concept list。
4. approved concept list 不等于 approved stable ID。
5. Codex 只能把 approved concepts 批量结构化为 draft ID / rules / sheets / registry candidates。
6. Codex 跑 validator / tests / report。
7. draft ID 不等于 registry entry。
8. registry candidate 不等于 approved source-of-truth。
9. generated data 不等于 runtime takeover。
10. shadow 不等于 final result。

Codex 不得自行补概念、扩事故、批量发明相似 ID，或把 notes / review pack / sample 当成 source-of-truth。

## 6. approved concept list planning

本节只规划字段，不实现表格，不创建 schema。

字段候选：

- `conceptId` 或 `temporaryConceptRef`
- `scenarioTitle`
- `naturalLanguageDescription`
- `intendedMechanism`
- `producerStatus`
- `producerDecision`
- `mergeTarget` / `renameSuggestion`
- `feedbackOnly` / `evidenceOnly` / `notMechanism`
- `producerComment`
- `sourceBatch`
- `approvalDate` optional

这些只是 planning candidate，不是最终 schema，不是 runtime data。

## 7. review pack planning

已新增 `reports/human_review/conceptReview.template.md`，作为自然语言 scenario / concept candidates 的人类审批模板。

该文件是 template / review material，不是 source-of-truth，不生成 ID，不开放 implementation；它服务于 Scenario first, ID later 工作流。

已知 feedback shadow review sample 位于 `reports/human_review/feedbackShadowReview.sample.md`。

它是 prototype / sample / review material，不是 source-of-truth，不是 runtime data，不能接管 final feedback，也不能自动修改 golden expected。

进入 taste layer concept review 前，默认所有 taste accident concept 都按“同一机制可分级，不拆 accidentTypeId”的全局原则审查。

规划边界：

- review pack 是制作人评审材料，不是 runtime data。
- 人类审核区在前，机器详情附录在后。
- candidate-level 审核优先于 sample-level 总评。
- 多条候选可以同时 keep。
- `preferredTextId` 只是偏好，不代表只能保留一条。
- `reviewStatus` / `issueTags` / `suggestedRewrite` / `producerComment` 应保留非程序员友好入口。
- 中文自由备注允许存在，由 ChatGPT / Codex 后续归一化。
- sample report 不能自动修改 golden expected。
- sample report 不能自动接管 final feedback。

## 8. draft ID / registry candidate planning

Codex 只能生成 draft ID / registry candidates，不能直接生成 approved stable ID。

每条 draft / candidate 必须能追溯到 approved concept。

规划追溯字段候选：

- `sourceConceptId`
- `sourceBatch`
- `reviewStatus`
- `candidateStatus`
- `sourceDoc`
- `producerDecision`

draft 晋级 stable 必须经过 validator + ChatGPT / user review + source-of-truth 更新。

禁止因为 ID 看起来规范就默认稳定。

## 9. validator / registry planning

validator 不应靠字符串猜合法 ID。

合法来源应来自 explicit registry / enum / schema / existing stable data。

当前阶段只规划，不实现 active validator。

`data/stableIdRegistry.js` scaffold / `scripts/content/checkStableIdRegistry.js` check script 不等于 approved validator。

registry candidate 不等于 source-of-truth。

## 10. Anti-if / anti-doc-hell guardrails

- 不为单个样本硬编码。
- 不把具体原料组合写死进 analyzer。
- 不把文案主键重新引入机制判断。
- 不把同一套长规则复制到多个正本。
- planning TODO 只承接阶段任务，不复制 L1 正本文字。

## 11. Parking Lot

本阶段暂不做：

- formal release tag / candidate tag discussion
- batch content generation
- Google Sheets 正式导入管线
- generated severity implementation
- generated feedback takeover
- runtime takeover
- active validator implementation
- 大量文案扩写
- 事故 / 饮品 / outcome 新 ID 批量创建
- profile / threshold / severity 大规模调参

## 12. Exit criteria for v0.0.8 planning readiness

这些是 planning readiness，不是 implementation done。

- active stage TODO established and registered。
- P1 debt migrated into planning buckets。
- review pack prototype status clarified。
- Scenario first, ID later workflow represented as planning tasks。
- no runtime / generated / golden / data changes。
- next implementation task still requires explicit user approval。
