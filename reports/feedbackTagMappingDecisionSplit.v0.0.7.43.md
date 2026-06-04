# FeedbackTag mapping decision split｜v0.0.7.43

## 0. Report Positioning

This report is a feedbackTag mapping review split and source-of-truth precheck.

It is a docs / report artifact only. It is not a registry, enum, schema, validator input, generated data, runtime source-of-truth, copy-pool update, or runtime adapter.

This report does not clear any feedbackTag for registry, validator, generated data, partial takeover, active takeover, or runtime use. It does not upgrade candidate / risk tags into runtime feedbackTags. It does not modify the feedback copy pool. It does not change player final feedback.

This report does not solve P1-5 or P1-7. It only separates producer-facing questions from technical gate questions so later tasks can decide what to review next without mixing layers.

## 1. Executive Summary

- Runtime-observed feedbackTags, generated / shadow feedbackTags, candidate / risk tags, rule tags, and sample draft fields are different layers.
- `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, `novelty`, `sweet_overload`, `bitterness_overload`, `texture_heavy`, and `low_drinkability` are currently candidate / risk / rule-side semantics, not runtime feedbackTags.
- `identity_conflict` is related to flavor identity candidate evidence, but it is not `flavor_identity_conflict`, not a runtime feedbackTag, and not an outcomeTypeId.
- `flavor_identity_conflict` is the current outcomeTypeId after v0.0.7.41. It is not a feedbackTag.
- `bubble_conflict` is runtime-observed feedbackTag evidence with narrow bubble + thick / mouthfeel conflict semantics. It must not be generalized into generic flavor identity conflict.
- Generated / shadow feedback data proves content-pipeline shape, not active runtime readiness.
- Future use needs producer review, mapping review, copy-pool review, source-of-truth design, validator design, shadow / golden review, and explicit task approval.

## 2. Tag Layer Split

### A. Runtime-observed feedbackTag layer

These tags are currently observable from the legacy runtime feedback pool, generated / shadow content, or golden expectations. Observation is evidence only; it is not a future registry decision.

| tag | observed layer | current split note |
|---|---|---|
| `accident` | runtime observed | Broad accident fallback-style copy direction; needs review before any new mechanism consumes it. |
| `acid_accident` | ambiguous cross-layer | Runtime / generated / rule / candidate / golden appearances share a string but must keep layer boundaries. |
| `acid_milk_conflict` | runtime observed | Narrow acid + milk conflict copy direction; do not generalize to every acid issue. |
| `bubble_conflict` | ambiguous cross-layer | Narrow bubble + thick / mouthfeel conflict follow-up; not generic flavor identity conflict. |
| `classic` | ambiguous cross-layer | Style / ordinary milk-tea copy tag; not drinkTypeId or quality score. |
| `premium` | ambiguous cross-layer | Premium-feeling copy tag; not score or quality source. |
| `durian` | ambiguous cross-layer | Copy tag with ingredient wording; not accidentTypeId evidence. |
| `greasy_overload` | ambiguous cross-layer | Fat / greasy copy direction overlaps texture/fat evidence; needs review before severity use. |
| `straw_disaster` | ambiguous cross-layer | Straw / drinkability copy direction; keep narrow semantics. |
| `normal_good` | ambiguous cross-layer | Positive / ordinary-good copy tag; not drinkTypeId. |
| `fresh` | runtime observed | Freshness style copy tag; not mechanism ID. |
| `sweet` | runtime observed | Sweetness style copy tag; not severity level. |
| `dessert` | runtime observed | Dessert-like copy direction; not mechanism ID. |
| `thick_followup` | runtime observed | Follow-up copy tag; not accidentTypeId. |
| `straw_followup` | runtime observed | Follow-up copy tag; not accidentTypeId. |
| `thick_straw_followup` | runtime observed | Narrow follow-up copy tag; not accidentTypeId. |
| `weird` | ambiguous cross-layer | Broad odd / fallback-like copy tag; needs producer review before expansion. |

### B. Candidate / risk / rule-side layer

These strings are currently candidate, risk, or rule-side semantics. They cannot directly enter player copy, feedbackTag fields, validators, or generated data gates from this report.

| tag | observed layer | current split note |
|---|---|---|
| `aroma_pressure` | candidate / risk tag | Future copy direction candidate only; current feedbackTag field should stay empty until separate mapping review. |
| `identity_conflict` | candidate / risk tag | Candidate evidence for flavor identity conflict; not feedbackTag and not outcomeTypeId. |
| `low_beverage_fit` | candidate / risk / rule-side semantics | Machine-facing fit risk phrase; needs human rewrite and mapping review before player copy. |
| `savory_identity` | candidate / risk tag | Possible future copy direction; strong producer review needed. |
| `texture_sediment` | candidate / risk tag | Texture / sediment risk; possible future copy direction after review. |
| `novelty` | candidate / risk tag with generated-sample overlap | Needs split review; do not let one word serve as outcome, candidate tag, and copy direction at once. |
| `sweet_overload` | candidate / risk tag | Sweetness overload risk; not runtime feedbackTag from this report. |
| `bitterness_overload` | candidate / risk tag | Bitterness overload risk; not runtime feedbackTag from this report. |
| `texture_heavy` | candidate / rule-side tag | Texture heaviness risk; not runtime feedbackTag from this report. |
| `low_drinkability` | candidate / rule-side tag | Drinkability risk; not runtime feedbackTag from this report. |

### C. Generated / shadow layer

- Generated / shadow feedbackTag means the content pipeline can group candidate copy. It does not mean runtime active copy selection is ready.
- Disabled sample / draft tags stay sample-only and must not enter registry or runtime.
- A single-text pool is not enough for partial / active takeover.
- Generated / shadow rows need review pack evidence, producer decision, mapping decision, source-of-truth design, validator design, and golden review before changing player-visible feedback.

## 3. Producer Review Zone

制作人只需要看这里，判断这些 tag 未来是否适合作为玩家文案方向。这里不是让制作人批准技术接入。

### PR-FT-001｜aroma_pressure

- reviewItemId: PR-FT-001
- tagOrGroup: `aroma_pressure`
- currentLayer: candidate / risk tag
- humanMeaningCN: 香气压力太大，气味存在感可能压过饮品本体。
- playerVisibleRisk: 容易写成机器味很重的抽象评价。
- whyItMatters: 现在它不是玩家文案池 tag；如果未来要给玩家看，需要先决定文案风格。
- producerQuestion: 这个方向适合变成玩家可见吐槽吗？还是只留给机器判断？
- defaultRecommendation: do_not_promote_now；未来可作为 copy direction candidate 复审。
- reviewStatus:
- producerComment:

### PR-FT-002｜identity_conflict

- reviewItemId: PR-FT-002
- tagOrGroup: `identity_conflict`
- currentLayer: candidate / risk tag
- humanMeaningCN: 风味身份不协调，像几种方向互相抢戏。
- playerVisibleRisk: 容易被误映射到 `bubble_conflict` 或直接当成 outcome。
- whyItMatters: `flavor_identity_conflict` 是 outcomeTypeId；`identity_conflict` 只是 candidate / risk tag。
- producerQuestion: 未来玩家文案要不要专门写“风味身份冲突”方向？如果要，应该叫什么 tag？
- defaultRecommendation: do_not_promote_now；do_not_map_to_bubble_conflict。
- reviewStatus:
- producerComment:

### PR-FT-003｜low_beverage_fit

- reviewItemId: PR-FT-003
- tagOrGroup: `low_beverage_fit`
- currentLayer: candidate / risk / rule-side semantics
- humanMeaningCN: 这组材料不太像一杯能顺口喝完的饮品。
- playerVisibleRisk: 机器词感明显，需要改写成人话。
- whyItMatters: 它适合做机器风险提示，不适合直接变成玩家反馈标签。
- producerQuestion: 未来是否需要一类“饮品适配度低”的玩家吐槽？
- defaultRecommendation: needs_rewrite_before_player_copy。
- reviewStatus:
- producerComment:

### PR-FT-004｜savory_identity

- reviewItemId: PR-FT-004
- tagOrGroup: `savory_identity`
- currentLayer: candidate / risk tag
- humanMeaningCN: 风味偏咸鲜或料理感，可能不像奶茶。
- playerVisibleRisk: 很容易变成攻击玩家口味，需要控制语气。
- whyItMatters: 如果未来要写玩家文案，需要制作人先定风格边界。
- producerQuestion: 咸鲜方向要做成好笑吐槽、严肃警告，还是只留给机器？
- defaultRecommendation: producer_review_required。
- reviewStatus:
- producerComment:

### PR-FT-005｜texture_sediment

- reviewItemId: PR-FT-005
- tagOrGroup: `texture_sediment`
- currentLayer: candidate / risk tag
- humanMeaningCN: 有沉淀、渣感或口感不均匀的风险。
- playerVisibleRisk: 可以写成质地吐槽，但要避免过度恶心。
- whyItMatters: 目前它是 texture 风险语义，不是 runtime feedbackTag。
- producerQuestion: 未来是否需要“沉淀 / 渣感”类文案方向？
- defaultRecommendation: possible_future_copy_direction_after_review。
- reviewStatus:
- producerComment:

### PR-FT-006｜novelty

- reviewItemId: PR-FT-006
- tagOrGroup: `novelty`
- currentLayer: candidate / risk tag with generated-sample overlap
- humanMeaningCN: 猎奇、新奇、很实验。
- playerVisibleRisk: 这个词可能同时被误用成 outcome、candidate tag、文案风格。
- whyItMatters: 必须拆清它到底是结果类型、风险提示，还是玩家文案方向。
- producerQuestion: “猎奇实验品”未来要保留为结果、风格文案，还是只作为机器候选？
- defaultRecommendation: split_required_before_any_takeover。
- reviewStatus:
- producerComment:

### PR-FT-007｜bubble_conflict

- reviewItemId: PR-FT-007
- tagOrGroup: `bubble_conflict`
- currentLayer: runtime observed / generated observed feedbackTag
- humanMeaningCN: 气泡 + 厚重 / 口感冲突追评。
- playerVisibleRisk: 如果泛化，会让所有 flavor identity conflict 都像“气泡问题”。
- whyItMatters: 它是窄语义，不是 generic flavor identity conflict 的默认文案标签。
- producerQuestion: 这个 tag 是否只保留给气泡 / 厚重口感冲突，不扩到风味身份冲突？
- defaultRecommendation: keep_observed_narrow_meaning；do_not_generalize。
- reviewStatus:
- producerComment:

### PR-FT-008｜greasy_overload

- reviewItemId: PR-FT-008
- tagOrGroup: `greasy_overload`
- currentLayer: runtime observed / generated observed / candidate overlap
- humanMeaningCN: 奶脂、厚重、油腻负担过载。
- playerVisibleRisk: 需要避免把所有厚重饮品都写成油腻事故。
- whyItMatters: 未来 severity 引用前需要确认文案池是否够用。
- producerQuestion: 这类“油腻 / 厚重负担”文案是否需要扩充？
- defaultRecommendation: keep_observed; copy_pool_expansion_later。
- reviewStatus:
- producerComment:

### PR-FT-009｜straw_disaster

- reviewItemId: PR-FT-009
- tagOrGroup: `straw_disaster`
- currentLayer: runtime observed / generated observed / candidate overlap
- humanMeaningCN: 吸管吸不上来、质地太糊或可饮用性崩溃。
- playerVisibleRisk: 语义应保持在吸管 / drinkability，不要泛化成所有 texture 问题。
- whyItMatters: 它已经是代表性 shadow review tag，但 active 接管仍需审查。
- producerQuestion: 吸管灾难类文案目前是否方向清楚？是否要扩充？
- defaultRecommendation: keep_observed_narrow_meaning; expand_after_review。
- reviewStatus:
- producerComment:

### PR-FT-010｜style / positive copy tags

- reviewItemId: PR-FT-010
- tagOrGroup: `classic`, `premium`, `normal_good`, `fresh`, `sweet`, `dessert`
- currentLayer: runtime observed / generated observed style tags
- humanMeaningCN: 经典、高级、正常好喝、清爽、甜感、甜品感等文案方向。
- playerVisibleRisk: 容易被误当成 drinkType、score 或 quality 主键。
- whyItMatters: 它们应保持文案风格含义，不应进入机制主键。
- producerQuestion: 这些风格标签是否足够清楚？未来要不要继续扩文案池？
- defaultRecommendation: keep_as_copy_style_only。
- reviewStatus:
- producerComment:

## 4. Technical Review Zone

| tagOrGroup | currentLayer | source files | runtime observed? | generated observed? | candidate/risk only? | same-string cross-layer? | wrong registry entry risk | producer review needed? | copy pool expansion? | source-of-truth / registry design? | blocks validator? | blocks partial / active takeover? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `aroma_pressure` | candidate / risk tag | `core/summaryCandidateEngine.js`, docs, candidate severity sample notes | no | no | yes | no | high | yes | yes if made player copy | yes | yes for feedbackTag fields | yes |
| `identity_conflict` | candidate / risk tag | `core/summaryCandidateEngine.js`, docs, reports | no | no | yes | related to `flavor_identity_conflict` wording | high | yes | yes if made player copy | yes | yes for feedbackTag fields | yes |
| `low_beverage_fit` | candidate / risk / rule-side semantics | `core/summaryCandidateEngine.js`, structure rules, docs | no | no | yes | yes, rule-side overlap | medium | yes | yes if made player copy | yes | yes for feedbackTag fields | yes |
| `savory_identity` | candidate / risk tag | `core/summaryCandidateEngine.js`, docs | no | no | yes | no | medium | yes | yes if made player copy | yes | yes for feedbackTag fields | yes |
| `texture_sediment` | candidate / risk tag | `core/summaryCandidateEngine.js`, docs | no | no | yes | no | medium | yes | yes if made player copy | yes | yes for feedbackTag fields | yes |
| `novelty` | candidate / risk tag with generated-sample overlap | `core/summaryCandidateEngine.js`, generated / sample docs | no | yes | partially | yes | high | yes | yes | yes | yes | yes |
| `bubble_conflict` | runtime observed / generated observed feedbackTag | `data/feedbackTexts.js`, generated feedback, golden, docs | yes | yes | no | yes | high if generalized | yes | needs review | yes | yes for new meaning | yes |
| `greasy_overload` | runtime observed / generated observed / candidate overlap | `data/feedbackTexts.js`, `core/summaryCandidateEngine.js`, generated, golden | yes | yes | no | yes | medium | yes | yes | yes | yes for severity fields | yes |
| `straw_disaster` | runtime observed / generated observed / candidate overlap | `data/feedbackTexts.js`, `core/summaryCandidateEngine.js`, generated, golden | yes | yes | no | yes | medium | yes | yes | yes | yes for severity fields | yes |
| `style / positive copy tags` | runtime observed / generated observed style tags | `data/feedbackTexts.js`, generated, golden, docs | yes | partial | no | yes | medium | yes | needs review | yes | no until mechanism use | yes if active expanded |
| `sweet_overload` / `bitterness_overload` / `texture_heavy` / `low_drinkability` | candidate / risk / rule-side semantics | `core/summaryCandidateEngine.js`, structure rules, docs | no | no | yes | yes for rule-side tags | medium | yes if made player copy | yes if made player copy | yes | yes for feedbackTag fields | yes |

## 5. Decision Split Table

Gate wording rule: `canEnterRegistry`, `canEnterValidator`, `canEnterGeneratedData`, and `canAffectRuntime` are hard gate fields in this report. `no` means this report cannot move the item into that layer. Future entry needs a separate user / ChatGPT decision, migration plan, source-of-truth design, validator design, copy-pool review, shadow / golden review, or runtime task.

| tagOrGroup | currentLayer | currentDecision | producerReviewNeeded | technicalNextStep | canEnterRegistry | canEnterValidator | canEnterGeneratedData | canAffectRuntime |
|---|---|---|---|---|---|---|---|---|
| `aroma_pressure` | candidate / risk tag | keep candidate-only for now | yes | source-of-truth design + producer copy review | no | no | no | no |
| `identity_conflict` | candidate / risk tag | keep candidate-only; do not map to `bubble_conflict` | yes | mapping review for flavor identity copy direction | no | no | no | no |
| `low_beverage_fit` | candidate / risk / rule-side semantics | keep machine-facing until rewrite | yes | producer rewrite review + tag naming review | no | no | no | no |
| `savory_identity` | candidate / risk tag | keep candidate-only for now | yes | producer tone review | no | no | no | no |
| `texture_sediment` | candidate / risk tag | keep candidate-only for now | yes | producer texture-copy review | no | no | no | no |
| `novelty` | candidate / risk tag with generated-sample overlap | split required before any later use | yes | separate outcome / candidate / copy direction review | no | no | no | no |
| `bubble_conflict` | runtime observed / generated observed feedbackTag | keep narrow bubble + thick / mouthfeel meaning | yes | mapping notes + producer confirmation before new use | no | no | no | no |
| `greasy_overload` | runtime observed / generated observed / candidate overlap | keep observed; review before severity use | yes | copy-pool expansion and mapping review | no | no | no | no |
| `straw_disaster` | runtime observed / generated observed / candidate overlap | keep observed narrow straw / drinkability meaning | yes | copy-pool expansion and mapping review | no | no | no | no |
| style / positive copy tags | runtime observed / generated observed style tags | keep as copy style only | needs review | copy style review before expansion | no | no | no | no |
| overload / texture risk tags | candidate / risk / rule-side semantics | keep machine-facing unless separately reviewed | yes if player-visible | layer split + source-of-truth design | no | no | no | no |

## 6. Future Review / Registry Preconditions

Before any future feedbackTag registry / source-of-truth task can consume these tags, it must define:

1. Which source owns reviewed feedbackTag names.
2. Which layer each tag belongs to.
3. Whether each tag is player-visible copy, generated shadow copy, candidate/risk evidence, rule evidence, or sample-only draft.
4. Whether producer review is complete for the player-visible meaning.
5. Whether copy-pool volume is enough for partial / active takeover.
6. Whether generated / shadow evidence and golden checks cover the behavior.
7. Whether legacy runtime feedbackTag semantics need notes or split plans.

If that source does not exist, stop and design it first. Do not infer feedbackTag validity from string matches, generated rows, candidate feedbackTags arrays, or legacy runtime observation.

## 7. Gate Reminders

- Candidate severity sheet validator must not treat candidate / risk tags as valid feedbackTag values.
- Generated feedback partial takeover remains blocked until mapping review, producer review, copy-pool review, and golden review are done.
- Severity / threshold table `feedbackTag` fields must not use `aroma_pressure`, `identity_conflict`, `low_beverage_fit`, `savory_identity`, `texture_sediment`, `novelty`, `sweet_overload`, `bitterness_overload`, `texture_heavy`, or `low_drinkability` from this report.
- `bubble_conflict` must stay narrow unless a later producer / ChatGPT task explicitly changes the copy direction and all gates are updated.
- `flavor_identity_conflict` is outcomeTypeId, not feedbackTag.
- P1-5 and P1-7 remain open after this report.

## 8. What This Report Does NOT Do

- Does not add registry, enum, schema, validator, generated data, content sheet, runtime adapter, or build script.
- Does not modify runtime, data, generated data, content sheets, reports other than this file, scripts, golden expected, score logic, accident logic, drinkType logic, result type, or player feedback.
- Does not clear any feedbackTag for registry, validator, generated data, partial takeover, active takeover, or runtime.
- Does not create a feedbackTag source-of-truth.
- Does not expand or edit player-visible copy pools.
- Does not treat runtime-observed tags as reviewed future tags.
- Does not solve P1-5 or P1-7.
