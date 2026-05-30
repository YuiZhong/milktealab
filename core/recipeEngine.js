(function() {
const { clamp, displayName } = window.MILK_TEA_LAB_HELPERS;

window.MILK_TEA_LAB_RECIPE_ENGINE = {
  totalRatio(cup) {
    return cup.reduce((sum, item) => sum + item.ratio, 0);
  },

  canTaste(cup) {
    return cup.length > 0 && this.totalRatio(cup) === 100;
  },

  maxRatioForIndex(cup, index) {
    const item = cup[index];
    if (!item) return 0;
    return clamp(100 - (this.totalRatio(cup) - item.ratio), 0, 100);
  },

  normalizeRatios(cup) {
    if (!cup.length) return;
    const currentTotal = this.totalRatio(cup);
    if (currentTotal <= 0) {
      const even = Math.floor(100 / cup.length);
      cup.forEach((item, index) => {
        item.ratio = index === cup.length - 1 ? 100 - even * (cup.length - 1) : even;
      });
      return;
    }

    let remaining = 100;
    cup.forEach((item, index) => {
      if (index === cup.length - 1) {
        item.ratio = remaining;
      } else {
        item.ratio = Math.max(1, Math.round((item.ratio / currentTotal) * 100));
        remaining -= item.ratio;
      }
    });

    if (remaining < 0) {
      cup[cup.length - 1].ratio = Math.max(1, cup[cup.length - 1].ratio + remaining);
      this.normalizeRatios(cup);
    }
  },

  updateIngredientRatio(cup, index, nextRatio) {
    const item = cup[index];
    if (!item) return 0;
    item.ratio = clamp(Math.round(nextRatio), 0, this.maxRatioForIndex(cup, index));
    return item.ratio;
  },

  toggleIngredient(cup, name) {
    const normalizedName = displayName(name);
    const existing = cup.find(item => displayName(item.name) === normalizedName);
    if (existing) {
      cup.splice(cup.indexOf(existing), 1);
      return;
    }
    cup.push({ name: normalizedName, ratio: Math.min(10, Math.max(0, 100 - this.totalRatio(cup))) });
  },

  removeIngredient(cup, index) {
    cup.splice(index, 1);
  },

  clearCup(cup) {
    cup.splice(0, cup.length);
  },

  randomCup(groups) {
    const allItems = groups.flatMap(group => group.items);
    const count = 3 + Math.floor(Math.random() * 4);
    const shuffled = [...allItems].sort(() => Math.random() - 0.5).slice(0, count);
    const cup = shuffled.map(name => ({ name: displayName(name), ratio: 10 + Math.floor(Math.random() * 35) }));
    this.normalizeRatios(cup);
    return cup;
  }
};
})();
