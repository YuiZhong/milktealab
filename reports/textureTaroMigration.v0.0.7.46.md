# Texture taro accident migration｜v0.0.7.46

## 0. Report Positioning

This report records the actual migration of the taro paste texture accident:

```text
texture_taro_overload -> texture_low_drinkability
```

This is a small runtime migration slice. It only migrates the taro branch. It does not migrate Oreo, does not migrate topping overload, does not create a new accident type, and does not open registry / enum / schema / validator work.

## 1. Before / After

| item | before | after |
|---|---|---|
| runtime branch | taro paste ratio > 50 in `core/accidentAnalyzer.js` | same branch |
| accidentTypeId | `texture_taro_overload` | `texture_low_drinkability` |
| trigger | `taro > 50` | unchanged |
| score | `-24` | unchanged |
| cap | `52` | unchanged |
| type | `实验特调` | unchanged |
| add | `{ thick: 28, straw: 34, odd: 12, difficulty: 14 }` | unchanged |
| note | taro paste / wall-surface wording | unchanged |
| active texture accident set | included `texture_taro_overload` | removed `texture_taro_overload` |

## 2. Modified Files

- `core/accidentAnalyzer.js`
- `data/goldenSamples.js`
- `index.html`
- `docs/VERSION_LOG.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- `reports/textureTaroMigration.v0.0.7.46.md`

## 3. Preserved Player-Facing Meaning

The migration changes mechanism identity, not the player-facing explanation.

Preserved:

- taro paste trigger evidence
- thick / low-flow / straw pressure direction
- the “芋泥比例太高” note
- the wall-surface / cement-like joke direction
- existing score / cap / type / add values

The taro personality remains evidence / notes / feedback copy. It is no longer encoded into `accidentTypeId`.

## 4. Golden Sample Change

`data/goldenSamples.js` now protects the migrated ID with a focused taro migration sample:

```text
taro_low_drinkability_migration
accidentTypeIdIncludes: ["texture_low_drinkability"]
```

The older `solid_taro_low_liquid` sample remains focused on high-solid / low-liquid behavior and can still surface the heavier straw-resistance accident. Existing score, type, and feedback expectations were not weakened.

## 5. Why Oreo / Topping Were Not Migrated

This task explicitly authorized only taro migration.

`texture_oreo_overload` remains a current runtime legacy fact because Oreo has crumb / sediment / powder evidence that needs separate copy and golden review.

`texture_topping_overload` remains a current runtime legacy fact because the current branch interpolates concrete topping display names and has a broader player-facing explanation risk.

## 6. Why No New accidentTypeId Was Added

The v0.0.7.45 plan chose the existing target `texture_low_drinkability` for taro.

This migration does not add:

- `texture_paste_overload`
- `texture_sediment_overload`
- `texture_topping_specific_overload`
- any per-ingredient texture accident type

## 7. Historical Positioning

After v0.0.7.46, `texture_taro_overload` should be treated as:

```text
historical / pre-v0.0.7.46 legacy accidentTypeId
```

It may remain in docs and reports as migration history. It should not appear in active runtime, content sheets, scripts, or generated data as a current effective accident ID.

## 8. P1-4 Status

P1-4 is still not fully solved.

Completed in this slice:

- taro actual migration to `texture_low_drinkability`

Still pending:

- Oreo migration review / implementation
- topping migration review / implementation
- accidentAnalyzer broader migration route
- accidentTypeId source-of-truth / registry / schema design
- validator / generated severity / shadow / partial takeover gates

## 9. What This Report Does NOT Do

This report does not:

- migrate `texture_oreo_overload`
- migrate `texture_topping_overload`
- add a new accidentTypeId
- open registry / enum / schema / validator work
- build generated severity data
- change generated feedback data
- change content sheets
- approve partial takeover
- approve active takeover
- mark P1-4 solved
