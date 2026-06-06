# TriggerMetric Direction Review Round 1｜第一批触发指标方向审阅

## 0. 文件定位

本文件是 v0.0.8 planning-only 阶段的人类审批 / 制作人评审材料，用于审阅第一批 6 个 proposedDraftId 未来可能读取的 triggerMetric / numeric summary / numeric load 方向。

本文件只审阅 future triggerMetric / numeric summary / numeric load 的方向。

本文件不是：

- triggerMetric registry
- schema
- validator input
- allowed values
- generated severity data
- runtime data
- stable ID approval source
- registry candidate approval source
- official threshold table
- official scoreMultiplier table
- golden expected source

本文件不批准正式 triggerMetric，不创建 triggerMetric registry，不创建 schema / validator / allowed values，不填写正式 numeric values / threshold / `scoreMultiplier`，不影响 runtime / generated severity / final feedback / final result / golden expected。

后续若要创建正式 metric registry、severity sample sheet、validator 或 generated severity shadow，必须另开明确任务并由用户批准。

## 1. 为什么需要这一步

第一批 6 个机制已经有 `proposedDraftId` 和 registry candidate proposal rows：

1. `taste_sweet_overload`
2. `taste_acid_overload`
3. `taste_bitter_overload`
4. `taste_astringency_overload`
5. `texture_low_drinkability`
6. `texture_solid_overload`

这些仍只是 proposal wording，不是 approved stable ID、registry candidate、allowed values 或 runtime data。

`reports/human_review/candidateSeverityRuleSchemaReview.round1.md` 已确认 numeric-first boundary：底层计算优先 numeric values / numeric load；中文档位和 high / medium / low 只做人类提示。

在创建 severity sample sheet、triggerMetric registry 或 validator 前，必须先审“这些机制未来到底读什么指标”。尤其 texture 层容易混淆：固体颗粒很多、粉泥糊状、奶脂油腻、糖浆胶质黏稠，都会让人觉得“厚 / 重 / 喝着累”，但它们不是同一种机制。

## 2. 中文字段速读 / 制作人可读性

| field | 中文解释 |
|---|---|
| `triggerMetric` | 未来机器用来判断“是否触发 / 触发多严重”的指标名。 |
| `numericLoad` | 可计算的数值负载，例如甜度负担、固体负载、粉泥负担。 |
| `metricDirection` | 指标方向，例如越高越糟、越低越糟、在某个区间才糟。 |
| `metricEvidence` | 为什么这个指标能代表该机制。 |
| `metricNotThis` | 这个指标不应该误判哪些情况。 |
| `possibleMetricDirections` | 当前只是方向词，不是正式字段，不是 allowed values。 |
| `humanLabel` | 给人看的中文档位 / 解释，不参与正式计算。 |
| `sourceLayer` | 这个指标主要来自 taste / texture / flavor / sensation 哪一层。 |

用户 / 制作人主要审：

- 指标方向是不是符合直觉。
- 是否把不同机制混到一起。
- 会不会误伤现实中成立的饮品。
- 哪些方向需要拆分、合并、暂缓或放进 Parking Lot。

用户不需要填写 numeric 字段或正式阈值。英文 key 是给 Codex / future tooling 用的；人类入口必须中文友好。

## 3. Numeric-First Boundary

Future ingredient profile / summary / triggerMetric 应优先支持 numeric values / numeric load。

高 / 中 / 低、light / medium / heavy、中文档位只能作为 human-readable label / review hint / display helper。

正式计算、threshold、`severityLevel`、`scoreMultiplier` 不应只靠文字档位。

本轮不填写任何正式数值。

本轮不创建 ingredient profile 表，也不给任何原料填写正式 numeric values。

本轮列出的所有 metric direction 都只是 planning direction / 非正式方向词，不是正式字段、不是 allowed values、不是 registry。

## 4. First Batch Metric Direction Review

### 4.1 `taste_sweet_overload`

| item | review direction |
|---|---|
| possibleMetricDirections | `sweetnessLoad`; `sweetIntensity` |
| sourceLayer | taste |
| numeric meaning | 整杯甜味负担 / 甜味强度。 |
| metricDirection | higher_is_worse, but preference-sensitive |
| metricEvidence | 甜味来源按比例和权重汇总。 |
| metricNotThis | 不是糖 / 蜂蜜 / 糖浆 / 果酱专属机制；不等于所有高甜都差，未来顾客 tolerance 可调。 |
| review question | `sweetnessLoad` 和 `sweetIntensity` 是否需要区分？`load` 偏总负担，`intensity` 偏入口甜感强度。 |

审阅倾向：`sweetnessLoad` 可作为主方向词，`sweetIntensity` 暂作 adjacent / display / alias 方向，待后续 sample sheet 或 validator planning 再定。

