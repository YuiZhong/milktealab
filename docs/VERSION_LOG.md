# 版本记录

## minimal severity sample rows validator stub

本轮新增 `scripts/content/validateSeveritySampleRows.js`，作为 first 6 severity sample rows CSV / JSON examples 的最小 validator / lint stub。

该脚本支持 `content_sheets/examples/severity_sample_rows.sample.csv` 和 `content_sheets/examples/severity_sample_rows.sample.json`，检查 UTF-8 BOM、required fields、18 rows、已知 `proposedDraftId`、dangerous gates false、未批准 status、`scoreMultiplierDraft`、JSON metadata 和人类友好的 boundary warnings。

本轮未生成 generated severity，未接 shadow / runtime，未创建 schema / validator allowed values。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## severity sample rows example CSV / JSON

本轮新增 `content_sheets/examples/severity_sample_rows.sample.csv` 和 `content_sheets/examples/severity_sample_rows.sample.json`，基于 first 6 severity dry-run rows 提供人类可读的 planning examples。

这些 examples 不等于 generated severity、runtime data、official threshold table 或 official `scoreMultiplier` table。

本轮未实现 validator，未开放 generated severity / shadow / runtime，未改 runtime / core / data / generated / golden，未 push，未 tag。

## minimal severity validator stub planning round 1

本轮新增 `reports/human_review/minimalSeverityValidatorStubPlanning.round1.md`，规划 future 第一版 severity validator / lint stub 的输入、输出、CLI、退出码和人类友好报错格式。

本轮只规划未来 validator stub，不创建 scripts / CSV / JSON / schema / validator / generated data。

本轮未开放 generated severity / shadow / runtime，未改 runtime / core / data / generated / golden，未 push，未 tag。

## severity sample sheet CSV / JSON shape planning round 1

本轮新增 `reports/human_review/severitySampleSheetCsvJsonShapePlanning.round1.md`，规划 future severity sample sheet 如果落成 CSV / JSON，文件结构、字段分组、人类可读规则和 CSV -> JSON 转换边界应如何设计。

本轮只规划未来 CSV / JSON 文件形状，未创建 CSV / JSON / JS / schema / validator / generated data。

本轮未开放 generated severity / shadow / runtime，未改 runtime / core / data / generated / golden，未 push，未 tag。

## severity validator / lint planning round 1

本轮新增 `reports/human_review/severityValidatorLintPlanning.round1.md`，规划 future severity validator / lint 的 error / warning / info 检查。

本轮只规划未来防呆检查：阻止 dry-run rows 被误读为正式 threshold、正式 `scoreMultiplier`、正式 allowed values、generated severity 或 runtime data。

本轮未创建 scripts / CSV / JSON / schema / validator / generated data，未开放 generated severity / shadow / runtime。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## first 6 severity sample rows review record round 1

本轮新增 `reports/human_review/first6SeveritySampleRowsReview.round1.md`，记录用户 + ChatGPT 已接受 `first6SeveritySampleRowsDryRun.round1.md` 作为 planning dry-run checkpoint。

本轮确认 18 条 dry-run 示例行可作为 human-readable severity intuition / planning input，但它们仍不是正式 threshold、正式 `scoreMultiplier`、正式 feedback intensity 或 generated severity source。

本轮未创建 CSV / JSON / schema / validator / generated data，未填写正式 threshold / `scoreMultiplier` / feedback intensity。

本轮未开放 implementation / generated severity / shadow / runtime，未改 runtime / core / data / generated / golden，未 push，未 tag。

## first 6 severity sample rows dry-run round 1

本轮新增 `reports/human_review/first6SeveritySampleRowsDryRun.round1.md`，为第一批 6 个 `proposedDraftId` 试填 light / medium / heavy severity 示例行，用于验证 severity sample sheet shape 是否够用。

本轮所有 sample rows 都是 illustrative / draft / notApproved；示意 threshold 不是正式阈值，`scoreMultiplierDraft` 保持 blank / TBD，feedback intensity 也不是正式文案强度。

本轮未创建 CSV / JSON / schema / validator / generated data，未填写正式 threshold / `scoreMultiplier` / feedback intensity。

本轮未开放 implementation / batch content / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## candidate severity sample sheet shape round 1

本轮新增 `reports/human_review/candidateSeveritySampleSheetShape.round1.md`，规划 future severity sample sheet / Google Sheets / CSV 的人类可读表格形状。

本轮只规划人类可读区、身份与来源区、指标与数值区、评分 / 文案 / 偏好区、gate / review 区，帮助后续 first 6 severity sample rows dry-run 避免填表地狱。

本轮未创建 CSV / JSON / schema / validator / generated data，未填写正式 threshold / `scoreMultiplier` / feedback intensity。

本轮未开放 implementation / batch content / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## texture / mouthfeel boundary source-of-truth sedimentation

本轮将 `reports/human_review/triggerMetricDirectionReview.round1.md` 和 `triggerMetricDirectionReviewRecord.round1.md` 中已通过用户 + ChatGPT 审阅的 texture / mouthfeel 四类成熟主边界，极短沉淀进 `docs/TASTE_SYSTEM_DESIGN.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md`。

当前成熟边界为：固体小料负载、粉泥低流动性、奶脂油腻负担、糖浆胶质黏稠挂口。它们不能混成泛泛 `texture_overload`，但也不表示 texture 永远只有四类。

本轮未生成正式 triggerMetric / metric registry / schema / validator / generated data，未填写正式 numeric values / threshold / `scoreMultiplier`。

本轮未开放 implementation / batch content / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## triggerMetric direction review record round 1

本轮新增 `reports/human_review/triggerMetricDirectionReviewRecord.round1.md`，记录用户 + ChatGPT 接受 `triggerMetricDirectionReview.round1.md` 作为 planning checkpoint。

本轮记录 texture 四类边界通过：小料固体负载、粉泥低流动性、奶脂 / 奶盖 / 奶油油腻负担、糖浆 / 胶质黏稠挂口。

这些 direction 仍只是 planning direction，不是正式 triggerMetric、metric registry、schema、validator input 或 allowed values。

本轮未填写正式 numeric values / threshold / `scoreMultiplier`，未生成 generated severity，未开放 implementation / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## triggerMetric direction review round 1

本轮新增 `reports/human_review/triggerMetricDirectionReview.round1.md`，审阅第一批 6 个机制的 possibleMetricDirections 和 numeric summary / numeric load 方向。

本轮重点记录 texture 四类边界：固体小料负载、粉泥低流动性、奶脂 / 奶盖 / 奶油油腻负担、糖浆 / 胶质黏稠挂口。

奶脂油腻边界明确为“饮用流畅但油腻 / 恶心 / 奶脂压口 / 下咽负担”，不是吸不动，也不是八宝粥感或糖浆胶质黏稠。

本轮未生成正式 triggerMetric / metric registry / schema / validator / generated data，未填写正式 numeric values / threshold / `scoreMultiplier`。

本轮未开放 implementation / batch content / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## numeric-first profile / summary rule boundary

本轮将 `reports/human_review/candidateSeverityRuleSchemaReview.round1.md` 中已经验证清楚的 numeric-first boundary，极短沉淀进 `docs/TASTE_SYSTEM_DESIGN.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md`，并在 `docs/AI_CONTEXT.md` 加短导航。

底层 profile / summary / `triggerMetric` 应优先支持 numeric values / numeric load；中文档位或 high / medium / low 只作为 human-readable label / review hint，不作为正式计算主数据。

本轮未创建 CSV / JSON / schema / validator / generated severity，未填写正式 threshold / `scoreMultiplier`。

本轮未开放 implementation / batch content / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## candidate severity rule schema review round 1

本轮新增 `reports/human_review/candidateSeverityRuleSchemaReview.round1.md`，规划 future candidate severity rule / threshold table 的字段形状、中文解释、gate 边界和第一批 6 个概念的 metric / severity 方向。

本轮记录 numeric-first boundary：未来 severity rule 应优先读取数值型 triggerMetric / numeric summary，high / medium / low 或中文档位只作为 human-readable label / review hint，不作为正式计算主数据。

本轮只做 schema planning，不创建 CSV / JSON / JS / schema / validator / generated data。

本轮未填写正式 threshold / `scoreMultiplier` / feedback intensity，也未改变 final feedback / final result。

本轮未生成 stable ID / registry candidate / allowed values，未创建 registry / enum / schema / validator。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## registry candidate field split round 1

本轮新增 `reports/human_review/registryCandidateFieldSplit.round1.md`，将 future registry candidate row fields 分成 required / required-if-applicable / optional / machine-derived / report-only。

本轮新增中文字段速读 / 字段解释，避免未来制作人审核材料只有英文 key，也避免每条 row 都变成填表地狱。

本轮仍保留 source / legacy / anti-if / false gate 安全字段，但明确用户不需要手填机器字段。

本轮未创建 registry row / registry / enum / schema / validator / allowed values，未生成 stable ID / registry candidate。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## registry candidate proposal round 1

本轮新增 `reports/human_review/registryCandidateProposal.round1.md`，把第一批 6 个 accepted proposal wording 整理为 registry candidate proposal rows。

这些 rows 只是 proposal report，不是 approved stable ID、actual registry candidate source-of-truth 或 validator allowed values。

本轮未创建 registry / enum / schema / validator，未生成 allowed values，未填写正式 triggerMetric / 阈值 / `scoreMultiplier`。

本轮未开放 implementation / batch content / generated severity / generated feedback / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## registry candidate row shape planning round 1

本轮新增 `reports/human_review/registryCandidateRowShapePlanning.round1.md`，规划 future registry candidate row fields 和 false gates。

本轮只设计 row shape，不填第一批 6 个真实 registry candidate rows。

本轮未创建 registry row / registry / enum / schema / validator / allowed values，未生成 stable ID / registry candidate。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## draft ID proposal review round 1

本轮新增 `reports/human_review/draftIdProposalReview.round1.md`，记录用户 + ChatGPT 对 Draft ID Proposal Dry-Run Round 1 的审阅结论。

第一批 6 个 `proposedDraftId` 已接受为 proposal wording，可进入下一步 registry candidate row shape planning。

这些 proposal wording 不是 stable ID、registry candidate 或 validator allowed values。

本轮未创建 registry / enum / schema / validator，未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## astringency draft ID proposal wording fix

本轮修正 `reports/human_review/draftIdProposalDryRun.round1.md` 中涩感 / 收敛感过强的 `proposedDraftId`，从 `taste_astringent_overload` 改为 `taste_astringency_overload`。

这是命名 proposal 小修：`astringency` 更像“涩感 / 收敛感”这个机制 / 指标名词，`astringent` 更像形容词。

本轮不批准 stable ID，不创建 registry candidate，不生成 validator allowed values。

本轮未创建 registry / enum / schema / validator，未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## draft ID proposal dry-run round 1

本轮新增 `reports/human_review/draftIdProposalDryRun.round1.md`，在既有 guardrail 和 draft ID naming protocol 约束下，为第一批 6 个 structuring candidates 提出 `proposedDraftId`。

本轮 `proposedDraftId` 只用于用户 + ChatGPT review；它们不是 stable ID、registry candidate 或 validator allowed values。

本轮未创建 registry / enum / schema / validator，未生成 allowed values，未生成正式 triggerMetric，未填写正式阈值 / `scoreMultiplier`。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## reusable ID workflow AI context index

本轮在 `docs/AI_CONTEXT.md` 中补充 reusable ID / draft ID / registry workflow 的短索引。

新对话应复用 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 和现有 source-of-truth / registry planning，不从零重做 ID approval flow；`reports/human_review/draftIdNamingReviewProtocol.round1.md` 和 `reports/human_review/sourceOfTruthRegistryPlanning.round1.md` 只作为当前阶段证据 / 操作协议，不是 registry 或 allowed values。

本轮未生成 stable ID / draft ID / registry candidate，未创建 registry / enum / schema / validator，也未生成 allowed values。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## reusable ID workflow promoted to guardrail

本轮将 `reports/human_review/draftIdNamingReviewProtocol.round1.md` 中已经验证清楚、适合长期复用的流程原则，精简沉淀进 `docs/STABLE_ID_NAMING_GUARDRAIL.md`。

未来新增 / 修改 / 晋级 draft ID、registry candidate、validator allowed value 或 stable ID 前，必须复用既有 guardrail 和当前 source-of-truth / registry planning，先搜索 existing / legacy / observed ID，并判断 reuse / replace / migrate / deprecate / supersede / new candidate 等处理方向。

本轮明确不从零重做 ID approval flow；stage report 可以记录局部差异，但长期 ID / naming 规则应回到 L1 正本。

本轮没有生成 stable ID / draft ID / registry candidate，没有创建 registry / enum / schema / validator，也没有生成 allowed values。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## draft ID naming review protocol round 1

本轮新增 `reports/human_review/draftIdNamingReviewProtocol.round1.md`，记录未来 draft ID 命名审查流程。

本轮复用 v0.0.7.x stable ID / naming guardrail，不从零重做 ID approval flow；默认 prefix 倾向是 ID 第一个 segment 优先表达主导 `sourceLayer`，但 prefix 不替代 `sourceLayer` / `sourceSummary` / `triggerMetric` / evidence 等结构字段。

本轮记录 long-term candidates / not yet promoted 边界：v0.0.8 report 格式、round 编号和字段样例不自动升级为长期正本。

本轮极短补充 `docs/STABLE_ID_NAMING_GUARDRAIL.md`：未来新增 / 修改 ID 前必须复用既有 guardrail，并先搜索 existing / legacy / observed ID，避免重复造轮子。

本轮只做命名审查流程，未生成 stable ID / draft ID / registry candidate，未创建 registry / enum / schema / validator。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## source-of-truth / registry planning round 1

本轮新增 `reports/human_review/sourceOfTruthRegistryPlanning.round1.md`，记录后续 draft ID / registry candidate / validator 的 source-of-truth 前置规划。

本轮只规划 ID 来源、draft 晋级、registry candidate 层级和 validator 读取原则。

本轮未生成 stable ID / draft ID / registry candidate，未创建 registry / enum / schema / validator，也未生成 allowed values。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## first-batch structuring candidate plan

本轮新增 `reports/human_review/structuringCandidatePlan.round1.md`，记录第一批适合后续 structuring planning 的自然语言概念范围。

第一批候选为：甜度过载、酸度过载、苦味过载、涩感 / 收敛感、水泥感 / 粉泥感、八宝粥感。

本轮未生成 stable ID / draft ID / registry candidate，未形成 validator input、rule row、正式 triggerMetric、正式阈值或正式 `scoreMultiplier`。

本轮未开放 implementation / batch content / generated severity / takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## v0.0.8 concept review checkpoint update

本轮更新 `reports/human_review/v0.0.8ConceptReviewCheckpoint.md`，将 special sensation line 纳入当前 concept review checkpoint。

当前 texture / drinkability、flavor / structure、taste、special sensation 四条概念线均已到 approved concept list draft checkpoint。

本轮未生成 stable ID / draft ID / registry candidate，未形成 validator input 或 runtime data，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## special sensation approved concept list draft

本轮新增 `reports/human_review/approvedConceptList.specialSensation.round1.draft.md`，整理第一轮 special sensation sub-channel 的 approved concept list draft。

本轮草案包含 5 个 approved sub-channel concepts：辣感 / 灼辣感、麻感 / 震麻感、酒精灼烧 / 挥发刺激、清凉刺激、辛香刺激 / 香料压力。

本轮记录 C006 特殊刺激主题饮为 high-level / overlap / later review，不作为普通低风险机制候选进入本 round 的普通 approved list。

本轮未生成 stable ID / draft ID / registry candidate，未形成 validator input 或 runtime data，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## special sensation concept review round 1

本轮新增 `reports/human_review/specialSensationConceptReview.round1.md`，记录第一轮 special sensation sub-channel concept candidates 的制作人审核结果。

本轮记录 C001 辣感 / 灼辣感过强、C002 麻感 / 震麻感过强、C003 酒精灼烧 / 挥发刺激过强、C004 清凉刺激过强、C005 辛香刺激过强、C006 特殊刺激主题饮均保留为自然语言审核结果；其中 C006 标记为 high-level / overlap / later review，不作为低风险机制候选。

本轮未生成 stable ID / draft ID / registry candidate，未形成 approved concept list，未形成 validator input 或 runtime data。

本轮未开放 implementation / batch content / generated severity / generated feedback takeover / runtime takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## v0.0.8 concept review checkpoint

本轮新增 `reports/human_review/v0.0.8ConceptReviewCheckpoint.md`，汇总 texture / drinkability、flavor / structure、taste 三条基础概念线的 concept review checkpoint。

当前三条基础概念线均已到 approved concept list draft：texture 4 个概念，flavor / structure 5 个概念，taste 7 个 approved / revised concepts。

本轮仅记录 human review / planning checkpoint；未生成 stable ID / draft ID / registry candidate，未形成 validator input 或 runtime data。

本轮未开放 implementation / batch content / generated severity / generated severity shadow / partial / active takeover，未改 runtime / core / data / generated / golden，未 push，未 tag。

## taste approved concept list draft

本轮新增 `reports/human_review/approvedConceptList.taste.round1.draft.md`，整理第一轮 taste layer 的 approved concept list draft。

本轮草案包含 7 个 approved / revised concepts：饮品存在感过低、甜度过载、酸度过载、苦味过载、咸味过载、涩感 / 收敛感、基础味觉整体过载。

本轮记录 C007 特殊刺激过强不作为单一 approved concept，转为 umbrella / splitNeeded / later review；原 C005 从“咸甜失衡”修正为“咸味过载”。C004 / C006 标记 customerPreferenceSensitive，C008 标记 highRisk。

本轮未生成新 ID / draft ID / registry candidate，未形成 runtime data，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## taste stimulation concept boundary

本轮修正 `reports/human_review/tasteConceptReview.round1.md` 中 C007 特殊刺激过强的归档边界。

C007 现在标记为 umbrella / splitNeeded / later review，不作为单一机制直接进入 approved concept list。涩感 / 收敛感已由 C006 单独保留；辣感、麻感、酒精灼烧 / 挥发刺激等应作为未来子概念候选单独 review。

本轮未生成新 ID / draft ID / registry candidate，未形成 approved concept list，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## cross-layer customer preference principle

本轮补充 cross-layer customer preference / audience tolerance 设计原则。

未来顾客偏好可调节 taste / texture / flavor / structure / severity / feedback / score，不只接 taste。

本轮明确当前不创建 `customerTag` / `audienceId`，不实现顾客系统，不改 runtime / core / data / generated / golden。

本轮未生成新 ID / draft ID / registry candidate，未开放 implementation / batch content / generated severity / takeover，未 push，未 tag。

## taste concept review round 1

本轮新增 `reports/human_review/tasteConceptReview.round1.md`，记录第一轮 taste layer concept candidates 的制作人审核结果。

本轮记录 C001 / C002 / C003 / C004 / C006 / C007 / C008 keep，C005 revise to salty overload。

本轮记录 C004 / C006 / C007 future customer preference sensitivity；C008 high risk and must not include all flavor identity in taste overload。

本轮未生成新 ID / draft ID / registry candidate，未形成 approved concept list，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## global severity identity boundary

本轮补充 severity identity boundary 的跨层适用说明：水泥感 / 粉泥感只是示例，不是特例。

taste / texture / flavor / structure 的可分级事故都应通过 `severityLevel`、`scoreMultiplier`、feedback intensity 和 rule row 表达轻中重，不拆 `accidentTypeId`。

本轮未填写正式阈值 / 正式文案 / 正式 `scoreMultiplier`，未生成新 ID / draft ID / registry candidate，未形成 approved concept list。

本轮未改 runtime / core / data / generated / golden，未开放 implementation / batch content / generated severity / takeover，未 push，未 tag。

## flavor / structure approved concept list draft

本轮新增 `reports/human_review/approvedConceptList.flavorStructure.round1.draft.md`，整理 flavor / structure round 1 的 approved concept list draft。

本轮草案包含五个制作人已通过的自然语言概念：清爽感被厚重吞掉、强风味身份压制、风味身份错位、饮品类型承诺失败、风味主题过载。

本轮记录 C004 rejected，C006 / C008 reclassified to taste layer。

本轮未生成新 ID / draft ID / registry candidate，未形成 runtime data，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## flavor / structure concept review round 1

本轮新增 `reports/human_review/flavorStructureConceptReview.round1.md`，记录第一轮风味 / 饮品结构冲突 concept candidates 的制作人审核结果。

本轮记录 C001 / C002 / C003 / C005 / C007 keep，C004 reject，C006 / C008 reclassify to taste layer。

本轮未生成新 ID / draft ID / registry candidate，未形成 approved concept list，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## single-line workflow / Parking Lot

本轮补充单主线 / Parking Lot 协作节奏短规则：默认一条设计线尽量闭环后再开启下一条，相邻想法和新债务先进入 Parking Lot，除非明确阻塞当前线。

这是 docs navigation / planning alignment，不是 implementation，不生成新 ID，不开放 batch content、generated severity 或 takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## texture approved concept list draft

本轮新增 `reports/human_review/approvedConceptList.texture.round1.draft.md`，整理 texture / drinkability round 1 的 approved concept list draft。

本轮草案包含四个制作人已通过的自然语言概念：八宝粥感 / 固体小料负载过高、水泥感 / 粉泥感 / 低流动性、奶脂 / 奶盖 / 奶油油腻负担、胶粘感 / 胶质负担。

本轮记录 C003 / C008 合并或降级为表现线索，C006 rejected，C007 reclassified 到后续 flavor / structure conflict review。

本轮未生成新 ID / draft ID / registry candidate，未形成 runtime data，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## severity identity boundary

本轮将 texture concept review round 1 中确认的 severity 分级原则沉淀到机制正本 / 系统设计 / 架构 / stable ID guardrail。

当前原则：同一事故按 `triggerMetric` 数值区间、`severityLevel`、`scoreMultiplier` 和 feedback intensity 分轻中重，不拆 `accidentTypeId`。

本轮未生成新 ID / draft ID / registry candidate，未形成 approved concept list，未改 runtime / core / data / generated / golden，未开放 implementation / batch content / generated severity / takeover，未 push，未 tag。

## texture concept severity principle

本轮补充 `reports/human_review/textureConceptReview.round1.md` 的 severity / 表现强度原则：同一事故机制后续应通过 triggerMetric 数值区间、severityLevel、scoreMultiplier 和 feedback intensity 区分轻中重，而不是拆成多个 accidentTypeId。

本轮未生成新 ID / draft ID / registry candidate，未形成 approved concept list，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## texture concept review round 1

本轮新增 `reports/human_review/textureConceptReview.round1.md`，记录第一轮质地 / 可饮用性 concept candidates 的制作人审核结果。

本轮记录：C001 / C002 / C004 / C005 keep，C003 / C008 merge，C006 reject，C007 reclassify。

本轮未整理 approved concept list，未生成新 ID / draft ID / registry candidate，未开放 implementation / batch content / generated severity / takeover。

本轮未改 runtime / core / data / generated / golden，未 push，未 tag。

## concept review template

本轮新增 `reports/human_review/conceptReview.template.md`，作为自然语言 scenario / concept candidates 的制作人审批入口。

本轮只建立人类审批模板，未生成真实 concept，未生成新 ID / feedbackTag / triggerMetric / ingredient profile。

本轮未改 runtime / core / data / generated / golden，未开放 batch content / implementation / generated severity / takeover，未 push，未 tag。

## feedback shadow review output path alignment

本轮将 `scripts/content/buildFeedbackShadowReviewPack.js` 的默认输出路径迁到 `reports/human_review/feedbackShadowReview.sample.md`，与人类审批 / 制作人评审材料目录保持一致。

本轮只做 docs/tooling alignment，未改 runtime / core / data / generated / golden，未开放 implementation / batch content / generated severity / takeover，未 push，未 tag。

## human review reports organization

本轮新增 `reports/human_review/`，用于集中人类审批 / 制作人评审材料。

本轮移动 `reports/feedbackShadowReview.sample.md` 到 `reports/human_review/feedbackShadowReview.sample.md`，并修正 `docs/V0_0_8_PLANNING_TODO.md` 中 review pack sample 的事实定位。

`reports/human_review/**` 仍属于 review material，不是 source-of-truth，不是 runtime data，不能自动修改 golden expected，也不能接管 final feedback / final result。

本轮未改 runtime / core / data / generated / golden，未开放 implementation / batch content / generated severity / takeover，未 push，未 tag。

## v0.0.8 planning TODO established

本轮新建 `docs/V0_0_8_PLANNING_TODO.md`，登记为 v0.0.8.x planning TODO / active stage TODO。

这是 docs-only planning / docs alignment，不是 implementation，不是 formal release，不创建 candidate tag，也不创建 formal tag。

本轮只规划内容管线、review pack、approved concept list、draft ID、registry candidate、validator gate 和 traceability；不生成新 ID / feedbackTag / triggerMetric / ingredient profile，不做 batch content，不改 runtime / core / data / scripts / generated / golden。

P1 split accepted but not solved。`docs/V0_0_7_MECHANISM_TODO.md` 在 v0.0.8 planning 建立后降级为 previous stage material，仅作为债务迁移参考。

当前仍不开放 generated severity、generated severity shadow / partial / active takeover、generated feedback takeover 或 runtime takeover。

## v0.0.7.x docs-only closure checkpoint

本轮新增 `reports/v0.0.7ClosureCheckpoint.md`，作为 v0.0.7.x docs-only closure checkpoint。

本轮不创建 candidate tag，不创建 formal tag，不改 runtime，不改 data / scripts / generated / golden，不开放 v0.0.8.x，不开放 generated severity / takeover。

下一步仍需用户 + ChatGPT 决策：candidate / tag discussion、next-stage active TODO、final no-op verification，或 fresh conversation。

## v0.0.7.x closure checkpoint discussion report

本轮新增 `reports/v0.0.7ClosureCheckpointDiscussion.md`，作为 docs-only closure checkpoint / candidate discussion report。

本轮不创建 candidate tag，不创建 formal tag，不改 runtime，不改 data / scripts / generated / golden，不开放 v0.0.8.x，不开放 generated severity / takeover。

该记录只说明可以准备 closure checkpoint / candidate discussion，不表示已经 tag，不表示 P1 solved，也不表示 next-stage implementation 已开放。

## v0.0.7.x safe closure decision report

本轮新增 `reports/v0.0.7SafeClosureDecision.md`，记录 v0.0.7.x P0 docs rescue / P1 closure split / P1-8 final audit 后的 safe closure discussion / closure checkpoint preparation 结论。

这是 docs-only closure decision report，不是机制正本，不创建 candidate tag，也不创建 formal tag。

本轮未改 runtime，未改 data / scripts / generated / golden，未开放 v0.0.8.x，未开放 batch content，未开放 generated severity / generated severity shadow / partial / active takeover。Existing generated feedback shadow, if present, remains non-final and does not affect final feedback / final result。

该记录只表示可以准备 v0.0.7.x closure checkpoint / candidate discussion；不表示 P1 solved，也不表示 v0.0.8.x 开工。

## Batch Content Authoring Workflow guardrail

本轮在 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 新增长期 Batch Content Authoring Workflow guardrail，并在 `AGENTS.md` / `docs/AI_CONTEXT.md` 加短提醒。

这是 docs-only guardrail 小补丁，不生成新 ID，不生成新 content，不改 runtime，不改 generated data，不开放 v0.0.8.x，不创建 candidate tag / formal tag。

## v0.0.7.x closure audit P1 split report

本轮新增 `reports/v0.0.7ClosureAuditP1Split.md`，记录 v0.0.7.x closure audit mode 下 P1-1..P1-8 的分流结果。

这是 docs-only report，不是机制正本，不创建 candidate tag，也不创建 formal tag。

本轮未改 runtime，未开放 v0.0.8.x，未开放 generated severity / generated severity shadow / partial / active takeover。Existing generated feedback shadow, if present, remains non-final and does not affect final feedback / final result.

## v0.0.7.x closure audit mode transition

这是 docs-only state transition 记录，只说明当前 main 从 P0 docs recovery / pause mode 转入 v0.0.7.x closure audit mode；它不是机制正本，不创建 candidate tag，也不创建 formal tag。

当前状态：

- P0-A / P0-B / P0-C 已 resolved。
- 这不代表 v0.0.7.x 已安全 closure。
- 这不代表 P1 solved。
- 这不开放 v0.0.8.x。
- 这不开放 batch content、generated severity、generated severity shadow / partial / active takeover。
- Existing generated feedback shadow, if present, remains non-final and does not affect final feedback / final result.

下一步是 v0.0.7.x closure audit：对 P1 做“收口前必须给结论 / 迁移到下一阶段 TODO / 保留为 legacy / historical support / 明确不应现在处理”的分流。

当前机制正本仍以 `docs/TASTE_DECISION_MODEL.md` 为准；文档层级仍以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

## P0 docs rescue checkpoint after v0.0.7.81-candidate

这是版本流水 checkpoint，只记录 P0 docs rescue / source-of-truth recovery 已发生的 main 线文档整理，不是 candidate，不是正式 tag，也不是新的机制正本。

当前 latest pushed main 已到：

```text
10ab7b4 docs: record P0 rescue checkpoint
```

本轮没有创建 candidate tag，没有创建 formal tag。`v0.0.7.81-candidate` 仍是之前的 candidate tag，不在本 checkpoint 中改写。

当前仍不视为 v0.0.7.x 安全 closure，仍不开放 v0.0.8.x。本 checkpoint 不代表 batch content、generated severity、runtime takeover、shadow / partial / active takeover 开放。

P0 docs rescue 已完成以下 main commits：

```text
9d17f6d docs: recover P0 decision model sources
897b13c docs: define document source of truth
a9c4181 docs: add document inventory
6d89856 docs: add anti doc-hell principle
7d86b50 docs: clarify support document roles
26eba67 docs: mark v0.0.7 files as stage-bound
10ab7b4 docs: record P0 rescue checkpoint
```

简要作用：

- 建立 `docs/TASTE_DECISION_MODEL.md`，恢复判定模型正本。
- 瘦身 / 修正 `docs/AI_CONTEXT.md`，恢复导航页定位。
- 建立 `docs/DOCS_SOURCE_OF_TRUTH.md`，定义文档层级、冲突裁决、更新归属。
- 建立 `docs/DOCS_INVENTORY.md`，给 docs 文件建立库存索引。
- 加入文档单一职责 / 反 doc 地狱原则。
- 给 support docs 加 role header。
- 给 `V0_0_7_*` 阶段文件加 stage-bound header。
- 在 `docs/VERSION_LOG.md` 记录 P0 docs rescue checkpoint，不创建 candidate / formal tag。

当前机制正本仍以 `docs/TASTE_DECISION_MODEL.md` 为准；文档层级仍以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

## v0.0.7.81

本轮只做 docs-only mechanism closure / handoff，把 v0.0.7.x 机制阶段当前收口状态写入 report 和关键 docs，方便后续切换 fresh conversation 继续。

### 本轮新增 / 更新

- 新增 `reports/v0.0.7MechanismClosureHandoff.v0.0.7.81.md`
  - 明确 v0.0.7.x mechanism work can enter closure mode。
  - 列出 current valid artifacts，包括 scaffold、read-only check、v0.0.7.78 / v0.0.7.79 / v0.0.7.80 reports 和关键 docs。
  - 明确 batch accidentTypeId / feedbackTag / triggerMetric / ingredient profile / threshold / severity / score / review packs / validation pipeline / shadow tuning datasets / active validator / runtime takeover / generated severity takeover deferred 到后续 stage，likely v0.0.8.x or later，但不是 fixed release plan。
  - 明确 fresh conversation handoff：新对话应先读 `AI_CONTEXT` / `VERSION_LOG` / `V0_0_7_MECHANISM_TODO` / `STABLE_ID_NAMING_GUARDRAIL` / `V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN` / 本 report。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.80-candidate` 已冻结，并加入 v0.0.7.81 closure / handoff 短摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 v0.0.7.81 mechanism closure / handoff checkpoint。

### 阶段边界

- 本轮不改 code。
- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不生成 accidentTypeId / feedbackTag / triggerMetric / ingredient profile。
- 本轮不生成 profile、tag 或 allowed values。
- 本轮不创建 schema / validator。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.80

本轮只做 docs / guardrail consistency audit，审计 v0.0.7.x closure 相关正本文档是否一致，确认没有旧说法残留、边界漂移或 deferred 内容被写成当前阶段任务。

### 本轮新增 / 更新

- 新增 `reports/v0.0.7DocsGuardrailConsistencyAudit.v0.0.7.80.md`
  - 审计 `AI_CONTEXT` / `VERSION_LOG` / `V0_0_7_MECHANISM_TODO` / `STABLE_ID_NAMING_GUARDRAIL` / `V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN` / v0.0.7.78 route pivot report / v0.0.7.79 closure checklist / scaffold / read-only check。
  - 确认 v0.0.7.x scope、deferred batch content、scaffold boundary、read-only check boundary、Codex role boundary、v0.0.8.x wording、runtime / generated severity / shadow boundary、source-of-truth wording 无 blocking drift。
  - 记录 `AI_CONTEXT` 存在非阻塞状态漂移：仍把最新 candidate 写成 `v0.0.7.78-candidate`，并说 `v0.0.7.79-candidate` 未创建。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.79-candidate` 已冻结，并加入 v0.0.7.80 audit 短摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 v0.0.7.80 docs / guardrail consistency audit checkpoint。

