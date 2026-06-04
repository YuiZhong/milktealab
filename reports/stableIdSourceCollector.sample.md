# Stable ID Source Collector Sample Report

## 0. Report positioning

This report is a collector proof report. It is not a registry, not an allowed values list, not validator input, and not generated data.

Observed does not mean final. Seeing an ID or tag here does not mean it has been reviewed, registered, approved, or made stable. The collector does not make mechanism decisions and does not finish naming review.

The collector output is useful as evidence for future registry design and drift checks only. Any future validator still needs an explicit source-of-truth design and human / ChatGPT review before treating values as enforceable.

## 1. Scanned sources

- `data/ingredients.js` (runtime data)
- `data/accidentRules.js` (runtime data)
- `data/structureAccidentRules.js` (runtime data)
- `data/drinkTypeRules.js` (runtime data)
- `data/feedbackTexts.js` (runtime data)
- `data/generated/feedbackTexts.generated.json` (generated data)
- `data/goldenSamples.js` (golden samples)
- `core/summaryCandidateEngine.js` (summary candidate)
- `core/candidatePriorityShellEngine.js` (priority shell)
- `content_sheets/examples/candidate_severity_rules.sample.csv` (sample sheet draft)
- `content_sheets/examples/candidate_severity_rules.sample.json` (sample sheet draft)
- `content_sheets/examples/feedback_texts.sample.csv` (content sheet sample)
- `content_sheets/examples/feedback_texts.sample.json` (content sheet sample)

Docs prose is intentionally not scanned as a fact source.

## 2. Layer summary

| observed layer | observed value count | source file count | observation count | requires review count |
| --- | --- | --- | --- | --- |
| accidentTypeId | 6 | 9 | 29 | 16 |
| candidateId | 13 | 1 | 13 | 13 |
| candidateTag | 9 | 2 | 10 | 10 |
| candidateType | 3 | 3 | 9 | 9 |
| drinkTypeId | 12 | 5 | 21 | 6 |
| feedbackTag | 17 | 7 | 57 | 36 |
| ingredientId | 37 | 3 | 56 | 0 |
| outcomeTypeId | 2 | 7 | 7 | 5 |
| priorityBand | 12 | 5 | 31 | 10 |
| profileTag | 7 | 1 | 10 | 10 |
| riskTag | 6 | 1 | 6 | 6 |
| ruleId | 5 | 2 | 10 | 0 |
| sampleId | 23 | 1 | 23 | 0 |
| severityHint | 3 | 3 | 7 | 4 |
| sourceLayer | 3 | 3 | 9 | 6 |
| sourceSummary | 3 | 3 | 9 | 6 |
| textId | 16 | 3 | 48 | 0 |
| triggerMetric | 13 | 3 | 23 | 10 |

## 3. Observed source table

