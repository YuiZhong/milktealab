(function() {
const ingredientRegistry = window.MILK_TEA_LAB_INGREDIENT_REGISTRY;
const { displayName } = window.MILK_TEA_LAB_HELPERS;

function getItemRefs(item) {
  if (!item || typeof item !== "object") return [];

  const refs = [];
  if (item.ingredientId) refs.push({ ingredientId: item.ingredientId });
  if (item.ingredientRef) refs.push(item.ingredientRef);
  if (item.id) refs.push({ id: item.id });
  if (item.name) refs.push({ name: displayName(item.name) });
  return refs;
}

function resolveItemMeta(item) {
  const refs = getItemRefs(item);
  for (const ref of refs) {
    const meta = ingredientRegistry?.normalizeIngredientRef(ref);
    if (meta) return meta;
  }
  return null;
}

function getFallbackName(item) {
  if (!item || typeof item !== "object") return "";
  if (item.name) return displayName(item.name);
  if (typeof item.ingredientRef === "string") return displayName(item.ingredientRef);
  if (item.ingredientId) return item.ingredientId;
  if (item.id) return item.id;
  return "";
}

function normalizeSavedCupItem(item) {
  const source = item && typeof item === "object" ? item : {};
  const meta = resolveItemMeta(source);
  const ratio = source.ratio ?? 0;

  if (meta) {
    return {
      ingredientId: meta.id,
      name: meta.name,
      ratio
    };
  }

  const fallbackName = getFallbackName(source);
  const normalized = {
    name: fallbackName,
    ratio
  };

  if (source.ingredientId) {
    normalized.ingredientId = source.ingredientId;
  }

  return normalized;
}

function normalizeSavedCup(cup) {
  return Array.isArray(cup) ? cup.map(normalizeSavedCupItem) : [];
}

function normalizeSavedRecipe(recipe) {
  const source = recipe && typeof recipe === "object" ? recipe : {};
  return {
    ...source,
    cup: normalizeSavedCup(source.cup)
  };
}

function serializeCupForSave(cup) {
  return normalizeSavedCup(cup);
}

window.MILK_TEA_LAB_RECIPE_NORMALIZER = {
  normalizeSavedCupItem,
  normalizeSavedCup,
  normalizeSavedRecipe,
  serializeCupForSave
};
})();
