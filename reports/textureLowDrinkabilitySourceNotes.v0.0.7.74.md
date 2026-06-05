# Texture Low Drinkability Source Notes｜v0.0.7.74

## 0. Report Positioning

This report records source notes for `texture_low_drinkability`.

It is not a registry, schema, validator, runtime change, generated severity input, or takeover plan. This report does not approve any `accidentTypeId`.

This report does not add `texture_low_drinkability` to the minimal registry scaffold. It does not change `data/stableIdRegistry.js`. It does not change `scripts/content/checkStableIdRegistry.js`.

## 1. Executive Summary

- `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
- Its core is not 小料太多.
- Its core is not simply 吸管很累.
- Its core is whole-drink drinkability collapse: paste-like texture, sediment, low flow, and powder slurry.
- This round only adds source notes. It does not approve the ID, add it to the scaffold, or connect it to runtime.

## 2. Source Fields Draft

| field | draft |
|---|---|
| sourceLayer | texture |
| sourceSummary | textureSummary / structure texture summary |
| triggerMetricCandidates | drinkabilityPenalty / flowBreakdown / pasteLoad / sedimentLoad / powderSlurryLoad |
| candidateStatus | candidate_for_next_batch_after_boundary_notes |
| approval | not approved |
| canEnterRegistryNow | no |
| canEnterValidatorNow | no |
| canEnterGeneratedSeverityNow | no |
| canAffectRuntimeNow | no |

## 3. Evidence Allowed

The following can be used as evidence for `texture_low_drinkability`:

- 芋泥糊化。
- 奥利奥粉渣 / 粉渣沉积。
- 粉类过量。
- 半固体 / 糊状感。
- 沉积明显。
- 低流动性。
- 整杯不像能顺畅喝的饮品。
- historical `texture_taro_overload` migration evidence.
- historical `texture_oreo_overload` migration evidence.

## 4. Evidence Blocked

The following must not become mechanism IDs or triggerMetrics:

- Do not create a current `texture_taro_overload` ID.
- Do not create a current `texture_oreo_overload` ID.
- Do not split IDs by concrete ingredient.
- Do not use the player-facing copy 水泥感 as a triggerMetric.
- Do not use sampleId as mechanism ID.
- Do not map every straw problem to low drinkability.
- Do not map every solid overload to low drinkability.

## 5. Boundary Notes

### vs `texture_solid_overload`

- `texture_solid_overload` = 八宝粥 / 小料太多 / 固体负载太高.
- `texture_low_drinkability` = 整杯喝不动 / 低流动性 / 糊化 / 沉积.
- Solid load can affect drinkability, but these two IDs have different root causes.

### vs `texture_straw_resistance`

- `texture_straw_resistance` = 吸管很累.
- It can be one symptom of low drinkability.
- It can also come from solid overload.
- Therefore it must not be treated as automatically equal to low drinkability.

### vs ingredient-specific old IDs

- `texture_taro_overload` and `texture_oreo_overload` are historical evidence only.
- Old IDs must not return to the current registry.

## 6. What This Enables

- A later task can decide whether `texture_low_drinkability` enters the next registry scaffold batch.
- A later task can continue deciding whether `texture_straw_resistance` is an independent accident, a triggerMetric, or evidence.
- Future work should not expand `texture_low_drinkability` into every texture accident.

## 7. What This Report Does NOT Do

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
