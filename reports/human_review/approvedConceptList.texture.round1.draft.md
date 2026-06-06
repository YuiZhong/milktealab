# Approved Concept List Draft｜Texture / Drinkability Round 1

## 0. 文件定位

本文件是第一批 texture / drinkability 方向的 approved concept list draft。

它整理的是制作人已经在自然语言层面认可的 concept，不是 stable ID、draft ID、registry candidate、validator rule、generated data 或 runtime data。

本文件来源于制作人审核记录，用于后续用户 / ChatGPT / Codex 讨论结构化路径。它不是机制 source-of-truth，不自动批准任何 ID，也不能直接进入 final feedback / final result / golden expected。

Codex 不得从本文件直接生成 runtime data、registry entry、validator rule 或 final feedback。下一步若要结构化，必须另开任务，并继续遵守 Scenario first, ID later：先确认人话场景和概念，再考虑 draft ID / rule / sheet / registry candidate。

## 1. 来源

- Source review record: `reports/human_review/textureConceptReview.round1.md`
- Producer decision summary:
  - C001 / C002 / C004 / C005: keep
  - C003: merge / evidenceOnly / expressionTag
  - C006: reject
  - C007: keep / reclassify to later flavor / structure conflict review
  - C008: merge into C001

## 2. Approved Concepts Draft

说明：以下 `conceptRef` 只是本草案内部的临时概念引用，不是 stable ID，不是 draft ID，也不是 registry candidate。

### AC-TEX-R1-01｜八宝粥感 / 固体小料负载过高

- conceptRef: AC-TEX-R1-01
- displayNameDraft: 八宝粥感 / 固体小料负载过高
- sourceReviewItems: C001, C008 merged
- naturalLanguageDefinition: 小料或固体内容多到饮品形态被压垮，喝起来不像饮料，更像八宝粥、甜品碗或需要勺子的固体负载体验。
- whyApproved: 制作人明确认为“八宝粥感”是经典概念，能够表达固体小料过载造成的饮品形态崩坏。
- coreExperience: 固体太多、饮品感下降、吸管变累、需要咀嚼或改用勺子。
- likelyLayer: texture / drink structure
- possibleEvidence:
  - 小料总量过高
  - 固体负载过高
  - 饮品形态接近甜品碗
  - 吸管阻力作为表现线索
- expressionTags:
  - 需要勺子
  - 甜品碗
  - 吸管累
  - 小料过载感
- severityNotes: 后续严重度可以通过固体负载、吸管阻力、饮品形态偏离程度和反馈强度表达，不应拆成多个 accidentTypeId。
- notThis:
  - 不按具体小料类型拆成多个机制。
  - 不把“需要勺子”单独拆成机制。
  - 不把某个具体 topping 变成新 accidentTypeId。
- producerNotes: C008 “需要勺子”仅作为 C001 的表现或产品形态边界，不独立成机制。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TEX-R1-02｜水泥感 / 粉泥感 / 低流动性

- conceptRef: AC-TEX-R1-02
- displayNameDraft: 水泥感 / 粉泥感 / 低流动性
- sourceReviewItems: C002, C003 primary expression cue
- naturalLanguageDefinition: 泥、粉、渣、糊等导致饮品低流动性，从轻微粉感、浑浊、粉浆感，到喝着费劲、吸不上来、像水泥一样堵住。
- whyApproved: 制作人明确表示水泥感 / 吸不上来是游戏最早想到的核心概念之一。
- coreExperience: 粉泥糊堵住饮品，流动性下降，吸管阻力上升，喝起来费劲甚至吸不上来。
- likelyLayer: texture / drinkability
- possibleEvidence:
  - 粉感明显
  - 泥浆感
  - 糊住
  - 低流动性
  - 吸管阻力
  - 吸管吸瘪
- expressionTags:
  - 粉感
  - 糊
  - 泥浆
  - 水泥感
  - 吸管阻力
  - 吸管吸瘪
- severityNotes: 粗糙粉感 / 沙感 / 轻微粉浆感应作为本概念的低 severity 表现或文案方向；重度水泥感 / 根本吸不上来是同一机制的高 severity 表现。未来应通过 triggerMetric 区间、severityLevel、scoreMultiplier 和 feedback intensity 表达，不得为了轻中重拆 accidentTypeId。
- notThis:
  - 不把吸管阻力单独拆成机制。
  - 不把轻微粉感 / 沙感拆成独立 texture accident concept。
  - 不把具体粉类或具体原料名作为机制身份。
- producerNotes: C003 “吸管阻力”是表现标签、严重程度线索或文案触发依据，可服务 C002，也可次级服务 C001。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TEX-R1-03｜奶脂 / 奶盖 / 奶油油腻负担

