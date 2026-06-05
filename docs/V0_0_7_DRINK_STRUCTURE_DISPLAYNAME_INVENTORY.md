# v0.0.7.x Drink Structure DisplayName Inventory

> Stage-bound document / 阶段限定文档
>
> 本文件是 v0.0.7.x 阶段专属材料，用于记录该阶段的 TODO、inventory、design draft、gate、audit debt 或迁移证据。
>
> 它不是长期正本，不替代 `docs/DOCS_SOURCE_OF_TRUTH.md`、`docs/TASTE_DECISION_MODEL.md`、`docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。
>
> v0.0.7.x 结束后，本文件必须移出 `AGENTS.md` / `docs/AI_CONTEXT.md` 的长期必读列表，只能作为 historical / stage support 按需读取。
>
> 未完成且仍有效的债务应迁移到下一阶段 TODO；长期有效原则应沉淀进 L1 正本。
>
> 如果本文与 L1 正本冲突，以 L1 正本为准。

## 0. 文档定位

本文档是 `core/drinkStructureAnalyzer.js` 中显示名 / 中文名依赖的只读盘点和迁移路线草案。

它不是 runtime 修改方案，不替代 `docs/V0_0_7_MECHANISM_TODO.md`、`docs/STABLE_ID_NAMING_GUARDRAIL.md`、`docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。它只记录当前已经观察到的依赖、风险、替代字段候选、metadata gap、gate 和推荐迁移顺序。

本轮不表示 P1-6 已解决。当前仍未改 `core/drinkStructureAnalyzer.js`，未新增 metadata，未实现 shadow compare / review pack，未改变玩家最终 score、feedback、accident、drink type 或 golden expected。

## 1. 当前总体结论

`drinkStructureAnalyzer` 当前仍直接依赖中文显示名 Set：

- `baseLiquidNames`
- `flavorNames`
- `textureNames`
- `sweetenerNames`

它也通过 `item.name -> getTasteProfile(item.name)` 读取 displayName-keyed taste profile / base profile。这个路径当前能跑通，但它把“结构分类”与人类显示名绑定在一起；未来如果本地化、alias、ingredient displayName、category 名或 profile key 变化，结构分析可能被意外影响。

当前影响范围主要是：

1. `tasteJudge` 在每杯饮品开始时生成 `context.structure`。
2. `textureSummaryEngine` 会读取 `context.structure`，把结构指标和 tags 放进 readonly `textureSummary`。
3. `summaryCandidateEngine` 可从 summary 生成 readonly candidates。
4. 当前 shadow / generated / review pack 相关流程可能展示这些候选；但这些结构候选当前不应自动接管 final result。

因此本债务是 P1：当前 runtime 不一定坏，但如果未来 structure / operation / production 规则、severity / threshold、generated data 或 partial / active takeover 依赖它，就必须先完成 metadata 化和 review gate。

## 2. 当前结构分析流程图

```text
cup item
  -> item.name / item.ratio
  -> drinkStructureAnalyzer
     -> Chinese displayName Sets
     -> getTasteProfile(item.name)
     -> profile tags / calculationProfile
     -> structure ratios and metrics
     -> context.structure
  -> textureSummaryEngine
     -> textureSummary values / tags / risks / evidence
  -> summaryCandidateEngine
     -> readonly generated candidates
  -> review / shadow / golden structure assertions
```

当前 flow 的关键问题不是“有中文文案输出”，而是“结构分类输入仍可能由显示名决定”。

## 3. Inventory

