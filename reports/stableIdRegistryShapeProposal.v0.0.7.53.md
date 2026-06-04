# Stable ID Registry Shape Proposal｜v0.0.7.53

## 0. Report Positioning

This report is a docs / report / proposal artifact.

It proposes the future shape of a reviewed stable ID registry so that producer / ChatGPT review can inspect fields, statuses, provenance, and gate behavior before any implementation begins.

It is not:

- a registry file
- a schema file
- an enum
- a validator
- an allowed values list
- generated data
- runtime data

This report does not approve any ID, tag, rule, candidate, metric, status, or source as stable. Every example in this report remains proposal / review material unless a later explicit registry / schema / validator task approves it.

Core boundary:

```text
observed != approved
collector output != registry
runtime_review_candidate != definite migration target
historical legacy reference != current allowed value
```

## 1. Executive Summary

v0.0.7.51 established source-of-truth principles. v0.0.7.52 reviewed the P1 TODO state and recommended a safe bridge before any validator work.

This v0.0.7.53 report makes that bridge concrete: it proposes what a future reviewed registry entry might look like, what status vocabulary might be needed, and how accidentTypeId / feedbackTag examples should be separated.

The report intentionally stays one step before implementation:

- It consolidates evidence and unresolved gate questions.
- It distinguishes observed runtime IDs, review candidates, historical IDs, draft IDs, generated-only values, and candidate tags.
- It explains how a future validator should read a reviewed registry / schema.
- It does not create the registry, schema, validator, enum, or allowed values.

The safest next slice after this report is a human-reviewable registry entry sample pack or an accidentTypeId registry candidate review pack, not direct validator implementation.

## 2. Registry Entry Common Fields

Future registry rows may need a common envelope before per-family fields are considered.

| field | purpose | guardrail |
|---|---|---|
| `id` | Stable string being reviewed. | Must not be inferred from displayName, sampleId, notes, or string prefix. |
| `idFamily` | Which layer owns the ID, such as `accidentTypeId`, `feedbackTag`, `ruleId`, or `triggerMetric`. | Same string in different families is not automatically the same identity. |
| `status` | Review status vocabulary for this row. | Status must not be assigned by collector observation alone. |
| `displayName` / `label` | Optional human-readable label. | Human-readable text is not the primary key. |
| `sourceLayer` | Conceptual source layer, such as `taste`, `texture`, or `flavor`. | Do not infer this from the ID prefix. |
| `sourceSummary` | Structured summary source, such as `tasteSummary` or `textureSummary`. | Must refer to a real summary / candidate structure. |
| `triggerMetric` | Structured trigger metric. | Must not come from display copy or notes. |
| `currentRuntimeObserved` | Whether current runtime-like source emits or references it. | Runtime observation is evidence, not approval. |
| `historicalSince` | Version where a value became historical, if applicable. | Historical IDs cannot re-enter current allowed values by accident. |
| `replacedBy` | Replacement ID if a controlled migration happened. | Replacement does not erase historical references. |
| `provenance` | Source files and evidence types. | Collector output may populate evidence but cannot approve the row. |
| `reviewStatus` | Human / ChatGPT review state, such as needs review or approved later. | This report does not set final review approval. |
| `reviewOwner` | Producer / ChatGPT / engineering owner for later decision. | Empty owner means unresolved. |
| `notes` | Boundary explanation, migration caveats, sourceLayer notes. | Notes explain; they do not override structured fields. |
| `canEnterValidator` | Whether validator may use it as enforceable value. | In this report, current examples should be treated as no until future approval. |
| `canEnterGeneratedSeverity` | Whether generated severity may consume it. | Requires registry / validator gate first. |
| `canAffectRuntime` | Whether runtime may consume or emit it as a final value. | Requires explicit runtime migration / product review. |
| `deprecationPolicy` | How historical or deprecated values remain documented. | Historical docs are allowed; current runtime/generator use is not. |

Optional fields for later design:

- `approvedAtVersion`
- `approvedBy`
- `replacedFrom`
- `blockedReason`
- `allowedEvidenceSources`
- `blockedSources`
- `reviewPackRefs`
- `goldenSampleRefs`
- `migrationReportRefs`

## 3. Status Vocabulary Proposal

This vocabulary is a proposal only. It does not create an enum and does not assign approval.

