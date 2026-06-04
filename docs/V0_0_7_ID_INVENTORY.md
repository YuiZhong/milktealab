# v0.0.7.x ID / Naming Inventory

## 0. 文档定位

本文档是 v0.0.7.x 的 ID / naming inventory 与 source map 审计报告，用于后续 known stable ID source of truth、registry / enum / schema、validator、generated severity data 和 partial / active takeover 前的审计材料。

它不是 registry，不是 enum，不是 validator，也不表示所有列出的 ID 都已经 stable。本文档只记录当前观察到的 ID / tag / rule / sample 来源、使用层级、风险和 gate，不做整改，不重命名任何 ID，不新增 source-of-truth 文件。

长期命名规则以 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 为准；v0.0.7.x 阶段 gate 和债务正本以 `docs/V0_0_7_MECHANISM_TODO.md` 为准。本文档是二者之间的 inventory 证据层。

## 1. Scope / 本轮范围

### 完整或定向阅读

- `AGENTS.md`
- `docs/AI_CONTEXT.md`
- `docs/VERSION_LOG.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/TASTE_ENGINE_ARCHITECTURE.md`
- `docs/TASTE_SYSTEM_DESIGN.md`
- `data/ingredients.js`
- `data/feedbackTexts.js`
- `data/goldenSamples.js`
- `data/generated/feedbackTexts.generated.json`
- `data/generated/feedbackTexts.generated.js`
- `content_sheets/examples/feedback_texts.sample.csv`
- `content_sheets/examples/feedback_texts.sample.json`
- `content_sheets/examples/candidate_severity_rules.sample.csv`
- `content_sheets/examples/candidate_severity_rules.sample.json`
- `core/summaryCandidateEngine.js`
- `core/candidatePriorityShellEngine.js`
- `core/accidentAnalyzer.js`
- `core/drinkStructureAnalyzer.js`
- `core/feedbackEngine.js`
- `data/accidentRules.js`
- `data/structureAccidentRules.js`
- `data/drinkTypeRules.js`
- `core/drinkTypeAnalyzer.js`

### 关键词 / 引用检索

