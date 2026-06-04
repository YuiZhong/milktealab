# AI-generated ID / tag naming decision split｜v0.0.7.40

## 0. Report Positioning

This report records producer / ChatGPT decision split after `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`.

It is a decision routing and impact audit report. It is not a migration patch.

This report:

- Records which review items already have producer direction.
- Separates producer decisions from technical source-of-truth work.
- Lists items that still need producer review later.
- Audits the impact surface for a possible future `taste_conflict` to `flavor_identity_conflict` migration.
- Keeps all registry / validator / generated data / runtime gates closed.

This report does not approve any ID / tag / rule for registry, validator, generated data, partial takeover, active takeover, or runtime behavior.

## 1. Producer Decisions Recorded

### Decision 1｜特殊机制保留与泛化迁移

- 榴莲和植脂奶可以在未来保留为特殊高记忆点机制。
- 榴莲的产品语义足够特殊，涉及香气压迫、风味身份、争议性和猎奇性。
- 植脂奶的产品语义也较特殊，涉及工业感、廉价感、奶味模拟和健康疑虑。
- 芋泥、奥利奥、小料过载不应长期按原料拆 `accidentTypeId`。
- 芋泥、奥利奥、小料过载更适合逐步迁到 texture / solid / sediment / strawResistance / lowDrinkability 等泛化机制。
- 本轮不迁移任何 legacy ID。

### Decision 2｜`dairy_fat_overload` 语义

- `dairy_fat_overload` 继续保留 legacy observed ID，本轮不改名。
- 玩家前台语义可以继续理解为“奶脂过载 / 太腻 / 油腻负担”。
- 底层机制优先按 texture / mouthfeel / fatLoad / greasy pressure 理解。
- 它不是纯 taste layer，也不是 straw / physical blockage。
- 后续 notes 应明确：`dairy_fat_overload` represents greasy / fatty mouthfeel pressure, not physical blockage.
- 判定优先级可以比普通味觉不平衡更靠前，但不能直接等同 severity / scoreMultiplier。

### Decision 3｜candidate / risk tag 与 feedbackTag 边界

- candidate / risk tag 不能自动成为 runtime feedbackTag。
- `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty` 当前不能直接进入玩家文案选择。
- 它们可以作为 future copy direction candidate，但不能写进 feedbackTag 字段误导后续任务。
- 后续需要 feedbackTag mapping review、source-of-truth review 和 producer review。
- `aroma_pressure` 当前不是 runtime 文案池 feedbackTag。
- `bubble_conflict` 不得泛化为 generic flavor identity conflict。

### Decision 4｜`taste_conflict` 迁移倾向

制作人倾向：如果影响面可控，应尽早迁移 `taste_conflict`，因为当前没有真实玩家存档和正式线上玩家，迁移成本最低。

技术判断：

- 不允许闭眼全局替换。
- 本轮只做影响审计，不做实际迁移。
- 倾向未来迁移目标为 `flavor_identity_conflict`，因为它比 `flavor_conflict` 更明确。
- `flavor_identity_conflict` 表达风味身份不协调，不是酸甜苦涩等基础味觉不平衡。
- 推荐未来链路：
  - `sourceLayer`: `flavor`
  - `sourceSummary`: `flavorSummary`
  - `triggerMetric`: `identityConflictRisk`
  - `candidateTag`: `identity_conflict`
  - future `outcomeTypeId`: `flavor_identity_conflict`
- 旧 `taste_conflict` 在迁移前仍是 legacy observed outcomeTypeId，不代表 `sourceLayer=taste`。

### Decision 5｜激进程度边界

- 当前没有真实玩家和正式存档，可以在 design / review / disabled draft / notes / shadow 层更积极地定方向。
- registry / validator / generated data / runtime / golden expected / partial takeover 仍必须保守。
- 可以更积极：docs decision、review pack、future ID proposal、disabled draft、shadow evidence。
- 必须保守：runtime final accident、score、feedback、drinkType、golden expected、validator accepted values、generated data build、partial / active takeover。

