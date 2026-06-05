# Texture Low Drinkability Candidate Notes Record｜v0.0.7.75

## 0. Report Positioning

This report records candidate notes for `texture_low_drinkability`.

It is not a registry, schema, validator, runtime change, generated severity input, or takeover plan. This report does not approve any `accidentTypeId`.

This report does not add `texture_low_drinkability` to the minimal registry scaffold. It does not change `data/stableIdRegistry.js`. It does not change `scripts/content/checkStableIdRegistry.js`.

## 1. Executive Summary

- `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
- It already has a candidate decision draft and source notes.
- This round organizes it as a next-batch candidate notes record.
- It is still not approved, not in scaffold, and cannot enter validator / generated severity / runtime.

## 2. Candidate Notes Record Table

| field | value |
|---|---|
| accidentTypeId | `texture_low_drinkability` |
| humanMeaning | 水泥感 / 粉浆感 / 喝不动 |
| candidateRecordStatus | `candidate_notes_recorded_not_approved` |
| sourceLayer | `texture` |
| sourceSummary | `textureSummary / structure texture summary` |
| triggerMetricNotes | `drinkabilityPenalty` / `flowBreakdown` / `pasteLoad` / `sedimentLoad` / `powderSlurryLoad`; final metric name still requires later review |
| evidenceAllowed | 芋泥糊化；奥利奥粉渣 / 粉渣沉积；粉类过量；半固体 / 糊状感；沉积明显；低流动性；整杯不像能顺畅喝的饮品；historical `texture_taro_overload` migration evidence；historical `texture_oreo_overload` migration evidence |
| evidenceBlocked | no current `texture_taro_overload`; no current `texture_oreo_overload`; no ingredient-specific current ID; no player-facing copy as triggerMetric; no sampleId as mechanism ID; no every straw problem as low drinkability; no every solid overload as low drinkability |
| boundaryNotes | distinct from `texture_solid_overload`; distinct from `texture_straw_resistance`; straw resistance can be evidence / symptom, not automatic identity; solid load can affect drinkability, but root cause differs |
| requiredBeforeApproval | final triggerMetric name; explicit evidence refs / golden refs; producer / ChatGPT confirmation; later candidate gate / registry scaffold decision |
| canEnterRegistryNow | no |
| canEnterValidatorNow | no |
| canEnterGeneratedSeverityNow | no |
| canAffectRuntimeNow | no |

## 3. Boundary Confirmation

- 八宝粥 / 小料太多 = `texture_solid_overload`。
- 水泥 / 粉浆 / 喝不动 = `texture_low_drinkability`。
- 吸管很累 = `texture_straw_resistance`。

`texture_low_drinkability` is not all texture accidents, all straw resistance, or all solid overload. It can include straw difficulty as evidence, but its core is whole-drink drinkability collapse.

## 4. Historical Evidence Notes

- `texture_taro_overload` is a historical / pre-v0.0.7.46 legacy reference.
- `texture_oreo_overload` is a historical / pre-v0.0.7.47 legacy reference.
- Both can be used as migration evidence for `texture_low_drinkability`.
- Neither can return as a current registry entry.

## 5. What This Enables

- A later task can judge whether `texture_low_drinkability` enters the next minimal scaffold.
- A later task can continue deciding `texture_straw_resistance` as an independent accident, triggerMetric, or evidence.
- Future work should not expand `texture_low_drinkability` into every texture accident.

## 6. What This Report Does NOT Do

- Does not change the registry scaffold.
- Does not add a registry entry.
- Does not add `texture_low_drinkability` to the registry.
- Does not add `texture_straw_resistance` to the registry.
- Does not modify `data/stableIdRegistry.js`.
- Does not modify `scripts/content/checkStableIdRegistry.js`.
- Does not modify runtime.
- Does not modify `core/*`.
- Does not modify generated data.
- Does not modify content sheets.
- Does not modify golden expected.
- Does not implement a validator.
- Does not build generated severity.
- Does not do shadow / partial / active takeover.
