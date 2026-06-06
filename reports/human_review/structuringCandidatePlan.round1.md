# Structuring Candidate Plan Round 1｜第一批结构化候选规划

## 0. 文件定位

本文件是 v0.0.8.x planning-only 阶段的 structuring candidate planning report。

它从已完成的 human review / approved concept list drafts 中，选择第一批适合后续结构化规划的自然语言概念。

本文件不是：

- approved stable ID list
- draft ID list
- registry candidate
- validator input
- validator rule
- runtime data
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不生成 stable ID、draft ID、registry candidate、validator rule 或 runtime data，也不批准任何 ID。

后续如果要生成 draft ID / registry candidate，必须另开任务，并先处理 source-of-truth / registry / enum / schema planning。

本文件不替代 `docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_DECISION_MODEL.md`、`docs/V0_0_8_PLANNING_TODO.md` 或任何 L1 正本。

## 1. Selection Criteria

第一批只选择边界相对稳、适合进入下一步结构化讨论的自然语言概念。

选择标准：

- 机制边界相对清楚。
- 玩家容易理解。
- 可按 severity 分级。
- 不依赖复杂 product identity / drinkType expectation。
- 不要求先实现顾客系统。
- 不容易立刻掉进 if 地狱。
- 可以通过 summary / profile / evidence / future rule table 规划。
- 暂不选择 flavor 高风险项、product identity、高阶顾客偏好项或 legacy-heavy 项。

## 2. Selected First Batch Concepts

说明：以下 `planningRef` 只是本报告内部的临时规划引用，不是 stable ID，不是 draft ID，也不是 registry candidate。

### 2.1 STRUCT-R1-01｜甜度过载

- planningRef: STRUCT-R1-01
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TASTE-R1-02
- sourceFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C002
- displayNameDraft: 甜度过载
- whySelected:
  - taste 层基础概念。
  - 制作人明确认为甜度过载需要保留。
  - 玩家直觉清楚，适合第一批结构化规划。
- likelyLayer: taste
- futureStructuringNeeds:
  - 后续需要从 taste summary / evidence 中读取甜味负担。
  - 后续需要 severity 区间、反馈强度和可能的顾客偏好调节。
- possibleMetricDirections:
  - sweetnessLoad
  - sweetIntensity
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 正常、轻微太甜、明显太甜、甜度灾难属于同一机制连续谱。
  - 不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不按糖 / 蜂蜜 / 糖浆 / 果酱等来源拆机制。
  - 甜味来源只能作为 evidence / intensity source。
- customerPreferenceNotes:
  - 未来可受顾客甜度偏好影响。
  - 本轮不实现顾客系统，不创建 customerTag / audienceId。
- notThis:
  - 不是某个甜味原料专属事故。
  - 不是正式 ID 命名提案。
  - 不是正式阈值或正式评分规则。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

### 2.2 STRUCT-R1-02｜酸度过载

- planningRef: STRUCT-R1-02
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TASTE-R1-03
- sourceFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C003
- displayNameDraft: 酸度过载
- whySelected:
  - taste 层基础概念。
  - 制作人明确认为酸度过载需要保留。
  - 边界比 product identity / flavor identity 类概念更清楚。
- likelyLayer: taste
- futureStructuringNeeds:
  - 后续需要从 taste summary / evidence 中读取酸味负担。
  - 后续需要 severity 区间、反馈强度和可能的顾客偏好调节。
- possibleMetricDirections:
  - acidityLoad
  - acidIntensity
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 清爽偏酸、明显太酸、酸度爆炸属于同一机制连续谱。
  - 不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不按柠檬 / 山楂 / 百香果等酸味来源拆机制。
  - 酸味原料只能作为 evidence / intensity source。
- customerPreferenceNotes:
  - 未来顾客可能有不同酸度容忍度。
  - 本轮不实现顾客系统。
- notThis:
  - 不是柠檬事故、山楂事故或百香果事故。
  - 不是正式 triggerMetric。
  - 不是 validator input。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

### 2.3 STRUCT-R1-03｜苦味过载

- planningRef: STRUCT-R1-03
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TASTE-R1-04
- sourceFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C004
- displayNameDraft: 苦味过载
- whySelected:
  - taste 层基础概念。
  - 制作人确认苦味过载成立。
  - 虽然 customerPreferenceSensitive，但机制本身边界清楚。
- likelyLayer: taste
- futureStructuringNeeds:
  - 后续需要从 taste summary / evidence 中读取苦味负担。
  - 后续需要区分大众事故、偏好容忍和高苦味饮品身份。
