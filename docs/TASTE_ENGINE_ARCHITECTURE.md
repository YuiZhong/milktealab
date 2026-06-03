# 奶茶实验室味觉引擎架构笔记

本文档记录《奶茶实验室》味觉引擎在 v0.0.5.x 阶段确认的底层架构方向，重点包括原料数据模型、稳定 `ingredientId`、玩家可见文案去系统主键、三层 profile、三层 summary、事故优先级、质地事故细分、legacy 迁移方向，以及 v0.0.5.x / v0.0.6.x / v0.0.7.x 阶段边界。

本文档不是完整版本流水账。版本变更记录仍以 `docs/VERSION_LOG.md` 为准；新对话恢复的短摘要仍以 `docs/AI_CONTEXT.md` 为准；味觉系统设计正本仍以 `docs/TASTE_SYSTEM_DESIGN.md` 为准。本文档负责承载后续底层架构任务的详细笔记。

从本轮起，后续继续 v0.0.5.x 味觉引擎底层任务前，Codex 应先阅读本文档，不要直接继续机械迁移某个旧事故规则。

## 1. 当前核心判断

《奶茶实验室》的味觉引擎不能只靠原料名、UI 分类和一堆 if 判断。长期应逐步升级为：

```text
稳定 ingredientId
↓
三层原料 profile
↓
三层 summary
↓
规则表
↓
评分 / 类型 / 反馈
```

核心目标不是立刻把所有 legacy 逻辑重写掉，而是先搭出能承重的底层结构，避免继续把具体原料、事故条件和反馈判断塞进巨大的 if / else if 逻辑树。

当前阶段边界重新定义为：

```text
v0.0.5.x：先确定对象身份
v0.0.6.x：再建立三层属性 / profile / summary
v0.0.7.x：再调 severity 和数值
```

也就是：v0.0.5.x 解决“系统里的东西是谁”；v0.0.6.x 解决“这些东西如何被三层属性系统理解并汇总”；v0.0.7.x 解决“判断得好不好、数值顺不顺”。三层 profile / summary 是中间理解层，应建立在 stable ID 地基之上。

### v0.0.5.x final 收口结论

截至 v0.0.5.40 docs 收口，v0.0.5.x 可基本认为已经完成“现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基”阶段。这里的“中文主键”只是历史简称，更准确的风险是“显示文案主键”：任何玩家可见、未来可能改名、本地化或换文案风格的 label，都不应承担系统身份。

进入 v0.0.6.x 前，现有核心链路已经具备 stable ID 主路径：原料有 `ingredientId`，规则表有 refs / `ingredientIds` 双轨，结果链路有 `accidentTypeId` / `drinkTypeId` / `audienceIds` / `outcomeTypeId` / `feedbackTags`，golden runner 也已支持对应 ID 断言。v0.0.6.x 不应再主要做 ID 化补洞，而应基于这些 ID 建立 `tasteSummary` / `textureSummary` / `flavorSummary` 等三层属性地基。

允许 legacy `displayName` / `name` / `names` / `note` / feedback 文案继续存在；它们负责展示、历史快照、文案回归和旧数据兼容。只要机制判断、测试身份、保存机制身份和未来统计聚合优先依赖 stable ID，就不需要在 v0.0.5.x 末尾为了“看起来干净”强行拆掉所有显示文案字段。

### v0.0.6.x 三层属性 / profile / summary 边界

后续文档和任务应优先使用“三层属性 / 三层 profile / 三层 summary”这组术语，不要简单写“三层判定”。三层属性负责描述饮品的中间理解层：`tasteSummary` 描述基础味觉结构，`textureSummary` 描述物理质地和饮用性，`flavorSummary` 描述风味身份、香气联想和搭配语义。profile / summary 不是最终判定本身，事故优先级、severity、score、反馈、经营成本、顾客偏好和报表聚合，是基于 summary 的后续判定层。

三层细分项必须可扩展。`tasteSummary` / `textureSummary` / `flavorSummary` 的字段、类别、阈值、说明和权重后续都可能大量增删；v0.0.6.x 初期应优先定义 schema 和 summary 产物，不急着完整调参，也不要把字段和阈值写死在 analyzer if 中。

v0.0.6.x 不需要立刻实现完整权重系统，但 schema 不能堵死未来权重、阈值、severity 和 priority 接入。profile / summary / rule / candidate 应预留或允许扩展 `metadata`、`weights`、`thresholds`、`evidence`、`sourceLayer`、`priorityBand`、`severityHint` 等字段；默认权重可以先不启用或使用默认值。完整 `severity` / `scoreMultiplier` / 大规模数值调优和 golden 扩容，留到 v0.0.7.x 更合适。

不只原料有属性。原料有 profile，组合规则、事故规则、反馈规则、结果候选也应逐步拥有结构化 metadata，例如 `sourceLayer`、`triggerMetric`、`threshold`、`feedbackTags`、`outcomeTypeId`、`priorityBand`、`severityHint`。不要把具体组合判断长期写成 if 某原料 + 某原料；数据负责“判什么”，代码负责“怎么汇总 / 调度”。

v0.0.6.x 可以设计 accident candidate / priority schema，但不要在 v0.0.6.0 就完整实现 severity / scoreMultiplier 调参。事故优先级 schema 可以先表达来源层、触发指标、候选结果和优先级区间；真正的严重度数值、乘数和平衡校准留到 v0.0.7.x。

v0.0.6.0 的 docs-only schema 正本见 `docs/TASTE_SYSTEM_DESIGN.md`。该正本约定三层 summary 通用容器为：

```js
{
  values: {},
  tags: [],
  risks: [],
  evidence: [],
  metadata: {}
}
```

其中 `values` 承载可扩展数值指标，`tags` 承载结构化标签，`risks` 承载风险信号，`evidence` 解释指标来源，`metadata` 预留版本、权重、阈值和调参信息。三层 summary 的具体指标可以增删，不能写成只能固定存在的死结构。

v0.0.6.0 也应明确 candidate 层：summary 之后产出事故、outcome、drinkType 或 feedback 候选，候选再进入最终调度。candidate / rule metadata 应逐步支持 `sourceLayer`、`triggerMetric`、`thresholds`、`weights`、`evidence`、`priorityBand`、`severityHint`、`feedbackTags`、`outcomeTypeId` 和 `ruleFamilyId`。完整 severity 数值、`scoreMultiplier` 和大规模调参留到 v0.0.7.x。

### v0.0.6.10 三层 summary 中段复盘

截至 v0.0.6.9-candidate，`tasteSummary`、`textureSummary`、`flavorSummary` 均已进入 `result`，并且都有 golden 结构断言保护。三者仍然是只读中间理解层：它们解释一杯饮品在基础味觉、物理质地、风味身份上的状态，但不直接改写评分、事故、饮品类型、feedback 或 `result.type`。

三层 summary 当前的共同结构保持一致：

```js
{
  values: {},
  tags: [],
  risks: [],
  evidence: [],
  metadata: {}
}
```

当前数据来源边界：

- `tasteSummary` 读取基础味觉 profile，汇总甜度、酸度、茶感、奶感等基础味觉指标。
- `textureSummary` 读取质地 profile 与饮品结构分析结果，汇总固体负载、吸管阻力、可饮用性等物理指标。
- `flavorSummary` 读取以 stable `ingredientId` 为主 key 的 `ingredientFlavorProfiles`，汇总风味家族、香气压力、饮品适配、甜品适配、争议度和强身份信号；不从中文 displayName 或 UI category 反推风味身份。