| observed value | observed layer | source file | source kind | observed usage | suggested status | requires review | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| dairy_fat_overload | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| dairy_fat_overload | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| dairy_fat_overload | accidentTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| dairy_fat_overload | accidentTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| dairy_fat_overload | accidentTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.accidentTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| dairy_fat_overload | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| flavor_durian_overload | accidentTypeId | data/accidentRules.js | runtime data | accidentTypeId | runtime_review_candidate | yes | Observed in current runtime/golden-like sources; requires sourceLayer / triggerMetric / producer / mechanism review before wider severity takeover. Not a definite migration target and not a final registry entry. |
| flavor_durian_overload | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| taste_acid_overload | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste_acid_overload | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste_acid_overload | accidentTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| taste_acid_overload | accidentTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| taste_acid_overload | accidentTypeId | core/summaryCandidateEngine.js | summary candidate | accidentTypeId | registry_candidate_requires_review | no | Observed candidate reference. |
| taste_acid_overload | accidentTypeId | data/accidentRules.js | runtime data | accidentTypeId | observed_runtime_source | no | Observed in current runtime-like source; this is evidence, not a final registry entry. |
| taste_acid_overload | accidentTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.accidentTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| taste_acid_overload | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| texture_low_drinkability | accidentTypeId | core/summaryCandidateEngine.js | summary candidate | accidentTypeId | registry_candidate_requires_review | no | Observed candidate reference. |
| texture_low_drinkability | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| texture_low_drinkability | accidentTypeId | data/structureAccidentRules.js | runtime data | accidentTypeId | observed_runtime_source | no | Observed in current runtime-like source; this is evidence, not a final registry entry. |
| texture_solid_overload | accidentTypeId | core/summaryCandidateEngine.js | summary candidate | accidentTypeId | registry_candidate_requires_review | no | Observed candidate reference. |
| texture_solid_overload | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| texture_solid_overload | accidentTypeId | data/structureAccidentRules.js | runtime data | accidentTypeId | observed_runtime_source | no | Observed in current runtime-like source; this is evidence, not a final registry entry. |
| texture_straw_resistance | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture_straw_resistance | accidentTypeId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | accidentTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture_straw_resistance | accidentTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| texture_straw_resistance | accidentTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | accidentTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| texture_straw_resistance | accidentTypeId | core/summaryCandidateEngine.js | summary candidate | accidentTypeId | registry_candidate_requires_review | no | Observed candidate reference. |
| texture_straw_resistance | accidentTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.accidentTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| texture_straw_resistance | accidentTypeId | data/goldenSamples.js | golden samples | accidentTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| flavor_aroma_pressure_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| flavor_identity_conflict_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| flavor_low_beverage_fit_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| flavor_novelty_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| flavor_savory_identity_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| taste_acid_overload_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| taste_bitterness_overload_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| taste_sweet_overload_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| texture_fat_load_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| texture_low_drinkability_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| texture_sediment_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| texture_solid_overload_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| texture_straw_resistance_candidate | candidateId | core/summaryCandidateEngine.js | summary candidate | candidateId | candidate_only | yes | Candidate layer identity, not final result identity. |
| acid_accident | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| acid_accident | candidateTag | data/accidentRules.js | runtime data | tags[] | risk_tag_only | yes | Rule tags are observed rule/candidate signals, not automatically runtime feedbackTag. |
| bitterness_overload | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| durian_accident | candidateTag | data/accidentRules.js | runtime data | tags[] | risk_tag_only | yes | Rule tags are observed rule/candidate signals, not automatically runtime feedbackTag. |
| extreme_ingredient | candidateTag | data/accidentRules.js | runtime data | tags[] | risk_tag_only | yes | Rule tags are observed rule/candidate signals, not automatically runtime feedbackTag. |
| greasy_overload | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| low_drinkability | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| straw_disaster | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| sweet_overload | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| texture_heavy | candidateTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | candidate_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| accident | candidateType | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| accident | candidateType | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| accident | candidateType | core/summaryCandidateEngine.js | summary candidate | candidateType | candidate_only | yes | Candidate type enum-like value. |
| feedback | candidateType | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| feedback | candidateType | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| feedback | candidateType | core/summaryCandidateEngine.js | summary candidate | candidateType | candidate_only | yes | Candidate type enum-like value. |
| outcome | candidateType | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| outcome | candidateType | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | candidateType | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| outcome | candidateType | core/summaryCandidateEngine.js | summary candidate | candidateType | candidate_only | yes | Candidate type enum-like value. |
| brown_sugar_pearl_milk_tea | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| classic_milk_tea | drinkTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | drinkTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| classic_milk_tea | drinkTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | drinkTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| classic_milk_tea | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| classic_milk_tea | drinkTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.drinkTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| classic_milk_tea | drinkTypeId | data/goldenSamples.js | golden samples | drinkTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| coffee_special | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| dessert_milkshake | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| durian_milk | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| durian_milkshake | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| experimental_special | drinkTypeId | data/drinkTypeRules.js | runtime data | defaultTypeId | observed_runtime_source | no | Observed default drink type identity. |
| fresh_fruit_tea | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| fresh_fruit_tea | drinkTypeId | data/goldenSamples.js | golden samples | drinkTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| fruit_special | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| light_tea_drink | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| premium_thick_milk_tea | drinkTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | drinkTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| premium_thick_milk_tea | drinkTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | drinkTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| premium_thick_milk_tea | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| premium_thick_milk_tea | drinkTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.drinkTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| premium_thick_milk_tea | drinkTypeId | data/goldenSamples.js | golden samples | drinkTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| sparkling_fruit_tea | drinkTypeId | data/drinkTypeRules.js | runtime data | drinkTypeId | observed_runtime_source | no | Observed drink type rule identity. |
| accident | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| acid_accident | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| acid_accident | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| acid_accident | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| acid_accident | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| acid_accident | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| acid_accident | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| acid_milk_conflict | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| bubble_conflict | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| bubble_conflict | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| bubble_conflict | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| bubble_conflict | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| classic | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| classic | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| classic | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| classic | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| classic | feedbackTag | data/goldenSamples.js | golden samples | feedbackTagIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| dessert | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| durian | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| durian | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| durian | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| durian | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| fresh | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| greasy_overload | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| greasy_overload | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| greasy_overload | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| greasy_overload | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| greasy_overload | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| greasy_overload | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| greasy_overload | feedbackTag | data/goldenSamples.js | golden samples | feedbackTagIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| normal_good | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| normal_good | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| normal_good | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| normal_good | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| premium | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| premium | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| premium | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| premium | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| premium | feedbackTag | data/goldenSamples.js | golden samples | feedbackTagIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| straw_disaster | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| straw_disaster | feedbackTag | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | feedbackTag | draft_only | yes | Sample sheet draft field; must be reviewed before use by any registry or validator. |
| straw_disaster | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| straw_disaster | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| straw_disaster | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| straw_disaster | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| straw_disaster | feedbackTag | data/goldenSamples.js | golden samples | feedbackTagIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| straw_followup | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| sweet | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| thick_followup | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| thick_followup | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| thick_followup | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| thick_followup | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| thick_straw_followup | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| weird | feedbackTag | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| weird | feedbackTag | content_sheets/examples/feedback_texts.sample.json | content sheet sample | feedbackTag | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| weird | feedbackTag | data/feedbackTexts.js | runtime data | feedbackTagPools key | observed_runtime_source | no | Observed in current runtime feedback tag pool mapping. |
| weird | feedbackTag | data/generated/feedbackTexts.generated.json | generated data | textsById.feedbackTag | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| dairy_coconut_milk | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| dairy_cream | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| dairy_cream | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| dairy_milk | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| dairy_milk | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| dairy_non_dairy_creamer | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| dairy_oat_milk | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| dairy_thick_milk | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| dairy_thick_milk | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| flavor_cocoa | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| flavor_matcha | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_durian | ingredientId | data/accidentRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed rule ingredient reference. |
| fruit_durian | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_durian | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_grape | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_grape | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_lemon | ingredientId | data/accidentRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed rule ingredient reference. |
| fruit_lemon | ingredientId | data/drinkTypeRules.js | runtime data | allIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_lemon | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_lychee | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_mango | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_peach | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_peach | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_strawberry | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_strawberry | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| fruit_watermelon | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| fruit_watermelon | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| liquid_coffee | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| liquid_coffee | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| liquid_sparkling_water | ingredientId | data/drinkTypeRules.js | runtime data | allIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| liquid_sparkling_water | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| liquid_sparkling_water | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| liquid_water | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| seasoning_sea_salt | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| sweetener_brown_sugar | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| sweetener_brown_sugar | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| sweetener_caramel | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| sweetener_honey | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| sweetener_white_sugar | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| tea_black | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| tea_green | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| tea_green | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| tea_jasmine | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| tea_oolong | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| tea_oolong | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| tea_puer | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_cheese_foam | ingredientId | data/drinkTypeRules.js | runtime data | anyIngredientIds[] | observed_runtime_source | no | Observed drink type ingredient reference. |
| topping_cheese_foam | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_coconut_jelly | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_grass_jelly | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_oreo_crumble | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_pearl | ingredientId | data/drinkTypeRules.js | runtime data | ingredientId | observed_runtime_source | no | Observed drink type ingredient reference. |
| topping_pearl | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_pudding | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_taro_ball | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| topping_taro_paste | ingredientId | data/ingredients.js | runtime data | ingredientMeta.id | observed_runtime_source | no | Observed in ingredient metadata. |
| flavor_identity_conflict | outcomeTypeId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | outcomeTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity_conflict | outcomeTypeId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | outcomeTypeId | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity_conflict | outcomeTypeId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | outcomeTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| flavor_identity_conflict | outcomeTypeId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | outcomeTypeId | registry_candidate_requires_review | yes | Feedback sample source reference; useful evidence, not a registry decision. |
| flavor_identity_conflict | outcomeTypeId | data/generated/feedbackTexts.generated.json | generated data | textsById.outcomeTypeId | generated_only | yes | Observed in generated feedback data; generated observation is not a registry decision. |
| flavor_identity_conflict | outcomeTypeId | data/goldenSamples.js | golden samples | outcomeTypeIdIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| novelty_experiment | outcomeTypeId | core/summaryCandidateEngine.js | summary candidate | outcomeTypeId | registry_candidate_requires_review | no | Observed candidate reference. |
| feedback_hint | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| feedback_hint | priorityBand | data/goldenSamples.js | golden samples | priorityBandIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| flavor_fit | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases key | registry_candidate_requires_review | yes | Observed alias value; should be explicit if used by validator. |
| flavor_fit | priorityBand | core/summaryCandidateEngine.js | summary candidate | priorityBand | registry_candidate_requires_review | no | Observed candidate priority band. |
| flavor_identity | priorityBand | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity | priorityBand | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases value | observed_runtime_source | no | Observed priority shell alias target. |
| flavor_identity | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| flavor_identity | priorityBand | core/summaryCandidateEngine.js | summary candidate | priorityBand | registry_candidate_requires_review | no | Observed candidate priority band. |
| flavor_identity | priorityBand | data/goldenSamples.js | golden samples | priorityBandIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| hard_physical | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases value | observed_runtime_source | no | Observed priority shell alias target. |
| hard_physical | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| hard_physical | priorityBand | data/goldenSamples.js | golden samples | priorityBandIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| normal_conflict | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| positive_combo | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases key | registry_candidate_requires_review | yes | Observed alias value; should be explicit if used by validator. |
| positive_synergy | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases value | observed_runtime_source | no | Observed priority shell alias target. |
| positive_synergy | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| taste_overload | priorityBand | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste_overload | priorityBand | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste_overload | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| taste_overload | priorityBand | core/summaryCandidateEngine.js | summary candidate | priorityBand | registry_candidate_requires_review | no | Observed candidate priority band. |
| taste_overload | priorityBand | data/goldenSamples.js | golden samples | priorityBandIncludes[] | registry_candidate_requires_review | no | Observed golden expected value; candidate evidence only. |
| texture_blocking | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases key | registry_candidate_requires_review | yes | Observed alias value; should be explicit if used by validator. |
| texture_blocking | priorityBand | core/summaryCandidateEngine.js | summary candidate | priorityBand | registry_candidate_requires_review | no | Observed candidate priority band. |
| texture_drinkability | priorityBand | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture_drinkability | priorityBand | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | priorityBand | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture_drinkability | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases value | observed_runtime_source | no | Observed priority shell alias target. |
| texture_drinkability | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| texture_load | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandAliases key | registry_candidate_requires_review | yes | Observed alias value; should be explicit if used by validator. |
| texture_load | priorityBand | core/summaryCandidateEngine.js | summary candidate | priorityBand | registry_candidate_requires_review | no | Observed candidate priority band. |
| type_classification | priorityBand | core/candidatePriorityShellEngine.js | priority shell | priorityBandOrder[] | observed_runtime_source | no | Observed priority shell ordering value. |
| high_solid_load | profileTag | data/structureAccidentRules.js | runtime data | requiredTags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| high_straw_resistance | profileTag | data/structureAccidentRules.js | runtime data | requiredTags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| high_straw_resistance | profileTag | data/structureAccidentRules.js | runtime data | tags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| low_drinkability | profileTag | data/structureAccidentRules.js | runtime data | requiredTags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| low_drinkability | profileTag | data/structureAccidentRules.js | runtime data | tags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| low_liquid_support | profileTag | data/structureAccidentRules.js | runtime data | requiredTags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| low_liquid_support | profileTag | data/structureAccidentRules.js | runtime data | tags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| semi_solid | profileTag | data/structureAccidentRules.js | runtime data | tags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| texture_forward | profileTag | data/structureAccidentRules.js | runtime data | requiredTags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| texture_heavy | profileTag | data/structureAccidentRules.js | runtime data | tags[] | needs_review | yes | Structure tags are observed source tags and must stay separated from feedbackTag. |
| aroma_pressure | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| identity_conflict | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| low_beverage_fit | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| novelty | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| savory_identity | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| texture_sediment | riskTag | core/summaryCandidateEngine.js | summary candidate | feedbackTags[] | risk_tag_only | yes | Candidate feedbackTags are observed candidate signals; they are not automatically runtime feedbackTag. |
| flavor_aroma_pressure_feedback_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| flavor_aroma_pressure_feedback_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity_conflict_outcome_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| flavor_identity_conflict_outcome_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| taste_acid_overload_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| taste_acid_overload_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| texture_dairy_fat_load_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| texture_dairy_fat_load_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| texture_straw_resistance_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| texture_straw_resistance_draft | ruleId | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | ruleId | draft_only | no | Observed in disabled sample sheet draft; not a registry source. |
| bubble_cream_conflict | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| bubble_cream_conflict_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| classic_milk_tea | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| classic_milk_tea_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| drinkable_taro_milk_tea | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| extreme_durian_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| extreme_lemon_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| fresh_bubble_fruit_tea | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| fresh_bubble_fruit_tea_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| greasy_overload | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| greasy_overload_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| high_durian_oddity_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| high_durian_oddity_accident_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| high_lemon_acid_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| industrial_milk_tea | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| oreo_low_drinkability_migration | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| oreo_overload_texture_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| premium_oolong_milk | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| solid_taro_low_liquid | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| straw_resistance_accident | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| straw_resistance_accident_id_equivalence | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| taro_low_drinkability_migration | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| topping_solid_overload_migration | sampleId | data/goldenSamples.js | golden samples | sample id | sample_only | no | Golden sample identity; must not enter mechanism rule keys. |
| high | severityHint | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | severityHint | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| high | severityHint | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | severityHint | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| high | severityHint | core/summaryCandidateEngine.js | summary candidate | severityHint | registry_candidate_requires_review | no | Observed candidate hint, not final severity. |
| low | severityHint | core/summaryCandidateEngine.js | summary candidate | severityHint | registry_candidate_requires_review | no | Observed candidate hint, not final severity. |
| medium | severityHint | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | severityHint | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| medium | severityHint | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | severityHint | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| medium | severityHint | core/summaryCandidateEngine.js | summary candidate | severityHint | registry_candidate_requires_review | no | Observed candidate hint, not final severity. |
| flavor | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavor | sourceLayer | core/summaryCandidateEngine.js | summary candidate | sourceLayer | registry_candidate_requires_review | no | Observed source layer value from candidate schema. |
| taste | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| taste | sourceLayer | core/summaryCandidateEngine.js | summary candidate | sourceLayer | registry_candidate_requires_review | no | Observed source layer value from candidate schema. |
| texture | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture | sourceLayer | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceLayer | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| texture | sourceLayer | core/summaryCandidateEngine.js | summary candidate | sourceLayer | registry_candidate_requires_review | no | Observed source layer value from candidate schema. |
| flavorSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavorSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| flavorSummary | sourceSummary | core/summaryCandidateEngine.js | summary candidate | sourceSummary | registry_candidate_requires_review | no | Observed source summary value from candidate schema. |
| tasteSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| tasteSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| tasteSummary | sourceSummary | core/summaryCandidateEngine.js | summary candidate | sourceSummary | registry_candidate_requires_review | no | Observed source summary value from candidate schema. |
| textureSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| textureSummary | sourceSummary | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | sourceSummary | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| textureSummary | sourceSummary | core/summaryCandidateEngine.js | summary candidate | sourceSummary | registry_candidate_requires_review | no | Observed source summary value from candidate schema. |
| feedback_acid_accident_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_acid_accident_002 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_002 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_002 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_acid_accident_003 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_003 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_acid_accident_003 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_bubble_conflict_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_bubble_conflict_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_bubble_conflict_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_classic_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_classic_002 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_002 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_002 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_classic_003 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_003 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_classic_003 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_disabled_idea_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_disabled_idea_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_disabled_idea_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_durian_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_durian_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_durian_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_greasy_overload_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_greasy_overload_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_greasy_overload_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_greasy_overload_002 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_greasy_overload_002 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_greasy_overload_002 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_normal_good_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_normal_good_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_normal_good_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_premium_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_premium_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_premium_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_straw_disaster_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_straw_disaster_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_straw_disaster_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_straw_disaster_002 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_straw_disaster_002 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_straw_disaster_002 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| feedback_thick_followup_001 | textId | content_sheets/examples/feedback_texts.sample.csv | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_thick_followup_001 | textId | content_sheets/examples/feedback_texts.sample.json | content sheet sample | textId | generated_only | no | Feedback text identity from sample source; build output still needs validation before runtime use. |
| feedback_thick_followup_001 | textId | data/generated/feedbackTexts.generated.json | generated data | textsById.textId | generated_only | no | Observed in generated feedback data; generated observation is not a registry decision. |
| acidity | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| acidity | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| acidity | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| aromaPressure | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| aromaPressure | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| aromaPressure | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| beverageFit | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| bitterness | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| drinkability | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| fatLoad | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| fatLoad | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| fatLoad | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| identityConflictRisk | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| identityConflictRisk | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| identityConflictRisk | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| noveltyRisk | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| savoryRisk | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| sedimentRisk | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| solidLoad | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| strawResistance | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.csv | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| strawResistance | triggerMetric | content_sheets/examples/candidate_severity_rules.sample.json | sample sheet draft | triggerMetric | draft_only | yes | Observed in disabled sample sheet draft; not a registry source. |
| strawResistance | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |
| sweetness | triggerMetric | core/summaryCandidateEngine.js | summary candidate | triggerMetric | registry_candidate_requires_review | no | Observed trigger metric from candidate schema; must be checked against sourceSummary. |