- possibleMetricDirections:
  - bitternessLoad
  - bitterIntensity
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 苦味明显、太苦、苦到压住整杯属于同一机制连续谱。
  - 不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不按茶 / 咖啡 / 抹茶 / 可可等来源拆机制。
  - 具体来源只能作为 evidence / intensity source。
- customerPreferenceNotes:
  - customerPreferenceSensitive。
  - 有人喜欢 espresso、浓茶或苦咖啡；未来需要 tolerance。
  - 本轮不实现顾客系统。
- notThis:
  - 不是茶事故、咖啡事故或抹茶事故。
  - 不是“所有苦味都扣分”的规则。
  - 不是正式评分方案。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

### 2.4 STRUCT-R1-04｜涩感 / 收敛感过强

- planningRef: STRUCT-R1-04
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TASTE-R1-06
- sourceFile: `reports/human_review/approvedConceptList.taste.round1.draft.md`
- sourceReviewItems: C006
- displayNameDraft: 涩感 / 收敛感过强
- whySelected:
  - taste / special sensation 交界，但已被单独保留。
  - 用户特别确认可进入第一批，因为红茶 / 乌龙茶 / 咖啡都会涉及。
  - 它和苦味不同，也不应并回 special stimulation umbrella。
- likelyLayer: taste / special sensation boundary
- futureStructuringNeeds:
  - 后续需要从 taste summary、茶感 / 植物收敛证据或 future sensation evidence 中读取收敛负担。
  - 后续需要明确与苦味、辣感、麻感、酒精灼烧等通道的边界。
- possibleMetricDirections:
  - astringencyLoad
  - tanninPressure
  - dryingSensation
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 轻微发干、明显涩感、强收敛刮舌属于同一机制连续谱。
  - 不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不写成红茶 / 乌龙茶 / 咖啡专属 if。
  - 不把涩感简单并入苦味。
  - 不并回“特殊刺激过强”单一 umbrella。
- customerPreferenceNotes:
  - customerPreferenceSensitive。
  - 有些顾客喜欢强茶感、茶涩或收敛感。
  - 本轮不实现顾客系统。
- notThis:
  - 不是苦味过载。
  - 不是特殊刺激 umbrella。
  - 不是正式 triggerMetric 或正式 ID。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

### 2.5 STRUCT-R1-05｜水泥感 / 粉泥感 / 低流动性

- planningRef: STRUCT-R1-05
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TEX-R1-02
- sourceFile: `reports/human_review/approvedConceptList.texture.round1.draft.md`
- sourceReviewItems: C002
- displayNameDraft: 水泥感 / 粉泥感 / 低流动性
- whySelected:
  - texture / drinkability 核心概念。
  - 制作人明确表示水泥感 / 吸不上来是早期核心概念之一。
  - 边界比奶脂、胶粘或 flavor 高风险项更适合第一批结构化规划。
- likelyLayer: texture / drinkability
- futureStructuringNeeds:
  - 后续需要从 texture summary / drinkability evidence 中读取粉泥、低流动性和吸管阻力表现。
  - 后续需要明确吸管阻力只是表现标签 / severity cue。
- possibleMetricDirections:
  - slurryLoad
  - pasteLoad
  - powderLoad
  - lowFlowPenalty
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 轻微粉感 / 沙感到重度水泥感 / 吸不上来，是同一机制连续谱。
  - 全局 severity identity boundary 适用；不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不按粉类 / 芋泥 / 奥利奥等具体来源拆机制。
  - 不把 C003 吸管阻力拆成独立机制。
  - 不写具体原料比例 if。
- customerPreferenceNotes:
  - 未来可能存在顾客对厚重口感的不同容忍度。
  - 本轮不实现顾客系统。
- notThis:
  - 不是芋泥事故、奥利奥事故或粉类事故。
  - 不是吸管阻力独立机制。
  - 不是正式 runtime rule。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

### 2.6 STRUCT-R1-06｜八宝粥感 / 固体小料负载过高

- planningRef: STRUCT-R1-06
  - 不是 stable ID。
  - 不是 draft ID。
  - 不是 registry candidate。
- sourceConceptDraft: AC-TEX-R1-01
- sourceFile: `reports/human_review/approvedConceptList.texture.round1.draft.md`
- sourceReviewItems: C001, C008 merged
- displayNameDraft: 八宝粥感 / 固体小料负载过高
- whySelected:
  - texture / drink structure 核心概念。
  - 制作人明确认为“八宝粥感”是经典概念。
  - 玩家直觉强，边界适合第一批结构化规划。