下一阶段如果推进 summary -> candidate，应先保持只读 candidate 地基，而不是直接接管最终判定。candidate 应表达“summary 提供了哪些可调度候选”，例如事故候选、饮品类型候选、outcome 候选或 feedback 候选；最终排序、冲突解决、severity 数值、`scoreMultiplier` 与 golden expected 调整仍应独立规划。

candidate / priority 的初始结构可继续预留：

- `candidateId`
- `candidateType`
- `sourceLayer`
- `triggerMetric`
- `thresholds`
- `weights`
- `evidence`
- `priorityBand`
- `severityHint`
- `feedbackTags`
- `outcomeTypeId`
- `ruleFamilyId`
- `metadata.readonly`

v0.0.6.x 后续可考虑的收口方向是：summary -> candidate docs / schema 复核、只读 candidate 输出地基、candidate golden 结构断言、priority 调度壳层边界复查，以及 v0.0.6.x 阶段总复盘。v0.0.7.x 再集中处理具体参数、阈值、`severityLevel`、`scoreMultiplier`、反馈标签权重和 golden expected 有意识更新。

### v0.0.6.11 summary -> candidate 架构边界

summary -> candidate 是三层 summary 之后、最终 result 之前的桥。candidate 的职责是把 `tasteSummary` / `textureSummary` / `flavorSummary` 中已经出现的中间理解结果，整理成“可被后续调度读取的候选”。它不是最终判定，不直接改写 `score`、事故、饮品类型、feedback 或 `result.type`。

v0.0.6.x 的目标是把 candidate 的结构搭稳，先允许只读输出、结构断言和调度接口小步落地。v0.0.7.x 再集中处理具体阈值、`severityLevel`、`scoreMultiplier`、反馈标签权重和 golden expected 调优。

第一批 candidate 类型应保持克制：

- `accident`：事故候选，例如 taste 过载、texture 可饮用性事故、flavor 强身份风险。
- `outcome`：结果兜底候选，例如无法归入普通 drinkType 但有明确 outcome 方向的情况。
- `drinkType`：饮品类型候选，例如 classic milk tea、fruit tea、dessert drink 等类型方向。
- `feedback`：反馈焦点候选，例如酸度过高、吸管阻力、香气压迫等可被文案系统读取的结构化标签。

未来可以扩展 `audience`、`operation`、`customerPreference` 等 candidateType，但只有对应系统进入真实实现范围时再补 schema，不在 v0.0.6.11 为未来系统造空架子。

candidate 应携带足够 evidence 和来源信息，例如：

- `candidateId`
- `candidateType`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `triggerValue`
- `thresholds`
- `evidence`
- `priorityBand`
- `severityHint`
- `feedbackTags`
- `accidentTypeId`
- `outcomeTypeId`
- `drinkTypeId`
- `ruleFamilyId`
- `metadata`

`priorityBand` 只表达候选的大类优先级，例如 `texture_blocking`、`taste_overload`、`flavor_identity`、`positive_combo`；它不等于最终 severity 数值。`severityHint` 只是给后续 severity 系统的提示，不是最终扣分，也不能在 v0.0.6.x 初期直接决定 `scoreMultiplier`。

好组合或高适配 candidate 未来也只能作为加分 / 类型 / feedback 的候选来源，不能洗白高 severity 事故 candidate。candidate 排序和调度接口可以在 v0.0.6.x 后续小步设计，但候选排序、冲突解决、具体 severityLevel、scoreMultiplier 和阈值调优不属于 v0.0.6.11。

candidate 层尤其不能变成新的 if 地狱。错误方向是把 `if 榴莲 + 咖啡`、`if 奥利奥 > 30`、`if 某 tag + 某 tag` 挪到 candidate engine 里继续堆内容判断。正确方向是：summary 提供结构化指标，规则表 / relation matrix / 阈值表读取这些指标并产出 candidate，调度层只负责排序、冲突处理和最终选择。

### v0.0.6.14 candidate priority shell 架构边界

candidate priority shell 位于 `summaryCandidates` 和最终 result 调度之间。它的职责是把已经产出的 candidate 按粗粒度优先级组织成只读观察结构，帮助后续调试、golden 断言和调度设计；它不是最终判定层，不直接改写 `score`、事故、饮品类型、feedback、`result.type`、`accidentTypeId`、`drinkTypeId` 或 `outcomeTypeId`。

v0.0.6.14 只定义 docs / schema，不实现 runtime，不新增 priority engine，不接管 `tasteJudge`，也不改变既有 `summaryCandidateEngine` 的输出。当前最终结果仍以现有 legacy analyzer / judge 链路为准，直到后续有明确任务把 priority shell 接入只读输出，再通过单独任务评估是否接管最终调度。

priority shell 应继续坚持反 if 地狱原则：

- 不在 priority shell 里写具体组合 if，例如 `榴莲 + 咖啡`、`奥利奥 > 30`、`某 tag + 某 tag`。
- 不用玩家可见文案、中文 displayName 或 UI category 作为调度主键。
- 不让正向组合候选洗白高优先级事故候选。
- 不用 `priorityBand` 直接决定最终 severity 或扣分。
- 不把 `severityHint` 当成 `severityLevel`、`scoreMultiplier` 或最终事故严重度。

`priorityBand` 与 `severityHint` 的边界必须清楚：

- `priorityBand` 是候选进入后续调度时的粗分组，例如 `hard_physical`、`texture_drinkability`、`taste_overload`、`flavor_identity`、`normal_conflict`、`positive_synergy`、`type_classification`、`feedback_hint`。它回答“这类候选大概应该在哪个调度区域被看见”，不回答“扣多少分”。
- `severityHint` 是后续 severity 系统可参考的语义提示，例如 `info`、`low`、`medium`、`high` 或 `critical`。它不是最终 `severityLevel`，也不能在 v0.0.6.x 直接推出 `scoreMultiplier`。
- 事故优先级不等于事故严重度。一个候选可以优先被检查，但真正 severity、分数乘区和反馈强度应留到明确调参阶段。

v0.0.6.x 可以准备 priority shell 的 schema、只读输出和结构断言。v0.0.7.x 再集中处理参数权重、阈值校准、`severityLevel`、`scoreMultiplier`、候选排序策略和 golden expected 有意识更新。

### v0.0.6.17 后半段收口复盘

截至 v0.0.6.16-candidate，v0.0.6.x 后半段需要的主要系统地基已经齐备：

- `tasteSummary` 已进入 `result`，由 `core/tasteSummaryEngine.js` 独立构建，并已有 golden 结构断言。
- `textureSummary` 已进入 `result`，由 `core/textureSummaryEngine.js` 独立构建，并已有 golden 结构断言。
- `flavorSummary` 已进入 `result`，读取 `data/ingredientFlavorProfiles.js`，并已有 golden 结构断言。
- `summaryCandidates` 已进入 `result`，把 summary 风险和指标整理为只读 candidate，并已有 golden 结构断言。
- `candidatePriorityShell` 已进入 `result`，把 candidate 组织为只读 priority shell，并已有 golden 结构断言。

