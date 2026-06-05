# v0.0.7.x Feedback Tag Mapping Design

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

本文是 v0.0.7.x 的 feedbackTag registry / candidate tag mapping 设计文档。

它只定义未来如何区分和映射：

- runtime feedbackTag
- generated feedbackTag
- summary candidate / risk tag
- rule tag
- sample draft tag
- future reviewed feedbackTag

本文不是 registry 文件，不是 schema，不是 enum，不是 validator，不是 generated data，也不是 runtime 数据。

本文不把任何 tag 判定为 approved / registered / allowed / final / stable。本文只记录当前可观察层级、风险和未来 gate。后续如果需要把某个 tag 作为 player-visible feedbackTag 使用，仍必须经过 explicit source of truth、制作人 review、文案池检查、generated / shadow 检查和 golden 记录。

## 1. 核心原则

- 同一个字符串出现在多个层级时，不代表它们是同一个系统身份。
- summary candidate / risk tag 不能自动等同于 runtime feedbackTag。
- rule tag 不能自动等同于 feedbackTag。
- generated feedbackTag 不能自动 active 接管 runtime 文案选择。
- sample draft tag 不能进入稳定字段误导 future validator / Codex。
- `zhCN` / display 文案 / notes 不能作为 feedbackTag 主键。
- severity / threshold 表中的 `feedbackTag` 字段未来只能引用 reviewed feedbackTag source of truth，不能直接引用 candidate / risk tag。
- 旧 runtime feedbackTag 即使已经存在，也不能被随意泛化到新机制语义。

特别注意：

- `aroma_pressure` 当前更像 flavor / summary candidate 风险语义，不是 runtime 文案池 feedbackTag。
- `identity_conflict` 当前是 flavor identity candidate / risk tag，不是 runtime 文案池 feedbackTag，也不能因为字符串接近 `flavor_identity_conflict` 就被当成 outcomeTypeId。
- `flavor_identity_conflict` 当前是 outcomeTypeId，不是 feedbackTag。
- `bubble_conflict` 当前是可观察的 runtime feedbackTag，但语义偏气泡 + 厚重 / 口感冲突追评，不应泛化为 generic flavor identity conflict。
- `acid_accident`、`greasy_overload`、`straw_disaster` 等字符串出现在多个层级时，后续必须保持 layer 边界，不能因为字符串相同就合并语义。

## 2. Tag 层级分类

### runtime feedbackTag

当前可从 `data/feedbackTexts.js` 的 `feedbackTagPools` 观察到的文案池 tag。

这只能说明它们当前在 legacy/runtime 文案池中被使用，不代表已经完成 future registry 语义审查，也不代表可以被 severity / threshold 表直接引用。

### generated feedbackTag

当前可从 `content_sheets/examples/feedback_texts.sample.*` 或 `data/generated/feedbackTexts.generated.*` 观察到的 generated / shadow 文案 tag。

它们仍处于内容管线 / shadow / review 路线，不应自动成为 runtime active tag。

### summary candidate / risk tag

当前可从 `core/summaryCandidateEngine.js` 等 candidate 层看到的风险、候选、触发语义。

这些 tag 主要用于解释中间候选，不应直接作为玩家可见文案选择 tag。

### rule tag

当前可从事故规则 / 结构规则中看到的 rule-side 标签。

rule tag 可以服务事故、风险、debug、候选调度或证据输出，但它不是 feedbackTag registry。

### sample draft tag

当前可在 disabled sample sheet / draft row 中出现的草案字段。

sample draft tag 只用于说明未来可能的表格形态，不应进入 registry、generated data 或 runtime。

### future reviewed feedbackTag

未来经过明确 source of truth、制作人 review、文案池检查、generated / shadow 检查和 golden 记录后，才可以进入可引用的 feedbackTag 集合。

本文不创建这个集合。

## 3. 当前观察清单

下表只记录当前观察和设计判断，不是 registry，也不是 validator allowed values。

