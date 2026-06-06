# Approved Concept List Draft｜Taste Round 1

## 0. 文件定位

本文件是第一批 taste layer 概念的 approved concept list 草案。

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

- Source review record: `reports/human_review/tasteConceptReview.round1.md`
- Producer decision summary:
  - C001 / C002 / C003 / C004 / C006 / C008: keep
  - C005: revise to “咸味过载”，去掉 / 弱化“咸甜失衡”
  - C007: revise / splitNeeded / umbrella / later review，不作为单一 approved concept 进入

## 2. Approved Concepts Draft

说明：以下 `conceptRef` 只是本草案内部的临时概念引用，不是 stable ID，不是 draft ID，也不是 registry candidate。

### AC-TASTE-R1-01｜饮品存在感过低 / 太淡

- conceptRef: AC-TASTE-R1-01
- displayNameDraft: 饮品存在感过低 / 太淡
- sourceReviewItems: C001
- naturalLanguageDefinition: 饮品几乎没有可感知内容，喝起来像冰水、稀释水，或只有一点点味道影子的饮品。
- whyApproved: 制作人明确认为这是基础必备概念，需要判断饮品是否几乎没有存在感。
- coreExperience: 玩家期待一杯饮品，但入口只有很弱的存在感，缺少明确味觉、风味身份或 body。
- likelyLayer: taste-related / beverage presence / cross-layer perception
- possibleEvidence:
  - 基础味觉存在感弱
  - 风味身份不清楚
  - body 或饮品骨架不足
  - 玩家感知像水或稀释饮品
- expressionTags:
  - 太淡
  - 像冰水
  - 没有存在感
  - 味道像影子
- severityNotes: 后续可按存在感缺失程度表达轻中重，但不应拆成多个 accidentTypeId。
- customerPreferenceNotes: 暂不实现顾客系统；未来可能需要区分清淡偏好和真的没有存在感。
- riskNotes:
  - 这是跨 taste / flavor identity / body 的高风险概念。
  - 后续不能简单写成 `if basicTasteSum < X then bland`。
  - 牛奶、茶、咖啡等基础味觉低但风味身份 / body 明确的饮品不能被误伤。
- notThis:
  - 不是所有基础味觉低的饮品都淡。
  - 不应误判一整杯牛奶 / 茶 / 咖啡为冰水。
  - 不应只靠单一 taste 数值判断。
- producerNotes: 这是基础必备概念，但后续结构化时必须避免误伤有明确风味身份或 body 的清淡饮品。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-02｜甜度过载

- conceptRef: AC-TASTE-R1-02
- displayNameDraft: 甜度过载
- sourceReviewItems: C002
- naturalLanguageDefinition: 甜味过强，从有点太甜、明显太甜，到甜度灾难。
- whyApproved: 制作人明确认为甜度过载肯定要有。
- coreExperience: 甜味压住饮品平衡，入口发腻、发齁，玩家首先感到“太甜”。
- likelyLayer: taste
- possibleEvidence:
  - 甜味强度过高
  - 多个甜味来源叠加
  - 甜味压住酸、茶、奶或其他风味
- expressionTags:
  - 有点太甜
  - 明显太甜
  - 甜到发齁
  - 甜度灾难
- severityNotes:
  - 支持 severity 分级。
  - 正常 / 有点太甜 / 明显太甜 / 甜度灾难属于同一机制连续谱。
  - 不拆多个 accidentTypeId。
- customerPreferenceNotes: 未来顾客偏好可以影响甜度容忍度；当前不实现顾客系统。
- riskNotes: 不要把甜味来源本身误写成机制身份。
- notThis:
  - 不按糖 / 蜂蜜 / 糖浆 / 果酱等具体甜味来源拆机制。
  - 不为 light / medium / heavy 甜度创建多个机制。
- producerNotes: 后续应由 triggerMetric 区间、severityLevel、scoreMultiplier 和反馈强度表达轻中重。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-03｜酸度过载

- conceptRef: AC-TASTE-R1-03
- displayNameDraft: 酸度过载
- sourceReviewItems: C003
- naturalLanguageDefinition: 酸味过强，从清爽偏酸到酸度爆炸，导致饮品被酸度接管。
- whyApproved: 制作人明确认为酸度过载肯定要有。
- coreExperience: 酸味刺口、压住其他层次，玩家首先感到“太酸”。
- likelyLayer: taste
- possibleEvidence:
  - 酸味强度过高
  - 多个酸味来源叠加
  - 酸味压住甜、茶、奶或风味身份
- expressionTags:
  - 偏酸
  - 太酸
  - 酸到皱脸
  - 酸度爆炸
- severityNotes:
  - 支持 severity 分级。
  - 不按柠檬 / 山楂 / 百香果等具体酸味原料拆多个酸度事故。
