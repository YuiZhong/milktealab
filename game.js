const { groups, baseProfiles } = window.MILK_TEA_LAB_INGREDIENTS;
const {
  comboRules,
  heavyFlavorNames,
  dairyNames,
  highFatDairyNames,
  strawResistanceNames,
  clearLiquidNames
} = window.MILK_TEA_LAB_SYNERGY_RULES;
const { feedbackPools } = window.MILK_TEA_LAB_FEEDBACK_TEXTS;
const categoryByName = new Map(groups.flatMap(group => group.items.map(item => [item, group.name])));

const state = {
  cup: [],
  lastResult: null
};

const el = {
  groups: document.querySelector("#ingredient-groups"),
  ingredientCount: document.querySelector("#ingredient-count"),
  cupList: document.querySelector("#cup-list"),
  totalRatio: document.querySelector("#total-ratio"),
  cupTitle: document.querySelector("#cup-title"),
  cupNote: document.querySelector("#cup-note"),
  visualFill: document.querySelector(".visual-fill"),
  visualToppings: document.querySelector("#visual-toppings"),
  tasteBtn: document.querySelector("#taste-btn"),
  randomBtn: document.querySelector("#random-btn"),
  balanceBtn: document.querySelector("#balance-btn"),
  clearBtn: document.querySelector("#clear-btn"),
  saveBtn: document.querySelector("#save-btn"),
  savedBtn: document.querySelector("#saved-btn"),
  result: document.querySelector("#result"),
  resultEmpty: document.querySelector("#result-empty"),
  scorePill: document.querySelector("#score-pill"),
  drinkType: document.querySelector("#drink-type"),
  scoreValue: document.querySelector("#score-value"),
  feedback: document.querySelector("#feedback"),
  audienceTags: document.querySelector("#audience-tags"),
  attributeBars: document.querySelector("#attribute-bars"),
  savedDialog: document.querySelector("#saved-dialog"),
  savedList: document.querySelector("#saved-list"),
  closeSaved: document.querySelector("#close-saved")
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function displayName(name) {
  return name === "奶精" ? "植脂奶" : name;
}

function totalRatio() {
  return state.cup.reduce((sum, item) => sum + item.ratio, 0);
}

function canTaste() {
  return state.cup.length > 0 && totalRatio() === 100;
}

function maxRatioForIndex(index) {
  const item = state.cup[index];
  if (!item) return 0;
  return clamp(100 - (totalRatio() - item.ratio), 0, 100);
}

function normalizeRatios() {
  if (!state.cup.length) return;
  const currentTotal = totalRatio();
  if (currentTotal <= 0) {
    const even = Math.floor(100 / state.cup.length);
    state.cup.forEach((item, index) => {
      item.ratio = index === state.cup.length - 1 ? 100 - even * (state.cup.length - 1) : even;
    });
    return;
  }

  let remaining = 100;
  state.cup.forEach((item, index) => {
    if (index === state.cup.length - 1) {
      item.ratio = remaining;
    } else {
      item.ratio = Math.max(1, Math.round((item.ratio / currentTotal) * 100));
      remaining -= item.ratio;
    }
  });

  if (remaining < 0) {
    state.cup[state.cup.length - 1].ratio = Math.max(1, state.cup[state.cup.length - 1].ratio + remaining);
    normalizeRatios();
  }
}

function updateIngredientRatio(index, nextRatio, options = {}) {
  const item = state.cup[index];
  if (!item) return;
  item.ratio = clamp(Math.round(nextRatio), 0, maxRatioForIndex(index));
  state.lastResult = null;
  renderCupMeta();
  syncRatioControls();
  renderResult(null);
  if (options.syncNumber) options.syncNumber.value = item.ratio;
  if (options.syncRange) options.syncRange.value = item.ratio;
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

function valueFromPointer(range, event) {
  const rect = range.getBoundingClientRect();
  const position = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  return Math.round(position * 100);
}

function bindRatioDrag(range, number, index) {
  const move = event => {
    event.preventDefault();
    updateIngredientRatio(index, valueFromPointer(range, event), { syncNumber: number, syncRange: range });
  };

  const stop = event => {
    event.preventDefault();
    range.releasePointerCapture?.(event.pointerId);
    range.removeEventListener("pointermove", move);
    range.removeEventListener("pointerup", stop);
    range.removeEventListener("pointercancel", stop);
  };

  range.addEventListener("pointerdown", event => {
    event.preventDefault();
    range.setPointerCapture?.(event.pointerId);
    move(event);
    range.addEventListener("pointermove", move);
    range.addEventListener("pointerup", stop);
    range.addEventListener("pointercancel", stop);
  });
}

function addIngredient(name) {
  const normalizedName = name === "奶精" ? "植脂奶" : name;
  const existing = state.cup.find(item => item.name === normalizedName || item.name === name);
  if (existing) {
    const index = state.cup.indexOf(existing);
    existing.ratio = clamp(existing.ratio + 10, 0, maxRatioForIndex(index));
  } else {
    state.cup.push({ name: normalizedName, ratio: Math.min(10, Math.max(0, 100 - totalRatio())) });
  }
  state.lastResult = null;
  render();
}

function removeIngredient(index) {
  state.cup.splice(index, 1);
  state.lastResult = null;
  render();
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
      button.textContent = name;
      button.addEventListener("click", () => addIngredient(name));
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
    range.addEventListener("input", event => {
      updateIngredientRatio(index, Number(event.target.value), { syncNumber: number, syncRange: range });
    });

    const number = document.createElement("input");
    number.className = "ratio-number";
    number.type = "number";
    number.min = "0";
    number.max = String(maxRatioForIndex(index));
    number.value = item.ratio;
    number.addEventListener("input", event => {
      updateIngredientRatio(index, Number(event.target.value || 0), { syncRange: range });
    });
    bindRatioDrag(range, number, index);

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.type = "button";
    remove.setAttribute("aria-label", `删除${displayName(item.name)}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => removeIngredient(index));

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

function has(name, names) {
  return names.includes(name);
}

function ratioOf(name) {
  if (name === "植脂奶") {
    return state.cup.find(item => item.name === "植脂奶" || item.name === "奶精")?.ratio || 0;
  }
  return state.cup.find(item => item.name === name)?.ratio || 0;
}

function sumRatios(names) {
  return state.cup.reduce((sum, item) => sum + (names.includes(item.name === "奶精" ? "植脂奶" : item.name) ? item.ratio : 0), 0);
}

function applyAttributeBoost(attr, boost) {
  Object.entries(boost).forEach(([key, value]) => {
    attr[key] += value;
  });
}

function detectAccidents() {
  const accidents = [];
  const lemon = ratioOf("柠檬");
  const durian = ratioOf("榴莲");
  const taro = ratioOf("芋泥");
  const oreo = ratioOf("奥利奥碎");
  const cream = ratioOf("淡奶油");
  const thickMilk = ratioOf("厚乳");
  const plantMilk = ratioOf("植脂奶");
  const heavyTotal = sumRatios(heavyFlavorNames);
  const dairyTotal = sumRatios(dairyNames);
  const highFatDairyTotal = sumRatios(highFatDairyNames);
  const strawTotal = sumRatios(strawResistanceNames);
  const clearTotal = sumRatios(clearLiquidNames);

  if (lemon > 80) {
    accidents.push({
      type: "口感事故",
      cap: 18,
      score: -82,
      add: { acid: 70, odd: 42, fresh: -18, difficulty: 18 },
      note: pick([
        "柠檬比例已经不是清爽，是酸度爆炸。试喝员脸皱到不适合正常饮用。",
        "这不是清爽，是柠檬在杯子里发动总攻。",
        "酸度已经不是提神，是在和味蕾打架。"
      ])
    });
  } else if (lemon > 50) {
    accidents.push({
      type: "口感事故",
      cap: 42,
      score: -46,
      add: { acid: 44, odd: 24, fresh: -8, difficulty: 12 },
      note: pick([
        "柠檬占比太高，酸得很有攻击性，清爽感已经被挤到门外了。",
        "酸度已经不是提神，是在和味蕾打架。"
      ])
    });
  }

  if (durian >= 80) {
    accidents.push({
      type: "猎奇实验品",
      cap: 22,
      score: -70,
      add: { odd: 75, thick: 32, greasy: 32, straw: 28, fruit: 12, difficulty: 22 },
      note: pick([
        "榴莲味很有主见，已经把其他材料全部开除了。",
        "这杯不是喝进去的，是被榴莲缓慢推进食道的。",
        "榴莲已经不是风味了，是杯子里的主要建筑材料。"
      ])
    });
  } else if (durian > 50) {
    accidents.push({
      type: "猎奇实验品",
      cap: 45,
      score: -38,
      add: { odd: 48, thick: 18, greasy: 18, straw: 16, fruit: 10, difficulty: 14 },
      note: pick([
        "榴莲香气冲击过强，普通客群建议先在门口做心理建设。",
        "吸管吸到一半开始怀疑自己是不是在挖矿。"
      ])
    });
  }

  if ((dairyTotal > 75 && highFatDairyTotal > 50) || cream > 50 || thickMilk > 60) {
    const severe = cream > 65 || thickMilk > 68 || highFatDairyTotal > 80;
    accidents.push({
      type: "奶脂过载",
      cap: severe ? 34 : 48,
      score: severe ? -38 : -18,
      add: { greasy: severe ? 72 : 50, thick: severe ? 38 : 24, milk: 20, fresh: -28, difficulty: 12, cost: 12 },
      note: pick([
        "第一口像奖励，第二口像惩罚，第三口开始怀疑人生。",
        "奶味不是越多越好，这杯已经把幸福熬成了负担。",
        "喝第一口很快乐，喝第二口开始想找热水。",
        "这杯不像饮料，像把蛋糕上的奶油刮下来冲开了。",
        "试喝员喝完沉默了，不是难喝，是太沉重。",
        "它不是吸不上来，是喝下去以后不太下得去。",
        "奶脂感已经不是香，是压迫。",
        "喝完胃里像开了一场奶油年会。",
        "快乐是真的，负担也是真的。"
      ])
    });
  }

  if (plantMilk > 45 || (plantMilk > 30 && dairyTotal > 0 && plantMilk / dairyTotal > 0.55)) {
    accidents.push({
      type: "工业奶茶",
      cap: plantMilk > 65 ? 52 : 62,
      score: plantMilk > 65 ? -22 : -12,
      add: { milk: 12, greasy: 24, odd: 24, cost: -12, photo: -10, difficulty: -4 },
      note: pick([
        "一股子廉价味，像便利店第二排最便宜的饮料。",
        "奶味是有了，但像是从配料表里硬挤出来的。",
        "这杯喝起来很努力地想装成牛奶。",
        "试喝员看了一眼配料，开始担心自己的体检报告。",
        "这绝对对健康有害吧？",
        "喝完感觉配料表在报警。",
        "它不是不好喝，是有一种很熟悉的工业快乐。",
        "奶感很努力，但努力得有点塑料。"
      ])
    });
  }

  if (taro > 45) {
    accidents.push({
      type: "实验特调",
      cap: 52,
      score: -24,
      add: { thick: 28, straw: 34, odd: 12, difficulty: 14 },
      note: pick([
        "芋泥比例太高，稠度明显上升，这杯已经开始不太愿意流动。",
        "这杯芋泥含量高到像在喝装修前的墙面。"
      ])
    });
  }

  if (oreo > 35) {
    accidents.push({
      type: "口感事故",
      cap: oreo > 60 ? 32 : 48,
      score: oreo > 60 ? -44 : -24,
      add: { straw: 42, thick: 16, odd: 18, difficulty: 14 },
      note: "奥利奥碎比例太高，喝起来像在用吸管开采甜品矿层。"
    });
  }

  ["珍珠", "芋圆", "布丁", "仙草", "椰果"].forEach(name => {
    const ratio = ratioOf(name);
    if (ratio > 45) {
      accidents.push({
        type: "实验特调",
        cap: ratio > 65 ? 38 : 55,
        score: ratio > 65 ? -34 : -18,
        add: { straw: 34, thick: 8, difficulty: 12 },
        note: `${name}比例太高，已经不是加小料，是给吸管安排体能测试。`
      });
    }
  });

  const strongFlavor = ["抹茶", "可可", "咖啡"].find(name => ratioOf(name) > 60);
  if (strongFlavor) {
    accidents.push({
      type: "实验特调",
      cap: 55,
      score: -24,
      add: { odd: 20, thick: 12, difficulty: 10 },
      note: `${strongFlavor}比例太猛，整杯饮料被它一个人拿着话筒开演唱会。`
    });
  }

  if ((strawTotal >= 52 && clearTotal <= 25) || (strawTotal >= 68 && clearTotal <= 40) || (strawTotal >= 45 && heavyTotal >= 48 && clearTotal <= 35)) {
    accidents.push({
      type: "口感事故",
      cap: strawTotal >= 68 || (strawTotal >= 45 && heavyTotal >= 48) ? 25 : 36,
      score: strawTotal >= 68 || (strawTotal >= 45 && heavyTotal >= 48) ? -62 : -42,
      add: { straw: 62, thick: heavyTotal >= 45 ? 34 : 16, odd: 34, difficulty: 25, fresh: -18 },
      note: pick([
        "这杯不是饮料，是需要装修队施工的半固体。",
        "吸管刚插进去就提交了辞职信。",
        "试喝员努力吸了一口，结果只吸到了人生的阻力。",
        "建议改名叫可食用水泥，至少比较诚实。",
        "它不是难喝，它是物理意义上很难喝到。"
      ])
    });
  }

  return accidents;
}

function evaluateCup() {
  if (!canTaste()) return null;

  const names = state.cup.map(item => item.name);
  const normalizedNames = state.cup.map(item => item.name === "奶精" ? "植脂奶" : item.name);
  const attr = {
    fresh: 10,
    thick: 8,
    sweet: 6,
    acid: 0,
    tea: 0,
    milk: 0,
    fruit: 0,
    bubble: 0,
    straw: 0,
    greasy: 0,
    odd: 0,
    cost: 0,
    difficulty: 0,
    photo: 8
  };
  let score = 54;
  const accidentNotes = [];
  const badNotes = [];
  const goodNotes = [];
  const generalNotes = [];
  let forcedType = null;
  let scoreCap = 100;

  state.cup.forEach(item => {
    const profile = baseProfiles[item.name === "奶精" ? "植脂奶" : item.name] || {};
    const weight = item.ratio / 32;
    Object.keys(attr).forEach(key => {
      attr[key] += (profile[key] || 0) * weight;
    });
  });

  const accidents = detectAccidents().sort((left, right) => left.cap - right.cap);
  accidents.forEach(accident => {
    score += accident.score;
    scoreCap = Math.min(scoreCap, accident.cap);
    forcedType = forcedType || accident.type;
    applyAttributeBoost(attr, accident.add);
    accidentNotes.push(accident.note);
  });

  comboRules.filter(rule => rule.kind === "bad").forEach(rule => {
    if (rule.names.every(name => has(name, names))) {
      score += rule.score;
      applyAttributeBoost(attr, rule.add);
      forcedType = forcedType || (rule.names.includes("柠檬") && rule.names.includes("牛奶") ? "口感事故" : "猎奇实验品");
      badNotes.push(rule.note);
    }
  });

  if (!accidents.length && !badNotes.length) {
    comboRules.filter(rule => rule.kind === "good").forEach(rule => {
      if (rule.names.every(name => has(name, names))) {
        score += rule.score;
        applyAttributeBoost(attr, rule.add);
        goodNotes.push(rule.note);
      }
    });
  }

  const teaCount = state.cup.filter(item => categoryByName.get(item.name) === "茶类").length;
  const toppingCount = state.cup.filter(item => categoryByName.get(item.name) === "小料").length;
  const dairyCount = state.cup.filter(item => categoryByName.get(item.name) === "乳类").length;
  const flavorCount = state.cup.filter(item => categoryByName.get(item.name) === "水果/风味").length;

  if (teaCount >= 3) {
    attr.odd += 24 + (teaCount - 3) * 8;
    attr.tea += 10;
    attr.difficulty += 9;
    score -= 16;
    generalNotes.push("三种以上茶类同时开麦，茶味已经从合唱变成辩论赛。");
  }
  if (toppingCount >= 3) {
    attr.thick += 16;
    attr.difficulty += 8;
    score -= 7;
    generalNotes.push("小料很多，喝一口像在杯子里寻宝，也像在做咀嚼训练。");
  }
  if (dairyCount >= 3) {
    attr.thick += 14;
    attr.milk += 10;
    attr.odd += 8;
    score -= 6;
  }
  if (flavorCount >= 4) {
    attr.fruit += 14;
    attr.odd += 10;
    score -= 7;
  }

  const hasMilkFatAccident = accidents.some(accident => accident.type === "奶脂过载");

  if (attr.thick >= 70 && attr.straw < 48 && !hasMilkFatAccident) {
    attr.fresh -= 18;
    attr.cost += 8;
    attr.difficulty += 6;
    attr.greasy += 10;
    score -= 10;
    generalNotes.push(pick([
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "好喝是好喝，就是喝完胃可能想请半天假。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "它不像奶茶，更像一份假装成饮料的甜品。",
      "第一口很幸福，第三口开始需要勇气。"
    ]));
  }

  score += attr.fresh * 0.12 + attr.photo * 0.06 + Math.min(attr.tea, 60) * 0.06 + Math.min(attr.milk, 60) * 0.06;
  score -= Math.max(0, attr.sweet - 68) * 0.22;
  score -= Math.max(0, attr.thick - 76) * 0.2;
  score -= Math.max(0, attr.straw - 62) * 0.34;
  score -= Math.max(0, attr.greasy - 68) * 0.32;
  score -= attr.odd * 0.45;
  score -= Math.max(0, state.cup.length - 6) * 6;

  Object.keys(attr).forEach(key => {
    attr[key] = Math.round(clamp(attr[key]));
  });

  const finalScore = Math.round(clamp(Math.min(score, scoreCap)));
  const type = forcedType || inferType(attr, normalizedNames, finalScore);
  const audience = inferAudience(attr, normalizedNames, finalScore);
  const priorityNotes = accidentNotes.length
    ? accidentNotes
    : badNotes.length
      ? badNotes
      : goodNotes.length
        ? goodNotes
        : generalNotes;
  const feedback = makeFeedback(attr, finalScore, priorityNotes, accidents.length > 0);

  return { attr, score: finalScore, type, audience, feedback };
}

function inferType(attr, names, score) {
  if (attr.straw >= 70 || (score < 38 && attr.straw >= 55)) return "口感事故";
  if (attr.greasy >= 78 && attr.straw < 50) return "奶脂过载";
  if (attr.thick >= 68 && attr.straw < 50 && attr.odd < 58) return "甜品奶昔";
  if (attr.odd >= 62 || score < 38) return "猎奇实验品";
  if (has("气泡水", names) && has("柠檬", names)) return "清爽水果茶";
  if (attr.bubble >= 36 && attr.fruit >= 26 && attr.fresh >= 42) return "清爽水果茶";
  if (has("乌龙茶", names) && (has("厚乳", names) || has("奶盖", names)) && attr.odd < 45) return "高级厚乳款";
  if (attr.tea >= 30 && attr.milk >= 26 && attr.odd < 45) return "经典奶茶";
  if (has("咖啡", names) && attr.milk >= 18) return "咖啡特调";
  if (attr.thick >= 50 && (attr.fruit >= 25 || attr.sweet >= 45)) return "甜品奶昔";
  if (attr.fruit >= 35 && attr.fresh >= 34) return "果味特调";
  if (attr.tea >= 34 && attr.fresh >= 28) return "茶香轻饮";
  return "实验特调";
}

function inferAudience(attr, names, score) {
  const audience = [];
  const plantMilk = has("植脂奶", names);
  if (score >= 58 && attr.cost <= 55) audience.push("学生");
  if (score >= 60 && attr.sweet <= 58 && !plantMilk) audience.push("白领");
  if (attr.sweet <= 35 && attr.bubble <= 25 && attr.odd <= 25 && attr.greasy < 55 && !plantMilk) audience.push("老人");
  if (attr.photo >= 48 || (attr.fruit >= 35 && attr.milk >= 24)) audience.push("情侣");
  if (attr.sweet <= 30 && attr.thick <= 38 && !plantMilk) audience.push("健身党");
  if (attr.odd >= 48 || has("榴莲", names)) audience.push("猎奇党");
  if (attr.photo >= 52 || attr.odd >= 55) audience.push("网红打卡党");
  if (!audience.length) {
    if (plantMilk) {
      audience.push("学生");
    } else if (attr.greasy >= 65) {
      audience.push("学生");
    } else {
      audience.push("学生", "白领");
    }
  }
  return audience.slice(0, 4);
}

function makeFeedback(attr, score, notes, hasAccident = false) {
  const parts = [];
  if (notes.length) parts.push(hasAccident ? notes[0] : pick(notes));

  if (hasAccident) {
    if (attr.straw >= 65 || (attr.thick >= 78 && attr.straw >= 48)) {
      parts.push(pick([
        "吸管刚插进去就提交了辞职信。",
        "试喝员努力吸了一口，结果只吸到了人生的阻力。",
        "它不是难喝，它是物理意义上很难喝到。"
      ]));
    } else if (attr.greasy >= 68) {
      parts.push(pick([
        "试喝员喝完沉默了，不是难喝，是太沉重。",
        "它不是吸不上来，是喝下去以后不太下得去。",
        "奶脂感已经不是香，是压迫。"
      ]));
    } else if (attr.acid >= 70) {
      parts.push(pick([
        "试喝员喝完眨了三次眼，灵魂还停在上一口。",
        "这杯不是提神，是给味蕾安排突击考试。",
        "这不是试喝，是一次工伤。"
      ]));
    } else {
      parts.push(pick([
        "试喝员喝完没有说话，只是把工牌摘下来了。",
        "它很有想法，问题是想法太多，已经开会吵起来了。",
        "你想干啥？杯子刚才明显愣了一下。"
      ]));
    }
  } else if (attr.thick >= 70 && attr.straw < 48) {
    parts.push(pick([
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "好喝是好喝，就是喝完胃可能想请半天假。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "它不像奶茶，更像一份假装成饮料的甜品。",
      "第一口很幸福，第三口开始需要勇气。"
    ]));
  } else if (notes[0]?.includes("红茶和牛奶")) {
    parts.push(pick(feedbackPools.classic));
  } else if (notes[0]?.includes("乌龙")) {
    parts.push(pick(feedbackPools.premium));
  } else if (score >= 72) {
    parts.push(pick(attr.fresh >= 50 ? feedbackPools.fresh : feedbackPools.good));
  } else if (score >= 56) {
    parts.push(pick(attr.tea >= 28 && attr.milk >= 24 ? feedbackPools.classic : feedbackPools.good));
  } else if (attr.sweet >= 72 && attr.odd < 48) {
    parts.push(pick(feedbackPools.sweet));
  } else {
    parts.push(pick(feedbackPools.weird));
  }

  if (attr.straw >= 70) parts.push(pick([
    "建议配勺子，不然吸管会开始怀疑人生。",
    "它不是难喝，它是物理意义上很难喝到。",
    "吸管刚插进去就提交了辞职信。"
  ]));
  if (attr.thick >= 78 && attr.straw < 70 && attr.greasy < 68) parts.push(pick([
    "这杯奶感很足，足到像在喝一份会流动的下午茶。",
    "奶油感很强，快乐是真的，负担也是真的。",
    "第一口很幸福，第三口开始需要勇气。"
  ]));
  if (attr.thick >= 78 && attr.straw >= 70) parts.push(pick([
    "稠度已经很有存在感，吸一口需要一点信念。",
    "这杯已经很有存在感，问题是它不太愿意流动。",
    "建议配勺子，不然吸管会怀疑自己的职业选择。"
  ]));
  if (attr.acid >= 62 && attr.milk >= 28) parts.push("酸和奶的关系比较紧张，建议让它们先冷静一下。");
  if (attr.bubble >= 50 && attr.thick >= 58) parts.push("气泡想往上冲，厚重感想往下坐，场面很热闹。");

  return [...new Set(parts)].slice(0, 3).join(" ");
}

function renderResult(result) {
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

function randomCup() {
  const allItems = groups.flatMap(group => group.items);
  const count = 3 + Math.floor(Math.random() * 4);
  const shuffled = [...allItems].sort(() => Math.random() - 0.5).slice(0, count);
  state.cup = shuffled.map(name => ({ name, ratio: 10 + Math.floor(Math.random() * 35) }));
  normalizeRatios();
  state.lastResult = null;
  render();
}

function clearCup() {
  state.cup = [];
  state.lastResult = null;
  render();
}

function savedRecipes() {
  try {
    return JSON.parse(localStorage.getItem("milkTeaLabRecipes") || "[]");
  } catch {
    return [];
  }
}

function setSavedRecipes(recipes) {
  localStorage.setItem("milkTeaLabRecipes", JSON.stringify(recipes));
}

function saveRecipe() {
  if (!canTaste()) return;
  const result = state.lastResult || evaluateCup();
  if (!result) return;
  const recipes = savedRecipes();
  const title = `${result.type} ${result.score}分`;
  recipes.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    createdAt: new Date().toLocaleString("zh-CN"),
    cup: state.cup.map(item => ({ ...item })),
    result
  });
  setSavedRecipes(recipes.slice(0, 24));
  state.lastResult = result;
  renderResult(result);
  openSavedDialog();
}

function openSavedDialog() {
  renderSavedList();
  if (typeof el.savedDialog.showModal === "function") {
    el.savedDialog.showModal();
  } else {
    el.savedDialog.setAttribute("open", "");
  }
}

function renderSavedList() {
  const recipes = savedRecipes();
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
    card.querySelector('[data-action="load"]').addEventListener("click", () => {
      state.cup = recipe.cup.map(item => ({ ...item, name: item.name === "奶精" ? "植脂奶" : item.name }));
      state.lastResult = recipe.result;
      render();
      renderResult(recipe.result);
      el.savedDialog.close();
    });
    card.querySelector('[data-action="delete"]').addEventListener("click", () => {
      setSavedRecipes(savedRecipes().filter(item => item.id !== recipe.id));
      renderSavedList();
    });
    el.savedList.append(card);
  });
}

function render() {
  renderCup();
  renderResult(state.lastResult);
}

function bindEvents() {
  el.tasteBtn.addEventListener("click", () => {
    state.lastResult = evaluateCup();
    renderResult(state.lastResult);
  });
  el.randomBtn.addEventListener("click", randomCup);
  el.balanceBtn.addEventListener("click", () => {
    normalizeRatios();
    state.lastResult = null;
    render();
  });
  el.clearBtn.addEventListener("click", clearCup);
  el.saveBtn.addEventListener("click", saveRecipe);
  el.savedBtn.addEventListener("click", openSavedDialog);
  el.closeSaved.addEventListener("click", () => el.savedDialog.close());
  el.savedDialog.addEventListener("click", event => {
    if (event.target === el.savedDialog) el.savedDialog.close();
  });
}

renderIngredients();
bindEvents();
render();
