# FeedbackTag / Candidate Tag Registry Candidate Review Pack｜v0.0.7.56

## 0. Report Positioning

This report is a docs / report / review pack artifact for feedbackTag, candidate tag, risk tag, copy direction, and outcomeTypeId boundary review.

It turns current observed tag evidence into human-reviewable questions before any feedbackTag registry, schema, validator, allowed values list, generated feedback takeover, generated severity work, or runtime change begins.

It is not:

- a registry
- a schema
- an enum
- an allowed values list
- validator input
- generated feedback data
- generated severity data
- runtime source-of-truth

This report does not approve any feedbackTag, candidateTag, risk tag, copy direction, or outcomeTypeId. Every `canEnterFeedbackTagRegistryNow` and `canBeUsedBySeverityNow` value in this report is a hard `no`.

All review rows in this report are not approved decisions; they are questions and gate reminders for later producer / ChatGPT review.

Core boundary:

```text
review pack item != approved registry entry
runtime observed feedbackTag != future reviewed feedbackTag
generated / shadow tag != runtime-ready feedbackTag
candidate / risk tag != runtime feedbackTag
outcomeTypeId != feedbackTag
```

## 1. Executive Summary

Feedback tags are high-risk because they sit near generated feedback, severity / threshold rows, player-facing copy, and future registry / validator work.

This v0.0.7.56 report only organizes tag-like values into a review pack:

- runtime observed feedbackTags that need producer copy review before future registry use
- generated / shadow observed feedbackTags that prove content-pipeline shape, not active readiness
- candidate / risk tags that must stay out of player feedback fields until reviewed
- copy direction candidates that may become player-facing later, but are not tags yet
- outcomeTypeId values that must not be collapsed into feedbackTag

The safe next step after this report is producer / ChatGPT decision work around runtime feedbackTag notes or feedbackTag review decisions, not direct validator implementation, generated feedback active takeover, generated severity, or partial takeover.

## 2. Tag Layer Legend

These layer names are local review-pack wording only. They are not final registry statuses, not enum values, and not validator values.

| review layer | meaning | registry / validator meaning |
|---|---|---|
| `runtime_observed_feedbackTag` | Tag is observable in current runtime feedback pools. | Evidence only; no future registry approval. |
| `generated_observed_feedbackTag` | Tag is observable in content sheet / generated feedback data. | Shadow / pipeline evidence only; no active runtime readiness. |
| `candidate_risk_tag` | Tag is observable in summary candidate / risk / rule-side logic. | Not a runtime feedbackTag. |
| `copy_direction_candidate` | Human-readable future copy direction may exist, but tag identity is not registered. | Needs producer copy review before any tag decision. |
| `outcomeTypeId_not_feedbackTag` | Value belongs to outcome layer. | Must not enter feedbackTag registry. |
| `sample_draft_tag` | Tag appears in disabled sample / draft field. | Draft evidence only; not source-of-truth. |
| `blocked_as_feedbackTag` | Unsafe to treat as feedbackTag in current state. | Must not enter registry / validator / severity fields. |
| `needs_producer_copy_review` | Player-facing meaning is unresolved. | Human decision required before future use. |
| `needs_copy_pool_expansion` | Current copy pool is thin or narrow. | Blocks partial / active takeover. |
| `needs_mapping_review` | Same string or related string appears across layers. | Must be split before registry / validator work. |

## 3. Candidate Review Table