### 阶段边界

- 本轮不改 code。
- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不生成 accidentTypeId / feedbackTag / triggerMetric / ingredient profile。
- 本轮不创建 schema / validator / allowed values。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.79

本轮只做 docs / report closure checklist，把 v0.0.7.x 后半段正式切入 closure mode，并列出进入 shadow 前必须守住的 pipeline boundary。

### 本轮新增 / 更新

- 新增 `reports/v0.0.7ClosurePreShadowChecklist.v0.0.7.79.md`
  - 明确 v0.0.7.x closure mode 聚焦 scaffold / read-only check / guardrail / pre-shadow entry gates。
  - 明确 v0.0.7.x 不继续批量内容生产。
  - 明确 batch accidentTypeId / feedbackTag / triggerMetric / ingredient profile / threshold / severity / score / review pack 延后到后续 batch-content stage，likely v0.0.8.x or later，但不是已确定发布计划。
  - 明确 Codex 不得自行生成机制概念。
  - 明确现有 `data/stableIdRegistry.js` / `scripts/content/checkStableIdRegistry.js` 仍有效，但不是 approved source-of-truth / active validator / runtime source。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.78-candidate` 已冻结，并加入 v0.0.7.79 closure / pre-shadow checklist 短摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 v0.0.7.x closure checklist / pre-shadow pipeline checklist checkpoint。
- 更新 `docs/STABLE_ID_NAMING_GUARDRAIL.md`
  - 增加 v0.0.7.x closure / pre-shadow boundary note。

### 阶段边界

- 本轮不改 code。
- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不生成 accidentTypeId / feedbackTag / triggerMetric / ingredient profile。
- 本轮不创建 schema / validator / allowed values。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.78

本轮只做 docs / report route pivot，把 v0.0.7.x 后半段从“继续批量内容生产”纠偏为“收好数值调整前链路、guardrail、scaffold / read-only check 样板和 pre-shadow checklist”。

### 本轮新增 / 更新

- 新增 `reports/v0.0.7ScopePivotBatchContentDeferred.v0.0.7.78.md`
  - 明确 v0.0.7.x 不继续批量生成 accidentTypeId / feedbackTag / triggerMetric / ingredient profile / threshold / severity / score 内容。
  - 明确 batch content generation 延后到后续 batch-content stage，likely v0.0.8.x or later，但不是已确定发布计划。
  - 明确 Codex 不得自行生成机制概念；概念设计、合并拆分和制作人判断应由 ChatGPT + 用户完成。
  - 明确 `data/stableIdRegistry.js` / `scripts/content/checkStableIdRegistry.js` 仍是有效样板，但不是 approved source-of-truth / active validator / runtime source。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.77-candidate` 已冻结，并加入 v0.0.7.78 scope pivot 短摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 v0.0.7.x scope pivot checkpoint。
- 更新 `docs/STABLE_ID_NAMING_GUARDRAIL.md`
  - 增加 batch content phase boundary guardrail。

### 阶段边界

- 本轮不改 code。
- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不生成 accidentTypeId / feedbackTag / triggerMetric / ingredient profile。
- 本轮不创建 schema / validator / allowed values。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.77

本轮只做 docs-only workflow pivot，把后续 stable ID 审查默认单位从“一个 ID 一个完整长流程”调整为“同层同类批量处理”。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.76-candidate` 已冻结，并加入 v0.0.7.77 workflow pivot 短摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 batch ID workflow pivot 小节。
- 更新 `docs/STABLE_ID_NAMING_GUARDRAIL.md`
  - 新增 Batch ID Workflow Guardrail。

### 新工作流原则

- 普通同层同类 ID 默认批量走 review / source notes / scaffold。
- 不再为普通 ID 重复 decision draft / source notes / candidate notes / readiness / preparation 全套长流程。
- 特殊高风险 ID 才单独审，例如可能诱导“一个原料一个事故 ID”、主观产品评价变机制 ID、displayName 主键回潮，或影响 runtime / generated severity / 存档的 ID。
- 示例 ID 只作为未来批量处理示例，不是本轮批准的 ID、scaffold entry 或 allowed values。

### 阶段边界

- 本轮不新增 report。
- 本轮不创建任何新 ID。
- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不创建 registry / schema / validator。
- 本轮不生成 allowed values。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.76

本轮只做 docs / readiness check，延续 v0.0.7.72-v0.0.7.75 的 `texture_low_drinkability` 边界、source notes 与 candidate notes record，判断它是否可以进入下一批 minimal scaffold preparation。

### 本轮新增 / 更新

- 新增 `reports/textureLowDrinkabilityReadinessCheck.v0.0.7.76.md`
  - 记录 `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
  - 记录 readiness 为 `ready_for_next_batch_scaffold_preparation_not_approval`。
  - 明确 `texture_solid_overload` = 八宝粥 / 小料太多。
  - 明确 `texture_straw_resistance` = 吸管很累，final decision 仍 pending。
  - 明确 `texture_taro_overload` / `texture_oreo_overload` 只作 historical evidence，不回流 current registry。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 `v0.0.7.75-candidate` 已冻结，并加入极短 v0.0.7.76 接续摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 `texture_low_drinkability` readiness check 小节。

### 阶段边界

- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不批准 `texture_low_drinkability`。
- 本轮不把 `texture_low_drinkability` 加入 scaffold。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.75

本轮只做 docs / candidate notes record，延续 v0.0.7.73 / v0.0.7.74 的 `texture_low_drinkability` candidate decision draft 与 source notes，把它整理成下一批 accidentTypeId candidate notes record。

### 本轮新增 / 更新

- 新增 `reports/textureLowDrinkabilityCandidateNotesRecord.v0.0.7.75.md`
  - 记录 `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
  - 记录 `candidateRecordStatus=candidate_notes_recorded_not_approved`。
  - 记录 sourceLayer 为 `texture`，sourceSummary 为 `textureSummary / structure texture summary`。
  - 记录 triggerMetric candidates：`drinkabilityPenalty` / `flowBreakdown` / `pasteLoad` / `sedimentLoad` / `powderSlurryLoad`。
  - 明确 `texture_taro_overload` / `texture_oreo_overload` 只作 historical migration evidence，不回流 current registry。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 `texture_low_drinkability` candidate notes record 小节。

### 阶段边界

- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不批准 `texture_low_drinkability`。
- 本轮不把 `texture_low_drinkability` 加入 scaffold。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.74

本轮只做 docs / source notes，延续 v0.0.7.72 / v0.0.7.73 的 texture drinkability boundary 与 candidate draft，为 `texture_low_drinkability` 补 source notes / triggerMetric notes / evidence boundary。

### 本轮新增 / 更新

- 新增 `reports/textureLowDrinkabilitySourceNotes.v0.0.7.74.md`
  - 记录 `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
  - 记录 sourceLayer draft 为 `texture`。
  - 记录 triggerMetric candidates：`drinkabilityPenalty` / `flowBreakdown` / `pasteLoad` / `sedimentLoad` / `powderSlurryLoad`。
  - 明确 `texture_taro_overload` / `texture_oreo_overload` 只作 historical evidence，不回流 current registry。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 `texture_low_drinkability` source notes 小节。

### 阶段边界

- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.73

本轮只做 docs / candidate decision draft，延续 v0.0.7.72 的 texture drinkability boundary 结论，判断 `texture_low_drinkability` 是否可以进入下一批 accidentTypeId candidate 草案。

### 本轮新增 / 更新

- 新增 `reports/textureLowDrinkabilityCandidateDecisionDraft.v0.0.7.73.md`
  - 记录 `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
  - 建议 `recommendedDecision=candidate_for_next_batch_after_boundary_notes`。
  - 明确它仍未 approved，仍未进入 scaffold，仍不能进入 validator / generated severity / runtime。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 `texture_low_drinkability` 下一批 candidate 判断小节。

### 阶段边界

- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不做 validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.72

本轮只做 docs / boundary report，切到 texture drinkability boundary review。

### 本轮新增 / 更新

- 新增 `reports/textureDrinkabilityBoundaryReview.v0.0.7.72.md`
  - 记录 `texture_solid_overload` = 八宝粥感 / 小料太多。
  - 记录 `texture_low_drinkability` = 水泥感 / 粉浆感 / 喝不动。
  - 记录 `texture_straw_resistance` = 吸管很累，暂作表现 / 指标 / 相邻机制。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短 texture boundary 摘要。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 texture drinkability boundary line 小节。

### 阶段边界

- 本轮不改 registry scaffold。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不把 `texture_low_drinkability` 加入 scaffold。
- 本轮不把 `texture_straw_resistance` 加入 scaffold。
- 本轮不改 runtime、data scripts、generated data、content sheets 或 golden expected。
- 本轮不做 validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.71

本轮执行 minimal registry read-only check hardening，只加强 `scripts/content/checkStableIdRegistry.js` 的只读检查能力，并同步极短 docs。

### 本轮新增 / 更新

- 更新 `scripts/content/checkStableIdRegistry.js`
  - 加强 entry 数量和允许 current ID 集合检查。
  - 加强 duplicate ID 检查。
  - 加强 required array fields / historicalLinks 检查。
  - 加强 `status` / `sourceLayer` / `idFamily` / canEnter hard false 检查。
  - 加强 historical texture old IDs 不能作为 current entry 的检查。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.7.71 是 read-only check hardening。
  - 记录 `v0.0.7.70-candidate` 已冻结，当前未创建 `v0.0.7.71-candidate`。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 accidentTypeId 第一批候选线处于阶段性收口后的 hardening 状态。

### 阶段边界

- 本轮不新增 registry entry。
- registry scaffold 仍只包含 `taste_acid_overload` / `texture_solid_overload`。
- 两项仍为 `reviewed_candidate_not_approved`。
- 两项 `canEnterValidator` / `canEnterGeneratedSeverity` / `canAffectRuntime` 仍为 `false`。
- 本轮不接 runtime，不生成 allowed values，不做 active validator。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不新增 review pack / sample pack / proposal pack。
- 本轮不改 runtime、generated data、content sheets 或 golden expected。
- 本轮不 push、不 tag。

## v0.0.7.70

本轮只做 docs-only closure checkpoint，确认 accidentTypeId 第一批候选线阶段性收口，并把后续工作转为“先选择下一条主线”。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.7.70 是 docs-only closure checkpoint。
  - 记录 accidentTypeId 第一批候选线阶段性收口。
  - 记录 `taste_acid_overload` / `texture_solid_overload` 已进入 scaffold，但仍为 `reviewed_candidate_not_approved`。
  - 记录两项 `canEnterValidator` / `canEnterGeneratedSeverity` / `canAffectRuntime` 仍为 `false`。
  - 记录当前未创建 `v0.0.7.70-candidate`。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 first-batch line closure checkpoint。
  - 明确后续不再为 `taste_acid_overload` / `texture_solid_overload` 新增 review pack / sample pack / proposal pack。
  - 明确 `texture_low_drinkability`、`texture_straw_resistance`、feedbackTag / candidateTag、drinkStructure、broader accidentAnalyzer route、generated severity、shadow / partial / active takeover 仍排队。

### 阶段边界

- 本轮只同步 docs。
- 本轮不改 runtime、data、scripts、generated data、content sheets 或 golden expected。
- 本轮不改 registry scaffold 或 check script。
- 本轮不新增 report。
- 本轮不创建 registry / schema / validator。
- 本轮不生成 allowed values。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

### 后续原则

- `taste_acid_overload` / `texture_solid_overload` 第一批候选子线阶段性收口。
- 不要继续给这两个 ID 套 review pack / sample pack / proposal pack。
- 下一步先开会选择下一条主线。

## v0.0.7.69

本轮是 post-v0.0.7.68 docs-only checkpoint sync，只把 `v0.0.7.68-candidate` 冻结后的真实状态同步进关键 docs，并记录 accidentTypeId 第一批候选线已经阶段性收口。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新确认 candidate 为 `v0.0.7.68-candidate`。
  - 同步最新确认 candidate commit 为 `c5443e2061a18c70c478bc9dfe15265b992d08e3`。
  - 记录 main / origin/main 已同步到该 commit。
  - 记录正式 tag `v0.0.7.68` 未创建，当前未创建 `v0.0.7.69-candidate`。
  - 记录 v0.0.7.68 minimal accidentTypeId registry scaffold 已冻结。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 新增 post-v0.0.7.68 checkpoint。
  - 记录 accidentTypeId 第一批候选线阶段性收口。
  - 记录 `taste_acid_overload` / `texture_solid_overload` 已进入 minimal registry scaffold，但仍为 `reviewed_candidate_not_approved`。
  - 记录 `texture_low_drinkability`、feedbackTag / candidate tag、drinkStructure、broader accidentAnalyzer route、reviewed registry / schema task、active validator / generated severity / shadow / partial takeover 仍未完成 / 排队。

### 阶段边界

- 本轮只同步 docs。
- 本轮不改 runtime、data、scripts、generated data、content sheets 或 golden expected。
- 本轮不改 `data/stableIdRegistry.js`。
- 本轮不改 `scripts/content/checkStableIdRegistry.js`。
- 本轮不创建 registry 新内容。
- 本轮不实现 validator。
- 本轮不生成 allowed values。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

### 下一步提醒

- v0.0.7.68-candidate 已冻结，accidentTypeId 第一批候选线已经阶段性收口。
- 后续需要先开会整理“当前主线还剩什么”和“下一条主线怎么排”。
- 不要继续自动新增 review pack / sample pack / proposal pack。
- 不要把 current scaffold 直接升级为 approved registry、active validator 或 allowed values。

## v0.0.7.68

本轮执行 minimal accidentTypeId registry scaffold，第一次创建极小 registry draft 与只读 check script，但仍不进入 runtime / active validator / generated severity。

### 本轮新增 / 更新

- 新增 `data/stableIdRegistry.js`
  - 只包含 accidentTypeId family。
  - 只收录 `taste_acid_overload` 和 `texture_solid_overload`。
  - 两个 entry 的 `status` 均为 `reviewed_candidate_not_approved`。
  - 两个 entry 的 `canEnterValidator` / `canEnterGeneratedSeverity` / `canAffectRuntime` 均为 `false`。
  - 未加入 `texture_low_drinkability`。
  - historical texture old IDs 不作为 current entry；`texture_topping_overload` 只作为 `texture_solid_overload` 的 historical link note。
- 新增 `scripts/content/checkStableIdRegistry.js`
  - 只读检查 `data/stableIdRegistry.js` 的 required fields、允许 ID 集合和 hard forbidden conditions。
  - 不生成 allowed values。
  - 不接 runtime、generated severity、content sheets 或 collector output。
  - 不是 active validator。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.68 minimal accidentTypeId registry scaffold 已创建。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未完全解决，scaffold / check script 不是 approval / schema / active validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.67-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只创建最小 accidentTypeId registry scaffold 和只读检查脚本。
- 本轮不创建 JSON schema。
- 本轮不生成 allowed values。
- 本轮不实现 active validator。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 boundary / exclusion / grep 语境。
- 本轮不处理 feedbackTag / candidateTag / outcomeTypeId / drinkStructure。
- 本轮不处理 durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 core、index.html、现有 runtime data 逻辑、generated data、content sheets 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不 push、不 tag。

## v0.0.7.67

本轮执行 minimal accidentTypeId registry / schema task specification，只把 v0.0.7.66 的 task plan 收束成下一步如果真正实现最小 registry / schema 时的任务规格。

### 本轮新增 / 更新

- 新增 `reports/minimalAccidentTypeRegistrySchemaSpecification.v0.0.7.67.md`
  - 只围绕 `taste_acid_overload` 和 `texture_solid_overload`。
  - 明确本轮是 implementation task specification，不是 implementation。
  - 规格化未来 implementation 可讨论的最小文件边界，例如 `data/stableIdRegistry.js` 和 `scripts/content/checkStableIdRegistry.js`，但本轮不创建这些文件。
  - 定义 future registry entry 最小字段、两个 future candidate entries、future read-only check script specification、future validation commands 和 forbidden implementation expansion。
  - 明确 `texture_low_drinkability` 仍是 explicit exclusion / Not This Round，本轮不处理。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.67 minimal accidentTypeId registry / schema task specification 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，task specification 不是 approval / registry / schema / validator / check script / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.66-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / task specification。
- 本轮不创建 registry / enum / schema / validator / check script。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit exclusion / boundary 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.66

本轮执行 minimal registry / schema task plan，只把 v0.0.7.65 已准备好的两个 accidentTypeId candidate 接入未来 reviewed registry / schema task 的任务边界设计。

### 本轮新增 / 更新

- 新增 `reports/minimalRegistrySchemaTaskPlan.v0.0.7.66.md`
  - 只围绕 `taste_acid_overload` 和 `texture_solid_overload`。
  - 定义未来 reviewed registry / schema task 的最小 scope、candidate intake requirements、future task shape、gate、validator boundary 和 anti-bloat rule。
  - 明确 future validator 只能读取 reviewed registry / schema，不能读取本 report、collector output、sample sheets、generated observations、docs prose、review pack / sample pack / proposal pack rows 作为 allowed values。
  - 明确下一步不应继续为这两个 ID 新增 review pack / sample pack / proposal pack，而应进入 minimal accidentTypeId registry / schema task specification。
  - 明确 `texture_low_drinkability` 仍是 explicit exclusion / Not This Round，本轮不处理。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.66 minimal registry / schema task plan 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，task plan 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.65-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / task plan。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit exclusion / boundary 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.65

本轮执行 minimal accidentTypeId registry candidate preparation，只把已经完成 source index / readiness review 的两个 accidentTypeId 整理成后续 reviewed registry / schema task 可接收的最小候选材料。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdRegistryCandidatePreparation.v0.0.7.65.md`
  - 只处理 `taste_acid_overload` 和 `texture_solid_overload`。
  - 将两项 preparationStatus 记录为 `candidate_preparation_ready_for_reviewed_registry_task_not_approval`。
  - 复用 v0.0.7.59-v0.0.7.64 的 decision record、source notes、candidate notes record、minimal gate、candidate record 和 source index 结论。
  - 明确两项仍缺 final triggerMetric name、explicit evidence refs / golden refs、producer / ChatGPT confirmation 和后续 reviewed registry / schema task。
  - 明确下一步应进入 reviewed registry / schema task plan，而不是继续新增 review pack / sample pack / proposal pack。
  - 明确 `texture_low_drinkability` 仍是 explicit exclusion / Not This Round，本轮不处理。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.65 candidate preparation 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，candidate preparation 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.64-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / preparation。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit exclusion / boundary 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.64

本轮执行 first-batch accidentTypeId source index / readiness review，只为已经进入 first-batch future registry candidate record 的两个 accidentTypeId 整理 source index 和 readiness 状态。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdFirstBatchSourceIndex.v0.0.7.64.md`
  - 只处理 `taste_acid_overload` 和 `texture_solid_overload`。
  - 将两项 readiness 记录为 `ready_for_minimal_registry_candidate_preparation_not_approval`。
  - 汇总两项已有 sourceLayer / sourceSummary / triggerMetric candidates / evidence / boundary notes。
  - 明确仍缺 final triggerMetric name、explicit evidence refs / golden refs、producer / ChatGPT confirmation 和后续 reviewed registry / schema task。
  - 明确 `texture_low_drinkability` 仍是 explicit exclusion / Not This Round，本轮不处理。
  - 明确 historical texture old IDs 不回流 current registry / validator / generated severity / runtime。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.64 source index / readiness review 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，source index 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.63-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / source index / readiness review。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit exclusion / boundary 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.63

本轮执行 minimal accidentTypeId registry candidate record，只把已经通过 minimal candidate gate 的两个 accidentTypeId 记录为 first-batch future registry candidates。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdRegistryCandidateRecord.v0.0.7.63.md`
  - 只处理 `taste_acid_overload` 和 `texture_solid_overload`。
  - 将两项 candidateRecord 记录为 `first_batch_future_registry_candidate_not_approved`。
  - 明确 `texture_low_drinkability` 是 explicit non-candidate / Not This Round，本轮不处理。
  - 明确 historical texture old IDs 不回流 current registry / validator / generated severity / runtime。
  - 建议下一刀继续做 source index / readiness review，不直接进入 validator。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.63 candidate record 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，candidate record 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.62-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / candidate record。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit non-candidate / Not This Round 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / industrial creamer / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.62

本轮执行 minimal accidentTypeId registry candidate gate design，只定义两个 first-batch accidentTypeId candidate 进入 future registry candidate 前的最小 gate。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdRegistryCandidateGate.v0.0.7.62.md`
  - 只评估 `taste_acid_overload` 和 `texture_solid_overload`。
  - 定义 Minimal Gate Checklist：机制可复用、sourceLayer / sourceSummary / triggerMetric notes、evidence allowed / blocked、boundary notes、hard no gates。
  - 将两项 gate result 记录为 `passes_minimal_candidate_gate_with_notes`。
  - 明确 `texture_low_drinkability` 是 explicit non-pass / boundary context，本轮不处理。
  - 明确 historical texture old IDs 不回流 current registry / validator / generated severity / runtime。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.62 gate design 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，gate design 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.61-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / gate design。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 explicit non-pass / boundary 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.61

本轮执行 accidentTypeId first-batch candidate notes record，把 v0.0.7.60 的 source notes 收束为后续 registry candidate gate 可审查的 candidate notes record。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdFirstBatchCandidateNotesRecord.v0.0.7.61.md`
  - 只处理 `taste_acid_overload` 和 `texture_solid_overload`。
  - 将两项记录为 `candidateRecordStatus=candidate_notes_recorded_not_approved`。
  - 继续明确 `taste_acid_overload` 是 taste-layer acid pressure，酸味原料只能作为 evidence，不拆 ingredient-specific accidentTypeId。
  - 继续明确 `texture_solid_overload` 是 texture-layer solid load / low liquid support，具体小料只能作为 evidence / notes / feedback copy，不拆 topping-specific accidentTypeId。
  - 明确 `texture_low_drinkability` 只在 boundary / Not This Round 语境出现，本轮不处理。
  - 明确 historical `texture_topping_overload` 不回流 current registry / validator / generated severity input。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.61 candidate notes record 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，candidate notes record 不是 approval / registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.60-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / candidate notes record。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 boundary / Not This Round 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.60

本轮执行 accidentTypeId first-batch source notes sync，只给两个 first-batch candidate 补 source notes / triggerMetric notes / evidence boundary。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdFirstBatchSourceNotes.v0.0.7.60.md`
  - 只处理 `taste_acid_overload` 和 `texture_solid_overload`。
  - 为 `taste_acid_overload` 补充 `sourceLayer=taste`、`sourceSummary=tasteSummary`、`triggerMetricDraft=acidity / acidLoad / future acidPressure` 以及 acidic ingredient evidence 边界。
  - 为 `texture_solid_overload` 补充 `sourceLayer=texture`、`sourceSummary=textureSummary / structure texture summary`、`triggerMetricDraft=solidLoad / textureRatio / liquidSupport / lowLiquidSupport` 以及 topping / solid-load evidence 边界。
  - 明确 `texture_low_drinkability` 只在 boundary / Not This Round 语境出现，本轮不处理。
  - 明确 historical `texture_topping_overload` 只作为 pre-v0.0.7.49 legacy reference，不回流 current registry / validator / generated severity input。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.60 source notes sync 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，source notes 不是 registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.59-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / source notes sync。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 `texture_low_drinkability`，除了 boundary / Not This Round 语境。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.59

本轮执行 accidentTypeId first-batch decision record，把 v0.0.7.58 的 producer / ChatGPT decision draft 收束为更明确的人类可读决策记录。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdFirstBatchDecisionRecord.v0.0.7.59.md`
  - 只处理三个 accidentTypeId：`taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload`。
  - 记录 `taste_acid_overload` 的 decisionRecord 为 `first_batch_candidate_pending_source_notes`。
  - 记录 `texture_solid_overload` 的 decisionRecord 为 `first_batch_candidate_pending_source_notes`。
  - 记录 `texture_low_drinkability` 的 decisionRecord 为 `boundary_notes_required_before_first_batch_candidate`。
  - 明确 `canEnterValidatorNow` / `canEnterGeneratedSeverityNow` / `canAffectRuntimeNow` 均为 hard `no`。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.59 decision record 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，decision record 不是 registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.58-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / decision record。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不让任何 accidentTypeId 进入 validator、generated severity 或 runtime。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.58

本轮执行 accidentTypeId first-batch decision draft，只围绕三个最稳事故机制整理第一批 future registry candidate 的人工决策草案。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdFirstBatchDecisionDraft.v0.0.7.58.md`
  - 只处理三个 accidentTypeId：`taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload`。
  - 将 v0.0.7.55 review pack 和 v0.0.7.57 notes review 收束为 producer / ChatGPT decision draft。
  - 推荐 `taste_acid_overload` 为 `candidate_for_future_registry_after_notes`。
  - 推荐 `texture_low_drinkability` 为 `needs_boundary_notes_before_candidate`。
  - 推荐 `texture_solid_overload` 为 `candidate_for_future_registry_after_notes`。
  - 明确 `canEnterValidatorNow` / `canEnterGeneratedSeverityNow` / `canAffectRuntimeNow` 均为 hard `no`。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.58 decision draft 已完成。
  - 继续明确 P1-1 / P1-2 / P1-3 / P1-4 未解决，decision draft 不是 registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.57-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / producer decision draft。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不处理 feedbackTag / drinkStructure / durian / dairy / strong flavor / straw resistance final decision。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.57

本轮执行 accidentTypeId likely-stable notes review，只从已有 accidentTypeId review pack 中挑三个最稳的事故机制候选做 source notes / boundary notes / decision-prep。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdLikelyStableNotesReview.v0.0.7.57.md`
  - 只覆盖三个 likely-stable accidentTypeId 候选：`taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload`。
  - 为三项分别补充 sourceLayer、sourceSummary、triggerMetric 候选、evidence 边界、相邻机制区别和 remaining gate。
  - 明确 `taste_acid_overload` 是 taste pressure，不按 lemon / hawthorn / passionfruit 等证据拆 ID。
  - 明确 `texture_low_drinkability` 覆盖喝不动 / 糊 / 堵 / 流动性崩语境，historical `texture_taro_overload` / `texture_oreo_overload` 不回流 current registry。
  - 明确 `texture_solid_overload` 覆盖小料太多 / 固体负载 / 液体支撑不足语境，historical `texture_topping_overload` 不回流 current registry。
  - 增加 Cross-ID Boundary Table 和 Human Review Questions。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.57 notes review 已完成。
  - 继续明确 notes review 不是 registry / schema / validator / allowed values，不批准任何 accidentTypeId。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.56-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / notes review / decision-prep。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不把 `taste_acid_overload` / `texture_low_drinkability` / `texture_solid_overload` 写成已批准 stable。
- 本轮不让 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 回流 current registry / validator / generated severity input。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.56

本轮执行 feedbackTag / candidate tag registry candidate review pack，只把 feedbackTag、candidate tag、risk tag、copy direction 和 outcomeTypeId 边界整理成可人工审查材料。

### 本轮新增 / 更新

- 新增 `reports/feedbackTagCandidateReviewPack.v0.0.7.56.md`
  - 定义 review pack 内部 tag layer legend，例如 `runtime_observed_feedbackTag`、`generated_observed_feedbackTag`、`candidate_risk_tag`、`copy_direction_candidate`、`outcomeTypeId_not_feedbackTag`、`blocked_as_feedbackTag`、`needs_producer_copy_review`、`needs_copy_pool_expansion`、`needs_mapping_review`。
  - 增加 candidate review table，覆盖 runtime observed feedbackTags：`bubble_conflict`、`greasy_overload`、`straw_disaster`、`straw_followup`。
  - 增加 candidate / risk / copy direction rows：`aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`。
  - 增加 outcomeTypeId boundary row：`flavor_identity_conflict`。
  - 增加 human review questions by tag、recommended grouping 和 recommended next slice。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.56 review pack 已完成。
  - 继续明确 P1-5 / P1-7 未解决，review pack 不是 registry / schema / validator / allowed values。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.55-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / review pack。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 feedbackTag、candidateTag、risk tag、copy direction 或 outcomeTypeId。
- 本轮不把 `flavor_identity_conflict` 写成 feedbackTag。
- 本轮不把 `identity_conflict` 写成 outcomeTypeId 或 runtime feedbackTag。
- 本轮不把 `bubble_conflict` 泛化为 generic flavor identity conflict。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html、feedback 文案池或 golden expected。
- 本轮不做 generated feedback active takeover。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.55

本轮执行 accidentTypeId registry candidate review pack，只把 accidentTypeId 候选项整理成可人工审查材料。

### 本轮新增 / 更新

- 新增 `reports/accidentTypeIdRegistryCandidateReviewPack.v0.0.7.55.md`
  - 定义 review pack 内部审查状态，例如 `keep_candidate_for_review`、`likely_approve_after_notes`、`keep_runtime_legacy_with_notes`、`special_mechanism_candidate`、`split_review_needed`、`historical_only`、`blocked_from_current_registry`。
  - 增加 accidentTypeId candidate review table，覆盖 `taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload`、`flavor_durian_overload`、`dairy_fat_overload`、`industrial_creamer_overload`、`taste_strong_flavor_overload`、`texture_straw_resistance` 以及 historical texture old IDs。
  - 增加 human review questions by ID，明确每个候选项需要制作人 / ChatGPT 审查的 sourceLayer、triggerMetric、producer semantics 和 registry 风险。
  - 把候选项分成 likely stable after notes、runtime review / source notes、special / producer review、split review、historical only 等后续工作包。
  - 推荐下一刀可考虑 accidentTypeId registry producer review decisions，或更保守的 accidentTypeId likely-stable notes review；不建议直接实现 validator。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.55 review pack 已完成。
  - 继续明确 review pack 不是 registry / schema / enum / allowed values / validator input，不批准任何 accidentTypeId。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.54-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / review pack。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 accidentTypeId，也不把任何 ID 写成 `approved_stable`。
- 本轮不把 `texture_low_drinkability` / `texture_solid_overload` 写成已批准 stable。
- 本轮不让 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 回流 current registry / validator / generated severity input。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.54

本轮执行 stable ID registry entry sample pack，只把 v0.0.7.53 的 registry shape proposal 应用到少量可审查样例行。

### 本轮新增 / 更新

- 新增 `reports/stableIdRegistryEntrySamplePack.v0.0.7.54.md`
  - 定义 sample entry format，覆盖 `id`、`idFamily`、`proposedStatus`、`currentRuntimeObserved`、`sourceLayer`、`sourceSummary`、`triggerMetric`、`provenance`、`historicalSince`、`replacedBy`、`reviewStatus`、`reviewRequiredBefore`、`canEnterValidator`、`canEnterGeneratedSeverity`、`canAffectRuntime`、`blockedFrom`、`notes`、`humanReviewQuestion`。
  - 增加 accidentTypeId sample entries，例如 `texture_low_drinkability`、`texture_solid_overload`、historical texture old IDs、`flavor_durian_overload`、`dairy_fat_overload`、`texture_straw_resistance`。
  - 增加 outcomeTypeId sample entry：`flavor_identity_conflict`。
  - 增加 feedbackTag / candidateTag sample entries：`bubble_conflict`、`aroma_pressure`、`identity_conflict`。
  - 增加 human review questions、lessons 和 recommended next slice。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.54 sample pack 已完成。
  - 继续明确 sample pack 不是 registry / schema / validator / allowed values，不批准任何 ID。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.53-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / sample pack。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 ID、feedbackTag、candidateTag、accidentTypeId、outcomeTypeId、ruleId 或 triggerMetric。
- 本轮不把 `texture_low_drinkability` / `texture_solid_overload` 写成 `approved_stable`。
- 本轮不让 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 回流 current validator / generated severity input。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.53

