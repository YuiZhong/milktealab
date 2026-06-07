# Debug Reports｜调试输出材料

本目录用于放置只读调试输出，供 ChatGPT / 制作人 / Codex review。

`generatedSeverityShadow.sample.json` 是 debug-only / read-only generated severity shadow proof。

`generatedSeverityShadow.multiSample.sample.json` 是 multi-sample debug-only / read-only proof，用于观察多个 golden sample 下的 `legacySnapshots` 和 `shadowCandidates`。

`generatedSeverityShadow.multiSample.sample.json` 可由 `scripts/content/buildGeneratedSeverityShadowReviewPack.js` 转成 human-readable review pack。

它不是 runtime data，不是 generated severity，不接 final result，不改 golden expected，不应复制进 `data/generated`。

本目录输出只能作为 review / debug material。任何 future shadow、generated data、runtime 或 golden 行为都需要单独任务和明确批准。
