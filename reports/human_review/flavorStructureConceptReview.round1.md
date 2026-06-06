# Flavor / Structure Concept Review Round 1｜风味 / 饮品结构冲突概念审核记录

## 0. 文件定位

本文件记录制作人对第一批 flavor / structure conflict concept candidates 的审核结论。

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
- `merge` / `reclassify` / `tasteLayer` / `highRisk` 等只是审核结论，不是机器枚举。
- 本轮不处理具体数值、阈值、severity、scoreMultiplier。
- 本轮不形成 approved concept list。
- 本轮不生成任何 ID、registry candidate、validator rule 或 runtime data。

## 2. 制作人原始审核摘要

### C001｜清爽感被厚重元素吞掉

- producerStatus: keep
- producerDecision: 通过。
- 归档建议：机制概念候选。
- 备注：清爽和厚重叠加时违和感强，例如柑橘气泡水里加入芋泥或奶盖，制作人认为这类体验应该被系统理解。

### C002｜强风味身份压制整杯

- producerStatus: keep / highRisk
- producerDecision: 通过，但非常容易变成 if 地狱，后续必须小心处理。
- 归档建议：高风险机制概念候选。
- 关键边界：强风味身份压制应作为机制大类；具体强风味原料只能作为 evidence / flavor family / intensity source，不得按榴莲、番茄、咖啡、抹茶等具体原料拆多个 accidentTypeId。
- 备注：后续若进入结构化，必须走规则表 / profile / intensity / flavor identity，而不是写单原料 if。

### C003｜风味身份错位

- producerStatus: keep
- producerDecision: 通过。
- 归档建议：机制概念候选。
- 备注：风味层本来就是为解决这类问题诞生的。制作人举例：橘子和西红柿在 taste 数值层面都酸甜、texture 上都柔软多汁，但实际 flavor identity 完全不同。

### C004｜香气方向互相打架

- producerStatus: reject
- producerDecision: 驳回。
- 归档建议：不作为本轮机制候选。
- 备注：现实中存在大量成功的花果香奶茶、花果咖啡组合，如蜜桃乌龙、茉莉冰美式。若把这类组合泛化判冲突，会过于严苛。

### C005｜饮品类型承诺和实际体验不一致

- producerStatus: keep / highLevel
- producerDecision: 通过，机制很好玩，但制作人暂时不确定怎么实现。
- 归档建议：高阶机制概念候选 / product identity 候选。
- 备注：可能和 drinkType / product identity / player expectation 相关，后续实现风险较高，不应急着结构化或接 runtime。

### C006｜甜味遮蔽风味身份

- producerStatus: reject / tasteLayer
- producerDecision: 驳回本轮 flavor 层归档。
- 归档建议：转 taste 层，不进入本轮 flavor concept list。
- 备注：甜度过载应属于 taste 层判断，和酸度过载同类，不应放进 flavor 层。

### C007｜风味主题太多，饮品没有主角

- producerStatus: keep
- producerDecision: 通过。
- 归档建议：机制概念候选。
- 备注：游戏中玩家很可能把所有东西都扔进杯子里，这类“主题过载 / 没有主角”的情况很容易触发，值得系统理解。

### C008｜咸甜边界失控

- producerStatus: reject / tasteLayer
- producerDecision: 驳回本轮 flavor 层归档。
- 归档建议：转 taste 层。
- 备注：与 C006 类似，属于 taste 层判断，不应放进 flavor 层。

## 3. 本轮初步分桶

| bucket | candidates | note |
|---|---|---|
| keep / mechanism candidate | C001 清爽感被厚重元素吞掉 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C003 风味身份错位 | 后续可进入 approved concept list 草案讨论 |
| keep / mechanism candidate | C007 风味主题太多，饮品没有主角 | 后续可进入 approved concept list 草案讨论 |
| keep / high-risk mechanism candidate | C002 强风味身份压制整杯 | 后续必须重点防 if 地狱，不按具体强风味原料拆事故 ID |
| keep / high-level product identity candidate | C005 饮品类型承诺和实际体验不一致 | 后续实现风险高，不应急着结构化或接 runtime |
| reject | C004 香气方向互相打架 | 不作为本轮机制候选 |
| reclassify / taste layer | C006 甜味遮蔽风味身份 | 转 taste 层，本轮不处理 |
| reclassify / taste layer | C008 咸甜边界失控 | 转 taste 层，本轮不处理 |

## 4. 后续边界

- 本文件不是 approved concept list。
- 下一步若继续，应先由 ChatGPT / 用户把 keep 项整理成 approved concept list 草案。
- Codex 不能直接根据本文件生成 stable ID。
- Codex 不能直接把 keep 项写入 registry / validator / runtime。
- C002 后续必须重点防 if 地狱，不能按具体强风味原料拆事故 ID。
- C005 属于更高阶 product identity 候选，后续不应急着实现。
- C006 / C008 转 taste 层，但本轮不处理 taste 层 concept review。
- 本文件不能自动修改 final feedback / final result / golden expected。
