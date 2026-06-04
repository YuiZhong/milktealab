# 奶茶实验室 AI Context

> 本文件是《奶茶实验室》的 AI 交接上下文文件，用于 ChatGPT / Codex 在新对话、新任务或长上下文丢失时快速恢复项目方向。

> 它不是完整版本记录；详细版本变化请看 `docs/VERSION_LOG.md`。

> 每次稳定版本冻结后，应更新本文件的“当前版本状态”“下一步计划”“关键长期规则”。

---

## 0. 记忆标注规则

【不要删】表示长期原则、项目定位、核心资产、工作流、重要架构约束、路线图、跨版本规则、用户长期偏好。

【可删】表示单个版本的临时测试结果、短期待办、已写入 docs / GitHub / VERSION_LOG 的阶段性细节、可由项目文件恢复的信息。

以后新增 AI_CONTEXT 内容时，如果不确定是否可删，默认标【不要删】，等项目 docs 固化后再清理。

【不要删】云记忆系统可能会自动摘要、合并或改写保存内容，因此不能依赖云记忆管理页原样保留【不要删】/【可删】标签。标签管理的正本应放在本地 docs，尤其是 `docs/AI_CONTEXT.md`；云记忆只保留少量真正需要跨对话自动调用的核心规则、项目定位、长期路线和关键工作流，不承担版本流水账和精确标签管理职责。

【不要删】云端长期记忆不是项目仓库，只保留少量跨对话必须自动调用的长期原则、项目定位、核心资产方向、关键工作流、重要边界和用户长期偏好。版本流水账、commit hash、tag、单次验收结果、具体改了哪些文件、某次测试是否通过、备份路径等，应写入本地 docs、`docs/VERSION_LOG.md` 或 GitHub/tag。云记忆是导航仪，不是仓库。

---

## 新对话启动提醒

【不要删】如果用户在新 ChatGPT / Codex 对话中只提供了本文件，不要只依赖 `AI_CONTEXT.md` 继续开发。请主动提醒用户继续提供 / 让 Codex 读取以下关键文件：

1. `docs/TASTE_ENGINE_ARCHITECTURE.md`
   - 味觉引擎架构正本。
   - 包含三层 profile 的设计由来、事故优先级、事故 severity 数值化原则、测试分级规则、v0.0.5.x / v0.0.6.x / v0.0.7.x 阶段边界。
   - 这是理解“为什么这么设计”的核心文件。
2. `docs/TASTE_SYSTEM_DESIGN.md`
   - 味觉系统设计文档。
   - 包含 tasteProfile / textureProfile / flavorProfile、ingredientId、规则迁移方向等系统设计细节。
3. `docs/VERSION_LOG.md`
   - 版本记录。
   - 用于确认最近完成了哪些 candidate、当前版本状态、哪些变化已经冻结。
4. `docs/STABLE_ID_NAMING_GUARDRAIL.md`
   - 长期 stable ID / 命名 / 审查流程正本。
   - 涉及 ID、tag、ruleId、sampleId、candidateId、triggerMetric、priorityBand、severityLevel、registry、validator、generated data 的任务，开工前应读取。
5. `docs/V0_0_7_MECHANISM_TODO.md`
   - v0.0.7.x 机制 / ID / 内容管线债务正本。
   - 涉及 v0.0.7.x 机制、ID、severity、threshold、validator、generated data、partial / active 接管的任务，开工前应读取。
6. `data/goldenSamples.js`
   - 当前 golden samples 安全网。
   - 用于理解现有回归样本、ID 等价样本和关键味觉结果基线。
7. 必要时再读取相关代码入口：
   - `data/ingredients.js`
   - `core/ingredientRegistry.js`
   - `core/tasteContext.js`
   - `core/ruleRefHelper.js`
   - `core/tasteJudge.js`

提醒原则：

- `AI_CONTEXT.md` 只负责恢复方向和索引，不应该承载全部设计细节。
- 新对话如果要继续架构设计或 Codex 开工，必须至少读取 `docs/TASTE_ENGINE_ARCHITECTURE.md`。
- 如果用户只发了 AI_CONTEXT，助手应明确说：“请再把 `docs/TASTE_ENGINE_ARCHITECTURE.md` 发我，必要时再发 `TASTE_SYSTEM_DESIGN.md` 和 `VERSION_LOG.md`。”

---

## 当前状态快照

【可删】截至当前文档：

- 最新确认 candidate：`v0.0.7.49-candidate`
- 最新确认 candidate commit：`8aee7f400f70e50a6de09987b12269f28cd44613`
- `v0.0.7.49-candidate` 已创建并推送成功，指向 `8aee7f400f70e50a6de09987b12269f28cd44613`。
- main / origin/main 已同步到 `8aee7f400f70e50a6de09987b12269f28cd44613`；工作区应干净。
- golden samples 当前应为 `23/23 passed`。
- `git diff --check` 已通过。
- 正式 tag `v0.0.7.49` 未创建。
- 当前未推进 `v0.0.7.50`。

### v0.0.7.30-v0.0.7.32 压缩摘要

- 已完成 ID / naming inventory、known stable ID source-of-truth design、stable ID source collector proof。
- 这些产物仍不是 registry、enum、validator 或 runtime source-of-truth。
- collector / inventory 只能作为 review / source-of-truth 设计证据，不能把 observed / draft / candidate / sample-only ID 自动升级为 stable ID。

### v0.0.7.33-v0.0.7.43 压缩摘要

