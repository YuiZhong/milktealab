(function(root) {
const { ingredientMeta = {} } = root.MILK_TEA_LAB_INGREDIENTS || {};
const byId = new Map();
const byName = new Map();
const byAlias = new Map();
const aliasConflicts = [];

function cloneMeta(meta) {
  if (!meta) return null;
  return {
    id: meta.id,
    name: meta.name,
    aliases: [...(meta.aliases || [])],
    category: meta.category
  };
}

function addAlias(alias, meta) {
  if (!byAlias.has(alias)) {
    byAlias.set(alias, meta);
    return;
  }

  const existing = byAlias.get(alias);
  if (existing.id !== meta.id) {
    aliasConflicts.push({
      alias,
      ids: [existing.id, meta.id],
      names: [existing.name, meta.name]
    });
  }
}

Object.values(ingredientMeta).forEach(meta => {
  if (!meta) return;
  if (meta.id && !byId.has(meta.id)) byId.set(meta.id, meta);
  if (meta.name && !byName.has(meta.name)) byName.set(meta.name, meta);
  if (Array.isArray(meta.aliases)) {
    meta.aliases.forEach(alias => addAlias(alias, meta));
  }
});

function getIngredientById(id) {
  return cloneMeta(byId.get(id));
}

function getIngredientByName(name) {
  return cloneMeta(byName.get(name));
}

function getIngredientByAlias(alias) {
  return cloneMeta(byAlias.get(alias));
}

function normalizeIngredientRef(ref) {
  if (!ref) return null;

  if (typeof ref === "string") {
    return getIngredientById(ref) || getIngredientByName(ref) || getIngredientByAlias(ref);
  }

  if (typeof ref === "object") {
    if (ref.id) return getIngredientById(ref.id);
    if (ref.ingredientId) return getIngredientById(ref.ingredientId);
    if (ref.name) return getIngredientByName(ref.name) || getIngredientByAlias(ref.name);
  }

  return null;
}

function getIngredientId(ref) {
  return normalizeIngredientRef(ref)?.id || null;
}

function getIngredientName(ref) {
  return normalizeIngredientRef(ref)?.name || null;
}

function getIngredientCategory(ref) {
  return normalizeIngredientRef(ref)?.category || null;
}

function listIngredients() {
  return Object.values(ingredientMeta).map(cloneMeta);
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  values.forEach(value => {
    if (!value) return;
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  });
  return [...repeated];
}

function validateIngredientRegistry() {
  const metas = Object.values(ingredientMeta);
  const ids = metas.map(meta => meta?.id);
  const names = metas.map(meta => meta?.name);
  const result = {
    ok: true,
    total: metas.length,
    uniqueIds: new Set(ids.filter(Boolean)).size,
    duplicateIds: duplicates(ids),
    missingIds: metas.filter(meta => !meta?.id).map(meta => meta?.name || "(unknown)"),
    missingNames: metas.filter(meta => !meta?.name).map(meta => meta?.id || "(unknown)"),
    missingAliasesArray: metas.filter(meta => !Array.isArray(meta?.aliases)).map(meta => meta?.name || meta?.id || "(unknown)"),
    chineseIds: metas.filter(meta => /[\u4e00-\u9fff]/.test(meta?.id || "")).map(meta => meta.id),
    numericIds: metas.filter(meta => /^\d+$/.test(meta?.id || "")).map(meta => meta.id),
    emptyIds: metas.filter(meta => meta?.id === "").map(meta => meta?.name || "(unknown)"),
    duplicateNames: duplicates(names),
    aliasConflicts: aliasConflicts.map(conflict => ({
      alias: conflict.alias,
      ids: [...conflict.ids],
      names: [...conflict.names]
    }))
  };

  result.ok = [
    result.duplicateIds,
    result.missingIds,
    result.missingNames,
    result.missingAliasesArray,
    result.chineseIds,
    result.numericIds,
    result.emptyIds,
    result.duplicateNames,
    result.aliasConflicts
  ].every(list => list.length === 0);

  return result;
}

root.MILK_TEA_LAB_INGREDIENT_REGISTRY = {
  getIngredientById,
  getIngredientByName,
  getIngredientByAlias,
  getIngredientId,
  getIngredientName,
  getIngredientCategory,
  normalizeIngredientRef,
  listIngredients,
  validateIngredientRegistry
};

if (typeof module !== "undefined") {
  module.exports = root.MILK_TEA_LAB_INGREDIENT_REGISTRY;
}
})(typeof window !== "undefined" ? window : globalThis);
