# Generated Severity Shadow Read Path Planning Round 1｜Generated Severity Shadow 输入 / 读取路径规划

## 0. 文件定位

本文件只规划 future `generatedSeverityShadow` builder 的输入来源 / read path。

本文件不是：

- shadow builder implementation
- generated severity data
- runtime data
- schema / active validator / allowed values
- formal threshold / scoreMultiplier / triggerMetric / stable ID approval
- final score / final feedback / final accident / golden expected source
- shadow / partial / active takeover permission

本文件不实现 builder，不生成 generated severity，不接 runtime，不影响 final result / golden expected。

## 1. 为什么需要这一步

`reports/human_review/generatedSeverityShadowShapePlanning.round1.md` 已规划 future `generatedSeverityShadow` 的输出结构。

`reports/human_review/preShadowGateReview.round1.md` 已确认当前状态可以进入 shadow shape planning，但不能直接进入 implementation。

真正实现 shadow builder 前，必须先定义：

- 它未来读什么。
- 它怎么读。
- 哪些字段只能只读观察。
- 哪些来源不能当 runtime data。
- 哪些来源不能当 generated severity source。
- 哪些来源不能被提升为 registry / schema / active validator / allowed values。

本轮仍不写代码，不创建 generated data，不接 runtime。

## 2. Candidate Input Sources

### 2.1 Severity Sample Rows Examples

Future shadow builder may read severity sample row examples:

- `content_sheets/examples/severity_sample_rows.sample.csv`
- `content_sheets/examples/severity_sample_rows.sample.json`

Boundary:

- examples only
- not generated severity
- not runtime data
- not official thresholds
- not official `scoreMultiplier`
- must pass `scripts/content/validateSeveritySampleRows.js` before any use
- `proposedDraftId` remains draft / notApproved
- `triggerMetricDirection` remains direction / not official registry
- `rowId` remains sample row ID, not stable ID
- `displayNameDraft` remains display draft, not key

### 2.2 Existing Runtime Result Snapshot

Future shadow builder may need to read a read-only snapshot of the current `tasteJudge` result, such as:

- `score`
- `type`
- `feedback`
- `accidentTypeId`
- `drinkTypeId`
- `outcomeTypeId`
- `feedbackTags`
- `tasteSummary`
- `textureSummary`
- `flavorSummary`
- `summaryCandidates`
- `candidatePriorityShell`

Boundary:

- read-only snapshot
- no mutation
- no final result override
- no golden expected update
- no feedback replacement
- no result type replacement
- no accident replacement

### 2.3 Summary / Candidate Structures

Future read path should prefer existing structured observation fields:

- `tasteSummary.values`
- `textureSummary.values`
- `flavorSummary.values`
- `summaryCandidates`
- `candidatePriorityShell`

Boundary:

- summary / candidates are evidence sources only
- sample rows do not become runtime rules
- shadow builder must not add new summary fields
- shadow builder must not change candidate priority shell
- shadow builder must not infer new stable IDs from summary labels
- missing summary values are allowed and should produce `missing_summary` / `unavailable_metric`, not runtime fallback hacks

### 2.4 Validator Output

Future read path can require sample rows validation before shadow builder runs.

Boundary:

- `validateSeveritySampleRows.js` remains offline lint
- validator is not active registry validator
- validator does not read runtime recipe
- validator does not run `tasteJudge`
- validator output is gate / diagnostics, not generated severity
- validator output must not decide match state

## 3. Read Path Proposal

Future read sequence, not implementation:

1. Load severity sample rows JSON or CSV.
2. Run or require `validateSeveritySampleRows.js` success.
3. Load or receive current result snapshot from a test / golden / debug harness.
4. Extract summary / candidate evidence read-only.
5. For each sample row, compare `triggerMetricDirection` with available summary / candidate evidence.
6. Produce `shadowCandidates` with matched / not matched / unavailable states.
7. Add `legacyComparison`.
8. Output `generatedSeverityShadow` with `affectsFinalResult=false`.

This is future design only. There is no code in this round. There is no runtime wiring in this round.

## 4. Match State Design

Future `shadowCandidate.matchState` may use:

