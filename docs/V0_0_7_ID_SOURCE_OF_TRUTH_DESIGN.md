# v0.0.7.x Known Stable ID Source-of-Truth Design

> Stage-bound document / 阶段限定文档
>
> 本文件是 v0.0.7.x 阶段专属材料，用于记录该阶段的 TODO、inventory、design draft、gate、audit debt 或迁移证据。
>
> 它不是长期正本，不替代 `docs/DOCS_SOURCE_OF_TRUTH.md`、`docs/TASTE_DECISION_MODEL.md`、`docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。
>
> v0.0.7.x 结束后，本文件必须移出 `AGENTS.md` / `docs/AI_CONTEXT.md` 的长期必读列表，只能作为 historical / stage support 按需读取。
>
> 未完成且仍有效的债务应迁移到下一阶段 TODO；长期有效原则应沉淀进 L1 正本。
>
> 虽然文件名包含 SOURCE_OF_TRUTH，但本文只是 v0.0.7.x 阶段内的 source-of-truth / registry / schema 设计草案或支撑材料，不是长期 source-of-truth。长期 ID / tag / registry / validator 正本仍以 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 为准。
>
> 如果本文与 L1 正本冲突，以 L1 正本为准。

## 0. 文档定位

本文档是 v0.0.7.x known stable ID source-of-truth / registry / enum / schema 的设计方案。

它用于回答：

- future validator 应该从哪里获取合法 ID 集合？
- 哪些 ID 可以来自 existing stable runtime data？
- 哪些 ID 只能来自 draft / sample / generated / docs，暂时不能进入 allowed values？
- 哪些 ID 需要人工机制确认后才能注册？
- 哪些 ID 需要先保留 notes / migration plan，而不是重命名？

本文档不是正式 registry 文件，不是 enum 文件，不是 schema 文件，也不是 validator。它不新增 registry / enum / schema，不实现 validator，不新增 generated data，不改变 runtime，不改变 golden expected。

本轮不得新增任何 stable ID，不得批量生成 ID，不得把 `docs/V0_0_7_ID_INVENTORY.md` 中的 draft / candidate / sample-only ID 注册为 stable ID；只设计 source-of-truth 规则和未来文件形态。

本设计承接：

- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/V0_0_7_ID_INVENTORY.md`

## v0.0.7.51 source-of-truth / registry / schema design update

### 1. Document positioning

本节是 source-of-truth / registry / schema 的设计更新，不是 registry 本体，不是 schema 文件，不是 enum，不是 validator，不是 generated data，也不是 runtime 接管方案。

本节只回答 future validator 和 future registry 应该信谁、如何分层、如何处理 observed / historical / draft / generated / review pack evidence。它不批准任何 ID，不创建任何 allowed values，不把任何当前 observed value 提升为 approved stable ID。

### 2. Source layers

| source layer | can prove | cannot prove | future use |
|---|---|---|---|
| approved stable source | 某个 ID 已经过明确 review / registry / schema 承认 | 不能从普通 docs prose 自动推导 | future validator 的主要读取来源 |
| runtime observed source | 当前 runtime 里出现过某个 ID | 不等于 approved registry ID；不等于命名合理 | registry design 的 evidence / drift check 输入 |
| golden expected evidence | 某个行为被测试保护 | 不等于 registry source；不批准新 ID | 证明行为影响面，辅助 review |
| generated data observation | generated 文件里出现过某个值 | 不等于 approved；不能反向污染 registry | 检查 build 输出是否符合 reviewed source |
| sample sheet draft | 人类编辑源草案 / disabled draft row | 不等于 stable ID；`enabled=FALSE` 也不能乱填 stable 字段 | validator warning / review evidence |
| review pack item | 给制作人 / ChatGPT 审查的问题项 | 不等于 approved decision | 进入 review decision / follow-up plan |
| candidate / risk tag | summary / candidate / rule 侧风险语义 | 不等于 runtime feedbackTag / outcomeTypeId | 需要 mapping review |
| historical legacy reference | 已迁出或旧版本语义记录 | 不等于 current allowed value | docs / reports 可保留，validator 不应当 current ID |
| collector observed row | collector 看到的 evidence row | collector output 不是 registry、不是 validator input、不是 allowed values | drift check / source review 起点 |

