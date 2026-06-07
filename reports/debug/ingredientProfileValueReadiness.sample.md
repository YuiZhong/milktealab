# Ingredient Profile Value Readiness Audit

> 本报告是只读 inventory / readiness audit。
> 它不代表原料数值正确，不修改任何原料 profile，不做联网资料校准，不生成正式 ingredient value draft。
> 当前不能用它判断新系统建议分是否准确；现在只能说明材料事实层已有多少数据、缺什么结构。
> 后续批量原料数值阶段应结合联网资料、食品数据、论文、pH、糖度、脂肪 / 固体 / 质地常识，再由 ChatGPT + 用户进行游戏化校正。

## 0. 速读结论

- 原料总数：37
- taste profile 覆盖：33/37，缺失 4
- texture profile 覆盖：37/37，缺失 0
- flavor profile 覆盖：37/37，缺失 0
- 当前 generatedSeveritySuggestion draft scoreDelta 读取的 metrics：solidLoad, fatLoad, drinkabilityPenalty, acidity, bitterness
- 当前读取路径：taste metrics 来自 taste profile -> tasteSummary；texture metrics 来自 texture profile / drink structure -> textureSummary。
- 当前所有 draft scoreDelta metrics 都未正式校准，不应直接用于 final score、final feedback、final result 或 golden expected。
- 下一步建议：不要继续肉眼调误伤；应先做资料参考的 profile value draft，或先对 8-12 个核心原料做更细 readiness split。

## 1. Profile coverage table

中文显示名只用于 report 展示，不作为判断主键。

| ingredientId | displayName / name | category | hasTasteProfile | tasteValueKeys | hasTextureProfile | textureValueKeys | hasFlavorProfile | flavorValueKeys | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tea_black | 红茶 | 茶类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| tea_green | 绿茶 | 茶类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| tea_oolong | 乌龙茶 | 茶类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| tea_jasmine | 茉莉茶 | 茶类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| tea_puer | 普洱茶 | 茶类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_milk | 牛奶 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_thick_milk | 厚乳 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_cream | 淡奶油 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_coconut_milk | 椰奶 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_oat_milk | 燕麦奶 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| dairy_non_dairy_creamer | 植脂奶 | 乳类 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| liquid_water | 纯水 | 液体 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| liquid_sparkling_water | 气泡水 | 液体 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| liquid_coffee | 咖啡 | 液体 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_lemon | 柠檬 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_strawberry | 草莓 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_mango | 芒果 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_durian | 榴莲 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_watermelon | 西瓜 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_grape | 葡萄 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_peach | 桃子 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| fruit_lychee | 荔枝 | 水果/风味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| flavor_matcha | 抹茶 | 水果/风味 | no | - | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | missing tasteProfile; texture lacks metadata/source note; flavor lacks confidence/review status |
| flavor_cocoa | 可可 | 水果/风味 | no | - | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | missing tasteProfile; texture lacks metadata/source note; flavor lacks confidence/review status |
| sweetener_white_sugar | 白糖 | 调味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| sweetener_honey | 蜂蜜 | 调味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| sweetener_brown_sugar | 黑糖 | 调味 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| sweetener_caramel | 焦糖 | 调味 | no | - | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | missing tasteProfile; texture lacks metadata/source note; flavor lacks confidence/review status |
| seasoning_sea_salt | 海盐 | 调味 | no | - | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | missing tasteProfile; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_pearl | 珍珠 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_coconut_jelly | 椰果 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_pudding | 布丁 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_grass_jelly | 仙草 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_taro_ball | 芋圆 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_oreo_crumble | 奥利奥碎 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_taro_paste | 芋泥 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |
| topping_cheese_foam | 奶盖 | 小料 | yes | acidity, aromaImpact, bitterness, freshness, heaviness, milkiness, strawResistance, sweetness, tea, viscosity, weirdness | yes | chewiness, drinkabilityPenalty, fatLoad, foamLayer, gelSoftness, liquidSupportNeed, pasteRisk, sediment, solidLoad, strawResistance | yes | aromaPressure, beverageFit, dessertFit, dominantPotential, identityStrength, noveltyRisk, savoryRisk | taste lacks metadata/source note; texture lacks metadata/source note; flavor lacks confidence/review status |

## 2. Metric inventory

### tasteProfile / tasteSummary value keys

| valueKey | profileCount | usedByCurrentSummaryPath |
| --- | --- | --- |
| acidity | 33 | yes |
| aromaImpact | 33 | no |
| bitterness | 33 | yes |
| freshness | 33 | yes |
| heaviness | 33 | no |
| milkiness | 33 | yes |
| strawResistance | 33 | no |
| sweetness | 33 | yes |
| tea | 33 | yes |
| viscosity | 33 | no |
| weirdness | 33 | no |

### textureProfile / textureSummary value keys

