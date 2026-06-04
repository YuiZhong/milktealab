# P1 TODO Review｜v0.0.7.52

## 0. Report Positioning

This report is a docs / review / planning artifact.

It reviews the real remaining state of `docs/V0_0_7_MECHANISM_TODO.md` P1 items after v0.0.7.51 source-of-truth / registry / schema design docs.

It does not implement runtime, registry, schema, validator, generated severity, shadow output, partial takeover, or active takeover.

It also does not mark any P1 item as fully solved. The point is to separate:

- completed groundwork
- remaining gate
- useful work package
- recommended next slice

## 1. Executive Summary

The current P1 list should not be read as "eight P1 items still untouched from zero".

Several P1 items already have meaningful groundwork:

- long-term stable ID / naming guardrail
- source-of-truth / registry / schema design
- AI-generated ID / tag review pack proof and formal review pack
- `taste_conflict` -> `flavor_identity_conflict` migration and post-migration boundary notes
- feedbackTag mapping design and decision split
- accidentAnalyzer legacy inventory, decision split, staged texture migration plan, and three small actual migrations
- drinkStructureAnalyzer displayName inventory
- collector / source historical wording cleanup

However, completed groundwork is not the same as final gate solved.

The remaining risk is no longer "no documentation exists"; it is that future work could skip the remaining approval gates and accidentally treat observed / draft / historical / candidate values as approved registry, validator input, generated severity data, or runtime takeover source.

The strongest next slice is a reviewed registry shape proposal: a human-readable source-of-truth candidate table / report that consolidates observed runtime IDs, historical IDs, review candidates, feedbackTag boundaries, and known unresolved gates without creating the registry file yet.

## 2. P1 Status Matrix

| P1 item | completed groundwork | remaining gate | current risk if skipped | recommended next step | can be combined with |
|---|---|---|---|---|---|
| P1-1 AI generated ID / naming audit | Guardrail, formal naming review pack, decision split, `taste_conflict` -> `flavor_identity_conflict` migration, post-migration boundary notes, v0.0.7.51 source-of-truth design | Reviewed ID inventory / source-of-truth review and gate decision | Future Codex may treat review-pack items or observed IDs as approved stable IDs | Feed current inventory and review reports into reviewed registry shape proposal | P1-2 |
| P1-2 known stable ID source-of-truth / registry / enum / schema | v0.0.7.51 design clarifies observed ≠ approved, collector output ≠ registry, historical migrated IDs are not current allowed values | Actual reviewed registry / enum / schema is not created; validator has no approved source yet | Validator may use collector output, suffix rules, or observed runtime values as allowed values | Design a reviewed registry shape proposal first; do not implement validator yet | P1-1, P1-3 |
| P1-3 candidate severity sheet validator | Candidate severity sample exists; design boundaries and validator prerequisites are documented | Registry / source-of-truth gate still blocks implementation | Validator could legalize unreviewed accidentTypeId / feedbackTag / ruleId values | Keep blocked until reviewed registry shape is agreed | P1-2 |
| P1-4 accidentAnalyzer legacy migration route | Legacy inventory, migration decision split, texture plan, taro / Oreo / topping migrations, historical collector cleanup | Broader route remains: remaining runtime_review_candidate IDs, thresholds, dedupe fallback, append / suppression, score / cap / feedbackTags, registry / validator gate | Runtime legacy ifs may be patched piecemeal without sourceLayer / triggerMetric / golden review | Run accidentAnalyzer broader route review as a separate package after registry shape draft begins | P1-1, P1-2 |
| P1-5 summaryCandidateEngine candidate tag / feedbackTag registry boundary | FeedbackTag mapping design, decision split, outcome/tag boundary notes | No feedbackTag source-of-truth / registry; candidate / risk tags still not reviewed feedbackTags | Candidate / risk tags may be inserted into severity feedbackTag fields | Combine with P1-7 into feedbackTag / candidate tag source-of-truth package | P1-7 |
| P1-6 drinkStructureAnalyzer displayName Set residue | DisplayName inventory and staged migration plan exist | No metadata source-of-truth, no shadow compare, no staged replacement | Structure / operation / production rules may rely on displayName keys | Keep as independent later package; do not insert before registry review unless structure work starts | P1-8 |
| P1-7 feedbackTag semantic boundary and copy pool expansion | Mapping design, decision split, generated / runtime / candidate tag split, `bubble_conflict` narrow boundary | No producer review completion, no feedbackTag source-of-truth, copy pools remain thin | Generated / severity work may over-trust thin or ambiguous feedbackTags | Merge planning with P1-5 as feedbackTag source-of-truth / producer review package | P1-5 |
| P1-8 v0.0.7.x final mechanism audit | Many inputs now exist: guardrails, inventories, reports, migrations, source design | Final audit should wait until registry / feedbackTag / accidentAnalyzer / validator route is clearer | Starting final audit now would produce a premature checklist with unresolved blockers | Defer; use this after registry and route packages are done | all P1 |

