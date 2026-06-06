# Draft ID Proposal Review Round 1｜第一批草案 ID 提案审阅记录

## 0. 文件定位

本文件只记录用户 + ChatGPT 对 `reports/human_review/draftIdProposalDryRun.round1.md` 的审阅结论。

本文件不是：

- stable ID list
- approved stable ID list
- registry candidate
- registry
- schema
- enum
- validator input
- allowed values
- runtime data
- generated data
- final feedback / final result 来源
- golden expected 修改依据

本文件不批准任何 stable ID。

本文件不创建 registry candidate。

本文件不创建 allowed values。

本文件不允许任何 ID 进入 validator / generated / runtime。

本轮只是确认这些 `proposedDraftId` 的 proposal wording 可以进入下一步 registry candidate row shape planning。

## 1. 审阅来源

本轮审阅基于：

- `reports/human_review/draftIdProposalDryRun.round1.md`
- `reports/human_review/draftIdNamingReviewProtocol.round1.md`
- `reports/human_review/sourceOfTruthRegistryPlanning.round1.md`
- `docs/STABLE_ID_NAMING_GUARDRAIL.md`

这些文件共同提供：

- proposed draft ID 的来源。
- existing / legacy / observed ID 搜索证据。
- draft ID naming review protocol。
- source-of-truth / registry / enum / schema planning 边界。
- stable ID / registry / validator guardrail。

## 2. Review Summary

| concept | proposedDraftId | reviewDecision | notes |
|---|---|---|---|
| 甜度过载 | `taste_sweet_overload` | accept_as_proposal_wording | 不是 stable ID；后续仍需 registry candidate review。 |
| 酸度过载 | `taste_acid_overload` | accept_as_proposal_wording | 沿用 existing observed 方向；当前仍非 approved stable。 |
| 苦味过载 | `taste_bitter_overload` | accept_as_proposal_wording | 用户 + ChatGPT 接受 `bitter` 形式；`bitternessLoad` 可留作 future metric direction。 |
| 涩感 / 收敛感过强 | `taste_astringency_overload` | accept_as_proposal_wording | `astringency` 比 `astringent` 更像机制 / 指标名词。 |
| 水泥感 / 粉泥感 / 低流动性 | `texture_low_drinkability` | accept_as_proposal_wording | 沿用 existing observed 方向；仍需 registry candidate review。 |
| 八宝粥感 / 固体小料负载过高 | `texture_solid_overload` | accept_as_proposal_wording | 沿用 existing observed 方向；当前仍非 approved stable。 |

## 3. Boundaries

`accept_as_proposal_wording` 不等于 approved stable ID。

这些 ID 仍不是 registry candidate。

这些 ID 仍不是 validator allowed values。

这些 ID 不能进入 runtime / generated severity / final result。

这些 ID 不能自动修改 golden expected。

这些 ID 不能自动进入 generated feedback / generated severity / takeover。

后续如果要继续，下一步应先做 registry candidate row shape planning 或 registry candidate proposal task。

任何进入 registry candidate 的动作都必须另开任务，并经过用户 + ChatGPT review。

## 4. Next Possible Step

以下只是候选方向，不是命令，也不开放 implementation。

### Option A｜Registry Candidate Row Shape Planning

设计 registry candidate 行结构。

不创建真实 registry row。

不创建 schema / enum / validator。

不生成 allowed values。

### Option B｜Registry Candidate Proposal Round 1

在严格 gate 下把这 6 个 proposal 转为 registry candidate proposal。

仍不进入 approved stable / validator / runtime。

仍不改 generated data / golden expected。

### Recommendation

建议下一步先做 Registry Candidate Row Shape Planning，而不是直接 registry candidate proposal。

原因：

- Row shape 可以先确认字段、source traceability、reviewStatus 和 false gates。
- 这能降低 proposedDraftId 被误读为 approved stable ID 的风险。
- 这仍保持 planning-only，不开放 implementation。

## 5. Explicit Non-Goals

本轮不做：

- 不生成 stable ID。
- 不批准任何 ID。
- 不创建 registry candidate。
- 不创建 registry / enum / schema / validator。
- 不生成 validator allowed values。
- 不生成正式 triggerMetric。
- 不填正式阈值 / `scoreMultiplier`。
- 不改 runtime / core / data / generated / golden。
- 不开放 implementation / batch content / generated severity / takeover。
