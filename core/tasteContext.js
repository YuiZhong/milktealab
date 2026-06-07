(function() {
const { groups } = window.MILK_TEA_LAB_INGREDIENTS;
const { displayName } = window.MILK_TEA_LAB_HELPERS;
const ingredientRegistry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;
const categoryByName = new Map(groups.flatMap(group => group.items.map(item => [item, group.name])));

function getStableCategoryId(meta, item = {}) {
  const ingredientId = meta?.id || item.ingredientId || "";
  if (ingredientId.startsWith("tea_")) return "tea";
  if (ingredientId.startsWith("dairy_")) return "dairy";
  if (ingredientId.startsWith("topping_")) return "topping";
  if (ingredientId.startsWith("fruit_") || ingredientId.startsWith("flavor_")) return "flavor";
  if (ingredientId.startsWith("liquid_")) return "liquid";
  if (ingredientId.startsWith("sweetener_") || ingredientId.startsWith("seasoning_")) return "seasoning";
  return null;
}

function createTasteContext(cup) {
  const activeCup = cup
    .filter(item => item.ratio > 0)
    .map(item => {
      const meta = ingredientRegistry?.normalizeIngredientRef(item.ingredientId ? { ingredientId: item.ingredientId } : { name: displayName(item.name) });
      const name = meta?.name || displayName(item.name);
      return {
        ...item,
        name,
        ingredientId: meta?.id || item.ingredientId || null,
        categoryId: getStableCategoryId(meta, item),
        category: meta?.category || categoryByName.get(name) || item.category || null
      };
    });
  const names = activeCup.map(item => item.name);
  const normalizedNames = activeCup.map(item => item.name === "奶精" ? "植脂奶" : item.name);
  const ingredientIds = activeCup.map(item => item.ingredientId).filter(Boolean);
  const normalizedIngredientIds = ingredientIds;

  function totalRatio(items = activeCup) {
    return items.reduce((sum, item) => sum + item.ratio, 0);
  }

  function ratioOf(name) {
    if (name === "植脂奶") {
      return activeCup.find(item => item.name === "植脂奶" || item.name === "奶精")?.ratio || 0;
    }
    return activeCup.find(item => item.name === name)?.ratio || 0;
  }

  function ratioOfId(ingredientId) {
    return activeCup.find(item => item.ingredientId === ingredientId)?.ratio || 0;
  }

  function ratioOfRef(ref) {
    const meta = ingredientRegistry?.normalizeIngredientRef(ref);
    if (!meta) return 0;
    return ratioOfId(meta.id);
  }

  function sumRatios(targetNames) {
    return activeCup.reduce((sum, item) => {
      const normalizedName = item.name === "奶精" ? "植脂奶" : item.name;
      return sum + (targetNames.includes(normalizedName) ? item.ratio : 0);
    }, 0);
  }

  function sumRatiosByIds(ids) {
    return ids.reduce((sum, id) => sum + ratioOfId(id), 0);
  }

  function sumRatiosByRefs(refs) {
    return refs.reduce((sum, ref) => sum + ratioOfRef(ref), 0);
  }

  function hasIngredientRef(ref) {
    return ratioOfRef(ref) > 0;
  }

  function countByCategory(categoryName) {
    // Legacy display-label compatibility only. Runtime scoring should prefer countByCategoryId.
    return activeCup.filter(item => item.category === categoryName || categoryByName.get(item.name) === categoryName).length;
  }

  function countByCategoryId(categoryId) {
    return activeCup.filter(item => item.categoryId === categoryId).length;
  }

  return {
    activeCup,
    names,
    normalizedNames,
    ingredientIds,
    normalizedIngredientIds,
    categoryByName,
    totalRatio,
    ratioOf,
    ratioOfId,
    ratioOfRef,
    sumRatios,
    sumRatiosByIds,
    sumRatiosByRefs,
    hasIngredientRef,
    countByCategory,
    countByCategoryId
  };
}

window.MILK_TEA_LAB_TASTE_CONTEXT = {
  createTasteContext
};
})();
