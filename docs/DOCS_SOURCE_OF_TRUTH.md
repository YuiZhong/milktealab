# Docs Source Of Truth｜奶茶实验室文档层级正本

## 0. 文档定位

本文档是《奶茶实验室》的文档 source-of-truth / 文档层级 / 冲突裁决规则正本。

它回答：

- 新对话 / Codex 开工时应该读哪些文件？
- 哪些文件是当前正本？
- 哪些文件只是入口导航？
- 哪些文件只是版本流水？
- 哪些文件只是阶段 TODO？
- 哪些文件只是历史 report？
- 如果文件之间冲突，听谁的？
- 版本号、commit、tag、candidate、golden 数量应该写在哪里？

`docs/DOCS_SOURCE_OF_TRUTH.md` 自身也不得记录阶段状态，不记录当前 commit，不记录 candidate tag，不记录正式 tag，不记录 golden samples 数量，不记录 main / origin/main 当前状态，不记录单次验收结果。

本文件只负责文档层级、冲突裁决和更新归属规则。如果需要记录本轮 P0-C commit / candidate / 验收结果，应写入 `docs/VERSION_LOG.md` 或 git/tag，而不是写入本文件。

## 1. 文档分层

### L0：入口导航 / agent 指令

```text
AGENTS.md
docs/AI_CONTEXT.md
docs/PROJECT_RULES.md
```

职责：

- `AGENTS.md`：Codex / AI agent 工作守则，包含真实性、范围、测试、git、P0 pause mode 和必读文件入口。
- `docs/AI_CONTEXT.md`：新 ChatGPT / Codex 对话导航页，只告诉当前状态、当前正本、当前禁止事项。
- `docs/PROJECT_RULES.md`：项目入口规则，描述项目定位、当前 pause mode、长期工作流和模块边界。

L0 文件不能承载完整机制正本，不能记录长版本流水，不能复制大量历史 reports 内容。它们只负责导航到正确正本。

### L1：长期正本 / 当前原则

```text
docs/DOCS_SOURCE_OF_TRUTH.md
docs/TASTE_DECISION_MODEL.md
docs/STABLE_ID_NAMING_GUARDRAIL.md
docs/TASTE_SYSTEM_DESIGN.md
docs/TASTE_ENGINE_ARCHITECTURE.md
```

职责：

