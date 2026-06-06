# TriggerMetric Direction Review Record Round 1｜触发指标方向审阅记录

## 0. 文件定位

本文件只记录用户 + ChatGPT 对 `reports/human_review/triggerMetricDirectionReview.round1.md` 的审阅结论。

本文件是 planning direction review checkpoint，不是：

- triggerMetric registry
- schema
- validator input
- allowed values
- generated severity data
- runtime data
- official threshold table
- official scoreMultiplier table
- golden expected source

本文件不批准正式 triggerMetric，不创建 metric registry / schema / validator，不生成 allowed values，不填写正式 numeric values / threshold / `scoreMultiplier`，不影响 runtime / generated severity / final feedback / final result / golden expected。

## 1. Review conclusion

本轮 triggerMetric direction review 已由用户 + ChatGPT 接受为 planning checkpoint。

第一批 6 个机制的 metric direction 可以进入后续 planning：

1. `taste_sweet_overload`
2. `taste_acid_overload`
3. `taste_bitter_overload`
4. `taste_astringency_overload`
5. `texture_low_drinkability`
6. `texture_solid_overload`

但所有 direction 仍只是 planning direction / 非正式方向词，不是正式 triggerMetric，不是 registry value，不是 schema field，不是 validator allowed value。

## 2. Texture boundary accepted

用户 + ChatGPT 已接受 texture / mouthfeel 相关的四类边界。

### 2.1 小颗粒 / 小料固体负载

对应：

- `texture_solid_overload`

核心方向：

- `solidLoad`
- `toppingLoad`
- `chewLoad`
- `liquidSupport`

边界：

- 核心是小料多、固体负载高、需要咀嚼、像八宝粥 / 甜品碗。
- 小料固体负载不一定吸不上来。
- 它不等于水泥感 / 粉泥低流动性。
- 它不等于奶脂油腻。
- 它不等于糖浆胶质黏稠。

### 2.2 粉泥 / 糊状 / 低流动性

对应：

- `texture_low_drinkability`

核心方向：

- `slurryLoad`
- `pasteLoad`
- `powderLoad`
- `lowFlowPenalty`

边界：

- 核心是粉泥、糊状、粉浆感、水泥感、流动性差、吸管吃力。
- 粉泥低流动性才是“水泥感 / 吸管吃力”的主边界。
- 它不等于珍珠 / 芋圆 / 红豆 / 绿豆等小料很多。
- 它不等于奶脂油腻。
- 它不等于糖浆胶质黏稠。

### 2.3 奶脂 / 奶盖 / 奶油油腻负担

对应：

- future texture / mouthfeel deferred concept

核心方向：

- `fatLoad`
- `creamLoad`
- `dairyFatLoad`
- `greasyPressure`
- `mouthCoating`
- possible future direction: `afterSwallowBurden`
- possible future direction: `greasyAftertaste`

边界：

- 这类问题通常不是“吸不动”。
- 饮用流动性通常是顺的，因为奶油 / 奶盖 / 高脂乳本身是流质或半流质。
- 核心体验是入口油腻、奶脂压口、几口后顶住、下咽后反胃或恶心。
- 它不属于 `texture_low_drinkability`。
- 它不属于 `texture_solid_overload`。
- 它不等于糖浆胶质黏稠。

### 2.4 糖浆 / 胶质 / 黏稠挂口

对应：

- future texture / mouthfeel deferred concept

核心方向：

- `viscosity`
- `syrupiness`
- `stickiness`
- `gumminess`
- `adhesiveLoad`
- `mouthCoating`

边界：

- 核心体验是黏、挂口、糖浆感、胶质感、糊嘴。
- 它不是固体小料很多。
- 它不是粉泥水泥感。
- 它不是奶脂油腻。

### 2.5 Dedupe boundary

以上四类不能混成泛泛 `texture_overload`。

同一原料后续可以贡献多个 metric direction，但最终 severity / priority 层需要 dedupe / dominant mechanism selection，避免重复扣同一件事。

## 3. Still not formal

本轮仍未做：

- 未批准正式 triggerMetric。
- 未创建 metric registry。
- 未创建 schema / validator。
- 未生成 allowed values。
- 未填写正式 numeric values。
- 未填写正式 threshold。
- 未填写正式 `scoreMultiplier`。
- 未开放 generated severity。
- 未开放 generated severity shadow / partial / active takeover。
- 未改 runtime。
- 未改 core / data / generated。
- 未改 golden expected。

`triggerMetricDirectionReview.round1.md` 和本 record 都只是 planning material / review record，不是 source-of-truth registry，不是 allowed values，不是 runtime data。

## 4. Recommended next step

候选下一步：

- docs-only 正本沉淀：把 texture / mouthfeel 四类边界极短写入 `docs/TASTE_SYSTEM_DESIGN.md` / `docs/TASTE_ENGINE_ARCHITECTURE.md`。
- 或继续审阅 open questions，例如 `mouthCoating` 是否需要拆分、奶脂油腻与糖浆胶质是否需要下一轮 concept review。

Recommendation:

建议下一步做 texture / mouthfeel 四类边界的正本沉淀。

这仍然不开放 implementation，不创建正式 triggerMetric，不创建 registry / schema / validator，不改 runtime / data / golden。