- conceptRef: AC-TEX-R1-03
- displayNameDraft: 奶脂 / 奶盖 / 奶油油腻负担
- sourceReviewItems: C004
- naturalLanguageDefinition: 饮品仍然可以吸上来，但入口后被奶脂、奶盖、奶油或高脂厚重元素压住，形成太油、太腻、糊舌、恶心或口腔负担。
- whyApproved: 制作人确认“太油 / 一整杯奶盖 / 全是奶脂奶油”是早期核心概念之一。
- coreExperience: 可饮用但入口负担重，口腔被油脂包裹，顺滑变成发腻。
- likelyLayer: texture / mouthfeel
- possibleEvidence:
  - 一整杯奶盖
  - 奶油过多
  - 奶脂过重
  - 植脂末或高脂厚重元素造成入口负担
- expressionTags:
  - 太油
  - 太腻
  - 糊舌
  - 入口恶心
  - 油脂包裹感
  - 口腔负担
- severityNotes: 后续可通过脂肪感、厚重度、口腔残留和反馈强度表达轻中重，不应拆 accidentTypeId。
- notThis:
  - 不是 AC-TEX-R1-02。C002 的核心是吸不上来 / 粉泥堵住；本概念的核心是吸得上来但入口发腻、负担重。
  - 不按奶盖、奶油、奶脂、植脂末等具体来源拆多个机制。
- producerNotes: 文案表达可能偏“太油、太腻、入口恶心”，但机制仍应先按 texture / mouthfeel 讨论。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

### AC-TEX-R1-04｜胶粘感 / 胶质负担

- conceptRef: AC-TEX-R1-04
- displayNameDraft: 胶粘感 / 胶质负担
- sourceReviewItems: C005
- naturalLanguageDefinition: 蜂蜜、糖浆、胶质或类似黏稠材料过多，造成满嘴黏糊、拉丝、拖尾、粘嘴或胶水般的口感负担。
- whyApproved: 制作人认为蜂蜜、糖浆、胶质过多造成的黏糊糊口感有趣，并区别于粉泥感和奶脂油腻。
- coreExperience: 黏、胶、拖尾、粘嘴，喝完嘴里还有黏连感。
- likelyLayer: texture / mouthfeel
- possibleEvidence:
  - 蜂蜜过多
  - 糖浆过多
  - 胶质过多
  - 鸡蛋放多的口感类比
- expressionTags:
  - 胶粘
  - 黏嘴
  - 拖尾
  - 拉丝
  - 糖浆感
  - 满嘴黏糊
- severityNotes: 后续可通过黏度、拖尾、口腔残留和反馈强度表达轻中重，不应拆 accidentTypeId。
- notThis:
  - 不是粉泥 / 水泥感。
  - 不是奶脂油腻。
  - 核心不是吸不上来，而是胶、黏、粘嘴、拖尾。
- producerNotes: “鸡蛋”只是制作人口感类比，不是当前新增原料，也不是本概念的结构字段。
- structuringStatus: not_structured
- idStatus: no_id_generated
- registryStatus: not_candidate
- runtimeStatus: no_runtime_effect

## 3. Non-Approved / Merged / Reclassified Items

### C003｜吸管阻力过高

- round1Status: expressionTag / evidenceOnly / severity cue
- decision: 不单独成为机制。
- mergeTarget: 主要并入 AC-TEX-R1-02，次级服务 AC-TEX-R1-01。
- note: 可作为文案触发、严重程度线索或表现标签，但不是独立 accidentTypeId。

### C006｜沉积到底部，前后半杯割裂

- round1Status: reject
- decision: 本轮不作为事故机制。
- note: 现实饮品中沉积很常见，判成事故过严。后续如果需要，可作为制作工艺、搅拌提示或 evidence 讨论。

### C007｜清爽液体被厚重元素吞掉

- round1Status: reclassify
- decision: 概念方向保留，但不进入 texture list。
- nextReview: 后续 flavor / structure conflict review。
- note: 不在本轮 texture approved concept list draft 中继续结构化。

### C008｜需要勺子的边界

- round1Status: merged / not standalone
- mergeTarget: AC-TEX-R1-01
- decision: 不独立成机制。
- note: 可作为 C001 的表达、文案、产品形态边界或严重程度线索。

## 4. 全局边界

- approved concept list draft 不等于 approved stable ID。
- `conceptRef` 不等于 stable ID。
- `displayNameDraft` 不等于系统主键。
- `sourceReviewItems` 不等于机制主键。
- severity 不进入 accidentTypeId。
- 未来 draft ID / registry candidate / validator / rule table 必须另开任务。
- 本文件不能自动进入 runtime。
- 本文件不能自动进入 generated severity。
- 本文件不能自动影响 final feedback / final result。
- 本文件不能自动修改 golden expected。
- 新 texture concept 必须先进入 concept review / producer review，不得直接进入系统。

## 5. 下一步候选

- 用户 + ChatGPT 继续审阅本 draft。
- 如果本 draft 通过，可另开 draft ID / registry candidate planning task，但仍不得直接接 runtime。
- 也可以先进行 flavor / structure conflict review round，承接 C007。