本轮执行 reviewed stable ID registry shape proposal，只把 source-of-truth 设计转成可审查的 registry shape 报告。

### 本轮新增 / 更新

- 新增 `reports/stableIdRegistryShapeProposal.v0.0.7.53.md`
  - 提出未来 registry entry common fields。
  - 提出 status vocabulary，例如 `approved_stable`、`runtime_observed_requires_review`、`runtime_review_candidate`、`historical_legacy_reference`、`draft_only`、`generated_only`、`candidate_only`。
  - 按 ID family 拆分未来 registry row shape。
  - 增加 accidentTypeId proposal slice，区分 current observed generalized IDs、runtime review candidates、historical migrated texture old IDs、structure rule observed IDs、generated / sample / golden observations。
  - 增加 feedbackTag proposal slice，继续区分 runtime observed feedbackTag、generated feedbackTag、candidate / risk tag、sample draft tag 和 future reviewed feedbackTag。
  - 说明 future validator 只能读取 reviewed registry / schema；collector output 只能作为 drift warning / evidence。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.53 proposal 已完成。
  - 继续明确该 report 不创建 registry / schema / validator，不批准任何 ID。
- 更新 `docs/AI_CONTEXT.md`
  - 同步最新已冻结 candidate 到 `v0.0.7.52-candidate`。
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / report / proposal。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不批准任何 ID、feedbackTag、accidentTypeId、outcomeTypeId 或 ruleId。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.52

本轮执行 P1 TODO post-source-of-truth review，只复盘 v0.0.7.51 后 P1-1 到 P1-8 的真实剩余状态。

### 本轮新增 / 更新

- 新增 `reports/p1TodoReview.v0.0.7.52.md`
  - 逐项复盘 P1-1 到 P1-8。
  - 明确 P1 标题保留不等于所有 P1 都从零未做。
  - 明确前置审计 / guardrail / report / 局部 migration 完成不等于 final gate solved。
  - 建议把剩余工作合并为 reviewed registry shape proposal、accidentAnalyzer broader route review、feedbackTag / candidate tag source-of-truth、drinkStructureAnalyzer displayName staged plan、validator / generated severity / shadow / partial takeover chain。
  - 推荐下一刀优先考虑 reviewed registry shape proposal，但不写成已决定。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 增加 v0.0.7.52 P1 review 结果引用。
  - 继续明确 P1 未完全解决，不复制整份 report。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要。

### 阶段边界

- 本轮只做 docs / review / planning。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.51

本轮执行 source-of-truth / registry / schema design docs，只设计边界，不落地实现。

### 本轮新增 / 更新

- 更新 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
  - 增加 v0.0.7.51 source-of-truth / registry / schema design update。
  - 明确 observed ≠ approved。
  - 明确 runtime observed、golden expected、generated data observation、sample sheet draft、review pack item、collector observed row 都不是 approved stable source。
  - 明确 collector output 只能作为 observed evidence / drift check，不是 registry、validator input 或 allowed values generator。
  - 明确已迁出的 `texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload` 只能作为 historical / pre-version legacy reference，不是 current active runtime ID、current registry ID、generated severity input 或 validator allowed current ID。
  - 明确 `flavor_durian_overload`、`dairy_fat_overload`、`industrial_creamer_overload`、`taste_strong_flavor_overload`、`texture_straw_resistance` 是 runtime / mechanism review candidate 语境，不是 definite migration target 或 final registry entry。
  - 明确 feedbackTag / candidate tag 边界，尤其 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty` 不能自动成为 runtime feedbackTag / registry feedbackTag。
  - 设计 future registry file shape 和 future validator read order，但不创建任何文件。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 v0.0.7.51 source-of-truth design 接入 P1-2 和后续路线。
  - 继续明确 registry / schema / validator 尚未创建。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要，不写长流水账。

### 阶段边界

- 本轮只做 docs / design。
- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不生成 stable ID registry。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不新增 accidentTypeId、outcomeTypeId、feedbackTag、ruleId。
- 本轮不改 runtime、data、scripts、generated data、content sheets、index.html 或 golden expected。
- P1-2 仍未完全解决；source-of-truth design 已更新，但 registry / schema / validator 尚未落地。
- 本轮不跑 golden。
- 本轮不 push、不 tag。

## v0.0.7.50

本轮执行 collector historical wording cleanup，只清理 collector / source 文案入口，不做 source-of-truth design。

### 本轮新增 / 更新

- 更新 `scripts/content/collectStableIdSources.js`
  - 将 `texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload` 从 current migration candidate 语气中移出。
  - 明确三者只应作为 historical / pre-version legacy reference。
  - 明确三者不是 current active runtime ID，不应进入 current registry、validator、generated severity input 或 runtime takeover decision。
- 更新 `reports/stableIdSourceCollector.sample.md`
  - 重新生成 collector sample report，使 High-risk boundary reminders 与脚本一致。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 collector / source 文案入口清理已完成。
  - 继续明确 P1-4 broader accidentAnalyzer migration route 仍未解决。
- 更新 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
  - 补充 v0.0.7.50 cleanup 关系说明。
- 新增 `reports/sourceCollectorHistoricalCleanup.v0.0.7.50.md`
  - 记录搜索范围、修改文件、旧 ID historical 定位和本轮不解决事项。
- 更新 `docs/AI_CONTEXT.md`
  - 只加入极短接续摘要，不写长流水账。

### 阶段边界

- 本轮不创建 registry / enum / schema / validator。
- 本轮不生成 allowed values。
- 本轮不做 generated severity / shadow / partial / active takeover。
- 本轮不新增 accidentTypeId、outcomeTypeId、feedbackTag、ruleId。
- 本轮不改 runtime、data、generated data、content sheets、index.html 或 golden expected。
- P1-4 仍未完全解决。
- golden samples 23/23 passed。
- 本轮不 push、不 tag。

## docs: sync AI_CONTEXT after v0.0.7.49 candidate

本轮只同步 `docs/AI_CONTEXT.md` 当前状态到 `v0.0.7.49-candidate`。

- 最新 candidate：`v0.0.7.49-candidate`
- candidate commit：`8aee7f400f70e50a6de09987b12269f28cd44613`
- main / origin/main 已同步到该 commit。
- golden samples 当前为 `23/23 passed`。
- 正式 tag `v0.0.7.49` 未创建。
- 当前未推进 `v0.0.7.50`。
- 三步 texture content-specific staged migration 已完成：
  - `texture_taro_overload` -> `texture_low_drinkability`
  - `texture_oreo_overload` -> `texture_low_drinkability`
  - `texture_topping_overload` -> `texture_solid_overload`
- P1-4 broader accidentAnalyzer migration route 仍未解决；source-of-truth / registry / schema / validator / generated severity / shadow / partial takeover 仍未完成。
- 本轮不改 runtime、data、scripts、generated data、content sheets、golden expected 或 reports。
- 本轮不 push、不 tag。

## v0.0.7.49

本轮执行 `texture_topping_overload` -> `texture_solid_overload` actual migration，小步只迁 topping overload loop。

### 本轮新增 / 更新

- 更新 `core/accidentAnalyzer.js`
  - 将 topping ratio > 45 loop 输出从 `texture_topping_overload` 改为 `texture_solid_overload`。
  - 从 active texture accident set 中移除 `texture_topping_overload`。
  - 保留原触发条件 `ratio > 45`。
  - 保持原 `score`、`cap`、`type`、`add`、`note` 不变。
  - 珍珠 / 芋圆 / 布丁 / 仙草 / 椰果等具体小料名和“吸管体能测试”解释仍保留在玩家可见 note / feedback copy 方向，不写进 accidentTypeId。
- 更新 `data/goldenSamples.js`
  - 新增 `topping_solid_overload_migration`，专门保护 topping branch 输出 `texture_solid_overload`。
  - 继续保护具体小料名、吸管、体能测试和小料过量方向。
- 更新 `index.html`
  - 页面版本更新到 `v0.0.7.49`。
  - 更新 `core/accidentAnalyzer.js` cache-busting query。
- 新增 `reports/textureToppingMigration.v0.0.7.49.md`
  - 记录 before / after ID、保持不变项、golden sample 变化、未新增 topping-specific if / selector，以及旧 ID 的 historical 定位。

### 阶段边界

- 本轮只迁 `texture_topping_overload`。
- 本轮不回头改 taro / Oreo。
- 本轮不新增 `texture_topping_specific_overload`、`texture_pearl_overload`、`texture_eight_treasure_overload` 或任何按小料拆分的 texture accidentTypeId。
- 本轮不新增 topping-specific if / 文案 selector。
- 本轮不开 registry / enum / schema / validator。
- 本轮不做 generated severity build / partial takeover / active takeover。
- 本轮不改 generated feedback data、content sheets 或 scripts。
- P1-4 仍未完全解决；texture content-specific staged migration 三步已完成，但 accidentAnalyzer broader migration route、source-of-truth / registry / schema、validator / generated severity / shadow / partial takeover gates 仍未解决。
- golden samples 23/23 passed。
- 本轮不 push、不 tag。

## v0.0.7.48

本轮新增 mechanism ID restraint / display boundary guardrail docs。

### 本轮新增 / 更新

- 更新 `docs/STABLE_ID_NAMING_GUARDRAIL.md`
  - 补充机制 ID 节制原则：机制 ID 不应为单个组合、recipe、golden sample、文案梗、制作人备注或 review pack item 单独创建。
  - 明确机制 ID 应表达可复用机制大类，具体性应放在 evidence、sourceIngredientIds、triggerMetric、sourceLayer、ruleId、sampleId、feedback copy、review pack 或 notes。
  - 补充 mechanism ID / player display boundary：`accidentTypeId` 是内部机制身份，`type` 是玩家展示 / 语气分类，`feedback` 是具体解释和个性文案。
  - 明确同一个 `accidentTypeId` 下玩家可见 `type` 不要求强制统一；玩家展示差异不能反向污染 mechanism ID。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 v0.0.7.48 guardrail 纳入 P1-4、后续路线和新任务检查清单。
  - 记录 collector / source 文案里的已迁出旧 ID cleanup 待办：`texture_taro_overload` / `texture_oreo_overload` 后续应以 historical / migration history / legacy reference 语气保留，避免误读为 current active runtime ID。
- 更新 `docs/AI_CONTEXT.md`
  - 仅补充短摘要和当前 candidate 状态，不复制完整 guardrail 正文。

### 阶段边界

- 本轮只改 docs。
- 不改 runtime、data、scripts、generated data、content sheets、golden expected 或 UI。
- 不迁 `texture_topping_overload`。
- 不新增 `accidentTypeId` / registry / enum / schema / validator。
- 不做 generated severity / partial takeover / active takeover。
- P1-4 仍未完全解决，topping 仍是 current runtime legacy fact。
- 本轮不 push、不 tag。

## v0.0.7.47

本轮执行 `texture_oreo_overload` -> `texture_low_drinkability` actual migration，小步只迁 Oreo 分支。

### 本轮新增 / 更新

- 更新 `core/accidentAnalyzer.js`
  - 将 Oreo crumble ratio > 40 分支输出从 `texture_oreo_overload` 改为 `texture_low_drinkability`。
  - 从 active texture accident set 中移除 `texture_oreo_overload`。
  - 保留原触发条件 `oreo > 40`。
  - 保持原 `score`、`cap`、`type`、`add`、`note` 不变。
  - Oreo “粉渣 / 沉积 / 吸管开采 / 甜品矿层”个性仍保留在玩家可见 note / feedback copy 方向，不写进 accidentTypeId。
- 更新 `data/goldenSamples.js`
  - 新增 `oreo_low_drinkability_migration`，专门保护 Oreo branch 输出 `texture_low_drinkability`。
  - 保留 `oreo_overload_texture_accident` 的原有宽口感事故保护，不把该样本误用为 Oreo branch 主事故断言。
  - 继续保护 Oreo 玩家可见解释中 “奥利奥 / 吸管 / 矿层 / 甜品 / 开采” 方向。
  - 不降低既有 score / type / feedback 断言强度。
- 更新 `index.html`
  - 页面版本更新到 `v0.0.7.47`。
  - 更新 `core/accidentAnalyzer.js` cache-busting query。
- 新增 `reports/textureOreoMigration.v0.0.7.47.md`
  - 记录 before / after ID、保持不变项、golden sample 变化、未迁 topping 的原因，以及旧 ID 的 historical 定位。

### 阶段边界

- 本轮只迁 `texture_oreo_overload`。
- 本轮不迁 `texture_topping_overload`。
- 本轮不新增 `texture_paste_overload`、`texture_sediment_overload`、`texture_topping_specific_overload` 或任何按原料拆分的 texture accidentTypeId。
- 本轮不新增 Oreo-specific if / 文案 selector。
- 本轮不开 registry / enum / schema / validator。
- 本轮不做 generated severity build / partial takeover / active takeover。
- 本轮不改 generated feedback data、content sheets 或 scripts。
- P1-4 仍未完全解决，topping 仍是 legacy runtime fact。
- golden samples 22/22 passed。
- 本轮不 push、不 tag。

## v0.0.7.46

本轮执行 `texture_taro_overload` -> `texture_low_drinkability` actual migration，小步只迁芋泥分支。

### 本轮新增 / 更新

- 更新 `core/accidentAnalyzer.js`
  - 将 taro paste ratio > 50 分支输出从 `texture_taro_overload` 改为 `texture_low_drinkability`。
  - 从 active texture accident set 中移除 `texture_taro_overload`。
  - 保留原触发条件 `taro > 50`。
  - 保持原 `score`、`cap`、`type`、`add`、`note` 不变。
  - 芋泥“糊 / 墙面 / 水泥感”仍保留在玩家可见 note / feedback copy 方向，不写进 accidentTypeId。
- 更新 `data/goldenSamples.js`
  - 新增 `taro_low_drinkability_migration`，专门保护 taro branch 输出 `texture_low_drinkability`。
  - 保留 `solid_taro_low_liquid` 的吸管阻力优先级保护，不把该样本误用为 taro branch 主事故断言。
  - 不降低既有 score / type / feedback 断言强度。
- 更新 `index.html`
  - 页面版本更新到 `v0.0.7.46`。
  - 更新 `core/accidentAnalyzer.js` cache-busting query。
- 新增 `reports/textureTaroMigration.v0.0.7.46.md`
  - 记录 before / after ID、保持不变项、golden sample 变化、未迁 Oreo / topping 的原因，以及旧 ID 的 historical 定位。

### 阶段边界

- 本轮只迁 `texture_taro_overload`。
- 本轮不迁 `texture_oreo_overload` / `texture_topping_overload`。
- 本轮不新增 `texture_paste_overload`、`texture_sediment_overload`、`texture_topping_specific_overload` 或任何按原料拆分的 texture accidentTypeId。
- 本轮不开 registry / enum / schema / validator。
- 本轮不做 generated severity build / partial takeover / active takeover。
- 本轮不改 generated feedback data 或 content sheets。
- P1-4 仍未完全解决，Oreo / topping 仍是 legacy runtime facts。
- golden samples 21/21 passed。
- 本轮不 push、不 tag。

## docs: sync AI_CONTEXT after v0.0.7.45

本轮只同步 `docs/AI_CONTEXT.md` 的当前状态快照。

- 当前最新 candidate 更新为 `v0.0.7.45-candidate`。
- 补充 v0.0.7.30-v0.0.7.45 的压缩接续摘要。
- 明确下一步是 `v0.0.7.46｜texture_taro_overload -> texture_low_drinkability actual migration`。
- 本轮不改 runtime、data、scripts、content_sheets、generated data 或 golden expected。
- 本轮不推进 v0.0.7.46。
- 本轮不 push、不 tag。

## v0.0.7.45

本轮新增 texture content-specific accident migration target plan。

### 本轮新增 / 更新

- 新增 `reports/textureContentAccidentMigrationPlan.v0.0.7.45.md`
  - 记录 `texture_taro_overload` future target 为 `texture_low_drinkability`。
  - 记录 `texture_oreo_overload` future target 为 `texture_low_drinkability`。
  - 记录 `texture_topping_overload` future target 为 `texture_solid_overload`。
  - 明确芋泥、奥利奥和具体小料个性应保留在 evidence / notes / feedback copy，不写进 future `accidentTypeId`。
  - 明确不新增 `texture_paste_overload`、`texture_sediment_overload`、`texture_topping_specific_overload` 或任何按原料拆分的 texture accidentTypeId。
- 更新 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
  - 记录 v0.0.7.45 report 与 legacy inventory 的关系。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 v0.0.7.45 report 纳入 P1-4 与后续建议路线。
  - 记录推荐 staged order：先 taro，再 Oreo，最后 topping。
  - 继续明确 P1-4 未解决，后续仍需 actual migration task、golden review、feedback review、generated reference audit 和 docs / reports 更新。

### 阶段边界

- 本轮只做 docs / report / impact audit。
- 不改 runtime、data、scripts、content_sheets、generated data、reports 既有文件或 golden expected。
- 不新增 registry / enum / schema / validator。
- 不新增 generated data。
- 不迁移任何 `accidentTypeId`。
- 不批准任何 `accidentTypeId` 进入 registry、validator、generated data、partial takeover、active takeover 或 runtime。
- 不改变玩家最终 score、accident、feedback、drinkType 或 `result.type`。
- P1-4 仍未解决。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.44

本轮新增 accidentAnalyzer legacy accident migration decision split report。

### 本轮新增 / 更新

- 新增 `reports/accidentAnalyzerMigrationDecisionSplit.v0.0.7.44.md`
  - 基于 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`，拆分 legacy accidentAnalyzer / accident rules / structure rules 中的事故迁移方向。
  - 将 `flavor_durian_overload` / `industrial_creamer_overload` 记录为特殊机制候选，但仍需 source notes、制作人 review 和 future source-of-truth 设计。
  - 将 `texture_taro_overload` / `texture_oreo_overload` / `texture_topping_overload` 记录为未来 generalized texture / structure migration candidate，不按原料继续扩散 accidentTypeId。
  - 将 `dairy_fat_overload` 记录为保留 legacy observed ID，但底层解释应钉为 texture / mouthfeel / `fatLoad` / greasy pressure。
  - 将 `taste_strong_flavor_overload` 记录为 split review item，不能因 `taste_` 前缀直接归 taste layer，也不能直接映射到 `aroma_pressure` feedbackTag。
  - 将 `taste_acid_overload`、`texture_low_drinkability`、`texture_solid_overload` 记录为 data-driven but needs notes。
  - 将 legacy texture dedupe fallback 记录为 compatibility-only，不作为未来扩展方向。
- 更新 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
  - 记录 v0.0.7.44 report 与 legacy inventory 的关系。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 v0.0.7.44 report 纳入 P1-4 与后续建议路线。
  - 继续明确 P1-4 未解决，后续仍需 producer review、source-of-truth / registry design、shadow / golden review 和 staged migration plan。

### 阶段边界

- 本轮只做 docs / report / migration decision split。
- 不改 runtime、data、scripts、content_sheets、generated data、reports 既有文件或 golden expected。
- 不新增 registry / enum / schema / validator。
- 不迁移任何 `accidentTypeId`。
- 不批准任何 `accidentTypeId` 进入 registry、validator、generated data、partial takeover、active takeover 或 runtime。
- 不改变玩家最终 score、accident、feedback、drinkType 或 `result.type`。
- P1-4 仍未解决。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.43

本轮新增 feedbackTag mapping decision split / source-of-truth precheck report。

### 本轮新增 / 更新

- 新增 `reports/feedbackTagMappingDecisionSplit.v0.0.7.43.md`
  - 拆分 runtime-observed feedbackTag、generated / shadow feedbackTag、candidate / risk tag、rule-side semantics 和 sample draft tag。
  - 为制作人提供 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`bubble_conflict`、`greasy_overload`、`straw_disaster` 等 review item。
  - 明确 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`sweet_overload`、`bitterness_overload`、`texture_heavy`、`low_drinkability` 仍是 candidate / risk / rule-side 语义，不是 runtime feedbackTag。
  - 明确 `bubble_conflict` 保持气泡 + 厚重 / 口感冲突追评的窄语义，不泛化为 generic flavor identity conflict。
  - Decision Split Table 中 `canEnterRegistry` / `canEnterValidator` / `canEnterGeneratedData` / `canAffectRuntime` 均为硬否定 `no`。
- 更新 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
  - 记录 v0.0.7.43 report 与既有 mapping design 的关系。
  - 继续明确 future feedbackTag registry / source-of-truth 是后续单独任务。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 v0.0.7.43 report 纳入 P1-5 / P1-7 和后续路线。
  - 继续明确 P1-5 / P1-7 未解决，不能提前推进 validator / generated / partial takeover。

### 阶段边界

- 本轮只做 docs / report / mapping precheck。
- 不新增 registry / enum / schema / validator。
- 不新增 generated data。
- 不改 runtime、data、content_sheets、generated feedback data、scripts、reports 既有文件或 golden expected。
- 不批准任何 feedbackTag 进入 registry、validator、generated data、partial takeover、active takeover 或 runtime。
- 不改变玩家最终 score、feedback、accident、drinkType 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.42

本轮补充 v0.0.7.41 迁移后的 outcome / candidate tag / feedbackTag 边界说明。

### 本轮新增 / 更新

- 更新 `docs/V0_0_7_ID_INVENTORY.md`
  - 记录 `flavor_identity_conflict` 是当前 `outcomeTypeId`，由 v0.0.7.41 从 legacy `taste_conflict` 迁移而来。
  - 记录 `identity_conflict` 仍是 candidate / risk tag，不是 runtime feedbackTag，也不是 outcomeTypeId。
  - 记录 `bubble_conflict` 仍是窄语义 runtime observed feedbackTag，语义偏气泡 + 厚重 / 口感冲突追评，不泛化为 flavor identity conflict。
  - 记录 legacy `taste_conflict` 只应作为 pre-v0.0.7.41 / historical outcomeTypeId 出现。
- 更新 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
  - 补充 future outcome source-of-truth 应以 `flavor_identity_conflict` 为当前值，legacy `taste_conflict` 只能作为历史 note。
  - 明确 validator 不能因为字符串相似性把 `flavor_identity_conflict`、`identity_conflict`、`bubble_conflict` 或 legacy `taste_conflict` 混成同一层 ID。
- 更新 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
  - 补充 `flavor_identity_conflict` 不是 feedbackTag，`identity_conflict` 不是 feedbackTag，`bubble_conflict` 不能自动成为该 outcome 的默认文案标签。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.42 已完成 post-migration boundary notes。
  - 继续明确 P1-1 / P1-5 / P1-7 仍未完全解决。

### 阶段边界

- 本轮只做 docs / guardrail notes。
- 不新增 registry / enum / schema / validator。
- 不改 runtime、data、content_sheets、generated feedback data、reports、scripts 或 golden expected。
- 不改变玩家最终 score、feedback、accident、drinkType 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.41

本轮执行 `taste_conflict` -> `flavor_identity_conflict` one-shot migration。

### 本轮新增 / 更新

- 更新 `core/tasteJudge.js`
  - 将“口感冲突”最终 `outcomeTypeId` 从 legacy `taste_conflict` 迁移为 `flavor_identity_conflict`。
  - 不改玩家可见中文文案，不改 score、accident priority 或 drinkType 逻辑。
- 更新 `data/goldenSamples.js`
  - 将相关 golden expected 的 `outcomeTypeIdIncludes` 改为 `flavor_identity_conflict`，未删除样本，未弱化断言。
- 更新 feedback content sheets 与 generated feedback data
  - 从 `content_sheets/examples/feedback_texts.sample.csv` / `.json` 更新 source row，再重建 `data/generated/feedbackTexts.generated.json` / `.js`。
  - `bubble_conflict` 仍只表示气泡 + 厚重 / 口感冲突追评，不泛化为 generic flavor identity conflict。
- 更新 `content_sheets/examples/candidate_severity_rules.sample.csv` / `.json`
  - disabled draft `flavor_identity_conflict_outcome_draft` 的 `outcomeTypeId` 改为 `flavor_identity_conflict`。
  - 样例仍 disabled / draft，不进入 runtime。
- 更新 `scripts/content/checkFeedbackRuntimeAdapter.js`
  - adapter check 改查 `flavor_identity_conflict` outcome 文案，未弱化结构断言。
- 更新当前事实 docs / reports
  - 将当前 source-of-truth 说明迁移到 `flavor_identity_conflict`。
  - 保留 v0.0.7.39 / v0.0.7.40 报告中的 `taste_conflict` 历史记录，但明确标注为 legacy / pre-v0.0.7.41 / historical。

### 阶段边界

- 本轮不新增 registry / enum / schema / validator。
- 不做 partial / active takeover。
- 不把 `identity_conflict` 变成 runtime feedbackTag。
- 不把 `bubble_conflict` 泛化为 flavor identity conflict。
- 不改 score 机制、事故优先级、drinkType 逻辑、sampleId 或 feedbackTag 语义。
- P1-1 / P1-5 / P1-7 仍未完全解决。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。
- feedback adapter / generated data / JSON / JS / CSV BOM 检查通过。

## v0.0.7.40

本轮新增 AI-generated ID / tag naming decision split 与 `taste_conflict` 迁移影响审计。

### 本轮新增 / 更新

- 新增 `reports/aiGeneratedIdTagNamingDecisionSplit.v0.0.7.40.md`
  - 基于 v0.0.7.39 正式 naming review pack，记录制作人 / ChatGPT decision split。
  - 将 14 个 review item 拆成已给方向判断、仍需制作人 review、可先处理 notes / source-of-truth、需要 migration plan、暂时 do_not_promote 等类别。
  - 记录特殊机制保留与泛化迁移边界：榴莲 / 植脂奶可作为未来特殊高记忆点机制，芋泥 / 奥利奥 / 小料过载不应长期按原料拆 `accidentTypeId`。
  - 记录 `dairy_fat_overload` 的 legacy observed ID 边界：玩家语义可理解为奶脂过载 / 油腻负担，底层优先按 texture / mouthfeel / fatLoad / greasy pressure 理解。
  - 记录 candidate / risk tag 与 runtime feedbackTag 边界：`aroma_pressure`、`identity_conflict` 等不能直接进入玩家文案选择，`bubble_conflict` 不得泛化为 generic flavor identity conflict。
  - 只读审计 `taste_conflict` -> `flavor_identity_conflict` 迁移影响面，覆盖 runtime、golden、generated data、content_sheets、adapter check、docs 和 reports 引用。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.40 已形成 decision split / migration impact audit。
  - 明确 `taste_conflict` -> `flavor_identity_conflict` 是倾向迁移，不是已迁移。
  - 明确后续若实际迁移，必须单独开任务并同时保护 runtime、golden、generated data、content_sheets、checks、docs 和 reports 引用。
  - 继续明确 P1-1 / P1-5 / P1-7 仍未完全解决，validator 顺序不能提前。

### 阶段边界

- 本轮只做 docs / report / audit。
- 不实际迁移 `taste_conflict`。
- 不新增 registry / enum / schema / validator。
- 不新增 generated data。
- 不改 runtime、data、content_sheets 或 golden expected。
- 不批准任何 ID / tag / rule 进入 registry / validator / generated data / runtime。
- 不改变玩家最终 score、feedback、accident、drinkType 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.39

本轮新增正式 AI-generated ID / tag naming review pack。

### 本轮新增 / 更新

- 新增 `reports/aiGeneratedIdTagNamingReviewPack.v0.0.7.39.md`
  - 基于 v0.0.7.38 proof 结构，整理正式 AI / Codex ID / tag / rule / sample / candidate / source 字段命名复审材料。
  - 覆盖 accidentTypeId、outcomeTypeId、drinkTypeId、feedbackTag / candidate tag / risk tag、textId、sampleId、ruleId / draftId、candidateId、priorityBand、severityHint、severityLevel、sourceLayer / sourceSummary / triggerMetric、profile / structure / displayName dependency。
  - 人类审核区在前，机器详情在后；包含 Executive Summary、Human Review Zone、ChatGPT Technical Review Zone、Decision Summary、Machine Appendix、Gate Impact 和 What This Report Does NOT Do。
  - 明确该 report 不是 registry、enum、schema、validator input、generated data 或 runtime source-of-truth。
  - 明确不批准任何 ID / tag / rule，不允许任何条目进入 runtime / generated data / validator / registry / partial takeover / active takeover。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.39 已形成正式 naming review pack。
  - 明确 P1-1 仍未解决，仍待用户 / ChatGPT decision、migration plan、source-of-truth / registry design。

### 阶段边界

- 本轮只做 review pack / docs。
- 不新增 registry / enum / schema / validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets 或 golden expected。
- 不重命名任何 ID / tag / rule。
- 不改变玩家最终 score、feedback、accident、drinkType 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.38

本轮新增 AI-generated ID / tag naming review pack proof。

### 本轮新增 / 更新

- 新增 `reports/aiGeneratedIdTagReviewPack.sample.md`
  - 作为 AI / Codex 生成或沿用的 ID / tag / rule / sample / candidate / source 字段命名复审 proof。
  - 覆盖 `flavor_durian_overload`、`extreme_lemon_accident`、`aroma_pressure`、`bubble_conflict`、`texture_dairy_fat_load_draft`、`dairy_fat_overload` + `sourceLayer=texture` / `triggerMetric=fatLoad`、`hard_physical`、`baseLiquidNames` / `item.name` 等代表性风险项。
  - 分成制作人 / ChatGPT 速读区、技术复查区、决策汇总区和机器附录。
  - 明确 report 不批准任何 ID / tag / rule，不是 registry、enum、schema、validator input、generated data 或 runtime source-of-truth。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 记录 v0.0.7.38 已新增 AI-generated ID / tag naming review pack proof。
  - 明确 P1-1 仍未解决，后续仍需正式 ID / naming 审计、review decision、migration plan 或 source-of-truth 设计。

### 阶段边界

- 本轮只做 report proof / docs。
- 不执行实际全量 ID 审计。
- 不重命名任何现有 ID，不新增 stable ID / tag / rule；`AIRP-*` 仅为 review pack 内部 `reviewItemId`。
- 不新增 registry / enum / schema / validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets、scripts 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.37

本轮新增 `drinkStructureAnalyzer` displayName Set inventory / migration plan。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_DRINK_STRUCTURE_DISPLAYNAME_INVENTORY.md`
  - 只读盘点 `core/drinkStructureAnalyzer.js` 中的中文显示名 Set：`baseLiquidNames`、`flavorNames`、`textureNames`、`sweetenerNames`。
  - 记录 `item.name -> getTasteProfile`、displayName-keyed taste / base profile fallback、`ingredientMeta.category` 中文 category、`data/ingredientTextureProfiles.js` displayName-keyed profiles 等迁移风险。
  - 补充相邻依赖：`tasteJudge` 的中文 category count、`drinkTypeAnalyzer` 的 primary tea displayName logic、`drinkTypeRules` 的 legacy ingredient text fallback。
  - 明确当前未发现 `drinkStructureAnalyzer` 直接使用 `zhCN`、regex / substring 中文匹配，且任务中提到的 `data/ingredientPhysicalProfiles.js` 当前不存在；实际 texture profile 来源是 `data/ingredientTextureProfiles.js`。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 drinkStructure displayName inventory 接入 P1-6 与 gate。
  - 明确 v0.0.7.37 只是 inventory / migration plan，P1-6 仍未解决。

### 阶段边界

- 本轮只做 docs / inventory / migration plan。
- 不改 `core/drinkStructureAnalyzer.js`。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、golden expected。
- 不新增 registry / schema / enum。
- 不实现 validator。
- 不改变玩家最终 score、feedback、accident、drink type 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.36

本轮新增 mechanism review pack proof / sample report。

### 本轮新增 / 更新

- 新增 `reports/mechanismReviewPack.sample.md`
  - 作为 mechanism / generated output review pack 的第一版样例 proof。
  - 覆盖 legacy accidentAnalyzer item、feedbackTag / candidate tag boundary、candidate severity sample draft row、source collector observed item 和 golden sampleId 风险项。
  - 将内容分成 Human Review Zone、ChatGPT Technical Review Zone、Decision Summary、Machine Appendix。
  - 每个 item 都有独立 review block、provenance、technical review 和 decision summary。
  - 明确 report 本身不是 registry、validator input、generated data、source-of-truth 或 runtime approval。
- 更新 `docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md`
  - 记录 v0.0.7.36 sample proof 的定位和边界。
  - 继续明确 generator script 是后续任务。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 mechanism review pack proof 纳入后续路线。
  - 明确 P1 未解决，validator 仍不能提前把未审清的 Codex 生成内容合法化。

### 阶段边界

- 本轮只做 sample report / docs。
- 不实现 generator script。
- 不生成 JSON review data。
- 不新增 registry / schema / enum。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets、scripts、golden expected。
- 不批准任何 ID / tag / rule。
- 不改变玩家最终 score、feedback、accident、type 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.35

本轮新增 mechanism / generated output review pack gate design。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_MECHANISM_REVIEW_PACK_GATE_DESIGN.md`
  - 设计 Codex 生成机制内容 / generated output 进入 registry、validator、generated data、runtime、partial takeover 前的审查出口。
  - 明确 review pack 结构为 Human Review Zone、ChatGPT Technical Review Zone、Decision Summary、Machine Appendix。
  - 设计制作人审核字段、技术审查字段、provenance / traceability 字段、decision 字段、machine appendix 字段、gate rules、itemType 草案和 reviewStatus / issue tag 草案。
  - 明确没有 provenance / traceability 的条目不得进入 source-of-truth。
  - 明确 candidate severity sheet validator 不能早于 review pack gate。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 mechanism / generated output review pack gate 加入 v0.0.7.x gate 和后续路线。
  - 继续明确 P1 未解决，validator 仍在后面，不应提前把未审清的 Codex 生成内容合法化。