- 已完成 feedbackTag mapping design、mechanism review pack gate、review pack proof、drinkStructure displayName inventory、AI-generated ID / tag naming review pack、decision split，以及 `taste_conflict` -> `flavor_identity_conflict` 的实际迁移和后续边界 notes。
- 当前 `flavor_identity_conflict` 是 outcomeTypeId。
- `identity_conflict` 仍是 candidate / risk tag，不是 feedbackTag，也不是 outcomeTypeId。
- `bubble_conflict` 仍是窄语义 runtime observed feedbackTag，语义偏气泡 + 厚重 / 口感冲突追评，不泛化为 generic flavor identity conflict。
- P1-1 / P1-5 / P1-7 仍未完全解决。
- source-of-truth / registry / validator 仍未创建。

### v0.0.7.44-v0.0.7.48 压缩摘要

- v0.0.7.44 已完成 accidentAnalyzer legacy accident migration decision split。
- v0.0.7.45 已完成 texture content-specific accident migration target plan。
- 已完成 texture content-specific staged migration 三步：

```text
texture_taro_overload    -> texture_low_drinkability
texture_oreo_overload    -> texture_low_drinkability
texture_topping_overload -> texture_solid_overload
```

- v0.0.7.46 已完成 `texture_taro_overload` -> `texture_low_drinkability` actual migration。
- v0.0.7.47 已完成 `texture_oreo_overload` -> `texture_low_drinkability` actual migration。
- v0.0.7.48 已补充 mechanism ID restraint / display boundary guardrail：机制 ID 应少而稳，不应为单个组合、recipe、golden sample、文案梗、制作人备注或 review pack item 单独创建；玩家展示 `type` / feedback copy 差异不能反向拆分机制 ID。
- v0.0.7.49 已完成 `texture_topping_overload` -> `texture_solid_overload` actual migration；具体小料名和“吸管体能测试”解释保留在 note / feedback copy，不写进事故 ID。
- collector / source 文案中若仍引用已迁出的 `texture_taro_overload` / `texture_oreo_overload`，后续 cleanup 前应按 historical / pre-v0.0.7.46 / pre-v0.0.7.47 legacy reference 语气处理，避免误读为 current active runtime ID。
- collector / source 文案中若仍引用已迁出的 `texture_topping_overload`，后续 cleanup 前应按 historical / pre-v0.0.7.49 legacy reference 语气处理，避免误读为 current active runtime ID。
- P1-4 仍未完全解决；texture content-specific staged migration 三步已完成，但 broader accidentAnalyzer migration route、source-of-truth / registry / schema、validator / generated severity / shadow / partial takeover gates 仍未完成。
- 不新增：
  - `texture_paste_overload`
  - `texture_sediment_overload`
  - `texture_topping_specific_overload`
  - 任何按原料拆分的 texture accidentTypeId
- 芋泥 / 奥利奥 / 小料个性应保留在 evidence / notes / feedback copy，不写进 future accidentTypeId。
- staged order 中 taro / Oreo / topping 三步均已完成；不要把这误读成 P1-4 solved。

### 当前下一步

- 当前下一步：新对话先读取 `AI_CONTEXT` / `VERSION_LOG` / `V0_0_7_MECHANISM_TODO` / `STABLE_ID_NAMING_GUARDRAIL` / legacy inventory 与三份 migration report，做状态恢复和 P1 TODO 复盘，再决定 `v0.0.7.50`。
- 不要回头做 v0.0.7.45 / v0.0.7.46 / v0.0.7.47 / v0.0.7.48 / v0.0.7.49。
- 不要把 v0.0.7.48 guardrail 写成 registry / validator 已完成。
- 不要为单个组合、recipe、sample、文案梗或 review item 新增机制 ID。
- 不要因为玩家展示不同就拆出新 mechanism ID。
- 不要开 registry。
- 不要开 validator。
- 不要做 generated severity build。
- 不要做 partial / active takeover。

## 1. 项目定位

【不要删】《奶茶实验室》是用户的长期原创游戏项目，暂定名已定。灵感来自老游戏《疯狂摇摇杯》，但必须做成原创作品，不能复刻原名、素材、UI、配方表或原文案。

【不要删】项目最终目标是面向“手游 + Steam 端游”的原创饮品研发经营模拟游戏。当前使用 Web 技术快速做可玩原型/MVP，是为了验证核心玩法并沉淀可迁移的数据和规则系统，不代表最终产品是网页游戏。

【不要删】长期要求：核心味觉系统、原料数据、反馈文案、客群偏好、测试样本尽量平台无关，避免与当前网页 UI 强绑定，为未来手游版和 Steam 版迁移做准备。

---

## 2. 核心玩法

【不要删】玩家不是当奶茶店员工，也不是单纯手忙脚乱接单，而是老板 / 饮品研发师 / 配方疯子。

核心循环：

1. 自由研发饮品
2. 获得试喝员毒舌但可爱的反馈
3. 保存 / 命名 / 上架
4. 白天营业验证市场反应
5. 根据顾客反馈继续优化

宣传和定位应强调：

> 不是重复手动摇杯，而是发明一杯奇怪奶茶，看它能不能卖爆。

---

## 3. 当前阶段目标

【不要删】第一阶段 MVP 以“配方实验室”为主，不急着做完整经营、地图、装修、剧情、复杂员工、联网账号等。

第一阶段最重要的是验证：

> 自由配方 → 系统读懂配方 → 试喝反馈有灵魂 → 玩家想继续调下一杯

页面应干净、可爱、像游戏，不像后台管理系统。

核心按钮包括：

- 试喝一下
- 随机乱摇
- 清空杯子
- 保存配方
- 查看已保存配方

“试喝一下”和“清空杯子”是高频按钮，应靠近当前杯子区域。试喝按钮高亮，清空按钮弱化。

---

## 4. 配方系统原则

【不要删】配方系统不能做成“每类只能选一个”的固定槽位。

应采用：

> 成分池 + 比例系统

