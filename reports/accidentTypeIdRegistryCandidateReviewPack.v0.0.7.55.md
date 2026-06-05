# AccidentTypeId Registry Candidate Review Pack｜v0.0.7.55

## 0. Report Positioning

This report is a docs / report / review pack artifact for accidentTypeId registry candidates.

It turns current accidentTypeId observations, runtime review candidates, and historical migrated IDs into human-reviewable questions before any registry implementation begins.

It is not:

- a registry
- a schema
- an enum
- an allowed values list
- validator input
- generated data
- runtime source-of-truth

This report does not approve any accidentTypeId. It does not assign `approved_stable` to any ID. Every `canEnterFutureRegistryNow` value in this report is a hard `no`.

Core boundary:

```text
review pack item != approved registry entry
current runtime observed != approved stable
runtime_review_candidate != definite migration target
historical migrated ID != current allowed value
```

## 1. Executive Summary

Future severity / threshold work needs accidentTypeId to become a reviewed, explicit source-of-truth layer. That cannot start from string suffix guesses, collector output, sample rows, or raw runtime observation alone.

This v0.0.7.55 report only organizes accidentTypeId candidates for producer / ChatGPT review:

- current observed generalized IDs that may become future review candidates
- current runtime review candidates that still need sourceLayer / triggerMetric / producer decisions
- historical migrated texture old IDs that must stay historical only

The safe next step after this report is producer / ChatGPT decision work or likely-stable notes review, not direct validator implementation.

## 2. Review Status Legend

These statuses are local review-pack wording only. They are not final registry statuses, not enum values, and not validator values.

| review status | meaning | registry / validator meaning |
|---|---|---|
| `keep_candidate_for_review` | Keep the ID in the human review queue. | No approval. |
| `likely_approve_after_notes` | The ID looks promising if source notes and boundaries are pinned. | No approval yet. |
| `keep_runtime_legacy_with_notes` | Current legacy runtime behavior may remain, but needs source notes. | No approval yet. |
| `special_mechanism_candidate` | May be a deliberate special high-memory mechanism. | Requires producer review before any registry decision. |
| `split_review_needed` | The current name / source / metric may mix concepts. | Must not enter validator until split decision is made. |
| `historical_only` | Keep only as docs / migration history. | Block from current registry / validator / generated severity. |
| `blocked_from_current_registry` | Explicitly unsafe as a current allowed value. | Must not enter current source-of-truth. |
| `needs_producer_review` | Player-facing meaning or product semantics are unresolved. | Needs human decision. |
| `needs_sourceLayer_triggerMetric_review` | Source layer, source summary, or trigger metric is not sufficiently pinned. | Needs source notes before any future approval. |

## 3. Candidate Review Table

