(function() {
const drinkTypeRules = [
  {
    type: "口感事故",
    when: {
      any: [
        { attr: "straw", op: ">=", value: 70 },
        { all: [{ score: "<", value: 38 }, { attr: "straw", op: ">=", value: 55 }] }
      ]
    }
  },
  {
    type: "奶脂过载",
    when: { all: [{ attr: "greasy", op: ">=", value: 78 }, { attr: "straw", op: "<", value: 50 }] }
  },
  {
    type: "榴莲奶昔",
    when: { all: [{ ingredient: "榴莲" }, { attr: "milk", op: ">=", value: 45 }, { attr: "odd", op: "<", value: 55 }, { attr: "thick", op: ">=", value: 58 }] }
  },
  {
    type: "榴莲牛乳",
    when: { all: [{ ingredient: "榴莲" }, { attr: "milk", op: ">=", value: 45 }, { attr: "odd", op: "<", value: 55 }] }
  },
  {
    type: "甜品奶昔",
    when: { all: [{ ingredient: "草莓" }, { anyIngredient: ["牛奶", "淡奶油", "厚乳"] }] }
  },
  {
    type: "甜品奶昔",
    when: { all: [{ attr: "thick", op: ">=", value: 68 }, { attr: "straw", op: "<", value: 50 }, { attr: "odd", op: "<", value: 58 }] }
  },
  {
    type: "猎奇实验品",
    when: { any: [{ attr: "odd", op: ">=", value: 62 }, { score: "<", value: 38 }] }
  },
  {
    type: "清爽水果茶",
    when: { allIngredients: ["气泡水", "柠檬"] }
  },
  {
    type: "气泡水果茶",
    when: { all: [{ ingredient: "气泡水" }, { anyIngredient: ["西瓜", "葡萄", "桃子", "绿茶"] }, { attr: "odd", op: "<", value: 45 }] }
  },
  {
    type: "清爽水果茶",
    when: { all: [{ attr: "bubble", op: ">=", value: 36 }, { attr: "fruit", op: ">=", value: 26 }, { attr: "fresh", op: ">=", value: 42 }] }
  },
  {
    type: "高级厚乳款",
    when: { all: [{ ingredient: "乌龙茶" }, { anyIngredient: ["厚乳", "奶盖"] }, { attr: "odd", op: "<", value: 45 }] }
  },
  {
    type: "黑糖珍珠奶茶",
    when: { all: [{ ingredient: "黑糖" }, { ingredient: "珍珠" }, { attr: "tea", op: ">=", value: 26 }, { attr: "milk", op: ">=", value: 24 }, { attr: "odd", op: "<", value: 45 }] }
  },
  {
    type: "经典奶茶",
    when: { all: [{ attr: "tea", op: ">=", value: 30 }, { attr: "milk", op: ">=", value: 26 }, { attr: "odd", op: "<", value: 45 }] }
  },
  {
    type: "咖啡特调",
    when: { all: [{ ingredient: "咖啡" }, { attr: "milk", op: ">=", value: 18 }] }
  },
  {
    type: "甜品奶昔",
    when: { all: [{ attr: "thick", op: ">=", value: 50 }, { any: [{ attr: "fruit", op: ">=", value: 25 }, { attr: "sweet", op: ">=", value: 45 }] }] }
  },
  {
    type: "果味特调",
    when: { all: [{ attr: "fruit", op: ">=", value: 35 }, { attr: "fresh", op: ">=", value: 34 }] }
  },
  {
    type: "茶香轻饮",
    when: { all: [{ attr: "tea", op: ">=", value: 34 }, { attr: "fresh", op: ">=", value: 28 }] }
  }
];

window.MILK_TEA_LAB_DRINK_TYPE_RULES = {
  defaultType: "实验特调",
  drinkTypeRules
};
})();