核心原则：

- observed ≠ approved。
- runtime observed ≠ approved registry ID。
- golden expected ≠ registry source。
- generated data observed ≠ approved ID。
- sample sheet draft ≠ stable ID。
- review pack item ≠ approved ID。
- collector output ≠ registry。
- historical legacy reference ≠ current allowed value。

Collector 只能作为 observed source / drift check，不能直接作为 allowed values 生成器。

### 3. ID family source-of-truth matrix

| ID family | possible approved source | observed-but-not-approved source | historical / draft / generated caveat | future validator should read from | explicit not allowed sources |
|---|---|---|---|---|---|
| `ingredientId` | reviewed ingredient registry / `ingredientMeta` 整理层 | runtime ingredient data | displayName / zhCN 不是 ID | explicit ingredient registry / generated schema | docs prose、中文名、recipe note |
| `accidentTypeId` | reviewed accident registry / structure rule registry | runtime rules、golden evidence、collector rows | historical migrated IDs 只能作历史；draft rows 不注册 | explicit accident registry / schema | substring、suffix、sampleId、historical texture old IDs |
| `outcomeTypeId` | reviewed outcome registry | runtime mapping、golden、generated feedback observations | legacy `taste_conflict` 只作 pre-v0.0.7.41 history | explicit outcome registry / schema | candidate tag、feedbackTag、字符串相似性 |
| `drinkTypeId` | reviewed drink type registry | drink type rules、golden、generated feedback observations | 玩家自定义名不进入 | explicit drink type registry / schema | displayName、recipe name、feedback copy |
| `feedbackTag` | reviewed feedbackTag registry / mapping | runtime pool、generated feedback、sample sheets | candidate / risk tag 不能自动注册 | reviewed feedbackTag source-of-truth | summary candidate tag、rule tag、generated-only tag |
| `textId` | feedback content source / generated schema | sample content sheet、generated feedback data | textId 只标识文案，不代表机制 | feedback content validator | accidentTypeId / ruleId / candidateId 字段 |
| `sampleId` | golden / review pack test registry | golden samples / reports | 只用于测试定位 | test-only schema if needed | mechanism key、rule key、accidentTypeId |
| `ruleId` | future severity / threshold rule registry | candidate severity sample draft | `*_draft` 保持草案 | severity sheet registry / validator schema | accidentTypeId、sampleId、displayName |
| `candidateId` | summary candidate schema / candidate registry | `summaryCandidateEngine` observed candidates | candidate 不是最终 result ID | candidate schema / generated candidate validator | final accident / outcome / drinkType source |
| `priorityBand` | candidate priority enum / alias map | priority shell observations | 不等于 severity | priorityBand enum / schema | final score / scoreMultiplier |
| `severityHint` | candidate hint enum | summary candidate observations | 不是 final severity | severityHint enum | scoreMultiplier / severityLevel |
| `severityLevel` | future severity schema | docs / sample drafts | 当前不应强填真实 severity | future severity enum / schema | accidentTypeId 后缀、candidate hint |
| `sourceLayer` | explicit enum (`taste` / `texture` / `flavor`) | summary / candidate source fields | 不能从 ID 前缀反推 | sourceLayer enum | `taste_` / `texture_` / `dairy_` 字符串猜测 |
| `sourceSummary` | summary output schema | summary engines / sample drafts | 必须引用真实结构字段 | summary schema | notes、displayName、中文说明 |
| `triggerMetric` | per-summary metric schema | summary candidate metrics / sample drafts | 不能来自文案片段 | metric schema keyed by sourceSummary | ingredient name、sampleId、notes |

### 4. AccidentTypeId source-of-truth design

Future accidentTypeId registry 需要区分以下状态，不能混在一个“出现过就是 stable”的列表里：

