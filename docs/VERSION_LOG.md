# 版本记录

## docs: record recipe complexity as operation cost

本轮只更新设计文档，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 新增原则：自由实验室阶段不硬限制原料数量。
  - 说明玩家可以把很多原料加入同一杯，以保留自由研发和整活空间。
  - 说明未来经营阶段可将配方复杂度转化为出杯时间、制作难度、员工负担、成本、备料压力、顾客等待和高峰期吞吐风险。
  - 明确这属于 operation / production / economy 层，不属于味觉层硬惩罚。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步为本轮 docs 补充 commit。
  - 增加配方复杂度经营软成本原则的短索引。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.25。
- 不创建 tag。
- 不新增经营系统。
- 不新增 operationProfile / economyProfile 代码。
- 不新增成本字段、出杯时间或原料数量惩罚。
- 不限制自由实验室原料数量。
- 不做 UI 改动。

## docs: sync v0.0.5.24 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.24-candidate`。
  - 记录 candidate 指向 `5fbcdb039d41c8a9e27d7cd1ba383d19a5fad54e`。
  - 记录 `v0.0.5.24` 已完成 accidentTypeId + type/displayName 双轨地基。
  - 记录正式 tag `v0.0.5.24` 未创建。
  - 记录当前未推进 v0.0.5.25。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.25。
- 不创建 tag。
- 不做 accidentTypeId 后续 runner 断言。
- 不做 drinkTypeId、三层 summary 或 severity 系统。

## v0.0.5.24

accidentTypeId + type/displayName 双轨地基。

### 阶段目标

本版本为事故结果新增稳定 `accidentTypeId`，让事故的内部系统身份不再只依赖中文 `type`。旧中文 `type` 继续保留，作为现有玩家可见显示名 / legacy 字段。

### 本轮新增 / 更新

- 更新 `data/accidentRules.js`
  - 柠檬酸度事故新增 `accidentTypeId: "taste_acid_overload"`。
  - 榴莲强身份事故新增 `accidentTypeId: "flavor_durian_overload"`。
  - 保留旧 `type: "口感事故"` / `type: "猎奇实验品"`。
- 更新 `data/structureAccidentRules.js`
  - 结构事故规则新增 stable `accidentTypeId`。
- 更新 `core/accidentRuleEngine.js`
  - 只透传 `rule.accidentTypeId`，不承载业务判断。
- 更新 `core/structureAccidentRuleEngine.js`
  - 只透传 `rule.accidentTypeId`，不承载业务判断。
- 更新 `core/accidentAnalyzer.js`
  - 手写事故对象补充 `accidentTypeId`。
  - 不改触发条件、评分、cap、文案或类型中文名。
- 更新 `core/tasteJudge.js`
  - 在不改变 `result.type` 的前提下，为主事故结果暴露 `accidentTypeId`。
  - 奶脂过载判断优先检查 `accidentTypeId`，保留旧中文 `type` fallback。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.24。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.24 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不做 drinkTypeId。
- 不做 golden runner accidentTypeId 断言。
- 不改 golden samples expected。
- 不改评分、阈值、cap、notes、tags、反馈文案或类型中文名。
- 不做 severity 系统。
- 不做三层 summary。
- 不做 flavorProfile。
- 不改 UI 结构或交互。
- 不创建未来不存在系统的数据结构。
- 不 tag。

## docs: redefine v0.0.5.x as stable identity foundation

本轮只更新 docs / AGENTS，不提升页面版本号，不创建 tag。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 重定义 v0.0.5.x 为现有核心系统 ID 化 / 去中文主键 / 平台无关数据地基阶段。
  - 定义 v0.0.6.x 为三层 profile / summary / 判定地基阶段。
  - 定义 v0.0.7.x 为 severity / 数值调优 / golden samples 扩容阶段。
  - 明确 v0.0.5.x 负责“系统里的东西是谁”，v0.0.6.x 负责“这些东西如何被三层系统判断”，v0.0.7.x 负责“判断得好不好、数值顺不顺”。
  - 明确不要把 v0.0.5.x 误解为给所有未来系统提前造 ID 空表。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 同步短版阶段边界：ID 化完成前不急着启动完整三层 summary，三层判定放到 v0.0.6.x，severity 和数值调优放到 v0.0.7.x。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步到 `v0.0.5.23-candidate` 后路线文档补充状态。
  - 补充后续 v0.0.5.x 候选方向：中文主键残留盘点、accidentTypeId、drinkTypeId、audienceId、规则表 refs、golden ID 断言、反馈 tag 边界和 ID 化收口审计。
- 更新 `AGENTS.md`
  - 补充 Codex / AI agent 长期工作守则：后续 v0.0.5.x 不默认推进三层 summary；当前优先级是现有系统 ID 化和去中文主键。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html / ui / storage。
- 不改页面版本号。
- 不推进 v0.0.5.24。
- 不创建未来不存在系统的数据结构。
- 不做 accidentTypeId / drinkTypeId 代码实现。
- 不做三层 summary。
- 不做 severity 系统。
- 不改评分、事故判断、反馈文案、类型判断、保存结构或 golden samples expected。
- 不 tag。

## docs: record stable ids for player-visible labels

本轮只更新 docs / 工作守则，不提升页面版本号，不创建 tag。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 新增长期原则：玩家可见文案不应长期作为系统主键。
  - 明确 stable ID + `displayName` / `text` 双轨原则。
  - 说明现有系统中已参与判断 / 测试 / 保存 / 展示的中文显示文本，应后续逐步 ID 化。
  - 说明未来新增系统应从第一天使用 stable ID + `displayName` / `text`。
  - 明确不要为未来尚不存在的系统提前造空架子。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 同步味觉系统输出的事故类型、饮品类型、反馈标签、客群标签等长期不应只依赖中文显示名。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步到 `v0.0.5.23-candidate` 后 docs 补充状态。
  - 补充后续可评估 accidentTypeId、drinkTypeId、golden samples ID 断言等小步迁移方向。
- 更新 `AGENTS.md`
  - 补充 Codex / AI agent 长期工作守则：新增规则、新数据和新系统优先使用 stable ID，legacy 中文字段可过渡保留，但不得扩大单次任务范围。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html / ui / storage。
- 不改页面版本号。
- 不推进 v0.0.5.24。
- 不创建未来不存在系统的空表或数据结构。
- 不做 accidentTypeId / drinkTypeId 代码实现。
- 不做完整本地化系统。
- 不改评分、事故判断、反馈文案、类型判断、保存结构或 golden samples expected。
- 不 tag。

## v0.0.5.23

accidentRules 小批 refs 迁移。

### 阶段目标

本版本将 `data/accidentRules.js` 中现有柠檬 / 榴莲事故规则新增 `ingredientId` 字段，让这些事故规则进入 stable ingredientId / 中文 name 双轨结构。旧 `ingredient` 中文字段继续保留，用于 legacy 兼容和规则可读性。

### 本轮新增 / 更新

- 更新 `data/accidentRules.js`
  - 柠檬事故规则新增 `ingredientId: "fruit_lemon"`。
  - 榴莲事故规则新增 `ingredientId: "fruit_durian"`。
  - 保留旧 `ingredient: "柠檬"` / `ingredient: "榴莲"`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.23。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.23 完成点。

### 架构边界

- `accidentRuleEngine` / `ruleRefHelper` 职责不扩张。
- `ruleRefHelper` 仍只负责 ref 解析和 context 查询，不承载事故判断、味觉判断、评分判断或文案判断。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `node --check data/accidentRules.js` 通过。
- `node --check core/accidentRuleEngine.js` 通过。
- `node --check core/ruleRefHelper.js` 通过。
- 完成 accidentRules ref 解析自检：柠檬规则解析为 `fruit_lemon`，榴莲规则解析为 `fruit_durian`。

### 本轮不做

