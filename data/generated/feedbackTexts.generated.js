(function(global) {
  "use strict";

  function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) {
      return value;
    }

    Object.keys(value).forEach(function(key) {
      deepFreeze(value[key]);
    });

    return Object.freeze(value);
  }

  const feedbackTextsGenerated = deepFreeze({
  "schemaVersion": "feedbackTexts.generated.v0.0.7.16",
  "generatedFrom": "content_sheets/examples/feedback_texts.sample.csv",
  "textsById": {
    "feedback_classic_001": {
      "textId": "feedback_classic_001",
      "feedbackTag": "classic",
      "scene": "normal",
      "zhCN": "经典的珍珠奶茶。肯定不能算难喝啦但也算不上惊艳，还行吧",
      "tone": "classic",
      "minScore": 60,
      "maxScore": 90,
      "accidentTypeId": null,
      "drinkTypeId": "classic_milk_tea",
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "经典奶茶稳定反馈样例"
    },
    "feedback_premium_001": {
      "textId": "feedback_premium_001",
      "feedbackTag": "premium",
      "scene": "normal",
      "zhCN": "喝起来有种“高档”味，用料应该不错？",
      "tone": "premium",
      "minScore": 65,
      "maxScore": 95,
      "accidentTypeId": null,
      "drinkTypeId": "premium_thick_milk_tea",
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "高级厚乳路线样例"
    },
    "feedback_acid_accident_001": {
      "textId": "feedback_acid_accident_001",
      "feedbackTag": "acid_accident",
      "scene": "accident",
      "zhCN": "我牙被酸掉了，你要不赔我点钱吧",
      "tone": "warning",
      "minScore": 0,
      "maxScore": 35,
      "accidentTypeId": "taste_acid_overload",
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "酸度事故代表样例"
    },
    "feedback_greasy_overload_001": {
      "textId": "feedback_greasy_overload_001",
      "feedbackTag": "greasy_overload",
      "scene": "accident",
      "zhCN": "有点像和牛，第一口感觉好香啊，第二口就想吐了",
      "tone": "warning",
      "minScore": 0,
      "maxScore": 35,
      "accidentTypeId": "dairy_fat_overload",
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "奶脂过载代表样例"
    },
    "feedback_greasy_overload_002": {
      "textId": "feedback_greasy_overload_002",
      "feedbackTag": "greasy_overload",
      "scene": "accident",
      "zhCN": "你这给我灌奶油呢这是？",
      "tone": "warning",
      "minScore": 0,
      "maxScore": 35,
      "accidentTypeId": "dairy_fat_overload",
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "奶脂过载事故样例，直白吐槽版"
    },
    "feedback_straw_disaster_001": {
      "textId": "feedback_straw_disaster_001",
      "feedbackTag": "straw_disaster",
      "scene": "accident",
      "zhCN": "吸管刚插进去就提交了辞职信",
      "tone": "teasing",
      "minScore": 0,
      "maxScore": 35,
      "accidentTypeId": "texture_straw_resistance",
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "吸管阻力事故样例"
    },
    "feedback_straw_disaster_002": {
      "textId": "feedback_straw_disaster_002",
      "feedbackTag": "straw_disaster",
      "scene": "accident",
      "zhCN": "你这是啥玩意啊？根本吸不上来啊",
      "tone": "warning",
      "minScore": 0,
      "maxScore": 35,
      "accidentTypeId": "texture_straw_resistance",
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "吸管阻力事故样例，直白吐槽版"
    },
    "feedback_durian_001": {
      "textId": "feedback_durian_001",
      "feedbackTag": "durian",
      "scene": "normal",
      "zhCN": "榴莲味很有礼貌地进场，然后非常不礼貌地坐到了主位上",
      "tone": "teasing",
      "minScore": 45,
      "maxScore": 85,
      "accidentTypeId": null,
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "榴莲强身份但不必然事故"
    },
    "feedback_normal_good_001": {
      "textId": "feedback_normal_good_001",
      "feedbackTag": "normal_good",
      "scene": "fallback",
      "zhCN": "喝着还可以，几种味道居然意外的相处得挺和平",
      "tone": "classic",
      "minScore": 60,
      "maxScore": 100,
      "accidentTypeId": null,
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "普通好喝兜底样例"
    },
    "feedback_thick_followup_001": {
      "textId": "feedback_thick_followup_001",
      "feedbackTag": "thick_followup",
      "scene": "followup",
      "zhCN": "喝了一口我感觉我昨晚的5公里跑步机全白跑了",
      "tone": "teasing",
      "minScore": 50,
      "maxScore": 85,
      "accidentTypeId": null,
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": true,
      "notes": "厚重饮品追评样例"
    },
    "feedback_bubble_conflict_001": {
      "textId": "feedback_bubble_conflict_001",
      "feedbackTag": "bubble_conflict",
      "scene": "followup",
      "zhCN": "一口下去既清爽又浓厚的，我不好说",
      "tone": "teasing",
      "minScore": 20,
      "maxScore": 70,
      "accidentTypeId": null,
      "drinkTypeId": null,
      "outcomeTypeId": "taste_conflict",
      "audienceId": null,
      "enabled": true,
      "notes": "口感冲突追评样例"
    },
    "feedback_disabled_idea_001": {
      "textId": "feedback_disabled_idea_001",
      "feedbackTag": "weird",
      "scene": "normal",
      "zhCN": "",
      "tone": "teasing",
      "minScore": null,
      "maxScore": null,
      "accidentTypeId": null,
      "drinkTypeId": null,
      "outcomeTypeId": null,
      "audienceId": null,
      "enabled": false,
      "notes": "禁用样例用于验证 enabled 和空文案规则"
    }
  },
  "textsByTag": {
    "classic": [
      "feedback_classic_001"
    ],
    "premium": [
      "feedback_premium_001"
    ],
    "acid_accident": [
      "feedback_acid_accident_001"
    ],
    "greasy_overload": [
      "feedback_greasy_overload_001",
      "feedback_greasy_overload_002"
    ],
    "straw_disaster": [
      "feedback_straw_disaster_001",
      "feedback_straw_disaster_002"
    ],
    "durian": [
      "feedback_durian_001"
    ],
    "normal_good": [
      "feedback_normal_good_001"
    ],
    "thick_followup": [
      "feedback_thick_followup_001"
    ],
    "bubble_conflict": [
      "feedback_bubble_conflict_001"
    ],
    "weird": [
      "feedback_disabled_idea_001"
    ]
  },
  "textsByScene": {
    "normal": [
      "feedback_classic_001",
      "feedback_premium_001",
      "feedback_durian_001",
      "feedback_disabled_idea_001"
    ],
    "accident": [
      "feedback_acid_accident_001",
      "feedback_greasy_overload_001",
      "feedback_greasy_overload_002",
      "feedback_straw_disaster_001",
      "feedback_straw_disaster_002"
    ],
    "fallback": [
      "feedback_normal_good_001"
    ],
    "followup": [
      "feedback_thick_followup_001",
      "feedback_bubble_conflict_001"
    ]
  },
  "enabledTextIdsByTag": {
    "classic": [
      "feedback_classic_001"
    ],
    "premium": [
      "feedback_premium_001"
    ],
    "acid_accident": [
      "feedback_acid_accident_001"
    ],
    "greasy_overload": [
      "feedback_greasy_overload_001",
      "feedback_greasy_overload_002"
    ],
    "straw_disaster": [
      "feedback_straw_disaster_001",
      "feedback_straw_disaster_002"
    ],
    "durian": [
      "feedback_durian_001"
    ],
    "normal_good": [
      "feedback_normal_good_001"
    ],
    "thick_followup": [
      "feedback_thick_followup_001"
    ],
    "bubble_conflict": [
      "feedback_bubble_conflict_001"
    ]
  },
  "enabledTextIdsByScene": {
    "normal": [
      "feedback_classic_001",
      "feedback_premium_001",
      "feedback_durian_001"
    ],
    "accident": [
      "feedback_acid_accident_001",
      "feedback_greasy_overload_001",
      "feedback_greasy_overload_002",
      "feedback_straw_disaster_001",
      "feedback_straw_disaster_002"
    ],
    "fallback": [
      "feedback_normal_good_001"
    ],
    "followup": [
      "feedback_thick_followup_001",
      "feedback_bubble_conflict_001"
    ]
  },
  "metadata": {
    "readonly": true,
    "sourceType": "generated",
    "stableIdRequired": true,
    "affectsRuntime": false,
    "generatedBy": "scripts/content/buildFeedbackData.js",
    "validation": {
      "errors": 0,
      "warnings": 12
    },
    "valueEncoding": {
      "enabled": "boolean",
      "scoreEmpty": null,
      "optionalIdEmpty": null
    },
    "counts": {
      "total": 12,
      "enabled": 11,
      "disabled": 1
    }
  }
});

  global.MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS = feedbackTextsGenerated;
})(typeof window !== "undefined" ? window : globalThis);
