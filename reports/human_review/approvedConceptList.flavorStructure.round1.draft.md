# Approved Concept List Draft｜Flavor / Structure Round 1

## 0. 文件定位

本文件是第一批风味 / 饮品结构冲突概念的 approved concept list 草案。

它来自制作人审核记录，不是机制正本。

它批准的是“可继续推进的自然语言概念”，不是 stable ID。

Codex 不得直接从本文件生成 runtime data、registry entry、validator rule 或 final feedback。

下一步若要结构化，必须另开任务，并继续遵守 Scenario first, ID later。

本文件不是：

- stable ID list
- draft ID list
- registry candidate
- validator input
- runtime data
- final feedback / final result 来源
- golden expected 修改依据

## 1. 来源

- Source review record: `reports/human_review/flavorStructureConceptReview.round1.md`
- Producer decision summary:
  - C001 / C002 / C003 / C005 / C007: keep
  - C004: reject
  - C006 / C008: reclassify to taste layer

## 2. Approved Concepts Draft

说明：以下 `conceptRef` 只是本草案内部的临时概念引用，不是 stable ID，不是 draft ID，也不是 registry candidate。

### AC-FLV-R1-01｜清爽感被厚重元素吞掉

- conceptRef: AC-FLV-R1-01
- displayNameDraft: 清爽感被厚重元素吞掉
- sourceReviewItems: C001
- naturalLanguageDefinition: 本应清爽 / 轻盈的饮品方向，被奶盖、奶油、芋泥、奥利奥、厚糖浆、重奶脂等厚重元素压住，导致整杯饮品定位违和。
- whyApproved: 制作人明确认为清爽和厚重叠加时违和感强，这类体验应该被系统理解。
- coreExperience: 原本期待轻盈、通透、清新的饮品，被甜品感、奶脂感或厚重结构覆盖，喝起来不像原先承诺的清爽饮品。
- likelyLayer: flavor / structure conflict
- possibleEvidence:
  - 柑橘气泡水加入芋泥
  - 柑橘气泡水加入奶盖
  - 清爽茶果底被厚重甜品结构覆盖
  - 轻盈果香被厚糖浆或重奶脂压住
- expressionTags:
  - 清爽感被盖住
  - 厚重元素压住主线
  - 轻盈和甜品结构打架
  - 饮品定位违和
- riskNotes: 后续结构化时需要区分“厚重元素压住清爽定位”和普通质地负担，避免和 texture 低流动性事故混在一起。
- notThis:
  - 不是单纯质地喝不动。
  - 不是单纯甜度 / 酸度过载。
  - 不是所有清爽 + 厚重都必然事故，仍需要未来规则判断上下文。
- producerNotes: 制作人明确认为清爽与厚重叠加违和感强，应该被系统理解。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-FLV-R1-02｜强风味身份压制整杯

- conceptRef: AC-FLV-R1-02
- displayNameDraft: 强风味身份压制整杯
- sourceReviewItems: C002
- naturalLanguageDefinition: 某个强风味身份过高，整杯饮品被它接管，其他茶、奶、果香或结构元素都变成背景板。
- whyApproved: 制作人认可这个方向，但特别标记它非常容易变成 if 地狱，后续必须小心处理。
- coreExperience: 一种强身份风味独占舞台，导致其他元素失去存在感，整杯喝起来只剩某个强风味。
- likelyLayer: flavor identity / flavor intensity
- possibleEvidence:
  - 榴莲压过茶 / 奶 / 果香
  - 咖啡压过其他风味
  - 抹茶压过其他风味
  - 强烈酒香压过整杯饮品
  - 其他强身份 flavor family 或 high intensity source
- expressionTags:
  - 风味压制
  - 主角过强
  - 整杯被接管
  - 背景板风味
- riskNotes: 这是高风险机制候选，极易 if 地狱。后续结构化时必须走规则表 / profile / intensity / flavor identity，而不是写单原料 if。
- notThis:
  - 不按具体强风味原料拆 accidentTypeId。
  - 不写“if 榴莲 / if 咖啡 / if 抹茶”的单原料判断。
  - 具体原料只能作为 evidence / flavor family / intensity source。
  - 不把某个原料本身写成事故机制。
- producerNotes: 后续若结构化，必须走规则表 / profile / intensity / flavor identity，不写单原料 if。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-FLV-R1-03｜风味身份错位

- conceptRef: AC-FLV-R1-03
- displayNameDraft: 风味身份错位
- sourceReviewItems: C003
- naturalLanguageDefinition: taste / texture 数值相似，但 flavor identity 完全不同，导致饮品语境不适配。
- whyApproved: 制作人明确表示 flavor 层就是为解决这类问题诞生的。
- coreExperience: 数值上看似合理，但风味身份和饮品语境不合，导致玩家觉得“这东西不该出现在这杯里”。
- likelyLayer: flavor identity / drink context fit
- possibleEvidence:
  - 橘子和西红柿在 taste 层都酸甜
  - 橘子和西红柿在 texture 层都柔软多汁
  - 但橘子和西红柿的 flavor identity 完全不同
  - 某些料理感 / 蔬果感 / 甜品感身份进入不匹配饮品语境
- expressionTags:
  - 风味身份错位
  - 语境不对
  - 数值相似但不是一类东西
  - 饮品感跑偏