## 2. Decision Split Table

Gate wording rule:

- `canEnterRegistry`, `canEnterValidator`, `canEnterGeneratedData`, and `canAffectRuntime` are hard gate fields.
- In this report, every value in those fields must be `no`.
- Future work belongs in `technical next step` or `migration need`, not in the `canEnter*` fields.
- This table is routing material, not permission to move data into implementation layers.

| reviewItemId | current decision | producer involvement | technical next step | migration need | canEnterRegistry | canEnterValidator | canEnterGeneratedData | canAffectRuntime |
|---|---|---|---|---|---|---|---|---|
| AIRP39-001 | Keep observed基础事故机制；补 source-of-truth notes | low | Define known ID source notes before validator | none now | no | no | no | no |
| AIRP39-002 | Split into special keep vs generalized migration candidates | high | Create legacy migration plan; keep durian / creamer as possible special cases | yes for taro / oreo / topping / strong flavor directions | no | no | no | no |
| AIRP39-003 | Keep `dairy_fat_overload` observed; nail texture / fatLoad meaning | medium | Add notes in future source-of-truth / migration docs | possible notes or later migration plan | no | no | no | no |
| AIRP39-004 | `taste_conflict` leans migration to `flavor_identity_conflict`; audit first | medium | Design one-shot migration plan with runtime / golden / generated / sheet coverage | yes | no | no | no | no |
| AIRP39-005 | Keep observed drinkType IDs; source paths need notes | medium | Map rule-table source vs analyzer special path | possible later source unification | no | no | no | no |
| AIRP39-006 | feedbackTag layer needs mapping review | high | Producer / ChatGPT feedbackTag mapping review | possible tag split / notes / copy pool work | no | no | no | no |
| AIRP39-007 | candidate / risk tags remain copy direction candidates only | high | Decide candidate-only vs future feedbackTag through mapping review | no direct migration from this report | no | no | no | no |
| AIRP39-008 | textId remains text identity only | medium | Producer text review before any active use | none now | no | no | no | no |
| AIRP39-009 | sampleId remains sample-only | low | Validator should reject sampleId leaks in mechanism fields later | none now | no | no | no | no |
| AIRP39-010 | disabled draft rows stay draft-only | high before use | Candidate severity validator design after review gates | no current migration; future table route only | no | no | no | no |
| AIRP39-011 | summary candidateId remains candidate layer only | medium | Shadow / review before partial takeover | none now | no | no | no | no |
| AIRP39-012 | priorityBand / severityHint / severityLevel stay separated | medium | Severity schema design later | none now | no | no | no | no |
| AIRP39-013 | sourceLayer / sourceSummary / triggerMetric need schema source | medium | Source field schema / source-of-truth design | none now | no | no | no | no |
| AIRP39-014 | displayName dependency remains legacy inventory item | high | Metadata source-of-truth + shadow compare + review pack | yes, but only through staged plan | no | no | no | no |

## 3. Items That Need Producer Review Later

These items still need producer review before any registry / validator / generated data / runtime use:

- AIRP39-002: Which ingredient-like legacy accidents should stay as special memory-point mechanisms, and which should migrate to generalized texture / flavor / taste mechanisms.
- AIRP39-003: Whether player-facing “奶脂过载 / 油腻负担” copy should remain tied to `dairy_fat_overload`, while underlying logic is documented as texture / fatLoad.
- AIRP39-004: Whether the future player / production-facing outcome wording should prefer `flavor_identity_conflict`.
- AIRP39-006: Which observed runtime / generated feedbackTags are acceptable copy-selection directions after mapping review.
- AIRP39-007: Which candidate / risk tags can become future copy direction candidates, and which should remain machine-only.
- AIRP39-010: Whether any disabled candidate severity draft row should survive into future table design.
- AIRP39-014: Whether displayName / category text migration should be staged through metadata, shadow compare, and mechanism review pack.

## 4. `taste_conflict` → `flavor_identity_conflict` migration impact audit

This section is a read-only impact audit. It does not rename or migrate anything.

