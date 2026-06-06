# Pre-Shadow Gate Review Round 1｜Pre-Shadow Gate / Source-of-truth Boundary Check

## 0. 文件定位

本文件只判断当前 sample / validator / source-of-truth 边界是否足够进入 Generated Severity Shadow Shape Planning。

本文件不是：

- shadow implementation
- generated severity shape
- generated severity data
- runtime data
- schema / active validator / allowed values
- formal threshold / scoreMultiplier / triggerMetric / stable ID approval
- final score / final feedback / final accident / golden expected change source
- shadow / partial / active takeover permission

本文件不实现 shadow，不生成 generated severity，不创建 runtime data，不批准正式 threshold / scoreMultiplier / triggerMetric / stable ID。

## 1. Current Assets Reviewed

当前已具备并用于本轮 gate review 的材料：

| asset | current status | boundary |
|---|---|---|
| `content_sheets/examples/severity_sample_rows.sample.csv` | sample CSV example exists | example only, not generated severity source |
| `content_sheets/examples/severity_sample_rows.sample.json` | sample JSON example exists | example only, not runtime data |
| `scripts/content/validateSeveritySampleRows.js` | minimal validator stub exists | offline stub only, not active registry / runtime validator |
| `reports/human_review/minimalSeverityValidatorStubReview.round1.md` | validator stub review accepted | review record only |
| `reports/human_review/first6SeveritySampleRowsDryRun.round1.md` | first 6 proposedDraftId dry-run rows exist | illustrative / draft / notApproved |
| `reports/human_review/first6SeveritySampleRowsReview.round1.md` | first 6 dry-run row review accepted | planning checkpoint only |
| `reports/human_review/candidateSeveritySampleSheetShape.round1.md` | severity sample sheet shape planned | not CSV / schema / validator |
| `reports/human_review/triggerMetricDirectionReview.round1.md` | triggerMetric directions reviewed | directions only, not formal registry |
| `reports/human_review/triggerMetricDirectionReviewRecord.round1.md` | triggerMetric direction review accepted | planning checkpoint only |
| `docs/TASTE_SYSTEM_DESIGN.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md` | texture / mouthfeel four-boundary and numeric-first principles are in L1 docs | design / architecture source-of-truth only, not implementation |
| `docs/STABLE_ID_NAMING_GUARDRAIL.md` | stable ID naming / reusable ID guardrails exist | guardrail only, not approved stable ID registry |

## 2. What Is Enough For Shadow Shape Planning

Current state is enough to support Generated Severity Shadow Shape Planning because:

- sample CSV / JSON exist, but remain examples.
- the minimal validator stub can check example gates / status / metadata.
- the first 6 `proposedDraftId` have dry-run light / medium / heavy rows.
- dangerous gates remain false in the sample rows:
  - `enabled=false`
  - `canEnterGeneratedSeverity=false`
  - `canEnterShadow=false`
  - `canAffectRuntime=false`
  - `canChangeGoldenExpected=false`
- numeric-first boundary has been recorded in L1 design / architecture docs.
- texture / mouthfeel four-boundary has been recorded in L1 design / architecture docs.
- stable ID naming guardrail makes clear that proposed / draft / registry candidate stages must not collapse into approved stable IDs.

This is enough to design a future shadow output structure. It is not enough to implement a shadow builder.

## 3. Debts Blocking First Shadow Shape Planning

P0 blocker: none, if the next step is strictly Generated Severity Shadow Shape Planning.

The main caveat is scope: shape planning cannot become implementation. The next artifact must stay as a design / review material that describes output structure, fields, metadata, and non-final boundaries.

If the next step attempts to create generated data, a builder script, runtime wiring, final score changes, final feedback changes, or golden expected updates, this gate no longer passes.

## 4. Debts Blocking First Shadow Implementation

The following debts do not block shadow shape planning, but they do block first read-only shadow implementation unless handled or isolated with clear metadata / read-only flags:

| debt | why it blocks implementation | required boundary before implementation |
|---|---|---|
| `proposedDraftId` remains not approved stable ID | implementation could accidentally treat draft names as stable runtime IDs | every output must state draft / notApproved identity |
| `triggerMetricDirection` remains not formal triggerMetric registry | implementation could treat direction words as allowed metric values | every output must state direction / not official registry |
| sample CSV / JSON remain examples | implementation could treat examples as generated severity source | outputs must mark source as planning sample / notRuntimeData |
| validator stub remains not active validator / registry validator | implementation could over-trust a minimal offline lint tool | runtime / registry validation must remain closed |
| no normalized severity build step exists | implementation has no approved generated severity build path | builder design must be separately reviewed |
| shadow output structure is not yet designed | implementation has no agreed output contract | shape planning must define fields before code |
| shadow read path is undefined | implementation has not defined how to read summary / candidate / sample rows | read path must be reviewed before any builder |
| `affectsFinalResult=false` / golden no-change boundary is not yet in output shape | implementation could affect final result accidentally | output shape must make non-final / no-golden-change explicit |

Conclusion: these debts block first shadow implementation, but they can be intentionally addressed by the next shape-planning report before any code or generated data exists.

## 5. Debts Blocking Generated Build / Partial / Active Takeover

The following debts can remain open during shadow shape planning, but they block generated build / partial takeover / active takeover:

| debt | blocks |
|---|---|
| full stable ID registry | generated build / active validator / runtime identity |
| formal triggerMetric registry | generated build / allowed metric values |
| formal severityLevel enum | generated severity table / validator |
| official threshold / scoreMultiplier | generated severity scoring |
| generated severity build pipeline | generated data creation |
| active validator allowed values | registry / schema enforcement |
| partial / active takeover gates | final feedback / final score / runtime behavior |
| golden expected update policy | any final output change |
| runtime integration strategy | runtime wiring / takeover |

These do not need to be solved before Generated Severity Shadow Shape Planning. They must be solved before generated build, partial takeover, or active takeover.

## 6. Required Boundary For Next Step

If the next step is Generated Severity Shadow Shape Planning, it must keep these boundaries:

- The next artifact designs output structure only; it must not implement a builder.
- Output shape must contain `affectsFinalResult=false`.
- Output shape must contain source / boundary metadata such as `sourceType`, `readonly`, `planningSample`, and `notRuntimeData`.
- Output shape must state `proposedDraftId` remains draft / notApproved.
- Output shape must state `triggerMetricDirection` remains direction / not official registry.
- Output must not modify score, feedback, `result.type`, accident, or golden expected.
- Output must not let sample CSV / JSON become runtime data.
- Output must not treat the minimal validator stub as active validator.

## 7. Recommendation

Recommendation: 可以进入 Generated Severity Shadow Shape Planning，但不能进入 shadow implementation。

下一步应做：

- Generated Severity Shadow Shape Planning

下一步不应做：

- read-only shadow builder implementation
- generated severity build
- active validator
- runtime integration
- golden expected changes
- partial / active takeover

