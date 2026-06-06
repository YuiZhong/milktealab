# Draft ID Proposal Dry-Run Round 1｜第一批草案 ID 提案演练

## 0. 文件定位

本文件是 v0.0.8.x planning-only 阶段的 draft ID proposal dry-run / 草案 ID 提案演练报告。

本文件只为第一批 6 个 structuring candidates 提出 `proposedDraftId`，供用户 + ChatGPT 审阅命名方向、legacy reuse 风险和后续 registry planning 边界。

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

本文件不创建 registry、schema、enum 或 validator。

本文件不批准任何 ID，不创建任何 registry candidate，也不允许任何 proposed draft ID 进入 runtime / generated data / golden expected。

`proposedDraftId` 只是 review proposal。即使它看起来像 existing observed ID，也仍然不是 approved stable ID。

## 1. 本轮输入

本轮只处理 `reports/human_review/structuringCandidatePlan.round1.md` 中的第一批 6 个 structuring candidates。

| order | structuringRef | source concept draft | displayNameDraft |
|---|---|---|---|
| 1 | STRUCT-R1-01 | AC-TASTE-R1-02 | 甜度过载 |
| 2 | STRUCT-R1-02 | AC-TASTE-R1-03 | 酸度过载 |
| 3 | STRUCT-R1-03 | AC-TASTE-R1-04 | 苦味过载 |
| 4 | STRUCT-R1-04 | AC-TASTE-R1-06 | 涩感 / 收敛感过强 |
| 5 | STRUCT-R1-05 | AC-TEX-R1-02 | 水泥感 / 粉泥感 / 低流动性 |
| 6 | STRUCT-R1-06 | AC-TEX-R1-01 | 八宝粥感 / 固体小料负载过高 |

本轮遵守：

- `docs/STABLE_ID_NAMING_GUARDRAIL.md`
- `reports/human_review/draftIdNamingReviewProtocol.round1.md`
- `reports/human_review/sourceOfTruthRegistryPlanning.round1.md`

本轮不从零重做 ID approval flow。

## 2. Existing / Legacy / Observed ID 搜索摘要

本轮只读搜索覆盖 `core/**`、`data/**`、`scripts/**`、`docs/**`、`reports/**`。

搜索结论只用于 dry-run 命名审查，不是 registry decision。

### 2.1 甜度过载

- 未发现 current runtime `accidentTypeId` 为 `taste_sweet_overload`。
- 已发现 summary candidate / candidate-only 语境：
  - `sweet_overload_risk`
  - `taste_sweet_overload_candidate`
  - `sweet_overload`
- `docs/V0_0_7_MECHANISM_TODO.md` 中曾把 `taste_sweet_overload` 列为 future batch item。
- 结论：可提出 `taste_sweet_overload` 作为 new draft proposal，但它不是 existing stable ID。

### 2.2 酸度过载

- 已发现 current runtime / golden / summary candidate / scaffold sample 语境中的 `taste_acid_overload`。
- `data/stableIdRegistry.js` 中 `taste_acid_overload` 的状态仍是 `reviewed_candidate_not_approved`。
- `scripts/content/checkStableIdRegistry.js` 明确要求它不能进入 validator / generated severity / runtime。
- 结论：可提出沿用 `taste_acid_overload` 作为 reuse existing observed ID 的 dry-run proposal，但这不是 approval。

### 2.3 苦味过载

- 未发现 current runtime `accidentTypeId` 为 `taste_bitter_overload`。
- 已发现 candidate-only 语境：
  - `taste_bitterness_overload_candidate`
  - `bitterness_overload`
- `docs/V0_0_7_MECHANISM_TODO.md` 中曾把 `taste_bitter_overload` 列为 future batch item。
- 结论：本 dry-run 提出 `taste_bitter_overload`，但需要用户 + ChatGPT review 它是否应沿用更接近 observed candidate stem 的 `taste_bitterness_overload`。

### 2.4 涩感 / 收敛感过强

- 未发现 current runtime `accidentTypeId`。
- `core/tasteSummaryEngine.js` 已有 `astringency` 结构指标语境。
- `core/tasteSummaryEngine.js` 中的 `astringency` 更像“涩感 / 收敛感”机制 / 指标名词语境。
- 结论：本 dry-run 提出 `taste_astringency_overload`，但需要 review taste / special sensation boundary。

### 2.5 水泥感 / 粉泥感 / 低流动性

- 已发现 `texture_low_drinkability` 的 runtime-like / golden / summary candidate / migration evidence。
- `scripts/content/checkStableIdRegistry.js` 当前把 `texture_low_drinkability` 列为 forbidden current scaffold ID，说明它还不能进入当前 minimal registry scaffold。
- 历史 `texture_taro_overload` / `texture_oreo_overload` 只作为迁移证据，不回流 current registry。
- 结论：可提出沿用 `texture_low_drinkability` 作为 reuse existing observed ID 的 dry-run proposal，但它仍不是 registry candidate。

### 2.6 八宝粥感 / 固体小料负载过高

