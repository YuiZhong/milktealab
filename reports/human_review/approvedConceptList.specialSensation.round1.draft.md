# Approved Concept List Draft｜Special Sensation Round 1

## 0. 文件定位

本文件是第一批 special sensation sub-channel 概念的 approved concept list 草案。

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

- Source review record: `reports/human_review/specialSensationConceptReview.round1.md`
- Producer decision summary:
  - C001 / C002 / C003 / C004 / C005: keep
  - C006: keep / highLevel / overlap / laterReview，不作为低风险机制候选

## 2. Approved Concepts Draft

说明：以下 `conceptRef` 只是本草案内部的临时概念引用，不是 stable ID，不是 draft ID，也不是 registry candidate。

### AC-SENS-R1-01｜辣感 / 灼辣感过强

- conceptRef: AC-SENS-R1-01
- displayNameDraft: 辣感 / 灼辣感过强
- sourceReviewItems: C001
- naturalLanguageDefinition: 舌头发热、辣、灼、热感刺激过强，入口后形成明显灼辣负担。
- whyApproved: 制作人认为很合适；姜汁奶茶等现实饮品存在这类刺激，烈酒也可能有类似灼辣感。
- coreExperience: 舌面或喉口出现发热、灼烧、辣痛或热感刺激，刺激强度压过饮品平衡。
- likelyLayer: taste-adjacent / special sensation / heat-burn sensation
- possibleEvidence:
  - 姜汁奶茶
  - 辣椒 / 辛辣材料
  - 烈酒带来的类似灼辣刺激
- expressionTags:
  - 灼辣
  - 发热
  - 舌头烧
  - 热辣刺激
  - 辣感压住饮品
- severityNotes: 后续可按灼辣刺激强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 顾客偏好需要接具体辣感 / 灼辣通道，不接统一 strongStimulation。
- riskNotes:
  - 后续要通过 sensation profile / intensity / tolerance 表达，不写单原料 if。
  - 烈酒可作为 evidence，但 C003 另管酒精灼烧 / 挥发刺激。
- notThis:
  - 不是 `if 辣椒`。
  - 不是 `if 姜`。
  - 不等同于酒精灼烧。
  - 不把单个辛辣原料写成机制身份。
- producerNotes: 制作人确认该方向很合适，并指出现实饮品中存在姜汁奶茶、烈酒等类似刺激。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-SENS-R1-02｜麻感 / 震麻感过强

- conceptRef: AC-SENS-R1-02
- displayNameDraft: 麻感 / 震麻感过强
- sourceReviewItems: C002
- naturalLanguageDefinition: 舌头发麻、震、钝，或像被电了一下的口腔刺激过强。
- whyApproved: 制作人暂时没想到明确食材，但认为自然语言概念可以先保留。
- coreExperience: 入口后口腔出现麻、震、钝、失去灵敏度或轻微电击般的刺激。
- likelyLayer: taste-adjacent / special sensation / numbing sensation
- possibleEvidence:
  - 花椒 / 藤椒 / 麻味香料等未来可能原料
- expressionTags:
  - 麻
  - 震麻
  - 舌头发麻
  - 嘴里被电
  - 口腔钝感
- severityNotes: 后续可按麻感强度和持续时间表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 顾客偏好应接具体麻感通道；喜欢辣不等于喜欢麻。
- riskNotes:
  - lowerPriority / future review。
  - 目前原料或玩法不明确，后续不应急着结构化。
- notThis:
  - 不等于辣感。
  - 不等于涩感。
  - 不等于酒精灼烧。
  - 不写成统一特殊刺激事故。
- producerNotes: 制作人认为先保留这个自然语言概念是好的，未来若有相关原料或玩法再推进。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-SENS-R1-03｜酒精灼烧 / 挥发刺激过强

- conceptRef: AC-SENS-R1-03
- displayNameDraft: 酒精灼烧 / 挥发刺激过强
- sourceReviewItems: C003
- naturalLanguageDefinition: 酒精带来的灼烧、冲鼻、挥发、热辣或鼻腔刺激过强。
- whyApproved: 制作人认为以后酒味肯定需要。
- coreExperience: 酒精或类似挥发刺激让入口、喉口、鼻腔出现冲、辣、烧、热或挥发感。
- likelyLayer: taste-adjacent / special sensation / alcohol burn / volatility
- possibleEvidence:
  - 酒味元素
  - 发酵感
  - 挥发感
  - 冲鼻感
- expressionTags:
  - 酒精灼烧
  - 冲鼻
  - 挥发刺激
  - 喉口发热
  - 酒气太冲
- severityNotes: 后续可按灼烧、挥发和冲鼻强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 喜欢酒精灼烧的顾客不等于喜欢辣椒油，偏好应接具体 alcohol burn / volatility 通道。
- riskNotes:
  - 后续必须区分 flavor identity 中的酒味，和 sensation 层的酒精灼烧 / 挥发刺激。
  - 不应把所有酒味都当事故。
- notThis:
  - 酒味身份不等于酒精灼烧。
  - 不写 `if 酒`。
  - 不把所有酒味都当事故。
  - 不等同于 C001 辣感 / 灼辣感。
- producerNotes: 制作人确认以后酒味肯定需要，但酒味身份与酒精灼烧 / 挥发刺激要分开。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-SENS-R1-04｜清凉刺激过强

