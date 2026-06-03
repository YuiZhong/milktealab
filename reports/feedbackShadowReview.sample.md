# Feedback Shadow Review Pack Sample

这份报告主要给制作人审“新文案候选是否适合”。

你只需要重点看：

1. 旧反馈
2. 新候选文案
3. 新文案是否匹配场景
4. 制作人审核区

机器详情主要给 ChatGPT / Codex 检查，不需要逐项理解。

本报告用于制作人评审 legacy final feedback 与 generated shadow candidates。

- report 类型：制作人评审材料，不是 runtime data。
- generated shadow 不接管最终反馈。
- 本报告不会自动判断文案好坏，不会自动改文案，不会自动修改 golden expected。
- generatedAt：not recorded for deterministic sample output。

## classic_milk_tea｜经典奶茶

### 你需要审什么
- 新候选文案是否适合这杯饮品？
- 是否 AI 味太重？
- 是否触发条件正确？
- 是否可以未来替代旧反馈？

### 这杯饮品
- 红茶 (tea_black): 45%
- 牛奶 (dairy_milk): 40%
- 珍珠 (topping_pearl): 15%

### 旧反馈（当前玩家看到）
红茶和牛奶配合得很稳，是不会出错的经典款。

### 新候选文案（后台 shadow，不会影响玩家）
1. feedback_classic_001 / classic / normal / classic
   文案：经典的珍珠奶茶。肯定不能算难喝啦但也算不上惊艳，还行吧

### 制作人审核

状态码：

1 = keep 保留
2 = revise 修改
3 = reject 不要
4 = pending 待定

常见问题标签，可直接写中文：

- AI味浓
- 太狠
- 不好笑
- 触发不对
- 太平
- 太长
- 太抽象
- 想留但要改

- reviewStatus（审核状态）:
- preferredTextId（偏好文案ID）:
- issueTags（问题标签）:
- suggestedRewrite（建议改写）:
- producerComment（制作人备注）:

### 机器详情（一般不用制作人细看）

#### Legacy Final Output
- score: 74
- result.type: 经典奶茶
- feedbackTags: classic
- accidentTypeId: (none)
- drinkTypeId: classic_milk_tea
- outcomeTypeId: (none)

#### Generated Shadow
- enabled: true
- mode: shadow
- source: generatedFeedbackTexts
- affectsFinalFeedback: false
- affectsFinalResult: false
- fallbackReason: (none)
- checkedFeedbackTags: classic

#### Candidate Details
- feedback_classic_001 / classic / normal / classic
  - zhCN: 经典的珍珠奶茶。肯定不能算难喝啦但也算不上惊艳，还行吧
  - scoreRange: 60 - 90
  - resultIds: accident=(none), drink=classic_milk_tea, outcome=(none)
  - matchReason: feedbackTag

#### Machine Checks
- needsHumanReview: true
- shadowAffectsFinalFeedback: false
- finalFeedbackChanged: false
- scoreChanged: false
- typeChanged: false
- feedbackTagsChanged: false
- fallbackReason: (none)
- candidateCount: 1

## extreme_lemon_accident｜极端柠檬事故

### 你需要审什么
- 新候选文案是否适合这杯饮品？
- 是否 AI 味太重？
- 是否触发条件正确？
- 是否可以未来替代旧反馈？

### 这杯饮品
- 柠檬 (fruit_lemon): 85%
- 绿茶 (tea_green): 5%
- 气泡水 (liquid_sparkling_water): 5%
- 蜂蜜 (sweetener_honey): 5%

### 旧反馈（当前玩家看到）
柠檬比例已经不是清爽，是酸度爆炸。试喝员脸皱到不适合正常饮用。 试喝员喝完眨了三次眼，灵魂还停在上一口。

### 新候选文案（后台 shadow，不会影响玩家）
1. feedback_acid_accident_001 / acid_accident / accident / warning
   文案：我牙被酸掉了，你要不赔我点钱吧

### 制作人审核

状态码：

1 = keep 保留
2 = revise 修改
3 = reject 不要
4 = pending 待定

常见问题标签，可直接写中文：

- AI味浓
- 太狠
- 不好笑
- 触发不对
- 太平
- 太长
- 太抽象
- 想留但要改

