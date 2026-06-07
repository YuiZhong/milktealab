# V0.0.8 Planning TODO｜内容管线 / Review Pack / Registry-Validator 规划

## 0. 文件定位 / 非开工声明

本文件是 v0.0.8.x planning TODO / active stage TODO，用于承接 v0.0.7 docs closure checkpoint 之后的下一阶段施工图。

本文件是 v0.0.8.x active stage TODO，当前已承接 read-only generated severity shadow proof、multi-sample debug output、human-readable review pack 与 early new-system tuning loop。

本文件不开放：

- batch content generation
- active generated severity
- final takeover / runtime takeover
- generated severity partial / active takeover
- read-only shadow proof、debug output、review pack、score suggestion overlay 属于允许推进的 non-final path
- generated feedback takeover
- new stable ID / feedbackTag / triggerMetric / ingredient profile generation

本文件不表示 P1 solved，不替代 L1 正本，不批准任何 ID / tag / registry / validator / generated data。

## 1. 当前唯一主线

当前唯一主线是把内容生产管线和 generated severity 调优路线，从原则整理成可见、可审、可回滚的产品路径。

规划重点：

- Scenario first, ID later。
- approved concept list。
- review pack。
- draft ID。
- registry candidate。
- validator gate。
- traceability。
- first read-only generated severity shadow proof。
- human-readable shadow review pack。
- early new-system tuning loop。

本阶段不再以“保持旧 golden 完全一致”为最高目标。旧 golden samples 的角色是 regression alert / safety net，不是 absolute expected truth。新 generated severity / scoring system 的目标是逐步符合玩家 / 制作人直觉，而不是复刻 legacy judge。

后续路线应尽快收束到可见产物链路：

1. multi-sample shadow output。
2. human-readable shadow review pack。
3. new-system severity / score suggestion overlay。
4. old system vs new suggestion comparison。
5. human review：调新系统 / 更新 golden / pending。
6. 小范围 feature flag / debug overlay / partial takeover discussion。

不再默认新增纯 planning report；只有改 runtime / golden / final result / `data/generated` / active validator / partial takeover，或遇到明确 blocker 时，才提高 gate。

partial / active takeover 仍要明确 gate，但当前没有外部玩家，可以比面向真实玩家的线上产品更积极推进 non-final / feature flag / debug overlay / partial route。没有玩家只降低发布风险，不降低工程质量要求：仍需测试、回滚、边界说明和反 if 地狱。

score suggestion overlay / early tuning loop 可以更积极推进，但 score 目标不能反向污染原料 profile。后续如果进入批量 ingredient profile value draft，应先建立资料参考、人类审阅和 shadow calibration 流程；原料数值草案必须与现实属性相容，不能为了让某个 golden sample、校正测试或某杯饮料达到目标分数而扭曲。玩家 / 制作人反馈主要用于校准判定层，例如 threshold、severity、scoreMultiplier、组合关系、positive synergy、饮品类型预期、客群偏好和 score aggregation；当“现实合理 profile”与“目标分数直觉”冲突时，优先调判定层，不优先改原料事实。

### Single-line workflow / Parking Lot

v0.0.8.x 默认一次只推进一条内容设计线。当前线未形成清晰 checkpoint 前，不并行开启另一条同级内容线。新想法、新债务和相邻方向先进入 Parking Lot；只有明确阻塞当前线的问题，才临时处理，并在解除阻塞后回到原主线。

当前例子：texture / drinkability round 1 已推进到 approved concept list draft 后，才适合讨论下一条 flavor / structure conflict review。这只是协作节奏说明，不开放 implementation。

## Calibration blocker inventory / implementation queue

本节记录进入正式调优前必须补齐的字段、机制和技术债。它是 implementation queue，不是新 report，不批准 runtime / generated / golden 变更，也不允许写 recipe whitelist、sample-specific if 或 displayName / 中文名主键。

优先级含义：

- P0：进入下一轮 non-final scoring calibration 前必须补，否则会白调。
- P1：进入 partial / active takeover 前必须补。
- P2：可后续完善，不阻塞当前 calibration loop。

### A. Missing profile / taste fields

- P1 `saltiness`：海盐需要正式 numeric taste field，不能长期借 `weirdness` / `savoryRisk`。先作为 tasteProfile / tasteSummary schema gap，不创建 accidentTypeId。
- P1 `astringency`：茶涩 / 收敛感与 `bitterness` 不完全相同，后续茶类校准需要单独表达。
- P2 其他基础味觉字段缺口：只有在明确阻塞样本校准或制作人 review 后再补，不为“看起来完整”发明字段。

### B. Missing pressure / summary fields

