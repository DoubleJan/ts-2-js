// 枚举类型

// 默认枚举
enum CardSuit { Clubs, Diamonds, Hearts, Spades }

// 指定初始值的枚举
enum CardSuitFromOne { Clubs = 1, Diamonds, Hearts, Spades }

// 指定非数字类型值的枚举
enum CardSuitString { Clubs = 'CLUBS', Diamonds = 'DIAMONDS', Hearts = 'HEARTS', Spades = 'SPADES' }

// 错误的写法
// enum CardSuitErrorString { Clubs = 'CLUBS', Diamonds, Hearts, Spades = 'SPADES' }

// 常量枚举
const enum CardSuitConst { Clubs, Diamonds, Hearts, Spades }


export default () => {
    console.log('TypeScript 枚举类型');

    console.log(`
        默认枚举（CardSuit）： ${JSON.stringify(CardSuit)};

        设定起始值的枚举（CardSuitFromOne）： ${JSON.stringify(CardSuitFromOne)};

        指定非数字类型值的枚举（CardSuitString）： ${JSON.stringify(CardSuitString)};

        常量枚举（CardSuitConst）： ${JSON.stringify(CardSuitConst.Clubs)};
    `);
    console.log('\n');

    // 常量枚举，仅使用常量名会报错
    // console.log('常量枚举（CardSuitConst）：', CardSuitConst);
}