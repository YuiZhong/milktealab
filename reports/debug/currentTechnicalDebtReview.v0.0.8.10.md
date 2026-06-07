# Current Technical Debt Review v0.0.8.10｜当前技术债复盘 / 下一路线分流

> 本报告是 v0.0.8.10 debug / review material，用于复盘当前 technical debt 与下一步路线。
> 它不是 source-of-truth、不是 registry、不是 validator、不是 generated data、不是 runtime data。
> 本轮不修债、不改 runtime / core / data / generated / golden，也不开放 active generated severity / final takeover。

## 0. 速读结论

- 当前可以继续推进 non-final 路线：debug-only / feature-flag / read-only shadow、页面 score suggestion overlay、制作人 review pack、以及小批 source-referenced ingredient profile value draft。
- 当前不应直接推进 active generated severity / final score override / final feedback takeover / golden expected rewrite。
- 最大阻塞不是单点 bug，而是几条边界同时未闭合：显示文案主键残留、legacy accident route、stable ID / registry / validator 仍是 scaffold、profile 数值缺 source metadata、draft scoreDelta 尚未正式校准、golden 更新协议仍需人工 gate。
- `ingredientProfileValueReadiness.sample.md` 显示 profile coverage 已足够开始小批资料草案，但不等于可以把当前 profile 当成正式调分依据。
- 下一步最值得做的三件事：小批资料参考 profile value draft、显示文案 / 中文主键残留 runtime risk grep、draft scoreDelta rule config / scoring table extraction planning。

## 1. Current debt table

| debt | current evidence | risk | blocks now | can continue before solved |
|---|---|---|---|---|
| Display text / Chinese-key residue | `tasteJudge` 仍按中文 category 计数；`drinkStructureAnalyzer` 仍有中文 role Set 和 `item.name` profile lookup；`drinkTypeAnalyzer` / legacy docs 仍记录中文茶名和 typeMap 风险。 | High | final scoring takeover, save / import system, active generated severity depending on stable source fields | read-only grep report, staged cleanup plan, compatibility shadow |
| Legacy accident route | `accidentAnalyzer` 仍直接产生 final accident / score / cap；texture dedupe 还识别 `口感事故` 和 note words like `吸管` / `半固体` / `水泥`。 | High | replacing final accident, active partial / full takeover | shadow compare, decision report, staged legacy support |
| Stable ID registry / source-of-truth | `stableIdRegistry.js` 只有 `taste_acid_overload` 和 `texture_solid_overload` 两个 scaffold entries，且 status 都是 `reviewed_candidate_not_approved`。 | High | active validator, official generated severity, allowed values | docs-only registry planning, draft ID review, readonly checks |
| Active validator gap | `checkStableIdRegistry.js` 只校验最小 scaffold，明确 forbidden statuses / runtime flags；它不是 runtime active validator。 | High | CSV / JSON as official generated severity, runtime validator | validator/lint planning, non-final sample checks |
| FeedbackTag / copy pool boundary | feedbackTag mapping docs 仍要求 candidate / risk tags 不自动成为 runtime feedbackTag；`feedbackEngine` generated feedback path is non-final. | Medium-High | generated feedback takeover, final copy replacement | review pack / human review material |
| Drink structure displayName fallback | `drinkStructureAnalyzer` 和 historical inventory 仍显示 displayName role detection / profile lookup debt。 | High | structure-driven active severity takeover | structure risk grep, metadata replacement plan |
| Profile value readiness | taste profile coverage 33/37；texture / flavor coverage 37/37；all layers lack consistent source notes / confidence / review status. | High | serious score tuning, final score override | small-batch source-referenced profile value draft |
| Draft scoreDelta rules | `generatedSeveritySuggestionEngine` has draft score rules for `solidLoad`, `fatLoad`, `drinkabilityPenalty`, `acidity`, `bitterness`; all non-final. | Medium-High | active score override | debug overlay, calibration review, rule config extraction planning |
| Golden calibration role | golden remains safety net; new-system disagreements require review before updating expected. | Medium-High | changing final result or golden expected | review pack, manual checkpoint, non-final score suggestion |
| Positive synergy / preference / aggregation | score suggestion review prompt explicitly lists these as likely adjustment targets; they are not yet implemented as formal layers. | Medium | final score takeover and taste-quality calibration | docs/planning and debug review |

