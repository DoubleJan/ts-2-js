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


export default () => {
    console.log('TypeScript 函数类型');

    console.log(`
        函数类型定义: ${defineFunctionType()};
        
        匿名函数类型定义: ${defineAnonymousFunction()};
    `)
}