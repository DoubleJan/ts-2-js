"use strict";
// 枚举类型
exports.__esModule = true;
// 默认枚举
var CardSuit;
(function (CardSuit) {
    CardSuit[CardSuit["Clubs"] = 0] = "Clubs";
    CardSuit[CardSuit["Diamonds"] = 1] = "Diamonds";
    CardSuit[CardSuit["Hearts"] = 2] = "Hearts";
    CardSuit[CardSuit["Spades"] = 3] = "Spades";
})(CardSuit || (CardSuit = {}));
// 指定初始值的枚举
var CardSuitFromOne;
(function (CardSuitFromOne) {
    CardSuitFromOne[CardSuitFromOne["Clubs"] = 1] = "Clubs";
    CardSuitFromOne[CardSuitFromOne["Diamonds"] = 2] = "Diamonds";
    CardSuitFromOne[CardSuitFromOne["Hearts"] = 3] = "Hearts";
    CardSuitFromOne[CardSuitFromOne["Spades"] = 4] = "Spades";
})(CardSuitFromOne || (CardSuitFromOne = {}));
// 指定非数字类型值的枚举
var CardSuitString;
(function (CardSuitString) {
    CardSuitString["Clubs"] = "CLUBS";
    CardSuitString["Diamonds"] = "DIAMONDS";
    CardSuitString["Hearts"] = "HEARTS";
    CardSuitString["Spades"] = "SPADES";
})(CardSuitString || (CardSuitString = {}));
exports["default"] = (function () {
    console.log('TypeScript 枚举类型');
    console.log("\n        \u9ED8\u8BA4\u679A\u4E3E\uFF08CardSuit\uFF09\uFF1A " + JSON.stringify(CardSuit) + ";\n\n        \u8BBE\u5B9A\u8D77\u59CB\u503C\u7684\u679A\u4E3E\uFF08CardSuitFromOne\uFF09\uFF1A " + JSON.stringify(CardSuitFromOne) + ";\n\n        \u6307\u5B9A\u975E\u6570\u5B57\u7C7B\u578B\u503C\u7684\u679A\u4E3E\uFF08CardSuitString\uFF09\uFF1A " + JSON.stringify(CardSuitString) + ";\n\n        \u5E38\u91CF\u679A\u4E3E\uFF08CardSuitConst\uFF09\uFF1A " + JSON.stringify(0 /* Clubs */) + ";\n    ");
    console.log('\n');
    // 常量枚举，仅使用常量名会报错
    // console.log('常量枚举（CardSuitConst）：', CardSuitConst);
});