- 不改阈值、评分、cap、tags、notes、事故类型或 golden samples expected。
- 不迁移 `data/proportionSegmentRules.js`、`data/combinationRules.js` 或 `data/drinkTypeRules.js`。
- 不改 `accidentRuleEngine`、`ruleRefHelper`、analyzer、保存结构或 UI 交互。
- 不做三层 summary、flavorProfile 或 severity 系统。
- 不 tag。

## v0.0.5.22

ingredientGroups refs 迁移。

### 阶段目标

本版本将 `data/synergyRules.js` 的 `ingredientGroups` 主定义从旧中文 name arrays 迁移为 stable ingredientId / refs。目标是继续收口系统主键依赖，让 analyzer 继续通过 `ingredientGroupHelper` 查询共享原料组，而不关心底层 group 定义是中文 name 还是 stable ref。

### 本轮新增 / 更新

- 更新 `data/synergyRules.js`
  - 新增 `heavyFlavorRefs`、`dairyRefs`、`highFatDairyRefs`、`strawResistanceRefs`、`clearLiquidRefs`。
  - `ingredientGroups` 主定义改为引用 refs 数组。
  - 保留旧中文 `heavyFlavorNames`、`dairyNames`、`highFatDairyNames`、`strawResistanceNames`、`clearLiquidNames` 作为兼容导出。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.22。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.22 完成点。

### 架构边界

- `ingredientGroupHelper` 仍只负责 group key -> refs -> context 查询，不承载味觉判断、事故判断、评分判断、类型判断或文案判断。
- analyzer 调用方式保持稳定，仍通过 `sumIngredientGroup(context, "...")` 查询 group total。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `node --check data/synergyRules.js` 通过。
- `node --check core/ingredientGroupHelper.js` 通过。
- `validateIngredientGroups()` 通过。

### 本轮不做

- 不改评分、事故判断、反馈文案、类型判断、保存结构或 golden samples expected。
- 不新增 golden samples。
- 不迁移 `data/combinationRules.js`、`data/drinkTypeRules.js`、`data/accidentRules.js` 或 `data/proportionSegmentRules.js`。
- 不做三层 summary、flavorProfile 或 severity 系统。
- 不 tag。

## docs: AGENTS golden samples 数量规则修正

本轮只更新工作流文档，不提升页面版本号，不创建 tag。

### 本轮新增 / 更新

- 更新 `AGENTS.md`
  - 移除过期的 `15/15 passed` 当前数量表述。
  - 明确 `AGENTS.md` 不承担具体 golden samples 数量记录职责。
  - 具体 expected 数量以 `docs/AI_CONTEXT.md` 当前状态快照、`docs/VERSION_LOG.md`、实际 `data/goldenSamples.js` 和 `node scripts/runGoldenSamples.js` 运行结果为准。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 core / data / scripts / index.html / ui / storage。
- 不推进 v0.0.5.22。
- 不 tag。

## docs: v0.0.5.21-candidate 后文档补充

本轮只更新文档，不提升页面版本号，不创建 tag。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步到 `v0.0.5.21-candidate`。
  - 记录最新 candidate commit 为 `47e57a9 test: add ingredient id golden equivalents`。
  - 说明本轮 docs commit 是 `v0.0.5.21-candidate` 之后的文档补充 commit，未单独 tag。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 golden samples 的定位与可调整原则。
  - 明确 golden samples 是当前阶段的回归安全网，不是永久数值圣经。
  - 明确 ID 等价样本用于保证 name 与 ingredientId 输入路径输出一致。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 同步 golden samples 在重构期、调参期、三层 summary 和 severity 接入阶段的定位。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 core / data / scripts / index.html / ui / storage。
- 不改评分、事故判断、反馈文案、类型判断或保存结构。
- 不推进 v0.0.5.22。
- 不 tag。

## v0.0.5.21

ID golden samples 补强。

### 阶段目标

本版本在规则表数据迁移前补强 golden samples 的 ingredientId 输入路径。新增 5 个 ID 等价样本，复制现有 name 样本的配方比例和 expected，用于保护清爽水果茶、冲突组合、奶脂过载、吸管阻力和榴莲强身份路径。

### 本轮新增 / 更新

- 更新 `data/goldenSamples.js`
  - 新增 `fresh_bubble_fruit_tea_id_equivalence`。
  - 新增 `bubble_cream_conflict_id_equivalence`。
  - 新增 `greasy_overload_id_equivalence`。
  - 新增 `straw_resistance_accident_id_equivalence`。
  - 新增 `high_durian_oddity_accident_id_equivalence`。
  - 旧 name samples 保持不变。
  - 不批量迁移 golden samples。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.21。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `node --check data/goldenSamples.js` 通过。
- 完成 ingredient registry 校验：37 个原料，37 个唯一 ID，无 alias 冲突。
- 完成 ID 等价样本自检。

### 本轮不做

- 不改 taste engine。
- 不改 core / rules / storage / ui / scripts。
- 不改评分、事故判断、反馈文案、类型判断或保存结构。
- 不删除旧 name samples。
- 不批量迁移 golden samples。
- 不推进 v0.0.5.22。
- 不 tag。

## v0.0.5.20

保存结构 ingredientId 双轨地基。

### 阶段目标

本版本让浏览器保存配方结构进入 name / ingredientId 双轨。新保存配方写入 ingredientId + name + ratio，旧 name-only / alias / ID-only 存档载入时通过 registry 即时补齐。本轮只做保存结构边界兼容，不做正式存档系统。

### 本轮新增 / 更新

- 新增 `storage/recipeNormalizer.js`
  - 提供 `normalizeSavedCupItem`、`normalizeSavedCup`、`normalizeSavedRecipe`、`serializeCupForSave`。
  - 只负责识别 name / ingredientId / id / ingredientRef，通过 ingredientRegistry 补 canonical name 和 ingredientId。
  - 找不到原料时保留可用 name / ratio，不抛异常。
  - 不计算评分，不判断事故、反馈或饮品类型。
- 更新 `ui/domEvents.js`
  - 保存配方时写入标准化 cup item。
  - 载入旧保存配方时即时标准化 cup。
- 更新 `ui/render.js`
  - 保存列表显示 canonical name 或 fallback。
  - 左侧按钮高亮兼容 ingredientId / name / alias。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.20。
  - 加载 `storage/recipeNormalizer.js`。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。
- 完成 recipe 标准化自检。
- 完成无头 Chrome 页面加载检查和真实 UI smoke test。

### 本轮不做

- 不做复杂 localStorage migration。
- 不批量改写旧 localStorage。
- 不做正式存档系统、玩家进度存档、云存档、多存档槽或 schemaVersion。
- 不改评分、事故判断、反馈文案、类型判断、rules 或 golden samples。
- 不改 UI 视觉。
- 不做三层 summary、flavorProfile 或 v0.0.5.21。
- 不 tag。

## v0.0.5.19

drinkType rules 支持 ingredientId。

### 阶段目标

本版本让 `drinkTypeRules` 执行入口支持 ingredientId / ingredientRef / refs / anyRefs / allRefs 等 ref 字段。本轮只增强规则匹配入口，不批量迁移 `data/drinkTypeRules.js`，不改变玩家可见类型输出。

### 本轮新增 / 更新

- 更新 `core/drinkTypeAnalyzer.js`
  - 旧 `ingredient` / `anyIngredient` / `allIngredients` 继续兼容。
  - 新增支持单个 ref：`ingredientId` / `ingredientRef` / `ref`。
  - 新增支持任一 ref：`anyRefs` / `anyIngredientRefs` / `anyIngredientIds`。
  - 新增支持全部 ref：`allRefs` / `allIngredientRefs` / `allIngredientIds` / `refs` / `ingredientIds`。
  - 规则匹配入口可接收完整 `context`，并通过现有 ref 查询能力判断当前杯子是否含有目标原料。
