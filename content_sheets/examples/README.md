# Content Sheet Examples｜内容表样例

本目录放置内容管线 planning 阶段的样例文件，供人类审阅和后续 tooling planning 使用。

`severity_sample_rows.sample.csv` / `severity_sample_rows.sample.json` 是 severity sample rows 的 planning examples。它们不是 generated severity，不是 runtime data，不是 official threshold table，也不是 official scoreMultiplier table。

CSV 使用 UTF-8 with BOM，方便 Excel / Numbers / Google Sheets 打开时中文可读。

可用最小 validator / lint stub 做 safety check：

```bash
node scripts/content/validateSeveritySampleRows.js content_sheets/examples/severity_sample_rows.sample.csv
node scripts/content/validateSeveritySampleRows.js content_sheets/examples/severity_sample_rows.sample.json
```

该 validator 只检查 examples / planning sample 的字段、行数、危险 gate、未批准状态和 metadata 边界；它不生成 generated severity，不接 shadow，不接 runtime，也不把 sample rows 变成正式 threshold / scoreMultiplier。

后续必须先有 validator / lint，再考虑真实 sample workflow。不要手动把这些 sample 文件复制进 `data/`、`generated/` 或 runtime。
