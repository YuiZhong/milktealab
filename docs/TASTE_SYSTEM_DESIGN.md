# Taste System Design

本文档记录《奶茶实验室》味觉系统的长期设计边界，用来防止后续改动把规则越改越散。

## 1. 核心原则

味觉系统不是简单的“命中组合就加分”。

当前长期规则是：

```text
极端比例事故 > 质地事故（奶脂过载 / 吸管阻力） > 冲突组合 > 正常好组合 > 普通分类
```

严重翻车必须优先判断。好组合只能加分，不能覆盖事故。

例如：

- `绿茶 1 + 气泡水 1 + 柠檬 98` 必须是酸度事故，不能被洗成清爽水果茶。
- `厚乳 70 + 淡奶油 20 + 植脂奶 10` 必须优先考虑奶脂过载。
- `芋泥 45 + 奥利奥碎 32 + 珍珠 16` 必须优先考虑吸管阻力事故。

## 2. v0.0.5.0 数据化地基

v0.0.5.0 的目标是建立味觉系统数据化地基，不是玩法更新，也不追求评分明显变化。

本轮新增 / 整理的地基：

- `data/ingredientTasteProfiles.js`：原料味觉属性库地基。
- `data/combinationRules.js`：好组合、冲突组合、多原料组合关系表。
- `core/tasteContext.js`：配方上下文与比例查询。
- `core/ingredientAnalyzer.js`：基础原料属性分析。
- `core/proportionAnalyzer.js`：比例分段分析。
- `core/accidentAnalyzer.js`：极端比例、奶脂过载、吸管阻力等事故分析。
- `core/combinationAnalyzer.js`：组合协同 / 冲突分析。
- `core/drinkTypeAnalyzer.js`：花果茶泛化、饮品类型和客群识别。
- `core/tasteJudge.js`：保留为总调度，不继续承担所有细节。

当前策略：

- 先迁移结构，尽量保持现有输出稳定。
- 原料味觉属性库暂时不直接重调所有分数，避免 v0.0.5.0 变成隐性味觉大改。
- 新增味觉规则时，优先放入数据表或 analyzer，不优先往 `tasteJudge.js` 里追加具体配方 if。
- 必要的输出变化必须写清楚原因，并用回归样本验证。

## 3. v0.0.5.x 后续治理策略

v0.0.5.x 前几个版本应优先继续治理味觉系统代码结构和规则数据化，不急着调数值 / 调味觉表现。

原因：味觉系统一旦开始大规模调数值，信息量会迅速膨胀；如果底层 analyzer、反馈、饮品类型、比例段、事故规则仍然靠大量 if / else 堆叠，后续再修会进入地狱模式。

后续 v0.0.5.x 优先治理：

1. `drinkTypeAnalyzer.js` 的饮品类型识别数据化。
2. `feedbackEngine.js` 的反馈标签化 / 文案池规则化。
3. `proportionAnalyzer.js` 的比例段规则表。
4. `accidentAnalyzer.js` 的事故规则表。
5. 金标样本 / 回归样本地基。

在这些结构稳定前，不要开始大规模调味觉数值。

当前阶段边界已进一步收口：v0.0.5.x 优先保证现有对象身份稳定，解决玩家可见显示文案不再长期承担系统主键的问题；ID 化完成前，不急着启动完整三层 summary。事故类型、饮品类型、受众类型、反馈标签、规则引用和 golden samples 断言都应逐步走 stable ID + `displayName` / `text` 双轨。三层 profile / summary 正式开工放到 v0.0.6.x；数值调优和 severity 放到 v0.0.7.x 更合适。

### v0.0.5.1 饮品类型识别数据化

v0.0.5.1 的目标是把饮品类型识别从 `drinkTypeAnalyzer.js` 的连续手写 if，迁移为“饮品类型规则表 + 通用匹配器”。

本轮新增 / 调整：

- `data/drinkTypeRules.js`：饮品类型规则表，按优先级描述当前主要类型的触发条件。
- `core/drinkTypeAnalyzer.js`：保留为规则执行器，负责读取规则表、按顺序匹配、返回第一个命中的类型，并保留默认兜底类型。

长期规则：

- 普通新增饮品类型以后应优先加到 `drinkTypeRules.js`，不要继续往 `drinkTypeAnalyzer.js` 里堆新的 if。
- 事故类类型优先级必须高于普通类型，例如口感事故、奶脂过载、猎奇实验品不应被经典奶茶、咖啡特调、果味特调覆盖。
- `analyzeFruitTeaBlend` 暂时保留在 `drinkTypeAnalyzer.js`，因为多水果茶 / 花果茶泛化识别比普通类型规则更复杂，强行迁移可能影响输出稳定。
- audience 识别暂时保留在 `drinkTypeAnalyzer.js`，后续可继续数据化。

### v0.0.5.2 反馈系统标签化

v0.0.5.2 的目标是把反馈系统从“逻辑里直接写台词”，逐步整理为“反馈标签 + 文案池 + 反馈选择器”。

本轮新增 / 调整：

- `data/feedbackTexts.js`：在现有文案池基础上增加反馈标签到文案池的映射。
- `core/feedbackEngine.js`：开始作为反馈选择器，负责根据属性、分数、事故状态和优先 notes 推导少量反馈标签，再从文案池中选择候选句。

长期规则：

- 反馈文案应优先放进文案池，不要继续散落在 `feedbackEngine.js` 的条件判断里。
- 同类事故可以对应多句候选反馈，例如吸管阻力、奶脂过载、酸度事故、气泡冲突等。
- `feedbackEngine.js` 可以保留少量中枢判断，用于标签提取、优先级和去重；不要让它变成新的巨型垃圾桶。
- 后续多试喝员、顾客评价、隐藏配方专属反馈都应基于标签系统扩展，而不是各自重新判断味觉。
- 本轮不新增试喝员，不新增大量文案，不调反馈风格，不改变评分或饮品类型。

### v0.0.5.3 饮品结构分析地基

v0.0.5.3 的目标是新增 `drinkStructureAnalyzer.js` 作为后台派生层，用统一入口计算液体骨架、风味层、质地层、调味层、固体负载、可饮用性、吸管阻力和质地平衡。它不替代配方原始数据，不直接等同玩家命名、饮品家族或配方版本标签，也不在本轮直接改变评分、反馈、事故触发或 UI 展示。后续质地事故、吸管阻力判断和可解释反馈可以逐步读取这层结构结果，避免继续在多个 analyzer 里重复判断同一类物理口感问题。

### v0.0.5.4 结构事故规则表地基

v0.0.5.4 的目标是让 `drinkStructureAnalyzer.js` 产出的结构事实，开始通过 `data/structureAccidentRules.js` 和 `core/structureAccidentRuleEngine.js` 参与口感事故判断。`structureAccidentRules` 只描述结构事故条件，`structureAccidentRuleEngine` 负责通用规则匹配，`accidentAnalyzer.js` 只调用和汇总结果，不继续堆具体结构事故 if。这是事故规则表化的第一刀，当前只处理质地、吸管阻力、半固体和可饮用性方向。

### v0.0.5.5 比例段规则表地基

v0.0.5.5 的目标是新增 `data/proportionSegmentRules.js` 和 `core/proportionSegmentRuleEngine.js`，让比例段逻辑开始进入规则表。比例段规则应描述原料、比例区间、分数变化、属性加成、说明文案和标签；`proportionSegmentRuleEngine` 负责通用区间匹配和少量通用上下文条件判断；`proportionAnalyzer.js` 只负责调度规则执行器，并保留尚未迁移的旧比例逻辑。

后续新增比例规则应优先进入 `data/proportionSegmentRules.js` 或同类规则表，不要直接写进 `proportionAnalyzer.js`。本轮只迁移柠檬和榴莲两类强风味原料的比例段，不迁完整比例系统，不调味觉数值，不改变事故优先级。

### v0.0.5.6 金标样本 / 回归样本地基

v0.0.5.6 的目标是建立 `data/goldenSamples.js` 和 `scripts/runGoldenSamples.js`，把代表性配方固化为轻量回归安全网。金标样本用于确认规则迁移前后“正常不误伤、事故不洗白、强风味边界稳定”，不是隐藏配方识别，也不是固定款图鉴或玩家可见玩法。

后续拆分 `accidentAnalyzer.js`、`feedbackEngine.js`、`drinkTypeAnalyzer.js` 或继续迁移比例 / 事故规则前，应先运行金标样本脚本，确认当前稳定判断没有被重构破坏。样本预期应优先使用类型关键词、禁用类型、分数区间和反馈关键词，不应硬匹配随机反馈全文。

### v0.0.5.7 旧事故规则小范围表格化

v0.0.5.7 的目标是新增 `data/accidentRules.js` 和 `core/accidentRuleEngine.js`，让 `accidentAnalyzer.js` 开始从具体事故判断逐步转为事故调度器。本轮只迁移柠檬 / 榴莲两类单原料极端事故，保持原有阈值、评分、属性加成、事故类型和文案候选稳定。

后续迁移事故规则应继续小步进行，优先选择有 golden samples 保护、条件清晰、和其他事故优先级耦合较低的规则。奶脂过载、工业奶茶、综合吸管阻力、芋泥、奥利奥、小料循环和强风味泛化事故不应一次性全拆；尤其是奶脂与吸管阻力分别代表“喝得动但负担重”和“物理意义上难喝到”，需要保持边界清楚。

### v0.0.5.8 事故迁移前置样本补强

v0.0.5.8 的目标是在继续迁移旧事故规则前补强 golden samples。本轮新增高柠檬酸度事故、高榴莲猎奇事故和奥利奥碎过量口感事故样本，用于保护后续可能迁移的单原料事故边界。

golden samples 是回归保护，不是隐藏配方或图鉴。当前样本中的 type 断言用于保护现阶段玩家可见输出稳定，不代表玩家可见名称已经定稿；后续如果拆分内部 tags、机制类型和前台文案，应同步更新 golden samples。本轮暂不加入咖啡 / 抹茶 / 可可等强风味过量样本，避免把可能成立的浓郁款过早固化为事故。

### v0.0.5.9 原料物理属性地基

v0.0.5.9 的目标是在 `tasteProfile` 之外新增 `textureProfile`。`tasteProfile` 描述风味，`textureProfile` 描述物理形态、固体负载、吸管阻力、糊化风险、液体支撑需求、奶脂负担等材质事实。原料判断不应只依赖 UI category；小料、乳类、水果、风味材料都可能贡献 textureProfile。

吸管阻力和质地事故未来应来自 textureProfile，而不是来自“是否属于小料”。奥利奥、芋泥、珍珠、布丁、奶盖、榴莲等材料的事故机制不同：碎屑沉积、泥糊、粗颗粒、软冻、顶层奶脂和果肉压迫不应被简单归为同一种“小料事故”。本轮只建立数据表和只读分析器，不改变味觉输出；后续质地事故 / 小料事故 / 吸管阻力事故应基于 textureProfile 继续规则表化。

长期看，原料数据化应逐步拆成三层 profile，而不是只依赖 UI 分类或单一味觉数值：

1. `tasteProfile`：基础味觉。描述酸、甜、苦、奶、涩、清爽、厚重、香气强度等，回答“它尝起来的基础味道是什么？”
2. `textureProfile`：物理质地。描述液体、粉体、泥糊、胶质、颗粒、泡沫、固体负载、吸管阻力、糊化风险、沉积感、液体支撑需求、奶脂负担等，回答“它在杯子里的物理状态是什么？”
3. `flavorProfile`：风味身份 / 香气身份。描述柑橘、热带水果、蔬菜感、甜品感、茶感、咖啡感、料理感、草本感、坚果感等风味家族、香气联想和饮品适配，回答“它像什么食物 / 饮品 / 风味家族？”

例如，橙子和西红柿可能在酸甜度和果肉质地上接近，但 `flavorProfile` 完全不同。橙子属于柑橘水果和饮品友好风味，西红柿则带有蔬菜、料理、鲜味和沙拉 / 汤感联想。因此未来风味组合、冲突判断、隐藏配方、客群偏好和反馈文案，不应只依赖酸甜苦等基础数值，也应参考 `flavorProfile`。

后续事故和组合判断应尽量来自属性维度与规则表：基础味觉事故来自 taste summary，物理质地事故来自 texture summary，风味搭配与冲突来自 flavor summary。不要把大量具体原料判断写成单个原料 if，也不要只根据 UI 分类判断吸管阻力、奶脂过载或风味冲突。

原料不能长期只依赖玩家可见显示名作为系统主键。后续应逐步引入稳定 `ingredientId`：系统规则、`tasteProfile`、`textureProfile`、`flavorProfile`、组合规则、事故规则、golden samples 和未来存档，应尽量引用 `ingredientId`，而不是玩家可见 `name`。`name` 负责显示，`aliases` 负责旧名、别名、搜索和文案兼容。改显示名不应导致规则、profile、存档或测试失效。

同一原则也适用于味觉系统输出的事故类型、饮品类型、结果兜底类型、反馈标签、客群标签等玩家可见文本。中文名称只是当前最常见的显示文案，不是系统身份；英文、日文或任何未来可能改名 / 本地化的 label 也一样不应当主键。后续事故、饮品类型、结果兜底类型、客群和图鉴相关结构应逐步采用 ID / `displayName` 双轨。golden samples 后续也应支持 ID 断言，而不是只依赖中文 `typeIncludes`。

未来原料基础数据可逐步采用类似结构：`{ id: "topping_oreo_crumble", name: "奥利奥碎", aliases: ["奥利奥", "可可饼干碎", "饼干碎"], category: "小料" }`。如果对外显示名以后改为“可可饼干碎”，系统内部仍应使用稳定的 `topping_oreo_crumble`。推荐使用可读字符串 ID，例如 `fruit_lemon`、`fruit_durian`、`topping_pearl`、`topping_oreo_crumble`、`dairy_milk`、`dairy_thick_milk`、`tea_black`、`tea_green`、`sweetener_honey`；不建议长期使用纯数字作为早期规则主键，因为规则表和测试样本需要可读性。

长期应逐步从 `{ name: "柠檬", ratio: 20 }` 迁移为 `{ ingredientId: "fruit_lemon", ratio: 20 }`。过渡期可以同时保留 `{ ingredientId: "fruit_lemon", name: "柠檬", ratio: 20 }`：运行时判断优先使用 `ingredientId`，UI 显示使用 `name`，搜索和旧数据兼容使用 `aliases`，存档尽量保存 `ingredientId`。正式引入 `ingredientId` 前应先做只读评估，再小步迁移，避免一次性重写全项目。

v0.0.5.10 开始在原料基础数据上落地 stable ingredientId 字段，但运行逻辑仍保持 `name` 兼容，后续再逐步迁移 profile、rules、context、golden samples 和存档。

v0.0.5.11 新增 ingredientRegistry 查询 helper，为后续 context / profile / rules / golden samples 从中文 `name` 迁移到 stable `ingredientId` 提供基础设施；本轮运行逻辑仍保持 `name` 兼容。

v0.0.5.12 开始让 `tasteContext` 支持 `name` / `ingredientId` 双轨引用，但旧 `name` 逻辑仍保持兼容，后续再逐步迁移 profile、rules、golden samples 和存档。

v0.0.5.13 开始让 `tasteProfile` / `textureProfile` 查询入口支持 `ingredientId` / alias / object ref，但 profile 数据表仍保持中文 key，后续再逐步迁移 rules、golden samples 和存档。

v0.0.5.14 新增 `ruleRefHelper`，并让 `accidentRuleEngine` 支持 ingredientId / name / alias / object ref；规则表仍保持旧 name 兼容，后续再逐步迁移其他 rule engine。

v0.0.5.15 让 golden samples 安全网开始覆盖 ingredientId 输入路径；旧 name 样本仍保持兼容，现有样本不批量迁移。

v0.0.5.16 让 proportionSegmentRuleEngine 支持 ingredientId / name / alias / object ref；比例段规则表仍保持旧 name 兼容，后续再逐步迁移规则数据。

v0.0.5.17 让 combinationAnalyzer 支持 ingredientId / name / alias / object ref；组合规则表仍保持旧 names 兼容，后续再逐步迁移规则数据。

v0.0.5.18 新增 ingredientGroupHelper，作为共享原料组的统一查询入口；analyzer 不再直接关心 dairy / highFatDairy / strawResistance / clearLiquid / heavyFlavor 的底层数组形态，后续可逐步从中文 name 迁移到 ingredientId / refs / profile tag。

v0.0.5.19 让 drinkType rules 执行入口支持 ingredientId / name / alias / object ref；drinkTypeRules 数据表仍保持旧中文字段兼容，analyzeFruitTeaBlend 与 audience 的本地中文逻辑留待后续小步治理。

v0.0.5.20 让浏览器保存配方结构进入 name / ingredientId 双轨：新保存写入 ingredientId + name，旧 name-only / alias / ID-only 存档载入时通过 registry 即时补齐；本轮不做复杂迁移或正式存档系统。

### 保存 result / 历史快照边界

保存配方里的 `result` 是当次试喝报告的历史展示快照。中文 `type`、`audience`、`feedback` 可以作为当时玩家看到的展示内容保存，用来复原历史报告和保存列表，但不应作为未来统计、图鉴、顾客偏好或经营报表的系统判断依据。

未来机制层读取保存结果时，应优先依赖结构化 ID 字段，例如 `accidentTypeId`、`drinkTypeId`、`audienceIds`、`feedbackTags`。如果某些未来机制需要更细的组合、图鉴或配方家族身份，应新增稳定 ID，而不是反推中文展示文案。

玩家未来自定义饮品名应作为 `customName` / `title` 等显示名进入正式存档，但不应替代 `recipeId`、`drinkTypeId`、`recipeFamilyId` 或 `recipeVersionId`。当前阶段不实现正式存档系统，不批量迁移旧 localStorage，只保持读取和渲染兼容。

v0.0.5.21 补强 golden samples 的 ingredientId 路径覆盖：新增若干 ID 等价样本，但旧 name 样本保留，不批量迁移，继续作为规则数据迁移前的安全网。

v0.0.5.21 后明确 golden samples 的定位：它们是重构期回归安全网，不是永久数值圣经；后续数值调优、三层 summary 和 severity 接入时可以有意识更新 expected，但 ID 等价样本应始终保持 name 与 ingredientId 路径输出一致。

### v0.0.5.x final 收口

截至 v0.0.5.40 docs 收口，v0.0.5.x 已基本把现有结果身份、规则引用和保存边界推进到 stable ID / display text 双轨：原料有 `ingredientId`，规则表具备 refs / `ingredientIds` 主路径，结果暴露 `accidentTypeId`、`drinkTypeId`、`audienceIds`、`outcomeTypeId`、`feedbackTags`，golden runner 支持对应 ID 断言，保存的 `result` 也已定义为历史展示快照。

