# Texture Low Drinkability Candidate Decision Draft｜v0.0.7.73

## 0. Report Positioning

This report is a short candidate decision draft for `texture_low_drinkability`.

It is not a registry, schema, validator, runtime change, generated severity input, or takeover plan. This report does not approve any `accidentTypeId`.

This report does not add `texture_low_drinkability` to the minimal registry scaffold. It does not change `data/stableIdRegistry.js`. It does not change `scripts/content/checkStableIdRegistry.js`.

## 1. Executive Summary

- `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
- Its boundary with `texture_solid_overload` and `texture_straw_resistance` was initially pinned in v0.0.7.72.
- This round recommends that `texture_low_drinkability` can enter the next accidentTypeId candidate decision draft.
- It is still not approved, still not in the scaffold, and still cannot enter validator / generated severity / runtime.

## 2. Candidate Decision Table

| accidentTypeId | 人话 | recommendedDecision | reason | boundaryNotes | stillMissing | canEnterRegistryNow | canEnterValidatorNow | canEnterGeneratedSeverityNow | canAffectRuntimeNow |
|---|---|---|---|---|---|---|---|---|---|
| `texture_low_drinkability` | 水泥感 / 粉浆感 / 喝不动 | `candidate_for_next_batch_after_boundary_notes` | 机制人话清楚；与 `texture_solid_overload` 已初步分界；与 `texture_straw_resistance` 已初步分界；taro / Oreo migration history can support evidence without reviving old IDs | distinct from `texture_solid_overload`; distinct from `texture_straw_resistance`; not ingredient-specific; not player-facing copy as mechanism ID | final sourceLayer / sourceSummary / triggerMetric notes; explicit evidence refs / golden refs; producer / ChatGPT confirmation; later candidate notes / gate if needed | no | no | no | no |

### `texture_low_drinkability`

- 人话：水泥感 / 粉浆感 / 喝不动。
- recommendedDecision: `candidate_for_next_batch_after_boundary_notes`。
- reason:
  - 机制人话清楚。
  - 与 `texture_solid_overload` 已初步分界。
  - 与 `texture_straw_resistance` 已初步分界。
  - 过去 taro / Oreo migration evidence 可作为历史 evidence，但旧 ID 不回流。
- boundaryNotes:
  - distinct from `texture_solid_overload`。
  - distinct from `texture_straw_resistance`。
  - not ingredient-specific。
  - not player-facing copy as mechanism ID。
- stillMissing:
  - final sourceLayer / sourceSummary / triggerMetric notes。
  - explicit evidence refs / golden refs。
  - producer / ChatGPT confirmation。
  - later candidate notes / gate if needed。
- canEnterRegistryNow: no。
- canEnterValidatorNow: no。
- canEnterGeneratedSeverityNow: no。
- canAffectRuntimeNow: no。

## 3. Boundary Confirmation

v0.0.7.72 captured this producer boundary:

```text
八宝粥 = texture_solid_overload
水泥 / 粉浆 / 喝不动 = texture_low_drinkability
吸管很累 = texture_straw_resistance
```

This means:

- `texture_low_drinkability` is not all solid overload.
- `texture_low_drinkability` is not all straw resistance.
- `texture_low_drinkability` can include straw difficulty as evidence, but its core is whole-drink drinkability collapse.

## 4. Historical Evidence Notes

- `texture_taro_overload` is historical / pre-v0.0.7.46 legacy reference only.
- `texture_oreo_overload` is historical / pre-v0.0.7.47 legacy reference only.
- These old IDs can support migration history / evidence, but they must not return to the current registry.
- Do not create current entries for `texture_taro_overload` or `texture_oreo_overload`.

## 5. What This Enables

- A later task can add concise source notes for `texture_low_drinkability`.
- A later task can decide whether it enters the registry scaffold next.
- A later task can keep reviewing whether `texture_straw_resistance` is an independent accident, a triggerMetric, or evidence.

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