这些结构当前都只承担中间观察 / 理解职责，不接管最终判定。最终评分、事故、饮品类型、feedback、`result.type`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId` 和 `feedbackTags` 仍由既有 analyzer / judge 链路产出；summary / candidate / priority shell 只提供并行可读结构，服务 debug、golden 保护和后续调度设计。

从结构完整性看，进入 v0.0.6.x final 收口审计前没有发现阻塞项：

- candidate 已具备 `candidateId`、`candidateType`、`sourceLayer`、`sourceSummary`、`triggerMetric`、`triggerValue`、`thresholds`、`evidence`、`priorityBand`、`severityHint`、`feedbackTags`、`accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`ruleFamilyId` 和 `metadata`。
- priority shell 已具备 `orderedCandidates`、`byPriorityBand`、`topCandidates` 和 `metadata`。
- metadata 已表达 `readonly`、`weightsEnabled` 和 `affectsFinalResult` 等边界。
- summary evidence 已能进入 candidate；priority shell 保留 candidate 快照，因此 evidence 可以继续被观察和断言。
- `priorityBand` 与 `severityHint` 已预留，但仍未变成最终 severity 或扣分规则。

建议下一步可以进入 v0.0.6.x final 收口审计。final 审计应检查：

- 文档、runner、golden samples 与 runtime 暴露结构是否一致。
- `tasteJudge.js` 是否仍保持调度层职责，没有重新承载 summary / candidate / priority shell 细节。
- golden 结构断言是否覆盖三层 summary、summaryCandidates 和 candidatePriorityShell 的关键容器、metadata 与代表字段。
- 是否仍没有让新系统改写评分、事故、类型、feedback、`result.type` 或 golden score expected。
- 是否有文档把下一步写死、把 priorityBand 写成 severity、或把 severityHint 写成 `scoreMultiplier`。

当前遗留项分级：

- P0：无。未发现阻止进入 final 收口审计的系统结构缺口。
- P1：进入 v0.0.7.x 前建议完成 final 收口审计和结构核对。审计应明确检查三层 summary / `summaryCandidates` / `candidatePriorityShell` 的结构一致性，核对 `result` 输出字段是否稳定暴露，确认 `evidence` / `metadata` / `sourceLayer` / `sourceSummary` / `triggerMetric` / `triggerValue` / `priorityBand` / `severityHint` 已贯通；同时核对 `feedbackTags` / `outcomeTypeId` / `drinkTypeId` / `accidentTypeId` 等候选承载位是否齐全，golden 结构断言是否足够保护关键容器、metadata 和代表字段，以及是否仍有进入 v0.0.7.x 前必须补的结构缺口。审计中也可整理 docs 中旧“本地 commit 后以 git log -1 为准”等短期状态描述，并确认 `index.html` runtime 加载顺序和 cache query 与当前结构一致。
- P2：可以留到 v0.0.7.x 或更后面的后续方向，包括更丰富的 golden 覆盖、flavor relation matrix / candidate relation matrix、表格化内容管线、更多 candidate 类型（例如 `audience` / `operation` / `customerPreference`，但应等对应系统进入真实范围再做）、更细的 profile / tag / metadata 扩展，以及更完整的调参、内容管理和数据审计工作。这些不应被写成 v0.0.6.x final 收口审计前必须完成。

v0.0.7.x 不应再一边补 v0.0.6.x 地基一边调参。它的重点应转为参数增删、标签增删、阈值调优、`severityLevel`、`scoreMultiplier`、golden expected 有意识调整，以及让 summary / candidate / priority shell 在明确任务中逐步接管旧判定。

## 2. 稳定 ingredientId 原则

`ingredientId` 是系统内部稳定主键，应该长期作为规则、profile、组合、事故、golden samples 和未来存档的主引用。

`name` 是玩家可见显示名，可以随着文案、授权、世界观或本地化需求调整。

`aliases` 用于旧名、别名、搜索、文案兼容和旧数据兼容。

长期方向：

- 规则表、profile、组合规则、事故规则、golden samples 和未来存档应逐步引用 `ingredientId`，而不是玩家可见显示名。
- 修改玩家可见 `name` 不应导致规则找不到、profile 对不上、golden samples 失效、旧存档断裂或组合判断失灵。
- 推荐使用可读字符串 ID，例如 `fruit_lemon`、`fruit_durian`、`topping_oreo_crumble`、`dairy_milk`、`sweetener_honey`。
- 不建议长期用纯数字或玩家可见显示名作为规则主键。纯数字更适合数据库内部自增主键，不适合作为早期游戏规则主 ID。
- 正式迁移前应先做只读评估，盘点显示文案依赖点，再小步迁移，不一次性重写全项目。

v0.0.5.10 第一刀只给原料基础数据添加 `id` / `aliases`，不让运行逻辑立刻改用 `id`。

v0.0.5.11 在 v0.0.5.10 的 `id` / `aliases` 数据地基上新增 ingredientRegistry 查询 helper，但不让业务逻辑立刻改用 `id`。

v0.0.5.12 在 ingredientRegistry 基础上，让 context 层具备 `name` / `ingredientId` 双轨能力，但不让业务规则立刻切换到 `id`。

v0.0.5.13 采用兼容层策略：先增强 profile 查询入口支持 stable id / name / alias / ref，不直接迁移 profile 数据 key。

v0.0.5.14 将 ingredientId 兼容推进到规则执行层：`ruleRefHelper` 只负责 ref 解析和 context 查询，不承载味觉判断。

v0.0.5.15 将 ingredientId 兼容推进到回归测试层：golden samples runner 支持 ingredientId 输入，用少量等价样本验证 ID 路径。

v0.0.5.16 将 ruleRefHelper 继续接入比例段规则执行层；helper 仍只负责 ref 解析和 context 查询，不承载比例规则内容。

v0.0.5.17 将 ingredientId 兼容推进到组合规则执行层；本轮只改匹配入口，不迁移组合规则表，不处理 synergyRules。

v0.0.5.18 将共享原料组查询从 analyzer 内部中文数组依赖中抽出，新增 ingredientGroupHelper；该 helper 只做 group key -> refs -> context 查询，不承载事故、比例、类型或风味判断。

v0.0.5.19 将 ingredientId 兼容推进到 drinkType 规则执行入口；本轮只做 ref 兼容，不改变玩家可见类型判断，不接三层 summary。

v0.0.5.20 将 ingredientId 兼容推进到保存结构边界；保存结构 helper 只做 recipe/cup item 标准化，不承载味觉判断，也不等同于正式存档系统。

v0.0.5.21 在规则表数据迁移前先补强 ID golden 覆盖，确保更多关键路径可同时通过 name 与 ingredientId 输入回归。

示意结构：

```js
{
  id: "topping_oreo_crumble",
  name: "奥利奥碎",
  aliases: ["奥利奥", "可可饼干碎", "饼干碎"],
  category: "小料"
}
```

如果未来显示名改成“可可饼干碎”，内部仍应使用 `topping_oreo_crumble`：

```js
{
  id: "topping_oreo_crumble",
  name: "可可饼干碎",
  aliases: ["奥利奥碎", "奥利奥", "饼干碎"],
  category: "小料"
}
```

过渡期可以同时保留：

```js
{ ingredientId: "fruit_lemon", name: "柠檬", ratio: 20 }
```