使用 `accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`candidateId`、`sampleId`、`ruleId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer`、`sourceSummary` 和 `triggerMetric` 等关键词，对 `core`、`data`、`scripts`、`content_sheets`、`docs` 和 `reports` 做了定向检索。

本轮不是全仓库逐行审计，不覆盖所有 UI / storage / README / package 文件，也不判断每个历史 ID 是否应迁移；这些应进入后续正式 ID 审计任务。

## 2. Inventory table

| id | observed layer | source files | references / usage | current status | risk | recommendation | gate |
|---|---|---|---|---|---|---|---|
| `tea_*`, `dairy_*`, `liquid_*`, `fruit_*`, `flavor_*`, `sweetener_*`, `seasoning_*`, `topping_*` ingredient IDs | ingredientId | `data/ingredients.js`, runtime refs | runtime rules、drink type、summary / analyzer refs | likely stable | OK | keep; future registry can use existing ingredientMeta as source candidate | none |
| `taste_acid_overload` | accidentTypeId | `data/accidentRules.js`, `core/summaryCandidateEngine.js`, `data/goldenSamples.js`, `content_sheets/examples/candidate_severity_rules.sample.*`, generated feedback | runtime / golden / generated / sample sheet / docs | stable | OK | keep; acid ingredients are evidence, not separate accident types | none |
| `texture_straw_resistance` | accidentTypeId | `core/accidentAnalyzer.js`, `core/summaryCandidateEngine.js`, `data/goldenSamples.js`, generated feedback, candidate severity sample | runtime / golden / generated / sample sheet | stable | OK | keep | none |
| `dairy_fat_overload` | accidentTypeId | `core/accidentAnalyzer.js`, `data/goldenSamples.js`, generated feedback, candidate severity sample | runtime / golden / generated / sample sheet / docs | stable but naming can mislead | Needs note / Migration candidate | keep now; document that severity sample treats it through `sourceLayer=texture`, `sourceSummary=textureSummary`, `triggerMetric=fatLoad` | before severity partial takeover / final audit |
| `flavor_durian_overload` | accidentTypeId | `data/accidentRules.js`, `data/goldenSamples.js`, docs | runtime / golden / docs | stable but ingredient-specific | Needs review / Migration candidate | do not rename now; review whether this remains a dedicated flavor accident or needs future migration plan | before mechanism final audit |
| `industrial_creamer_overload` | accidentTypeId | `core/accidentAnalyzer.js`, docs | runtime legacy / docs | runtime-only legacy | Needs note / Migration candidate | keep now; include in accidentAnalyzer migration inventory | before accidentAnalyzer migration route |
| `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload` | accidentTypeId | `core/accidentAnalyzer.js`, docs | runtime legacy / docs | runtime-only legacy | Needs review / Migration candidate | do not rename now; inventory as content-specific legacy texture accidents | before mechanism final audit |
| `taste_strong_flavor_overload` | accidentTypeId | `core/accidentAnalyzer.js`, docs | runtime legacy / docs | runtime-only legacy | Needs review / Migration candidate | keep now; review whether it belongs to flavor identity / aroma / taste overload route | before accidentAnalyzer migration route |
| `texture_low_drinkability`, `texture_solid_overload` | accidentTypeId | `data/structureAccidentRules.js`, `core/summaryCandidateEngine.js`, docs | runtime structure rules / summary candidates / docs | likely stable but source-of-truth not formalized | Needs note | registry candidate; document relation to textureSummary values | before severity generated data |
| `taste_conflict` | outcomeTypeId | `data/goldenSamples.js`, generated feedback, `content_sheets/examples/candidate_severity_rules.sample.*`, docs | golden / generated / sample / docs | stable outcome | Needs note | keep; do not infer `sourceLayer=taste` from name | before outcome / severity validator |
| `novelty_experiment` | outcomeTypeId | `core/summaryCandidateEngine.js`, docs | readonly summary candidate / docs | candidate-only / needs source-of-truth | Needs review | do not treat as stable runtime outcome until registry / schema confirms | before generated severity data |
| `classic_milk_tea`, `fresh_fruit_tea`, `premium_thick_milk_tea` | drinkTypeId | `data/drinkTypeRules.js`, `data/goldenSamples.js`, generated feedback | runtime / golden / generated / docs | stable | OK | keep | none |
| `durian_milkshake`, `durian_milk`, `dessert_milkshake`, `sparkling_fruit_tea`, `brown_sugar_pearl_milk_tea`, `coffee_special`, `fruit_special`, `light_tea_drink`, `experimental_special` | drinkTypeId | `data/drinkTypeRules.js`, `core/drinkTypeAnalyzer.js` | runtime drink type rules | likely stable runtime | Needs note | registry candidate; source-of-truth should include drink type rules before validator consumes them | before drinkType validator / generated severity refs |
| `fruit_jasmine_tea`, `fruit_green_tea`, `fruit_oolong_tea`, `fruit_black_tea`, `flower_fruit_tea` | drinkTypeId | `core/drinkTypeAnalyzer.js` | runtime analyzer special path | runtime-only | Needs note | document source; consider moving to explicit rules / registry later | before drinkType source-of-truth design |
| `classic`, `premium`, `acid_accident`, `greasy_overload`, `straw_disaster`, `durian`, `normal_good`, `thick_followup`, `bubble_conflict`, `weird` | feedbackTag | `content_sheets/examples/feedback_texts.sample.*`, generated feedback | content sheet / generated data / review pack | generated shadow tag set; some overlap runtime feedbackTagPools | Needs note | keep generated-only until feedback partial takeover; `weird` is disabled sample content | before feedback partial takeover |
| `accident`, `acid_milk_conflict`, `dessert`, `fresh`, `straw_followup`, `sweet`, `thick_straw_followup` | feedbackTag | `data/feedbackTexts.js`, `data/goldenSamples.js` | runtime feedback pools / golden expected | stable runtime feedbackTag | OK / Needs note | keep; include in future feedbackTag registry | before generated feedback partial takeover |
| `bubble_conflict` | feedbackTag | `data/feedbackTexts.js`, generated feedback, `data/goldenSamples.js`, docs | runtime / generated / golden / docs | stable feedbackTag with narrow semantics | Needs note | keep; do not reuse for generic flavor identity conflict without producer / registry review | before severity feedbackTag references |
| `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, `novelty` | candidateTag / risk tag, not runtime feedbackTag | `core/summaryCandidateEngine.js`, docs | readonly summary candidates / docs | candidate-only / needs source-of-truth | Needs review | do not register yet; keep as candidate / risk semantics until feedbackTag registry confirms | blocks severity / feedback validator consumption |
| `sweet_overload`, `bitterness_overload`, `texture_heavy`, `low_drinkability` | candidate feedbackTags / risk tags | `core/summaryCandidateEngine.js`, `data/structureAccidentRules.js`, docs | summary candidates / structure rules / docs | candidate-only or rule tag, not confirmed runtime feedbackTag | Needs review | do not treat as runtime feedbackTag without registry / mapping | before generated severity data |
| `feedback_classic_001` ... `feedback_bubble_conflict_001`, `feedback_disabled_idea_001` | textId | feedback sample CSV / JSON, generated feedback JS / JSON, review pack | content sheet / generated data / reports | generated shadow text IDs | OK / Needs note | keep as text identity only; disabled text remains non-active sample | before feedback partial takeover |
| golden sample IDs such as `classic_milk_tea`, `extreme_lemon_accident`, `straw_resistance_accident`, `bubble_cream_conflict` | sampleId | `data/goldenSamples.js`, reports | golden / review pack / tests | sample-only | OK | keep; never use as accidentTypeId / ruleId | none |
| `taste_acid_overload_draft`, `texture_straw_resistance_draft`, `texture_dairy_fat_load_draft`, `flavor_aroma_pressure_feedback_draft`, `flavor_identity_conflict_outcome_draft` | ruleId / draftId | `content_sheets/examples/candidate_severity_rules.sample.*` | disabled sample sheet / docs | draft / sample-only | Needs review | keep disabled; do not treat as stable rule registry | before severity sheet build |
| `taste_*_candidate`, `texture_*_candidate`, `flavor_*_candidate` candidate IDs | candidateId | `core/summaryCandidateEngine.js`, golden structure expected | readonly summary candidate layer | runtime readonly candidate ID | Needs note | keep; document as candidate layer, not final result ID | before candidate / severity takeover |
| `hard_physical`, `texture_drinkability`, `taste_overload`, `flavor_identity`, `normal_conflict`, `positive_synergy`, `type_classification`, `feedback_hint` | priorityBand | `core/candidatePriorityShellEngine.js`, golden expected, candidate severity sample | priority shell / golden / sample | likely stable band set | Needs note | keep as priority grouping, not severity | before severity partial takeover |
| `texture_blocking`, `texture_load`, `flavor_fit`, `positive_combo` | priorityBand alias / candidate band | `core/summaryCandidateEngine.js`, `core/candidatePriorityShellEngine.js` | summary candidates normalized by priority shell | runtime readonly / alias | Needs note | document alias mapping before registry / validator | before severity validator |
| `low`, `medium`, `high` | severityHint | `core/summaryCandidateEngine.js`, candidate severity sample | readonly candidates / sample sheet | hint only | OK / Needs note | keep as hint; do not equate to final `severityLevel` | before severity engine |
| empty `severityLevel` in candidate severity sample | severityLevel | `content_sheets/examples/candidate_severity_rules.sample.*` | disabled sample sheet | unset / draft | OK | keep empty until real tuning task | before generated severity data |
| `taste`, `texture`, `flavor` | sourceLayer | summary engines, `core/summaryCandidateEngine.js`, candidate severity sample | summary / candidate / sample | stable conceptual layer | OK | keep; do not infer from ID prefix alone | none |
| `tasteSummary`, `textureSummary`, `flavorSummary`, `summaryCandidates` | sourceSummary | summary engines, `core/summaryCandidateEngine.js`, candidate severity sample | summary / candidate / sample | stable conceptual source | OK / Needs note | keep; candidate severity sample should reference actual source | before validator |
| `acidity`, `sweetness`, `bitterness`, `strawResistance`, `solidLoad`, `drinkability`, `fatLoad`, `sedimentRisk`, `aromaPressure`, `noveltyRisk`, `savoryRisk`, `beverageFit`, `identityConflictRisk` | triggerMetric | `core/summaryCandidateEngine.js`, candidate severity sample, docs | summary candidate metrics / sample sheet | needs source-of-truth | Needs note | registry / schema candidate; do not infer from display text | before severity validator |
| `high_solid_load`, `high_straw_resistance`, `low_drinkability`, `texture_forward`, `low_liquid_support`, `balanced_texture`, `liquid_supported` | profile / structure tag | `core/drinkStructureAnalyzer.js`, `data/structureAccidentRules.js`, docs | structure summary / rules | runtime tags, source-of-truth not formalized | Needs note / Migration candidate | keep; future registry should separate structure tags from feedbackTags | before structure active dependency |

