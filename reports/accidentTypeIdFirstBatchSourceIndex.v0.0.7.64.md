# AccidentTypeId First-Batch Source Index｜v0.0.7.64

## 0. Report Positioning

This report is a docs / report / source-index and readiness-review artifact for the first narrow accidentTypeId future registry candidate slice.

It only indexes source notes, evidence notes, boundary notes, missing materials, and readiness state for:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only summarizes whether the two first-batch future registry candidates have enough documented material to enter a later minimal registry candidate preparation task.

Any entry into validator, generated severity, registry implementation, partial takeover, active takeover, or runtime requires a later separate task.

```text
source index != approved_stable
readiness review != registry entry
readiness review != schema
readiness review != validator input
readiness review != allowed values
```

## 1. Executive Summary

v0.0.7.64 keeps the accidentTypeId line intentionally narrow.

Current readiness summary:

- `taste_acid_overload`: source notes and boundaries are coherent enough for a later minimal registry candidate preparation task, but the ID is still not approved.
- `texture_solid_overload`: source notes and boundaries are coherent enough for a later minimal registry candidate preparation task, but the ID is still not approved.
- `texture_low_drinkability`: still not part of this source index except explicit exclusion / boundary context.

Human-readable meaning:

- "酸爆了" has enough source material to prepare the next minimal candidate bundle, but still has no formal approved registry ID card.
- "八宝粥感 / 小料太多" has enough source material to prepare the next minimal candidate bundle, but still has no formal approved registry ID card.
- "水泥感 / 喝不动" still needs boundary work and remains outside this round.

No registry, schema, validator, allowed values, generated severity, runtime, data, scripts, content sheets, or golden expected are changed by this report.

## 2. Source Index Table

| accidentTypeId | humanMeaning | candidateRecord | sourceNotesAvailable | evidenceAvailable | boundaryNotesAvailable | stillMissing | readiness | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `first_batch_future_registry_candidate_not_approved` | `sourceLayer=taste`; `sourceSummary=tasteSummary`; triggerMetric candidates: `acidity` / `acidLoad` / future `acidPressure` | acidic ingredient evidence; high acid ratios; future tasteSummary acid-pressure evidence; golden refs still need explicit linking | not flavor identity conflict; not novelty / weirdness; not bitterness / astringency; not feedbackTag; player copy is not mechanism identity | final triggerMetric name; explicit evidence refs / golden refs; producer / ChatGPT confirmation; later reviewed registry / schema task | `ready_for_minimal_registry_candidate_preparation_not_approval` | no | no | no |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足 | `first_batch_future_registry_candidate_not_approved` | `sourceLayer=texture`; `sourceSummary=textureSummary / structure texture summary`; triggerMetric candidates: `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport` | topping evidence; solid-load evidence; low-liquid-support evidence; structure / texture summary evidence; golden refs still need explicit linking | not `texture_low_drinkability`; not `texture_straw_resistance`; not topping-specific accident ID; historical `texture_topping_overload` does not return | final triggerMetric name; explicit boundary note with `texture_low_drinkability`; explicit boundary note with `texture_straw_resistance`; explicit evidence refs / golden refs; producer / ChatGPT confirmation; later reviewed registry / schema task | `ready_for_minimal_registry_candidate_preparation_not_approval` | no | no | no |

## 3. Missing Evidence / Notes Checklist

Before either ID can move beyond preparation, the project still needs:

- explicit golden sample references
- explicit evidence references from runtime / reports / source notes
- final triggerMetric naming decision
- producer / ChatGPT confirmation
- later reviewed registry / schema task
- no validator until a reviewed registry / schema exists

Per-ID missing material:

- `taste_acid_overload`
  - final triggerMetric name: `acidity` / `acidLoad` / `acidPressure` still needs review.
  - golden refs still need explicit linking.
  - acidic ingredient evidence must stay evidence, not ID identity.
- `texture_solid_overload`
  - final triggerMetric name: `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport` still needs review.
  - explicit boundary notes with `texture_low_drinkability` and `texture_straw_resistance` still need final wording.
  - topping evidence must stay evidence, not topping-specific accidentTypeId.

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

`texture_low_drinkability` remains pending because its boundary with `texture_straw_resistance` and `texture_solid_overload` is still broader than this first-batch source index.

Historical texture old IDs remain historical only:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They are not current registry candidates, validator input, generated severity input, runtime authority, allowed values, or current active accidentTypeIds.

## 5. Human-Readable Summary

"酸爆了" 的材料已经够整齐，可以准备进入下一步最小候选材料整理，但还没有正式批准。

"八宝粥感 / 小料太多" 的材料已经够整齐，可以准备进入下一步最小候选材料整理，但还没有正式批准。

"水泥感 / 喝不动" 仍然缺边界，不在本轮。

The next step is still not validator. The next step is to turn these two readiness rows into a minimal registry candidate preparation artifact that a human / ChatGPT can review before any real registry / schema task exists.

## 6. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.65｜minimal accidentTypeId registry candidate preparation
```

Suggested scope:

- prepare a minimal candidate bundle for `taste_acid_overload`
- prepare a minimal candidate bundle for `texture_solid_overload`
- keep `texture_low_drinkability` as Not This Round / boundary context
- do not create registry
- do not create schema
- do not implement validator
- do not generate allowed values

Do not jump directly to validator.

## 7. What This Report Does NOT Do

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