运行时判断优先使用 `ingredientId`，UI 展示使用 `name`，搜索和旧数据兼容使用 `aliases`。

## 玩家可见文案不作为系统主键

`ingredientId` 原则应扩展为更广义的 stable ID 原则。凡是玩家看得到、未来可能改名、改文案、改风格、本地化或重命名的内容，都不应长期承担系统主键职责。

内部判断应使用稳定 ID，显示层使用 `displayName` / `text` / localization 文案。中文或其他显示文本负责展示、反馈、UI、文案池和本地化，不应长期负责规则身份、存档身份、统计身份或测试核心身份。

现有系统中已经参与判断 / 测试 / 保存 / 展示的玩家可见文本，应逐步补 ID，并采用双轨迁移：先加 ID，保留 legacy 显示文案兼容，不立刻删除旧字段。未来新增系统则应从第一天就使用 stable ID + displayName / text，避免先把显示文案当主键再补救。

不要把这条原则误解成“现在立刻实现所有未来系统 ID”。未来还不存在的顾客、试喝员、事件、成就、图鉴、经营报表等系统，不应为了 ID 化提前造空架子；等它们进入真实实现范围时，再让它们出生就带稳定 ID。

示例：

```js
{
  accidentTypeId: "texture_accident",
  displayName: "口感事故"
}

{
  drinkTypeId: "classic_milk_tea",
  displayName: "经典奶茶"
}
```

长期可采用类似结构的系统身份包括：

- `ingredientId`：原料。
- `accidentTypeId`：事故类型。
- `drinkTypeId`：饮品类型。
- `feedbackTag`：反馈标签。
- `groupId`：原料组 / 风味组。
- `customerTypeId`：顾客 / 受众类型。
- `recipeFamilyId`：饮品家族。
- `testerId`：试喝员。
- `eventId`：事件。
- `achievementId`：成就。

中文 / 玩家可见文本应放在 `displayName`、`description`、feedback text、UI text、localization text 和文案池里。

不应长期依赖中文文本的位置包括：规则判断、存档主键、golden samples 核心断言、统计字段、图鉴解锁条件、顾客偏好判断、成就判断、经营报表聚合、未来本地化 / 多语言资源映射。

这条原则服务于后续脱离网页、迁移到 Steam / 手游 / 桌面程序、存档稳定、本地化和长期内容维护。`displayName` 可以改，ID 不应轻易改；规则、存档、测试、统计、图鉴和顾客偏好应逐步依赖 ID，而不是 displayName。

## 3. 三层 profile 原则

原料数据化不应只依赖 UI 分类，也不应只用单一味觉数值描述原料。长期应逐步建立三层 profile。

### 3.1 tasteProfile：基础味觉

回答：

```text
它尝起来的基础味道是什么？
```

包含方向：

- 甜
- 酸
- 苦
- 咸
- 涩
- 辣
- 麻
- 鲜
- 奶感
- 茶感
- 咖啡感
- 清爽 / 厚重 / 腻感等饮品感知

基础味觉相对最容易数据化，但后续难点在权重和阈值。柠檬过量长期不应永远是“柠檬事故”，而应逐步迁移为类似 `acidOverload` 的 taste 层事故。

### 3.2 textureProfile：物理质地

回答：

```text
它在杯子里的物理状态是什么？
```

包含方向：

- 液体
- 粉体
- 泥糊
- 胶质
- 颗粒
- 果冻
- 泡沫
- 奶脂层
- 固体负载
- 吸管阻力
- 粗吸管需求
- 糊化风险
- 沉积感
- 液体支撑需求
- 奶脂负担

珍珠、芋圆、椰果等大颗粒材料不仅增加吸管阻力，还具有 `coarseStrawNeed` / 粗吸管需求。它们在冰饮中可以通过粗吸管解决一部分饮用问题，但热饮通常不适合使用粗吸管，因为粗吸管大口吸入热饮容易烫嘴。因此，未来如果“热饮服务参数”与“粗吸管需求材料”同时出现，应触发质地 / 服务方式冲突事故。

这个事故不应依赖单个原料 if，而应来自 `textureProfile` + service parameter 的组合判断。

吸管阻力、粗吸管需求冲突、混凝土感、粉感、胶质粘稠、奶脂过载等事故不应只依赖 UI 分类或单个原料 if，而应来自 `textureSummary`。

### 3.3 flavorProfile：风味身份 / 香气身份

回答：

```text
它像什么食物 / 饮品 / 风味家族？
```

包含方向：

- 柑橘
- 热带水果
- 莓果
- 茶感
- 咖啡感
- 奶香
- 甜品感
- 草本感
- 蔬菜感
- 料理感
- 坚果感
- 争议度
- 饮品适配
- 文化 / 香气联想

关键例子：

橙子和西红柿可能在酸甜度和果肉质地上接近，但 `flavorProfile` 完全不同。橙子属于柑橘水果和饮品友好风味；西红柿带有蔬菜、料理、鲜味、沙拉 / 汤感联想。因此风味组合、冲突判断、隐藏配方、客群偏好和反馈文案不能只依赖酸甜苦等基础数值。

## 三层 profile 的设计由来

三层 profile 不是为了增加概念而增加概念，而是从具体事故讨论中推导出来的结构。早期事故判断里，很多规则看起来像是“某个原料特殊”，例如奥利奥碎过量、柠檬过量、榴莲过量。继续沿着这个方向扩张，会让每个新原料都有机会长出一条专属 if，让 analyzer 逐渐变成原料名判断集合。

这种写法短期直观，长期会带来几个问题：

- 新增原料、改显示名、加别名时，规则和测试都更容易断。
- 很难解释同类原料为什么会触发相似事故。
- 很难支撑更大的原料库、顾客系统、经营玩法、隐藏配方和长期调参。
- 未来维护者会越来越难判断一条规则到底属于味道、质地、风味身份还是服务方式。

因此后续不应继续机械迁移单个旧事故规则。每次遇到 legacy 事故，都应先判断它属于哪一层：`taste`、`texture`、`flavor`、`service` / 硬性物理层，或少数 `identity` / 强身份材料层。

### 奥利奥 / 小料讨论如何引出 textureProfile

奥利奥碎最初看起来像一个特殊事故，但实际问题不是“奥利奥这个名字特殊”，而是它在杯子里的物理质地：碎屑、粉糊、沉积、液体支撑需求，以及过量后接近“混凝土感”的饮用结构。

进一步讨论后发现，很多小料和非小料都会带来类似问题：

- 珍珠 / 芋圆 / 椰果：大颗粒，需要粗吸管，增加吸管阻力。
- 布丁 / 仙草：果冻凝胶感，可吸但会改变饮用结构。
- 芋泥 / 奥利奥碎：泥糊 / 粉糊 / 沉积，液体不足时像半固体。
- 蜂蜜：不仅甜，也带胶质和粘稠。
- 抹茶：不仅苦，也有粉体、沉积和糊化风险。
- 榴莲：虽然不是小料，但果肉厚重，多了也会影响吸管阻力和可饮用性。

这就是 `textureProfile` 的由来：描述原料在杯子里的物理状态，而不是只看 UI 分类或原料名。吸管阻力、固体负载、糊化、沉积、胶质、奶脂负担、液体支撑需求等，都应逐步来自 texture 层。

### 柠檬讨论如何引出 tasteProfile 的事故泛化