- 更新 `core/tasteJudge.js`
  - 调用 `inferType` 时传入完整 `context`。
  - 不改变 `forcedType` / fallback 顺序。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.19。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不批量迁移 `data/drinkTypeRules.js` 为 ingredientId。
- 不删除旧中文 name 兼容。
- 不改 `analyzeFruitTeaBlend` 内部中文数组。
- 不改 audience 逻辑。
- 不改保存结构、golden samples、评分、cap、阈值、反馈文案或类型命名。
- 不做三层 summary、flavorProfile 或 severity 系统。
- 不改 `ruleRefHelper` 或 `ingredientGroupHelper` 的职责。
- 不 tag。

## v0.0.5.18

ingredient group helper 地基。

### 阶段目标

本版本新增 `ingredientGroupHelper`，让共享原料组通过统一入口支持 name / ingredientId / alias / object ref。本轮只切换现有 synergy group totals 的查询入口，不迁移本地硬编码数组，不改变玩家可见输出。

### 本轮新增 / 更新

- 新增 `core/ingredientGroupHelper.js`
  - 提供 `getIngredientGroupRefs`、`sumIngredientGroup`、`hasAnyIngredientGroup`、`validateIngredientGroups`。
  - 只负责 group key -> refs -> context 查询。
  - 不承载事故、比例、类型、风味、评分或文案判断。
- 更新 `data/synergyRules.js`
  - 新增统一 `ingredientGroups` group key 入口。
  - 保留旧中文 group 数组：`heavyFlavorNames`、`dairyNames`、`highFatDairyNames`、`strawResistanceNames`、`clearLiquidNames`。
  - 不改变 `comboRules` 转出口语义。
- 更新 `core/accidentAnalyzer.js`
  - `heavyFlavor`、`dairy`、`highFatDairy`、`strawResistance`、`clearLiquid` totals 改走 helper。
- 更新 `core/proportionAnalyzer.js`
  - `dairy`、`highFatDairy` totals 改走 helper。
- 更新 `core/drinkTypeAnalyzer.js`
  - `dairy`、`highFatDairy`、`strawResistance` totals 改走 helper。
- 更新 `index.html` 和 `scripts/runGoldenSamples.js`
  - 加载 `core/ingredientGroupHelper.js`，顺序在 `ruleRefHelper` 之后、使用 group helper 的 analyzer 之前。
  - 页面顶部版本号同步为 v0.0.5.18。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不删除旧中文 group 数组。
- 不批量迁移 `data/synergyRules.js` 为 ingredientId。
- 不迁移 analyzer 内部本地硬编码中文数组。
- 不改 `data/combinationRules.js` 或 `data/goldenSamples.js`。
- 不改阈值、评分、事故结果、反馈文案、类型判断、golden samples 或保存结构。
- 不做 drinkType 全量迁移、三层 summary、flavorProfile 或 severity 系统。
- 不 push，不 tag。

## 文档补充：三层判定数据化原则

本轮只改设计文档，不提升页面版本号，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 新增“三层判定的数据化原则”。
  - 明确三层判定不是三层 if。
  - 明确代码负责“怎么判”，数据负责“判什么”，测试负责“别判歪”。
  - 区分允许存在的引擎 if 与应避免长期堆叠的内容 if。
  - 写入 taste / texture / flavor 三层各自的数据化方式。
  - 明确 flavor 层尤其要避免标签组合 if 地狱。
  - 明确 `ingredientGroupHelper` 与数据化原则的关系：只能做 group key -> refs -> context 查询，不承载味觉判断。
  - 明确事故 severity 应数据化为 `severityLevel` / `scoreMultiplier` / `feedbackTags` 等结构。
- 更新 `docs/AI_CONTEXT.md`
  - 同步当前状态快照。
  - 新增三层判定数据化原则的短索引。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不改代码。
- 不改 data / scripts / index.html。
- 不改 `AGENTS.md`。
- 不改页面版本号。
- 不推进 v0.0.5.18。
- 不 push，不 tag。

## 文档补充：AGENTS.md Codex 工作守则

本轮只改工作流文档，不提升页面版本号，不改运行逻辑。

### 本轮新增 / 更新

- 更新根目录 `AGENTS.md`
  - 明确其作为 Codex / AI agent 进入本仓库时的长期工作守则。
  - 明确 `AGENTS.md` 不是单次任务单。
  - 明确用户粘贴的单次任务提示词只约束本轮任务，不应被长期化，除非任务明确要求更新守则。
  - 写入开工前必读文件、修改范围、push / tag、测试分级、诚实报告和味觉引擎架构边界。
- 更新 `docs/AI_CONTEXT.md`
  - 同步当前状态快照到 `v0.0.5.17-candidate`。
  - 补充根目录 `AGENTS.md` 已作为 Codex / AI agent 长期工作守则。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不改游戏代码。
- 不改 data / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.18。
- 不 push，不 tag。

## v0.0.5.17

combination rules 支持 ingredientId。

### 阶段目标

本版本让 `combinationAnalyzer` 支持组合规则通过旧 `names` 与新 `refs` / `ingredientRefs` / `ingredientIds` 匹配当前配方。本轮只增强组合规则执行入口，不批量迁移 `data/combinationRules.js`。

### 本轮新增 / 更新

- 更新 `core/combinationAnalyzer.js`
  - 旧 `{ names: ["红茶", "牛奶"] }` 继续可用。
  - 新 `{ refs: ["tea_black", "dairy_milk"] }`、`ingredientRefs`、`ingredientIds` 可通过 `ruleRefHelper` 查询。
  - 支持 ingredientId / name / alias / object ref。
- 更新 `core/tasteJudge.js`
  - 组合匹配调用改为传入完整 context，让组合规则执行层可以使用 ingredientId/ref 查询。
  - 柠檬 + 牛奶旧 `names` 特殊判断保持旧输出，不扩展新业务语义。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.17。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不迁移 `data/combinationRules.js`。
- 不处理 `data/synergyRules.js`。
- 不改 golden samples。
- 不改保存配方结构。
- 不改评分、事故优先级、反馈文案、饮品类型判断或 UI 交互。
- 不做三层 summary、flavorProfile 或 severity 系统。
- 不 push，不 tag。

## 文档补充：AI_CONTEXT 当前状态快照

本轮只修正文档索引，不提升页面版本号，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 新增“当前状态快照”。
  - 明确最新 candidate 为 `v0.0.5.16-candidate`。
  - 明确最新 candidate commit 为 `7584d5e feat: support ingredient refs in proportion rules`。
  - 明确最新 main docs commit 为 `2291191 docs: record profile rationale and accident severity principles`。
  - 明确 `2291191` 是 `v0.0.5.16-candidate` 之后的 docs 补充 commit，未单独创建 candidate tag。
  - 明确 golden samples 当前为 15/15 passed。
  - 清理旧的 v0.0.5.9 candidate / 14/14 当前状态误导。
  - 新增“当前状态快照”维护规则，避免新对话读到旧 candidate 或旧 golden 数量。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不改代码。
- 不改 data / scripts / index.html。
- 不改页面版本号。
- 不新增功能。
- 不 push，不 tag。

## 文档补充：三层 profile 由来与事故 severity 原则

本轮只补充设计文档，不提升页面版本号，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充三层 profile 的设计由来。
  - 记录奥利奥 / 小料讨论如何引出 textureProfile。
  - 记录柠檬 / acid overload 讨论如何引出 tasteProfile 事故泛化。
  - 记录橙子 vs 西红柿例子如何引出 flavorProfile。
  - 补充事故优先级与事故 severity 数值化原则。
  - 明确粗吸管需求冲突不自动等于重事故。
  - 补充 v0.0.5.x 房梁阶段边界。
