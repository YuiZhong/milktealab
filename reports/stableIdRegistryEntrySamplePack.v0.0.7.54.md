# Stable ID Registry Entry Sample Pack｜v0.0.7.54

## 0. Report Positioning

This report is a review sample pack for future stable ID registry entries.

It applies the shape proposed in `reports/stableIdRegistryShapeProposal.v0.0.7.53.md` to a small set of sample entries so producer / ChatGPT can review whether the fields, statuses, and gate language are understandable.

This report is not a registry file, not a schema, not an enum, not a validator, not allowed values, not generated data, and not runtime source-of-truth.

Sample pack does not mean approved registry. None of the IDs below are approved as `approved_stable` by this report. All `canEnterValidator`, `canEnterGeneratedSeverity`, and `canAffectRuntime` values in this report are hard `false`.

## 1. Executive Summary

- v0.0.7.54 adds registry entry samples only.
- The sample entries test the future row shape for accidentTypeId, outcomeTypeId, feedbackTag, and candidate / risk tag cases.
- `texture_low_drinkability` and `texture_solid_overload` are current observed generalized accident IDs, but this report does not approve them as stable registry entries.
- Historical migrated texture IDs remain blocked from current validator / generated severity / runtime takeover decisions.
- Runtime review candidates such as `flavor_durian_overload`, `dairy_fat_overload`, and `texture_straw_resistance` are review candidates, not definite migration targets.
- `bubble_conflict`, `aroma_pressure`, `identity_conflict`, and `flavor_identity_conflict` remain split by layer.
- The recommended next slice is still human review of registry candidates, not direct validator implementation.

## 2. Sample Entry Format

Future registry-like review rows should carry enough information to prevent "observed means approved" drift.

| field | meaning |
|---|---|
| `id` | The observed or proposed ID string under review. |
| `idFamily` | The ID layer, such as `accidentTypeId`, `outcomeTypeId`, `feedbackTag`, or `candidateTag`. |
| `proposedStatus` | Review status vocabulary, not final approval. |
| `currentRuntimeObserved` | Whether the current runtime / golden-like sources can currently emit or assert this ID. |
| `sourceLayer` | Explicit source layer when applicable; do not infer from ID prefix. |
| `sourceSummary` | Explicit summary / rule source when applicable. |
| `triggerMetric` | Explicit metric or evidence family when applicable. |
| `provenance` | Human-readable evidence path for why the ID appears in the sample pack. |
| `historicalSince` | Version where the ID became historical, if applicable. |
| `replacedBy` | Current replacement ID, if applicable. |
| `reviewStatus` | Human review state for this row. |
| `reviewRequiredBefore` | Gate that must not consume the ID before review completes. |
| `canEnterValidator` | Hard gate field. In this sample pack this is always `false`. |
| `canEnterGeneratedSeverity` | Hard gate field. In this sample pack this is always `false`. |
| `canAffectRuntime` | Hard gate field. In this sample pack this is always `false`. |
| `blockedFrom` | Layers this report explicitly does not allow the ID to enter. |
| `notes` | Human-readable nuance, especially sourceLayer / semantics / historical context. |
| `humanReviewQuestion` | The concrete producer / ChatGPT question before any future approval. |

## 3. AccidentTypeId Sample Entries

### 3.1 `texture_low_drinkability`

| field | value |
|---|---|
| `id` | `texture_low_drinkability` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `runtime_observed_requires_review` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / structure accident rule evidence |
| `triggerMetric` | `drinkability` / `solidLoad` / `strawResistance` review needed |
| `provenance` | Current texture generalized output; taro and Oreo staged migrations; golden samples; structure accident rule evidence |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_review` |
| `reviewRequiredBefore` | validator, generated severity, partial takeover |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input, new runtime authority |
| `notes` | Current runtime may emit this ID, but this sample pack does not approve it as `approved_stable`. Human review must pin source metrics and threshold meaning first. |
| `humanReviewQuestion` | Should this become the reviewed generalized texture accident ID for low drinkability, and which triggerMetric names should be canonical? |

### 3.2 `texture_solid_overload`

| field | value |
|---|---|
| `id` | `texture_solid_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `runtime_observed_requires_review` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / structure accident rule evidence |
| `triggerMetric` | `solidLoad` / `textureRatio` / `liquidSupport` review needed |
| `provenance` | Current texture generalized output; topping staged migration; golden samples; structure accident rule evidence |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_review` |
| `reviewRequiredBefore` | validator, generated severity, partial takeover |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input, new runtime authority |
| `notes` | Current runtime may emit this ID, but this report does not approve it. Concrete topping names should stay in evidence / notes / feedback copy, not accidentTypeId. |
| `humanReviewQuestion` | Should this be the reviewed generalized accident ID for solid overload, and how should it differ from low drinkability? |

### 3.3 `texture_taro_overload`

| field | value |
|---|---|
| `id` | `texture_taro_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `historical_legacy_reference` |
| `currentRuntimeObserved` | `false` |
| `sourceLayer` | `texture` historical note |
| `sourceSummary` | legacy accidentAnalyzer taro branch |
| `triggerMetric` | historical taro paste ratio evidence |
| `provenance` | pre-v0.0.7.46 legacy docs / reports |
| `historicalSince` | `v0.0.7.46` |
| `replacedBy` | `texture_low_drinkability` |
| `reviewStatus` | `blocked_current_use` |
| `reviewRequiredBefore` | any attempt to revive it |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | current registry, validator allowed values, generated severity input, runtime takeover |
| `notes` | Historical / pre-v0.0.7.46 legacy accidentTypeId. It must not return as a current allowed value. Taro personality belongs in evidence / notes / feedback copy. |
| `humanReviewQuestion` | Is there any reason to keep more than a historical alias note for this ID? |