- customerPreferenceNotes: 未来顾客偏好可能影响酸度容忍度；当前不实现顾客系统。
- riskNotes: 酸味来源只能作为 evidence / source ingredient / intensity source。
- notThis:
  - 不是某个酸味原料专属事故。
  - 不为柠檬、山楂、百香果等单独创建酸度事故机制。
- producerNotes: 后续结构化时应让具体酸味原料只作为证据，不作为机制身份。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-04｜苦味过载

- conceptRef: AC-TASTE-R1-04
- displayNameDraft: 苦味过载
- sourceReviewItems: C004
- naturalLanguageDefinition: 苦味过强，茶、咖啡、可可、抹茶等来源可能贡献苦味，但机制关注的是苦味负担本身。
- whyApproved: 制作人确认苦味过载肯定要有，但后续权重和扣分需要斟酌。
- coreExperience: 苦味明显压住饮品平衡，入口发苦、回味发苦，甚至让普通顾客觉得难喝。
- likelyLayer: taste
- possibleEvidence:
  - 苦味强度过高
  - 茶感 / 咖啡感 / 可可感 / 抹茶感带来苦味负担
  - 苦味压住甜、奶、果香或饮品主线
- expressionTags:
  - 苦味明显
  - 太苦
  - 苦到压住整杯
  - 苦味回甘或苦味负担
- severityNotes: 后续可通过苦味强度和反馈强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes:
  - customerPreferenceSensitive
  - 有人喜欢强苦味，例如 espresso、浓茶、苦咖啡。
  - 后续需要顾客偏好 / audience tags / tolerance 调节。
- riskNotes:
  - 后续权重和扣分要斟酌。
  - 不要写成 `if 上班族 then 喜欢苦咖啡`。
- notThis:
  - 不按茶 / 咖啡 / 抹茶等具体原料拆苦味事故。
  - 不默认所有顾客都讨厌苦味。
- producerNotes: 苦味机制成立，但偏好差异明显，后续应在顾客偏好层处理容忍度。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-05｜咸味过载

- conceptRef: AC-TASTE-R1-05
- displayNameDraft: 咸味过载
- sourceReviewItems: C005 revised
- naturalLanguageDefinition: 咸味过强，饮品被咸度压住，入口像被盐味接管。
- whyApproved: 原候选“咸甜失衡”需修改；制作人确认真正问题是咸度太多，变成咸味过载。
- coreExperience: 少量咸味可能增加层次，但过量后变成明显咸味负担，让饮品失去平衡。
- likelyLayer: taste
- possibleEvidence:
  - 咸味强度过高
  - 海盐 / 咸奶盖 / 芝士等咸味来源过量
  - 咸味压住甜、奶、茶或风味主线
- expressionTags:
  - 太咸
  - 咸味压住
  - 像喝盐水
  - 咸度过载
- severityNotes: 后续可按咸味强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes: 未来顾客偏好可能影响咸味和咸甜搭配容忍度；当前不实现顾客系统。
- riskNotes:
  - 咸甜组合本身不应被惩罚。
  - 少量咸味可能形成“咸甜永动机”式好喝层次。
- notThis:
  - 不是咸甜组合本身。
  - 不惩罚合理海盐 / 咸奶盖 / 芝士层次。
  - 不把“咸甜永动机”当事故。
- producerNotes: 主概念名必须是“咸味过载”，不要用“咸甜失衡”作为主概念名。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-06｜涩感 / 收敛感过强

- conceptRef: AC-TASTE-R1-06
- displayNameDraft: 涩感 / 收敛感过强
- sourceReviewItems: C006
- naturalLanguageDefinition: 茶涩、果皮涩或植物收敛感过强，嘴里发干、发紧、刮舌。
- whyApproved: 制作人确认涩感 / 收敛感方向成立。
- coreExperience: 入口后口腔发干、舌面发紧，强茶感或植物感带来明显收敛负担。
- likelyLayer: taste / special sensation
- possibleEvidence:
  - 茶涩明显
  - 果皮涩明显
  - 植物收敛感过强
  - 嘴里发干、发紧、刮舌
- expressionTags:
  - 涩感
  - 收敛感
  - 发干
  - 刮舌
  - 强茶感
- severityNotes: 后续可按收敛强度和反馈强度表达轻中重，不应拆 accidentTypeId。
- customerPreferenceNotes:
  - customerPreferenceSensitive
  - 有些人喜欢强茶感、茶涩、收敛感。
  - 后续需要顾客偏好 / tolerance 调节。
- riskNotes: 不要把涩感简单并入苦味，也不要默认大众口味之外的强茶感都是事故。
- notThis:
  - 不完全等同于苦味。
  - 不默认所有顾客都讨厌涩感。
  - 不作为 C007 特殊刺激 umbrella 的附属项；本项已单独保留。