- 更新 `docs/AI_CONTEXT.md`
  - 新增新对话启动提醒。
  - 明确如果用户只提供 AI_CONTEXT，应提醒继续提供 / 读取 `docs/TASTE_ENGINE_ARCHITECTURE.md`，必要时再读 `docs/TASTE_SYSTEM_DESIGN.md` 和 `docs/VERSION_LOG.md`。
  - 增加关键文件清单索引。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不改代码。
- 不改 data / scripts / index.html。
- 不改页面版本号。
- 不新增功能。
- 不 push，不 tag。

## v0.0.5.16

proportion rules 支持 ingredientId。

### 阶段目标

本版本让 `proportionSegmentRuleEngine` 接入 `ruleRefHelper`，使比例段规则执行器可以通过 stable ingredientId、中文 name、alias 和 object ref 查询当前配方比例。本轮只增强执行层兼容能力，不批量迁移 `data/proportionSegmentRules.js`。

### 本轮新增 / 更新

- 更新 `core/proportionSegmentRuleEngine.js`
  - 单原料比例查询改用 `ruleRefHelper`。
  - 旧 `{ ingredient: "柠檬" }` 继续可用。
  - 新 `{ ingredientId: "fruit_lemon" }`、`{ ingredientRef: "fruit_lemon" }`、alias 和 object ref 可由 helper 解析。
  - 多原料合计兼容旧 `names` 与新 `refs`、`ingredientRefs`、`ingredientIds`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.16。
  - 将 `core/ruleRefHelper.js` 加载顺序前移到 `core/proportionSegmentRuleEngine.js` 之前。
- 更新 `scripts/runGoldenSamples.js`
  - 同步 Node 回归环境中的脚本加载顺序。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。

### 本轮不做

- 不批量迁移 `data/proportionSegmentRules.js`。
- 不改比例段阈值、评分、事故结果、反馈文案、饮品类型判断或 UI 交互。
- 不改 golden samples。
- 不改保存配方结构。
- 不改 `tasteJudge`、`tasteContext` 或 `accidentRuleEngine`。
- 不做三层 summary 或 flavorProfile。

## v0.0.5.15

golden samples 支持 ingredientId 输入。

### 阶段目标

本版本增强 golden samples 回归安全网，让测试 runner 可以把 `{ ingredientId, ratio }` 等 ID 输入标准化为现有味觉系统可读取的 cup item。旧 `{ name, ratio }` 样本保持兼容，现有 14 个样本不批量迁移。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 在 runner 内部标准化 sample cup item。
  - 旧 `{ name, ratio }` 写法保持原路径。
  - 新增支持 `{ ingredientId, ratio }`、`{ ingredientRef, ratio }` 和 `{ id, ratio }`。
  - 无法解析的原料 ref 会让对应 golden sample 明确失败，不静默跳过。
- 更新 `data/goldenSamples.js`
  - 新增 `classic_milk_tea_id_equivalence`，用 `ingredientId` 覆盖经典奶茶等价输入路径。
  - 不批量迁移原有 14 个 name 样本。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.15。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，15/15 passed。
- `validateIngredientRegistry()` 通过：37 个原料，37 个唯一 id，无 alias 冲突。

### 本轮不做

- 不改评分、事故结果、反馈文案、饮品类型判断或 UI 交互。
- 不改 `tasteJudge`、`tasteContext`、profile、rules 或保存结构。
- 不改 `proportionSegmentRuleEngine`。
- 不批量迁移现有 golden samples。
- 不做三层 summary 或 flavorProfile。

## v0.0.5.14

rule ref helper 地基。

### 阶段目标

本版本新增很窄的规则引用 helper，让规则执行器可以通过 stable ingredientId、中文 name、alias 和 object ref 查询当前配方比例。本轮只接入 `accidentRuleEngine`，不批量迁移规则表，继续保持旧中文 `ingredient` 字段兼容。

### 本轮新增 / 更新

- 新增 `core/ruleRefHelper.js`
  - 提供 `resolveRuleIngredientRef`、`ratioOfRuleRef`、`hasRuleRef`、`sumRuleRefs`。
  - 只负责 ref 解析和 context 查询，不承载味觉判断、事故判断或文案判断。
- 更新 `core/accidentRuleEngine.js`
  - 改用 rule ref helper 查询规则原料比例。
  - 旧 `{ ingredient: "柠檬" }` 写法继续可用。
  - 新 `{ ingredientId: "fruit_lemon" }`、`{ ingredientRef: "fruit_lemon" }`、alias 和 object ref 查询能力已由 helper 支持。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.14。
  - 加载 `core/ruleRefHelper.js`。
- 更新 `scripts/runGoldenSamples.js`
  - 在 Node 回归环境中加载 `core/ruleRefHelper.js`。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不批量迁移 `data/accidentRules.js`。
- 不改 `proportionSegmentRules`、`combinationRules`、`drinkTypeRules`、`synergyRules`。
- 不改 golden samples。
- 不改保存配方结构。
- 不改评分、事故结果、反馈文案、饮品类型判断或 UI 交互。
- 不做三层 summary 或 flavorProfile。
- 不迁移任何旧事故规则。

## v0.0.5.13

profile 查询入口支持 ingredientId / ref。

### 阶段目标

本版本保持 profile 数据表中文 key 不变，只增强 profile 查询入口，让 tasteProfile / textureProfile 可以通过 stable id、中文 name、alias 和对象 ref 查询，为后续 rules、golden samples 和存档继续小步迁移打地基。

### 本轮新增 / 更新

- 更新 `data/ingredientTasteProfiles.js`
  - `getTasteProfile(ref)` 支持 stable id、中文 name、alias 和对象 ref。
  - `getCalculationProfile(ref)` 基于同一查询入口，支持 stable id / ref 查询 calculation profile。
- 更新 `data/ingredientTextureProfiles.js`
  - 新增 `getTextureProfile(ref)`，支持 stable id、中文 name、alias 和对象 ref。
  - `ingredientTextureProfiles` 继续保持中文 key。
- 更新 `core/textureProfileAnalyzer.js`
  - 改用统一 textureProfile 查询入口。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.13。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- `node --check data/ingredientTasteProfiles.js` 通过。
- `node --check data/ingredientTextureProfiles.js` 通过。
- `node --check core/textureProfileAnalyzer.js` 通过。
- `node --check core/ingredientRegistry.js` 通过。
- profile 查询自检通过：tasteProfile / calculationProfile / textureProfile 均支持 stable id、中文 name、alias 和对象 ref。
- `validateIngredientRegistry()` 通过：37 个原料，37 个唯一 id，无 alias 冲突。
- textureProfile 全原料查询无新增 missing profile。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不改变评分、事故判断、反馈文案、饮品类型或玩家可见输出。
- 不把 profile 数据表 key 改成 `ingredientId`。
- 不让 rules、golden samples 或保存结构改用 `id`。
- 不迁移任何旧事故规则。

## v0.0.5.12

context 双轨 name/id 地基。

### 阶段目标

本版本让 `tasteContext` 开始支持中文 `name` / stable `ingredientId` 双轨引用。旧 `name` 查询继续兼容，后续 profile、rules、golden samples 和存档可以在此基础上小步迁移到 stable `ingredientId`。

### 本轮新增 / 更新

- 更新 `core/tasteContext.js`
  - `activeCup` 标准化时补充 `ingredientId` 和 `category`。
  - 保留旧 `names`、`normalizedNames`、`ratioOf`、`sumRatios` 和 `countByCategory`。
  - 新增 `ingredientIds`、`normalizedIngredientIds`。
  - 新增 `ratioOfId`、`ratioOfRef`、`sumRatiosByIds`、`sumRatiosByRefs`、`hasIngredientRef`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.12。
- 更新味觉系统文档和 AI 接续上下文。
- 补充测试分级规则：明确文件级 / Node runtime、无头 Chrome 页面加载、真实 UI smoke test 的适用场景。
- 本轮 v0.0.5.12 candidate 前因修改 `tasteContext`，执行无头 Chrome 页面加载检查 + 轻量真实 UI smoke test。

