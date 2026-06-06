# Concept Review Template｜人类审批 / 制作人评审模板

## 0. 文件说明

本文件是给制作人审核“人话场景 / 机制概念候选”的模板。

它服务于 Scenario first, ID later 工作流：先审核自然语言 scenario / concept candidates，再由后续 approved concept list 承接结构化工作。

用户只需要看“审核区”。机器详情 / traceability 字段只服务于后续 Codex 结构化，不自动批准任何 ID。

本模板不是：

- source-of-truth
- runtime data
- approved stable ID list
- registry candidate
- generated data
- validator input
- final feedback / final result 来源
- golden expected 修改依据

Codex 不得反过来先生成 stable ID / draft ID / registry candidate，再要求制作人补概念。

## 1. 审核状态说明

制作人可使用以下非程序员友好的状态：

| status | 含义 |
|---|---|
| keep | 保留 |
| revise | 想留但要改 |
| reject | 不要 |
| merge | 合并到其他候选 |
| split | 拆成多个候选 |
| rename | 改名 / 改表达 |
| feedbackOnly | 只适合作为文案方向，不是机制 |
| evidenceOnly | 只适合作为证据 / 例子，不是机制 |
| notMechanism | 不是机制 |
| pending | 待定 |

制作人可以自由写中文备注，例如：

- 太像单个原料专属机制
- 太像文案梗
- AI 味浓
- 机制有用但名字不对
- 可以当反馈，不要当事故
- 和某条合并
- 这个方向我喜欢

## 2. 审核区

### C001｜候选标题

自然语言描述：

> 这里填写候选场景描述。

可能用途：

- 机制候选：
- 反馈文案方向：
- 证据 / 例子：
- 其他：

制作人审核：

- producerStatus:
- producerDecision:
- mergeTarget:
- renameSuggestion:
- feedbackOnly:
- evidenceOnly:
- notMechanism:
- issueTags:
- producerComment:
- approvedAsConcept: no

### C002｜候选标题

自然语言描述：

> 这里填写另一个候选场景描述。

可能用途：

- 机制候选：
- 反馈文案方向：
- 证据 / 例子：
- 其他：

制作人审核：

- producerStatus:
- producerDecision:
- mergeTarget:
- renameSuggestion:
- feedbackOnly:
- evidenceOnly:
- notMechanism:
- issueTags:
- producerComment:
- approvedAsConcept: no

说明：`C001` / `C002` 只是临时审核编号，不是 stable ID，不是 draft ID，也不是 registry candidate。

## 3. 机器详情 / traceability 附录

这些字段只服务于后续整理和追溯，不是批准字段。

- sourceBatch:
- generatedBy:
- generatedAt:
- sourcePromptSummary:
- temporaryConceptRef:
- sourceConversationNote:
- laterCodexStructuringStatus:
- sourceConceptId: only after approved concept list
- draftIdStatus: none / not generated
- registryStatus: none / not candidate

边界：

- traceability 字段不是批准字段。
- draft ID 不在本模板里生成。
- registry candidate 不在本模板里生成。
- `sourceConceptId` 只有在 approved concept list 阶段才可能出现。

## 4. Approved Concept List 边界

本模板用于审核 concept candidates。只有制作人审核后，才能整理成 approved concept list。

边界：

- approved concept list 不等于 approved stable ID。
- Codex 后续只能基于 approved concepts 结构化 draft ID / rules / sheets / registry candidates。
- draft ID 不等于 registry entry。
- registry candidate 不等于 source-of-truth。
- generated data 不等于 runtime takeover。
- shadow 不等于 final result。