### 3.4 `texture_oreo_overload`

| field | value |
|---|---|
| `id` | `texture_oreo_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `historical_legacy_reference` |
| `currentRuntimeObserved` | `false` |
| `sourceLayer` | `texture` historical note |
| `sourceSummary` | legacy accidentAnalyzer Oreo branch |
| `triggerMetric` | historical Oreo crumble ratio evidence |
| `provenance` | pre-v0.0.7.47 legacy docs / reports |
| `historicalSince` | `v0.0.7.47` |
| `replacedBy` | `texture_low_drinkability` |
| `reviewStatus` | `blocked_current_use` |
| `reviewRequiredBefore` | any attempt to revive it |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | current registry, validator allowed values, generated severity input, runtime takeover |
| `notes` | Historical / pre-v0.0.7.47 legacy accidentTypeId. It must not return as a current allowed value. Oreo personality belongs in evidence / notes / feedback copy. |
| `humanReviewQuestion` | Should future docs keep this only as migration history? |

### 3.5 `texture_topping_overload`

| field | value |
|---|---|
| `id` | `texture_topping_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `historical_legacy_reference` |
| `currentRuntimeObserved` | `false` |
| `sourceLayer` | `texture` historical note |
| `sourceSummary` | legacy accidentAnalyzer topping loop |
| `triggerMetric` | historical topping ratio evidence |
| `provenance` | pre-v0.0.7.49 legacy docs / reports |
| `historicalSince` | `v0.0.7.49` |
| `replacedBy` | `texture_solid_overload` |
| `reviewStatus` | `blocked_current_use` |
| `reviewRequiredBefore` | any attempt to revive it |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | current registry, validator allowed values, generated severity input, runtime takeover |
| `notes` | Historical / pre-v0.0.7.49 legacy accidentTypeId. It must not return as a current allowed value. Topping names belong in evidence / notes / feedback copy. |
| `humanReviewQuestion` | Should future docs keep this only as migration history? |

### 3.6 `flavor_durian_overload`

| field | value |
|---|---|
| `id` | `flavor_durian_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `runtime_review_candidate` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `flavor` review needed |
| `sourceSummary` | legacy accident rule / flavorSummary review needed |
| `triggerMetric` | `aromaPressure` / identity pressure / novelty risk review needed |
| `provenance` | current runtime accident rule, golden evidence, legacy inventory |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_producer_review` |
| `reviewRequiredBefore` | registry candidate approval, validator, generated severity |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input |
| `notes` | Runtime / mechanism review candidate only. Not a definite migration target and not proof that one ingredient-specific accident type should be copied to other ingredients. |
| `humanReviewQuestion` | Is durian a special high-memory mechanism worth retaining, or should its evidence eventually map into broader flavor identity / aroma pressure concepts? |

### 3.7 `dairy_fat_overload`

