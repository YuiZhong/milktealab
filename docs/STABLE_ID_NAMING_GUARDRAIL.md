# Stable ID Naming Guardrail

## 0. 文档定位

本文档是《奶茶实验室》的长期稳定 ID / 命名 / 审查流程正本。

它适用于当前 v0.0.7.x，也适用于后续 v0.0.8.x、v0.0.9.x 以及未来任何涉及 ID、tag、rule、schema、validator、generated data 或 runtime 接管的任务。

本文档不是版本流水账，不替代 `docs/VERSION_LOG.md`；不是阶段 TODO，不替代 `docs/V0_0_7_MECHANISM_TODO.md`；也不是完整系统设计，不替代 `docs/TASTE_SYSTEM_DESIGN.md` 或 `docs/TASTE_ENGINE_ARCHITECTURE.md`。

它是所有 AI / Codex / ChatGPT 新增、批量生成、迁移或审计机制相关 ID 前必须遵守的长期 guardrail。

## 1. 核心原则

- AI / Codex 批量生成的 ID 不能因为“看起来像 stable ID”就默认正确。
- 英文 ID 不等于好设计；可读不等于层级正确。
- ID 一旦进入 docs、sample sheet、generated data、golden 或 runtime，就可能被未来 AI 当成事实来源。
- 所有 AI 生成 / 辅助生成的机制相关 ID，都必须经过层级确认和语义审计。
- 机制 ID 不应混入原料名、severity 档位、sampleId、displayName、zhCN 或 notes 语义。
- 草案 ID 不等于正式 ID。
- 样例表虽然不接 runtime，也会影响未来 AI 理解，因此 sample sheet 里的稳定字段不能乱填。
- ID 名称不能覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。
- 如果某个 ID 的层级、来源或语义不清楚，应先停下来标记为 draft / needs review，而不是把它写进 stable 字段。

## 2. ID 层级分类

### ingredientId

- 原料身份。
- 可以包含原料类别前缀，例如 `fruit_lemon`。
- 不等于事故机制，不等于 sampleId。

### accidentTypeId

- 事故机制大类。
- 不能按每个原料拆分。
- 不能带 severity 后缀。
- 不能带 sampleId 语义。

错误示例：

```text
accidentTypeId: taste_acid_overload_lemon
accidentTypeId: taste_acid_overload_hawthorn
accidentTypeId: taste_acid_overload_high
accidentTypeId: extreme_lemon_accident
```

正确示例：

```text
accidentTypeId: taste_acid_overload
```

### outcomeTypeId

- 结果 / outcome 机制大类。
- 例如 `flavor_identity_conflict`。legacy `taste_conflict` 是 v0.0.7.41 前的迁移前 ID，不应再作为当前 outcome source-of-truth 使用。
- 不等于 `sourceLayer=taste`。
- 如果 outcome 名称看似某一层，应通过 `sourceLayer` / `sourceSummary` / `triggerMetric` 解释真实来源。

### drinkTypeId

- 饮品类型身份。
- 不等于玩家自定义饮品名。
- 不等于具体 `recipeId` / `recipeVersionId`。

### feedbackTag

- 文案选择标签。
- 只有已经在 feedback 文案池、registry 或 generated data 中登记或确认过的 tag，才应作为稳定 `feedbackTag` 使用。
- 如果只是 summary / candidate 风险名，例如 `aroma_pressure`，不能自动写进 `feedbackTag` 字段。
- 如果已有旧 `feedbackTag`，例如 `bubble_conflict`，也必须判断语义是否适合当前机制场景，不能因为“稳定存在”就乱塞到新机制示例里。
- 未确认 tag 应写入 notes，或标为 draft，不应放进稳定字段误导 future validator / Codex。

### textId

- 单条反馈文案 ID。
- 只标识具体文案，不代表机制。
- 不能当事故类型、ruleId 或 candidateId 使用。

### sampleId

- 开发测试样本身份。
- 只用于 golden samples / review pack / 测试定位。
- 不进入正式机制规则主键。
- 不等于 `accidentTypeId`。
- 不等于玩家可见事故名。
- 不等于玩家保存配方 ID。

### ruleId

- 规则行身份。
- 可以描述规则用途和 severity 档位，例如 `taste_acid_overload_high`。
- 但它不是 `accidentTypeId`。
- `ruleId` 可以带 draft / high / medium / low 等规则语义；`accidentTypeId` 不可以。

正确：

```text
ruleId: taste_acid_overload_high
accidentTypeId: taste_acid_overload
severityLevel: high
```

错误：

```text
accidentTypeId: taste_acid_overload_high
```

### candidateId