- P0 `sweetnessPressure`：高甜事故和 scoreDelta 不应继续靠样本直觉临时判断。
- P0 `bitterPressure` + `dairySupport` + `sweetnessBalance`：咖啡 / 抹茶 / 可可与奶、甜之间需要 summary / scoring / balance 层表达，不能写成具体配方 if。
- P1 `acidPressure`：酸度需要区分清爽偏酸与高酸压力。
- P1 `fatPressure` / `dairyFatPressure`：奶脂油腻负担属于 mouthfeel / scoring pressure，不等于低流动性。
- P1 `powderPressure`：粉泥 / 沉淀 / 粉浆压力需要从 texture summary 进入 scoring。
- P1 `strongIdentityPressure`：榴莲、咖啡、抹茶、可可等强身份需要通用 support / conflict 判断。
- P1 `liquidSupport`：小料、粉泥、固体负载应结合液体支撑判断。
- P1 `drinkTypeExpectation`：正向饮品预期应作为 generic structure，不写具体饮品白名单。

### C. Texture / mouthfeel gaps

- P1 `powderLoad` / `slurryLoad`：用于粉泥、糊状、低流动性和吸管吃力。
- P1 `creamLoad` / `dairyFatLoad`：用于奶脂、奶盖、奶油油腻负担。
- P1 `syrupiness` / `stickiness`：用于糖浆感、胶质感、黏稠挂口。
- P2 `mouthCoating`：需要决定是共用指标，还是拆成奶脂挂口、胶质挂口、粉浆挂口等子指标。

### D. Scoring / balance missing mechanisms

- P0 high sweetness overload non-final rule：白糖高甜压力需要先有通用规则雏形，但不能硬编码样本或配方。
- P0 bitterPressure balance with `dairySupport` / `sweetnessBalance`：咖啡牛奶、抹茶牛奶、可可牛奶不能用单杯 if 修。
- P1 powder / sediment threshold by ratio and `liquidSupport`：粉泥 / 沉淀应按比例和液体支撑判断。
- P1 strongIdentity support / conflict balance：强身份可以被合适载体支撑，也可能压制主题。
- P1 score aggregation / diminishing returns / dominant mechanism selection：多项压力叠加时需要通用聚合方式，避免扣分无限堆。
- P1 positive drink expectation as generic structure：正常好组合应来自结构化支撑关系，不来自 recipe whitelist。

### E. Takeover blockers / old technical debt

- P1 displayName / 中文主键 runtime residue。
- P1 legacy accident route still deciding final score / cap / type。
- P1 stable ID registry scaffold only，不能当 approved registry。
- P1 active validator missing。
- P1 golden update protocol missing。
- P1 score takeover flag exists but remains score-only trial，未接管 feedback / result.type / accident / golden。

### F. Tooling debt

- P0 shadow runner proposed profile parsing fixed in v0.0.8.18；当前 non-final calibration 不再被该工具债阻塞。
- P0 future sample review must clearly distinguish runtime profile vs proposed draft，避免把旧 runtime snapshot 当 proposed profile。
- P2 human-readable sample review may be needed, but avoid report / doc hell；优先复用现有 debug output 和 review pack。

### First implementation queue

0. Done for non-final gate：v0.0.8.22 已建立 minimum scoring registry / validator gate，覆盖 pressureKey / triggerMetric / severityLevel / sourceLayer / ruleId / scoreRuleStatus 的最小 allowed values；它不是 active validator，不接 runtime / final score / golden。
1. P0：补 high sweetness overload 的 non-final scoring suggestion rule，并保留反 if gate。
2. P0：补 `bitterPressure` / `dairySupport` / `sweetnessBalance` 的通用 pressure balance shape。
3. P1：补 powder / sediment ratio + `liquidSupport` 的 non-final 判断雏形。
4. P1：补 strong identity support / conflict balance。
5. P1：补 score aggregation / diminishing returns / dominant mechanism selection。
6. P1：partial / active takeover 前清 displayName / registry / active validator / legacy route / golden update protocol。
7. P2：再处理 mouthCoating 拆分、customer preference、完整 Sheets workflow 和 review pack polish。

任何 implementation 都必须先通过 anti-if gate：只允许中枢开关、合法数字检查、fallback、scoreSource 展示等少量调度 if；不得新增具体原料、组合、样本、中文显示名或 recipe whitelist 特判。

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
- cross-layer customer preference / audience tolerance integration：后续可规划接入 taste / texture / flavor / structure 等层；当前 concept review 不实现顾客系统，不创建 `customerTag` / `audienceId`

## 12. Exit criteria for v0.0.8 planning readiness

这些是 planning readiness，不是 implementation done。

- active stage TODO established and registered。
- P1 debt migrated into planning buckets。
- review pack prototype status clarified。
- Scenario first, ID later workflow represented as planning tasks。
- no runtime / generated / golden / data changes。
- next implementation task still requires explicit user approval。
