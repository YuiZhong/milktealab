(function() {
function bindDomEvents(app) {
  const { el, state, recipeEngine, evaluateCup, saveStorage, groups, ui } = app;
  const { clamp } = window.MILK_TEA_LAB_HELPERS;
  const recipeNormalizer = window.MILK_TEA_LAB_RECIPE_NORMALIZER;

  function totalRatio() {
    return recipeEngine.totalRatio(state.cup);
  }

  function canTaste() {
    return recipeEngine.canTaste(state.cup);
  }

  function updateIngredientRatio(index, nextRatio, options = {}) {
    const item = state.cup[index];
    if (!item) return;
    recipeEngine.updateIngredientRatio(state.cup, index, nextRatio);
    state.lastResult = null;
    ui.renderCupMeta();
    ui.syncRatioControls();
    ui.renderTasteReport(null);
    if (options.syncNumber) options.syncNumber.value = item.ratio;
    if (options.syncRange) options.syncRange.value = item.ratio;
  }

  function valueFromPointer(range, event) {
    const rect = range.getBoundingClientRect();
    const position = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    return Math.round(position * 100);
  }

  function bindRatioDrag(range, number, index, event) {
    const move = moveEvent => {
      moveEvent.preventDefault();
      updateIngredientRatio(index, valueFromPointer(range, moveEvent), { syncNumber: number, syncRange: range });
    };

    const stop = stopEvent => {
      stopEvent.preventDefault();
      range.releasePointerCapture?.(stopEvent.pointerId);
      range.removeEventListener("pointermove", move);
      range.removeEventListener("pointerup", stop);
      range.removeEventListener("pointercancel", stop);
    };

    event.preventDefault();
    range.setPointerCapture?.(event.pointerId);
    move(event);
    range.addEventListener("pointermove", move);
    range.addEventListener("pointerup", stop);
    range.addEventListener("pointercancel", stop);
  }

  function addIngredient(name) {
    recipeEngine.toggleIngredient(state.cup, name);
    state.lastResult = null;
    ui.render();
  }

  function removeIngredient(index) {
    recipeEngine.removeIngredient(state.cup, index);
    state.lastResult = null;
    ui.render();
  }

  function randomCup() {
    state.cup = recipeEngine.randomCup(groups);
    state.lastResult = null;
    ui.render();
  }

  function clearCup() {
    recipeEngine.clearCup(state.cup);
    state.lastResult = null;
    ui.render();
  }

  function saveRecipe() {
    if (!canTaste()) return;
    const result = state.lastResult || evaluateCup(state.cup);
    if (!result) return;
    const recipes = saveStorage.getRecipes();
    const title = `${result.type} ${result.score}分`;
    recipes.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      createdAt: new Date().toLocaleString("zh-CN"),
      cup: recipeNormalizer.serializeCupForSave(state.cup),
      result
    });
    saveStorage.setRecipes(recipes.slice(0, 24));
    state.lastResult = result;
    ui.renderTasteReport(result);
    ui.openSavedDialog();
  }

  function loadRecipe(recipe) {
    state.cup = recipeNormalizer.normalizeSavedRecipe(recipe).cup;
    state.lastResult = recipe.result;
    ui.render();
    ui.renderTasteReport(recipe.result);
    el.savedDialog.close();
  }

  el.groups.addEventListener("click", event => {
    const button = event.target.closest(".ingredient");
    if (!button) return;
    addIngredient(button.dataset.name);
  });

  el.cupList.addEventListener("input", event => {
    const row = event.target.closest(".cup-item");
    if (!row) return;
    const index = Number(row.dataset.index);
    if (event.target.classList.contains("ratio-input")) {
      const number = row.querySelector(".ratio-number");
      updateIngredientRatio(index, Number(event.target.value), { syncNumber: number, syncRange: event.target });
    }
    if (event.target.classList.contains("ratio-number")) {
      const range = row.querySelector(".ratio-input");
      updateIngredientRatio(index, Number(event.target.value || 0), { syncRange: range });
    }
  });

  el.cupList.addEventListener("pointerdown", event => {
    if (!event.target.classList.contains("ratio-input")) return;
    const row = event.target.closest(".cup-item");
    if (!row) return;
    bindRatioDrag(event.target, row.querySelector(".ratio-number"), Number(row.dataset.index), event);
  });

  el.cupList.addEventListener("click", event => {
    const remove = event.target.closest('[data-action="remove-ingredient"]');
    if (!remove) return;
    const row = remove.closest(".cup-item");
    if (!row) return;
    removeIngredient(Number(row.dataset.index));
  });

  el.tasteBtn.addEventListener("click", () => {
    state.lastResult = evaluateCup(state.cup);
    ui.renderTasteReport(state.lastResult);
  });

  el.randomBtn.addEventListener("click", randomCup);

  el.balanceBtn.addEventListener("click", () => {
    recipeEngine.normalizeRatios(state.cup);
    state.lastResult = null;
    ui.render();
  });

  el.clearBtn.addEventListener("click", clearCup);
  el.saveBtn.addEventListener("click", saveRecipe);
  el.savedBtn.addEventListener("click", ui.openSavedDialog);
  el.closeSaved.addEventListener("click", () => el.savedDialog.close());

  el.savedDialog.addEventListener("click", event => {
    if (event.target === el.savedDialog) el.savedDialog.close();
  });

  el.savedList.addEventListener("click", event => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const card = actionButton.closest(".saved-card");
    if (!card) return;
    const recipe = saveStorage.getRecipes().find(item => item.id === card.dataset.recipeId);
    if (!recipe) return;

    if (actionButton.dataset.action === "load") {
      loadRecipe(recipe);
      return;
    }

    if (actionButton.dataset.action === "delete") {
      saveStorage.deleteRecipe(recipe.id);
      ui.renderSavedRecipes(saveStorage.getRecipes());
    }
  });

  return {
    updateIngredientRatio,
    addIngredient,
    removeIngredient,
    randomCup,
    clearCup,
    saveRecipe,
    loadRecipe,
    totalRatio,
    canTaste
  };
}

window.MILK_TEA_LAB_EVENTS = {
  bindDomEvents
};
})();