| tagOrId | currentLayer | observedSources | proposedReviewStatus | playerFacingMeaning | copyPoolRisk | registryRisk | canEnterFeedbackTagRegistryNow | canBeUsedBySeverityNow | blockedFrom | producerQuestion | recommendedNextAction |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `bubble_conflict` | `runtime_observed_feedbackTag`; `generated_observed_feedbackTag` | runtime feedback pool, generated / sample feedback, golden observations, feedbackTag mapping docs | `needs_mapping_review` + `needs_producer_copy_review` | Narrow bubble + thick / mouthfeel conflict follow-up. | Medium: existing direction is narrow and may need more copy if expanded. | High if generalized into flavor identity conflict. | no | no | generic flavor identity conflict mapping, validator, generated severity, active takeover | Should this remain only bubble + thick / mouthfeel conflict? | Keep narrow; add producer notes before any future registry decision. |
| `greasy_overload` | `runtime_observed_feedbackTag`; `generated_observed_feedbackTag`; candidate overlap | runtime feedback pool, generated / sample feedback, golden observations, summary candidate overlap | `needs_producer_copy_review` + `needs_copy_pool_expansion` | Greasy / fat-load / heavy mouthfeel overload. | Medium: may be tied too tightly to dairy / fat evidence. | Medium: same string crosses runtime, generated, and candidate-like evidence. | no | no | validator, severity feedbackTag field, generated feedback active takeover | Is this a reviewed mouthfeel feedbackTag, and what source notes prevent overuse? | Review copy-pool thickness and sourceLayer notes. |
| `straw_disaster` | `runtime_observed_feedbackTag`; `generated_observed_feedbackTag`; candidate overlap | runtime feedback pool, generated / sample feedback, golden observations, summary candidate overlap | `needs_producer_copy_review` + `needs_copy_pool_expansion` | Straw / drinkability failure copy direction. | Medium: strong tone may become repetitive if used broadly. | Medium: should not become a texture accidentTypeId. | no | no | validator, severity feedbackTag field, generated feedback active takeover | Should this stay narrow to straw / drinkability disaster? | Review relation to `texture_straw_resistance` and `texture_low_drinkability`. |
| `straw_followup` | `runtime_observed_feedbackTag` | runtime feedback pool | `needs_producer_copy_review` | Follow-up copy around straw difficulty. | High: follow-up pool may be thin and context-dependent. | Medium: can be confused with accident mechanism. | no | no | validator, severity feedbackTag field, generated feedback active takeover | Should this remain follow-up copy only, separate from primary accident tags? | Keep as follow-up review item; do not use as severity tag yet. |
| `aroma_pressure` | `candidate_risk_tag`; `copy_direction_candidate` | summary candidate / risk observations, source-of-truth docs, prior candidate severity notes | `blocked_as_feedbackTag` + `needs_producer_copy_review` | Possible future "aroma pressure" copy direction. | High: no runtime copy pool exists. | High: often mistaken for runtime feedbackTag. | no | no | feedbackTag registry, severity feedbackTag field, generated feedback data, runtime copy selection | Should this ever become player-visible copy, or stay machine-only? | Keep candidate / risk only until separate producer review. |
| `identity_conflict` | `candidate_risk_tag`; `copy_direction_candidate` | summary candidate / risk observations, feedback mapping docs, decision split reports | `blocked_as_feedbackTag` + `needs_mapping_review` | Flavor identity conflict evidence, not player feedback tag yet. | High: can be confused with `flavor_identity_conflict` or `bubble_conflict`. | High: wrong-layer collision with outcomeTypeId and runtime tag. | no | no | feedbackTag registry, outcome registry, validator, generated feedback active takeover | Should future player copy have a separate identity-conflict tag, and what should it be called? | Keep candidate-only; do not map to `bubble_conflict`. |
| `low_beverage_fit` | `candidate_risk_tag`; rule-side semantics | summary candidate, structure rule / source docs | `copy_direction_candidate` + `needs_producer_copy_review` | Beverage-fit risk: recipe may not feel like a drink. | High: machine phrase needs human rewrite. | Medium: can be mistaken for a player feedbackTag. | no | no | feedbackTag registry, severity feedbackTag field, generated feedback data | Does "low beverage fit" need a player-facing copy direction? | Rewrite / producer review before any tag proposal. |
| `savory_identity` | `candidate_risk_tag`; `copy_direction_candidate` | summary candidate / risk observations, feedback mapping docs | `needs_producer_copy_review` | Savory / food-like identity risk. | High: tone-sensitive player copy. | Medium: not runtime feedbackTag. | no | no | feedbackTag registry, severity feedbackTag field, generated feedback data | Should savory identity become funny copy, warning copy, or machine-only evidence? | Producer tone review before tag decision. |
| `texture_sediment` | `candidate_risk_tag`; `copy_direction_candidate` | summary candidate / risk observations, feedback mapping docs | `needs_producer_copy_review` | Sediment / powder / crumb texture risk. | Medium: may overlap Oreo or powder sediment copy. | Medium: not runtime feedbackTag. | no | no | feedbackTag registry, severity feedbackTag field, generated feedback data | Do we need a player-facing sediment / gritty texture tag? | Review against Oreo / texture copy directions before registry design. |
| `novelty` | `candidate_risk_tag`; generated / sample overlap | summary candidate, generated / sample observations, prior decision reports | `needs_mapping_review` + `needs_producer_copy_review` | Novel / experimental tone. | Medium: broad tone could become fallback copy. | High: may collapse candidate, outcome, and copy style layers. | no | no | feedbackTag registry, outcome registry, validator, generated feedback active takeover | Should novelty stay candidate-only, become copy style, or be split from outcome semantics? | Split review before any tag or outcome decision. |
| `flavor_identity_conflict` | `outcomeTypeId_not_feedbackTag` | outcome mapping, golden observations, generated / sample feedback references, post-migration docs | `blocked_as_feedbackTag` | Outcome identity for flavor identity conflict. | Not a copy pool tag. | High if inserted into feedbackTag registry. | no | no | feedbackTag registry, severity feedbackTag field, generated feedback tag field | Confirm this remains outcomeTypeId only. | Keep out of feedbackTag registry; review outcome registry separately. |

Additional runtime-observed style / broad copy tags such as `accident`, `acid_accident`, `classic`, `premium`, `normal_good`, `fresh`, `sweet`, `dessert`, `durian`, `thick_followup`, `thick_straw_followup`, and `weird` remain later review candidates. This report does not fully review or approve them.

## 4. Human Review Questions by Tag

### `bubble_conflict`

