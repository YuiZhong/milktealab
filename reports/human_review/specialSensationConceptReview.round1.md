# Special Sensation Concept Review Round 1｜特殊刺激子通道概念审核记录

## 0. 文件定位

本文件记录制作人对第一批 special sensation sub-channel concept candidates 的审核结论。

本文件是 human review record / 制作人审核记录，只保存自然语言审核结果，不批准任何 stable ID。

后续若要形成 approved concept list，必须另开任务，由 ChatGPT / 用户确认后再整理。

Codex 不得从本文件自行生成 stable ID、draft ID、registry row、validator rule、runtime data、generated data 或 final feedback。

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

- `C001` - `C006` 是临时审核编号，不是 stable ID、draft ID 或 registry candidate。
- “通过”不等于 stable。
- “保留”指保留自然语言概念，不是保留 ID。
- 本轮不处理具体数值、阈值、severity、scoreMultiplier。
- 本轮不形成 approved concept list。
- 本轮不生成任何 ID、registry candidate、validator rule 或 runtime data。
- 本轮不实现顾客偏好系统，不创建 customerTag / audienceId。

## 2. 制作人原始审核摘要

### C001｜辣感 / 灼辣感过强

- producerStatus: keep
- producerDecision: 通过，很合适。
- archiveSuggestion: 特殊刺激子通道候选。
- producerNotes:
  - 姜汁奶茶等现实饮品存在这类刺激。
  - 烈酒也可能有类似灼辣刺激感。
  - 后续不能写成 `if 辣椒` / `if 姜`。

### C002｜麻感 / 震麻感过强

- producerStatus: keep / lowerPriority
- producerDecision: 通过。制作人暂时没想到特别明确的食材，但认为先保留这个自然语言概念是好的。
- archiveSuggestion: 特殊刺激子通道候选 / future review。
- producerNotes:
  - 麻感和辣感、酒精灼烧、涩感不同。
  - 未来若有相关原料或玩法，再单独推进。

### C003｜酒精灼烧 / 挥发刺激过强

- producerStatus: keep
- producerDecision: 通过。以后酒味肯定需要。
- archiveSuggestion: 重要特殊刺激子通道候选。
- producerNotes:
  - 酒味身份和酒精灼烧 / 挥发刺激要分开。
  - 后续不能写成 `if 酒`。

### C004｜清凉刺激过强

- producerStatus: keep
- producerDecision: 通过。
- archiveSuggestion: 重要特殊刺激子通道候选。
- producerNotes:
  - 以后可以往饮品里放薄荷，制作人认为这是重要点。
  - 苏式绿豆汤带薄荷是现实例子。
  - 薄荷 / 清凉太多时可表现为牙膏水、风油精、漱口水。

### C005｜辛香刺激过强

- producerStatus: keep / futureCandidate
- producerDecision: 通过，虽然暂时可能用不到。
- archiveSuggestion: 特殊刺激 / 辛香风味交叉候选。
- producerNotes:
  - 制作人想到热红酒。
  - 八角、肉桂等香料味确实难描述。
  - 后续要注意它可能同时涉及 flavor identity 和 stimulation。

### C006｜特殊刺激主题饮

- producerStatus: keep / highLevel / overlap / laterReview
- producerDecision: 暂时通过，但制作人认为很难有完全符合这类的案例；该概念和其他几个刺激子通道有很深重叠。
- archiveSuggestion: 高阶 product identity / special theme candidate，不作为低风险机制候选。
- producerNotes:
  - 制作人唯一想到的例子是榴莲。
  - 榴莲可能更偏强风味身份 / 特殊主题 / 产品定位，不一定属于特殊刺激。
  - 后续不应急着结构化或接 runtime。

## 3. 本轮初步分桶

| bucket | candidates | boundary |
|---|---|---|
| keep / special sensation sub-channel candidate | C001 辣感 / 灼辣感过强 | 保留自然语言概念，不生成 ID |
| keep / special sensation sub-channel candidate | C003 酒精灼烧 / 挥发刺激过强 | 保留自然语言概念，不生成 ID |
| keep / special sensation sub-channel candidate | C004 清凉刺激过强 | 保留自然语言概念，不生成 ID |
| keep / future or lower-priority sensation candidate | C002 麻感 / 震麻感过强 | 后续若有原料或玩法，再单独 review |
| keep / future or lower-priority sensation candidate | C005 辛香刺激过强 | 可能同时涉及 stimulation 和 flavor identity |
| keep / high-level / overlap / later review | C006 特殊刺激主题饮 | 不作为低风险机制候选，不急着结构化 |

## 4. 后续边界

- 本文件不是 approved concept list。
- 下一步若继续，应先由 ChatGPT / 用户把 keep 项整理成 approved concept list 草案。
- Codex 不能直接根据本文件生成 stable ID。
- Codex 不能直接把 keep 项写入 registry / validator / runtime。
- C006 是 high-level / product identity / overlap 项，不应急着结构化。
- C005 可能同时涉及 stimulation 和 flavor identity，后续要小心归层。
- 顾客偏好 / tolerance 应接到具体 sensation channel，而不是统一 strongStimulation。
- 本轮不实现顾客系统，不创建 customerTag / audienceId。
- 本文件不能自动修改 final feedback / final result / golden expected。
- 如果未来需要 draft ID / registry candidate / validator / rule table，必须另开任务，并继续遵守 Scenario first, ID later。
