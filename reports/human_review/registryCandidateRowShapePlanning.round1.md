# Registry Candidate Row Shape Planning Round 1｜Registry Candidate 行结构规划

## 0. 文件定位

本文件只规划 future registry candidate row shape。

本文件不是：

- registry
- schema
- enum
- validator input
- allowed values
- stable ID list
- registry candidate list
- runtime data
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不创建 registry row。

本文件不创建 registry / schema / enum / validator。

本文件不批准任何 stable ID。

本文件不生成 allowed values。

本文件不允许任何 `proposedDraftId` 进入 runtime / generated / golden。

后续若要创建真实 registry candidate proposal，必须另开任务并由用户明确批准。

## 1. Why This Step Exists

第一批 6 个 `proposedDraftId` 已接受为 proposal wording。

但 proposal wording 不等于 registry candidate。

如果没有 row shape，未来 Codex 容易把 draft proposal 直接写进 registry / validator，或只凭 ID 看起来像 stable ID 就制造 fake stability。

本轮先定义“未来 registry candidate 行必须携带哪些审查信息和 gate 字段”。

这一步的目标是让 future registry candidate proposal 在进入任何实现前，先能回答来源、复用、边界、review 和 gate 问题。

## 2. Source Materials

本轮规划输入包括：

- `reports/human_review/draftIdProposalReview.round1.md`
- `reports/human_review/draftIdProposalDryRun.round1.md`
- `reports/human_review/draftIdNamingReviewProtocol.round1.md`
- `reports/human_review/sourceOfTruthRegistryPlanning.round1.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`

这些文件是 planning input / review evidence。

它们不是 registry。

它们不是 allowed values。

它们不能自动生成 registry candidate。

## 3. Future Registry Candidate Row Goals

每个 future registry candidate row 必须能回答：

- 这个候选来自哪个 approved concept？
- 对应哪个 source review file？
- `proposedDraftId` 是什么？
- 它是否复用 existing / legacy / observed ID？
- 如果复用，旧 ID 当前状态是什么？
- 如果新拟，为什么没有可复用旧 ID？
- 主导 `sourceLayer` 是什么？
- 是否跨层？
- 是否按原料拆了机制？
- 是否按 severity 拆了机制？
- 是否混入 displayName / conceptRef / planningRef？
- 是否保留 no runtime effect？
- 谁审过？
- 还缺什么 gate？

这些问题必须在 future row 中显式回答，不能靠文件路径、ID prefix、中文显示名或 report 上下文猜。

## 4. Future Row Shape Proposal

本节只设计字段，不填真实 6 行。

这些字段是 planning proposal，不是最终 schema。

本轮不创建 CSV / JSON / JS registry / schema。

本轮不填 6 个真实 registry candidate rows。

字段名可在后续 row shape review 中调整。

### 4.1 Identity / Proposal Fields

- `candidateRowId`
- `proposedDraftId`
- `idFamily`
- `candidateType`
- `displayNameDraft`
- `proposalStatus`

用途：

- 标识这一行 registry candidate proposal 自身。
- 保留 human-readable 名称。
- 明确它仍是 proposal / candidate 语境，而不是 approved stable。

### 4.2 Source / Traceability Fields

- `sourceApprovedConceptRef`
- `sourceConceptName`
- `sourceReviewFile`
- `sourceReviewItems`
- `sourcePlanningFile`
- `sourcePlanningRef`
- `sourceEvidenceSummary`

用途：

- 证明候选来自经过人类审批的 concept。
- 保留从 concept review 到 draft ID proposal 的可追溯链。
- 防止从 report 路径、conceptRef 或 displayName 自动生成稳定 ID。

### 4.3 Layer / Semantics Fields

- `dominantSourceLayer`
- `sourceLayerEvidence`
- `isCrossLayer`
- `crossLayerNotes`
- `mechanismDefinition`
- `notThis`
- `antiIfNotes`

用途：

- 说明机制真正属于哪一层。
- 记录 prefix 不能替代 sourceLayer。
- 记录 not-this 和 anti-if 边界，防止按原料 / 单样本 / 文案梗拆机制。

### 4.4 Legacy / Migration Fields

- `legacyObservedIds`
- `legacyClassification`
- `reuseRationale`
- `migrationRisk`
- `deprecatedOrSupersededIds`
- `blockedLegacyIds`

用途：

- 区分 reuse candidate、migration candidate、deprecated、superseded、unrelated、needs review。
- 说明 existing observed ID 是否可复用，以及为什么不能直接自动晋级。
- 防止把 historical / scaffold / reviewed_candidate_not_approved 写成 approved stable。

### 4.5 Severity / Metric Planning Fields

- `possibleMetricDirections`
- `severityBoundaryNotes`
- `scoreMultiplierStatus`
- `thresholdStatus`

用途：

- 记录可讨论的 metric 方向，但不生成正式 triggerMetric。
- 记录同一机制内轻中重连续谱，不按 severity 拆 `accidentTypeId`。
- 标记正式阈值 / `scoreMultiplier` 仍未填写。

### 4.6 Preference / Feedback Fields