### 阶段边界

- 本轮只做 docs / gate design。
- 不新增 review pack generator script。
- 不生成 sample review pack report。
- 不新增 registry / schema / enum。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、golden expected。
- 不批准任何 ID / tag / rule。
- 不改变玩家最终 score、feedback、accident、type 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.34

本轮新增 accidentAnalyzer legacy mapping inventory。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`
  - 只读整理当前 accident flow、legacy accident inventory、ID / mechanism naming risk、migration category proposal、validator / severity sheet implications 和 review pack / human audit implications。
  - 覆盖 `dairy_fat_overload`、`industrial_creamer_overload`、`texture_taro_overload`、`texture_oreo_overload`、`texture_topping_overload`、`taste_strong_flavor_overload`、`texture_straw_resistance` 等 legacy accidentAnalyzer 分支。
  - 同步记录 rule engine / structure rule 相关事故，如 `taste_acid_overload`、`flavor_durian_overload`、`texture_low_drinkability`、`texture_solid_overload`，以及 legacy texture dedupe fallback。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 P1-4 连接到 `docs/V0_0_7_ACCIDENT_ANALYZER_LEGACY_INVENTORY.md`。
  - 明确 inventory 只是只读 mapping / planning input，不代表 P1-4 已解决，也不等于 runtime 迁移许可。

### 阶段边界

- 本轮只做 docs / inventory。
- 不改 `core/accidentAnalyzer.js`。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、golden expected。
- 不新增 registry / enum / schema。
- 不实现 validator。
- 不重命名现有 ID。
- 不改变玩家最终 score、feedback、accident、type 或 `result.type`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.33

本轮新增 feedbackTag registry / candidate tag mapping design。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`
  - 设计 runtime feedbackTag、generated feedbackTag、summary candidate / risk tag、rule tag、sample draft tag 与 future reviewed feedbackTag 的分层边界。
  - 覆盖 `aroma_pressure`、`identity_conflict`、`low_beverage_fit`、`savory_identity`、`texture_sediment`、`novelty`、`bubble_conflict`、`acid_accident`、`greasy_overload`、`straw_disaster` 等重点 tag 的当前观察层级和风险。
  - 明确 candidate / risk tag 不能自动成为 runtime feedbackTag；rule tag 不能自动成为 feedbackTag；sample draft tag 不能进入 registry / generated / runtime。
  - 明确 `bubble_conflict` 不能泛化到 generic flavor identity conflict，`aroma_pressure` 当前不能作为 runtime 文案池 feedbackTag 使用。
  - 设计 future feedbackTag registry / schema / mapping check / producer review report 的文件形态，但本轮不创建。
- 更新 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
  - 承接 v0.0.7.33 feedbackTag mapping design。
  - 明确 feedbackTag source-of-truth 不能只从 collector observed values 或同名字符串推导。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 将 P1-5 / P1-7 连接到 `docs/V0_0_7_FEEDBACK_TAG_MAPPING_DESIGN.md`。
  - 明确该设计只是 mapping guardrail，不表示 P1 已解决。

### 阶段边界

- 本轮只做 docs / mapping design。
- 不新增 feedbackTag registry / schema / enum。
- 不实现 validator。
- 不新增 generated data。
- 不修改 feedbackTexts / generated feedback / content_sheets / reports。
- 不改 runtime、data、scripts、golden expected。
- 不把任何 candidate / risk / sample-only tag 注册为 runtime feedbackTag。
- 不推进 generated feedback partial / active takeover。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.32

本轮新增 stable ID source collector / registry design proof。

### 本轮新增 / 更新

- 新增 `scripts/content/collectStableIdSources.js`
  - 只读扫描当前仓库中可观察到的 ID / tag / enum-like value 来源。
  - 默认只向 stdout 输出简短 summary。
  - 传入 `--out reports/stableIdSourceCollector.sample.md` 时生成 Markdown sample report。
  - 实际扫描范围包括 runtime data、generated feedback JSON、golden samples、summary candidate、priority shell，以及当前 content sheet sample / draft。
  - 不从 docs prose 抽 ID 当事实来源。
- 新增 `reports/stableIdSourceCollector.sample.md`
  - 记录扫描范围、layer summary、observed source table、high-risk boundary reminders 和 future drift check 用法。
  - 明确 report 是 collector proof，不是 registry，不是 allowed values，不是 validator input，不是 generated data。
  - 明确 observed ID 不代表已定稿、已注册或可直接用于 validator。
- 更新 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
  - 记录 v0.0.7.32 collector proof 的定位。
  - 明确 collector 只做 observed source / drift check；下一步仍需要人工 review / registry design / validator design。

### 阶段边界

- 本轮只做 collector proof / sample report / docs。
- 不新增 registry / enum / schema。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime、data、content_sheets、golden expected。
- 不新增 stable ID，不批量生成 ID，不把 draft / candidate / sample-only ID 注册为 stable。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/collectStableIdSources.js` 通过。
- `node scripts/content/collectStableIdSources.js` 通过，输出 observed source summary。
- `node scripts/content/collectStableIdSources.js --out reports/stableIdSourceCollector.sample.md` 通过；重复执行无无意义 diff。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.31

本轮新增 known stable ID source-of-truth / registry / enum / schema 设计文档。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_ID_SOURCE_OF_TRUTH_DESIGN.md`
  - 设计 future validator 应从哪里获取合法 ID 集合。
  - 按 `ingredientId`、`accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`textId`、`sampleId`、`ruleId`、`candidateId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer`、`sourceSummary`、`triggerMetric` 和 profile / structure / candidate tags 分层说明 source-of-truth 候选来源。
  - 比较从 existing runtime data / rules 现场收集、显式 registry / enum / schema、混合方案三种路线，并推荐混合方案。
  - 提出未来可能的 `data/idRegistry.js`、`data/schema/stableIds.schema.json`、collector、registry check 等文件形态，但本轮不创建这些文件。
  - 设计 future candidate severity sheet validator 如何区分 stable / draft / sample-only / candidate-only / generated-only。
  - 承接 `docs/V0_0_7_ID_INVENTORY.md` 结论，明确 `aroma_pressure` 等 candidate / risk tag 不能自动成为 runtime `feedbackTag`，`bubble_conflict` 不能泛化，candidate severity draft ruleIds 不能进入 stable registry。

### 阶段边界

- 本轮只做 docs / source-of-truth design。
- 不新增 registry / enum / schema。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `git diff --check` 通过。
- 本轮未改 runtime / data / scripts / golden，未跑 golden。

## v0.0.7.30

本轮新增 v0.0.7.x ID / naming inventory 与 source map 审计报告。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_ID_INVENTORY.md`
  - 记录 v0.0.7.x 当前观察到的 ID / tag / rule / sample 来源、使用层级、状态、风险、建议和 gate。
  - 覆盖 `accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`textId`、`sampleId`、`ruleId`、`candidateId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer`、`sourceSummary`、`triggerMetric` 以及 profile / tag / generated sample 中的 draft / 疑似 stable ID。
  - 明确该文件不是 registry、enum 或 validator，不表示所有列出的 ID 都已经 stable。
  - 记录 `dairy_fat_overload`、`flavor_durian_overload`、legacy texture accidents、`bubble_conflict`、`aroma_pressure`、summary candidate tags、candidate severity draft ruleIds 等重点对象的当前身份和风险。
  - 明确 validate candidate severity sheet 和 severity generated data build 当前仍被 known stable ID source-of-truth / validator gate 阻塞。

### 阶段边界

- 本轮只做 docs / inventory / audit report。
- 不执行整改，不重命名任何已有 ID。
- 不新增 registry / enum / schema。
- 不实现 validator。
- 不新增 generated data。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `git diff --check` 通过。
- 本轮未改 runtime / data / scripts / golden，未跑 golden。

## docs: sync v0.0.7.29 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.29-candidate`。
  - 记录 candidate 指向 `5b7e759ca19589744a3699a74376d8ac0236a7ab`。
  - 记录 `v0.0.7.29-candidate` 已冻结并推送。
  - 记录当前未推进 v0.0.7.30。

### 阶段边界

- `v0.0.7.29-candidate` 已冻结并推送。
- candidate 指向 `5b7e759ca19589744a3699a74376d8ac0236a7ab`。
- v0.0.7.29 已新增 `docs/STABLE_ID_NAMING_GUARDRAIL.md`，作为长期 stable ID / naming guardrail 正本。
- 已同步 `docs/V0_0_7_MECHANISM_TODO.md`，让 v0.0.7.x 阶段 TODO 引用长期正本。
- 已将长期正本加入 `AGENTS.md` / `docs/AI_CONTEXT.md` 必读提醒。
- 本轮未执行实际 ID 审计。
- 未新增 registry / validator。
- 未改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.29`。
- 当前未推进 v0.0.7.30。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.29

本轮新增长期 stable ID / naming guardrail 文档。

### 本轮新增 / 更新

- 新增 `docs/STABLE_ID_NAMING_GUARDRAIL.md`
  - 定义长期稳定 ID / 命名 / 审查流程正本。
  - 适用于当前 v0.0.7.x 以及后续 v0.0.8.x、v0.0.9.x 和未来任何涉及 ID / tag / rule / schema / validator / generated data / runtime 接管的任务。
  - 明确 AI / Codex 批量生成的 ID 不能因为“看起来像 stable ID”就默认正确，英文 ID 不等于好设计。
  - 定义 ID 层级、草案 ID / sample sheet guardrail、新增 ID / tag 长期流程、ID 审计流程、风险分级、审计输出格式和 source-of-truth 前置条件。
  - 明确 validator 不得通过 substring / suffix / string pattern 推断合法 ID 集合；若没有 known stable ID source，应先设计 registry / enum / schema。
- 更新 `docs/V0_0_7_MECHANISM_TODO.md`
  - 明确 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 是长期 ID / 命名 / 审查流程正本。
  - v0.0.7.x 阶段 TODO 只引用长期正本，不复制完整流程。
  - 在 gate 表中补充 AI 生成 ID 与机制命名审计、新增 stable ID / feedbackTag / ruleId 进入表格前、validate candidate severity sheet 实现前的长期 guardrail gate。
- 更新 `AGENTS.md`
  - 加入 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 作为涉及 ID / tag / ruleId / sampleId / candidateId / triggerMetric / priorityBand / severityLevel / registry / validator / generated data 任务的必读文档。
- 更新 `docs/AI_CONTEXT.md`
  - 将 `docs/STABLE_ID_NAMING_GUARDRAIL.md` 加入新对话启动提醒。
  - 记录 v0.0.7.29 已新增长期 stable ID / naming guardrail。

### 阶段边界

- 本轮只做 docs / permanent ID naming guardrail。
- 不执行实际 ID 审计。
- 不重命名任何 ID。
- 不新增 registry / enum / schema 文件。
- 不实现 validator。
- 不新增表格 / JSON / generated data。
- 不修复 P1 / P2。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.28 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.28-candidate`。
  - 记录 candidate 指向 `b94294097a5a3dfe2f5faa5e199fbd3927e82478`。
  - 记录 `v0.0.7.28-candidate` 已冻结并推送。
  - 记录当前未推进 v0.0.7.29。

### 阶段边界

- `v0.0.7.28-candidate` 已冻结并推送。
- candidate 指向 `b94294097a5a3dfe2f5faa5e199fbd3927e82478`。
- v0.0.7.28 已新增 `docs/V0_0_7_MECHANISM_TODO.md`。
- 该文档汇总四轮项目审计结果，记录 v0.0.7.x 机制 / ID / 内容管线债务。
- 已列出 P1 / P2 TODO、解决 gate、阻塞门槛和不应立即乱改的内容。
- 已加入 v0.0.7.x 机制相关任务开工必读列表。
- 本轮未修复债务。
- 未改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.28`。
- 当前未推进 v0.0.7.29。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.28

本轮新增 v0.0.7.x mechanism TODO / audit debt doc。

### 本轮新增 / 更新

- 新增 `docs/V0_0_7_MECHANISM_TODO.md`
  - 汇总用户 / ChatGPT 四轮项目审计结果。
  - 记录 P0 / P1 / P2 定义，当前 P0 暂无。
  - 记录 P1 / P2 TODO、解决时机、阻塞门槛和推荐路线。
  - 明确这些债务尚未解决，本轮只建立追踪正本。
- 更新 `AGENTS.md`
  - 将 `docs/V0_0_7_MECHANISM_TODO.md` 加入 v0.0.7.x 机制 / ID / severity / threshold / 内容管线债务任务的开工必读列表。
- 更新 `docs/AI_CONTEXT.md`
  - 将 `docs/V0_0_7_MECHANISM_TODO.md` 加入新对话启动提醒。
  - 记录 v0.0.7.28 已新增 mechanism TODO / audit debt doc。
  - 记录当前未修复债务，只整理 TODO / gate。

### 阶段边界

- 本轮只做 docs / audit debt 整理。
- 不修复 P1 / P2。
- 不改 ID。
- 不改 runtime、data、generated data、content_sheets、scripts、reports、`index.html` 或 README。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.27 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.27-candidate`。
  - 记录 candidate 指向 `f33f298444cf25222c95cad11f0fb1d1e5ec46f3`。
  - 记录 `v0.0.7.27-candidate` 已冻结并推送。
  - 记录当前未推进 v0.0.7.28。

### 阶段边界

- `v0.0.7.27-candidate` 已冻结并推送。
- candidate 指向 `f33f298444cf25222c95cad11f0fb1d1e5ec46f3`。
- v0.0.7.27 已完成 AI 生成 ID / 机制命名 guardrail。
- 已明确 AI / Codex 生成 ID 不能因为“看起来像 stable ID”就默认正确，英文 ID 不等于好设计。
- 已明确 `sampleId`、`accidentTypeId`、`ruleId`、`candidateId`、`feedbackTag`、`severityLevel`、`sourceLayer` / `sourceSummary` / `triggerMetric` 等层级边界。
- 已明确草案 ID / sample sheet guardrail。
- 已明确 validator / registry guardrail。
- 已明确 future validator 实现前必须先明确 known stable ID registry / enum / schema / source of truth；没有 stable ID source 时应先设计 registry / enum / schema。
- 已明确字符串后缀 / substring 只能作为 lint / warning，不能作为合法性来源。
- 已明确 ID 名称不能覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。
- 已记录未来 AI 生成 ID 与机制命名审计计划。
- 本轮未重命名任何现有 ID。
- 未新增 registry / validator / generated data。
- 未改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.27`。
- 当前未推进 v0.0.7.28。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.27

本轮为 AI 生成 ID / 机制命名 guardrail。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 AI / Codex 生成 ID 不能因为“看起来像 stable ID”就默认正确。
  - 明确 ID 层级分类：`ingredientId`、`accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`feedbackTag`、`textId`、`sampleId`、`ruleId`、`candidateId`、`priorityBand`、`severityHint`、`severityLevel`、`sourceLayer` / `sourceSummary` / `triggerMetric`、draft / sample 后缀和 display 文本。
  - 明确草案 ID / sample sheet guardrail：sample CSV / JSON 虽不接 runtime，也不能随便填稳定字段；未注册 tag 应放入 notes，不应写入 stable 字段。
  - 补充新增 ID 前检查清单、错误示例 / 正确示例，以及 future validator / registry guardrail。
  - 明确 validator 实现前必须先明确 known stable ID 的 source of truth；如果没有 registry / enum / schema，应先设计 ID source，不应直接实现猜测式 validator。
  - 明确不能仅根据 ID 字符串前缀推断 `sourceLayer`；历史 ID 名称不能覆盖 `sourceLayer` / `sourceSummary` / `triggerMetric`。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 ID 命名在系统架构中的位置。
  - 明确机制层 ID 与测试样本、显示文案、规则行、candidate 和 severity 档位的边界。
  - 明确 future validator 不能只靠字符串后缀 / substring 猜合法性，应以 known stable ID registry / enum / schema 为准。
  - 明确不能通过 `inferFromStringPatterns()` 之类字符串模式反推 known ID 集合；validate candidate severity sheet 开工前必须检查 known stable ID source 是否存在。
  - 记录 future `v0.0.7.x｜AI 生成 ID 与机制命名审计` 应在正式调参 / partial 接管前安排。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.27 已完成 AI 生成 ID / 机制命名 guardrail。
  - 记录当前未重命名现有 ID，未做全量 ID 审计，未新增 registry / validator。

### 阶段边界

- 本轮只做 docs / guardrail。
- 不重命名现有 ID。
- 不做全量 ID 审计。
- 不新增 registry。
- 不实现 validator。
- 不定义新的 ID source of truth，只记录 validator 前置条件。
- 不新增表格 / JSON / generated data。
- 不改 runtime、data、generated data、content_sheets、scripts、reports 或 `index.html`。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.26 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.26-candidate`。
  - 记录 candidate 指向 `cd47d0b5c63f75a28ae2adea43ecff7822be7ade`。
  - 记录 `v0.0.7.26-candidate` 已冻结并推送。
  - 记录当前未推进 v0.0.7.27。

### 阶段边界

- `v0.0.7.26-candidate` 已冻结并推送。
- candidate 指向 `cd47d0b5c63f75a28ae2adea43ecff7822be7ade`。
- v0.0.7.26 已新增 candidate severity sample CSV / JSON。
- CSV 为 UTF-8 with BOM；JSON 合法。
- 所有样例行均为 `enabled=FALSE` 草案。
- 未填写真实阈值或真实 `scoreMultiplier`。
- 未按原料拆 `accidentTypeId`，未把 severity 写进 `accidentTypeId`，未使用 sampleId 作为 `ruleId` / 机制主键。
- 已对易误导样例行做结构去歧义：dairy 行 `ruleId` 指向 texture 方向，`aroma_pressure` / `bubble_conflict` 不再作为 candidate severity sample 的 `feedbackTag`。
- 本轮未新增 validator / build / generated runtime data。
- 未改 runtime、data、generated data、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.26`。
- 当前未推进 v0.0.7.27。

### 验证结果

- CSV 编码：UTF-8 with BOM。
- JSON 合法性：`python3 -m json.tool` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.26

本轮为 severity / threshold 样例表 CSV / JSON 草案。

### 本轮新增 / 更新

- 新增 `content_sheets/examples/candidate_severity_rules.sample.csv`
  - 使用 v0.0.7.25 设计的 `candidate_severity_rules` 字段顺序。
  - CSV 为 UTF-8 with BOM，面向人类编辑 / 审阅。
  - 所有样例行默认 `enabled=FALSE`，表示草案未启用。
- 新增 `content_sheets/examples/candidate_severity_rules.sample.json`
  - 与 CSV 字段一一对应。
  - JSON 合法、格式化、中文可读。
- 小修样例行结构去歧义
  - 将奶脂 / 厚重负担草案 `ruleId` 调整为 `texture_dairy_fat_load_draft`，保留 `accidentTypeId=dairy_fat_overload`。
  - 清空香气压力草案的 `feedbackTag`，避免误读 `aroma_pressure` 为已注册 runtime 文案池 tag。
  - 将 taste conflict outcome 草案调整为 `flavor_identity_conflict_outcome_draft`，清空 `bubble_conflict`，避免误读为 flavor identity conflict 默认反馈标签。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 说明样例 CSV / JSON 只是人类编辑源草案，不是 runtime data。
  - 说明示意行不代表真实阈值 / multiplier。
  - 说明 CSV / JSON 只验证字段、人类可读性和 future validator 方向。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 说明 candidate severity sample sheet 只是内容管线草案层。
  - 说明它不改变 summary / candidate / priority shell，也不接管 legacy judge。
  - 说明后续必须先有 validator / build / generated validator / shadow / review，才能考虑 partial 接管。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.26 已新增 severity / threshold 样例表 CSV / JSON 草案。
  - 记录当前仍未实现 validator / build / generated data / runtime 接管。

### 阶段边界

- 本轮只新增样例 CSV / JSON 和 docs。
- 不实现 validator。
- 不实现 build script。
- 不新增 runtime generated data。
- 不改 runtime、data、generated data、scripts、reports 或 `index.html`。
- 不改玩家最终 score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- CSV 编码：UTF-8 with BOM。
- JSON 合法性：`python3 -m json.tool` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.25 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.25-candidate`。
  - 记录 candidate 指向 `50cd161ca871810dada7261769ecfdf7db1ba7e6`。
  - 记录 `v0.0.7.25-candidate` 已冻结并推送。
  - 记录 v0.0.7.25 已完成 severity / threshold sample table schema。
  - 记录当前未推进 v0.0.7.26。

### 阶段边界

- `v0.0.7.25-candidate` 已冻结并推送。
- candidate 指向 `50cd161ca871810dada7261769ecfdf7db1ba7e6`。
- v0.0.7.25 已完成 severity / threshold sample table schema。
- 推荐未来表名 `candidate_severity_rules`。
- 已明确 `ruleId` / `accidentTypeId` / `severityLevel` 边界。
- 已明确 `accidentTypeId` 不按原料拆分、不携带 severity 后缀。
- 已明确 future validator 校验 `accidentTypeId` 合法性应以 known stable ID registry / enum / schema 为准，字符串后缀 / substring 检查只能作为 warning / lint hint，不能成为合法性来源。
- 已明确 sampleId 不进入机制规则主键。
- 已明确 future validator / generated data 边界。
- 本轮未新增表格文件 / JSON / generated data。
- 未改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.25`。
- 当前未推进 v0.0.7.26。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.25

本轮为 severity / threshold 样例表 schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充未来 `candidate_severity_rules` 样例表 schema。
  - 说明表名选择理由：它不只服务事故，也可服务 outcome / drinkType / feedback candidate。
  - 逐字段说明 `ruleId`、`enabled`、`candidateType`、目标 ID、来源与触发字段、priority / severity 字段、分数与反馈强度字段、审核与备注字段。
  - 明确 `ruleId` / `accidentTypeId` / `severityLevel` 边界。
  - 明确 `accidentTypeId` 不按原料拆分，也不携带 severity 后缀。
  - 明确 sampleId 只用于 golden / review pack / 测试定位，不进入机制规则主键。
  - 补充错误示例与正确示例。
  - 补充 future validator / generated severity data 边界。
  - 补充 validator 合法性边界：`accidentTypeId` 必须以 known stable ID registry / enum / schema 校验，字符串后缀 / substring 检查只能作为辅助 warning / lint hint。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 severity / threshold 表 schema 在整体架构中的位置。
  - 明确 future severity table 读取 summary / candidate / priority 的结构字段。
  - 明确 future severity table 不能变成新的 if 地狱。
  - 明确 future validator 不应把 `includes("_high")`、`endsWith("_lemon")` 之类字符串规则写成 `accidentTypeId` 合法性来源。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.25 已完成 severity / threshold 样例表 schema。
  - 记录当前未创建 severity sheet / validator / build / generated data。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 不新增表格文件。
- 不新增 JSON 文件。
- 不新增 generated data。
- 不实现 validator。
- 不实现 build。
- 不改 runtime、data、generated data、content_sheets、scripts、reports 或 `index.html`。
- 不改 candidate / priority shell。
- 不改 final score、feedback、accident、type 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.24 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.24-candidate`。
  - 记录 candidate 指向 `9e0b2814224be192e67f01c306fc49ed2590415b`。
  - 记录 `v0.0.7.24-candidate` 已冻结并推送。
  - 记录 v0.0.7.24 已完成 severity / threshold 表格化路线设计。
  - 记录当前未推进 v0.0.7.25。

### 阶段边界

- `v0.0.7.24-candidate` 已冻结并推送。
- candidate 指向 `9e0b2814224be192e67f01c306fc49ed2590415b`。
- v0.0.7.24 已完成 severity / threshold 表格化路线设计。
- 已明确 `accidentTypeId` 是机制大类，不按每个原料拆事故类型。
- 已明确 sampleId / `accidentTypeId` / displayName 分离。
- 已明确 `priorityBand` / `severityHint` / `severityLevel` / `scoreMultiplier` 边界。
- 已明确 future severity sheet 走 validate / build / generated / shadow / review / partial 路线。
- 已明确反 if 地狱边界。
- 本轮未实现 severity engine。
- 未新增表格 / generated data。
- 未改 runtime、data、generated data、content_sheets、scripts、reports、`index.html`。
- 未改玩家最终 score、feedback、accident、type 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.24`。
- 当前未推进 v0.0.7.25。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.24

本轮为 severity / threshold 表格化路线设计。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 severity / threshold 表格化路线。
  - 明确 `accidentTypeId` 是机制类别，不是 sampleId、displayName 或单一原料名。
  - 明确 sampleId / sample title / `accidentTypeId` / displayName 的边界。
  - 明确 `priorityBand`、`severityHint`、`severityLevel`、`scoreMultiplier` 的分工。
  - 推荐未来表名优先使用 `candidate_severity_rules`，并记录字段草案。
  - 设计 validate / build / generated / shadow / review / partial / active 的可考虑路线。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 severity / threshold 的架构位置。
  - 明确高优先级不等于高 severity。
  - 明确 severity / threshold 规则应读取 stable ID、summary / candidate 结构字段和 generated table data。
  - 明确禁止 sampleId rule、中文文案 rule、单原料特殊扣分、golden hardcode 和 engine 散落 threshold if。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.24 已完成 severity / threshold 表格化路线设计。
  - 记录当前仍未实现 severity sheet、validator、build、generated data 或 runtime takeover。

### 阶段边界

- 本轮只做 docs / schema / route design。
- 不实现 severity engine。
- 不新增 severity / threshold CSV、JSON、generated data、validate script 或 build script。
- 不改 runtime、data、scripts、generated data、content_sheets、reports 或 `index.html`。
- 不改 `feedbackEngine`、candidate priority shell、summary candidate engine 或事故 analyzer。
- 不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.23 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.23-candidate`。
  - 记录 candidate 指向 `e1e3486b0fa13b7e05413f8fb21ba311bac1dae1`。
  - 记录 `v0.0.7.23-candidate` 已冻结并推送。
  - 记录 v0.0.7.23 已完成 feedback 多候选评审包压力测试。
  - 记录当前未推进 v0.0.7.24。

### 阶段边界

- `v0.0.7.23-candidate` 已冻结并推送。
- candidate 指向 `e1e3486b0fa13b7e05413f8fb21ba311bac1dae1`。
- v0.0.7.23 已完成 feedback 多候选评审包压力测试。
- 已新增 classic / acid 多候选，straw 保持既有 2 条多候选。
- Adapter check 已从固定数量断言调整为结构 / 至少覆盖 / stable ID 断言。
- Review pack 已改为“制作人审核区在前、机器详情附录在后”。
- 每条 candidate 均有独立审核字段，支持多条候选同时 keep。
- 本轮未改玩家最终 feedback。
- 未改 runtime、feedbackEngine、generated data、content_sheets、index.html。
- 未改 score、type、accident、feedbackTags 或 golden expected。
- Validator / build / generated checks / shadow check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.23`。
- 当前未推进 v0.0.7.24。

### 验证结果

- Review pack 生成通过。
- Validator：Errors 0；Warnings 11，均为人工审核提醒。
- Generated JSON / JS build 通过。
- Generated validator / module check / browser loading / adapter / shadow checks 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.23

本轮为 feedback 多候选评审包压力测试。

### 本轮新增 / 更新

- 更新 `content_sheets/examples/feedback_texts.sample.csv`
  - 少量扩充 sample feedback candidates。
  - 保持 UTF-8 with BOM，供 Excel / Google Sheets / Numbers 直接打开时中文可读。
  - 新增 classic / acid_accident 代表候选，并保留既有 straw_disaster 多候选，用于测试一个 sample 对应多条 generated shadow candidates 的评审体验。
- 更新 `content_sheets/examples/feedback_texts.sample.json`
  - 与 CSV 样例内容同步，保持中文可读。
- 更新 `data/generated/feedbackTexts.generated.json`
  - 由 `scripts/content/buildFeedbackData.js` 从 sample CSV 重新生成。
- 更新 `data/generated/feedbackTexts.generated.js`
  - 由 `scripts/content/buildFeedbackData.js` 从 sample CSV 重新生成。
- 更新 `reports/feedbackShadowReview.sample.md`
  - 重新生成多候选 review pack。
  - 覆盖 `classic_milk_tea`、`extreme_lemon_accident`、`straw_resistance_accident` 的多候选展示。
  - 将 report 调整为“制作人审核区集中在前，机器详情集中放附录”的两段式结构。
  - 将制作人审核字段移到每条候选文案下方，便于逐条填写 `reviewStatus`、`issueTags`、`suggestedRewrite`、`producerComment`。
  - 将 `reviewStatus` 提示调整为选项在前、数字在后，例如 keep 保留=1。
  - 增加“整组备注”，用于填写 `needsNewText`、`preferredTextId` 和整体 `producerComment`。
- 更新 `scripts/content/checkFeedbackRuntimeAdapter.js`
  - 泛化候选数量断言，避免内容扩充时因“固定数量”误判失败。
  - check 仍保护 stable ID、enabled / includeDisabled、返回对象只读、不按 zhCN 查询、invalid data unavailable 等边界。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.23 已完成 feedback 多候选评审包压力测试。
  - 记录当前仍未改变玩家最终 feedback，仍未做 partial / active 接管。

### 阶段边界

- 本轮是评审包可用性测试，不是正式文案库扩充。
- 不改 runtime、不改 `feedbackEngine`、不改 `data/feedbackTexts.js`。
- 不改 `core/feedbackRuntimeAdapter.js`，只调整 adapter check 的结构断言方式。
- 不改玩家最终 feedback、score、type、accident 或 feedbackTags。
- 不改 golden samples / runner / golden expected。
- 不接 runtime，不做 partial / active 接管。
- 本轮不 push、不 tag。

### 验证结果

- Validator：Errors 0；Warnings 为人工审核提醒。
- Generated JSON / JS build 通过。
- Generated data validators / browser loading / adapter / shadow checks 通过。
- Review pack 生成通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.22 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.22-candidate`。
  - 记录 candidate 指向 `5554977cdcd022ee585edcacc5bf08f167a9ea78`。
  - 记录 `v0.0.7.22-candidate` 已冻结并推送。
  - 记录 v0.0.7.22 已实现 feedback shadow review pack 第一版脚本。
  - 记录当前未推进 v0.0.7.23。

### 阶段边界

- `v0.0.7.22-candidate` 已冻结并推送。
- candidate 指向 `5554977cdcd022ee585edcacc5bf08f167a9ea78`。
- v0.0.7.22 已实现 feedback shadow review pack 第一版脚本。
- 已生成制作人可读 Markdown report。
- report 覆盖 `classic_milk_tea`、`extreme_lemon_accident`、`straw_resistance_accident`。
- report 区分 legacy final output 和 generated shadow candidates。
- 制作人审核区已采用状态码 + 中文问题标签，并保留英文 key + 中文解释。
- report 不接 runtime，不自动判断文案好坏，不自动接管，不自动改文案。
- 本轮未改变玩家最终 feedback。
- 未改 runtime、data、generated data、content_sheets、index.html。
- 未改 final feedback、score、type、accident、feedbackTags 或 golden expected。
- Shadow check / browser loading check / adapter check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.22`。
- 当前未推进 v0.0.7.23。

### 验证结果

- Review pack 生成通过，重新生成 report 后无 diff。
- Shadow check / browser loading check / adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.22

本轮实现 feedback shadow review pack 第一版脚本，并按制作人可读性反馈调整 Markdown 输出结构。

