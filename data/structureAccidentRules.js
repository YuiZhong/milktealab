(function() {
const structureAccidentRules = [
  {
    id: "semiSolidLowDrinkability",
    accidentTypeId: "texture_low_drinkability",
    type: "口感事故",
    cap: 28,
    score: -50,
    add: { straw: 55, thick: 28, odd: 28, difficulty: 22, fresh: -16 },
    conditions: {
      solidLoadMin: 70,
      strawResistanceMin: 58,
      drinkabilityMax: 42,
      baseLiquidRatioMax: 35,
      requiredTags: ["high_solid_load", "high_straw_resistance", "low_drinkability"]
    },
    tags: ["semi_solid", "low_drinkability", "high_straw_resistance"],
    notes: [
      "这杯已经接近半固体，吸管开始怀疑自己的职业选择。",
      "液体支撑不够，固体负载太高，喝起来像在吸一堵墙。",
      "这不是饮料，是需要勺子介入调解的口感事故。"
    ]
  },
  {
    id: "highTextureLowLiquidSupport",
    accidentTypeId: "texture_solid_overload",
    type: "口感事故",
    cap: 36,
    score: -36,
    add: { straw: 42, thick: 20, odd: 20, difficulty: 16, fresh: -10 },
    conditions: {
      textureRatioMin: 55,
      baseLiquidRatioMax: 30,
      drinkabilityMax: 55,
      requiredTags: ["texture_forward", "low_liquid_support"]
    },
    tags: ["texture_heavy", "low_liquid_support"],
    notes: [
      "质地层太重，液体骨架撑不住，整杯开始往糊状方向滑。",
      "这杯不是小料丰富，是液体部分已经失去话语权。",
      "杯子里能嚼的太多，能顺利喝下去的太少。"
    ]
  }
];

window.MILK_TEA_LAB_STRUCTURE_ACCIDENT_RULES = {
  structureAccidentRules
};
})();
