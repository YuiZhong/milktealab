# 奶茶实验室 AI Context

> 本文件是《奶茶实验室》的新对话导航页，用于 ChatGPT / Codex 在新对话、新任务或长上下文丢失时快速找到当前正本。

> 它不是机制正本，不是版本流水账，不是历史 report 汇总，也不替代 git ref / tag。

> 文档层级、冲突裁决和更新归属以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。当前机制判定以 `docs/TASTE_DECISION_MODEL.md` 为准。ID / tag / registry / validator 边界以 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 为准。版本流水以 `docs/VERSION_LOG.md` 和 git ref / tag 为准。reports 只作为历史证据，不自动升级为当前事实。

> 如果 `docs/AI_CONTEXT.md` 与正本冲突，信正本，并修 `docs/AI_CONTEXT.md`。

> 新阶段开工前必须先创建并登记 active stage TODO。阶段 TODO 只在对应阶段内必读，阶段结束后移出长期必读列表。`docs/DOCS_SOURCE_OF_TRUTH.md` 自身不记录版本流水或当前阶段状态；版本流水仍以 `docs/VERSION_LOG.md` 和 git ref / tag 为准。

> `docs/AI_CONTEXT.md` 只做新对话导航，不承载完整机制正本、版本流水或历史 report 摘要；文档单一职责 / 反 doc 地狱原则以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

---

## 0. 当前 v0.0.8 read-only shadow proof / calibration stage

当前项目已从 v0.0.7.x docs closure checkpoint 进入 v0.0.8.x read-only shadow proof / debug output / human-readable review pack / early calibration stage。

P0-A: resolved。判定模型正本污染已通过 `docs/TASTE_DECISION_MODEL.md` 修复。

P0-B: resolved。AI_CONTEXT source-of-truth pollution 已通过导航页瘦身和正本指向修复。

P0-C: resolved。docs source-of-truth hierarchy failure 已通过 `docs/DOCS_SOURCE_OF_TRUTH.md`、`docs/DOCS_INVENTORY.md`、反 doc 地狱原则、support docs role header 和 V0_0_7 stage-bound header 修复。

当前 active stage TODO：

- `docs/V0_0_8_PLANNING_TODO.md`
- 定位：v0.0.8.x 内容管线 / review pack / registry-validator planning。
- 边界：已从 pure planning 进入 visible shadow proof / debug output / human-readable review pack；implementation / final takeover 仍需明确批准。

当前 verified baseline：latest main 为 `92d6154 feat: add score takeover trial flag`，该 commit 已推 main；新对话继续前应先确认 branch 为 `main`、working tree clean、HEAD 与 `origin/main` 一致。

当前路线压缩：

- v0.0.8.5：页面新系统建议层开始产生非零 `scoreDeltaDraft`，仍 non-final，不覆盖 final score / feedback / result。
- v0.0.8.6：新增 calibration review hints，提醒优先调 scoring / judgment system，不要让 ingredient profile 背锅。
- v0.0.8.7：页面 generated severity suggestion 中文展示标签完成；内部 stable key 仍保持英文。
- v0.0.8.8：新增折叠的“制作人校准样本 / Debug”入口；它不是正式玩家 UI。
- v0.0.8.9：完成 ingredient profile value readiness audit；37 原料中 taste 33/37，texture 37/37，flavor 37/37；coverage 不等于校准完成。
- v0.0.8.10：完成 current technical debt review；显示文案主键 / registry / validator / legacy route 等会阻塞 final takeover，但不阻塞 profile draft。
- v0.0.8.11：完成 all-37 ingredient profile value draft workspace；CSV / JSON 覆盖 37/37 原料，`proposed*` 仍为空 `{}`，所有 gate 为 false，不接 runtime。
- v0.0.8.12：完成 all-37 source-referenced profile value first pass；CSV / JSON 覆盖 37/37 原料，补充 `sourceNotes`、`confidence`、`reviewStatus`、`aiComment` 和 review-only proposed baseline，不接 runtime。
- v0.0.8.13：新增 score-only partial takeover debug flag / rollback scaffold；默认仍使用 legacy score，只有显式 debug flag 才可用 generated suggested score 覆盖 `result.score`，且不接管 feedback / `result.type` / accident / golden。
- v0.0.8.14：完成 profile value scale recalibration draft；基于 v0.0.8.12 生成 v0.0.8.14 CSV / JSON，按制作人确认的 0-100 标尺重校准 `proposed*`，`current*` 仍是 runtime snapshot，所有 gate 为 false，不接 runtime / data/generated / scoring / golden。