柠檬事故也不应长期理解为“柠檬这个原料过量就事故”。更底层的问题是：

```text
酸度过载 / acid overload
```

未来如果加入青柠、百香果、酸梅、山楂等高酸原料，它们也可能触发类似事故。因此基础味觉事故应逐步从“某个原料过量”泛化为：

- 酸度过载
- 甜腻过载
- 苦涩过载
- 咸味异常
- 麻辣不适配
- 奶感 / 茶感 / 咖啡感等基础风味强度失衡

这就是 `tasteProfile` 的职责：描述基础味觉和饮品感知，让事故可以从味觉维度和 summary 中推导，而不是绑定到单个中文原料名。

### 橙子 vs 西红柿如何引出 flavorProfile

橙子和西红柿在基础味觉和质地上可能接近：

- 都可能酸甜。
- 都可能有果肉感。
- 都可能有水分。

但人类知道它们完全不是同一种“味”。差异不在 taste，也不完全在 texture，而在风味身份：

- 橙子：柑橘、水果、饮品友好、果茶联想。
- 西红柿：蔬菜感、料理感、鲜味、沙拉 / 汤感联想。

因此需要第三层 `flavorProfile`：风味身份 / 香气身份。它用于表达风味家族、香气联想、料理感、甜品感、饮品适配、文化联想、争议度、客群偏好、隐藏配方和反馈文案所需的人类常识。

没有 `flavorProfile`，系统会误以为“酸甜差不多、质地差不多”的原料可以互换。长期看，这会让组合规则、顾客偏好和反馈文案失去人类直觉。

## 三层属性 / summary 的数据化原则

三层属性 / summary 不是把 `taste` / `texture` / `flavor` 三个名称写进代码里，然后继续堆具体组合 if。profile / summary 是中间理解层，不是最终判定本身；最终事故、类型、反馈、severity、score 和经营成本，应由 summary 之后的 candidate / rule / 调度层决定。

错误方向包括：

- `if 西红柿 + 牛奶`，则低分。
- `if 夏威夷风味 + 厚重蔬菜`，则低分。
- `if 奥利奥 > 30`，则固定事故。
- `if 榴莲 + 咖啡`，则固定翻车。
- `if 柠檬 + 某乳类`，则所有情况都一刀切。

这种写法会让 `tasteAnalyzer`、`textureAnalyzer`、`flavorAnalyzer` 或未来任何 analyzer 重新变成 if 地狱。正确方向是让原料先通过稳定 `ingredientId` 进入系统，再由三层 profile 汇总成 summary，规则表、关系矩阵和阈值表读取 summary 后输出候选，最后由 severity、评分倍率和反馈标签影响最终结果。

```text
ingredientId
↓
tasteProfile / textureProfile / flavorProfile
↓
tasteSummary / textureSummary / flavorSummary
↓
规则表 / 关系矩阵 / 阈值表
↓
事故候选 / 协同候选 / 类型候选
↓
severityLevel / scoreMultiplier / feedbackTags
↓
最终评分 / 类型 / 反馈
```

### 代码负责怎么判，数据负责判什么

核心原则：

```text
代码负责“怎么判”，数据负责“判什么”，测试负责“别判歪”。
```

代码应负责：

- 调度流程。
- 汇总 summary。
- 遍历规则表。
- 判断数值是否落入区间。
- 处理优先级。
- 选择主事故 / 主反馈。
- 处理 fallback。
- 防止分数越界。
- 输出稳定结构。

数据应负责：

- 原料 profile 数值。
- ingredient group 定义。
- family relation matrix。
- thresholds。
- severityLevel。
- scoreMultiplier。
- feedbackTags。
- 规则命中条件。
- 文案池。
- golden samples。

测试应负责：

- 防止回归。
- 防止 ID 路径和 name 路径不等价。
- 防止重构后玩家可见输出被误伤。
- 防止规则表调整造成核心样本偏移。

### 允许存在少量引擎 if

项目不是完全禁止 if。允许存在少量“引擎 if”，例如：

- `if value >= min && value <= max`：区间匹配。
- `if candidate.severityLevel > current.severityLevel`：选择更严重候选。
- `if rule.priority > current.priority`：更新反馈焦点。
- `if matchedRules.length === 0`：fallback。
- `if score < 0 / score > 100`：边界保护。
- `if missing profile`：记录 missingProfiles 或走安全兜底。
- `if old name input`：走 aliases / registry 兼容路径。

这些 if 是引擎控制逻辑，可以存在。需要警惕的是“内容 if”。

不应长期堆：

- `if 某个中文原料名 + 某个中文原料名`。
- `if 某个 flavor tag + 某个 flavor tag`。
- `if 某个具体原料比例超过固定值就固定输出`。
- `if 某个组合直接绑定固定文案`。
- `if 某个强身份材料和每一种材料分别写一条判断`。

具体味觉内容、质地事故、风味关系、反馈文案和类型识别，应优先进入 profile、summary、ingredient group、rule table、relation matrix、threshold config、feedbackTags 和 golden samples。

### taste / texture / flavor 的数据化方式

`taste` 层应描述基础味觉，例如酸、甜、苦、咸、涩、麻、辣、奶感、茶感、咖啡感等数值。这些数值汇总为 `tasteSummary`，再通过 `tasteAccidentRules` 判断 `acidOverload`、`sweetOverload`、`bitternessOverload` 等。长期不应写成“柠檬事故”或“某某原料事故”。

`texture` 层应描述物理结构，例如颗粒、粉体、泥糊、胶质、奶脂、沉积、吸管阻力、液体支撑和粗吸管需求等数值。这些数值汇总为 `textureSummary`，再通过 `textureAccidentRules` 判断吸不上来、混凝土感、粗吸管服务冲突、奶脂负担等。粗吸管需求是 signal，不是固定重事故结论。

`flavor` 层应描述风味家族、香气身份、料理感、甜品感、饮品适配、文化联想、强身份、争议度等权重。这些权重汇总为 `flavorSummary`，再通过 flavor relation matrix / `flavorConflictRules` 判断 `culinaryLeak`、`beverageFit`、`identityConflict`、强身份压制等。它不应写成“夏威夷风味 + 厚重蔬菜 = 低分”这种具体标签 if。

### flavor 层尤其要避免 if 地狱

`flavor` 层最容易变成 if 地狱，因为一杯饮品可能同时有很多风味标签。如果直接做标签两两组合，组合数量会快速爆炸。

规避方法：

- `flavorProfile` 使用带权重的 families / associations / identityStrength。
- `flavorSummary` 只保留 dominantFamilies top 2-3、强身份材料、beverageFit、culinaryLeak、dessertFit、refreshingFit、conflictPressure 等关键汇总指标。
- 低权重标签不直接参与事故，只用于文案润色。
- 用风味家族关系矩阵代替大量具体组合 if。
- 用规则表判断 conflictPressure 和 severity。
- analyzer 只负责遍历规则和计算命中，不写具体风味组合判断。

v0.0.6.x 的 flavor 工作应先准备 `flavorProfile` / `flavorSummary` / candidate 的结构，而不是急着把所有风味搭配写进代码。代码负责汇总和调度；数据负责风味家族关系、强身份材料、饮品适配、料理感 / 甜品感 / 蔬菜感阈值、风险标签和反馈标签。v0.0.6.x 可以先让 summary 和 candidate 形状稳定，v0.0.7.x 再集中调权重、阈值、severity 和 `scoreMultiplier`。

