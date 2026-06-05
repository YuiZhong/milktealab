# Texture Drinkability Boundary Review｜v0.0.7.72

## 0. Report Positioning

This report is a short boundary review for three adjacent texture accident concepts:

- `texture_solid_overload`
- `texture_low_drinkability`
- `texture_straw_resistance`

It is not a registry, schema, validator, runtime change, generated severity input, or takeover plan.

This report does not approve any new `accidentTypeId`. It does not add `texture_low_drinkability` to the minimal registry scaffold. It does not change the existing `texture_solid_overload` scaffold entry or status.

## 1. Executive Summary

- `texture_solid_overload` = 八宝粥感 / 小料太多。
- `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
- `texture_straw_resistance` = 吸管很累；it is currently treated as a straw-level symptom / metric / adjacent mechanism, not automatically the root cause.
- This round only pins human-readable boundaries. It does not implement rules, change runtime, or change registry membership.

## 2. Boundary Table

| id | 人话 | 核心根因 | 可以作为证据的东西 | 不应该混淆为 | 当前处理 |
|---|---|---|---|---|---|
| `texture_solid_overload` | 八宝粥感 / 小料太多 | 固体 / 小料负载太高，液体支撑不足 | 珍珠、芋圆、椰果、布丁、仙草等小料过多；`solidLoad` / `textureRatio` / `lowLiquidSupport` | 所有吸管问题；所有喝不动问题；具体小料专属事故 ID | 已在 minimal registry scaffold 中作为 `reviewed_candidate_not_approved`，本轮不改 |
| `texture_low_drinkability` | 水泥感 / 粉浆感 / 喝不动 | 整杯可饮用性崩坏，偏糊化、沉积、低流动性、粉浆感 | 芋泥糊化、奥利奥粉渣、粉类过量、沉积、低流动性 | 固体小料太多；单纯吸管阻力；具体原料专属事故 ID | 仍是 boundary-pending，本轮不加入 scaffold |
| `texture_straw_resistance` | 吸管很累 | 不一定是根因，更像吸管层面的表现 / 指标 / 相邻机制 | 吸管难吸、颗粒堵、黏稠堵、固体堵 | 自动等于 `texture_solid_overload`；自动等于 `texture_low_drinkability` | final decision not this round |

### `texture_solid_overload`

- 人话：八宝粥感 / 小料太多。
- 核心根因：固体 / 小料负载太高，液体支撑不足。
- 证据：珍珠、芋圆、椰果、布丁、仙草等小料过多；`solidLoad` / `textureRatio` / `lowLiquidSupport`。
- 不应混淆为：所有吸管问题；所有喝不动问题；具体小料专属事故 ID。
- 当前处理：已在 minimal registry scaffold 中作为 `reviewed_candidate_not_approved`，本轮不改。

### `texture_low_drinkability`

- 人话：水泥感 / 粉浆感 / 喝不动。
- 核心根因：整杯可饮用性崩坏，偏糊化、沉积、低流动性、粉浆感。
- 证据：芋泥糊化、奥利奥粉渣、粉类过量、沉积、低流动性。
- 不应混淆为：固体小料太多；单纯吸管阻力；具体原料专属事故 ID。
- 当前处理：仍是 boundary-pending，本轮不加入 scaffold。

### `texture_straw_resistance`

- 人话：吸管很累。
- 核心根因：不一定是根因，更像吸管层面的表现 / 指标 / 相邻机制。
- 证据：吸管难吸、颗粒堵、黏稠堵、固体堵。
- 不应混淆为：自动等于 `texture_solid_overload`；自动等于 `texture_low_drinkability`。
- 当前处理：final decision not this round。

## 3. Producer Decision Captured

```text
八宝粥 = texture_solid_overload
水泥 / 粉浆 / 喝不动 = texture_low_drinkability
吸管很累 = texture_straw_resistance
```

This is producer intuition captured as a boundary note. It is not a runtime rule.

## 4. What This Enables

- Future work can review `texture_low_drinkability` on its own without confusing it with topping overload.
- Future work can decide whether `texture_straw_resistance` should be an independent accident, a trigger metric, or evidence.
- Future work should not expand `texture_solid_overload` into every texture / drinkability accident.

## 5. What This Report Does NOT Do

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