- `docs/DOCS_SOURCE_OF_TRUTH.md`：文档层级、冲突裁决、更新归属正本。
- `docs/TASTE_DECISION_MODEL.md`：判定模型、priority vs severity、事故层级、全判定层反 if 地狱正本。
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`：ID / tag / ruleId / sampleId / candidateId / triggerMetric / priorityBand / severityLevel / registry / validator / generated data guardrail 正本。
- `docs/TASTE_SYSTEM_DESIGN.md`：味觉系统长期设计细节。
- `docs/TASTE_ENGINE_ARCHITECTURE.md`：工程架构承载方式、summary / candidate / priority shell / runtime 边界。

L1 文件只写当前有效原则，不写版本流水账、commit hash、candidate tag、单次验收结果。

### L2：阶段 TODO / 阶段债务

```text
docs/V0_0_7_MECHANISM_TODO.md
docs/V0_0_8_PLANNING_TODO.md
docs/V0_0_8_*.md
docs/V0_0_9_*.md
```

职责：

- 阶段内 tracking。
- 阶段内 gate。
- 阶段内 P0 / P1 / P2。
- 阶段内禁止事项。
- 阶段内未完成债务。

关键规则：

阶段 TODO 只在对应阶段内必读。大版本 / 阶段结束后，阶段 TODO 必须移出长期必读列表。阶段结束时，应把仍然长期有效的原则沉淀进 L1 正本，把仍有效的未完成债务迁移到下一阶段 TODO，然后原阶段 TODO 降级为历史文件。

每个新阶段 / 大版本开工前，必须先创建阶段专属 TODO / guardrail 文档。例如进入 v0.0.8.x 前，应先创建 `docs/V0_0_8_*.md`。新阶段任务不得继续塞进旧阶段 TODO，也不得塞进 `docs/AI_CONTEXT.md`、`docs/VERSION_LOG.md` 或 `reports/**` 作为替代。

同一时间只能有一个 active stage TODO。active stage TODO 可以进入 `AGENTS.md` / `docs/AI_CONTEXT.md` 必读列表；阶段结束后，旧 stage TODO 必须移出长期必读列表，只能作为历史文件，不再指导当前任务。未完成且仍有效的债务，应迁移到下一阶段 TODO；长期原则应沉淀进 L1 正本。

特别说明：

`docs/V0_0_7_MECHANISM_TODO.md` 是 v0.0.7.x 阶段专属 TODO / 债务 / gate。它不是长期正本。v0.0.7.x 完结后，它必须移出 AGENTS / AI_CONTEXT 的长期必读列表。

`docs/V0_0_8_PLANNING_TODO.md` 是 v0.0.8.x planning TODO / active stage TODO。它只负责内容管线、review pack、draft ID、registry candidate 和 validator gate 的 planning，不开放 implementation，不替代 L1 正本。

`docs/V0_0_7_MECHANISM_TODO.md` 在 v0.0.8 planning TODO 建立后应降级为 historical / previous stage material，只在追溯 v0.0.7.x 债务迁移时按需读取，不再指导当前任务。

### L3：版本流水

```text
docs/VERSION_LOG.md
```

唯一职责：

`docs/VERSION_LOG.md` 负责版本号、candidate、commit hash、tag、main/origin/main 状态、golden samples 数量、单次验收结果、push/tag 状态；这些内容只写入 `docs/VERSION_LOG.md` 或 git/tag 本身。

禁止：

`AGENTS.md` / `docs/AI_CONTEXT.md` / `docs/PROJECT_RULES.md` / `docs/TASTE_*` 正本 / TODO 正本不应长期复制版本流水。

如果其他文件必须提版本，只能写阶段语义，例如：

```text
v0.0.6.x 完成三层 summary 地基
```

不能写：

```text
v0.0.6.17-candidate 已冻结，commit xxx，golden 20/20
```

### L4：历史 reports / 审查材料

```text
reports/**
reports/human_review/**
```

职责：

- 历史证据。
- 审查记录。
- review pack。
- 当时上下文中的决策草案。
- 当时 next step 建议。

`reports/human_review/**` 是 L4 下的人类审批 / 制作人评审材料子目录，用于集中用户要看的 review pack、candidate 文案审核包、concept candidates 审核包或 generated shadow review。

它仍属于 reports / review material 层，不是 L1 正本，不是 L2 active stage TODO，不是 runtime data。

`reports/` 根目录仍可保留历史审计 / closure / decision reports；不要把整个 `reports/` 目录迁入 `reports/human_review/`。

规则：

reports 不自动升级为当前事实。reports 中的 ID、tag、建议、next step、closure 判断、candidate decision，只有被 L1 正本吸收后才成为当前原则。如果 reports 与 L1 正本冲突，信 L1 正本。

## 2. 冲突裁决规则

- 判定模型冲突：信 `docs/TASTE_DECISION_MODEL.md`。
- ID / tag / registry / validator 冲突：信 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 味觉系统设计细节冲突：信 `docs/TASTE_SYSTEM_DESIGN.md`，但判定模型仍以 `docs/TASTE_DECISION_MODEL.md` 为准。
- 工程架构实现边界冲突：信 `docs/TASTE_ENGINE_ARCHITECTURE.md`，但判定模型仍以 `docs/TASTE_DECISION_MODEL.md` 为准。
- 阶段 P0 / P1 / P2 gate 冲突：信当前阶段 TODO；阶段结束后不再长期必读。
- 版本号 / commit / tag / candidate 状态冲突：信 git ref / tag + `docs/VERSION_LOG.md`。
- reports 与正本冲突：信正本。
- `docs/AI_CONTEXT.md` 与正本冲突：信正本，并修 `docs/AI_CONTEXT.md`。
- `AGENTS.md` 与用户本轮明确任务冲突：先报告冲突，等用户确认，不擅自扩大范围。

## 3. 更新归属规则

- 改判定模型：更新 `docs/TASTE_DECISION_MODEL.md`；只在入口文件加短索引，不复制长解释。
- 改 ID / tag / registry 规则：更新 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 改味觉系统长期设计：更新 `docs/TASTE_SYSTEM_DESIGN.md`。
- 改架构承载方式：更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`。
- 改阶段任务 / P0 / P1 / P2 / gate：更新当前阶段 TODO。
- 改版本流水 / candidate / commit / tag：只更新 `docs/VERSION_LOG.md`。
- 新增历史审查材料：放 `reports/**`，但 reports 不成为当前正本。
- 新对话导航变化：只更新 `docs/AI_CONTEXT.md` 的短索引和当前状态，不写流水账。
- Codex 工作守则变化：更新 `AGENTS.md`，但不放版本流水。

## 文档单一职责 / 反 doc 地狱原则

一个文档只负责一个领域。文档可以多，但每个文件必须职责单一。

- L0 入口文件只导航，不承载完整机制正本。
- L1 正本文档只写当前有效原则，不写版本流水。
- L2 阶段 TODO 只管当前阶段，不沉淀长期原则。
- L3 `docs/VERSION_LOG.md` 只管版本流水，不承载机制设计。
- L4 `reports/**` 只管历史证据，不反向指导当前任务。

禁止为了“补充上下文”让多个文档重复承担同一职责：

- 不在多个文档里复述同一套完整机制规则。
- 不为了“方便新对话”把历史摘要塞进 `docs/AI_CONTEXT.md`。
- 不为了“方便 Codex”把阶段 TODO 塞进 `AGENTS.md`。
- 不为了“解释清楚”让 `docs/PROJECT_RULES.md` 复制 `docs/TASTE_DECISION_MODEL.md`。
- 不为了“保险”让 `docs/VERSION_LOG.md` 变成设计文档。
- 不为了“留证据”让 `reports/**` 反向指导当前任务。

如果一条规则需要长期生效，应沉淀到唯一对应的 L1 正本；入口文件只放短索引。

如果一个文件开始承担多个领域职责，应拆分、降级或迁移内容，而不是继续补丁式加段落。

## 4. 禁止事项

- 禁止在多个正本里复制同一套完整机制规则。
- 禁止让阶段 TODO 永久留在长期必读列表。
- 禁止把 reports 的 next step 当当前任务。
- 禁止把 `docs/VERSION_LOG.md` 当机制正本。
- 禁止把 `docs/AI_CONTEXT.md` 写成长版本流水。
- 禁止把 `AGENTS.md` 写成阶段流水账。
- 禁止把 commit hash / candidate tag / golden 数量散落到多个正本。
- 禁止为了“补充上下文”把历史报告摘要搬进 `docs/AI_CONTEXT.md`。