当前长对话已经出现上下文漂移风险。后续应优先从 `docs/AI_CONTEXT.md`、`docs/VERSION_LOG.md` 和 verified git baseline 恢复，而不是依赖本轮长聊天记忆。

Golden samples 不是圣经或味觉真理，主要是回归保护 / 变更报警 / 防误炸工具。新系统目标不是复刻旧系统，而是逐步符合玩家 / 制作人直觉；当新系统建议与旧 golden 冲突时，应通过 review pack 暴露差异，再由用户 + ChatGPT 判断调新系统、更新 golden 或标记 pending。允许有意识更新 golden expected，但必须有人工确认、原因、记录和可回滚线索；禁止为了测试变绿而无意识改 golden。

当前项目没有外部玩家，除用户外没人会使用网页，因此非 final / feature flag / debug overlay / score suggestion / limited partial takeover 路线可以比线上产品更积极；但“没有玩家”不等于可以乱改，仍需可回滚、可解释、测试通过、反 if 地狱、不让 Codex 发明机制、不无记录改 final result / golden。

当前限制：

- 不开放 active generated severity / final takeover；默认不改 final score / feedback / result.type / golden expected。v0.0.8.13 只允许显式 debug flag 下的 score-only takeover trial，且必须可回滚。
- Node-only / debug-only / read-only shadow、review pack、score suggestion overlay 和 controlled partial discussion 可以继续推进，但必须有明确任务边界。
- 不做 batch content。
- 不生成新 ID / feedbackTag / triggerMetric / ingredient profile。
- 不做 active generated severity / final takeover。
- first shadow / review pack / score suggestion overlay / partial takeover 讨论必须保持明确 gate，不能直接 active takeover。
- existing generated feedback shadow 如存在，仍是 non-final，不影响 final feedback / final result。
- 不让 Codex 发明机制概念。
- 不把 v0.0.7.x 写成已完成 formal safe closure / candidate / formal tag。
- 不把 P1 写成 solved。

当前协作节奏：默认一条设计线尽量闭环后再开启下一条。当前线如果已进入 concept candidates / human review record / approved concept list draft / later structuring planning，应优先收束到清晰 checkpoint；新灵感、新债务和相邻方向先进入 Parking Lot，除非明确阻塞当前线。

`reports/v0.0.7SafeClosureDecision.md` 记录：P0-A / P0-B / P0-C 已 resolved，P1 split 已足以进入 safe closure discussion / closure checkpoint preparation；这不代表 P1 solved，也不开放 v0.0.8.x / batch content / generated severity / takeover。

`reports/v0.0.7ClosureCheckpointDiscussion.md` 是当前 closure checkpoint / candidate discussion report。它支持准备 docs-only closure checkpoint discussion，但不创建 candidate / formal tag，也不开放 v0.0.8.x。

`reports/v0.0.7ClosureCheckpoint.md` 记录当前 docs-only closure checkpoint 已达到稳定状态；它不是 candidate tag / formal tag，不开放 v0.0.8.x implementation，也不表示 P1 solved。

当前下一步路线：不要继续分批新建 report，也不要直接推进 runtime / generated / golden。v0.0.8.14 已生成 0-100 scale recalibration 草案工作台；下一步应先做制作人 / ChatGPT review、source-limited 项补证、schema gap 讨论，或在明确 gate 后推进下一刀草案校准。

v0.0.8.14 仍覆盖 37/37 原料。资料不足的原料已标明 low confidence / source_limited / needs follow-up；这些标记不是失败，而是后续人工复核入口。海盐 `saltiness` 仍是 review-only schema gap，不是 runtime profile 字段。

v0.0.8.14 仍未新增 report，未新建 planning 文档，未改 runtime profile，未写 `data/generated`，未改 scoring logic，未改 final result，也未为了目标分数或校正测试反推 ingredient profile。联网资料和 v0.0.8.12 first pass 是参考基线，不是游戏真理；最终仍需制作人 review。

Final takeover gate：继续推进 profile draft / debug overlay 可以；但在以下事情前必须先停下来清技术债：`suggestedScore` 覆盖 `result.score`、generated severity 接 final accident / feedback / `result.type`、写 `data/generated` 并让 runtime 读取、正式 threshold / `scoreMultiplier` 接管、更新 golden expected、active validator / allowed values、存档 / recipe identity / 玩家命名系统。

