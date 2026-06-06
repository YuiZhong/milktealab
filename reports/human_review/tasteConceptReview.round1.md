# Taste Concept Review Round 1｜味觉层概念审核记录

## 0. 文件定位

本文件记录制作人对第一批 taste layer concept candidates 的审核结论。

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
- `revise` / `customerPreference` / `tasteLayer` / `parkingLot` 等只是审核结论，不是机器枚举。
- 本轮不处理具体数值、阈值、severity、scoreMultiplier。
- 所有可分级事故都遵守全局原则：同一事故按 `triggerMetric` 区间、`severityLevel`、`scoreMultiplier`、feedback intensity 分轻中重，不拆 `accidentTypeId`。
- 本轮不实现顾客偏好系统。
- 本轮不形成 approved concept list。
- 本轮不生成任何 ID、registry candidate、validator rule 或 runtime data。

## 2. 制作人原始审核摘要

### C001｜饮品存在感过低 / 太淡

- producerStatus: keep
- producerDecision: 通过，肯定要有。
- 归档建议：机制概念候选。
- 备注：这是基础必备概念，需要判断饮品是否几乎没有存在感，但不能误伤牛奶、茶、咖啡等基础味觉低但风味身份 / body 明确的饮品。

### C002｜甜度过载

- producerStatus: keep
- producerDecision: 通过，肯定要有。
- 归档建议：机制概念候选。
- 备注：甜度过载应支持 severity 分级，例如正常、有点太甜、明显太甜、甜度灾难；不拆多个 accidentTypeId。

### C003｜酸度过载

- producerStatus: keep
- producerDecision: 通过，肯定要有。
- 归档建议：机制概念候选。
- 备注：酸度过载应支持 severity 分级；不要按柠檬、山楂、百香果等具体酸味原料拆多个酸度事故。

### C004｜苦味过载

- producerStatus: keep / customerPreferenceSensitive
- producerDecision: 通过，肯定要有，但后续权重和扣分要斟酌。
- 归档建议：机制概念候选，且后续需要顾客偏好系统参与调节。
- 备注：有人就喜欢很苦的东西，例如 espresso。未来顾客系统中可以有偏好苦咖啡、浓茶、强苦味的客群，例如上班族等。但不要写成 if 地狱；应通过顾客偏好 / audience tags / tolerance 处理。

### C005｜咸味过载 / 咸甜失衡

- producerStatus: revise
- producerDecision: 需修改。
- 归档建议：保留“咸味过载”，去掉或弱化“咸甜失衡”。
- 备注：饮品里少量咸味可能形成“咸甜永动机”式的好喝层次；咸甜组合本身不该被惩罚。真正的问题是咸度太多，直接变成咸味过载。后续应审为“咸味过载”，而不是“咸甜失衡”。

### C006｜涩感 / 收敛感过强

- producerStatus: keep / customerPreferenceSensitive
- producerDecision: 通过。
- 归档建议：机制概念候选，且后续需要顾客偏好系统参与调节。
- 备注：有些人喜欢强茶感、茶涩、收敛感；默认大众口味可能扣分，但未来客群偏好和 tolerance 需要注意。

### C007｜特殊刺激过强

- producerStatus: keep / customerPreferenceSensitive
- producerDecision: 通过。
- 归档建议：机制概念候选或后续可按项目内容拆分，且需要顾客偏好系统参与调节。
- 备注：辣、麻、酒精灼烧感等刺激感有人喜欢。后续不要写成 if 酒 / if 辣；应通过刺激感通道、profile、intensity、客群 tolerance 处理。

### C008｜基础味觉整体过载

- producerStatus: keep / highRisk
- producerDecision: 通过，但需要特别小心。
- 归档建议：高风险机制概念候选。
- 备注：制作人此前已说明，该概念不能简单累加所有 flavor identity。应聚焦基础味觉 / 刺激感负担；不要把茶味 70 的好喝花茶误判成“味道很浓很可怕”。需要和 flavor 线的“风味主题太多，没有主角”区分。

## 3. 本轮初步分桶

| bucket | candidates | note |
|---|---|---|
| keep / mechanism candidate | C001 饮品存在感过低 / 太淡 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C002 甜度过载 | 后续可进入 approved concept list 草案讨论，支持 severity 分级但不拆 ID |
| keep / mechanism candidate | C003 酸度过载 | 后续可进入 approved concept list 草案讨论，酸味原料只作 evidence |
| keep / customerPreferenceSensitive | C004 苦味过载 | 后续需要顾客偏好 / tolerance 参与调节 |
| keep / customerPreferenceSensitive | C006 涩感 / 收敛感过强 | 后续需要顾客偏好 / tolerance 参与调节 |
| keep / customerPreferenceSensitive | C007 特殊刺激过强 | 后续需要顾客偏好 / tolerance 参与调节 |
| revise | C005 改为“咸味过载”，去掉“咸甜失衡”作为事故方向 | 咸甜组合本身不应被惩罚 |
| keep / highRisk | C008 基础味觉整体过载 | 高风险，不能简单累加所有 flavor identity |

## 4. 后续边界

- 本文件不是 approved concept list。
- 下一步若继续，应先由 ChatGPT / 用户把 keep / revise 后成立的项整理成 approved concept list 草案。
- Codex 不能直接根据本文件生成 stable ID。
- Codex 不能直接把 keep 项写入 registry / validator / runtime。
- C004 / C006 / C007 后续必须考虑顾客偏好 / tolerance，不能默认所有顾客都讨厌苦、涩、刺激。
- C005 应按“咸味过载”继续，不应把咸甜组合本身判成事故。
- C008 后续必须重点防误算 flavor identity，不能简单把所有 flavor identity 加入 taste overload。
- 本轮不处理顾客系统，不实现 taste layer，不调数值。
- 本文件不能自动修改 final feedback / final result / golden expected。
