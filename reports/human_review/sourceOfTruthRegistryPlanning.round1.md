# Source-of-Truth / Registry Planning Round 1｜ID 来源与晋级规划

## 0. 文件定位

本文件是 v0.0.8.x planning-only 阶段的 source-of-truth / registry / enum / schema planning report。

它规划后续 draft ID / registry candidate / validator 的前置边界，回答未来“合法 ID 从哪里来、draft 如何晋级、validator 应读取什么”。

本文件不是：

- registry
- schema
- enum
- validator input
- allowed values
- stable ID list
- draft ID list
- registry candidate
- runtime data
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不创建 registry、schema、enum 或 validator。

本文件不生成任何 ID，不批准任何 stable ID，也不开放 implementation。

后续若要创建 draft ID / registry candidate，必须另开任务并由用户明确批准。

## 1. 为什么需要这一步

当前已经有第一批 structuring candidates，但它们仍是自然语言概念。

这些材料中的 `planningRef`、`conceptRef`、`displayNameDraft` 都不是系统 ID。

如果没有 source-of-truth / registry / enum / schema planning，Codex 很容易把人类草案误写成 stable ID，或把看起来像机器字段的引用误当作正式 ID。

这一步的目的：

- 防止 fake stability。
- 防止 displayName 主键回潮。
- 防止 validator 通过字符串猜 ID。
- 防止 reports / approved concept list draft 被误当成 allowed values。
- 防止自然语言草案绕过制作人 / ChatGPT review 直接进入 runtime。

## 2. 当前可用输入，但都不是 source-of-truth

以下材料可作为 source evidence / review record / planning input：

- `reports/human_review/structuringCandidatePlan.round1.md`
- `reports/human_review/approvedConceptList.taste.round1.draft.md`
- `reports/human_review/approvedConceptList.texture.round1.draft.md`
- `reports/human_review/v0.0.8ConceptReviewCheckpoint.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/TASTE_DECISION_MODEL.md`
- `docs/TASTE_SYSTEM_DESIGN.md`
- `docs/TASTE_ENGINE_ARCHITECTURE.md`

这些材料可以证明概念来源、制作人审核状态、边界说明和后续规划方向。

它们不是 registry。

它们不是 allowed values。

它们不是 validator input。

它们不能自动生成 ID。

## 3. 未来 ID / Registry Source-of-Truth 分层建议

本节只做分层规划，不创建文件，不创建 registry，不创建 schema。

### 3.1 Reviewed Concept Layer

- 来源：human review / approved concept list draft。
- 状态：natural language approved concept。
- 作用：证明概念经过制作人审核。
- 不能做：不能当 stable ID，不能当 validator allowed value，不能接 runtime。

### 3.2 Draft Structuring Layer

- 来源：后续单独任务。
- 状态：draft ID / draft rule / draft registry candidate。
- 作用：让概念进入机器可读准备层。
- 不能做：不能进 runtime，不能进 validator allowed values，不能生成 final feedback / final result。

### 3.3 Registry Candidate Layer

- 来源：后续单独任务。
- 状态：candidate, pending review。
- 作用：准备进入 stable registry review。
- 不能做：不能自动成为 approved source-of-truth，不能直接影响 generated data 或 golden expected。

### 3.4 Approved Stable Registry Layer

- 来源：后续专门 approval task。
- 状态：approved stable ID。
- 作用：未来 validator / generated data / runtime 可读取的合法来源。
- 不能做：本轮不创建，不批准，不填内容。

### 3.5 Runtime / Generated Layer

只有经过 validator / review / shadow / takeover gate 后，内容才可能进入 runtime / generated layer。

本轮完全不开放 runtime / generated layer。

## 4. Draft ID 晋级原则

必须保持以下边界：

- approved concept list 不等于 approved stable ID。
- draft ID 不等于 registry entry。
- registry candidate 不等于 approved source-of-truth。
- generated data 不等于 runtime takeover。
- shadow 不等于 final result。

未来 draft ID 进入 registry candidate 至少需要携带以下信息：