v0.0.6.x 可以开始设计 `tasteSummary` / `textureSummary` / `flavorSummary`，把现有 ID 地基转化为三层属性输入。profile 表仍以 canonical name 作为 key、部分 category label 仍承担分类语义、少量 feedback / outcome fallback 仍保留 legacy 显示文案路径，这些遗留项不建议在 v0.0.5.x 末尾硬拆；更适合在 v0.0.6.x profile / summary 阶段自然收口。

### v0.0.6.x summary schema 预留

v0.0.6.x 的重点应是“三层属性 / 三层 profile / 三层 summary”，而不是把 taste / texture / flavor 误写成三个最终判定优先级。三层属性用于形成饮品的中间理解层；事故优先级、severity、score、反馈、经营成本等后续系统再基于 summary 做判定。

`tasteSummary` / `textureSummary` / `flavorSummary` 的细分项应允许增删。字段、类别、阈值、说明和权重不应写死在 analyzer if 中；初期可以先定义 schema、默认值和 evidence 结构，等 golden 与实际手感稳定后再调参。

profile / summary / rule / candidate 后续应允许携带 `metadata`、`weights`、`thresholds`、`evidence`、`sourceLayer`、`priorityBand`、`severityHint` 等字段。默认权重可以先不启用；完整 `severity`、`scoreMultiplier`、大规模数值调优和 golden 扩容应放到 v0.0.7.x。

不只原料需要 profile。组合规则、事故规则、反馈规则、结果候选也应逐步有结构化 metadata，用来表达触发来源、触发指标、阈值、反馈标签、结果 ID、优先级区间和严重度提示。数据负责描述“判什么”，代码负责“怎么汇总 / 调度”。

## 4. v0.0.6.0 三层属性 / profile / summary schema 正本

v0.0.6.x 的设计核心是“三层属性 / 三层 profile / 三层 summary”，不是简单的“三层判定”。`tasteProfile` / `textureProfile` / `flavorProfile` 描述原料、规则或候选的结构化属性；`tasteSummary` / `textureSummary` / `flavorSummary` 汇总一杯饮品的中间理解结果；最终事故、类型、反馈、severity、score、经营成本和顾客偏好，都应在 summary 之后由 candidate / rule / 调度层决定。

v0.0.6.0 不追求立刻调好味觉数值，也不立刻实现完整 severity / `scoreMultiplier` / flavor relation matrix。它应先把容器、字段语义、扩展点和迁移边界写清楚，让后续实现可以小步接入。

### 4.1 summary 通用结构

三层 summary 都应采用可扩展容器，而不是固定死字段：

```js
{
  values: {},
  tags: [],
  risks: [],
  evidence: [],
  metadata: {}
}
```

字段含义：

- `values`：可扩展数值指标，例如 `acidity`、`solidLoad`、`flavorIntensity`。
- `tags`：结构化标签，例如 `high_solid_load`、`requires_thick_straw`。
- `risks`：风险信号，例如 `straw_resistance_risk`、`acid_overload_risk`。
- `evidence`：为什么得到该值、标签或风险。
- `metadata`：预留版本、权重、阈值、调参说明和来源信息。

这些字段是容器约定，不是封闭 schema。后续可以新增 / 删除具体指标，不应让 analyzer 代码依赖某个永远固定的字段全集。

### 4.2 tasteSummary：基础味觉

`tasteSummary` 负责基础味觉，不负责风味身份。它回答：

```text
甜不甜、酸不酸、茶感够不够、奶感重不重，基础味觉有没有失衡？
```

初始指标方向可包括：

- `sweetness`
- `acidity`
- `bitterness`
- `astringency`
- `teaStrength`
- `milkiness`
- `creaminess`
- `coffeeRoast`
- `freshness`
- `cloyingRisk`
- `acidSharpness`
- `tasteBalance`

`tasteSummary` 应逐步接管酸爆、甜腻、奶脂压力、茶感失衡等基础味觉问题。柠檬过量未来应逐步泛化为 `acid_overload` 这一类 taste 层风险，而不是长期保留柠檬专属 if。

### 4.3 textureSummary：物理质地和可饮用性

`textureSummary` 负责物理质地、液体支撑和可饮用性。它回答：

```text
这杯能不能顺利喝到？是液体、糊状、半固体，还是吸管阻力过高？
```

初始指标方向可包括：

- `solidLoad`
- `strawResistance`
- `drinkability`
- `viscosity`
- `liquidSupport`
- `fatLoad`
- `sedimentRisk`
- `gelLoad`
- `powderiness`
- `chewiness`
- `mouthCoating`
- `flowDifficulty`

明确预留可扩展指标示例：

- `thickStrawNeed`
- `chewDensity`
- `foamLoad`
- `settlingRisk`
- `layeringStability`

`thickStrawNeed` 现在不一定实现，但 schema 必须允许未来自然加字段。奥利奥、芋泥、珍珠、椰果、仙草、蜂蜜、奶盖、粉类等材料主要影响 textureSummary。不要用“原料数量超过 N 直接事故”这类硬 if 取代 textureSummary。

### 4.4 flavorSummary：风味身份 / 香气身份

`flavorSummary` 负责风味身份、香气身份和搭配语义。它回答：

```text
这杯像什么风味家族？主风味是谁？风味身份是否冲突？
```

初始指标方向可包括：

- `primaryFlavorIds`
- `flavorFamilies`
- `flavorIntensity`
- `aromaPressure`
- `beverageFit`
- `dessertFit`
- `savoryRisk`
- `noveltyRisk`
- `identityConflictRisk`
- `dominantFlavor`
- `supportingFlavors`

其中 `primaryFlavorIds`、`flavorFamilies`、`dominantFlavor` 和 `supportingFlavors` 更偏身份索引，`flavorIntensity`、`aromaPressure`、`beverageFit`、`dessertFit`、`savoryRisk`、`noveltyRisk`、`identityConflictRisk` 更偏数值指标。第一版 runtime 不必一次实现全部字段，也不应把这些字段锁成永久全集；字段可以随 profile 和 golden 安全网逐步增删。

`flavorSummary.tags` 可表达风味家族、主导风味、强身份材料、饮品适配度、料理感 / 蔬菜感 / 甜品感、争议风味压力和风味身份冲突方向。例如：

- `fruit_family`
- `tea_aroma`
- `dessert_family`
- `dominant:durian`
- `strong_identity`
- `controversial_aroma`
- `beverage_friendly`
- `culinary_signal`
- `vegetable_signal`

`flavorSummary.risks` 可表达候选风险信号，例如：

- `aroma_pressure_risk`
- `savory_leak_risk`
- `novelty_pressure_risk`
- `identity_conflict_risk`
- `low_beverage_fit_risk`

`flavorSummary` 用来区分“酸甜相近但风味身份不同”的原料，例如橙子 vs 西红柿。榴莲、咖啡、茶香、甜品感、蔬菜感、料理感、热带水果等都属于 flavor identity 问题。flavor 层最容易形成 if 地狱，后续应走 `flavorProfile` -> `flavorSummary` -> relation rules / matrix，而不是在 analyzer 里继续写标签组合 if。

`flavorSummary` 仍然是中间理解层，不是最终判定层。它不直接决定事故、饮品类型、评分或反馈；初版 runtime 可以先只读输出 `flavorSummary`，不接管最终结果。后续要判断“榴莲 + 咖啡”“茶香 + 蔬菜感”“甜品粉体 + 水果酸”等关系时，应由 relation matrix、规则表或 candidate 层读取 `flavorSummary` 后再进入最终调度。

`flavorSummary.evidence` 应优先记录每个风味指标来自哪里，例如：

```js
{
  metric: "aromaPressure",
  sourceLayer: "flavor",
  sourceType: "ingredient",
  sourceId: "fruit_durian",
  ratio: 30,
  contribution: 18
}
```

`flavorSummary.metadata` 至少应预留：

```js
{
  schemaVersion: "flavorSummary.v0.0.6.x",
  sourceLayer: "flavor",
  weightsEnabled: false,
  readonly: true
}
```

#### flavorProfile / flavorSummary 数据来源边界

v0.0.6.7 新增 `data/ingredientFlavorProfiles.js`，作为第一版轻量 `flavorProfile` 数据地基。该数据表以 stable `ingredientId` 为主 key，为当前已有原料提供 `flavorFamilies`、`aromaTags`、`identityTags`、饮品 / 甜品适配、料理感风险、争议风险、身份强度、香气压迫感和主导潜力等只读描述。

`flavorProfile` 是后续 `flavorSummary` 的数据来源，不是最终判定层。本轮只新增数据地基，不接入 runtime，不影响评分、事故、饮品类型、feedback 或 `result.type`。中文 displayName 只用于展示和 legacy 可读辅助，不作为 flavor 系统身份，也不能用来反推风味身份。

现有 `ingredients.js` 已提供稳定 `ingredientId`、显示名和 UI category，但 `category: "水果/风味"` 只能辅助 UI 分组，不能作为风味身份主来源；`name` / 中文显示名也不能用来反推系统身份。

现有 `ingredientTasteProfiles.js` 可临时提供少量辅助线索，例如 `aromaImpact`、`weirdness`、`isStrongAroma`、`worksInFreshDrinks` 和少量 tags，但这些字段本质上混合了基础味觉、香气压力、清爽适配和 legacy 风险标记，不足以支撑完整 `flavorSummary`。`ingredientTextureProfiles.js` 主要服务物理质地，不能被当作风味身份来源。`combinationRules.js` 和 `synergyRules.js` 记录的是组合结果、共享组或 legacy 规则线索，不应被反向挖成原料风味真相。

后续若实现 `flavorSummary` runtime，应优先读取 `data/ingredientFlavorProfiles.js`，以稳定 `ingredientId` 为主引用，显示名只用于展示和 legacy fallback。当前 profile 保持克制，例如：

```js
{
  ingredientId: "fruit_durian",
  flavorFamilies: ["tropical_fruit"],
  aromaTags: ["durian_aroma", "fermented_sweet"],
  identityTags: ["strong_identity", "controversial"],
  beverageFit: 30,
  dessertFit: 60,
  savoryRisk: 10,
  noveltyRisk: 80,
  identityStrength: 90,
  aromaPressure: 85,
  dominantPotential: 90,
  pairHints: [
    { targetFamily: "dairy", relation: "soften", weight: 0.4 }
  ],
  metadata: {
    sourceLayer: "flavor",
    schemaVersion: "ingredientFlavorProfile.v0.0.6.7",
    weightsEnabled: false,
    readonly: true
  }
}
```

`pairHints` 只能作为后续 relation matrix 的轻量提示，不应替代正式关系矩阵，也不应变成具体组合 if 的新容器。下一刀 runtime 的最小落地顺序可考虑：新增只读 `core/flavorSummaryEngine.js`，读取 `ingredientFlavorProfiles`，最后由 `tasteJudge.js` 暴露 `result.flavorSummary`。第一版仍不接管事故、饮品类型、评分、feedback 或 `result.type`；relation matrix、candidate 调度、系统性阈值、severity 和 `scoreMultiplier` 留到后续小步或 v0.0.7.x 调参阶段。

代码只负责汇总、查表、计算关系分和调度候选；风味家族关系、强身份压制、饮品适配阈值和反馈标签应放在数据表、规则表或 relation matrix 中。

### 4.5 evidence 是 v0.0.6.x 的关键

`evidence` 用来解释 summary 结果从哪里来：

```js
{
  metric: "thickStrawNeed",
  sourceLayer: "texture",
  sourceType: "ingredient",
  sourceId: "topping_pearl",
  contribution: 30,
  reason: "large chewy topping increases straw requirement"
}
```

或：

```js
{
  metric: "acidity",
  sourceLayer: "taste",
  sourceType: "ingredient",
  sourceId: "fruit_lemon",
  contribution: 45
}
```

`evidence` 服务于 debug、调参、反馈解释、事故候选生成和 golden 回归诊断。没有 evidence，后续权重、severity 和候选排序会变成黑箱。第一版不必全量实现 evidence，但 schema 必须预留，并且后续新增 summary 计算应优先带 evidence。

### 4.6 权重、阈值和 metadata 预留

v0.0.6.x 不需要立刻做完整权重调参，但不能把未来权重堵死。profile / summary / rule / candidate 应允许未来扩展：

- `weights`
- `thresholds`
- `metadata`
- `evidence`
- `sourceLayer`
- `priorityBand`
- `severityHint`

默认权重可以先不启用，或统一按 `1` 理解。完整 `severityLevel` / `scoreMultiplier` / priority 数值调优留到 v0.0.7.x。

### 4.7 candidate 层

summary 之后应该产出候选，而不是直接最终判定。事故候选可以采用类似结构：

```js
{
  candidateId: "acid_overload_candidate",
  accidentTypeId: "taste_acid_overload",
  sourceLayer: "taste",
  triggerMetric: "acidity",
  threshold: 75,
  evidence: [],
  priorityBand: "taste_overload",
  severityHint: "medium",
  feedbackTags: []
}
```

candidate 是 summary 到最终 result 的桥。v0.0.6.x 可以先设计 accident / outcome / drinkType / feedback candidate schema；完整 candidate 排序、severity、`scoreMultiplier` 和大规模数值平衡留到 v0.0.7.x。

#### v0.0.6.10 中段复盘：summary -> candidate 桥

截至 v0.0.6.9-candidate，`tasteSummary`、`textureSummary`、`flavorSummary` 均已进入 `result`，并且均有 golden 结构断言保护。三层 summary 已经能提供 `values`、`tags`、`risks`、`evidence`、`metadata` 这组中间理解结果，但它们仍不等于最终判定。

下一步如果推进 summary -> candidate，第一刀应继续保持只读输出。candidate 用来表达“有哪些后续结果可以被调度”，而不是直接改变最终 `score`、事故、饮品类型、feedback 或 `result.type`。推荐的候选结构可以从克制版本开始：

```js
{
  candidateId: "taste_acid_overload_candidate",
  candidateType: "accident",
  sourceLayer: "taste",
  triggerMetric: "acidity",
  thresholds: {
    min: 75
  },
  weights: {
    base: 1
  },
  evidence: [],
  priorityBand: "taste_overload",
  severityHint: "medium",
  feedbackTags: ["acid_overload"],
  outcomeTypeId: null,
  ruleFamilyId: "taste_overload",
  metadata: {
    readonly: true,
    weightsEnabled: false
  }
}
```

字段边界：

- `candidateId`：候选本身的稳定 ID，不使用显示文案。
- `candidateType`：候选类别，例如 `accident`、`drinkType`、`outcome`、`feedback`。
- `sourceLayer`：来自 `taste`、`texture`、`flavor` 或后续组合层。
- `triggerMetric`：触发候选的 summary 指标，例如 `acidity`、`strawResistance`、`aromaPressure`。
- `thresholds` / `weights`：预留未来调参，不要求 v0.0.6.x 立即启用完整权重系统。
- `evidence`：复用 summary evidence，解释候选为什么出现。
- `priorityBand`：用于后续调度的粗分组，不等于最终 severity。
- `severityHint`：只作为后续 severity 的提示，不在 v0.0.6.x 初期直接决定分数乘区。
- `feedbackTags`：让 feedbackEngine 未来可以读取结构化标签，而不是回到文案片段匹配。
- `outcomeTypeId` / `ruleFamilyId`：用于结果归类、规则族审计和 golden 断言。

后续系统读取字段时，应优先读取 stable ID 和结构化字段：`accidentTypeId`、`drinkTypeId`、`outcomeTypeId`、`audienceIds`、`feedbackTags`、三层 summary 的 `values` / `tags` / `risks` / `evidence` / `metadata`，以及 candidate 的 `candidateId` / `candidateType` / `sourceLayer` / `triggerMetric` / `priorityBand` / `severityHint` / `ruleFamilyId`。显示文案仍可用于 UI、历史快照和文案回归，但不应回到系统主键位置。

v0.0.6.x 可以先做 candidate schema、只读输出和 golden 结构保护；完整候选排序、冲突解决、severity 数值、`scoreMultiplier`、阈值校准和 golden expected 调整，应放到 v0.0.7.x 或明确调参任务中处理。

#### v0.0.6.11 summary -> candidate 通用 schema

v0.0.6.11 只定义 docs / schema，不实现 runtime。candidate 是 summary 到最终 result 的桥，第一版应保持只读，不接管评分、事故、饮品类型、feedback 或 `result.type`。

通用 candidate schema 可以采用：

```js
{
  candidateId: "taste_acid_overload_candidate",
  candidateType: "accident",
  sourceLayer: "taste",
  sourceSummary: "tasteSummary",
  triggerMetric: "acidity",
  triggerValue: 82,
  thresholds: {
    warning: 60,
    accident: 75
  },
  evidence: [],
  priorityBand: "taste_overload",
  severityHint: "medium",
  feedbackTags: ["acid_accident"],
  accidentTypeId: "taste_acid_overload",
  outcomeTypeId: null,
  drinkTypeId: null,
  ruleFamilyId: "taste_overload_rules",
  metadata: {
    schemaVersion: "summaryCandidate.v0.0.6.11",
    readonly: true,
    weightsEnabled: false,
    source: "summary"
  }
}
```

字段用途：

- `candidateId`：候选自身的稳定 ID，用于 golden 结构断言、debug 和后续调度；不能使用显示文案。
- `candidateType`：候选类型。v0.0.6.11 先定义 `accident`、`outcome`、`drinkType`、`feedback`；未来可扩展 `audience`、`operation`、`customerPreference`，但不提前创建未来系统。
- `sourceLayer`：候选来自哪一层，例如 `taste`、`texture`、`flavor`。
- `sourceSummary`：候选读取的 summary，例如 `tasteSummary`、`textureSummary`、`flavorSummary`。
- `triggerMetric`：触发候选的指标，例如 `acidity`、`strawResistance`、`aromaPressure`。
- `triggerValue`：触发时的实际 summary 数值，便于 debug、调参和反馈解释。
- `thresholds`：候选使用的阈值快照。v0.0.6.x 可先只记录结构，具体阈值调优留到 v0.0.7.x。
- `evidence`：来自 summary 的证据链，解释候选为什么出现。
- `priorityBand`：大类优先级，例如 `texture_blocking`、`taste_overload`、`flavor_identity`、`positive_combo`。它不是最终 severity 数值。
- `severityHint`：严重度提示，例如 `low`、`medium`、`high`，只作为后续 severity 系统的输入，不直接扣分。
- `feedbackTags`：候选建议的反馈标签，供 feedback 系统未来读取。
- `accidentTypeId`：事故候选指向的事故 ID；非事故候选可为 `null`。
- `outcomeTypeId`：outcome 候选指向的结果 ID；非 outcome 候选可为 `null`。
- `drinkTypeId`：drinkType 候选指向的饮品类型 ID；非 drinkType 候选可为 `null`。
- `ruleFamilyId`：候选来自哪组规则，便于后续调试、审计和分组调参。
- `metadata`：版本、只读状态、权重启用状态和来源说明。

