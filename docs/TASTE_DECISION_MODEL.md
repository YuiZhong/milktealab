# Taste Decision Model｜奶茶实验室当前判定模型正本

## 0. 文档定位

本文档是《奶茶实验室》当前“判定模型 / priority vs severity / 事故层级 / 反 if 地狱原则”的正本。

它回答：

- 一杯饮品最终怎么被判定？
- 哪些候选先被看见？
- 特殊服务事故、质地事故、味觉事故、风味冲突、正常好组合、普通分类分别是什么？
- priority 和 severity 有什么区别？
- 为什么优先级高不等于扣分多？
- 旧线性优先级为什么废弃？
- 为什么所有判定层都不能写成 if 地狱？

本文件是当前判定模型正本。旧 reports 只作为历史证据，不自动升级为当前事实。如果其他 docs 与本文件冲突，以本文件为准。

## 1. 当前正确判定优先级

当前正确判定优先级是：

```text
特殊服务事故 > 质地事故 > 味觉事故 > 风味冲突 > 正常好组合 > 普通分类
```

这里的“优先级”只表示先被看见、先被调度、不能被后续好组合洗白；它不直接表示扣分更多。

### 1.1 特殊服务事故

特殊服务事故来自温度、冰量、服务条件、制作条件或材料物理反应。

例子：

- 鸡蛋 + 热水：凝固。
- 气泡水 + 热饮：气泡失效。
- 奶盖 + 热饮：融化。
- 柠檬 + 热牛奶：更容易触发事故。
- 其他未来服务条件事故。

这类事故不等同于单纯味觉过载，也不应被普通好组合洗白。

### 1.2 质地事故

质地事故来自 `textureProfile` / `textureSummary` / texture rule table。

它判断一整杯饮品相关质地属性的总和，例如：

- 吸不动。
- 固体负载过高。
- 糊化。
- 沉积。
- 低流动性。
- 粗吸管需求。
- 液体支撑不足。
- 可饮用性下降。

质地事故不等于“一有珍珠 / 芋圆 / 芋泥就扣大分”。必须结合比例、液体支撑、饮用场景和 severity 判断。

### 1.3 味觉事故

味觉事故来自 `tasteProfile` / `tasteSummary` / taste threshold / rule table。

例子：

- 太酸。
- 太甜。
- 太苦。
- 茶涩过载。
- 奶感 / 油腻负担。
- 基础味觉失衡。

### 1.4 风味冲突

风味冲突来自 `flavorProfile` / `flavorSummary` / relation rules / relation matrix。

例子：

- 榴莲 + 咖啡。
- 料理感和奶茶冲突。
- 蔬菜感和甜品感冲突。
- 强身份风味互相抢主导权。
- 酸甜接近但风味身份不同导致的搭配问题。

风味冲突不能写成具体组合 if 地狱。

### 1.5 正常好组合

正常好组合来自 synergy rules / relation matrix / drinkType rules / positive candidate。

好组合只能：

- 加分。
- 提供类型识别。
- 提供正向 feedback。
- 提供可保存 / 可上架 / 可图鉴化的基础。

好组合不能洗白高优先级事故候选。

### 1.6 普通分类

普通分类是在没有明显事故、冲突或强组合时的兜底类型识别。

普通分类应读取：

- stable IDs。
- drinkType rules。
- summary fields。
- candidate fields。

普通分类不能靠中文显示名、UI category 或玩家可见文案硬判。

## 2. Priority vs Severity

必须分清：

```text
判定优先级只决定调度顺序和是否能被后续候选洗白。
判定优先级不等于扣分严重度。
priorityBand 不等于 severityLevel。
severityHint 不等于 scoreMultiplier。
高优先级候选可以低 severity。
低优先级候选也可能提供明显加分或强反馈。
```

高 priority 只表示：

```text
先被看见 / 先被调度 / 不能被后续好组合洗白
```

实际扣分、反馈强度和最终结果，应由后续层决定：

```text
severity / scoreMultiplier / evidence / triggerMetric / thresholds / weights
```

例子：

> 珍珠 / 芋圆等粗吸管需求原料，如果以合理比例放进热饮，因为热饮更常使用细吸管，可能优先触发质地 / 服务适配问题。但这不代表整杯饮料灾难；severity 可以很低，只轻微扣分或给轻吐槽反馈。系统应优先识别它，但不应把整杯判成不可喝。

对照例子：

> 柠檬比例极高导致酸度过载，属于味觉事故，priority 低于特殊服务事故和质地事故，但 severity 可以很高，最终扣分可能比某个轻微质地适配问题更重。

## 3. 三层属性输入与反 if 地狱总原则

反 if 地狱是整个判定模型的总原则，不是 flavor 层专属原则。

特殊服务事故、质地事故、味觉事故、风味冲突、正常好组合、普通分类，都不能长期写成具体原料组合 if 地狱。

长期原则：

- 代码负责汇总、调度、排序、兜底。
- 数据负责描述“什么条件会触发什么候选”。
- 新增机制优先进入 profile / summary / rule table / relation matrix / threshold table / severity table / feedback pool / golden samples。
- legacy if 可以短期存在，但必须标记为 legacy compatibility / migration target，不应作为新增机制的方式。

### 3.1 特殊服务事故输入

主要读取：

```text
temperature / iceLevel / serviceCondition / preparationCondition / physicalReaction rules
```

如果当前字段还未完整实现，应标为 future service-condition layer。不能靠长期 `if 鸡蛋 + 热水`、`if 气泡水 + 热饮` 等具体组合不断扩张。

### 3.2 质地事故输入

主要读取：

```text
textureProfile / textureSummary / texture rule table / threshold table
```

不能长期 `if 芋泥 > 30`、`if 奥利奥 > 30`、`if 珍珠 + 芋圆` 这样堆。

### 3.3 味觉事故输入

主要读取：

```text
tasteProfile / tasteSummary / taste threshold / rule table
```

不能长期 `if 柠檬 > 60`、`if 糖 > 70` 这样堆。

### 3.4 风味冲突输入

主要读取：

```text
flavorProfile / flavorSummary / relation rules / relation matrix
```

不能长期 `if 榴莲 + 咖啡`、`if 西红柿 + 奶茶` 这样堆。

### 3.5 正常好组合输入

主要读取：

```text
synergy rules / relation matrix / drinkType rules / positive candidate
```

不能长期 `if 红茶 + 牛奶`、`if 气泡水 + 柠檬` 这样堆。

### 3.6 普通分类输入

主要读取：

```text
drinkType rules / stable IDs / summary fields / candidate fields
```

不能长期用中文显示名、UI category 或玩家可见文案硬判。

## 4. 旧说法废弃

旧说法：

```text
极端比例事故 > 稠度/质地事故 > 冲突组合 > 正常好组合 > 普通分类
```

现标记为：

```text
deprecated / historical rough rule only
```

废弃原因：

- 它只表达“严重事故不能被好组合洗白”的早期粗原则。
- 它混淆 priority 和 severity。
- 它遗漏特殊服务事故。
- 它把服务 / 温度事故与味觉事故混在一起。
- 它没有区分味觉事故与风味冲突。
- 它没有表达“高 priority 低 severity”的情况。
- 它不适合继续作为 v0.0.7.x / 后续 batch-content / severity / scoreMultiplier 的正本。

