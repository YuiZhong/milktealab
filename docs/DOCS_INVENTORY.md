# Docs Inventory｜奶茶实验室文档库存索引

## 0. 文档定位

`docs/DOCS_INVENTORY.md` 是 `docs/` 文件库存索引，用于帮助 ChatGPT / Codex 快速判断每个文档的身份、读取策略和风险。

本文件只是库存索引：

- 不决定机制规则。
- 不决定版本状态。
- 不批准 ID / tag / validator / generated data。
- 不替代 `docs/DOCS_SOURCE_OF_TRUTH.md`。
- 不记录版本流水、commit hash、candidate tag、golden samples 数量或单次验收结果。

如果本文与 `docs/DOCS_SOURCE_OF_TRUTH.md` 冲突，以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

`AGENTS.md` 不在 `docs/` 目录内，但它是 Codex / AI agent 的外部 L0 entry；本库存表只覆盖 `docs/*.md`。

## 1. 分类标准

### 1.1 分类

```text
L0 navigation
L1 source of truth
L1 candidate / support doc
L2 active stage TODO
L2 stage support
L3 version log
historical / operational reference
unclear / needs review
```

### 1.2 风险等级

```text
OK
P2
P1
P0
```

- OK: 职责清楚，当前不阻塞。
- P2: 命名 / 可读性 / housekeeping 风险。
- P1: 阶段结束后可能污染长期必读，或可能被误读成正本。
- P0: 会立即误导当前项目正本或 Codex 开工。

## 2. docs 文件库存表

| file | current_role | level | active_or_historical | read_policy | risk | next_action |
|---|---|---|---|---|---|---|
| `AI_CONTEXT.md` | 新对话导航页，指向当前正本、当前 planning-only 状态和禁止事项 | L0 | active | always read | OK | keep |
| `DOCS_SOURCE_OF_TRUTH.md` | 文档层级、冲突裁决和更新归属正本 | L1 | active | always read | OK | keep |
| `FEEDBACK_STYLE_GUIDE.md` | feedback style support doc / L1 candidate | L1 candidate / support doc | needs-review | read when relevant | P2 / P1 | role header added; decide feedback style source later |
| `INGREDIENT_SCHEMA.md` | ingredient schema support doc / L1 candidate | L1 candidate / support doc | needs-review | read when relevant | P1 | role header added; decide L1 source vs support later |
| `PROJECT_RULES.md` | 项目入口规则，概述当前 pause mode、长期工作流和模块边界 | L0 | active | always read | OK | keep |
| `ROLLBACK_GUIDE.md` | historical / operational reference | historical / operational reference | historical | read when operationally relevant | P2 | historical header added; keep as operational reference |
| `STABLE_ID_NAMING_GUARDRAIL.md` | stable ID / tag / ruleId / sampleId / candidateId / triggerMetric / registry / validator / generated data guardrail 正本 | L1 | active | always read | OK | keep |
| `TASTE_DECISION_MODEL.md` | 当前判定模型、priority vs severity、事故层级和全判定层反 if 地狱正本 | L1 | active | always read | OK | keep |
| `TASTE_ENGINE_ARCHITECTURE.md` | 工程架构承载方式、summary / candidate / priority shell / runtime 边界 | L1 | active | always read | OK | keep |
| `TASTE_SYSTEM_DESIGN.md` | 味觉系统长期设计细节 | L1 | active | always read | OK | keep |
| `TEST_CASES.md` | historical test notes / golden runner support notes | unclear / testing support | historical / needs-review | do not use as current truth; read when relevant | P1 | role header added; consider rewrite as testing guide later |
| `V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` | v0.0.7.x accidentAnalyzer legacy inventory / stage evidence | L2 | active-stage-only | read when relevant | P1 | stage-end archive |
| `V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md` | v0.0.7.x drink structure displayName inventory / migration evidence | L2 | active-stage-only | read when relevant | P1 | stage-end archive |
| `V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md` | v0.0.7.x feedbackTag mapping stage design | L2 | active-stage-only | read when relevant | P1 | stage-end archive |
| `V0_0_7_ID_INVENTORY.md` | v0.0.7.x ID inventory / audit evidence | L2 | active-stage-only | read when relevant | P1 | stage-end archive |
| `V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md` | v0.0.7.x stable ID source-of-truth design draft / stage design | L2 | active-stage-only | read when relevant | P1 | stage-bound header added; stage-end archive |
| `V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md` | v0.0.7.x mechanism review pack gate design | L2 | active-stage-only | read when relevant | P1 | stage-end archive |
| `V0_0_7_MECHANISM_TODO.md` | v0.0.7.x previous stage TODO / debt / gate / migration evidence | L2 | previous-stage material | read for migration only | OK | keep historical / migrate remaining debt |
| `V0_0_8_PLANNING_TODO.md` | v0.0.8.x content pipeline / review pack / registry-validator planning TODO | L2 active stage TODO / planning | active planning-only | always read during v0.0.8 planning | OK | planning-only; no implementation |
| `VERSION_LOG.md` | 版本流水 | L3 | active | read when relevant | OK | keep |