### 验证结果

- `node --check core/tasteContext.js` 通过。
- `node --check core/ingredientRegistry.js` 通过。
- context 双轨自检通过。
- `validateIngredientRegistry()` 通过：37 个原料，37 个唯一 id，无 alias 冲突。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不改变评分、事故判断、反馈文案、饮品类型或玩家可见输出。
- 不让 profile、rules、golden samples 或保存结构改用 `id`。
- 不迁移任何旧事故规则。

## v0.0.5.11

ingredient lookup helper。

### 阶段目标

本版本在 v0.0.5.10 的稳定 `id` / `aliases` 数据地基上，新增统一原料查询 helper，为后续 `context`、profile、rules、golden samples 和存档从中文 `name` 小步迁移到 stable `ingredientId` 提供基础设施。

### 本轮新增 / 更新

- 新增 `core/ingredientRegistry.js`
  - 提供 `getIngredientById`、`getIngredientByName`、`getIngredientByAlias`。
  - 提供 `getIngredientId`、`getIngredientName`、`getIngredientCategory`。
  - 提供 `normalizeIngredientRef`、`listIngredients` 和 `validateIngredientRegistry`。
  - 支持 stable id、中文 name、aliases 和 meta object 查询。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.11。
  - 在 `data/ingredients.js` 后加载 `core/ingredientRegistry.js`。
- 更新 `scripts/runGoldenSamples.js`
  - 在 Node 回归环境中加载 `core/ingredientRegistry.js`。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- `node --check core/ingredientRegistry.js` 通过。
- `validateIngredientRegistry()` 通过：37 个原料，37 个唯一 id，无 alias 冲突。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不改变运行逻辑。
- 不让 `tasteContext`、rules、profile、golden samples 或保存结构改用 `id`。
- 不改评分、事故判断、反馈文案、饮品类型或玩家可见输出。
- 不迁移任何旧事故规则。

## v0.0.5.10

原料稳定 ID 字段地基。

### 阶段目标

本版本给当前所有原料补充稳定可读的 `id` 和 `aliases` 字段，为后续从中文显示名迁移到稳定 `ingredientId` 打地基。

### 本轮新增 / 更新

- 更新 `data/ingredients.js`
  - 新增 `ingredientMeta`，为当前 37 个原料补齐 `id`、`name`、`aliases` 和 `category`。
  - `id` 用于未来系统内部稳定引用。
  - `name` 仍用于玩家可见显示。
  - `aliases` 用于旧名、别名、搜索和后续兼容。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.10。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不改变运行逻辑。
- 不让规则、profile、context、golden samples 或保存结构改用 `id`。
- 不改评分、事故判断、反馈文案、饮品类型或玩家可见输出。
- 不迁移任何旧事故规则。
- 不新增、删除或重分类原料。

## v0.0.5.9

原料物理属性地基。

### 阶段目标

本版本在味觉属性 `tasteProfile` 之外，新增原料物理属性 `textureProfile` 地基，用于描述原料在杯子里的物理形态、固体负载、吸管阻力、糊化风险、液体支撑需求、奶脂负担等。目标是为后续质地事故、吸管阻力、沉积、糊化和奶脂负担规则表化做准备。

### 本轮新增 / 更新

- 新增 `data/ingredientTextureProfiles.js`
  - 建立原料物理属性表，覆盖茶 / 清液基底、乳脂类、大颗粒糯弹类、果冻凝胶类、混凝土 / 泥糊类、顶层奶脂类、果肉 / 粉体 / 调味类等当前原料。
  - 记录 `form`、`textureFamily`、`tags` 和 `effects`。
- 新增 `core/textureProfileAnalyzer.js`
  - 作为只读事实派生层，按当前杯子比例汇总 texture effects。
  - 输出 `effects`、`tags`、`dominantFamilies` 和 `missingProfiles`。
- 更新 `scripts/runGoldenSamples.js`
  - 加载 textureProfile 数据表与只读分析器，确保 Node 回归环境可检查新增文件。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.9。
  - 加载 textureProfile 数据表与只读分析器。
- 更新味觉系统文档和 AI 接续上下文。
- 补充长期设计原则：原料数据化应逐步拆成 `tasteProfile` / `textureProfile` / `flavorProfile` 三层。
  - `flavorProfile` 用于描述风味身份、香气联想和饮品适配，解决酸甜度相近但风味身份不同的问题。
  - 这是长期设计原则，不改变当前运行逻辑。
- 补充长期数据模型原则：后续应逐步引入稳定 `ingredientId`，系统内部判断使用 `ingredientId`，玩家显示使用 `name`，旧名 / 别名 / 搜索兼容使用 `aliases`。这是长期原则，不改变当前运行逻辑。
- 补充 AI 接续路线：v0.0.5.x 后续应先规划三层 profile + stable ingredientId 底层架构，暂停继续机械迁移单个旧事故规则。
- 新增 `docs/TASTE_ENGINE_ARCHITECTURE.md`，记录三层 profile、stable ingredientId、三层 summary、事故优先级重排、质地事故细分、粗吸管需求和 v0.0.5.x 房梁阶段规划。本轮只改文档，不改运行逻辑。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不改事故触发、不改评分、不改反馈、不改饮品类型，不改变玩家可见结果。
- 不迁移奥利奥、芋泥、小料循环、强风味、奶脂过载、工业奶茶或综合吸管阻力事故。
- 不改 `core/accidentAnalyzer.js`、`data/accidentRules.js`、`core/accidentRuleEngine.js`、`feedbackEngine.js`、`drinkTypeAnalyzer.js` 或 `proportionAnalyzer.js`。

## v0.0.5.8

事故迁移前置样本补强。

### 阶段目标

本版本只补充少量 golden samples，为后续继续迁移旧事故规则提供安全网。本轮不改味觉逻辑，不迁移任何事故规则，不调整评分、cap、文案或类型判断。

### 本轮新增 / 更新

- 更新 `data/goldenSamples.js`
  - 新增 `high_lemon_acid_accident`，保护柠檬 60-80 高酸度事故档。
  - 新增 `high_durian_oddity_accident`，保护榴莲 60-80 高争议猎奇事故档。
  - 新增 `oreo_overload_texture_accident`，保护奥利奥碎 >40 的初始口感事故档。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.8。
- 更新味觉系统文档和 AI 接续上下文。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，14/14 passed。

### 本轮不做

- 不加强风味过量样本，因为咖啡 / 抹茶 / 可可等强风味高比例可能是浓郁成立款，不应过早固化为事故基准。
- 不改 `core/accidentAnalyzer.js`、`data/accidentRules.js`、`core/accidentRuleEngine.js` 或其他 core 逻辑。
- 不迁移奥利奥、强风味、芋泥、奶脂过载、工业奶茶或综合吸管阻力规则。
- 不改评分逻辑、事故优先级、反馈文案、UI 视觉或比例条交互。

## v0.0.5.7

旧事故规则小范围表格化。

### 阶段目标

本版本只把 `core/accidentAnalyzer.js` 中柠檬 / 榴莲两类单原料极端事故迁移到规则表，继续降低事故系统进入巨大 if 树的风险。目标是结构治理，不是调整味觉表现。

### 本轮新增 / 更新

- 新增 `data/accidentRules.js`
  - 存放旧事故规则表，本轮仅包含柠檬和榴莲两类单原料极端事故。
  - 保持原有触发阈值、type、cap、score、add 属性加成和 notes 文案候选。
- 新增 `core/accidentRuleEngine.js`
  - 读取事故规则表，根据当前配方中对应原料比例返回事故对象。
  - 保持执行器只做通用阈值匹配，不写具体柠檬 / 榴莲内容。
