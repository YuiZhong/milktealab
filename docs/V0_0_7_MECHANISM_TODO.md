# v0.0.7.x Mechanism TODO / Audit Debt

## 0. 文档定位

本文档是 v0.0.7.x 机制 / ID / 内容管线债务正本。

它不是版本流水账，不替代 `docs/VERSION_LOG.md`；它也不是完整设计文档，不替代 `docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。它用于持续追踪四轮用户 / ChatGPT 审计后已经确认的 P1 / P2 债务、解决时机、阻塞门槛和推荐路线。

本文件不表示这些债务已经解决。后续任务不能把这里的 TODO 当成已完成事实，也不能为了“清债”顺手改 runtime、ID、generated data、golden expected 或文案。

`docs/STABLE_ID_NAMING_GUARDRAIL.md` 是长期稳定 ID / 命名 / 审查流程正本，适用于 v0.0.7.x 以及后续所有阶段。本文档只记录 v0.0.7.x 阶段债务、gate 和 TODO；涉及 ID 审计、validator、generated severity data、partial / active takeover 或新增 stable ID / tag / ruleId 的任务，必须引用长期正本，不在本文档复制完整流程。

## 1. 当前总体结论

四轮人工 / AI 审计覆盖：

1. 目录结构 + docs / 当前版本状态一致性。
2. ID / 命名 / 机制层级。
3. core / data / scripts 的 if 地狱与数据化边界。
4. content_sheets / generated / reports / golden 链路。

当前结论：

- P0：暂无。
- P1：存在若干机制 / ID / validator / legacy 迁移债务，必须在对应 gate 前解决，不能带到 v0.0.7.x 机制收口之后。
- P2：存在 docs / housekeeping / 轻技术债，不阻塞当前机制推进，但应择机整理。

## 2. P0 / P1 / P2 定义

- P0：立即阻塞，必须马上修，否则不能继续开发或冻结 candidate。当前四轮审计结果：P0 暂无。
- P1：当前 runtime 不一定已坏，但若不在指定门槛前处理，后续会造成机制混乱、ID 扩散、validator 错误、generated data 污染或 partial / active 接管风险。P1 必须在对应 gate 前解决。
- P2：不阻塞当前机制推进，但建议在合适时机整理，避免长期文档污染、开发体验变差或小技术债累积。

## 3. 阻塞门槛总览

| Gate | 之前必须完成 |
|---|---|
| AI 生成 ID 与机制命名审计开工前 | 已读取 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 并遵守其审计流程 |
| 新增 stable ID / feedbackTag / ruleId 进入表格前 | 分层确认、语义审查、source-of-truth 确认 |
| validate candidate severity sheet 实现前 | 已明确 known stable ID source of truth；若无，应先设计 registry / enum / schema |
| severity generated data build 前 | candidate severity sheet validator |
| severity shadow 输出前 | generated severity validator / structure check |
| severity partial takeover 前 | ID 命名审计、golden shadow expected、制作人 review |
| severity / threshold 表引用 `feedbackTag` 前 | 已读取 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`，并确认引用的是 reviewed feedbackTag source-of-truth，不是 candidate / risk tag |
| generated feedback partial takeover 前 | feedbackTag registry / 文案池扩充 / review pack 审核 |
| v0.0.7.x 机制 final 收口前 | AI 生成 ID 与机制命名审计、accidentAnalyzer 迁移路线、drinkStructureAnalyzer 去中文 Set 计划 |

## 4. P1 TODO

### P1-1｜AI 生成 ID 与机制命名审计