### 本轮新增 / 更新

- 新增 `scripts/content/buildFeedbackShadowReviewPack.js`
  - 读取既有 golden samples、legacy final output 与 generated shadow candidates。
  - 输出制作人可读的 Markdown review pack。
  - Markdown 优先展示“你需要审什么 / 旧反馈 / 新候选文案 / 制作人审核”，再展示机器详情。
  - 不承载机制判断、不自动接管 generated feedback、不自动改文案、不自动改 golden expected。
- 新增 `reports/feedbackShadowReview.sample.md`
  - 覆盖 `classic_milk_tea`、`extreme_lemon_accident`、`straw_resistance_accident` 三个代表样本。
  - 区分 legacy final output 与 generated shadow candidates。
  - 制作人审核区使用数字状态码：1 keep / 2 revise / 3 reject / 4 pending。
  - 制作人审核区保留英文 key，并在后面补中文解释，例如 `reviewStatus（审核状态）`、`preferredTextId（偏好文案ID）`、`issueTags（问题标签）`、`suggestedRewrite（建议改写）`、`producerComment（制作人备注）`。
  - 常见问题标签使用中文自然语言，例如 AI味浓、太狠、不好笑、触发不对、太平、太长、太抽象、想留但要改。
  - 不再要求制作人填写 `tooAI` / `tooHarsh` / `notFunny` / `wrongTrigger` 等程序化独立字段，改为 `issueTags`。
  - 将 metadata、resultIds、matchReason、fallbackReason、affectsFinalFeedback、scoreChanged / typeChanged / feedbackTagsChanged 等机器字段降级到“机器详情（一般不用制作人细看）”。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.22 已实现 feedback shadow review pack 第一版脚本。
  - 同步 report 已按用户反馈改成制作人速读版 + 机器详情两层结构。
  - 记录当前仍未改变玩家最终 feedback，仍未做 partial / active 接管。

### 阶段边界

- 本轮只新增 review pack 生成脚本与样例 Markdown 报告。
- report 是制作人评审材料，不是 runtime data。
- report 机器详情仍保留，但不放在制作人主阅读路径。
- 不改 runtime、core、data、generated data、content_sheets 或 `index.html`。
- 不改 `feedbackEngine` / `feedbackRuntimeAdapter`。
- 不改玩家最终 feedback、score、type、accident 或 feedbackTags。
- 不改 CSV / Google Sheets 字段。
- 不改 golden samples / runner / golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/buildFeedbackShadowReviewPack.js` 通过。
- `node scripts/content/buildFeedbackShadowReviewPack.js --out reports/feedbackShadowReview.sample.md` 通过。
- Shadow check / browser loading check / adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.21 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.21-candidate`。
  - 记录 candidate 指向 `d7b25bfb3790474db73a6081a245c8f8cbd5199a`。
  - 记录 `v0.0.7.21-candidate` 已冻结并推送。
  - 记录 v0.0.7.21 已完成 feedback shadow review pack / 对比输出 docs schema。
  - 记录当前未推进 v0.0.7.22。

### 阶段边界

- `v0.0.7.21-candidate` 已冻结并推送。
- candidate 指向 `d7b25bfb3790474db73a6081a245c8f8cbd5199a`。
- v0.0.7.21 已完成 feedback shadow review pack / 对比输出 docs schema。
- 已明确 legacy final output vs generated shadow candidates 的对比结构。
- 已明确制作人审核字段，例如 `reviewStatus`、`producerComment`、`preferredTextId`、`needsNewText`、`toneIssue`、`tagIssue`、`tooAI`、`tooHarsh`、`notFunny`、`wrongTrigger`、`suggestedRewrite` 等。
- 已明确 review pack 不承载机制判断、不自动接管、不自动改文案。
- 本轮未实现 review pack script。
- 未新增 review output。
- 未改 runtime、data、scripts、content_sheets、index.html。
- 未改 final feedback、score、type、accident、feedbackTags 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.21`。
- 当前未推进 v0.0.7.22。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.21

本轮为 feedback shadow 评审包 / 对比输出 docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 feedback shadow review pack 设计。
  - 明确 legacy final output、generated shadow candidates、machine checks 与 producer review notes 的结构边界。
  - 设计制作人审核字段，例如 `reviewStatus`、`producerComment`、`preferredTextId`、`needsNewText`、`toneIssue`、`tagIssue`、`tooAI`、`tooHarsh`、`notFunny`、`wrongTrigger`、`suggestedRewrite`。
  - 建议未来先输出 Markdown review pack + JSON source，样本量变多后再导出 Google Sheets 审核表。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 review pack 是评审工具层，不是 runtime 判定层。
  - 明确制作人审核是 partial / active 接管前的必要环节。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.21 已完成 feedback shadow 评审包 / 对比输出设计。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 不实现 review pack script。
- 不新增 review output。
- 不改 runtime、data、scripts、`content_sheets` 或 `index.html`。
- 不改 golden samples / runner。
- 不改 final feedback / score / type / accident / feedbackTags。
- 不改 CSV / Google Sheets 字段。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.20 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.20-candidate`。
  - 记录 candidate 指向 `6cbdb05d0184fb55f8f1c892c593e50213929d7a`。
  - 记录 `v0.0.7.20-candidate` 已冻结并推送。
  - 记录 v0.0.7.20 已完成 `generatedFeedbackShadow` golden 结构断言。
  - 记录当前未推进 v0.0.7.21。

### 阶段边界

- `v0.0.7.20-candidate` 已冻结并推送。
- candidate 指向 `6cbdb05d0184fb55f8f1c892c593e50213929d7a`。
- v0.0.7.20 已新增 `generatedFeedbackShadow` golden 结构断言。
- 少量既有 golden samples 已补 shadow expected。
- 本轮只保护 shadow 输出结构，不改 runtime。
- shadow mode 当前仍不影响玩家最终 feedback。
- 未改 final feedback / score / type / accident / feedbackTags。
- 未锁死具体中文文案或文案选择算法。
- 未改 runtime / core / generated data / content_sheets / index.html。
- shadow check / browser loading check / adapter check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.20`。
- 当前未推进 v0.0.7.21。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- Shadow check 通过。
- Generated browser loading check 通过。
- Adapter check 通过。
- `git diff --check` 通过。

## v0.0.7.20

本轮新增 `generatedFeedbackShadow` golden 结构断言能力。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - golden runner 测试环境加载 generated feedback JS data module 与 `feedbackRuntimeAdapter`。
  - 新增 `generatedFeedbackShadow` expected 结构断言。
  - 检查 shadow 容器存在、`enabled`、`mode: "shadow"`、`affectsFinalFeedback: false`、`affectsFinalResult: false`、`source`、`candidates`、`fallbackReason` 和 `metadata` 基础结构。
  - 支持用局部 candidate 匹配检查代表 `textId` / `feedbackTag` / `scene`，不深度锁死完整 object。
- 更新 `data/goldenSamples.js`
  - 少量代表 golden samples 补充 `generatedFeedbackShadow` expected。

### 阶段边界

- 本轮只保护 shadow 输出结构，不改 runtime。
- 不改 `feedbackEngine` / `feedbackRuntimeAdapter` / generated data / `content_sheets` / `index.html`。
- 不改玩家最终 feedback、score、事故、饮品类型、`result.type`、`feedbackTags` 或 golden score expected。
- 不锁死具体中文文案或 generated 文案选择算法。
- 本轮不 push、不 tag。

### 验证结果

- `classic_milk_tea` 补充 shadow expected：检查 classic generated 候选。
- `extreme_lemon_accident` 补充 shadow expected：检查 acid accident generated 候选。
- `straw_resistance_accident` 补充 shadow expected：检查 straw disaster generated 候选。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `node --check scripts/runGoldenSamples.js` 通过。
- `node --check data/goldenSamples.js` 通过。
- Shadow check 通过。
- Generated browser loading check 通过。
- Adapter check 通过。
- `git diff --check` 通过。

## docs: sync v0.0.7.19 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.19-candidate`。
  - 记录 candidate 指向 `0bca500949d645af146194576227757cad4c5eff`。
  - 记录 `v0.0.7.19-candidate` 已冻结并推送。
  - 记录 v0.0.7.19 已实现 `feedbackEngine` shadow mode 只读旁路。
  - 记录当前未推进 v0.0.7.20。

### 阶段边界

- `v0.0.7.19-candidate` 已冻结并推送。
- candidate 指向 `0bca500949d645af146194576227757cad4c5eff`。
- v0.0.7.19 已实现 `feedbackEngine` shadow mode 只读旁路。
- 新增 `result.generatedFeedbackShadow`，用于调试 / 对比 generated feedback 候选。
- shadow mode 不接管最终 feedback，`result.feedback` 仍由 legacy 输出。
- generated 文案不显示到 UI。
- final feedback / score / type / stable IDs / feedbackTags 不变。
- validate / build / generated validator / adapter check / shadow check / golden 均通过。
- UI smoke 通过：页面、普通试喝、事故路径正常，无 pageerror / 无业务 JS error。
- 工具与 smoke 细节：使用系统 Chrome；Playwright 自带浏览器缺失；Chrome 捕获到一条泛化 `Failed to load resource` 404，但未对应业务脚本错误，未影响 smoke。
- 未改 `data/feedbackTexts.js` / generated data / `content_sheets`。
- 未改评分、事故、饮品类型、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.19`。
- 当前未推进 v0.0.7.20。

### 验证结果

- Shadow check 通过，final feedback 保持 legacy，shadow 不影响最终反馈。
- Generated browser load check 通过。
- Adapter check 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.19

本轮实现 `feedbackEngine` shadow mode 只读旁路。

### 本轮新增 / 更新

- 更新 `core/feedbackEngine.js`
  - 新增 `buildGeneratedFeedbackShadow`。
  - 通过 `MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS` 和 `feedbackRuntimeAdapter` 只读查询 generated feedback 候选。
  - 仅按 stable `feedbackTag` 与 score 做保守候选查询。
  - shadow 输出明确 `affectsFinalFeedback: false` / `affectsFinalResult: false`。
  - generated data 不可用时记录 fallback，不让 runtime 崩溃。
- 更新 `core/tasteJudge.js`
  - 在 `result.generatedFeedbackShadow` 暴露只读 shadow 结果。
  - 不替换 `result.feedback`，不改变 `feedbackTags`。
- 更新 `index.html`
  - 页面顶部版本号更新为 `v0.0.7.19`。
  - 加载 `core/feedbackRuntimeAdapter.js?v=00719`，位置在 generated JS data module 之后、`feedbackEngine` 之前。
  - 更新 `core/feedbackEngine.js` cache query 为 `v=00719`。
- 新增 `scripts/content/checkFeedbackShadowMode.js`
  - 对比 legacy runtime 与 generated shadow runtime。
  - 确认 final feedback / score / type / stable IDs / feedbackTags 不变。
  - 确认 shadow 候选存在且不影响最终反馈。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.19 已完成 feedbackEngine shadow mode 只读实现。
  - 记录当前未做 partial / active 接管。

### 阶段边界

- shadow 读取 generated feedback data 候选，但不接管最终 feedback。
- 玩家最终 feedback / score / accident / drink type / `result.type` 不变。
- generated 文案不展示到 UI。
- 本轮不改用户文案，不改 Google Sheets / CSV 字段。
- 本轮不改 generated JSON / generated JS。
- 本轮不改 `data/feedbackTexts.js`。
- 本轮不改 golden samples / runner，不改 golden expected。
- 本轮不做 partial / active 接管。
- 本轮不 push、不 tag。

### 验证结果

- `node --check core/feedbackRuntimeAdapter.js` 通过。
- `node --check core/feedbackEngine.js` 通过。
- `node --check core/tasteJudge.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackBrowserLoad.js` 通过。
- `node --check scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- `node --check scripts/content/checkFeedbackShadowMode.js` 通过。
- Feedback shadow mode check 通过，final feedback 保持 legacy，shadow 不影响最终反馈。
- Generated browser load check 通过。
- Adapter check 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。
- UI smoke 通过：页面 HTTP 200，页面顶部版本号为 `v0.0.7.19`，generated JS / adapter / feedbackEngine script URL 均为 HTTP 200；普通试喝和事故路径正常，legacy feedback 仍显示为最终反馈，generated shadow 文案未显示到 UI，页面无可见 `undefined` / `[object Object]`。
- Console 检查：Playwright + 本机 Chrome 捕获到一条泛化 `Failed to load resource` 404 提示，但未捕获业务 JS `pageerror`，也未发现 generated JS / adapter / feedbackEngine 等业务脚本 HTTP 错误。

## docs: sync v0.0.7.18 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.18-candidate`。
  - 记录 candidate 指向 `a9c17811854ee37be540627705bd8ca9b54b55b6`。
  - 记录 `v0.0.7.18-candidate` 已冻结并推送。
  - 记录 v0.0.7.18 已补强 generated feedback JS module browser loading 结构保护。
  - 记录当前未推进 v0.0.7.19。

### 阶段边界

- `v0.0.7.18-candidate` 已冻结并推送。
- candidate 指向 `a9c17811854ee37be540627705bd8ca9b54b55b6`。
- v0.0.7.18 已补强 generated feedback JS module browser loading 结构保护。
- browser-like loading check 通过，`MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS` 可读。
- generated JS module 仍未接 `feedbackEngine`。
- 不改变玩家最终 feedback。
- 未改 `index.html`。
- 未改 `feedbackEngine` / adapter / generated data / `content_sheets` / `data/feedbackTexts.js`。
- validate / build / generated validator / module check / adapter check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.18`。
- 当前未推进 v0.0.7.19。

### 验证结果

- `node --check scripts/content/checkGeneratedFeedbackBrowserLoad.js` 通过。
- Generated browser load check 通过，`MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS` 可读。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.18

本轮补强 generated feedback JS module browser loading 结构保护。

### 本轮新增 / 更新

- 新增 `scripts/content/checkGeneratedFeedbackBrowserLoad.js`
  - 使用 Node `vm` 模拟 browser-like global 环境。
  - 以普通 browser script 方式加载 `data/generated/feedbackTexts.generated.js`。
  - 检查 `window` / `self` / `globalThis` 上的 `MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS` 全局对象。
  - 检查 `textsById` / `textsByTag` / `textsByScene` / enabled index / `metadata` 等顶层结构。
  - 检查 `feedback_classic_001` 可通过 stable `textId` 读取，中文文案可读。
  - 确认加载过程不依赖 `require` / `module` / `process` / `fetch` / `document`。
  - 确认 generated data module 不创建 `feedbackEngine` 或 adapter global。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.18 已完成 generated feedback JS module browser loading 结构保护。
  - 记录当前仍未接 `feedbackEngine`，不影响玩家最终 feedback。

### 阶段边界

- 本轮只补强 browser/global loading 检查。
- 本轮未修改 `index.html`；页面版本号仍是 `v0.0.7.17`。
- generated JS module 仍未接 `feedbackEngine`。
- 本轮不改变玩家最终 feedback。
- 本轮不改评分、事故、饮品类型、`result.type` 或 golden expected。
- 本轮不改 `feedbackEngine` / adapter / generated data / `content_sheets` / `data/feedbackTexts.js`。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackDataModule.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackBrowserLoad.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Generated browser load check 通过。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。
- 本轮未修改 `index.html` 或 runtime 加载顺序，因此未强制执行 UI smoke。

## docs: sync v0.0.7.17 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.17-candidate`。
  - 记录 candidate 指向 `02cb1dc7c3eb172b684d1fa346779a851b05696d`。
  - 记录 `v0.0.7.17-candidate` 已冻结并推送。
  - 记录 v0.0.7.17 已让 `index.html` 加载 generated feedback JS module。
  - 记录当前未推进 v0.0.7.18。

### 阶段边界

- `v0.0.7.17-candidate` 已冻结并推送。
- candidate 指向 `02cb1dc7c3eb172b684d1fa346779a851b05696d`。
- v0.0.7.17 已让 `index.html` 加载 generated feedback JS module。
- 页面版本号更新为 `v0.0.7.17`。
- generated JS module script URL 200，页面资源清单确认作为 script 加载。
- Browser evaluate 隔离环境无法直接读取 `window.MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS`，global 直读未完整确认；这是工具限制，已如实记录。
- 可见 UI smoke 通过：普通试喝和事故路径正常，页面无可见 `undefined` / `[object Object]`。
- console 监听受工具限制，未完整确认。
- generated JS 尚未接 `feedbackEngine`，不改变玩家最终 feedback。
- 未改 `feedbackEngine` / adapter / generated data / `content_sheets` / `data/feedbackTexts.js`。
- validate / build / generated validator / adapter check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.17`。
- 当前未推进 v0.0.7.18。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackDataModule.js` 通过。
- `node --check core/feedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.17

本轮让 `index.html` 只加载 generated feedback JS data module。

### 本轮新增 / 更新

- 更新 `index.html`
  - 页面顶部版本号更新为 `v0.0.7.17`。
  - 新增 `data/generated/feedbackTexts.generated.js?v=00717` script 加载。
  - generated feedback JS module 进入 browser runtime 环境。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.17 已完成 generated feedback JS module 的 browser loading。
  - 记录当前仍未接 `feedbackEngine`，不影响玩家最终 feedback。

### 阶段边界

- 本轮只让页面加载 generated feedback JS module。
- 本轮不加载 `core/feedbackRuntimeAdapter.js`。
- 本轮不接 `feedbackEngine`，不让 generated 文案影响玩家最终 feedback。
- 本轮不改 runtime 判定、评分、事故、饮品类型、`result.type` 或 golden expected。
- 本轮不改 generated JSON / generated JS 内容。
- 本轮不改 `data/feedbackTexts.js`、`core/feedbackEngine.js`、`core/tasteJudge.js` 或 `core/feedbackRuntimeAdapter.js`。
- 本轮不改 CSV / JSON 样例，不改 Google Sheets 字段，不改用户文案。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackDataModule.js` 通过。
- `node --check core/feedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。
- UI smoke：可见 UI smoke 通过；页面 HTTP 200，页面顶部版本号为 `v0.0.7.17`，`data/generated/feedbackTexts.generated.js?v=00717` 返回 HTTP 200，页面资源清单确认 generated JS 作为 script 加载；普通试喝路径和事故路径正常，页面无可见 `undefined` / `[object Object]`。
- Console / global 检查：Browser 工具未提供完整 console 监听能力，console 监听受工具限制，未完整确认；浏览器 evaluate 隔离环境无法直接读取页面脚本挂载的 global object，已用 script URL 200、页面资源清单和 generated JS module check 作为替代证据。

## docs: sync v0.0.7.16 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.16-candidate`。
  - 记录 candidate 指向 `67d068af06c696d1a470c2d68ec47d9779cbe6d5`。
  - 记录 `v0.0.7.16-candidate` 已冻结并推送。
  - 记录 v0.0.7.16 已实现 build script 输出 generated feedback JS data module。
  - 记录当前未推进 v0.0.7.17。

### 阶段边界

- `v0.0.7.16-candidate` 已冻结并推送。
- candidate 指向 `67d068af06c696d1a470c2d68ec47d9779cbe6d5`。
- v0.0.7.16 已实现 build script 输出 generated feedback JS data module。
- 已新增 `data/generated/feedbackTexts.generated.js`。
- build script 仍兼容 JSON 输出。
- generated JS module check 通过。
- generated JS 尚未加载进页面，不接 runtime，不影响玩家最终 feedback。
- 未改 `feedbackEngine` / `data/feedbackTexts.js` / `content_sheets` / `index.html`。
- validate / build / generated validation / adapter check / golden 均通过。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.16`。
- 当前未推进 v0.0.7.17。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackDataModule.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.16

本轮实现 build script 输出 generated JS data module。

### 本轮新增 / 更新

- 更新 `scripts/content/buildFeedbackData.js`
  - 支持根据 `--out` 后缀输出 `.json` 或 `.js`。
  - `.json` 继续输出 generated feedback JSON，保持现有 JSON 输出路径和 CLI 用法兼容。
  - `.js` 输出 browser script data module，暴露 `window.MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS`。
  - build 仍依赖 `validateFeedbackSheet`；validator Errors 非 0 时停止，Warnings 可继续但会报告数量。
- 新增 `data/generated/feedbackTexts.generated.js`
  - 由 sample CSV 生成，中文文案保持可读。
  - 不依赖 bundler，不使用 ES module import/export。
  - 不接 runtime，不自动选择最终 feedback。
- 新增 `scripts/content/checkGeneratedFeedbackDataModule.js`
  - 用 Node `vm` 加载 generated JS。
  - 检查全局对象、只读边界、`textsById` / `textsByTag` / `textsByScene`、sample textId、中文可读性、metadata 和 generated JSON 对齐关系。
- 更新 `data/generated/feedbackTexts.generated.json`
  - 由更新后的 build script 重新生成，schemaVersion 同步为 `feedbackTexts.generated.v0.0.7.16`。
  - 本轮未改 CSV / Google Sheets 字段，未改用户文案。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 generated JSON 与 generated JS 的关系。
  - 明确 generated JS 是 browser runtime 未来加载源，但当前仍不接 runtime / `feedbackEngine`。
  - 明确 generated JS 不影响 Google Sheets / CSV 工作流。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 generated JS data module 作为当前推荐 runtime loading 方向。
  - 明确 generated JS module 不承载机制判断。
  - 明确未来 `index.html` 加载顺序与 cache query 需要单独任务处理。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.16 已完成 generated feedback JS data module build 输出。

### 阶段边界

- 本轮不改 runtime，不改 `feedbackEngine`，不改 `data/feedbackTexts.js`，不改 `index.html`。
- 本轮不让 `index.html` 加载 generated JS。
- 本轮不实现 runtime adapter 接入，不改变玩家最终 feedback。
- 本轮不改 sample CSV / JSON，不改 Google Sheets 字段，不改用户文案。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node --check scripts/content/checkGeneratedFeedbackDataModule.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12；warnings 为人工审核提醒。
- JSON build 通过。
- JS module build 通过。
- Generated JSON validator：Errors 0，Warnings 0。
- Generated JS module check 通过。
- Generated JSON 合法。
- Adapter check 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- Repeated build 未产生无意义 diff。
- `git diff --check` 通过。

## docs: sync v0.0.7.15 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.15-candidate`。
  - 记录 candidate 指向 `18baed4f4375594db69c8d841249f1b4fce423dd`。
  - 记录 `v0.0.7.15-candidate` 已冻结并推送。
  - 记录 v0.0.7.15 已完成 generated feedback data runtime loading docs / schema。
  - 记录当前未推进 v0.0.7.16。

### 阶段边界

- `v0.0.7.15-candidate` 已冻结并推送。
- candidate 指向 `18baed4f4375594db69c8d841249f1b4fce423dd`。
- v0.0.7.15 已完成 generated feedback data runtime loading docs / schema。
- 已比较 JSON fetch / JS data module / Node-only 三种方案。
- 推荐方向是 generated JS data module，更贴合当前同步 script 架构。
- 已明确 runtime 不读 CSV / Google Sheets / 人类编辑源。
- 本轮未实现 runtime loading。
- 未改 runtime、data、scripts、generated data、`content_sheets`、`index.html`。
- 未改 `feedbackEngine` / adapter。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.15`。
- 当前未推进 v0.0.7.16。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.15

本轮为 generated feedback data runtime loading docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 比较 runtime fetch JSON、build 生成 JS data module、Node-only generated data 三种路线。
  - 推荐当前阶段优先考虑 generated JS data module。
  - 明确 runtime 不读取 CSV / Google Sheets / 人类编辑源。
  - 明确 future loading 失败必须可报告，不能静默吞错。
  - 记录后续小步路线：JS data module build 设计、build 输出、JS / JSON 校验、`index.html` 加载但不接 `feedbackEngine`、shadow mode、comparison、制作人审核和 partial / active 接管。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 generated data loading 架构边界。
  - 比较 JSON fetch / JS data module / Node-only 三种路线的 async、script 顺序、cache query、fallback 和 UI smoke 风险。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.15 已完成 generated feedback data runtime loading docs / schema。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 本轮不实现 runtime loading。
- 本轮不生成 JS data module。
- 本轮不改 build script，不改 validator scripts。
- 本轮不改 generated JSON，不改 data，不改 `content_sheets`。
- 本轮不改 `index.html`，不改 `feedbackEngine`，不改 `feedbackRuntimeAdapter`。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.14 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.14-candidate`。
  - 记录 candidate 指向 `aa8f64c54c254a7902dcabac1cb8d9c5019f8cca`。
  - 记录 `v0.0.7.14-candidate` 已冻结并推送。
  - 记录 v0.0.7.14 已完成 feedbackEngine 旁路读取 generated data docs / schema。
  - 记录当前未推进 v0.0.7.15。

### 阶段边界

- `v0.0.7.14-candidate` 已冻结并推送。
- candidate 指向 `aa8f64c54c254a7902dcabac1cb8d9c5019f8cca`。
- v0.0.7.14 已完成 feedbackEngine 旁路读取 generated data docs / schema。
- 已明确 debug-only / shadow / partial / active 边界。
- 已明确 generated 缺失、校验失败、adapter unavailable 时走 legacy，且必须可报告，不能静默吞错。
- 已明确玩家可见 feedback 变化需要制作人审核和 golden 记录。
- 本轮未实现 runtime 接入。
- 未改 `feedbackEngine` / `feedbackRuntimeAdapter`。
- 未改 generated JSON / `content_sheets`。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.14`。
- 当前未推进 v0.0.7.15。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.14

本轮为 feedbackEngine 旁路读取 generated data docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 设计未来 `feedbackEngine` 旁路读取 generated feedback data 的渐进路线。
  - 明确 feature flag、debug-only、shadow、partial、active 和 fallback 边界。
  - 明确 legacy feedback 与 generated candidate 的 comparison 方式。
  - 明确制作人审核节点和 active 接管前的 golden expected 规则。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 adapter / generated data / `feedbackEngine` 分层边界。
  - 明确 generated data 是文案池来源，不是机制判断层。
  - 明确不允许内容 if 或文案主键回潮。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.14 已完成 feedbackEngine 旁路读取 generated data docs / schema。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 本轮不实现 runtime 接入。
- 本轮不改 `core/feedbackEngine.js`，不改 `core/feedbackRuntimeAdapter.js`。
- 本轮不改 generated JSON，不改 `content_sheets` CSV / JSON 样例。
- 本轮不改 data、scripts、runtime、UI、`index.html`。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.13 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.13-candidate`。
  - 记录 candidate 指向 `baf90df2b1c67f15d53b8c26c2edf3b0dedf452a`。
  - 记录 `v0.0.7.13-candidate` 已冻结并推送。
  - 记录 v0.0.7.13 已增强 feedback runtime adapter 结构保护。
  - 记录当前未推进 v0.0.7.14。

### 阶段边界

- `v0.0.7.13-candidate` 已冻结并推送。
- candidate 指向 `baf90df2b1c67f15d53b8c26c2edf3b0dedf452a`。
- v0.0.7.13 已增强 feedback runtime adapter 结构保护。
- adapter check 覆盖 metadata、stable ID 查询、tag / scene 查询、includeDisabled、filters、只读行为、invalid data。
- adapter 当前仍不接 `feedbackEngine`，不影响玩家最终 feedback。
- adapter 仍只读，不承载机制判断，不自动选择最终 feedback。
- validator / build / generated validator / adapter check / golden 均通过。
- 未改 `feedbackEngine` / `data/feedbackTexts.js` / generated JSON / `content_sheets`。
- 未改 runtime、UI、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.13`。
- 当前未推进 v0.0.7.14。

### 验证结果

- `node scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：Errors 0，Warnings 12，warnings 均为制作人审核提醒。
- Build：通过，且未造成 generated JSON 无意义 diff。
- Generated validator：Errors 0，Warnings 0。
- Golden samples：20/20 passed。
- `git diff --check` 通过。

## v0.0.7.13

本轮强化 feedback runtime adapter 结构保护。

### 本轮新增 / 更新

- 更新 `scripts/content/checkFeedbackRuntimeAdapter.js`
  - 扩展 adapter check 覆盖 metadata、stable `textId` 查询、`feedbackTag` / `scene` 查询、`includeDisabled`、通用 filters、只读返回对象、源 generated data 不被污染和 invalid data unavailable 状态。
  - 明确检查 `zhCN` / 中文文案不能作为 adapter 查询主键。
  - 明确 invalid data 不会偷偷 fallback 到 legacy 文案。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 v0.0.7.13 adapter 结构保护覆盖范围。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 adapter check 是接入 `feedbackEngine` 前的结构安全网。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.13 已完成 feedback runtime adapter 结构保护。

### 阶段边界

- 本轮不修改 `core/feedbackRuntimeAdapter.js`。
- 本轮不接 `core/feedbackEngine.js`，不修改 `data/feedbackTexts.js`。
- 本轮不改 generated feedback JSON，不改 `content_sheets`。
- 本轮不改 runtime、UI、`index.html`。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `node --check core/feedbackRuntimeAdapter.js` 通过。
- `node --check scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Adapter check：`node scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12，warnings 均为制作人审核提醒。
- Build：`node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过，且未造成 generated JSON 无意义 diff。
- Generated validator：`node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json` 通过，Errors 0，Warnings 0。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.12 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.12-candidate`。
  - 记录 candidate 指向 `9d849d835b998e4829a2fdf5eac225393c3f85fa`。
  - 记录 `v0.0.7.12-candidate` 已冻结并推送。
  - 记录 v0.0.7.12 已实现 feedback runtime adapter 第一版只读模块。
  - 记录当前未推进 v0.0.7.13。

### 阶段边界

- `v0.0.7.12-candidate` 已冻结并推送。
- candidate 指向 `9d849d835b998e4829a2fdf5eac225393c3f85fa`。
- v0.0.7.12 已实现 feedback runtime adapter 第一版只读模块。
- adapter 当前不接 `core/feedbackEngine.js`，不影响玩家最终 feedback。
- adapter 不读取 CSV / Google Sheets，只接收 generated feedback data object。
- adapter 不承载机制判断，不自动选择最终 feedback。
- Adapter check / validator / build / generated validator / golden 均通过。
- 未改 `core/feedbackEngine.js` / `data/feedbackTexts.js` / generated JSON / `content_sheets`。
- 未改 runtime、UI、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.12`。
- 当前未推进 v0.0.7.13。

### 验证结果

- `node --check core/feedbackRuntimeAdapter.js` 通过。
- `node --check scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Adapter check：`node scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- Build：`node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过，且未造成 generated JSON 无意义 diff。
- Generated validator：`node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json` 通过，Errors 0，Warnings 0。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.12

本轮实现 feedback runtime adapter 第一版只读模块。

### 本轮新增 / 更新

- 新增 `core/feedbackRuntimeAdapter.js`
  - 提供 `createFeedbackRuntimeAdapter(generatedFeedbackData)`。
  - 支持 `getTextById`、`getTextsByTag`、`getTextsByScene`、`getEnabledTexts`、`getMetadata` 和 `isAvailable`。
  - 默认只返回 enabled 文案；`includeDisabled: true` 可用于审阅 disabled 文案。
  - 只接收 generated feedback data object，不读取 CSV / Google Sheets / `content_sheets`。
  - 对 invalid generated data 返回不可用 adapter，并在 metadata 中报告 issues。
- 新增 `scripts/content/checkFeedbackRuntimeAdapter.js`
  - 验证 adapter 可创建、按 `textId` / `feedbackTag` / `scene` 查询、默认排除 disabled 文案、`includeDisabled` 可看到 disabled 文案、不存在 textId 返回 `null`、查询不依赖 `zhCN`、invalid data 会产生不可用 adapter。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 adapter 第一版只读实现、查询方法、disabled 处理方式和 invalid data 边界。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 adapter 是 generated data 的只读访问层，不读取 CSV / Google Sheets，不接管 `feedbackEngine`。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.12 已完成 feedback runtime adapter 只读实现。

### 阶段边界