- candidate 层候选身份。
- 不等于最终事故 / outcome / drinkType。
- 不应混入 sampleId 或玩家可见文案。
- candidate 可以引用 `accidentTypeId` / `outcomeTypeId` / `drinkTypeId`，但自身不是最终结果。

### priorityBand

- 粗优先级分组。
- 不等于 severity。
- 不等于最终扣分。

### severityHint

- candidate 层提示。
- 不是最终 severity。
- 不是最终扣分档。
- 不应直接推出 `scoreMultiplier`。

### severityLevel

- 未来真正严重度层级。
- 只在 severity / threshold 调参层使用。
- 不应混进 `accidentTypeId`。
- 不应偷藏在 summary / candidate builder 中影响 runtime。

### sourceLayer / sourceSummary / triggerMetric

- 来源和触发指标。
- 应引用结构化 summary / candidate 字段。
- 不应使用中文显示名、文案片段或 sampleId。
- 不能仅根据 ID 字符串前缀反推 `sourceLayer`。
- 历史 ID 可能包含原料或内容语义，例如 `dairy_fat_overload`；但如果规则行写明 `sourceLayer=texture`、`sourceSummary=textureSummary`、`triggerMetric=fatLoad`，就应按 texture / drinkability 方向理解。
- ID 名称不能覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。

### draft / sample 后缀

- `draft` 可以出现在样例表里的 `ruleId`，表示这条规则只是草案。
- `draft` 不应出现在正式 `accidentTypeId` / `outcomeTypeId` / `drinkTypeId` 中。
- `sample` 语义只属于 sampleId / 测试样本，不应进入机制规则主键。
- 样例表中的 draft ID 不能被 future Codex 当成正式 ID 使用。

### displayName / zhCN / notes

- 人类可读展示和备注。
- 永远不能作为机制主键。
- notes 可以解释草案状态，但不能替代结构字段去歧义。

## 3. 草案 ID / sample sheet guardrail

sample sheet 是人类编辑源，不是 runtime data，但它会被后续 AI、validator、build script、review pack 和 docs 反复读取。

因此：

- 样例表中的 stable 字段必须谨慎填写。
- 草案规则应在 `ruleId` 或 notes 中明确 draft 状态。
- 未确认的 `feedbackTag`、`accidentTypeId`、`outcomeTypeId` 或 `drinkTypeId` 不应写进稳定字段。
- 如果只是未来可能注册的概念，应写入 notes，例如“future feedbackTag candidate, requires registry review”。
- 样例表中的 `enabled=FALSE` 不代表字段可以乱填；disabled 草案也会影响 future Codex 的理解。

## 4. 新增 ID / tag 前检查清单

新增或批量生成 ID / tag 前，必须完成：

1. 分层确认：这个 ID 属于 ingredient、accident、outcome、drinkType、feedback、text、sample、rule、candidate、priority、severity，还是 source / metric？
2. 语义审查：它是否混入原料名、severity 档位、sampleId、displayName、zhCN、notes 或旧 tag 语义？
3. source of truth 确认：它是否来自 registry / enum / schema / existing stable data？如果不是，是否只能作为 draft？
4. draft / stable 状态标记：它是否已经可以成为 stable ID？如果不能，是否明确标了 draft / needs review？
5. 进入表格前 gate：它是否适合写进 sample sheet 的稳定字段？
6. 进入 validator 前 gate：validator 是否知道它的 known stable ID 来源？
7. 进入 generated data 前 gate：generated data 是否只包含已验证的 stable ID？
8. 进入 runtime / partial / active 前 gate：是否经过用户 / ChatGPT 机制命名 review、golden 记录和必要的制作人审核？

长期规则：

- AI / Codex 可以草拟 ID，但不能自动定稿 ID。
- draft ID 必须明确 draft 状态。
- 未注册 tag 不得进入稳定字段。
- 新增 stable ID 前应确认是否已有可复用 ID。
- 新增 stable ID 若影响机制，必须由用户 / ChatGPT 做机制命名 review。

## 5. ID 审计流程

真正做 ID 审计时，应按以下步骤执行：

1. Inventory：列出所有 ID / tag / rule / sample，并记录来源文件。
2. 分类：判断每个 ID 属于哪一层。
3. source-of-truth 检查：确认它是否来自已知 registry / enum / schema / existing stable data。
4. 语义检查：判断是否混入原料、severity、sample、displayName、旧 tag 误导。
5. 引用范围检查：看它是否已被 runtime / golden / generated / docs / sample / validator 引用。
6. 风险分级：OK / Needs note / Needs review / High risk / Migration candidate。
7. 处理策略：保留 / 加说明 / 禁用草案 / 等待 registry / 未来迁移。
8. gate 判断：确认是否阻塞 validator / generated / partial takeover。

