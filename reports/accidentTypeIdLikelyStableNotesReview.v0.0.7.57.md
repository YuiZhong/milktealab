# AccidentTypeId Likely-Stable Notes Review｜v0.0.7.57

## 0. Report Positioning

This report is a docs / report / notes-review artifact for three likely-stable accidentTypeId candidates.

It turns existing review-pack evidence into source notes, triggerMetric questions, boundary notes, and remaining registry gates for a small first slice:

- `taste_acid_overload`
- `texture_low_drinkability`
- `texture_solid_overload`

This report is decision-prep only. It is not:

- a registry
- a schema
- an enum
- an allowed values list
- validator input
- generated severity data
- runtime data
- runtime source-of-truth

This report does not approve any accidentTypeId. It does not assign `approved_stable` to any ID. Every `canEnterValidator`, `canEnterGeneratedSeverity`, and `canAffectRuntime` value in this report is a hard `no`.

Core boundary:

```text
likely stable != approved_stable
source notes != registry approval
evidence != mechanism ID
player-facing copy != triggerMetric
historical migrated ID != current allowed value
```

## 1. Executive Summary

v0.0.7.55 organized accidentTypeId candidates into a review pack. v0.0.7.57 deliberately narrows the work from broad review material to three foundational candidates that look most likely to survive future registry review after source notes are pinned.

This is a small notes review / decision-prep slice, not another horizontal expansion of review packs.

The three reviewed candidates are:

| accidentTypeId | human meaning | why this slice |
|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | Mature generic taste pressure mechanism with clear evidence family. |
| `texture_low_drinkability` | 喝不动了 / 水泥感 / 粉浆感 | Generalized texture mechanism replacing taro / Oreo content-specific old IDs. |
| `texture_solid_overload` | 小料太多了 / 八宝粥感 | Generalized solid-load mechanism replacing topping content-specific old ID. |

These three are likely-stable candidates after notes, but they remain not approved. Future registry decisions still require producer / ChatGPT review, sourceLayer / sourceSummary / triggerMetric confirmation, and a separate registry / schema task.

## 2. Shared Guardrails

- `likely stable` does not mean `approved_stable`.
- Source notes do not approve registry entry.
- Evidence examples do not create mechanism IDs.
- Player-facing copy can name ingredients, jokes, and sensory details, but copy is not `triggerMetric`.
- Historical migrated texture IDs do not return to current registry, current validator allowed values, generated severity input, or runtime authority.
- This report does not create registry / schema / enum / validator / allowed values.
- This report does not change runtime, data, generated data, content sheets, feedback text pools, or golden expected.
- In this report, all gate fields remain hard no:

| gate field | value |
|---|---|
| `canEnterValidator` | no |
| `canEnterGeneratedSeverity` | no |
| `canAffectRuntime` | no |

## 3. `taste_acid_overload`

### Human Meaning

```text
酸爆了 / 酸度过载。
```

This ID describes taste-layer acid pressure. It should not be split by specific acidic ingredient.

### Source Notes

| field | proposed notes |
|---|---|
| `sourceLayer` | `taste` |
| `sourceSummary` | `tasteSummary` |
| `triggerMetric` candidates | `acidity` / `acidLoad` / future `tasteSummary` acid pressure metric |
| `evidence` | lemon, hawthorn, passionfruit, or other acidic ingredients can be evidence. |
| `reviewStatus` | likely stable after notes; not approved |
| `canEnterValidator` | no |
| `canEnterGeneratedSeverity` | no |
| `canAffectRuntime` | no |

### Evidence Boundary

Allowed evidence:

- lemon-heavy recipes
- hawthorn-heavy recipes
- passionfruit / citrus / sour-fruit recipes
- future `tasteSummary` acid pressure metrics

Must not become mechanism IDs:

```text
taste_acid_overload_lemon
hawthorn_acid_overload
passionfruit_acid_accident
taste_acid_overload_high
```

Ingredient names belong in evidence, notes, sample IDs, or player-facing feedback copy, not in `accidentTypeId`.

### Boundary Against Neighboring Concepts