- 更新 `core/accidentAnalyzer.js`
  - 接入 `evaluateAccidentRules`。
  - 移除柠檬 / 榴莲旧硬编码分支，避免重复叠加。
  - 奶脂过载、工业奶茶、芋泥、奥利奥、小料循环、强风味、旧吸管阻力和结构事故调用保持不变。
- 更新 `scripts/runGoldenSamples.js`
  - 加入 `data/accidentRules.js` 与 `core/accidentRuleEngine.js` 的加载顺序。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.7。
  - 加入事故规则表和执行器脚本引用。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，11/11 passed。

### 本轮不做

- 不一次性迁完整事故系统。
- 不迁移奶脂过载、工业奶茶、综合吸管阻力、芋泥、奥利奥、小料循环或强风味泛化事故。
- 不改事故优先级。
- 不改评分数值、cap、add 属性加成或反馈文案内容。
- 不改 `tasteJudge.js` 审判流程。
- 不新增原料、隐藏配方、经营系统、顾客系统或温度 / 冰量 / 糖度完整功能。
- 不改 UI 视觉或比例条交互。

## v0.0.5.6

金标样本 / 回归样本地基版。

### 阶段目标

本版本只建立代表性配方样本库和轻量回归检查脚本，为后续继续治理 `accidentAnalyzer.js`、`feedbackEngine.js`、`drinkTypeAnalyzer.js` 等高风险模块提供安全网。

### 本轮新增 / 更新

- 新增 `data/goldenSamples.js`
  - 记录 11 个代表性配方样本。
  - 覆盖经典奶茶、清爽水果茶、高级厚乳款、极端柠檬、极端榴莲、奶脂过载、吸管阻力事故、气泡奶油冲突、工业奶茶和芋泥结构对照。
  - 样本预期使用类型关键词、禁用类型、分数区间和反馈关键词，不锁死完整反馈文本。
- 新增 `scripts/runGoldenSamples.js`
  - 在 Node 环境下按页面脚本依赖顺序加载现有味觉引擎。
  - 调用 `evaluateCup` 检查所有金标样本。
  - 输出每个样本 pass / fail 和总通过数量。
- 更新 `docs/TEST_CASES.md`
  - 记录金标样本 / 回归样本使用原则。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录金标样本是反 if 地狱的安全网。

### 本轮不做

- 不改游戏逻辑。
- 不改 UI 或页面版本号。
- 不改保存结构。
- 不改评分公式。
- 不改事故规则、比例段规则、反馈文案或饮品类型规则。
- 不新增原料。
- 不做隐藏配方、图鉴、饮品家族、玩家命名、经营系统或温度 / 冰量 / 糖度完整功能。

## v0.0.5.5

比例段规则表地基版。

### 阶段目标

本版本只建立比例段规则表和通用执行器，让 `core/proportionAnalyzer.js` 开始从手写比例段 if 过渡到规则表调度。目标是治理比例段逻辑膨胀，不是调味觉数值。

### 本轮新增 / 更新

- 新增 `data/proportionSegmentRules.js`
  - 存放比例段规则，当前只迁移柠檬和榴莲两类强风味原料的比例段。
  - 规则描述原料、比例区间、分数变化、属性加成、说明文案和标签。
- 新增 `core/proportionSegmentRuleEngine.js`
  - 读取比例段规则表，统一判断比例区间和少量通用上下文条件。
  - 返回与现有比例分析兼容的 `scoreDelta`、`notes`、`tags` 和 `matchedRuleIds`。
- 更新 `core/proportionAnalyzer.js`
  - 先调用比例段规则执行器。
  - 移除本轮已迁移的柠檬 / 榴莲手写比例段，避免重复叠加。
  - 未迁移的奶类、小料、芋泥、奥利奥、气泡水等旧逻辑继续保留。
- 更新 `index.html`
  - 顶部版本号更新为 v0.0.5.5。
  - 仅新增比例段规则表和执行器脚本引用。

### 本轮不做

- 不迁移完整比例系统。
- 不调味觉数值。
- 不改事故优先级。
- 不深拆事故系统。
- 不改 UI 视觉、比例条交互或保存结构。
- 不新增原料。
- 不做温度 / 冰量 / 糖度完整功能。
- 不做经营、命名、饮品家族 UI、顾客、商店、员工、报表或比赛系统。

## v0.0.5.4

结构事故规则表地基版。

### 阶段目标

本版本只新增结构事故规则表和规则执行器，让 `context.structure` 开始以数据规则方式参与口感事故判断，避免继续把具体结构事故 if 堆进 `accidentAnalyzer.js`。

### 本轮新增 / 更新

- 新增 `data/structureAccidentRules.js`
  - 存放结构事故规则，当前仅覆盖半固体 / 低可饮用性 / 高固体负载 / 低液体支撑方向。
  - 规则只描述结构条件，不写具体原料名，不处理风味冲突、温度、经营或命名。
- 新增 `core/structureAccidentRuleEngine.js`
  - 读取结构事故规则表，按通用条件键匹配 `context.structure`。
  - 返回与现有事故对象兼容的结果。
- 更新 `core/accidentAnalyzer.js`
  - 只负责调用结构事故规则执行器并汇总事故。
  - 若旧吸管阻力 / 半固体口感事故已命中，不重复追加结构事故，避免重复惩罚过重。
- 更新 `index.html`
  - 仅新增结构事故规则表和规则执行器脚本引用。

### 本轮不做

- 不改 UI 内容或顶部版本号。
- 不改保存结构，不让 `structure` 进入最终 `result`。
- 不做温度 / 冰量 / 糖度完整功能。
- 不做经营、命名、饮品家族 UI 或风味冲突大改。
- 不新增原料，不全面调分，不大规模重写 `tasteJudge.js` 或 `accidentAnalyzer.js`。

## v0.0.5.3

饮品结构分析地基版。

### 阶段目标

本版本只新增后台饮品结构分析层，为后续 `textureVector`、`solidLoad`、`drinkability`、`strawResistance` 和质地事故规则表化做准备。

### 本轮新增 / 更新

- 新增 `core/drinkStructureAnalyzer.js`
  - 根据当前杯子和原料属性派生后台结构指标。
  - 输出 `baseLiquidRatio`、`flavorRatio`、`textureRatio`、`sweetenerRatio`、`solidLoad`、`drinkability`、`strawResistance`、`textureBalance`、内部 `notes` 和内部 `tags`。
  - 指标统一收口到 0-100，便于后续金标样本和表格化调参。
- 更新 `core/tasteJudge.js`
  - 在试喝流程中生成 `context.structure`。
  - 本轮不把 structure 写入最终试喝结果，避免改变保存的 `result` 快照。
- 更新 `index.html`
  - 仅新增 `core/drinkStructureAnalyzer.js` 脚本引用。

### 本轮不做

- 不改 UI 内容或顶部版本显示。
- 不改评分。
- 不改反馈文案。
- 不改现有事故触发。
- 不改玩家保存结构。
- 不新增原料。
- 不做温度 / 冰量 / 糖度完整功能。
- 不做经营、顾客、员工、报表或比赛系统。

### 验证重点

- 当前玩家可见试喝结果应保持稳定。
- 后台结构指标只作为派生分析，不替代配方原始数据、玩家命名、饮品家族或版本标签。

## v0.0.5.2

反馈系统标签化版。

### 阶段目标

本版本只治理反馈系统结构，并补强模块边界文档。目标是让反馈文案逐步进入标签化文案池，让 `feedbackEngine.js` 更像反馈选择器，而不是继续承担所有文案条件判断。

### 本轮新增 / 更新

- 更新 `data/feedbackTexts.js`
  - 在现有文案基础上整理反馈文案池。
  - 新增反馈标签到文案池的映射，例如 `straw_disaster`、`greasy_overload`、`acid_accident`、`classic`、`premium`、`fresh`、`dessert`、`durian`、`bubble_conflict` 等。