| state | example | registry implication |
|---|---|---|
| active runtime observed current ID | `taste_acid_overload`, `texture_low_drinkability`, `texture_solid_overload` | 可作为 registry candidate，但仍需 reviewed source notes |
| structure rule observed ID | `texture_low_drinkability`, `texture_solid_overload` | 可作为 reviewed structure accident candidate，需记录 append / suppression 边界 |
| accident rule observed ID | `taste_acid_overload`, `flavor_durian_overload` | 需要区分 generic rule 与 special mechanism candidate |
| runtime_review_candidate | `flavor_durian_overload`, `dairy_fat_overload`, `industrial_creamer_overload`, `taste_strong_flavor_overload`, `texture_straw_resistance` | 不是 definite migration target，也不是 final registry entry；进入 registry / severity / validator 前必须有 sourceLayer / triggerMetric / producer / mechanism review |
| historical migrated ID | `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload` | 只能作为 historical / pre-version legacy reference；不是 current active runtime ID，不是 current registry ID，不是 generated severity input，不是 validator allowed current ID，不是 runtime takeover source |
| generated / sample / golden observation | generated feedback accidentTypeId、candidate severity sample、golden expected | evidence only；不能自动批准 |

已迁出的 texture old IDs 必须固定为：

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

它们不能因为出现在旧 docs、reports 或 collector reminder 里，被 future AI / Codex / validator 当成 current stable accidentTypeId。

runtime_review_candidate 也不是迁移承诺。以下 ID 仍需机制审查，不应统一叫 migration target：

```text
flavor_durian_overload
dairy_fat_overload
industrial_creamer_overload
taste_strong_flavor_overload
texture_straw_resistance
```

这些 ID 未来可能保留 legacy ID、加 source notes、进入 severity table、staged migration，或作为 special mechanism candidate 继续保留。进入 registry / severity / validator 前必须经过 sourceLayer / triggerMetric / producer / mechanism review。

### 5. FeedbackTag source-of-truth design

Future feedbackTag source-of-truth 必须继承 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 的分层：

- runtime feedbackTag：当前文案池观察值，只说明 runtime 里存在，不等于 future reviewed feedbackTag。
- generated feedbackTag：content pipeline / shadow 观察值，不自动 active。
- candidate / risk tag：summary / candidate / rule-side risk，不自动进入玩家文案选择。
- sample draft tag：草案字段，不进入 registry / generated data / runtime。
- future reviewed feedbackTag：必须经过 source-of-truth、制作人 review、文案池检查、generated / shadow 检查和 golden 记录。

以下 tag 不能自动成为 runtime feedbackTag / registry feedbackTag：

```text
aroma_pressure
identity_conflict
low_beverage_fit
savory_identity
texture_sediment
novelty
```

继续保留关键边界：

- `identity_conflict` ≠ `flavor_identity_conflict`。
- `flavor_identity_conflict` 是当前 outcomeTypeId，不是 feedbackTag。
- `bubble_conflict` 不能泛化成 generic flavor identity conflict。
- `aroma_pressure` 不是已注册 runtime 文案池 feedbackTag。
- candidate / risk tag 不能自动进入 feedbackTag registry。
- feedbackTag 被 severity / threshold 表引用前，必须有 reviewed feedbackTag source-of-truth。

### 6. Future registry file shape, design only

以下只是未来文件形态建议，本轮不创建：

| future artifact | responsibility | non-goal |
|---|---|---|
| `data/idRegistry.js` | reviewed stable ID registry 整理层；可记录 family、status、sourceLayer、review notes、deprecated / historical links | 不收录 draft / sample-only / generated-only ID |
| `data/schema/stableIds.schema.json` | validator-only schema / enum source | 不进入 runtime；不从字符串模式生成 |
| `data/generated/stableIds.generated.json` | optional reviewed registry build output | 不由 collector 或 sample sheet 直接生成 |
| `scripts/content/checkStableIdRegistry.js` | registry consistency / drift check | 不自动批准或删除 ID |
| `scripts/content/collectStableIdSources.js` | observed source collector / drift evidence | 不是 registry，不是 validator input，不是 allowed values generator |

推荐未来 registry row 形态可以包含：

```text
id
family
status: approved_current / historical / deprecated / review_candidate / draft
sourceLayer
sourceSummary
triggerMetric
approvedBy
approvedAtVersion
historicalSince
replaces
replacedBy
notes
```

### 7. Future validator read order

Future validator 应按以下顺序读取：

1. explicit registry / schema。
2. reviewed source-of-truth docs / generated registry。
3. collector output 只用于 drift check / warnings。
4. never from raw string pattern / suffix / substring。

错误方向：

```js
if (accidentTypeId.includes("_high")) error;
if (accidentTypeId.includes("_lemon")) error;
const knownAccidentTypeIds = inferFromStringPatterns();
const allowedValues = collectAllObservedIds();
```