- 本轮不接 runtime，不修改 `index.html`。
- 本轮不改 `core/feedbackEngine.js`，不改 `data/feedbackTexts.js`。
- 本轮不改 generated feedback JSON，不改 `content_sheets` CSV / JSON 样例。
- 本轮不改 validator / build scripts。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- `node --check core/feedbackRuntimeAdapter.js` 通过。
- `node --check scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Adapter check：`node scripts/content/checkFeedbackRuntimeAdapter.js` 通过。
- Feedback sheet validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0。
- Build：`node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过，且未造成 generated JSON 无意义 diff。
- Generated validator：`node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json` 通过，Errors 0。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.11 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.11-candidate`。
  - 记录 candidate 指向 `0c6b70a0f17540edeb55e31eddf7a4d81b5f7c2a`。
  - 记录 `v0.0.7.11-candidate` 已冻结并推送。
  - 记录 v0.0.7.11 已完成 feedback runtime adapter docs / schema。
  - 记录当前未推进 v0.0.7.12。

### 阶段边界

- `v0.0.7.11-candidate` 已冻结并推送。
- candidate 指向 `0c6b70a0f17540edeb55e31eddf7a4d81b5f7c2a`。
- v0.0.7.11 已完成 feedback runtime adapter docs / schema。
- 已明确 adapter 不承载机制判断。
- 已明确 adapter 不读 CSV / Google Sheets，只读 generated data。
- 已明确 fallback 策略和渐进接入路线。
- 本轮未实现 runtime adapter。
- 未改 `core/feedbackEngine.js` / `data/feedbackTexts.js`。
- 未改 generated feedback JSON / `content_sheets`。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.11`。
- 当前未推进 v0.0.7.12。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## v0.0.7.11

本轮为 feedback runtime adapter docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 设计未来 feedback runtime adapter 的职责边界、API 草案、filters 边界、fallback 策略和渐进接入路线。
  - 明确 adapter 只返回只读文案候选，不直接决定评分、事故、饮品类型、`result.type` 或最终 feedback。
  - 明确 adapter 只读取 generated data，不读取 CSV / Google Sheets，不承担内容管线校验职责。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 validate / build / generated data / generated validator / adapter / feedbackEngine 的边界。
  - 明确 adapter 是 runtime 读取层，不是机制判断层，不承载具体内容 if。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.11 已完成 feedback runtime adapter docs / schema。

### 阶段边界

- 本轮只做 docs / schema 设计，不实现 runtime adapter。
- 本轮不改 runtime，不改 `core/feedbackEngine.js`，不改 `data/feedbackTexts.js`。
- 本轮不改 scripts，不改 generated data，不改 `content_sheets` CSV / JSON 样例。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.10 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.10-candidate`。
  - 记录 candidate 指向 `266e433b2a63c07ed3df34ea2d0e1f68c122244b`。
  - 记录 `v0.0.7.10-candidate` 已冻结并推送。
  - 记录 v0.0.7.10 已实现 generated feedback data 结构校验脚本。
  - 记录当前未推进 v0.0.7.11。

### 阶段边界

- `v0.0.7.10-candidate` 已冻结并推送。
- candidate 指向 `266e433b2a63c07ed3df34ea2d0e1f68c122244b`。
- v0.0.7.10 已实现 generated feedback data 结构校验脚本。
- generated validator Errors 0 / Warnings 0 / exit 0。
- build 成功且 deterministic，无无意义 diff。
- generated JSON 合法。
- 当前仍未实现 runtime adapter / feedbackEngine 接入。
- 未改 `core/feedbackEngine.js` / `data/feedbackTexts.js` / `content_sheets`。
- 未改 runtime、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.10`。
- 当前未推进 v0.0.7.11。

### 验证结果

- Feedback sheet validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- Build：`node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过。
- Generated validator：`node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json` 通过，Errors 0，Warnings 0。
- Generated JSON：`python3 -m json.tool data/generated/feedbackTexts.generated.json` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.10

本轮实现 generated feedback data 结构校验脚本。

### 本轮新增 / 更新

- 新增 `scripts/content/validateGeneratedFeedbackData.js`
  - 支持 `node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json`。
  - 校验 generated JSON 顶层结构、`textsById`、`textsByTag`、`textsByScene` 和 `metadata`。
  - 检查 `textsByTag` / `textsByScene` 索引一致性。
  - 检查 `textId` / `feedbackTag` / index key 的 stable ID 边界。
  - 不自动修改 JSON，不自动修改 CSV，不自动修文案，不调参数。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 generated data validator 第一版已实现。
  - 记录 validate → build → generated validate → future runtime adapter 的离线链路。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 generated data validator 是内容管线安全层。
  - 记录它不承载机制判断，用于保护 build 输出结构。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.10 已完成 generated feedback data 结构校验脚本。

### 阶段边界

- 本轮不改 runtime，不改 `core/feedbackEngine.js`，不改 `data/feedbackTexts.js`。
- 本轮不改 `content_sheets` 源 CSV / JSON 样例。
- 本轮不改 build script。
- 本轮不改 golden samples / runner。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- generated data 当前仍不接 runtime。
- Validate / build / generated validation / golden 均通过。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node --check scripts/content/validateGeneratedFeedbackData.js` 通过。
- `node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- `node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过。
- `node scripts/content/validateGeneratedFeedbackData.js data/generated/feedbackTexts.generated.json` 通过，Errors 0，Warnings 0。
- `python3 -m json.tool data/generated/feedbackTexts.generated.json` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.9 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.9-candidate`。
  - 记录 candidate 指向 `bcb5dd0e72f64660c08bb4121ee06310fc044f42`。
  - 记录 `v0.0.7.9-candidate` 已冻结并推送。
  - 记录 v0.0.7.9 已实现 feedback sheet build script 第一版。
  - 记录当前未推进 v0.0.7.10。

### 阶段边界

- `v0.0.7.9-candidate` 已冻结并推送。
- candidate 指向 `bcb5dd0e72f64660c08bb4121ee06310fc044f42`。
- v0.0.7.9 已实现 feedback sheet build script 第一版。
- 已新增 generated feedback JSON。
- build 依赖 validator。
- validator Errors 0；warnings 为人工审核提醒。
- generated JSON 合法且中文可读。
- 当前仍未实现 runtime adapter / feedbackEngine 接入。
- 未改 `core/feedbackEngine.js` / `data/feedbackTexts.js`。
- 未改 runtime、`content_sheets`、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.9`。
- 当前未推进 v0.0.7.10。

### 验证结果

- Validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- Build：`node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过。
- Generated JSON：`python3 -m json.tool data/generated/feedbackTexts.generated.json` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.9

本轮实现 feedback sheet build script 第一版。

### 本轮新增 / 更新

- 新增 `scripts/content/buildFeedbackData.js`
  - 支持 `node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json`。
  - build 前调用 `scripts/content/validateFeedbackSheet.js`。
  - validator 有 error 时停止；只有 warning 时继续并报告 warning 数量。
  - 不修改源 CSV，不自动修文案，不自动改 `tone` / score / `scene`，不调参数。
- 新增 `data/generated/feedbackTexts.generated.json`
  - 由 sample CSV 生成。
  - 以 stable `textId` 建 `textsById`。
  - 按 `feedbackTag` / `scene` 生成分组。
  - 保留 disabled 文案，并通过 `enabled: false` 表达状态。
  - 空 score 转为 `null`；空 optional stable ID 转为 `null`。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 build 第一版输入 / 输出路径、generated JSON 结构和字段转换规则。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 build 是离线生成层，不是机制判断层。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.9 已实现 feedback sheet build script 第一版。

### 阶段边界

- 本轮只建立 validate → build → generated JSON 的离线链路。
- generated data 当前不接 runtime，不替代 `data/feedbackTexts.js`。
- 本轮不实现 runtime adapter。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不改 `content_sheets` 源 CSV / JSON 样例。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- validator 通过 sample CSV：Errors 0，Warnings 12，均为人工审核提醒。
- Generated JSON 合法。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node --check scripts/content/buildFeedbackData.js` 通过。
- `node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- `node scripts/content/buildFeedbackData.js content_sheets/examples/feedback_texts.sample.csv --out data/generated/feedbackTexts.generated.json` 通过。
- `python3 -m json.tool data/generated/feedbackTexts.generated.json` 通过。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- `git diff --check` 通过。

## docs: sync v0.0.7.8 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.8-candidate`。
  - 记录 candidate 指向 `98b1dc3b19f25bf0b2394546de1255c19dad9d1f`。
  - 记录 `v0.0.7.8-candidate` 已冻结并推送。
  - 记录 v0.0.7.8 已完成 feedback sheet build pipeline 设计。
  - 记录当前未推进 v0.0.7.9。

### 阶段边界

- `v0.0.7.8-candidate` 已冻结并推送。
- candidate 指向 `98b1dc3b19f25bf0b2394546de1255c19dad9d1f`。
- v0.0.7.8 已完成 feedback sheet build pipeline 设计。
- 已明确 build 不承载机制判断。
- 已明确 validate / build / runtime adapter 边界。
- 已明确 generated data 使用 stable ID。
- 本轮未新增 build script / generated data。
- 未改 validate script / CSV / JSON 样例。
- 未改 runtime、data、scripts、`content_sheets`、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.8`。
- 当前未推进 v0.0.7.9。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.8

本轮为 feedback sheet build script 设计。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充未来 `buildFeedbackData` 的输入 / 输出边界。
  - 设计 generated feedback data 的轻量结构建议。
  - 明确 `validateFeedbackSheet` / build / generated data / runtime adapter 边界。
  - 明确 disabled 文案处理建议、`textId` / `feedbackTag` / `scene` 分组策略和空值转换规则。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 build script 是内容管线生成层，不是机制判断层。
  - 明确 build 必须依赖 validate。
  - 明确 generated data 以 stable ID 为主。
  - 明确 build 不允许写内容 if 或样本硬编码。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.8 已完成 feedback sheet build script 设计。
  - 记录当前未实现 build script，未新增 generated data / runtime 导入。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 本轮不改 runtime，不改 data，不改 runner，不改 `content_sheets` 样例。
- 本轮不改 `scripts/content/validateFeedbackSheet.js`，不新增 build script。
- 本轮不新增 generated data，不接 runtime。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.7 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.7-candidate`。
  - 记录 candidate 指向 `a4af2ef414b04462cd0eec6d4b97b6b43fd8bb46`。
  - 记录 `v0.0.7.7-candidate` 已冻结并推送。
  - 记录 v0.0.7.7 已落地用户在 Google Sheets 中人工修订后的 feedback_texts 样例内容。
  - 记录当前未推进 v0.0.7.8。

### 阶段边界

- `v0.0.7.7-candidate` 已冻结并推送。
- candidate 指向 `a4af2ef414b04462cd0eec6d4b97b6b43fd8bb46`。
- v0.0.7.7 已落地用户在 Google Sheets 中人工修订后的 feedback_texts 样例内容。
- CSV 保持 UTF-8 with BOM。
- JSON 样例已同步更新且合法。
- validator Errors 0；warnings 为人工审核提醒。
- 未改 runtime、data、scripts、`index.html`。
- 未改 `data/feedbackTexts.js` / `core/feedbackEngine.js`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.7`。
- 当前未推进 v0.0.7.8。

### 验证结果

- JSON 合法性：`python3 -m json.tool content_sheets/examples/feedback_texts.sample.json` 通过。
- Validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.7

本轮落地用户在 Google Sheets 中人工修订后的 `feedback_texts` 样例内容。

### 本轮新增 / 更新

- 更新 `content_sheets/examples/feedback_texts.sample.csv`
  - 使用用户从 Google Sheets 导出的 CSV：`/Users/yui/工作文件/奶茶实验室/文案表/样例内容制作人修订0603 - feedback_texts.sample.csv`。
  - 按项目稳定字段顺序写回。
  - 保存为 UTF-8 with BOM。
  - 保留用户修订文案，不做 Codex 润色。
- 更新 `content_sheets/examples/feedback_texts.sample.json`
  - 从同一份用户修订 CSV 同步生成。
  - 保持 UTF-8、格式化缩进和中文可读。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.7 已落地用户人工修订后的 feedback_texts 样例内容。
  - 记录当前仍未接 runtime，仍未实现 build script / generated data。

### 阶段边界

- 本轮是内容样例更新，不接 runtime。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不改评分、事故、饮品类型、feedback runtime、`result.type` 或 golden expected。
- 本轮不改 validator，不新增 build script，不新增 generated data。
- CSV 保持 UTF-8 with BOM。
- JSON 样例同步更新且合法。
- validator 通过 sample CSV，Errors 0；Warnings 12，均为人工审核提醒。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- CSV 编码：`has_utf8_bom: True`。
- JSON 合法性：`python3 -m json.tool content_sheets/examples/feedback_texts.sample.json` 通过。
- Validator：`node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 12。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.6 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.6-candidate`。
  - 记录 candidate 指向 `f3c71351c77bf7e50f97e92533a0546ccddaf363`。
  - 记录 `v0.0.7.6-candidate` 已冻结并推送。
  - 记录 v0.0.7.6 已实现 validate feedback sheet 第一版脚本。
  - 记录当前未推进 v0.0.7.7。

### 阶段边界

- `v0.0.7.6-candidate` 已冻结并推送。
- candidate 指向 `f3c71351c77bf7e50f97e92533a0546ccddaf363`。
- v0.0.7.6 已实现 validate feedback sheet 第一版脚本。
- validator 通过 sample CSV，Errors 0；warnings 为人工审核提醒。
- validator 检查 UTF-8 with BOM、`textId` 唯一性、`enabled`、`scene`、`tone`、score、optional stable ID 等基础规则。
- validator 不承载机制判断、不自动修改 CSV、不调参数。
- 未改 runtime、data、`content_sheets`、`index.html`。
- 未改 `data/feedbackTexts.js` / `core/feedbackEngine.js`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.6`。
- 当前未推进 v0.0.7.7。

### 验证结果

- `node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0，Warnings 14。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.6

本轮实现 validate feedback sheet 第一版脚本。

### 本轮新增 / 更新

- 新增 `scripts/content/validateFeedbackSheet.js`
  - 支持 `node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv`。
  - 检查 UTF-8 with BOM、CSV parser 可读性、完整表头、列数错位、未闭合引号、必填字段、`textId` 唯一性、启用行 `zhCN`、枚举、score 范围和 optional stable ID 基础格式。
  - 输出 error / warning / info；error 非 0 退出，warning 默认不阻塞。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 validator 第一版已实现。
  - 记录当前支持的 error / warning / info。
  - 记录当前只校验 sample CSV / 显式传入 CSV。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 validator 是内容管线安全层，不承载机制判断。
  - 明确 validator 不自动修文案、不调参数、不生成 runtime data。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.6 已完成 validate feedback sheet 第一版脚本。
  - 记录当前仍未实现 build script / generated data / runtime 导入。

### 阶段边界

- 本轮不改 runtime，不改 data，不改 runner，不改 golden samples。
- 本轮不改 `content_sheets/examples/feedback_texts.sample.csv` 或 `content_sheets/examples/feedback_texts.sample.json`。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不新增 build script，不新增 generated data。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- sample CSV validation 通过：Errors 0，warning 仅作人工审核提醒，不阻塞。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- `node --check scripts/content/validateFeedbackSheet.js` 通过。
- `node scripts/content/validateFeedbackSheet.js content_sheets/examples/feedback_texts.sample.csv` 通过，Errors 0。
- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.5 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.5-candidate`。
  - 记录 candidate 指向 `c433bd32d761dda819bfa052093b76c5872c8306`。
  - 记录 `v0.0.7.5-candidate` 已冻结并推送。
  - 记录 v0.0.7.5 已完成 validate feedback sheet 脚本设计。
  - 记录当前未推进 v0.0.7.6。

### 阶段边界

- 已明确 validator 不承载机制判断。
- 已明确 validate / build / runtime 边界。
- 已明确 error / warning / info 等级。
- 本轮未新增 validate script / build script / generated data。
- 未改 CSV / JSON 样例。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.5`。
- 当前未推进 v0.0.7.6。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.5

本轮为 validate feedback sheet 脚本设计。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充未来 feedback sheet validator 的输入 / 输出设计。
  - 设计文件编码、CSV 格式、主键唯一性、枚举、分数、stable ID 引用和文案字段校验规则。
  - 设计 error / warning / info 等级。
  - 明确人类编辑源、validate、build、generated data 和 runtime 的边界。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 validator 是内容管线安全层，不是 runtime 判定层。
  - 明确 validator 不承载机制判断，不允许写具体内容 if。
  - 明确 validate / build / runtime 三层边界。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.5 已完成 validate feedback sheet 脚本设计。
  - 记录当前仍未实现 validate script / build script / generated data。

### 阶段边界

- 本轮只做 docs / schema 设计。
- 本轮不改 runtime，不改 data，不改 runner，不改 golden samples。
- 本轮不改 `content_sheets` 样例，不新增 / 修改 CSV 或 JSON。
- 本轮不新增 validate script / build script / generated data。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.4 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.4-candidate`。
  - 记录 candidate 指向 `9fc76b912f4e5c92f0920cf6f556f0c15f053119`。
  - 记录 `v0.0.7.4-candidate` 已冻结并推送。
  - 记录 v0.0.7.4 已完成 feedback_texts 样例表格 / JSON 草案。
  - 记录当前未推进 v0.0.7.5。

### 阶段边界

- v0.0.7.4 已新增 feedback_texts 样例表格 / JSON 草案。
- CSV 已修复为 UTF-8 with BOM。
- 用户已从文件夹直接打开当前 repo CSV，确认中文正常、列正确分开、表格可读。
- Excel 最近文件缓存不作为验收依据。
- 样例文件不接 runtime，不替代 `data/feedbackTexts.js`。
- 未改 `data/feedbackTexts.js` / `core/feedbackEngine.js`。
- 未新增 validate script / build script / generated data。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.4`。
- 当前未推进 v0.0.7.5。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- CSV 编码：`content_sheets/examples/feedback_texts.sample.csv` 为 UTF-8 with BOM。
- JSON 合法性：`python3 -m json.tool content_sheets/examples/feedback_texts.sample.json` 通过。

## v0.0.7.4

本轮新增 feedback_texts 样例表格 / JSON 草案。

### 本轮新增 / 更新

- 新增 `content_sheets/examples/feedback_texts.sample.csv`
  - 提供 10 行人类可编辑样例，覆盖 classic、premium、acid_accident、greasy_overload、straw_disaster、durian、normal_good、followup、fallback 和 disabled 等代表场景。
  - 使用 stable `textId` / `feedbackTag`，`zhCN` 仅作为显示文案列。
  - 保存为 UTF-8 with BOM，避免 Excel 直接打开时中文乱码。
- 新增 `content_sheets/examples/feedback_texts.sample.json`
  - 提供与 CSV 对应的 JSON 草案，用于观察未来 generated / adapter 数据形状。
  - 当前不是 generated data，不接 runtime。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 明确 sample 用于验证人类编辑体验和后续 validate 脚本设计。
  - 明确 sample 不是正式数据源，不替代 `data/feedbackTexts.js`。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 `content_sheets/examples/` 属于内容管线草案层。
  - 明确 runtime 不直接读取 sample，generated data / adapter 必须等后续任务单独实现。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.4 已新增 feedback_texts 样例表格 / JSON 草案。
  - 记录当前仍未实现 validate script / build script / generated data。

### 阶段边界

- 本轮不改 runtime，不改 data，不改 runner，不改 golden samples。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不新增 validate script / build script / generated data。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- JSON 合法性：`python3 -m json.tool content_sheets/examples/feedback_texts.sample.json` 通过。
- CSV 编码：`content_sheets/examples/feedback_texts.sample.csv` 已确认 UTF-8 with BOM。

## docs: sync v0.0.7.3 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.3-candidate`。
  - 记录 candidate 指向 `0a7c6331440c95195f931f776c79a31abfda1f96`。
  - 记录 `v0.0.7.3-candidate` 已冻结并推送。
  - 记录 v0.0.7.3 已完成调参阶段反 if guardrail。
  - 记录当前未推进 v0.0.7.4。

### 阶段边界

- 已明确 v0.0.7.x 后续调参、文案、severity、threshold、golden expected 和表格化内容管线任务仍需防止内容 if。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.3`。
- 当前未推进 v0.0.7.4。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.3

本轮为 v0.0.7.x 调参阶段反 if guardrail。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.7.x 调参阶段仍有 if 地狱风险。
  - 明确 feedback 选择、severity / `scoreMultiplier`、threshold、candidate 接管、表格导入校验和 golden expected 更新都可能重新引入内容 if。
  - 明确调参数 / 调标签 / 调 threshold / 调 severity 应优先通过 rule table / schema / 表格 / generated data 解决。
  - 明确 engine 继续只负责汇总、调度和通用判断，不允许为单个样本或具体文案写临时内容 if。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 v0.0.7.x 反馈文案、severity、threshold、golden expected 调整流程中的反 if 原则。
  - 明确人类制作人审核主观体验、文案审美和判定合理性，Codex 不应自行硬编码审美判断。
  - 明确表格化内容管线是降低内容 if 风险的主要工具，但不能绕过校验和 golden 回归。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.3 已完成调参阶段反 if guardrail。
  - 记录 v0.0.7.x 后续实现任务必须自查是否新增内容 if、是否锁死数值、是否绕过表格化管线、是否把显示文案当主键。
  - 记录当前未创建 `v0.0.7.3-candidate`。

### 阶段边界

- 本轮只做 docs / guardrail。
- 本轮不改 runtime，不改 data，不改 runner，不改 golden samples。
- 本轮不新增 CSV / JSON / generated data / validate script / build script。
- 本轮不调参数，不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.2 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.2-candidate`。
  - 记录 candidate 指向 `d75df9c530f261de19e8c67eb3811ee85b663926`。
  - 记录 `v0.0.7.2-candidate` 已冻结并推送。
  - 记录 v0.0.7.2 已完成 feedback 文案表格化 schema docs。
  - 记录当前未推进 v0.0.7.3。

### 阶段边界

- 已明确用户后续不应长期直接编辑 JS。
- 已明确 stable ID / `feedbackTag` / `textId` 是主路径。
- 已明确 `zhCN` / 文案不是机制主键。
- 本轮未新增 CSV / JSON / generated data / validate script / build script。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.2`。
- 当前未推进 v0.0.7.3。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.2

本轮为 feedback 文案表格化 schema docs。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充未来 `feedback_texts` 表格 schema。
  - 设计 `textId`、`feedbackTag`、`scene`、`zhCN`、`tone`、`minScore`、`maxScore`、`accidentTypeId`、`drinkTypeId`、`outcomeTypeId`、`audienceId`、`testerId`、`enabled`、`notes` 等字段边界。
  - 补充 future validate 规则：`textId` 去重、`feedbackTag` 必填、`scene` / `enabled` 枚举、分数范围、stable ID 校验、启用文案不可为空、禁止把中文文案当机制主键。
  - 记录与现有 `data/feedbackTexts.js` / `core/feedbackEngine.js` 的兼容边界和后续小步路线。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 feedback 文案属于内容层，不应承担机制主键。
  - 明确 stable `feedbackTag` / `textId` / `accidentTypeId` / `drinkTypeId` / `outcomeTypeId` 是 future 表格化主路径。
  - 明确表格化管线必须经过校验和 golden 回归，不应绕过测试。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.2 已完成 feedback 文案表格化 schema docs。
  - 记录当前未实现表格化内容管线，未新增 CSV / JSON / generated data / validate script / build script。
  - 记录当前未创建 `v0.0.7.2-candidate`。

### 阶段边界

- 本轮只做 docs / schema。
- 本轮不新增 CSV / Excel / JSON 文件。
- 本轮不新增 generated data，不新增 validate script，不新增 build script。
- 本轮不实现导入，不改 runtime，不改 data，不改 runner，不改 golden expected。
- 本轮不改 `data/feedbackTexts.js`，不改 `core/feedbackEngine.js`。
- 本轮不改评分、事故、饮品类型、feedback、`result.type`。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.1 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.1-candidate`。
  - 记录 candidate 指向 `ddfc60c3d052a8d6ca18227949c4ef137d3aca05`。
  - 记录 `v0.0.7.1-candidate` 已冻结并推送。
  - 记录 v0.0.7.1 已完成表格化内容管线 docs / schema。
  - 记录当前未推进 v0.0.7.2。

### 阶段边界

- 已明确用户后续不应长期直接编辑 JS。
- 已明确 stable ID 作为表格主键。
- 已明确 `displayName` / 文案不是机制主键。
- 本轮未新增 CSV / JSON / generated data / build script。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.1`。
- 当前未推进 v0.0.7.2。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.1

本轮为表格化内容管线 docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.7.x 调参阶段为什么需要内容管线。
  - 明确 Excel / Google Sheets / CSV / JSON 是人类编辑源，generated JSON / JS 是游戏 runtime 读取源。
  - 明确 stable ID / display text 分离原则继续适用，表格主键不得使用中文 displayName 或显示文案。
  - 明确校验层是必要安全网，表格化管线不能绕过 golden samples。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充适合表格化的内容范围：feedback 文案、tags、severity、threshold、profile 可调字段、golden expected 和 localization。
  - 设计 future CSV / Excel / Google Sheets / JSON 工作流边界。
  - 补充 future 目录规划示例，但本轮不创建目录或文件。
  - 补充 `feedback_texts.csv`、`severity_rules.csv`、`candidate_thresholds.csv`、`localization_texts.csv` 代表 schema 示例。
  - 记录初期优先级：feedback 文案 / `feedbackTags` 优先，其次 severity / threshold，再到 profile 可调字段和多语言文案。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.7.1 已完成表格化内容管线 docs / schema。
  - 记录当前未实现表格化内容管线，未新增 CSV / JSON / build script，未创建 `v0.0.7.1-candidate`。

### 阶段边界

- 本轮只做 docs / schema。
- 本轮不新增 CSV / Excel / JSON 文件。
- 本轮不新增 generated data，不新增 build script。
- 本轮不实现导入，不改 runtime，不改 data，不改 runner，不改 golden expected。
- 本轮不调参数，不改评分、事故、饮品类型、feedback 或 `result.type`。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.7.0 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.7.0-candidate`。
  - 记录 candidate 指向 `f0b5e945fc4c51984162226e7aa4e9da4d235688`。
  - 记录 `v0.0.7.0-candidate` 已冻结并推送。
  - 记录 v0.0.7.0 已完成 v0.0.7.x 调参路线与表格化内容管线边界设计。
  - 记录当前未推进 v0.0.7.1。

### 阶段边界

- v0.0.7.x 明确以参数、标签、阈值、severity、`scoreMultiplier`、golden expected 和表格化内容管线为主。
- 本轮未实现 CSV / Excel / JSON 导入。
- 未新增文件、脚本或 runtime。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.7.0`。
- 当前未推进 v0.0.7.1。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.7.0

本轮为 v0.0.7.x 调参路线与表格化内容管线边界设计。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.7.x 阶段边界：v0.0.7.x 主要是调参、调标签、调阈值、调 severity 和 `scoreMultiplier`。
  - 明确 v0.0.6.x 已完成三层 summary、`summaryCandidates`、`candidatePriorityShell` 系统地基；v0.0.7.x 不应再承担大块系统搭建。
  - 明确调参应基于已有 summary / candidate / priority shell 结构。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 v0.0.7.x 调参路线。
  - 补充表格化内容管线方向：用户后续不应长期直接编辑 JS，表格可作为编辑源，runtime 更适合读取校验后生成的 JSON 或 JS。
  - 记录适合表格化的内容范围，包括 feedback 文案、tags、thresholds、severity、`scoreMultiplier`、candidate rules、profile 可调字段、golden expected 和多语言文案。
  - 记录导入前应校验 stable ID、显示文案主键、数值范围、必填字段、枚举值、重复 ID 和 golden samples 影响。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.x final 收口审计已完成，P0 / P1 均为无。
  - 记录 v0.0.7.x 规划开始。
  - 记录当前未实现表格化内容管线，未创建 `v0.0.7.0-candidate`。

### 阶段边界

- 本轮只做 docs / planning。
- 本轮不实现表格导入，不新增 CSV / Excel / JSON 文件，不新增 build script。
- 本轮不改 runtime、data、runner 或 golden expected。
- 本轮不改评分、事故、饮品类型、feedback、`result.type`。
- Golden samples 20/20 passed。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.18 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.18-candidate`。
  - 记录 candidate 指向 `dfac8e70ba4880e6f49eae3bcb1ff45a32b1bd35`。
  - 记录 `v0.0.6.18-candidate` 已冻结并推送。
  - 记录 v0.0.6.18 已完成 v0.0.6.x final 收口审计。
  - 记录当前未推进 v0.0.7.x。

### 阶段边界

- P0：无。
- P1：无。
- P2：可留到 v0.0.7.x 或更后，不阻塞收口。
- 结论：v0.0.6.x 系统地基可以进入 final candidate / 收口流程。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.6.18`。
- 未推进 v0.0.7.x。
- 当前仍未做路径标准化；路径标准化可作为后续单独 housekeeping 任务，不属于本 candidate。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.18

本轮为 v0.0.6.x final 收口审计。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.6.x final 收口审计结论。
  - 确认三层 summary、`summaryCandidates`、`candidatePriorityShell` 均已进入 `result`，且均已有 golden 结构保护。
  - 明确 P0 / P1 / P2 分级：P0 无，P1 无，P2 留到 v0.0.7.x 或更后续方向。
  - 明确 v0.0.6.x 系统地基可以进入 final candidate 冻结流程。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 summary -> candidate -> priority shell -> legacy result 的完整链路审计。
  - 核对 `result` 输出字段、只读边界、evidence / metadata / source / trigger / priority / severity hint 贯通。
  - 记录 `feedbackTags` / `outcomeTypeId` / `drinkTypeId` / `accidentTypeId` 等候选承载位已具备位置。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.18 final 审计状态。
  - 记录当前未创建 `v0.0.6.18-candidate`。

### 阶段边界

- 本轮只做 docs / final 收口审计，不改 runtime、data、runner 或 golden expected。
- 本轮不实现新 engine，不改 `tasteJudge`、summary engines、candidate engine、priority shell engine 或 `index.html`。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 本轮不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.17 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.17-candidate`。
  - 记录 candidate 指向 `c6c369c9f3a95ffad01c3a85869b4b4cc7a7f67a`。
  - 记录 `v0.0.6.17-candidate` 已冻结并推送。
  - 记录 v0.0.6.17 已完成 v0.0.6.x 后半段收口复盘。
  - 记录当前未推进 v0.0.6.18。

### 阶段边界

- 三层 summary、`summaryCandidates`、`candidatePriorityShell` 均已接入 `result`，且有 golden 结构保护。
- 未发现阻止进入 final 收口审计的 P0。
- P1 / P2 遗留项已具体展开。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.6.17`。
- 未推进 v0.0.6.18。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.17

本轮为 v0.0.6.x 后半段收口复盘。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.6.x 后半段收口复盘。
  - 确认三层 summary、`summaryCandidates`、`candidatePriorityShell` 均已接入 `result`，且均有 golden 结构保护。
  - 记录当前未发现阻止进入 final 收口审计的 P0。
  - 具体列出 P1 final 收口审计核对项，包括结构一致性、`result` 输出字段、evidence / metadata / source / trigger / priority / severity hint 贯通、ID 承载位和 golden 结构断言覆盖。
  - 具体列出 P2 后续方向，包括更丰富 golden、relation matrix、表格化内容管线、更多 candidate 类型、profile / tag / metadata 扩展和内容管理 / 数据审计。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充三层 summary -> candidate -> priority shell 的完整链路概览。
  - 明确当前链路仍不接管最终 result。
  - 记录 v0.0.7.x 之后再逐步接入 severity / `scoreMultiplier` / golden expected 调优。
  - 明确 P2 不属于 v0.0.6.x final 收口审计前必须完成的阻塞项。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.17 本地复盘状态。
  - 记录当前未创建 `v0.0.6.17-candidate`。

### 阶段边界

- 本轮只做 docs / 复盘，不改 runtime、data、runner 或 golden expected。
- 本轮不实现新 runtime，不新增 engine，不改 `tasteJudge`、summary engines、candidate engine 或 priority shell engine。
- 本轮不改评分、事故、饮品类型、feedback 或 `result.type`。
- 本轮不做 severity / `scoreMultiplier`。
- 本轮不做表格化内容管线。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.16 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.16-candidate`。
  - 记录 candidate 指向 `303b5834821669d4e928acd3321994e607135c15`。
  - 记录 `v0.0.6.16-candidate` 已冻结并推送。
  - 记录 v0.0.6.16 已完成 `candidatePriorityShell` golden 结构断言。
  - 记录当前未推进 v0.0.6.17。

### 阶段边界