### 4.1 Current `taste_conflict` references

Runtime source:

- `core/tasteJudge.js`
  - Maps the current display result `口感冲突` to `outcomeTypeId: "taste_conflict"`.
  - Any real migration would affect final result mapping and must be tested through golden samples.

Golden expected:

- `data/goldenSamples.js`
  - `bubble_cream_conflict` expects `outcomeTypeIdIncludes: ["taste_conflict"]`.
  - `bubble_cream_conflict_id_equivalence` expects `outcomeTypeIdIncludes: ["taste_conflict"]`.
  - A real migration would require deliberate golden expected updates in the same task.

Generated data:

- `data/generated/feedbackTexts.generated.json`
- `data/generated/feedbackTexts.generated.js`
  - Generated feedback text data has an `outcomeTypeId: "taste_conflict"` row.
  - A real migration would require rebuilding or updating generated feedback data, plus generated data checks.

Content sheets / sample sheets:

- `content_sheets/examples/feedback_texts.sample.csv`
- `content_sheets/examples/feedback_texts.sample.json`
  - `feedback_bubble_conflict_001` currently uses `outcomeTypeId: "taste_conflict"`.
- `content_sheets/examples/candidate_severity_rules.sample.csv`
- `content_sheets/examples/candidate_severity_rules.sample.json`
  - Disabled draft row `flavor_identity_conflict_outcome_draft` currently points to `outcomeTypeId: "taste_conflict"` while explaining that the source is flavor identity conflict.

Script checks:

- `scripts/content/checkFeedbackRuntimeAdapter.js`
  - Queries enabled outcome texts with `outcomeTypeId: "taste_conflict"`.
  - A real migration would need check updates in the same task, without weakening adapter structure checks.

Docs / reports:

- `docs/TASTE_SYSTEM_DESIGN.md`
- `docs/TASTE_ENGINE_ARCHITECTURE.md`
- `docs/V0_0_7_ID_INVENTORY.md`
- `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/AI_CONTEXT.md`
- `docs/VERSION_LOG.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `reports/stableIdSourceCollector.sample.md`
- `reports/mechanismReviewPack.sample.md`
- `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`

Docs and reports contain both current observations and guardrails. A migration task must separate historical notes from new source-of-truth wording.

### 4.2 Current `flavor_identity_conflict` references

Current observed uses:

- `core/summaryCandidateEngine.js`
  - `candidateId: "flavor_identity_conflict_candidate"` exists in the summary candidate layer.
- `content_sheets/examples/candidate_severity_rules.sample.csv`
- `content_sheets/examples/candidate_severity_rules.sample.json`
  - Disabled draft `ruleId: "flavor_identity_conflict_outcome_draft"` exists.
- `reports/stableIdSourceCollector.sample.md`
- `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`
- `reports/mechanismReviewPack.sample.md`
- `docs/TASTE_ENGINE_ARCHITECTURE.md`
- `docs/VERSION_LOG.md`

Important boundary:

- `flavor_identity_conflict` is not currently a final runtime `outcomeTypeId`.
- It is currently candidate / draft / docs language.
- Future `outcomeTypeId: "flavor_identity_conflict"` requires a separate migration task.

### 4.3 Current `identity_conflict` references

Current observed uses:

- `core/summaryCandidateEngine.js`
  - `feedbackTags: ["identity_conflict"]` appears on the flavor identity candidate.
- `scripts/content/collectStableIdSources.js`
  - Collector records it as candidate / risk tag evidence.
- `reports/stableIdSourceCollector.sample.md`
- `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
- `docs/V0_0_7_ID_INVENTORY.md`
- `docs/VERSION_LOG.md`
- `docs/TASTE_SYSTEM_DESIGN.md`

Layer judgment:

- `identity_conflict` is a candidate / risk tag.
- It is not a runtime feedbackTag.
- It should not be mapped to `bubble_conflict` by string similarity or generic conflict semantics.

### 4.4 Current `novelty_experiment` references

Current observed uses:

