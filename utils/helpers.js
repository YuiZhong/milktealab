window.MILK_TEA_LAB_HELPERS = {
  clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  },

  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  },

  displayName(name) {
    return name === "奶精" ? "植脂奶" : name;
  },

  has(name, names) {
    return names.includes(name);
  },

  hasAny(names, candidates) {
    return candidates.some(name => names.includes(name));
  }
};