`flavorSummary` 第一版如果进入 runtime，应保持只读输出，不直接接管事故、饮品类型、评分或 feedback。最终判断应通过 relation matrix / rule table / candidate 层进入 `tasteJudge` 的调度，而不是把 `if 榴莲 + 咖啡`、`if 某 flavor tag + 某 flavor tag` 之类内容判断写进 analyzer。

数据来源上，`flavor` 层不应从玩家可见显示名、中文原料名或 UI category 直接推断风味身份。v0.0.6.7 已新增以 stable `ingredientId` 为主 key 的 `data/ingredientFlavorProfiles.js`，用于回答“风味身份是什么”；后续代码只负责读取这些 profile 并汇总 `flavorSummary`。现有 `ingredientTasteProfiles.js` 中的 `aromaImpact`、`weirdness`、`isStrongAroma`、`worksInFreshDrinks` 和 tags 可以作为过渡期辅助线索，但它们不是完整 `flavorProfile`；`ingredientTextureProfiles.js`、`combinationRules.js` 和 `synergyRules.js` 也只能提供结构、组合或 legacy 线索。v0.0.6.x 更稳的顺序是先建立 flavorProfile 数据地基，再接只读 `flavorSummary`；relation matrix / candidate 可以继续小步进入，系统性参数、阈值、标签和 severity 留到 v0.0.7.x 集中校准。

不是：

```text
if tropicalFruit + savoryVegetable，则事故
```

而是：

- tropicalFruit 与 savoryVegetable 的 family relation 为负。
- 如果 savoryPressure 较高、culinaryLeak 较高、beverageFit 较低。
- 则命中 `flavor_identity_conflict` 候选。
- severity 根据 conflictPressure / culinaryLeak 数据计算。

### ingredientGroupHelper 与数据化原则

后续可能新增 `ingredientGroupHelper`。它的意义不是新增一层复杂度，而是让 analyzer 不再直接关心“哪些中文原料属于 dairy / highFatDairy / strawResistance / clearLiquid / heavyFlavor”。

目标是让代码写：

- `sumIngredientGroup(context, "dairy")`
- `sumIngredientGroup(context, "highFatDairy")`
- `sumIngredientGroup(context, "strawResistance")`
- `sumIngredientGroup(context, "clearLiquid")`
- `sumIngredientGroup(context, "heavyFlavor")`

而不是到处写：

- `context.sumRatios(dairyNames)`
- `context.sumRatios(highFatDairyNames)`
- `context.sumRatios(strawResistanceNames)`

group 定义以后可以从中文 name 过渡到 `ingredientId` / refs / profile tag，而 analyzer 不需要关心底层如何变化。

但 `ingredientGroupHelper` 只能做 group key -> refs -> context 查询，不应承载味觉判断，不应判断“奶脂过载是否成立”。

### severity 数据化原则

事故 severity 也应数据化。三层 summary 命中事故候选后，应输出 `severityLevel` / `scoreMultiplier` / `feedbackTags`。

不要：

- 固定“命中某事故就归零”。
- 固定“某具体组合就是严重事故”。
- 固定“某服务冲突就是重大失败”。

要：

- 根据 summary 指标和规则表计算 severity。
- 低 severity warning 可以只小扣分或只影响文案。
- 高 severity 才进入重大事故。
- 好组合不能洗白高 severity 事故。

### 本节用途

本节用于指导后续 `ingredientGroupHelper`、`tasteSummary` / `textureSummary` / `flavorSummary`、`flavorProfile`、flavor relation matrix、`flavorConflictRules`、`severityConfig`、`feedbackTags` 和 golden samples 扩展。

它的目的，是避免未来维护者误以为“三层结构”就是把更多 if 分别塞进三个 analyzer。

## 事故优先级与事故严重度

三层 profile 确立后，事故判断不能继续只是“极端比例优先”。长期事故优先级仍建议为：

```text
硬性物理 / 服务参数事故 > 质地与可饮用性事故 > 基础味觉过载事故 > 风味身份冲突 > 普通冲突组合 > 好组合 / 协同 > 普通类型识别
```

但必须明确：事故优先级不等于事故严重度。

- 事故类型回答：这是什么问题？
- 事故优先级回答：先处理哪个问题？
- 事故严重度回答：扣多少分 / 是否归零 / 是重大失败还是轻微吐槽？

优先级只回答“先看哪类问题”。严重度回答“这个问题对最终分数和反馈语气影响多大”。不能因为一个问题属于高优先级类别，就自动判成重事故。

### 粗吸管需求冲突不是自动重事故

“热饮 + 粗吸管需求材料”可以属于服务方式与质地冲突，但不应自动视为致命事故。现实里存在热珍珠奶茶。合理比例下的热饮 + 珍珠，可能只是：

- 粗吸管喝热饮不太舒服。
- 大口吸入热饮有烫嘴风险。
- 服务方式略尴尬。
- 顾客或系统吐槽一句。

它不应该和“整杯水泥”“完全吸不上来”“热水 + 鸡蛋凝固”放在同一严重度。只有当大颗粒过量、液体支撑不足、吸管阻力过高、泥糊 / 粉糊 / 沉积严重、胶质 / 粘稠度过高，或热饮服务参数进一步放大问题时，才应升级为更严重事故。

```text
粗吸管需求是一种 texture / service signal，不是固定扣分结论。
```

### 事故严重度应数据化

事故严重度不应只用“轻微 / 中等 / 严重”这类标签。长期应数据化为可调参数，例如：

```text
severityLevel: 1-10
scoreMultiplier: 0.95-0.10
```

下面只是设计草案，不代表最终数值：

```text
severity 1：几乎只是吐槽，最终分数 × 0.95
severity 2：轻微问题，最终分数 × 0.90
severity 3：明显小瑕疵，最终分数 × 0.80
severity 4：体验受影响，最终分数 × 0.70
severity 5：中等事故，最终分数 × 0.60
severity 6：明显失败，最终分数 × 0.45
severity 7：严重失败，最终分数 × 0.30
severity 8：接近不可喝，最终分数 × 0.20
severity 9：基本崩坏，最终分数 × 0.15
severity 10：致命事故，最终分数 × 0.10
```

这类数值必须可调整，不应写死在巨大 if 里。更合适的落点是数据表、规则表或配置表。v0.0.5.x 只需要先保留结构方向；v0.0.6.x 可在三层 summary 地基中设计承载方式；系统性阈值、乘区和手感调优应放到 v0.0.7.x。

### 同一事故类型可以有不同 severity

同一类事故可以因为比例、温度、液体支撑和 texture summary 不同而有不同严重度。

热饮 + 合理珍珠更像轻微吐槽或小扣分：

```text
type: service_texture_conflict
detail: coarse_straw_hot_drink_warning
severityLevel: 1-2
scoreMultiplier: 0.95-0.90
```

热饮 + 大量珍珠 / 芋圆 / 椰果 + 液体不足，才是明显可饮用性问题：

```text
type: texture_drinkability_accident
detail: heavy_particle_load
severityLevel: 6-8
scoreMultiplier: 0.45-0.20
```

芋泥 / 奥利奥碎 / 抹茶粉 / 蜂蜜过量叠加时，severity 可能由这些 summary 指标共同决定：

