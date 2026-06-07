(function(root) {
  const calibrationPresets = [
    {
      id: "classic_milk_tea",
      title: "经典奶茶",
      note: "稳定基准样本：珍珠不应导致明显误伤。",
      cup: [
        { ingredientId: "tea_black", name: "红茶", ratio: 45 },
        { ingredientId: "dairy_milk", name: "牛奶", ratio: 40 },
        { ingredientId: "topping_pearl", name: "珍珠", ratio: 15 }
      ]
    },
    {
      id: "fresh_bubble_fruit_tea",
      title: "清爽水果茶",
      note: "清爽基准样本：观察酸度与清爽组合是否平衡。",
      cup: [
        { ingredientId: "tea_green", name: "绿茶", ratio: 40 },
        { ingredientId: "liquid_sparkling_water", name: "气泡水", ratio: 30 },
        { ingredientId: "fruit_lemon", name: "柠檬", ratio: 20 },
        { ingredientId: "sweetener_honey", name: "蜂蜜", ratio: 10 }
      ]
    },
    {
      id: "premium_oolong_milk",
      title: "高级厚乳款",
      note: "厚乳基准样本：应有高级厚感，但不应被奶脂事故误伤。",
      cup: [
        { ingredientId: "tea_oolong", name: "乌龙茶", ratio: 40 },
        { ingredientId: "dairy_thick_milk", name: "厚乳", ratio: 35 },
        { ingredientId: "topping_cheese_foam", name: "奶盖", ratio: 20 },
        { ingredientId: "seasoning_sea_salt", name: "海盐", ratio: 5 }
      ]
    },
    {
      id: "greasy_overload",
      title: "奶脂过载",
      note: "奶脂事故样本：观察油腻负担是否被新建议分看见。",
      cup: [
        { ingredientId: "dairy_thick_milk", name: "厚乳", ratio: 70 },
        { ingredientId: "dairy_cream", name: "淡奶油", ratio: 20 },
        { ingredientId: "dairy_non_dairy_creamer", name: "植脂奶", ratio: 10 }
      ]
    },
    {
      id: "straw_resistance_accident",
      title: "吸管阻力事故",
      note: "高固体负载样本：观察吸管阻力和可饮用性压力。",
      cup: [
        { ingredientId: "topping_taro_paste", name: "芋泥", ratio: 45 },
        { ingredientId: "topping_oreo_crumble", name: "奥利奥碎", ratio: 32 },
        { ingredientId: "topping_pearl", name: "珍珠", ratio: 16 },
        { ingredientId: "sweetener_honey", name: "蜂蜜", ratio: 7 }
      ]
    },
    {
      id: "extreme_lemon_accident",
      title: "极端柠檬事故",
      note: "高酸事故样本：观察酸度压力是否压过清爽组合。",
      cup: [
        { ingredientId: "fruit_lemon", name: "柠檬", ratio: 85 },
        { ingredientId: "tea_green", name: "绿茶", ratio: 5 },
        { ingredientId: "liquid_sparkling_water", name: "气泡水", ratio: 5 },
        { ingredientId: "sweetener_honey", name: "蜂蜜", ratio: 5 }
      ]
    },
    {
      id: "bubble_cream_conflict",
      title: "气泡奶油冲突",
      note: "结构冲突样本：观察气泡清爽和奶油厚重是否打架。",
      cup: [
        { ingredientId: "liquid_sparkling_water", name: "气泡水", ratio: 50 },
        { ingredientId: "dairy_cream", name: "淡奶油", ratio: 40 },
        { ingredientId: "sweetener_honey", name: "蜂蜜", ratio: 10 }
      ]
    }
  ];

  root.MILK_TEA_LAB_CALIBRATION_PRESETS = {
    calibrationPresets
  };
})(typeof window !== "undefined" ? window : globalThis);
