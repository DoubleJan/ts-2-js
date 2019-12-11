// TypeScript 高级类型

// 交叉类型 
// 要求同时满足所有指定的类型的要求
// 函数返回值需要做显式类型转换<T & U>
function intersectionTypes() {
    function extend<First, Second>(first: First, second: Second): First & Second {
        const result: Partial<First & Second> = { ...first, ...second }
        // for (const prop in first) {
        //     if (first.hasOwnProperty(prop)) {
        //         (<First>result)[prop] = first[prop];
        //     }
        // }
        // for (const prop in second) {
        //     if (second.hasOwnProperty(prop)) {
        //         (<Second>result)[prop] = second[prop];
        //     }
        // }
        return <First & Second>result;
    }

    class Cat {
        name: string;
        catchMouse: boolean;
        constructor(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
    }

    class Dog {
        name: string;
        walkDog: boolean;
        constructor(n, w) {
            this.name = n;
            this.walkDog = w;
        }
    }

    const result = extend({ name: 'a cat', catchMouse: false }, { name: 'a dog', walkDog: true });
    return `Cat & Dog: ${JSON.stringify(result)}`;
}

// 联合类型
// 满足指定的任意类型的要求即可
function unionTypes() {

    function unionAnimal(animal): Cat | Dog {
        const result = { ...animal };
        return <Cat | Dog>result;
    }

    class Cat {
        name: string;
        catchMouse: boolean;
        constructor(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
    }

    class Dog {
        name: string;
        walkDog: boolean;
        constructor(n, w) {
            this.name = n;
            this.walkDog = w;
        }
    }

    const result = unionAnimal({ name: 'a cat', catchMouse: false });

    // 只能访问联合类型共有成员
    // return `union: ${result.name}, ${result.walkDog}, ${result.catchMouse}`;    // TypeScript error
    return `union: ${JSON.stringify(result)}`;
}

// 自定义类型守卫和类型谓词
// 如果想确切的使用联合类型某一类型的特有属性时，必须不断地if判断是否存在
// TypeScript提供类型谓词来解决这个问题
function typeGuards(type) {
    class Cat {
        name: string;
        catchMouse: boolean;
        constructor(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
    }

    class Dog {
        name: string;
        walkDog: boolean;
        constructor(n, w) {
            this.name = n;
            this.walkDog = w;
        }
    }

    function isCat(animal: Cat | Dog): animal is Cat {
        return (<Cat>animal).catchMouse !== undefined;
    }

    // 如果这里定死了Cat，TypeScript会知道，永远进不去else分支，那么就不能使用walkDog
    // 此适else分支被认为是never的： Property 'walkDog' does not exist on type 'never'
    const result = type ? new Cat('a cat', false) : new Dog('a dog', true);

    //TypeScript不仅知道在if分支里是Cat类型； 它还清楚在else分支里，一定不是Cat类型，一定是Dog类型
    if (isCat(result)) {
        return `result is ${JSON.stringify(result)}`;
    } else {
        return `another result ${result.walkDog ? 'can' : 'can\'t'} walk the dog`;
    }
}

// typeof类型守卫
// typeof类型守卫只有两种形式能被识别：typeof v === "typename"和typeof v !== "typename"，
// "typename"必须是"number"，"string"，"boolean"或"symbol"。 
// 但是TypeScript并不会阻止与其它字符串比较，不会把那些表达式识别为类型守卫.
function typeofTypeGuard() {
    // 可以将typeof类型守卫定义为一个函数
    function isNumber(x: any): x is number {
        return typeof x === 'number';
    }
    // 直接使用typeof，会被默认为类型守卫
    return `'sdd' is Number: ${isNumber('sdd')}, 'sdd' is string: ${typeof 'sdd' === 'string'}`;
}

// instanceof类型守卫
// 检查 左侧变量的原型类型，是否是右侧构造函数的原型类型能够产生的任意子类型（子类类型的联合类型）
function instanceofTypeGuard() {

    class Animal {
        name: string;
        constructor(n) { this.name = n; }
    }

    class Pet extends Animal {
        constructor(n) { super(n); }
    }

    class Dog extends Pet {
        walkDog: boolean;
        constructor(n, w) {
            super(n);
            this.name = n;
            this.walkDog = w;
        }
    }

    const pet = new Pet('a pet') instanceof Animal;
    const dog = new Dog('a dog', false) instanceof Animal;

    return `pet is animal: ${pet}, dog is Animal: ${dog}`;
}

// 不为null和undefined
// null和undefined可以是任意类型的子类型，如果要求一个变量不为null或undefined，可以使用!后缀
// 这里只能检查null，undefined，如果没有传参(或者联合类型加上void)，还是会报错
// 即便使用了后缀，也会报错，因为编译后不会
function notNullOrUndefined() {
    function getChar(param: string | null | undefined): string {
        return `${param!.charAt(0)}`;
    }
    // return `${getChar('AHH')}, ${getChar(null)}, ${getChar(undefined)}`;
    return `${getChar('AHH')}`;
}

// 类型别名
// 使用注意
// 1. 基础类型使用类型别名没有意义
// 2. 类型别名与接口的区别在于，类型别名不会创建一个真实的名字，只是创建一个引用，接口定义真实创建了名字，并且，接口可以被继承和实现，类型别名不可以
// 3. 当使用多个类型的联合类型或交叉类型时，应当使用类型别名。
// 4. 类型别名仅能用于类型注解，不能当作变量使用。
function typeAnotherName() {
    type Name = string;
    type GetName =  <T>(param: T) => string;
    type Age = number;
    type Info = Name & Age;  // 一个变量不可能同时是字符串和数字类型，因此这行创建的Info的别名为never类型
    type OneOf = Name | Age;
    const getName: GetName = function <T> (param: T):string {
        return JSON.stringify(param);
    }
    const name: Name = 'a name';
    const age: Age = 25;
    // const info: Info = 25;    // TypeScript error
    const oneof: OneOf = 11;
    return `${name}'s age is ${age} or ${oneof}, is never: ${getName({ never: true })}`;
}

// 字符串和数字的字面量类型
function literal() {
    type AB = 'A' | 'B';
    type BIN = 1 | 0;
    const ab = 'A';
    const bin = 1;
    return `AB: ${ab}, BIN: ${bin}`;
}



export default () => {
    console.log('TypeScript 高级类型');

    console.log(`
        交叉类型: ${intersectionTypes()};

        联合类型: ${unionTypes()};

        类型谓词: ${typeGuards(true)}, ${typeGuards(false)};

        typeof类型守卫: ${typeofTypeGuard()};

        instanceof类型守卫: ${instanceofTypeGuard()};

        不为null和undefined: ${notNullOrUndefined()};

        类型别名: ${typeAnotherName()};

        数字和字符串字面量: ${literal()};
    `);

    console.log('\n');
}