- `solidLoad`
- `strawResistance`
- `pasteLoad`
- `powderLoad`
- `viscosity`
- `liquidSupport`
- `temperature`
- `coarseStrawNeed`

长期方向应是：

```text
profile → summary → accident candidate → severityLevel → scoreMultiplier / feedback tone
```

而不是：

```text
原料名 → 事故 → 固定归零
```

### 多事故同时出现时的未来原则

未来如果一杯饮品同时触发多个事故，不能简单让所有 multiplier 无限连乘，否则复杂饮品很容易全部被打成 0。长期可考虑：

- 主事故取最高 severity。
- 次要事故作为附加 penalty 或 feedback notes。
- 同类事故合并，不重复暴扣。
- 高优先级事故不一定重扣，但会优先决定反馈焦点。
- 好组合 / 协同不能洗白高 severity 事故。
- 低 severity warning 可以只影响文案或少量扣分。

这部分目前只记录原则，不在 v0.0.5.x 立刻实现。

## 这节文档的用途

这几节用于帮助新 ChatGPT / Codex / 未来维护者理解：

- 三层 profile 不是凭空加概念。
- 它来自具体问题：奥利奥、小料、柠檬、橙子 vs 西红柿。
- 不应把 taste / texture / flavor 当成机械字段。
- 事故优先级不等于严重度。
- 事故 severity 应数据化、可调参。
- 后续新增原料或规则时，应先判断问题属于哪一层，再决定数据和规则落点。

## 4. 三层 summary 原则

未来应逐步形成：

```text
tasteSummary
textureSummary
flavorSummary
```

它们分别来自：

- `tasteProfile`
- `textureProfile`
- `flavorProfile`

未来事故和组合判断应尽量来自 summary + 规则表，而不是从各处直接读原料名。

示意：

```text
原料 ingredientId
↓
tasteProfile / textureProfile / flavorProfile
↓
tasteSummary / textureSummary / flavorSummary
↓
tasteAccidentRules / textureAccidentRules / flavorConflictRules / identityRules / serviceParameterRules
↓
score / type / feedback
```

## 5. 新事故优先级

长期事故优先级不应简单写成“质感 > 味道 > 风味”。更完整的建议是：

```text
硬性物理 / 服务参数事故
>
质地与可饮用性事故
>
基础味觉过载事故
>
风味身份冲突
>
普通冲突组合
>
好组合 / 协同
>
普通类型识别
```

### 5.1 硬性物理 / 服务参数事故

最高优先级。

例如：

- 热水 + 鸡蛋：凝固
- 热气泡水：气泡失效
- 热奶盖：奶盖融化 / 结构破坏
- 热饮 + 粗吸管需求材料：服务方式冲突，粗吸管大口吸入热饮容易烫嘴
- 其他未来由温度、冰量、糖度、杯型、吸管等服务参数直接触发的物理事故

这类事故不是“好不好喝”，而是服务参数或物理条件直接破坏饮品成立方式。

### 5.2 质地与可饮用性事故

例如：

- 吸管阻力
- 粗吸管需求但服务参数不支持
- 半固体
- 糊化
- 沉积
- 胶质粘稠
- 液体支撑不足
- 大颗粒咀嚼负担
- 太硬
- 太粘
- 太稠
- 奶脂厚重到喝不下去

核心原则：

味道再好、风味再合理，如果这杯饮品吸不上来、糊化、沉积、胶质过重、粗吸管需求与服务方式冲突或液体支撑不足，就已经首先失去作为饮品的可饮用性。

### 5.3 基础味觉过载事故

例如：

- 酸度爆炸
- 甜腻爆炸
- 苦涩爆炸
- 咸味异常
- 麻辣不适配

这类事故来自 `tasteSummary`，不应永远绑定单个具体原料。

### 5.4 风味身份冲突

例如：

- 西红柿 + 牛奶：料理感 / 奶茶感冲突
- 蔬菜感 / 汤感 / 沙拉感进入甜奶茶体系
- 草本药感和甜品奶油冲突
- 某些强身份材料的文化联想冲突

这一层解决的是：酸甜苦不一定极端，质地也能喝，但人类知道它不是一个世界的味。

### 5.5 普通冲突组合

例如当前已有：

- 气泡水 + 淡奶油
- 气泡水 + 厚乳
- 芋泥 + 气泡水
- 柠檬 + 牛奶

后续其中一部分可能上移到 service / texture / taste / flavor 层；剩余普通搭配冲突留在这里。

### 5.6 好组合 / 协同

例如：

- 红茶 + 牛奶
- 气泡水 + 柠檬
- 乌龙茶 + 厚乳
- 草莓 + 淡奶油

好组合只能在前面没有重大事故时加分，不能洗白硬性事故、质地事故、味觉过载或风味身份冲突。

### 5.7 普通类型识别

最后才判断：

- 经典奶茶
- 清爽水果茶
- 甜品奶昔
- 咖啡特调
- 实验特调

普通类型识别不能覆盖事故。

## 6. 大事故类型下面可以继续细分

大事故类型只是优先级层级，不代表事故命名只能粗糙。每个大类下面可以继续有细分事故，用于更精准的规则、反馈和文案。

例如“质地与可饮用性事故”下面可细分：

- 吸管阻力事故
- 粗吸管需求冲突
- 糊化 / 混凝土事故
- 碎屑沉积事故
- 胶质粘稠事故
- 大颗粒咀嚼负担事故
- 太硬 / 太粘 / 太稠
- 软冻甜品杯化
- 奶脂负担 / 过腻

原则：

- 大类决定优先级。
- 小类决定具体事故名、反馈方向、文案和后续规则表。
- 细分事故也应优先来自 profile summary + 规则表，而不是单个原料 if。

## 7. legacy 规则迁移原则

当前某些规则仍是 legacy 或过渡层，例如：

- `accidentRules.js` 中的柠檬 / 榴莲旧事故表格化
- `accidentAnalyzer.js` 中仍可能存在旧质地 / 奶脂 / 小料 / 强风味判断
- 部分组合和类型判断仍依赖原料名或 UI category

后续不应继续机械迁移“某个原料事故”。应先判断旧逻辑属于哪一层：

- service 层：温度、冰量、杯型、吸管、冷热服务方式导致的硬性物理事故
- taste 层：酸度、甜腻、苦涩、咸味异常等
- texture 层：吸管阻力、粗吸管需求、糊化、沉积、胶质、奶脂负担、液体支撑不足等
- flavor 层：风味身份冲突、料理感、饮品适配、文化联想等
- identity 层：榴莲等少数强身份材料或未来特殊材料

legacy 逻辑可以暂存，但不能继续扩张。新增规则应优先进入三层 profile + summary + 规则表体系。

## 8. v0.0.5.x / v0.0.6.x / v0.0.7.x 阶段边界

一句话边界：

```text
v0.0.5.x 解决“系统里的东西是谁”。
v0.0.6.x 解决“这些东西如何被三层属性系统理解并汇总”。
v0.0.7.x 解决“判断得好不好、数值顺不顺”。
```

### 8.1 v0.0.5.x：现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基阶段

v0.0.5.x 的完成标准不是“三层属性 / summary 全部正式开工”，而是：

> 现有味觉实验室核心链路中，玩家可见显示文案基本不再承担系统主键职责。

