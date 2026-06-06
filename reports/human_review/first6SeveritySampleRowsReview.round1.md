# First 6 Severity Sample Rows Review Round 1｜第一批 Severity 样例行审阅记录

## 0. 文件定位

本文件只记录用户 + ChatGPT 对 `reports/human_review/first6SeveritySampleRowsDryRun.round1.md` 的审阅结论。

本文件是 first 6 severity sample rows review record，不是：

- CSV
- JSON / JS
- Google Sheets 文件
- schema
- validator input
- allowed values
- generated severity data
- runtime data
- official threshold table
- official scoreMultiplier table
- official feedback intensity table
- golden expected source

本文件不批准正式 threshold，不批准正式 `scoreMultiplier`，不批准正式 feedback intensity，不创建 schema / validator，不生成 generated severity，不自动修改 final score / final feedback / final accident / golden expected。

## 1. Review conclusion

用户 + ChatGPT 已审阅 `reports/human_review/first6SeveritySampleRowsDryRun.round1.md`，并接受它作为 planning dry-run checkpoint。

第一批 6 个 `proposedDraftId` 的 light / medium / heavy 示例行可进入后续 planning：

- `taste_sweet_overload`
- `taste_acid_overload`
- `taste_bitter_overload`
- `taste_astringency_overload`
- `texture_low_drinkability`
- `texture_solid_overload`

18 条示例行只作为 human-readable severity intuition / dry-run rows。它们不是正式 threshold、不是正式 `scoreMultiplier`、不是正式 feedback intensity，也不是 generated severity source。

本轮通过的含义是：这些示例行足以帮助制作人理解轻 / 中 / 重体感、`notThis` 边界和误伤风险，并能作为下一步 planning 的输入。

本轮通过不表示：

- 创建 CSV / JSON。
- 创建 schema / validator。
- 生成 generated severity。
- 开放 generated severity shadow。
- 接入 runtime。
- 修改 final feedback / final result / golden expected。

## 2. Accepted boundaries

本轮审阅接受以下边界：

- `taste_acid_overload` 的 light 行保留为“清爽偏酸，可能成立，不一定是事故”，这个边界通过。
- 甜度 / 苦味 / 固体小料等机制都保留 future customer tolerance / preference 空间。
- `taste_astringency_overload` 仍保留 taste / special sensation boundary，不在本轮定死 source family。
- `texture_low_drinkability` 与小料固体负载、奶脂油腻、糖浆胶质黏稠保持区分。
- `texture_solid_overload` 明确“小料多不一定吸不上来”，这个边界通过。

以上边界仍是 planning review conclusion，不是正式 triggerMetric、threshold、validator 或 runtime rule。

## 3. Gates remain closed

所有 dry-run rows 仍保持：

- `enabled=false`
- `canEnterGeneratedSeverity=false`
- `canEnterShadow=false`
- `canAffectRuntime=false`
- `canChangeGoldenExpected=false`
- `thresholdStatus=illustrative_only_notApproved`
- `scoreMultiplierStatus=blank_tbd_notApproved`

本轮未开放：

- CSV / JSON / schema / validator
- generated severity
- shadow / partial / active takeover
- runtime / data / golden changes

`first6SeveritySampleRowsDryRun.round1.md` 和本 review record 都只是 planning material / review record，不是 source-of-truth table，不是 allowed values，不是 runtime data。

## 4. Recommended next step

以下是候选，不是命令，不开放 implementation。

### Option A｜Severity Validator / Lint Planning

设计未来 validator / lint 要检查哪些错误，例如：

- required columns 是否存在。
- dangerous gates 是否保持 false。
- `thresholdStatus` / `scoreMultiplierStatus` 是否未被误标 approved。
- 是否把 high / medium / low 当成正式计算主数据。
- 是否把 illustrative threshold 当成正式阈值。
- 是否把 `rowId` 或 `displayNameDraft` 当成 stable ID。

本 option 只规划 lint / validator shape，不实现 validator。

### Option B｜Severity Sample Rows Field Tightening

如果担心 dry-run 字段仍偏重，可以先再砍字段，减少制作人需要看到的英文 key 和机器字段。

Recommendation:

建议下一步做 Severity Validator / Lint Planning。因为 dry-run rows 已通过，下一步应先设计防呆检查，而不是直接创建 CSV / generated severity。
