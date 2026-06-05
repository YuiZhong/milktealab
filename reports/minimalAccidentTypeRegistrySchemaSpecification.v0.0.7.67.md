# Minimal AccidentTypeId Registry / Schema Task Specification｜v0.0.7.67

## 0. Report Positioning

This report is an implementation task specification. It is not implementation.

It exists to answer one narrow question:

```text
If the next slice really implements a minimal accidentTypeId registry / schema scaffold, what is the smallest acceptable task shape?
```

This report does not create the future registry / schema. It only specifies the future task boundary, allowed future files, minimal fields, read-only checks, validation commands, and forbidden expansion.

This report does not:

- create a registry
- create a schema
- implement a validator
- create a check script
- generate allowed values
- approve any accidentTypeId
- mark any ID as `approved_stable`
- change runtime
- change generated severity

```text
task specification != implementation
task specification != registry
task specification != schema
task specification != validator
task specification != allowed values
task specification != approved_stable
```

## 1. Executive Summary

v0.0.7.67 keeps the accidentTypeId work on one narrow line.

`taste_acid_overload` and `texture_solid_overload` have enough reviewed notes, source index, candidate record, gate result, and preparation material to define a future minimal registry / schema implementation task.

This report only writes that task specification. It does not implement it.

Scope summary:

- Included: `taste_acid_overload`
- Included: `texture_solid_overload`
- Excluded: `texture_low_drinkability`
- Excluded: final decision for `texture_straw_resistance`
- Excluded: feedbackTag / outcomeTypeId / drinkStructure
- Excluded: durian / dairy / industrial creamer / strong flavor runtime review candidates
- Excluded: validator active enforcement
- Excluded: generated severity
- Excluded: runtime takeover

Human-readable meaning:

- "酸爆了 / 酸度过载" can be specified for a future tiny registry draft, but it is still not approved.
- "小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足" can be specified for a future tiny registry draft, but it is still not approved.
- "水泥感 / 喝不动" remains outside this first implementation specification.

## 2. Minimal Implementation Scope For Future Task

### Included IDs

The future implementation task may only include:

- `taste_acid_overload`
- `texture_solid_overload`

### Excluded IDs / Systems

The future implementation task must not include:

- `texture_low_drinkability`
- final decision for `texture_straw_resistance`
- `flavor_durian_overload`
- `dairy_fat_overload`
- `industrial_creamer_overload`
- `taste_strong_flavor_overload`
- feedbackTag
- candidateTag
- outcomeTypeId
- drinkStructure
- generated severity
- runtime takeover
- partial takeover
- active takeover

These exclusions remain exclusions unless a separate user / ChatGPT task explicitly changes the scope.

## 3. Future Files Specification

This section discusses future files only. v0.0.7.67 does not create them.

The recommended first implementation cut may consider:

```text
data/stableIdRegistry.js
scripts/content/checkStableIdRegistry.js
```

Optional but not recommended for the first cut:

```text
data/schema/stableIds.schema.json
data/generated/stableIds.generated.json
```

Recommended future file boundary:

- `data/stableIdRegistry.js` may act as the reviewed source-of-truth draft for this tiny first slice.
- `scripts/content/checkStableIdRegistry.js` may act as a read-only consistency check.
- Do not create a JSON schema in the first cut unless a later task explicitly narrows that scope.
- Do not generate a generated registry in the first cut.
- Do not connect the registry to runtime.
- Do not connect the registry to generated severity.
- Do not use collector output as registry.
- Do not use docs / reports as validator allowed values.

This report discusses those future files, but creates none of them.

## 4. Minimal Registry Entry Shape

The future `data/stableIdRegistry.js` entry shape should stay intentionally small.

Example future shape:

```js
{
  id: "taste_acid_overload",
  idFamily: "accidentTypeId",
  status: "reviewed_candidate",
  humanMeaning: "酸爆了 / 酸度过载",
  sourceLayer: "taste",
  sourceSummary: "tasteSummary",
  triggerMetricCandidates: ["acidity", "acidLoad", "acidPressure"],
  evidenceNotes: [],
  blockedEvidence: [],
  boundaryNotes: [],
  historicalLinks: [],
  canEnterValidator: false,
  canEnterGeneratedSeverity: false,
  canAffectRuntime: false,
  reviewNotes: []
}
```

Required meaning:

- This is a future shape suggestion, not current code.
- `status: "reviewed_candidate"` does not mean `approved_stable`.
- `canEnterValidator` must start as `false`.
- `canEnterGeneratedSeverity` must start as `false`.
- `canAffectRuntime` must start as `false`.
- `triggerMetricCandidates` are candidates, not final schema-approved metric names.
- `humanMeaning` is explanation, not a mechanism key.

Minimum required fields for the first implementation cut:

| field | purpose | hard boundary |
|---|---|---|
| `id` | stable string under review | cannot be displayName / sampleId / recipe note |
| `idFamily` | must be `accidentTypeId` in this slice | cannot include feedbackTag / outcomeTypeId |
| `status` | review state | cannot be `approved_stable` in first cut |
| `humanMeaning` | human-readable meaning | not validator source |
| `sourceLayer` | layer draft | must be explicit, not inferred from ID prefix |
| `sourceSummary` | summary source draft | must reference a future structured summary source |
| `triggerMetricCandidates` | candidate metric names | not final approved schema |
| `evidenceNotes` | allowed evidence | evidence cannot become ID identity |
| `blockedEvidence` | forbidden misreadings | must block ingredient-specific IDs / player copy IDs |
| `boundaryNotes` | adjacent mechanism boundaries | cannot silently include excluded IDs |
| `historicalLinks` | old IDs / migration context | historical links are not current allowed values |
| `canEnterValidator` | validator gate | must be `false` in first cut |
| `canEnterGeneratedSeverity` | generated severity gate | must be `false` in first cut |
| `canAffectRuntime` | runtime gate | must be `false` in first cut |
| `reviewNotes` | producer / ChatGPT notes | notes are not approval |

## 5. Future Candidate Entries

### `taste_acid_overload`

Future entry should include:

- `id`: `taste_acid_overload`
- `idFamily`: `accidentTypeId`
- `status`: `reviewed_candidate` / not approved
- `humanMeaning`: 酸爆了 / 酸度过载
- `sourceLayer`: `taste`
- `sourceSummary`: `tasteSummary`
- `triggerMetricCandidates`:
  - `acidity`
  - `acidLoad`
  - `acidPressure`
- `evidenceNotes`:
  - acidic ingredients only as evidence
  - high acid ratio evidence
  - tasteSummary acid pressure evidence
- `blockedEvidence`:
  - no ingredient-specific accident ID
  - no sampleId as mechanism ID
  - no displayName / player copy as triggerMetric
  - no severity suffix in accidentTypeId
- `boundaryNotes`:
  - not flavor identity conflict
  - not novelty / weirdness
  - not bitterness / astringency
  - not feedbackTag
- `historicalLinks`: empty unless later evidence needs a historical link
- `canEnterValidator`: `false`
- `canEnterGeneratedSeverity`: `false`
- `canAffectRuntime`: `false`

Future implementation must not treat lemon, hawthorn, passionfruit, player-facing sour copy, or any golden sample ID as the mechanism identity.

### `texture_solid_overload`

Future entry should include:

- `id`: `texture_solid_overload`
- `idFamily`: `accidentTypeId`
- `status`: `reviewed_candidate` / not approved
- `humanMeaning`: 小料太多 / 八宝粥感 / 固体负载过高 / 液体支撑不足
- `sourceLayer`: `texture`
- `sourceSummary`: `textureSummary` / structure texture summary
- `triggerMetricCandidates`:
  - `solidLoad`
  - `textureRatio`
  - `liquidSupport`
  - `lowLiquidSupport`
- `evidenceNotes`:
  - topping evidence only as evidence
  - high solid load
  - low liquid support
  - structure / texture summary evidence
- `blockedEvidence`:
  - no topping-specific accident ID
  - no player copy as triggerMetric
  - no historical `texture_topping_overload` returning as current ID
  - no every straw problem as solid overload
- `boundaryNotes`:
  - distinct from `texture_low_drinkability`
  - distinct from `texture_straw_resistance`
- `historicalLinks`:
  - `texture_topping_overload` as pre-v0.0.7.49 historical legacy only
- `canEnterValidator`: `false`
- `canEnterGeneratedSeverity`: `false`
- `canAffectRuntime`: `false`

Future implementation must not create pearl-specific, pudding-specific, grass-jelly-specific, coconut-jelly-specific, taro-ball-specific, or "straw fitness test" accidentTypeIds.

## 6. Future Check Script Specification

A future `scripts/content/checkStableIdRegistry.js` may be created only as a read-only consistency check.

