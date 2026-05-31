(function() {
const { groups } = window.MILK_TEA_LAB_INGREDIENTS;
const { displayName } = window.MILK_TEA_LAB_HELPERS;
const categoryByName = new Map(groups.flatMap(group => group.items.map(item => [item, group.name])));

function createTasteContext(cup) {
  const activeCup = cup.map(item => ({ ...item, name: displayName(item.name) }));
  const names = activeCup.map(item => item.name);
  const normalizedNames = activeCup.map(item => item.name === "奶精" ? "植脂奶" : item.name);

  function totalRatio(items = activeCup) {
    return items.reduce((sum, item) => sum + item.ratio, 0);
  }

  function ratioOf(name) {
    if (name === "植脂奶") {
      return activeCup.find(item => item.name === "植脂奶" || item.name === "奶精")?.ratio || 0;
    }
    return activeCup.find(item => item.name === name)?.ratio || 0;
  }

  function sumRatios(targetNames) {
    return activeCup.reduce((sum, item) => {
      const normalizedName = item.name === "奶精" ? "植脂奶" : item.name;
      return sum + (targetNames.includes(normalizedName) ? item.ratio : 0);
    }, 0);
  }

  function countByCategory(categoryName) {
    return activeCup.filter(item => categoryByName.get(item.name) === categoryName).length;
  }

  return {
    activeCup,
    names,
    normalizedNames,
    categoryByName,
    totalRatio,
    ratioOf,
    sumRatios,
    countByCategory
  };
}

window.MILK_TEA_LAB_TASTE_CONTEXT = {
  createTasteContext
};
})();