- `core/summaryCandidateEngine.js`
  - Emits `outcomeTypeId: "novelty_experiment"` in the summary candidate layer.
- `core/tasteJudge.js`
  - Maps display result `猎奇实验品` to `outcomeTypeId: "novelty_experiment"`.
- `reports/stableIdSourceCollector.sample.md`
- `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`
- `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- `docs/V0_0_7_ID_INVENTORY.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/VERSION_LOG.md`

Layer judgment:

- `novelty_experiment` has mixed observed references.
- It appears in candidate output and in a runtime display-to-ID mapping.
- It needs source-of-truth review before validator / generated data / takeover work.

### 4.5 Future migration impact summary

A future `taste_conflict` to `flavor_identity_conflict` migration would likely touch:

- Runtime mapping: `core/tasteJudge.js`.
- Golden expected: `data/goldenSamples.js`.
- Generated feedback data: `data/generated/feedbackTexts.generated.json` and `.js`.
- Human content samples: `content_sheets/examples/feedback_texts.sample.*`.
- Candidate severity sample draft: `content_sheets/examples/candidate_severity_rules.sample.*`.
- Adapter checks: `scripts/content/checkFeedbackRuntimeAdapter.js`.
- Docs and reports that currently document `taste_conflict` as observed legacy outcome.

Expected impact:

- Yes, it can affect final result identity.
- Yes, it can affect golden expected.
- Yes, it can affect generated feedback lookup.
- Yes, it can affect sample sheets and review reports.
- It should be a one-shot migration task if approved.
- It may need a compatibility alias or explicit legacy note during migration, but that decision belongs to the migration task.

Suitability for v0.0.7.41:

- v0.0.7.41 can consider either a one-shot migration plan / proof or the actual migration if explicitly authorized.
- If the actual migration is chosen, it must update runtime / golden / generated / content_sheets / checks / docs together and rerun all relevant checks.
- If uncertainty remains, v0.0.7.41 should stay as migration plan / proof only.

## 5. Recommended v0.0.7.41 Options

These are options, not decisions:

1. `v0.0.7.41｜taste_conflict migration plan / proof`
   - Produce a concrete file-by-file migration plan and expected diff shape.
   - Do not change runtime yet.

2. `v0.0.7.41｜taste_conflict -> flavor_identity_conflict one-shot migration`
   - Only if explicitly authorized.
   - Must update runtime mapping, golden expected, generated feedback data, content sheets, adapter checks, docs, and reports in one controlled task.

3. `v0.0.7.41｜feedbackTag mapping review`
   - Focus on `bubble_conflict`, `aroma_pressure`, `identity_conflict`, and related candidate / risk tag boundaries.
   - Keep runtime unchanged.

4. `v0.0.7.41｜legacy accident special-case split`
   - Decide which legacy ingredient-like accident IDs are special memory-point mechanisms and which need generalized migration plans.
   - Keep implementation unchanged.

## 6. Gate Reminders

- P1-1 remains open.
- P1-5 remains open.
- P1-7 remains open.
- `taste_conflict` remains legacy observed outcomeTypeId until a separate migration task changes it.
- `flavor_identity_conflict` remains a future target proposal / candidate / draft phrase in this report.
- candidate / risk tags remain separate from runtime feedbackTag.
- No validator may consume candidate / risk tags as accepted feedbackTag values from this report.
- No generated data build may use this report as accepted values.
- No partial / active takeover may read this report as runtime permission.

## 7. What This Report Does NOT Do

- Does not migrate `taste_conflict`.
- Does not create `flavor_identity_conflict` as runtime `outcomeTypeId`.
- Does not rename any existing ID / tag / rule.
- Does not add registry / enum / schema / validator.
- Does not add generated data.
- Does not update content sheets.
- Does not update scripts.
- Does not update golden expected.
- Does not change runtime, score, feedback, accident, drinkType, or `result.type`.
- Does not resolve P1-1.
- Does not authorize any item to enter registry, validator, generated data, partial takeover, active takeover, or runtime.