这里的“现有核心链路”指已经参与判断 / 测试 / 保存 / 展示的对象，例如原料、原料组、事故规则、饮品类型规则、反馈标签边界、golden samples 断言和保存结果快照。它们应逐步进入 stable ID + `displayName` / `text` 双轨：现有系统逐步补 ID 并保留 legacy 兼容，未来新增系统从第一天就使用 stable ID。

v0.0.5.x 仍可继续做的候选事项包括：

- 显示文案主键残留只读盘点。
- `accidentTypeId` / `displayName` 双轨。
- golden samples 支持 `accidentTypeId` 断言。
- `drinkTypeId` / `displayName` 双轨。
- golden samples 支持 `drinkTypeId` 断言。
- `audienceId` / `customerTypeId` 双轨。
- `proportionSegmentRules` refs 迁移。
- `combinationRules` refs 迁移。
- `drinkTypeRules` refs 小批迁移。
- `feedbackTag` / 文案池边界复查。
- 保存结果 / 历史 result 快照边界复查。
- ID 化收口审计。

这些是路线候选，不是已经完成的事项，也不是固定不可变版本清单。每一刀仍应小、可回归、可冻结。

v0.0.5.x 不等于：

- 全项目所有未来系统都必须现在建 ID。
- 现在就做完整顾客系统、家具系统、事件系统、成就系统。
- 现在就做完整本地化系统。
- 现在就做完整三层 summary。
- 现在就做完整 severity 系统。

不要把 stable ID 原则误解为“为未来还不存在的系统提前造空架子”。顾客、试喝员、事件、成就、图鉴、经营报表、本地化等系统进入真实实现范围时，应出生即 ID 化；但 v0.0.5.x 不为它们提前创建空表或空模块。

### 8.2 v0.0.6.x：三层属性 / profile / summary 地基阶段

v0.0.6.x 才正式进入三层属性 / profile / summary 系统。

核心目标：

- 在 stable ID 地基上正式推进 `tasteProfile` / `textureProfile` / `flavorProfile`。
- 建立 `tasteSummary` / `textureSummary` / `flavorSummary`。
- 让事故候选、类型候选、反馈标签逐步来自 summary + 规则表 / 关系矩阵 / 阈值表。
- 防止三层结构变成三层 if。
- 初期仍不以大规模数值调优为目标。

三层属性 / summary 的数据化原则不变：代码负责“怎么汇总 / 调度”，数据负责“判什么”，测试负责“别判歪”。summary 是中间理解地基，不是把旧中文 name if 换一个文件名继续堆。

### 8.3 v0.0.7.x：severity / 数值调优 / golden samples 扩容阶段

v0.0.7.x 在三层 summary 基础上再推进 severity 和系统性调参。

核心目标：

- 推进 `severityLevel` / `scoreMultiplier`。
- 扩充 golden samples 和边界样本。
- 系统性调整权重、阈值、评分区间、反馈命中和事故严重度。
- 有意识更新 golden expected，而不是偷偷放宽断言。

总结：

```text
v0.0.5.x 先确定身份；
v0.0.6.x 再建立判定；
v0.0.7.x 再调手感和数值。
```

## Golden samples 的定位与可调整原则

golden samples 不是最终味觉真理；golden samples 是当前阶段的安全网。安全网可以换，但不能施工时突然剪断。

在 v0.0.5.x 重构期，golden samples 的主要职责是防止已有行为无意识漂移：改 ingredientId、profile、rule engine、summary 或保存结构时，必须能看见是否把既有结果撞歪了。

进入数值调优阶段后，golden samples 的 `expected` 可以有意识地更新，包括 `score`、`type`、`feedback`、`audience`、`attr` 等字段。更新 expected 必须有明确版本目的，例如数值调优、三层 summary 接入、severity 系统调整或反馈文案重构。

不能为了让测试通过而随手放宽断言，也不能在没有说明版本目的的情况下偷改 expected。测试样本可以迭代，但每次迭代都要说明是在“调安全网”，不是在掩盖回归。

ID 等价样本的核心不是永久锁死某个分数，而是锁死“name 输入和 ingredientId 输入结果一致”。如果对应 name 样本未来从 74 调成 80，则 ID 等价样本也应同步调成 80。

当前 samples 可以理解为几类：

- `structural`：结构保护，例如系统不应崩、事故不应被洗白。
- `id_equivalence`：name / ingredientId 输入路径等价。
- `behavior_boundary`：极端边界行为保护，例如高酸、吸不上来、奶脂过载。
- `tuning`：未来数值调参样本，可在调参版本中有意识更新。

## 9. 测试分级规则

测试强度应和改动风险匹配。不是每次 candidate 前都必须做真实 UI smoke test；但如果修改了核心试喝链路、浏览器运行时脚本加载、UI 事件或保存结构，就必须提高验证等级。

### A. 文件级 / Node runtime 检查

适用：

- 只改 docs。
- 只改纯数据表，且不影响页面加载。
- 只新增不参与运行逻辑的只读数据。
- 不改 UI。
- 不改事件。
- 不改核心 context / judge。

常规检查：

- `git status`
- `node --check`
- `node scripts/runGoldenSamples.js`
- 必要的 registry / profile / context 临时 Node 自检
- 页面版本号文件级检查

### B. 无头 Chrome 页面加载检查

适用：

- 新增或调整页面运行时脚本加载。
- 新增 `core/*` helper 并挂到 `window`。
- 修改 `index.html` 脚本顺序。
- 修改会影响浏览器全局对象的文件。
- 修改 `tasteContext` / `tasteJudge` / 核心 analyzer，但不一定改 UI 交互。

检查：

- 页面能打开。
- console 无业务 JS 错误。
- 关键 `window` 对象存在。
- 页面版本号正确。
- 原料按钮等基础区域能渲染。

说明：

- `/favicon.ico` 404 可记录为非阻塞。
- 无头 Chrome 是真实浏览器环境，但不等于真实 UI 交互测试。

### C. 真实 UI smoke test

适用：

- 改 UI。
- 改按钮 / 事件绑定。
- 改比例条。
- 改保存配方。
- 改清空杯子。
- 改页面渲染。
- 改 `tasteContext` / `tasteJudge` 等核心试喝链路，且需要更高信心。
- candidate 前需要确认主流程可用。

检查：

- 通过真实点击 / 输入 / DOM 事件操作。
- 至少覆盖经典奶茶、一个事故样本、清空杯子。
- 必要时覆盖保存配方 / 查看已保存配方。

### D. 不需要每次都真实 UI 测

建议规则：

- 只改 docs：不需要 golden，除非为了安心可跑；不需要浏览器。
- 只改 data 且不影响加载：golden + 数据完整性检查通常足够。
- 新增 runtime 脚本 / 修改脚本加载：至少做无头 Chrome 页面加载检查。
- 修改核心 context / tasteJudge / UI 交互：做无头 Chrome + 轻量 UI smoke test。
- 修改保存配方 / UI 事件 / 比例条：必须做真实 UI smoke test。

### E. 诚实报告原则

如果没有做真实浏览器 / 真实 UI 操作，报告中必须明确说没有做，不能把 Node runtime 或直接调用 `evaluateCup(cup)` 包装成“真实 UI 验收”。验收失败或自动化不可靠时，应如实报告失败点和不可靠范围。