candidateType 边界：

- `accident`：只表达“某个 summary 指标已形成事故候选”。它不等于最终事故结果，也不直接改分。
- `outcome`：只表达“存在一个 outcome 方向”。它不覆盖事故优先级，也不替代 `drinkTypeId`。
- `drinkType`：只表达“存在一个饮品类型候选”。普通类型候选不能洗白高优先级事故候选。
- `feedback`：只表达“存在一个反馈焦点候选”。它提供 `feedbackTags` 和 evidence，不直接生成最终文案。

三层 summary 到 candidate 的初始方向：

- `tasteSummary` 可产出 acid overload、sweet overload、bitterness / astringency overload、cloying taste risk 等 candidate。v0.0.6.11 不写具体 runtime，不调阈值。
- `textureSummary` 可产出 straw resistance、low drinkability、high solid load、powder / sediment / gel / viscosity risk 等 candidate。v0.0.6.11 不新增事故规则。
- `flavorSummary` 可产出 strong identity pressure、high aroma pressure、novelty risk、savory identity risk、low beverage fit、identity conflict risk 等 candidate。v0.0.6.11 不做 relation matrix，也不写具体组合 if。

priority / severity 边界：

- `priorityBand` 用来表达候选的大类优先级，不等于最终 severity 数值。
- `severityHint` 只是提示，不是最终扣分。
- `scoreMultiplier` 不在本轮实现。
- 具体 `severityLevel`、`scoreMultiplier`、阈值调优和 golden expected 调整留给 v0.0.7.x。
- 好组合 candidate 未来不能洗白高 severity 事故 candidate。
- candidate 排序 / 调度接口可以在 v0.0.6.x 后续小步做，但 v0.0.6.11 只写 schema。

candidate 输出必须保留 evidence，方便后续 debug、调参、反馈解释和 golden 断言。如果没有 evidence，candidate 只会变成新的黑箱 if。

#### v0.0.6.14 candidate priority shell 通用 schema

v0.0.6.14 只定义 priority shell 的 docs / schema，不实现 runtime。priority shell 是 `summaryCandidates` 之后、最终 result 之前的只读中间层，用来观察 candidate 的粗分组和潜在调度顺序。它不接管评分、事故、饮品类型、feedback、`result.type` 或任何最终 ID。

第一版 schema 可以采用：

```js
{
  orderedCandidates: [],
  byPriorityBand: {
    hard_physical: [],
    texture_drinkability: [],
    taste_overload: [],
    flavor_identity: [],
    normal_conflict: [],
    positive_synergy: [],
    type_classification: [],
    feedback_hint: []
  },
  topCandidates: {
    accident: null,
    outcome: null,
    drinkType: null,
    feedback: []
  },
  metadata: {
    schemaVersion: "candidatePriorityShell.v0.0.6.14",
    readonly: true,
    affectsFinalResult: false,
    weightsEnabled: false,
    source: "summaryCandidates"
  }
}
```

字段边界：

- `orderedCandidates`：候选的只读观察顺序。它可以帮助后续调试“哪个候选更靠前”，但不是最终 dispatch 列表，也不直接决定结果。
- `byPriorityBand`：按粗粒度 priority band 分组，方便检查硬物理事故、饮用性风险、味觉过载、风味身份冲突、普通冲突、正向协同、类型候选和反馈提示是否进入正确区域。
- `topCandidates`：每类 candidate 当前最显眼的候选快照。它只用于观察，不覆盖 legacy analyzer / judge 链路给出的最终 `accidentTypeId`、`outcomeTypeId`、`drinkTypeId` 或 feedback。
- `metadata`：记录 schema 版本、只读状态、是否影响最终结果、权重是否启用以及来源。

`priorityBand` 建议先保持粗粒度：

- `hard_physical`：硬阻断或物理不可饮用风险，例如未来可能来自结构事故的候选。
- `texture_drinkability`：质地、吸管阻力、固体负载和可饮用性候选。
- `taste_overload`：甜 / 酸 / 苦 / 涩等基础味觉过载候选。
- `flavor_identity`：强风味身份、香气压力、料理感、猎奇感或身份冲突候选。
- `normal_conflict`：普通冲突或不协调候选。
- `positive_synergy`：正向组合、适配度或特色亮点候选。
- `type_classification`：饮品类型方向候选。
- `feedback_hint`：只用于反馈焦点的候选。

`priorityBand` 不等于最终 severity。它只回答“这类候选应该在哪个粗分组被查看”。`severityHint` 也只是后续 severity 系统的语义提示，不等于最终 `severityLevel`、扣分档或 `scoreMultiplier`。

未来如果需要更稳定排序，可以在 candidate 或 shell 中预留 `priorityScore` / `sortKey` / `priorityOrder` 一类字段，但 v0.0.6.14 不锁具体数值表。具体权重、阈值、排序策略、`severityLevel`、`scoreMultiplier` 和 golden expected 调整应放到 v0.0.7.x 或明确调参任务。

priority shell 不能变成新的 if 地狱。它不应该写具体原料组合判断，也不应该靠中文 displayName、玩家可见文案或 UI category 推断系统身份。正确方向是：summary 产出结构化理解，`summaryCandidates` 产出候选，priority shell 只读组织候选，最终调度在未来单独设计。

#### v0.0.6.17 三层 summary -> candidate -> priority shell 链路复盘

截至 v0.0.6.16-candidate，当前完整只读链路是：

```text
ingredient profiles / structure analysis
↓
tasteSummary / textureSummary / flavorSummary
↓
summaryCandidates
↓
candidatePriorityShell
↓
legacy judge result（当前仍由既有 analyzer / judge 决定）
```

这条链路已经进入 `result`，但仍不接管最终结果。`tasteSummary`、`textureSummary`、`flavorSummary` 负责输出中间理解；`summaryCandidates` 负责把风险和指标整理为候选；`candidatePriorityShell` 负责把候选按粗粒度 priority band 组织成只读观察结构。最终 `score`、事故、饮品类型、feedback、`result.type` 和各类最终 ID 仍由现有 runtime 主链路决定。

当前结构贯通状态：

- summary 层：三层 summary 均保持 `values` / `tags` / `risks` / `evidence` / `metadata` 结构。
- candidate 层：候选已承载 `sourceLayer`、`sourceSummary`、`triggerMetric`、`triggerValue`、`thresholds`、`evidence`、`priorityBand`、`severityHint`、`feedbackTags`、`accidentTypeId`、`outcomeTypeId`、`drinkTypeId` 和 `ruleFamilyId`。
- priority shell 层：已承载 `orderedCandidates`、`byPriorityBand`、`topCandidates` 和 `metadata`。
- metadata 边界：当前结构均通过 `readonly`、`weightsEnabled`、`affectsFinalResult` 等字段表达“只读、不影响最终判定、不启用权重调参”。
- golden 保护：三层 summary、`summaryCandidates` 和 `candidatePriorityShell` 都已有结构断言，保护容器、metadata 和少量代表字段。

因此，v0.0.6.x 后半段可以进入 final 收口审计。final 审计应关注结构一致性和边界一致性，而不是开始调参数。特别要确认：

- 新结构没有改写最终判定。
- 三层 summary / `summaryCandidates` / `candidatePriorityShell` 的结构与 docs、runner、runtime 暴露命名一致。
- `result` 输出字段稳定包含三层 summary、`summaryCandidates` 和 `candidatePriorityShell`，但不改变最终 `score`、事故、类型、feedback 或 `result.type`。
- candidate 的 evidence 仍可解释候选来源。
- `evidence` / `metadata` / `sourceLayer` / `sourceSummary` / `triggerMetric` / `triggerValue` / `priorityBand` / `severityHint` 已贯通到候选层。
- `feedbackTags` / `outcomeTypeId` / `drinkTypeId` / `accidentTypeId` 等后续调度需要的 ID 承载位已经存在。
- golden 结构断言足以保护关键容器、metadata 和代表字段。
- 没有进入 v0.0.7.x 前必须补的结构缺口。
- `priorityBand` 仍只是粗分组，不是 severity。
- `severityHint` 仍只是提示，不是 `severityLevel` 或 `scoreMultiplier`。

进入 v0.0.7.x 之后，才适合逐步处理：

- 参数、标签、阈值的增删。
- `severityLevel` 和 `scoreMultiplier`。
- candidate 排序、冲突解决和最终调度接管。
- golden expected 的有意识调整。
- 表格化内容管线的正式规划或初步落地。
- 更丰富的 golden 覆盖。
- flavor relation matrix / candidate relation matrix。
- 更多 candidate 类型，例如 `audience`、`operation`、`customerPreference`，但等对应系统进入真实范围再做。
- 更细的 profile / tag / metadata 扩展。
- 更完整的调参、内容管理和数据审计方向。

表格化内容管线可以作为 v0.0.7.x 调参阶段方向，例如把候选规则、阈值、反馈标签、severity 提示和后续权重整理为更容易审计的数据表。但本轮不实现表格化内容管线，也不把它作为 v0.0.6.x 的阻塞项。

#### v0.0.6.18 final 收口审计：链路与 result 边界

v0.0.6.18 对当前三层 summary -> candidate -> priority shell 链路做 final 收口审计。审计结论是：当前系统地基已经足够进入 v0.0.6.x final candidate 冻结流程；进入 v0.0.7.x 前不需要再补新的系统地基。

当前完整只读链路为：

```text
ingredient profiles / structure analysis
↓
tasteSummary / textureSummary / flavorSummary
↓
summaryCandidates
↓
candidatePriorityShell
↓
legacy judge result（最终判定仍由既有 analyzer / judge 决定）
```

result 输出字段核对：

- `result.tasteSummary`：基础味觉中间理解层，结构为 `values` / `tags` / `risks` / `evidence` / `metadata`。
- `result.textureSummary`：物理质地和可饮用性中间理解层，结构同 summary 通用容器。
- `result.flavorSummary`：风味身份 / 香气身份中间理解层，读取 `ingredientFlavorProfiles`，不靠中文 displayName 或 UI category 推断风味身份。
- `result.summaryCandidates`：summary 到最终 result 之间的只读候选层，包含 `candidates` / `byType` / `metadata`。
- `result.candidatePriorityShell`：candidate 到未来调度之间的只读观察层，包含 `orderedCandidates` / `byPriorityBand` / `topCandidates` / `metadata`。