| field | value |
|---|---|
| `id` | `dairy_fat_overload` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `runtime_review_candidate` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `texture` / drinkability review needed |
| `sourceSummary` | `textureSummary` review needed |
| `triggerMetric` | `fatLoad` / greasy pressure review needed |
| `provenance` | legacy accidentAnalyzer branch, golden / generated feedback observations, legacy inventory |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_source_note` |
| `reviewRequiredBefore` | registry candidate approval, validator, generated severity |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input |
| `notes` | ID prefix cannot override source fields. If sourceLayer is texture and triggerMetric is fatLoad, this should be understood as texture / mouthfeel pressure, not pure dairy identity. |
| `humanReviewQuestion` | Should this ID remain as-is with strong source notes, or should a future migration propose a more texture-oriented name? |

### 3.8 `texture_straw_resistance`

| field | value |
|---|---|
| `id` | `texture_straw_resistance` |
| `idFamily` | `accidentTypeId` |
| `proposedStatus` | `runtime_review_candidate` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / legacy accidentAnalyzer review needed |
| `triggerMetric` | `strawResistance` / `solidLoad` / `drinkability` review needed |
| `provenance` | legacy accidentAnalyzer branch, summary candidate, golden / generated feedback observations |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_threshold_provenance` |
| `reviewRequiredBefore` | registry candidate approval, validator, generated severity |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input |
| `notes` | Mature-looking runtime ID, but still needs source notes and threshold provenance before future generated severity or validator use. |
| `humanReviewQuestion` | Is this ID already semantically acceptable once source notes are added, or does it need broader structure-rule review first? |

## 4. OutcomeTypeId Sample Entry

### 4.1 `flavor_identity_conflict`

| field | value |
|---|---|
| `id` | `flavor_identity_conflict` |
| `idFamily` | `outcomeTypeId` |
| `proposedStatus` | `runtime_observed_requires_review` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | `flavor` |
| `sourceSummary` | `flavorSummary` / outcome candidate review needed |
| `triggerMetric` | `identityConflictRisk` review needed |
| `provenance` | v0.0.7.41 migration from legacy `taste_conflict`; outcome mapping and golden observations |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_outcome_registry_review` |
| `reviewRequiredBefore` | outcome registry, validator, generated severity, partial takeover |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved registry, validator allowed values, generated severity input, new runtime authority |
| `notes` | Current outcomeTypeId, not a feedbackTag. It must not be collapsed into `identity_conflict` candidate tag or `bubble_conflict` feedbackTag. Legacy `taste_conflict` remains historical / pre-v0.0.7.41. |
| `humanReviewQuestion` | Should this become the reviewed outcomeTypeId once outcome registry review exists, and what source fields should be required? |

## 5. FeedbackTag / Candidate Tag Sample Entries

### 5.1 `bubble_conflict`

| field | value |
|---|---|
| `id` | `bubble_conflict` |
| `idFamily` | `feedbackTag` |
| `proposedStatus` | `runtime_observed_requires_review` |
| `currentRuntimeObserved` | `true` |
| `sourceLayer` | feedback copy layer |
| `sourceSummary` | runtime feedback pool / generated feedback observations |
| `triggerMetric` | not applicable until feedbackTag registry review |
| `provenance` | runtime observed feedbackTag, generated/sample feedback, golden observations |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_feedback_mapping_review` |
| `reviewRequiredBefore` | feedbackTag registry, severity sheet use, generated feedback partial takeover |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | approved feedbackTag registry, generic flavor identity conflict mapping, validator allowed values |
| `notes` | Runtime observed feedbackTag with narrow bubble + thick / mouthfeel follow-up semantics. It must not be generalized into generic flavor identity conflict. |
| `humanReviewQuestion` | Should this remain only a narrow mouthfeel feedbackTag, and is a separate generic flavor identity conflict feedbackTag needed? |

### 5.2 `aroma_pressure`