| tag | observed layers | current status | risk | recommendation |
|---|---|---|---|---|
| accident | runtime feedback pool | runtime_feedbackTag_observed | 语义很宽，可能被误当万能事故 tag | 保留观察；新机制引用前需要 registry notes / review |
| acid_accident | runtime feedback pool; generated/sample feedback; accident rules; summary candidate; golden expected | ambiguous_cross_layer | 同名跨 runtime / generated / rule / candidate / golden，容易被字符串合并 | 不按字符串合并；未来 mapping 需逐层确认 |
| acid_milk_conflict | runtime feedback pool | runtime_feedbackTag_observed | 具体冲突 tag，不能泛化到所有酸味事故 | 新机制引用前需要语义 review |
| aroma_pressure | summary candidate / risk | candidate_risk_tag | 不是 runtime 文案池 feedbackTag，容易被误填进 severity sample | do_not_map_yet；如需玩家文案 tag，先走 registry / producer review |
| bitterness_overload | summary candidate / risk | candidate_risk_tag | candidate 风险语义，不是文案池 tag | do_not_map_yet |
| bubble_conflict | runtime feedback pool; generated/sample feedback; golden expected | ambiguous_cross_layer | runtime 语义偏气泡 + 厚重 / 口感冲突追评，不能泛化为 flavor identity conflict | 可保留原语义；generic identity conflict 需要另行确认 tag |
| classic | runtime feedback pool; generated/sample feedback; golden expected | ambiguous_cross_layer | 普通饮品类型 / 文案 tag 边界容易混淆 | 仅按 feedback 文案场景使用；不要当 drinkTypeId |
| dessert | runtime feedback pool | runtime_feedbackTag_observed | 偏口味 / 风格文案 tag，不能当机制类型 | 新规则引用前需要 review |
| durian | runtime feedback pool; generated/sample feedback | ambiguous_cross_layer | 旧文案 tag 含原料语义，不能推导事故机制 | 保留文案 tag 观察；不要当 accidentTypeId |
| durian_accident | accident rule tag | rule_tag_only | rule tag，不能自动变成 feedbackTag | 如需文案 tag，另走 mapping review |
| extreme_ingredient | accident rule tag | rule_tag_only | rule-side 语义宽，不能直接玩家可见 | 不进入 feedbackTag 字段 |
| fresh | runtime feedback pool | runtime_feedbackTag_observed | 风格文案 tag，非机制 tag | 新机制引用前需要 review |
| greasy_overload | runtime feedback pool; generated/sample feedback; golden expected | ambiguous_cross_layer | 同名跨层，且与 texture/fat/厚重方向有关 | 保持层级；severity 引用前需要 reviewed feedbackTag |
| identity_conflict | summary candidate / risk | candidate_risk_tag | 不是 runtime feedbackTag；容易被误当 generic conflict 文案 tag | do_not_map_yet；不映射到 bubble_conflict |
| low_beverage_fit | summary candidate / risk; structure rule tag | ambiguous_cross_layer | candidate / rule 风险语义，不是玩家文案 tag | 不直接进入 feedbackTag |
| novelty | summary candidate / risk | candidate_risk_tag | 可能被误读为 outcome / 风格 / 文案 tag | 需要分层命名 review |
| normal_good | runtime feedback pool; generated/sample feedback | ambiguous_cross_layer | 普通正向文案 tag，不是饮品类型或评分结果 | 保持文案 tag 语义 |
| premium | runtime feedback pool; generated/sample feedback; golden expected | ambiguous_cross_layer | 高级感文案 tag，不是 score / quality 主键 | 保持文案 tag 语义 |
| savory_identity | summary candidate / risk | candidate_risk_tag | 风味身份风险，不是 runtime feedbackTag | do_not_map_yet |
| straw_disaster | runtime feedback pool; generated/sample feedback; golden expected | ambiguous_cross_layer | 同名跨 runtime / generated / structure evidence，仍需保持语义边界 | 可作为原有文案语义观察；新 severity 引用前需 review |
| straw_followup | runtime feedback pool | runtime_feedbackTag_observed | followup 文案 tag，不是事故机制主键 | 新机制引用前需要 review |
| sweet | runtime feedback pool | runtime_feedbackTag_observed | 基础甜味文案 tag，不是 severity / score | 新机制引用前需要 review |
| sweet_overload | summary candidate / risk | candidate_risk_tag | candidate 风险语义，不是文案池 tag | do_not_map_yet |
| texture_heavy | summary candidate / risk; structure rule tag | ambiguous_cross_layer | texture 风险 / rule 语义，不是 runtime feedbackTag | 不直接进入 feedbackTag |
| texture_sediment | summary candidate / risk | candidate_risk_tag | texture / sediment 风险语义，不是 runtime feedbackTag | do_not_map_yet |
| thick_followup | runtime feedback pool | runtime_feedbackTag_observed | followup 文案 tag，不是机制主键 | 新机制引用前需要 review |
| thick_straw_followup | runtime feedback pool | runtime_feedbackTag_observed | followup 文案 tag，语义更窄 | 新机制引用前需要 review |
| weird | runtime feedback pool; generated/sample feedback | ambiguous_cross_layer | 语义宽，容易吞掉具体问题 | 可作为 legacy fallback 观察；新机制引用前需 review |

