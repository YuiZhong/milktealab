(function(root) {
  const goldenSamples = [
    {
      id: "classic_milk_tea",
      name: "经典奶茶",
      cup: [
        { name: "红茶", ratio: 45 },
        { name: "牛奶", ratio: 40 },
        { name: "珍珠", ratio: 15 }
      ],
      expectations: {
        typeIncludes: ["经典奶茶"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 65,
        scoreMax: 85,
        feedbackIncludesAny: ["红茶", "牛奶", "经典"]
      },
      notes: "经典稳定样本，不应被事故规则误伤。"
    },
    {
      id: "fresh_bubble_fruit_tea",
      name: "清爽水果茶",
      cup: [
        { name: "绿茶", ratio: 40 },
        { name: "气泡水", ratio: 30 },
        { name: "柠檬", ratio: 20 },
        { name: "蜂蜜", ratio: 10 }
      ],
      expectations: {
        typeIncludesAny: ["清爽水果茶", "气泡水果茶", "水果绿茶"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 65,
        scoreMax: 100,
        feedbackIncludesAny: ["柠檬", "清爽", "酸爽", "茶香", "合理"]
      },
      notes: "清爽茶饮样本，应保持高分和清爽方向。"
    },
    {
      id: "premium_oolong_milk",
      name: "高级厚乳款",
      cup: [
        { name: "乌龙茶", ratio: 40 },
        { name: "厚乳", ratio: 35 },
        { name: "奶盖", ratio: 20 },
        { name: "海盐", ratio: 5 }
      ],
      expectations: {
        typeIncludesAny: ["高级厚乳款", "高级奶茶", "经典奶茶", "甜品奶昔"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 60,
        scoreMax: 90,
        feedbackIncludesAny: ["乌龙", "高级", "顺", "合理", "厚"]
      },
      notes: "高级厚乳样本，不应被奶脂过载误伤。"
    },
    {
      id: "extreme_lemon_accident",
      name: "极端柠檬事故",
      cup: [
        { name: "柠檬", ratio: 85 },
        { name: "绿茶", ratio: 5 },
        { name: "气泡水", ratio: 5 },
        { name: "蜂蜜", ratio: 5 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        scoreMin: 0,
        scoreMax: 20,
        feedbackIncludesAny: ["柠檬", "酸", "味蕾", "清爽"]
      },
      notes: "极端酸度样本，不应被清爽组合洗白。"
    },
    {
      id: "extreme_durian_accident",
      name: "极端榴莲事故",
      cup: [
        { name: "榴莲", ratio: 80 },
        { name: "牛奶", ratio: 10 },
        { name: "红茶", ratio: 10 }
      ],
      expectations: {
        typeIncludes: ["猎奇实验品"],
        scoreMin: 0,
        scoreMax: 25,
        feedbackIncludesAny: ["榴莲", "吸管", "物理", "食道", "开除"]
      },
      notes: "极端榴莲样本，应保持强香气和压迫方向。"
    },
    {
      id: "greasy_overload",
      name: "奶脂过载",
      cup: [
        { name: "厚乳", ratio: 70 },
        { name: "淡奶油", ratio: 20 },
        { name: "植脂奶", ratio: 10 }
      ],
      expectations: {
        typeIncludes: ["奶脂过载"],
        scoreMin: 0,
        scoreMax: 35,
        feedbackIncludesAny: ["奶", "沉重", "负担", "压迫", "油"]
      },
      notes: "奶脂事故样本，不应被甜品饮方向洗白。"
    },
    {
      id: "straw_resistance_accident",
      name: "吸管阻力事故",
      cup: [
        { name: "芋泥", ratio: 45 },
        { name: "奥利奥碎", ratio: 32 },
        { name: "珍珠", ratio: 16 },
        { name: "蜂蜜", ratio: 7 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        scoreMin: 0,
        scoreMax: 25,
        feedbackIncludesAny: ["吸管", "半固体", "物理", "勺子", "水泥", "阻力"]
      },
      notes: "高固体负载样本，应保持吸管阻力事故方向。"
    },
    {
      id: "bubble_cream_conflict",
      name: "气泡奶油冲突",
      cup: [
        { name: "气泡水", ratio: 50 },
        { name: "淡奶油", ratio: 40 },
        { name: "蜂蜜", ratio: 10 }
      ],
      expectations: {
        typeIncludesAny: ["口感冲突", "实验特调"],
        forbiddenTypeIncludes: ["经典奶茶", "清爽水果茶"],
        scoreMin: 15,
        scoreMax: 45,
        feedbackIncludesAny: ["气泡", "奶油", "打架", "思考人生", "奇怪"]
      },
      notes: "气泡和奶油冲突样本，不应被判成经典稳定款。"
    },
    {
      id: "industrial_milk_tea",
      name: "工业奶茶",
      cup: [
        { name: "植脂奶", ratio: 70 },
        { name: "红茶", ratio: 20 },
        { name: "黑糖", ratio: 10 }
      ],
      expectations: {
        typeIncludesAny: ["工业奶茶", "奶脂过载"],
        scoreMin: 0,
        scoreMax: 65,
        feedbackIncludesAny: ["工业", "廉价", "健康", "配料", "塑料", "奶味", "沉重", "负担", "奶脂"]
      },
      notes: "植脂奶高比例样本；当前稳定事实是奶脂过载优先级覆盖工业奶茶展示。"
    },
    {
      id: "drinkable_taro_milk_tea",
      name: "芋泥厚重但可饮用",
      cup: [
        { name: "芋泥", ratio: 30 },
        { name: "红茶", ratio: 40 },
        { name: "牛奶", ratio: 30 }
      ],
      expectations: {
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 45,
        scoreMax: 85,
        feedbackForbiddenAny: ["水泥", "施工", "吸管刚插进去就提交了辞职信"]
      },
      notes: "芋泥厚重但有液体支撑，不应误判为口感事故。"
    },
    {
      id: "solid_taro_low_liquid",
      name: "芋泥高固体低液体",
      cup: [
        { name: "芋泥", ratio: 70 },
        { name: "红茶", ratio: 15 },
        { name: "牛奶", ratio: 15 }
      ],
      expectations: {
        typeIncludesAny: ["口感事故", "实验特调"],
        scoreMin: 0,
        scoreMax: 30,
        feedbackIncludesAny: ["半固体", "吸管", "物理", "装修", "水泥", "芋泥"]
      },
      notes: "高芋泥低液体支撑样本，应保持低可饮用性方向。"
    }
  ];

  root.MILK_TEA_LAB_GOLDEN_SAMPLES = {
    goldenSamples
  };

  if (typeof module !== "undefined") {
    module.exports = { goldenSamples };
  }
})(typeof window !== "undefined" ? window : globalThis);