### 4.2 `taste_acid_overload`

| item | review direction |
|---|---|
| possibleMetricDirections | `acidityLoad`; `acidIntensity`; `acidSharpness` as future adjacent direction |
| sourceLayer | taste |
| numeric meaning | 整杯酸味负担、酸味强度，以及可能的尖锐酸刺激。 |
| metricDirection | higher_is_worse after freshness boundary |
| metricEvidence | 酸味来源按比例和权重汇总。 |
| metricNotThis | 不是柠檬 / 山楂 / 百香果专属机制；不应误伤“清爽偏酸”的正常水果茶。 |
| review question | 是否需要同时区分“酸度总量”和“尖锐酸 / 刺激酸”？ |

审阅倾向：`acidityLoad` 可作为主方向词；`acidIntensity` / `acidSharpness` 先保留为 needs further review。

### 4.3 `taste_bitter_overload`

| item | review direction |
|---|---|
| possibleMetricDirections | `bitternessLoad`; `bitterIntensity` |
| sourceLayer | taste |
| numeric meaning | 茶 / 咖啡 / 可可 / 抹茶等来源贡献的苦味负担。 |
| metricDirection | higher_is_worse, but customerPreferenceSensitive |
| metricEvidence | 苦味来源按比例和权重汇总。 |
| metricNotThis | 不是茶事故、咖啡事故、抹茶事故；不等于“所有苦味都不好”。 |
| review question | future metric 是否用 `bitternessLoad` 做主名，`bitterIntensity` 做显示 / alias？ |

审阅倾向：`bitternessLoad` 更像 numeric load 主方向；`bitterIntensity` 可暂作人类说明或 alias。

### 4.4 `taste_astringency_overload`

| item | review direction |
|---|---|
| possibleMetricDirections | `astringencyLoad`; `tanninPressure`; `dryingSensation` |
| sourceLayer | taste / special sensation boundary |
| numeric meaning | 涩感、收敛感、发干、发紧、刮舌感的负担。 |
| metricDirection | higher_is_worse, but tea / coffee tolerance sensitive |
| metricEvidence | 红茶 / 乌龙 / 咖啡等可能贡献涩感 / 收敛感。 |
| metricNotThis | 不等于苦味过载；不等于辣 / 麻 / 酒精灼烧；不并回 generic strong stimulation；不按红茶 / 乌龙 / 咖啡拆机制。 |
| review question | 这个 metric 最终应留在 taste family，还是 future sensation family？`astringencyLoad` 是否足够覆盖“发干 / 发紧 / 刮舌”？ |

审阅倾向：`astringencyLoad` 可作为当前主方向词；`tanninPressure` / `dryingSensation` 先保留为 boundary / evidence direction。

### 4.5 `texture_low_drinkability`

| item | review direction |
|---|---|
| possibleMetricDirections | `slurryLoad`; `pasteLoad`; `powderLoad`; `lowFlowPenalty` |
| sourceLayer | texture / drinkability |
| numeric meaning | 粉泥、糊状、沉积、低流动性、吸不上来的负担。 |
| metricDirection | higher_is_worse |
| metricEvidence | 芋泥、奥利奥碎、粉类沉积、糊化粉体等可能贡献。 |
| metricNotThis | 不是珍珠 / 芋圆 / 红豆 / 绿豆 / 花生碎这种小颗粒很多；不是蜂蜜 / 糖浆 / 果酱这种糖浆胶质黏稠；不是奶盖 / 奶油 / 厚乳这种奶脂油腻负担；不是单独的 straw resistance mechanism；不按芋泥 / 奥利奥 / 粉类来源拆机制。 |
| review question | `lowFlowPenalty` 是否应作为综合结果指标，而 `slurryLoad` / `pasteLoad` / `powderLoad` 是来源子指标？是否需要单独保留 strawResistance 作为表现 / severity cue，而不是机制？ |

审阅倾向：`lowFlowPenalty` 可作为综合方向；`slurryLoad` / `pasteLoad` / `powderLoad` 更像来源子指标或 future supporting metrics。

### 4.6 `texture_solid_overload`

| item | review direction |
|---|---|
| possibleMetricDirections | `solidLoad`; `toppingLoad`; `liquidSupport`; `chewLoad` |
| sourceLayer | texture / drink structure |
| numeric meaning | 固体小料多、咀嚼多、液体支撑不足、饮品变成甜品碗 / 八宝粥。 |
| metricDirection | higher_solid_is_risk, lower_liquidSupport_is_risk |
| metricEvidence | 珍珠、芋圆、椰果、红豆、绿豆、花生碎、布丁、仙草等小料 / 固体。 |
| metricNotThis | 不是芋泥 / 奥利奥碎 / 粉类沉积造成的水泥感；不是蜂蜜 / 糖浆 / 果酱造成的糖浆胶质黏稠感；不是奶脂 / 奶盖 / 奶油造成的油腻负担；不等于一定吸不上来；不按具体小料拆机制。 |
| review question | `solidLoad` 和 `chewLoad` 是否都需要？`solidLoad` 偏固体量，`chewLoad` 偏咀嚼负担。`liquidSupport` 是否应作为辅助指标，避免把“料多但仍有足够液体”的情况误判过重？ |

