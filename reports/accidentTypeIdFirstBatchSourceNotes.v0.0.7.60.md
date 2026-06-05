# AccidentTypeId First-Batch Source Notes｜v0.0.7.60

## 0. Report Positioning

This report is a docs / report / source-notes artifact for the first small accidentTypeId candidate slice.

It only adds source notes, triggerMetric notes, evidence boundaries, and blocked examples for:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only records source notes for two first-batch candidate directions already identified in `reports/accidentTypeIdFirstBatchDecisionRecord.v0.0.7.59.md`.

Any entry into registry, validator, generated severity, partial takeover, active takeover, or runtime requires a later separate task.

```text
source notes != approved_stable
evidence boundary != registry entry
triggerMetric draft != validator input
player-facing copy != mechanism ID
```

## 1. Executive Summary

v0.0.7.60 keeps the first-batch accidentTypeId line narrow.

This round only processes:

- `taste_acid_overload`
- `texture_solid_overload`

Current source-note summary:

| accidentTypeId | human meaning | source note direction | current gate |
|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | taste-layer acid pressure, with acidic ingredients as evidence only | not approved |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 | texture-layer solid load / low liquid support, with toppings as evidence only | not approved |

`texture_low_drinkability` is not processed in this round except where it is needed as a boundary reference / Not This Round item. It still needs its own boundary notes before it can re-enter first-batch candidate discussion.

No registry, schema, validator, allowed values, generated severity, runtime, data, scripts, content sheets, or golden expected are changed by this report.

## 2. `taste_acid_overload` Source Notes

### Human Meaning

```text
酸爆了 / 酸度过载。
```

This ID describes taste-layer acid pressure. It should stay mechanism-level and should not be split by specific acidic ingredient, sample, player-facing joke, or severity.

### Source Fields Draft

| field | proposed source note |
|---|---|
| `sourceLayer` | `taste` |
| `sourceSummary` | `tasteSummary` |
| `triggerMetricDraft` | `acidity` / `acidLoad` / future `acidPressure` |
| `evidenceFamily` | acidic ingredient evidence plus tasteSummary acid-pressure evidence |

These fields are notes for later human review. They are not current registry fields and not validator input.

### Evidence Allowed

Allowed evidence examples:

- lemon / hawthorn / passionfruit / other acidic ingredients
- high acid ratios
- golden samples that intentionally protect acid overload behavior
- future `tasteSummary` acidity pressure evidence

Ingredient names can appear in evidence, notes, sample IDs, or player-facing feedback copy. They must not become part of `accidentTypeId`.

### Evidence Not Allowed

Do not split acid overload into ingredient-specific IDs:

```text
taste_acid_overload_lemon
hawthorn_acid_overload
passionfruit_acid_overload
```

Do not use sample identity, player copy, display name, or severity as mechanism identity:

```text
sampleId: extreme_lemon_accident
triggerMetric: "酸到灵魂出窍"
accidentTypeId: taste_acid_overload_high
```

Do not treat novelty / weirdness as acid overload. Sourness can be strange in a recipe, but novelty is not the same mechanism as acid pressure.

### Boundary Notes

- Distinct from flavor identity conflict: acid overload is taste pressure, not flavor identity mismatch.
- Distinct from novelty / weirdness: sour does not automatically mean experimental or strange.
- Distinct from bitterness / astringency: acid overload describes acid pressure only, not every sharp or stimulating taste.
- Distinct from feedbackTag: player copy may mention lemon, hawthorn, passionfruit, or "酸到灵魂出窍", but that copy is not the mechanism ID.

### Candidate Status

```text
decisionRecord: first_batch_candidate_pending_source_notes
approval: not approved
canEnterValidatorNow: no
canEnterGeneratedSeverityNow: no
canAffectRuntimeNow: no
```

Before any later registry decision, this ID still needs reviewed source notes, canonical triggerMetric wording, evidence refs, and a separate registry / schema task.

## 3. `texture_solid_overload` Source Notes

### Human Meaning

```text
小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足。
```

