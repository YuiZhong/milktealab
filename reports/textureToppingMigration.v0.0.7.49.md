# Texture topping accident migration｜v0.0.7.49

## 0. Report Positioning

This report records the actual migration of the generic topping overload texture accident:

```text
texture_topping_overload -> texture_solid_overload
```

This is a small runtime migration slice. It only migrates the topping overload loop. It does not go back to taro or Oreo, does not create a topping-specific accident type, and does not open registry / enum / schema / validator work.

## 1. Before / After

| item | before | after |
|---|---|---|
| runtime branch | topping ratio > 45 loop in `core/accidentAnalyzer.js` | same branch |
| accidentTypeId | `texture_topping_overload` | `texture_solid_overload` |
| trigger | `ratio > 45` for pearl / taro ball / pudding / grass jelly / coconut jelly refs | unchanged |
| score | `ratio > 65 ? -34 : -18` | unchanged |
| cap | `ratio > 65 ? 38 : 55` | unchanged |
| type | `实验特调` | unchanged |
| add | `{ straw: 34, thick: 8, difficulty: 12 }` | unchanged |
| note | concrete topping name / straw fitness-test wording | unchanged |
| active texture accident set | included `texture_topping_overload` | removed `texture_topping_overload` |

## 2. Modified Files

- `core/accidentAnalyzer.js`
- `data/goldenSamples.js`
- `index.html`
- `docs/VERSION_LOG.md`
- `docs/AI_CONTEXT.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- `reports/textureToppingMigration.v0.0.7.49.md`

## 3. Preserved Player-Facing Meaning

The migration changes mechanism identity, not the player-facing explanation.

Preserved:

- concrete topping trigger evidence, such as pearl / taro ball / pudding / grass jelly / coconut jelly
- solid-load / straw-pressure direction
- the “比例太高” note
- the “不是加小料，是给吸管安排体能测试” joke direction
- existing score / cap / type / add values

The topping personality, including “八宝粥感” style producer interpretation, remains evidence / notes / feedback copy. It is not encoded into `accidentTypeId`.

## 4. Golden Sample Change

`data/goldenSamples.js` now protects the migrated ID with a focused topping migration sample:

```text
topping_solid_overload_migration
accidentTypeIdIncludes: ["texture_solid_overload"]
```

The sample uses high pearl ratio as a representative topping overload path. It protects the generalized accident ID while keeping concrete topping and straw-fitness-test wording in feedback expectations.

## 5. Why Taro / Oreo Were Not Changed

This task explicitly authorized only topping migration.

Already completed before this slice:

- `texture_taro_overload` -> `texture_low_drinkability` in v0.0.7.46
- `texture_oreo_overload` -> `texture_low_drinkability` in v0.0.7.47

This slice does not revisit their runtime branches, notes, score, cap, type, add, feedbackTags, or golden expectations.

## 6. Why No New accidentTypeId Was Added

The v0.0.7.45 plan chose the existing target `texture_solid_overload` for topping overload.

This migration does not add:

- `texture_topping_specific_overload`
- `texture_pearl_overload`
- `texture_taro_ball_overload`
- `texture_pudding_overload`
- `texture_grass_jelly_overload`
- `texture_coconut_jelly_overload`
- `texture_eight_treasure_overload`
- any per-topping texture accident type

## 7. Why No Topping-Specific Selector Was Added

The existing legacy loop still uses the existing topping refs and ratio threshold as the migration source. This task did not add any new topping-specific if, feedback selector, or future mechanism key.

The concrete topping name remains player-facing evidence for why solid overload happened. It should not become a new long-term mechanism identity.

## 8. Historical Positioning

After v0.0.7.49, `texture_topping_overload` should be treated as:

```text
historical / pre-v0.0.7.49 legacy accidentTypeId
```

It may remain in docs and reports as migration history. It should not appear in active runtime, data, content sheets, generated data, or player-facing runtime data as a current effective accident ID.

`scripts/content/collectStableIdSources.js` may still contain old legacy guardrail text. That collector text is not changed in this task and is not a runtime emission path.

## 9. P1-4 Status

P1-4 is still not fully solved.

Completed before this slice:

- taro actual migration to `texture_low_drinkability`
- Oreo actual migration to `texture_low_drinkability`

Completed in this slice:

- topping actual migration to `texture_solid_overload`

Still pending:

- accidentAnalyzer broader migration route
- accidentTypeId source-of-truth / registry / schema design
- collector / source wording cleanup for historical IDs
- validator / generated severity / shadow / partial takeover gates

## 10. What This Report Does NOT Do

This report does not:

- migrate taro or Oreo again
- add a new accidentTypeId
- add a topping-specific future if / selector
- open registry / enum / schema / validator work
- build generated severity data
- change generated feedback data
- change content sheets
- approve partial takeover
- approve active takeover
- mark P1-4 solved