| matchState | meaning | boundary |
|---|---|---|
| `matched` | available evidence appears to support the sample row direction | observation only, not final accident |
| `not_matched` | available evidence does not support the sample row direction | does not mean sample row is wrong |
| `unavailable_metric` | metric direction has no formal or observable runtime metric yet | expected while `triggerMetricDirection` is not registry |
| `missing_summary` | required summary container or value is absent | planning signal only |
| `skipped_draft_only` | row is skipped because source is draft / notApproved | safety status |
| `blocked_by_gate` | row cannot be considered because dangerous gates are not false or status is wrong | safety status |
| `needs_human_review` | comparison is ambiguous | review hint only |

Boundary:

- `matchState` is observation only.
- `matched` does not mean final accident.
- `not_matched` does not mean sample row is wrong.
- `unavailable_metric` is expected while `triggerMetricDirection` is not formal registry.
- `needs_human_review` does not create a task automatically.

## 5. Evidence Shape

Future evidence entries may include:

| field | purpose | boundary |
|---|---|---|
| `sourceLayer` | taste / texture / flavor / boundary layer | copied context only |
| `sourceSummary` | summary container read | read-only |
| `triggerMetricDirection` | planned direction from sample row | not official registry |
| `observedValueDraft` | observed numeric / qualitative value if available | shadow-only |
| `candidateId` | candidate evidence if present | existing observation only |
| `sampleRowId` | sample row link | not stable ID |
| `matchReason` | why evidence matched | explanation only |
| `missingReason` | why evidence was unavailable | explanation only |
| `notes` | human notes | not machine rule |

Boundary:

- `observedValueDraft` is shadow-only.
- It is not official threshold input.
- It cannot update source summary.
- It cannot update final score.
- It cannot backfill runtime fields.

## 6. Legacy Comparison Read Path

Future legacy comparison can read current final output as a snapshot:

- current legacy `score`
- current legacy `feedback`
- current legacy `accidentTypeId`
- current legacy `result.type`
- current `drinkTypeId` / `outcomeTypeId` / `feedbackTags` if present

Then it may compare shadow suggestion against that snapshot and write:

- `differenceSummary`
- `requiresHumanReview`
- `legacyAligned`
- `shadowOnlyNote`

Boundary:

- no automatic correction
- no golden update
- no issue creation
- no runtime change
- no final feedback replacement
- no final accident replacement

## 7. Hard Forbidden Read Paths

Future builder / planning must not:

- read report prose as runtime source
- read README prose as runtime source
- read `displayNameDraft` as key
- read `rowId` as stable ID
- read `proposedDraftId` as approved stable ID
- read `triggerMetricDirection` as official registry
- read sample CSV / JSON directly from browser runtime
- read `generatedSeverityShadow` back into final result
- write to core / data / generated / golden
- run `tasteJudge` inside validator
- let validator decide match state
- create allowed values from sample rows
- create registry candidates from shadow rows

## 8. Implementation Blockers Before Actual Builder

Before any real shadow builder implementation, a separate task must decide:

- exact input file: CSV or JSON
- whether builder runs in Node-only debug script or browser debug path
- how to pass current result snapshot
- how to find summary / candidate evidence
- what to do when `triggerMetricDirection` has no runtime metric
- output path, if any
- whether output is console, report, JSON, or attached to debug result
- how to ensure `affectsFinalResult=false`
- how to test no final output changes
- how to keep generated feedback shadow and generated severity shadow separate
- how to prevent shadow output from becoming golden expected source

These are implementation blockers, not read path planning blockers.

## 9. Recommended Next Step

The following are options, not commands:

### Option A: User + ChatGPT review this read path planning

Review whether the proposed input / read path is safe and enough to support future builder planning.

### Option B: Generated Severity Shadow Builder Planning

After read path review passes, plan the future builder's minimal responsibilities, inputs, outputs, and tests.

This option still does not implement builder.

### Option C: Read Path Field Tightening

If the read path feels too heavy, trim fields before builder planning.

Recommendation:

建议下一步先由用户 + ChatGPT review 本 read path planning。如果通过，再做 Generated Severity Shadow Builder Planning。不建议直接实现 builder。

