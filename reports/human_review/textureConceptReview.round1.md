# Texture Concept Review Round 1｜质地 / 可饮用性概念审核记录

## 0. 文件定位

本文件记录制作人对第一批 texture / drinkability concept candidates 的自然语言审核结论。

本文件只保存审核结果，不批准任何 stable ID。

后续若要形成 approved concept list，必须另开任务，由 ChatGPT / 用户确认后再整理。

Codex 不得从本文件自行生成 ID、registry row、validator rule 或 runtime data。

本文件不是：

- source-of-truth
- approved concept list
- stable ID list
- draft ID list
- registry candidate
- runtime data
- validator input
- final feedback / final result 来源
- golden expected 修改依据

## 1. 审核边界

- `C001`-`C008` 是临时审核编号，不是 stable ID / draft ID / registry candidate。
- 通过不等于 stable。
- 驳回不等于永久禁止，只代表本轮不进入下一步。
- `merge` / `reclassify` / `evidenceOnly` / `expressionTag` 只是审核结论，不是机器枚举。
- 本轮不处理具体数值、阈值、severity、scoreMultiplier。

## 1.1 Severity / 表现强度补充原则

制作人补充：同一事故机制后续应通过 triggerMetric 数值区间、severityLevel、scoreMultiplier 和 feedback intensity 区分轻中重，而不是拆成多个 accidentTypeId。

示例方向：

- 0-40：不触发。
- 40-60：轻度，例如轻微浑浊感 / 粗糙粉感。
- 60-80：中度，例如喝着费劲、粉浆感明显。
- 80-100：重度，例如水泥感、根本吸不上来。

这些数值和文案只是制作人随口举例，不是正式阈值，不是正式文案，不是 runtime data。

后续正式数值、severityLevel、scoreMultiplier 和文案强度必须另走 approved concept list / rule draft / validator / review 流程。

## 2. 制作人原始审核摘要

### C001｜小料多到不像饮料 / 八宝粥感

- producerStatus: keep
- producerDecision: 通过，八宝粥感是经典概念。
- 归档建议：机制概念候选。
- 备注：固体小料负载过高，饮品形态被小料压垮。

### C002｜糊住的粉浆感 / 水泥感

- producerStatus: keep
- producerDecision: 通过，水泥感 / 吸不上来是游戏最早就想到的核心概念。
- 归档建议：机制概念候选。
- 备注：泥、粉、渣、糊导致低流动性；区别于油腻和胶粘。粗糙粉感 / 沙感 / 轻微粉浆感不应拆成独立 texture accident concept，应作为 C002 水泥感 / 粉泥感的低 severity 表现或文案方向。C002 可以覆盖从轻度粉感到重度水泥感的同一机制连续谱。

### C003｜吸管阻力过高

- producerStatus: merge / evidenceOnly
- producerDecision: 不作为独立机制。更像 C001 / C002 的弱化表现或表现标签。
- mergeTarget: C002 primary, C001 secondary
- 归档建议：表现标签 / 严重程度线索 / 文案触发依据。
- 备注：八宝粥感和水泥感都可能产生吸管阻力；“吸管吸瘪了”可作为表现，不单独成病名。吸管阻力可服务 C001 / C002 等多个机制的文案触发或严重度表达，不单独成为机制。

### C004｜奶脂 / 奶盖厚到发腻

- producerStatus: keep
- producerDecision: 通过。太油 / 一整杯奶盖 / 全是奶脂奶油是最早概念之一。
- 归档建议：机制概念候选。
- 备注：虽然可在 texture / mouthfeel 层判定，但玩家表现更像“太油、太腻、入口恶心”。它吸着可能顺滑，但进嘴后负担重；和 C002 的吸不上来不同。

### C005｜胶质感过强 / 胶粘感

- producerStatus: keep
- producerDecision: 通过。蜂蜜、糖浆、胶质过多造成满嘴黏糊糊很有趣。
- 归档建议：机制概念候选或质地标签候选，后续再定。
- 备注：不同于粉泥感和奶脂油腻；核心是胶、黏、粘嘴、拖尾。用户举例包括蜂蜜放多、糖浆放多、鸡蛋放多的胶粘口感类比。不要把“鸡蛋”理解为当前新增原料，只作为口感比喻记录。

### C006｜沉积到底部，前后半杯割裂

- producerStatus: reject
- producerDecision: 驳回。现实饮品中芋泥、奥利奥碎等沉积很常见，默认喝前用吸管搅一搅；判成事故太严苛。
- 归档建议：不作为事故机制。
- 备注：可作为未来制作工艺 / 搅拌提示 / evidence，但本轮不进入机制候选。

### C007｜清爽液体被厚重元素吞掉

- producerStatus: keep / reclassify
- producerDecision: 概念通过，但分类要小心；不应归为质地概念，更偏风味冲突 / 饮品结构失衡。
- 归档建议：移出 texture round，转入后续 flavor / structure conflict concept review。
- 备注：不在本轮 texture 机制内推进。

### C008｜“需要勺子”的边界

- producerStatus: merge / reject
- producerDecision: 和 C001 八宝粥感是一回事；驳回独立机制，或并入 C001。
- mergeTarget: C001
- 归档建议：不独立成机制。
- 备注：可作为 C001 的文案表现或产品形态边界讨论，但本轮不单独保留。

## 3. 本轮初步分桶

| bucket | candidates | note |
|---|---|---|
| keep / mechanism candidate | C001 八宝粥感 / 固体小料负载过高 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C002 水泥感 / 粉泥感 / 低流动性 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C004 奶脂油腻 / 厚重入口负担 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C005 胶粘感 / 胶质负担 | 后续可进入 approved concept list 草案讨论 |
| merge / expression tag / evidence | C003 吸管阻力 | 作为表现标签 / severity cue / 文案触发依据，归 C002 为主、C001 为辅 |
| merge / expression tag / evidence | C008 需要勺子 | 并入 C001 |
| reject | C006 沉积到底部 | 作为事故机制过严，本轮驳回 |
| reclassify / later review | C007 清爽被厚重吞掉 | 转 flavor / structure conflict 后续批次 |

## 4. 后续边界

- 本文件不是 approved concept list。
- 下一步若继续，应先由 ChatGPT / 用户把 keep 项整理成 approved concept list 草案。
- Codex 不能直接根据本文件生成 stable ID。
- Codex 不能直接把 keep 项写入 registry / validator / runtime。
- C003 这类表现标签后续可能用于文案触发或严重程度描述，但不是本轮机制 ID。
- C007 后续应在 flavor / structure conflict 批次重新审核。