- Not flavor identity conflict: acid overload is taste pressure, not flavor identity mismatch.
- Not novelty / weirdness: sour does not automatically mean experimental or strange.
- Not severity: a high acid sample may use severity later, but `_high` does not belong in `accidentTypeId`.
- Not feedbackTag: player copy may mention sourness, lemon, hawthorn, or "酸到灵魂出窍", but that copy is not the mechanism ID.

### Remaining Gate

Before any future registry approval:

- confirm `sourceLayer=taste`
- choose canonical `triggerMetric` wording
- confirm golden evidence refs
- record whether acid evidence should use ingredient IDs, profile tags, or `tasteSummary` metrics
- create a separate reviewed registry / schema task

### This Report Conclusion

```text
review conclusion: likely stable after notes
approval: not approved
canEnterValidator: no
canEnterGeneratedSeverity: no
canAffectRuntime: no
```

## 4. `texture_low_drinkability`

### Human Meaning

```text
喝不动了 / 水泥感 / 粉浆感 / 半固体 / 吸管难以处理。
```

This ID describes a texture-layer low-drinkability mechanism. It should absorb generalized "drinkability collapsed" evidence, including migrated taro and Oreo cases, without reviving ingredient-specific old IDs.

### Source Notes

| field | proposed notes |
|---|---|
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / structure texture summary |
| `triggerMetric` candidates | `drinkabilityPenalty` / `strawResistance` / `pasteLoad` / `sediment` / `solidLoad` / future combined texture metric |
| `evidence` | taro paste, Oreo crumble, powder, sediment, thick paste, low flow, straw difficulty. |
| `historical note` | `texture_taro_overload` and `texture_oreo_overload` have migrated here. |
| `reviewStatus` | likely stable after notes / keep candidate for review; not approved |
| `canEnterValidator` | no |
| `canEnterGeneratedSeverity` | no |
| `canAffectRuntime` | no |

### Evidence Boundary

Allowed evidence:

- taro paste / 芋泥墙 / 水泥感 evidence
- Oreo crumble / 粉渣 / 甜品矿层 evidence
- powder or sediment evidence
- thick paste / low-flow evidence
- straw difficulty evidence when the whole drink is hard to drink

Must not return as current mechanism IDs:

```text
texture_taro_overload
texture_oreo_overload
texture_taro_wall
texture_oreo_mining
texture_paste_overload
```

Historical migrated IDs must remain:

```text
texture_taro_overload    historical / pre-v0.0.7.46 legacy reference
texture_oreo_overload    historical / pre-v0.0.7.47 legacy reference
```

### Boundary Against Neighboring Concepts

- Distinct from `texture_solid_overload`: low drinkability is more about flow collapse, paste, sediment, blockage, or "cannot drink"; solid overload is more about too much solid content / low liquid support.
- Distinct from `texture_straw_resistance`: straw resistance may be a triggerMetric or neighboring mechanism, but it is not automatically the same as whole-drink low drinkability.
- Distinct from player-facing taro / Oreo copy: "芋泥墙", "水泥感", "甜品矿层", and "吸管开采" are feedback copy / evidence, not ID material.

### Remaining Gate

Before any future registry approval:

- confirm canonical triggerMetric family or combined metric
- decide relationship with `texture_straw_resistance`
- confirm append / suppression boundary with structure accidents
- confirm migrated golden evidence refs for taro and Oreo
- create a separate reviewed registry / schema task

### This Report Conclusion

```text
review conclusion: likely stable after notes / keep candidate for review
approval: not approved
canEnterValidator: no
canEnterGeneratedSeverity: no
canAffectRuntime: no
```

## 5. `texture_solid_overload`

### Human Meaning

```text
小料太多了 / 八宝粥感 / 固体负载过高 / 液体支撑不够。
```

This ID describes a texture-layer solid-load mechanism. It should cover "there is too much solid stuff for the drink to remain drink-like" without creating one accident ID per topping.

### Source Notes

| field | proposed notes |
|---|---|
| `sourceLayer` | `texture` |
| `sourceSummary` | `textureSummary` / structure texture summary |
| `triggerMetric` candidates | `solidLoad` / `textureRatio` / `liquidSupport` / `lowLiquidSupport` |
| `evidence` | pearl, taro ball, pudding, grass jelly, coconut jelly, mixed toppings, and low liquid support. |
| `historical note` | `texture_topping_overload` has migrated here. |
| `reviewStatus` | likely stable after notes / keep candidate for review; not approved |
| `canEnterValidator` | no |
| `canEnterGeneratedSeverity` | no |
| `canAffectRuntime` | no |