## 3. Risk checks

### 是否按原料拆机制

发现既有 legacy / runtime ID 中存在明显原料或内容语义：

- `flavor_durian_overload`
- `texture_taro_overload`
- `texture_oreo_overload`
- `texture_topping_overload`
- `industrial_creamer_overload`

这些不是本轮新增，也不应现在顺手改名。它们已经进入 runtime / golden / docs 的不同层级，应作为 Needs review / Migration candidate 进入后续机制命名审计和 accidentAnalyzer 迁移路线。当前未发现 `taste_acid_overload_lemon` / `taste_acid_overload_hawthorn` 这类新拆分。

### 是否把 sampleId 混进机制主键

当前 golden sampleId 保持在 `data/goldenSamples.js` / review pack / 测试定位层。candidate severity sample 的 `ruleId` 已为 draft 规则身份，未直接使用 `extreme_lemon_accident` 等 sampleId 作为机制主键。

### 是否把 severity 后缀混进 accidentTypeId

当前 candidate severity sample 中 `severityLevel` 为空，`accidentTypeId` 未携带 `_high` / `_medium` / `_low` 后缀。`ruleId` 可以表达 draft / severity 语义，但它不是 accidentTypeId。

### 是否把 displayName / zhCN / 中文文案当主键

仍有 legacy / runtime 路径使用中文显示名辅助判断：

