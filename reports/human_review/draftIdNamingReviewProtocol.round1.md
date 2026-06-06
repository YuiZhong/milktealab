# Draft ID Naming Review Protocol Round 1｜草案 ID 命名审查流程

## 0. 文件定位

本文件是 v0.0.8.x planning-only 阶段的 draft ID naming review protocol / 草案 ID 命名审查流程报告。

本文件只设计未来 draft ID 命名审查流程。

本文件不是：

- draft ID list
- stable ID list
- registry candidate
- registry
- schema
- validator input
- allowed values
- runtime data
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不生成任何 draft ID、stable ID、registry candidate 或 allowed values。

本文件不批准任何 ID。

本文件主要复用 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 等既有长期 guardrail，不重新发明 v0.0.7.x 已经确认的规则。

后续如果要为第一批 6 个概念拟 draft ID，必须另开任务并由用户明确批准。

本文件不替代 `docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_DECISION_MODEL.md`、`reports/human_review/sourceOfTruthRegistryPlanning.round1.md` 或任何 L1 正本。

## 1. 已有 v0.0.7.x 工作复用摘要

v0.0.7.x 已经建立 stable ID / naming guardrail。

已有规则包括但不限于：

- AI / Codex 生成 ID 不因“看起来像 stable ID”就自动正确。
- approved concept list 不等于 approved stable ID。
- draft ID 不等于 registry entry。
- registry candidate 不等于 approved source-of-truth。
- 不按原料拆机制。
- 不按 severity 拆 accidentTypeId。
- 不把 displayName / zhCN / sampleId / conceptRef / planningRef 当系统 ID。
- validator 不能靠字符串 pattern / displayName / reports / conceptRef 猜 allowed values。

本轮不复制 L1 长规则，只记录 v0.0.8 draft ID proposal 前的操作流程。

## 2. 只读 Legacy / Observed ID 搜索摘要

本轮只读搜索覆盖 `core/**`、`data/**`、`scripts/**`、`docs/**`、`reports/**`。

代表性发现：

- `taste_acid_overload`
  - 语境：runtime observed、golden expected、summary candidate、sample sheet draft、minimal registry scaffold sample、reports evidence。
  - 当前边界：已多处出现，但不因出现频率自动成为本轮 approved stable ID。
- `texture_low_drinkability`
  - 语境：runtime observed、golden expected、summary candidate、migration reports、likely-stable notes、human-review evidence。
  - 当前边界：重要 legacy / observed ID，但本轮不迁移、不批准、不重命名。
- `texture_solid_overload`
  - 语境：runtime observed、golden expected、summary candidate、minimal registry scaffold sample、migration reports。
  - 当前边界：已有 reviewed-candidate / scaffold 语境，但不自动进入 validator allowed values。
- `flavor_identity_conflict`
  - 语境：current outcomeTypeId / legacy migration result / feedbackTag boundary reports。
  - 当前边界：它是 outcome 语境的重要 observed value，不是 feedbackTag，也不是本轮 accidentTypeId proposal。
- `dairy_fat_overload`
  - 语境：runtime observed / golden expected / legacy review candidate。
  - 当前边界：命名可能误导 sourceLayer，未来若处理必须先 review，不可直接推广。
- `stableIdRegistry`
  - 语境：minimal scaffold sample，当前只包含少量 reviewed-candidate-not-approved 条目和 read-only check。
  - 当前边界：不是 approved source-of-truth，不是 active validator。
- `reviewed_candidate_not_approved`
  - 语境：minimal registry scaffold 的明确状态。
  - 当前边界：明示“已复查候选但未批准”，不能被 validator 当 approved stable。

搜索结论：

- 本轮不批准这些 ID。
- 本轮不迁移这些 ID。
- 本轮不删除这些 ID。
- 本轮不把旧 ID 自动当成未来正确 stable ID。
- 本轮不为第一批 6 个概念拟新 ID。

## 3. Draft ID 命名默认倾向

用户确认的命名倾向：

draft accidentTypeId / mechanism ID 的第一个 segment，默认优先表达主导判定层 / sourceLayer。

常见前缀倾向：

- `taste_`
- `texture_`
- `flavor_`
- `structure_`
- `sensation_`

这些只是 naming tendency，不是本轮 ID proposal。

prefix 不是 sourceLayer 的唯一真相。

真实来源必须由 `sourceLayer` / `sourceSummary` / `triggerMetric` / `evidence` 等结构字段说明。

跨层机制不能为了迎合 prefix 被强行塞进错误层。

如果未来 ID 前缀和结构字段冲突，应以结构字段 / 正本判断为准，并触发 review。

不得仅根据 ID 前缀推断合法性或 validator allowed values。

## 4. 禁止命名模式

以下都是 forbidden examples / anti-examples，不是 approved ID。

禁止按具体原料拆机制：