茶类、乳类、液体、水果/风味、调味、小料等只用于 UI 分组，不限制同类别多选。

【不要删】茶底和乳基必须拆开。“奶茶”不应与红茶、绿茶、乌龙茶并列为茶底，而是“茶 + 乳基”的结果。

【不要删】比例调整原则：

- 手动改一个原料时，其他原料不动
- 总量可以低于 100%
- 总量不能超过 100%
- 左侧原料按钮采用开关式交互
- 点击未加入原料 = 加入当前杯子
- 再点已加入原料 = 移除
- 不采用每点一次 +10% 的累加逻辑
- 已加入原料应明显高亮或显示 ✓

【不要删】自由实验室阶段不应硬限制原料数量。允许玩家把很多原料放进同一杯，这是自由研发和整活的乐趣；未来经营阶段可以把过度复杂配方转化为出杯时间、制作复杂度、员工负担、成本、备料压力、顾客等待和吞吐风险等软成本。这属于 operation / production / economy 层，不应作为当前味觉层硬惩罚，也不进入当前 v0.0.5.x ID 化实现范围。

---

## 5. 原料分类基准

【不要删】第一版原料分类基准：

### 茶类

红茶、绿茶、乌龙茶、茉莉茶、普洱茶

### 乳类

牛奶、厚乳、淡奶油、椰奶、燕麦奶、植脂奶等

### 液体

纯水、气泡水、咖啡

### 水果/风味

柠檬、草莓、芒果、榴莲、西瓜、葡萄、桃子、荔枝、抹茶、可可等

### 调味

白糖、蜂蜜、黑糖、焦糖、海盐等

### 小料

珍珠、椰果、布丁、仙草、芋圆、奥利奥碎、奶盖、芋泥等

【不要删】芋泥更适合归入小料，而不是水果/风味。

【不要删】“奶精”应改为“植脂奶”。植脂奶体现廉价、工业感、健康疑虑。适量可增加奶感和低成本感，过量应触发负面反馈。

---

## 6. 味觉系统核心资产

【不要删】味觉系统是《奶茶实验室》的核心资产，不是普通评分器。

目标是打造：

> 被 AI 和人类一起驯化过的离线味觉引擎

运行时不一定接入 LLM，最终可用离线数据 + 规则引擎判断。

开发时应充分利用 AI 批量生成：

- 味觉假设
- 原料属性草案
- 协同冲突矩阵
- 测试样本
- 调参建议
- 反馈文案草案

再由用户和 ChatGPT 审美筛选，由 Codex 落地，并用测试防回退。

核心资产包括：

- 原料属性库
- 双原料 / 多原料协同冲突矩阵
- 饮品模式规则
- 比例影响
- 温度影响
- 冰量影响
- 糖度影响
- 质地判断
- 香气判断
- 厚重 / 清爽判断
- 吸管阻力判断
- 客群偏好模型
- 反馈文案库
- 金标样本库
- 自动测试体系

【不要删】后续要避免“一万个 if”。优先使用数据驱动结构和模块分层，而不是把大量具体配方硬编码进单个巨大函数。

【不要删】v0.0.5.x 前几个版本应优先继续治理味觉系统代码结构和规则数据化，不急着调数值 / 调味觉表现。优先顺序是：饮品类型识别数据化、反馈标签化 / 文案池规则化、比例段规则表、事故规则表、金标样本 / 回归样本地基。在这些结构稳定前，不要开始大规模调味觉数值。

【不要删】if 治理原则：不是彻底消灭 if，而是把 if 从“到处乱接线”升级成“总电闸 + 规则表驱动”。少量中枢 if 负责调度、规则触发、优先级和安全阈值；具体味觉内容尽量放入规则表、属性表、文案池和测试样本。

---

## 7. 味觉判断原则

【不要删】隐藏配方不应是免死金牌。

味觉判断分三步：

1. 身份识别：是否命中隐藏饮品 / 系列 / 图鉴
2. 味觉审判：按优先级判断

```text
极端比例事故 > 稠度/质地事故 > 冲突组合 > 正常好组合 > 普通分类
```

3. 合成展示结果

命中隐藏配方且比例正常：显示隐藏饮品名并给正常或较好评价。

命中隐藏配方但比例离谱：仍应低分，并吐槽为翻车版本。

灾难隐藏款：可以低分，但仍解锁图鉴。

核心原则：

> 发现配方有奖励，优化比例有深度，翻车版本也有笑点。

---

## 8. 重要味觉方向

【不要删】好组合示例：

- 气泡水 + 柠檬
- 绿茶 + 柠檬
- 红茶 + 牛奶
- 乌龙茶 + 厚乳
- 咖啡 + 牛奶
- 草莓 + 淡奶油
- 芒果 + 椰奶

【不要删】怪 / 冲突组合示例：

- 气泡水 + 淡奶油
- 气泡水 + 厚乳
- 榴莲 + 咖啡
- 柠檬 + 牛奶
- 芋泥 + 气泡水
- 三种以上茶类混合

【不要删】高奶感本身不默认好喝。厚乳、淡奶油、奶盖、植脂奶等乳脂类过高，应触发奶脂过载、油腻、负担反馈。

【不要删】榴莲同时影响香气冲击、厚重、黏腻和一定吸管阻力，不应只算香气。

【不要删】多水果茶 / 花果茶要有泛化识别：轻茶 / 花茶 / 绿茶 + 2–3 种协调水果 + 蜂蜜 / 糖 / 水 / 气泡水等平衡材料，应给中高分和合理类型。4 种以上水果或风味冲突再考虑扣分。

【可删】当前已知待优化案例：咖啡 + 纯水在合理比例下应识别为美式 / 咖啡饮，而不是实验特调。这个问题放到后续味觉优化版本修，不在 v0.0.4.x 修。