| id | currentStatusInProject | observedSources | proposedReviewStatus | sourceLayerQuestion | triggerMetricQuestion | producerQuestion | registryRisk | canEnterFutureRegistryNow | blockedFrom | recommendedNextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| `taste_acid_overload` | Current observed generic accidentTypeId. | runtime rules, golden evidence, generated feedback observation, candidate references, sample sheets | `likely_approve_after_notes` | Is `taste` the canonical sourceLayer? | Should the trigger metric be `acidity`, acid overload, or a future tasteSummary metric? | Confirm lemon / fruit evidence is evidence only, not ID split material. | Low to medium: mature-looking but still needs source notes. | no | validator, generated severity, approved registry | Add source notes and producer decision before registry work. |
| `texture_low_drinkability` | Current observed generalized texture accidentTypeId. | structure rules, migrated taro / Oreo branches, golden evidence, candidate references | `keep_candidate_for_review` | Is the sourceLayer strictly `texture` / structure? | Is the boundary drinkability, pasteLoad, sediment, solidLoad, strawResistance, or a combined metric? | Confirm whether low drinkability and straw resistance should remain separate. | Medium: useful generalized ID, but broad metric boundary. | no | validator, generated severity, approved registry | Review triggerMetric names and relation to `texture_straw_resistance`. |
| `texture_solid_overload` | Current observed generalized texture accidentTypeId. | structure rules, migrated topping branch, golden evidence, candidate references | `keep_candidate_for_review` | Is the sourceLayer `texture` or structure sublayer? | Should the canonical metric be `solidLoad`, `textureRatio`, or `liquidSupport`? | Confirm how solid overload differs from low drinkability. | Medium: generalized but needs source field boundaries. | no | validator, generated severity, approved registry | Review solid-load boundary and source notes. |
| `flavor_durian_overload` | Current runtime review candidate. | runtime rule, golden evidence, legacy inventory | `special_mechanism_candidate` | Is this a `flavor` special mechanism or broader aroma / identity pressure? | Is the trigger `aromaPressure`, identity pressure, novelty risk, or durian-specific evidence? | Decide whether durian is intentionally special enough to keep an ingredient-specific accidentTypeId. | High: can look like permission for one accident ID per ingredient. | no | validator, generated severity, approved registry | Producer / ChatGPT special-mechanism review. |
| `dairy_fat_overload` | Current runtime / draft / generated observed legacy ID. | accidentAnalyzer legacy branch, golden / generated feedback observations, sample sheets, legacy inventory | `needs_sourceLayer_triggerMetric_review` | Should sourceLayer be texture / mouthfeel / drinkability rather than dairy identity? | Should triggerMetric be `fatLoad`, greasy pressure, or heavy dairy load? | Confirm display type / note direction without letting `dairy_` prefix override source fields. | Medium: name can mislead sourceLayer. | no | validator, generated severity, approved registry | Add explicit source notes before any registry candidate approval. |
| `industrial_creamer_overload` | Current runtime review candidate. | accidentAnalyzer legacy branch, legacy inventory | `needs_producer_review` | Is sourceLayer flavor, ingredient identity, quality risk, or production quality? | Should triggerMetric be non-dairy creamer ratio / industrial identity mismatch? | Decide whether the subjective product-quality label should remain as accidentTypeId. | High: product-tone semantics need producer review. | no | validator, generated severity, approved registry | Producer review of label, source notes, and future naming direction. |
| `taste_strong_flavor_overload` | Current runtime review candidate. | accidentAnalyzer legacy branch, legacy inventory | `split_review_needed` | Does `taste_` mislead if the issue is flavor identity / aroma dominance? | Should this split into taste intensity versus flavor identity pressure? | Decide whether the current name is acceptable or needs future split / rename plan. | High: source layer and trigger metric are ambiguous. | no | validator, generated severity, approved registry | Split review before registry / severity work. |
| `texture_straw_resistance` | Current runtime / generated / golden observed legacy texture ID. | accidentAnalyzer legacy branch, summary candidate references, generated feedback, golden evidence, sample sheets | `keep_runtime_legacy_with_notes` | Is sourceLayer `texture` / structure? | Should triggerMetric be `strawResistance`, `solidLoad`, or `drinkability`? | Confirm whether it is mature enough once source notes and thresholds are pinned. | Medium: mature-looking but threshold provenance still needed. | no | validator, generated severity, approved registry | Add threshold provenance and source notes. |
| `texture_taro_overload` | Historical migrated old ID. | pre-v0.0.7.46 docs / reports only | `historical_only` + `blocked_from_current_registry` | Historical note only. | Historical taro paste evidence only. | No current registry review needed unless reviving it is proposed, which this report does not do. | High if revived: ingredient-specific old ID. | no | current registry, validator, generated severity, runtime takeover | Keep as historical / pre-v0.0.7.46 legacy reference only. |
| `texture_oreo_overload` | Historical migrated old ID. | pre-v0.0.7.47 docs / reports only | `historical_only` + `blocked_from_current_registry` | Historical note only. | Historical Oreo crumble evidence only. | No current registry review needed unless reviving it is proposed, which this report does not do. | High if revived: ingredient-specific old ID. | no | current registry, validator, generated severity, runtime takeover | Keep as historical / pre-v0.0.7.47 legacy reference only. |
| `texture_topping_overload` | Historical migrated old ID. | pre-v0.0.7.49 docs / reports only | `historical_only` + `blocked_from_current_registry` | Historical note only. | Historical topping ratio evidence only. | No current registry review needed unless reviving it is proposed, which this report does not do. | High if revived: content-specific old ID. | no | current registry, validator, generated severity, runtime takeover | Keep as historical / pre-v0.0.7.49 legacy reference only. |

## 4. Human Review Questions by ID

### `texture_low_drinkability`

- Is its mechanism boundary drinkability / pasteLoad / sediment / strawResistance as a combined texture result, or should those remain separate review concepts?
- Should it be the reviewed generalized target for taro and Oreo low-flow evidence?
- What source notes are required before it can become a future registry candidate?
- How should it differ from `texture_straw_resistance` when both can involve straw difficulty?

### `texture_solid_overload`

