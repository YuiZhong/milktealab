# AccidentAnalyzer legacy accident migration decision split｜v0.0.7.44

## 0. Report Positioning

This report is a docs / report-only migration decision split for legacy accident items around `core/accidentAnalyzer.js`, `data/accidentRules.js`, and `data/structureAccidentRules.js`.

It is used to separate:

- legacy accident IDs that may stay as special mechanism candidates;
- ingredient-like / content-like accident IDs that should move toward generalized texture / structure / flavor mechanisms later;
- observed IDs that need source notes before future severity work;
- mixed-source items that still need producer / technical review.

This report is not:

- a migration patch;
- a registry;
- an enum;
- a schema;
- validator input;
- generated data;
- runtime source-of-truth;
- permission for any accidentTypeId to enter registry / validator / generated data / runtime;
- a replacement for golden samples, shadow review, producer review, or staged migration planning.

This report does not migrate runtime accidents, does not modify score / accident / feedback / drinkType / result.type / golden expected, and does not resolve P1-4. It only records a migration decision split and the next review gates.

## 1. Executive Summary

- `flavor_durian_overload` and `industrial_creamer_overload` can remain special mechanism candidates because their product meanings are distinctive, but they still need source notes and producer review before any later implementation layer.
- `texture_taro_overload`, `texture_oreo_overload`, and `texture_topping_overload` should not become a pattern of one accident type per ingredient. They are better treated as future generalized texture / structure migration candidates.
- `dairy_fat_overload` should remain an observed legacy ID for now, with its underlying direction pinned to texture / mouthfeel / fatLoad / greasy pressure rather than pure taste or physical straw blockage.
- `taste_strong_flavor_overload` needs split review because it mixes taste intensity, flavor identity, aroma pressure, and dominant ingredient evidence.
- `taste_acid_overload`, `texture_low_drinkability`, and `texture_solid_overload` are clearer rule-driven or structure-driven directions, but still need source notes before future validator / generated severity work.
- The legacy texture dedupe fallback is compatibility-only. It should not grow new display-text patterns, and notes / type text must not become validator keys.
- Every `canEnter*` gate in this report is hard `no`.

## 2. Legacy Accident Split Table

