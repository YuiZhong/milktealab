(function() {
function createRenderer(app) {
  const { groups, categoryByName, el, state, recipeEngine, calibrationPresets = [] } = app;
  const { clamp, displayName } = window.MILK_TEA_LAB_HELPERS;
  const ingredientRegistry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const recipeNormalizer = window.MILK_TEA_LAB_RECIPE_NORMALIZER;

  function totalRatio() {
    return recipeEngine.totalRatio(state.cup);
  }

  function canTaste() {
    return recipeEngine.canTaste(state.cup);
  }

  function maxRatioForIndex(index) {
    return recipeEngine.maxRatioForIndex(state.cup, index);
  }

  function normalizeCupItem(item) {
    return recipeNormalizer.normalizeSavedCupItem(item);
  }

  function cupItemName(item) {
    return normalizeCupItem(item).name || displayName(item.name) || "";
  }

  function cupItemCategory(item) {
    const normalized = normalizeCupItem(item);
    return ingredientRegistry?.getIngredientCategory({ ingredientId: normalized.ingredientId })
      || categoryByName.get(normalized.name)
      || categoryByName.get(item.name);
  }

  function renderIngredients() {
    el.groups.innerHTML = "";
    let count = 0;
    groups.forEach(group => {
      const section = document.createElement("section");
      section.className = "ingredient-group";
      const title = document.createElement("h3");
      title.textContent = group.name;
      const grid = document.createElement("div");
      grid.className = "ingredient-grid";

      group.items.forEach(name => {
        count += 1;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `ingredient ${group.name.replace("/", "")}`;
        button.dataset.name = displayName(name);
        button.dataset.ingredientId = ingredientRegistry?.getIngredientId({ name }) || "";
        button.setAttribute("aria-pressed", "false");
        button.textContent = name;
        grid.append(button);
      });

      section.append(title, grid);
      el.groups.append(section);
    });
    el.ingredientCount.textContent = `${count} 种可用`;
  }

  function renderCup() {
    el.cupList.innerHTML = "";

    if (!state.cup.length) {
      el.cupList.textContent = "杯子是空的。";
      el.cupList.className = "cup-list empty-state";
      renderCupMeta();
      return;
    }

    el.cupList.className = "cup-list";
    renderCupMeta();

    state.cup.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "cup-item";
      row.dataset.index = String(index);

      const name = document.createElement("div");
      name.className = "cup-item-name";
      name.textContent = cupItemName(item);

      const range = document.createElement("input");
      range.className = "ratio-input";
      range.type = "range";
      range.min = "0";
      range.max = "100";
      range.step = "1";
      range.value = item.ratio;

      const number = document.createElement("input");
      number.className = "ratio-number";
      number.type = "number";
      number.min = "0";
      number.max = String(maxRatioForIndex(index));
      number.value = item.ratio;

      const remove = document.createElement("button");
      remove.className = "remove-btn";
      remove.type = "button";
      remove.dataset.action = "remove-ingredient";
      remove.setAttribute("aria-label", `删除${cupItemName(item)}`);
      remove.textContent = "×";

      row.append(name, range, number, remove);
      el.cupList.append(row);
    });
  }

  function renderCupMeta() {
    const total = totalRatio();
    el.totalRatio.textContent = `当前总量：${total}%`;
    el.totalRatio.className = total === 100 ? "total-ok" : total > 100 ? "total-high" : "total-low";
    el.tasteBtn.disabled = !canTaste();
    el.tasteBtn.title = canTaste() ? "" : "当前总量必须等于 100% 才能试喝";
    el.saveBtn.disabled = !canTaste();
    el.saveBtn.title = canTaste() ? "" : "当前总量必须等于 100% 才能保存试喝配方";

    if (!state.cup.length) {
      el.cupTitle.textContent = "还没开始研发";
      el.cupNote.textContent = "点一些原料进杯子，再用自动配平装满到 100%。";
      el.cupNote.className = "";
      el.visualFill.style.height = "18%";
      el.visualFill.style.background = "linear-gradient(180deg, #ffcfdb, #c98a59)";
      el.visualToppings.innerHTML = "";
      return;
    }

    el.cupTitle.textContent = `${state.cup.length} 种原料正在实验`;
    if (total > 100) {
      el.cupNote.textContent = "杯子装不下啦，请减少一些原料或点击自动配平。";
      el.cupNote.className = "warning";
    } else if (total < 100) {
      el.cupNote.textContent = "杯子还没装满，可以继续加料或点击自动配平。";
      el.cupNote.className = "notice";
    } else {
      el.cupNote.textContent = state.cup.map(item => `${cupItemName(item)} ${item.ratio}%`).join(" / ");
      el.cupNote.className = "";
    }
    el.visualFill.style.height = `${clamp(total * 0.8, 18, 88)}%`;
    el.visualFill.style.background = makeCupGradient();
    renderToppings();
  }

  function renderCalibrationPresets() {
    if (!el.calibrationPresets) return;
    const wasOpen = Boolean(el.calibrationPresets.querySelector("details")?.open);
    el.calibrationPresets.innerHTML = "";

    const details = document.createElement("details");
    details.className = "calibration-presets-details";
    details.open = wasOpen;

    const summary = document.createElement("summary");
    summary.textContent = "制作人校准样本 / Debug";

    const heading = document.createElement("div");
    heading.className = "calibration-presets-head";

    const description = document.createElement("p");
    description.textContent = "点击载入代表配方，再试喝观察新旧分数差。此区块是制作人调试入口，不是正式玩家 UI。";

    heading.append(description);

    const grid = document.createElement("div");
    grid.className = "calibration-presets-grid";

    calibrationPresets.forEach(preset => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "calibration-preset-button";
      button.dataset.action = "load-calibration-preset";
      button.dataset.presetId = preset.id;

      const label = document.createElement("span");
      label.textContent = preset.title;

      const note = document.createElement("small");
      note.textContent = preset.note || "载入后再点击试喝。";

      button.append(label, note);
      grid.append(button);
    });

    details.append(summary, heading, grid);
    el.calibrationPresets.append(details);
  }

  function makeCupGradient() {
    const total = totalRatio();
    if (total <= 0) return "linear-gradient(180deg, #ffcfdb, #c98a59)";
    const colorMap = {
      茶类: "#b97843",
      乳类: "#fff1da",
      液体: "#8fd5ef",
      "水果/风味": "#ff9fbe",
      调味: "#f4ce62",
      小料: "#6b4331"
    };
    let cursor = 0;
    const stops = state.cup.map(item => {
      const color = colorMap[cupItemCategory(item)] || "#ddd";
      const start = cursor;
      cursor += (item.ratio / total) * 100;
      return `${color} ${start}% ${cursor}%`;
    });
    return `linear-gradient(180deg, ${stops.join(", ")})`;
  }

  function renderToppings() {
    el.visualToppings.innerHTML = "";
    const toppingCount = Math.min(10, state.cup.filter(item => cupItemCategory(item) === "小料").length * 3);
    for (let index = 0; index < toppingCount; index += 1) {
      const dot = document.createElement("span");
      dot.style.left = `${18 + (index * 23) % 84}px`;
      dot.style.bottom = `${16 + (index * 17) % 62}px`;
      dot.style.width = `${10 + (index % 3) * 2}px`;
      dot.style.height = dot.style.width;
      el.visualToppings.append(dot);
    }
  }

  function syncRatioControls() {
    const rows = el.cupList.querySelectorAll(".cup-item");
    rows.forEach((row, index) => {
      const item = state.cup[index];
      if (!item) return;
      const range = row.querySelector(".ratio-input");
      const number = row.querySelector(".ratio-number");
      if (range) {
        range.value = item.ratio;
      }
      if (number) {
        number.max = String(maxRatioForIndex(index));
        number.value = item.ratio;
      }
    });
  }

  function selectedIngredients() {
    const ids = new Set();
    const names = new Set();
    state.cup.forEach(item => {
      const normalized = normalizeCupItem(item);
      if (normalized.ingredientId) ids.add(normalized.ingredientId);
      if (normalized.name) names.add(displayName(normalized.name));
    });
    return { ids, names };
  }

  function resultText(value, fallback) {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  function resultScore(result) {
    return Number.isFinite(result?.score) ? result.score : "待评估";
  }

  function resultAudience(result) {
    return Array.isArray(result?.audience) ? result.audience.filter(name => typeof name === "string" && name) : [];
  }

  function resultAttrValue(result, key) {
    const value = result?.attr?.[key];
    return Number.isFinite(value) ? clamp(value, 0, 100) : 0;
  }

  const metricDisplayLabels = {
    acidity: "酸度",
    acidityLoad: "酸度负载方向",
    aromaPressure: "香气压力",
    astringency: "涩感 / 收敛感",
    astringencyLoad: "涩感负载方向",
    bitterness: "苦味",
    bitternessLoad: "苦味负载方向",
    drinkability: "可饮用性",
    drinkabilityPenalty: "低流动性压力",
    fatLoad: "奶脂负担",
    flavorIntensity: "风味强度",
    lowFlowPenalty: "低流动性惩罚方向",
    solidLoad: "固体小料负载",
    strawResistance: "吸管阻力",
    sweetness: "甜度",
    sweetnessLoad: "甜度负载方向",
    sweetnessPressure: "甜度压力",
    acidPressure: "酸度压力",
    bitterPressure: "苦味压力",
    fatPressure: "奶脂压力",
    solidLoadPressure: "固体小料压力",
    lowFlowPressure: "低流动性压力",
    combinedTextureBurdenPressure: "合成质地负担压力",
    strongIdentityPressure: "强风味身份压力",
    dairySupport: "奶感支撑",
    sweetnessBalance: "甜度平衡",
    liquidSupport: "液体支撑",
    fitSupport: "饮品 / 甜品适配支撑",
    identitySupport: "风味身份支撑"
  };

  const adjustmentTargetDisplayLabels = {
    threshold: "阈值",
    severityLevel: "严重度档位",
    scoreMultiplier: "扣分倍率",
    positiveSynergy: "好组合加成",
    drinkTypeExpectation: "饮品类型预期",
    scoreAggregation: "分数汇总方式",
    customerPreference: "客群偏好",
    profileFactualCheck: "原料事实复查"
  };

  const severityDraftDisplayLabels = {
    light: "轻度",
    medium: "中度",
    heavy: "重度"
  };

  const confidenceDisplayLabels = {
    low: "低",
    medium: "中",
    high: "高"
  };

  const textDisplayLabels = {
    "positive synergy": "好组合加成",
    "drinkType expectation": "饮品类型预期",
    "score aggregation": "分数汇总方式",
    "customer preference": "客群偏好"
  };

  function displayLabel(map, key, fallback = "待确认") {
    if (!key) return fallback;
    return map[key] || `${key}（未登记中文名）`;
  }

  function displayMetricLabel(key) {
    if (!key) return "待确认";
    const label = metricDisplayLabels[key];
    return label ? `${label}（${key}）` : `${key}（未登记中文名）`;
  }

  function localizeMachineKeysInText(text) {
    if (typeof text !== "string") return "";
    return Object.entries({ ...textDisplayLabels, ...metricDisplayLabels, ...adjustmentTargetDisplayLabels, ...severityDraftDisplayLabels, ...confidenceDisplayLabels })
      .sort((left, right) => right[0].length - left[0].length)
      .reduce((current, [key, label]) => current.replaceAll(key, label), text);
  }

  function suggestionScore(value) {
    return Number.isFinite(value) ? String(value) : "待观察";
  }

  function suggestionDelta(value) {
    if (!Number.isFinite(value)) return "待观察";
    if (value > 0) return `+${value}`;
    return String(value);
  }

  function availabilityLabel(state) {
    const labels = {
      metric_observed_positive: "可观察",
      metric_observed_zero: "可观察：当前为 0",
      needs_official_mapping_or_threshold: "仍需正式映射或阈值"
    };
    return labels[state] || state || "待确认";
  }

  function appendSuggestionMeta(parent, label, value) {
    const item = document.createElement("div");
    item.className = "suggestion-meta-item";

    const title = document.createElement("span");
    title.textContent = label;

    const detail = document.createElement("strong");
    detail.textContent = value;

    item.append(title, detail);
    parent.append(item);
  }

  function renderUnifiedScoreReasons(unifiedScoring) {
    const block = document.createElement("div");
    block.className = "suggestion-calibration";

    const title = document.createElement("h5");
    title.textContent = "试玩统一评分";

    const reasons = Array.isArray(unifiedScoring?.scoreReasons) ? unifiedScoring.scoreReasons : [];
    const reasonText = document.createElement("p");
    reasonText.textContent = reasons.length
      ? `主要原因：${reasons.slice(0, 4).map(localizeMachineKeysInText).join(" / ")}`
      : "主要原因：暂无命中的统一评分压力。";

    const warningList = document.createElement("ul");
    warningList.className = "suggestion-list";
    const warnings = Array.isArray(unifiedScoring?.warnings) ? unifiedScoring.warnings : [];
    warnings.slice(0, 4).forEach(warning => {
      const item = document.createElement("li");
      item.textContent = localizeMachineKeysInText(warning);
      warningList.append(item);
    });
    if (!warningList.children.length) {
      const item = document.createElement("li");
      item.textContent = "暂无 warning。";
      warningList.append(item);
    }

    block.append(title, reasonText, warningList);
    return block;
  }

  function renderUnifiedJudgmentReasons(unifiedJudgment) {
    const block = document.createElement("div");
    block.className = "suggestion-calibration";

    const title = document.createElement("h5");
    title.textContent = "试玩统一判定";
    const composedDrinkType = unifiedJudgment?.composedDrinkType || null;

    const reasons = Array.isArray(unifiedJudgment?.judgmentReasons) ? unifiedJudgment.judgmentReasons : [];
    const reasonText = document.createElement("p");
    reasonText.textContent = reasons.length
      ? `判定原因：${reasons.slice(0, 4).map(localizeMachineKeysInText).join(" / ")}`
      : "判定原因：暂无统一判定候选。";

    const composedText = document.createElement("p");
    composedText.textContent = composedDrinkType
      ? `组合类型（debug）：${composedDrinkType.composedTypeLabel || "待观察"}；broad ID：${composedDrinkType.drinkTypeId || "无"}；modifier：${Array.isArray(composedDrinkType.modifierIdentityTags) && composedDrinkType.modifierIdentityTags.length ? composedDrinkType.modifierIdentityTags.join(" / ") : "无"}；fallback：${composedDrinkType.fallbackReason || "无"}。`
      : "组合类型：本轮没有普通饮品类型 composer 输出，可能是事故优先或 composer fallback。";

    const displayText = document.createElement("p");
    displayText.textContent = `主显示来源：${unifiedJudgment?.displayTypeSource || "待观察"}；主显示：${unifiedJudgment?.primaryDisplayType || unifiedJudgment?.type || "待观察"}；问题显示：${unifiedJudgment?.problemDisplayType || "无"}；普通组合名：${unifiedJudgment?.normalComposedTypeLabel || "无"}。`;

    const unifiedFeedback = unifiedJudgment?.unifiedFeedback || null;
    const feedbackSource = unifiedFeedback?.sourcePressure?.pressureKey
      || unifiedJudgment?.dominantPressure
      || "none";
    const feedbackTags = Array.isArray(unifiedFeedback?.feedbackTags) && unifiedFeedback.feedbackTags.length
      ? unifiedFeedback.feedbackTags.join(" / ")
      : Array.isArray(unifiedJudgment?.feedbackTags) && unifiedJudgment.feedbackTags.length
        ? unifiedJudgment.feedbackTags.join(" / ")
        : "无";
    const feedbackText = document.createElement("p");
    feedbackText.textContent = unifiedFeedback
      ? `Unified feedback 来源：${displayMetricLabel(feedbackSource)}；路径：${unifiedFeedback.feedbackPath || "无"}；tone：${unifiedFeedback.tone || "无"}；tags：${feedbackTags}。`
      : "Unified feedback 来源：暂无 composer 输出，可能使用 fallback。";

    const warningList = document.createElement("ul");
    warningList.className = "suggestion-list";
    const warnings = Array.isArray(unifiedJudgment?.warnings) ? unifiedJudgment.warnings : [];
    warnings.slice(0, 4).forEach(warning => {
      const item = document.createElement("li");
      item.textContent = localizeMachineKeysInText(warning);
      warningList.append(item);
    });
    if (!warningList.children.length) {
      const item = document.createElement("li");
      item.textContent = "暂无 unified judgment warning。";
      warningList.append(item);
    }

    block.append(title, reasonText, displayText, composedText, feedbackText, warningList);
    return block;
  }

  function renderCalibrationReview(calibrationReview) {
    const calibration = calibrationReview || {};
    const block = document.createElement("div");
    block.className = "suggestion-calibration";

    const title = document.createElement("h5");
    title.textContent = "校准判断";

    const status = document.createElement("p");
    status.textContent = `状态：${calibration.humanReadableStatus || "待制作人判断"}`;

    const trust = document.createElement("p");
    trust.textContent = "是否可直接相信：否，仍是 draft";

    const prompt = document.createElement("p");
    prompt.textContent = `判断提示：${localizeMachineKeysInText(calibration.reviewPrompt || "请结合制作人直觉判断新系统建议是否合理。")}`;

    const targets = Array.isArray(calibration.likelyAdjustmentTargets) && calibration.likelyAdjustmentTargets.length
      ? calibration.likelyAdjustmentTargets.map(target => displayLabel(adjustmentTargetDisplayLabels, target)).join(" / ")
      : "暂无";
    const targetText = document.createElement("p");
    targetText.textContent = `优先排查：${targets}`;

    const note = document.createElement("p");
    note.textContent = `备注：${calibration.note || "不要为了让某杯通过校正测试而扭曲原料 profile。"}`;

    block.append(title, status, trust, prompt, targetText, note);
    return block;
  }

  function renderGeneratedSeveritySuggestion(suggestion, result) {
    const panel = el.generatedSeveritySuggestion;
    if (!panel) return;
    panel.innerHTML = "";

    if (!suggestion) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden");

    const unifiedScoring = result?.unifiedScoring || null;
    const unifiedJudgment = result?.unifiedJudgment || null;
    const title = document.createElement("h4");
    title.textContent = "新系统观察｜Playtest takeover";

    const scoreTakeoverEnabled = Boolean(result?.scoreTakeoverEnabled);
    const judgmentTakeoverEnabled = Boolean(result?.judgmentTakeoverEnabled);
    const scoreSourceText = scoreTakeoverEnabled
      ? "试玩 unified score 接管（Debug，可回滚）"
      : judgmentTakeoverEnabled
        ? "试玩 unified judgment 接管（Debug，可回滚）"
      : "旧系统回退模式";
    const scoreSuggestion = suggestion.scoreSuggestion || {};
    const legacyScore = Number.isFinite(result?.legacyScore)
      ? result.legacyScore
      : scoreSuggestion.legacyScore;
    const generatedSuggestedScore = Number.isFinite(result?.generatedSuggestedScore)
      ? result.generatedSuggestedScore
      : scoreSuggestion.suggestedScore;
    const unifiedScore = Number.isFinite(result?.unifiedScore)
      ? result.unifiedScore
      : unifiedScoring?.score;
    const unifiedDelta = Number.isFinite(result?.unifiedScoreDeltaFromLegacy)
      ? result.unifiedScoreDeltaFromLegacy
      : unifiedScoring?.scoreDeltaFromLegacy;
    const takeoverModeText = result?.scoreTakeoverMode === "debug_flag"
      ? "debug_flag（显式调试开关）"
      : result?.scoreTakeoverMode === "storage_flag"
        ? "storage_flag（本地调试开关）"
      : "off（默认关闭）";
    const judgmentModeText = result?.judgmentTakeoverMode === "debug_flag"
      ? "debug_flag（显式调试开关）"
      : result?.judgmentTakeoverMode === "storage_flag"
        ? "storage_flag（本地调试开关）"
        : result?.judgmentTakeoverMode === "default"
          ? "default（新系统默认）"
      : "off（默认关闭）";

    const mode = document.createElement("p");
    mode.className = "suggestion-mode";
    mode.textContent = judgmentTakeoverEnabled
      ? "当前模式：Playtest unified judgment takeover；分数、类型、事故和反馈使用新系统试玩输出，golden 仍不接管。"
      : scoreTakeoverEnabled
      ? "当前模式：Playtest unified score takeover，只覆盖分数；反馈、类型、事故和 golden 仍不接管。"
      : "当前模式：旧系统回退；新系统只读建议，不影响最终结果。";

    const meta = document.createElement("div");
    meta.className = "suggestion-meta";
    appendSuggestionMeta(meta, "最终分数来源", scoreSourceText);
    appendSuggestionMeta(meta, "score 接管开关", scoreTakeoverEnabled ? "已开启（Debug，可回滚）" : "关闭");
    appendSuggestionMeta(meta, "score 接管模式", takeoverModeText);
    appendSuggestionMeta(meta, "judgment 接管开关", judgmentTakeoverEnabled ? "已开启（Debug，可回滚）" : "关闭");
    appendSuggestionMeta(meta, "judgment 接管模式", judgmentModeText);
    appendSuggestionMeta(meta, "Profile source", result?.profileSource || unifiedScoring?.profileSource || unifiedJudgment?.profileSource || "未标记");
    appendSuggestionMeta(meta, "Legacy profile source", result?.legacyProfileSource || "runtime_legacy_profile");
    appendSuggestionMeta(meta, "旧系统分数", suggestionScore(legacyScore));
    appendSuggestionMeta(meta, "Unified 试玩分", `${suggestionScore(unifiedScore)}（${scoreTakeoverEnabled || judgmentTakeoverEnabled ? "当前接管试验" : "未接管"}）`);
    appendSuggestionMeta(meta, "Unified 分数差", suggestionDelta(unifiedDelta));
    appendSuggestionMeta(meta, "Dominant pressure", displayMetricLabel(unifiedScoring?.dominantPressure));
    appendSuggestionMeta(meta, "旧 draft 建议分", `${suggestionScore(generatedSuggestedScore)}（观察层）`);
    appendSuggestionMeta(meta, "旧 draft 分数差", suggestionDelta(scoreSuggestion.scoreDelta));
    appendSuggestionMeta(meta, "置信度", displayLabel(confidenceDisplayLabels, unifiedScoring?.confidence || scoreSuggestion.confidence || "low"));
    appendSuggestionMeta(meta, "旧系统类型", result?.legacyType || "无");
    appendSuggestionMeta(meta, "旧系统事故 ID", result?.legacyAccidentTypeId || "无");
    appendSuggestionMeta(meta, "旧系统饮品 ID", result?.legacyDrinkTypeId || "无");
    appendSuggestionMeta(meta, "旧系统 outcome ID", result?.legacyOutcomeTypeId || "无");
    appendSuggestionMeta(meta, "旧系统 feedback", unifiedJudgment?.legacyComparison?.legacyFeedback || "无");
    appendSuggestionMeta(meta, "Unified 类型", unifiedJudgment?.type || "待观察");
    appendSuggestionMeta(meta, "Unified 显示来源", unifiedJudgment?.displayTypeSource || "无");
    appendSuggestionMeta(meta, "Unified 主显示", unifiedJudgment?.primaryDisplayType || "无");
    appendSuggestionMeta(meta, "Unified 问题显示", unifiedJudgment?.problemDisplayType || "无");
    appendSuggestionMeta(meta, "Unified 普通组合名", unifiedJudgment?.normalComposedTypeLabel || "无");
    appendSuggestionMeta(meta, "Unified 显示优先级", unifiedJudgment?.displayPriorityReason || "无");
    appendSuggestionMeta(meta, "Unified 事故 ID", unifiedJudgment?.accidentTypeId || "无");
    appendSuggestionMeta(meta, "Unified 饮品 ID", unifiedJudgment?.drinkTypeId || "无");
    appendSuggestionMeta(meta, "Unified outcome ID", unifiedJudgment?.outcomeTypeId || "无");
    appendSuggestionMeta(meta, "Unified feedback", unifiedJudgment?.feedback || "待观察");
    const unifiedFeedback = unifiedJudgment?.unifiedFeedback || null;
    appendSuggestionMeta(meta, "Unified feedback tags", Array.isArray(unifiedFeedback?.feedbackTags) && unifiedFeedback.feedbackTags.length ? unifiedFeedback.feedbackTags.join(" / ") : "无");
    appendSuggestionMeta(meta, "Unified feedback tone", unifiedFeedback?.tone || "无");
    appendSuggestionMeta(meta, "Unified feedback path", unifiedFeedback?.feedbackPath || "无");
    appendSuggestionMeta(meta, "Unified feedback fallback", unifiedFeedback?.fallbackReason || "无");
    appendSuggestionMeta(meta, "Unified feedback source", displayMetricLabel(unifiedFeedback?.sourcePressure?.pressureKey || unifiedJudgment?.dominantPressure || "none"));
    appendSuggestionMeta(meta, "Unified feedback drinkType", unifiedFeedback?.sourceDrinkTypeId || "无");
    const composedDrinkType = unifiedJudgment?.composedDrinkType || null;
    appendSuggestionMeta(meta, "Composer 组合类型", composedDrinkType?.composedTypeLabel || "无");
    appendSuggestionMeta(meta, "Composer broad ID", composedDrinkType?.drinkTypeId || "无");
    appendSuggestionMeta(meta, "Composer identity tags", Array.isArray(composedDrinkType?.identityTags) && composedDrinkType.identityTags.length ? composedDrinkType.identityTags.join(" / ") : "无");
    appendSuggestionMeta(meta, "Composer modifier tags", Array.isArray(composedDrinkType?.modifierIdentityTags) && composedDrinkType.modifierIdentityTags.length ? composedDrinkType.modifierIdentityTags.join(" / ") : "无");
    appendSuggestionMeta(meta, "Composer fallback", composedDrinkType?.fallbackReason || "无");

    const reason = document.createElement("p");
    reason.className = "suggestion-reason";
    reason.textContent = `接管路径：${judgmentTakeoverEnabled ? "当前分数、类型、事故和反馈来自 unified judgment engine。" : scoreTakeoverEnabled ? "当前分数来自 unified scoring engine。" : "当前最终结果仍来自旧系统，unified 输出只做试玩观察。"}`;

    const takeoverNote = document.createElement("p");
    takeoverNote.className = "suggestion-footnote";
    takeoverNote.textContent = result?.scoreTakeoverNote
      ? `接管说明：${result.scoreTakeoverNote} 旧系统结果仍保留为 debug 对照和回滚路径，不是新系统 source-of-truth。`
      : "接管说明：默认关闭；仅用于制作人 Debug / rollback 试验。";

    const unifiedBlock = renderUnifiedScoreReasons(unifiedScoring);
    const unifiedJudgmentBlock = renderUnifiedJudgmentReasons(unifiedJudgment);
    const calibrationBlock = renderCalibrationReview(suggestion.calibrationReview);

    const metricTitle = document.createElement("p");
    metricTitle.className = "suggestion-subtitle";
    metricTitle.textContent = "指标观察";

    const metricList = document.createElement("ul");
    metricList.className = "suggestion-list";
    const metrics = Array.isArray(suggestion.metricAvailability)
      ? suggestion.metricAvailability
      : [];
    metrics.slice(0, 8).forEach(item => {
      const row = document.createElement("li");
      const valueText = Number.isFinite(item.observedValue) ? `，当前值 ${Math.round(item.observedValue)}` : "";
      row.textContent = `${displayMetricLabel(item.metric)}：${availabilityLabel(item.availability)}${valueText}`;
      metricList.append(row);
    });
    if (!metricList.children.length) {
      const row = document.createElement("li");
      row.textContent = "暂无可展示指标。";
      metricList.append(row);
    }

    const draftObservationTitle = document.createElement("p");
    draftObservationTitle.className = "suggestion-subtitle";
    draftObservationTitle.textContent = "草案严重度观察";

    const draftObservationList = document.createElement("ul");
    draftObservationList.className = "suggestion-list";
    const draftObservations = Array.isArray(suggestion.severityObservations)
      ? suggestion.severityObservations.filter(item => item.observationType === "draft_score_rule_matched")
      : [];
    draftObservations.slice(0, 3).forEach(item => {
      const row = document.createElement("li");
      const valueText = Number.isFinite(item.observedValue) ? ` ${Math.round(item.observedValue)}` : "";
      const deltaText = Number.isFinite(item.scoreDeltaDraft) ? `，建议 ${suggestionDelta(item.scoreDeltaDraft)}` : "";
      const humanReviewText = item.requiresHumanReview ? "，需人审" : "";
      const displayName = item.displayName || displayMetricLabel(item.metric);
      const severityText = displayLabel(severityDraftDisplayLabels, item.severityLevelDraft, "草案");
      row.textContent = `${displayName}${valueText}：${severityText}草案${deltaText}${humanReviewText}`;
      draftObservationList.append(row);
    });
    if (!draftObservationList.children.length) {
      const row = document.createElement("li");
      row.textContent = "暂无命中的 draft severity observation。";
      draftObservationList.append(row);
    }

    const observationCount = Array.isArray(suggestion.severityObservations)
      ? suggestion.severityObservations.length
      : 0;
    const observation = document.createElement("p");
    observation.className = "suggestion-footnote";
    observation.textContent = `已观察到 ${observationCount} 条新系统观察项；它们不是正式 generated severity。`;

    panel.append(title, mode, meta, reason, takeoverNote, unifiedBlock, unifiedJudgmentBlock, calibrationBlock, metricTitle, metricList, draftObservationTitle, draftObservationList, observation);
  }

  function updateSelectedIngredientButtons() {
    const selected = selectedIngredients();
    el.groups.querySelectorAll(".ingredient").forEach(button => {
      const isSelected = Boolean(button.dataset.ingredientId && selected.ids.has(button.dataset.ingredientId))
        || selected.names.has(button.dataset.name);
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function renderTasteReport(result) {
    if (!result) {
      el.result.classList.add("hidden");
      el.resultEmpty.classList.remove("hidden");
      el.scorePill.textContent = "等待试喝";
      renderGeneratedSeveritySuggestion(null);
      return;
    }

    const labels = [
      ["fresh", "清爽度"],
      ["thick", "厚重度"],
      ["sweet", "甜腻度"],
      ["acid", "酸度"],
      ["tea", "茶感"],
      ["milk", "奶感"],
      ["fruit", "果感"],
      ["bubble", "气泡感"],
      ["straw", "吸管阻力"],
      ["greasy", "油腻感"],
      ["odd", "猎奇度"],
      ["cost", "成本"],
      ["difficulty", "制作难度"],
      ["photo", "拍照价值"]
    ];

    el.result.classList.remove("hidden");
    el.resultEmpty.classList.add("hidden");
    el.scorePill.textContent = `${resultScore(result)} 分`;
    el.drinkType.textContent = resultText(result.type, "历史配方");
    el.scoreValue.textContent = resultScore(result);
    el.feedback.textContent = resultText(result.feedback, "暂无反馈");
    renderGeneratedSeveritySuggestion(result.generatedSeveritySuggestion, result);
    el.audienceTags.innerHTML = "";
    resultAudience(result).forEach(name => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = name;
      el.audienceTags.append(tag);
    });

    el.attributeBars.innerHTML = "";
    labels.forEach(([key, label]) => {
      const value = resultAttrValue(result, key);
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <span>${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width: ${value}%"></div></div>
        <strong>${value}</strong>
      `;
      el.attributeBars.append(row);
    });
  }

  function renderSavedRecipes(recipes) {
    el.savedList.innerHTML = "";
    if (!recipes.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "还没有保存过配方。";
      el.savedList.append(empty);
      return;
    }

    recipes.forEach(recipe => {
      const card = document.createElement("article");
      card.className = "saved-card";
      card.dataset.recipeId = recipe.id;
      const normalizedRecipe = recipeNormalizer.normalizeSavedRecipe(recipe);
      const ingredients = normalizedRecipe.cup.map(item => `${cupItemName(item)} ${item.ratio}%`).join(" / ");
      const feedback = resultText(recipe.result?.feedback, "暂无反馈").replaceAll("奶精", "植脂奶");
      card.innerHTML = `
        <div class="saved-card-head">
          <strong>${recipe.title}</strong>
          <span class="tag">${recipe.createdAt}</span>
        </div>
        <p>${ingredients}</p>
        <p>${feedback}</p>
        <div class="saved-card-actions">
          <button type="button" data-action="load">载入杯子</button>
          <button type="button" data-action="delete">删除</button>
        </div>
      `;
      el.savedList.append(card);
    });
  }

  function openSavedDialog() {
    renderSavedRecipes(app.saveStorage.getRecipes());
    if (typeof el.savedDialog.showModal === "function") {
      el.savedDialog.showModal();
    } else {
      el.savedDialog.setAttribute("open", "");
    }
  }

  function render() {
    renderCup();
    renderCalibrationPresets();
    updateSelectedIngredientButtons();
    renderTasteReport(state.lastResult);
  }

  return {
    renderIngredients,
    renderCup,
    renderCalibrationPresets,
    renderCupMeta,
    syncRatioControls,
    renderTasteReport,
    renderSavedRecipes,
    updateSelectedIngredientButtons,
    openSavedDialog,
    render
  };
}

window.MILK_TEA_LAB_RENDER = {
  createRenderer
};
})();