---

## 9. 温度、冰量、糖度

【不要删】v0.0.5.0 味觉优化时，应把温度、冰量、糖度 / 甜味来源作为味觉系统底层参数，而不是后期 UI 装饰。

至少预留字段：

- temperature：冰 / 常温 / 温 / 热
- iceLevel：多冰 / 正常冰 / 少冰 / 微冰 / 去冰
- sugarLevel：全糖 / 七分糖 / 半糖 / 三分糖 / 无糖 / 不额外加糖
- sweetenerType：白糖 / 果糖 / 蜂蜜 / 黑糖 / 代糖 / 无

这些参数影响：甜腻感、酸苦平衡、茶涩、清爽度、稀释、香气释放、厚重感、热反应事故、适合客群、季节 / 天气销量。

【不要删】注意区分“无糖”和“不额外加糖”。后者不代表最终不甜，因为水果、小料、奶盖、黑糖等本身可能带甜。

【不要删】温度应触发事故，例如：

- 鸡蛋 + 热水：凝固
- 气泡水 + 热饮：气泡失效
- 奶盖 + 热饮：融化
- 柠檬 + 热牛奶：更容易事故

---

## 10. 试喝反馈风格

【不要删】试喝反馈是项目灵魂。

反馈必须“毒舌但可爱”，让玩家觉得系统真的读懂了配方，而不是 AI 客服或普通评分器。

风格参考：

- 榴莲味很有主见，已经把其他材料全部开除了
- 气泡和奶油在杯子里打架，试喝员正在思考人生
- 这杯不是饮料，是需要装修队施工的半固体
- 吸管刚插进去就提交了辞职信
- 我本来想骂，结果喝完沉默了，居然有点合理

极端事故反馈可以更直接、更羞辱、更戏剧化。客观解释更适合组合不搭 / 冲突 / 不和谐时。

【不要删】正式版默认不应把所有精确数值直接展示给玩家，避免玩家只盯数值玩成配表格。

核心原则：

> 默认展示味觉体验，不默认展示后台数值。

---

## 11. 隐藏配方 / 图鉴

【不要删】隐藏配方 / 图鉴是长期重要机制。

玩家自由调配时，如果命中特定原料组合，就解锁特殊命名饮品和图鉴条目。

识别分两步：

1. 组合解锁身份
2. 比例决定评分和评价

不要求比例完全一致才解锁。

隐藏配方类型不应全是整活 / 灾难款，要有完整菜单生态：经典稳定款、浪漫 / 拍照款、清爽水果茶款、健康自律款、打工续命款、灾难收藏款。

整活负责记忆点和截图传播，但正常好喝款要作为基准。

---

## 12. 后续经营阶段

【不要删】后续经营阶段核心循环：

1. 夜晚研发 1–3 款饮品
2. 试喝、命名、定价、保存 / 上架
3. 白天营业时顾客按群体出现
4. 根据饮品属性决定购买概率、评价、等待 / 跑单
5. 日结显示收入、成本、跑单人数、口碑变化、顾客反馈、员工疲劳和可购买升级

玩家不是亲手服务每个顾客，而是看自己研发的饮品进入市场后的反应。

【不要删】未来试喝员也可拆成多个代表不同客群的角色。同一杯饮品可获得不同试喝员评分和评价，体现：

> 饮品不是绝对好坏，而是看卖给谁。

---

## 13. 顾客群体偏好

【不要删】顾客群体偏好：

- 学生：便宜、甜、小料多、新奇
- 白领：清爽、低糖、咖啡因、出杯快
- 老人：温热、低糖、传统、不要太怪
- 情侣：颜值高、适合拍照、名字浪漫
- 健身党：低糖、低厚重、清爽、少奶油
- 猎奇党：愿意尝试怪组合
- 网红打卡党：拍照价值和话题性

【不要删】未来成本系统和定价系统要接入经营循环。植脂奶等便宜原料可降低成本、提高利润空间，但增加廉价感、工业感、健康疑虑。

---

## 14. 竞品 / 灵感：《疯狂摇摇杯》

【不要删】《疯狂摇摇杯》应被视为非常强的祖师爷级竞品，不是简单怀旧小游戏。

它在 2000 年左右已经将自由配方、隐藏菜单、冷热 / 季节倾向、店铺经营、员工 / 招待压力、道具 / 拉客、现实手摇饮文化、攻略型配方探索结合得很完整。

【不要删】后续《奶茶实验室》不能低估它，也不能靠“也有经营 / 客群 / 升级”自我安慰。必须在原创方向上做出差异：

- 更深的味觉理解
- 比例、质地、香气、冲突、厚重、清爽、吸管阻力判断
- 更有灵魂的试喝反馈
- 同一饮品对不同客群的差异评价
- 研发与营业验证互相反哺
- 隐藏配方“识别身份但不免死”的比例优化机制
- 更符合 2026 年新茶饮 / 咖啡文化的内容生态

每个相似系统都要问：

> 我们是否只是复刻《疯狂摇摇杯》的功能，还是用现代味觉系统、客群反馈和内容风格做出了新东西？

【不要删】《疯狂摇摇杯》机制考古的详细结论已沉淀到 docs/TASTE_SYSTEM_DESIGN.md；后续 v0.0.5.x 任务应优先让 Codex 读取该文件，或在新 ChatGPT 对话中由用户上传该文件，再参考其中关于“固定槽位、比例调配、味觉向量、饮品家族 / 配方版本、研发库与上架菜单分离”的设计启发。AI_CONTEXT 只保留索引，不复制详细考古过程。

---

## 15. 工程 / 项目管理原则

【不要删】用户不是程序员，希望 ChatGPT 在 vibe coding 工作流中充当“制作人搭子 / 需求翻译器”，不是默认把用户当程序员。

