# 奶茶实验室 AI Context

> 本文件是《奶茶实验室》的新对话导航页，用于 ChatGPT / Codex 在新对话、新任务或长上下文丢失时快速找到当前正本。

> 它不是机制正本，不是版本流水账，不是历史 report 汇总，也不替代 git ref / tag。

> 文档层级、冲突裁决和更新归属以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。当前机制判定以 `docs/TASTE_DECISION_MODEL.md` 为准。ID / tag / registry / validator 边界以 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 为准。版本流水以 `docs/VERSION_LOG.md` 和 git ref / tag 为准。reports 只作为历史证据，不自动升级为当前事实。

> 如果 `docs/AI_CONTEXT.md` 与正本冲突，信正本，并修 `docs/AI_CONTEXT.md`。

> 新阶段开工前必须先创建并登记 active stage TODO。阶段 TODO 只在对应阶段内必读，阶段结束后移出长期必读列表。`docs/DOCS_SOURCE_OF_TRUTH.md` 自身不记录版本流水或当前阶段状态；版本流水仍以 `docs/VERSION_LOG.md` 和 git ref / tag 为准。

> `docs/AI_CONTEXT.md` 只做新对话导航，不承载完整机制正本、版本流水或历史 report 摘要；文档单一职责 / 反 doc 地狱原则以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

---

## 0. 当前 v0.0.7.x closure audit mode

当前项目处于 v0.0.7.x closure audit mode。

P0-A: resolved。判定模型正本污染已通过 `docs/TASTE_DECISION_MODEL.md` 修复。

P0-B: resolved。AI_CONTEXT source-of-truth pollution 已通过导航页瘦身和正本指向修复。

P0-C: resolved。docs source-of-truth hierarchy failure 已通过 `docs/DOCS_SOURCE_OF_TRUTH.md`、`docs/DOCS_INVENTORY.md`、反 doc 地狱原则、support docs role header 和 V0_0_7 stage-bound header 修复。

当前限制：

- 不开 v0.0.8.x。
- 不做 batch content。
- 不生成新 ID / feedbackTag / triggerMetric / ingredient profile。
- 不做 severity / generated severity。
- 不做 shadow / partial / active takeover。
- 不让 Codex 发明机制概念。
- 不把 v0.0.7.x 视为安全 closure。
- 不把 P1 写成 solved。

下一步是 v0.0.7.x closure audit：对 P1 做收口前必须给结论 / 迁移到下一阶段 TODO / 保留 legacy support 的分流。

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
4. `docs/V0_0_7_MECHANISM_TODO.md`
   - v0.0.7.x 机制 / ID / 内容管线债务正本。
   - 当前 P0 / P1 / P2 状态以此文件为准。
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

- `data/stableIdRegistry.js`
- `scripts/content/checkStableIdRegistry.js`
- `data/goldenSamples.js`
- `core/tasteJudge.js`
- `core/summaryCandidateEngine.js`
- `core/candidatePriorityShellEngine.js`

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

## 6. v0.0.7.x 当前路线

v0.0.7.x 已从 P0 docs recovery 转入 closure audit mode。

这不是 v0.0.8.x 开工，不是 v0.0.7.x 安全 closure，也不代表 P1 solved。

batch accidentTypeId / feedbackTag / triggerMetric / ingredient profile / threshold / severity / score / review pack / generated severity / shadow tuning datasets / active validator / runtime takeover，仍全部暂停。

下一步应做 v0.0.7.x closure audit：确认 P1-8 final audit 如何执行，并把 P1-1 到 P1-7 分流为收口前必须给结论、迁移到下一阶段 TODO、保留 legacy support 或明确不应现在处理。