- `customerPreferenceNotes`
- `feedbackTagStatus`
- `feedbackCopyBoundary`

用途：

- 记录 future customer tolerance / feedback intensity 的边界。
- 明确 feedbackTag / feedback copy 不反向创造 mechanism ID。
- 保持 generated feedback / final feedback gate 关闭。

### 4.7 Review / Gate Fields

- `reviewStatus`
- `reviewer`
- `producerDecision`
- `chatgptTechnicalDecision`
- `canEnterRegistryCandidate`
- `canEnterApprovedStableRegistry`
- `canEnterValidator`
- `canEnterGeneratedSeverity`
- `canAffectRuntime`
- `canChangeGoldenExpected`
- `nextRequiredGate`

用途：

- 明确谁审过，审到哪一步。
- 强制把所有危险 gate 写出来。
- 防止“省略 false gate”导致 future Codex 误读为已开放。

## 5. Required False Gates

未来 registry candidate proposal 阶段，默认必须保持：

- `canEnterApprovedStableRegistry=false`
- `canEnterValidator=false`
- `canEnterGeneratedSeverity=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`

如果未来某任务想把任何一个 gate 改成 `true`，必须另开 explicit approval / takeover task。

本轮不允许任何 gate 为 `true`。

本轮也不创建 `canEnterRegistryCandidate=true` 的真实 row。即使下一步做 Registry Candidate Proposal Round 1，也必须继续明确它不是 approved stable / validator / runtime。

## 6. Relation To First 6 ProposedDraftId

以下只列出已接受为 proposal wording 的 6 个 `proposedDraftId`。

它们不是 registry rows。

它们不是 registry candidate。

它们不是 allowed values。

它们没有 runtime effect。

1. `taste_sweet_overload`
2. `taste_acid_overload`
3. `taste_bitter_overload`
4. `taste_astringency_overload`
5. `texture_low_drinkability`
6. `texture_solid_overload`

共同状态：

- `accepted_as_proposal_wording`
- `not_registry_candidate_this_round`
- `row_shape_planning_only`
- `no_allowed_values`
- `no_runtime_effect`

## 7. Known Special Considerations For First 6

以下只是 future row shape 需要承载的特殊点，不是 registry candidate row。

### `taste_sweet_overload`

- no runtime observed `accidentTypeId` found
- related candidate / risk stems exist
- must not split by sugar / honey / syrup / fruit jam

### `taste_acid_overload`

- existing observed / scaffold evidence exists
- current scaffold status remains `reviewed_candidate_not_approved`
- must not split by lemon / hawthorn / passionfruit

### `taste_bitter_overload`

- accepted as proposal wording over `taste_bitterness_overload`
- `bitternessLoad` can remain future metric direction
- customer preference / tolerance matters

### `taste_astringency_overload`

- chosen over `taste_astringent_overload`
- taste / special sensation boundary needs future review
- must not merge into bitterness or generic strong stimulation

### `texture_low_drinkability`

- reuse existing observed direction
- still needs boundary against straw resistance and solid overload
- must not split by taro / Oreo / powder source

### `texture_solid_overload`

- reuse existing observed direction
- current scaffold status remains `reviewed_candidate_not_approved`
- must not split by pearl / taro ball / pudding / coconut jelly / grass jelly

## 8. Forbidden Row-Shape Shortcuts

明确禁止：

- 只写 `proposedDraftId` + `displayNameDraft` 就进入 registry。
- 从 report 路径或 conceptRef 自动生成 row ID。
- 用 prefix 自动推断 `sourceLayer`。
- 用 displayName / 中文名作为 row 主键。
- 缺少 `legacyObservedIds` / `antiIfNotes` / `notThis` / gate fields。
- 省略 `canEnter` false gates。
- 直接把 existing observed ID 写成 approved stable。
- 让 validator 读取本 report 作为 allowed values。

## 9. Recommended Next Options

以下只是候选方向，不是命令，也不开放 implementation。

### Option A｜User + ChatGPT Review This Row Shape

审阅字段是否足够、是否太重、是否缺关键 gate。

### Option B｜Registry Candidate Proposal Round 1

在 row shape 通过后，为 6 个 `proposedDraftId` 填 registry candidate proposal rows。

仍不进入 approved stable / validator / runtime。

### Option C｜Candidate Severity Rule Schema Review

先设计 severity table 如何承接这 6 个概念。

不填正式阈值或 `scoreMultiplier`。

### Recommendation

先由用户 + ChatGPT 审阅 row shape。

不建议直接创建 registry file / schema / validator。

## 10. Explicit Non-Goals

本轮不做：

- 不创建真实 registry row。
- 不创建 registry / enum / schema / validator。
- 不生成 allowed values。
- 不生成 stable ID。
- 不批准 draft ID。
- 不创建 registry candidate。
- 不生成 accidentTypeId 正式清单。
- 不生成 triggerMetric 正式名。
- 不填正式阈值 / 正式 `scoreMultiplier`。
- 不改 runtime / core / data / generated / golden。
- 不开放 implementation / batch content / generated severity / takeover。