- source approved concept。
- source review file。
- source review item / conceptRef。
- human-readable definition。
- sourceLayer / candidateLayer。
- anti-if notes。
- notThis。
- possible metric directions。
- customer preference notes if relevant。
- severity boundary。
- no runtime effect flag。
- reviewStatus。
- owner / reviewer note。

本文件只写规划，不创建字段文件，不创建 registry row，不提出任何实际 ID。

## 5. Validator 读取原则

future validator 不能靠字符串 pattern 推断合法 ID。

validator 不应使用以下方式判断合法性：

- `endsWith("_heavy")`
- `includes("sweet")`
- 中文显示名
- `displayNameDraft`
- `conceptRef`
- `planningRef`
- review pack item 编号
- reports 文件路径

validator 的合法来源必须来自 explicit approved registry / enum / schema / existing reviewed stable data。

reports / review packs / approved concept list draft / source notes / collector output 都不能直接作为 allowed values。

在没有 approved source-of-truth 前，只能做 warning / lint / planning check，不能做 active validator。

## 6. 第一批 6 个 Concept 的规划状态

说明：以下只列规划状态，不提出任何实际 ID。

| concept | source planning ref | source approved concept draft | status | required next gate |
|---|---|---|---|---|
| 甜度过载 | STRUCT-R1-01 | AC-TASTE-R1-02 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |
| 酸度过载 | STRUCT-R1-02 | AC-TASTE-R1-03 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |
| 苦味过载 | STRUCT-R1-03 | AC-TASTE-R1-04 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |
| 涩感 / 收敛感过强 | STRUCT-R1-04 | AC-TASTE-R1-06 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |
| 水泥感 / 粉泥感 / 低流动性 | STRUCT-R1-05 | AC-TEX-R1-02 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |
| 八宝粥感 / 固体小料负载过高 | STRUCT-R1-06 | AC-TEX-R1-01 | ready_for_draft_id_planning_not_id_generation | draft ID naming review protocol; source-of-truth candidate shape; no runtime effect; no generated severity; no validator allowed values |

共同边界：

- 本节不生成 accidentTypeId。
- 本节不生成 triggerMetric 正式名。
- 本节不生成 registry row。
- 本节不创建 validator input。
- 本节不创建 allowed values。

## 7. Deferred / Not First Batch

以下内容仍不进入第一批 source-of-truth planning。

它们不是 rejected，只是需要更多概念 / schema / layer planning，不适合第一批。

- flavor / structure 高风险项。
- product identity 项。
- special sensation 子通道。
- 饮品存在感过低 / 太淡。
- 咸味过载。
- 基础味觉整体过载。
- 奶脂油腻。
- 胶粘感。
- 顾客偏好系统。

原因：

- 部分概念需要更多 layer planning。
- 部分概念与 product identity / flavor identity / customer preference 交叉。
- 部分概念需要单独 sensation channel planning。
- 部分概念更容易误入 if 地狱或 displayName 主键回潮。
- 暂不作为第一批 source-of-truth / registry planning 对象。

## 8. Legacy / P1 Gate

v0.0.7.x legacy debts 不阻塞本 planning report。

但它们会阻塞 active validator / generated severity / runtime takeover。

下一步若进入 draft ID / registry candidate planning，必须继续 respect：

- known stable ID source-of-truth / registry / enum / schema planning。
- candidate severity validator gate。
- feedbackTag / generated feedback gate。
- accidentAnalyzer legacy migration route。
- drinkStructureAnalyzer displayName Set residue。

本文件不解决 P1 debt，不把任何 P1 写成 solved。

## 9. Recommended Next Options

以下只是候选方向，不是命令，也不开放 implementation。

### Option A｜Draft ID Naming Review Protocol

设计 draft ID 的命名审查流程。

不直接命名 6 个概念。

### Option B｜Registry Candidate Row Shape Planning

设计 registry candidate 行应该有哪些字段。

不创建 registry row。

### Option C｜Candidate Severity Rule Schema Review

讨论 future severity table 如何承接这 6 个概念。

不填正式阈值，不填正式 `scoreMultiplier`。

### Recommendation

先由用户 + ChatGPT 审阅本 planning report。

不建议直接生成 draft ID、registry candidate 或 validator。