- conceptRef: AC-SENS-R1-04
- displayNameDraft: 清凉刺激过强
- sourceReviewItems: C004
- naturalLanguageDefinition: 薄荷、冰感、清凉香气或凉感元素过强，让饮品从清爽变成牙膏水、风油精或漱口水。
- whyApproved: 制作人认为薄荷很重要，之前没想到但应保留；苏式绿豆汤带薄荷是现实例子。
- coreExperience: 清凉感从舒适清爽变成嘴里开冷气、药感、牙膏感或风油精感。
- likelyLayer: taste-adjacent / special sensation / cooling sensation
- possibleEvidence:
  - 薄荷
  - 清凉感
  - 冰感
  - 苏式绿豆汤中的薄荷方向
- expressionTags:
  - 牙膏水
  - 风油精
  - 漱口水
  - 嘴里开冷气
  - 薄荷过载
- severityNotes: 后续可按清凉刺激强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 喜欢清爽的人不一定喜欢强清凉刺激；偏好应接具体 cooling sensation 通道。
- riskNotes:
  - 后续要区分“清爽”和“清凉过载”。
  - 不应把 flavor / structure 里的清爽感和 sensation 里的清凉刺激混成一类。
- notThis:
  - 不等于清爽感本身。
  - 清爽结构属于 flavor / structure；清凉刺激是 sensation。
  - 不写成 `if 薄荷`。
- producerNotes: 制作人认为薄荷是重要点，苏式绿豆汤带薄荷是现实参照。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-SENS-R1-05｜辛香刺激 / 香料压力

- conceptRef: AC-SENS-R1-05
- displayNameDraft: 辛香刺激 / 香料压力
- sourceReviewItems: C005
- naturalLanguageDefinition: 八角、肉桂、丁香、豆蔻、姜、胡椒、香茅、南姜等香料带来的辛香、暖香、冲鼻、药感或香料压力过强。
- whyApproved: 制作人认为这个概念很有趣；它不能算任何一种基础味道，也不能简单放在风味层，因为它需要数值判断。
- coreExperience: 香料感、辛香、暖香、药感或冲鼻压力太强，让饮品像热红酒、卤料包、感冒冲剂或东南亚香料汤。
- likelyLayer: taste-adjacent / special sensation / aromatic stimulation / spice pressure
- possibleEvidence:
  - 热红酒
  - 八角
  - 肉桂
  - 丁香
  - 豆蔻
  - 姜
  - 胡椒
  - 香茅 / 南姜等东南亚香料感
- expressionTags:
  - 香料压力
  - 东南亚香味
  - 热红酒感
  - 药感
  - 卤料包感
  - 感冒冲剂感
- severityNotes: 后续可按辛香刺激、香料压力和冲鼻强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 顾客偏好应接具体辛香 / 香料压力通道；喜欢热红酒香料感的人不等于喜欢所有刺激。
- riskNotes:
  - cross-channel：它有 flavor identity，但事故判断不应只靠 flavor identity。
  - 后续应通过 aromaticStimulationLoad / spicePressure / intensity 等数值方向判断；这些只是非正式方向词，不是本轮正式 triggerMetric。
  - 不写单香料 if。
- notThis:
  - 不是普通 flavor identity。
  - 不是单个香料事故。
  - 不等于辣感 / 灼辣感。
  - 不把八角、肉桂、姜、胡椒等具体香料直接写成机制身份。
- producerNotes: 这是本轮重要概念之一，应以“辛香刺激 / 香料压力”理解，而不是普通风味。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

## 3. High-Level / Later Review Item

### C006｜特殊刺激主题饮

- status: keep / highLevel / overlap / laterReview
- decision: 概念保留，但不作为低风险机制候选进入本 round 的普通 approved list。
- reason:
  - 它更像 product identity / special theme candidate。
  - 和 C001-C005 这些具体刺激子通道高度重叠。
  - 制作人暂时不知道明确落点，但认为概念可保留。
  - 榴莲可能是制作人想到的例子，但榴莲更偏强风味身份 / 特殊主题 / 产品定位，不一定属于特殊刺激。
- boundary:
  - 不急着结构化。
  - 不生成 ID。
  - 不接 runtime。
  - 后续如有挑战款、猎奇款、成人酒饮、季节辛香热饮、特殊主题饮玩法，再单独 review。
  - 不把它写成一个普通事故机制。

## 4. Cross-Layer / Customer Preference Notes

- 顾客偏好 / tolerance 应接到具体 sensation channel，而不是统一 strongStimulation。
- 喜欢酒精灼烧的顾客不等于喜欢辣椒油。
- 喜欢辣的人不等于喜欢麻、涩、清凉或辛香。
- texture / flavor / taste / sensation 都可能被顾客偏好调节。
- 当前不实现顾客系统，不创建 customerTag / audienceId。
- 后续必须通过 preference profile / audience tags / tolerance / rule table / metadata 表达，不写 `if 某客群 then 喜欢某单原料`。

## 5. Global Boundary Notes

- Approved concept 不等于 approved stable ID。
- `conceptRef` 不是 stable ID。
- `displayNameDraft` 不是系统主键。
- `sourceReviewItems` 不是机制主键。
- 后续 draft ID / registry candidate / validator / rule table 必须另开任务。
- 本文件不能自动进入 runtime / generated severity / final feedback / golden expected。
- 所有可分级事故都遵守全局 severity boundary：同一机制内分轻中重，不拆 accidentTypeId。
- special sensation 子通道不能重新合并成一个粗暴的“特殊刺激过强”单机制。

## 6. Next Possible Step

候选下一步：

- 用户 + ChatGPT 继续审阅本 approved concept list draft。
- 如果本 draft 通过，可另开 draft ID / registry candidate planning task，但仍不得直接接 runtime。
- 也可以先更新 v0.0.8 concept review checkpoint，把 special sensation line 纳入当前 checkpoint。
- 或者暂缓 special sensation，回到 draft ID / registry candidate planning 的前置讨论。
