# AGENTS.md｜奶茶实验室 Codex 工作守则

## 1. 文件定位

`AGENTS.md` 是 Codex / AI agent 进入本仓库时的长期工作守则。

它不是单次任务单，也不是版本流水账。用户粘贴的任务提示词只约束本轮任务，不应被长期写入 `AGENTS.md`，除非任务明确要求更新本文件。

如果本文件与用户本轮明确任务冲突，应先提醒用户确认，不要擅自扩大范围。

## 1.1 最高优先级：真实性与失败报告规则

在《奶茶实验室》项目中，Codex 必须始终如实报告执行结果、测试结果、工具限制和失败状态。失败可以接受，不确定可以接受，工具限制可以接受；不诚实报告不可接受。

绝对禁止：

- 禁止把没有执行的测试说成已执行。
- 禁止把失败的测试说成通过。
- 禁止把“工具无法确认”说成“已确认没问题”。
- 禁止把“看起来可能没问题”包装成“已通过验收”。
- 禁止在没有真实证据时声称 UI smoke、console、push、tag、golden samples、node --check、git status 已通过。
- 禁止为了让任务看起来完成而省略失败信息、权限限制、工具限制或异常日志。
- 禁止在不满足开工前状态闸门时继续执行任务。

报告中必须明确区分：

- 已执行并通过。
- 已执行但失败。
- 未执行。
- 因工具限制无法执行。
- 仅做了部分验证。
- 需要用户人工确认。
- 需要停止并等待用户决定。

如果没有真实浏览器 console 监听能力，必须写：“console 监听受工具限制，未完整确认。” 如果只做了可见 UI 操作，必须写：“可见 UI smoke 通过，但未完整捕获 console。” 如果没有跑 UI smoke，必须写：“本轮未做 UI smoke。” 如果没有 push 或 tag，必须明确写“未 push”“未 tag”。

每次任务完成后，必须如实报告：修改了哪些文件、是否只改允许范围、是否误改禁止文件、实际执行了哪些测试、每个测试的真实结果、golden samples 实际结果、node --check 实际结果、git diff --check 实际结果、UI smoke 是否执行及覆盖路径、console 是否真实检查、git status 是否干净、commit hash、是否 push、是否 tag、push / tag 是否成功。若有失败或限制，必须放在报告中显眼位置。

candidate 冻结、push main、创建 tag 前，如果任何检查失败或无法确认，必须停止并报告，不得继续。尤其禁止 golden 未通过仍创建 candidate tag、工作区不干净仍 push、HEAD 不符合任务要求仍 tag、tag 已存在仍覆盖或重打、没有确认 tag 指向就声称冻结成功、没有 push tag 就说 candidate 已推送。

如果浏览器自动化、console 监听、剪贴板、locator、文件系统、GitHub push、tag 或其他工具能力受限，必须停止相关高风险操作，报告具体失败步骤，贴出关键错误信息，判断是否需要用户人工确认；不要自行绕过权限，也不要把工具限制伪装成项目通过。

用户不是程序员，很多代码层面的错误用户看不出来。因此 Codex 的报告必须承担更高真实性责任。宁可报告“我没法确认，需要人工复查”，也不要报告“应该没问题”。宁可任务暂停，也不要给出虚假的完成感。

## 1.2 UI smoke 失败时的服务 / 缓存优先排查规则

在《奶茶实验室》项目中，如果 UI smoke、浏览器自动化、页面访问或试喝按钮测试失败，Codex 不得立刻判断为项目代码问题，也不得直接要求用户人工确认。必须先排查本地服务、页面版本、脚本加载顺序和 cache-busting。

优先排查顺序：

1. 先确认本地服务是否运行。
   - 如果 `http://localhost:4173/` 无法访问，第一怀疑应是本地预览 / dev server 没启动，而不是业务代码错误。
   - 按 `README.md` / 项目现有方式启动本地服务。
   - 不安装新依赖，不改配置，不改项目文件。
   - 确认页面返回 HTTP 200 OK 后，再继续 UI smoke。
2. 再确认页面版本是否正确。
   - 服务可访问后，必须确认当前 HTML / 页面顶部版本号是否是本轮版本。
   - 如果用户或浏览器看到旧版本，应优先怀疑缓存问题，而不是业务代码问题。
3. 再确认 runtime script 加载顺序和 cache-busting。
   - 新增脚本必须在依赖它的脚本之前加载；例如 `core/summaryCandidateEngine.js` 必须在 `core/tasteJudge.js` 之前。
   - 本轮修改过的 runtime script 必须同步更新 cache query。
   - 新增 / 修改脚本 URL 应返回 HTTP 200 OK。
   - 不要把旧缓存导致的按钮失效误判为项目逻辑错误。
