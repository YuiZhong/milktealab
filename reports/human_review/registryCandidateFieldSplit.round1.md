# Registry Candidate Field Split Round 1｜Registry Candidate 字段轻重分层

## 0. 文件定位

本文件只把 future registry candidate row fields 拆成 required / required-if-applicable / optional / machine-derived / report-only。

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

本文件不创建真实 registry row。

本文件不创建 registry / schema / enum / validator。

本文件不批准任何 stable ID。

本文件不生成 allowed values。

本文件不允许任何 `proposedDraftId` 进入 runtime / generated / golden。

后续若要创建真正 registry candidate storage / schema，必须另开任务并由用户明确批准。

## 1. 为什么需要这一步

`reports/human_review/registryCandidateProposal.round1.md` 证明字段足够安全，但也明显偏重。

如果未来每个 row 都要求人工完整填写，会变成填表地狱。

本轮目标是在不牺牲安全 gate 的前提下，把字段拆成不同责任层：

- 用户 / 制作人负责制作人判断和自然语言反馈。
- ChatGPT / Codex 负责结构化、追溯和边界说明。
- future scripts / validator 负责重复项、文件存在、命名风险和 gate 状态检查。

用户不是程序员，不应手填机器字段，也不需要理解全部英文 key。

英文机器字段名可以保留给 Codex / future tooling，但人类入口必须中文友好。

中文解释只是帮助制作人阅读，不是系统主键。

## 2. 字段速读 / 中文解释

以下是常见英文 key 的人话解释。后续 review pack、CSV / Google Sheets 或 schema planning 不应只给英文 key。

| field key | 中文速读 | 制作人是否需要手填 |
|---|---|---|
| `proposedDraftId` | 草案 ID 提案名，还不是正式 ID。 | 通常不手填，只确认顺不顺眼。 |
| `idFamily` | 这个 ID 属于哪一类，例如 `accidentTypeId`。 | 不手填。 |
| `candidateType` | 候选类型，例如事故 / 反馈 / 规则等。 | 不手填。 |
| `displayNameDraft` | 给人看的中文显示名草案，不是系统主键。 | 可以审。 |
| `proposalStatus` | 当前提案状态，例如待审、只做 proposal。 | 不手填。 |
| `sourceApprovedConceptRef` | 来源概念引用，用来追溯它从哪个已审核概念来。 | 不手填。 |
| `sourceReviewFile` | 来源审核文件。 | 不手填。 |
| `sourceReviewItems` | 来源审核条目，例如 C002。 | 不手填。 |
| `dominantSourceLayer` | 主要判定层，例如 taste / texture / flavor。 | 可以审是否错层。 |
| `isCrossLayer` | 是否跨层。 | 可以审是否感觉跨层。 |
| `crossLayerNotes` | 跨层说明。 | 可以看摘要。 |
| `mechanismDefinition` | 机制定义，用人话解释这个事故是什么。 | 重点审。 |
| `notThis` | 明确“它不是什么”，防止误判边界。 | 重点审。 |
| `antiIfNotes` | 防止写成 if 地狱的提醒。 | 可以审是否太具体。 |
| `legacyObservedIds` | 历史上或旧系统里出现过的相关 ID。 | 不手填。 |
| `legacyClassification` | 这些旧 ID 当前应该怎么理解。 | 不手填。 |
| `reuseRationale` | 为什么沿用或不沿用旧 ID。 | 通常不手填。 |
| `migrationRisk` | 迁移或沿用旧 ID 的风险。 | 可以看摘要。 |
| `possibleMetricDirections` | 未来可能使用的数值方向词，不是正式 triggerMetric。 | 不手填正式值。 |
| `severityBoundaryNotes` | 轻中重分级边界说明。 | 可以审。 |
| `scoreMultiplierStatus` | 分数倍率是否已定义；当前通常未定义。 | 不手填。 |
| `thresholdStatus` | 阈值是否已定义；当前通常未定义。 | 不手填。 |
| `customerPreferenceNotes` | 未来顾客偏好 / tolerance 相关备注。 | 可以审方向。 |
| `feedbackTagStatus` | 反馈标签是否已注册；当前多数未注册。 | 不手填。 |
| `feedbackCopyBoundary` | 文案不能反向创造机制 ID 的边界。 | 可以看摘要。 |
| `reviewStatus` | 审核状态。 | 不手填。 |
| `producerDecision` | 制作人判断。 | 重点审 / 可填写。 |
| `chatgptTechnicalDecision` | ChatGPT 技术判断。 | 不手填。 |
| `canEnterValidator` | 是否能进入 validator；当前必须为 false。 | 不手填。 |
| `canAffectRuntime` | 是否能影响游戏运行结果；当前必须为 false。 | 不手填。 |
| `canChangeGoldenExpected` | 是否能修改 golden expected；当前必须为 false。 | 不手填。 |
| `nextRequiredGate` | 下一步需要过什么审核门。 | 可以看。 |

