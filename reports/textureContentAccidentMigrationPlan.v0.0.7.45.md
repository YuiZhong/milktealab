# Texture content-specific accident migration plan｜v0.0.7.45

## 0. Report Positioning

This report is a docs / report / impact-audit plan for three texture content-specific legacy accidents:

- `texture_taro_overload`
- `texture_oreo_overload`
- `texture_topping_overload`

It records future migration targets and review gates. It does not migrate runtime behavior, does not create new `accidentTypeId`, does not create registry / enum / schema / validator, and does not approve any target for generated data, partial takeover, active takeover, or runtime.

The current runtime remains unchanged. The legacy IDs remain current legacy runtime facts until a separate migration task explicitly changes them and updates golden expected, feedback review, generated references, docs, and regression checks.

## 1. Executive Summary

The three legacy accidents should not become a pattern of one accident type per ingredient or topping.

Recommended future targets:

- `texture_taro_overload` -> `texture_low_drinkability`
- `texture_oreo_overload` -> `texture_low_drinkability`
- `texture_topping_overload` -> `texture_solid_overload`

No new `accidentTypeId` is recommended in this plan:

- Do not add `texture_paste_overload`.
- Do not add `texture_sediment_overload`.
- Do not add `texture_topping_specific_overload`.
- Do not add one accident type per taro / Oreo / topping ingredient.

Ingredient personality should be preserved in evidence, notes, producer-facing review, and feedback copy. It should not be encoded into future `accidentTypeId`.

P1-4 remains not complete. This plan is one input for future staged migration; it is not the migration itself.

## 2. Producer / ChatGPT Target Decisions

### `texture_taro_overload`

Target: `texture_low_drinkability`

Reason:

- The player-facing problem is paste / thick / low drinkability, not taro identity.
- Taro is evidence for why the drink became paste-like.
- Future mechanism naming should express drinkability pressure.

Preserve:

- Evidence / notes can still say the taro paste made the drink too thick.
- Feedback copy can keep the “芋泥糊住了” personality.
- Golden review should keep the user-visible taro feeling if migration changes the final feedback route.

### `texture_oreo_overload`

Target: `texture_low_drinkability`

Reason:

- The player-facing problem is crumb / sediment / straw blockage / low drinkability, not Oreo identity as a separate accident type.
- Oreo is evidence for powdery / crumbly texture.
- A future target can use low drinkability while evidence and feedback preserve the Oreo flavor of the accident.

Preserve:

- Evidence / notes can mention Oreo crumble, powder, sediment, straw difficulty, or “奥利奥像水泥粉 / 粉渣”.
- Feedback copy can keep the concrete Oreo joke if producer review approves it.

### `texture_topping_overload`

Target: `texture_solid_overload`

Reason:

- The player-facing problem is topping load / solid load / texture ratio.
- The exact topping name is evidence, not the mechanism key.
- Future generalized structure direction should express solid overload rather than one accident type per topping.

Preserve:

- Evidence / notes should keep the concrete topping name.
- Feedback copy can mention the topping if it helps players understand the accident.
- Future migration must not lose the readable explanation that a specific topping overloaded the drink.

## 3. Reference Impact Audit

### Current runtime references

- `core/accidentAnalyzer.js` currently emits all three legacy IDs and can affect final score cap, type, feedbackTags, accidentTypeId, and player-facing notes.
- The three legacy IDs are part of the texture accident de-duplication set in `core/accidentAnalyzer.js`.
- `data/structureAccidentRules.js` already contains `texture_low_drinkability` and `texture_solid_overload`, but those structure rules are currently appended only when existing texture accidents do not suppress them.

### Golden references

- Direct exact `accidentTypeId` expected references for the three legacy IDs were not found in the current visible golden expected search.
- Related golden samples still protect taro / Oreo / straw / drinkability behavior, including Oreo overload and taro low-liquid cases.
- Any future runtime migration must re-run golden and update expected only when the product decision is intentional. It must not weaken assertions.

### Content sheet / generated feedback references

- The three legacy IDs were not found in current feedback text source sheets or generated feedback data.
- Future migration may still require feedback review if final feedbackTags, result type, notes, or generated shadow candidates change.

### Docs / reports references

- The three legacy IDs are documented in the legacy inventory, source-of-truth design, ID inventory, version log, and v0.0.7.44 decision split report.
- Future migration must update docs / reports from “future target plan” to “migration result” only after a separate migration task actually changes runtime and verification passes.

### Score cap / type / feedbackTags

Current legacy branches can change:

- score cap
- score delta
- forced / visible type
- feedbackTags
- accidentTypeId
- player-facing note

Future migration must audit each of these. Reusing `texture_low_drinkability` or `texture_solid_overload` as a target does not automatically preserve the old scoring or feedback shape.

## 4. Migration Target Table