- runner 已支持 `candidatePriorityShell` expected。
- 少量 golden samples 已补 `candidatePriorityShell` 结构 expected。
- 未改 runtime、core、`index.html` 或 `candidatePriorityShellEngine`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 未做 priority 接管 / 最终调度 / severity / `scoreMultiplier`。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.6.16`。
- 未推进 v0.0.6.17。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.16

本轮新增 `candidatePriorityShell` golden 结构断言能力。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 加载 `core/candidatePriorityShellEngine.js`，确保 golden runner 与页面 runtime 的 summary candidate -> priority shell 链路一致。
  - 新增 `candidatePriorityShell` 结构检查，保护 `orderedCandidates` / `byPriorityBand` / `topCandidates` / `metadata` 容器结构。
  - 支持 `priorityBandIncludes`、`orderedCandidateCountMin`、`candidateIncludesAny` 和 `metadataIncludes` expected。
- 更新 `data/goldenSamples.js`
  - 给少量代表样本增加 `candidatePriorityShell` expected。
  - 覆盖稳定普通样本、taste accident、flavor identity 和 texture blocking 路径。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.16 本地测试安全网状态。
  - 记录当前未创建 `v0.0.6.16-candidate`。

### 阶段边界

- 本轮只新增测试安全网，不改 runtime、core、`index.html` 或 `candidatePriorityShellEngine`。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 本轮不做最终调度 / priority 接管 / severity / `scoreMultiplier`。
- 本轮不锁死具体排序数值、severity 数值或 `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.15 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.15-candidate`。
  - 记录 candidate 指向 `b1e145eb69525359fd815d4f545ca248dfcafdcd`。
  - 记录 `v0.0.6.15-candidate` 已冻结并推送。
  - 记录 v0.0.6.15 已完成 `candidatePriorityShell` 只读地基。
  - 记录当前未推进 v0.0.6.16。

### 阶段边界

- `result.candidatePriorityShell` 已暴露。
- priority shell 是只读中间观察层，不接管最终判定。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未做最终调度 / severity / `scoreMultiplier`。
- UI smoke 已通过，console error 数为 0。
- 未创建正式 tag `v0.0.6.15`。
- 未推进 v0.0.6.16。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.15

本轮新增 `candidatePriorityShell` 只读地基。

### 本轮新增 / 更新

- 新增 `core/candidatePriorityShellEngine.js`
  - 提供 `buildCandidatePriorityShell(summaryCandidates)` 入口。
  - 将既有 `summaryCandidates` 组织为只读候选排队观察结构。
  - 输出 `orderedCandidates`、`byPriorityBand`、`topCandidates` 和 `metadata`。
- 更新 `core/tasteJudge.js`
  - `result.candidatePriorityShell` 已暴露。
  - `tasteJudge` 只调用 priority shell 构建入口，不接管 priority 细节。
- 更新 `index.html`
  - 页面版本号更新为 `v0.0.6.15`。
  - 在 `core/tasteJudge.js` 之前加载 `core/candidatePriorityShellEngine.js`。
  - 更新相关 runtime script cache query。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.15 本地实现状态。
  - 记录当前未创建 `v0.0.6.15-candidate`。

### 阶段边界

- priority shell 是只读中间观察层。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不影响 `audience`、`drinkTypeId`、`accidentTypeId`、`outcomeTypeId` 或 `feedbackTags`。
- 本轮不做最终调度 / priority 接管 / severity / `scoreMultiplier`。
- 本轮不改 `summaryCandidateEngine`、summary engines、golden samples 或 runner。
- 本轮不写具体原料组合 if。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.14 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.14-candidate`。
  - 记录 candidate 指向 `9118ccbebbf2af6e8221fc8e1b5b9f49e13207cd`。
  - 记录 `v0.0.6.14-candidate` 已冻结并推送。
  - 记录 v0.0.6.14 已完成 candidate priority shell docs / schema。
  - 记录当前未推进 v0.0.6.15。

### 阶段边界

- priority shell 是只读中间观察层，不接管最终判定。
- 已明确 `priorityBand` / `severityHint` 边界。
- 未实现 priority shell runtime。
- 未新增 priority engine。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- Golden samples 20/20 passed。
- 未创建正式 tag `v0.0.6.14`。
- 未推进 v0.0.6.15。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.14

本轮定义 candidate priority shell docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 明确 priority shell 位于 `summaryCandidates` 与最终 result 调度之间。
  - 明确 priority shell 是只读中间观察层，不接管最终判定。
  - 补充 `priorityBand` 与 `severityHint` 的职责边界。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 candidate priority shell 通用 schema。
  - 记录 `orderedCandidates`、`byPriorityBand`、`topCandidates` 和 `metadata` 的建议结构。
  - 记录 priority band 初始粗分组和反 if 地狱边界。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.14 本地 docs / schema 状态。
  - 记录当前未创建 `v0.0.6.14-candidate`。

### 阶段边界

- priority shell 是 summary candidate 到最终 result 之间的只读中间层。
- 本轮不实现 priority shell runtime，不新增 priority engine。
- 本轮不改 runtime、data、scripts、`index.html` 或 golden samples。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不做 priority 接管、最终 dispatch、severity 或 `scoreMultiplier`。
- `priorityBand` 是粗分组，不是最终 severity。
- `severityHint` 是提示，不是 `severityLevel` 或扣分乘区。
- 具体参数、阈值、severity、`scoreMultiplier` 和 golden expected 调整留到 v0.0.7.x。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.13 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.13-candidate`。
  - 记录 candidate 指向 `a18cac01ea5a71c94cab676f1149ddeadaa4f2e4`。
  - 记录 `v0.0.6.13-candidate` 已冻结并推送。
  - 记录 v0.0.6.13 已完成 `summaryCandidates` golden 结构断言。
  - 记录当前未推进 v0.0.6.14。

### 阶段边界

- runner 已支持 `summaryCandidates` expected。
- 少量 golden samples 已补 `summaryCandidates` 结构 expected。
- 未改 runtime、core、`index.html` 或 `summaryCandidateEngine`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 未做 priority 接管 / severity / `scoreMultiplier`。
- 未创建正式 tag `v0.0.6.13`。
- 未推进 v0.0.6.14。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.13

本轮新增 `summaryCandidates` golden 结构断言能力。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 加载 `core/summaryCandidateEngine.js`，让 golden runner 覆盖真实 `summaryCandidates` engine 路径。
  - 新增 `summaryCandidates` 结构断言。
  - 支持检查 `summaryCandidates.candidates`、`byType`、`metadata`。
  - 支持 `candidateCountMin`、`candidateTypeCountMin` 和局部字段匹配的 `candidateIncludesAny`。
- 更新 `data/goldenSamples.js`
  - 少量代表样本增加 `summaryCandidates` expected。
  - 覆盖经典容器结构、taste 酸度事故候选、texture 吸管阻力候选和 flavor 强身份候选。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.13 本地实现状态。
  - 记录当前未创建 `v0.0.6.13-candidate`。

### 阶段边界

- 本轮只保护 candidate 结构，不改 runtime。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 未改玩家可见文案 expected。
- 未做 priority 接管 / severity / `scoreMultiplier`。
- 未锁死具体 `triggerValue` 或 `thresholds` 数值。
- 未新增 golden sample。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.12 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.12-candidate`。
  - 记录 candidate 指向 `d8440f248086ac0f8a5e5ad02b330508f350c78c`。
  - 记录 `v0.0.6.12-candidate` 已冻结并推送。
  - 记录 v0.0.6.12 已完成 `summaryCandidates` 只读地基。
  - 记录当前未推进 v0.0.6.13。

### 阶段边界

- `result.summaryCandidates` 已暴露。
- candidate 是 summary 到最终 result 的只读中间层。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未做 priority 接管 / severity / `scoreMultiplier`。
- UI smoke：用户已完成人工可见 smoke；本轮未做人工 Console 检查。
- 未创建正式 tag `v0.0.6.12`。
- 未推进 v0.0.6.13。
- main 在 candidate 后还有 AGENTS guardrail commit：`86123d62fea02fe05e8f5970927fbdc8077506e1`，这是工作守则更新，不属于 candidate 实现内容。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.12

本轮新增 `summaryCandidates` 只读地基。

### 本轮新增 / 更新

- 新增 `core/summaryCandidateEngine.js`
  - 提供 `buildSummaryCandidates({ tasteSummary, textureSummary, flavorSummary })` 入口。
  - 从三层 summary 的 `risks` 和少量明确 `values` 生成轻量 candidate。
  - 使用小型规则配置表生成 candidate，未写具体原料组合 if。
- 更新 `core/tasteJudge.js`
  - `result.summaryCandidates` 已暴露。
  - `tasteJudge` 只调用 summary candidate 构建入口，不接管 candidate 细节。
- 更新 `index.html`
  - 页面版本号更新为 `v0.0.6.12`。
  - 在 `core/tasteJudge.js` 之前加载 `core/summaryCandidateEngine.js`。
  - 更新相关 runtime script cache query。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.12 本地实现状态。
  - 记录当前未创建 `v0.0.6.12-candidate`。

### 阶段边界

- candidate 是 summary 到最终 result 的只读中间层。
- 本轮不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 本轮不影响 `audience`、`drinkTypeId`、`accidentTypeId`、`outcomeTypeId` 或 `feedbackTags`。
- 本轮不做 severity / `scoreMultiplier` / priority 接管。
- 本轮不做最终调度，不做 relation matrix runtime。
- 本轮不改 golden samples，不改 runner，不改 UI 展示逻辑。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.11 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.11-candidate`。
  - 记录 candidate 指向 `d0946a79245ccac853985ee7e736e01d606578d2`。
  - 记录 `v0.0.6.11-candidate` 已冻结并推送。
  - 记录 v0.0.6.11 已完成 summary -> candidate docs / schema。
  - 记录当前未推进 v0.0.6.12。

### 阶段边界

- candidate 被定义为 summary 到最终 result 之间的只读中间层。
- 未实现 summary -> candidate runtime。
- 未新增 candidate engine。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未创建正式 tag `v0.0.6.11`。
- 未推进 v0.0.6.12。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.11

本轮为 summary -> candidate docs / schema。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 summary -> candidate 架构边界。
  - 明确 candidate 是 summary 到最终 result 的桥。
  - 明确 candidate 是只读中间层，不接管最终判定。
  - 记录 v0.0.6.x 搭 candidate 结构，v0.0.7.x 再调参数、severity、`scoreMultiplier` 和 golden expected。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 设计 summary candidate 通用 schema。
  - 记录 `accident` / `outcome` / `drinkType` / `feedback` candidateType 边界。
  - 记录 `candidateId`、`sourceLayer`、`sourceSummary`、`triggerMetric`、`triggerValue`、`thresholds`、`evidence`、`priorityBand`、`severityHint`、`feedbackTags`、`accidentTypeId`、`outcomeTypeId`、`drinkTypeId`、`ruleFamilyId`、`metadata` 等字段用途。
  - 记录 taste / texture / flavor summary 可能产出的 candidate 方向。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.11 本地实现状态。
  - 记录当前未创建 `v0.0.6.11-candidate`。

### 阶段边界

- 本轮只做 docs / candidate schema 设计。
- 不实现 summary -> candidate runtime。
- 不新增 candidate engine。
- 不改 `tasteJudge` 或 summary engines。
- 不改 runtime、data、runner、golden samples 或 `index.html`。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 不做 severity / `scoreMultiplier`。
- 不做 relation matrix runtime。
- candidate 不应成为新的 if 地狱；内容判断仍应由 summary、规则表、relation matrix 和阈值表驱动。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.10 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.10-candidate`。
  - 记录 candidate 指向 `b8ed079b89e90b282a69a96559ca61f5fc53e7f0`。
  - 记录 `v0.0.6.10-candidate` 已冻结并推送。
  - 记录 v0.0.6.10 已完成三层 summary 中段复盘。
  - 记录当前未推进 v0.0.6.11。

### 阶段边界

- `tasteSummary` / `textureSummary` / `flavorSummary` 均已接入 result，且均有 golden 结构保护。
- summary 仍是只读中间理解层，不接管最终判定。
- 已记录下一阶段可考虑 summary -> candidate docs / schema 或只读地基。
- 未改 runtime、data、scripts、`index.html`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未创建正式 tag `v0.0.6.10`。
- 未推进 v0.0.6.11。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.10

本轮为三层 summary 中段复盘。

### 本轮新增 / 更新

- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 复盘 `tasteSummary` / `textureSummary` / `flavorSummary` 均已进入 result。
  - 明确三层 summary 均为只读中间理解层，不接管最终判定。
  - 补充 summary -> candidate 的下一阶段边界。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 summary -> candidate 桥接 schema。
  - 记录 candidate 应保留 `sourceLayer`、`triggerMetric`、`evidence`、`priorityBand`、`severityHint`、`feedbackTags`、`outcomeTypeId`、`ruleFamilyId` 等扩展口。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.10 本地实现状态。
  - 记录当前未创建 `v0.0.6.10-candidate`。

### 阶段边界

- 本轮只做 docs / summary 中段复盘。
- 不实现 summary -> candidate runtime。
- 不新增 candidate engine。
- 不改 runtime、data、runner、golden samples 或 `index.html`。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- `tasteSummary`、`textureSummary`、`flavorSummary` 均已有 golden 结构保护，但仍不影响最终判定。
- v0.0.6.x 下一步可考虑 summary -> candidate docs / schema 复核，或 summary candidate 只读地基。
- 完整参数、阈值、severity、`scoreMultiplier` 和 golden expected 调优留到 v0.0.7.x。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.9 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.9-candidate`。
  - 记录 candidate 指向 `86f3c357c234accd5a5b3c1545eb327692b4e74d`。
  - 记录 `v0.0.6.9-candidate` 已冻结并推送。
  - 记录 v0.0.6.9 已完成 `flavorSummary` golden 结构断言。
  - 记录当前未推进 v0.0.6.10。

### 阶段边界

- runner 支持 `flavorSummary` expected。
- 少量 golden samples 已补 `flavorSummary` 结构 expected。
- 未改 runtime、core、index.html 或 `ingredientFlavorProfiles`。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 未做 relation matrix / candidate / severity / `scoreMultiplier`。
- 未创建正式 tag `v0.0.6.9`。
- 未推进 v0.0.6.10。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.9

本轮新增 `flavorSummary` golden 结构断言能力。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 加载 `data/ingredientFlavorProfiles.js` 与 `core/flavorSummaryEngine.js`。
  - 支持 `flavorSummary` expected。
  - 新增 `flavorSummary` 的 `values` / `tags` / `risks` / `evidence` / `metadata` 结构检查。
  - 支持 `valueKeysInclude`、tags / risks include、`metadataIncludes` 与局部字段匹配的 `evidenceIncludesAny`。
- 更新 `data/goldenSamples.js`
  - 给少量代表样本补充 `flavorSummary` expected。
  - 覆盖经典奶茶 name / ingredientId 输入路径。
  - 覆盖高榴莲强身份 name / ingredientId 输入路径。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.9 本地实现状态。
  - 记录当前未创建 `v0.0.6.9-candidate`。

### 阶段边界

- 本轮只保护 summary 结构，不锁死具体 values 数值。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 不改 core runtime。
- 不改 `ingredientFlavorProfiles`。
- 不做 relation matrix / candidate / severity / `scoreMultiplier`。
- 不让 `flavorSummary` 接管最终判定。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.8 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.8-candidate`。
  - 记录 candidate 指向 `4f211124836d40a28a68ed7cb441efd378719550`。
  - 记录 `v0.0.6.8-candidate` 已冻结并推送。
  - 记录 v0.0.6.8 已新增 `flavorSummary` 只读地基。
  - 记录当前未推进 v0.0.6.9。

### 阶段边界

- `result.flavorSummary` 已暴露。
- `flavorSummary` 读取 `ingredientFlavorProfiles` 数据地基。
- 未靠中文 displayName 或 UI category 推断 flavor。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未做 relation matrix / candidate / severity / `scoreMultiplier`。
- 未创建正式 tag `v0.0.6.8`。
- 未推进 v0.0.6.9。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.8

本轮新增 `flavorSummary` 只读地基。

### 本轮新增 / 更新

- 新增 `core/flavorSummaryEngine.js`
  - 读取 `data/ingredientFlavorProfiles.js` 中的 `flavorProfile` 数据地基。
  - 汇总并输出 `values` / `tags` / `risks` / `evidence` / `metadata` 结构。
  - evidence 记录 `sourceLayer: "flavor"`、`sourceType: "ingredient"`、`sourceId`、`ratio` 和 `contribution`。
- 更新 `core/tasteJudge.js`
  - 调用 `buildFlavorSummary(context)`。
  - 在最终 result 中暴露 `flavorSummary`。
- 更新 `index.html`
  - 页面版本号更新为 v0.0.6.8。
  - 在 `core/tasteJudge.js` 前加载 `core/flavorSummaryEngine.js`。
  - 加载 `data/ingredientFlavorProfiles.js`，并同步相关 cache query。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.8 本地实现状态。
  - 记录当前未创建 `v0.0.6.8-candidate`。

### 阶段边界

- `flavorSummary` 只读输出，不接管最终判定。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 不做 relation matrix。
- 不做 candidate。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.7 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.7-candidate`。
  - 记录 candidate 指向 `08565079a64e721e4f5f5e7ac8f5186c73060e38`。
  - 记录 `v0.0.6.7-candidate` 已冻结并推送。
  - 记录 v0.0.6.7 已新增 `data/ingredientFlavorProfiles.js`。
  - 记录当前未推进 v0.0.6.8。

### 阶段边界

- 当前全部 37 个 ingredientId 已有第一版 `flavorProfile` 数据地基。
- `flavorProfile` 主 key 使用 stable `ingredientId`，未使用中文 displayName 作为 profile key。
- 本轮未实现 `flavorSummary` runtime。
- 未改 runtime、runner、golden samples。
- 未改评分、事故、饮品类型、feedback 或 `result.type`。
- 未创建正式 tag `v0.0.6.7`。
- 未推进 v0.0.6.8。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.7

本轮新增 `ingredientFlavorProfiles` 数据地基，不实现 `flavorSummary` runtime。

### 本轮新增 / 更新

- 新增 `data/ingredientFlavorProfiles.js`
  - 为当前所有已有原料建立第一版轻量 `flavorProfile` 数据。
  - profile 以 stable `ingredientId` 为主 key，不使用中文 displayName 作为 profile key。
  - 字段覆盖 `flavorFamilies`、`aromaTags`、`identityTags`、`beverageFit`、`dessertFit`、`savoryRisk`、`noveltyRisk`、`identityStrength`、`aromaPressure`、`dominantPotential`、`pairHints` 和只读 `metadata`。
  - 提供轻量只读查询 / 校验 helper，但不承载事故、组合、评分或文案判断。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 记录 `ingredientFlavorProfiles` 是后续 `flavorSummary` 的数据来源，不是最终判定。
  - 明确本轮不接入 runtime，不影响结果。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 记录 flavor 层先建立数据地基，再接只读 summary。
  - 明确数据负责“风味身份是什么”，代码后续负责“怎么汇总”。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.7 本地实现状态。
  - 记录当前仍未创建 `v0.0.6.7-candidate`。

### 阶段边界

- 不改 runtime。
- 不改 runner / golden expected。
- 不改评分、事故、饮品类型、feedback 或 `result.type`。
- 不实现 `flavorSummary` runtime。
- 不新增 `core/flavorSummaryEngine.js`。
- 不做 relation matrix runtime。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.6 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.6-candidate`。
  - 记录 candidate 指向 `066635863238525c1a0b6eea6c1420ed2e75b87d`。
  - 记录 `v0.0.6.6-candidate` 已冻结并推送。
  - 记录 v0.0.6.6 已完成 `flavorProfile` / `flavorSummary` 数据来源轻量评估。
  - 记录当前未推进 v0.0.6.7。

### 阶段边界

- 已确认当前仓库缺少独立 `flavorProfile` 数据来源。
- 已明确 `flavorSummary` 不应靠中文原料名、displayName 或 UI category 推断。
- 本轮未新增 data 文件，未实现 runtime。
- 未改 runtime、data、scripts、index.html。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未创建正式 tag `v0.0.6.6`。
- 未推进 v0.0.6.7。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.6

本轮为 `flavorProfile` / `flavorSummary` 数据来源轻量评估，不实现 runtime。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 `flavorSummary` 不应凭空从中文原料名、显示名或 UI category 推断。
  - 记录当前仓库尚缺独立 `flavorProfile` 数据来源。
  - 建议后续以 stable `ingredientId` 建立轻量 `ingredientFlavorProfiles` 数据地基。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 flavor 层工程边界：现有 taste / texture / combination / synergy 数据只能提供辅助线索，不应被反向挖成风味身份主来源。
  - 明确 v0.0.6.x 应先建立 flavorProfile 数据地基和只读 summary，relation matrix / candidate 后续小步接入。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.6 本地 docs 评估状态。
  - 记录当前仍未创建 `v0.0.6.6-candidate`。

### 阶段边界

- 不改 runtime。
- 不改 data / runner / golden expected。
- 不改评分、事故、饮品类型、feedback 或 `result.type`。
- 不新增 `data/ingredientFlavorProfiles.js`。
- 不新增 `core/flavorSummaryEngine.js`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.5 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.5-candidate`。
  - 记录 candidate 指向 `fbd5eec27e1b2ef5c2b58eed1ba5532a56b91af5`。
  - 记录 `v0.0.6.5-candidate` 已冻结并推送。
  - 记录 v0.0.6.5 已完成 `flavorSummary` docs / schema 复核。
  - 记录当前未推进 v0.0.6.6。

### 阶段边界

- 本轮未实现 `flavorSummary` runtime。
- 未改 runtime、data、scripts、index.html。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 未创建正式 tag `v0.0.6.5`。
- 未推进 v0.0.6.6。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.5

本轮为 `flavorSummary` docs / schema 复核，不实现 runtime。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 `flavorSummary` 初始 `values` / `tags` / `risks` / `evidence` / `metadata` 建议结构。
  - 明确 `flavorSummary` 是中间理解层，不是最终判定层。
  - 明确初版 runtime 可以先只读输出，不接管最终结果。
  - 补充 flavor 层后续应通过 relation matrix / rules / candidate 进入最终调度。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 flavor 层反 if 地狱边界。
  - 明确代码负责汇总和调度，数据负责风味关系、强身份、饮品适配和阈值。
  - 明确 v0.0.6.x 先稳定 summary / candidate 结构，v0.0.7.x 再集中调参。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.5 本地实现状态。
  - 记录当前未创建 `v0.0.6.5-candidate`。

### 阶段边界

- 不改 runtime。
- 不改 data / runner / golden expected。
- 不改评分、事故、饮品类型、feedback 或 `result.type`。
- 不做 `flavorSummary` runtime。
- 不做 flavor relation matrix runtime。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.4 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.4-candidate`。
  - 记录 candidate 指向 `720b82076a817a4c5056605c650f69200188eedf`。
  - 记录 `v0.0.6.4-candidate` 已冻结并推送。
  - 记录 v0.0.6.4 已完成 `textureSummary` golden 结构断言。
  - 记录当前未推进 v0.0.6.5。

### 阶段边界

- runner 已支持 `textureSummary` expected。
- 少量 golden samples 已补 `textureSummary` 结构 expected。
- 未改评分、事故、饮品类型、feedback、`result.type` 或 golden score expected。
- 未创建正式 tag `v0.0.6.4`。
- 未推进 v0.0.6.5。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## v0.0.6.4

本轮新增 `textureSummary` golden 结构断言能力，保护 v0.0.6.3 已暴露的只读 `result.textureSummary`。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 加载 `core/textureSummaryEngine.js`，让 golden runner 覆盖 `result.textureSummary` 运行链路。
  - 新增 `expectations.textureSummary` 结构断言能力。
  - 支持检查 `exists`、`valueKeysInclude`、`tagIncludes`、`tagIncludesAny`、`forbiddenTagIncludes`、`riskIncludes`、`riskIncludesAny`、`forbiddenRiskIncludes`、`metadataIncludes`、`evidenceIncludesAny`。
  - `evidenceIncludesAny` 只匹配 expected object 写到的字段，不要求整条 evidence 深度全等。
- 更新 `data/goldenSamples.js`
  - 给少量代表性 golden samples 增加 `textureSummary` expected。
  - 只保护 summary 结构、metadata 和少量 evidence 来源，不锁死具体 values 数值。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.4 本地实现状态。
  - 记录当前未创建 `v0.0.6.4-candidate`。

### 阶段边界

- 不改评分、事故、饮品类型、feedback 或 `result.type`。
- 不改 golden score expected。
- 不改 core runtime。
- 不做 `flavorSummary`。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.3 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.3-candidate`。
  - 记录 candidate 指向 `8ef174b7eff9984ec4a392e05f93f78534c534da`。
  - 记录 `v0.0.6.3-candidate` 已冻结并推送。
  - 记录 v0.0.6.3 已完成 `textureSummary` 只读地基。
  - 记录当前未推进 v0.0.6.4。

### 阶段边界

- `textureSummary` 已暴露为只读中间理解层。
- 不改运行逻辑。
- 未改 data / core / scripts / index.html。
- 未创建正式 tag `v0.0.6.3`。
- 未推进 v0.0.6.4。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- UI smoke：Codex 浏览器自动化 console 监听受工具限制，无法完整捕获 console；未进行人工 Console 复查。普通试喝路径和事故试喝路径已通过可见 UI smoke，页面无 `undefined` / `[object Object]` 可见异常。

## v0.0.6.3

本轮新增 `textureSummary` 只读地基，作为 v0.0.6.x 三层属性 / profile / summary 的第二刀 runtime 地基。

### 本轮新增 / 更新

- 新增 `core/textureSummaryEngine.js`
  - 承载 `textureSummary` 构建逻辑。
  - 汇总现有 `textureProfile` effects 与 `drinkStructure` 结构指标。
  - 使用 `values` / `tags` / `risks` / `evidence` / `metadata` 输出结构。
  - evidence 记录 texture 层 ingredient / structure 来源、`sourceLayer`、`sourceType`、ratio 和 contribution。
- 更新 `core/tasteJudge.js`
  - 只调用 `textureSummary` 构建入口并暴露 `result.textureSummary`。
  - 保持 `tasteJudge.js` 的调度层职责。
- 更新 `index.html`
  - 页面版本号同步为 v0.0.6.3。
  - 在 `core/tasteJudge.js` 之前加载 `core/textureSummaryEngine.js`。
  - 刷新相关 runtime script cache query。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.3 本地实现状态。
  - 记录最新 candidate 仍是 `v0.0.6.2-candidate`。

### 阶段边界

- `textureSummary` 只读输出，不参与最终判定。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 不做 `flavorSummary`。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.2 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.2-candidate`。
  - 记录 candidate 指向 `787bd02defb70d0bbcd557ae96c1475188e5973c`。
  - 记录 `v0.0.6.2-candidate` 已冻结并推送。
  - 记录 v0.0.6.2 已完成 `tasteSummary` golden 结构断言。
  - 记录当前未推进 v0.0.6.3。

### 阶段边界

- runner 已支持 `tasteSummary` expected。
- 少量 golden samples 已补 `tasteSummary` 结构 expected。
- Golden samples 当前为 20/20 passed。
- 未创建正式 tag `v0.0.6.2`。

## v0.0.6.2

本轮新增 `tasteSummary` golden 结构断言，保护 v0.0.6.1 已暴露的只读 `result.tasteSummary`。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 加载 `core/tasteSummaryEngine.js`，让 golden runner 覆盖 `result.tasteSummary` 运行链路。
  - 新增 `expectations.tasteSummary` 结构断言能力。
  - 支持检查 `exists`、`valueKeysInclude`、`tagIncludes`、`tagIncludesAny`、`forbiddenTagIncludes`、`riskIncludes`、`riskIncludesAny`、`forbiddenRiskIncludes`、`metadataIncludes`、`evidenceIncludesAny`。
  - `evidenceIncludesAny` 只匹配 expected object 写到的字段，不要求整条 evidence 深度全等。
- 更新 `data/goldenSamples.js`
  - 给少量代表性 golden samples 增加 `tasteSummary` expected。
  - 只保护 summary 结构、metadata 和少量 evidence 来源，不锁死具体 values 数值。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.2 本地实现状态。
  - 记录当前未创建 `v0.0.6.2-candidate`。

### 阶段边界

- 不改评分、事故、饮品类型、feedback 或 `result.type`。
- 不改 golden score expected。
- 不改 core runtime。
- 不做 `textureSummary` / `flavorSummary`。
- 不做 severity / `scoreMultiplier`。
- 本轮不 push、不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## docs: sync v0.0.6.1 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.1-candidate`。
  - 记录 candidate 指向 `44d58211b19e0dc2614bdef502955fe7b06631cc`。
  - 记录 v0.0.6.1 已完成 `tasteSummary` 只读地基。
  - 记录 `core/tasteSummaryEngine.js` 已拆出，`tasteJudge.js` 保持调度层。
  - 记录 `result.tasteSummary` 已暴露。

### 阶段边界

- 本轮不改运行逻辑。
- 未改 data / core / scripts / index.html。
- 未推进 v0.0.6.2。
- 未创建 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

## bugfix: extract tasteSummaryEngine

本轮为 v0.0.6.1 冻结前 bugfix，不创建 tag。

### 本轮新增 / 更新

- 新增 `core/tasteSummaryEngine.js`
  - 承载 `tasteSummary` 构建逻辑。
  - 保持 `values` / `tags` / `risks` / `evidence` / `metadata` 输出结构不变。
  - 保持 evidence 中 `sourceId` / `ratio` / `contribution` / `metric` / `sourceLayer` / `sourceType` 字段兼容。
- 更新 `core/tasteJudge.js`
  - 移除 `tasteSummary` 构建细节。
  - `tasteJudge.js` 回到调度层，只调用 `tasteSummary` 构建入口并暴露 `result.tasteSummary`。
- 更新 `index.html`
  - 在 `core/tasteJudge.js` 之前加载 `core/tasteSummaryEngine.js`。
  - 页面版本号仍为 v0.0.6.1。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.6.1 main 已追加 `tasteSummaryEngine` 拆分 bugfix commit。
  - 记录 `v0.0.6.1-candidate` 仍未创建。

### 阶段边界

- 不改 `tasteSummary` 输出结构。
- 不改评分、事故、饮品类型、feedback、`result.type` 或 golden expected。
- 不做 `textureSummary` / `flavorSummary`。
- 不做 severity / `scoreMultiplier`。
- 本轮不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- UI smoke：页面版本、普通试喝、事故路径、`result.tasteSummary` 和 console 状态通过。

## v0.0.6.1

本轮新增 `tasteSummary` 只读地基，作为 v0.0.6.x 三层属性 / profile / summary 的第一刀 runtime 地基。

### 本轮新增 / 更新

- 更新 `core/tasteJudge.js`
  - 新增只读 `tasteSummary` 构建逻辑。
  - 最终 `result` 暴露 `tasteSummary`。
  - `tasteSummary` 使用 `values` / `tags` / `risks` / `evidence` / `metadata` 结构。
  - `evidence` 记录 taste 层 ingredient 来源、`ingredientId`、ratio 和 contribution。
- 更新 `index.html`
  - 页面版本号同步为 v0.0.6.1。
  - 刷新 `core/tasteJudge.js` runtime cache query。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.6.1 已完成 `tasteSummary` 只读地基。
  - 记录最新 candidate 仍是 `v0.0.6.0-candidate`。
  - 记录当前未创建 v0.0.6.1 tag。

### 阶段边界

- 本轮不改评分。
- 本轮不改事故触发。
- 本轮不改饮品类型。
- 本轮不改反馈。
- 本轮不改 golden expected。
- 本轮不做 `textureSummary` / `flavorSummary`。
- 本轮不做 severity / `scoreMultiplier`。
- 本轮不 tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- UI smoke：普通试喝、事故路径和页面加载通过，console 无业务 JS error。

## docs: sync v0.0.6.x agent guardrails

本轮只更新 `AGENTS.md` / docs，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `AGENTS.md`
  - 同步 v0.0.6.x 三层属性 / profile / summary 工作守则。
  - 明确 v0.0.6.x 不等于完整“三层判定”或 severity 调参。
  - 明确 profile / summary 是中间理解层，不是最终判定。
  - 明确 summary schema 需要可扩展，并预留权重、阈值和 evidence。
  - 明确不要在 v0.0.6.1 直接重写 analyzer 或接管最终评分。
- 更新 `docs/AI_CONTEXT.md`
  - 短同步 `AGENTS.md` 已更新 v0.0.6.x 工作守则。
  - 记录最新 candidate 仍是 `v0.0.6.0-candidate`。
  - 记录当前未推进 v0.0.6.1。
  - 记录下一步仍是 v0.0.6.1 `tasteSummary` 只读地基。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.6.1。
- 不创建 tag。