- 更新 `core/feedbackEngine.js`
  - 将内联文案迁移为按标签选文案池。
  - 保留少量中枢判断，用于提取反馈标签、处理优先级、去重和最多 3 句输出限制。
- 更新 `index.html`
  - 顶部版本号更新为 v0.0.5.2。
- 更新 `AGENTS.md`、`docs/PROJECT_RULES.md`、`docs/TASTE_SYSTEM_DESIGN.md`、`docs/AI_CONTEXT.md`
  - 记录反馈系统标签化原则。
  - 补充味觉系统、反馈系统、配方实验室、隐藏配方 / 图鉴、顾客、经营、员工 / 设备、UI、存档之间的模块边界。

### 本轮不做

- 不新增反馈人格 / 多试喝员
- 不新增顾客、经营、隐藏配方或图鉴系统
- 不新增大量反馈文案
- 不改评分
- 不改饮品类型识别
- 不改原料数值
- 不改比例段规则或事故规则
- 不改 UI 视觉
- 不改比例条交互

### 验证结果

- JS 语法检查：通过。
- 代码层回归：使用固定随机数对比 v0.0.5.1，10 个代表配方类型、评分、反馈、客群和属性保持一致。
- 浏览器验收：页面可打开，顶部版本号显示 v0.0.5.2，console 红色 error 为 0。
- 本轮未修改评分、饮品类型规则、原料数值、比例段规则、事故规则、UI 视觉或比例条交互。

## v0.0.5.1

饮品类型识别数据化版。

### 阶段目标

本版本只治理饮品类型识别结构，不调味觉数值，不改评分，不改反馈文案，不改 UI 或比例条交互。

### 本轮新增 / 更新

- 新增 `data/drinkTypeRules.js`
  - 将现有主要饮品类型识别条件整理为带优先级的规则表。
- 更新 `core/drinkTypeAnalyzer.js`
  - 将 `inferType` 改为读取规则表并使用通用匹配器执行。
  - 保留 `analyzeFruitTeaBlend`，暂不强行迁移多水果茶 / 花果茶泛化识别。
  - 保留 `inferAudience`，audience 识别后续可继续数据化。
- 更新 `index.html`
  - 顶部版本号更新为 v0.0.5.1，并引入 `data/drinkTypeRules.js`。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录饮品类型规则优先进入规则表，不继续堆进 `drinkTypeAnalyzer.js`。

### 本轮不做

- 不新增大量新饮品类型
- 不新增原料
- 不新增隐藏配方 / 图鉴 / 营业 / 顾客 / 员工系统
- 不改 UI
- 不改比例条
- 不改评分
- 不改反馈文案
- 不修复“咖啡 + 纯水 = 美式”具体表现问题

### 验证结果

- JS 语法检查：通过。
- 代码层回归：使用固定随机数对比 v0.0.5.0，12 个代表配方类型、评分、反馈、客群和属性保持一致。
- 浏览器验收：页面可打开，顶部版本号显示 v0.0.5.1，console 红色 error 为 0。
- 基础操作：原料按钮开关、自动配平、试喝、随机乱摇、清空杯子、保存 / 载入 / 删除测试配方均正常。

## v0.0.5.0

味觉系统数据化地基版。

### 阶段目标

本版本开始从 v0.0.4.x 工程地基进入味觉系统数据化地基。目标不是玩法更新，也不是调高/调低某些配方，而是控制 `core/tasteJudge.js` 继续膨胀的风险，把原料属性、组合关系和味觉分析职责逐步迁移到数据表和专门 analyzer 模块。

### 本轮新增 / 更新

- 新增 `data/ingredientTasteProfiles.js`
  - 建立原料味觉属性库地基，记录甜度、酸度、苦味、茶感、奶感、清爽度、厚重度、黏稠度、香气冲击、怪异度、吸管阻力、高脂、强香气、清爽适配、质地风险等字段。
  - 预留 `temperature`、`iceLevel`、`sugarLevel`、`sweetenerType` 等未来底层参数枚举。
- 新增 `data/combinationRules.js`
  - 将好组合、冲突组合和三种以上茶类混合规则整理为可维护数据。
- 新增 `core/tasteContext.js`
  - 统一当前配方、比例查询、比例求和、分类计数和旧名称兼容。
- 新增 `core/ingredientAnalyzer.js`
  - 负责基础原料属性分析和属性加成。
- 新增 `core/proportionAnalyzer.js`
  - 负责原料比例分段影响。
- 新增 `core/accidentAnalyzer.js`
  - 负责极端比例、奶脂过载、工业奶茶、吸管阻力等事故判断。
- 新增 `core/combinationAnalyzer.js`
  - 负责组合协同 / 冲突命中查询。
- 新增 `core/drinkTypeAnalyzer.js`
  - 负责花果茶泛化识别、饮品类型识别和客群推断。
- 更新 `core/tasteJudge.js`
  - 收敛为味觉总调度：基础属性 → 比例分段 → 事故 → 冲突 → 好组合 → 普通分类 → 评分与反馈。
- 更新 `index.html`
  - 顶部版本号更新为 v0.0.5.0，并引入新增数据与 analyzer 文件。

### 本轮不做

- 不新增玩法
- 不新增原料
- 不新增隐藏配方
- 不新增营业 / 顾客 / 员工系统
- 不修改 UI 视觉
- 不修改比例条交互
- 不主动重调评分公式
- 不主动改试喝反馈文案
- 不修复“咖啡 + 纯水识别为美式”的问题

### 验证结果

- 代码层回归：使用固定随机数抽样对比 v0.0.4.4 前后 12 个代表配方，类型、评分、客群、属性和反馈保持一致。
- 页面验收：待本轮完成后通过本地浏览器自动化检查。

### 后续保留问题

- `data/ingredientTasteProfiles.js` 目前主要是地基，暂不直接重调评分结果。
- 温度、冰量、糖度、甜味来源只做底层预留，尚未做 UI 和完整规则。
- 咖啡 + 纯水的美式识别仍留到后续味觉优化版本。
- 后续新增规则应优先进入数据表、analyzer 或金标样本，避免继续堆具体配方 if。

### 本地提交记录

- commit hash: `64705f4`
- commit message: `refactor: build v0.0.5.0 taste data foundation`
- tag: 未创建
- push: 未执行
- 说明：v0.0.5.0 第一刀已完成并本地冻结，后续 v0.0.5.x 将继续优先治理味觉系统代码结构和规则数据化，不急着调味觉数值。

## v0.0.4.4

测试/验收规则文档收口。

### 阶段目标

本版本只做文档小整理，把 v0.0.4.x 工程复查确认的测试/验收规则写入项目 docs。

### 本轮更新

- `docs/TEST_CASES.md` 补充“优先自动化验收”原则。
- `docs/TEST_CASES.md` 补充 P0 / P1 / P2 测试分级原则。
- `docs/PROJECT_RULES.md` 补充自动化失败后的低风险自救规则。
- `docs/VERSION_LOG.md` 修正 v0.0.4.3 自动化验收最终结果。
- `docs/AI_CONTEXT.md` 简短记录当前测试工作流规则。

### 本轮不做

- 不改功能代码
- 不改味觉
- 不改评分
- 不改反馈文案
- 不改 UI
- 不改交互
- 不新增测试脚本
- 不创建 tests 目录

## v0.0.4.3

scoreEngine / feedbackEngine 低风险拆分版。

### 阶段目标

本版本只做评分职责和反馈选择职责的工程拆分，不修改玩法、味觉结果、评分规则、反馈文案、UI 视觉或交互。

### 本轮新增 / 更新

- 新增 `core/scoreEngine.js`
  - 负责评分状态、分数累加、分数封顶、属性分修正和最终评分收口。
