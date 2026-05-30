window.MILK_TEA_LAB_SYNERGY_RULES = {
  comboRules: [
    { kind: "good", names: ["气泡水", "柠檬"], score: 12, add: { fresh: 22, bubble: 6, photo: 8 }, note: "气泡和柠檬很会营业，清爽得像刚从冰箱里升职。" },
    { kind: "good", names: ["绿茶", "柠檬"], score: 11, add: { fresh: 16, tea: 10, acid: 4, photo: 6 }, note: "绿茶和柠檬配合得很灵，茶香没有被酸味按在地上。" },
    { kind: "good", names: ["红茶", "牛奶"], score: 13, add: { milk: 10, tea: 9, thick: 5 }, note: "红茶和牛奶配合得很稳，是不会出错的经典款。" },
    { kind: "good", names: ["乌龙茶", "厚乳"], score: 14, add: { milk: 12, tea: 10, thick: 8, photo: 9 }, note: "乌龙和厚乳配得很稳，奶盖把层次托起来了。" },
    { kind: "good", names: ["咖啡", "牛奶"], score: 11, add: { milk: 11, thick: 5, photo: 5 }, note: "咖啡加牛奶成熟顺口，像一个终于会回消息的大人。" },
    { kind: "good", names: ["草莓", "淡奶油"], score: 11, add: { sweet: 9, thick: 11, fruit: 9, photo: 13 }, note: "草莓和奶油一碰面，甜品柜台已经自己亮灯了。" },
    { kind: "good", names: ["芒果", "椰奶"], score: 12, add: { fruit: 14, fresh: 8, milk: 7, photo: 10 }, note: "芒果椰奶热带感很足，试喝员差点申请年假。" },
    { kind: "bad", names: ["气泡水", "淡奶油"], score: -20, add: { odd: 30, bubble: 5, thick: 10, difficulty: 12 }, note: "气泡和奶油在杯子里打架，试喝员正在思考人生。" },
    { kind: "bad", names: ["气泡水", "厚乳"], score: -17, add: { odd: 26, thick: 16, difficulty: 10 }, note: "这杯像会冒泡的奶糊，吸管正在和物理学谈判。" },
    { kind: "bad", names: ["榴莲", "咖啡"], score: -18, add: { odd: 30, thick: 8, difficulty: 10 }, note: "榴莲味很有主见，已经把其他材料全部开除了。" },
    { kind: "bad", names: ["柠檬", "牛奶"], score: -24, add: { odd: 35, acid: 8, thick: 8, difficulty: 12 }, note: "柠檬和牛奶见面后，口感当场提交了事故报告。" },
    { kind: "bad", names: ["芋泥", "气泡水"], score: -22, add: { odd: 34, bubble: 8, thick: 22, difficulty: 14 }, note: "芋泥气泡水，简称泥浆快乐水。快乐是谁的还不好说。" }
  ],
  heavyFlavorNames: ["厚乳", "淡奶油", "奶盖", "牛奶", "椰奶", "榴莲", "芋泥", "奥利奥碎"],
  dairyNames: ["牛奶", "厚乳", "淡奶油", "椰奶", "燕麦奶", "植脂奶", "奶盖"],
  highFatDairyNames: ["厚乳", "淡奶油", "奶盖", "植脂奶"],
  strawResistanceNames: ["芋泥", "奥利奥碎", "珍珠", "芋圆", "布丁", "仙草", "椰果"],
  clearLiquidNames: ["纯水", "气泡水", "咖啡", "红茶", "绿茶", "乌龙茶", "茉莉茶", "普洱茶"]
};
