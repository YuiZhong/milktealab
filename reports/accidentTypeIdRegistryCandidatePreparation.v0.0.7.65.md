# AccidentTypeId Registry Candidate Preparation｜v0.0.7.65

## 0. Report Positioning

This report is a docs / report / candidate-preparation artifact for the first narrow accidentTypeId future registry candidate slice.

It only prepares material for:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only organizes the already-recorded notes, gate evidence, candidate record, and source index for the two first-batch future registry candidates.

Any entry into validator, generated severity, registry implementation, partial takeover, active takeover, or runtime requires a later separate task.

```text
candidate preparation != approved_stable
candidate preparation != registry entry
candidate preparation != schema
candidate preparation != validator input
candidate preparation != allowed value
```

## 1. Executive Summary

v0.0.7.65 keeps the accidentTypeId line intentionally narrow and does not invent a new review workflow.

Current preparation summary:

- `taste_acid_overload`: first-batch future registry candidate material is ready for a later reviewed registry / schema task, but the ID is still not approved.
- `texture_solid_overload`: first-batch future registry candidate material is ready for a later reviewed registry / schema task, but the ID is still not approved.
- `texture_low_drinkability`: still not part of this preparation report except explicit exclusion / boundary context.

Human-readable meaning:

- "酸爆了 / 酸度过载" has enough prepared material for the next minimal registry / schema task, but still has no formal approved registry ID card.
- "小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足" has enough prepared material for the next minimal registry / schema task, but still has no formal approved registry ID card.
- "水泥感 / 喝不动" remains outside this round because its boundary still needs a separate notes task.

No registry, schema, validator, allowed values, generated severity, runtime, data, scripts, content sheets, or golden expected are changed by this report.

## 2. Preparation Table

| accidentTypeId | humanMeaning | candidateStatus | preparationStatus | readyInputs | stillMissing | nextGate | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `first_batch_future_registry_candidate_not_approved` | `candidate_preparation_ready_for_reviewed_registry_task_not_approval` | sourceLayer draft: `taste`; sourceSummary draft: `tasteSummary`; triggerMetric candidates: `acidity` / `acidLoad` / future `acidPressure`; evidence allowed / blocked notes; candidate gate passed in v0.0.7.62; source index readiness recorded in v0.0.7.64 | final triggerMetric name; explicit evidence refs / golden refs; producer / ChatGPT confirmation; reviewed registry / schema task | reviewed registry / schema task | no | no | no |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足 | `first_batch_future_registry_candidate_not_approved` | `candidate_preparation_ready_for_reviewed_registry_task_not_approval` | sourceLayer draft: `texture`; sourceSummary draft: `textureSummary` / structure texture summary; triggerMetric candidates: `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport`; evidence allowed / blocked notes; boundary notes against `texture_low_drinkability` and `texture_straw_resistance`; candidate gate passed in v0.0.7.62; source index readiness recorded in v0.0.7.64 | final triggerMetric name; explicit boundary note refs; explicit evidence refs / golden refs; producer / ChatGPT confirmation; reviewed registry / schema task | reviewed registry / schema task | no | no | no |

## 3. Preparation Summary

These two IDs do not need another review pack / sample pack / proposal pack before the next step.

What is ready:

- `taste_acid_overload` has candidate notes, source notes, minimal gate result, first-batch candidate record, and source index / readiness review.
- `texture_solid_overload` has candidate notes, source notes, minimal gate result, first-batch candidate record, and source index / readiness review.

What is still missing:

- final field confirmation inside a reviewed registry / schema task
- final triggerMetric naming
- explicit evidence refs / golden refs
- producer / ChatGPT confirmation

The next step is not to expand documentation again. The next step is a later reviewed registry / schema task that decides how these two prepared candidates would be represented if the project creates a minimal registry / schema.

## 4. Explicit Exclusions

This report deliberately does not process:

- `texture_low_drinkability`, except explicit exclusion / boundary context
- final decision for `texture_straw_resistance`
- feedbackTag
- candidate tag
- drinkStructure
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- registry implementation
- schema implementation
- validator
- allowed values
- generated severity
- shadow / partial / active takeover

`texture_low_drinkability` remains pending because its boundary with `texture_straw_resistance` and `texture_solid_overload` still needs separate boundary notes.

Historical texture old IDs remain historical only:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They are not current registry candidates, validator input, generated severity input, runtime authority, allowed values, or current active accidentTypeIds.

## 5. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.66｜minimal registry/schema task plan
```

Suggested scope:

- design how a minimal registry / schema task would receive `taste_acid_overload`
- design how a minimal registry / schema task would receive `texture_solid_overload`
- define the smallest reviewed fields needed for those two candidates
- keep `texture_low_drinkability` as Not This Round / boundary context
- do not implement a full registry
- do not implement validator
- do not generate allowed values
- do not build generated severity

Do not open another review pack / sample pack / proposal pack for these two IDs before this next slice. The previous v0.0.7.59-v0.0.7.64 chain is the review evidence this preparation report reuses.

## 6. What This Report Does NOT Do

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
- process drinkStructure
- process `flavor_durian_overload`
- process `dairy_fat_overload`
- process `industrial_creamer_overload`
- process `taste_strong_flavor_overload`
- revive `texture_taro_overload`
- revive `texture_oreo_overload`
- revive `texture_topping_overload`
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