### Evidence Boundary

Allowed evidence:

- pearl-heavy recipes
- taro ball / pudding / grass jelly / coconut jelly-heavy recipes
- too many mixed toppings
- low liquid support
- "八宝粥感" / "吸管体能测试" feedback copy

Must not become mechanism IDs:

```text
texture_pearl_overload
texture_taro_ball_overload
texture_pudding_overload
texture_grass_jelly_overload
texture_coconut_jelly_overload
texture_topping_specific_overload
texture_eight_treasure_overload
```

Historical migrated ID must remain:

```text
texture_topping_overload historical / pre-v0.0.7.49 legacy reference
```

### Boundary Against Neighboring Concepts

- Distinct from `texture_low_drinkability`: solid overload is about solid load / low liquid support; low drinkability is about paste, sediment, blocked flow, or overall inability to drink.
- Distinct from `texture_straw_resistance`: straw pressure can be an expression or trigger evidence, but solid overload's core is solid content and liquid support.
- Distinct from topping-specific copy: pearls, pudding, grass jelly, and "吸管体能测试" can appear in feedback copy / notes, not accidentTypeId.

### Remaining Gate

Before any future registry approval:

- confirm `solidLoad` / `textureRatio` / `liquidSupport` metric naming
- confirm golden evidence refs
- confirm boundary against `texture_low_drinkability`
- confirm whether `texture_straw_resistance` should remain separate or only act as evidence / trigger
- create a separate reviewed registry / schema task

### This Report Conclusion

```text
review conclusion: likely stable after notes / keep candidate for review
approval: not approved
canEnterValidator: no
canEnterGeneratedSeverity: no
canAffectRuntime: no
```

## 6. Cross-ID Boundary Table

| ID | human meaning | sourceLayer | main trigger direction | evidence examples | must not become |
|---|---|---|---|---|---|
| `taste_acid_overload` | 酸爆了 / 酸度过载 | `taste` | acid pressure through `acidity` / `acidLoad` / future tasteSummary acid metric | lemon, hawthorn, passionfruit, sour fruit evidence | one ID per sour ingredient; severity suffix; flavor identity conflict |
| `texture_low_drinkability` | 喝不动了 / 水泥感 / 粉浆感 | `texture` | low drinkability, paste, sediment, straw difficulty, flow collapse | taro paste, Oreo crumble, powder, sediment, thick paste | `texture_taro_overload`; `texture_oreo_overload`; player copy as ID |
| `texture_solid_overload` | 小料太多了 / 八宝粥感 | `texture` | high solid load, low liquid support, texture ratio | pearls, taro balls, pudding, grass jelly, coconut jelly, mixed toppings | `texture_topping_overload`; one ID per topping; "吸管体能测试" as ID |

## 7. Human Review Questions

Future producer / ChatGPT review should confirm:

- Are these three names stable enough for a first registry decision slice?
- Are the proposed sourceLayer values correct?
- Are the triggerMetric candidates too broad, or should they be split?
- Which `tasteSummary` / `textureSummary` fields should become canonical evidence source?
- Which golden samples should be linked as future evidence refs?
- Should player feedback remain diverse even when mechanism ID is shared?
- Should `texture_straw_resistance` remain a separate accidentTypeId, or become a metric / evidence under broader texture mechanisms?
- Can these three enter a future registry candidate decision after notes, or do they still need another review pass?

## 8. Recommended Next Slice

Recommended next slice:

```text
v0.0.7.58｜likely-stable accidentTypeId producer decisions
```

Conservative alternative:

```text
v0.0.7.58｜runtime feedbackTag notes review
```

The next slice should continue narrowing review material into producer decisions. Do not widen into another large review pack, and do not jump directly to validator implementation, generated severity, shadow output, partial takeover, or active takeover.

## 9. What This Report Does NOT Do

This report does not:

- create a registry
- create a schema
- create an enum
- implement a validator
- generate allowed values
- approve any accidentTypeId
- mark any accidentTypeId as `approved_stable`
- approve `taste_acid_overload`
- approve `texture_low_drinkability`
- approve `texture_solid_overload`
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
