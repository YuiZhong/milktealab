# AccidentTypeId Registry Candidate Gate｜v0.0.7.62

## 0. Report Positioning

This report is a docs / report / gate-design artifact for the first narrow accidentTypeId registry-candidate slice.

It only defines the minimal gate that a first-batch candidate notes record should satisfy before a later task may record it as a future registry candidate.

This report only covers:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only defines a minimal gate for moving from `candidate_notes_recorded_not_approved` to a later future-registry-candidate record.

Any entry into validator, generated severity, registry implementation, partial takeover, active takeover, or runtime requires a later separate task.

```text
minimal gate design != approved_stable
passes_minimal_candidate_gate_with_notes != registry entry
candidate gate evidence != validator input
future registry candidate != allowed value
player-facing copy != triggerMetric
```

## 1. Executive Summary

`taste_acid_overload` and `texture_solid_overload` already have candidate notes records in `reports/accidentTypeIdFirstBatchCandidateNotesRecord.v0.0.7.61.md`.

This report defines the smallest review gate they must satisfy before a later task may record them as first-batch future registry candidates.

Current gate result:

| accidentTypeId | minimal gate result | meaning |
|---|---|---|
| `taste_acid_overload` | `passes_minimal_candidate_gate_with_notes` | Candidate notes are coherent enough to move to a future registry candidate record, but not approval. |
| `texture_solid_overload` | `passes_minimal_candidate_gate_with_notes` | Candidate notes are coherent enough to move to a future registry candidate record, but not approval. |

`texture_low_drinkability` does not enter this gate. It remains important, but it still needs boundary notes before it can re-enter first-batch candidate discussion.

This report designs the gate. It does not let any ID pass into validator, generated severity, allowed values, runtime, or `approved_stable`.

## 2. Minimal Gate Checklist

### Gate A｜Mechanism Meaning Is Reusable

The candidate must confirm that the mechanism is reusable.

Required checks:

- The mechanism is not a single ingredient.
- The mechanism is not a single recipe.
- The mechanism is not a player-facing copy joke.
- The mechanism is not a `sampleId`.
- The mechanism is not a severity band.
- The mechanism can be explained without adding ingredient-specific accidentTypeIds.

### Gate B｜sourceLayer / sourceSummary / triggerMetric Notes Exist

The candidate must already have source notes.

Required checks:

- `sourceLayer` has a draft.
- `sourceSummary` has a draft.
- `triggerMetric` has candidate names.
- `triggerMetric` is not guessed from ID prefix, displayName, zhCN, player copy, or notes.
- Any unresolved metric naming must remain explicitly unresolved.

### Gate C｜Evidence Allowed / Blocked Is Written Down

The candidate must separate mechanism identity from evidence.

Required checks:

- Allowed ingredient evidence is listed as evidence, not ID identity.
- Golden / runtime / summary evidence is listed as evidence, not approval.
- Blocked examples are explicit.
- Evidence cannot reverse-split the accidentTypeId.
- Historical old IDs do not return as current IDs.

### Gate D｜Boundary Notes Exist

The candidate must have at least minimal boundary notes.

Required checks:

- Adjacent mechanisms are named.
- The candidate says what it is not.
- Any unresolved boundary remains marked as unresolved.
- Unresolved boundary notes cannot be treated as solved final registry review.

### Gate E｜Hard No Gates Remain

The candidate must preserve hard no gates.

Required checks:

```text
approved_stable = false / not approved
canEnterValidatorNow = no
canEnterGeneratedSeverityNow = no
canAffectRuntimeNow = no
```

The gate result may only say whether a later future registry candidate record is reasonable. It cannot open validator, generated severity, runtime, allowed values, or partial / active takeover.

## 3. Candidate Gate Evaluation

### `taste_acid_overload`

Gate result:

```text
passes_minimal_candidate_gate_with_notes
```

Reasoning:

- Human-readable mechanism is clear: "酸爆了 / 酸度过载".
- Mechanism is reusable and not tied to lemon, hawthorn, passionfruit, a sample, a recipe, or a copy joke.
- `sourceLayer` note exists: `taste`.
- `sourceSummary` note exists: `tasteSummary`.
- `triggerMetric` candidates exist: `acidity` / `acidLoad` / future `acidPressure`.
- Evidence allowed / blocked notes exist.
- Ingredient-specific split examples are blocked.
- Boundary notes distinguish it from flavor identity conflict, novelty, bitterness / astringency, feedbackTag, and player-facing copy.

Still required before approval:

- Final triggerMetric name.
- Evidence refs / golden refs.
- Producer / ChatGPT confirmation.
- Later registry / schema task.

Hard gates:

```text
approved_stable = false / not approved
canEnterValidatorNow = no
canEnterGeneratedSeverityNow = no
canAffectRuntimeNow = no
```

### `texture_solid_overload`

Gate result:

```text
passes_minimal_candidate_gate_with_notes
```

Reasoning:

- Human-readable mechanism is clear: "小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足".
- Mechanism is reusable and not tied to pearl, pudding, grass jelly, a sample, a recipe, or a copy joke.
- `sourceLayer` note exists: `texture`.
- `sourceSummary` note exists: `textureSummary` / structure texture summary.
- `triggerMetric` candidates exist: `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport`.
- Evidence allowed / blocked notes exist.
- Topping-specific split examples are blocked.
- Historical `texture_topping_overload` is blocked from returning as current ID.
- Boundary notes distinguish it from `texture_low_drinkability`, `texture_straw_resistance`, and topping-specific feedback copy.

Still required before approval:

- Final triggerMetric name.
- Boundary note refinement with `texture_low_drinkability`.
- Boundary note refinement with `texture_straw_resistance`.
- Evidence refs / golden refs.
- Producer / ChatGPT confirmation.
- Later registry / schema task.

Hard gates:

```text
approved_stable = false / not approved
canEnterValidatorNow = no
canEnterGeneratedSeverityNow = no
canAffectRuntimeNow = no
```

## 4. Explicit Non-Pass Items

`texture_low_drinkability` does not pass this gate in this report because it is not in this report's gate scope.

Reason:

- It is important, but its boundary is still broad.
- It needs separate boundary notes against `texture_straw_resistance`.
- It needs separate boundary notes against `texture_solid_overload`.
- It cannot borrow the `texture_solid_overload` gate result.
- It cannot be advanced as a first-batch future registry candidate from this report.

Historical old texture IDs also remain non-pass / historical-only:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They must not return to current registry, validator, generated severity, partial takeover, active takeover, or runtime authority as current accidentTypeIds.

## 5. Human-Readable Summary

"酸爆了" has enough notes to pass the minimal candidate gate, but it has not received a formal ID card.

"八宝粥感 / 小料太多" has enough notes to pass the minimal candidate gate, but it has not received a formal ID card.

"水泥感 / 喝不动" has not passed this gate. It needs boundary notes first.

Passing this gate only means:

```text
This ID may be recorded later as a future registry candidate pending final registry / schema review.
```

It does not mean:

```text
approved_stable
validator-ready
generated-severity-ready
runtime-ready
allowed value
partial takeover approved
active takeover approved
```

## 6. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.63｜minimal accidentTypeId registry candidate record
```

Scope should remain narrow:

- `taste_acid_overload`
- `texture_solid_overload`

The next slice should only record these two IDs as first-batch future registry candidates pending final registry / schema task.

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
- approve `texture_low_drinkability`
- approve `texture_straw_resistance`
- process `texture_low_drinkability`, except explicit non-pass / boundary context
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
- let any ID enter validator
- let any ID enter generated severity
- let any ID affect runtime
- change runtime
- change data
- change scripts
- change generated data
- change content sheets
- change golden expected
- create shadow output
- approve partial takeover
- approve active takeover