- 已发现 `texture_solid_overload` 的 runtime-like / golden / summary candidate / scaffold sample 语境。
- `data/stableIdRegistry.js` 中 `texture_solid_overload` 的状态仍是 `reviewed_candidate_not_approved`。
- `scripts/content/checkStableIdRegistry.js` 明确要求它不能进入 validator / generated severity / runtime。
- 历史 `texture_topping_overload` 只作为 legacy reference，不回流 current registry。
- 结论：可提出沿用 `texture_solid_overload` 作为 reuse existing observed ID 的 dry-run proposal，但这不是 approval。

## 3. Draft ID Proposal Table

说明：

- `proposedDraftId` 是 proposal only。
- `legacyObservedIds` 是证据 / 冲突检查，不代表 source-of-truth。
- `canEnterRegistryCandidate` / `canEnterValidator` / `canAffectRuntime` 必须全为 `false`。

| order | displayNameDraft | proposedDraftId | idFamily | candidateType | sourceConceptRef | sourceReviewFile | dominantSourceLayer | legacyObservedIds | reuse / naming decision | reviewStatus | canEnterRegistryCandidate | canEnterValidator | canAffectRuntime |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 甜度过载 | `taste_sweet_overload` | accidentTypeId | accident | AC-TASTE-R1-02 / STRUCT-R1-01 | `reports/human_review/approvedConceptList.taste.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | taste | `taste_sweet_overload_candidate`; `sweet_overload`; `sweet_overload_risk` | new draft proposal aligned with existing candidate/risk stem; not runtime observed | draft_proposal_pending_user_chatgpt_review | false | false | false |
| 2 | 酸度过载 | `taste_acid_overload` | accidentTypeId | accident | AC-TASTE-R1-03 / STRUCT-R1-02 | `reports/human_review/approvedConceptList.taste.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | taste | `taste_acid_overload` runtime / golden / summary / scaffold evidence | reuse existing observed ID as draft proposal; current scaffold status remains `reviewed_candidate_not_approved` | draft_proposal_pending_user_chatgpt_review | false | false | false |
| 3 | 苦味过载 | `taste_bitter_overload` | accidentTypeId | accident | AC-TASTE-R1-04 / STRUCT-R1-03 | `reports/human_review/approvedConceptList.taste.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | taste | `taste_bitterness_overload_candidate`; `bitterness_overload`; `bitterness_overload_risk` | new draft proposal; needs review against `taste_bitterness_overload` wording | draft_proposal_pending_user_chatgpt_review | false | false | false |
| 4 | 涩感 / 收敛感过强 | `taste_astringency_overload` | accidentTypeId | accident | AC-TASTE-R1-06 / STRUCT-R1-04 | `reports/human_review/approvedConceptList.taste.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | taste / special sensation boundary | `astringency` metric / evidence; earlier future-batch wording needs noun-form review | new draft proposal uses `astringency` because it is closer to the mechanism / metric noun for 涩感 / 收敛感; needs taste / sensation boundary review | draft_proposal_pending_user_chatgpt_review | false | false | false |
| 5 | 水泥感 / 粉泥感 / 低流动性 | `texture_low_drinkability` | accidentTypeId | accident | AC-TEX-R1-02 / STRUCT-R1-05 | `reports/human_review/approvedConceptList.texture.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | texture / drinkability | `texture_low_drinkability` runtime-like / golden / summary / migration evidence; `low_drinkability` candidate tag / profile tag | reuse existing observed ID as draft proposal; still forbidden from current scaffold / validator | draft_proposal_pending_user_chatgpt_review | false | false | false |
| 6 | 八宝粥感 / 固体小料负载过高 | `texture_solid_overload` | accidentTypeId | accident | AC-TEX-R1-01 / STRUCT-R1-06 | `reports/human_review/approvedConceptList.texture.round1.draft.md`; `reports/human_review/structuringCandidatePlan.round1.md` | texture / drink structure | `texture_solid_overload` runtime-like / golden / summary / scaffold evidence | reuse existing observed ID as draft proposal; current scaffold status remains `reviewed_candidate_not_approved` | draft_proposal_pending_user_chatgpt_review | false | false | false |

## 4. Review Notes By Proposal

### 4.1 `taste_sweet_overload`

- Current true status: candidate / risk evidence exists; no current runtime accidentTypeId found.
- Why this draft name: follows existing `taste_sweet_overload_candidate` stem and stable ID family style.
- Anti-if notes: do not split by sugar / honey / syrup / fruit jam.
- Severity boundary: light / medium / heavy sweetness must be rule / severity / feedback intensity, not separate accidentTypeId.
- Not this: not a sweetener-specific ID, not a feedbackTag, not a runtime rule.
- Needs review: confirm `sweet` wording is preferred over `sweetness` for accidentTypeId.

### 4.2 `taste_acid_overload`

- Current true status: current observed ID and minimal scaffold reviewed candidate, but not approved.
- Why this draft name: reuse avoids creating a duplicate acid overload ID.
- Anti-if notes: do not split by lemon / hawthorn / passion fruit / lime / sour plum.
- Severity boundary: acidity strength belongs to triggerMetric / severity / feedback intensity.
- Not this: not flavor identity conflict, not novelty / weirdness, not a feedbackTag.
- Needs review: confirm existing observed meaning remains the intended first-batch acid mechanism.

### 4.3 `taste_bitter_overload`

- Current true status: candidate-only evidence exists as `taste_bitterness_overload_candidate`; no current runtime accidentTypeId found.
- Why this draft name: `docs/V0_0_7_MECHANISM_TODO.md` already listed `taste_bitter_overload` as a future batch item.
- Anti-if notes: do not split by tea / coffee / matcha / cocoa.
- Severity boundary: bitter intensity belongs to triggerMetric / severity / feedback intensity.
- Not this: not "all bitterness is bad"; customer tolerance may change score or feedback.
- Needs review: choose `taste_bitter_overload` vs `taste_bitterness_overload` before any future registry candidate.

### 4.4 `taste_astringency_overload`

- Current true status: `astringency` metric/evidence exists; no current runtime accidentTypeId found.
- Why this draft name: `astringency` is closer to the mechanism / metric noun for 涩感 / 收敛感; `astringent` reads more like an adjective. This keeps the draft distinct from bitter overload while still requiring boundary review.
- Anti-if notes: do not write black tea / oolong / coffee-specific if; do not merge back into a generic strong stimulation umbrella.
- Severity boundary: drying / astringency intensity belongs to triggerMetric / severity / feedback intensity.
- Not this: not bitter overload, not spicy / numbing / alcohol burn.
- Needs review: confirm whether final prefix should remain `taste_` or move to future sensation family after sourceLayer review.

### 4.5 `texture_low_drinkability`

- Current true status: runtime-like / golden / summary / migration evidence exists, but current scaffold explicitly does not accept it.
- Why this draft name: reuse avoids creating duplicate low-flow / cement / slurry IDs.
- Anti-if notes: do not split by taro paste / Oreo crumble / powder / sediment source.
- Severity boundary: light powderiness to severe cement-like blockage is one mechanism continuum.
- Not this: not straw resistance as a standalone mechanism, not ingredient-specific old IDs.
- Needs review: confirm boundary against `texture_solid_overload` and `texture_straw_resistance` before registry candidate.

### 4.6 `texture_solid_overload`

- Current true status: current observed ID and minimal scaffold reviewed candidate, but not approved.
- Why this draft name: reuse existing generalized solid-load mechanism instead of topping-specific IDs.
- Anti-if notes: do not split by pearl / taro ball / pudding / coconut jelly / grass jelly.
- Severity boundary: solid load and liquid support intensity belong to triggerMetric / severity / feedback intensity.
- Not this: not every straw problem, not low drinkability, not a product identity.
- Needs review: confirm future triggerMetric family such as `solidLoad` / `textureRatio` / `liquidSupport` before registry candidate.

## 5. Gates And Non-Entry Rules

This dry-run keeps all gates closed.

| gate | status | note |
|---|---|---|
| canEnterRegistryCandidate | false | No row in this report may enter registry candidate. |
| canEnterValidator | false | No row in this report may become validator allowed values. |
| canAffectRuntime | false | No row in this report may affect runtime / final result. |
| canEnterGeneratedSeverity | false | Generated severity remains closed. |
| canChangeGoldenExpected | false | No golden expected changes. |
| canCreateRegistry | false | No registry / enum / schema is created. |

The repeated `false` gates are intentional. They protect against fake stability.

## 6. Open Questions For User + ChatGPT

1. For 苦味过载, should the future draft name prefer `taste_bitter_overload` or `taste_bitterness_overload`?
2. For 涩感 / 收敛感, should the final family remain `taste_` or move to a future `sensation_` family after sensation-channel planning?
3. For `texture_low_drinkability`, is the existing broad ID still preferred over a more specific low-flow wording?
4. For `texture_solid_overload`, should future triggerMetric focus on `solidLoad`, `textureRatio`, `liquidSupport`, or a combined metric?
5. Do any of these 6 proposals need producer-facing rename before a future registry candidate task?

## 7. Recommended Next Options

These are options, not commands.

### Option A｜User + ChatGPT Review

Review the six `proposedDraftId` values and answer the open questions.

Still no registry candidate / validator / runtime.

### Option B｜Registry Candidate Row Shape Dry-Run

If the six proposals are accepted as proposal wording, a future task can design candidate row shape while keeping all runtime gates closed.

### Option C｜TriggerMetric Direction Review

Review source metric directions for the same six concepts.

Still do not create formal triggerMetric names, thresholds, or score multipliers.

## 8. Explicit Non-Goals

本轮不做：

- 不生成 approved stable ID。
- 不生成 registry candidate。
- 不创建 registry / enum / schema / validator。
- 不生成 allowed values。
- 不生成正式 triggerMetric。
- 不填正式阈值 / `scoreMultiplier`。
- 不改 runtime / core / data / generated / golden。
- 不开放 implementation / batch content / generated severity / takeover。
- 不把 `data/stableIdRegistry.js` 中的 `reviewed_candidate_not_approved` 误读成 approved stable。