| proposed status | meaning | can validator accept? | can generated severity use? | can runtime use? | review required? | examples / notes |
|---|---|---|---|---|---|---|
| `approved_stable` | Future status for an ID explicitly approved by registry / schema review. | yes, after implementation | yes, after validator gate | only if runtime task authorizes | yes, before assignment | No current ID is approved by this report. |
| `runtime_observed_requires_review` | Observed in current runtime-like source, but not yet approved stable. | no | no | current runtime may already emit it, but future systems cannot assume approval | yes | Useful for current behavior evidence. |
| `runtime_review_candidate` | Observed in current runtime / golden-like sources and needs mechanism review. | no | no | current legacy behavior may continue | yes | Not a definite migration target. |
| `historical_legacy_reference` | Old ID kept for docs / migration history only. | no | no | no current use | review only if migration docs change | Includes migrated texture old IDs. |
| `draft_only` | Disabled sample / proposal row. | no | no | no | yes | May appear in sample sheets or docs. |
| `sample_only` | Test / review sample identity. | no, unless test schema | no | no | low / test review | Should not become mechanism key. |
| `generated_only` | Observed in generated output. | no | no | no | yes | Generated observation is not source-of-truth. |
| `candidate_only` | Summary / candidate layer identity. | no for final IDs | no for severity final values | no | yes | Candidate IDs / risk tags are not final result IDs. |
| `deprecated` | Explicitly retired after a migration or decision. | no | no | no | yes | Requires clear replacement / historical note. |
| `blocked` | Known bad or unsafe value. | no | no | no | yes | Useful for string collisions or wrong-layer values. |
| `needs_producer_review` | Human semantics are unresolved. | no | no | no | yes | Especially for player-facing copy or subjective labels. |

Important wording rule:

```text
canEnterValidator / canEnterGeneratedSeverity / canAffectRuntime must stay hard-gated.
Future possibility belongs in review questions, not in canEnter* fields.
```

## 4. ID Family Shape

### `ingredientId`

Recommended fields:

- `id`
- `idFamily=ingredientId`
- `displayName`
- `ingredientCategory`
- `currentRuntimeObserved`
- `provenance`
- `status`
- `notes`

Boundary: ingredient identity can include ingredient category prefixes, but it is not an accident mechanism.

### `accidentTypeId`

Recommended fields:

- `id`
- `idFamily=accidentTypeId`
- `status`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `currentRuntimeObserved`
- `historicalSince`
- `replacedBy`
- `provenance`
- `reviewStatus`
- `canEnterValidator`
- `canEnterGeneratedSeverity`
- `canAffectRuntime`
- `notes`

Boundary: accidentTypeId is a reusable mechanism class. It should not split by single ingredient, recipe, sample, copy joke, displayName, or severity suffix.

### `outcomeTypeId`

Recommended fields:

- `id`
- `idFamily=outcomeTypeId`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `historicalSince`
- `replacedBy`
- `provenance`
- `notes`

Boundary: outcome name does not imply sourceLayer. `flavor_identity_conflict` is an outcomeTypeId, not a feedbackTag.

### `drinkTypeId`

Recommended fields:

- `id`
- `idFamily=drinkTypeId`
- `matchingRuleRefs`
- `displayName`
- `provenance`
- `status`
- `notes`

Boundary: drinkTypeId is not a player custom recipe name.

### `feedbackTag`

Recommended fields:

- `id`
- `idFamily=feedbackTag`
- `observedLayers`
- `runtimePoolObserved`
- `generatedObserved`
- `candidateRiskObserved`
- `reviewStatus`
- `producerMeaning`
- `copyPoolSize`
- `canEnterValidator`
- `canAffectRuntime`
- `notes`

Boundary: candidate / risk tags and runtime feedbackTags must not be merged by string equality.

### `textId`

Recommended fields:

- `id`
- `idFamily=textId`
- `feedbackTag`
- `drinkTypeId`
- `accidentTypeId`
- `tone`
- `scene`
- `provenance`
- `status`

Boundary: textId identifies copy, not a mechanism.

### `sampleId`

Recommended fields:

- `id`
- `idFamily=sampleId`
- `testPurpose`
- `goldenRefs`
- `reviewPackRefs`
- `notes`

Boundary: sampleId never enters mechanism rule primary keys.

### `ruleId`