上述前置债包括：displayName / 中文主键 runtime cleanup、stable ID registry / allowed values、active validator、legacy accident route staged replacement、golden update protocol、score takeover rollback / feature flag。

## 1. 新对话启动必读

新 ChatGPT / Codex 对话应先读取：

1. `docs/DOCS_SOURCE_OF_TRUTH.md`
   - 文档层级、冲突裁决和更新归属正本。
   - 用于判断该读谁、更新谁、文件冲突信谁。
2. `docs/TASTE_DECISION_MODEL.md`
   - 当前判定模型正本。
   - 包含特殊服务事故、质地事故、味觉事故、风味冲突、正常好组合、普通分类的当前层级。
   - 包含 priority vs severity、priorityBand vs severityLevel、severityHint vs scoreMultiplier 边界。
   - 包含所有判定层反 if 地狱原则。
3. `docs/STABLE_ID_NAMING_GUARDRAIL.md`
   - stable ID / tag / ruleId / sampleId / candidateId / triggerMetric / priorityBand / severityLevel / registry / validator / generated data 的长期正本。
4. `docs/V0_0_8_PLANNING_TODO.md`
   - 当前 active stage TODO。
   - 承接内容管线、review pack、draft ID、registry candidate、validator gate、read-only shadow proof 和 early calibration 路线。
5. `docs/TASTE_SYSTEM_DESIGN.md`
   - 味觉系统设计细节。
   - 包含三层 profile / summary、candidate、severity / threshold 管线草案。
6. `docs/TASTE_ENGINE_ARCHITECTURE.md`
   - 味觉引擎架构笔记。
   - 记录 stable ID、三层 profile / summary、candidate priority shell 和 runtime 只读边界。
7. `docs/VERSION_LOG.md`
   - 版本流水账。
   - 只用于确认历史版本变化，不作为当前机制正本。

必要时再读：

- `reports/human_review/`
  - 人类审批 / 制作人评审材料目录；只作为 review material，不是 source-of-truth / runtime data。
- `data/stableIdRegistry.js`
- `scripts/content/checkStableIdRegistry.js`
- `docs/V0_0_7_MECHANISM_TODO.md`
  - 仅在追溯 v0.0.7.x 债务迁移时读取；它已降级为 previous stage material，不再作为当前 active stage TODO。
- `data/goldenSamples.js`
- `core/tasteJudge.js`
- `core/summaryCandidateEngine.js`
- `core/candidatePriorityShellEngine.js`

长期批量内容生产流程：ChatGPT 先根据用户设定生成自然语言 scenario / concept candidates，用户审核后形成 approved concept list；Codex 只负责把 approved concepts 按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 结构化为 draft ID / rules / sheets / registry candidates，并运行 validator / tests。Codex 不得自行发明机制概念或追加未审核 ID。

ID / draft ID / registry / validator 相关任务必须复用 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 与现有 source-of-truth / registry planning；新增或修改 ID 前必须先查 existing / legacy / observed ID，不要从零重新设计 ID approval flow。`reports/human_review/draftIdNamingReviewProtocol.round1.md` 和 `reports/human_review/sourceOfTruthRegistryPlanning.round1.md` 是当前阶段证据 / 操作协议，不是 registry 或 allowed values。

Profile / summary / `triggerMetric` / severity 相关任务遵守 numeric-first：机器计算优先使用 numeric values / numeric load，中文档位或 high / medium / low 只做人类提示。

未来 ingredient profile value draft / 批量原料数值阶段不能随机生成或纯拍脑袋，应先参考联网搜索、食品资料、论文、食品成分、pH、糖度和质地资料，形成“参考基线 + 游戏化相对数值草案”。原料 profile 描述材料事实 / 游戏化相对属性；scoring / judgment system 定义什么算好喝。不能为了让某杯饮料达到目标分数或通过校正测试而扭曲原料 profile；若现实合理 profile 得出不符合直觉的分数，优先检查 threshold、severity、scoreMultiplier、组合关系、饮品类型预期、客群偏好、positive synergy / accident balance 和 score aggregation。只有原料数值偏离现实事实或相对尺度明显错误时，才调整原料 profile。

## 2. 当前机制正本

当前完整判定层级、priority vs severity 边界和所有判定层反 if 地狱原则，以 `docs/TASTE_DECISION_MODEL.md` 为准。

当前正确判定优先级：

