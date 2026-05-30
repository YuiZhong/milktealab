(function() {
const { feedbackPools } = window.MILK_TEA_LAB_FEEDBACK_TEXTS;
const { pick } = window.MILK_TEA_LAB_HELPERS;

function makeFeedback(attr, score, notes, hasAccident = false) {
  const parts = [];
  if (notes.length) parts.push(hasAccident ? notes[0] : pick(notes));

  if (hasAccident) {
    if (attr.straw >= 65 || (attr.thick >= 78 && attr.straw >= 48)) {
      parts.push(pick([
        "吸管刚插进去就提交了辞职信。",
        "试喝员努力吸了一口，结果只吸到了人生的阻力。",
        "它不是难喝，它是物理意义上很难喝到。"
      ]));
    } else if (attr.greasy >= 68) {
      parts.push(pick([
        "试喝员喝完沉默了，不是难喝，是太沉重。",
        "它不是吸不上来，是喝下去以后不太下得去。",
        "奶脂感已经不是香，是压迫。"
      ]));
    } else if (attr.acid >= 70) {
      parts.push(pick([
        "试喝员喝完眨了三次眼，灵魂还停在上一口。",
        "这杯不是提神，是给味蕾安排突击考试。",
        "这不是试喝，是一次工伤。"
      ]));
    } else {
      parts.push(pick([
        "试喝员喝完没有说话，只是把工牌摘下来了。",
        "它很有想法，问题是想法太多，已经开会吵起来了。",
        "你想干啥？杯子刚才明显愣了一下。"
      ]));
    }
  } else if (attr.thick >= 70 && attr.straw < 48) {
    parts.push(pick([
      "这杯奶感很足，足到像在喝一份会流动的下午茶。",
      "好喝是好喝，就是喝完胃可能想请半天假。",
      "奶油感很强，快乐是真的，负担也是真的。",
      "它不像奶茶，更像一份假装成饮料的甜品。",
      "第一口很幸福，第三口开始需要勇气。"
    ]));
  } else if (notes[0]?.includes("红茶和牛奶")) {
    parts.push(pick(feedbackPools.classic));
  } else if (notes[0]?.includes("乌龙")) {
    parts.push(pick(feedbackPools.premium));
  } else if (notes[0]?.includes("牛奶把榴莲")) {
    parts.push(pick([
      "榴莲牛乳路线是成立的，就是需要观众先确认自己站哪一边。",
      "喜欢榴莲的人会觉得顺，路人可能会先保持礼貌距离。",
      "它不算翻车，更像一杯明确知道自己会被争议的奶昔。"
    ]));
  } else if (score >= 72) {
    parts.push(pick(attr.fresh >= 50 ? feedbackPools.fresh : feedbackPools.good));
  } else if (score >= 56) {
    parts.push(pick(attr.tea >= 28 && attr.milk >= 24 ? feedbackPools.classic : feedbackPools.good));
  } else if (attr.sweet >= 72 && attr.odd < 48) {
    parts.push(pick(feedbackPools.sweet));
  } else {
    parts.push(pick(feedbackPools.weird));
  }

  if (attr.straw >= 70) parts.push(pick([
    "建议配勺子，不然吸管会开始怀疑人生。",
    "它不是难喝，它是物理意义上很难喝到。",
    "吸管刚插进去就提交了辞职信。"
  ]));
  if (attr.thick >= 78 && attr.straw < 70 && attr.greasy < 68) parts.push(pick([
    "这杯奶感很足，足到像在喝一份会流动的下午茶。",
    "奶油感很强，快乐是真的，负担也是真的。",
    "第一口很幸福，第三口开始需要勇气。"
  ]));
  if (attr.thick >= 78 && attr.straw >= 70) parts.push(pick([
    "稠度已经很有存在感，吸一口需要一点信念。",
    "这杯已经很有存在感，问题是它不太愿意流动。",
    "建议配勺子，不然吸管会怀疑自己的职业选择。"
  ]));
  if (attr.acid >= 62 && attr.milk >= 28) parts.push("酸和奶的关系比较紧张，建议让它们先冷静一下。");
  if (attr.bubble >= 50 && attr.thick >= 58) parts.push("气泡想往上冲，厚重感想往下坐，场面很热闹。");

  return [...new Set(parts)].slice(0, 3).join(" ");
}

window.MILK_TEA_LAB_FEEDBACK_ENGINE = {
  makeFeedback
};
})();