| accidentTypeId / item | currentLayer | currentFinalImpact | producerDirection | technicalDirection | migrationCategory | sourceLayerCandidate | triggerMetricCandidate | needsProducerReview | canEnterRegistry | canEnterValidator | canEnterGeneratedData | canAffectRuntime |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `flavor_durian_overload` | legacy accident rule | yes | Keep as special high-memory mechanism candidate | Add source notes for flavor / aroma pressure / controversial identity / novelty before any later route | `keep_special_candidate` | `flavor` | `aromaPressure` / identity pressure / novelty risk | yes | no | no | no | no |
| `industrial_creamer_overload` | legacy `accidentAnalyzer` branch | yes | Keep as special mechanism candidate if industrial / quality / dairy simulation remains product-relevant | Review player-facing label and trigger meaning; connect to industrial / quality / health concern / flavor identity only after review | `keep_special_candidate` | `flavor` / quality identity | `industrialCreamerRatio` / identity mismatch | yes | no | no | no | no |
| `texture_taro_overload` | legacy `accidentAnalyzer` branch | yes | Do not keep one accident type per ingredient long term | Move later toward paste / solid / straw / drinkability mechanisms with evidence preserved separately | `generalize_later` | `texture` | `pasteLoad` / `solidLoad` / `strawResistance` | yes | no | no | no | no |
| `texture_oreo_overload` | legacy `accidentAnalyzer` branch | yes | Do not keep one accident type per ingredient long term | Move later toward sediment / solid / straw / drinkability mechanisms with evidence preserved separately | `generalize_later` | `texture` | `sedimentRisk` / `solidLoad` / `strawResistance` | yes | no | no | no | no |
| `texture_topping_overload` | legacy `accidentAnalyzer` loop | yes | Do not expand as one accident type per topping | Keep topping evidence separate from future generalized texture / structure rule identity | `generalize_later` | `texture` / `structure` | `toppingLoad` / `solidLoad` / `strawResistance` | yes | no | no | no | no |
| `dairy_fat_overload` | legacy `accidentAnalyzer` branch | yes | Keep observed player-facing direction: 奶脂过载 / 太腻 / 油腻负担 | Add notes that underlying mechanism is texture / mouthfeel / fatLoad / greasy pressure, not pure taste or straw blockage | `keep_with_source_notes` | `texture` | `fatLoad` / heavy dairy load / drinkability pressure | medium | no | no | no | no |
| `texture_straw_resistance` | legacy `accidentAnalyzer` branch plus summary candidate | yes | Keep as mature texture / structure accident direction | Still legacy threshold path; migration requires shadow / golden review before changing runtime | `keep_with_source_notes` | `texture` / `structure` | `strawResistance` / `solidLoad` / `drinkability` | medium | no | no | no | no |
| `taste_strong_flavor_overload` | legacy `accidentAnalyzer` loop | yes | Needs split review: taste strength, flavor identity dominance, or aroma pressure | Do not infer source layer from `taste_`; do not map to `aroma_pressure` feedbackTag | `needs_split_review` | `taste` / `flavor` mixed | `flavorIntensity` / `aromaPressure` / identity dominance | yes | no | no | no | no |
| `taste_acid_overload` | accident rule engine and summary candidate | yes | Keep generic acid overload direction | Ingredient evidence can vary; do not split accidentTypeId by lemon / hawthorn / passionfruit | `data_driven_but_needs_notes` | `taste` | `acidity` | low | no | no | no | no |
| `texture_low_drinkability` | structure rule engine and summary candidate | yes, if not suppressed | Keep texture / structure direction | Record append / suppression behavior before later generated severity work | `data_driven_but_needs_notes` | `texture` / `structure` | `drinkability` / `solidLoad` / `strawResistance` | medium | no | no | no | no |
| `texture_solid_overload` | structure rule engine and summary candidate | yes, if not suppressed | Keep texture / structure direction | Record append / suppression behavior before later generated severity work | `data_driven_but_needs_notes` | `texture` / `structure` | `textureRatio` / `liquidSupport` / `drinkability` | medium | no | no | no | no |
| legacy texture dedupe fallback | compatibility bridge | yes, can suppress structure accidents | Do not expand | Remove only after structured tags and tests cover the same boundary | `compatibility_only` | compatibility | display type / note fallback, not future metric | technical review | no | no | no | no |

## 3. Producer Review Zone

This section is for producer review. It asks what the player-facing meaning should be, not how to implement migration.

### PR-ACC-001｜榴莲特殊机制

- Current direction: keep as special high-memory mechanism candidate.
- Producer question: Should durian continue to be a special accident / extreme flavor mechanism, instead of being fully absorbed into generalized flavor conflict?
- Default recommendation: keep special candidate, add source notes, review copy and thresholds later.

### PR-ACC-002｜植脂奶 / 工业奶茶特殊机制

- Current direction: keep as special mechanism candidate.
- Producer question: Is industrial / non-dairy creamer simulation failure memorable enough to remain a special accident direction?
- Default recommendation: keep special candidate, but review player-facing label, health concern, and cheap / industrial copy direction before use.

### PR-ACC-003｜芋泥 / 奥利奥 / 小料过载

- Current direction: migrate later toward texture / solid / sediment / strawResistance generalized mechanisms.
- Producer question: Should these avoid becoming one accidentTypeId per ingredient long term?
- Default recommendation: migration candidate, no immediate migration.

### PR-ACC-004｜奶脂过载

- Current direction: keep legacy observed ID, interpret underlying mechanism as texture / mouthfeel / fatLoad.
- Producer question: Should player-facing wording continue to use “奶脂过载 / 油腻负担”?
- Default recommendation: keep observed direction with source notes.

### PR-ACC-005｜强风味过载

- Current direction: needs further review.
- Producer question: Is this “taste too strong”, “aroma pressure”, or “flavor identity dominates everything”?
- Default recommendation: split_required / needs_review.