- 风险：AI / Codex 生成或沿用的 ID 可能看起来稳定，却混用了机制、样本、文案、severity 或 source 层级。
- 当前状态：v0.0.7.27 已建立 guardrail，但尚未做全量审计。
- 为什么重要：ID 一旦进入 docs、sample sheet、generated data、golden 或 runtime，会被后续 AI 当成事实来源。
- 必须在什么时候前解决：正式调参前；`candidate_severity_rules` 进入 generated data 前；severity / threshold partial takeover 前；v0.0.7.x 机制部分 final 收口前。
- 建议路线：按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 的长期审计流程，先列出 `accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`textId`、`sampleId`、`ruleId`、`candidateId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer`、`sourceSummary`、`triggerMetric` 以及 profile / tag / generated sample 中的 draft ID，再检查层级是否混用。
- 禁止误处理：不要顺手重命名已有 ID；不要把疑似问题直接改成新事实；需要迁移时单独开任务并保护 runtime、golden、docs 和 generated 引用。

重点检查：

- 是否按原料拆机制。
- 是否把 sampleId 混进机制主键。
- 是否把 severity 后缀混进 `accidentTypeId`。
- 是否把 `displayName` / `zhCN` 当主键。
- 是否旧 tag 语义误导新机制。
- 是否草案 ID 被误当正式 ID。
- 是否 ID 名称覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。

### P1-2｜known stable ID source of truth / registry / enum / schema

- 风险：future validator 如果没有明确 ID 来源，容易退回 substring / suffix 猜合法性。
- 当前状态：v0.0.7.27 已明确 validator 前置条件，但尚未新增 registry / enum / schema。
- 为什么重要：validator 是防错层，不能自己变成新的字符串 if 地狱。
- 必须在什么时候前解决：validate candidate severity sheet 正式实现前；任何 generated severity data build 前。
- 建议路线：先按 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 决定 known stable ID 来源，可选来源包括现有 data / rules 中已登记的 stable ID、统一 ID registry、generated schema、明确 enum / allowed values。
- 禁止误处理：不能写 `inferFromStringPatterns()` 之类从字符串模式反推 known ID 集合；字符串后缀 / substring 只能做 lint / warning。

### P1-3｜candidate severity sheet validator

- 风险：`content_sheets/examples/candidate_severity_rules.sample.csv` 当前只是草案，没有 validator 保护。
- 当前状态：CSV / JSON 健康，所有样例行 disabled / draft，但还不能进入 build / generated data。
- 为什么重要：没有 validator 就 build，会污染 generated data 并放大 ID / schema 错误。
- 必须在什么时候前解决：severity sheet 进入 build / generated data 前。
- 建议路线：先实现只读 validator，检查 UTF-8 with BOM、表头完整、`ruleId` 唯一、`enabled` 合法、`candidateType` 合法、known stable ID 引用合法、`accidentTypeId` 不误用原料 / severity / sample 语义、`triggerMin` / `triggerMax` / `scoreMultiplier` 区间合法，并禁止 `displayName` / `zhCN` / sampleId 当主键。
- 禁止误处理：validator 不能为具体 sample、中文文案或单个原料写例外。

### P1-4｜accidentAnalyzer legacy 内容判断迁移路线

- 风险：`core/accidentAnalyzer.js` 仍是旧事故判断集中区，后续若继续堆具体 if，会拖慢数据化迁移。
- 当前状态：当前不建议大改，但需要迁移路线。
- 为什么重要：severity / threshold active 接管前，应明确哪些 legacy 判断保留，哪些迁入 summary / candidate / severity table。
- 必须在什么时候前解决：severity / threshold active 接管前；v0.0.7.x 机制收口前。
- 建议路线：先做只读 mapping / inventory，再决定哪些保留 legacy、哪些迁移，不做一次性大重构。
- 禁止误处理：不要现在大改 `accidentAnalyzer.js`；不要为了清债直接改评分、事故、feedback 或 golden expected。

已知具体内容判断包括：

- `dairy_fat_overload`
- `industrial_creamer_overload`
- `texture_taro_overload`
- `texture_oreo_overload`
- `texture_topping_overload`
- `taste_strong_flavor_overload`
- `texture_straw_resistance`

### P1-5｜summaryCandidateEngine candidate tag / feedbackTags registry 边界

- 风险：readonly candidate / 风险语义可能被误当 runtime feedbackTag。
- 当前状态：`core/summaryCandidateEngine.js` 中存在 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty` 等 candidate / feedbackTags。v0.0.7.33 已新增 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 记录 mapping 边界，但尚未新增 registry / validator，也未解决该 P1。
- 为什么重要：这些 tag 当前服务 readonly candidate / 风险语义，不应自动等同于 runtime 文案池 tag。
- 必须在什么时候前处理：任何 validator / generated data 消费这些 tag 前；generated feedback partial / active 接管前；severity / threshold 使用 `feedbackTag` 字段前。
- 建议路线：以 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` 为边界，后续再做 feedbackTag source-of-truth / mapping review / registry 设计，明确哪些只是风险语义，哪些可以经过 review 进入文案池。
- 禁止误处理：不要把 `aroma_pressure` 这类风险名直接写入 runtime `feedbackTag` 字段。

### P1-6｜drinkStructureAnalyzer 中文显示名 Set 残留

- 风险：`core/drinkStructureAnalyzer.js` 中仍有中文显示名 Set，例如茶类、风味、小料、调味等分类。
- 当前状态：当前可运行，但与“显示文案不当系统主键”原则不完全一致。
- 为什么重要：显示名、本地化或 alias 改动可能影响结构分析。
- 必须在什么时候前处理：正式本地化前；结构 / operation / production 规则 active 依赖 `drinkStructureAnalyzer` 前；v0.0.7.x 机制收口审计中至少形成处理计划。
- 建议路线：先转为 `ingredientId` / `categoryId` / profile tags，再逐步迁移。
- 禁止误处理：不要一次性重写所有结构分析。

### P1-7｜feedbackTag 语义边界与文案池扩容

- 风险：旧 feedbackTag 语义可能误导新机制，薄文案池也会影响 generated feedback active 接管。
- 当前状态：`bubble_conflict` 是当前可观察的 runtime feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评；`aroma_pressure` 当前不是 runtime 文案池 feedbackTag；多个 generated feedback tags 只有 1 条文案。v0.0.7.33 已把这些边界写入 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`，但尚未完成 registry / 文案池扩容 / active 接管前 review。
- 为什么重要：feedback partial / active 接管前，文案池和 tag 语义必须经过制作人 review。
- 必须在什么时候前处理：generated feedback partial / active 接管前；`feedbackTag` 被 severity / threshold 表引用前。
- 建议路线：先用 mapping design 和 review pack 做制作人审核，再决定扩写、拆分、保留 candidate-only 或弃用哪些 tag。
- 禁止误处理：不要把 `bubble_conflict` 泛化到 flavor identity conflict；不要把 `aroma_pressure` 当已注册 runtime 文案池 tag。

