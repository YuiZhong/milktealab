(function() {
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
const { clamp, pick, displayName, has, hasAny } = window.MILK_TEA_LAB_HELPERS;
const categoryByName = new Map(groups.flatMap(group => group.items.map(item => [item, group.name])));

let activeCup = [];

function totalRatio(cup = activeCup) {
  return cup.reduce((sum, item) => sum + item.ratio, 0);
}

function ratioOf(name) {
  if (name === "植脂奶") {
    return activeCup.find(item => item.name === "植脂奶" || item.name === "奶精")?.ratio || 0;
  }
  return activeCup.find(item => item.name === name)?.ratio || 0;
}

function sumRatios(names) {
  return activeCup.reduce((sum, item) => sum + (names.includes(item.name === "奶精" ? "植脂奶" : item.name) ? item.ratio : 0), 0);
}

function applyAttributeBoost(attr, boost) {
  Object.entries(boost).forEach(([key, value]) => {
    attr[key] += value;
  });
}

function analyzeFruitTeaBlend() {
  const teaCandidates = ["茉莉茶", "绿茶", "乌龙茶", "红茶"];
  const fruitCandidates = ["桃子", "葡萄", "荔枝", "草莓", "西瓜", "芒果"];
  const teaTotal = sumRatios(teaCandidates);
  const fruits = fruitCandidates
    .map(name => ({ name, ratio: ratioOf(name) }))
    .filter(item => item.ratio > 0);
  const lemon = ratioOf("柠檬");
  const fruitCount = fruits.length + (lemon > 0 && lemon <= 15 ? 1 : 0);
  const fruitTotal = fruits.reduce((sum, item) => sum + item.ratio, 0) + Math.min(lemon, 15);
  const dairyTotal = sumRatios(dairyNames);
  const highFatDairyTotal = sumRatios(highFatDairyNames);
  const strawTotal = sumRatios(strawResistanceNames);
  const disruptiveTotal = dairyTotal + highFatDairyTotal + ratioOf("咖啡") + ratioOf("榴莲") + ratioOf("奥利奥碎") + ratioOf("芋泥") + Math.max(0, strawTotal - 12);

  if (teaTotal < 25 || fruitCount < 2 || fruitTotal < 32 || disruptiveTotal > 18) return null;

  const primaryTea = teaCandidates
    .map(name => ({ name, ratio: ratioOf(name) }))
    .sort((left, right) => right.ratio - left.ratio)[0];
  if (!primaryTea || primaryTea.ratio <= 0) return null;

  const bubble = ratioOf("气泡水");
  const sweetSupport = sumRatios(["蜂蜜", "白糖"]);
  const waterSupport = sumRatios(["纯水", "气泡水"]);
  let score = 16;
  let cap = 88;
  const add = { fresh: 18, fruit: 18, tea: 8, photo: 8, odd: -8 };

  if (primaryTea.name === "茉莉茶") {
    score += 5;
    add.fresh += 5;
    add.photo += 3;
  } else if (primaryTea.name === "绿茶") {
    score += 4;
    add.fresh += 5;
  } else if (primaryTea.name === "乌龙茶") {
    score += 2;
    add.tea += 3;
  } else if (primaryTea.name === "红茶") {
    score += 1;
    add.fresh -= 2;
  }

  if (fruitCount === 2) {
    score += 4;
  } else if (fruitCount === 3) {
    score += 2;
  } else if (fruitCount >= 4) {
    score -= 6;
    add.odd += 8;
    cap = 84;
  }

  if (sweetSupport >= 6 && sweetSupport <= 14) score += 3;
  if (waterSupport >= 5 && waterSupport <= 25) score += 2;
  if (bubble >= 10 && bubble <= 30) {
    score += 3;
    add.bubble = 6;
    cap = 95;
  } else if (bubble > 30) {
    cap = 91;
  }

  const typeMap = {
    茉莉茶: "水果茉莉茶",
    绿茶: "水果绿茶",
    乌龙茶: "水果乌龙茶",
    红茶: "水果红茶"
  };
  const type = bubble >= 10 ? "气泡水果茶" : typeMap[primaryTea.name] || "花果茶";
  const note = bubble >= 10
    ? "茶、水果和气泡的结构成立，清爽感很足，但气泡不是万能满分按钮。"
    : `${primaryTea.name}和水果搭得自然，像一杯认真做过功课的花果茶。`;

  return { type, score, add, cap, note };
}

function applyProportionSegments(attr) {
  const notes = [];
  let scoreDelta = 0;
  const durian = ratioOf("榴莲");
  const lemon = ratioOf("柠檬");
  const taro = ratioOf("芋泥");
  const oreo = ratioOf("奥利奥碎");
  const bubble = ratioOf("气泡水");
  const cream = ratioOf("淡奶油");
  const dairySupport = sumRatios(["牛奶", "厚乳", "椰奶", "燕麦奶"]);
  const dairyTotal = sumRatios(dairyNames);
  const highFatDairyTotal = sumRatios(highFatDairyNames);
  const toppingTotal = sumRatios(["珍珠", "芋圆", "布丁", "仙草", "椰果"]);
  const fruitSupport = sumRatios(["柠檬", "西瓜", "葡萄", "桃子", "草莓", "芒果", "荔枝"]);
  const teaSupport = sumRatios(["红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"]);
  const sweetSupport = sumRatios(["蜂蜜", "白糖", "黑糖", "焦糖"]);

  if (durian > 0 && durian <= 15) {
    attr.fruit += 5;
    attr.sweet += 3;
    attr.odd += 4;
    scoreDelta += 4;
    notes.push("榴莲只是点到为止，存在感有了，还没有把杯子占领。");
  } else if (durian <= 35 && durian > 15) {
    attr.fruit += 8;
    attr.thick += 8;
    attr.greasy += 6;
    attr.odd += 6;
    if (dairySupport >= 45) {
      scoreDelta += 28;
      attr.milk += 8;
      notes.push("牛奶把榴莲压顺了一点，喜欢的人会很开心，不喜欢的人会退后半步。");
    } else {
      scoreDelta += 6;
      notes.push("榴莲很有存在感，但还没有失控，这杯个性很强。");
    }
  } else if (durian <= 60 && durian > 35) {
    attr.fruit += 8;
    attr.thick += 18;
    attr.greasy += 16;
    attr.straw += 10;
    attr.odd += 24;
    scoreDelta -= 10;
    notes.push("这杯榴莲已经成了主角，喜欢的人会点头，不喜欢的人已经后退半步。");
  }

  if (lemon > 0 && lemon <= 15) {
    attr.fresh += 7;
    attr.acid += 5;
    scoreDelta += 3;
    notes.push("柠檬把风味提亮了，没有酸到攻击味蕾。");
  } else if (lemon <= 35 && lemon > 15) {
    attr.fresh += 10;
    attr.acid += 8;
    if (sweetSupport >= 8 || teaSupport >= 25) {
      scoreDelta += 6;
      notes.push("柠檬把茶香提亮了，酸爽但还在可控范围里。");
    } else {
      scoreDelta -= 2;
      notes.push("柠檬酸感很明显，最好有茶感或甜味接一下。");
    }
  } else if (lemon <= 60 && lemon > 35) {
    attr.acid += 22;
    attr.odd += 10;
    attr.fresh -= 8;
    scoreDelta -= 16;
    notes.push("柠檬已经偏多，酸度开始从清爽变成压力。");
  }

  if (dairyTotal >= 65 && dairyTotal <= 80) {
    attr.fresh -= 8;
    attr.thick += 8;
    attr.greasy += 6;
    scoreDelta -= highFatDairyTotal >= 50 ? 8 : 3;
    notes.push(highFatDairyTotal >= 50 ? "奶脂感开始变重，顺滑是真的，负担也开始出现。" : "这杯偏奶偏厚，更像甜品饮，清爽度会低一点。");
  }

  if (cream > 0 && cream <= 20) {
    scoreDelta += 5;
    attr.photo += 5;
    notes.push("淡奶油让它像甜品，但还没到负担阶段。");
  }

  if (taro > 0 && taro <= 15) {
    attr.thick += 4;
    attr.straw += 4;
    scoreDelta += 3;
    notes.push("芋泥只是增加一点甜品感，还没有把吸管拉进苦战。");
  } else if (taro <= 35 && taro > 15) {
    attr.thick += 14;
    attr.straw += 12;
    attr.sweet += 4;
    scoreDelta += 2;
    notes.push("芋泥成为主风味，甜品感很强，喝起来会更饱。");
  } else if (taro <= 50 && taro > 35) {
    attr.thick += 24;
    attr.straw += 24;
    attr.greasy += 8;
    scoreDelta -= 12;
    notes.push("芋泥比例很高，吸管阻力和饱腹感都明显上来了。");
  }

  if (oreo > 0 && oreo <= 10) {
    attr.sweet += 4;
    attr.straw += 3;
    scoreDelta += 3;
    notes.push("奥利奥碎只是点缀，饼干香有了，吸管还撑得住。");
  } else if (oreo <= 25 && oreo > 10) {
    attr.sweet += 8;
    attr.straw += 12;
    scoreDelta += 1;
    notes.push("奥利奥存在感很强，已经往甜品饮方向走了。");
  } else if (oreo > 25) {
    attr.straw += 24;
    attr.thick += 10;
    scoreDelta -= 10;
    notes.push("奥利奥碎太多，固形物感开始挑战吸管。");
  }

  if (toppingTotal >= 20 && toppingTotal <= 35) {
    attr.straw += 12;
    attr.difficulty += 6;
    scoreDelta += 2;
    notes.push("小料很多，学生可能会喜欢，吸管阻力也确实上来了。");
  } else if (toppingTotal > 35) {
    attr.straw += 28;
    attr.difficulty += 10;
    scoreDelta -= 12;
    notes.push("小料已经过量，喝一口像在给吸管安排体能测试。");
  }

  if (bubble >= 10 && bubble <= 40) {
    attr.fresh += 8;
    attr.bubble += 8;
    if (fruitSupport >= 15 || teaSupport >= 25) scoreDelta += 5;
  } else if (bubble > 70 && fruitSupport < 10 && teaSupport < 20 && sweetSupport < 8) {
    attr.fresh -= 6;
    scoreDelta -= 8;
    notes.push("气泡水很多，但支撑风味太少，喝起来有点空。");
  }

  return { scoreDelta, notes };
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
  } else if (lemon > 60) {
    accidents.push({
      type: "口感事故",
      cap: 34,
      score: -54,
      add: { acid: 52, odd: 28, fresh: -14, difficulty: 14 },
      note: pick([
        "柠檬已经不是风味，是酸度事故现场。",
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
  } else if (durian > 60) {
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

  if ((dairyTotal > 80 && highFatDairyTotal > 50) || highFatDairyTotal > 65 || cream > 50 || thickMilk > 60) {
    const severe = cream > 65 || thickMilk > 68 || highFatDairyTotal > 80 || dairyTotal > 92;
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

  if (taro > 50) {
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

  if (oreo > 40) {
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

function evaluateCup(cup) {
  activeCup = cup.map(item => ({ ...item, name: displayName(item.name) }));
  if (!activeCup.length || totalRatio(activeCup) !== 100) return null;

  const names = activeCup.map(item => item.name);
  const normalizedNames = activeCup.map(item => item.name === "奶精" ? "植脂奶" : item.name);
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
  const segmentNotes = [];
  const generalNotes = [];
  let forcedType = null;
  let scoreCap = 100;

  activeCup.forEach(item => {
    const profile = baseProfiles[item.name === "奶精" ? "植脂奶" : item.name] || {};
    const weight = item.ratio / 32;
    Object.keys(attr).forEach(key => {
      attr[key] += (profile[key] || 0) * weight;
    });
  });

  const segmentResult = applyProportionSegments(attr);
  score += segmentResult.scoreDelta;
  segmentNotes.push(...segmentResult.notes);

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
      forcedType = forcedType || (rule.names.includes("柠檬") && rule.names.includes("牛奶") ? "口感事故" : "口感冲突");
      badNotes.push(rule.note);
    }
  });

  if (!accidents.length && !badNotes.length) {
    const fruitTeaBlend = analyzeFruitTeaBlend();
    if (fruitTeaBlend) {
      score += fruitTeaBlend.score;
      scoreCap = Math.min(scoreCap, fruitTeaBlend.cap);
      forcedType = forcedType || fruitTeaBlend.type;
      applyAttributeBoost(attr, fruitTeaBlend.add);
      goodNotes.push(fruitTeaBlend.note);
    }

    comboRules.filter(rule => rule.kind === "good").forEach(rule => {
      if (rule.names.every(name => has(name, names))) {
        score += rule.score;
        applyAttributeBoost(attr, rule.add);
        goodNotes.push(rule.note);
      }
    });
  }

  const teaCount = activeCup.filter(item => categoryByName.get(item.name) === "茶类").length;
  const toppingCount = activeCup.filter(item => categoryByName.get(item.name) === "小料").length;
  const dairyCount = activeCup.filter(item => categoryByName.get(item.name) === "乳类").length;
  const flavorCount = activeCup.filter(item => categoryByName.get(item.name) === "水果/风味").length;

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
  score -= Math.max(0, activeCup.length - 6) * 6;

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
        : segmentNotes.length
          ? [segmentNotes[0]]
          : generalNotes;
  const feedback = makeFeedback(attr, finalScore, priorityNotes, accidents.length > 0);

  return { attr, score: finalScore, type, audience, feedback };
}

function inferType(attr, names, score) {
  if (attr.straw >= 70 || (score < 38 && attr.straw >= 55)) return "口感事故";
  if (attr.greasy >= 78 && attr.straw < 50) return "奶脂过载";
  if (has("榴莲", names) && attr.milk >= 45 && attr.odd < 55) return attr.thick >= 58 ? "榴莲奶昔" : "榴莲牛乳";
  if (has("草莓", names) && (has("牛奶", names) || has("淡奶油", names) || has("厚乳", names))) return "甜品奶昔";
  if (attr.thick >= 68 && attr.straw < 50 && attr.odd < 58) return "甜品奶昔";
  if (attr.odd >= 62 || score < 38) return "猎奇实验品";
  if (has("气泡水", names) && has("柠檬", names)) return "清爽水果茶";
  if (has("气泡水", names) && hasAny(names, ["西瓜", "葡萄", "桃子", "绿茶"]) && attr.odd < 45) return "气泡水果茶";
  if (attr.bubble >= 36 && attr.fruit >= 26 && attr.fresh >= 42) return "清爽水果茶";
  if (has("乌龙茶", names) && (has("厚乳", names) || has("奶盖", names)) && attr.odd < 45) return "高级厚乳款";
  if (has("黑糖", names) && has("珍珠", names) && attr.tea >= 26 && attr.milk >= 24 && attr.odd < 45) return "黑糖珍珠奶茶";
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
  } else if (notes[0]?.includes("牛奶把榴莲")) {
    parts.push(pick([
      "榴莲牛乳路线是成立的，就是需要观众先确认自己站哪一边。",
      "喜欢榴莲的人会觉得顺，路人可能会先保持礼貌距离。",
      "它不算翻车，更像一杯明确知道自己会被争议的奶昔。"
    ]));
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

window.MILK_TEA_LAB_TASTE_JUDGE = {
  evaluateCup
};
})();