4. 修正服务 / 缓存问题后，Codex 应主动重测。
   - 如果服务未启动、版本不对、脚本 cache query 不对、脚本 URL 访问失败等问题已修正到可访问状态，应主动重新尝试 UI smoke。
   - 只有在工具策略仍然阻止访问，或自动化能力明确受限时，才请求用户人工肉眼 smoke。

如果浏览器自动化因为工具限制失败，例如 URL policy 阻止访问 localhost、无法监听 console、无法填 input、无法使用虚拟剪贴板或无法执行页面脚本，必须如实报告具体受限步骤、错误关键句、已经完成的替代检查、仍未确认的事项，以及是否需要用户人工肉眼 smoke。禁止把工具限制包装成“UI smoke 已完整通过”。

当自动化浏览器无法完整执行时，Codex 至少应先完成以下非 UI 检查，再请求用户人工确认：

- 本地服务返回 HTTP 200 OK。
- HTML 中版本号是本轮版本。
- 新增 runtime JS URL 返回 HTTP 200 OK。
- script 加载顺序正确。
- cache query 已同步。
- `node scripts/runGoldenSamples.js` 通过。
- 必要的 `node --check` 通过。
- `git diff --check` 通过。

用户人工 smoke 只作为最后一步。只有在 Codex 已完成服务 / 缓存 / 脚本加载排查，且自动化工具仍受限时，才请求用户人工确认：页面能打开、页面顶部版本号正确、普通试喝路径能出结果、事故试喝路径能出结果、页面没有白屏、页面没有出现 `undefined` / `[object Object]`。用户不是程序员，不应默认要求用户打开 console 或理解技术细节。

如果没有完整 UI smoke，报告中必须写清：自动化 UI smoke 是否完成；如果没完成，是服务问题、缓存问题、工具限制还是用户跳过；是否做了人工肉眼 smoke；是否做了 console 检查；哪些检查是真正执行过并通过的。

## 2. 开工前必读文件

每轮开始前应优先读取：

1. `AGENTS.md`
2. `docs/AI_CONTEXT.md`
3. `docs/TASTE_ENGINE_ARCHITECTURE.md`
4. `docs/TASTE_SYSTEM_DESIGN.md`
5. `docs/VERSION_LOG.md`

必要时再读：

- `data/goldenSamples.js`
- `data/ingredients.js`
- `core/ingredientRegistry.js`
- `core/tasteContext.js`
- `core/ruleRefHelper.js`
- `core/tasteJudge.js`

不要默认全仓库考古。按本轮任务范围读取必要文件即可。

## 3. 当前阶段边界

当前阶段是：

```text
v0.0.6.x｜三层属性 / profile / summary 地基阶段
```

v0.0.5.x 已基本完成“现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基”。玩家可见文案不应长期承担系统主键职责；中文只是当前最常见的显示文案例子，英文 / 日文 / 任何未来可能改名、本地化或换风格的 label 也一样不能当系统身份。不要把“显示文案主键”退回成“中文主键”的狭义理解。

v0.0.6.x 的阶段名应写作“三层属性 / profile / summary 地基阶段”，不要简单写成“三层判定阶段”。`tasteProfile` / `textureProfile` / `flavorProfile` 描述结构化属性，`tasteSummary` / `textureSummary` / `flavorSummary` 汇总一杯饮品的中间理解结果；profile / summary 不是最终判定。最终事故、类型、反馈、severity、score、经营成本、顾客偏好等，应在 summary 之后由 candidate / rule / 调度层决定。

v0.0.6.x 第一阶段不做完整 severity / `scoreMultiplier` / 大规模数值调参，这些留到 v0.0.7.x。不要在 v0.0.6.1 直接重写 analyzer、接管最终评分或把旧逻辑一次性改成完整三层 runtime。

三层 summary 应采用可扩展结构，例如：

```js
{
  values: {},
  tags: [],
  risks: [],
  evidence: [],
  metadata: {}
}
```

`tasteSummary` / `textureSummary` / `flavorSummary` 的细分项后续会增删，字段、类别、阈值、说明和权重不能写死在 analyzer if 中。summary schema 应预留 `weights` / `thresholds` / `evidence` / `sourceLayer` / `priorityBand` / `severityHint` 等未来扩展口。

代码负责汇总 / 调度，数据和规则负责“判什么”。不要把具体组合判断长期写成 if 某原料 + 某原料；legacy 逻辑可以暂存，但不能继续扩张。

阶段边界：

- v0.0.5.x：解决“系统里的东西是谁”。
- v0.0.6.x：解决“这些东西如何被三层属性系统理解并汇总”，正式推进 `tasteProfile` / `textureProfile` / `flavorProfile` 与三层 summary。
- v0.0.7.x：解决“判断得好不好、数值顺不顺”，推进 severity、数值调优和 golden samples 扩容。

