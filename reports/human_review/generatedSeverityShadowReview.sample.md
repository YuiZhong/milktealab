# Generated Severity Shadow Review Pack Sample｜生成 severity shadow 人类速读包

> 本文件基于 debug-only / read-only shadow output 自动生成，供制作人 / ChatGPT 快速阅读。
> 它不是 runtime data，不是 generated severity，不改 final score / feedback / result.type / accident，不改 golden expected。
> 它不代表 proposedDraftId / triggerMetricDirection 已正式批准；当前 shadow 主要观察 metric availability，不是正式事故触发。

## 0. 速读结论

- 读取 legacySnapshots：5 个。
- 读取 shadowCandidates：18 条。
- metric_observed_positive：3 条，只表示现有 summary 看到了同名指标且值 > 0。
- unavailable_metric：15 条，表示当前没有同名 runtime summary metric，系统没有发明映射。
- unsafe final flags：未发现。
- 本轮可以用于制作人粗看 shadow 覆盖情况。
- 仍不能用于 runtime / generated severity / partial takeover / active takeover。

## 1. 样本总览｜Legacy snapshots

| sampleId | 样本标题 | 旧系统分数 | 旧系统类型 | 旧系统事故 | drinkTypeId | feedbackTags | 一句话摘要 |
|---|---|---:|---|---|---|---|---|
| classic_milk_tea | 经典奶茶 | 74 | 经典奶茶 | none | classic_milk_tea | classic | 红茶和牛奶配合得很稳，是不会出错的经典款。 |
| classic_milk_tea_id_equivalence | 经典奶茶 ID 等价样本 | 74 | 经典奶茶 | none | classic_milk_tea | classic | 红茶和牛奶配合得很稳，是不会出错的经典款。 |
| fresh_bubble_fruit_tea | 清爽水果茶 | 100 | 清爽水果茶 | none | fresh_fruit_tea | fresh | 气泡和柠檬很会营业，清爽得像刚从冰箱里升职。 清爽度在线，像刚吹过空调的下午。 |
| fresh_bubble_fruit_tea_id_equivalence | 清爽水果茶 ID 等价样本 | 100 | 清爽水果茶 | none | fresh_fruit_tea | fresh | 气泡和柠檬很会营业，清爽得像刚从冰箱里升职。 清爽度在线，像刚吹过空调的下午。 |
| premium_oolong_milk | 高级厚乳款 | 78 | 高级厚乳款 | none | premium_thick_milk_tea | premium | 乌龙和厚乳配得很稳，奶盖把层次托起来了。 |

## 2. Shadow candidate 总览

| proposedDraftId | displayNameDraft | sourceLayer | triggerMetricDirection | severity rows 数量 | matchState 汇总 | 制作人备注 |
|---|---|---|---|---:|---|---|
| taste_sweet_overload | 甜度过载 | taste | sweetnessLoad | 3 | unavailable_metric=3 | 还没有同名 runtime metric；系统没有发明映射。 |
| taste_acid_overload | 酸度过载 | taste | acidityLoad | 3 | unavailable_metric=3 | 还没有同名 runtime metric；系统没有发明映射。 |
| taste_bitter_overload | 苦味过载 | taste | bitternessLoad | 3 | unavailable_metric=3 | 还没有同名 runtime metric；系统没有发明映射。 |
| taste_astringency_overload | 涩感 / 收敛感过强 | taste / special sensation boundary | astringencyLoad | 3 | unavailable_metric=3 | 还没有同名 runtime metric；系统没有发明映射。 |
| texture_low_drinkability | 水泥感 / 粉泥感 / 低流动性 | texture / drinkability | lowFlowPenalty | 3 | unavailable_metric=3 | 还没有同名 runtime metric；系统没有发明映射。 |
| texture_solid_overload | 八宝粥感 / 固体小料负载过高 | texture / drink structure | solidLoad | 3 | metric_observed_positive=3 | 只是观察到同名指标，不代表事故触发或正式 severity。 |

## 3. 指标可见性摘要｜Metric availability

- `metric_observed_positive`：现有 summary 里看到了同名指标且值 > 0。它只是观察到指标，不是事故触发、不是 severity 命中、不是扣分。
- `unavailable_metric`：目前没有同名 runtime summary metric；系统没有发明映射。
- 可观察到的 direction：solidLoad。
- 暂不可观察到的 direction：sweetnessLoad / acidityLoad / bitternessLoad / astringencyLoad / lowFlowPenalty。
- 原因：现有 summary 字段名不同，或尚无 formal triggerMetric registry。

## 4. 需要制作人之后关注的问题

- 未来是否把 `sweetnessLoad` 映射到 `sweetness`，还是另建更精确 metric？
- `acidityLoad` 是否等同 `acidity`，还是需要 `acidPressure` / `acidSharpness` 等？
- `lowFlowPenalty` 是否应映射到 `drinkabilityPenalty` / `drinkability` / `viscosity` / `sedimentRisk` 的组合？
- `solidLoad` 现在能被观察到，但 light / medium / heavy 阈值仍未正式定义。
- 目前不能把 `metric_observed_positive` 当成事故触发。

## 5. 机器详情附录

- source JSON path: `reports/debug/generatedSeverityShadow.multiSample.sample.json`
- schemaVersion: `generatedSeverityShadow.proof.v0.0.8`
- sourceCommit: `ab759f903b61ee8bf9aa62c1a727f32e3c4dc397`
- legacySnapshotCount: 5
- shadowCandidateCount: 18
- matchState counts: unavailable_metric=15, metric_observed_positive=3
- non-final flags summary:
  - readonly: true (expected true)
  - affectsFinalResult: false (expected false)
  - affectsScore: false (expected false)
  - affectsFeedback: false (expected false)
  - affectsResultType: false (expected false)
  - affectsGoldenExpected: false (expected false)
  - runtimeData: false (expected false)
  - generatedSeverityData: false (expected false)
  - partialTakeoverEnabled: false (expected false)
  - activeTakeoverEnabled: false (expected false)

> 本附录只帮助追溯 shadow proof，不是 runtime source，不是 generated severity source。