正确方向：

```text
knownAccidentTypeIds must come from an explicit registry / enum / schema / existing reviewed stable data source.
if accidentTypeId not in knownAccidentTypeIds -> error.
if no known stable ID source exists -> stop and design the registry / enum / schema first.
collector output -> drift warning only.
```

### 8. What this design does NOT do

本节不做：

- 不创建 registry。
- 不创建 schema。
- 不创建 enum / allowed values。
- 不实现 validator。
- 不生成 stable ID registry。
- 不生成 generated severity data。
- 不改 runtime。
- 不改 data。
- 不改 golden expected。
- 不改 content sheets。
- 不批准任何 ID。
- 不让 generated severity / shadow / partial / active takeover 生效。

## 1. 核心原则

- known stable ID 的合法性来源必须明确；不能从 substring / suffix / string pattern 猜出来。
- docs prose 不是 validator 的 allowed values 来源；docs 只能说明设计和 gate。
- 人类编辑源 CSV / Google Sheets 不是 runtime source-of-truth；它们必须先经过 validator / build / generated data。
- AI / Codex 可以草拟 ID，但不能自动把 draft ID 升级为 stable ID。
- inventory 中出现过的 ID 不等于已经批准注册；draft / candidate-only / sample-only ID 必须继续保持其原状态，直到单独的用户 / ChatGPT 机制确认任务完成。
- validator 可以做字符串 lint / warning，但不能把字符串模式当成最终合法性来源。
- disabled draft row 仍需基础结构校验；`enabled=FALSE` 不等于可以跳过 ID 层级审查。
- 如果某类 ID 没有 known stable source，应该停止并先设计 registry / enum / schema，而不是写猜测式 validator。

## 2. Source-of-truth 分层设计

| ID layer | recommended source | current possible source files | validator-ready | registry candidate | draft / sample-only boundary | review needed | unknown value handling |
|---|---|---|---|---|---|---|---|
| `ingredientId` | existing `ingredientMeta` / future explicit ingredient registry | `data/ingredients.js` | Mostly yes | Yes | Not draft if present in ingredientMeta | Low | Error in enabled rules; warning in disabled drafts if clearly future |
| `accidentTypeId` | explicit accident registry assembled from reviewed runtime rules and golden-backed IDs | `data/accidentRules.js`, `data/structureAccidentRules.js`, `core/accidentAnalyzer.js`, `data/goldenSamples.js`, `docs/V0_0_7_ID_INVENTORY.md` | Not yet | Yes | candidate severity draft rows may reference only reviewed IDs | High for legacy / ingredient-specific IDs | Error for enabled rows; warning / needs review for disabled drafts |
| `outcomeTypeId` | explicit outcome registry | `data/goldenSamples.js`, generated feedback, `core/summaryCandidateEngine.js` | Not yet | Yes | candidate-only outcomes such as `novelty_experiment` must not auto-register | Medium | Error if enabled and unknown; needs review if candidate-only |
| `drinkTypeId` | explicit drink type registry sourced from drink type rules | `data/drinkTypeRules.js`, `core/drinkTypeAnalyzer.js`, `data/goldenSamples.js`, generated feedback | Not yet | Yes | runtime-only analyzer special cases need source notes | Medium | Error if enabled and unknown; warning if runtime-only source lacks registry |
| `feedbackTag` | feedbackTag registry / mapping of runtime pool + generated reviewed tags | `data/feedbackTexts.js`, generated feedback, feedback sample sheets | Not yet | Yes | candidate / risk tags are not feedbackTags until registered | High for semantic drift | Error for enabled stable field; warning / needs review for draft candidate |
| `textId` | content sheet / generated feedback text identity | `content_sheets/examples/feedback_texts.sample.*`, `data/generated/feedbackTexts.generated.*` | For feedback only | Yes, within feedback data schema | Does not represent mechanism | Low | Error for duplicate / malformed in feedback sheet |
| `sampleId` | golden / review pack test identity | `data/goldenSamples.js`, reports | Yes for tests, not mechanism | No, unless test registry | Never enters mechanism rule key | Low | Error if used as mechanism ID |
| `ruleId` | severity / threshold sheet registry after sheet validator exists | candidate severity sample sheet | No | Future yes | `*_draft` remains sample-only | Medium | Allow draft only when disabled and marked; error for enabled unknown stable registry |
| `candidateId` | summary candidate schema / future candidate registry | `core/summaryCandidateEngine.js`, golden expected | Partly | Yes | Candidate-only, not final result ID | Medium | Error if unknown in generated candidate data; warning in docs-only draft |
| `priorityBand` | candidate priority shell enum / registry | `core/candidatePriorityShellEngine.js`, `core/summaryCandidateEngine.js`, golden expected | Partly | Yes | Alias values need explicit mapping | Medium | Error for enabled generated severity rows unless in enum / alias map |
| `severityHint` | candidate hint enum | `core/summaryCandidateEngine.js`, candidate severity sample | Partly | Yes | Hint only, not final severity | Low | Error if outside enum in enabled rows |
| `severityLevel` | future severity enum / schema | docs only; candidate severity sample currently empty | No | Future yes | Empty allowed in disabled draft rows | High before active scoring | Error when enabled row requires severity but missing / unknown |
| `sourceLayer` | stable conceptual enum | summary engines, `core/summaryCandidateEngine.js`, candidate severity sample | Mostly yes | Yes | Must not be inferred from ID prefix | Low | Error if not in enum |
| `sourceSummary` | summary output schema / candidate schema | summary engines, `core/summaryCandidateEngine.js`, candidate severity sample | Partly | Yes | Must reference real structured source | Medium | Error if unknown in enabled rows |
| `triggerMetric` | per-sourceSummary metric schema | `core/summaryCandidateEngine.js`, summary outputs, candidate severity sample | Not yet | Yes | Must not come from displayName / notes | Medium | Error if sourceSummary is stable and metric unknown; warning if draft-only |
| profile / structure / candidate tags | separate tag registries by layer | `core/drinkStructureAnalyzer.js`, `data/structureAccidentRules.js`, `core/summaryCandidateEngine.js` | Not yet | Yes, separated by namespace | Not interchangeable with feedbackTag | High for tag mixing | Error when consumed as wrong layer; warning in inventory / draft |