- likelyLayer: texture / drink structure
- futureStructuringNeeds:
  - 后续需要从 texture summary / drink structure evidence 中读取固体负载、液体支撑和饮品形态偏离。
  - 后续需要明确“需要勺子”只是表现或产品形态边界。
- possibleMetricDirections:
  - solidLoad
  - toppingLoad
  - liquidSupport
  - chewLoad
  - 以上只是方向词，不是正式 triggerMetric。
- severityPlanningNotes:
  - 小料略多、明显像甜品碗、饮品形态被压垮属于同一机制连续谱。
  - 不因轻中重拆多个 accidentTypeId。
- antiIfNotes:
  - 不按珍珠 / 芋圆 / 布丁 / 椰果等具体小料拆机制。
  - 不把“需要勺子”单独拆成机制。
  - 不写具体小料组合 if。
- customerPreferenceNotes:
  - 未来可能存在喜欢大量小料的顾客。
  - 本轮不实现顾客系统，不创建 audienceId。
- notThis:
  - 不是某个具体 topping 的事故。
  - 不是“需要勺子”独立机制。
  - 不是正式 ID 或 registry row。
- currentStatus:
  - no_id_generated
  - not_registry_candidate
  - no_runtime_effect

## 3. Deferred Concepts And Reasons

以下概念不是被遗忘，而是不适合作为第一批 structuring planning 候选。

### 3.1 Flavor / Structure High-Risk Deferred

- 清爽感被厚重元素吞掉
  - 可保留，但后续要避免和 texture / mouthfeel 混淆；暂不第一批。
- 强风味身份压制整杯
  - anti-if 高风险，必须等 flavor profile / intensity / family 规划更清楚。
- 风味身份错位
  - 需要 flavor identity / drink context fit。
- 饮品类型承诺和实际体验不一致
  - product identity 高阶，不能急着结构化。
- 风味主题太多
  - 需要主题 / identity / structure 进一步设计。

### 3.2 Taste / Cross-Layer Deferred

- 饮品存在感过低 / 太淡
  - 高风险，跨 taste / flavor identity / body，不能简单 basicTasteSum。
- 咸味过载
  - 成立，但比甜 / 酸 / 苦更容易误伤合理咸甜搭配，可第二批。
- 基础味觉整体过载
  - 高风险，不能误算 flavor identity。

### 3.3 Texture Deferred

- 奶脂 / 奶盖 / 奶油油腻负担
  - 成立，但与 mouthfeel / flavor / 顾客偏好有关，可第二批。
- 胶粘感 / 胶质负担
  - 成立，但需要更清楚 texture metrics，可第二批。

### 3.4 Special Sensation Deferred

- 辣感 / 灼辣感
- 麻感 / 震麻感
- 酒精灼烧 / 挥发刺激
- 清凉刺激
- 辛香刺激 / 香料压力
- 特殊刺激主题饮 high-level later review

暂缓原因：

- 需要单独 sensation channel planning。
- 部分概念和顾客偏好 / product identity / flavor identity 交叉。
- 不作为第一批 structuring planning。

## 4. Global Boundaries For Next Phase

- `planningRef` 不是 stable ID。
- `displayNameDraft` 不是系统主键。
- `possibleMetricDirections` 不是正式 triggerMetric。
- 本文件不生成 draft ID。
- 本文件不创建 registry candidate。
- 本文件不允许 Codex 进入 validator / runtime / generated severity。
- 所有概念仍需后续用户 + ChatGPT 确认，才能进入 draft ID / registry candidate planning。
- 下一阶段若要继续，必须先处理或规划 known stable ID source-of-truth / registry / enum / schema。
- 任何 generated severity / scoreMultiplier / threshold 工作，都必须等待 validator / schema / review gate。

## 5. Recommended Next Options

以下只是候选方向，不是命令，也不开放 implementation。

### Option A｜Source-of-truth / Registry / Enum / Schema Planning

为后续 draft ID / registry candidate 做前置设计。

不直接生成 ID。

### Option B｜Draft ID Naming Review Protocol

设计 draft ID 命名审查流程。

不直接命名这 6 个概念。

### Option C｜Candidate Severity Rule Schema Review

讨论未来 severity table 如何承接这些概念。

不填正式数值。

### Recommendation

先由用户 + ChatGPT 审阅本 structuring candidate plan。

不建议直接生成 draft ID 或 registry candidate。
