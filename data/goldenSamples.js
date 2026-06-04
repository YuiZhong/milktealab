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
        drinkTypeIdIncludes: ["classic_milk_tea"],
        audienceIdIncludes: ["student", "office_worker", "elderly", "fitness"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 65,
        scoreMax: 85,
        feedbackTagIncludes: ["classic"],
        feedbackIncludesAny: ["红茶", "牛奶", "经典"],
        tasteSummary: {
          exists: true,
          valueKeysInclude: ["teaStrength", "milkiness", "sweetness"],
          metadataIncludes: {
            sourceLayer: "taste",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "tea_black" },
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "dairy_milk" }
          ]
        },
        textureSummary: {
          exists: true,
          valueKeysInclude: ["solidLoad", "strawResistance", "drinkability"],
          metadataIncludes: {
            sourceLayer: "texture",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_pearl" },
            { metric: "drinkability", sourceLayer: "texture", sourceType: "structure", sourceId: "drinkStructure" }
          ]
        },
        flavorSummary: {
          exists: true,
          valueKeysInclude: ["flavorIntensity", "beverageFit", "dessertFit"],
          metadataIncludes: {
            sourceLayer: "flavor",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { sourceLayer: "flavor", sourceType: "ingredient", sourceId: "tea_black" },
            { sourceLayer: "flavor", sourceType: "ingredient", sourceId: "dairy_milk" }
          ]
        },
        summaryCandidates: {
          exists: true,
          byTypeKeysInclude: ["accident", "outcome", "drinkType", "feedback"],
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          }
        },
        candidatePriorityShell: {
          exists: true,
          priorityBandIncludes: ["hard_physical", "taste_overload", "flavor_identity", "feedback_hint"],
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          }
        },
        generatedFeedbackShadow: {
          exists: true,
          candidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            generatedDataAvailable: true,
            adapterAvailable: true
          },
          candidateIncludesAny: [
            {
              textId: "feedback_classic_001",
              feedbackTag: "classic",
              scene: "normal"
            }
          ]
        }
      },
      notes: "经典稳定样本，不应被事故规则误伤。"
    },
    {
      id: "classic_milk_tea_id_equivalence",
      name: "经典奶茶 ID 等价样本",
      cup: [
        { ingredientId: "tea_black", ratio: 45 },
        { ingredientId: "dairy_milk", ratio: 40 },
        { ingredientId: "topping_pearl", ratio: 15 }
      ],
      expectations: {
        typeIncludes: ["经典奶茶"],
        drinkTypeIdIncludes: ["classic_milk_tea"],
        audienceIdIncludes: ["student", "office_worker", "elderly", "fitness"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 74,
        scoreMax: 74,
        feedbackTagIncludes: ["classic"],
        feedbackIncludesAny: ["红茶", "牛奶", "经典"],
        tasteSummary: {
          exists: true,
          valueKeysInclude: ["teaStrength", "milkiness", "sweetness"],
          metadataIncludes: {
            sourceLayer: "taste",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "tea_black" },
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "dairy_milk" }
          ]
        },
        textureSummary: {
          exists: true,
          valueKeysInclude: ["solidLoad", "strawResistance", "drinkability"],
          metadataIncludes: {
            sourceLayer: "texture",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_pearl" },
            { metric: "drinkability", sourceLayer: "texture", sourceType: "structure", sourceId: "drinkStructure" }
          ]
        },
        flavorSummary: {
          exists: true,
          valueKeysInclude: ["flavorIntensity", "beverageFit", "dessertFit"],
          metadataIncludes: {
            sourceLayer: "flavor",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { sourceLayer: "flavor", sourceType: "ingredient", sourceId: "tea_black" },
            { sourceLayer: "flavor", sourceType: "ingredient", sourceId: "dairy_milk" }
          ]
        }
      },
      notes: "与 classic_milk_tea 等价，用 ingredientId 覆盖 golden sample 的 ID 输入路径。"
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
        drinkTypeIdIncludes: ["fresh_fruit_tea"],
        audienceIdIncludes: ["student", "office_worker", "fitness"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 65,
        scoreMax: 100,
        feedbackIncludesAny: ["柠檬", "清爽", "酸爽", "茶香", "合理"]
      },
      notes: "清爽茶饮样本，应保持高分和清爽方向。"
    },
    {
      id: "fresh_bubble_fruit_tea_id_equivalence",
      name: "清爽水果茶 ID 等价样本",
      cup: [
        { ingredientId: "tea_green", ratio: 40 },
        { ingredientId: "liquid_sparkling_water", ratio: 30 },
        { ingredientId: "fruit_lemon", ratio: 20 },
        { ingredientId: "sweetener_honey", ratio: 10 }
      ],
      expectations: {
        typeIncludesAny: ["清爽水果茶", "气泡水果茶", "水果绿茶"],
        drinkTypeIdIncludes: ["fresh_fruit_tea"],
        audienceIdIncludes: ["student", "office_worker", "fitness"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 65,
        scoreMax: 100,
        feedbackIncludesAny: ["柠檬", "清爽", "酸爽", "茶香", "合理"]
      },
      notes: "与 fresh_bubble_fruit_tea 等价，用 ingredientId 覆盖清爽水果茶和 fruit tea ID 输入路径。"
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
        drinkTypeIdIncludes: ["premium_thick_milk_tea"],
        audienceIdIncludes: ["student", "office_worker", "elderly"],
        forbiddenTypeIncludes: ["口感事故", "奶脂过载", "猎奇实验品"],
        scoreMin: 60,
        scoreMax: 90,
        feedbackTagIncludes: ["premium"],
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
        accidentTypeIdIncludes: ["taste_acid_overload"],
        scoreMin: 0,
        scoreMax: 20,
        feedbackIncludesAny: ["柠檬", "酸", "味蕾", "清爽"],
        tasteSummary: {
          exists: true,
          valueKeysInclude: ["acidity", "acidSharpness", "freshness"],
          riskIncludesAny: ["acid_overload_risk"],
          metadataIncludes: {
            sourceLayer: "taste",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "acidity", sourceLayer: "taste", sourceType: "ingredient", sourceId: "fruit_lemon" }
          ]
        },
        summaryCandidates: {
          exists: true,
          candidateCountMin: 1,
          candidateTypeCountMin: {
            accident: 1
          },
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              candidateType: "accident",
              sourceLayer: "taste",
              sourceSummary: "tasteSummary",
              accidentTypeId: "taste_acid_overload"
            }
          ]
        },
        candidatePriorityShell: {
          exists: true,
          priorityBandIncludes: ["taste_overload"],
          orderedCandidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              candidateType: "accident",
              sourceLayer: "taste",
              sourceSummary: "tasteSummary",
              accidentTypeId: "taste_acid_overload"
            }
          ]
        },
        generatedFeedbackShadow: {
          exists: true,
          candidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            generatedDataAvailable: true,
            adapterAvailable: true
          },
          candidateIncludesAny: [
            {
              textId: "feedback_acid_accident_001",
              feedbackTag: "acid_accident",
              scene: "accident"
            }
          ]
        }
      },
      notes: "极端酸度样本，不应被清爽组合洗白。"
    },
    {
      id: "high_lemon_acid_accident",
      name: "高柠檬酸度事故",
      cup: [
        { name: "柠檬", ratio: 65 },
        { name: "绿茶", ratio: 20 },
        { name: "气泡水", ratio: 10 },
        { name: "蜂蜜", ratio: 5 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        accidentTypeIdIncludes: ["taste_acid_overload"],
        scoreMin: 0,
        scoreMax: 40,
        feedbackIncludesAny: ["柠檬", "酸", "味蕾", "打架", "事故"]
      },
      notes: "保护柠檬 60-80 高酸度事故档，避免后续规则迁移只保护 80+ 极端档；65% 柠檬不应被清爽水果茶方向洗白。"
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
        accidentTypeIdIncludes: ["flavor_durian_overload"],
        scoreMin: 0,
        scoreMax: 25,
        feedbackIncludesAny: ["榴莲", "吸管", "物理", "食道", "开除"]
      },
      notes: "极端榴莲样本，应保持强香气和压迫方向。"
    },
    {
      id: "high_durian_oddity_accident",
      name: "高榴莲猎奇事故",
      cup: [
        { name: "榴莲", ratio: 65 },
        { name: "牛奶", ratio: 20 },
        { name: "红茶", ratio: 15 }
      ],
      expectations: {
        typeIncludes: ["猎奇实验品"],
        accidentTypeIdIncludes: ["flavor_durian_overload"],
        scoreMin: 0,
        scoreMax: 50,
        feedbackIncludesAny: ["榴莲", "香气", "吸管", "心理建设", "挖矿"],
        flavorSummary: {
          exists: true,
          valueKeysInclude: ["aromaPressure", "noveltyRisk", "identityConflictRisk"],
          tagIncludesAny: ["durian", "dominant:durian"],
          riskIncludesAny: ["high_aroma_pressure_risk", "high_novelty_risk"],
          metadataIncludes: {
            sourceLayer: "flavor",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "aromaPressure", sourceLayer: "flavor", sourceType: "ingredient", sourceId: "fruit_durian" },
            { metric: "noveltyRisk", sourceLayer: "flavor", sourceType: "ingredient", sourceId: "fruit_durian" }
          ]
        },
        summaryCandidates: {
          exists: true,
          candidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              sourceLayer: "flavor",
              sourceSummary: "flavorSummary",
              priorityBand: "flavor_identity",
              severityHint: "medium"
            }
          ]
        },
        candidatePriorityShell: {
          exists: true,
          priorityBandIncludes: ["flavor_identity"],
          orderedCandidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              sourceLayer: "flavor",
              sourceSummary: "flavorSummary"
            }
          ]
        }
      },
      notes: "保护榴莲 60-80 高争议猎奇事故档；当前 type 断言用于保护现阶段输出稳定，不代表“猎奇实验品”是最终正式版命名。"
    },
    {
      id: "high_durian_oddity_accident_id_equivalence",
      name: "高榴莲猎奇事故 ID 等价样本",
      cup: [
        { ingredientId: "fruit_durian", ratio: 65 },
        { ingredientId: "dairy_milk", ratio: 20 },
        { ingredientId: "tea_black", ratio: 15 }
      ],
      expectations: {
        typeIncludes: ["猎奇实验品"],
        accidentTypeIdIncludes: ["flavor_durian_overload"],
        scoreMin: 0,
        scoreMax: 50,
        feedbackIncludesAny: ["榴莲", "香气", "吸管", "心理建设", "挖矿"],
        flavorSummary: {
          exists: true,
          valueKeysInclude: ["aromaPressure", "noveltyRisk", "identityConflictRisk"],
          tagIncludesAny: ["durian", "dominant:durian"],
          riskIncludesAny: ["high_aroma_pressure_risk", "high_novelty_risk"],
          metadataIncludes: {
            sourceLayer: "flavor",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "aromaPressure", sourceLayer: "flavor", sourceType: "ingredient", sourceId: "fruit_durian" },
            { metric: "noveltyRisk", sourceLayer: "flavor", sourceType: "ingredient", sourceId: "fruit_durian" }
          ]
        }
      },
      notes: "与 high_durian_oddity_accident 等价，用 ingredientId 覆盖强身份和榴莲事故 ID 输入路径。"
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
        accidentTypeIdIncludes: ["dairy_fat_overload"],
        scoreMin: 0,
        scoreMax: 35,
        feedbackTagIncludes: ["greasy_overload"],
        feedbackIncludesAny: ["奶", "沉重", "负担", "压迫", "油"]
      },
      notes: "奶脂事故样本，不应被甜品饮方向洗白。"
    },
    {
      id: "greasy_overload_id_equivalence",
      name: "奶脂过载 ID 等价样本",
      cup: [
        { ingredientId: "dairy_thick_milk", ratio: 70 },
        { ingredientId: "dairy_cream", ratio: 20 },
        { ingredientId: "dairy_non_dairy_creamer", ratio: 10 }
      ],
      expectations: {
        typeIncludes: ["奶脂过载"],
        accidentTypeIdIncludes: ["dairy_fat_overload"],
        scoreMin: 0,
        scoreMax: 35,
        feedbackTagIncludes: ["greasy_overload"],
        feedbackIncludesAny: ["奶", "沉重", "负担", "压迫", "油"],
        tasteSummary: {
          exists: true,
          valueKeysInclude: ["milkiness", "creaminess", "cloyingRisk"],
          metadataIncludes: {
            sourceLayer: "taste",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "dairy_thick_milk" },
            { sourceLayer: "taste", sourceType: "ingredient", sourceId: "dairy_cream" }
          ]
        }
      },
      notes: "与 greasy_overload 等价，用 ingredientId 覆盖 dairy / highFatDairy ID 输入路径。"
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
        accidentTypeIdIncludes: ["texture_straw_resistance"],
        scoreMin: 0,
        scoreMax: 25,
        feedbackTagIncludes: ["straw_disaster"],
        feedbackTagIncludesAny: ["straw_followup", "thick_straw_followup"],
        feedbackIncludesAny: ["吸管", "半固体", "物理", "勺子", "水泥", "阻力"],
        textureSummary: {
          exists: true,
          valueKeysInclude: ["solidLoad", "strawResistance", "drinkability"],
          riskIncludesAny: ["high_solid_load_risk", "high_straw_resistance_risk"],
          metadataIncludes: {
            sourceLayer: "texture",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_taro_paste" },
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_oreo_crumble" },
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "structure", sourceId: "drinkStructure" }
          ]
        },
        summaryCandidates: {
          exists: true,
          candidateCountMin: 1,
          candidateTypeCountMin: {
            accident: 1
          },
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              candidateType: "accident",
              sourceLayer: "texture",
              sourceSummary: "textureSummary",
              accidentTypeId: "texture_straw_resistance",
              priorityBand: "texture_blocking"
            }
          ]
        },
        candidatePriorityShell: {
          exists: true,
          priorityBandIncludes: ["hard_physical"],
          orderedCandidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            weightsEnabled: false,
            affectsFinalResult: false
          },
          candidateIncludesAny: [
            {
              candidateType: "accident",
              sourceLayer: "texture",
              sourceSummary: "textureSummary"
            }
          ]
        },
        generatedFeedbackShadow: {
          exists: true,
          candidateCountMin: 1,
          metadataIncludes: {
            readonly: true,
            generatedDataAvailable: true,
            adapterAvailable: true
          },
          candidateIncludesAny: [
            {
              textId: "feedback_straw_disaster_001",
              feedbackTag: "straw_disaster",
              scene: "accident"
            }
          ]
        }
      },
      notes: "高固体负载样本，应保持吸管阻力事故方向。"
    },
    {
      id: "straw_resistance_accident_id_equivalence",
      name: "吸管阻力事故 ID 等价样本",
      cup: [
        { ingredientId: "topping_taro_paste", ratio: 45 },
        { ingredientId: "topping_oreo_crumble", ratio: 32 },
        { ingredientId: "topping_pearl", ratio: 16 },
        { ingredientId: "sweetener_honey", ratio: 7 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        accidentTypeIdIncludes: ["texture_straw_resistance"],
        scoreMin: 0,
        scoreMax: 25,
        feedbackTagIncludes: ["straw_disaster"],
        feedbackTagIncludesAny: ["straw_followup", "thick_straw_followup"],
        feedbackIncludesAny: ["吸管", "半固体", "物理", "勺子", "水泥", "阻力"],
        textureSummary: {
          exists: true,
          valueKeysInclude: ["solidLoad", "strawResistance", "drinkability"],
          riskIncludesAny: ["high_solid_load_risk", "high_straw_resistance_risk"],
          metadataIncludes: {
            sourceLayer: "texture",
            readonly: true,
            weightsEnabled: false
          },
          evidenceIncludesAny: [
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_taro_paste" },
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "ingredient", sourceId: "topping_oreo_crumble" },
            { metric: "strawResistance", sourceLayer: "texture", sourceType: "structure", sourceId: "drinkStructure" }
          ]
        }
      },
      notes: "与 straw_resistance_accident 等价，用 ingredientId 覆盖 strawResistance / texture ID 输入路径。"
    },
    {
      id: "oreo_overload_texture_accident",
      name: "奥利奥碎过量口感事故",
      cup: [
        { name: "奥利奥碎", ratio: 45 },
        { name: "牛奶", ratio: 35 },
        { name: "红茶", ratio: 20 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        scoreMin: 0,
        scoreMax: 55,
        feedbackIncludesAny: ["奥利奥", "吸管", "矿层", "甜品", "开采"]
      },
      notes: "为后续迁移奥利奥碎过量事故提供回归保护，重点保护 >40 的初始事故档，而不是只保护 >60 的极端档。"
    },
    {
      id: "oreo_low_drinkability_migration",
      name: "奥利奥低可饮用性迁移",
      cup: [
        { name: "奥利奥碎", ratio: 45 },
        { name: "红茶", ratio: 55 }
      ],
      expectations: {
        typeIncludes: ["口感事故"],
        accidentTypeIdIncludes: ["texture_low_drinkability"],
        scoreMin: 0,
        scoreMax: 40,
        feedbackIncludesAny: ["奥利奥", "吸管", "开采", "甜品矿层", "粉渣"]
      },
      notes: "保护 v0.0.7.47 Oreo actual migration：奥利奥粉渣 / 吸管开采证据保留在 note / feedback copy，事故 ID 使用通用低可饮用性。"
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
        outcomeTypeIdIncludes: ["flavor_identity_conflict"],
        forbiddenTypeIncludes: ["经典奶茶", "清爽水果茶"],
        scoreMin: 15,
        scoreMax: 45,
        feedbackIncludesAny: ["气泡", "奶油", "打架", "思考人生", "奇怪"]
      },
      notes: "气泡和奶油冲突样本，不应被判成经典稳定款。"
    },
    {
      id: "bubble_cream_conflict_id_equivalence",
      name: "气泡奶油冲突 ID 等价样本",
      cup: [
        { ingredientId: "liquid_sparkling_water", ratio: 50 },
        { ingredientId: "dairy_cream", ratio: 40 },
        { ingredientId: "sweetener_honey", ratio: 10 }
      ],
      expectations: {
        typeIncludesAny: ["口感冲突", "实验特调"],
        outcomeTypeIdIncludes: ["flavor_identity_conflict"],
        forbiddenTypeIncludes: ["经典奶茶", "清爽水果茶"],
        scoreMin: 15,
        scoreMax: 45,
        feedbackIncludesAny: ["气泡", "奶油", "打架", "思考人生", "奇怪"]
      },
      notes: "与 bubble_cream_conflict 等价，用 ingredientId 覆盖 bad combination ID 输入路径。"
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
    },
    {
      id: "taro_low_drinkability_migration",
      name: "芋泥低可饮用性迁移",
      cup: [
        { name: "芋泥", ratio: 55 },
        { name: "红茶", ratio: 45 }
      ],
      expectations: {
        typeIncludesAny: ["实验特调"],
        accidentTypeIdIncludes: ["texture_low_drinkability"],
        scoreMin: 0,
        scoreMax: 40,
        feedbackIncludesAny: ["芋泥", "稠度", "不太愿意流动", "吸管"]
      },
      notes: "保护 v0.0.7.46 taro actual migration：芋泥证据保留在 note / feedback copy，事故 ID 使用通用低可饮用性。"
    }
  ];

  root.MILK_TEA_LAB_GOLDEN_SAMPLES = {
    goldenSamples
  };

  if (typeof module !== "undefined") {
    module.exports = { goldenSamples };
  }
})(typeof window !== "undefined" ? window : globalThis);
