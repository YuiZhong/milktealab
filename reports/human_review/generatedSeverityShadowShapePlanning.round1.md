# Generated Severity Shadow Shape Planning Round 1｜Generated Severity Shadow 输出结构规划

## 0. 文件定位

本文件只规划 future `generatedSeverityShadow` 的输出结构、metadata、legacy comparison、sample row trace、candidate / severity draft 字段和 hard non-final boundary。

本文件不是：

- shadow builder implementation
- generated severity data
- runtime data
- CSV / JSON / JS 文件
- schema / active validator / allowed values
- formal threshold / scoreMultiplier / triggerMetric / stable ID approval
- final score / final feedback / final accident / golden expected source
- shadow / partial / active takeover permission

本文件不实现 shadow，不生成 generated severity，不接 runtime，不修改 core / data / generated / golden。

## 1. Planning Inputs

本轮 shape planning 只读取既有 planning materials：

| input | role in this planning | boundary |
|---|---|---|
| `reports/human_review/preShadowGateReview.round1.md` | pre-shadow gate conclusion | allows shape planning only, not implementation |
| `content_sheets/examples/severity_sample_rows.sample.csv` | example row source shape | planning example only |
| `content_sheets/examples/severity_sample_rows.sample.json` | normalized example row shape | planning example only |
| `scripts/content/validateSeveritySampleRows.js` | minimal offline lint stub | not active validator |
| `reports/human_review/first6SeveritySampleRowsReview.round1.md` | confirms 18 dry-run rows as planning checkpoint | not official threshold / scoreMultiplier |
| `docs/TASTE_SYSTEM_DESIGN.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md` | numeric-first and texture / mouthfeel boundary principles | L1 design / architecture source only |
| `docs/STABLE_ID_NAMING_GUARDRAIL.md` | draft ID / registry / generated data guardrail | ID guardrail only |

## 2. Top-level Shape

Future `generatedSeverityShadow` output should be a clearly non-final observation object.

Suggested top-level shape:

```js
{
  schemaVersion: "generatedSeverityShadow.shapeDraft.v0.0.8",
  sourceType: "planning_shape",
  shadowMode: "shape_planning_only",
  enabled: false,
  affectsFinalResult: false,
  canAffectRuntime: false,
  canChangeGoldenExpected: false,
  generatedSeverityEnabled: false,
  generatedAt: null,
  sourceSummary: {},
  rows: [],
  metadata: {}
}
```

Boundary:

- This shape is not generated data.
- `schemaVersion` is a planning label, not a formal schema approval.
- `generatedAt` may remain `null` in planning examples.
- `enabled=false` and `affectsFinalResult=false` are mandatory in any future shadow output until a separate implementation gate approves otherwise.

## 3. Required Metadata

Every future shadow output should carry metadata that prevents accidental promotion.

Suggested metadata fields:

| field | suggested value / status | purpose |
|---|---|---|
| `sourceType` | `planning_sample` / `shape_planning` | declares non-runtime source |
| `readonly` | `true` | makes observation-only status explicit |
| `planningSample` | `true` | marks sample-derived content |
| `notRuntimeData` | `true` | prevents runtime interpretation |
| `proposedDraftIdStatus` | `draft_notApproved` | prevents draft ID promotion |
| `triggerMetricStatus` | `direction_notRegistry` | prevents direction words becoming allowed values |
| `thresholdStatus` | `illustrative_only_notApproved` | prevents threshold promotion |
| `scoreMultiplierStatus` | `blank_tbd_notApproved` | prevents scoring promotion |
| `feedbackIntensityStatus` | `draft_notApproved` | prevents feedback intensity promotion |
| `validatorStatus` | `minimal_offline_stub_only` | prevents active validator interpretation |
| `registryStatus` | `none_notApproved` | prevents registry interpretation |

Metadata is a safety boundary. It is not approval metadata.

## 4. Row Shape

Each future shadow row should keep identity, traceability, candidate draft, severity draft, comparison, and gate fields separate.

Suggested row shape:

```js
{
  shadowRowId: "SHADOW-SEV-R1-001",
  sampleRowTrace: {},
  candidateDraft: {},
  severityDraft: {},
  legacyComparison: {},
  gates: {},
  notes: {}
}
```

Boundary:

- `shadowRowId` is a shadow observation row ID, not stable ID.
- `shadowRowId` must not become `ruleId`, `sampleId`, `accidentTypeId`, or registry key.
- Each row remains disabled unless a later implementation gate explicitly changes that.

## 5. Sample Row Trace

The shadow row must preserve where its planning inputs came from.

Suggested `sampleRowTrace` fields:

| field | purpose | boundary |
|---|---|---|
| `sourceSampleFile` | points to sample CSV / JSON | not runtime data |
| `sourceRowId` | links to sample row such as `SEV-R1-001` | row ID only, not stable ID |
| `sourceReviewFile` | links to review record | report evidence only |
| `sourceReviewStatus` | e.g. `dry_run_reviewed_planning_checkpoint` | not approval |
| `sourceProposedDraftId` | copies the row's `proposedDraftId` | remains draft / notApproved |
| `sourceTriggerMetricDirection` | copies direction word | remains direction / not registry |