## 3. 字段分层原则

### 3.1 Required Core Fields｜必填安全骨架

未来每条 registry candidate proposal 必须有以下字段，否则不能进入 proposal review：

- `proposedDraftId`：草案 ID 提案名，还不是正式 ID。
- `idFamily`：ID 家族，例如 `accidentTypeId`。
- `candidateType`：候选类型。
- `displayNameDraft`：中文显示名草案，不是主键。
- `proposalStatus`：提案状态。
- `sourceApprovedConceptRef`：来源 approved concept 引用。
- `sourceReviewFile`：来源审核文件。
- `sourceReviewItems`：来源审核条目。
- `dominantSourceLayer`：主要判定层。
- `mechanismDefinition`：机制定义。
- `notThis`：它不是什么。
- `antiIfNotes`：防 if 地狱提醒。
- `legacyObservedIds`：旧系统 / 历史里相关 ID。
- `legacyClassification`：旧 ID 当前分类。
- `reviewStatus`：审核状态。
- `canEnterApprovedStableRegistry`：是否能进入 approved stable registry；当前必须 false。
- `canEnterValidator`：是否能进入 validator；当前必须 false。
- `canEnterGeneratedSeverity`：是否能进入 generated severity；当前必须 false。
- `canAffectRuntime`：是否能影响 runtime；当前必须 false。
- `canChangeGoldenExpected`：是否能改 golden expected；当前必须 false。
- `nextRequiredGate`：下一步审核门。

说明：

- 这些是安全骨架。
- 所有 dangerous gates 默认必须为 false。
- 如果缺少 source / notThis / antiIf / legacy / false gates，不应进入 registry candidate proposal。
- 即使字段必填，也不代表制作人都要手填；很多字段应由 Codex / ChatGPT / future script 预填。

### 3.2 Required If Applicable｜有条件必填

以下字段只有在相关情况出现时才必填：

- `isCrossLayer`：跨层时必须写。
- `crossLayerNotes`：跨层说明。
- `migrationRisk`：有 legacy / 迁移风险时必须写。
- `deprecatedOrSupersededIds`：有旧 ID 被废弃 / 替代时必须写。
- `blockedLegacyIds`：有明确禁止回流的旧 ID 时必须写。
- `customerPreferenceNotes`：涉及顾客偏好时必须写。
- `feedbackTagStatus`：涉及反馈标签时必须写。
- `feedbackCopyBoundary`：涉及文案边界时必须写。

说明：

- 只有跨层、涉及 legacy 迁移、顾客偏好、feedback 边界等情况才必填。
- 不应要求每一行都写长篇内容。
- 如果不适用，应允许写 `not_applicable` / `none`。

### 3.3 Optional / Review Notes｜可选审查备注

以下字段有助于审查，但不应让制作人手填全部：

- `sourceEvidenceSummary`：来源证据摘要。
- `sourceLayerEvidence`：为什么属于这个判定层。
- `reuseRationale`：为什么复用旧 ID 或不用旧 ID。
- `severityBoundaryNotes`：轻中重边界。
- `scoreMultiplierStatus`：分数倍率状态。
- `thresholdStatus`：阈值状态。
- `producerDecision`：制作人判断。
- `chatgptTechnicalDecision`：ChatGPT 技术判断。

说明：

- 初期可由 Codex 根据 source reports 草拟。
- ChatGPT / 用户可以抽查和修正。
- 这些字段不能替代 required false gates。

### 3.4 Machine-Derived / Script-Checkable Fields｜机器可生成 / 可检查字段

未来可由脚本或工具自动生成 / 校验：

- `candidateRowId`：行编号。
- source file existence check：来源文件是否存在。
- duplicate `proposedDraftId` check：草案 ID 是否重复。
- forbidden pattern lint：是否命中禁止命名模式。
- whether gates are false：危险 gate 是否全部 false。
- whether required fields exist：必填字段是否齐全。
- whether `proposedDraftId` appears in legacy observed search：是否在旧系统中出现过。
- whether `displayNameDraft` is accidentally used as key：中文显示名是否被误当主键。

说明：

- 这些不应由用户人工填写。
- future validator / lint 可以先做 warning / planning check。
- 在 approved registry / enum / schema 未创建前，这些检查仍不是 active validator allowed values。

### 3.5 Report-Only / Not Formal Schema｜只留在报告，不进正式 schema

这些内容可以留在 review report，不必进入未来正式 registry candidate table：

- long narrative `chatgptTechnicalDecision`：长篇 ChatGPT 技术判断。
- detailed prose `sourceEvidenceSummary`：很长的来源说明。
- long historical explanation：很长的历史解释。
- report section titles：报告章节标题。
- round number：round 编号。
- `RCP-R1-xx` report row refs：本轮报告行编号。
- full open questions：完整开放问题。