给 Codex 的指令必须：猴子也能看懂并执行、可直接复制、包含版本号、阶段名、目标、本轮不做事项、范围边界、执行步骤、自检清单、回滚 / 备份要求。

【不要删】随着项目变大，每轮 Codex 任务应明确允许读取 / 修改的文件范围。优先读取本轮相关 docs 和 2–5 个核心文件，不要默认全仓库考古；稳定模块除非本轮明确需要，不要反复读取和修改。大任务应先输出计划，再执行。

用户负责：复制提示词、运行、试玩、截图 / 描述反馈。

ChatGPT 负责：拆需求、写 Codex 提示词、审方向、控制范围、总结反馈、决定下一步、做代码架构审查翻译。

【不要删】每个稳定版本之后应安排“项目复查 / 整理”，检查文件大小、代码结构、重复逻辑、数据 / 逻辑 / UI 是否混在一起、是否能安全模块化，避免长期项目变成巨大单文件和难维护技术债。

【不要删】验收失败必须如实报告。若浏览器点击、console、自动化或回归样本出现异常，Codex 必须明确说“未通过 / 不可靠 / 需人工确认”，不能把失败包装成通过。

【不要删】测试分级规则已写入 `docs/TASTE_ENGINE_ARCHITECTURE.md`。不是每次 candidate 前都必须做真实 UI smoke test；只改 docs / 纯数据时可用文件级和 Node runtime 检查，新增运行时脚本或修改脚本加载时至少做无头 Chrome 页面加载检查，修改 tasteContext / tasteJudge / UI 交互 / 保存配方等核心链路时应做无头 Chrome + 轻量真实 UI smoke test。未做真实浏览器或真实 UI 操作时，报告必须如实说明。

【不要删】`docs/AI_CONTEXT.md` 是新 ChatGPT / Codex 对话恢复项目上下文的核心入口。每次 candidate 冻结、重要路线调整、关键工程规则变更或下一步计划变化后，都必须检查 AI_CONTEXT 是否需要同步。不能只更新 `VERSION_LOG` / `TASTE_SYSTEM_DESIGN` / `TEST_CASES` 而忘记 AI_CONTEXT。AI_CONTEXT 只写接续所需摘要和长期规则，不写详细版本流水账。

【不要删】每次 candidate 冻结、main 上追加 docs 补充 commit、golden samples 数量变化、下一步计划变化或关键架构原则变化后，必须检查并同步本文件的“当前状态快照”。不能只在 VERSION_LOG 记录版本，也不能只在正文追加进度，避免新对话读到旧 candidate / 旧 golden 数量后误判项目状态。

【不要删】项目根目录新增 `AGENTS.md` 作为 Codex / AI agent 的长期工作守则。新 Codex 对话进入仓库后应先阅读 `AGENTS.md` 与 `docs/AI_CONTEXT.md`，再根据任务读取架构、系统设计和版本记录文档。单次任务提示词不是 AGENTS.md，不应被长期化，除非任务明确要求。

【不要删】三层属性 / profile / summary 应坚持数据化：代码负责调度、区间、优先级和兜底；数据负责 profile、summary、group、关系矩阵、阈值、severity、feedbackTags；测试负责防回归。taste / texture / flavor 的具体内容不应长期写成原料名或标签组合 if，尤其 flavor 层不能写成新的 if 地狱。详细原则见 `docs/TASTE_ENGINE_ARCHITECTURE.md` 的“三层属性 / summary 的数据化原则”。

---

## 16. 版本号规则

【不要删】版本号使用四段格式：`A.B.C.D`

- A：正式 / 测试阶段。0 = 测试期，1 = 正式发布后
- B：大功能阶段 / 模块
- C：重大优化 / 底层逻辑变更
- D：同一重大优化下的小迭代 / 修补

当前 UI 顶部应显示版本号，便于测试反馈对应。

【不要删】从 v0.0.5.7 起，创建 candidate tag 前必须先确认页面顶部版本号与 candidate 版本一致；若不一致，必须先修正版本号、提交并 push，再重新执行冻结前复查，最后再创建 / 推送 candidate tag。`v0.0.5.6-candidate` 页面仍显示 v0.0.5.5 是已记录小瑕疵，不重打 tag，后续版本不得再重复该问题。

---

## 17. v0.0.4.x 版本边界

【不要删】v0.0.4.x 系列只做工程优化、模块化整理、回归检查和小修，不做玩法 / 味觉 / 内容 / 视觉 / 交互层面的主动变动。

v0.0.4.x 不做：

- 不新增原料
- 不加隐藏配方
- 不加营业系统
- 不改评分
- 不改文案
- 不改 UI 视觉
- 不改比例条交互

【可删】v0.0.4.0 已冻结并推送 GitHub tag `v0.0.4.0-candidate`。

【可删】v0.0.4.1 已冻结并推送 GitHub tag `v0.0.4.1-candidate`。

【可删】v0.0.4.2 继续只做工程 / 文档 / 规则地基，补齐 docs、项目守则、反 if 地狱规则、回归测试说明，并处理目录整理。

---

## 18. 长期开发路线图

【不要删】当前长期开发节奏：

- v0.0.4.x：工程地基、模块化、文档、回滚、规则
- v0.0.5.x：现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基，解决“系统里的东西是谁”
- v0.0.6.x：三层属性 / profile / summary 地基，解决“这些东西如何被三层属性系统理解并汇总”
- v0.0.7.x：severity / 数值调优 / golden samples 扩容，解决“判断得好不好、数值顺不顺”
- v0.1.x：让配方实验室真正好玩，能让玩家持续玩约 10 分钟
- v0.2.x：隐藏配方 / 图鉴
- v0.3.x：试喝员 / 客群差异反馈
- v0.4.x：白天营业验证
- v0.5.x：成本、定价、销量、口碑
- v0.6.x：员工、设备、升级
- v0.7.x：店铺 / 装修 / 杯子设计雏形
- v0.8.x：内容扩充和平衡
- v0.9.x：发布前打磨、存档、教程、UI、音效
- v1.0.0.0：第一个正式完整版本

