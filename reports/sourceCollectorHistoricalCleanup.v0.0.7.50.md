# Source collector historical cleanup｜v0.0.7.50

## 0. Report Positioning

This report records a wording cleanup for collector / source entry points.

It is not a source-of-truth design. It does not create a registry, enum, schema, validator, allowed values file, generated severity data, shadow output, partial takeover, or active takeover.

## 1. Search Scope

Searched strings:

```text
texture_taro_overload
texture_oreo_overload
texture_topping_overload
```

Searched across the repository, with focused follow-up checks for:

- runtime / data / generated / content_sheets / index.html
- collector / source-of-truth wording
- docs / reports / historical migration notes

## 2. Cleanup Summary

The three migrated texture content-specific IDs must now be read only as historical references:

| old ID | current positioning |
|---|---|
| `texture_taro_overload` | historical / pre-v0.0.7.46 legacy accidentTypeId |
| `texture_oreo_overload` | historical / pre-v0.0.7.47 legacy accidentTypeId |
| `texture_topping_overload` | historical / pre-v0.0.7.49 legacy accidentTypeId |

They are not current active runtime IDs. They should not enter current registry, validator, generated severity input, or runtime takeover decisions from collector / source wording.

## 3. Files Updated

- `scripts/content/collectStableIdSources.js`
  - Removed the three historical texture IDs from current migration candidate wording.
  - Added historical / pre-version legacy reminder wording.
- `reports/stableIdSourceCollector.sample.md`
  - Regenerated from the collector so the sample report matches script wording.
- `docs/V0_0_7_MECHANISM_TODO.md`
  - Updated collector / source cleanup gate and future route notes.
- `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
  - Added v0.0.7.50 cleanup relationship notes.
- `docs/VERSION_LOG.md`
  - Added v0.0.7.50 entry.
- `docs/AI_CONTEXT.md`
  - Added a short continuation summary.

## 4. Reference Classification

| area | classification |
|---|---|
| runtime / data / generated / content_sheets / index.html | No current active references found for the three old IDs during focused grep. |
| collector / source wording | Cleaned. Old IDs now appear only as historical / pre-version legacy references in collector reminders. |
| docs / reports | Historical / migration report / version log references remain allowed. |

## 5. What Remains Out Of Scope

This cleanup does not solve:

- P1-4 broader accidentAnalyzer migration route.
- accidentTypeId source-of-truth / registry / schema design.
- validator design or implementation.
- allowed values generation.
- generated severity build.
- shadow / partial / active takeover.
- broader historical docs cleanup outside the collector / source wording path.

## 6. Gate Note

Before any future source-of-truth, registry, schema, validator, generated severity, or takeover task uses these old IDs, they must be treated as historical / pre-version legacy references, not current active runtime IDs.
