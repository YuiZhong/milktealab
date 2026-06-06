# Human Review Reports｜人类审批 / 制作人评审材料

本目录用于集中放置需要用户 / 制作人审批的评审材料。

可放置的材料包括：

- review pack
- candidate 文案审核包
- concept candidates 审核包
- generated shadow review
- 需要用户 keep / revise / reject / pending 的材料

本目录不是 source-of-truth，不是 runtime data，也不是 active stage TODO。

本目录内容不能自动修改 golden expected，不能自动接管 final feedback / final result。

机器详情可以存在，但必须服务于人类审核，不反向成为机制正本。

## 模板与样例

- `conceptReview.template.md` 用于自然语言 scenario / concept candidates 审核；它审的是“场景 / 机制概念”。
- `textureConceptReview.round1.md` 记录第一轮质地 / 可饮用性 concept candidates 的制作人审核结果；它不是 approved concept list。
- `approvedConceptList.texture.round1.draft.md` 整理第一轮 texture / drinkability 已通过概念的 approved concept list draft；它不是 stable ID、registry candidate 或 runtime data。
- `feedbackShadowReview.sample.md` 用于 feedback shadow review 样例；它审的是“候选反馈文案”。

这些材料都不是 source-of-truth，也不是 runtime data。

`reports/` 根目录仍保留历史审计 / closure / decision reports；不要把整个 `reports/` 目录迁入本目录。