- reviewStatus（审核状态）:
- preferredTextId（偏好文案ID）:
- issueTags（问题标签）:
- suggestedRewrite（建议改写）:
- producerComment（制作人备注）:

### 机器详情（一般不用制作人细看）

#### Legacy Final Output
- score: 0
- result.type: 口感事故
- feedbackTags: acid_accident
- accidentTypeId: taste_acid_overload
- drinkTypeId: (none)
- outcomeTypeId: (none)

#### Generated Shadow
- enabled: true
- mode: shadow
- source: generatedFeedbackTexts
- affectsFinalFeedback: false
- affectsFinalResult: false
- fallbackReason: (none)
- checkedFeedbackTags: acid_accident

#### Candidate Details
- feedback_acid_accident_001 / acid_accident / accident / warning
  - zhCN: 我牙被酸掉了，你要不赔我点钱吧
  - scoreRange: 0 - 35
  - resultIds: accident=taste_acid_overload, drink=(none), outcome=(none)
  - matchReason: feedbackTag

#### Machine Checks
- needsHumanReview: true
- shadowAffectsFinalFeedback: false
- finalFeedbackChanged: false
- scoreChanged: false
- typeChanged: false
- feedbackTagsChanged: false
- fallbackReason: (none)
- candidateCount: 1

## straw_resistance_accident｜吸管阻力事故

### 你需要审什么
- 新候选文案是否适合这杯饮品？
- 是否 AI 味太重？
- 是否触发条件正确？
- 是否可以未来替代旧反馈？

### 这杯饮品
- 芋泥 (topping_taro_paste): 45%
- 奥利奥碎 (topping_oreo_crumble): 32%
- 珍珠 (topping_pearl): 16%
- 蜂蜜 (sweetener_honey): 7%

### 旧反馈（当前玩家看到）
这杯不是饮料，是需要装修队施工的半固体。 吸管刚插进去就提交了辞职信。 建议配勺子，不然吸管会开始怀疑人生。

### 新候选文案（后台 shadow，不会影响玩家）
1. feedback_straw_disaster_001 / straw_disaster / accident / teasing
   文案：吸管刚插进去就提交了辞职信
2. feedback_straw_disaster_002 / straw_disaster / accident / warning
   文案：你这是啥玩意啊？根本吸不上来啊

### 制作人审核

状态码：

1 = keep 保留
2 = revise 修改
3 = reject 不要
4 = pending 待定

常见问题标签，可直接写中文：

- AI味浓
- 太狠
- 不好笑
- 触发不对
- 太平
- 太长
- 太抽象
- 想留但要改

- reviewStatus（审核状态）:
- preferredTextId（偏好文案ID）:
- issueTags（问题标签）:
- suggestedRewrite（建议改写）:
- producerComment（制作人备注）:

### 机器详情（一般不用制作人细看）

#### Legacy Final Output
- score: 0
- result.type: 口感事故
- feedbackTags: straw_disaster, straw_followup, thick_straw_followup
- accidentTypeId: texture_straw_resistance
- drinkTypeId: (none)
- outcomeTypeId: (none)

#### Generated Shadow
- enabled: true
- mode: shadow
- source: generatedFeedbackTexts
- affectsFinalFeedback: false
- affectsFinalResult: false
- fallbackReason: (none)
- checkedFeedbackTags: straw_disaster, straw_followup, thick_straw_followup

#### Candidate Details
- feedback_straw_disaster_001 / straw_disaster / accident / teasing
  - zhCN: 吸管刚插进去就提交了辞职信
  - scoreRange: 0 - 35
  - resultIds: accident=texture_straw_resistance, drink=(none), outcome=(none)
  - matchReason: feedbackTag
- feedback_straw_disaster_002 / straw_disaster / accident / warning
  - zhCN: 你这是啥玩意啊？根本吸不上来啊
  - scoreRange: 0 - 35
  - resultIds: accident=texture_straw_resistance, drink=(none), outcome=(none)
  - matchReason: feedbackTag

#### Machine Checks
- needsHumanReview: true
- shadowAffectsFinalFeedback: false
- finalFeedbackChanged: false
- scoreChanged: false
- typeChanged: false
- feedbackTagsChanged: false
- fallbackReason: (none)
- candidateCount: 2