- `lemon_acid_accident`
- `hawthorn_acid_overload`
- `ginger_spice_accident`
- `cinnamon_spice_accident`
- `pearl_overload_accident`

禁止按 severity 拆机制：

- `sweet_light`
- `sweet_heavy`
- `texture_cement_medium`
- `flavor_xxx_severe`

禁止把 sampleId / conceptRef / planningRef 当 ID：

- `AC_TASTE_R1_02`
- `STRUCT_R1_01`
- `C002`

禁止把 displayName / 中文文案音译成 ID。

禁止把 feedbackTag / riskTag / evidenceTag 当 accidentTypeId。

禁止为了某个 golden sample 或 review pack item 新建专属机制 ID。

## 5. Draft ID 审查问题清单

未来每个 draft ID proposal 必须回答：

1. 它对应哪个 approved concept？
2. source review file 是哪个？
3. sourceReviewItems / conceptRef 是哪些？
4. 主导 sourceLayer 是什么？
5. 是否跨层？如果跨层，为什么仍选这个 prefix？
6. 是否按原料拆了机制？
7. 是否按 severity 拆了机制？
8. 是否混入 displayName / 玩家可见文案？
9. 是否混入 sampleId / conceptRef / planningRef？
10. 是否与 existing / legacy / observed ID 冲突？
11. 如果沿用 legacy ID，是否语义仍准确？
12. 如果不用 legacy ID，是否说明原因？
13. 是否有 anti-if notes？
14. 是否有 notThis？
15. 是否仍保持 no runtime effect？

## 6. Legacy ID 处理原则

legacy / observed ID 是 evidence，不是自动 source-of-truth。

如果 existing ID 语义准确，可考虑 future candidate，但必须 review。

如果 existing ID 语义误导，比如 sourceLayer 与名称不一致，必须标风险。

如果 existing ID 是 historical / replaced / scaffold / reviewed_candidate_not_approved，不能自动晋级。

不能为了“名字统一”盲目重命名 runtime ID；迁移必须另开任务。

不能因为旧 ID 存在就阻止更好的 future naming，但必须记录映射 / migration risk。

## 7. Draft ID Proposal 的未来输出格式草案

以下只规划 future proposal format，不填任何真实行。

future proposal row 可以包含：

- `proposedDraftId`
- `idFamily`
- `candidateType`
- `displayNameDraft`
- `sourceConceptRef`
- `sourceReviewFile`
- `sourceReviewItems`
- `dominantSourceLayer`
- `sourceLayerEvidence`
- `isCrossLayer`
- `legacyObservedIds`
- `namingRationale`
- `antiIfNotes`
- `severityBoundaryNotes`
- `notThis`
- `reviewStatus`
- `canEnterRegistryCandidate: false`
- `canEnterValidator: false`
- `canAffectRuntime: false`

这些是 future proposal format。

本轮不创建表格，不创建 CSV，不创建 JSON，不创建 registry row。

这些字段名也不是最终 schema。

## 8. Relation To First 6 Structuring Candidates

第一批 6 个概念：

1. 甜度过载
2. 酸度过载
3. 苦味过载
4. 涩感 / 收敛感过强
5. 水泥感 / 粉泥感 / 低流动性
6. 八宝粥感 / 固体小料负载过高

它们当前共同状态：

- ready_for_future_draft_id_proposal_protocol
- not_named_this_round
- no_registry_candidate
- no_validator_allowed_values
- no_runtime_effect

本文件不提出任何实际 draft ID。

## 9. Long-Term Candidates / Not Yet Promoted

本轮流程中有些原则可能长期有效，例如：

- prefix 只作命名倾向。
- legacy ID 必须 review。
- draft ID proposal 必须回答审查问题。

但本文件仍是 v0.0.8 planning report，不自动升级为 L1 正本。

已经存在于 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 等 L1 正本的规则，本文件只引用 / 应用，不复制成长规则。

尚未验证稳定的流程细节，例如 future proposal row 字段、报告格式、round 命名方式，不应现在沉淀为长期正本。

后续若要长期化，必须另开 docs alignment 任务，并遵守 `docs/DOCS_SOURCE_OF_TRUTH.md` 的更新归属和反 doc 地狱原则。

## 10. Recommended Next Options

以下只是候选方向，不是命令，也不开放 implementation。

### Option A｜Draft ID Proposal Dry-Run For The First 6 Concepts

下一轮可在严格 protocol 下提出 draft ID proposal。

仍不进入 registry candidate / validator / runtime。

### Option B｜Registry Candidate Row Shape Planning

继续先规划 registry candidate 行结构。

不提出 ID。

### Option C｜Candidate Severity Rule Schema Review

讨论未来 severity table 如何承接第一批概念。

不填正式数值。

### Recommendation

先由用户 + ChatGPT 审阅本 protocol。

不建议本轮或自动下一步直接生成 stable ID。