## 3. Suggested Work Packages

### 3.1 Reviewed Registry Shape Proposal

Goal:

- Turn observed evidence and existing design docs into a human-reviewable source-of-truth candidate shape.
- Do not create `data/idRegistry.js`, schema, enum, validator, generated data, or allowed values yet.

Inputs:

- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
- `reports/stableIdSourceCollector.sample.md`
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- feedbackTag mapping design / decision split reports

Output candidate:

- report table with ID family, observed value, source layer, observed source, proposed status, unresolved gate, historical status, review question

Why this is next:

- It converts source-of-truth design into review material without prematurely implementing validator.
- It gives P1-1 / P1-2 / P1-3 a safe bridge.

### 3.2 accidentAnalyzer Broader Route Review

Goal:

- Review remaining current runtime / mechanism review candidates and legacy control flow.

Must cover:

- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- `texture_straw_resistance`
- legacy if thresholds
- texture dedupe fallback
- structure rule append / suppression
- score / cap / feedbackTags

Non-goal:

- No runtime migration in the review task.

### 3.3 feedbackTag / Candidate Tag Source-of-Truth

Goal:

- Combine P1-5 and P1-7 into one reviewable package.

Must keep separate:

- runtime observed feedbackTag
- generated feedbackTag
- candidate / risk tag
- rule tag
- sample draft tag
- future reviewed feedbackTag

Key guardrails:

- `aroma_pressure` is not a runtime feedbackTag.
- `identity_conflict` is candidate / risk tag, not feedbackTag.
- `flavor_identity_conflict` is outcomeTypeId, not feedbackTag.
- `bubble_conflict` remains narrow and must not become generic flavor identity conflict.

### 3.4 drinkStructureAnalyzer DisplayName Staged Plan

Goal:

- Keep P1-6 independent until structure / operation / production work needs it.

Needed before active reliance:

- metadata source-of-truth
- shadow compare
- review pack
- staged replacement

Non-goal:

- Do not rewrite `core/drinkStructureAnalyzer.js` from the inventory alone.

### 3.5 Validator / Generated Severity / Shadow / Partial Takeover Chain

Goal:

- Keep implementation behind explicit gates.

Order:

1. reviewed registry / source-of-truth shape
2. candidate severity sheet validator design
3. validator implementation
4. generated severity validator / structure check
5. shadow output
6. golden shadow expected / producer review
7. partial takeover discussion

This chain should not begin at step 3.

## 4. Recommended Next Slice

Recommended next slice:

```text
v0.0.7.53｜reviewed stable ID registry shape proposal
```

Why:

- v0.0.7.51 already designed source-of-truth principles.
- The immediate risk is not lack of design; it is that validator or generated severity work could start without a reviewed source list.
- A registry shape proposal can remain docs / report only while making the eventual validator source explicit.
- It lets P1-1 and P1-2 progress without pretending P1-3 is ready.

Suggested scope:

- Create a review report for proposed ID registry row shape and status categories.
- Include observed runtime IDs, runtime_review_candidate IDs, historical migrated IDs, feedbackTag boundary examples, and explicit non-approved states.
- Do not create the registry file.
- Do not implement validator.
- Do not generate allowed values.

Alternative next slice:

```text
v0.0.7.53｜accidentAnalyzer broader route review
```

This is also reasonable if the user wants to continue P1-4 first, but it should still avoid runtime changes until source-of-truth review is clearer.

## 5. What This Report Does NOT Do

This report does not:

- mark any P1 as fully solved
- create registry / enum / schema
- implement validator
- generate allowed values
- build generated severity data
- create shadow output
- approve partial takeover
- approve active takeover
- rename IDs
- migrate runtime
- modify golden expected
- approve any feedbackTag / accidentTypeId / outcomeTypeId as final registry entry

P1 titles remaining in the TODO list do not mean every item is untouched.

Completed groundwork does not mean final gate solved.
