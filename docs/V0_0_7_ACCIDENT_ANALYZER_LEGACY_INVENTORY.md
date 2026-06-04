# v0.0.7.x Accident Analyzer Legacy Inventory

## 0. 文档定位

本文是 `core/accidentAnalyzer.js` 及其直接事故规则链路的 legacy mapping / inventory 正本。

它用于记录当前事故判断链路里已经存在的 legacy 事故、规则来源、触发依据、最终影响、命名风险和未来迁移候选方向。它不是迁移方案的完成证明，也不替代 `docs/V0_0_7_MECHANISM_TODO.md`、`docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。

本轮只做只读整理：

- 不改 runtime。
- 不改事故判断。
- 不改 score、type、feedback、feedbackTags 或 `result.type`。
- 不重命名任何现有 ID。
- 不新增 registry / enum / schema。
- 不实现 validator。
- 不把 P1-4 标记为已解决。

## 0.1 v0.0.7.44 decision split 关系

v0.0.7.44 新增 `reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md`，用于把本 inventory 中的 legacy accident 分成可审查的迁移类别。

该 report 只做 docs / report / migration decision split：

- 不迁移 runtime。
- 不改变 score、accident、feedback、feedbackTags、drinkType、`result.type` 或 golden expected。
- 不新增 registry / enum / schema / validator。
- 不表示 P1-4 已解决。

v0.0.7.44 当时分流摘要；后续 actual migration 状态以 v0.0.7.46 / v0.0.7.47 / v0.0.7.49 关系段为准：

- `flavor_durian_overload` / `industrial_creamer_overload`：可作为特殊高记忆点机制候选，但仍需 source notes、制作人 review 和 future source-of-truth 设计。
- `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload`：当时被归类为需要泛化迁移的 legacy texture IDs，避免长期按原料拆 `accidentTypeId`；三者当前均已完成 staged migration，只能作为 historical / pre-version legacy reference。
- `dairy_fat_overload`：保留 legacy observed ID，但 source notes 应钉为 texture / mouthfeel / `fatLoad` / greasy pressure，不是 pure taste，也不是 straw / physical blockage。
- `taste_strong_flavor_overload`：需要 split review，不能只因 `taste_` 前缀就判为 taste layer，也不能直接映射到 `aroma_pressure` feedbackTag。
- `texture_straw_resistance` / `texture_low_drinkability` / `texture_solid_overload`：属于 texture / structure 方向，但仍要区分 legacy if threshold、summary candidate 和 data-driven structure rule 的边界。

## 0.2 v0.0.7.45 texture content target plan 关系

v0.0.7.45 新增 `reports/textureContentAccidentMigrationPlan.v0.0.7.45.md`，用于把三个 texture content-specific legacy accidents 拆成未来迁移目标计划。

该 report 只做 docs / report / impact audit：

- 不迁移 runtime。
- 不改变 score、accident、feedback、feedbackTags、drinkType、`result.type` 或 golden expected。
- 不新增 registry / enum / schema / validator。
- 不新增 `accidentTypeId`。
- 不表示 P1-4 已解决。

当时目标计划摘要，后续 v0.0.7.46 / v0.0.7.47 / v0.0.7.49 已按 staged order 执行：

- `texture_taro_overload`：已于 v0.0.7.46 迁向 `texture_low_drinkability`；芋泥个性保留在 evidence / notes / feedback copy。
- `texture_oreo_overload`：已于 v0.0.7.47 迁向 `texture_low_drinkability`；奥利奥粉渣 / 沉积 / 吸管困难保留在 evidence / notes / feedback copy。
- `texture_topping_overload`：已于 v0.0.7.49 迁向 `texture_solid_overload`；具体小料名保留在 evidence / notes / feedback copy。
- 不新增 `texture_paste_overload`、`texture_sediment_overload`、`texture_topping_specific_overload` 或任何按原料拆分的 texture accidentTypeId。

## 0.3 v0.0.7.46 taro actual migration 关系

v0.0.7.46 已完成 staged order 的第一步：`texture_taro_overload` -> `texture_low_drinkability` actual migration。

该迁移只处理 taro paste ratio > 50 分支：

- 当前 runtime 不再由 taro branch emit `texture_taro_overload`。
- taro branch 当前 emit `texture_low_drinkability`。
- 旧 `texture_taro_overload` 只作为 historical / pre-v0.0.7.46 legacy ID 保留在 docs / reports 中。
- 原触发条件、score、cap、type、add 和玩家可见 note 保持不变。
- 芋泥“糊 / 水泥感”个性保留在 evidence / notes / feedback copy，不写进 accidentTypeId。
- At the v0.0.7.46 slice, `texture_oreo_overload` 与 `texture_topping_overload` 仍是 current runtime legacy facts；v0.0.7.47 已更新 Oreo 状态，见下一节。
- P1-4 仍未完全解决。

## 0.4 v0.0.7.47 Oreo actual migration 关系

v0.0.7.47 已完成 staged order 的第二步：`texture_oreo_overload` -> `texture_low_drinkability` actual migration。

该迁移只处理 Oreo crumble ratio > 40 分支：

- 当前 runtime 不再由 Oreo branch emit `texture_oreo_overload`。
- Oreo branch 当前 emit `texture_low_drinkability`。
- 旧 `texture_oreo_overload` 只作为 historical / pre-v0.0.7.47 legacy ID 保留在 docs / reports 中。
- 原触发条件、score、cap、type、add 和玩家可见 note 保持不变。
- Oreo “粉渣 / 沉积 / 吸管开采 / 甜品矿层”个性保留在 evidence / notes / feedback copy，不写进 accidentTypeId。
- `texture_topping_overload` 仍是 current runtime legacy fact。
- P1-4 仍未完全解决。

## 0.5 v0.0.7.49 topping actual migration 关系

v0.0.7.49 已完成 staged order 的第三步：`texture_topping_overload` -> `texture_solid_overload` actual migration。

该迁移只处理 topping ratio > 45 loop：

- 当前 runtime 不再由 topping branch emit `texture_topping_overload`。
- topping branch 当前 emit `texture_solid_overload`。
- 旧 `texture_topping_overload` 只作为 historical / pre-v0.0.7.49 legacy ID 保留在 docs / reports 中。
- 原触发条件、score、cap、type、add 和玩家可见 note 保持不变。
- 珍珠 / 芋圆 / 布丁 / 仙草 / 椰果等具体小料名和“吸管体能测试”解释保留在 evidence / notes / feedback copy，不写进 accidentTypeId。
- 不新增 `texture_topping_specific_overload`、`texture_pearl_overload`、`texture_eight_treasure_overload` 或任何按小料拆分的 texture accidentTypeId。
- P1-4 仍未完全解决。

## 0.6 v0.0.7.50 collector historical wording cleanup 关系

v0.0.7.50 只清理 collector / source 文案入口，不做 source-of-truth design。

本轮确认：

- `texture_taro_overload` 只能作为 historical / pre-v0.0.7.46 legacy reference 出现。
- `texture_oreo_overload` 只能作为 historical / pre-v0.0.7.47 legacy reference 出现。
- `texture_topping_overload` 只能作为 historical / pre-v0.0.7.49 legacy reference 出现。
- 三者不是 current active runtime ID，不应进入 current registry、validator、generated severity input 或 runtime takeover decision。
- 本轮不创建 registry / enum / schema / validator，不生成 allowed values，不做 generated severity / shadow / partial / active takeover。
- P1-4 仍未完全解决。

## 1. Current Accident Flow Map

当前玩家最终事故仍由 legacy runtime 链路决定：

1. `core/tasteJudge.js` 建立 `context`，并生成 `tasteSummary` / `textureSummary` / `flavorSummary`。
2. `core/summaryCandidateEngine.js` 与 `core/candidatePriorityShellEngine.js` 生成只读候选信息；它们当前 `affectsFinalResult=false`，不接管最终事故、类型、分数或反馈。
3. `core/accidentAnalyzer.js` 调用 `data/accidentRules.js` 中的规则，并继续执行本文件内的 legacy if / ratio 判断。
4. `data/structureAccidentRules.js` 通过 `core/structureAccidentRuleEngine.js` 生成结构事故，但只有在当前事故列表里没有 texture accident 时才追加。
5. `core/tasteJudge.js` 对事故按 `cap` 从低到高排序，最低 cap 的事故成为 primary accident。
6. `tasteJudge` 根据事故修改最终 `score`、`type`、`forcedType`、`feedbackTags`、`accidentTypeId` 和玩家可见反馈选择条件。

因此，下表中的 legacy item 当前仍可能影响玩家最终结果。后续 severity / threshold 表格化、validator、generated data 或 partial takeover 任务，不应绕过这份 inventory 直接接管。

## 2. Legacy Accident Inventory

| legacy item | accidentTypeId / output | source file | trigger basis | uses specific ingredient? | uses displayName / zhCN? | sourceLayer candidate | possible triggerMetric | current final impact | risk | recommendation | gate |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `extremeLemonOver80` / `extremeLemonOver60` | `taste_acid_overload` | `data/accidentRules.js` | `fruit_lemon` ratio above 60 / 80 | yes, lemon | legacy `ingredient` text exists for readability, rule matching uses refs | `taste` | `acidity` / acid overload | yes: score cap, accident type, feedback tags | OK, but ingredient evidence must not split accidentTypeId | keep as generic acid overload; future severity rules may vary by evidence without changing accidentTypeId | before severity generated data |
| `extremeDurianAtLeast80` / `extremeDurianOver60` | `flavor_durian_overload` | `data/accidentRules.js` | `fruit_durian` ratio above 60 / 80 | yes, durian | legacy `ingredient` text exists for readability, rule matching uses refs | `flavor` | `aromaPressure` / identity pressure / novelty risk | yes: score cap, type, feedback tags | Needs review: ID is ingredient-specific and may look like a formal flavor mechanism | keep legacy ID for now; add naming note in future ID audit before generated severity use | before ID audit / severity partial takeover |
| dairy fat overload branch | `dairy_fat_overload` | `core/accidentAnalyzer.js` | dairy / high-fat dairy / cream / thick milk ratios | group and refs, not one sample | no for matching | `texture` / drinkability, with dairy evidence | `fatLoad` / heavy dairy load / drinkability pressure | yes: score cap, type `奶脂过载`, feedback tags | Needs note: ID starts with dairy, but current sample semantics can be texture / fatLoad direction | keep legacy; do not infer sourceLayer from ID prefix; future severity row should use explicit `sourceLayer` / `triggerMetric` | before severity validator and active takeover |
| industrial creamer overload branch | `industrial_creamer_overload` | `core/accidentAnalyzer.js` | plant creamer ratio and share of dairy total | yes, non-dairy creamer ref | no for matching | `flavor` / ingredient identity / quality | `industrialCreamerRatio` / identity mismatch | yes: score cap, type `工业奶茶`, feedback tags | Needs review: product/quality label is subjective and producer-facing | keep legacy; review output label and trigger meaning before data-driven takeover | before producer review / partial takeover |
| taro paste overload branch | current: `texture_low_drinkability`; historical pre-v0.0.7.46: `texture_taro_overload` | `core/accidentAnalyzer.js` | taro paste ratio above 50 | yes, taro paste | no for matching | `texture` | `pasteLoad` / `solidLoad` / `strawResistance` | yes: score cap, type `实验特调`, feedback tags | v0.0.7.46 migrated out of ingredient-specific accidentTypeId | keep current generalized accidentTypeId; keep taro personality in evidence / notes / feedback copy | monitor in staged accidentAnalyzer migration route |
| Oreo overload branch | current: `texture_low_drinkability`; historical pre-v0.0.7.47: `texture_oreo_overload` | `core/accidentAnalyzer.js` | Oreo crumble ratio above 40 | yes, Oreo crumble | no for matching | `texture` | `sedimentRisk` / `solidLoad` / `strawResistance` | yes: score cap, type `口感事故`, feedback tags | v0.0.7.47 migrated out of ingredient-specific accidentTypeId | keep current generalized accidentTypeId; keep Oreo personality in evidence / notes / feedback copy | monitor in staged accidentAnalyzer migration route |
| topping overload loop | current: `texture_solid_overload`; historical pre-v0.0.7.49: `texture_topping_overload` | `core/accidentAnalyzer.js` | one topping ratio above 45 | yes, multiple topping refs | yes, note interpolates Chinese topping name | `texture` / `structure` | `toppingLoad` / `solidLoad` / `strawResistance` | yes: score cap, type `实验特调`, feedback tags | v0.0.7.49 migrated out of ingredient-specific accidentTypeId; note/display text remains ingredient-specific | keep current generalized accidentTypeId; keep topping personality in evidence / notes / feedback copy | monitor in staged accidentAnalyzer migration route |
| strong flavor overload loop | `taste_strong_flavor_overload` | `core/accidentAnalyzer.js` | matcha / cocoa / coffee ratio above 60 | yes, multiple strong flavor refs | yes, note interpolates Chinese flavor name | `taste` / `flavor` mixed | `flavorIntensity` / `aromaPressure` / identity dominance | yes: score cap, type `实验特调`, feedback tags | Needs review: source layer and metric are ambiguous | keep legacy; do sourceLayer / triggerMetric review before table migration | before severity validator |
| straw resistance branch | `texture_straw_resistance` | `core/accidentAnalyzer.js` | straw-resistance group, clear liquid, heavy total ratios | group refs | no for matching | `texture` / `structure` | `strawResistance` / `solidLoad` / `drinkability` | yes: score cap, type `口感事故`, feedback tags | OK / Needs note: mature mechanism but still legacy if thresholds | keep as primary texture accident candidate; migrate only after shadow / golden review | before severity partial takeover |
| `semiSolidLowDrinkability` | `texture_low_drinkability` | `data/structureAccidentRules.js` | structure metrics: solid load, straw resistance, drinkability, base liquid ratio, tags | no direct ingredient | no | `texture` / `structure` | `drinkability` / `solidLoad` / `strawResistance` | yes, if no existing texture accident suppresses it | OK / Needs note: data-driven rule but currently suppressed by legacy texture accidents | keep; include in future known accidentTypeId source with explicit source fields | before generated severity validator |
| `highTextureLowLiquidSupport` | `texture_solid_overload` | `data/structureAccidentRules.js` | structure metrics: texture ratio, base liquid support, drinkability, tags | no direct ingredient | no | `texture` / `structure` | `textureRatio` / `liquidSupport` / `drinkability` | yes, if no existing texture accident suppresses it | OK / Needs note: data-driven rule but current append order matters | keep; document suppression behavior in future migration plan | before generated severity validator |
| legacy texture dedupe fallback | no new accident; suppresses structure accidents | `core/accidentAnalyzer.js` | checks accidentTypeId / tags, plus legacy `type` and `note` regex fallback | no | yes, fallback checks display type `口感事故` and note words like `吸管` / `半固体` | bridge / compatibility | texture accident classification | yes: can prevent structure accidents from being appended | High risk if expanded: display text fallback can become hidden mechanism logic | keep as compatibility only; do not add new display text patterns; remove only after structured tags cover legacy cases | before accidentAnalyzer migration cleanup |

## 3. Legacy ID / Mechanism Naming Risks

Current legacy IDs are real runtime facts, but not all of them are good future mechanism names.

Known risks:

- Some IDs are ingredient-specific, such as `flavor_durian_overload`; `texture_taro_overload` is now historical / pre-v0.0.7.46 after taro migration, `texture_oreo_overload` is now historical / pre-v0.0.7.47 after Oreo migration, and `texture_topping_overload` is now historical / pre-v0.0.7.49 after topping migration. Future mechanism tables should not multiply accidentTypeId by every ingredient.
- Some IDs mix source meanings. `dairy_fat_overload` can look like a dairy identity mechanism, but future severity examples may correctly treat it as `textureSummary.fatLoad` / drinkability pressure. ID names must not override `sourceLayer` / `sourceSummary` / `triggerMetric`.
- Some branches interpolate Chinese display names into notes. Notes are user-facing explanation, not mechanism keys.
- The legacy dedupe fallback still reads display type and note text to identify texture accidents. This is a compatibility fallback, not a pattern to expand.
- `summaryCandidateEngine` candidate tags and runtime feedbackTags are separate layers. A candidate tag should not be treated as a stable feedbackTag without registry / mapping review.

Do not rename existing runtime IDs during this inventory. Existing IDs may already be referenced by runtime, golden samples, generated reports, docs, or tests. Any rename requires a migration plan and user / ChatGPT review.

## 4. Migration Category Proposal

This section is a proposal for future planning only. It does not mark any item migrated.

| category | items | recommended handling |
|---|---|---|
| Keep legacy for now | all current final-impact accidentAnalyzer branches | Do not change runtime while severity / threshold source-of-truth is still being designed. |
| Special mechanism candidate | `flavor_durian_overload` | Keep current rule-table path; treat durian as a possible special high-memory mechanism candidate, not as a pattern for one accident type per ingredient. |
| Data-driven rule already exists | `taste_acid_overload`, `texture_low_drinkability`, `texture_solid_overload` | Keep current rule engines; audit naming and source fields before generated severity data. |
| Candidate severity table candidates | `taste_acid_overload`, `dairy_fat_overload`, `texture_straw_resistance`, structure texture accidents | Use explicit `sourceLayer`, `sourceSummary`, `triggerMetric`, and known stable ID source; do not infer by string prefix. |
| Needs producer / mechanism review | `industrial_creamer_overload`, `taste_strong_flavor_overload`, ingredient-specific texture overloads | Review subjective labels, player-facing type, and whether evidence belongs in notes rather than accidentTypeId. |
| Migration candidate, not immediate rename | `flavor_durian_overload`; historical `texture_taro_overload`, `texture_oreo_overload`, and `texture_topping_overload` | Keep current active runtime IDs stable; do not revive historical texture IDs as current registry / validator inputs. If future rename is needed, plan compatibility, generated data updates, and golden expected changes deliberately. v0.0.7.46 migrated taro to `texture_low_drinkability`; v0.0.7.47 migrated Oreo to `texture_low_drinkability`; v0.0.7.49 migrated topping to `texture_solid_overload`. |
| Compatibility cleanup later | legacy texture dedupe fallback | Do not expand; remove only after structured accident tags and tests cover the same safety boundary. |

## 5. Validator / Severity Sheet Implications

Future candidate severity validator and build scripts must account for this inventory:

- `knownAccidentTypeIds` must come from an explicit registry / enum / schema / existing stable data source, not substring guessing.
- A legacy accidentTypeId being present in runtime does not mean its name is ideal for new table design.
- `sourceLayer`, `sourceSummary`, and `triggerMetric` must be explicit table fields. Validators must not infer them from prefixes such as `taste_`, `texture_`, `flavor_`, or `dairy_`.
- Ingredient evidence such as lemon, durian, taro paste, Oreo, matcha, cocoa, or coffee can be used as evidence, but should not create one accidentTypeId per ingredient without review.
- Display text, Chinese notes, `type` labels, and player-facing feedback cannot become validator keys.
- The texture dedupe fallback must not become a validator rule. It exists only to preserve legacy behavior while structured tags catch up.
- No severity sheet should claim migration completion unless golden expected, producer review, generated checks, and shadow / partial gates have been explicitly completed.

## 6. Relationship to Previous Docs

This inventory complements:

- `docs/STABLE_ID_NAMING_GUARDRAIL.md`: long-term ID / naming process. This inventory provides concrete legacy accident examples for that process.
- `docs/V0_0_7_MECHANISM_TODO.md`: P1-4 debt tracking. This inventory gives the missing mapping evidence, but P1-4 remains not complete.
- `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`: future known stable ID source-of-truth rules. This inventory lists current runtime accident IDs that may enter that source only after review.
- `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`: feedbackTag mapping guardrail. Accident IDs and feedbackTags remain separate layers.
- `docs/TASTE_SYSTEM_DESIGN.md` and `docs/TASTE_ENGINE_ARCHITECTURE.md`: broader architecture boundaries for summary / candidate / severity / runtime takeover.

## 7. Review Pack / Human Audit Implications

A future producer-facing accident migration review pack should separate human-readable review from machine detail.

Recommended human review fields:

- legacy item
- current player-visible type / note direction
- current accidentTypeId
- example golden sample(s), if any
- proposed migration category
- producer decision: keep / rename later / needs rewrite / needs split / reject
- producer comment

Recommended machine appendix fields:

- source file and function / rule name
- trigger thresholds and ratios
- ingredient refs or group refs
- sourceLayer candidate
- sourceSummary candidate
- triggerMetric candidate
- current score cap / score delta / forced type / feedbackTags
- golden references
- migration gate

Producer review should focus on player-facing meaning and whether the accident label feels right. Codex / ChatGPT review should focus on source layers, ID boundaries, validator safety, and migration risk.

## 8. 下一步建议

可考虑：

- Use this inventory as required input before any accidentAnalyzer migration route task.
- Design a known stable accidentTypeId source-of-truth using explicit registry / enum / schema boundaries.
- Build a read-only accident migration review pack before changing runtime behavior.
- Keep severity / threshold table work in shadow mode until accident ID naming, sourceLayer, triggerMetric, and golden expected boundaries are reviewed.

Do not use this inventory as permission to rename IDs, migrate runtime logic, or active-takeover severity rules.
