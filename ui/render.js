(function() {
function createRenderer(app) {
  const { groups, categoryByName, el, state, recipeEngine } = app;
  const { clamp, displayName } = window.MILK_TEA_LAB_HELPERS;

  function totalRatio() {
    return recipeEngine.totalRatio(state.cup);
  }

  function canTaste() {
    return recipeEngine.canTaste(state.cup);
  }

  function maxRatioForIndex(index) {
    return recipeEngine.maxRatioForIndex(state.cup, index);
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
      name.textContent = displayName(item.name);

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
      remove.setAttribute("aria-label", `删除${displayName(item.name)}`);
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
      el.cupNote.textContent = state.cup.map(item => `${displayName(item.name)} ${item.ratio}%`).join(" / ");
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
      const color = colorMap[categoryByName.get(item.name)] || "#ddd";
      const start = cursor;
      cursor += (item.ratio / total) * 100;
      return `${color} ${start}% ${cursor}%`;
    });
    return `linear-gradient(180deg, ${stops.join(", ")})`;
  }

  function renderToppings() {
    el.visualToppings.innerHTML = "";
    const toppingCount = Math.min(10, state.cup.filter(item => categoryByName.get(item.name) === "小料").length * 3);
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

  function selectedIngredientNames() {
    return new Set(state.cup.map(item => displayName(item.name)));
  }

  function updateSelectedIngredientButtons() {
    const selected = selectedIngredientNames();
    el.groups.querySelectorAll(".ingredient").forEach(button => {
      const isSelected = selected.has(button.dataset.name);
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function renderTasteReport(result) {
    if (!result) {
      el.result.classList.add("hidden");
      el.resultEmpty.classList.remove("hidden");
      el.scorePill.textContent = "等待试喝";
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
    el.scorePill.textContent = `${result.score} 分`;
    el.drinkType.textContent = result.type;
    el.scoreValue.textContent = result.score;
    el.feedback.textContent = result.feedback;
    el.audienceTags.innerHTML = "";
    result.audience.forEach(name => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = name;
      el.audienceTags.append(tag);
    });

    el.attributeBars.innerHTML = "";
    labels.forEach(([key, label]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <span>${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width: ${result.attr[key]}%"></div></div>
        <strong>${result.attr[key]}</strong>
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
      const ingredients = recipe.cup.map(item => `${displayName(item.name)} ${item.ratio}%`).join(" / ");
      card.innerHTML = `
        <div class="saved-card-head">
          <strong>${recipe.title}</strong>
          <span class="tag">${recipe.createdAt}</span>
        </div>
        <p>${ingredients}</p>
        <p>${recipe.result.feedback.replaceAll("奶精", "植脂奶")}</p>
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