## 4. Mapping 规则

### candidate / risk tag -> runtime feedbackTag

默认不自动映射。

当前明确禁止：

- 不允许 `identity_conflict` -> `bubble_conflict` 自动映射。
- 不允许 `flavor_identity_conflict` -> `bubble_conflict` 自动映射。
- 不允许把 `flavor_identity_conflict` 当 feedbackTag 使用；它是 outcomeTypeId。

如果未来要把 candidate / risk tag 变成玩家文案 tag，必须先确认：

- 它是否已有对应 runtime feedbackTag。
- 它的玩家可见语义是否足够清楚。
- 是否需要新 feedbackTag，而不是复用旧 tag。
- 是否已有足够文案池。
- 是否经过制作人 review。

### candidate / risk tag -> generated feedbackTag

可以作为草案输入，但必须保持 draft / review 状态。

generated feedbackTag 进入 active runtime 前，必须通过 review pack 和 registry gate。

### generated feedbackTag -> runtime feedbackTag

不能自动 active。

必须先确认：

- 文案池不是薄弱单条。
- 制作人已确认 tag 语义。
- shadow / review pack 记录可追溯。
- golden 变化如果会影响玩家最终 feedback，必须有有意识产品判断。

### runtime observed feedbackTag -> reviewed feedbackTag

runtime observed 不等于 future reviewed。

旧 tag 可继续作为 legacy runtime 文案池的一部分，但进入新表格 / validator / generated / severity 接管路线前，需要补充语义 notes 或拆分计划。

### rule tag -> feedbackTag

不能自动映射。

rule tag 若要进入 feedbackTag 字段，必须通过 explicit mapping row 或 future registry。

### same string across layers

同一个字符串跨层出现时，必须记录它的 layer、source files 和 usage。

禁止仅凭字符串相同进行合并、泛化或引用。

### v0.0.7.41 迁移后的 flavor identity conflict 文案边界

- `flavor_identity_conflict` 是当前 outcomeTypeId，不是 feedbackTag。
- `identity_conflict` 是 candidate / risk tag，不是 feedbackTag，不能直接进入玩家文案选择。
- `bubble_conflict` 是 runtime observed feedbackTag，但只保留气泡 + 厚重 / 口感冲突追评语义。
- `bubble_conflict` 不是 `flavor_identity_conflict` 的唯一或默认玩家文案标签。
- 如果未来需要 generic flavor identity conflict 的玩家文案，应另走 feedbackTag mapping review / producer review，并扩充文案池；不应复用旧 tag 凑数。

## 5. Future Registry / Schema / Script 形态

以下只是未来文件形态建议，本轮不创建。

| future artifact | responsibility | not responsible for |
|---|---|---|
| `data/feedbackTagRegistry.js` | 记录 reviewed feedbackTag、语义边界、source layer、是否可用于 runtime / generated / severity | 不生成文案，不承载机制判断 |
| `data/schema/feedbackTags.schema.json` | 约束 registry / mapping 数据形态 | 不从字符串模式推断合法 tag |
| `scripts/content/checkFeedbackTagMapping.js` | 检查 candidate / risk / generated / runtime tag 的引用是否经过 mapping gate | 不自动修 tag，不自动接管 runtime |
| `reports/feedbackTagMappingReview.sample.md` | 给制作人 / ChatGPT 审核 tag 语义和玩家可见文案边界 | 不自动做机制判断 |

## 6. Validator / Generated / Partial Takeover Gate

### candidate severity sheet validator 前

- `feedbackTag` 字段必须引用 reviewed feedbackTag source of truth。
- candidate / risk tag 进入 `feedbackTag` 字段应至少触发 error 或 needs review。
- disabled draft row 可以给 warning，但不能静默通过成 future stable 字段。
- validator 不应通过 substring / suffix 猜测合法 feedbackTag。