This ID describes a texture-layer solid-load mechanism. It should cover "there is too much solid content for the drink to remain drink-like" without creating one accident ID per topping.

### Source Fields Draft

| field | proposed source note |
|---|---|
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / structure texture summary |
| `triggerMetricDraft` | `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport` |
| `evidenceFamily` | topping / solid-load / low-liquid-support evidence |

These fields are notes for later human review. They are not current registry fields and not validator input.

### Evidence Allowed

Allowed evidence examples:

- pearl / taro ball / pudding / grass jelly / coconut jelly / similar topping evidence
- high solid or topping load
- low liquid support
- golden samples that intentionally protect solid overload behavior
- structure / texture summary evidence

Concrete topping names can stay in evidence, notes, sample IDs, and player-facing feedback copy. They must not split the mechanism ID.

### Evidence Not Allowed

Do not split solid overload into topping-specific IDs:

```text
texture_pearl_overload
texture_taro_ball_overload
texture_pudding_overload
texture_topping_specific_overload
```

Do not use player-facing copy as triggerMetric:

```text
triggerMetric: "八宝粥感"
triggerMetric: "吸管体能测试"
```

Do not classify every straw problem as `texture_solid_overload`. Straw pressure can be expression or evidence, but it is not automatically the mechanism.

Do not let historical `texture_topping_overload` return to current registry / validator / generated severity input.

### Historical Note

`texture_topping_overload` was migrated to `texture_solid_overload` in v0.0.7.49.

```text
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

The old ID remains evidence / migration history only. It must not enter current registry, validator, generated severity, partial takeover, active takeover, or runtime authority as a current accidentTypeId.

### Boundary Notes

- Distinct from `texture_low_drinkability`: `texture_solid_overload` is about solid load, too many toppings, and insufficient liquid support; `texture_low_drinkability` is about whole-drink low flow, paste, sediment, blockage, or "cannot drink" behavior.
- Distinct from `texture_straw_resistance`: straw pressure can be an expression or trigger evidence, but solid overload's core is solid content and liquid support.
- Distinct from topping-specific feedback copy: pearls, pudding, grass jelly, and "吸管体能测试" can appear in feedback copy / notes, not in `accidentTypeId`.

### Candidate Status

```text
decisionRecord: first_batch_candidate_pending_source_notes
approval: not approved
canEnterValidatorNow: no
canEnterGeneratedSeverityNow: no
canAffectRuntimeNow: no
```

Before any later registry decision, this ID still needs reviewed source notes, canonical triggerMetric wording, evidence refs, and a separate registry / schema task.

## 4. Shared Notes for First-Batch Candidates

- These notes do not approve registry entries.
- These notes are future registry evidence, not current allowed values.
- Source notes are meant to prevent a future validator from guessing by substring, prefix, ingredient name, or copy wording.
- Player-facing copy can stay colorful, but it cannot become `triggerMetric` or mechanism ID.
- Evidence examples can mention ingredients, but the ID must stay mechanism-level.
- `sourceLayer`, `sourceSummary`, and `triggerMetricDraft` in this report are review notes only until a later registry / schema task turns reviewed decisions into formal structure.

## 5. Not This Round

This round deliberately does not process:

- `texture_low_drinkability`
- final decision for `texture_straw_resistance`
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- feedbackTag
- candidate tag
- drinkStructure
- registry implementation
- validator
- allowed values
- generated severity
- shadow / partial / active takeover

These topics are not discarded and not solved. They are outside this single-line first-batch source-notes sync.

## 6. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.61｜first-batch accidentTypeId registry candidate notes record
```

The next slice should remain narrow and should only consolidate source-note evidence for:

- `taste_acid_overload`
- `texture_solid_overload`

Do not jump directly to validator. Do not generate allowed values. Do not build generated severity. Do not open shadow, partial takeover, or active takeover.

## 7. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- approve `taste_acid_overload`
- approve `texture_solid_overload`
- process `texture_low_drinkability`
- process `texture_straw_resistance`
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
