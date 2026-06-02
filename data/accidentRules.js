(function() {
const accidentRules = [
  {
    id: "extremeLemonOver80",
    ingredientId: "fruit_lemon",
    ingredient: "柠檬",
    ratioMinExclusive: 80,
    type: "口感事故",
    cap: 18,
    score: -82,
    add: { acid: 70, odd: 42, fresh: -18, difficulty: 18 },
    tags: ["acid_accident", "extreme_ingredient"],
    notes: [
      "柠檬比例已经不是清爽，是酸度爆炸。试喝员脸皱到不适合正常饮用。",
      "这不是清爽，是柠檬在杯子里发动总攻。",
      "酸度已经不是提神，是在和味蕾打架。"
    ]
  },
  {
    id: "extremeLemonOver60",
    ingredientId: "fruit_lemon",
    ingredient: "柠檬",
    ratioMinExclusive: 60,
    type: "口感事故",
    cap: 34,
    score: -54,
    add: { acid: 52, odd: 28, fresh: -14, difficulty: 14 },
    tags: ["acid_accident", "extreme_ingredient"],
    notes: [
      "柠檬已经不是风味，是酸度事故现场。",
      "酸度已经不是提神，是在和味蕾打架。"
    ]
  },
  {
    id: "extremeDurianAtLeast80",
    ingredientId: "fruit_durian",
    ingredient: "榴莲",
    ratioMinInclusive: 80,
    type: "猎奇实验品",
    cap: 22,
    score: -70,
    add: { odd: 75, thick: 32, greasy: 32, straw: 28, fruit: 12, difficulty: 22 },
    tags: ["durian_accident", "extreme_ingredient"],
    notes: [
      "榴莲味很有主见，已经把其他材料全部开除了。",
      "这杯不是喝进去的，是被榴莲缓慢推进食道的。",
      "榴莲已经不是风味了，是杯子里的主要建筑材料。"
    ]
  },
  {
    id: "extremeDurianOver60",
    ingredientId: "fruit_durian",
    ingredient: "榴莲",
    ratioMinExclusive: 60,
    type: "猎奇实验品",
    cap: 45,
    score: -38,
    add: { odd: 48, thick: 18, greasy: 18, straw: 16, fruit: 10, difficulty: 14 },
    tags: ["durian_accident", "extreme_ingredient"],
    notes: [
      "榴莲香气冲击过强，普通客群建议先在门口做心理建设。",
      "吸管吸到一半开始怀疑自己是不是在挖矿。"
    ]
  }
];

window.MILK_TEA_LAB_ACCIDENT_RULES = {
  accidentRules
};
})();