## 4. High-risk boundary reminders

- `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, and `novelty` are observed candidate / risk tags. They must not be automatically treated as runtime feedbackTag.
- `bubble_conflict` is observed as a feedbackTag, but it must not be generalized to flavor identity conflict without review.
- `dairy_fat_overload` should be kept as observed, but any severity sample use needs notes that sourceLayer / sourceSummary / triggerMetric control its current meaning.
- `flavor_durian_overload`, `industrial_creamer_overload`, and similar current legacy or ingredient-specific IDs should not be renamed in place. Treat them as mechanism review items until a reviewed migration plan exists.
- `texture_taro_overload` is a historical / pre-v0.0.7.46 legacy reference after migration to `texture_low_drinkability`. These IDs are not current active runtime IDs and must not enter current registry, validator, generated severity input, or runtime takeover decisions from this collector.
- `texture_oreo_overload` is a historical / pre-v0.0.7.47 legacy reference after migration to `texture_low_drinkability`. These IDs are not current active runtime IDs and must not enter current registry, validator, generated severity input, or runtime takeover decisions from this collector.
- `texture_topping_overload` is a historical / pre-v0.0.7.49 legacy reference after migration to `texture_solid_overload`. These IDs are not current active runtime IDs and must not enter current registry, validator, generated severity input, or runtime takeover decisions from this collector.
- Candidate severity draft ruleIds remain sample sheet draft identities and must not enter any registry by collection alone.
- Golden sampleId values are test identities only and must not become mechanism rule keys.

## 5. Drift check / future use

- If runtime sources later show a new observed ID but a future reviewed source-of-truth file does not contain it, report it for review. Do not auto-add it.
- If a future reviewed source-of-truth file contains an ID that no runtime, golden, generated, or sheet source references, report it for review. Do not auto-delete it.
- This collector provides evidence and drift hints only. It does not decide legality, quality, mechanism meaning, or runtime takeover readiness.