【不要删】v0.0.5.0 第一刀定位为“味觉系统数据化地基”。它是 v0.0.4.x 工程地基的后续，目标不是大规模味觉优化或玩法更新，而是开始控制 `tasteJudge.js` 的 if 膨胀风险，逐步把硬编码规则迁移到数据规则表和专门 analyzer 模块，为后续真正味觉优化铺路。v0.0.5.0 应优先保持现有输出稳定；必要变化必须明确列出并用回归样本验证。

【不要删】味觉系统约 3 个月做到“能看”，完整 1.0.0.0 可能需要 12–18 个月。

【不要删】每个阶段都要有独立成功标准，不要因为还没到 1.0 就否定中间版本。

---

## 19. 当前进度摘要

【可删】v0.0.4.x 已完成工程地基阶段：模块化地基、UI 渲染/事件拆分、`docs/AI_CONTEXT.md` 本地记忆、scoreEngine/feedbackEngine 拆分、自动化验收规则收口。详细 commit、tag、版本流水账以 `docs/VERSION_LOG.md` 和 GitHub tag 为准。

【可删】v0.0.5.0 已开始味觉系统数据化地基：新增原料味觉属性库、组合关系表和多个 analyzer，让 `tasteJudge.js` 更像总调度。本轮仍以保持现有输出稳定为优先，不做玩法扩张。

【可删】v0.0.5.1 进入饮品类型识别数据化：新增 `data/drinkTypeRules.js`，`drinkTypeAnalyzer.js` 开始作为规则执行器；水果茶泛化与 audience 识别暂时保留，后续可继续治理。

【可删】v0.0.5.2 进入反馈系统标签化：`feedbackEngine.js` 开始按反馈标签从文案池选择试喝反馈，并补强味觉、反馈、顾客、经营、UI、存档等系统边界文档。

【可删】v0.0.5.3 已完成饮品结构分析地基：新增 `drinkStructureAnalyzer`，生成 `context.structure`，为 `solidLoad`、`drinkability`、`strawResistance` 等结构指标打地基，但不进入最终 result，不改玩家可见输出。

【可删】v0.0.5.4 已完成结构事故规则表地基：新增 `data/structureAccidentRules.js` 与 `core/structureAccidentRuleEngine.js`，让结构事故以规则表方式参与口感事故判断，并记录反巨大逻辑树警戒。

【可删】v0.0.5.5 已完成比例段规则表地基：新增 `data/proportionSegmentRules.js` 与 `core/proportionSegmentRuleEngine.js`，先迁移柠檬 / 榴莲比例段，控制 `proportionAnalyzer.js` 的 if 膨胀风险。

【可删】v0.0.5.6 已完成金标样本 / 回归样本地基：新增 `data/goldenSamples.js` 与 `scripts/runGoldenSamples.js`，当前 11 个样本通过。后续修改高风险味觉模块前，应先运行 `node scripts/runGoldenSamples.js`。

【可删】v0.0.5.7 已完成旧事故规则小范围表格化：新增 `data/accidentRules.js` 与 `core/accidentRuleEngine.js`，柠檬 / 榴莲极端事故已从 `core/accidentAnalyzer.js` 迁入规则表，golden samples 11/11 通过。后续可考虑奥利奥 / 强风味等单原料事故，但迁移前应补对应 golden samples。

【可删】v0.0.5.8 新增事故迁移前置 golden samples，保护高柠檬酸度事故、高榴莲猎奇事故和奥利奥碎过量口感事故。暂不加入强风味过量样本，避免锁死未来浓郁饮品路线；当前 type 断言不代表最终玩家可见命名锁死，未来可拆分内部 tags 与前台文案。

【可删】v0.0.5.9 建立原料物理属性 textureProfile 地基：味觉系统以后不只判断味道，也判断材质。本轮不改玩家可见结果，golden samples 14/14 通过。

【可删】v0.0.5.10 开始落地 stable ingredientId 地基：当前原料基础数据补充 id / aliases，但运行逻辑仍保持中文 name 兼容；后续再小步迁移 lookup、context、profile、rules、golden samples 和存档。

【可删】v0.0.5.11 新增 ingredientRegistry 查询 helper，可通过 stable id / name / aliases 查询原料 meta，并提供 validateIngredientRegistry；运行逻辑仍保持中文 name 兼容，后续再小步迁移 context、profile、rules、golden samples 和存档。

【可删】v0.0.5.12 开始让 tasteContext 支持 name / ingredientId 双轨：旧中文 name 查询保持兼容，同时新增按 ingredientId / alias / ref 查询比例的 helper；运行逻辑、profile、rules、golden samples 和保存结构仍未切换到 id。

【可删】v0.0.5.13 增强 profile 查询入口：getTasteProfile / getCalculationProfile / getTextureProfile 支持 stable ingredientId、中文 name、alias 和对象 ref；profile 数据表仍保持中文 key，运行逻辑和玩家可见输出不变。

【可删】v0.0.5.14 新增 ruleRefHelper，并让 accidentRuleEngine 兼容旧中文 ingredient 与新 ingredientId / ingredientRef / alias / object ref；本轮不批量迁移规则表，不改事故结果、golden samples 或保存结构。