## 3. Recommended architecture options

### Option A｜从 existing runtime data / rules 现场收集 allowed values

做法：validator 运行时直接扫描 `data/ingredients.js`、`data/accidentRules.js`、`data/drinkTypeRules.js`、`data/feedbackTexts.js`、`core/summaryCandidateEngine.js` 等文件，临时收集 allowed values。

优点：

- 初期实现快。
- 能贴近当前 runtime 实际状态。
- 不需要先维护新文件。

风险：

- runtime 文件里混有 legacy、display fallback、candidate-only、draft-like 和 generated shadow 语义。
- 收集逻辑容易变成“谁出现过就算 stable”，把 candidate tag、runtime-only legacy ID、disabled sample 或 docs ID 误收进 allowed values。
- validator 可能被迫理解 runtime 结构，边界变重。

结论：不推荐作为长期方案。可以作为只读 collector / proof 使用，但 collector 输出不能直接等于 allowed values。

### Option B｜新建 explicit registry / enum / schema 文件

做法：新建显式 `idRegistry` / `schema` / enum 文件，所有 validator 只读取这些文件。

优点：

- source-of-truth 清晰。
- validator 简单，不需要解析 runtime。
- 能明确 stable / draft / deprecated / migration candidate 状态。

风险：

- 初次建立成本较高。
- 容易和 runtime 已有事实漂移，需要同步检查。
- 如果没有 collector / diff check，registry 可能变成另一个手工维护孤岛。

结论：适合成为最终整理层，但不应脱离 runtime existing data 单独手写。

### Option C｜混合方案：runtime stable data 作为原始来源，显式 registry / schema 作为 validator 的整理层

做法：先用只读 collector 盘点 existing stable runtime data / rules / generated reviewed data，再由人工 review 形成显式 registry / schema。validator 不直接从 runtime 现场猜 allowed values，而是读取经 review 的 registry / schema；collector 只用于 diff / drift check。

优点：

- 既尊重当前仓库真实引用，又避免 validator 直接猜字符串。
- 可以把 stable、likely stable、candidate-only、draft、migration candidate 分开。
- 能支持后续 drift check：runtime 出现新 ID，但 registry 没登记时提醒人工确认。
- 更贴合 `docs/V0_0_7_ID_INVENTORY.md` 和 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 的边界。