v0.0.6.x 后续候选事项应保持小步、可回归、可冻结，例如 `tasteSummary` 只读地基、summary / candidate schema 小批落地、显示文案主键 legacy fallback 收口审计、规则 metadata 小批补充。不要把这些候选写成已经完成，也不要机械扩成固定版本清单。

每一刀都应小、可回归、可冻结。

## 4. 修改范围原则

严格遵守用户单次任务中指定的允许修改文件范围。

- 未明确允许的文件不要改。
- 不要顺手扩大范围。
- 不要把只读评估任务变成实现任务。
- 不要把 docs 任务变成代码任务。
- 不要把 candidate 冻结任务变成新功能任务。
- 不要为了让测试通过而改 golden samples、评分、反馈文案或规则阈值，除非任务明确要求。

## 5. Git / Push / Tag 规则

每轮开工前先执行 `git status`，修改前确认工作区状态。

本项目默认规则：

- 默认不 push `main`。
- 默认不创建 / 推送 tag。
- 除非用户任务明确要求，否则只创建本地 commit。
- 普通 `git push origin main` 通常由用户自己执行。
- candidate tag 只在明确冻结任务中创建。

如果工作区不干净、分支 ahead / behind、或当前 commit 与任务预期不一致，应停止并报告，不要继续改文件。

## 6. 测试与验收规则

修改味觉 / 规则 / core / data / golden samples 相关文件后，或用户明确要求回归检查时，通常必须执行：

```bash
node scripts/runGoldenSamples.js
```

`AGENTS.md` 不承担具体 golden samples 数量记录职责，不应硬编码当前样本总数。具体 expected 数量以 `docs/AI_CONTEXT.md` 当前状态快照、`docs/VERSION_LOG.md`、实际 `data/goldenSamples.js` 和 `node scripts/runGoldenSamples.js` 的运行结果为准。报告中必须如实写明本轮实际结果。

测试分级规则以 `docs/TASTE_ENGINE_ARCHITECTURE.md` 为准。

- 只改 docs / 工作流文档时，通常不强制真实浏览器或 UI smoke test。
- 修改核心 runtime、脚本加载、UI 事件或保存结构时，应提高测试等级。
- 未做真实浏览器 / UI smoke test 时，报告必须如实说明。
- 不得把未做的测试包装成已通过。

验收失败必须诚实报告，不要用模糊措辞掩盖异常。

## 7. 味觉引擎架构原则

避免 if 地狱。项目不是要消灭所有 if，而是让少量中枢 if 负责调度、优先级和安全阈值，具体内容尽量由规则表 / profile / summary / 文案池 / golden samples 驱动。

`ruleRefHelper` 只做 ref 解析和 context 查询，不承载味觉判断、事故判断、组合语义或文案判断。

玩家可见文本不应长期作为系统主键。Codex 后续看到原料名、事故类型、饮品类型、反馈文案、客群名、图鉴条件、成就条件等显示文案被当作内部主键时，应提醒并优先考虑 stable ID + displayName / text 双轨。中文只是当前最常见的显示文案例子，不是唯一风险来源。

允许 legacy 中文字段 / 显示文案字段在过渡期继续存在，但新增规则、新数据和新系统应优先使用稳定 ID。不要在新结构里继续把显示文案当内部主键，也不要为了 ID 化把本轮任务扩大到未来尚不存在的系统；应遵守用户单次任务范围，小步迁移。

长期三层 profile：

- `tasteProfile`：基础味觉。
- `textureProfile`：物理质地。
- `flavorProfile`：风味身份 / 香气身份。

三层 profile / summary 是 v0.0.6.x 当前主线，但它们仍是中间理解层，不是最终判定层。新增 summary 逻辑应优先输出可解释的 values / tags / risks / evidence / metadata，再由后续规则和候选层决定事故、类型、反馈和评分。

事故优先级不等于事故严重度。severity 长期应数据化为 `severityLevel` / `scoreMultiplier` 等可调结构。

不要把粗吸管需求等轻微服务冲突自动判成重事故。

## 8. 报告格式要求

每轮完成后必须报告：

- 修改了哪些文件。
- 是否只改允许范围。
- 测试结果。
- golden samples 结果。
- 是否做了无头 Chrome / UI smoke test。
- `git status` 是否干净。
- commit hash。
- 是否未 push、未 tag。

如果失败，必须如实报告失败点，不要包装成成功。

## 9. 失败处理原则

如果任何开工检查、测试、自检、页面加载或 git 状态检查失败：

- 不要继续扩大修改。
- 不要创建无关 commit。
- 不要 push。
- 不要 tag。
- 保留现场并报告具体失败点。
- 等用户决定下一步。