- `core/drinkStructureAnalyzer.js` 中存在中文显示名 Set。
- `core/drinkTypeAnalyzer.js` 中仍有部分 `name` / 中文茶名逻辑。
- `data/drinkTypeRules.js` 和 `data/accidentRules.js` 保留 `ingredient` / `type` / notes 等显示字段。

这些属于现有 legacy 兼容或显示辅助，不是本轮新增。它们应进入 P1 / P2 中已记录的迁移计划，不应在本轮整改。

### 是否旧 tag 语义误导新机制

`bubble_conflict` 是稳定 feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评，不适合作为 generic flavor identity conflict 的默认 tag。它需要 notes / registry 固定语义，避免 future Codex 因“已存在”而乱塞进新机制。

### 是否草案 ID 被误当正式 ID

`candidate_severity_rules.sample.csv/.json` 中所有样例行仍是 disabled draft，但这些 draft ID 已出现在 docs / sample sheet 中，未来 AI 可能误读为正式 ID。它们需要 validator 和长期 guardrail 保护，不能直接进入 generated severity data。

### 是否 ID 名称覆盖 sourceLayer / sourceSummary / triggerMetric

`dairy_fat_overload` 名称可能让人误以为它只属于 dairy / ingredient 层，但 candidate severity sample 已把相关行钉为 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad`。后续审计应以结构字段为准，ID 名称不能覆盖 source 解释。

### 是否 candidate / risk tag 被误当 runtime feedbackTag

`aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`sweet_overload`、`bitterness_overload`、`texture_heavy`、`low_drinkability` 出现在 summary candidate 或 structure rule 语义中，但当前不能自动等同 runtime feedbackTag。进入 validator / generated data 前需要 source-of-truth / registry / mapping。

### 是否 validator 未来可能被迫依赖 substring / suffix 猜合法性