【可删】v0.0.5.15 增强 golden samples 安全网：runner 支持 { ingredientId, ratio } 输入，并新增少量 ID 等价性样本；旧 name 样本保持兼容，不批量迁移，不改评分/事故/反馈/规则/保存结构。

【可删】v0.0.5.16 让 proportionSegmentRuleEngine 接入 ruleRefHelper，兼容旧中文 ingredient/names 与新 ingredientId/ingredientRef/refs/ingredientIds；不批量迁移规则表，不改阈值、评分、反馈、golden samples 或保存结构。

【可删】v0.0.5.17 让 combinationAnalyzer 支持旧 names 与新 refs / ingredientRefs / ingredientIds，通过 ruleRefHelper 查询 ingredientId / name / alias / object ref；不迁移 data/combinationRules.js，不处理 synergyRules，不改评分、反馈文案、类型判断、golden samples 或保存结构。

【可删】v0.0.5.18 新增 ingredientGroupHelper，作为共享原料组的统一查询入口；synergyRules 旧中文 group 数组保留，accidentAnalyzer / proportionAnalyzer / drinkTypeAnalyzer 的共享 group totals 改走 helper。本轮不改阈值、评分、事故结果、反馈文案、类型判断、golden samples 或保存结构。

【可删】v0.0.5.19 让 drinkType rules 执行入口支持 ingredientId / ingredientRef / ref / refs / anyRefs / allRefs 等字段，旧 ingredient / anyIngredient / allIngredients 继续兼容；不批量迁移 data/drinkTypeRules.js，不改 analyzeFruitTeaBlend、audience、保存结构、golden samples、评分、反馈文案或类型命名。

【不要删】三层 profile 的设计由来与事故 severity 数值化原则已写入 `docs/TASTE_ENGINE_ARCHITECTURE.md`。新对话 / Codex 继续 v0.0.5.x 时，必须理解三层架构来自奥利奥/小料 texture 问题、柠檬 acid overload 泛化、橙子 vs 西红柿 flavor identity 问题；事故优先级不等于严重度，严重度长期应数据化为可调 severityLevel / scoreMultiplier，不能把粗吸管需求等轻微服务冲突自动判成重事故。

【不要删】三层属性 / summary 的数据化原则已写入 `docs/TASTE_ENGINE_ARCHITECTURE.md`。三层结构不是三层 if；代码负责“怎么判”，数据负责“判什么”，测试负责“别判歪”。后续新增 `ingredientGroupHelper`、三层 summary、flavor relation matrix、severityConfig、feedbackTags 或 golden samples 扩展时，都应遵守这条原则。

【不要删】《奶茶实验室》原料数据化长期应拆成三层 profile：tasteProfile（基础味觉）、textureProfile（物理质地）、flavorProfile（风味身份 / 香气身份）。tasteProfile 解决酸甜苦奶涩等基础味觉；textureProfile 解决吸管阻力、糊化、沉积、胶质、粉感、奶脂负担等物理结构；flavorProfile 解决橙子和西红柿这类酸甜度接近但风味身份完全不同的问题。后续事故、组合、客群和反馈判断应尽量来自 summary + 规则表，而不是 UI 分类或单个原料 if。

【不要删】《奶茶实验室》原料数据模型后续应逐步引入稳定 ingredientId。系统规则、tasteProfile、textureProfile、flavorProfile、组合规则、事故规则、golden samples 和未来存档，应尽量引用 ingredientId，而不是玩家可见 name。name 负责显示，aliases 负责旧名 / 别名 / 搜索兼容。推荐使用可读字符串 ID，例如 fruit_lemon、topping_oreo_crumble，不建议长期依赖纯数字或中文显示名作为主键。正式迁移前应先做只读评估，避免一次性重写全项目。

【不要删】玩家可见显示文案不应长期作为系统主键。现有系统中已参与判断、测试、保存或展示的显示文本，应逐步补 stable ID；未来新增系统应从第一天使用 stable ID + displayName / text。中文只是当前最常见的显示文案例子，英文、日文或任何未来可能改名 / 本地化的 label 也一样不应当主键；文案负责显示、反馈、UI 和本地化，不负责长期规则身份。不要把这条原则扩张成“现在立刻为未来不存在系统造空架子”。

【不要删】golden samples 是当前阶段的回归安全网，不是最终味觉真理。重构期尽量保持 expected 稳定以防无意识漂移；调参期、三层 summary 接入或 severity 系统调整时，可以有意识更新 expected。ID 等价样本的重点是保证 name 输入与 ingredientId 输入结果一致，而不是永久锁死某个分数。

【可删】当前已冻结 candidate：`v0.0.5.3-candidate`、`v0.0.5.4-candidate`、`v0.0.5.5-candidate`、`v0.0.5.6-candidate`、`v0.0.5.7-candidate`、`v0.0.5.8-candidate`、`v0.0.5.9-candidate`、`v0.0.5.10-candidate`、`v0.0.5.11-candidate`、`v0.0.5.12-candidate`、`v0.0.5.13-candidate`、`v0.0.5.14-candidate`、`v0.0.5.15-candidate`、`v0.0.5.16-candidate`、`v0.0.5.17-candidate`、`v0.0.5.18-candidate`、`v0.0.5.19-candidate`、`v0.0.5.20-candidate`、`v0.0.5.21-candidate`、`v0.0.5.22-candidate`、`v0.0.5.23-candidate`、`v0.0.5.24-candidate`、`v0.0.5.25-candidate`、`v0.0.5.26-candidate`、`v0.0.5.27-candidate`、`v0.0.5.28-candidate`、`v0.0.5.29-candidate`、`v0.0.5.30-candidate`、`v0.0.5.31-candidate`、`v0.0.5.32-candidate`、`v0.0.5.33-candidate`、`v0.0.5.34-candidate`、`v0.0.5.35-candidate`、`v0.0.5.36-candidate`、`v0.0.5.37-candidate`、`v0.0.5.38-candidate`、`v0.0.5.39-candidate`、`v0.0.5.40-candidate`。`v0.0.5.6-candidate` 页面显示仍为 v0.0.5.5，是已记录小瑕疵，不重打 tag；从 v0.0.5.7 起，candidate 前必须先同步页面版本号。