## docs: sync v0.0.6.0 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.6.0-candidate`。
  - 记录 candidate 指向 `22fa46c328b714f17b1615f51a4ed73987095697`。
  - 记录 `v0.0.6.0-candidate` 已冻结并推送。
  - 记录 v0.0.6.0 已完成 docs-only 三层属性 / profile / summary schema 设计。
  - 记录 v0.0.6.0 未实现运行逻辑，未重写 analyzer。
  - 记录当前未推进 v0.0.6.1。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.6.1。
- 不创建 tag。

## v0.0.6.0

本轮为 docs-only 三层属性 / profile / summary schema 设计，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 明确 v0.0.6.x 不是“三层判定”，而是“三层属性 / 三层 profile / 三层 summary”的中间理解层。
  - 记录 `tasteSummary` / `textureSummary` / `flavorSummary` 初始方向。
  - 记录 summary 通用结构：`values` / `tags` / `risks` / `evidence` / `metadata`。
  - 记录 `thickStrawNeed`、`chewDensity`、`foamLoad`、`settlingRisk`、`layeringStability` 等未来可扩展字段示例。
  - 记录 evidence 对 debug、调参、反馈解释和事故候选生成的重要性。
  - 记录 accident candidate schema 与 rule metadata 方向。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 将 v0.0.6.x 边界进一步收口为三层属性 / profile / summary 地基。
  - 记录 candidate / rule metadata 应预留 `sourceLayer`、`triggerMetric`、`thresholds`、`weights`、`evidence`、`priorityBand`、`severityHint` 等字段。
- 更新 `docs/AI_CONTEXT.md`
  - 同步 v0.0.6.0 已完成 docs-only schema 设计。
  - 记录 v0.0.6.0 未实现运行逻辑、未创建 tag。
  - 记录下一步可考虑 v0.0.6.1 `tasteSummary` 只读地基，或继续 schema 细化。

### 阶段边界

- v0.0.6.0 不实现完整三层 summary runtime。
- 不重写 analyzer。
- 不做完整 severity / `scoreMultiplier`。
- 不做大规模调参。
- 不做完整 flavor relation matrix。
- 不做经营 / 顾客 / 图鉴 / 成就系统。
- 不做正式存档系统。
- 完整 severity / `scoreMultiplier` / 大规模数值调优留到 v0.0.7.x。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不修改页面版本号。
- 不创建 tag。

## docs: record v0.0.6.x three-layer summary boundaries

本轮只更新 docs，记录 v0.0.6.x 开工前的三层属性 / profile / summary 边界。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.6.x 优先使用“三层属性 / 三层 profile / 三层 summary”术语。
  - 记录 profile / summary 不是最终判定，事故优先级、severity、score、反馈和经营成本属于后续判定层。
  - 记录权重、阈值、metadata、evidence、sourceLayer 等扩展预留原则。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.6.x 三层属性 / profile / summary 的边界。
  - 记录 summary 字段、类别、阈值、说明和权重应允许后续增删。
  - 记录组合规则、事故规则、反馈规则和结果候选也应逐步拥有结构化 metadata。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 summary schema 预留说明。
  - 记录完整 `severity` / `scoreMultiplier` / 大规模调参留到 v0.0.7.x。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.6.0。
- 不创建 tag。

## docs: sync v0.0.5.40 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.40-candidate`。
  - 记录 candidate 指向 `0c2a3c6f50ae598129276cc1223ef2536444d78d`。
  - 记录 `v0.0.5.40-candidate` 已冻结并推送。
  - 记录 v0.0.5.x 的现有核心系统 ID 化 / 去显示文案主键阶段已基本收口。
  - 记录未发现进入 v0.0.6.x 前必须处理的 P0。
  - 记录当前未推进 v0.0.6.0。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.6.0。
- 不创建 tag。

## v0.0.5.40

v0.0.5.x final docs 收口。本轮只更新文档，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 仍为 `v0.0.5.39-candidate`。
  - 记录 candidate 指向 `d2f359ab54f8eafd4b3cb0b5d399d9941b428dc3`。
  - 记录 v0.0.5.x 的现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基阶段已基本收口。
  - 记录未发现进入 v0.0.6.x 前必须处理的 P0。
  - 记录剩余 P1 将交给 v0.0.6.x profile / summary 阶段处理。
  - 修正过期 candidate 列表，补上 `v0.0.5.39-candidate`。
- 更新 `docs/TASTE_ENGINE_ARCHITECTURE.md`
  - 补充 v0.0.5.x final 收口结论。
  - 明确“中文主键”只是历史简称，更准确是“显示文案主键”。
  - 明确 v0.0.6.x 不再主要做 ID 化补洞，而是基于 stable ID 地基建立三层 summary。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 补充 v0.0.5.x 已基本完成结果身份、规则引用和保存边界 ID 化。
  - 记录 profile 表中文 key、category label 等遗留项应在 v0.0.6.x profile / summary 阶段自然处理。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.6.0。
- 不创建 tag。

## docs: sync v0.0.5.39 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.39-candidate`。
  - 记录 candidate 指向 `d2f359ab54f8eafd4b3cb0b5d399d9941b428dc3`。
  - 记录 `v0.0.5.39-candidate` 已冻结并推送。
  - 记录 v0.0.5.39 已完成柠檬牛奶冲突 special case 与 `inferAudience` 显示名判断尾巴小修。
  - 记录柠檬牛奶冲突已优先使用 `ingredientIds` / refs。
  - 记录 `inferAudience` 植脂奶 / 榴莲判断已优先走 ID/ref。
  - 记录中文 fallback 仍保留。
  - 记录当前未推进 `v0.0.5.40`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.40。
- 不创建 tag。

## v0.0.5.39

柠檬牛奶冲突 special case 与 audience 局部判断改为 ID/ref 主路径。

### 本轮新增 / 更新

- 更新 `core/tasteJudge.js`
  - 柠檬牛奶冲突 special case 优先使用 `ingredientIds` / refs 判断 `fruit_lemon` + `dairy_milk`。
  - 中文 `rule.names` 仅保留 legacy fallback。
- 更新 `core/drinkTypeAnalyzer.js`
  - `inferAudience` / `inferAudienceResult` 保持旧返回值兼容，并新增可选 context 参数。
  - 植脂奶 / 榴莲判断优先通过 `dairy_non_dairy_creamer` / `fruit_durian` ID/ref。
  - 中文 names 判断仅保留 legacy fallback。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.39。
  - `core/tasteJudge.js` / `core/drinkTypeAnalyzer.js` script cache query 同步刷新为 `v=0059`。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 v0.0.5.39 已完成两个 P1 小修。
  - 记录当前仍未创建 `v0.0.5.39` tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改评分。
- 不改事故结果。
- 不改 type。
- 不改 feedback。
- 不改 audience / audienceIds 输出。
- 不改 golden expected。
- 不做 `customerTypeIds`。
- 不做正式顾客系统。
- 不创建 tag。

## docs: sync v0.0.5.38 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.38-candidate`。
  - 记录 candidate 指向 `aa8dcfdbc3a162a5bc2c58c5a1ba646ed5d003b0`。
  - 记录 `v0.0.5.38-candidate` 已冻结并推送。
  - 记录 `v0.0.5.38` 已完成 golden runner 支持 feedbackTag 断言。
  - 记录关键样本已补 feedbackTag expected。
  - 记录 `feedbackIncludesAny` 文案断言仍保留。
  - 记录当前未推进 `v0.0.5.39`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.39。
- 不创建 tag。

## v0.0.5.38

golden runner 支持 feedbackTag 断言。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 新增 `feedbackTagIncludes` / `feedbackTagIncludesAny` / `forbiddenFeedbackTagIncludes` 断言支持。
  - runner 只读取 `result.feedbackTags` / `result.feedbackTag`，不从中文 feedback 文案反推 tag。
- 更新 `data/goldenSamples.js`
  - 为少量稳定样本补充 feedbackTag expected。
  - 覆盖经典奶茶、高级厚乳、奶脂过载和吸管阻力事故路径。
  - 保留既有 `feedbackIncludesAny` 文案回归断言。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.38。
  - 本轮不改 runtime core / UI 脚本，不更新 core script query。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 `v0.0.5.38` 已完成 golden runner 支持 feedbackTag 断言。
  - 记录当前仍未创建 `v0.0.5.38` tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core。
- 不改 feedback 文案。
- 不改 data 规则。
- 不改评分。
- 不改事故或饮品类型判断。
- 不改 golden score expected。
- 不创建 tag。

## docs: sync v0.0.5.37 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.37-candidate`。
  - 记录 candidate 指向 `65f6a32c33d81f5652ed3f527294ef2826b71e61`。
  - 记录 `v0.0.5.37-candidate` 已冻结并推送。
  - 记录 `v0.0.5.37` 已完成 analyzer 本地显示名比例查询改为 ID/ref 主路径。
  - 记录中文 name fallback 仍保留。
  - 记录 `inferAudience` 中仍有少量 `has(name, names)` 遗留 P1，已记录且不阻塞。
  - 记录当前未推进 `v0.0.5.38`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.38。
- 不创建 tag。

## v0.0.5.37

analyzer 本地显示名比例查询改为 ID/ref 主路径小修。

### 本轮新增 / 更新

- 更新 `core/accidentAnalyzer.js`
  - 芋泥、奥利奥碎、淡奶油、厚乳、植脂奶等本地比例查询改为优先使用 `ingredientId` ref。
  - 小料过载和强风味过载检测改为优先通过 ref 查询比例。
  - 中文 name 仅保留为反馈 note 的展示内容 / legacy fallback。
- 更新 `core/proportionAnalyzer.js`
  - 芋泥、奥利奥碎、气泡水、淡奶油等比例查询改为优先使用 ref。
  - 小料、果味支撑、茶底支撑和甜味支撑求和改为使用 refs。
- 更新 `core/drinkTypeAnalyzer.js`
  - 水果茶 blend 的茶底、水果、干扰项、气泡水、甜味支撑和水感支撑查询改为优先使用 refs。
  - `typeMap` 和反馈 note 中的中文继续作为玩家可见显示文案。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.37。
  - 将本轮修改的 analyzer runtime script cache-busting query string 刷新为 `v=0057`。
  - 保持脚本加载顺序不变。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 `v0.0.5.37` 已完成 analyzer 本地显示名查询小修。
  - 记录当前仍未创建 `v0.0.5.37` tag。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改评分。
- 不改阈值。
- 不改事故触发。
- 不改饮品类型结果。
- 不改反馈文案。
- 不改 golden expected。
- 不做三层 summary。
- 不创建 tag。

## docs: sync v0.0.5.36 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.36-candidate`。
  - 记录 candidate 指向 `f833349f6f0459b1e538cc65dfa01b80c412972b`。
  - 记录 `v0.0.5.36-candidate` 已冻结并推送。
  - 记录 `v0.0.5.36` 已完成 `outcomeTypeId` 兜底地基。
  - 记录 runner 已支持 `outcomeTypeId` 断言。
  - 记录关键冲突样本已补 `outcomeTypeId` expected。
  - 记录“中文主键”术语已升级为“显示文案主键 / 玩家可见文案当系统主键”。
  - 记录当前未推进 `v0.0.5.37`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.37。
- 不创建 tag。

## v0.0.5.36

outcomeTypeId 兜底地基 + “显示文案主键”术语同步。

### 本轮新增 / 更新

- 更新 `core/tasteJudge.js`
  - 为最终 `result.type` 没有 `accidentTypeId`、也没有 `drinkTypeId` 的兜底结果补充 `outcomeTypeId`。
  - 当前覆盖 `口感冲突` / `口感事故` / `奶脂过载` / `猎奇实验品` / `工业奶茶` / `实验特调` 等显示文案兜底结果。
  - `result.type` 继续保留为玩家可见显示文案。
- 更新 `scripts/runGoldenSamples.js`
  - 新增 `outcomeTypeIdIncludes` / `outcomeTypeIdIncludesAny` / `forbiddenOutcomeTypeIdIncludes` 断言支持。
  - runner 只读取 `result.outcomeTypeId` / `result.outcomeTypeIds`，不从中文 `type` 反推 ID。
- 更新 `data/goldenSamples.js`
  - 为 `bubble_cream_conflict` 和 `bubble_cream_conflict_id_equivalence` 补充 `outcomeTypeIdIncludes: ["taste_conflict"]`。
  - 保留旧中文 `typeIncludesAny` 作为显示回归保护。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.36。
  - 将 `core/tasteJudge.js` runtime cache-busting query string 刷新为 `v=0056`。
  - 保持脚本加载顺序不变。
- 更新 `AGENTS.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md` / `docs/TASTE_SYSTEM_DESIGN.md` / `docs/AI_CONTEXT.md`
  - 将长期术语从“去中文主键”同步为“去显示文案主键”。
  - 明确中文只是当前最常见的显示文案例子，英文、日文或任何未来可能改名 / 本地化的 label 也不应承担系统主键职责。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- UI smoke：页面版本号、普通试喝、事故试喝、保存、载入路径通过，页面未出现 `undefined` / `[object Object]` 或可见业务错误。

### 本轮不做

- 不改事故触发条件。
- 不改饮品类型判断。
- 不改评分、反馈文案或 golden score expected。
- 不改正式存档系统、localStorage migration 或保存交互。
- 不创建 tag。

## docs: sync v0.0.5.35 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.35-candidate`。
  - 记录 candidate 指向 `d9d77c270a81e77fe6d9d6b428ac093c68f740db`。
  - 记录 `v0.0.5.35-candidate` 已冻结并推送。
  - 记录 `v0.0.5.35` 已完成保存 result / 历史快照边界小修。
  - 记录旧 result 的 `feedback` / `audience` / `attr` 渲染兜底已完成。
  - 记录已修复 runtime script cache-busting query 过旧导致旧 `feedbackEngine` 被加载的问题。
  - 记录 UI smoke 已确认普通试喝、保存、载入、事故路径正常。
  - 记录当前未推进 `v0.0.5.36`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.36。
- 不创建 tag。

## v0.0.5.35 bugfix: refresh runtime script cache version

修复前端 runtime 脚本缓存串过旧导致浏览器加载旧 `feedbackEngine` 的问题。

### 本轮新增 / 更新

- 更新 `index.html`
  - 将 `data/feedbackTexts.js` cache-busting query string 刷新为 `v=0055`。
  - 将 `core/feedbackEngine.js` cache-busting query string 刷新为 `v=0055`。
  - 为 `core/tasteJudge.js` 增加 `v=0055` query string。
  - 为 `ui/render.js` 增加 `v=0055` query string。
  - 保持脚本加载顺序不变。
- 更新 `docs/AI_CONTEXT.md`
  - 记录 `v0.0.5.35` main 已追加 runtime script cache version bugfix commit。
  - 记录当前仍未创建 `v0.0.5.35-candidate`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。
- UI smoke：确认试喝、保存、载入恢复正常，console 无业务 JS error。

### 本轮不做

- 不改业务逻辑。
- 不改 core / data / scripts / ui / storage 文件。
- 不改评分、事故、饮品类型、反馈文案或 golden expected。
- 不创建 tag。

## v0.0.5.35

保存 result / 历史快照边界小修。

### 本轮新增 / 更新

- 更新 `ui/render.js`
  - 为旧保存 result / 损坏 result 增加轻量渲染兜底。
  - `feedback` 缺失时安全显示“暂无反馈”。
  - `audience` 缺失时跳过受众标签渲染。
  - `attr` 缺失时属性条安全降级为 0。
  - 正常 result 展示效果保持不变。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 明确保存的 `result` 是历史展示快照。
  - 明确中文 `type` / `audience` / `feedback` 可作为当时展示内容保存。
  - 明确未来统计、图鉴、顾客偏好和经营报表应依赖 `accidentTypeId` / `drinkTypeId` / `audienceIds` / `feedbackTags` 等结构化 ID。
  - 明确玩家未来自定义饮品名 `customName` / `title` 只作为显示名，不作为 `recipeId` / `drinkTypeId` / `recipeFamilyId` / `recipeVersionId`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.35。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.35 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不做正式存档系统。
- 不改保存交互。
- 不做 localStorage migration。
- 不改评分、事故、饮品类型、反馈文案或 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.34 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.34-candidate`。
  - 记录 candidate 指向 `98bac8c3b22c2b54f5e66748b536de3e000a037f`。
  - 记录 `v0.0.5.34-candidate` 已冻结并推送。
  - 记录 `v0.0.5.34` 已完成 feedbackEngine 去 notes.includes 小修。
  - 记录 feedbackEngine 主路径优先使用 `tags` / `feedbackTags`。
  - 记录中文 `notes.includes` 仅保留 legacy fallback。
  - 记录 result 已暴露 `feedbackTags`。
  - 记录当前未推进 `v0.0.5.35`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.35。
- 不创建 tag。

## v0.0.5.34

feedbackEngine 去 notes.includes 小修。

### 本轮新增 / 更新

- 更新 `core/feedbackEngine.js`
  - 反馈标签选择主路径优先使用结构化 `tags` / `feedbackTags`。
  - 中文 `notes.includes` 仅保留为 legacy fallback。
  - 保持 `makeFeedback(...)` 旧调用兼容，不重写反馈引擎。
- 更新 `core/tasteJudge.js`
  - 汇总并传递 `feedbackTags`。
  - 最终 result 暴露 `feedbackTags`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.34。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.34 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改评分、事故、饮品类型、`result.type` 或反馈文案风格。
- 不改 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.33 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.33-candidate`。
  - 记录 candidate 指向 `af4507cd18e138b1221d758f0aa3043a7f988d49`。
  - 记录 `v0.0.5.33-candidate` 已冻结并推送。
  - 记录 `v0.0.5.33` 已完成 texture accident 去中文判断小修。
  - 记录 texture accident 判断主路径优先使用 `accidentTypeId` / `tags`。
  - 记录中文 `type` / `note` 仅保留 legacy fallback。
  - 记录当前未推进 `v0.0.5.34`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.34。
- 不创建 tag。

## v0.0.5.33

texture accident 去中文判断小修。

### 本轮新增 / 更新

- 更新 `core/accidentAnalyzer.js`
  - texture accident 去重 / 判断主路径优先使用 `accidentTypeId` / `tags`。
  - 中文 `type` / `note` 仅保留 legacy fallback。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.33。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.33 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改事故触发条件、评分、cap、add、note、type、accidentTypeId 或 tags。
- 不改反馈文案。
- 不改 `core/feedbackEngine.js`。
- 不改 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.32 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.32-candidate`。
  - 记录 candidate 指向 `2f3fadedeb29333237dac9e55ebf8c7407c28188`。
  - 记录 `v0.0.5.32-candidate` 已冻结并推送。
  - 记录 `v0.0.5.32` 已完成 `drinkTypeRules` refs 小批迁移。
  - 记录 `drinkTypeRules` 已补 `ingredientId` / `anyIngredientIds` / `allIngredientIds`。
  - 记录旧中文 `ingredient` / `anyIngredient` / `allIngredients` 仍保留。
  - 记录当前未推进 `v0.0.5.33`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.33。
- 不创建 tag。

## v0.0.5.32

drinkTypeRules refs 小批迁移。

### 本轮新增 / 更新

- 更新 `data/drinkTypeRules.js`
  - 给现有单原料中文条件新增 `ingredientId`。
  - 给现有 `anyIngredient` 条件新增 `anyIngredientIds`。
  - 给现有 `allIngredients` 条件新增 `allIngredientIds`。
  - 旧中文 `ingredient` / `anyIngredient` / `allIngredients` 字段保留兼容和可读性。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.32。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.32 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core。
- 不改规则顺序、type、drinkTypeId 或判断条件。
- 不改 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.31 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.31-candidate`。
  - 记录 candidate 指向 `349ba15a88506708ee40a4b652009fc67ff8201b`。
  - 记录 `v0.0.5.31-candidate` 已冻结并推送。
  - 记录 `v0.0.5.31` 已完成 `combinationRules` refs 小批迁移。
  - 记录 17 条 good / bad 具体组合已补 `ingredientIds`。
  - 记录旧中文 `names` 仍保留。
  - 记录 `multiIngredientRules.teaMix` 未迁移。
  - 记录当前未推进 `v0.0.5.32`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.32。
- 不创建 tag。

## v0.0.5.31

combinationRules refs 小批迁移。

### 本轮新增 / 更新

- 更新 `data/combinationRules.js`
  - 给 `goodCombinations` / `conflictCombinations` 中现有具体原料组合规则新增 `ingredientIds`。
  - 旧中文 `names` 字段保留兼容和可读性。
  - `multiIngredientRules.teaMix` 基于 category，本轮不迁。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.31。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.31 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 `core/combinationAnalyzer.js`。
- 不改组合语义、score、add、note 或规则顺序。
- 不改 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.30 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.30-candidate`。
  - 记录 candidate 指向 `7e75f426f392a7da0d60bbceb8afece6e3d29c51`。
  - 记录 `v0.0.5.30-candidate` 已冻结并推送。
  - 记录 `v0.0.5.30` 已完成 `proportionSegmentRules` refs 小批迁移。
  - 记录旧中文 `ingredient` / `names` 仍保留。
  - 记录当前未推进 `v0.0.5.31`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.31。
- 不创建 tag。

## v0.0.5.30

proportionSegmentRules refs 小批迁移。

### 本轮新增 / 更新

- 更新 `data/proportionSegmentRules.js`
  - 给现有柠檬 / 榴莲单原料比例段规则新增 `ingredientId`。
  - 给 `requiredRatioSums` / `anyRatioSums` 中的多原料求和条件新增 `ingredientIds`。
  - 旧中文 `ingredient` / `names` 字段保留兼容和可读性。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.30。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.30 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core。
- 不改阈值、score、add、notes、tags。
- 不改反馈文案。
- 不改 golden expected。
- 不创建 tag。

## docs: sync v0.0.5.29 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.29-candidate`。
  - 记录 candidate 指向 `67115d5847317a124f415a96ea59bbb0ecab86e4`。
  - 记录 `v0.0.5.29-candidate` 已冻结并推送。
  - 记录 `v0.0.5.29` 已完成 golden runner 支持 audience ID 断言。
  - 记录 runner 支持 `audienceIdIncludes` / `audienceIdIncludesAny` / `forbiddenAudienceIdIncludes`。
  - 记录关键样本已补 `audienceIds` expected。
  - 记录中文 type 断言、`accidentTypeId` 断言和 `drinkTypeId` 断言仍保留。
  - 记录当前未推进 `v0.0.5.30`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不推进 v0.0.5.30。
- 不创建 tag。

## v0.0.5.29

golden runner 支持 audience ID 断言。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 新增 `audienceIdIncludes` 断言。
  - 新增 `audienceIdIncludesAny` 断言。
  - 新增 `forbiddenAudienceIdIncludes` 断言。
  - 检查时读取 `result.audienceIds`，并兼容未来可能出现的 `result.audienceId`。
  - runner 只检查 result，不从中文 `audience` 推导 ID。
- 更新 `data/goldenSamples.js`
  - 给少量已有稳定样本补充 `audienceIds` expected。
  - 覆盖经典奶茶、清爽水果茶和高级厚乳款。
  - 保留旧中文 type 断言、既有 `accidentTypeId` 断言、既有 `drinkTypeId` 断言和反馈文案断言。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.29。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.29 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core。
- 不改 UI 逻辑。
- 不改保存结构。
- 不改评分、反馈文案、饮品类型、事故判断或 golden score expected。
- 不新增 golden samples。
- 不创建 tag。

## v0.0.5.28

audienceIds + audience/displayName 双轨地基。

### 本轮新增 / 更新

- 更新 `core/drinkTypeAnalyzer.js`
  - 新增 stable audience ID 映射。
  - 新增 `inferAudienceResult` 结构化返回能力，返回 `{ audience, audienceIds }`。
  - `inferAudience` 保持旧返回值兼容，仍返回中文 audience 数组。
  - 不改变现有受众判断逻辑、顺序或数量。
- 更新 `core/tasteJudge.js`
  - 在保留旧中文 `result.audience` 的前提下，新增 `result.audienceIds`。
  - 中文 audience 继续作为 UI 展示 / legacy 字段。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.28。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.28 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不做 `customerTypeIds`。
- 不做正式顾客系统。
- 不做经营系统。
- 不改 UI 展示逻辑。
- 不改评分、反馈文案、饮品类型、事故判断或 golden expected。
- 不改 data / scripts / storage。
- 不创建 tag。

## docs: sync v0.0.5.27 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.27-candidate`。
  - 记录 candidate 指向 `d1fd84af0c21ee2dc6ff37a0e5bcc3a3b08a2cbd`。
  - 记录 `v0.0.5.27-candidate` 已冻结并推送。
  - 记录 `v0.0.5.27` 已完成 golden runner 支持 `drinkTypeId` 断言。
  - 记录 runner 支持 `drinkTypeIdIncludes` / `drinkTypeIdIncludesAny` / `forbiddenDrinkTypeIdIncludes`。
  - 记录关键普通饮品 golden samples 已补 `drinkTypeId` expected。
  - 记录旧中文 type 断言和 `accidentTypeId` 断言仍保留。
  - 记录正式 tag `v0.0.5.27` 未创建。
  - 记录当前未推进 `v0.0.5.28`。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.28。
- 不创建 tag。
- 不做 `audienceId` / `customerTypeId`。
- 不做三层 summary。
- 不做 severity 系统。

## v0.0.5.27

golden runner 支持普通饮品类型 `drinkTypeId` 断言。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 新增 `drinkTypeIdIncludes` 断言。
  - 新增 `drinkTypeIdIncludesAny` 断言。
  - 新增 `forbiddenDrinkTypeIdIncludes` 断言。
  - 检查时读取 `result.drinkTypeId`，并兼容未来可能出现的 `result.drinkTypeIds` 数组。
  - runner 只检查 result，不推导、不映射中文 type 到 drinkTypeId。
- 更新 `data/goldenSamples.js`
  - 给少量已有普通饮品样本补充 `drinkTypeId` expected。
  - 覆盖经典奶茶、清爽水果茶和高级厚乳款。
  - 保留旧中文 `typeIncludes` / `typeIncludesAny` / `forbiddenTypeIncludes` 断言。
  - 保留既有 `accidentTypeId` 断言。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.27。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.27 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core。
- 不改评分、事故触发、反馈文案、`result.type`、`drinkTypeId` 生成逻辑或 golden score expected。
- 不给事故样本添加 `drinkTypeId` expected。
- 不新增 golden samples。
- 不改比例。
- 不做 `audienceId`。
- 不做三层 summary。
- 不做 severity 系统。
- 不创建 tag。

## docs: sync v0.0.5.26 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.26-candidate`。
  - 记录 candidate 指向 `eba057291777dbb2d415ff6a511b60209a2065cb`。
  - 记录 `v0.0.5.26` 已完成 `drinkTypeId` + `type` / displayName 双轨地基。
  - 记录普通饮品类型 result 暴露 `drinkTypeId`。
  - 记录 `inferType` 保持旧返回值兼容，`inferTypeResult` 提供结构化返回能力。
  - 记录事故路径继续使用 `accidentTypeId`，没有被 `drinkTypeId` 洗白。
  - 记录正式 tag `v0.0.5.26` 未创建。
  - 记录当前未推进 `v0.0.5.27`。
  - 记录下一刀候选为 golden runner 支持 `drinkTypeId` 断言。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.27。
- 不创建 tag。
- 不做 `drinkTypeId` golden 断言。
- 不做 audienceId。
- 不做三层 summary。
- 不做 severity 系统。

## v0.0.5.26

普通饮品类型 drinkTypeId + type/displayName 双轨地基。

### 本轮新增 / 更新

- 更新 `data/drinkTypeRules.js`
  - 普通饮品类型规则补充 stable `drinkTypeId`。
  - 新增 `defaultTypeId: "experimental_special"`。
  - 旧中文 `type` 保留，继续作为玩家可见显示名 / legacy 字段。
- 更新 `core/drinkTypeAnalyzer.js`
  - 保持 `inferType` 旧返回值兼容，仍返回中文 type 字符串。
  - 新增 `inferTypeResult` 结构化返回能力，返回 `{ type, drinkTypeId }`。
  - `analyzeFruitTeaBlend` 返回普通水果茶类型时补充 `drinkTypeId`。
- 更新 `core/tasteJudge.js`
  - 在不改变 `result.type` 的前提下，为普通饮品类型结果暴露 `result.drinkTypeId`。
  - 事故类型继续由 `accidentTypeId` 处理，本轮不把事故类型塞进 `drinkTypeId`。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.26。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.26 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改评分、事故触发、反馈文案、type 中文或 golden expected。
- 不改 golden samples。
- 不做 golden runner `drinkTypeId` 断言。
- 不做 audienceId。
- 不做三层 summary。
- 不做 severity 系统。
- 不创建 tag。

## docs: sync v0.0.5.25 candidate status

本轮只更新 docs 状态，不改运行逻辑。

### 本轮新增 / 更新

- 更新 `docs/AI_CONTEXT.md`
  - 同步最新 candidate 为 `v0.0.5.25-candidate`。
  - 记录 candidate 指向 `0ffd989ca226fe1e2a0ff24425d62308a3aa41a2`。
  - 记录 `v0.0.5.25` 已完成 golden runner 支持 `accidentTypeId` 断言。
  - 记录 runner 支持 `accidentTypeIdIncludes` / `accidentTypeIdIncludesAny` / `forbiddenAccidentTypeIdIncludes`。
  - 记录关键事故 golden samples 已补 `accidentTypeId` expected。
  - 记录旧中文 `typeIncludes` / `forbiddenTypeIncludes` 断言仍保留。
  - 记录正式 tag `v0.0.5.25` 未创建。
  - 记录当前未推进 `v0.0.5.26`。
  - 记录下一刀候选为 `drinkTypeId` + `type` / `displayName` 双轨地基。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改运行逻辑。
- 不改 data / core / scripts / index.html。
- 不改页面版本号。
- 不推进 v0.0.5.26。
- 不创建 tag。
- 不做 `drinkTypeId`。

## v0.0.5.25

golden runner 支持 accidentTypeId 断言。

### 本轮新增 / 更新

- 更新 `scripts/runGoldenSamples.js`
  - 新增 `accidentTypeIdIncludes` 断言。
  - 新增 `accidentTypeIdIncludesAny` 断言。
  - 新增 `forbiddenAccidentTypeIdIncludes` 断言。
  - 检查时读取 `result.accidentTypeId`，并兼容未来可能出现的 `result.accidentTypeIds` 数组。
  - runner 只检查 result，不推导、不映射事故 ID。
- 更新 `data/goldenSamples.js`
  - 给少量已有事故样本补充 `accidentTypeId` expected。
  - 覆盖柠檬酸度事故、榴莲强身份事故、奶脂过载和吸管阻力事故。
  - 保留旧中文 `typeIncludes` / `forbiddenTypeIncludes` 断言。
- 更新 `index.html`
  - 页面顶部版本号同步为 v0.0.5.25。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步 v0.0.5.25 完成点。

### 验证结果

- Golden samples：`node scripts/runGoldenSamples.js` 通过，20/20 passed。

### 本轮不做

- 不改 core 逻辑。
- 不改评分、事故触发、反馈文案、`result.type` 或 golden expected 分数区间。
- 不做 `drinkTypeId`。
- 不做 `audienceId`。
- 不做三层 summary。
- 不做 severity 系统。
- 不创建 tag。

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
  - 重定义 v0.0.5.x 为现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基阶段。
  - 定义 v0.0.6.x 为三层 profile / summary / 判定地基阶段。
  - 定义 v0.0.7.x 为 severity / 数值调优 / golden samples 扩容阶段。
  - 明确 v0.0.5.x 负责“系统里的东西是谁”，v0.0.6.x 负责“这些东西如何被三层系统判断”，v0.0.7.x 负责“判断得好不好、数值顺不顺”。
  - 明确不要把 v0.0.5.x 误解为给所有未来系统提前造 ID 空表。
- 更新 `docs/TASTE_SYSTEM_DESIGN.md`
  - 同步短版阶段边界：ID 化完成前不急着启动完整三层 summary，三层判定放到 v0.0.6.x，severity 和数值调优放到 v0.0.7.x。
- 更新 `docs/AI_CONTEXT.md`
  - 当前状态快照同步到 `v0.0.5.23-candidate` 后路线文档补充状态。
  - 补充后续 v0.0.5.x 候选方向：显示文案主键残留盘点、accidentTypeId、drinkTypeId、audienceId、规则表 refs、golden ID 断言、反馈 tag 边界和 ID 化收口审计。
- 更新 `AGENTS.md`
  - 补充 Codex / AI agent 长期工作守则：后续 v0.0.5.x 不默认推进三层 summary；当前优先级是现有系统 ID 化和去显示文案主键。

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