- How should it differ from `texture_low_drinkability` and `texture_straw_resistance`?
- Is topping / solid load / low liquid support enough to explain the mechanism?
- Should concrete topping names stay only in evidence / notes / feedback copy?
- What sourceSummary / triggerMetric names should be required before future approval?

### `taste_acid_overload`

- Is it mature enough to become a future generic accidentTypeId after source notes are added?
- Should lemon / hawthorn / passionfruit style evidence remain evidence only?
- Which source metric should future validator / severity rows require?

### `flavor_durian_overload`

- Is durian a special high-memory mechanism candidate worth retaining?
- If retained, how do we prevent it from becoming a template for one accidentTypeId per ingredient?
- Should its source be flavor identity, aroma pressure, novelty risk, or a producer-defined special case?
- Would a future rename be clearer, or would migration risk outweigh naming cleanup?

### `dairy_fat_overload`

- Should sourceLayer be pinned as texture / mouthfeel / drinkability rather than inferred from `dairy_`?
- Should triggerMetric be `fatLoad`, greasy pressure, or heavy dairy load?
- Should the legacy ID remain with strong notes, or should a future migration propose a more texture-oriented name?
- Which player-facing type / note language must stay copy-only rather than becoming mechanism identity?

### `industrial_creamer_overload`

- Is "industrial creamer" a product-quality mechanism, ingredient identity mismatch, or flavor problem?
- Does the subjective label require producer approval before any registry candidate status?
- Should the legacy ID be retained for its player-facing memory, or should a future naming plan separate mechanism from flavor copy?

### `taste_strong_flavor_overload`

- Does this ID mix taste intensity and flavor identity pressure?
- Does the `taste_` prefix mislead sourceLayer?
- Should the future review split strong taste overload from aroma / flavor identity dominance?
- What golden / feedback evidence would be needed before any migration plan?

### `texture_straw_resistance`

- Is it mature enough to become a future stable texture mechanism after source notes are added?
- Which legacy thresholds and append / suppression behaviors must be preserved?
- Should it remain separate from `texture_low_drinkability`, or become a trigger metric under a broader low drinkability mechanism?
- What threshold provenance is required before generated severity can reference it?

### Historical migrated texture old IDs

`texture_taro_overload`, `texture_oreo_overload`, and `texture_topping_overload` do not need review as current registry IDs.

They should remain:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

They are blocked from current registry, validator, generated severity, and runtime takeover decisions. If a future task proposes reviving any of them, that must be treated as a new high-risk product / migration decision, not as cleanup.

## 5. Recommended Grouping

These groupings are review planning buckets only. They are not final approval categories.

### 5.1 Likely stable after notes

- `taste_acid_overload`
- maybe `texture_low_drinkability`
- maybe `texture_solid_overload`

Required before approval:

- sourceLayer / sourceSummary / triggerMetric notes
- evidence boundaries
- producer / ChatGPT decision
- future registry / schema task

### 5.2 Runtime review / source notes

- `dairy_fat_overload`
- `texture_straw_resistance`

Required before approval:

- source notes
- threshold provenance
- clear boundary against player-facing copy

### 5.3 Special / producer review

- `flavor_durian_overload`
- `industrial_creamer_overload`

Required before approval:

- producer decision on whether the special label is intentional
- guardrail against multiplying one ID per ingredient
- player-facing meaning review

### 5.4 Split review

- `taste_strong_flavor_overload`

Required before approval:

- sourceLayer decision
- triggerMetric split decision
- migration / compatibility plan if renamed later

### 5.5 Historical only

- `texture_taro_overload`
- `texture_oreo_overload`
- `texture_topping_overload`

Required action:

- keep as historical migration references
- keep blocked from current registry / validator / generated severity
- do not revive without a separate explicit decision

## 6. Recommended Next Slice

Recommended next slice:

```text
v0.0.7.56｜accidentTypeId registry producer review decisions
```

Conservative alternative:

```text
v0.0.7.56｜accidentTypeId likely-stable notes review
```

Either route should stay docs / report / decision oriented first. Do not jump directly to validator implementation. Validator work still requires an explicit reviewed source-of-truth / registry / schema task.

## 7. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- approve `texture_low_drinkability` or `texture_solid_overload` as stable
- revive historical `texture_taro_overload`, `texture_oreo_overload`, or `texture_topping_overload`
- make `runtime_review_candidate` a definite migration target
- change runtime
- change data
- change content sheets
- change generated data
- change golden expected
- build generated severity
- create shadow output
- approve partial takeover
- approve active takeover