| legacy item | displayName / text dependency | source file | current usage | current final impact | structured replacement candidate | metadata gap | risk | recommendation | gate |
|---|---|---|---|---|---|---|---|---|---|
| `baseLiquidNames` | 中文名 Set：红茶、绿茶、乌龙茶、茉莉茶、普洱茶、牛奶、厚乳、淡奶油、椰奶、燕麦奶、植脂奶、纯水、气泡水、咖啡 | `core/drinkStructureAnalyzer.js` | 判定 baseLiquidRatio；也参与 `liquidSupport`、`lowLiquidPenalty`、`solidLoad`、`strawResistance`、`drinkability` | 通过 `context.structure` 影响 readonly summary；当前不应视为 final 接管 | `ingredientId`、`categoryId`、`textureProfile.form`、`textureProfile.textureFamily`、profile tags，如 `clear_liquid`、`dairy_liquid`、`tea_base` | 缺统一 structure role metadata，例如 `structureRole=base_liquid`、`liquidSupportWeight` | High-risk display text key | 先建立 metadata candidate，不直接删除 Set；用 shadow compare 确认与 legacy 一致 | structure / operation / production active 依赖前 |
| `flavorNames` | 中文名 Set：柠檬、草莓、芒果、榴莲、西瓜、葡萄、桃子、荔枝、抹茶、可可 | `core/drinkStructureAnalyzer.js` | 判定 flavorRatio；影响低液体支撑惩罚 | 影响 readonly structure / texture summary；不应直接决定 accidentTypeId | `ingredientId`、`flavorProfile`、`sourceLayer=flavor`、profile tags，如 `fruit`、`tropical`、`controversial` | 缺明确 `structureRole=flavor_component` 与 `liquidSupportNeed` 的跨 profile source-of-truth | Migration candidate | 先区分 fruit / powder / aroma / pulp 对结构的不同贡献，不要把 flavor 一刀切 | severity / threshold 使用 structure source 前 |
| `textureNames` | 中文名 Set：珍珠、椰果、布丁、仙草、芋圆、奥利奥碎、芋泥、奶盖 | `core/drinkStructureAnalyzer.js` | 判定 textureRatio；增加 weightedSolid；影响 strawResistance / drinkability | 通过 `high_solid_load`、`high_straw_resistance` 等 tags 进入 summary path | `data/ingredientTextureProfiles.js` 的 `form`、`textureFamily`、`effects.solidLoad`、`effects.strawResistance`、`effects.liquidSupportNeed` | texture profile 已有较多结构字段，但仍以中文 displayName keyed table 存储 | Migration candidate | 优先从 texture profile effects 迁移，而不是手写新 if；先做 structure shadow diff | structure shadow / review pack 前 |
| `sweetenerNames` | 中文名 Set：白糖、蜂蜜、黑糖、焦糖、海盐 | `core/drinkStructureAnalyzer.js` | 判定 sweetenerRatio；少量增加 liquidSupport | 当前影响较轻，但仍是 displayName key | `ingredientId`、`categoryId`、profile tags `sweetener`、future `dissolvedSupport` | 缺用于结构层的溶解 / 支撑 metadata | Compatibility-only legacy | 保留兼容；未来以 profile tag + stable ID 替换 | localization 或 structure metadata 迁移前 |
| `item.name -> getTasteProfile(item.name)` | 通过 displayName 解析 profile；tasteProfiles / baseProfiles 仍以中文名 keyed | `core/drinkStructureAnalyzer.js`、`data/ingredientTasteProfiles.js`、`data/ingredients.js` | 读取 viscosity、strawResistance、textureRisk、calculationProfile | 当前是 structure metric 的主要输入之一 | `getTasteProfile({ ingredientId, name })`、ID-keyed taste profile、calculationProfile by ingredientId | `tasteProfiles` / `baseProfiles` 仍不是 ID-keyed source-of-truth | High-risk display text key | 先改调用形态进入 shadow，不直接迁移 profile table；确认 fallback 行为 | structure active reliance 前 |
| `tasteProfiles` / `baseProfiles` displayName-keyed fallback | 中文名作为 profile table key | `data/ingredientTasteProfiles.js`、`data/ingredients.js` | 为 structure、taste summary、legacy scoring 提供计算属性 | 广泛 legacy dependency，不可顺手改 | ID-keyed profile table 或 generated profile source | 需要 profile registry / migration plan；不能只改 structure analyzer | High-risk display text key | 单独做 profile source-of-truth 设计；不要在本任务中重写 | profile / summary source-of-truth 设计前 |
| `ingredientMeta.category` | category 值仍是中文：茶类、乳类、液体、水果/风味、调味、小料 | `data/ingredients.js` | `tasteContext.countByCategory` 等 legacy path 使用 | `tasteJudge` 仍用中文 category 参与 final scoring | `categoryId`、`ingredientTypeId`、profile tags | 需要 category stable ID；当前 category displayName 仍可被误当 key | Metadata gap | future metadata 中加入 stable categoryId，保留 displayName | localization / category-driven rules 前 |
| `ingredientTextureProfiles` displayName-keyed profiles | 表 key 是中文名，但内部 fields 较结构化 | `data/ingredientTextureProfiles.js` | `textureSummaryEngine` 通过 ingredientId + name 解析 texture profile | 影响 textureSummary readonly 输出；结构迁移的优先候选 source | ID-keyed texture profiles、generated texture schema | 文件当前名为 `ingredientTextureProfiles.js`；任务里提到的 `ingredientPhysicalProfiles.js` 当前不存在 | Migration candidate | 以 texture profile effects 为 future structure metadata seed；先补 source-of-truth 文档 | structure migration plan 前 |
| `context.countByCategory("茶类" / "小料" / "乳类" / "水果/风味")` | 中文 category literal | `core/tasteJudge.js` | legacy final scoring uses category counts | 当前直接影响 final score / notes | stable `categoryId` or rule ref category tags | 与 drinkStructureAnalyzer 属相邻债务，不在本轮修复 | High-risk display text key | 进入单独 legacy category audit；不要在 structure inventory 中顺手改 | final scoring refactor 前 |
| `drinkTypeAnalyzer` primary tea displayName logic | `primaryTea.name === "茉莉茶"` 等；`typeMap[primaryTea.name]`；note 拼接茶名 | `core/drinkTypeAnalyzer.js` | fruit tea blend scoring / drink type output | 可能影响 final drink type / note | primaryTea `ingredientId`、drinkType rules by stable refs | 需要 drink type route 独立 inventory | Needs review pack | 标为相邻风险；后续 drink type migration plan 处理 | drinkType active extension 前 |
| `drinkTypeRules` legacy ingredient fields | `ingredient`、`anyIngredient`、`allIngredients` 中有中文名，同时已有 ID 字段 | `data/drinkTypeRules.js` | 规则匹配 fallback | 当前可影响 final drink type | `ingredientId` / `ingredientIds` only | legacy fallback 仍在 | Compatibility-only legacy | 后续移除 fallback 前先做 golden / shadow compare | drinkType rules cleanup 前 |
| English / non-Chinese human-readable labels | 本轮未在 `drinkStructureAnalyzer` 中发现 English player-visible label 作为 structure key；存在 English internal tags，如 `tea`、`dairy`、`liquid`、`fruit`、`topping` | `core/drinkStructureAnalyzer.js`、profile data | profile tag fallback | 可影响 structure classification | documented tag registry / profile schema | 当前 tag 是否 stable、draft、profile-only 未统一登记 | Needs review | 不把 English tag 自动视为 stable source-of-truth；若 validator 消费 tags，需要 registry / schema | tag / profile validator 前 |
| Chinese regex / substring / `zhCN` match | 本轮未在 `drinkStructureAnalyzer` 中发现 `zhCN` 或 regex / substring text matching；主要是 Set `.has(name)` | `core/drinkStructureAnalyzer.js` | 直接 Set lookup | Set lookup 仍是 displayName key | structured metadata | 无 `zhCN` path，但显示名依赖仍成立 | Compatibility-only legacy | 报告为“未发现”，避免 future Codex 虚构风险 | none |
| Chinese notes / player-facing text | notes 使用中文句子 | `core/drinkStructureAnalyzer.js` | 输出 structure explanatory notes | 当前是解释文本，不是 key | i18n text / feedback copy source | 若未来 notes 被 validator / mechanism key 消费会变高风险 | Needs note | notes 可以保留为 human-facing copy；不得当机制主键 | i18n / review data consumption 前 |