Recommended fields:

- `id`
- `idFamily=ruleId`
- `candidateType`
- `accidentTypeId`
- `outcomeTypeId`
- `severityLevel`
- `enabled`
- `status`
- `provenance`
- `notes`

Boundary: ruleId may include severity / draft semantics; accidentTypeId may not.

### `candidateId`

Recommended fields:

- `id`
- `idFamily=candidateId`
- `candidateType`
- `sourceLayer`
- `sourceSummary`
- `triggerMetric`
- `priorityBand`
- `severityHint`
- `provenance`
- `notes`

Boundary: candidateId is not the final accident / outcome / drinkType.

### `priorityBand`

Recommended fields:

- `id`
- `idFamily=priorityBand`
- `meaning`
- `priorityShellRefs`
- `notes`

Boundary: priorityBand is not severity and not score.

### `severityHint`

Recommended fields:

- `id`
- `idFamily=severityHint`
- `meaning`
- `candidateRefs`
- `notes`

Boundary: severityHint is not final severityLevel and not scoreMultiplier.

### `severityLevel`

Recommended fields:

- `id`
- `idFamily=severityLevel`
- `meaning`
- `scoreMultiplierPolicy`
- `status`
- `notes`

Boundary: severityLevel belongs to future severity / threshold tuning and must not be embedded in accidentTypeId.

### `sourceLayer` / `sourceSummary` / `triggerMetric`

Recommended fields:

- `id`
- `idFamily`
- `ownerSchema`
- `validFor`
- `provenance`
- `notes`

Boundary: these are structured source fields. They cannot be inferred from ID name, Chinese text, notes, or sampleId.

## 5. AccidentTypeId Proposal Slice

This section is a review slice, not a registry. The statuses below are proposed review positions, not approved stable entries.

### 5.1 Active current observed candidates

| id | proposed status | evidence | key review question |
|---|---|---|---|
| `taste_acid_overload` | `runtime_observed_requires_review` | runtime rule, golden, content / generated observations | Can become approved stable after reviewed sourceLayer / triggerMetric notes? |
| `texture_low_drinkability` | `runtime_observed_requires_review` | structure rule, taro / Oreo migrations, golden | What sourceSummary / triggerMetric set should represent drinkability? |
| `texture_solid_overload` | `runtime_observed_requires_review` | structure rule, topping migration, golden | What boundary separates solid overload from low drinkability / straw resistance? |

These are current observed generalized IDs. This report does not mark them `approved_stable`.

### 5.2 Runtime review candidates

| id | proposed status | why review is needed | not this |
|---|---|---|---|
| `flavor_durian_overload` | `runtime_review_candidate` | ingredient-specific but may be a special high-memory mechanism candidate | Not a pattern for one accidentTypeId per ingredient. |
| `dairy_fat_overload` | `runtime_review_candidate` | name starts with dairy, but source may be texture / fatLoad / mouthfeel | Not automatically taste layer. |
| `industrial_creamer_overload` | `runtime_review_candidate` | subjective quality / identity label needs producer review | Not automatically final registry entry. |
| `taste_strong_flavor_overload` | `runtime_review_candidate` | sourceLayer / triggerMetric may mix taste and flavor | Not definitely taste just because of prefix. |
| `texture_straw_resistance` | `runtime_review_candidate` | mature texture mechanism but still legacy threshold path | Not automatically ready for generated severity. |

`runtime_review_candidate` means:

- observed in current runtime / golden-like sources
- needs sourceLayer / triggerMetric / producer / mechanism review
- not a definite migration target
- not a final registry entry

### 5.3 Historical migrated texture old IDs

| id | proposed status | historical positioning | replaced by |
|---|---|---|---|
| `texture_taro_overload` | `historical_legacy_reference` | pre-v0.0.7.46 legacy accidentTypeId | `texture_low_drinkability` |
| `texture_oreo_overload` | `historical_legacy_reference` | pre-v0.0.7.47 legacy accidentTypeId | `texture_low_drinkability` |
| `texture_topping_overload` | `historical_legacy_reference` | pre-v0.0.7.49 legacy accidentTypeId | `texture_solid_overload` |

These IDs must not enter current registry, current validator allowed values, generated severity input, or runtime takeover decisions.

They may remain in docs / reports as migration history.

### 5.4 Structure rule observed IDs

