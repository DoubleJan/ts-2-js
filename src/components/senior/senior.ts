// TypeScript 高级类型


// 交叉类型 
// 要求同时满足所有指定的类型的要求
// 函数返回值需要做显式类型转换<T & U>

function intersectionTypes() {
    function extend<First, Second>(first: First, second: Second): First & Second {
        const result: Partial<First & Second> = { ...first, ...second }
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
    type GetName = <T>(param: T) => string;
    type Age = number;
    type Info = Name & Age;  // 一个变量不可能同时是字符串和数字类型，因此这行创建的Info的别名为never类型
    type OneOf = Name | Age;
    const getName: GetName = function <T>(param: T): string {
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


// 索引类型
// 如果一个变量是另一个变量的一个属性可以通过
// 索引类型查询操作符 keyof 和 索引访问操作符 [] 进行类型注解和访问

function indexTypes() {

    // T是一个任意类型，K类型是T类型中，任意一个属性的类型，形参names是K类型变量组成的数组
    // 返回值 T[K][]: T类型的K属性数组（第一个方括号表示取属性，第二个表示数组类型）
    function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(n => o[n]);
    }

    interface Person {
        name: string;
        age: number;
    }

    const person: Person = {
        name: 'doublejan',
        age: 17
    }

    const strs: string[] = pluck(person, ['name']);
    return `Person Name: ${strs}`;
}


// 映射类型
// 对于一些属性，我们希望它们能够有公共的约束，比如全部是可选的，全部是只读的
// 这时，使用映射类型，可以从旧类型中以相同的方式转换出来一批新的类型

function mappingTypes() {
    interface Person {
        name: string;
        age: number;
    }

    // 这里使用了索引查询操作符 keyof把P变量的类型绑定为T的属性类型
    // 又使用索引签名的语法 [prop: propType]: <type>，匹配到传进来的泛型T的所有属性
    // 这种映射被称为 同态映射 ，因为所有的映射都是发生在类型T之上的，没有别的变量和属性参与
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }

    const pPartial: Partial<Person> = { name: 'only name' }
    const pReadonly: Readonly<Person> = { name: 'const name', age: 32 }
    return `${JSON.stringify(pPartial)}, ${JSON.stringify(pReadonly)}`;
}


// 层叠映射
// 映射就像css一样，是可以层叠的，编译器在声明新的类型前，会拷贝所有已存在的修饰符
// 比如某类型第一层属性是可选的，将所有可选的属性映射为只读的，那么这些属性就是不仅可选，且要求只读

function cascadingMapping() {
    type Proxy<T> = {
        get(): T;
        set(value: T): void;
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>
    }


}


// 定义一个返回有条件类型的函数
//  有条件的类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一
// declare function f<T extends boolean> (x: T): T extends true ? string: number;
// 有条件类型
// 有条件的类型 T extends U ? X : Y 或者解析为X，或者解析为Y，再或者延迟解析

function conditionType() {
    // return `${f(Math.random() < 0.5)}`;
    // TypeName<T>是一个条件类型，用于检测T的类型，返回一个类型明确的类型字面量
    type TypeName<T> =
        T extends string ? string :
        T extends number ? number :
        T extends boolean ? boolean :
        T extends undefined ? undefined :
        T extends () => string ? () => string :   
        T extends Function ? () => void :
        object;

    // 以下type关键字定义的类型，经过TypeName<T>的条件类型检测，由返回的类型，生成对应的类型别名.
    type T0 = TypeName<string>;  // "string"
    type T1 = TypeName<"a">;  // "string"

    type T3 = TypeName<() => string>;  // "function"
    type T4 = TypeName<() => void>;
    type T5 = TypeName<string[]>;  // "object"

    const fn: T3 = () => 'T3 is Function Type';
    const fnVoid: T4 = function () {}
    const str: T0 = 'string type';

    return `${fn()}, ${fnVoid()}, ${str}`;
}


// 分布式有条件类型
// 分布式有条件类型在实例化时会自动分发成联合类型
// 例如，实例化T extends U ? X : Y，T的类型为A | B | C，
// 会被解析为(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)

function distributedCondition () {
    type TypeName<T> =
        T extends string ? string :
        T extends number ? number :
        T extends boolean ? boolean :
        T extends undefined ? undefined :
        T extends () => string ? () => string :   
        T extends Function ? () => void :
        object;

    type T12 = TypeName<string | string[] | undefined>;
    
    const obj: T12 = { key: 'value' }

    return `obj: ${JSON.stringify(obj)}`;
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

        索引类型: ${indexTypes()};

        映射类型: ${mappingTypes()};

        有条件类型: ${conditionType()};

        分布式有条件类型: ${distributedCondition()};
    `);

    console.log('\n');
}