## 2. Display text / Chinese-key residue review

当前仍存在多处显示文案或中文分类参与系统判断。它们并不都要立刻修，但会阻塞 active takeover。

| area | observed residue | risk read |
|---|---|---|
| Final scoring category counts | `tasteJudge` 使用 `context.countByCategory("茶类")`、`"小料"`、`"乳类"`、`"水果/风味"`。 | High：这些中文 category 会影响 final score / attribute / type logic。 |
| Drink structure role detection | `drinkStructureAnalyzer` 使用中文 `baseLiquidNames` / `flavorNames` / `textureNames` / `sweetenerNames`，并通过 `getTasteProfile(item.name)` 读取 profile。 | High：future structure severity 若接管前未替换为 stable metadata，会把 displayName 继续当结构身份。 |
| Accident legacy texture detection | `accidentAnalyzer` 的 `isLegacyTextureAccident` 读取 display `type === "口感事故"` 和 note words `吸管|半固体|水泥|物理|勺子`。 | High：这会影响 structure accidents 是否追加，属于 final accident route 的 legacy gate。 |
| Drink type path | v0.0.7 inventory 记录 `drinkTypeAnalyzer` 仍有中文茶名 / typeMap fallback 风险。 | High：会影响 final drinkType / positive classification。 |
| Profile tables | texture profile 仍有 displayName-key table；taste profile coverage audit 仍显示 source metadata 不统一。 | Medium-High：profile 值草案能推进，但 stable profile source-of-truth 还没闭合。 |
| Golden samples / expected text | golden sample 保留大量中文名称、feedback 文案和 expected includes。 | Medium：适合作为回归报警器，不应被误读成新系统机制正本。 |
| Content sheet examples | CSV / JSON sample rows 里有 displayNameDraft / human notes。 | Low-Medium：它们是 human-readable examples，不是 runtime data；风险在于未来误接入。 |

结论：显示文案主键 / 中文主键残留是真实债务，尤其集中在 final scoring、drink structure、legacy accident 和 drink type 路径。它不阻止 debug-only / review-only 工作，但阻止 active final takeover。

## 3. P1 / P2 / P7 / P8 and old mechanism TODO debt review

旧 v0.0.7 mechanism TODO 已经不应作为当前机制正本，但它保留了仍有效的 staged debt：

- P1 不等于 solved。当前已完成分流和 checkpoint，不等于 legacy route、registry、validator、generated severity、feedbackTag、drinkStructure 都已落地。
- legacy if / accidentAnalyzer route 仍可 staged support，但不能继续扩张为新机制实现方式。
- displayName / 中文主键 fallback 已被识别为高风险迁移债，不能在 next-stage implementation 前忽略。
- stableIdRegistry scaffold 仍是 minimal / reviewed candidate only，不是 approved source-of-truth。
- generated severity / shadow / partial / active takeover 边界已从 docs planning 推进到 read-only proof / debug overlay，但 final takeover 仍关闭。
- V0_0_7 stage-bound files 应继续按 historical / stage support 读取，不反向覆盖 L1 正本。

本轮没有发现需要立即阻断 debug-only v0.0.8.10 的新 P0；但 P1/P2/P7/P8 级旧债仍应进入 next-stage active TODO 或 dedicated cleanup task。

## 4. Source-of-truth / registry / validator debt

当前 source-of-truth 层级已经比 v0.0.7 前清楚，但 registry / validator 仍处在准备态：

- `docs/STABLE_ID_NAMING_GUARDRAIL.md` 是长期 guardrail；human review reports 是证据，不是 registry。
- `data/stableIdRegistry.js` 只有 2 个 scaffold entries：`taste_acid_overload`、`texture_solid_overload`。
- 这两个 entries 都明确 `canEnterValidator=false`、`canEnterGeneratedSeverity=false`、`canAffectRuntime=false`。
- `scripts/content/checkStableIdRegistry.js` 是 scaffold consistency check，不是 active runtime validator。
- Current content sheets examples / severity sample rows 仍是 examples / planning samples，不是 allowed values。

阻塞项：

