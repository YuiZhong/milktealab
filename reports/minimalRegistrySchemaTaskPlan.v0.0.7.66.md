# Minimal Registry / Schema Task Plan｜v0.0.7.66

## 0. Report Positioning

This report is a docs / report / task-plan and implementation-boundary artifact.

It defines how a future reviewed registry / schema task may receive the two already-prepared first-batch accidentTypeId candidates:

- `taste_acid_overload`
- `texture_solid_overload`

This report is not:

- a registry
- a schema
- an enum
- an allowed values list
- validator input
- generated severity data
- runtime data
- runtime source-of-truth

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`.

It only defines the future minimal registry / schema task scope, candidate intake requirements, expected output boundary, forbidden scope, and validation boundary.

```text
task plan != registry
task plan != schema
task plan != validator
task plan != allowed values
task plan != approved_stable
```

## 1. Executive Summary

v0.0.7.66 keeps the accidentTypeId line intentionally narrow and turns v0.0.7.65 preparation into a minimal future task plan.

Current planning summary:

- `taste_acid_overload` and `texture_solid_overload` have enough recorded material to enter a future reviewed registry / schema task plan.
- The next step for these two IDs should not be another review pack / sample pack / proposal pack.
- A future minimal registry / schema task should receive only these two candidates.
- `texture_low_drinkability` remains outside this slice except explicit exclusion / boundary context.
- validator, generated severity, runtime, shadow, partial takeover, and active takeover remain outside this slice.

Human-readable meaning:

- "酸爆了 / 酸度过载" may be carried into a future reviewed registry / schema task, but still has no approved stable ID card.
- "小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足" may be carried into a future reviewed registry / schema task, but still has no approved stable ID card.
- "水泥感 / 喝不动" remains Not This Round because its boundary still needs separate review.

No registry, schema, validator, allowed values, generated severity, runtime, data, scripts, content sheets, or golden expected are changed by this report.

## 2. Minimal Scope

### Included

- `taste_acid_overload`
- `texture_solid_overload`

### Explicitly Excluded

- `texture_low_drinkability`
- final decision for `texture_straw_resistance`
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- feedbackTag
- candidateTag
- outcomeTypeId
- drinkStructure
- generated severity
- validator implementation
- runtime takeover

The explicit exclusions must stay exclusions in the future minimal registry / schema task unless a separate user / ChatGPT task changes that scope.

## 3. Candidate Intake Requirements

A future reviewed registry / schema task must not receive a loose string ID. It should only receive an accidentTypeId candidate when the following material exists:

- candidate record
- source notes
- source index / readiness review
- preparation status
- sourceLayer draft
- sourceSummary draft
- triggerMetric candidates
- evidence allowed / blocked notes
- boundary notes
- explicit `not approved` state
- hard no gates:
  - `canEnterValidatorNow = no`
  - `canEnterGeneratedSeverityNow = no`
  - `canAffectRuntimeNow = no`

### `taste_acid_overload`

Already available:

- candidate record
- sourceLayer draft: `taste`
- sourceSummary draft: `tasteSummary`
- triggerMetric candidates: `acidity` / `acidLoad` / future `acidPressure`
- evidence allowed / blocked notes
- readiness: `ready_for_minimal_registry_candidate_preparation_not_approval`
- preparationStatus: `candidate_preparation_ready_for_reviewed_registry_task_not_approval`

Still missing before any approval:

- final triggerMetric name
- explicit evidence refs / golden refs
- producer / ChatGPT confirmation
- future registry / schema representation decision

Hard gates remain:

```text
approved_stable = false / not approved
canEnterValidatorNow = no
canEnterGeneratedSeverityNow = no
canAffectRuntimeNow = no
```

### `texture_solid_overload`

Already available:

- candidate record
- sourceLayer draft: `texture`
- sourceSummary draft: `textureSummary` / structure texture summary
- triggerMetric candidates: `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport`
- evidence allowed / blocked notes
- boundary notes against `texture_low_drinkability` / `texture_straw_resistance`
- readiness: `ready_for_minimal_registry_candidate_preparation_not_approval`
- preparationStatus: `candidate_preparation_ready_for_reviewed_registry_task_not_approval`

Still missing before any approval:

- final triggerMetric name
- explicit evidence refs / golden refs
- producer / ChatGPT confirmation
- future registry / schema representation decision

Hard gates remain:

```text
approved_stable = false / not approved
canEnterValidatorNow = no
canEnterGeneratedSeverityNow = no
canAffectRuntimeNow = no
```

## 4. Future Registry / Schema Task Shape

A future implementation task may consider creating artifacts such as:

```text
data/idRegistry.js
data/stableIdRegistry.js
data/schema/stableIds.schema.json
scripts/content/checkStableIdRegistry.js
```

This report does not decide final file names and does not create those files.

Hard boundaries:

- Do not create any registry file in this report.
- Do not create any schema file in this report.
- Do not generate allowed values from this report.
- Do not let collector output directly become registry.
- Do not treat docs / reports as runtime source-of-truth.

Future minimal fields may include:

- `id`
- `idFamily: accidentTypeId`
- `status`
- `humanMeaning`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `evidenceNotes`
- `blockedEvidence`
- `boundaryNotes`
- `historicalLinks`
- `canEnterValidator`
- `canEnterGeneratedSeverity`
- `canAffectRuntime`
- `reviewNotes`

This is a future shape sketch, not a current schema.

## 5. Gate From Candidate Preparation To Registry Task

The future reviewed registry / schema task should require these gates before accepting a candidate:

- Gate 1: candidate is in a first-batch candidate record.
- Gate 2: source notes exist.
- Gate 3: source index / readiness review exists.
- Gate 4: preparation status exists.
- Gate 5: no unresolved inclusion blocker exists for the current slice.
- Gate 6: explicit exclusions are preserved.
- Gate 7: the future task still starts as reviewed registry / schema, not validator.

Gate result for this plan:

- `taste_acid_overload` can enter future registry / schema task planning, still not approval.
- `texture_solid_overload` can enter future registry / schema task planning, still not approval.
- `texture_low_drinkability` cannot borrow this plan to enter the first-batch registry / schema task.

## 6. Validator Boundary

Future validator can only read reviewed registry / schema.

Future validator must not read:

- this report as allowed values
- collector output as allowed values
- sample sheets as approval
- generated observations as approval
- docs prose as registry
- review pack / sample pack / proposal pack rows as approved stable IDs

This report does not enable validator.

Any validator task must be separate and later, after a reviewed registry / schema exists.

## 7. Anti-Bloat Rule

Do not create another review pack / sample pack / proposal pack for `taste_acid_overload` and `texture_solid_overload` before registry / schema task planning.

Use existing records:

- decision record
- source notes
- candidate notes record
- minimal gate
- candidate record
- source index / readiness review
- candidate preparation

If new information is needed, add it to the future registry / schema task plan or task specification. Do not create another parallel review system for these two IDs.

This stage is about reducing process bloat, not adding more document layers.

## 8. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.67｜minimal accidentTypeId registry/schema task specification
```

Suggested scope:

- design the concrete implementation task specification for the minimal registry / schema slice
- define exact candidate input rows for `taste_acid_overload`
- define exact candidate input rows for `texture_solid_overload`
- decide proposed file names, fields, tests, and forbidden scope
- still do not implement validator
- still do not generate allowed values
- still do not let any ID enter generated severity or runtime

## 9. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- let any ID enter validator
- let any ID enter generated severity
- let any ID affect runtime
- process `texture_low_drinkability`, except explicit exclusion / boundary context
- process final decision for `texture_straw_resistance`
- process feedbackTag
- process candidate tag
- process outcomeTypeId
- process drinkStructure
- process `flavor_durian_overload`
- process `dairy_fat_overload`
- process `industrial_creamer_overload`
- process `taste_strong_flavor_overload`
- revive `texture_taro_overload`
- revive `texture_oreo_overload`
- revive `texture_topping_overload`
- create another review pack / sample pack / proposal pack for the two included IDs
- change runtime
- change data
- change scripts
- change generated data
- change content sheets
- change golden expected
- build generated severity
- create shadow output
- approve partial takeover
- approve active takeover