### generated feedback partial takeover 前

- generated tag 必须经过 review pack / 制作人审核。
- 单条或很薄的文案池不能直接 active。
- 旧 runtime tag 如果语义宽或容易误导，必须补 notes / split / deprecate plan。

### severity partial takeover 前

- severity table 不能通过 candidate tag 直接选择玩家最终 feedback。
- severity 只能引用 reviewed feedback focus / tag 或输出 shadow evidence。
- 如果 severity / threshold 会改变玩家最终 feedback，必须有制作人审核和 golden 记录。

### final audit 前

必须确认：

- candidate / risk tag 没有直接混入 runtime feedbackTag。
- `bubble_conflict` 没有被泛化为 flavor identity conflict。
- `flavor_identity_conflict` 没有被当成 feedbackTag。
- `identity_conflict` 没有被当成 runtime feedbackTag。
- sample draft tag 没有进入 generated / runtime。
- same-string cross-layer tag 都有明确边界。

## 7. Producer Review 规则

制作人 review 应看到机器观察层与玩家可见含义的差异。

review pack 应优先展示：

- tag 字符串
- observed layers
- 机器认为它来自哪里
- 玩家可能看到的文案方向
- 是否建议保留、拆分、改名、仅保留 candidate/risk、不要给玩家看

制作人可以使用自然语言备注，例如：

- 语义太宽
- 太像 AI
- 不要给玩家看
- 可以做候选但别接 runtime
- 像气泡问题，不像风味冲突
- 文案池太薄

这些备注不应直接变成机制判断；它们应进入 review / mapping 决策记录。

## 8. 与 v0.0.7.32 Collector Proof 的关系

v0.0.7.32 collector proof 只证明可以收集 stable ID source evidence。

它不是 registry，不是 reviewed mapping，不是 validator allowed values，也不能自动判断某个 tag 已可用于 runtime / severity / generated partial takeover。

本设计基于 collector evidence 继续定义 mapping 规则，但不提升任何 tag 状态。

## 9. Carryover TODO

本文支持但不解决以下 P1：

- P1-5｜summaryCandidateEngine candidate tag / feedbackTags registry 边界
- P1-7｜feedbackTag 语义边界与文案池扩容

后续仍需要：

- feedbackTag source of truth / registry / schema 设计
- feedbackTag mapping review pack
- feedback 文案池扩容和制作人 review

## 10. v0.0.7.43 feedbackTag mapping decision split

v0.0.7.43 新增 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md`，作为 feedbackTag mapping review split / source-of-truth precheck。

本轮结论保持本文边界：

- 该 report 不是 registry、enum、schema、validator input、generated data 或 runtime source-of-truth。
- 该 report 不批准任何 feedbackTag 进入 registry、validator、generated data、partial takeover、active takeover 或 runtime。
- `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`sweet_overload`、`bitterness_overload`、`texture_heavy`、`low_drinkability` 仍是 candidate / risk / rule-side 语义，不是 runtime feedbackTag。
- `identity_conflict` 仍是 candidate / risk tag，不是 feedbackTag，也不是 outcomeTypeId。
- `flavor_identity_conflict` 仍是当前 outcomeTypeId，不是 feedbackTag。
- `bubble_conflict` 仍保留气泡 + 厚重 / 口感冲突追评的窄语义，不泛化为 generic flavor identity conflict。
- future feedbackTag registry / source-of-truth 是后续单独任务；本轮不新增 registry / validator / generated data。

P1-5 / P1-7 仍未解决。
- validator 对 `feedbackTag` 字段的 reviewed source 检查
- generated feedback partial / active 接管前 audit

## 10. 新任务开工前检查清单

涉及 feedbackTag / candidate tag / generated feedback / severity feedback 字段的新任务，开工前必须检查：

- 是否读取了 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。
- 是否读取了 `docs/V0_0_7_MECHANISM_TODO.md`。
- 是否确认当前任务只是设计、review、validator、build、shadow、partial 或 active 中的哪一层。
- 是否要新增 tag；如果要新增，是否经过 source-of-truth gate。
- 是否要把 candidate / risk tag 写入 player-visible feedback 字段；如果是，必须停下 review。
- 是否要复用旧 runtime feedbackTag；如果是，必须确认语义没有被泛化。
- 是否会改变玩家最终 feedback；如果会，必须有制作人审核和 golden 记录。