- 在 official generated severity 前，需要明确 registry / allowed values / validator 的 source-of-truth。
- 在 active takeover 前，需要决定哪些 draft IDs 成为 approved stable IDs，哪些留在 planning / evidence。
- 在 generated feedback 接管前，需要 feedbackTag registry / copy pool review，不能把 candidateTag / riskTag 自动当 feedbackTag。

## 5. Generated severity / scoring takeover blockers

当前 generated severity suggestion 已可见、可读、可做 calibration review，但仍属于 non-final debug path。

已具备：

- `generatedSeveritySuggestion` 输出 readonly / non-final flags。
- 页面可见 score suggestion overlay 能展示 legacy score、suggestedScore、scoreDelta 和 review hints。
- draft score rules 能读取当前 summary numeric metrics。
- review prompt 已提醒优先检查 threshold / severityLevel / scoreMultiplier / positive synergy / drinkType expectation / aggregation / customer preference，而不是直接扭曲 profile。

仍阻塞 active takeover：

- draft thresholds / scoreDelta / severity bands 未正式批准。
- scoreMultiplier 仍无正式 table。
- positive synergy / drinkType expectation / customer preference / score aggregation 仍未数据化。
- profile factual baseline 未完成 source-referenced calibration。
- stable ID registry / active validator 未闭合。
- legacy final accident / score route 未被 shadow compare 替换。
- golden update protocol 仍需要人工 review gate。

结论：可以继续 debug-only score suggestion、calibration presets、review pack；不应直接让 suggestedScore 覆盖 final score。

## 6. Ingredient profile value readiness

`ingredientProfileValueReadiness.sample.md` 给出的状态适合启动小批 profile value draft，但不适合直接接管评分。

当前可用基础：

- 总 ingredient 数：37。
- tasteProfile coverage：33/37。
- textureProfile coverage：37/37。
- flavorProfile coverage：37/37。
- 当前 draft scoreDelta 依赖的可观察 metrics：`solidLoad`、`fatLoad`、`drinkabilityPenalty`、`acidity`、`bitterness`。

关键缺口：

- 缺 tasteProfile：抹茶 (`flavor_matcha`)、可可 (`flavor_cocoa`)、焦糖 (`sweetener_caramel`)、海盐 (`seasoning_sea_salt`)。
- taste / texture / flavor profile 都缺统一 source note / confidence / review status。
- draft scoreDelta metrics 未正式校准，不安全进入 final score。

路线判断：

- 可以做：8-12 或 13 个核心原料的 source-referenced profile value draft，带资料来源、confidence、reviewStatus、人类备注。
- 不应做：随机生成全量 profile 数值、为了目标分数反推 profile、直接改 runtime data 或 golden expected。
- 优先原则：profile 描述材料事实 / 游戏化相对属性；scoring system 定义什么算好喝。

## 7. Next 3 recommended tasks

### Task 1: Core ingredient source-referenced profile value draft

做一小批核心原料，不直接改 runtime data。

建议范围：茶基底、牛奶 / 厚乳 / 奶油、柠檬、榴莲、糖类、小料代表。每个值附 source note / confidence / review status。

产物可以是 human review report 或 content sheet draft；不要写入 `data/ingredient*Profiles.js`。

### Task 2: DisplayName / Chinese-key runtime risk grep + staged cleanup plan

专门盘点会影响 final result 的 displayName / Chinese-key path，按 high / medium / low 分流。

重点文件：`core/tasteJudge.js`、`core/drinkStructureAnalyzer.js`、`core/accidentAnalyzer.js`、`core/drinkTypeAnalyzer.js`、profile tables、golden expected。

目标不是一次修完，而是给 active takeover 前的 cleanup gate。

### Task 3: Draft scoreDelta rule config extraction / scoring table preparation

把当前 `generatedSeveritySuggestionEngine` 中 hardcoded draft rule thinking 拆成 non-final config / table planning。

必须保留：draft / notApproved / non-final / no runtime takeover。下一步应一起规划 threshold、severityLevel、scoreMultiplier、positive synergy、drinkType expectation、customer preference、aggregation。

## 8. What this report does not do

- 不修复 displayName / Chinese-key residue。
- 不新增 registry / validator / allowed values。
- 不创建 generated severity data。
- 不改变 final score / final feedback / result type / golden expected。
- 不改 ingredient profile values。
- 不宣布 active takeover ready。
- 不把 reports/debug 或 reports/human_review 升级为 source-of-truth。