```text
特殊服务事故 > 质地事故 > 味觉事故 > 风味冲突 > 正常好组合 > 普通分类
```

旧说法：

```text
极端比例事故 > 稠度/质地事故 > 冲突组合 > 正常好组合 > 普通分类
```

只保留为 deprecated / historical rough rule only，不能再作为当前机制正本。

必须分清：

- 判定优先级只决定调度顺序和是否能被后续候选洗白。
- 判定优先级不等于扣分严重度。
- `priorityBand` 不等于 `severityLevel`。
- `severityHint` 不等于 `scoreMultiplier`。
- 高 priority 候选可以低 severity。
- 低 priority 候选也可能提供明显加分或强反馈。

## 3. 项目核心定位

《奶茶实验室》是原创饮品研发经营模拟游戏，不复刻《疯狂摇摇杯》的原名、素材、UI、配方表或原文案。

长期目标是面向手游 + Steam 端游的原创饮品研发经营模拟游戏。当前 Web 原型用于验证核心玩法并沉淀平台无关数据 / 规则系统，不代表最终产品是网页游戏。

第一阶段 MVP 核心是：

```text
自由配方 -> 系统读懂配方 -> 试喝反馈有灵魂 -> 玩家想继续调下一杯
```

玩家身份是老板 / 饮品研发师 / 配方疯子，不是单纯当店员接单。

味觉系统是核心资产。原料数据、反馈文案、客群偏好、测试样本应尽量平台无关，避免与当前网页 UI 强绑定。

## 4. 味觉系统长期原则

三层属性 / profile / summary 是长期地基：

- `tasteProfile` / `tasteSummary`：基础味觉。
- `textureProfile` / `textureSummary`：物理质地和可饮用性。
- `flavorProfile` / `flavorSummary`：风味身份、香气联想和搭配语义。

profile / summary 是中间理解层，不是最终判定层。最终事故、类型、反馈、severity、score、经营成本和顾客偏好，应在 summary 之后由 candidate / rule / 调度层决定。

反 if 地狱是全系统原则：

- 特殊服务事故不能长期写成具体组合 if。
- 质地事故不能长期写成具体原料比例 if。
- 味觉事故不能长期写成单原料阈值 if。
- 风味冲突不能长期写成具体组合 if。
- 好组合和普通分类也不能靠中文显示名、UI category 或玩家可见文案硬判。

代码负责汇总 / 调度 / 排序 / 兜底；数据负责描述“什么条件会触发什么候选”。

## 5. Stable ID / Registry 当前边界

`data/stableIdRegistry.js` 仍只是 minimal scaffold sample。

`scripts/content/checkStableIdRegistry.js` 仍只是 read-only check sample。

它们不是 approved source-of-truth，不是 active validator，不生成 allowed values，不接 runtime，不接 generated severity。

当前 scaffold 中的 `taste_acid_overload` / `texture_solid_overload` 仍是 `reviewed_candidate_not_approved`，不能进入 validator / generated severity / runtime。

reports / sample packs / review packs / decision drafts / candidate notes 只作为历史证据或审查材料，不自动升级为当前事实。

## 6. v0.0.8 read-only shadow proof / calibration 当前路线

v0.0.7.x 已从 P0 docs recovery 转入 docs-only closure checkpoint reached，并通过 `v0.0.7-docs-closure-checkpoint` 记录 checkpoint。

当前新阶段已建立 `docs/V0_0_8_PLANNING_TODO.md` 作为 active stage TODO，并已进入 read-only generated severity shadow proof、multi-sample debug output 和 human-readable review pack。

这不是 v0.0.7.x formal safe closure / candidate / formal tag，也不代表 P1 solved；active generated severity / final takeover 仍未开放。

batch accidentTypeId / feedbackTag / triggerMetric / ingredient profile、active validator、runtime takeover 和 active generated severity 仍暂停，除非后续用户明确批准。Node-only / debug-only / read-only shadow、review pack、score suggestion overlay 和 controlled partial discussion 可以作为 non-final path 继续推进。Existing generated feedback shadow 如存在，仍是 non-final，不影响 final feedback / final result。

剩余 P1 债务已迁入 `docs/V0_0_8_PLANNING_TODO.md` 的 planning buckets，或保留为 staged legacy support / Parking Lot；迁移不等于 solved。

当前更具体的下一步候选是：由用户 + ChatGPT 审查 planning TODO，然后决定是否进入某个明确批准的 implementation slice。
