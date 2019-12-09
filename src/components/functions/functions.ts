// 函数类型

// 函数类型
function defineFunctionType(): string {
    function add (x: number, y: number): string {
        return `x<${typeof x}>: ${x}, y<${typeof y}>: ${y}, x + y = ${x+y}`;
    }
    return add(1, 3);
}

// 匿名函数的，完整的函数类型定义
// 匿名函数通常要赋值给一个变量，完整的类型定义应当变量，函数参数，函数返回值都有类型注解
// 通常只需要写一边即可
function defineAnonymousFunction() {
    const mAdd: (x: number, y: number) => string = function (x: number, y: number): string {
        return `x<${typeof x}>: ${x}, y<${typeof y}>: ${y}, x + y = ${x+y}`;
    }
    mAdd(2, 5);
}

// 参数约束
// 函数的形参与实参，必须数量相同，类型一一对应
function paramsConstraint() {
    interface Comples {
        (str: string, isPrint?: boolean, num?: number, ...args: boolean[]): string;
    }

    // 剩余参数必须使用rest风格（即...开头），否则只会接收到第一个参数
    const comples: Comples = (str, isPrint = true, num, ...args) => {
        if (isPrint) {
            return `arguments: ${str}, ${isPrint}, ${num}, ${args}, ${args.length}`;
        }
        return `isPrint: ${isPrint}`;
    }

    return comples('can print', undefined, 3, false, true, false);
}

//this类型约束
function thisConstraint() {
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }

    const deck1: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),

        createCardPicker: function(this: Deck) {
            return () => {
                // TS使用_this标记当前this，下面的代码是测试一下
                // 如果_this被使用了，会发生什么
                // let _this = 'THIS';
                // console.log(_this);
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    function noThis (this: { name: string }): object {
        return function () {
            return this.name;
        }
    }

    const printName = { name: 'a string name', noThis }
    
    
    const cp1 = deck1.createCardPicker();

    // 下面将deck1绑定到另一个类型相同，但数据不同的对象上，此时，ts并不报错
    // 因为ts只是检查类型是否一致，不关心对象数据
    const cp2 = deck1.createCardPicker().bind({
        suits: ["hearts", "spades"],
        cards: Array(52),
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                return {suit: this.suits[3], card: pickedCard % 13};
            }
        }
    });
    
    return `正常的Card: ${JSON.stringify(cp1())}, 不正常且不报错的Card: ${JSON.stringify(cp2())}`;
}

// 函数重载
// 如果重载的函数之间参数列表的参数个数不同，多出来的参数必须是可选的
// 函数重载的最后一层，函数实现，必须在之前有同样的参数列表的函数声明，否则最后一行的参数声明会报错
function fnOverride() {
    function printf(x: number, y: string): string;
    function printf(x: string, y: number): string;
    function printf(x: string, y: number, z: string): string;
    // 这一行如果注释掉，最后一个打印会报错
    function printf(x: string, y: number, z: string, isZ: boolean): string; 

    function printf(x: any, y: any, z?: string, isZ?: boolean): string {
        return `x: ${x}, y: ${y}, z<${isZ}>: ${z}`;
    }

    return `${printf(12, '27')}, ${printf('dff', 4)}, ${printf('13', 56, 'true')}, ${printf('13', 56, 'true', false)}`;
}





export default () => {
    console.log('TypeScript 函数类型');

    console.log(`
        函数类型定义: ${defineFunctionType()};
        
        匿名函数类型定义: ${defineAnonymousFunction()};

        函数的参数约束: ${paramsConstraint()};

        函数的this类型约束: ${thisConstraint()};

        函数的重载: ${fnOverride()};
    `)
}