| field | value |
|---|---|
| `id` | `aroma_pressure` |
| `idFamily` | `candidateTag` |
| `proposedStatus` | `candidate_only` |
| `currentRuntimeObserved` | `false` |
| `sourceLayer` | `flavor` candidate / risk layer |
| `sourceSummary` | `flavorSummary` / summary candidate |
| `triggerMetric` | `aromaPressure` |
| `provenance` | summary candidate / risk observations; prior severity sample cleanup |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_feedback_tag_decision` |
| `reviewRequiredBefore` | any feedbackTag registry use, severity sheet feedbackTag field, generated feedback |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | feedbackTag registry, runtime feedback pool, validator allowed values |
| `notes` | Candidate / risk metric name, not current runtime feedbackTag. If future player-visible copy needs this idea, it requires a separate feedbackTag registry / producer review. |
| `humanReviewQuestion` | Should aroma pressure become a player-visible feedbackTag later, or remain only a flavor risk metric? |

### 5.3 `identity_conflict`

| field | value |
|---|---|
| `id` | `identity_conflict` |
| `idFamily` | `candidateTag` |
| `proposedStatus` | `candidate_only` |
| `currentRuntimeObserved` | `false` |
| `sourceLayer` | `flavor` candidate / risk layer |
| `sourceSummary` | `flavorSummary` / summary candidate |
| `triggerMetric` | `identityConflictRisk` |
| `provenance` | summary candidate / risk observations; post-v0.0.7.41 boundary notes |
| `historicalSince` |  |
| `replacedBy` |  |
| `reviewStatus` | `needs_layer_boundary_review` |
| `reviewRequiredBefore` | any feedbackTag or outcome registry use |
| `canEnterValidator` | `false` |
| `canEnterGeneratedSeverity` | `false` |
| `canAffectRuntime` | `false` |
| `blockedFrom` | feedbackTag registry, outcomeTypeId registry, validator allowed values |
| `notes` | Candidate / risk tag only. It is not runtime feedbackTag and not `flavor_identity_conflict` outcomeTypeId. |
| `humanReviewQuestion` | Should this stay as a candidate / risk tag, or should a reviewed mapping create a separate feedbackTag later? |

## 6. Review Table / Human Questions

| id | idFamily | proposedStatus | main question | blocked gate |
|---|---|---|---|---|
| `texture_low_drinkability` | accidentTypeId | `runtime_observed_requires_review` | Is this the reviewed generalized low-drinkability accident ID? | validator / generated severity |
| `texture_solid_overload` | accidentTypeId | `runtime_observed_requires_review` | Is this the reviewed generalized solid-load accident ID? | validator / generated severity |
| `texture_taro_overload` | accidentTypeId | `historical_legacy_reference` | Should it remain historical-only? | current allowed values |
| `texture_oreo_overload` | accidentTypeId | `historical_legacy_reference` | Should it remain historical-only? | current allowed values |
| `texture_topping_overload` | accidentTypeId | `historical_legacy_reference` | Should it remain historical-only? | current allowed values |
| `flavor_durian_overload` | accidentTypeId | `runtime_review_candidate` | Special mechanism, legacy keep, or future migration? | validator / generated severity |
| `dairy_fat_overload` | accidentTypeId | `runtime_review_candidate` | Keep with source notes, or future rename? | validator / generated severity |
| `texture_straw_resistance` | accidentTypeId | `runtime_review_candidate` | Mature ID after threshold provenance, or broader review first? | validator / generated severity |
| `flavor_identity_conflict` | outcomeTypeId | `runtime_observed_requires_review` | Reviewed outcomeTypeId after outcome registry review? | validator / partial takeover |
| `bubble_conflict` | feedbackTag | `runtime_observed_requires_review` | Narrow mouthfeel tag only, or split new tag? | feedbackTag registry |
| `aroma_pressure` | candidateTag | `candidate_only` | Remain metric, or future feedbackTag candidate? | feedbackTag registry |
| `identity_conflict` | candidateTag | `candidate_only` | Remain candidate / risk tag, or future mapping? | feedbackTag / outcome registry |

## 7. Lessons From This Sample Pack

- A registry row needs more than an ID string. It needs family, status, provenance, review owner, blocked gates, and explicit can-enter fields.
- Current runtime observation can justify review priority, but cannot approve an ID.
- Historical migrated texture IDs need explicit blocked-current-use rows so future validator work does not revive them.
- `runtime_review_candidate` means "review this current runtime / mechanism fact"; it does not mean definite migration target.
- FeedbackTag and candidate / risk tag rows need different families even when the same phrase feels semantically close.
- Future validator work should start only after reviewed registry candidates and source-of-truth decisions exist.

## 8. Recommended Next Slice

The next slice can be either:

1. `accidentTypeId registry candidate review pack`, focused on deciding source notes and review status for current accidentTypeId candidates.
2. `feedbackTag / candidate tag registry candidate review pack`, focused on separating runtime feedbackTags from candidate / risk tags before any generated feedback or severity use.

Do not jump directly from this sample pack into validator implementation. This report does not provide approved registry rows or machine-readable allowed values.

## 9. What This Report Does NOT Do

- Does not create registry / enum / schema files.
- Does not implement validator.
- Does not generate allowed values.
- Does not create generated severity data.
- Does not approve any ID as `approved_stable`.
- Does not approve any `accidentTypeId`, `outcomeTypeId`, `feedbackTag`, `candidateTag`, `ruleId`, or `triggerMetric`.
- Does not change runtime.
- Does not modify `core/*`, `data/*`, generated data, content sheets, scripts, `index.html`, or golden expected.
- Does not change player score, accident priority, feedback, drink type, or result type.
- Does not do shadow / partial / active takeover.
- Does not mark P1-1, P1-2, P1-3, P1-4, P1-5, or P1-7 solved.