说明：

- 这些用于 review pack / report 可读性。
- 不应长期作为 registry schema 的必填字段。
- 可以在 formal registry candidate storage 中压缩成 notes / reviewRefs。

## 4. 制作人需要看的字段

未来如果用户 / 制作人要审，不需要看全部字段。

用户主要看：

- 这个机制名字顺不顺眼？
- 机制定义是不是对？
- `notThis` 有没有错？
- 是否误伤现实中成立的饮品？
- 是否需要顾客偏好？
- 有没有分类错层？
- 有没有明显 if 地狱风险？

用户不需要手填：

- `canEnterValidator`
- `sourceReviewFile`
- `legacyClassification`
- `migrationRisk`
- `thresholdStatus`
- `scoreMultiplierStatus`
- row ID / schema 字段
- 任何机器检查字段

用户不需要理解全部英文 key。

用户主要看中文解释、机制定义、`notThis`、是否误伤现实饮品、是否分类错层。

英文 key 是给机器 / Codex / future validator 用的。

人类审核材料必须中文友好。

## 5. 推荐的未来最小 Row 形态

以下是更轻量的 future minimal row proposal。

它不是最终 schema，不创建文件，也不填真实 row。

### 5.1 Human-Readable Required Block｜人类可读必填区

- `proposedDraftId`：草案 ID 提案名。
- `displayNameDraft`：中文显示名草案。
- `mechanismDefinition`：机制定义。
- `sourceLayer`：主要判定层。
- `notThis`：它不是什么。
- `producerNotes` / `reviewNotes`：制作人 / 审查备注。

用途：

- 让用户 / 制作人用人话判断这条机制是否成立。
- 避免把表格变成只有英文 key 的机器材料。

### 5.2 Machine Safety Required Block｜机器安全必填区

- `idFamily`：ID 家族。
- `candidateType`：候选类型。
- source refs：来源引用。
- `legacyObservedIds`：旧 ID。
- `legacyClassification`：旧 ID 分类。
- `antiIfNotes`：防 if 地狱。
- all dangerous gates false：所有危险 gate 为 false。
- `reviewStatus`：审核状态。
- `nextRequiredGate`：下一步审核门。

用途：

- 让 Codex / future scripts 能检查来源、复用、命名和 gate。
- 防止 proposal 被误当成 approved stable / validator / runtime data。

### 5.3 Optional Appendix｜可选附录

- `possibleMetricDirections`：可能数值方向。
- `severityBoundaryNotes`：分级边界。
- `customerPreferenceNotes`：顾客偏好备注。
- `feedbackCopyBoundary`：反馈文案边界。
- `migrationRisk`：迁移风险。
- long `sourceEvidenceSummary`：长来源说明。

用途：

- 保留审查上下文。
- 不让每条 row 都必须填成一篇长报告。

这个形态更适合未来 Google Sheets / CSV / review pack。

它不代表最终 schema。

## 6. 对第一批 6 个 Rows 的影响

`reports/human_review/registryCandidateProposal.round1.md` 的 6 行可以作为 full safety report 保留。

后续如果做 actual registry candidate storage，不应照搬 full report 的所有 prose 字段。

未来应先决定 minimal required fields，再考虑 CSV / JSON / registry storage。

第一批 6 个 `proposedDraftId` 仍未 approved stable。

第一批 6 个 `proposedDraftId` 仍不进入 validator / runtime。

## 7. 下一步建议

以下只是候选，不是命令，也不开放 implementation。

### Option A｜User + ChatGPT Review Field Split

审阅 required / optional / later 分层是否合理。

### Option B｜Minimal Registry Candidate Storage Shape

在 field split 通过后，设计未来最小 CSV / JSON / JS registry candidate storage shape。

仍不填真实 registry rows。

### Option C｜Candidate Severity Rule Schema Review

先讨论 severity table 如何承接这 6 个概念。

不填正式数值。

### Recommendation

建议先由用户 + ChatGPT 审阅 field split。

不建议直接创建 registry file / schema / validator。

不建议让用户手填完整机器字段。

## 8. Explicit Non-Goals

本轮不做：

- 不生成 stable ID。
- 不批准 registry candidate。
- 不创建 actual registry candidate source-of-truth。
- 不创建 registry file。
- 不创建 schema file。
- 不实现 validator。
- 不生成 allowed values。
- 不生成 triggerMetric 正式名。
- 不填正式阈值 / `scoreMultiplier`。
- 不改 `data/stableIdRegistry.js`。
- 不改 `scripts/content/checkStableIdRegistry.js`。
- 不改 runtime / core / data / generated / golden。
- 不开放 implementation / batch content / generated severity / takeover。