- 新增 `core/feedbackEngine.js`
  - 负责从优先文案、事故状态、属性和分数中组合最终试喝反馈。
- 更新 `core/tasteJudge.js`
  - 保留味觉判定流程，改为调用 `scoreEngine` 和 `feedbackEngine`。
- 更新 `index.html`
  - 增加新 core 模块脚本引用，并同步顶部版本号为 v0.0.4.3。

### 本轮不做

- 不改味觉结果
- 不改评分规则
- 不改试喝反馈文案
- 不改 UI 视觉
- 不改原料按钮交互
- 不改比例条交互
- 不改保存 / 载入逻辑
- 不新增原料
- 不新增隐藏配方
- 不新增营业系统
- 不修复“咖啡 + 纯水”识别问题

### 验证结果

- JS 语法检查：通过。
- 静态路径检查：通过，新脚本引用均存在。
- 回归样本：使用固定随机数对比 v0.0.4.2 拆分前结果，10 个代表配方输出完全一致。
- 页面打开：本地静态服务可访问。
- 控制台检查：浏览器自动化环境不可用，未完成自动 console 检查；代码层和静态路径检查未发现明显运行风险。
- 后续已使用 Codex 内置 in-app Browser 自动化完成验收：
  - 页面加载正常。
  - 顶部版本号包含 v0.0.4.3。
  - console 红色 error 为 0。
  - 原料按钮开关逻辑正常。
  - 比例条逻辑正常，总量不能超过 100。
  - 试喝报告正常，无 `undefined` / `[object Object]`。
  - 保存 / 载入 / 删除测试配方正常。
  - 测试存档已清理。

## v0.0.4.2

工程文档地基 + 本地 AI 记忆保险 + 文稿目录整理。

### 阶段目标

本版本只做工程整理和文档地基，不修改玩法、味觉、评分、文案、UI 视觉或交互。

### 本轮新增 / 更新

- 创建或确认 `/Users/yui/Documents/vibecoding` 作为 vibe coding 项目统一目录
- 整理《奶茶实验室》项目位置
- 创建或更新 `docs/AI_CONTEXT.md`
- 创建或更新 `docs/PROJECT_RULES.md`
- 创建或更新 `docs/VERSION_LOG.md`
- 创建或更新 `docs/TEST_CASES.md`
- 创建或更新 `docs/TASTE_SYSTEM_DESIGN.md`
- 创建或更新 `docs/INGREDIENT_SCHEMA.md`
- 创建或更新 `docs/FEEDBACK_STYLE_GUIDE.md`
- 创建或更新 `docs/ROLLBACK_GUIDE.md`

### 本轮不做

- 不改玩法
- 不改味觉判断
- 不改评分
- 不改试喝文案
- 不改 UI
- 不改交互
- 不新增原料
- 不新增隐藏配方
- 不新增营业系统

### 验证结果

- 页面是否能正常打开：本地静态服务返回 200，人工验收页面可正常打开。
- 控制台是否有 error：浏览器真实 console 自动化检查未完成；人工功能测试未发现明显异常，JS 语法检查通过。
- 原料按钮开关式交互是否未回退：人工验收正常。
- 比例条总量限制是否未回退：人工验收正常；代码层检查通过，手动调整单项不联动，总量可低于 100 且不能超过 100。
- 试喝功能是否能正常运行：人工验收正常；核心味觉模块代码层抽样通过，反馈无 `undefined` / `[object Object]`。
- 保存配方功能是否能正常运行：保存 / 载入功能当前人工测试正常。
- docs 文件是否成功创建：文档地基已完成，已创建 / 更新 8 个目标文档。
- 项目目录是否整理完成：已将项目与明确相关备份移动到 `/Users/yui/Documents/vibecoding/`。

### 已知限制

- 当前保存配方功能使用浏览器本地存储。旧保存配方可能因打开地址、端口、域名、`file://` 与 `localhost` 切换、浏览器清理数据等原因不可见。这是原型期已知限制，不在 v0.0.4.x 修复。
- 后续可考虑导出 / 导入 JSON、存档版本号和正式本地存档方案。

## v0.0.1.x

早期配方实验室原型。完成自由添加原料、比例调整、试喝报告、本地保存等基础玩法。

## v0.0.2.0

味觉系统重大优化。加入极端比例事故、奶脂过载、吸管阻力、榴莲复合事故、版本号显示、比例上限等规则。

## v0.0.2.1

宽屏按钮小修；“奶精”改为“植脂奶”；加入工业奶茶、廉价感、健康疑虑方向反馈。

## v0.0.2.2

修复宽屏按钮位置、窄屏杯子比例、滑条视觉锁死。

## v0.0.2.3

修复比例滑条交互。手动拖动某个原料不再联动其它原料；当前总量可低于 100%，不能高于 100%；只有点击“自动配平”才批量调整比例。当前稳定操作版。

## v0.0.3.0

原料属性与比例分段系统重大优化。关键原料开始按低比例点缀、中比例主风味、高比例事故分段判断；校准榴莲、柠檬、乳脂类、芋泥/小料、气泡水和茶类的比例表现。

## v0.0.3.1

小修与体验补强。加入已选原料按钮状态提示；增加泛化花果茶/多水果茶识别；收敛普通气泡水果茶满分概率；小幅上调成立的榴莲牛乳和黑糖珍珠奶茶评分。

## v0.0.3.2

小修左侧原料按钮交互。原料按钮改为点击加入、再次点击移除，不再通过反复点击增加比例；比例调整仍只在当前杯子的滑条中完成。

## v0.0.4.0

纯工程模块化版本，配方实验室模块化地基版。玩家体验尽量保持 v0.0.3.2 一致：不改变味觉结果、评分、试喝文案、UI 视觉和比例条交互。

本轮拆分：

- `utils/helpers.js`：通用工具函数，如数值限制、随机选择、显示名称兼容。
- `core/recipeEngine.js`：当前杯子的纯配方操作，如添加/移除、比例上限、自动配平、随机配方。
- `core/tasteJudge.js`：味觉判定主流程，包含事故、组合、比例分段、类型、客群和反馈选择。
- `storage/saveStorage.js`：本地配方存档读取、写入、删除。

当前仍保留的技术债：

- `game.js` 仍承担主要 UI 渲染和事件绑定，后续可继续拆出 `ui/render.js` 和 `ui/domEvents.js`。
- 评分逻辑仍和味觉判定在 `core/tasteJudge.js` 内部耦合，暂未强拆，以避免改变结果。
- 反馈选择已集中到味觉模块，但未来多试喝员系统需要继续拆细。

后续建议：

- v0.0.4.1 可做模块化后的回归小修。
- 下一轮工程整理再拆 UI 层，不要和玩法更新混在一起。

## v0.0.4.1

纯工程优化版本，UI 渲染与事件绑定低风险拆分版。继续保持玩家体验不变，不新增玩法，不改变味觉结果、评分、试喝文案、UI 视觉、比例条交互和保存数据结构。

本轮拆分：

- `ui/render.js`：从 `game.js` 拆出原料区、当前杯子、比例控件、试喝报告、保存配方列表、已选原料高亮等 UI 渲染。
- `ui/domEvents.js`：从 `game.js` 拆出原料按钮、比例输入、删除原料、试喝、随机乱摇、自动配平、清空、保存、载入和删除存档等事件绑定。
- `game.js`：进一步收敛为入口文件，负责组织状态、DOM 节点、核心模块、渲染模块和事件模块。

当前仍保留的技术债：

- 评分逻辑仍和味觉判定同在 `core/tasteJudge.js` 内，暂不拆 `core/scoreEngine.js`。
- 反馈选择仍在 `core/tasteJudge.js` 内，暂不拆 `core/feedbackEngine.js`。
- `ui/render.js` 仍包含少量 DOM 结构拼接，后续若 UI 复杂化可继续细分。