## 4. 当前未发现项

- 未发现 `drinkStructureAnalyzer` 直接使用 `zhCN` 字段。
- 未发现 `drinkStructureAnalyzer` 用 regex / substring 去猜中文原料名；它主要用 Set `.has(name)` 和 profile tag `.includes(tag)`。
- 未发现 `drinkStructureAnalyzer` 使用英文玩家可见 label 作为 key；但英文 profile tags 是否稳定仍需要后续 registry / schema 判断。
- 未发现 `data/ingredientPhysicalProfiles.js`；当前项目中对应结构信息主要在 `data/ingredientTextureProfiles.js`。

这些“未发现”不表示项目整体没有显示文案依赖。`tasteJudge`、`drinkTypeAnalyzer`、`drinkTypeRules` 等相邻路径仍有中文 category / displayName fallback。

## 5. 风险分类

- Compatibility-only legacy：当前为兼容旧数据或旧规则服务，可以保留，但未来扩展不能继续依赖它作为唯一机制来源。
- Migration candidate：已有较明确的结构化替代方向，但需要 shadow compare / review pack 才能迁移。
- Metadata gap：当前没有足够稳定 metadata 表达同一含义，不能直接替换。
- High-risk display text key：当前显示名 / category 直接影响结构、评分或类型判断；迁移前必须保护 golden 和 review。
- Needs review pack：需要把 legacy output、proposed structured output、diff、provenance 和人工决策放进 review pack。

