# v0.0.7.x Known Stable ID Source-of-Truth Design

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
- known `outcomeTypeId`：来自 reviewed outcome registry。`taste_conflict` 可作为 stable candidate；`novelty_experiment` 仍需 review。
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

## 6. 对 v0.0.7.30 inventory 的承接

来自 `docs/V0_0_7_ID_INVENTORY.md` 的当前结论应这样进入 source-of-truth 设计：

- `aroma_pressure` / `identity_conflict` / `low_beverage_fit` / `savory_identity` / `texture_sediment` / `novelty` 当前不能自动当 runtime `feedbackTag`。它们属于 candidate / risk tag 或 generated sample tag，需要 feedbackTag registry / mapping review。
- `bubble_conflict` 是 stable `feedbackTag`，但语义偏气泡 + 厚重 / 口感冲突追评，不能泛化到 flavor identity conflict。
- `dairy_fat_overload` 当前 keep，但需要 notes 固定其在 candidate severity sample 中的 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad` 语义。
- `flavor_durian_overload`、`texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload`、`industrial_creamer_overload`、`taste_strong_flavor_overload` 等 legacy / ingredient-specific ID 需要 migration candidate 或 mechanism review，不应现在重命名。
- candidate severity draft ruleIds 不能进入 stable registry。
- golden sampleId 只属于测试身份，不能进入机制规则主键。
- `validate candidate severity sheet` 与 `severity generated data build` 仍被 source-of-truth / validator gate 阻塞。

## 7. 推荐阶段路线

本设计完成后，下一步可考虑：

1. `v0.0.7.32｜stable ID source collector / registry design proof`
   - 只读收集 existing runtime / generated / golden / content sheet ID。
   - 输出 report，不自动升级 ID。
2. `v0.0.7.32｜candidate severity sheet validator 设计细化`
   - 在 source-of-truth 方案明确后细化 validator 行为。
   - 先设计 error / warning / needs review 分类。
3. `v0.0.7.32｜feedbackTag registry / candidate tag mapping design`
   - 拆清 runtime feedbackTag、generated reviewed tag、candidate / risk tag。
   - 特别处理 `aroma_pressure`、`bubble_conflict`、`novelty` 等语义边界。

以上只是可考虑路线，不表示已经决定，也不在本轮推进 v0.0.7.32。

## 8. 本轮不做的事

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