### P1-8｜v0.0.7.x 机制部分 final 审计

- 风险：多个 shadow / generated / validator / review pack 逐步进入后，机制边界可能被小步改动冲散。
- 当前状态：尚未做 final 审计。
- 为什么重要：机制部分收口前必须确认没有把草案、样本、显示文案或 generated data 误接进 final result。
- 必须在什么时候前完成：v0.0.7.x 机制部分 final candidate 前；任何 partial / active 接管扩大前。
- 建议路线：集中复核 ID、summary / candidate / priority、validator、generated data、review pack、golden expected 更新理由。
- 禁止误处理：不要把 final 审计变成大改实现任务；审计先判断，再拆小任务。

审计必须确认：

- 没有按原料拆事故机制。
- `sampleId` / `accidentTypeId` / `displayName` 未混用。
- `priorityBand` / `severityHint` 未当成 severity / `scoreMultiplier`。
- generated / candidate / priority 没有过早接管 final result。
- validator / generated data / review pack 没有绕过 guardrail。
- golden expected 更新是有意识产品判断。

## 5. P2 TODO

### P2-1｜README 当前版本信息过期

当前 README 仍可能显示旧版本，例如 v0.0.4.0。不影响 runtime，但会误导新对话 / 新 Codex。建议在后续 docs housekeeping 中处理。

### P2-2｜AI_CONTEXT 当前状态段过长 / 有历史噪音

`docs/AI_CONTEXT.md` 作为恢复入口仍然重要，但当前状态段已经较长，且夹杂部分旧解释。后续可做瘦身，不阻塞当前机制推进。

### P2-3｜index.html 页面显示版本与 candidate 版本语义不同

页面可能仍显示最近 runtime / UI 版本，例如 v0.0.7.19，而 Git candidate 已到 v0.0.7.27+。需要明确：

```text
页面版本 = runtime / UI 可见版本
Git candidate = 项目开发版本
```

建议后续 UI / runtime 任务中处理或在 docs 中说明。

### P2-4｜feedback 文案池薄

多个 `feedbackTag` 只有 1 条文案。不阻塞 shadow，但 active 接管前需要扩充和制作人 review。

### P2-5｜generated schema version 后续需关注

当前 generated feedback schema version 如果长期停留在旧版本，不一定是 bug；但 schema 变更时必须同步更新，避免未来误判。

### P2-6｜.DS_Store / Mac 元数据 housekeeping

不影响机制。后续可清理 / 确认 `.gitignore`。

### P2-7｜CSV parser 重复

`validateFeedbackSheet.js` 和 `buildFeedbackData.js` 存在 CSV parser 重复。当前不阻塞，后续可抽 helper。

## 6. 不应立即处理 / 不应乱改的内容

- 不要现在重命名 `dairy_fat_overload`、`flavor_durian_overload`、`texture_taro_overload`、`texture_oreo_overload` 等已有 ID。
- 这些 ID 可能已经被 runtime、golden、docs 或 generated data 引用，应进入后续 ID 审计，而不是顺手改名。
- 不要现在大改 `core/accidentAnalyzer.js`。
- 不要现在 active 接管 severity / threshold。
- 不要现在扩 generated feedback active 接管范围。
- 不要为了清理 docs 而删除历史上下文正本。
- 不要把 P1 / P2 写成已解决。

## 7. 后续建议路线

可考虑按以下顺序推进：

1. 冻结本 TODO / audit debt 文档 candidate。
2. 读取并遵守 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
3. 设计 known stable ID source of truth / registry / enum / schema。
4. 设计并实现 validate candidate severity sheet。
5. 建立 generated severity data validator / structure check。
6. 做 AI 生成 ID 与机制命名审计。
7. 做 feedbackTag registry / 文案池扩充 / review pack 审核。
8. 形成 `accidentAnalyzer` legacy 迁移路线和 `drinkStructureAnalyzer` 去中文 Set 计划。
9. 再考虑 severity shadow / partial takeover。

以上只是可考虑路线，不代表已经决定。

## 8. 新任务开工前检查清单

v0.0.7.x 机制相关任务开工前，Codex 应先确认：

- 是否已读取本文件。
- 是否已读取 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 本任务是否会触碰 P1 gate。
- 若要实现 validator，是否已有 known stable ID source of truth。
- 若要 build generated severity data，是否已有 candidate severity sheet validator。
- 若要进入 shadow / partial / active，是否已有 generated validator、golden shadow expected 和制作人 review。
- 是否会重命名已有 ID；如果会，是否已有迁移计划。
- 是否会把 sampleId、displayName、`zhCN`、旧 tag 或 ID 字符串前缀当机制事实。
- 是否会改变玩家最终 score、feedback、accident、type 或 golden expected；如果会，是否有产品理由和 golden 更新计划。