| valueKey | profileCount | usedByCurrentSummaryPath |
| --- | --- | --- |
| chewiness | 37 | yes |
| drinkabilityPenalty | 37 | yes |
| fatLoad | 37 | yes |
| foamLayer | 37 | yes |
| gelSoftness | 37 | yes |
| liquidSupportNeed | 37 | yes |
| pasteRisk | 37 | yes |
| sediment | 37 | yes |
| solidLoad | 37 | yes |
| strawResistance | 37 | yes |

### flavorProfile / flavorSummary value keys

| valueKey | profileCount | usedByCurrentSummaryPath |
| --- | --- | --- |
| aromaPressure | 37 | yes |
| beverageFit | 37 | yes |
| dessertFit | 37 | yes |
| dominantPotential | 37 | yes |
| identityStrength | 37 | yes |
| noveltyRisk | 37 | yes |
| savoryRisk | 37 | yes |

## 3. Draft scoreDelta dependency

| metric | layer | sourceSummary | current observation path | observable now | officially calibrated | safe for final score | needs next |
| --- | --- | --- | --- | --- | --- | --- | --- |
| solidLoad | texture | textureSummary | ingredientTextureProfiles[*].effects.solidLoad -> textureSummary.values.solidLoad | yes | no | no | 正式 threshold / severityLevel / scoreMultiplier / drinkType expectation / positive synergy / customer preference review |
| fatLoad | texture | textureSummary | ingredientTextureProfiles[*].effects.fatLoad -> textureSummary.values.fatLoad | yes | no | no | 奶脂负担资料参考、口感边界、正式 threshold / severityLevel / scoreMultiplier review |
| drinkabilityPenalty | texture | textureSummary | ingredientTextureProfiles[*].effects.drinkabilityPenalty -> textureSummary.values.drinkabilityPenalty | yes | no | no | 低流动性资料参考、drinkability / strawResistance 边界、正式 threshold / scoreMultiplier review |
| acidity | taste | tasteSummary | tasteProfiles[*].acidity -> tasteSummary.values.acidity | yes | no | no | pH / 酸味强度资料参考、饮品类型预期、正式 threshold / scoreMultiplier review |
| bitterness | taste | tasteSummary | tasteProfiles[*].bitterness -> tasteSummary.values.bitterness | yes | no | no | 苦味 / 茶感 / 咖啡资料参考、客群 tolerance、正式 threshold / scoreMultiplier review |

## 4. Obvious readiness gaps

### Missing profile coverage

- 缺 tasteProfile：抹茶 (flavor_matcha), 可可 (flavor_cocoa), 焦糖 (sweetener_caramel), 海盐 (seasoning_sea_salt)
- 缺 textureProfile：无
- 缺 flavorProfile：无

### Metadata / review status gaps

- taste profile 当前主要是 numeric values + tags，没有统一 evidence / source note / confidence / review status metadata。
- texture profile 当前主要是 form / textureFamily / tags / effects，没有统一 evidence / source note / confidence / review status metadata。
- flavor profile 有基础 metadata，但没有逐原料 confidence / review status / external source note。
- 当前不判断任何原料数值是否真实准确，因为本轮未联网、未查 pH / 糖度 / 脂肪 / 质地资料。

### Draft scoreDelta gaps

- 仍缺正式 threshold / severityLevel / scoreMultiplier。
- 仍缺 drinkType expectation / positive synergy / customer preference 对同一 metric 的调节。
- 仍缺正式 triggerMetric registry / validator / generated severity data。
- 当前 draft scoreDelta 只是 UI debug suggestion，不应被当成正式评分来源。

## 5. Recommended next step

建议下一步进入第一批联网资料参考 ingredient profile value draft planning / small batch，或先挑 8-12 个核心原料做资料参考草案。

可优先覆盖当前 calibration presets 中的核心原料：

- 红茶 (tea_black)
- 牛奶 (dairy_milk)
- 珍珠 (topping_pearl)
- 绿茶 (tea_green)
- 气泡水 (liquid_sparkling_water)
- 柠檬 (fruit_lemon)
- 蜂蜜 (sweetener_honey)
- 乌龙茶 (tea_oolong)
- 厚乳 (dairy_thick_milk)
- 奶盖 (topping_cheese_foam)
- 海盐 (seasoning_sea_salt)
- 淡奶油 (dairy_cream)
- 植脂奶 (dairy_non_dairy_creamer)
- 芋泥 (topping_taro_paste)
- 奥利奥碎 (topping_oreo_crumble)

额外建议纳入第一批的小型核心原料：

- 红茶
- 绿茶
- 乌龙茶
- 牛奶
- 厚乳
- 淡奶油
- 奶盖
- 珍珠
- 芋泥
- 奥利奥碎
- 柠檬
- 气泡水
- 蜂蜜

注意：本轮只建议，不生成任何新数值，不创建 CSV / JSON profile draft，不写入 `data/generated`。