### PR-ACC-006｜吸管阻力 / 低可饮用性 / 固体过载

- Current direction: keep texture / structure accident direction, while separating legacy if thresholds from data-driven structure rules.
- Producer question: Should physically hard-to-drink accidents outrank ordinary taste imbalance?
- Default recommendation: keep texture direction; do shadow / review before migration.

## 4. Technical Review Zone

| item | source files | final impact | legacy if | data-driven rule | golden expected | score cap / forced type / feedbackTags | ingredient-specific | display text / note involvement | migration risk | validator risk | generated severity blocker | migration needs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `flavor_durian_overload` | `data/accidentRules.js`, `data/goldenSamples.js` | yes | no, rule table | partial rule table | yes | cap / type / tags | yes, durian | notes readable only | special mechanism can become per-ingredient pattern if copied blindly | do not collect from legacy rule as finished registry entry | source notes and producer decision missing | producer review, source notes, golden protection |
| `industrial_creamer_overload` | `core/accidentAnalyzer.js` | yes | yes | no | not directly in current golden search | cap / type / add values | yes, plant creamer | player-facing subjective notes | quality / health / identity semantics can drift | subjective label cannot become validator key | no source schema | producer review, source notes, shadow examples |
| `texture_taro_overload` | `core/accidentAnalyzer.js` | yes | yes | no | not directly in current golden search | cap / type / tags | yes, taro paste | notes readable only | one accident type per ingredient pattern | ingredient name must remain evidence, not mechanism key | generalized texture source missing | shadow compare, golden review, migration plan |
| `texture_oreo_overload` | `core/accidentAnalyzer.js` | yes | yes | no | not directly in current golden search | cap / type / tags | yes, Oreo crumble | note readable only | one accident type per ingredient pattern | ingredient name must remain evidence, not mechanism key | generalized texture source missing | shadow compare, golden review, migration plan |
| `texture_topping_overload` | `core/accidentAnalyzer.js` | yes | yes | no | not directly in current golden search | cap / type / tags | multiple toppings | note interpolates Chinese topping name | display note can look like mechanism logic | note / display text cannot become validator key | generalized topping source missing | producer review, shadow compare, migration plan |
| `dairy_fat_overload` | `core/accidentAnalyzer.js`, feedback sheets, generated feedback, golden | yes | yes | no | yes | cap / type / tags | group / refs | notes readable only | name can mislead source layer | `dairy` prefix cannot override texture / fatLoad fields | source notes missing | source notes, shadow examples, golden review before migration |
| `texture_straw_resistance` | `core/accidentAnalyzer.js`, summary candidate, feedback sheets, generated feedback, golden | yes | yes | summary candidate exists | yes | cap / type / tags | group refs | notes readable only | legacy thresholds and summary candidate may diverge | validator needs explicit source fields | generated severity source not defined | shadow compare, golden review |
| `taste_strong_flavor_overload` | `core/accidentAnalyzer.js` | yes | yes | no | not directly in current golden search | cap / type / tags | matcha / cocoa / coffee | note interpolates Chinese flavor name | mixed taste / flavor semantics | `taste_` prefix cannot choose sourceLayer | split target missing | producer split review, technical source review |
| `taste_acid_overload` | `data/accidentRules.js`, summary candidate, feedback sheets, generated feedback, golden | yes | no, rule table | partial rule table and summary candidate | yes | cap / type / tags | lemon evidence | notes readable only | evidence could be mistaken for per-ingredient mechanism | validator needs known ID source, not string guessing | source notes missing | source notes before severity build |
| `texture_low_drinkability` | `data/structureAccidentRules.js`, summary candidate | yes, if appended | no | yes | not directly in current golden search | cap / type / tags | no | notes readable only | suppression by earlier texture accidents must be preserved | validator must know append / suppression behavior | structure generated route absent | structure shadow / golden review |
| `texture_solid_overload` | `data/structureAccidentRules.js`, summary candidate | yes, if appended | no | yes | not directly in current golden search | cap / type / tags | no | notes readable only | suppression by earlier texture accidents must be preserved | validator must know append / suppression behavior | structure generated route absent | structure shadow / golden review |
| legacy texture dedupe fallback | `core/accidentAnalyzer.js` | yes, suppresses structure accidents | yes | no | behavior indirectly protected by golden | no new accident | no | reads type and note fallback | display text can become hidden mechanism rule | do not turn fallback text into validator key | structured tag coverage incomplete | structured tags, tests, removal plan |