审阅倾向：`solidLoad` 可作为主方向；`chewLoad` / `liquidSupport` 是重要辅助方向；`toppingLoad` 可能更适合做人类说明或 alias。

## 5. Texture Boundary Section｜质地边界重点

四类问题都可能让人觉得“厚 / 重 / 喝着累”，但厚的方式不同。未来不能用一个泛泛的 `texture_overload` 或“厚重”同时覆盖它们。

### 5.1 小颗粒 / 小料固体负载

例子：

- 珍珠
- 芋圆
- 椰果
- 红豆
- 绿豆
- 花生碎
- 小块布丁 / 仙草

核心指标方向：

- `solidLoad`
- `toppingLoad`
- `chewLoad`
- `liquidSupport`

核心体验：

- 小料很多
- 需要咀嚼
- 像八宝粥 / 甜品碗
- 不一定吸不上来

属于：

- `texture_solid_overload`

不属于：

- 水泥感
- 粉泥低流动性
- 奶脂油腻
- 糖浆胶质黏稠

### 5.2 粉泥 / 糊状 / 低流动性

例子：

- 芋泥
- 奥利奥碎
- 粉类沉积
- 糊化的抹茶粉
- 粉浆感

核心指标方向：

- `slurryLoad`
- `pasteLoad`
- `powderLoad`
- `lowFlowPenalty`

核心体验：

- 糊
- 粉泥
- 堵
- 水泥感
- 吸管吃力
- 流动性差

属于：

- `texture_low_drinkability`

不属于：

- 珍珠 / 芋圆 / 红豆 / 绿豆很多
- 单纯固体多
- 奶脂油腻
- 蜂蜜糖浆黏

### 5.3 奶脂 / 奶盖 / 奶油油腻负担

例子：

- 厚乳
- 奶盖
- 淡奶油
- 奶油
- 高脂乳制品

核心指标方向：

- `fatLoad`
- `creamLoad`
- `dairyFatLoad`
- `greasyPressure`
- `mouthCoating`
- future direction: `afterSwallowBurden` / `greasyAftertaste`

核心体验：

- 不是“吸不动”
- 通常饮用流动性很顺，因为奶油 / 奶盖 / 高脂乳本身是流质或半流质
- 油腻
- 顶
- 奶脂压口
- 糊嘴
- 下咽后恶心
- 几口后腻住

属于：

- future texture / mouthfeel review
- deferred second-batch texture concept

不属于：

- `texture_solid_overload`
- `texture_low_drinkability`
- syrupiness / stickiness 的核心

边界说明：

这不是“吸不上来”，也不是“料太多”，而是奶脂 / 油脂 / 乳脂带来的口腔负担、油腻和下咽后的反胃感。

它听起来像 taste / flavor，因为玩家可能会说“奶味太重 / 太腻 / 太香”，但为了后续判定精准，应优先作为 texture / mouthfeel 层边界记录。

未来不应把奶盖太多误并进水泥感、八宝粥感或胶粘感。

severity intuition / 制作人体验边界：

- 正常：很香很浓。
- 轻度：有点腻。
- 中度：喝第二口就已经有点恶心了。
- 重度：呕……你在给我喝奶油吗？

这些是 future severity / feedback intensity 的体验参考，只是 human-readable intuition，不是正式 threshold / score / feedback 文案。本轮不生成正式 `severityLevel`，不填正式 threshold，不填正式 `scoreMultiplier`，不写正式 feedback 文案。

### 5.4 糖浆 / 胶质 / 黏稠挂口

例子：

- 蜂蜜
- 糖浆
- 果酱
- 胶质
- 过量黏性甜味剂

核心指标方向：

- `viscosity`
- `syrupiness`
- `stickiness`
- `gumminess`
- `adhesiveLoad`
- `mouthCoating`

核心体验：

- 黏
- 挂口
- 糖浆感
- 胶质感
- 糊嘴
- 不等于固体小料很多
- 不等于粉泥水泥
- 不等于奶脂油腻

属于：

- future texture / mouthfeel review
- deferred second-batch texture concept

不属于：

- `texture_solid_overload` 的核心
- `texture_low_drinkability` 的核心
- 奶脂 / 奶油油腻负担的核心

