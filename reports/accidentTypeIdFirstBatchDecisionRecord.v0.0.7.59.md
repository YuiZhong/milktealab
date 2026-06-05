# AccidentTypeId First-Batch Decision Record｜v0.0.7.59

## 0. Report Positioning

This report is a docs / report / decision-record artifact for the first small accidentTypeId slice.

It records the current human-readable decision direction after `reports/accidentTypeIdFirstBatchDecisionDraft.v0.0.7.58.md` for exactly three accidentTypeId candidates:

- `taste_acid_overload`
- `texture_low_drinkability`
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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only records the current first-batch future registry candidate direction for later source notes and producer / ChatGPT review.

Any entry into validator, generated severity, registry, or runtime requires a later separate task.

```text
decision record != approved_stable
future registry candidate direction != registry entry
source notes pending != validator input
evidence != mechanism ID
boundary-notes-needed != rejection
```

## 1. Executive Summary

v0.0.7.59 narrows the v0.0.7.58 decision draft into a clearer decision record.

- `taste_acid_overload`: can be treated as a first-batch future registry candidate after source notes are written.
- `texture_solid_overload`: can be treated as a first-batch future registry candidate after source notes are written.
- `texture_low_drinkability`: remains important, but does not enter the first batch yet because boundary notes are still too wide.

The record is deliberately conservative:

- no `approved_stable`
- no registry
- no schema
- no validator
- no allowed values
- no generated severity
- no runtime change

## 2. Decision Record Table

| accidentTypeId | humanMeaning | decisionRecord | reason | requiredBeforeRegistry | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `first_batch_candidate_pending_source_notes` | Mechanism intuition is clear; sourceLayer is basically `taste`; acidic ingredients can be evidence without splitting IDs. | sourceLayer note; triggerMetric note; golden evidence refs; note that sour ingredients are evidence only and must not split ID | no | no | no |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 | `first_batch_candidate_pending_source_notes` | Mechanism intuition is clear; topping migration and structure rule evidence point to a reusable solid-load mechanism. | sourceLayer note; `solidLoad` / `textureRatio` / `liquidSupport` triggerMetric note; boundary note against `texture_low_drinkability`; note that concrete toppings are evidence only and must not split ID | no | no | no |
| `texture_low_drinkability` | 喝不动 / 水泥感 / 粉浆感 / 低可饮用性 | `boundary_notes_required_before_first_batch_candidate` | Mechanism is important, but the boundary is still broad and overlaps `texture_straw_resistance` and `texture_solid_overload`. | relation note against `texture_straw_resistance`; boundary note against `texture_solid_overload`; `drinkabilityPenalty` / `pasteLoad` / `sediment` / `strawResistance` triggerMetric choice; note that historical taro / Oreo old IDs are evidence / migration history only | no | no | no |

## 3. Human-Readable Decision Summary

人类决策记录：

- “酸爆了”可以进入第一批 future registry candidate 方向，但还不能正式批准。
- “小料太多 / 八宝粥感”可以进入第一批 future registry candidate 方向，但还不能正式批准。
- “水泥感 / 喝不动”很重要，但要先把它和“吸管阻力”“固体太多”的边界写清楚；当前不进入第一批 candidate。

换句话说：

```text
taste_acid_overload       -> first-batch candidate direction, pending source notes
texture_solid_overload    -> first-batch candidate direction, pending source notes
texture_low_drinkability  -> boundary notes first, then revisit candidate decision
```

## 4. Not This Round

This round deliberately does not process:

- final decision for `texture_straw_resistance`
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- feedbackTag
- candidate tag
- drinkStructure
- validator
- generated severity
- shadow / partial / active takeover

These topics are not discarded and not solved. They are outside this single-line accidentTypeId first-batch decision record.

Historical texture old IDs also do not return as candidates:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They remain evidence / migration history only and must not enter current registry, validator, generated severity, or runtime takeover as current IDs.

## 5. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.60｜first-batch accidentTypeId source notes sync
```

Scope should remain narrow:

```text
taste_acid_overload
texture_solid_overload
```

The next slice should only add sourceLayer / sourceSummary / triggerMetric / evidence notes for those two first-batch candidate directions.

Do not jump directly to validator. Do not generate allowed values. Do not build generated severity. Do not open partial / active takeover.

`texture_low_drinkability` should wait for a separate boundary-notes slice before it can re-enter the first-batch candidate discussion.

## 6. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- approve `taste_acid_overload`
- approve `texture_low_drinkability`
- approve `texture_solid_overload`
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
- build generated severity
- create shadow output
- approve partial takeover
- approve active takeover
