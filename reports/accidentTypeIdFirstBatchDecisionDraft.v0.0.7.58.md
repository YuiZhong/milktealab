# AccidentTypeId First-Batch Decision Draft｜v0.0.7.58

## 0. Report Positioning

This report is a docs / report / producer decision draft for the first small accidentTypeId slice.

It only turns the v0.0.7.55 review pack and v0.0.7.57 notes review into a human-readable decision draft for three likely-stable candidates:

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

This report does not approve any accidentTypeId. It does not mark any ID as `approved_stable`. It only proposes first-batch future registry candidate decisions for producer / ChatGPT review.

Final entry into any registry still requires a separate reviewed registry / schema task. All immediate gate fields remain hard `no`.

```text
decision draft != approval
future registry candidate != approved_stable
source notes != validator input
evidence != mechanism ID
historical migrated ID != current allowed value
```

## 1. Executive Summary

v0.0.7.58 is the first step from broad risk clearing toward narrow accidentTypeId closure.

This round does not expand the review surface. It only drafts first-batch decisions for the three strongest accident mechanisms already narrowed by v0.0.7.57:

| accidentTypeId | human meaning | draft direction |
|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | strong first-batch future registry candidate after source notes |
| `texture_low_drinkability` | 喝不动 / 水泥感 / 粉浆感 | important mechanism, but boundary notes must be tightened first |
| `texture_solid_overload` | 小料太多 / 八宝粥感 | strong first-batch future registry candidate after source notes |

The draft does not approve any ID. It only states what producer / ChatGPT should confirm before a later minimal registry candidate decision record.

## 2. Decision Draft Table

| accidentTypeId | humanMeaning | recommendedDecision | why | sourceLayerDraft | sourceSummaryDraft | triggerMetricDraft | evidenceAllowed | evidenceNotAllowed | boundaryNotes | remainingRequiredNotes | canEnterFutureRegistryCandidate | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow | producerDecisionNeeded | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `candidate_for_future_registry_after_notes` | Mechanism intuition is clear; sourceLayer is relatively clear; acidic ingredients can be evidence without splitting IDs. | `taste` | `tasteSummary` | `acidity` / `acidLoad` / future tasteSummary acid pressure metric | lemon, hawthorn, passionfruit, citrus, sour-fruit, future tasteSummary acid pressure evidence | one ID per sour ingredient; severity suffix; sampleId; player copy as ID | Taste pressure, not flavor identity conflict, novelty, feedbackTag, or severity. | Canonical triggerMetric wording; golden evidence refs; whether evidence should use ingredient IDs, profile tags, or tasteSummary metrics. | `draft_candidate_after_notes_only` | no | no | no | yes | Producer / ChatGPT confirms source notes and whether this may enter a later minimal registry candidate record. |
| `texture_low_drinkability` | 喝不动 / 水泥感 / 粉浆感 / 半固体 / 吸管难以处理 | `needs_boundary_notes_before_candidate` | Mechanism is important and already absorbs taro / Oreo migrations, but boundary is broad and overlaps straw resistance / solid overload. | `texture` | `textureSummary` / structure texture summary | `drinkabilityPenalty` / `strawResistance` / `pasteLoad` / `sediment` / `solidLoad` / future combined texture metric | taro paste, Oreo crumble, powder, sediment, thick paste, low flow, whole-drink straw difficulty | `texture_taro_overload`; `texture_oreo_overload`; taro / Oreo copy as ID; one ID per paste / sediment joke | Must stay distinct from `texture_straw_resistance` and `texture_solid_overload`; player copy can stay colorful without splitting ID. | Decide relation to `texture_straw_resistance`; choose canonical metric family; confirm append / suppression boundary with structure accidents; link migrated golden evidence refs. | `no_boundary_notes_first` | no | no | no | yes | Keep review-only until boundary notes are clear enough for a later registry candidate decision. |
| `texture_solid_overload` | 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足 | `candidate_for_future_registry_after_notes` | Mechanism intuition is clear; topping old ID has migrated here; source notes still need metric names and boundary against low drinkability. | `texture` | `textureSummary` / structure texture summary | `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport` | pearl, taro ball, pudding, grass jelly, coconut jelly, mixed toppings, low liquid support | `texture_topping_overload`; one ID per topping; "吸管体能测试" as ID | Solid load / low liquid support, not general low flow; topping names belong in evidence / notes / feedback copy. | Confirm metric naming; golden evidence refs; relation to `texture_low_drinkability`; whether straw pressure is evidence or separate mechanism. | `draft_candidate_after_notes_only` | no | no | no | yes | Producer / ChatGPT confirms source notes and whether this may enter a later minimal registry candidate record. |

## 3. Human Review Section

### `taste_acid_overload`

- Does "酸爆了" match producer intuition for this mechanism?
- Should acidic ingredients remain evidence only, without splitting IDs by lemon / hawthorn / passionfruit?
- Is `sourceLayer=taste` correct?
- Should the canonical triggerMetric be `acidity`, `acidLoad`, or a future tasteSummary acid pressure field?
- Can this become a first-batch future registry candidate after source notes are written?

### `texture_low_drinkability`

- Does "水泥感 / 粉浆感 / 喝不动" match producer intuition?
- Should this remain review-only until boundary notes are tighter?
- Should `texture_straw_resistance` remain a separate accidentTypeId, or become a triggerMetric / evidence under this broader mechanism?
- Is the boundary against `texture_solid_overload` clear enough?
- Are taro / Oreo migrated golden refs sufficient evidence, while old IDs stay historical only?

### `texture_solid_overload`

- Does "小料太多 / 八宝粥感" match producer intuition?
- Are solid load / texture ratio / liquid support enough to define the mechanism core?
- Should topping names stay in evidence / notes / feedback copy only?
- Is the boundary against `texture_low_drinkability` clear enough?
- Can this become a first-batch future registry candidate after source notes are written?

## 4. Blocked / Not This Round

This round deliberately does not process:

- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- final decision for `texture_straw_resistance`
- feedbackTag
- candidate tag
- drinkStructure
- validator
- generated severity
- shadow / partial / active takeover

These items are not gone and not solved. They are simply outside this single-line first-batch accidentTypeId decision draft.

`texture_taro_overload`, `texture_oreo_overload`, and `texture_topping_overload` also do not return as candidates in this report. They remain historical / pre-version legacy references only.

## 5. Suggested Outcome After Human Review

If producer / ChatGPT accepts this draft, the next step can be one of:

```text
minimal accidentTypeId registry candidate decision record
```

or:

```text
first registry candidate notes sync
```

That next step should still be docs / decision oriented. It should not directly implement validator, generate allowed values, build generated severity, or activate partial / runtime takeover.

Expected possible result after human review:

| accidentTypeId | possible post-review route |
|---|---|
| `taste_acid_overload` | Move to minimal registry candidate decision record after source notes are accepted. |
| `texture_low_drinkability` | Keep as review-only until boundary notes against straw resistance and solid overload are accepted. |
| `texture_solid_overload` | Move to minimal registry candidate decision record after source notes are accepted. |

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
- revive `texture_taro_overload`
- revive `texture_oreo_overload`
- revive `texture_topping_overload`
- process feedbackTag
- process drinkStructure
- process `flavor_durian_overload`
- process `dairy_fat_overload`
- process `industrial_creamer_overload`
- process `taste_strong_flavor_overload`
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
