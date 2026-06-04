# Texture Oreo accident migration｜v0.0.7.47

## 0. Report Positioning

This report records the actual migration of the Oreo crumble texture accident:

```text
texture_oreo_overload -> texture_low_drinkability
```

This is a small runtime migration slice. It only migrates the Oreo branch. It does not migrate topping overload, does not create a new accident type, and does not open registry / enum / schema / validator work.

## 1. Before / After

| item | before | after |
|---|---|---|
| runtime branch | Oreo crumble ratio > 40 in `core/accidentAnalyzer.js` | same branch |
| accidentTypeId | `texture_oreo_overload` | `texture_low_drinkability` |
| trigger | `oreo > 40` | unchanged |
| score | `oreo > 60 ? -44 : -24` | unchanged |
| cap | `oreo > 60 ? 32 : 48` | unchanged |
| type | `口感事故` | unchanged |
| add | `{ straw: 42, thick: 16, odd: 18, difficulty: 14 }` | unchanged |
| note | Oreo / straw-mining / dessert-layer wording | unchanged |
| active texture accident set | included `texture_oreo_overload` | removed `texture_oreo_overload` |

## 2. Modified Files

- `core/accidentAnalyzer.js`
- `data/goldenSamples.js`
- `index.html`
- `docs/VERSION_LOG.md`
- `docs/V0_0_7_MECHANISM_TODO.md`
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
- `reports/textureOreoMigration.v0.0.7.47.md`

## 3. Preserved Player-Facing Meaning

The migration changes mechanism identity, not the player-facing explanation.

Preserved:

- Oreo crumble trigger evidence
- crumb / sediment / straw difficulty direction
- the “奥利奥碎比例太高” note
- the straw-mining / dessert-layer joke direction
- existing score / cap / type / add values

The Oreo personality remains evidence / notes / feedback copy. It is no longer encoded into `accidentTypeId`.

## 4. Golden Sample Change

`data/goldenSamples.js` now protects the migrated ID with a focused Oreo migration sample:

```text
oreo_low_drinkability_migration
accidentTypeIdIncludes: ["texture_low_drinkability"]
```

The older `oreo_overload_texture_accident` sample remains focused on broad Oreo overload texture behavior and can still surface the heavier straw-resistance accident. Existing score, type, and feedback expectations were not weakened.

## 5. Why Topping Was Not Migrated

This task explicitly authorized only Oreo migration.

`texture_topping_overload` remains a current runtime legacy fact because the current branch interpolates concrete topping display names and has a broader player-facing explanation risk.

## 6. Why No New accidentTypeId Was Added

The v0.0.7.45 plan chose the existing target `texture_low_drinkability` for Oreo.

This migration does not add:

- `texture_paste_overload`
- `texture_sediment_overload`
- `texture_topping_specific_overload`
- any per-ingredient texture accident type

## 7. Why No Oreo-Specific Selector Was Added

The existing legacy branch still uses Oreo crumble ratio as the migration source. This task did not add any new Oreo-specific if, feedback selector, or future mechanism key.

The Oreo identity remains evidence for why low drinkability happened. It should not become a new long-term mechanism identity.

## 8. Historical Positioning

After v0.0.7.47, `texture_oreo_overload` should be treated as:

```text
historical / pre-v0.0.7.47 legacy accidentTypeId
```

It may remain in docs and reports as migration history. It should not appear in active runtime, content sheets, generated data, or player-facing runtime data as a current effective accident ID.

`scripts/content/collectStableIdSources.js` may still contain old legacy guardrail text. That collector text is not changed in this task and is not a runtime emission path.

## 9. P1-4 Status

P1-4 is still not fully solved.

Completed before this slice:

- taro actual migration to `texture_low_drinkability`

Completed in this slice:

- Oreo actual migration to `texture_low_drinkability`

Still pending:

- topping migration review / implementation
- accidentAnalyzer broader migration route
- accidentTypeId source-of-truth / registry / schema design
- validator / generated severity / shadow / partial takeover gates

## 10. What This Report Does NOT Do

This report does not:

- migrate `texture_topping_overload`
- add a new accidentTypeId
- add an Oreo-specific future if / selector
- open registry / enum / schema / validator work
- build generated severity data
- change generated feedback data
- change content sheets
- approve partial takeover
- approve active takeover
- mark P1-4 solved
