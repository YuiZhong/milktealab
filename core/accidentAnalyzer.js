(function() {
const { sumIngredientGroup } = window.MILK_TEA_LAB_INGREDIENT_GROUP_HELPER;
const { pick } = window.MILK_TEA_LAB_HELPERS;
const { evaluateAccidentRules } = window.MILK_TEA_LAB_ACCIDENT_RULE_ENGINE;
const { evaluateStructureAccidentRules } = window.MILK_TEA_LAB_STRUCTURE_ACCIDENT_RULE_ENGINE;

function isTextureAccident(accident) {
  return accident.type === "口感事故" && (
    (accident.add?.straw || 0) >= 40 ||
    /吸管|半固体|水泥|物理|勺子/.test(accident.note)
  );
}

function detectAccidents(context) {
  const accidents = [];
  const taro = context.ratioOf("芋泥");
  const oreo = context.ratioOf("奥利奥碎");
  const cream = context.ratioOf("淡奶油");
  const thickMilk = context.ratioOf("厚乳");
  const plantMilk = context.ratioOf("植脂奶");
  const heavyTotal = sumIngredientGroup(context, "heavyFlavor");
  const dairyTotal = sumIngredientGroup(context, "dairy");
  const highFatDairyTotal = sumIngredientGroup(context, "highFatDairy");
  const strawTotal = sumIngredientGroup(context, "strawResistance");
  const clearTotal = sumIngredientGroup(context, "clearLiquid");

  accidents.push(...evaluateAccidentRules(context));

  if ((dairyTotal > 80 && highFatDairyTotal > 50) || highFatDairyTotal > 65 || cream > 50 || thickMilk > 60) {
    const severe = cream > 65 || thickMilk > 68 || highFatDairyTotal > 80 || dairyTotal > 92;
    accidents.push({
      accidentTypeId: "dairy_fat_overload",
      type: "奶脂过载",
      cap: severe ? 34 : 48,
      score: severe ? -38 : -18,
      add: { greasy: severe ? 72 : 50, thick: severe ? 38 : 24, milk: 20, fresh: -28, difficulty: 12, cost: 12 },
      note: pick([
        "第一口像奖励，第二口像惩罚，第三口开始怀疑人生。",
        "奶味不是越多越好，这杯已经把幸福熬成了负担。",
        "喝第一口很快乐，喝第二口开始想找热水。",
        "这杯不像饮料，像把蛋糕上的奶油刮下来冲开了。",
        "试喝员喝完沉默了，不是难喝，是太沉重。",
        "它不是吸不上来，是喝下去以后不太下得去。",
        "奶脂感已经不是香，是压迫。",
        "喝完胃里像开了一场奶油年会。",
        "快乐是真的，负担也是真的。"
      ])
    });
  }

  if (plantMilk > 45 || (plantMilk > 30 && dairyTotal > 0 && plantMilk / dairyTotal > 0.55)) {
    accidents.push({
      accidentTypeId: "industrial_creamer_overload",
      type: "工业奶茶",
      cap: plantMilk > 65 ? 52 : 62,
      score: plantMilk > 65 ? -22 : -12,
      add: { milk: 12, greasy: 24, odd: 24, cost: -12, photo: -10, difficulty: -4 },
      note: pick([
        "一股子廉价味，像便利店第二排最便宜的饮料。",
        "奶味是有了，但像是从配料表里硬挤出来的。",
        "这杯喝起来很努力地想装成牛奶。",
        "试喝员看了一眼配料，开始担心自己的体检报告。",
        "这绝对对健康有害吧？",
        "喝完感觉配料表在报警。",
        "它不是不好喝，是有一种很熟悉的工业快乐。",
        "奶感很努力，但努力得有点塑料。"
      ])
    });
  }

  if (taro > 50) {
    accidents.push({
      accidentTypeId: "texture_taro_overload",
      type: "实验特调",
      cap: 52,
      score: -24,
      add: { thick: 28, straw: 34, odd: 12, difficulty: 14 },
      note: pick([
        "芋泥比例太高，稠度明显上升，这杯已经开始不太愿意流动。",
        "这杯芋泥含量高到像在喝装修前的墙面。"
      ])
    });
  }

  if (oreo > 40) {
    accidents.push({
      accidentTypeId: "texture_oreo_overload",
      type: "口感事故",
      cap: oreo > 60 ? 32 : 48,
      score: oreo > 60 ? -44 : -24,
      add: { straw: 42, thick: 16, odd: 18, difficulty: 14 },
      note: "奥利奥碎比例太高，喝起来像在用吸管开采甜品矿层。"
    });
  }

  ["珍珠", "芋圆", "布丁", "仙草", "椰果"].forEach(name => {
    const ratio = context.ratioOf(name);
    if (ratio > 45) {
      accidents.push({
        accidentTypeId: "texture_topping_overload",
        type: "实验特调",
        cap: ratio > 65 ? 38 : 55,
        score: ratio > 65 ? -34 : -18,
        add: { straw: 34, thick: 8, difficulty: 12 },
        note: `${name}比例太高，已经不是加小料，是给吸管安排体能测试。`
      });
    }
  });

  const strongFlavor = ["抹茶", "可可", "咖啡"].find(name => context.ratioOf(name) > 60);
  if (strongFlavor) {
    accidents.push({
      accidentTypeId: "taste_strong_flavor_overload",
      type: "实验特调",
      cap: 55,
      score: -24,
      add: { odd: 20, thick: 12, difficulty: 10 },
      note: `${strongFlavor}比例太猛，整杯饮料被它一个人拿着话筒开演唱会。`
    });
  }

  if ((strawTotal >= 52 && clearTotal <= 25) || (strawTotal >= 68 && clearTotal <= 40) || (strawTotal >= 45 && heavyTotal >= 48 && clearTotal <= 35)) {
    accidents.push({
      accidentTypeId: "texture_straw_resistance",
      type: "口感事故",
      cap: strawTotal >= 68 || (strawTotal >= 45 && heavyTotal >= 48) ? 25 : 36,
      score: strawTotal >= 68 || (strawTotal >= 45 && heavyTotal >= 48) ? -62 : -42,
      add: { straw: 62, thick: heavyTotal >= 45 ? 34 : 16, odd: 34, difficulty: 25, fresh: -18 },
      note: pick([
        "这杯不是饮料，是需要装修队施工的半固体。",
        "吸管刚插进去就提交了辞职信。",
        "试喝员努力吸了一口，结果只吸到了人生的阻力。",
        "建议改名叫可食用水泥，至少比较诚实。",
        "它不是难喝，它是物理意义上很难喝到。"
      ])
    });
  }

  const structureAccidents = evaluateStructureAccidentRules(context.structure);
  if (structureAccidents.length && !accidents.some(isTextureAccident)) {
    accidents.push(...structureAccidents);
  }

  return accidents;
}

window.MILK_TEA_LAB_ACCIDENT_ANALYZER = {
  detectAccidents
};
})();