| id | proposed status | source | review note |
|---|---|---|---|
| `texture_low_drinkability` | `runtime_observed_requires_review` | structure accident rule and migrated branches | Needs append / suppression boundary notes. |
| `texture_solid_overload` | `runtime_observed_requires_review` | structure accident rule and migrated topping branch | Needs distinction from topping-specific player copy. |

### 5.5 Generated / sample / golden observations

Generated data, content sheets, golden samples, and sample drafts may provide evidence and regression coverage. They do not approve registry entries by themselves.

Future registry review should record these as provenance, not as source-of-truth.

## 6. FeedbackTag Proposal Slice

This section is also a review slice, not a registry.

### 6.1 Layer split

| layer | example source | registry implication |
|---|---|---|
| runtime observed feedbackTag | `data/feedbackTexts.js` pool key | Evidence only until reviewed. |
| generated feedbackTag | generated feedback JSON / JS | Shadow / content pipeline observation only. |
| candidate / risk tag | `summaryCandidateEngine` feedbackTags / risks | Not player feedbackTag by default. |
| sample draft tag | disabled sample sheet field | Draft only. |
| future reviewed feedbackTag | future reviewed registry / schema | Not created by this report. |

### 6.2 Current boundary examples

| value | boundary |
|---|---|
| `aroma_pressure` | Candidate / flavor risk direction; not a runtime feedbackTag. |
| `identity_conflict` | Candidate / risk tag; not a feedbackTag and not an outcomeTypeId. |
| `flavor_identity_conflict` | Current outcomeTypeId; not a feedbackTag. |
| `bubble_conflict` | Runtime observed feedbackTag with narrow bubble + thick / mouthfeel conflict semantics; not generic flavor identity conflict. |

Future feedbackTag registry work must decide whether each tag is:

- existing runtime feedbackTag with notes
- generated / shadow-only feedbackTag
- candidate / risk-only tag
- producer-review-needed copy direction
- blocked for runtime

No feedbackTag in this report is approved for validator, generated severity, or runtime takeover.

## 7. Future Validator Relationship

Future validators should read only reviewed registry / schema sources.

Expected read order:

1. explicit reviewed registry / schema
2. generated registry output, if generated from reviewed registry
3. collector output as drift warning / evidence only
4. raw docs / reports as human context only

Invalid validator sources:

- substring / suffix / prefix guessing
- collector output as allowed values
- all observed runtime IDs as approved values
- generated data observations as source-of-truth
- disabled sample sheet draft fields
- review pack items without approval
- historical legacy IDs as current allowed values

If no reviewed registry / schema exists, validator work should stop and design or review the source first.

## 8. Human Review Questions

Questions for producer / ChatGPT follow-up:

1. Which current observed accidentTypeIds are ready to become `approved_stable`, and what sourceLayer / triggerMetric notes do they need?
2. Should `flavor_durian_overload` stay as a special mechanism candidate, be renamed later, or remain legacy-only?
3. Should `dairy_fat_overload` be documented as texture / fatLoad / mouthfeel despite its `dairy_` prefix?
4. How should `industrial_creamer_overload` handle subjective quality wording before registry review?
5. Does `taste_strong_flavor_overload` need a split between taste intensity and flavor identity pressure?
6. Should `texture_straw_resistance` be approved as a stable texture mechanism, and what threshold provenance is required first?
7. Which feedbackTags are runtime observed but too broad, narrow, or thin for generated / severity work?
8. Which candidate / risk tags should remain non-player-facing?
9. Which historical IDs should be blocked from current validator allowed values?
10. What producer review status vocabulary is simple enough for future review packs?

## 9. Recommended Next Slice

Recommended next slice:

```text
reviewed registry entry sample pack
```

or:

```text
accidentTypeId registry candidate review pack
```

Either next slice should remain human-reviewable and should not implement validator yet.

Do not jump directly from this proposal to `validate candidate severity sheet` implementation. The project still needs reviewed registry entry examples, human decision fields, and source notes before validator can safely enforce allowed values.

## 10. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- create allowed values
- implement validator
- generate stable ID registry output
- approve any ID
- approve any feedbackTag
- approve any accidentTypeId
- approve any outcomeTypeId
- approve any ruleId
- mark any P1 as fully solved
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

It is a proposal for review, not an implementation.