这些字段都不改写最终 `score`、事故、饮品类型、feedback、`result.type`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId` 或 `feedbackTags`。当前最终判定仍由既有主链路负责，新结构只是并行可读输出。

关键扩展位核对：

- summary 层：`values` / `tags` / `risks` / `evidence` / `metadata` 已贯通。
- candidate 层：`candidateId` / `candidateType` / `sourceLayer` / `sourceSummary` / `triggerMetric` / `triggerValue` / `thresholds` / `evidence` / `priorityBand` / `severityHint` / `feedbackTags` / `accidentTypeId` / `outcomeTypeId` / `drinkTypeId` / `ruleFamilyId` / `metadata` 已有位置。
- priority shell 层：`orderedCandidates` / `byPriorityBand` / `topCandidates` / `metadata` 已有位置。
- 只读边界：summary metadata 使用 `readonly: true` 和 `weightsEnabled: false`；candidate / priority shell metadata 使用 `readonly: true`、`weightsEnabled: false`、`affectsFinalResult: false`。
- 权重和阈值：当前已记录 `thresholds` 快照和 `weightsEnabled: false` 状态，完整权重表、阈值调校、severity 数值和 `scoreMultiplier` 留给 v0.0.7.x。

golden 结构保护核对：

- runner 已支持 `tasteSummary`、`textureSummary`、`flavorSummary`、`summaryCandidates`、`candidatePriorityShell` expected。
- 少量代表 golden samples 已覆盖 summary 容器、metadata、evidence、candidate 字段、priority band 和只读 / 不影响最终结果边界。
- 当前覆盖足以保护 v0.0.6.x 系统地基进入 final candidate；更多样本、更多风险场景和更细字段覆盖属于后续增强。

分级结论：

- P0：无。可以进入 v0.0.6.x final candidate 冻结流程。
- P1：无。进入 v0.0.7.x 前不需要再补系统地基。
- P2：更丰富 golden 覆盖、flavor relation matrix、candidate relation matrix、表格化内容管线、更多 candidate 类型、更细 profile / tag / metadata 扩展、多语言 / 内容管理管线，以及完整调参和数据审计，可以留到 v0.0.7.x 或更后面，不阻塞 v0.0.6.x 收口。

v0.0.7.x 的边界因此可以更清楚：它应主要处理参数、标签、阈值、`severityLevel`、`scoreMultiplier`、candidate 排序 / 冲突解决、golden expected 有意识调整和表格化内容管线，而不是一边补 v0.0.6.x 系统地基一边调参。

#### v0.0.7.0 调参路线与表格化内容管线边界

v0.0.7.x 从系统地基阶段转入调参阶段。它可以调整参数、标签、阈值、`severityLevel`、`scoreMultiplier`、feedback / candidate / risk tags、candidate 排序和 golden expected，但不应再把三层 summary、`summaryCandidates` 或 `candidatePriorityShell` 当作大块新系统重搭。

调参应遵守几个边界：

- 每次参数或标签变化都应说明目标：修正哪类口感误判、风险误报、反馈不匹配或 candidate 排序问题。
- golden expected 可以调整，但必须是有意识的产品判断，不是为了掩盖回归。
- `severityHint` 可以逐步转向真正的 `severityLevel`，但需要明确何时开始影响最终判定、分数或反馈。
- `scoreMultiplier` 只有在明确调参任务中接入，不应隐藏在 summary 或 candidate 构建细节里。
- 玩家可见文案、中文名和 `displayName` 仍不能作为调参主键；表格和规则都应优先引用 stable ID。

后续内容量会越来越大，用户不应长期直接编辑 JS 来改文案、标签、阈值和 expected。JS 更适合作为 runtime 数据承载或生成产物；Excel / CSV / Google Sheets / JSON 更适合作为内容编辑、审阅、批量校验和版本对比的工作流。

适合逐步表格化的内容包括：

- feedback 文案、多语言文案和反馈标签。
- `tags`、`candidateTags`、`riskTags`、`feedbackTags`。
- `thresholds`、`severityHint`、`severityLevel`、`scoreMultiplier`。
- candidate rules、candidate relation matrix、priority shell 排序配置。
- `tasteProfile` / `textureProfile` / `flavorProfile` 中后续需要频繁调的字段。
- golden expected、样本说明和调参备注。

初期不建议直接让 runtime 读取 xlsx。更稳的路线是：表格作为编辑源，导入脚本先校验，再生成 runtime 可读 JSON 或 JS 数据。校验至少应覆盖 stable ID 是否存在、是否把 `displayName` 当主键、必填字段是否缺失、数值是否越界、枚举值是否未知、重复 ID 是否出现、变更是否影响 golden samples。

v0.0.7.0 只记录这条路线，不新增 CSV / Excel / JSON 文件，不新增导入脚本，不改 runtime，不调参数，也不改 golden expected。

#### v0.0.7.1 表格化内容管线 docs / schema

v0.0.7.1 进一步把表格化内容管线拆成可讨论的 schema。目标仍是 docs / schema，不实现导入，不创建 CSV / JSON / generated data / build script，不改 runtime 或现有 data。

基本分层：

```text
Excel / Google Sheets / CSV / JSON = 人类编辑源
validateContentSheets = 防错层
buildContentData = 生成层
data/generated/*.generated.js 或 JSON = runtime 读取源
```

用户后续应尽量在表格里改内容，而不是直接改 JS。JS 可以继续作为 runtime 数据或生成产物，但不应成为长期内容编辑界面。正式 runtime 不建议直接读 `.xlsx`，因为它太重，不利于版本管理、自动化校验和跨平台迁移。

适合表格化的内容：

- feedback 文案、feedback tags、scene 和启用状态。
- tags / candidateTags / riskTags。
- thresholds、`severityHint`、`severityLevel`、`scoreMultiplier`。
- candidate rules、candidate thresholds、future relation matrix。
- `tasteProfile` / `textureProfile` / `flavorProfile` 中需要频繁调的字段。
- golden expected、样本备注和调参说明。
- 多语言文案，但应以 stable localization key 为主键。

所有表格都应优先使用 stable ID 作为主键或引用列，例如 `ingredientId`、`feedbackTag`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId`、`candidateId`、`ruleFamilyId`。`displayName`、中文文案和多语言列只用于展示、检索和编辑辅助，不参与机制判断，也不能作为生成数据的系统身份。

未来目录可以规划为：

```text
content_sheets/
  feedback_texts.csv
  ingredient_flavor_profiles.csv
  severity_rules.csv
  candidate_thresholds.csv
  localization_texts.csv

scripts/content/
  validateContentSheets.js
  buildContentData.js

data/generated/
  feedbackTexts.generated.js
  ingredientFlavorProfiles.generated.js
  severityRules.generated.js
  candidateThresholds.generated.js
```

这些只是未来规划，v0.0.7.1 不创建这些目录或文件。

#### v0.0.7.2 feedback 文案表格化 schema

v0.0.7.2 只细化 feedback 文案表格 schema。目标是让试喝反馈文案未来可以通过 CSV / Excel / Google Sheets / JSON 工作流编辑和审阅，而不是长期直接编辑 `data/feedbackTexts.js`。本轮不实现导入，不新增表格文件，不新增 generated data，不新增 validate / build script，不改 runtime，不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`，不改 golden expected。

feedback 文案表格的核心原则：

- `textId` 是稳定文案 ID，服务审计、去重、禁用、迁移和未来 localization 映射。
- `feedbackTag` 是机制选择反馈的主引用，连接现有 `feedbackTags`、未来 candidate / summary 输出和文案池。
- `zhCN` 是中文显示文案，不是机制主键；未来可扩展 `enUS`、`jaJP` 或 localization key。
- `scene`、`tone`、分数区间和 result ID 过滤只是选择条件或编辑辅助，不应替代 stable ID。
- `notes` 是制作人备注，不参与 runtime 判断。

未来第一版 `feedback_texts` 表可以采用类似字段：

```text
textId,feedbackTag,scene,zhCN,tone,minScore,maxScore,accidentTypeId,drinkTypeId,outcomeTypeId,audienceId,testerId,enabled,notes
```

字段说明：

- `textId`：稳定文案 ID。建议可读字符串，例如 `fb_classic_001`、`fb_straw_disaster_002`。同一表内不可重复。
- `feedbackTag`：结构化反馈标签，例如 `classic`、`straw_disaster`、`acid_accident`、`normal_good`。不能为空。
- `scene`：文案场景，例如 `normal`、`accident`、`followup`、`fallback`、`special`。用于区分普通好喝反馈、事故反馈、追评 / follow-up、兜底反馈和特殊反馈。
- `zhCN`：中文显示文案。只负责展示和审美，不作为机制主键。
- `tone`：语气标签，例如 `sharp_cute`、`cute`、`premium`、`explain`、`dramatic`、`gentle`。可用于未来试喝员或客群语气筛选。
- `minScore` / `maxScore`：可选分数区间。为空表示不按分数过滤；填写时必须在 0-100 之间，且 `minScore <= maxScore`。
- `accidentTypeId`：可选事故类型过滤，例如 `taste_acid_overload`、`texture_straw_resistance`、`dairy_fat_overload`。为空表示不限事故类型。
- `drinkTypeId`：可选普通饮品类型过滤，例如 `classic_milk_tea`、`fresh_fruit_tea`。为空表示不限饮品类型。
- `outcomeTypeId`：可选兜底结果过滤，例如 `taste_conflict`、`experimental_special`。为空表示不限兜底结果。
- `audienceId`：未来客群扩展字段。当前可为空；不提前实现顾客系统。
- `testerId`：未来试喝员口吻扩展字段。当前可为空；不提前实现试喝员系统。
- `enabled`：是否启用。建议枚举为 `true` / `false`，或表格层用 `1` / `0` 后由 validate 规范化。
- `notes`：制作人备注、语气说明或迁移说明。不参与机制判断，不进入玩家可见 UI。

示例行只用于说明 schema，不代表本轮创建表格文件：

```text
textId,feedbackTag,scene,zhCN,tone,minScore,maxScore,accidentTypeId,drinkTypeId,outcomeTypeId,audienceId,testerId,enabled,notes
fb_classic_001,classic,normal,红茶和牛奶配合得很稳，是不会出错的经典款。,explain,60,90,,classic_milk_tea,,,,true,经典奶茶稳定反馈
fb_straw_001,straw_disaster,accident,吸管刚插进去就提交了辞职信。,dramatic,0,35,texture_straw_resistance,,,,,true,吸管阻力事故主反馈
fb_thick_followup_001,thick_followup,followup,第一口很幸福，第三口开始需要勇气。,sharp_cute,50,85,,,,,,true,厚重但未必事故的追评
```

未来 validate 规则可考虑：

- `textId` 必填且不重复。
- `feedbackTag` 必填，并且属于已定义 tag 或可由后续 tag registry 识别。
- `scene` 必填且枚举合法，例如 `normal`、`accident`、`followup`、`fallback`、`special`。
- `enabled` 必填且枚举合法。
- `zhCN` 启用时不能为空；禁用时可为空但应有 `notes` 说明。
- `minScore` / `maxScore` 为空或为数字；填写时必须在 0-100 之间，且 `minScore <= maxScore`。
- `accidentTypeId` / `drinkTypeId` / `outcomeTypeId` 若填写，必须是已知 stable ID。
- 禁止把 `zhCN`、中文文案片段、显示名或 UI category 当机制主键。
- 可选检查：同一 `feedbackTag` 至少有若干条 `enabled=true` 文案，避免某个 tag 触发后没有可用文案。
- 可选检查：事故类 `feedbackTag` 应有 `scene=accident`，或填写对应 `accidentTypeId` / `notes` 说明。
- 可选检查：同一 `textId` 的多语言行或未来 localization key 必须一一对应，避免翻译漏项。

与现有系统的边界：

- 现有 `data/feedbackTexts.js` 保持不变，仍是当前 runtime 文案池。
- 现有 `core/feedbackEngine.js` 保持不变，仍按 `feedbackTags` 和现有 fallback 选择文案。
- 本轮不迁移现有文案，不新增 `feedback_texts.csv`、JSON、generated JS 或 build script。
- 本轮不改 UI，不改 golden expected，不改评分、事故、饮品类型、feedback 或 `result.type`。
- 未来迁移时应保留旧文案池兼容，先做旁路 generated data 或 adapter，再逐步切换 runtime，不一次性重写反馈系统。
- 现有 golden samples 中的 `feedbackTagIncludes` 是结构化回归保护；`feedbackIncludesAny` 是玩家可见文案回归保护。未来表格化后两者仍可并存，但新增机制判断应优先依赖 stable ID / tag。

后续小步路线可考虑：

1. v0.0.7.2：完成 feedback 文案表格化 schema docs。
2. v0.0.7.4：创建样例 `feedback_texts` CSV / JSON，但不接 runtime。
3. v0.0.7.5 或后续：设计 / 实现 validate feedback sheet 脚本。
4. 后续：从表格生成 `feedbackTexts.generated.js` 或 JSON，并审计生成结果。
5. 后续：让 runtime 通过 adapter 读取 generated data，同时保留旧文案池 fallback。
6. 后续：用 golden samples 回归保护反馈 tag、事故路径、普通好喝路径和代表文案。
7. 后续：在 feedback 文案管线稳定后，再扩大到 severity / threshold 表格。

以上只是可考虑路线，不代表已经决定，也不代表本轮已经创建任何表格、脚本或 runtime 入口。

#### v0.0.7.3 调参阶段反 if guardrail

v0.0.7.x 后续会开始更频繁地调整反馈文案、severity、threshold、`scoreMultiplier`、candidate 排序和 golden expected。这些都属于内容和调参工作，但它们同样可能把系统带回 if 地狱：为了一个样本、一个中文文案、一个具体组合或一个主观审美点，直接往 engine、validator 或 runner 里塞特殊判断。

调参阶段的核心原则仍然是：

```text
内容进表格 / 规则 / schema
校验进 validator
生成进 generated data
engine 只做汇总、调度和通用判断
golden expected 只做有意识更新
```

反馈文案调整应优先进入 `feedback_texts` 表格或后续 generated feedback data，不应继续在 `feedbackEngine` 中堆文案选择 if。`feedbackEngine` 可以保留通用标签选择、fallback、去重和适配器逻辑，但不应为某句 `zhCN`、某个中文片段或某个样本 ID 写机制判断。

severity / threshold 调整应优先进入 rule table、schema 或 generated data。允许通用区间判断、通用 priority 排序和通用 `severityLevel` / `scoreMultiplier` 映射；不应把单个原料、单个原料组合或单个 golden sample 写成散落在 engine 里的特例。

表格导入和 validator 的职责是防错，不是承载内容判断。validator 可以检查 ID 是否存在、枚举是否合法、数值是否越界、必填字段是否缺失、启用文案是否为空、generated data 是否可读；不应为了某个具体样本写例外，也不应在 validator 中复刻味觉判定。

golden expected 可以在 v0.0.7.x 有意识更新，但必须说明产品理由：是口感判断改了、文案策略改了、severity 档位改了、还是 threshold 调整后结果应变。不要为了掩盖回归、绕过表格化管线或降低结构边界而改 expected。

明确禁止或强烈警戒：

- 为某个 golden sample 写硬编码。
- 为某个中文文案、`displayName`、`zhCN` 或 feedback 文案片段写机制判断。
- 为某个具体原料组合写散落 if。
- 在 `feedbackEngine` 里继续堆内容选择 if。
- 在 severity / threshold 中写死单个原料特例。
- 绕过表格化内容管线，直接改 generated data。
- 为了快速通过测试而降低 stable ID、schema、summary、candidate、priority shell 或 golden 断言边界。
- 在 validator 中写具体样本例外。

允许存在的 if：

- 通用区间判断。
- 通用枚举校验。
- 缺字段 / 缺 ID fallback。
- 通用 priority / severity 排序逻辑。
- 通用 validator 规则。
- 通用 golden assertion helper。
- 通用 schema 兼容逻辑。

允许的 if 必须保持“通用”，不能把具体内容塞进去。只要条件里开始出现单个样本 ID、具体中文文案、具体 `displayName`、具体组合名或单个原料专属审美判断，就应先停下来，考虑是否应该进入表格、规则表、profile、candidate schema 或 golden expected 的有意识更新。

人类制作人负责主观体验、文案审美和判定合理性的最终审核。Codex 可以提出候选调参、风险说明和回归影响，但不应自行硬编码审美判断。每次 v0.0.7.x 实现任务结束时，Codex 应报告：

- 是否新增内容 if。
- 是否锁死具体数值。
- 是否为了某个 golden sample 临时硬编码。
- 是否绕过表格化内容管线。
- 是否让 `displayName` / 中文文案成为主键。
- 是否误改 runtime。
- 是否改 golden expected；如果改了，原因是什么。
- 是否影响评分、事故、饮品类型、feedback、`result.type`。
- 是否需要用户作为制作人审核体验 / 文案 / 判定合理性。

表格化内容管线是降低内容 if 风险的主要工具，但它不是免检通道。表格、schema、validator、generated data 和 golden samples 必须一起工作：内容变化先进入可审计的数据源，再经过校验和生成，最后用回归样本保护行为。

#### v0.0.7.4 feedback_texts 样例表格 / JSON 草案

v0.0.7.4 新增 `content_sheets/examples/feedback_texts.sample.csv` 与 `content_sheets/examples/feedback_texts.sample.json`，用于验证 feedback 文案表格字段是否适合制作人阅读、编辑、审阅和后续 validate 脚本设计。它们是非 runtime 样例，不是正式数据源，不替代 `data/feedbackTexts.js`，也不要求覆盖全部 `feedbackTag`。

样例文件的边界：

- `content_sheets/examples/feedback_texts.sample.csv` 是人类可编辑样例，覆盖少量代表行。
- CSV 样例应保存为 UTF-8 with BOM，保证 Excel 直接打开时中文不乱码；后续正式导出 CSV 也应照顾 Excel / Google Sheets 的中文编辑体验。
- `content_sheets/examples/feedback_texts.sample.json` 是对应 JSON 草案，用来观察未来 generated / adapter 数据形状；当前仍不是 generated data。
- runtime 不读取这些 sample 文件，`core/feedbackEngine.js` 不接入这些 sample 文件。
- 本轮不迁移现有 feedback 文案，不改 `data/feedbackTexts.js`，不改 golden expected。
- `textId` / `feedbackTag` 仍是主路径；`zhCN` 是显示文案列，不是机制主键。
- `notes` 只做制作人备注，不参与机制判断。

当前样例覆盖经典奶茶、高级厚乳、酸度事故、奶脂过载、吸管阻力、榴莲强身份、普通 fallback、followup 追评和禁用行等代表场景。样例规模保持小，不用于表达完整文案池。

后续可考虑单独设计 validate feedback sheet 脚本，检查 `textId` 去重、`feedbackTag` 必填、`scene` / `enabled` 枚举、分数区间、已知 stable ID、启用文案非空，以及禁止把 `zhCN` / 显示文案当机制主键。本轮不新增 validate script，不新增 build script，不新增 runtime generated data。

#### v0.0.7.5 validate feedback sheet 脚本设计

v0.0.7.5 只设计未来 feedback sheet validator 的规则边界，不实现脚本，不新增 generated data，不改 runtime。validator 的目标是确保 feedback 表格能被机器安全读取，也能让用户在 Excel / Google Sheets 中编辑后不破坏结构；它是内容管线安全层，不是味觉判定层。

未来 validator 可能读取：

```text
content_sheets/examples/feedback_texts.sample.csv
content_sheets/feedback_texts.csv
```

目录边界建议：

```text
content_sheets/examples/ = 样例，不接 runtime
content_sheets/ = 未来正式人类编辑源
data/generated/ = 未来 generated runtime 数据
```

本轮不创建 `content_sheets/feedback_texts.csv`，不新增 validate script，不新增 build script。validator 未来只报告 error / warning / info，不自动修改源 CSV、不自动改文案、不自动调参数，也不绕过 golden samples。

文件编码 / 格式校验：

- CSV 面向 Excel 直接打开时必须是 UTF-8 with BOM。
- CSV 必须能被标准 CSV parser 正确读取。
- 表头必须完整；字段顺序可以建议固定，但 validator 不应过度依赖顺序。
- 不允许列串位、未闭合引号，或因为逗号 / 双引号 / 换行导致文案破列。
- 行尾和 trailing whitespace 不应导致 `git diff --check` 失败。

主键与唯一性校验：

- `textId` 必填且唯一。
- `textId` 必须是 stable ID，不可使用中文或显示文案。
- `feedbackTag` 必填。
- `zhCN` / `notes` 不是主键。
- 不允许以 `displayName`、中文文案或反馈句作为机制身份。

枚举字段建议集中登记，不散落在脚本 if 里：

```text
scene: normal / accident / followup / fallback
tone: classic / teasing / cute / premium / warning / explanatory / weird
enabled: TRUE / FALSE
```

枚举可以后续扩展，但应通过集中配置或 schema 扩展，而不是在 validator 内写具体内容特例。

分数字段校验：

- `minScore` / `maxScore` 可以为空。
- 如果填写，必须是 0-100 的数字。
- 如果两个都填写，必须 `minScore <= maxScore`。
- 禁用行可以允许空 score。
- validator 只校验格式，不调分数逻辑。

stable ID 引用校验：

- `accidentTypeId`、`drinkTypeId`、`outcomeTypeId`、`audienceId` 若填写，未来应校验是否属于已知 ID 集合。
- ID 来源可来自 golden samples、规则 docs、registry 或后续统一 ID registry；本轮只设计边界，不实现读取逻辑。

文案字段校验：

- `zhCN` 在 `enabled=TRUE` 时不可为空。
- 禁用行可以允许空文案，用于草稿 / 占位。
- 文案不应包含破坏 CSV 的未转义换行 / 引号。
- 长文案适合在人类编辑源中维护，runtime 使用后续 generated data。
- 文案重复不一定是错误，但可以作为 warning。

内容管线 guardrail：

- validator 不根据某个具体中文文案做机制判断。
- validator 不为某条样本写例外。
- validator 不为某个具体原料组合写 if。
- validator 不修改源 CSV，不自动改文案，不自动调参数。
- validator 不绕过 golden samples。

错误等级：

- `error`：必须修复，否则不能 build / candidate。例如 CSV 乱码 / 无 BOM、解析失败、缺必填字段、`textId` 重复、`enabled` 非法、score 越界、ID 引用未知、启用行 `zhCN` 为空。
- `warning`：可人工审核，不一定阻塞。例如文案重复、某个 `feedbackTag` 文案数量过少、optional ID 为空、`notes` 为空、`tone` 过于笼统、分数区间很宽、可能存在风格不一致。
- `info`：仅报告。例如总行数、启用行数、禁用行数、tag 覆盖、scene 覆盖、tone 覆盖。

未来 CLI 可以先保持简单：

```bash
node scripts/content/validateFeedbackSheet.js content_sheets/feedback_texts.csv
```

输出建议：

```text
Feedback sheet validation
Rows: 120
Enabled: 104
Disabled: 16
Errors: 0
Warnings: 5
```

未来可考虑 `--json` / `--strict`，但不在本轮过度设计。

validate / build / runtime 边界：

- validate 只负责校验和报告。
- build 才负责生成 runtime data。
- validate 不写文件，除非未来明确增加 fix mode。
- 本阶段不实现 build。
- runtime 不读取 sample CSV。
- generated data 必须来自已通过 validate 的源。

#### v0.0.7.6 validate feedback sheet 第一版脚本

v0.0.7.6 已实现第一版 `scripts/content/validateFeedbackSheet.js`，当前用于校验 `content_sheets/examples/feedback_texts.sample.csv`。它仍是内容管线安全层，不是 runtime 判定层；本轮不接 runtime，不生成 `data/generated`，不迁移现有 `data/feedbackTexts.js`，也不自动修改 CSV 或文案。

当前 CLI：

```bash
node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv
```

当前 error 校验包括：

- CSV 必须是 UTF-8 with BOM。
- CSV 必须能被通用 parser 读取，不能有未闭合引号、列数错位或破坏结构的逗号 / 引号 / 换行。
- 表头必须包含 `textId`、`feedbackTag`、`scene`、`zhCN`、`tone`、`minScore`、`maxScore`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId`、`audienceId`、`enabled`、`notes`。
- `textId` / `feedbackTag` / `scene` / `tone` / `enabled` 必填；启用行 `zhCN` 必填。
- `textId` 必须唯一，且 `textId` / `feedbackTag` 不能是中文文案或显示文本。
- `scene`、`tone`、`enabled` 必须属于当前枚举。
- `minScore` / `maxScore` 若填写，必须是 0-100；两者都填写时 `minScore <= maxScore`。
- `accidentTypeId` / `drinkTypeId` / `outcomeTypeId` / `audienceId` 若填写，先校验为非中文、无空格的 stable ID 格式。

当前 warning / info 包括：

- warning：禁用行 `zhCN` 为空、`notes` 为空、某个 `feedbackTag` 只有 1 条、分数区间较宽、`tone` 较笼统、`scene=accident` 但 optional ID 全空。
- info：总行数、启用行数、禁用行数、`feedbackTag` 覆盖、`scene` 覆盖、`tone` 覆盖。

warning 不阻塞第一版样例通过；error 必须修复后才能进入后续 build / candidate。validator 不根据具体 `zhCN`、某个 golden sample、某个原料组合或某条文案写例外，也不把 `zhCN` / `notes` 当主键。

#### v0.0.7.8 feedback sheet build script 设计

v0.0.7.8 只设计未来 `buildFeedbackData` 的规则边界，不实现 build script，不新增 `data/generated`，不接 runtime，不迁移现有 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。build script 是内容管线生成层，不是机制判断层；它只把已通过 validate 的人类编辑源转换成 runtime 可读的数据形状。

未来分层关系：

```text
Google Sheets / CSV = 人类编辑源
validateFeedbackSheet = 校验层
buildFeedbackData = 生成层
data/generated = runtime 未来读取源
feedbackEngine adapter = 未来单独任务
```

未来 build 输入：

```text
content_sheets/feedback_texts.csv
```

当前样例仍是：

```text
content_sheets/examples/feedback_texts.sample.csv
```

未来 build 输出可以是：

```text
data/generated/feedbackTexts.generated.js
```

或：

```text
data/generated/feedbackTexts.generated.json
```

本轮不创建以上文件。正式 build 前必须先跑 `validateFeedbackSheet`；validate 有 error 时 build 必须停止，只有 warning 时 build 可以继续但必须报告 warning。build 不应吞掉 validation 结果，也不应把 warning 包装成无事发生。build 输出后仍应运行 golden samples；如果未来 adapter / runtime 接入导致反馈选择、反馈文案、评分、事故、饮品类型、`result.type` 或 expected 变化，必须说明原因。

未来 generated data 可以采用类似结构：

```js
{
  schemaVersion: "feedbackTexts.generated.v0.0.7.x",
  generatedFrom: "content_sheets/feedback_texts.csv",
  generatedAt: "2026-06-03T00:00:00.000Z",
  textsById: {
    feedback_classic_001: {
      textId: "feedback_classic_001",
      feedbackTag: "classic",
      scene: "normal",
      zhCN: "...",
      tone: "classic",
      minScore: 60,
      maxScore: 90,
      accidentTypeId: null,
      drinkTypeId: "classic_milk_tea",
      outcomeTypeId: null,
      audienceId: null,
      enabled: true,
      notes: "..."
    }
  },
  textIdsByTag: {
    classic: ["feedback_classic_001"]
  },
  enabledTextIdsByTag: {
    classic: ["feedback_classic_001"]
  },
  textIdsByScene: {
    normal: ["feedback_classic_001"]
  },
  enabledTextIdsByScene: {
    normal: ["feedback_classic_001"]
  },
  metadata: {
    readonly: true,
    sourceType: "generated",
    stableIdRequired: true
  }
}
```

结构原则：

- generated data 以 stable `textId` 建索引。
- `feedbackTag` / `scene` 只作为稳定分组 key，不是显示文案。
- `zhCN` 是显示文案，不是主键，也不参与机制判断。
- `notes` 是制作人备注，可以保留用于审计，但不参与 runtime 选择。
- `minScore` / `maxScore` 建议转成 number；空分数字段建议转成 `null`。
- optional stable ID 字段空值建议转成 `null`，避免 adapter 分不清空字符串和真实 ID。
- `enabled` 建议从 `"TRUE"` / `"FALSE"` 转成 boolean。

disabled 文案处理建议：保留在 `textsById`，但默认不进入 `enabledTextIdsByTag` / `enabledTextIdsByScene`。这样可以保留制作人草稿和历史审计信息，也能让未来 adapter 默认只从启用文案池取候选。build 不负责选择哪条文案，选择逻辑仍由后续 adapter / feedbackEngine 任务处理。

未来 CLI 可以先保持简单：

```bash
node scripts/content/buildFeedbackData.js content_sheets/feedback_texts.csv
```

可考虑的扩展：

```bash
node scripts/content/buildFeedbackData.js content_sheets/feedback_texts.csv --out data/generated/feedbackTexts.generated.js
node scripts/content/buildFeedbackData.js content_sheets/feedback_texts.csv --dry-run
```

不要过度设计 CLI。第一版 build 应优先保证可审计、可回归、不会改变 runtime。

反 if 边界：

- build 不为某个具体文案写特殊判断。
- build 不为某个具体 golden sample 写硬编码。
- build 不根据 `zhCN` / `displayName` 决定机制逻辑。
- build 不自动改 `tone` / score / `scene`。
- build 不自动修复用户文案。
- build 不绕过 stable ID。
- build 不直接接管 `feedbackEngine`。

#### v0.0.7.9 feedback sheet build script 第一版

v0.0.7.9 已实现第一版 `scripts/content/buildFeedbackData.js`，把通过 validator 的 feedback sheet CSV 转成旁路 generated JSON。它仍是离线内容管线，不接 runtime，不替代 `data/feedbackTexts.js`，也不让 `core/feedbackEngine.js` 读取 generated data。

当前命令：

```bash
node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json
```

如果不传 `--out`，默认输出到：

```text
data/generated/feedbackTexts.generated.json
```

当前输入 / 输出：

- 输入：`content_sheets/examples/feedback_texts.sample.csv`
- 输出：`data/generated/feedbackTexts.generated.json`
- 输出格式：UTF-8、格式化 JSON、中文可读。

build 前置规则已经落地：

- build 会先调用 `scripts/content/validateFeedbackSheet.js`。
- validator 有 error 时 build 停止并返回非 0。
- validator 只有 warning 时 build 继续，但报告 warning 数量。
- build 不吞掉 validation 输出。
- build 不修改源 CSV，不自动修文案，不自动改 `tone` / `score` / `scene`，不调参数。

第一版 generated JSON 结构：

```js
{
  schemaVersion: "feedbackTexts.generated.v0.0.7.9",
  generatedFrom: "content_sheets/examples/feedback_texts.sample.csv",
  textsById: {},
  textsByTag: {},
  textsByScene: {},
  enabledTextIdsByTag: {},
  enabledTextIdsByScene: {},
  metadata: {
    readonly: true,
    sourceType: "generated",
    stableIdRequired: true,
    affectsRuntime: false
  }
}
```

字段转换规则：

- `textId` 是 `textsById` 主 key。
- `feedbackTag` / `scene` 用于稳定分组。
- `zhCN` 是显示文案，不是主 key，也不参与机制判断。
- `notes` 是制作人备注，不参与 runtime 选择。
- `enabled` 从 `"TRUE"` / `"FALSE"` / `"true"` / `"false"` 转成 boolean。
- `minScore` / `maxScore` 转成 number；空值转成 `null`。
- `accidentTypeId` / `drinkTypeId` / `outcomeTypeId` / `audienceId` 为空时，本轮 generated JSON 转成 `null`。
- disabled 文案保留在 `textsById`、`textsByTag`、`textsByScene` 供审计，但不进入 `enabledTextIdsByTag` / `enabledTextIdsByScene`。

当前 generated data 仍是旁路样例，不接 UI / runtime。未来 runtime adapter 必须作为单独任务设计和实现，并继续保留 `zhCN` / `notes` 不作为机制主键的边界。

#### v0.0.7.10 generated feedback data 结构校验

v0.0.7.10 已实现第一版 `scripts/content/validateGeneratedFeedbackData.js`，用于校验 `data/generated/feedbackTexts.generated.json` 的结构稳定性。它是 build 输出后的安全检查，不接 runtime，不替代 `validateFeedbackSheet`，也不让 `core/feedbackEngine.js` 读取 generated data。

当前命令：

```bash
node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json
```

第一版校验范围：

- 顶层结构：JSON 合法、顶层 object、`schemaVersion`、`generatedFrom`、`textsById`、`textsByTag`、`textsByScene`、`metadata`。
- metadata：`readonly === true`、`sourceType === "generated"`、`stableIdRequired === true`，当前 `affectsRuntime` 如存在应为 `false`。
- `textsById`：key 与 `item.textId` 一致，`textId` / `feedbackTag` / `scene` 存在，`zhCN` 字段存在，`enabled` 是 boolean，`minScore` / `maxScore` 是 number 或 `null`，启用文案 `zhCN` 不为空。
- indexes：`textsByTag` / `textsByScene` 不指向不存在的 `textId`，且每条 text 都出现在对应的 tag / scene 分组。
- stable ID 边界：`textId` / `feedbackTag` / index key 不应使用中文显示文案；`zhCN` 只是显示文案，不参与主键判断；`notes` 只是制作人备注，不参与机制判断。

如果 future generated data 增加新索引，校验器应优先按通用 index 一致性扩展，不应为某个具体 `textId`、某条中文文案、某个 golden sample 或具体审美判断写例外。

当前 validate / build / generated validate 链路：

```text
feedback_texts.sample.csv
↓ validateFeedbackSheet
feedbackTexts.generated.json
↓ validateGeneratedFeedbackData
future runtime adapter
```

`validateGeneratedFeedbackData` 不自动修改 JSON，不自动修改 CSV，不自动修文案，不调参数，不接管 `feedbackEngine`。它只保护 generated data 的结构和索引，为后续 runtime adapter 阶段降低风险。

#### v0.0.7.11 feedback runtime adapter docs / schema

v0.0.7.11 只设计未来 feedback runtime adapter 的文档和 schema 边界，不实现 adapter，不修改 `core/feedbackEngine.js`，不修改 `data/feedbackTexts.js`，也不修改 `data/generated/feedbackTexts.generated.json`。

未来 adapter 的目标是让 runtime 可以安全读取 generated feedback data，同时保持旧 `data/feedbackTexts.js` / `feedbackEngine` 兼容。它应是只读读取层和候选提供层，不是机制判断层，也不能一次性接管最终反馈选择。

未来 adapter 可以负责：

- 加载 `data/generated/feedbackTexts.generated.json`。
- 按 `textId` 查询单条文案。
- 按 `feedbackTag` 查询文案池。
- 按 `scene` 查询文案池。
- 基于通用 filters 返回 enabled 文案候选。
- 默认过滤 `enabled === true` 的文案；disabled 文案保留在 generated data 中供制作人审阅，但默认不进入 runtime 选择池。
- 在 generated data 缺失、不可用或校验失败时，保留旧文案系统 fallback。
- 输出只读文案候选，不直接决定最终评分、事故、饮品类型、`result.type` 或最终 feedback。

未来 adapter 不应负责：

- 调分、判事故、判饮品类型、修改 `result.type` 或修改 golden expected。
- 自动选择“最合适”的最终文案。
- 根据 `zhCN`、中文片段、displayName 或显示文案内容做机制判断。
- 为某个具体 `textId`、某条中文文案、某个具体文案池或某个 golden sample 写硬编码。
- 自动修文案、自动改表格内容、自动调参数。

轻量 API 草案：

```js
getFeedbackTextById(textId)
getFeedbackTextsByTag(feedbackTag, options)
getFeedbackTextsByScene(scene, options)
getEnabledFeedbackTexts(filters)
```

可选 filters 草案：

```js
{
  scene,
  feedbackTag,
  accidentTypeId,
  drinkTypeId,
  outcomeTypeId,
  minScore,
  maxScore,
  tone
}
```

filters 应只使用 stable ID / enum / 通用数值区间。`zhCN` 不应作为 filter 主键，`notes` 也不应参与 runtime 选择。adapter 返回的是候选集合，最终排序、抽取和拼接仍应由未来明确接入的 feedback 流程决定。

fallback 边界：

- generated data 缺失时，旧 `data/feedbackTexts.js` / `feedbackEngine` 仍可工作。
- generated data 校验失败时，未来 adapter 不应静默使用坏数据。
- adapter 应提供明确错误 / fallback 报告，便于 Codex 和用户知道当前使用的是 generated data 还是 legacy 文案池。
- generated data 有问题时不应导致整个味觉引擎崩溃，但也不能把坏数据悄悄当好数据用。

与 validate / build 的关系：

- adapter 只读取 generated data。
- generated data 必须来自通过 `validateFeedbackSheet`、`buildFeedbackData`、`validateGeneratedFeedbackData` 的流程。
- adapter 不重新解析 CSV，不读取 Google Sheets，不修复 generated data。
- adapter 不承担内容管线校验职责；校验失败应回到 validator / build / generated validator 阶段处理。

反 if 边界：

- 不允许 `if (textId === "feedback_straw_disaster_002")` 这类内容特例。
- 不允许 `if (zhCN.includes("榴莲"))` 这类文案判断。
- 不允许 `if (displayName === "榴莲")` 这类显示文案主键回潮。
- 不允许为单个 golden sample 或具体文案池写散落 if。
- 允许通用字段过滤、通用 enabled 过滤、通用 score range 判断、通用 stable ID 过滤、通用 fallback 和通用结构检查。

未来渐进接入路线只作为“可考虑”，不是已决定版本清单：

1. feedback runtime adapter docs / schema。
2. adapter 只读实现。
3. adapter 读取 generated data，但不接 `feedbackEngine`。
4. adapter golden / structure check。
5. `feedbackEngine` 增加旁路读取 generated data 的能力。
6. 小范围样本对比：旧文案系统 vs generated 文案池。
7. 人类制作人审核文案体验。
8. 再决定是否逐步接管部分 `feedbackTag`。

本设计不要求用户改变当前 Google Sheets / CSV 字段，也不改变文案工作台使用方式。未来如果 adapter 设计要改变人类表格字段、制作人填写方式或文案工作台流程，必须先由用户作为制作人确认。

#### v0.0.7.12 feedback runtime adapter 第一版只读实现

v0.0.7.12 已新增第一版 `core/feedbackRuntimeAdapter.js`。它实现 generated feedback data 的只读查询能力，但当前不接 `core/feedbackEngine.js`，不改 `data/feedbackTexts.js`，不改 runtime script 加载，也不影响玩家最终看到的 feedback。

当前 adapter 创建入口：

```js
createFeedbackRuntimeAdapter(generatedFeedbackData)
```

输入边界：

- 输入必须是已经 build 出来的 generated feedback data object。
- adapter 不读取 CSV，不读取 Google Sheets，不读取 `content_sheets`。
- adapter 不自己跑 validate / build / generated validation。
- adapter 不修复 generated data，也不生成 generated data。

第一版查询方法：

```js
adapter.isAvailable()
adapter.getTextById(textId)
adapter.getTextsByTag(feedbackTag, options)
adapter.getTextsByScene(scene, options)
adapter.getEnabledTexts(filters)
adapter.getMetadata()
```

查询边界：

- `getTextById(textId)` 只使用 stable `textId`；找不到返回 `null`；不根据 `zhCN` 查找。
- `getTextsByTag(feedbackTag, options)` 只使用 stable `feedbackTag`，默认只返回 `enabled === true` 的候选。
- `getTextsByScene(scene, options)` 只使用 stable `scene`，默认只返回 enabled 候选。
- `getEnabledTexts(filters)` 做通用字段过滤和通用 score range 判断。
- `includeDisabled: true` 只用于显式审阅 disabled 文案；默认查询不会把 disabled 文案放进候选池。
- 返回对象是文案候选的浅拷贝，不应被当作 generated data 的可写入口。

第一版支持的通用 filters：

```js
{
  scene,
  feedbackTag,
  tone,
  accidentTypeId,
  drinkTypeId,
  outcomeTypeId,
  score,
  minScore,
  maxScore
}
```

adapter 不承载机制判断：

- 不调分，不判事故，不判饮品类型，不改 `result.type`。
- 不自动选择最终 feedback，不修改 `result.feedback` 或 `feedbackTags`。
- 不根据 `zhCN`、displayName、中文片段、notes 或具体文案内容判断机制。
- 不为某个 `textId`、某个 golden sample 或某个具体文案池写特殊逻辑。
- 不自动修文案，不自动调 `tone` / score / `scene`。

invalid data 边界：

- 第一版 adapter 会做轻量结构检查。
- generated data 缺少必要结构时，返回不可用 adapter，并在 `getMetadata()` 中标记 `available: false` 和 issues。
- 不可用 adapter 查询结果为空或 `null`。
- 第一版 adapter 不自动 fallback 到 legacy 文案系统；legacy fallback 应留到未来 `feedbackEngine` 接入任务处理。

当前配套检查脚本：

```bash
node scripts/content/checkFeedbackRuntimeAdapter.js
```

该脚本读取 `data/generated/feedbackTexts.generated.json`，验证 adapter 可创建、按 `textId` / `feedbackTag` / `scene` 查询、默认排除 disabled 文案、`includeDisabled` 可审阅 disabled 文案、不存在 textId 返回 `null`、查询不依赖 `zhCN`，并确认 invalid data 会产生不可用 adapter。

#### v0.0.7.13 feedback runtime adapter 结构保护

v0.0.7.13 不改 adapter 本体，只强化 `scripts/content/checkFeedbackRuntimeAdapter.js`，让未来接入前的安全网更具体。本轮仍不接 `feedbackEngine`，不改 `data/feedbackTexts.js`，不改 generated data，也不改变玩家最终 feedback。

本轮检查覆盖：

- generated metadata：确认 `readonly`、`sourceType: "generated"`、`stableIdRequired` 等方向没有丢失。
- stable ID 查询：确认 `getTextById("feedback_classic_001")` 可返回候选，缺失 ID 返回 `null`，中文 `zhCN` 不能作为查询 key。
- tag 查询：确认 `straw_disaster` 可返回 enabled 候选，中文文案不能作为 `feedbackTag` 查询 key。
- scene 查询：确认 `accident` / `followup` 只返回对应 scene 的 enabled 候选。
- disabled 审阅：确认默认查询排除 disabled 文案，`includeDisabled: true` 才能看到 disabled 文案。
- filter 边界：确认 `score`、`scene`、`feedbackTag`、`tone`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId` 和 score range 都是通用过滤，不是内容 if。
- 只读边界：尝试修改返回候选，确认不会污染后续查询或源 generated data。
- invalid data 边界：确认无效数据会让 adapter unavailable，查询为空或 `null`，不会偷偷使用 legacy 文案。

这些检查保护的是“adapter 如何安全提供候选”，不是“哪杯饮品应该选哪句反馈”。最终 feedback 选择、机制判断、fallback 到 legacy 文案系统、接入 `feedbackEngine` 都仍留到后续单独任务。

#### v0.0.7.14 feedbackEngine 旁路读取 generated data docs / schema

v0.0.7.14 只设计未来 `feedbackEngine` 如何旁路读取 generated feedback data，不实现 runtime 接入，不修改 `core/feedbackEngine.js`，不修改 `core/feedbackRuntimeAdapter.js`，不修改 generated data，也不改变玩家最终看到的 feedback。

核心边界：

- `feedbackEngine` 仍是最终 feedback 选择的边界之一。
- generated feedback data 只是新的文案池来源，不是机制判断来源。
- `feedbackRuntimeAdapter` 只提供只读候选查询，不决定最终 feedback。
- legacy `data/feedbackTexts.js` / `feedbackEngine` 在默认状态下继续产出玩家最终文案。
- 任何玩家可见 feedback 变化都必须单独记录、跑 golden，并由用户作为制作人审核体验。

未来可考虑的配置边界：

```js
{
  useGeneratedFeedbackTexts: false,
  generatedFeedbackMode: "off", // "off" | "debug" | "shadow" | "partial" | "active"
  enabledGeneratedFeedbackTags: []
}
```

默认模式应为 `off` 或 `debug`，不改变玩家结果。任何 `active` 接管都必须作为单独任务实现，不能通过散落 if 控制某个具体 `textId`、`zhCN` 或文案池。

渐进接入路线：

1. Phase 1：旁路读取 / debug-only。
   - `feedbackEngine` 可读取 generated 候选池，但不用于最终输出。
   - 仅通过 debug 字段、脚本或 comparison 报告观察候选。
   - 不改现有 golden expected。
2. Phase 2：shadow comparison。
   - legacy feedback 仍是玩家最终结果。
   - generated 候选作为旁路结果记录，用于制作人评审。
   - 可比较 `legacy feedbackTag`、generated candidate `textId`、`scene`、`tone`、score range 和 fallback reason。
3. Phase 3：小范围 tag 试点 / partial。
   - 只允许极少数低风险 `feedbackTag` 进入 generated 文案池试点。
   - 必须有 feature flag、tag whitelist、legacy fallback、golden 保护和制作人审核。
   - 每次试点都应有明确变更记录，不能一次性替换全部反馈系统。
4. Phase 4：active 逐步扩大。
   - 只能按 `feedbackTag` / `scene` / stable result ID 分批迁移。
   - 每次玩家可见 feedback 改变都需要有意识更新 golden expected。
   - 仍保留 fallback 和关闭开关，便于回滚。

fallback 边界：

- generated data 缺失时，legacy `data/feedbackTexts.js` 仍可工作。
- generated data validator 失败、adapter unavailable 或 adapter 创建失败时，不应让 `tasteJudge` / `feedbackEngine` 崩溃。
- fallback 必须可报告，例如记录 mode、reason、adapter issues 和是否使用 legacy。
- 不要为了维持输出把坏 generated data 当正常数据用，也不要吞掉错误后假装 generated 路径成功。
- generated data 有问题时应回到 validate / build / generated validator 修复，而不是在 engine 里补内容特例。

shadow comparison 只用于观察，不自动替换最终结果。代表结构可考虑：

```js
{
  mode: "shadow",
  legacy: {
    feedbackTags: [],
    feedback: ""
  },
  generated: {
    available: true,
    candidateTextIds: [],
    scene: "normal",
    tone: "classic",
    fallbackReason: null
  }
}
```

反 if 边界：

- 不允许 `if (textId === "xxx")` 这种接管逻辑。
- 不允许 `if (zhCN.includes("榴莲"))` 或按中文文案决定机制逻辑。
- 不允许 `if (displayName === "榴莲")` 这类显示文案主键回潮。
- 不允许为某个 golden sample、具体文案池或具体原料组合写散落 if。
- 不允许自动调 `tone` / score / `scene`，也不允许自动改 generated data。
- 允许通用 feature flag、通用 tag whitelist、通用 `scene` / `feedbackTag` / `accidentTypeId` / `drinkTypeId` / `outcomeTypeId` 过滤、通用 fallback 和通用 debug comparison。

golden / 验收边界：

- debug-only / shadow mode 不应改现有 golden expected。
- active 接管前必须新增或更新 golden expected。
- 任何玩家可见 feedback 变化都需要明确记录。
- 任何 generated data 接管都需要制作人审核。
- runtime 接入任务必须做 UI smoke；docs-only 的 v0.0.7.14 不需要 UI smoke。
- 如果未来设计改变 Google Sheets / CSV 字段、文案内容、generated 结构、`feedbackTag` / `scene` / `tone` 含义，或把 warning 改成 error，必须先标记为“需要用户制作人确认”。

#### v0.0.7.15 generated feedback data runtime loading docs / schema

v0.0.7.15 只设计 generated feedback data 未来如何进入 browser / runtime，不实现 runtime loading，不修改 `index.html`，不修改 build script，不生成 JS data module，不修改 generated JSON，也不改变玩家最终 feedback。

当前仓库仍是普通 browser script 架构：`index.html` 通过同步 `<script>` 加载 `data/*.js`、`core/*.js` 和 `ui/*.js`，现有 `data/feedbackTexts.js` 通过全局对象提供 legacy 文案池。基于这个结构，未来 loading 方案应优先减少 async 初始化和缓存误判风险。

三种路线比较：

1. 方案 A：runtime fetch JSON。
   - 形态：浏览器通过 `fetch("data/generated/feedbackTexts.generated.json")` 加载。
   - 优点：保留 JSON 作为标准 generated artifact，便于 Node 工具链校验。
   - 风险：会引入 async 初始化，`feedbackEngine` / `tasteJudge` / UI 点击路径需要等待加载状态；本地 file 直接打开、dev server、GitHub Pages、缓存和网络错误都需要单独处理。
   - fallback：fetch 失败、JSON parse 失败或 generated validator 未通过时必须报告并走 legacy，不能把缺失数据当成功。
   - 当前判断：不适合现在优先做；除非项目切到更明确的 async app 初始化或 bundler 流程。
2. 方案 B：build 生成 JS data module。
   - 形态：未来 build 从已验证 CSV 生成 `data/generated/feedbackTexts.generated.js`，通过 script 标签暴露只读全局对象，例如 `window.MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS`。
   - 优点：贴合当前同步 script 架构，比 fetch JSON 少 async 风险；可通过 `index.html` script 顺序确保 generated data 在 adapter / shadow mode 之前可用；cache query 可延续现有 `?v=...` 管理方式；fallback 也更接近现有 `data/feedbackTexts.js`。
   - 校验：JS module 仍必须由 CSV -> `validateFeedbackSheet` -> build 生成；build 可同时输出 JSON 和 JS，JSON 继续做结构校验与中文可读审计，JS 需要语法检查和全局对象结构检查。
   - 风险：`index.html` script 顺序和 cache query 必须同步，新增 generated JS 的 UI smoke 要检查脚本 200、版本 freshness、无白屏和无 console error。
   - 当前判断：优先推荐作为后续小步方向。
3. 方案 C：runtime 继续只读 legacy，generated data 只给 Node / 工具链。
   - 形态：继续保持 generated JSON 只用于 validator / build / adapter check，不进入 browser。
   - 优点：短期最安全，适合继续评审文案和完善内容管线。
   - 风险：会推迟真实 shadow mode，generated 文案池无法在浏览器路径下验证加载、缓存和 fallback。
   - 当前判断：适合作为 v0.0.7.15 之后的一小段缓冲，但不应长期停留。

推荐方向：

> 当前阶段优先考虑方案 B：generated JS data module。

推荐理由：

- 当前项目不是 async app / bundler 架构，而是普通 script 标签顺序加载。
- JS data module 更接近现有 `data/*.js` 数据加载方式。
- 可以避免 fetch JSON 带来的 async 初始化、file 打开、GitHub Pages 路径和网络错误复杂度。
- 更适合小步进入 `feedbackEngine` shadow mode：先加载全局 generated data，但不接最终 feedback，再由 adapter 做只读 comparison。
- cache query、script 顺序和 UI smoke 风险都能沿用现有 runtime cache-busting 工作流。

无论采用哪条路线，都必须保持以下边界：

- generated data 仍来自已通过 validate / build / generated validation 的源。
- runtime 不读取 CSV，不读取 Google Sheets，不直接读取人类编辑源。
- runtime 不修复 generated data，不自动改文案，不自动调参数。
- generated data 加载失败不能静默当成功；fallback 到 legacy 必须可报告。
- 任何玩家可见 feedback 变化都必须作为单独任务推进，并经过制作人审核和 golden 记录。
- 本轮不接 runtime，不改最终反馈，不需要用户人工看表。

后续小步可考虑：

1. generated JS data module docs / build 设计。
2. build script 输出 JS data module。
3. validate generated JS / JSON 结构。
4. `index.html` 只加载 generated data module，但不接 `feedbackEngine`。
5. `feedbackEngine` shadow mode 只读实现。
6. shadow output / comparison check。
7. 制作人审核。
8. partial / active 接管另开任务。

允许的通用逻辑：

- 按 `textId` 建索引。
- 按 `feedbackTag` 分组。
- 按 `scene` 分组。
- 类型转换，例如 `"TRUE"` -> `true`。
- 空字符串按字段语义转成 `null`。
- 分数字段转 number / `null`。
- 生成只读 metadata。

本设计不要求用户改变当前 Google Sheets 字段，也不要求用户额外填新字段。未来如果为了 build / adapter 改变人类表格字段或 Google Sheets 工作台使用方式，应先由用户作为制作人确认。

#### v0.0.7.16 build script 输出 generated JS data module

v0.0.7.16 已让 `scripts/content/buildFeedbackData.js` 支持根据 `--out` 后缀输出两种 generated artifact：

- `.json`：继续输出 `data/generated/feedbackTexts.generated.json`，作为结构校验、adapter check 和内容审计的机器可读正本。
- `.js`：新增输出 `data/generated/feedbackTexts.generated.js`，作为 browser runtime 未来可通过同步 `<script>` 加载的数据模块。

当前命令：

```bash
node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json
node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.js
```

generated JS data module 的定位：

- 它是 generated JSON 的 browser script 形态，内容来自同一份已通过 validator 的 CSV。
- 它通过 `window.MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS` 暴露一个稳定全局只读对象。
- 它不使用 ES module `import` / `export`，不依赖 bundler，贴合当前同步 script 架构。
- 它不读取 CSV / Google Sheets / 人类编辑源。
- 它不接 `index.html`，不接 `feedbackEngine`，不改变玩家最终 feedback。
- 它不承载机制判断，不根据 `zhCN`、displayName、某个 `textId`、某个 golden sample 或具体原料组合做逻辑分支。

generated JSON 与 generated JS 的关系：

- 两者由同一个 build 数据对象生成，schemaVersion 当前同步为 `feedbackTexts.generated.v0.0.7.16`。
- JSON 继续由 `scripts/content/validateGeneratedFeedbackData.js` 校验顶层结构、索引一致性和 stable ID 边界。
- JS 由 `scripts/content/checkGeneratedFeedbackDataModule.js` 加载到 Node `vm` 中，检查全局对象、只读边界、`textsById` / `textsByTag` / `textsByScene`、sample `textId`、中文可读性、metadata 和 JSON 对齐关系。
- build 不写动态时间戳；同一 CSV 重复 build 不应产生无意义 diff。

对 Google Sheets / CSV 工作流的影响：

- 本轮不改 CSV 字段，不改用户文案，不要求用户改变 Google Sheets 工作方式。
- 人类继续编辑 CSV / Sheets；runtime 未来只应读取 generated artifact。
- 如果未来需要改变字段、文案内容、generated 结构或让 generated data 影响玩家最终 feedback，必须作为单独任务并由用户制作人确认。

本轮仍不做：

- 不让 `index.html` 加载 generated JS。
- 不实现 runtime loading。
- 不接 `feedbackEngine` / adapter。
- 不改 `data/feedbackTexts.js`。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。

代表 schema 示例：

```text
feedback_texts.csv
feedbackTag,textId,zhCN,scene,minScore,maxScore,accidentTypeId,drinkTypeId,notes,enabled
```

- `feedbackTag` 是结构化标签，不是显示文案。
- `textId` 是文案 ID，可用于去重、追踪和多语言对齐。
- `zhCN` 是中文显示文案，不是主键。
- `scene` 可区分普通、事故、追评等使用场景。
- `enabled` 用于临时下线某条文案，而不是删除历史。

```text
severity_rules.csv
ruleId,candidateType,sourceLayer,triggerMetric,priorityBand,severityHint,severityLevel,scoreMultiplier,minValue,maxValue,feedbackTags,enabled
```

- `ruleId` 是稳定规则 ID。
- `candidateType`、`sourceLayer`、`triggerMetric` 应来自已知枚举。
- `severityHint` 可以继续保留提示语义；`severityLevel` / `scoreMultiplier` 是 v0.0.7.x 后续调参字段。
- 本轮只设计字段，不填数据，不接管最终判定。

```text
candidate_thresholds.csv
ruleFamilyId,candidateId,sourceSummary,triggerMetric,warningThreshold,accidentThreshold,priorityBand,severityHint,enabled
```

- `ruleFamilyId` 和 `candidateId` 是稳定 ID。
- `sourceSummary` 应指向 `tasteSummary` / `textureSummary` / `flavorSummary` 等已知来源。
- `warningThreshold` / `accidentThreshold` 必须有范围校验，且变更后要说明 golden 影响。

```text
localization_texts.csv
textKey,zhCN,enUS,jaJP,esES,context,notes
```

- `textKey` 是稳定 key。
- 各语言列都是显示文案，不参与机制判断。
- `context` 用于帮助译者理解场景，不能替代系统 ID。

导入校验至少需要覆盖：

- stable ID 是否存在，是否出现未知 ID。
- 是否重复 ID。
- 是否缺必填字段。
- 枚举值是否合法。
- 数值是否越界。
- 是否把 `displayName` / 中文名误当主键。
- 是否改了不该改的 generated 文件。
- 生成结果是否破坏 runtime 可读结构。
- 是否影响 golden samples；影响时必须明确是否需要有意识更新 expected。

v0.0.7.x 初期建议先做 feedback 文案 / `feedbackTags`。原因是它最适合非程序员编辑、风险较低、能明显改善游戏表达，而且不直接改评分。第二优先级是 severity / threshold 配置，因为它是调参核心，但必须先有校验和 golden 保护。第三优先级是 profile 可调字段，影响面较大，适合在管线成熟后再迁。第四优先级是多语言文案，未来重要但当前不急，应建立在 stable ID + localization key 之上。

#### v0.0.7.21 feedback shadow 评审包 / 对比输出设计

feedback shadow review pack 是给制作人看的评审入口，不是给 runtime 自动判定的机制层。它的目标是把 legacy 最终 feedback 与 generated shadow 候选放在同一份报告里，让制作人判断旧反馈是否还能用、generated 候选是否合适、哪些 `feedbackTag` / `scene` / `tone` 需要调整，以及哪些文案未来可以进入 partial / active 接管。

评审包应清楚回答：

- 当前 sample 的 legacy final feedback、score、type、stable IDs 和 `feedbackTags` 是什么。
- `result.generatedFeedbackShadow` 是否存在，且 `affectsFinalFeedback` 必须是 `false`。
- generated shadow candidates 来自哪些 `textId`、`feedbackTag`、`scene`、`tone` 和 `zhCN`。
- 是否存在 `fallbackReason`、adapter unavailable、generated data unavailable 或 validator / generated validator warnings。
- 这个 sample 是否需要制作人审核，审核重点是什么。
- 制作人的审核结论和备注应记录在哪里，但不自动反写到 CSV、generated data、golden expected 或 runtime。

建议 JSON source 结构：

```json
{
  "schemaVersion": "feedbackShadowReview.v0.0.7.x",
  "generatedAt": null,
  "source": {
    "goldenSampleId": "classic_milk_tea",
    "recipeName": "经典奶茶",
    "recipe": [
      { "ingredientId": "tea_black", "name": "红茶", "ratio": 45 }
    ]
  },
  "legacy": {
    "feedback": "legacy final feedback",
    "score": 74,
    "type": "经典奶茶",
    "accidentTypeId": null,
    "drinkTypeId": "classic_milk_tea",
    "outcomeTypeId": null,
    "feedbackTags": ["classic"]
  },
  "shadow": {
    "enabled": true,
    "mode": "shadow",
    "affectsFinalFeedback": false,
    "source": "generatedFeedbackTexts",
    "fallbackReason": null,
    "candidates": [
      {
        "textId": "feedback_classic_001",
        "feedbackTag": "classic",
        "scene": "normal",
        "tone": "classic",
        "zhCN": "generated candidate text",
        "matchReason": "feedbackTag"
      }
    ],
    "metadata": {
      "readonly": true,
      "generatedDataAvailable": true,
      "adapterAvailable": true,
      "checkedFeedbackTags": ["classic"]
    }
  },
  "checks": {
    "shadowAffectsFinalFeedback": false,
    "finalFeedbackChanged": false,
    "validatorWarnings": [],
    "generatedDataWarnings": [],
    "info": []
  },
  "review": {
    "needsHumanReview": true,
    "reviewFocus": ["tone", "text", "tag coverage"],
    "reviewStatus": "pending",
    "producerComment": "",
    "preferredTextId": null,
    "needsNewText": false,
    "toneIssue": false,
    "tagIssue": false,
    "tooAI": false,
    "tooHarsh": false,
    "notFunny": false,
    "wrongTrigger": false,
    "suggestedRewrite": ""
  }
}
```

字段边界：

- `legacy` 只记录玩家当前真正会看到的最终输出，不由评审包改写。
- `shadow` 只记录 generated 候选和 fallback 状态，必须保持 `affectsFinalFeedback: false`。
- `checks` 是机器可收集的结构信息和 warning 汇总，不判断文案好坏。
- `review` 是制作人审核区，记录主观判断、偏好和改写建议；它不是 runtime 输入，也不是自动接管开关。

未来输出格式建议：

1. 第一步优先做 Markdown review pack + JSON source。
   - Markdown 适合快速阅读，按 golden sample 分块展示 legacy feedback、generated candidates、fallback / warnings 和 review focus。
   - JSON 作为机器可处理正本，便于后续生成 Markdown、Sheets 或差异报告。
2. 样本量变多后，再导出 Google Sheets 审核表。
   - Sheets 适合筛选 `feedbackTag`、`scene`、`tone`、`reviewStatus` 和批量填写 `producerComment`。
   - 如果未来要把 review 字段加入正式 Google Sheets 工作台，必须先由用户制作人确认；本设计不要求现在改变 `feedback_texts` CSV / Sheets 字段。

Markdown 代表形态：

```text
## classic_milk_tea

Legacy feedback:
红茶和牛奶配合得很稳……

Generated shadow candidates:
- feedback_classic_001 / classic / normal / classic
  经典的珍珠奶茶……

Checks:
- affectsFinalFeedback: false
- fallbackReason: none

Review focus:
- tone 是否合适
- 文案是否太平
- tag coverage 是否足够
```

评审包生成边界：

- 读取 golden samples / sample recipes，运行 `tasteJudge`，收集 legacy final output 和 `generatedFeedbackShadow`。
- 可以汇总 validator warnings、generated validator warnings、adapter info 和 fallbackReason。
- 不改变 `result`，不改 golden expected，不改 runtime，不写入 generated data，不自动采纳制作人意见。
- 不根据中文文案、`zhCN`、displayName 或某个 sample 自动判断好坏。
- 不为某个 sample 写特殊结论，不自动决定 partial / active 接管，不自动改文案。
- 允许通用收集字段、通用 legacy / shadow 对比、通用 `needsHumanReview` 标记和通用 warning / info 汇总。

制作人审核是 partial / active 接管前的必要环节。任何会改变玩家可见 feedback 的后续任务，都应先明确哪些 generated 文案已经经过制作人审核、哪些仍需保留 legacy、哪些需要新增或重写文案，并同步 golden 记录。

#### v0.0.7.24 severity / threshold 表格化路线设计

v0.0.7.24 只设计 severity / threshold 的表格化路线，不实现 severity engine，不新增 severity / threshold CSV、JSON 或 generated data，不接 runtime，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。

本轮首先把几个容易混在一起的概念拆开：

- `accidentTypeId` 回答“这是什么机制问题”，例如 `taste_acid_overload` 表示酸度过载机制。
- `priorityBand` 回答“这类候选应该先被哪个粗分组查看”，用于候选排序 / 调度观察。
- `severityHint` 回答“当前候选给未来 severity 系统的语义提示”，还不是最终扣分档。
- `severityLevel` 回答“这个问题有多严重”，未来才可能进入分数、反馈强度或重大事故判断。
- `scoreMultiplier` 回答“severity 对最终分数怎样施加影响”，必须在明确调参任务中显式接入。

因此，事故判定顺序和 severity 是两条线。事故类型回答“是什么问题”，优先级回答“先处理哪个问题”，severity 回答“问题有多严重 / 对分数影响多大”。高优先级类别不等于自动高 severity：热水 + 鸡蛋凝固可以是硬性物理重大事故；热饮 + 珍珠 / 粗吸管更可能只是服务 warning；芋泥 + 奥利奥 + 珍珠导致吸不上来，才可能是高 severity 质地事故。低 severity warning 可以只影响文案或少量扣分；高 severity 才进入重大事故、重扣分或归零路线。

`accidentTypeId` 应是机制类别，不是某个配方样本名，也不是某个具体原料名。`taste_acid_overload` 是酸度过载机制；柠檬、山楂、百香果、青柠、酸梅等可以是触发来源或测试配方，不应机械拆成 `taste_acid_overload_lemon`、`taste_acid_overload_hawthorn` 等样本式事故。未来文档和 report 应清楚分离：

- `sampleId`：例如 `extreme_lemon_accident`，代表某个 golden / review sample。
- sample title：例如“极端柠檬事故”，给人类读。
- `accidentTypeId`：例如 `taste_acid_overload`，给机制和回归使用。
- `displayName`：例如“酸度过载 / 酸度超标 / 酸度爆炸”，给 UI 或报告显示。

本轮不重命名现有 sampleId / golden ID。未来如果要改 sampleId，必须单独做迁移任务，并保护 golden expected、review pack、历史报告和文档引用。

也不能机械禁止所有“原料相关机制”。关键判断是：它是否真的是独立机制。榴莲可以是风味身份 / 香气压力 / 争议风险；奥利奥可能进入沉积、固形物负载、甜腻风险；芋泥可能进入泥糊质地、液体支撑、吸管阻力。原则是：

```text
不能按原料机械拆事故；只能按机制拆事故。
```

severity / threshold 表格未来应基于 stable ID 和结构化 summary / candidate 字段，而不是基于 `zhCN`、displayName、sampleId、单个 textId、单个原料名或单个 golden sample。更合适的输入包括：

- 三层 summary 的 `values` / `tags` / `risks` / `evidence` / `metadata`。
- candidate 的 `candidateType`、`sourceLayer`、`sourceSummary`、`triggerMetric`、`triggerValue`、`thresholds`、`priorityBand`、`severityHint`、`ruleFamilyId`。
- stable ID：`accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`candidateId`、`ruleId`。
- generated table data 中经过校验的阈值、severity 档、score 边界和人工审核标记。

未来建议表名优先使用 `candidate_severity_rules`。原因是 severity 不只服务 accident，也可能服务 outcome、drinkType、feedback candidate；`accident_severity_rules` 太窄，`severity_threshold_rules` 太泛。`candidate_severity_rules` 更能表达“基于 summary candidate 做 severity / threshold 映射”的位置。

未来表格字段可以考虑：

```text
ruleId
enabled
candidateType
accidentTypeId
outcomeTypeId
drinkTypeId
feedbackTag
sourceLayer
sourceSummary
triggerMetric
triggerMin
triggerMax
priorityBand
severityHint
severityLevel
severityLabel
scoreMultiplier
scoreCap
scoreFloor
feedbackIntensity
requiresHumanReview
notes
```

这些字段只是 schema 草案，本轮不填写具体阈值，不给出具体 `scoreMultiplier` 数值，不让它们影响 runtime。

设计目标需要回答九个问题：

1. severity / threshold 表描述的是“候选问题在什么指标区间内多严重”，不是样本文案或原料特例。
2. 它位于 `summaryCandidates` / `candidatePriorityShell` 之后，读取候选和 summary 的结构化字段。
3. `severityHint` 只是 candidate 侧提示，未来由表格和校验生成明确 `severityLevel`。
4. `scoreMultiplier` 只有在单独接入任务中影响分数，不能隐藏在 summary 或 candidate builder 里。
5. 第一阶段应 shadow / debug 先行，不直接接管 final score、事故、feedback 或 `result.type`。
6. 管线应沿用 Google Sheets / CSV → validate → build → generated data 的离线内容流程。
7. 反 if 原则优先：内容进表格，校验进 validator，runtime 只做通用读取、匹配、排序和 fallback。
8. golden expected 只能有意识更新，且必须说明是 severity、threshold、score 或反馈策略变化。
9. 机制事故类别与测试 sample 必须分离；sample 只是验证配方，不是机制 ID。

可考虑的小步路线：

1. Phase 0：docs / schema，本轮只完成路线设计。
2. Phase 1：创建少量 severity / threshold 样例表或 JSON 草案，不接 runtime。
3. Phase 2：实现 validator，检查 stable ID、枚举、数值区间、字段完整性和反显示文案主键。
4. Phase 3：build generated data，保持 deterministic，不手改 generated 文件。
5. Phase 4：generated validator / structure check，保护索引、中文可读性和字段边界。
6. Phase 5：shadow / comparison，只输出 debug 或 review 数据，不改变玩家最终结果。
7. Phase 6：制作人 review + golden review，确认体验、文案、判定和 expected 是否需要有意识更新。
8. Phase 7：partial takeover，小范围让 generated severity 影响非玩家可见字段或单一路径。
9. Phase 8：active expansion，在 golden、review 和 fallback 充分后扩大接管。

这只是可考虑路线，不代表本轮已决定后续版本，也不代表已经创建任何表格、脚本、generated data 或 runtime 入口。

与现有系统关系：

- legacy analyzer / `tasteJudge` 仍负责最终 score、事故、饮品类型、feedback 和 `result.type`。
- `summaryCandidates` 和 `candidatePriorityShell` 当前仍是只读观察结构。
- 未来 severity shadow 可以参考 `generatedFeedbackShadow`：只读、可报告、不可静默吞错、默认不影响玩家最终输出。
- runtime 只应读取 bundled generated data，不读 Google Sheets、在线 Drive、远程 CSV、人工草稿或 Excel 文件。
- active takeover 必须单独开任务，先有制作人审核、golden expected 记录、fallback 策略和必要 UI smoke。

明确禁止：

- 按 `sampleId` 写规则。
- 按中文文案、displayName、`zhCN` 或反馈文本片段写机制判断。
- 按单个原料名写特殊扣分。
- 为某个 golden sample 写硬编码。
- 在 engine 中堆散落 threshold if。
- 在 validator 中写具体样本例外。
- 绕过表格化内容管线直接手改 generated data。
- 把 `priorityBand` 当成 `severityLevel`。
- 把 `severityHint` 当成最终扣分档。
- 把 `scoreMultiplier` 藏在 summary / candidate builder 里。

允许存在：

- 通用区间判断。
- 通用枚举校验。
- stable ID 引用检查。
- generated data lookup。
- 通用 severity mapping。
- 通用 fallback。
- 通用 golden assertion helper。

golden expected 的更新原则也要同步：本轮不改 expected。正式接管前，可以先增加 shadow / structure expected；一旦会改变 final score、feedback、accident、type 或 `result.type`，必须说明产品理由，并记录是机制判断、阈值、severity 档、反馈策略还是分数策略变化。不能为了“让测试变绿”而改 expected，也不能把 sampleId 当 accidentTypeId。

#### v0.0.7.25 severity / threshold 样例表 schema

v0.0.7.25 继续细化未来 severity / threshold 表格的字段 schema 和人类编辑边界。本轮仍只做 docs / schema 设计，不创建 CSV、JSON 或 generated data，不实现 validator / build script，不接 runtime，不调具体数值，不改 golden expected。

推荐未来表名优先使用：

```text
candidate_severity_rules
```

推荐理由：

- 它不只服务事故，也可以服务 `outcome` / `drinkType` / `feedback` candidate。
- 它表达的是“candidate 进入 severity 调参层”，不会误导为只处理事故。
- 它比 `severity_threshold_rules` 更具体，比 `accident_severity_rules` 更宽。

暂不优先使用：

- `accident_severity_rules`：容易误导为只处理事故，无法自然覆盖 outcome、drinkType、feedback candidate。
- `severity_threshold_rules`：名称过泛，不容易看出它位于 `summaryCandidates` / `candidatePriorityShell` 后面的 candidate 调参层。

未来样例表头草案：

```text
ruleId,enabled,candidateType,accidentTypeId,outcomeTypeId,drinkTypeId,feedbackTag,sourceLayer,sourceSummary,triggerMetric,triggerMin,triggerMax,priorityBand,severityHint,severityLevel,severityLabel,scoreMultiplier,scoreCap,scoreFloor,feedbackIntensity,requiresHumanReview,notes
```

字段说明：

- `ruleId`
  - stable rule ID。
  - 例如未来可有 `taste_acid_overload_high`，但它是 `ruleId`，不是 `accidentTypeId`。
  - 不使用中文，不使用 displayName，不使用 sampleId。
- `enabled`
  - 是否启用。
  - 未来人类编辑源可使用 `TRUE` / `FALSE`，由 validator 规范化。
- `candidateType`
  - rule 作用的候选类型，例如 `accident`、`outcome`、`drinkType`、`feedback`。
- `accidentTypeId`
  - 机制大类，例如 `taste_acid_overload`。
  - 禁止写成 `taste_acid_overload_lemon`、`taste_acid_overload_hawthorn`。
  - 禁止携带 severity 后缀，例如 `taste_acid_overload_high`。
  - 合法性最终应由 known stable ID registry / enum / schema 判断。
  - 原料后缀 / severity 后缀检查只能作为辅助 warning / lint hint，不能替代 registry 校验。
  - future validator 不应仅靠 `includes("_high")`、`endsWith("_lemon")`、`includes("lemon")` 这类字符串猜测判定 `accidentTypeId` 非法。
  - 如果未来确有合法机制 ID 包含看起来像原料或 severity 的词，也应以 registry / enum / schema 为准，不能被字符串规则误杀。
- `outcomeTypeId`
  - 可选 outcome stable ID。
- `drinkTypeId`
  - 可选 drink type stable ID。
- `feedbackTag`
  - 可选 feedback stable tag。
- `sourceLayer`
  - 稳定来源枚举，例如 `taste`、`texture`、`flavor`、`structure`、`legacy`。
- `sourceSummary`
  - 结构来源，例如 `tasteSummary`、`textureSummary`、`flavorSummary`、`summaryCandidates`、`candidatePriorityShell`。
- `triggerMetric`
  - 结构化触发指标，例如 `acidity`、`strawResistance`、`fatLoad`、`aromaPressure`。
- `triggerMin` / `triggerMax`
  - 指标区间边界，描述“看哪个结构化指标落在哪个区间”。
  - 本轮不填写真实阈值数字。
- `priorityBand`
  - 粗分组，用于候选观察 / 排序，不等于 severity。
- `severityHint`
  - candidate 层已有提示，不是最终扣分。
- `severityLevel`
  - 未来真正严重度层级。
- `severityLabel`
  - 人类可读严重度说明。
- `scoreMultiplier`
  - 未来可能影响分数的乘区字段。
  - 本轮只设计字段，不填具体值，不让它影响 runtime。
- `scoreCap`
  - 未来可能限制分数上限的字段。
- `scoreFloor`
  - 未来可能限制分数下限的字段。
- `feedbackIntensity`
  - 未来可能影响反馈语气强度的字段。
- `requiresHumanReview`
  - 标记未来哪些规则需要制作人复核。
- `notes`
  - 制作人 / 调参备注，不参与机制判断。

这些 candidate 目标字段用于说明 rule 作用于哪类 candidate。`accidentTypeId` / `outcomeTypeId` / `drinkTypeId` / `feedbackTag` 为空表示不限制，不代表未知主键。

必须保持以下边界：

```text
priorityBand != severityLevel
severityHint != final severity
severityLevel 才是未来真正调参层级
```

错误示例与正确示例：

错误 1：把原料拆成事故类型。

```text
错误：
accidentTypeId: taste_acid_overload_lemon
accidentTypeId: taste_acid_overload_hawthorn

正确：
accidentTypeId: taste_acid_overload
```

柠檬、山楂、百香果等应该作为 evidence / recipe / sample source，不应该拆事故 ID。

错误 2：把 severity 写进 `accidentTypeId`。

```text
错误：
accidentTypeId: taste_acid_overload_high

正确：
ruleId: taste_acid_overload_high
accidentTypeId: taste_acid_overload
severityLevel: high
```

validator 判错边界：

```text
taste_acid_overload_high 的错误原因：
它不是已登记的 accidentTypeId。

不是因为 validator 只看到 "_high" 后缀就硬判非法。
```

错误方向：

```js
if (accidentTypeId.includes("_high")) error
if (accidentTypeId.includes("_lemon")) error
```

原因：这会把 validator 做成新的脆弱 if 树，后续一旦出现合法但名字里带相似片段的 stable ID，就可能被误杀。

正确方向：

```text
knownAccidentTypeIds = [
  "taste_acid_overload",
  "texture_straw_resistance",
  "dairy_fat_overload",
  ...
]

if accidentTypeId not in knownAccidentTypeIds -> error
```

可以保留通用 lint / warning：如果 `accidentTypeId` 看起来像 sampleId、displayName、具体原料拆分 ID 或带 severity 后缀，可以提示人工复查；但最终合法性仍以 known stable ID registry / enum / schema 为准。

错误 3：把 sampleId 当 rule key。

```text
错误：
ruleId: extreme_lemon_accident

正确：
ruleId: taste_acid_overload_high
accidentTypeId: taste_acid_overload
```

sampleId 只用于 golden / review pack / 测试定位，不是正式机制规则主键。

示意行只能用于说明字段，不是最终参数，不代表真实阈值，不代表真实 `scoreMultiplier`，不进入 runtime，也不改 golden expected：

```text
ruleId: taste_acid_overload_high
candidateType: accident
accidentTypeId: taste_acid_overload
sourceLayer: taste
sourceSummary: tasteSummary
triggerMetric: acidity
triggerMin: [TBD]
triggerMax: [TBD]
priorityBand: taste_overload
severityHint: high
severityLevel: [TBD]
scoreMultiplier: [TBD]
notes: 酸度过载机制大类，不按柠檬/山楂/百香果拆事故类型。
```

未来 validator 应检查：

- `ruleId` 必填且唯一。
- `ruleId` 不能是中文、displayName、sampleId。
- `enabled` 合法。
- `candidateType` 合法。
- `accidentTypeId` / `outcomeTypeId` / `drinkTypeId` / `feedbackTag` 若填写，必须是已知 stable ID。
- `accidentTypeId` 合法性必须来自 known stable ID registry / enum / schema，不应只靠字符串后缀 / substring 猜测。
- `accidentTypeId` 若看起来携带原料后缀或 severity 后缀，可以给 warning / lint hint；但是否 error 应以已登记机制 ID 集合为准。
- `sourceLayer` / `sourceSummary` / `triggerMetric` 必须属于已知集合。
- `triggerMin` / `triggerMax` 为空或数字区间合法。
- `scoreMultiplier` / `scoreCap` / `scoreFloor` 若填写，必须在未来允许范围内。
- 不允许把 `zhCN`、displayName、sampleId 当机制主键。
- 不允许手改 generated data 绕过 source sheet。

validator 不应：

- 为某个 sampleId 写例外。
- 为某个中文文案写例外。
- 为某个具体原料写例外。
- 自行判断文案好坏。
- 自行改分数。

未来 generated severity data 边界：

- 必须由已通过 validator 的表生成。
- 按 `ruleId` 建索引。
- 可按 `candidateType` / `accidentTypeId` / `sourceLayer` / `triggerMetric` 建分组。
- generated data 必须 deterministic。
- runtime 不读取 Google Sheets / CSV。
- runtime 只读取随版本打包的本地 generated JSON / JS。
- generated data 不手改。

与现有系统关系：

- 当前 legacy analyzer / judge 仍负责最终 score / accident / type / feedback。
- `summaryCandidates` 和 `candidatePriorityShell` 仍是只读观察层。
- severity / threshold 表未来应读取 summary / candidate / priority 的结构字段。
- 本轮不接管，不改 runtime。
- future shadow severity 应先类似 `generatedFeedbackShadow`，不影响最终结果。
- partial / active 接管必须另开任务。

需要用户制作人确认的点：

- 未来是否愿意在表格里填写 `scoreCap` / `scoreFloor` / `feedbackIntensity` 这类复杂字段。
- 未来是否需要新增或修改事故类型 ID。
- 未来何时填写具体阈值数字和 `scoreMultiplier` 数字。
- 未来何时允许 severity 影响玩家最终 score / feedback / accident / `result.type`。
- 未来哪些 golden expected 属于有意识调参更新。

#### v0.0.7.26 severity / threshold 样例表草案

v0.0.7.26 新增 `content_sheets/examples/candidate_severity_rules.sample.csv` 和 `content_sheets/examples/candidate_severity_rules.sample.json`，用于验证 `candidate_severity_rules` 的字段顺序、人类可读性和 future validator 方向。

这两个文件是人类编辑源草案，不是 runtime data，不放入 `data/generated`，也不参与当前 taste judge / feedbackEngine / golden expected。CSV 使用 UTF-8 with BOM，方便 Excel / Numbers / Google Sheets 直接打开时中文不乱码；JSON 保持格式化和中文可读，方便 ChatGPT / Codex / 制作人复查字段。

样例行默认 `enabled=FALSE`，只用于说明草案结构。`triggerMin` / `triggerMax`、`severityLevel`、`scoreMultiplier`、`scoreCap`、`scoreFloor` 等字段保持为空，不填写真实阈值或真实调参数字；需要说明“待定”或“只是草案”的内容写入 `notes`，避免未来 validator 把 `[TBD]` 当成真实枚举或真实数值。

样例覆盖方向：

- 酸度过载事故：`accidentTypeId=taste_acid_overload`，不按柠檬 / 山楂 / 百香果拆事故类型。
- 吸管阻力 / 可饮用性质地事故：`accidentTypeId=texture_straw_resistance`，观察 `strawResistance`。
- 奶脂 / 厚重负担机制：`accidentTypeId=dairy_fat_overload`，观察 `fatLoad`。
- 风味身份 / 香气压力反馈方向：`feedbackTag=aroma_pressure`，仍需制作人确认是否形成独立反馈。
- taste conflict outcome 方向：`outcomeTypeId=taste_conflict`，不代表当前 outcome 接管。

这些样例只验证字段、人类可读性和 future validator 方向，不改变 summary / candidate / priority shell，不改变玩家最终 score、feedback、accident、type 或 `result.type`。

### 4.8 不只原料有属性

原料有 profile，但组合规则、事故规则、反馈规则和结果候选也应逐步拥有结构化 metadata，例如：

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

不要长期把“某原料 + 某原料”写在代码 if 里。数据负责“判什么”，代码负责“怎么汇总 / 调度”。

### 4.9 if 地狱风险图谱进入 v0.0.6.x 设计

根据 v0.0.6.0 前置只读审计，未来 summary 接管重点是：

- `core/accidentAnalyzer.js`：事故候选、阈值、score / cap / add 等内容判断风险最高。
- `core/proportionAnalyzer.js`：比例段效果、质地负载、乳脂压力等适合逐步进入 summary / effect rules。
- `core/drinkTypeAnalyzer.js`：水果茶泛化、客群启发式和类型候选适合逐步由 summary / drinkType candidate 接管。
- `core/combinationAnalyzer.js`：目前相对健康，主要由数据规则驱动；未来 flavor relation matrix 可接管更复杂关系。
- `core/feedbackEngine.js`：主路径已是 `feedbackTags`，legacy fallback 只允许兼容，不应继续增长。
- `core/tasteJudge.js`：应保持调度层，不应继续积累具体内容判断。

v0.0.6.0 不大规模重写 analyzer，而是先用 schema 定未来迁移方向。

### 4.10 v0.0.6.0 明确不做

本阶段不做：

- 不实现完整三层 summary runtime。
- 不重写 analyzer。
- 不做完整 severity / `scoreMultiplier`。
- 不做大规模调参。
- 不做完整 flavor relation matrix。
- 不做经营 / 顾客 / 图鉴 / 成就系统。
- 不做正式存档系统。
- 不新增大 UI。
- 不为了“消灭所有 if”破坏 engine 调度。

## 5. if 治理原则

核心原则：

> 把 if 从“到处乱接线”，升级成“总电闸 + 规则表驱动”。

项目不是要彻底消灭 if。味觉系统一定需要条件判断。

但 if 不应该像毛细血管一样遍布每个小味道、每句反馈、每个饮品名、每个原料比例。更理想的方式是：

- 少量中枢 if 负责调度。
- 少量中枢 if 负责判断规则是否触发。
- 少量中枢 if 负责处理优先级和安全阈值。
- 具体味觉内容尽量放入规则表、属性表、文案池和测试样本。

具体落点：

- 原料性格放进 `ingredientTasteProfiles.js`。
- 组合协同 / 冲突放进 `combinationRules.js`。
- 饮品类型识别未来放进类型规则表。
- 比例段未来放进比例段规则表。
- 事故判断未来放进事故规则表。
- 反馈文案未来放进标签化文案池。

不要让某个 analyzer 变成新的巨型垃圾桶。

后续尤其要注意：

- `tasteJudge.js` 已经变薄，后续不要让它重新变胖。
- `drinkTypeAnalyzer.js`、`proportionAnalyzer.js`、`accidentAnalyzer.js`、`feedbackEngine.js` 是后续重点治理对象。
- 新增普通组合优先进 `combinationRules.js`。
- 新增原料属性优先进 `ingredientTasteProfiles.js`。
- 新增反馈优先进文案池 / 标签系统。
- 新增类型识别规则未来应进入类型规则表。
- 新增比例规则未来应进入比例段规则表。

未来可继续数据化：

- 饮品模式规则
- 金标样本
- 客群偏好
- 温度 / 冰量 / 糖度规则
- 多原料协同矩阵
- 事故优先级配置

### 反巨大逻辑树警戒

味觉系统尤其要避免把所有判断堆成一棵巨大逻辑树。短期为了让某个样本通过而追加具体 if，往往会在后期变成最难拆的技术债。

后续新增味觉规则时，应先问：

- 这是原料属性吗？优先进入原料属性表。
- 这是组合关系吗？优先进入组合规则表。
- 这是事故条件吗？优先进入事故规则表或专门 rule engine。
- 这是反馈表达吗？优先进入反馈标签和文案池。
- 这是比例 / 结构 / 温度等通用规律吗？优先沉淀为可复用 analyzer 或规则表字段。

禁止为了快速处理单个案例，直接在 `tasteJudge.js`、`accidentAnalyzer.js`、`feedbackEngine.js`、`drinkTypeAnalyzer.js`、`proportionAnalyzer.js` 或新 analyzer 中追加大量具体原料组合分支。

允许少量中枢 if 存在，但它们应该负责调度、规则匹配、优先级和安全阈值；具体内容应尽量由数据表、规则表、文案池和测试样本驱动。

核心原则：宁可一刀慢一点，也不要为了短期效果制造未来需要长期重构的巨大逻辑树。

## v0.0.5.x 反 if 治理优先级

### 当前 Top 风险文件

1. `core/accidentAnalyzer.js`
   - 风险高。
   - 已有大量具体事故判断：极端比例、奶脂过载、工业奶茶、旧吸管阻力等。
   - 后续应逐步迁移到事故规则表，但不要一次全拆。

2. `core/proportionAnalyzer.js`
   - 风险高。
   - 比例段逻辑天然适合规则表：原料、比例区间、分数变化、属性加成、说明文案。
   - 推荐作为 v0.0.5.5 最优先治理目标。

3. `core/drinkTypeAnalyzer.js`
   - 风险中。
   - 饮品类型主规则已数据化，但多水果茶泛化和 audience 识别仍有手写逻辑。

4. `core/feedbackEngine.js`
   - 风险中。
   - 文案池已拆出，但标签提取仍有通过 notes 文本判断机制的风险。
   - 后续应让 analyzer 输出明确 tags，feedback 读取 tags。

5. `core/tasteJudge.js`
   - 风险中。
   - 当前主要是总调度，但仍有多茶、多小料、多乳类、多风味、厚重甜品等中枢逻辑。
   - 后续新增内容不要继续塞进这里。

### 当前健康的数据化模块

以下方向是健康的，应继续保持：

- `data/drinkTypeRules.js`
- `data/feedbackTexts.js`
- `data/structureAccidentRules.js`
- `core/structureAccidentRuleEngine.js`
- `data/combinationRules.js`
- `data/ingredientTasteProfiles.js`

新增内容优先进入这些表或同类新规则表。analyzer 只负责读取、匹配、排序和兜底，不要把表格内容重新写回函数里。

### 下一步建议

- v0.0.5.5 推荐优先治理 `core/proportionAnalyzer.js`。
- 方向是新增 `data/proportionSegmentRules.js` 和通用比例段执行器。
- 先迁移 1-2 类最清晰规则，保持输出稳定。
- 不建议 v0.0.5.5 继续深挖事故系统。
- 原因：v0.0.5.4 刚接入结构事故规则表，继续大拆事故系统容易影响事故优先级和老样本稳定性。

### 短路线图

```text
v0.0.5.5：比例段规则表地基。
不做：不迁完整比例系统、不调味觉数值、不改事故优先级。

v0.0.5.6：金标样本 / 回归样本地基。
不做：不做大型测试框架，不追求覆盖全游戏，只固化 P0 和代表配方。

v0.0.5.7：旧事故规则小范围表格化。
不做：不一次拆完 accidentAnalyzer，优先单原料极端事故或奶脂过载其中一组。

v0.0.6.0 前置：反馈 tags 与 audience 数据化评估。
不做：不新增顾客系统、不做经营、不做完整饮品家族 UI。
```

### 明确暂缓

继续暂缓：

- 完整经营系统
- 顾客销量模拟
- 商店、员工、报表、比赛
- 温度 / 冰量 / 糖度完整功能
- 完整饮品家族 UI
- 玩家自定义命名 UI
- 大规模重写 `tasteJudge.js`
- 一次性全表格化所有事故
- 大量新增原料和全面调分

## 6. 主要判断层级

### 6.1 极端比例事故

单个强风味、强质地或强争议原料比例过高时，应优先触发事故。

重点原料：

- 柠檬：酸度事故
- 榴莲：香气冲击、黏腻、厚重、争议度
- 芋泥：厚重、泥状、吸管阻力
- 奥利奥碎：固形物感、甜腻、吸管阻力
- 淡奶油 / 厚乳：高脂、高油腻
- 小料单项过高：咀嚼负担、吸管阻力

### 6.2 质地事故

质地事故拆成两类，不要混用：

```text
奶脂过载 / 高油腻事故
吸管阻力 / 固形物事故
```

奶脂过载代表喝得动，但喝不下去。

吸管阻力代表物理意义上难吸，像半固体、需要勺子。

### 6.3 冲突组合

冲突组合要解释问题来源，但优先级低于极端比例和质地事故。

当前重点：

- 气泡水 + 淡奶油
- 气泡水 + 厚乳
- 榴莲 + 咖啡
- 柠檬 + 牛奶
- 芋泥 + 气泡水

### 6.4 正常好组合

好组合可以加分，但只能在比例合理时生效。

当前重点：

- 气泡水 + 柠檬
- 绿茶 + 柠檬
- 红茶 + 牛奶
- 乌龙茶 + 厚乳
- 咖啡 + 牛奶
- 草莓 + 淡奶油
- 芒果 + 椰奶
- 茉莉茶 / 绿茶 / 乌龙茶 + 2 到 3 种协调水果

### 6.5 普通分类

只有前面没有触发明显事故、冲突或明确好组合时，才进入普通分类。

普通分类可以包括：

- 清爽水果茶
- 花果茶
- 经典奶茶
- 高级奶茶
- 甜品奶昔
- 咖啡特调
- 工业奶茶
- 实验特调
- 口感事故

## 7. 厚重度和吸管阻力的区别

### 7.1 厚重度 / 油腻感

表示这杯喝起来重、腻、奶感强、负担感强。

主要来源：

- 厚乳
- 淡奶油
- 奶盖
- 牛奶
- 椰奶
- 植脂奶
- 榴莲
- 芋泥
- 奥利奥碎

高厚重不等于吸不上来。

例如：

```text
厚乳 + 淡奶油 + 奶盖
```

应该是奶脂过载或高油腻，不应该直接说吸管辞职。

### 7.2 吸管阻力 / 固形物感

表示杯中块状、颗粒、泥状、咀嚼物太多，影响吸管能不能吸动。

主要来源：

- 珍珠
- 芋圆
- 布丁
- 仙草
- 椰果
- 奥利奥碎
- 芋泥
- 榴莲（中等到偏高，尤其高比例时）

淡奶油、厚乳、奶盖主要是奶脂与厚重，不应单独算作固体。

## 8. 评分原则

评分应先扣事故，再加组合。

建议方向：

- 极端比例事故：大幅扣分
- 严重吸管阻力事故：大幅扣分
- 奶脂过载：中到大幅扣分
- 冲突组合：中到大幅扣分
- 合理好组合：加分
- 经典稳定组合：中高分
- 争议但成立的组合：中等偏上或中等，取决于受众

不要让“命中好组合”成为万能满分按钮。

## 9. 《疯狂摇摇杯》机制考古对 0.0.5.x 的启发

本次考古只作为机制参考，不复制素材、代码、完整数据或破解方式。

观察结论：

- 老游戏的 `NewDB` 更像新档模板，实际运行后的数据库会写入 `Save/01`。
- 饮品被数据化记录，核心字段包括原料编号、原料比例、茶 / 咖啡底、水 / 冷热底、酸、甜、苦、酒精、成本、难度、评分等。
- 调配结构大致是：最多 3 个自选原料 + 原料内部比例 + 一个茶 / 咖啡底 + 一个水 / 冷热底 + 三大块比例（成分 / 底 / 水）。
- UI 实时反馈酸味、甜味、苦味、酒精和成本，说明它不是纯固定配方表，而是有比例加权的味觉向量系统。
- 试喝员反馈显示系统还有隐藏判断：例如红豆 / 绿豆成分比例过高时，虽然酸甜苦酒精数值不一定极端，但试喝评分会崩，推测存在“固体感 / 流动性 / 饮品结构合理性”惩罚。
- 老游戏会把“同样材料、不同配比”的饮品视为同一种并覆盖。这是它的局限，也是《奶茶实验室》的升级点。

### 9.1 红豆水泥实验：质地 / 流动性 / 吸管阻力

通过同一杯“红豆红茶”的两次覆盖存档对比，观察到只改变比例就会导致评分巨大变化。

- 正常版约为：红豆成分 40%，红茶 30%，冰水 30%，试喝表现较好。
- 水泥版约为：红豆成分 80%，红茶 10%，冰水 10%，试喝员评分明显崩坏。
- 这类失败并不完全由酸、甜、苦、酒精等显性味觉值解释，更像触发了隐藏的结构 / 质地惩罚。

设计启发：

- 显性味觉判断之外，需要有“饮品是否还能被喝”的结构判断。
- 《奶茶实验室》不能只做 `tasteVector`，还应预留 `textureVector`、`drinkability`、`solidLoad`、`strawResistance`、`accidentFlags` 等概念。
- “吸管阻力”不是单纯玩笑，而是判断高固体负载、流动性不足、半固体事故的重要机制。

### 9.2 风味搭配不和谐实验：老前辈在风味理解上可能较粗

测试若干当前材料池中的边界组合，例如水果 + 红豆、蕃茄 + 红豆、葡萄 + 红豆 / 绿茶等。结果显示，只要比例正常，这些组合大多没有明显低分。

设计启发：

- 老游戏较强的是比例、质地、温度和经营闭环，不一定具备很细的现代风味关系理解。
- 《奶茶实验室》的机会在于更细地判断风味桥接、风味冲突、清爽与厚重的冲突、客群差异接受度，而不是只靠基础数值加权。
- 不要把所有怪组合一刀切判死；应区分“有点怪但可成立”“需要桥接”“明显冲突”“结构事故”。

### 9.3 热饮 / 温度适配实验：温度不是默认惩罚项

热水果茶相较冰水果茶出现轻度扣分，但热红茶、热红豆红茶并未明显崩坏。因此不应简单理解为“夏天热饮统一惩罚”。

设计启发：

- 调配阶段主要判断基础味觉与温度-原料适配；季节 / 天气影响如果存在，更可能在经营销量阶段体现。
- 《奶茶实验室》不应继承“水果 + 热 = 默认低分”的偏见。现代新茶饮中，热花茶、热柑橘茶、热水果茶、热蜂蜜柚子茶等都可以成立。
- 温度不是惩罚项，而是风味放大器；冷热适配要看具体原料、茶底、甜味来源、季节、天气和客群。
- 温度可能强化香气、提升舒适感，也可能放大酸涩、破坏清爽感。

### 9.4 调配界面的分层计算思想

老游戏调配界面看起来不是单纯把所有材料平铺相加，而是拆成自选成分块、茶 / 咖啡底块、水 / 冷热底块。自选成分内部也有比例，再整体并入饮品结构。

设计启发：

- 这个思路有助于判断“这杯东西是否还像饮料”：成分比例过高、液体支撑不足时，容易触发质地 / 流动性事故。
- 《奶茶实验室》不应照搬“最多 3 个材料 + 1 个茶底 + 1 个水底”的硬槽位结构。
- UI 继续自由，后台按饮品结构分层计算。

后台分层建议：

- 液体骨架：茶、奶、水、咖啡、气泡水等。
- 风味层：水果、可可、抹茶、榴莲、花香等。
- 质地层：红豆、绿豆、芋泥、珍珠、奥利奥碎、奶盖等。
- 调味层：糖、蜂蜜、黑糖、海盐等。
- 服务参数：温度、冰量、糖度、杯型等。

底层概念可预留：

```text
baseLiquidRatio flavorRatio textureRatio sweetenerRatio solidLoad drinkability strawResistance textureBalance temperatureFit
```

### 9.5 玩家自定义命名 + 后台完整配方 + 派生标签

玩家做出的饮品应允许自定义名称，以增强创作感和归属感。“清爽版 / 厚重版 / 翻车版”等不应强行作为玩家看到的饮品名。

设计原则：

- 后台必须保存完整原料、比例和服务参数，不能只存“厚重版”这类粗标签。
- 饮品家族 / 版本标签应作为后台派生结果，用于机制判定、反馈生成、顾客偏好、图鉴分类、菜单筛选和经营报表。
- 玩家命名是前台主名称；系统识别类型和后台标签服务于机制。
- 后续可以考虑“顾客外号 / 市场绰号”机制：玩家命名是主权，顾客外号是市场反馈。

核心原则：

```text
配方原始数据是事实，味觉向量是计算结果，标签是机制解释。

完整原料 + 比例 + 服务参数
↓
味觉 / 质地 / 成本 / 风险计算
↓
生成饮品家族、版本标签、反馈、顾客反应
```

不要让“版本标签”替代真实配方数据。

### 9.6 经营阶段反投机启发

看到玩家评论提到，当年尝试“加价 100%，再打一折”仍然失败，说明老游戏的商业模块可能考虑过虚高原价 + 大折扣这类玩家投机行为。该信息来自玩家评论，不是严格实证，但适合作为后续经营系统设计提醒。

设计启发：

- 这不是 v0.0.5.x 的实现内容，只作为未来经营系统原则。
- 玩家投机行为不应只被数值公式奖励。
- 系统应识别明显不合理的商业操作，例如虚高标价后大幅打折、长期虚假促销、极端利润率等。
- 未来定价 / 促销系统不应只看最终折后价，还应看成本、标价、折扣价、利润率、同类市场价、品牌信任、促销频率。
- 可以通过销量、口碑、顾客吐槽或信任度惩罚回应玩家的商业小聪明。
- 经营系统应让玩家感到“制作人预判到了投机行为”，但这种反投机设计属于后续经营阶段，不进入当前 v0.0.5.x 代码范围。

对 v0.0.5.x 的影响：

- 当前阶段应优先建立自己的饮品数据模型、味觉向量、比例系统、饮品家族 / 配方版本概念和可解释反馈，不急着做完整商店、员工、报表、比赛等经营系统。
- 《奶茶实验室》建议采用“饮品家族 + 配方版本”设计：同一组材料可以归为同一饮品家族，但关键比例差异应允许形成不同版本，例如清爽版、标准版、厚重版、翻车版。
- 需要学习的是机制闭环：研发库不等于上架菜单，配方探索最终要进入库存 / 价目 / 销售验证。
- 实现方式必须原创，不能把老游戏的数据结构、内容表或呈现方式直接搬进项目。

### 9.7 配方复杂度作为经营软成本

自由实验室阶段不应急着硬限制原料数量。玩家可以把很多原料加入同一杯，这是自由研发和整活的乐趣，系统应允许这种实验空间。

但原料过多不应在未来经营阶段完全没有代价。进入上架、营业和高峰期验证后，配方复杂度可以转化为经营软成本，例如：

- 出杯时间
- 制作难度
- 员工负担
- 备料压力
- 成本
- 顾客等待
- 高峰期吞吐风险

这不是味觉层硬惩罚，不应在实验室阶段简单做“原料数超过 N 就事故”。味觉系统负责判断“喝起来怎么样”，经营系统负责判断“卖起来麻不麻烦、做起来划不划算”。

更合理的长期方向是，未来通过 operationProfile / productionSummary / economyProfile 等经营层数据计算复杂配方的制作和销售代价。本条只作为未来经营系统原则，不代表这些字段或系统已经存在。

核心原则：实验室允许发疯，市场会教育你。

## 10. 后续扩展方向

未来可以扩展：

- 温度
- 冰量
- 糖度
- 售价
- 毛利
- 客群偏好
- 隐藏配方身份识别
- 多试喝员口味差异
- 图鉴收集

但这些扩展不能破坏当前味觉审判优先级。