风险：

- 需要先设计 collector 和 registry shape。
- 需要建立人工 review 流程，不能完全自动化。

推荐：采用 Option C。它是当前仓库最稳妥路线：runtime stable data 提供事实来源，显式 registry / schema 提供 validator allowed values，collector 负责发现漂移但不直接定稿。

明确不推荐：

- validator 从字符串 pattern 推断合法 ID。
- validator 从 docs prose 解析 ID。
- runtime 直接读取 CSV / Google Sheets / 人类编辑源。

## 4. Future file shape proposal

本节只提出未来文件形态，不在本轮创建。

| future file | role | runtime readable | includes draft / sample-only IDs | notes |
|---|---|---|---|---|
| `data/idRegistry.js` | reviewed stable ID registry 整理层 | Maybe, if intentionally loaded | No | 可包含 accident / outcome / drinkType / feedbackTag / priorityBand / sourceSummary 等 allowed values 和 status metadata |
| `data/schema/stableIds.schema.json` | validator-only schema / enum source | No by default | No | 更适合 content pipeline validator；不要让 runtime 直接依赖人类编辑流程 |
| `scripts/content/collectStableIds.js` | read-only collector / drift check proof | No | It may observe them, but must mark status | 只能收集和报告，不能把观察到的 ID 自动升级为 stable |
| `scripts/content/checkStableIdRegistry.js` | registry consistency check | No | No | 对比 registry 与 runtime / generated / golden，引导人工 review |
| `data/generated/stableIds.generated.json` | optional build output | No by default | No | 只有在 registry / schema 已稳定后才考虑；不应由 sample sheet 直接生成 |

职责边界：

- Runtime data：只应包含玩家运行时需要的稳定数据，不应读取 CSV / Google Sheets。
- Validator-only：可以读取 registry / schema / generated proof，但不应进入玩家 runtime。
- Generated / build output：必须来自 validated source，不能手改。
- Draft / sample-only ID：只能出现在样例表、inventory、review docs 中，不应进入 stable registry allowed values。

## 5. Validator gate design

### candidate severity sheet validator 读取什么

- known `ingredientId`：来自 reviewed ingredient registry，初期可由 `data/ingredients.js` 的 `ingredientMeta` 生成 registry candidate。
- known `accidentTypeId`：来自 reviewed accident registry。初期候选可来自 `data/accidentRules.js`、`data/structureAccidentRules.js`、`core/accidentAnalyzer.js`、golden expected 和 inventory，但必须人工 review 后进入 allowed values。
- known `outcomeTypeId`：来自 reviewed outcome registry。v0.0.7.41 后当前 flavor identity conflict outcome 应以 `flavor_identity_conflict` 为准；legacy `taste_conflict` 只保留为迁移前历史 ID，不应作为当前 allowed value 来源。`identity_conflict` 是 candidate / risk tag，不属于 outcomeTypeId source；`bubble_conflict` 是窄语义 feedbackTag，也不属于 outcomeTypeId source。`novelty_experiment` 仍需 review。
- known `drinkTypeId`：来自 reviewed drink type registry。初期候选可来自 `data/drinkTypeRules.js`、`core/drinkTypeAnalyzer.js`、golden 和 generated feedback。
- known `feedbackTag`：来自 feedbackTag registry / mapping。runtime pool、generated reviewed tags、candidate-only tags 必须分层，不可混用。
- known `sourceLayer`：来自 enum，例如 `taste` / `texture` / `flavor`。
- known `sourceSummary`：来自 summary output schema，例如 `tasteSummary` / `textureSummary` / `flavorSummary` / `summaryCandidates`。
- known `triggerMetric`：来自 per-sourceSummary metric schema，不应只从 candidate severity sample 反推。
- known `priorityBand`：来自 candidate priority shell enum + explicit alias map。
- known `severityHint`：来自 hint enum。
- known `severityLevel`：来自 future severity schema；当前不应强行填入真实 severity。

### unknown value 如何处理