- producerNotes: C006 已单独保留，后续顾客偏好应直接接到涩感 / 收敛感通道。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TASTE-R1-07｜基础味觉整体过载

- conceptRef: AC-TASTE-R1-07
- displayNameDraft: 基础味觉整体过载
- sourceReviewItems: C008
- naturalLanguageDefinition: 甜、酸、苦、咸等基础味觉 / 已明确保留的特殊刺激负担整体过高，喝起来很吵、很累。
- whyApproved: 制作人确认该方向成立，但特别提醒需要小心。
- coreExperience: 单一味道未必独自超标，但基础味觉负担叠加后让整杯饮品变得拥挤、吵闹、压迫。
- likelyLayer: taste load / stimulation load
- possibleEvidence:
  - 多个基础味觉同时偏高
  - 基础味觉负担叠加
  - 饮品入口很吵、很累
  - 刺激负担超过普通顾客容忍度
- expressionTags:
  - 味觉很吵
  - 整体过载
  - 喝起来很累
  - 基础味觉负担
- severityNotes: 后续可通过整体负担强度表达轻中重，但必须避免把所有 flavor identity 当成 taste load。
- customerPreferenceNotes: 未来顾客偏好可能影响整体强度容忍度；当前不实现顾客系统。
- riskNotes:
  - highRisk
  - 不能简单累加所有 flavor identity。
  - 不能把茶味 70 的好喝花茶误判成味道很浓很可怕。
  - 需要和 flavor 线“风味主题太多，没有主角”区分。
- notThis:
  - 不是 flavor identity 总和。
  - 不是风味主题太多。
  - 不是所有味道多就事故。
- producerNotes: 制作人此前已特别提醒该概念需要小心，后续必须避免把 flavor identity 误算进基础味觉整体过载。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

## 3. Non-Approved / Revised / Later Review

### C007｜特殊刺激过强

- status: revise / splitNeeded / umbrella / later review
- decision: 特殊刺激方向成立，但不作为单一 approved concept 进入本 list。
- reason:
  - “特殊刺激”是上位分类，不应作为一个单一机制长期处理。
  - 涩感 / 收敛感已由 C006 单独保留。
  - 辣感 / 灼辣感、麻感 / 震麻感、酒精灼烧 / 挥发刺激等应作为未来子概念候选，后续单独 concept review。
  - 顾客偏好 / tolerance 应接到具体 sensation channel，而不是只接一个统一的 strongStimulation。
  - 喜欢酒精灼烧感的顾客不等于喜欢辣椒油；喜欢辣的人也不等于喜欢麻或涩。
- boundary:
  - 不生成单一“特殊刺激过强” accident concept。
  - 不生成统一 strongStimulation preference。
  - 不写 if 酒 / if 辣 / if 麻。
  - 后续应通过 sensation profile / intensity / audience tolerance / rule table 处理。

## 4. Cross-layer / Customer Preference Notes

- 顾客偏好 / tolerance 未来不是 taste 专属。
- C004 / C006 是本轮 taste 中明显的 customerPreferenceSensitive 项；C007 的未来子通道也需要具体 preference / tolerance。
- texture / flavor / structure 也可以被顾客偏好调节。
- 例如小孩可能喜欢高甜或小料很多的八宝粥感；上班族 / 咖啡爱好者可能接受更高苦味；茶爱好者可能接受更强涩感；猎奇客群可能接受某些具体刺激或强风味。
- 当前不实现顾客系统，不创建 customerTag / audienceId。
- 后续必须通过 preference profile / audience tags / tolerance / rule table / metadata 表达，不写 if 小孩 then 喜欢甜、if 上班族 then 喜欢苦咖啡。

## 5. Global Boundary Notes

- Approved concept 不等于 approved stable ID。
- `conceptRef` 不是 stable ID。
- `displayNameDraft` 不是系统主键。
- `sourceReviewItems` 不是机制主键。
- 后续 draft ID / registry candidate / validator / rule table 必须另开任务。
- 本文件不能自动进入 runtime / generated severity / final feedback / golden expected。
- 所有可分级事故都遵守全局 severity boundary：同一机制内分轻中重，不拆 `accidentTypeId`。
- customer preference / tolerance 当前只作为未来可接入原则，不是当前实现。

## 6. Next Possible Step

候选下一步：

- 用户 + ChatGPT 继续审阅本 approved concept list draft。
- 如果本 draft 通过，可另开 draft ID / registry candidate planning task，但仍不得直接接 runtime。
- 也可以先做 concept review checkpoint，确认 taste / texture / flavor 三条基础概念线都已到 approved concept list draft。
- 或未来单独开 special sensation sub-channel concept review，处理辣感 / 麻感 / 酒精灼烧等子概念。
