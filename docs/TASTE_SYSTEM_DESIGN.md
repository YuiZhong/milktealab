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

当前仓库还没有独立的 `ingredientFlavorProfiles.js`，也没有专门的 `flavorProfile` / `aromaProfile` / `flavorFamilies` / `identityTags` 数据文件。现有 `ingredients.js` 已提供稳定 `ingredientId`、显示名和 UI category，但 `category: "水果/风味"` 只能辅助 UI 分组，不能作为风味身份主来源；`name` / 中文显示名也不能用来反推系统身份。

现有 `ingredientTasteProfiles.js` 可临时提供少量辅助线索，例如 `aromaImpact`、`weirdness`、`isStrongAroma`、`worksInFreshDrinks` 和少量 tags，但这些字段本质上混合了基础味觉、香气压力、清爽适配和 legacy 风险标记，不足以支撑完整 `flavorSummary`。`ingredientTextureProfiles.js` 主要服务物理质地，不能被当作风味身份来源。`combinationRules.js` 和 `synergyRules.js` 记录的是组合结果、共享组或 legacy 规则线索，不应被反向挖成原料风味真相。

后续若实现 `flavorSummary` runtime，建议先新增轻量 `data/ingredientFlavorProfiles.js`，以稳定 `ingredientId` 为主引用，显示名只用于展示和 legacy fallback。初始 profile 可保持克制，例如：

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
    schemaVersion: "ingredientFlavorProfile.v0.0.6.x"
  }
}
```

`pairHints` 只能作为后续 relation matrix 的轻量提示，不应替代正式关系矩阵，也不应变成具体组合 if 的新容器。下一刀 runtime 的最小落地顺序应优先是：新增 `ingredientFlavorProfiles` 数据地基，再新增只读 `core/flavorSummaryEngine.js`，最后由 `tasteJudge.js` 暴露 `result.flavorSummary`。第一版仍不接管事故、饮品类型、评分、feedback 或 `result.type`；relation matrix、candidate 调度、系统性阈值、severity 和 `scoreMultiplier` 留到后续小步或 v0.0.7.x 调参阶段。

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