| Situation | Future validator action |
|---|---|
| enabled row 引用 unknown stable ID | Error |
| disabled draft row 引用 unknown ID，但 notes 明确 draft / future candidate | Warning / needs review |
| `feedbackTag` 是 candidate / risk tag，例如 `aroma_pressure` | Error if stable field enabled; warning in disabled draft |
| `bubble_conflict` 用于 generic flavor identity conflict | Warning / needs review even if tag exists |
| `sampleId` 出现在 mechanism key 字段 | Error |
| `accidentTypeId` 带 severity / sample 语义 | Error if not in registry; string lint can add warning |
| `sourceLayer` 与 `sourceSummary` 不匹配 | Error |
| `triggerMetric` 不属于对应 `sourceSummary` | Error / needs schema update |

### enabled=FALSE 是否仍需基础校验

需要。disabled draft rows 不进入 runtime，但仍会被 future Codex 和 validator 读取。它们至少应检查：

- 表头完整。
- `ruleId` 唯一。
- `candidateType` 合法。
- `enabled` 合法。
- stable fields 不应填入明显错误层级。
- draft / future ID 必须有 notes 说明。
- 不能用 `sampleId`、displayName、`zhCN` 或中文文案当机制主键。

### validator 不能做什么

- 不能通过 `includes("_high")`、`endsWith("_lemon")`、`includes("durian")` 判断合法性。
- 不能写 `inferFromStringPatterns()` 生成 known ID 集合。
- 不能从 docs prose 抽 ID 当 allowed values。
- 不能为某个 golden sample、中文文案、单个原料或单条 draft row 写例外。
- 不能因为字符串相似或含义相近，把 `flavor_identity_conflict`、`identity_conflict`、`bubble_conflict` 和 legacy `taste_conflict` 推断成同一层 ID：当前 `flavor_identity_conflict` 是 outcomeTypeId；`identity_conflict` 是 candidate / risk tag；`bubble_conflict` 是窄语义 feedbackTag；`taste_conflict` 是 legacy / pre-v0.0.7.41 historical outcomeTypeId。

## 6. 对 v0.0.7.30 inventory 的承接

来自 `docs/V0_0_7_ID_INVENTORY.md` 的当前结论应这样进入 source-of-truth 设计：

- `aroma_pressure` / `identity_conflict` / `low_beverage_fit` / `savory_identity` / `texture_sediment` / `novelty` 当前不能自动当 runtime `feedbackTag`。它们属于 candidate / risk tag 或 generated sample tag，需要 feedbackTag registry / mapping review。
- `bubble_conflict` 当前可观察为 runtime `feedbackTag`，但尚未完成 future reviewed / stable 语义审计；它语义偏气泡 + 厚重 / 口感冲突追评，不能泛化到 flavor identity conflict。后续若被 severity / threshold / generated partial takeover 引用，必须先经过 feedbackTag mapping review / producer review。
- `dairy_fat_overload` 当前 keep，但需要 notes 固定其在 candidate severity sample 中的 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad` 语义。
- `flavor_durian_overload`、`industrial_creamer_overload`、`taste_strong_flavor_overload` 等 current runtime / legacy ID 需要 mechanism review，不应现在重命名。
- `texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload` 已迁出，只能作为 historical / pre-version legacy reference；它们不应再进入 current registry、validator、generated severity input 或 runtime takeover decision。
- candidate severity draft ruleIds 不能进入 stable registry。
- golden sampleId 只属于测试身份，不能进入机制规则主键。
- `validate candidate severity sheet` 与 `severity generated data build` 仍被 source-of-truth / validator gate 阻塞。

## 7. 推荐阶段路线

本设计完成后，下一步可考虑：

1. 先冻结本 source-of-truth / registry / schema design docs。
2. 后续可考虑把 collector observed evidence、legacy inventory、feedbackTag mapping design 和 review pack decision split 汇总成 reviewed registry shape proposal。
3. 在 registry / schema shape 经过用户 / ChatGPT 复查前，不实现 validator，不生成 allowed values，不 build generated severity。
4. source-of-truth 设计通过后，再细化 candidate severity sheet validator 的 error / warning / needs review 分类。
5. validator design 通过复查后，才考虑实现 validate candidate severity sheet 和 generated severity validator / structure check。
6. 最后再考虑 generated severity data build、shadow、partial takeover。

以上只是可考虑路线，不表示已经决定，也不在本轮推进 validator / registry / generated severity。

## 8. v0.0.7.32 collector proof

v0.0.7.32 新增 `scripts/content/collectStableIdSources.js` 和 `reports/stableIdSourceCollector.sample.md`，作为 stable ID source collector / registry design proof。

collector 定位：

- 只读扫描 current runtime data、generated feedback JSON、golden samples、summary candidate、priority shell 和当前 content sheet sample / draft。
- 输出 observed source / layer / usage / suggested status / review hint。
- 可用于 future registry design 的证据收集和 drift check。
- 不从 docs prose 抽 ID 当事实来源。

collector 输出边界：

- 不是 registry。
- 不是 allowed values。
- 不是 validator source-of-truth。
- 不是 generated data。
- 观察到某个 ID / tag 不代表它已经定稿、注册或可直接进入 validator。
- draft / candidate / sample-only / generated-only 只能保持其原状态，不能因 collector 观察到而升级。

后续如果继续推进，应先进行人工 review / registry design / validator design，再决定哪些 observed values 可以进入明确 source-of-truth。collector 只能提示 drift，例如 runtime 出现新 observed ID 或 future registry 中的 ID 无引用；它不做裁决，也不自动同步。

## 9. v0.0.7.33 feedbackTag mapping design

v0.0.7.33 新增 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`，用于拆清 feedbackTag registry / candidate tag mapping 边界。