【可删】v0.0.5.34-candidate 已冻结并推送，指向 `98bac8c3b22c2b54f5e66748b536de3e000a037f`。v0.0.5.34 已完成 feedbackEngine 去 notes.includes 小修；feedbackEngine 主路径优先使用 `tags` / `feedbackTags`，中文 `notes.includes` 仅保留 legacy fallback，`tasteJudge` 已汇总并传递 `feedbackTags`，result 已暴露 `feedbackTags`。正式 tag `v0.0.5.34` 未创建，当前未推进 `v0.0.5.35`；工作区应为干净状态，golden samples 应为 20/20 passed。

【不要删】v0.0.5.x / v0.0.6.x / v0.0.7.x 阶段边界已重新定义：v0.0.5.x 解决“系统里的东西是谁”，即现有核心系统 ID 化 / 去显示文案主键 / 平台无关数据地基；v0.0.6.x 解决“这些东西如何被三层属性系统理解并汇总”，即三层属性 / profile / summary 地基；v0.0.7.x 解决“判断得好不好、数值顺不顺”，即 severity / 数值调优 / golden samples 扩容。

【不要删】v0.0.5.x 后续不默认推进完整三层 summary。v0.0.5.30 已完成 `proportionSegmentRules` refs 小批迁移，`v0.0.5.30-candidate` 已冻结并推送；v0.0.5.31 已完成 `combinationRules` refs 小批迁移，`v0.0.5.31-candidate` 已冻结并推送；v0.0.5.32 已完成 `drinkTypeRules` refs 小批迁移，`v0.0.5.32-candidate` 已冻结并推送；v0.0.5.33 已完成 texture accident 去显示文案判断小修，`v0.0.5.33-candidate` 已冻结并推送；v0.0.5.34 已完成 feedbackEngine 去 notes.includes 小修，`v0.0.5.34-candidate` 已冻结并推送；v0.0.5.35 已完成保存 result / 历史快照边界小修，`v0.0.5.35-candidate` 已冻结并推送；v0.0.5.36 已完成 `outcomeTypeId` 兜底地基，`v0.0.5.36-candidate` 已冻结并推送；v0.0.5.37 已完成 analyzer 本地显示名查询小修，`v0.0.5.37-candidate` 已冻结并推送；v0.0.5.38 已完成 golden runner feedbackTag 断言，`v0.0.5.38-candidate` 已冻结并推送；v0.0.5.39 已完成柠檬牛奶冲突 special case 和 `inferAudience` 植脂奶 / 榴莲判断的 ID/ref 主路径小修，`v0.0.5.39-candidate` 已冻结并推送。本轮仍不默认推进完整三层 summary，下一步可考虑 v0.0.5.x final 收口判断 / 阶段收尾。允许少量 legacy 逻辑暂存，但不能继续扩张；新增结构应优先 stable ID + displayName / text，但不要为未来尚不存在的系统提前造空架子。

【不要删】详细的三层 profile、stable ingredientId、三层 summary、事故优先级重排、质地事故细分、粗吸管需求、legacy 迁移原则和 v0.0.5.x / v0.0.6.x / v0.0.7.x 阶段边界，已写入 `docs/TASTE_ENGINE_ARCHITECTURE.md`。新对话或 Codex 继续 v0.0.5.x 前，应先读取该文档；不要继续机械迁移单个旧事故规则。

【不要删】三层 profile 确立后，长期事故优先级应逐步升级为：硬性物理 / 服务参数事故 > 质地与可饮用性事故 > 基础味觉过载事故 > 风味身份冲突 > 普通冲突组合 > 好组合 / 协同 > 普通类型识别。质地事故下可继续细分吸管阻力、粗吸管需求冲突、糊化、沉积、胶质、太硬、太粘、奶脂负担等小类。大类决定优先级，小类决定具体反馈和规则。

---

## 20. 长期内容 / 工程管理方向

【不要删】未来项目内容量变大后，原料、顾客种类、隐藏配方、反馈文案、员工、设备、事件等内容应逐步转向表格化 / 数据化管理。

当前 `data/*.js` 适合早期迭代，但长期更理想的工作流是：

1. 用户用 Excel / Google Sheets 管理内容与数值
2. 导出 CSV / JSON
3. 游戏读取这些数据

不建议正式运行时直接读取 `.xlsx`。

【不要删】装修系统、杯子设计系统属于未来经营 / 品牌系统愿景，不进入 v0.0.5.0 功能范围，但可长期记录。

---

## 21. 给 ChatGPT / Codex 的接续说明

【不要删】如果用户在新对话中上传或粘贴此文件，请先阅读本文件，再根据用户当前问题继续推进。

【不要删】如果用户说继续《奶茶实验室》，应先确认当前目标是否进入 v0.0.5.0“味觉系统数据化地基”设计，而不是继续记录 v0.0.4.x 版本流水账；生成 Codex 指令前，应明确本轮是只做设计、只读评估，还是正式改代码。

不要重新发散项目方向。

优先遵守：

1. 当前版本边界
2. 本轮不做事项
3. 长期路线图
4. 味觉系统核心资产原则
5. 反 if 地狱工程原则
6. 《疯狂摇摇杯》祖师爷级竞品定位

如果用户要求生成 Codex 指令，请使用用户偏好的“猴子也能看懂并执行”的完整任务单格式。