This trace exists so humans can audit the shadow row. It does not convert sample rows into generated severity.

## 6. Candidate Draft Fields

Suggested `candidateDraft` fields:

| field | purpose | boundary |
|---|---|---|
| `proposedDraftId` | draft mechanism identity under review | not approved stable ID |
| `displayNameDraft` | human-readable display draft | not key |
| `sourceLayer` | dominant layer / boundary note | not schema approval |
| `candidateType` | likely `accident` for first 6 | draft only |
| `notThis` | prevents mistaken mechanism merge | review hint only |
| `preferenceNotes` | future tolerance / preference note | not customer system |

The candidate draft section must not create registry candidate rows. It only mirrors planning sample identity for shadow shape design.

## 7. Severity Draft Fields

Suggested `severityDraft` fields:

| field | purpose | boundary |
|---|---|---|
| `humanSeverityLabel` | light / medium / heavy label for producer review | human-readable label only |
| `severityLevelDraft` | draft severity label | not formal enum |
| `severityExperience` | human body-feel description | not machine rule |
| `triggerMetricDirection` | metric direction word | not formal triggerMetric |
| `thresholdDraftMin` | optional illustrative lower bound | not official threshold |
| `thresholdDraftMax` | optional illustrative upper bound | not official threshold |
| `thresholdStatus` | `illustrative_only_notApproved` | required safety status |
| `scoreMultiplierDraft` | blank / TBD | not official multiplier |
| `scoreMultiplierStatus` | `blank_tbd_notApproved` | required safety status |
| `feedbackIntensityDraft` | mild / clear / strong draft | not official feedback rule |
| `feedbackIntensityStatus` | `draft_notApproved` | required safety status |

Numeric-first still applies: future real calculation must read numeric `triggerMetric` / numeric summary. The light / medium / heavy labels remain human-readable hints.

## 8. Legacy Comparison Fields

Future shadow output should compare against current legacy final output without changing it.

Suggested `legacyComparison` fields:

| field | purpose | hard boundary |
|---|---|---|
| `legacyResultType` | observes current `result.type` | read-only snapshot |
| `legacyAccidentTypeId` | observes current accident ID if present | read-only snapshot |
| `legacyFeedbackTags` | observes current feedback tags if present | read-only snapshot |
| `legacyScore` | observes current score | read-only snapshot |
| `shadowWouldSuggest` | explains what severity draft might suggest | explanation only |
| `differenceSummary` | describes mismatch / alignment | no automatic behavior |
| `requiresHumanReview` | flags uncertain comparison | review hint only |

Hard boundary:

- legacy comparison must never rewrite final result.
- shadow mismatch must not update golden expected.
- shadow mismatch must not auto-create issues, registry rows, or runtime rules.

## 9. Gate Fields

Every future shadow row should repeat dangerous gates so the non-final status is visible at row level.

Required gate fields:

| gate | required value before future approval |
|---|---|
| `enabled` | false |
| `canEnterGeneratedSeverity` | false |
| `canEnterShadow` | false unless a later shadow implementation task explicitly approves read-only shadow |
| `canAffectRuntime` | false |
| `canChangeGoldenExpected` | false |
| `affectsFinalResult` | false |
| `canCreateRegistryCandidate` | false |
| `canCreateAllowedValues` | false |

If a future read-only shadow implementation is approved, it may revisit `canEnterShadow`, but `affectsFinalResult`, `canAffectRuntime`, and `canChangeGoldenExpected` must remain false unless a much later takeover gate is explicitly approved.

## 10. Hard Non-final Boundary

Generated severity shadow shape planning must preserve these hard boundaries:

- no generated severity
- no generated data
- no runtime data
- no active validator
- no allowed values
- no official threshold
- no official `scoreMultiplier`
- no official feedback intensity
- no final score change
- no final feedback change
- no final accident change
- no `result.type` change
- no golden expected change
- no partial / active takeover

The shadow may explain what a future severity system might observe. It must not make the game behave differently.

## 11. Open Debts Before Any Shadow Builder

Before implementing any shadow builder, the following must be separately decided:

- whether the first shadow builder reads sample CSV / JSON, normalized JSON, or future generated planning data
- whether `proposedDraftId` values remain allowed in shadow output, and how they are marked notApproved
- how to map runtime summary / candidate values to sample rows without creating active triggerMetric allowed values
- exact output location, if any
- whether output should be per recipe, per sample row, or per candidate
- how to keep generated feedback shadow and generated severity shadow separate
- how to prevent any shadow output from affecting final result or golden expected
- what validator / lint must run before a shadow artifact is trusted

These are implementation blockers, not shape-planning blockers.

## 12. Recommendation

Recommendation: this shape is enough for human review of Generated Severity Shadow Shape Planning.

Next suitable options:

- User + ChatGPT review this shape report.
- If accepted, plan a read-only shadow builder separately.
- Or tighten fields before any implementation planning.

Not suitable next steps:

- generated severity build
- runtime integration
- active validator
- registry / schema / allowed values creation
- golden expected updates
- partial / active takeover