| legacyAccidentTypeId | targetAccidentTypeId | currentSource | currentFinalImpact | targetReason | preserveAsEvidence | expectedRuntimeChange | needsGoldenUpdate | needsFeedbackReview | migrationRisk |
|---|---|---|---|---|---|---|---|---|---|
| `texture_taro_overload` | `texture_low_drinkability` | `core/accidentAnalyzer.js` taro paste branch | yes: score cap / type / feedbackTags / note | paste / thick / low drinkability, not taro identity | taro paste, paste load, “芋泥糊住了” copy direction | yes, if future migration changes final accident identity or result notes | likely, if final expected accident / feedback changes | yes | medium-high: must preserve taro evidence and not flatten player-facing explanation |
| `texture_oreo_overload` | `texture_low_drinkability` | `core/accidentAnalyzer.js` Oreo crumble branch | yes: score cap / type / feedbackTags / note | crumb / sediment / straw blockage / low drinkability, not Oreo identity | Oreo crumble, powder, sediment, straw difficulty, “奥利奥像水泥粉 / 粉渣” copy direction | yes, if future migration changes final accident identity or feedback path | likely, if final expected accident / feedback changes | yes | medium-high: low drinkability target must still explain Oreo-specific texture evidence |
| `texture_topping_overload` | `texture_solid_overload` | `core/accidentAnalyzer.js` topping overload loop | yes: score cap / type / feedbackTags / interpolated note | toppingLoad / solidLoad / textureRatio, not one accident per topping | concrete topping name, topping ratio, solid load note | yes, if future migration changes final accident identity or note | likely, if final expected accident / feedback changes | yes | high: interpolated display note and topping evidence need careful review |

## 5. Runtime / Golden / Feedback Implications

Future migration must answer these before any runtime edit:

1. Does the target accident preserve or deliberately change the old score cap?
2. Does the target accident preserve or deliberately change the old visible type?
3. Does the target accident preserve or deliberately change feedbackTags?
4. Does the target accident preserve or deliberately change player-facing notes?
5. Does the existing structure rule append / suppression behavior still match the intended result?
6. Which golden samples protect taro / Oreo / topping texture behavior?
7. Which golden expected fields must change, and why?
8. Does feedback copy still preserve ingredient personality without putting ingredient identity into `accidentTypeId`?
9. Do docs / reports clearly label old IDs as legacy after migration?
10. Are generated feedback data and feedback review packs still consistent after any source sheet change?

This report does not answer these as completed implementation facts. It only lists the required audit surface.

## 6. Evidence / Feedback Preservation Notes

Ingredient-specific personality should move to evidence and feedback copy:

- Taro: preserve paste / thick / low-flow evidence and the “芋泥糊住了” feel.
- Oreo: preserve crumb / sediment / powder / straw evidence and the “奥利奥像水泥粉 / 粉渣” feel.
- Toppings: preserve concrete topping names in evidence or notes when they matter to the player explanation.

Ingredient personality should not become future mechanism identity:

- Do not create one `accidentTypeId` for taro.
- Do not create one `accidentTypeId` for Oreo.
- Do not create one `accidentTypeId` per topping.

Future feedback review should decide whether the player-facing copy keeps the old jokes, tones them down, or adds new candidate text.

## 7. Recommended Migration Order

Recommended staged order:

1. `texture_taro_overload` -> `texture_low_drinkability`
2. `texture_oreo_overload` -> `texture_low_drinkability`
3. `texture_topping_overload` -> `texture_solid_overload`

Default guidance:

- Do not one-shot all three unless the future reference surface is tiny, the golden expectations are clear, and producer / ChatGPT review confirms the target semantics.
- Taro should go first because the paste / low-drinkability direction is the cleanest.
- Oreo should go second because sediment / crumb / straw evidence needs extra copy review.
- Topping should go last because the current note interpolates display names and may have the broadest player-facing explanation risk.

## 8. Gate Reminders

Before any actual migration:

- Read `docs/STABLE_ID_NAMING_GUARDRAIL.md`.
- Read `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`.
- Read `reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md`.
- Confirm the target is not a new `accidentTypeId`.
- Confirm evidence / notes / feedback copy preserve ingredient personality.
- Confirm golden expected changes are deliberate and not weakened.
- Confirm generated feedback data is rebuilt only from validated source sheets if it changes.
- Confirm docs / reports label old IDs as legacy only after actual migration.
- Confirm P1-4 is not marked complete by this plan.

## 9. What This Report Does NOT Do

This report does not:

- migrate `texture_taro_overload`
- migrate `texture_oreo_overload`
- migrate `texture_topping_overload`
- add `texture_paste_overload`
- add `texture_sediment_overload`
- add `texture_topping_specific_overload`
- add any per-ingredient accident type
- change runtime
- change score
- change accident priority
- change feedback
- change feedbackTags
- change drinkType
- change `result.type`
- change golden expected
- change content sheets
- change generated feedback data
- create registry / enum / schema / validator
- approve any ID for registry / validator / generated data / runtime
- mark P1-4 complete