当前仍没有 candidate severity sheet validator 和 stable ID registry / enum / schema。若直接实现 validator，会有退回 substring / suffix 猜合法性的风险。validate candidate severity sheet 实现前必须先明确 known stable ID source of truth。

### 是否 disabled / draft sample sheet 字段仍可能误导 future Codex

是。disabled / draft 只是“不接 runtime”，不等于字段可以随便填。candidate severity sample 需要保持 notes 去歧义，并在进入 build 前增加 validator。

## 4. 已知重点对象结论

| object | current reading | risk | next action |
|---|---|---|---|
| `dairy_fat_overload` | runtime / golden stable accidentTypeId；名称可能误导，但 sample 行按 texture / fatLoad 解释 | Needs note / Migration candidate | keep now; future audit 固定 source 语义 |
| `flavor_durian_overload` | runtime / golden stable but ingredient-specific accidentTypeId | Needs review / Migration candidate | 不改名；进入机制命名审计 |
| `texture_taro_overload` / `texture_oreo_overload` | accidentAnalyzer legacy texture accidents | Migration candidate | 不改名；进入 accidentAnalyzer 迁移路线 |
| `taste_acid_overload` | stable acid overload mechanism | OK | keep |
| `taste_conflict` | stable outcomeTypeId，不代表 `sourceLayer=taste` | Needs note | keep; source 由结构字段解释 |
| `bubble_conflict` | stable feedbackTag，语义偏气泡 + 厚重 / 口感冲突追评 | Needs note | 不泛化到 flavor identity conflict |
| `aroma_pressure` | summary candidate / risk tag，不是 runtime feedbackTag | Needs review | 不注册；如需 feedbackTag 需另行 registry review |
| `identity_conflict` | flavor identity candidate tag，不是 runtime feedbackTag | Needs review | 不注册；需 registry / shadow data 确认 |
| `low_beverage_fit` | flavor fit candidate tag，不是 runtime feedbackTag | Needs review | 不注册；需 registry / mapping |
| `savory_identity` | flavor candidate tag，不是 runtime feedbackTag | Needs review | 不注册；需 registry / mapping |
| `texture_sediment` | texture candidate tag，不是 runtime feedbackTag | Needs review | 不注册；需 registry / mapping |
| `novelty` | summary candidate feedbackTag / generated feedbackTag；含义横跨 candidate 和 generated sample | Needs review | 进入 feedbackTag registry 审计 |
| candidate severity draft ruleIds | disabled sample-only draft rules | Needs review | 不进入 generated data；先 validator |
| golden sampleIds | test identity only | OK | 不进入机制主键 |
| generated feedback textIds / feedbackTags | generated shadow content | Needs note | 不 active；先 review / partial gate |

## 5. Gate impact

| Gate | 当前状态 | 是否阻塞 |
|---|---|---|
| validate candidate severity sheet 实现前 | 尚未明确 known stable ID source of truth / registry / enum / schema | 阻塞 |
| severity generated data build 前 | 尚未实现 candidate severity sheet validator | 阻塞 |
| severity shadow 输出前 | 尚未有 generated severity validator / structure check | 阻塞 |
| severity partial takeover 前 | ID 命名审计、golden shadow expected、制作人 review 尚未完成 | 阻塞 |
| generated feedback partial takeover 前 | feedbackTag registry / 文案池扩充 / review pack 审核仍未完成 | 阻塞 |
| v0.0.7.x 机制 final 收口前 | accidentAnalyzer 迁移路线、drinkStructureAnalyzer 去中文 Set 计划、ID inventory 后续审计未完成 | 阻塞 |

## 6. 结论

- 本轮未发现需要立即停止当前 docs 工作的 P0 / High risk。
- 发现多个 Needs review / Migration candidate，主要集中在 legacy accidentTypeId、summary candidate tag 与 runtime feedbackTag 边界、drinkStructureAnalyzer 中文 Set 残留、以及 source-of-truth 缺失。
- `validate candidate severity sheet` 和 `severity generated data build` 当前仍被 known stable ID source-of-truth / validator gate 阻塞。
- 本轮没有修复这些问题，也没有新增 registry / validator / generated data。后续应按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 做正式 ID 审计和 source-of-truth 设计。