- Should it keep bubble + thick / mouthfeel conflict narrow semantics?
- Does it need a rename, source note, or producer note to prevent misuse as generic flavor identity conflict?
- Is its copy pool thick enough for generated feedback / severity / partial takeover use?
- Should a separate generic flavor identity conflict player-copy direction exist later?

### `greasy_overload`

- Is it a runtime feedbackTag whose reviewed meaning should stay greasy / fat-load / heavy mouthfeel?
- Is it too tightly bound to `dairy_fat_overload`, dairy wording, or greasy mouthfeel evidence?
- Does it need sourceLayer notes before any severity table can reference it?
- Does its copy pool need expansion before generated feedback partial takeover?

### `straw_disaster` / `straw_followup`

- Are these texture / drinkability feedbackTags, not accidentTypeIds?
- Should `straw_disaster` remain a primary severe straw / drinkability copy tag while `straw_followup` remains follow-up copy?
- How should they differ from `texture_straw_resistance` and `texture_low_drinkability`?
- Is the copy pool too thin or too narrow for wider generated use?

### `aroma_pressure`

- Is it only a future copy direction / flavor risk tag for now?
- If it becomes player-facing copy, what producer tone should it use?
- What source-of-truth row and copy pool would be required before feedbackTag registry use?
- Should it stay out of `feedbackTag` fields until a separate review decision exists?

### `identity_conflict`

- Must it remain candidate-only for now?
- How do we prevent confusion with `flavor_identity_conflict` outcomeTypeId?
- Should future player copy use a different tag name if identity-conflict copy is needed?
- Should it explicitly avoid mapping to `bubble_conflict`?

### `low_beverage_fit`

- Is it beverage-fit risk, not a player-facing feedbackTag?
- Does it need a human rewrite before any copy direction review?
- Should it stay machine-facing until a producer decides how to express "this does not drink like a beverage"?

### `savory_identity`

- Is it food identity / savory risk, not runtime feedbackTag?
- Should future copy be humorous, warning-like, or avoided because it can sound judgmental?
- Does it need producer approval before any generated feedback sample appears?

### `texture_sediment`

- Is it texture risk / evidence tag, not runtime feedbackTag?
- Could it be confused with Oreo crumb, powder sediment, or general low-drinkability copy?
- Should a future sediment copy direction be separate from `straw_disaster` and `texture_low_drinkability`?

### `novelty`

- Is it novelty risk / experimental tone, not runtime feedbackTag?
- Should it remain candidate / risk layer only?
- If future player copy needs novelty, should it be a copy style tag rather than outcome or mechanism ID?
- Does it need split review because it appears like a broad product tone?

### `flavor_identity_conflict`

- This is outcomeTypeId.
- It is not feedbackTag.
- It must not enter feedbackTag registry because the name looks player-copy-like.
- Any future player-facing copy for this outcome needs a separate feedbackTag / copy direction review.

## 5. Recommended Grouping

These groupings are review planning buckets only. They are not final approval categories.

### 5.1 Runtime feedbackTag review

- `bubble_conflict`
- `greasy_overload`
- `straw_disaster`
- `straw_followup`

Required before future registry use:

- producer meaning decision
- source notes
- copy pool size check
- generated / shadow evidence review
- golden review if player-visible output changes

### 5.2 Candidate / risk tag review

- `aroma_pressure`
- `identity_conflict`
- `low_beverage_fit`
- `savory_identity`
- `texture_sediment`
- `novelty`

Required before any promotion:

- confirm whether player copy is desired
- decide copy direction name separately from candidate / risk tag
- block direct severity `feedbackTag` usage until reviewed

### 5.3 OutcomeTypeId boundary

- `flavor_identity_conflict`

Required action:

- keep as outcomeTypeId
- do not enter feedbackTag registry
- review player-copy direction separately if needed

### 5.4 Copy pool expansion candidates

Possible later review areas:

- `greasy_overload`
- `straw_disaster`
- `straw_followup`
- possible sediment / aroma / identity copy directions after producer review

This report does not add copy and does not decide expansion.

## 6. Recommended Next Slice

Recommended next slice:

```text
v0.0.7.57｜feedbackTag producer review decisions
```

Conservative alternative:

```text
v0.0.7.57｜runtime feedbackTag notes review
```

Either route should stay docs / report / decision oriented first. Do not jump directly to validator implementation, generated feedback active takeover, generated severity, or partial takeover.

## 7. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any feedbackTag
- approve any candidateTag
- approve any risk tag
- approve any copy direction
- approve any outcomeTypeId
- mark any tag as runtime-ready
- turn `aroma_pressure` into a feedbackTag
- turn `identity_conflict` into a feedbackTag or outcomeTypeId
- turn `flavor_identity_conflict` into a feedbackTag
- generalize `bubble_conflict` into flavor identity conflict
- modify runtime
- modify data
- modify generated feedback data
- modify content sheets
- modify golden expected
- modify feedback text pools
- build generated severity
- create shadow output
- approve partial takeover
- approve active takeover