本流程是审计流程，不是自动改名流程。发现问题后应拆小任务处理，不应在审计中顺手重命名已被引用的 ID。

## 6. 风险分级

- OK：层级清楚，语义稳定，可继续使用。
- Needs note：当前可用，但名字可能误导，需要 notes / docs 钉住语义。
- Needs review：不能由 Codex 自行决定，需要用户 / ChatGPT 机制审计确认。
- High risk：如果继续引用会造成机制混乱，必须在进入 validator / generated / runtime 前处理。
- Migration candidate：现有 ID 已被引用，不能立即改，但未来可能需要迁移计划。

## 7. 审计输出格式

未来审计输出建议使用表格：

```markdown
| id | layer | current status | source files | references | risk | recommendation | gate |
|---|---|---|---|---|---|---|---|
| taste_acid_overload | accidentTypeId | stable | data/goldenSamples.js, ... | runtime/golden/docs | OK | keep | none |
| dairy_fat_overload | accidentTypeId | stable but naming may mislead | ... | runtime/golden/docs | Needs note | keep, document texture/fatLoad meaning | before severity active |
```

审计报告应明确：

- 哪些 ID 已可继续使用。
- 哪些 ID 需要 notes / docs 固定语义。
- 哪些 ID 需要用户 / ChatGPT 复查。
- 哪些 ID 是 migration candidate，不能立即重命名。
- 哪些 gate 被阻塞。

## 8. validator / registry / source-of-truth gate

真正实现 validate candidate severity sheet 前，必须先明确 known stable ID source of truth。

如果没有 registry / enum / schema / existing stable data source，就必须先设计 source of truth。

validator 不得通过 substring / suffix / string pattern 推断合法 ID 集合。`inferFromStringPatterns()` 这类方向是错误的。

future validator 的合法性应以 known stable ID registry / enum / schema 为准。字符串 lint 可以作为 warning / hint，但不是最终合法性来源。

错误方向：

```js
if (accidentTypeId.includes("_high")) error;
if (accidentTypeId.includes("_lemon")) error;
const knownAccidentTypeIds = inferFromStringPatterns();
```

正确方向：

```text
knownAccidentTypeIds must come from an explicit registry / enum / schema / existing stable data source.
if accidentTypeId not in knownAccidentTypeIds -> error
if no known stable ID source exists -> stop and design the ID registry / enum / schema first
```

## 9. 错误示例与正确示例

### 酸度过载

错误：

```text
accidentTypeId: taste_acid_overload_lemon
accidentTypeId: taste_acid_overload_hawthorn
```

正确：

```text
accidentTypeId: taste_acid_overload
recipe evidence: lemon / hawthorn / passionfruit
sampleId: only if this is a specific golden / review test sample
```

### 严重度档位

错误：

```text
accidentTypeId: taste_acid_overload_high
```

正确：

```text
ruleId: taste_acid_overload_high
accidentTypeId: taste_acid_overload
severityLevel: high
```

### 测试样本

错误：

```text
ruleId: extreme_lemon_accident
accidentTypeId: extreme_lemon_accident
```

正确：

```text
sampleId: extreme_lemon_accident
accidentTypeId: taste_acid_overload
```

### feedbackTag 草案

错误：

```text
feedbackTag: aroma_pressure
```

如果 `aroma_pressure` 只是 flavor risk / candidate tag，尚未注册为 runtime 文案池 `feedbackTag`。

正确：

```text
feedbackTag:
notes: aroma_pressure is a future feedbackTag candidate and must be registered before use
```

### 旧 tag 误用

错误：

```text
feedbackTag: bubble_conflict
```

如果该行表达的是 generic flavor identity conflict，而 `bubble_conflict` 语义偏气泡 + 厚重 / 口感冲突追评。

正确：

```text
feedbackTag:
notes: feedbackTag must be confirmed by shadow data / registry before use
```

## 10. 什么时候必须停下来找用户 / ChatGPT 确认

以下情况必须停下来，不得由 Codex 自行拍板：

- 新增或重命名 `accidentTypeId` / `outcomeTypeId` / `drinkTypeId`。
- 某个 ID 看起来可能按原料拆机制。
- 某个 ID 看起来混入 severity 档位。
- sampleId 可能进入机制规则。
- `feedbackTag` 已存在但语义不确定。
- 草案 ID 可能被写进 stable 字段。
- validator 需要 known stable ID source，但 source-of-truth 不明确。
- 修改会影响 golden expected / runtime / generated data / partial takeover。
