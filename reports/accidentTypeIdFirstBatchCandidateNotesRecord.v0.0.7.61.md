# AccidentTypeId First-Batch Candidate Notes Record｜v0.0.7.61

## 0. Report Positioning

This report is a docs / report / candidate-notes record for the first narrow accidentTypeId slice.

It consolidates the v0.0.7.60 source notes into reviewable candidate notes for exactly two accidentTypeIds:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only records candidate notes that may be used by a later human / ChatGPT review task before any future registry / schema decision.

Any entry into registry, validator, generated severity, partial takeover, active takeover, or runtime requires a later separate task.

```text
candidate notes recorded != approved_stable
candidate notes record != registry entry
source notes != validator input
evidence != mechanism ID
player-facing copy != triggerMetric
```

## 1. Executive Summary

v0.0.7.61 keeps the first-batch accidentTypeId line narrow.

This round only processes:

- `taste_acid_overload`
- `texture_solid_overload`

Both are recorded as:

```text
candidateRecordStatus: candidate_notes_recorded_not_approved
```

This means the source notes are now collected enough for a later first-batch registry candidate gate design, but the IDs are still not approved, not stable, and not usable by validator / generated severity / runtime from this report.

`texture_low_drinkability` remains important, but it is not processed in this round except as a boundary / Not This Round reference. It still needs its own boundary notes before it can re-enter first-batch candidate discussion.

No registry, schema, validator, allowed values, generated severity, runtime, data, scripts, content sheets, or golden expected are changed by this report.

## 2. Candidate Notes Record Table

| accidentTypeId | humanMeaning | candidateRecordStatus | sourceLayer | sourceSummary | triggerMetricNotes | evidenceAllowed | evidenceBlocked | boundaryNotes | requiredBeforeApproval | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `candidate_notes_recorded_not_approved` | `taste` | `tasteSummary` | Current notes use `acidity` / `acidLoad`; future canonical metric may be `acidPressure`, but the final triggerMetric name still needs registry / schema review. | lemon / hawthorn / passionfruit / other acidic ingredient evidence; high acid ratios; future tasteSummary acid-pressure evidence; golden samples that protect acid overload behavior | ingredient-specific accident IDs such as `taste_acid_overload_lemon` / `hawthorn_acid_overload`; sampleId / displayName / player copy as mechanism identity; severity suffixes such as `taste_acid_overload_high`; novelty / weirdness as acid overload | Acid overload is taste pressure, not flavor identity conflict, novelty, bitterness, astringency, feedbackTag, or player-facing copy. Sour ingredients can explain the accident but must not split the ID. | final sourceLayer note; final triggerMetric name; evidence refs / golden refs; producer / ChatGPT confirmation; later registry / schema task | no | no | no |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足 | `candidate_notes_recorded_not_approved` | `texture` | `textureSummary` / structure texture summary | Current notes use `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport`; final triggerMetric wording still needs registry / schema review. | pearl / taro ball / pudding / grass jelly / coconut jelly / similar topping evidence; high solid or topping load; low liquid support; structure / texture summary evidence; golden samples that protect solid overload behavior | topping-specific accident IDs such as `texture_pearl_overload` / `texture_taro_ball_overload` / `texture_pudding_overload` / `texture_topping_specific_overload`; player copy such as "八宝粥感" or "吸管体能测试" as triggerMetric; historical `texture_topping_overload` returning as current ID | Solid overload is about solid content and liquid support. It remains distinct from `texture_low_drinkability` and `texture_straw_resistance`; concrete topping names can appear in evidence / notes / feedback copy, not in `accidentTypeId`. | final sourceLayer note; final triggerMetric name; boundary note with `texture_low_drinkability` and `texture_straw_resistance`; evidence refs / golden refs; producer / ChatGPT confirmation; later registry / schema task | no | no | no |

## 3. Human-Readable Summary

For `taste_acid_overload`:

```text
"酸爆了" can be kept as a first-batch future registry candidate note.
It is taste-layer acid pressure.
Lemon / hawthorn / passionfruit can explain why it happened.
They must not become separate accidentTypeIds.
```

For `texture_solid_overload`:

```text
"小料太多 / 八宝粥感" can be kept as a first-batch future registry candidate note.
It is texture-layer solid load / low liquid support.
Pearls, pudding, grass jelly, coconut jelly, and similar toppings can explain why it happened.
They must not become separate accidentTypeIds.
```

For `texture_low_drinkability`:

```text
"水泥感 / 喝不动" is still important, but not this round.
It needs separate boundary notes against `texture_straw_resistance` and `texture_solid_overload`.
```

This report records the next small piece of review evidence. It does not start the full registry, does not approve the IDs, and does not unlock validator work.

## 4. Not This Round

This round deliberately does not process:

- `texture_low_drinkability`, except as boundary / Not This Round reference
- final decision for `texture_straw_resistance`
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- feedbackTag
- candidate tag
- drinkStructure
- registry implementation
- schema implementation
- validator
- allowed values
- generated severity
- shadow / partial / active takeover

Historical texture old IDs also do not return as candidates:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They remain evidence / migration history only and must not enter current registry, validator, generated severity, partial takeover, active takeover, or runtime authority as current IDs.

## 5. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.62｜minimal accidentTypeId registry candidate gate design
```

That next slice should design how a narrow candidate-notes record may later become a reviewed registry candidate gate.

It should still not:

- create the actual registry file
- create allowed values
- implement validator
- build generated severity
- touch runtime
- approve partial / active takeover

## 6. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- generate allowed values
- implement a validator
- create validator input
- build generated severity
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- approve `taste_acid_overload`
- approve `texture_solid_overload`
- process `texture_low_drinkability`, except boundary / Not This Round references
- approve `texture_low_drinkability`
- approve `texture_straw_resistance`
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
- create shadow output
- approve partial takeover
- approve active takeover