## 6. 分阶段迁移路线

### Phase 1｜只读 inventory

本文件即 Phase 1。目标是列出 displayName / Chinese category / profile fallback 的位置和影响范围，不改 runtime。

### Phase 2｜metadata candidate design

后续可考虑设计结构 metadata 草案，但不要直接接 runtime。候选字段可以包括：

- `ingredientId`
- `categoryId`
- `structureRole`
- `textureFamily`
- `liquidSupportWeight`
- `solidLoadWeight`
- `strawResistanceWeight`
- `drinkabilityPenalty`
- `liquidSupportNeed`
- `dissolvedSupport`

如果没有 stable metadata source-of-truth，应先做 schema / source-of-truth 设计，不能用字符串前缀或显示名猜测。

### Phase 3｜shadow compare

新增结构化计算前，应先保持 legacy output，同时生成 shadow output：

```text
legacyStructure
structuredShadow
diff
sampleId
recipe evidence
provenance
```

shadow 阶段不得改变 final score、final feedback、accident、drink type 或 golden expected，除非单独任务明确要求。

### Phase 4｜review pack

把 shadow diff 送入 mechanism review pack，给制作人 / ChatGPT 审核：

- legacy displayName Set 如何分类。
- proposed structured metadata 如何分类。
- 差异是否合理。
- 是否需要新增 metadata。
- 是否需要保留 compatibility fallback。

review pack proof 不等于批准 runtime 接管，不等于 registry，不等于 validator input。

### Phase 5｜staged replacement

只有在 metadata、shadow、review、golden 边界明确后，才可考虑小步替换：

1. 先让 structure analyzer 接收 `{ ingredientId, name }`，仍保留 displayName fallback。
2. 再让 profile lookup 优先 ID-keyed source。
3. 再把中文 Set 降级成 compatibility fallback。
4. 再用 golden / shadow expected 验证输出差异。
5. 最后才考虑删除 legacy Set。

不建议一次性重写所有结构分析。

## 7. 与 mechanism review pack gate 的关系

`docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md` 适用于本迁移：

- 新 metadata 不得直接进入 source-of-truth。
- 新 structured output 不得绕过 review pack 进入 generated data / runtime。
- 每个 diff 都应保留 provenance：source file、source field、legacy value、structured candidate value。
- review pack 必须明确 `approved_for_runtime` 不等于 `approved_for_active_takeover`。

`reports/mechanismReviewPack.sample.md` 可以作为样例 proof 参考，但它不是正式审核结果。

## 8. 与 stable ID / naming guardrail 的关系

后续迁移不得根据 ID 字符串前缀反推 source layer 或 category。例如：

```text
dairy_fat_overload
```

即使命名中含 `dairy`，如果实际来源写明 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad`，仍应按 texture / drinkability 方向理解。ID 名称不能覆盖结构字段。

同理，不得因为原料显示名是“牛奶”“厚乳”就直接生成新的 accidentTypeId / severity rule。机制层 ID、结构 metadata、profile tags、review output 必须分层。

## 9. 进入后续任务前的检查清单

结构相关任务开工前，Codex 应确认：

- 是否已读取本文件。
- 是否已读取 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 是否会新增或消费 `structureRole` / `categoryId` / profile tag / triggerMetric。
- 是否已有 metadata source-of-truth；若无，应先设计 schema。
- 是否会改变 `context.structure` 输出；如果会，是否有 shadow compare。
- 是否会影响 final score、feedback、accident、drink type 或 golden expected；如果会，是否有产品理由和 golden 更新计划。
- 是否需要 mechanism review pack。
- 是否只是输出中文 notes；如果 notes 未来被机器消费，是否已有结构字段替代。
- 是否把 displayName、category 中文名、sampleId、notes 或 zhCN 当机制 key。

如果答案不清楚，应停止并请用户 / ChatGPT 复查，不要由 Codex 自行拍板。