该设计承接本文件的 source-of-truth 原则：

- `feedbackTag` 的 future source-of-truth 不能只来自 collector observed values。
- 同一个 tag 字符串出现在 runtime pool、generated sample、summary candidate、rule 或 disabled draft row 中，不代表它们是同一层系统身份。
- candidate / risk tag 不能自动成为 runtime feedbackTag。
- rule tag 不能自动成为 feedbackTag。
- sample draft tag 不能进入 registry、generated data 或 runtime。
- generated feedbackTag 不能自动 active 接管 runtime。
- old runtime feedbackTag 进入新 severity / threshold / generated partial 路线前，仍需要语义 notes / mapping review / 制作人审核。

特别保留以下边界：

- `aroma_pressure` 当前不是 runtime 文案池 feedbackTag；如需未来使用，必须先走 feedbackTag source-of-truth / mapping review。
- `bubble_conflict` 当前可观察为 runtime feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评，不应泛化到 generic flavor identity conflict。
- `acid_accident`、`greasy_overload`、`straw_disaster` 等 same-string cross-layer tag 必须逐层确认，不能靠字符串相同合并。

该设计不是 registry，不是 schema，不是 enum，不是 validator，也不是 generated data。本轮不提升任何 tag 状态，也不把 P1-5 / P1-7 写成已解决。

## 10. v0.0.7.42 post-migration outcome / tag boundary notes

v0.0.7.41 已完成 legacy `taste_conflict` -> current `flavor_identity_conflict` one-shot migration；本节只补 source-of-truth 边界，不创建实际 registry / enum / schema。

- future known outcomeTypeId source 应记录当前值 `flavor_identity_conflict`，而不是 legacy `taste_conflict`。
- `taste_conflict` 可以保留为 legacy / pre-v0.0.7.41 historical note，但不应作为 current outcome source。
- `flavor_identity_conflict` 表达 outcome 层的风味身份不协调；推荐解释链路是 `sourceLayer=flavor`、`sourceSummary=flavorSummary`、`triggerMetric=identityConflictRisk`。
- `identity_conflict` 只是 related candidate / risk tag，不是 outcomeTypeId，也不是 runtime feedbackTag。
- `bubble_conflict` 是 runtime observed feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评，不属于 outcomeTypeId source。
- future validator / registry / generated data / runtime 不能用字符串相似性推断这些 ID / tag 的层级关系。

## 11. 本轮不做的事

- 不新增实际 registry / enum / schema 文件。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime。
- 不改 data。
- 不改 golden expected。
- 不改 content_sheets。
- 不重命名任何 ID。
- 不把 P1 / P2 写成已解决事实。
- 不把 `docs/V0_0_7_ID_INVENTORY.md` 的 recommendation 写成 done。
- 不让 `aroma_pressure` 等 candidate tag 进入 stable `feedbackTag`。
- 不让 `bubble_conflict` 泛化到 flavor identity conflict。
