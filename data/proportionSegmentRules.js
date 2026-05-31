const proportionSegmentRules = [
  {
    id: "durian_low_presence",
    ingredient: "榴莲",
    minRatioExclusive: 0,
    maxRatioInclusive: 15,
    score: 4,
    add: { fruit: 5, sweet: 3, odd: 4 },
    notes: ["榴莲只是点到为止，存在感有了，还没有把杯子占领。"],
    tags: ["durian_low", "strong_flavor"]
  },
  {
    id: "durian_milk_supported",
    ingredient: "榴莲",
    minRatioExclusive: 15,
    maxRatioInclusive: 35,
    score: 28,
    add: { fruit: 8, thick: 8, greasy: 6, odd: 6, milk: 8 },
    requiredRatioSums: [
      { names: ["牛奶", "厚乳", "椰奶", "燕麦奶"], minInclusive: 45 }
    ],
    notes: ["牛奶把榴莲压顺了一点，喜欢的人会很开心，不喜欢的人会退后半步。"],
    tags: ["durian_medium", "dairy_supported"]
  },
  {
    id: "durian_medium_presence",
    ingredient: "榴莲",
    minRatioExclusive: 15,
    maxRatioInclusive: 35,
    score: 6,
    add: { fruit: 8, thick: 8, greasy: 6, odd: 6 },
    requiredRatioSums: [
      { names: ["牛奶", "厚乳", "椰奶", "燕麦奶"], maxExclusive: 45 }
    ],
    notes: ["榴莲很有存在感，但还没有失控，这杯个性很强。"],
    tags: ["durian_medium", "strong_flavor"]
  },
  {
    id: "durian_high_pressure",
    ingredient: "榴莲",
    minRatioExclusive: 35,
    maxRatioInclusive: 60,
    score: -10,
    add: { fruit: 8, thick: 18, greasy: 16, straw: 10, odd: 24 },
    notes: ["这杯榴莲已经成了主角，喜欢的人会点头，不喜欢的人已经后退半步。"],
    tags: ["durian_high", "aroma_pressure"]
  },
  {
    id: "lemon_low_bright",
    ingredient: "柠檬",
    minRatioExclusive: 0,
    maxRatioInclusive: 15,
    score: 3,
    add: { fresh: 7, acid: 5 },
    notes: ["柠檬把风味提亮了，没有酸到攻击味蕾。"],
    tags: ["lemon_low", "fresh_bright"]
  },
  {
    id: "lemon_supported_bright",
    ingredient: "柠檬",
    minRatioExclusive: 15,
    maxRatioInclusive: 35,
    score: 6,
    add: { fresh: 10, acid: 8 },
    anyRatioSums: [
      { names: ["蜂蜜", "白糖", "黑糖", "焦糖"], minInclusive: 8 },
      { names: ["红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"], minInclusive: 25 }
    ],
    notes: ["柠檬把茶香提亮了，酸爽但还在可控范围里。"],
    tags: ["lemon_medium", "supported_acid"]
  },
  {
    id: "lemon_unsupported_acid",
    ingredient: "柠檬",
    minRatioExclusive: 15,
    maxRatioInclusive: 35,
    score: -2,
    add: { fresh: 10, acid: 8 },
    requiredRatioSums: [
      { names: ["蜂蜜", "白糖", "黑糖", "焦糖"], maxExclusive: 8 },
      { names: ["红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"], maxExclusive: 25 }
    ],
    notes: ["柠檬酸感很明显，最好有茶感或甜味接一下。"],
    tags: ["lemon_medium", "unsupported_acid"]
  },
  {
    id: "lemon_high_pressure",
    ingredient: "柠檬",
    minRatioExclusive: 35,
    maxRatioInclusive: 60,
    score: -16,
    add: { acid: 22, odd: 10, fresh: -8 },
    notes: ["柠檬已经偏多，酸度开始从清爽变成压力。"],
    tags: ["lemon_high", "acid_pressure"]
  }
];

window.MILK_TEA_LAB_PROPORTION_SEGMENT_RULES = {
  proportionSegmentRules
};