## 6. Cross-Metric Overlap and Dedupe Rules

一个原料可以同时贡献多个 metric direction，例如：

- 蜂蜜：`sweetnessLoad` + `syrupiness` / `stickiness`。
- 芋泥：`pasteLoad` + `lowFlowPenalty` + possible sweetness。
- 红豆：`solidLoad` + `chewLoad` + slight sweetness。
- 奥利奥碎：`powderLoad` + sediment / slurry risk + sweetness / cocoa notes。
- 奶盖：`fatLoad` / `creamLoad` / `mouthCoating` + possible sweetness。

多个 metric 可以同时存在，但最终机制不应重复扣同一件事。

后续 severity / priority 层需要 dedupe / dominant mechanism selection。

本轮只记录 overlap 风险，不实现 dedupe。

## 7. Direction Review Summary

### 7.1 Keep / Candidate Direction

- `sweetnessLoad`
- `acidityLoad`
- `bitternessLoad`
- `astringencyLoad`
- `lowFlowPenalty`
- `solidLoad`
- `chewLoad`
- `liquidSupport`

### 7.2 Needs Further Review

- `sweetIntensity`
- `acidIntensity`
- `acidSharpness`
- `bitterIntensity`
- `tanninPressure`
- `dryingSensation`
- `slurryLoad`
- `pasteLoad`
- `powderLoad`
- `toppingLoad`
- `fatLoad`
- `creamLoad`
- `dairyFatLoad`
- `greasyPressure`
- `afterSwallowBurden`
- `greasyAftertaste`
- `viscosity`
- `syrupiness`
- `stickiness`
- `gumminess`
- `adhesiveLoad`
- `mouthCoating`

### 7.3 Deferred / Adjacent

- `strawResistance` as expression / severity cue
- dairy / cream / greasy mouthfeel as future texture / mouthfeel review
- syrupiness / stickiness as future texture / mouthfeel review
- special sensation metrics outside this first batch

These are not a formal triggerMetric registry. They are direction suggestions for future review.

## 8. Open Questions

- `sweetnessLoad` 和 `sweetIntensity` 是否需要区分？
- 酸度是否需要 `acidSharpness`，还是先只保留 `acidityLoad`？
- 苦味主 metric 是否用 `bitternessLoad`？
- 涩感是否最终留 taste family，还是 future sensation family？
- `lowFlowPenalty` 是否作为综合结果指标？
- `solidLoad` 与 `chewLoad` 是否都需要？
- `liquidSupport` 是否应作为 `texture_solid_overload` 的辅助指标？
- 奶脂 / 奶盖 / 奶油油腻负担是否应列为 future texture / mouthfeel second batch？
- 糖浆 / 胶质黏稠感是否应列为 future texture / mouthfeel second batch？
- `mouthCoating` 是否应分别服务奶脂油腻与胶质黏稠，还是需要拆成更具体指标？
- `afterSwallowBurden` / `greasyAftertaste` 是否适合作为奶脂油腻的 future direction，还是只保留为文案 / feedback intuition？

## 9. Next Possible Step

以下只是候选，不是命令，不开放 implementation。

### Option A｜User + ChatGPT review this triggerMetric direction report

审阅方向词、texture 四类边界和 first batch 是否合理。

### Option B｜Texture Mouthfeel Second-Batch Planning

专门审奶脂油腻 / 胶质黏稠 / `mouthCoating` / `viscosity` 这些第二批 texture mouthfeel 概念。

不生成正式 ID / triggerMetric。

### Option C｜Candidate Severity Sample Sheet Shape

设计未来 CSV / Google Sheets 样例表形状。

不填真实阈值。

Recommendation:

先由用户 + ChatGPT 审阅本 triggerMetric direction report。

不建议直接创建 triggerMetric registry / schema / validator。

不建议直接填正式数值。

## 10. Explicit Non-Goals

本轮不做：

- 不生成 stable ID。
- 不批准 registry candidate。
- 不生成正式 triggerMetric。
- 不创建 triggerMetric registry。
- 不创建 schema / enum / validator。
- 不创建 CSV / JSON / JS。
- 不生成 allowed values。
- 不填写正式 numeric values。
- 不填写正式 threshold。
- 不填写正式 `scoreMultiplier`。
- 不填写正式 feedback intensity。
- 不创建 ingredient profile 表。
- 不给原料填写正式 numeric values。
- 不生成 generated severity。
- 不做 shadow / partial / active takeover。
- 不改 runtime。
- 不改 core。
- 不改 data。
- 不改 generated。
- 不改 golden expected。
- 不改 `data/stableIdRegistry.js`。
- 不改 `scripts/content/checkStableIdRegistry.js`。
- 不开放 implementation / batch content / generated severity / takeover。
- 不 push。
- 不 tag。