## 3. V0_0_7_* 文件统一规则

所有 `V0_0_7_*` 文件都是 v0.0.7.x 阶段文件。

当前它们已降级为 previous-stage material / historical stage support，可在追溯 v0.0.7.x 债务迁移时按需读取，但它们不是长期正本，也不是当前 active stage TODO。

v0.0.7.x 结束后：

- 必须把 `V0_0_7_*` 文件移出长期必读列表。
- 未完成且仍有效的债务，应迁移到下一阶段 TODO。
- 长期有效原则，应沉淀进 L1 正本。
- 原文件保留为 historical / stage support。
- 进入 v0.0.8 planning 后，不得继续把 `V0_0_7_*` 文件当默认开工依据。

特别注意：

- `V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md` 风险较高，因为文件名含 `SOURCE_OF_TRUTH`，未来容易被误读为长期正本；当前只能按 v0.0.7.x stage design / historical support 使用。
- `V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md` 可能有 inventory 正本语气，必须确保只在 legacy inventory 语境内成立，不得升级为当前机制正本。

## 4. 外部目录补充索引

本文件主体只覆盖 `docs/*.md`。以下是与文档治理相关的外部目录短索引。

| path | current_role | level | risk | next_action |
|---|---|---|---|---|
| `reports/human_review/**` | 人类审批 / 制作人评审材料，集中 review pack、candidate 文案审核包、concept candidates 审核包和 generated shadow review | L4 review material | OK / P2 housekeeping | keep separate from historical reports root; never treat as source-of-truth or runtime data |

## 5. 需要后续归属确认的文件

### `INGREDIENT_SCHEMA.md`

初步定位为 L1 candidate / support doc，风险 P1。

后续需确认它是否应升级为 ingredient schema 长期正本，或并入 `docs/TASTE_SYSTEM_DESIGN.md` / 其他 ingredient schema support。

### `FEEDBACK_STYLE_GUIDE.md`

初步定位为 L1 candidate / support doc，风险 P2 / P1。

后续需确认它是否应作为 feedback 文案风格长期正本，或并入 feedback 系统正本。

### `TEST_CASES.md`

初步定位为 unclear / needs review，风险 P1。

后续需检查是否含旧阶段“当前”语境；若是，应降级或改为 historical test notes。

### `ROLLBACK_GUIDE.md`

初步定位为 historical / operational reference，风险 P2。

可保留为操作参考，但不应进入当前机制必读列表。

## 6. 后续建议队列

以下只是后续建议，本轮不执行：

1. 审 `INGREDIENT_SCHEMA.md` 是否应成为 L1 schema 正本。
2. 审 `FEEDBACK_STYLE_GUIDE.md` 是否应成为 feedback style 正本。
3. 审 `TEST_CASES.md` 是否含旧阶段当前语境。
4. 审 `ROLLBACK_GUIDE.md` 是否需要 historical / operational header。
5. v0.0.7.x 收口时，移出所有 `V0_0_7_*` 的长期必读身份。
6. `V0_0_7_*` 文件已统一加 stage-bound header；后续只需在 v0.0.7.x 收口时迁移仍有效债务并归档阶段文件。
