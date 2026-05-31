(() => {
const feedbackPools = {
    good: [
      "这杯很清爽，像夏天突然原谅了你。",
      "它不花哨，但很会做人，试喝员愿意再来一口。",
      "配方思路清楚，像一杯知道自己要去哪里的饮料。"
    ],
    classic: [
      "红茶和牛奶配合得很稳，是不会出错的经典款。",
      "这杯不花哨，但很会做人。",
      "它像一杯知道自己任务是什么的奶茶。"
    ],
    premium: [
      "乌龙和厚乳配得很稳，奶盖把层次托起来了。",
      "这杯有点高级，像突然知道自己要卖给谁的饮料。",
      "贵是贵，但确实有点像样。"
    ],
    weird: [
      "你想干啥？杯子刚才明显愣了一下。",
      "试喝员喝完没有说话，只是把工牌摘下来了。",
      "它很有想法，问题是想法太多，已经开会吵起来了。"
    ],
    sweet: [
      "甜度很会撒娇，再多一点就要开始黏人了。",
      "这杯适合奖励自己，也适合让牙齿提前写周报。",
      "甜品感拉满，喝完可能会想给杯子买个小蛋糕。"
    ],
    fresh: [
      "清爽度在线，像刚吹过空调的下午。",
      "酸甜和水感都挺灵，适合拿去拯救闷热天气。",
      "入口很轻快，试喝员的眉头终于下班了。"
    ],
    strawDisaster: [
      "吸管刚插进去就提交了辞职信。",
      "试喝员努力吸了一口，结果只吸到了人生的阻力。",
      "它不是难喝，它是物理意义上很难喝到。"
    ],
    greasyOverload: [
      "试喝员喝完沉默了，不是难喝，是太沉重。",
      "它不是吸不上来，是喝下去以后不太下得去。",
      "奶脂感已经不是香，是压迫。"
    ],
    acidAccident: [
      "试喝员喝完眨了三次眼，灵魂还停在上一口。",
      "这杯不是提神，是给味蕾安排突击考试。",
      "这不是试喝，是一次工伤。"
    ],
    accident: [
      "试喝员喝完没有说话，只是把工牌摘下来了。",
      "它很有想法，问题是想法太多，已经开会吵起来了。",
      "你想干啥？杯子刚才明显愣了一下。"
    ],
    dessertRich: [
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "好喝是好喝，就是喝完胃可能想请半天假。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "它不像奶茶，更像一份假装成饮料的甜品。",
      "第一口很幸福，第三口开始需要勇气。"
    ],
    durianMilk: [
      "榴莲牛乳路线是成立的，就是需要观众先确认自己站哪一边。",
      "喜欢榴莲的人会觉得顺，路人可能会先保持礼貌距离。",
      "它不算翻车，更像一杯明确知道自己会被争议的奶昔。"
    ],
    strawFollowup: [
      "建议配勺子，不然吸管会开始怀疑人生。",
      "它不是难喝，它是物理意义上很难喝到。",
      "吸管刚插进去就提交了辞职信。"
    ],
    thickFollowup: [
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "第一口很幸福，第三口开始需要勇气。"
    ],
    thickStrawFollowup: [
      "稠度已经很有存在感，吸一口需要一点信念。",
      "这杯已经很有存在感，问题是它不太愿意流动。",
      "建议配勺子，不然吸管会怀疑自己的职业选择。"
    ],
    acidMilkConflict: [
      "酸和奶的关系比较紧张，建议让它们先冷静一下。"
    ],
    bubbleConflict: [
      "气泡想往上冲，厚重感想往下坐，场面很热闹。"
    ]
};

const feedbackTagPools = {
  accident: "accident",
  straw_disaster: "strawDisaster",
  greasy_overload: "greasyOverload",
  acid_accident: "acidAccident",
  weird: "weird",
  classic: "classic",
  premium: "premium",
  fresh: "fresh",
  sweet: "sweet",
  dessert: "dessertRich",
  durian: "durianMilk",
  bubble_conflict: "bubbleConflict",
  normal_good: "good",
  straw_followup: "strawFollowup",
  thick_followup: "thickFollowup",
  thick_straw_followup: "thickStrawFollowup",
  acid_milk_conflict: "acidMilkConflict"
};

window.MILK_TEA_LAB_FEEDBACK_TEXTS = {
  feedbackPools,
  feedbackTagPools
};
})();