- riskNotes: 后续需要依赖 flavor identity / drink context fit，而不是只看酸甜苦等 taste 数值。
- notThis:
  - 不是“味觉酸甜苦”的数值问题。
  - 不是质地问题。
  - 不等于难喝；重点是饮品语境错位。
  - 不应把单个例子写成固定组合 if。
- producerNotes: 制作人明确表示 flavor 层就是为解决这类问题诞生的。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-FLV-R1-04｜饮品类型承诺和实际体验不一致

- conceptRef: AC-FLV-R1-04
- displayNameDraft: 饮品类型承诺和实际体验不一致
- sourceReviewItems: C005
- naturalLanguageDefinition: 玩家或系统期待它是果茶 / 奶茶 / 气泡饮 / 甜品饮等类型，但实际体验和这个类型承诺不一致。
- whyApproved: 制作人认为机制很好玩，但暂时不确定怎么实现，因此应先保留为高阶候选。
- coreExperience: 名义上像某种饮品类型，入口体验却不像，造成“你说这是 X，但喝起来不是 X”的落差。
- likelyLayer: product identity / drinkType expectation / high-level structure
- possibleEvidence:
  - drinkType 承诺与入口体验不匹配
  - product identity 与实际风味结构不一致
  - player expectation 被打破
  - 高阶饮品类型识别与体验冲突
- expressionTags:
  - 类型承诺失败
  - 预期落差
  - 不像它声称的饮品
  - product identity mismatch
- riskNotes:
  - 高阶概念，制作人认为很好玩，但暂时不确定实现方式。
  - 后续不应急着结构化或接 runtime。
  - 可能与 drinkType / product identity / player expectation 相关。
- notThis:
  - 不是普通 flavor accident。
  - 不是下一刀可以直接实现的低风险规则。
  - 不应在没有 drinkType / product identity 设计前强行落地。
- producerNotes: 先作为 high-level product identity candidate 保留。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-FLV-R1-05｜风味主题太多，饮品没有主角

- conceptRef: AC-FLV-R1-05
- displayNameDraft: 风味主题太多，饮品没有主角
- sourceReviewItems: C007
- naturalLanguageDefinition: 玩家把太多风味方向都加进一杯，茶、奶、水果、咖啡、巧克力、芝士、坚果、香料、气泡、果酱等都想当主角，导致整杯没有清晰主题。
- whyApproved: 制作人认为玩家很可能把所有东西都扔进杯子里，这类“主题过载 / 没有主角”的情况很容易触发，值得系统理解。
- coreExperience: 每个元素都想表达自己，结果整杯没有主线，像风味开会但没有主持人。
- likelyLayer: flavor structure / theme overload
- possibleEvidence:
  - 多种主导风味并存
  - 风味主线缺失
  - 玩家“全都扔进去”
  - 茶 / 奶 / 水果 / 咖啡 / 巧克力 / 芝士 / 坚果 / 香料等多个主题抢主角
- expressionTags:
  - 主题过载
  - 没有主角
  - 风味太吵
  - 什么都想当主线
- riskNotes:
  - 可能很容易触发，但后续必须避免简单按原料数量硬判。
  - 需要区分自由实验室“允许发疯”和系统识别“主题过载”。
- notThis:
  - 不是因为原料数量多就一定事故。
  - 不应写成 “if ingredient count > X then accident”。
  - 不应惩罚所有复杂配方。
- producerNotes: 制作人认为玩家会把所有东西扔杯子里，这类情况容易触发，值得系统理解。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

## 3. Non-Approved / Reclassified Items

### C004｜香气方向互相打架

- status: reject
- reason: 现实中存在大量成功花果香奶茶 / 花果咖啡，如蜜桃乌龙、茉莉冰美式；泛化判冲突过于严苛。
- futurePossibility: 可作为具体搭配证据或风味平衡讨论，但不作为本轮机制概念。

### C006｜甜味遮蔽风味身份

- status: reclassify / taste layer
- reason: 甜度过载属于 taste 层，和酸度过载同类，不放 flavor 层。
- boundary: do not process in this flavor list

### C008｜咸甜边界失控

- status: reclassify / taste layer
- reason: 属于 taste 层判断，本轮不处理。
- boundary: do not process in this flavor list

## 4. Global Boundary Notes

- approved concept 不等于 approved stable ID。
- `conceptRef` 不是 stable ID。
- `displayNameDraft` 不是系统主键。
- `sourceReviewItems` 不是机制主键。
- 后续 draft ID / registry candidate / validator / rule table 必须另开任务。
- 本文件不能自动进入 runtime。
- 本文件不能自动进入 generated severity。
- 本文件不能自动影响 final feedback / final result。
- 本文件不能自动修改 golden expected。
- C002 必须继续作为 anti-if 高风险项处理。
- C005 必须继续作为 high-level / late-structuring 项处理。
- 如果未来玩家反馈出现新 flavor / structure 概念，应先进入 concept review，而不是直接写入系统。

## 5. Next Possible Step

- 用户 + ChatGPT 继续审阅本 approved concept list draft。
- 如果本 draft 通过，可另开 draft ID / registry candidate planning task，但仍不得直接接 runtime。
- 也可以先开 taste layer concept review，处理 C006 / C008 一类被转层的概念。
