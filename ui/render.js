(function() {
function createRenderer(app) {
  const { groups, categoryByName, el, state, recipeEngine } = app;
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
    prompt.textContent = `判断提示：${calibration.reviewPrompt || "请结合制作人直觉判断新系统建议是否合理。"}`;

    const targets = Array.isArray(calibration.likelyAdjustmentTargets) && calibration.likelyAdjustmentTargets.length
      ? calibration.likelyAdjustmentTargets.join(" / ")
      : "暂无";
    const targetText = document.createElement("p");
    targetText.textContent = `优先排查：${targets}`;

    const note = document.createElement("p");
    note.textContent = `备注：${calibration.note || "不要为了让某杯通过校正测试而扭曲原料 profile。"}`;

    block.append(title, status, trust, prompt, targetText, note);
    return block;
  }

  function renderGeneratedSeveritySuggestion(suggestion) {
    const panel = el.generatedSeveritySuggestion;
    if (!panel) return;
    panel.innerHTML = "";

    if (!suggestion) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden");

    const title = document.createElement("h4");
    title.textContent = "新系统观察｜Generated severity suggestion";

    const mode = document.createElement("p");
    mode.className = "suggestion-mode";
    mode.textContent = "当前模式：只读建议，不影响最终结果";

    const meta = document.createElement("div");
    meta.className = "suggestion-meta";
    const scoreSuggestion = suggestion.scoreSuggestion || {};
    appendSuggestionMeta(meta, "旧系统分数", suggestionScore(scoreSuggestion.legacyScore));
    appendSuggestionMeta(meta, "建议分数", `${suggestionScore(scoreSuggestion.suggestedScore)}（暂未接管）`);
    appendSuggestionMeta(meta, "分数差", suggestionDelta(scoreSuggestion.scoreDelta));
    appendSuggestionMeta(meta, "置信度", scoreSuggestion.confidence || "low");

    const reason = document.createElement("p");
    reason.className = "suggestion-reason";
    reason.textContent = `主要原因：${scoreSuggestion.reason || "尚未启用正式 threshold / scoreMultiplier。"}`;

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
      row.textContent = `${item.metric || "unknown"}：${availabilityLabel(item.availability)}${valueText}`;
      metricList.append(row);
    });
    if (!metricList.children.length) {
      const row = document.createElement("li");
      row.textContent = "暂无可展示指标。";
      metricList.append(row);
    }

    const draftObservationTitle = document.createElement("p");
    draftObservationTitle.className = "suggestion-subtitle";
    draftObservationTitle.textContent = "Draft severity observations";

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
      row.textContent = `${item.displayName || item.metric || "unknown"}${valueText}：${item.severityLevelDraft || "draft"} draft${deltaText}${humanReviewText}`;
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

    panel.append(title, mode, meta, reason, calibrationBlock, metricTitle, metricList, draftObservationTitle, draftObservationList, observation);
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
    renderGeneratedSeveritySuggestion(result.generatedSeveritySuggestion);
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
    updateSelectedIngredientButtons();
    renderTasteReport(state.lastResult);
  }

  return {
    renderIngredients,
    renderCup,
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