## 5. Migration Readiness Table

| migrationCategory | items | actual migration now | producer review needed | source-of-truth design needed | shadow compare needed | golden update needed | blocks validator |
|---|---|---|---|---|---|---|---|
| `keep_special_candidate` | `flavor_durian_overload`, `industrial_creamer_overload` | no | yes | yes | yes | if runtime behavior changes | yes |
| `generalize_later` | `texture_taro_overload`, `texture_oreo_overload`, `texture_topping_overload` | no | yes | yes | yes | if runtime behavior changes | yes |
| `keep_with_source_notes` | `dairy_fat_overload`, `texture_straw_resistance` | no | medium | yes | yes | if runtime behavior changes | yes |
| `needs_split_review` | `taste_strong_flavor_overload` | no | yes | yes | yes | if runtime behavior changes | yes |
| `data_driven_but_needs_notes` | `taste_acid_overload`, `texture_low_drinkability`, `texture_solid_overload` | no | low / medium | yes | yes | if runtime behavior changes | yes |
| `compatibility_only` | legacy texture dedupe fallback | no | technical review | yes | yes | yes if removed | yes |

## 6. Source-of-truth / Validator Implications

- Future validator cannot directly collect future ID lists from the current legacy `accidentAnalyzer` if tree.
- A legacy observed `accidentTypeId` is runtime evidence, not a finished future registry entry.
- `flavor_durian_overload` and `industrial_creamer_overload` can remain special candidates, but still need notes, producer review, and explicit source fields.
- `texture_taro_overload`, `texture_oreo_overload`, and `texture_topping_overload` must not become a pattern for multiplying accident types by each ingredient.
- `taste_strong_flavor_overload` must not be forced into the taste layer because of the `taste_` prefix.
- `dairy_fat_overload` must not let the `dairy` name override texture / fatLoad / mouthfeel interpretation.
- Display `type`, `note`, Chinese wording, and player-facing feedback must not become validator keys.
- Candidate severity sheet validator remains later work. It should not be implemented before known accidentTypeId source design, producer review gates, and migration categories are clear.

## 7. Recommended Next Steps

1. Let producer / ChatGPT review the split categories in this report.
2. Add source notes for observed accident IDs before any future validator design.
3. Design known accidentTypeId source rules with explicit layer / source / metric fields.
4. Build a producer-facing accident migration review pack only when the task explicitly asks for it.
5. Keep runtime unchanged until shadow compare, golden review, and staged migration plan are ready.
6. Only after accident ID review, feedbackTag review, drinkStructure review, and source design are clear should candidate severity validator work resume.

## 8. Gate Reminders

- Do not migrate legacy accident IDs from this report.
- Do not let legacy accident IDs enter validator / generated data / runtime from this report.
- Do not expand ingredient-specific accidentTypeId patterns.
- Do not infer sourceLayer from ID prefix.
- Do not use displayName, zhCN, note text, or player-facing feedback as mechanism keys.
- Do not change score cap, score delta, accident priority, forced type, feedbackTags, drinkType, result.type, or golden expected from this report.
- Do not treat P1-4 as complete.

## 9. What This Report Does NOT Do

- It does not change runtime logic.
- It does not change `core/accidentAnalyzer.js`.
- It does not change `data/accidentRules.js` or `data/structureAccidentRules.js`.
- It does not change content sheets, generated data, scripts, golden samples, or existing reports.
- It does not create registry / enum / schema / validator.
- It does not migrate any `accidentTypeId`.
- It does not change player-visible score / accident / feedback / drinkType / result.type.
- It does not make any item ready for registry / validator / generated data / runtime.
- It does not close P1-4. 