Minimum responsibilities:

- read the future registry file
- check every entry has required fields
- check `idFamily` is present
- check `idFamily` is `accidentTypeId` for this first slice
- check `humanMeaning` is non-empty
- check `sourceLayer` is explicit
- check `sourceSummary` is explicit
- check `triggerMetricCandidates` is present
- check hard gate booleans remain false
- output errors / warnings clearly

Forbidden conditions:

- no `approved_stable`
- no `canEnterValidator: true`
- no `canEnterGeneratedSeverity: true`
- no `canAffectRuntime: true`
- no historical old ID as a current entry
- no missing `idFamily`
- no empty `humanMeaning`
- no feedbackTag / outcomeTypeId / drinkStructure entries in this first slice
- no `texture_low_drinkability` entry in this first slice

The future check script must not:

- modify files
- generate allowed values
- generate registry files
- connect to runtime
- connect to generated severity
- treat collector output as registry
- treat docs prose as allowed values

## 7. Future Tests / Validation Commands

A future implementation task should run at least:

```bash
node --check data/stableIdRegistry.js
node --check scripts/content/checkStableIdRegistry.js
node scripts/content/checkStableIdRegistry.js
git diff --check
git status --short
```

Golden samples can be skipped only if the future implementation only creates the registry draft and read-only check script.

If the future implementation touches runtime, `data/goldenSamples.js`, generated data, content sheets, score, feedback, accident mapping, or any active analyzer behavior, then golden samples must be run in that future task.

v0.0.7.67 itself does not run golden because it only adds docs / report specification.

## 8. Forbidden Implementation Expansion

The future implementation task must not expand into:

- validator active enforcement
- generated allowed values
- generated severity
- shadow takeover
- partial takeover
- active takeover
- runtime integration
- score changes
- accident priority changes
- feedback text pool changes
- golden expected changes
- collector output as registry
- sample sheet as approval
- generated observation as approval
- docs prose as allowed values
- historical texture old IDs as current allowed values
- `texture_low_drinkability` first-batch entry
- feedbackTag registry
- outcomeTypeId registry
- drinkStructure registry
- durian / dairy / industrial creamer / strong flavor final decision
- straw resistance final decision

The future implementation task should stay small enough that a reviewer can see every registry row and every check rule in one pass.

## 9. Human-Readable Summary

下一步如果真的开始 implementation，只应该造一张很小的“候选名单草案”和一个只读检查脚本。

“酸爆了”和“八宝粥感 / 小料太多”可以进入这张草案。

它们仍然不能影响游戏，不能进入 validator，不能进入 generated severity，也不能变成 `approved_stable`。

“水泥感 / 喝不动”不在这张草案里。

这一步不是正式调参数，也不是 runtime takeover，但已经很接近最小 validator 前置的第一块地基。

## 10. Suggested Next Slice

Recommended next slice:

```text
v0.0.7.68｜minimal accidentTypeId registry scaffold
```

Suggested scope:

- create minimal `data/stableIdRegistry.js`
- create minimal read-only `scripts/content/checkStableIdRegistry.js`
- include only `taste_acid_overload`
- include only `texture_solid_overload`
- keep all canEnter flags false
- keep `texture_low_drinkability` excluded
- do not create JSON schema unless explicitly approved in that future task
- do not generate allowed values
- do not connect runtime
- do not generate severity
- do not do partial takeover

## 11. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- create allowed values
- implement a validator
- implement a check script
- generate a stable ID registry
- approve any accidentTypeId
- mark any ID as `approved_stable`
- let any ID enter validator
- let any ID enter generated severity
- let any ID affect runtime
- process `texture_low_drinkability`, except explicit exclusion / boundary context
- process final decision for `texture_straw_resistance`
- process feedbackTag
- process candidateTag
- process outcomeTypeId
- process drinkStructure
- process `flavor_durian_overload`
- process `dairy_fat_overload`
- process `industrial_creamer_overload`
- process `taste_strong_flavor_overload`
- revive `texture_taro_overload`
- revive `texture_oreo_overload`
- revive `texture_topping_overload`
- change runtime
- change data
- change scripts
- change generated data
- change content sheets
- change golden expected
- build generated severity
- create shadow output
- approve partial takeover
- approve active takeover

Note: "change data / scripts" in this section describes v0.0.7.67 itself. This report may discuss future data / scripts files, but it does not create them.
