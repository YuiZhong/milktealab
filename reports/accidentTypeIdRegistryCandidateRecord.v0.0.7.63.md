# AccidentTypeId Registry Candidate Record｜v0.0.7.63

## 0. Report Positioning

This report is a docs / report / candidate-record artifact for the first narrow accidentTypeId future registry slice.

It records exactly two first-batch future registry candidates:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only records that the two IDs have enough notes and gate evidence to be carried forward as first-batch future registry candidates in a later reviewed registry / schema task.

Any entry into validator, generated severity, registry implementation, partial takeover, active takeover, or runtime requires a later separate task.

```text
future registry candidate != approved_stable
candidate record != registry entry
candidate record != validator input
candidate record != allowed value
candidate record != generated severity input
```

## 1. Executive Summary

v0.0.7.63 keeps the accidentTypeId line intentionally narrow.

Current record:

- `taste_acid_overload`: first-batch future registry candidate, not approved.
- `texture_solid_overload`: first-batch future registry candidate, not approved.
- `texture_low_drinkability`: important, but not recorded as a candidate in this report because its boundary remains broader.

Human-readable meaning:

- `taste_acid_overload`: 酸爆了 / 酸度过载.
- `texture_solid_overload`: 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足.
- `texture_low_drinkability`: 水泥感 / 喝不动, still waiting for separate boundary notes before candidate record.

This report does not create registry / schema / validator / allowed values. It does not approve any ID for runtime, generated severity, partial takeover, or active takeover.

## 2. Candidate Record Table

| accidentTypeId | humanMeaning | candidateRecord | candidateReason | sourceLayer | sourceSummary | triggerMetricNotes | evidenceAllowed | evidenceBlocked | requiredBeforeApproval | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `first_batch_future_registry_candidate_not_approved` | Mechanism meaning is reusable; it is not ingredient-specific; sourceLayer / sourceSummary notes exist; evidence allowed / blocked has been recorded; minimal candidate gate passed in v0.0.7.62. | `taste` | `tasteSummary` | `acidity` / `acidLoad` / future `acidPressure`; final metric name still requires registry / schema review. | acidic ingredient evidence; high acid ratios; tasteSummary acid-pressure evidence; golden evidence refs later | ingredient-specific accident IDs; sampleId; displayName; player copy; severity suffix; novelty / weirdness as acid overload | final triggerMetric name; evidence refs / golden refs; producer / ChatGPT confirmation; reviewed registry / schema task | no | no | no |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足 | `first_batch_future_registry_candidate_not_approved` | Mechanism meaning is reusable; it is not topping-specific; sourceLayer / sourceSummary notes exist; evidence allowed / blocked has been recorded; minimal candidate gate passed in v0.0.7.62. | `texture` | `textureSummary` / structure texture summary | `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport`; final metric name still requires registry / schema review. | topping evidence; solid-load evidence; low-liquid-support evidence; structure / texture summary evidence; golden evidence refs later | topping-specific accident IDs; player copy as triggerMetric; every straw problem as solid overload; historical `texture_topping_overload` returning as current ID | final triggerMetric name; boundary notes; evidence refs / golden refs; producer / ChatGPT confirmation; reviewed registry / schema task | no | no | no |

Boundary notes for `texture_solid_overload`:

- It remains distinct from `texture_low_drinkability`.
- It remains distinct from `texture_straw_resistance`.
- Pearls, pudding, grass jelly, coconut jelly, "八宝粥感", and "吸管体能测试" can appear in evidence / notes / player-facing copy, but they must not split the mechanism ID.

## 3. Explicit Non-Candidate Items

### `texture_low_drinkability`

`texture_low_drinkability` is not included as a first-batch registry candidate in this report.

Reason:

- Its boundary still needs refinement with `texture_straw_resistance`.
- Its boundary still needs refinement with `texture_solid_overload`.
- It remains important and queued, but it is not part of this first-batch candidate record.
- It cannot borrow the v0.0.7.62 gate result for `texture_solid_overload`.

Current status in this report:

```text
candidateRecord: not_this_round
canEnterValidatorNow: no
canEnterGeneratedSeverityNow: no
canAffectRuntimeNow: no
```

### Historical texture old IDs

The following old IDs remain historical only:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They are:

- not current registry candidates
- not validator input
- not generated severity input
- not runtime authority
- not allowed values
- not current active accidentTypeIds

They may remain in reports / docs as migration history and evidence context only.

## 4. Human-Readable Summary

"酸爆了" now enters the first-batch future candidate list, but it does not have a formal approved ID card.

"八宝粥感 / 小料太多" now enters the first-batch future candidate list, but it does not have a formal approved ID card.

"水泥感 / 喝不动" is still important, but it does not enter the first batch yet because its boundary needs more work.

This round records candidates. It does not start the formal registry system.

## 5. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.64｜minimal accidentTypeId registry candidate source index
```

Suggested scope:

- create a docs / report layer evidence-source index for `taste_acid_overload`
- create a docs / report layer evidence-source index for `texture_solid_overload`
- keep `texture_low_drinkability` as Not This Round / boundary context
- do not create runtime registry
- do not create schema
- do not implement validator

More conservative alternative:

```text
v0.0.7.64｜first-batch registry candidate readiness review
```

Do not jump directly to validator.

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
- process `texture_low_drinkability`, except explicit non-candidate / Not This Round context
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
