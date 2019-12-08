import { readSync } from "fs";

// 类型推断与类型兼容性


/************************************* 类型推断 ********************************************/

// 最佳通用类型
function bestUniversalType() {
    const tmp = [1, false, 'strings', null];
    return `tmp<${typeof tmp}>: ${JSON.stringify(tmp)}`;
}

// 上下文归类
function contextType() {
    window.onmousedown = function(mouseEvent) {
        console.log(mouseEvent.button);
        // console.log(mouseEvent.btn); 
    };
}


/************************************* 类型兼容性 *****************************************/

// 名义类型和结构类型
function structType(): string {
    interface Named {
        name: string
    }
    // 如果类型指定为更加“保守”的类型，那么就不能使用不一定拥有的属性
    // class Person {
    //     name: string
    //     printName(): string {
    //         return `Person name<${typeof name}>: ${this.name}`
    //     }
    // }
    // const p: Named = new Person();
    // return p.printName();

    class Person {
        name: string
        constructor(name: string) {
            this.name = name;
        }
    }
    const p: Named = new Person('username');
    return `Person name<${typeof p.name}>: ${p.name}`;
}

// 函数的参数类型兼容
function fnParamsCompatible() {
    let x = (a: number, b: number) => a - b;
    let y = (b: number, increment: number, c: string) => b + increment;

    // x的所有参数都能在y里面找到
    y = x;
    // x = y;    // TypeScript error
    return `y is x: ${y(12, 5, '-')}`;

}

// 函数的返回值类型兼容
function fnReturnCompatible() {
    let x = () => ({ name: 'Double' });
    let y = () => ({ name: 'Float', location: 'Home' });

    // x的返回值的属性，在y中全存在
    x = y;
    // y = x;    // TypeScript error
    return `x is y: ${JSON.stringify(x())}`;
}

// 可选参数和剩余参数不会影响函数类型的精确程度
function optionalParams() {
    function handler(args: number[], callback: (...args: number[]) => number ) {
        return callback(...args);
    }
    return `${handler([2, 4, 6], (x, y) => x + y)}, ${handler([1, 3, 5], (...args) => args[2] - args[0])}, ${handler([1, 0], (...args) => args[2] - args[0])}`
}

// 枚举类型与数字类型兼容，不同枚举类型之间不兼容
function enumCompatible() {
    enum Status { Ready, Waiting }
    enum Color { Red, Green, Blue }
    let status = Status.Ready;
    // return `status ==? Color.Red ${status == Color.Red}`    // TypeScript error
    return `status: ${status}`;
}

// 类的兼容性，检查实例部分，静态部分不被检查
function classCompatible() {
    class Animal {
        name: string;
        constructor(name: string, age: number) {
            this.name = name;
        }
    }
    class Person {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    let a: Animal = new Animal('a animal', 5);
    let p: Person = new Person('a person');
    a = p;
    // p = a;    // OK

    return `animal is person: ${a.name}`;
}

// 类的私有和保护成员会影响兼容性
function classPrivateAndProtected() {
    class Animal {
        name: string;
        protected age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    class Person {
        name: string;
        protected age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    // 拥有同样的受保护成员，类型兼容
    class Cat extends Animal {
        constructor(name: string, age: number) {
            super(name, age);
        }
    }

    class Dog extends Animal {
        constructor(name: string, age: number) {
            super(name, age);
        }
    }

    let a: Animal = new Animal('a animal', 5);
    let p: Person = new Person('a person', 22);
    // 私有成员来自不同类，类型不兼容
    // a = p;    // TypeScript error

    let c: Cat = new Cat('a cat', 2);
    let d: Dog = new Dog('a dog', 4);
    a = d;
    d = c;
    
    return `Animal is ${a.name}, Dog is ${d.name}`;
}

// 泛型的类型兼容性，考虑类型变量使用后的结果类型，对于泛型有没有影响
function genericCompatible() {
    interface GenericInterface<T> {
        data: T
    }
    let x: GenericInterface<number>;
    let y: GenericInterface<string>;
    // x = y;     // TypeScript error

    interface EmptyInterface<T> {}
    let a: EmptyInterface<number>
    let b: EmptyInterface<string>
    a = b;
    a = 34;
    return `x != y, but a = b = ${a}`;
}

// 泛型的类型兼容性，结果类型
function genericResultType() {
    let a = <T>(x: T): T => x;
    let b = <U>(x: U): U => x;
    a = b;
    return `T is U ${a('a is b')}`;
}


export default () => {
    console.log('TypeScript 类型推断与类型兼容性');
    console.log(`
        最佳通用类型: ${bestUniversalType()};

        上下文归类: ${contextType()};

        结构类型: ${structType()};

        函数的参数类型兼容: ${fnParamsCompatible()};

        函数的返回值类型兼容: ${fnReturnCompatible()};

        可选参数和剩余参数: ${optionalParams()};

        枚举类型的兼容性: ${enumCompatible()};

        类的类型兼容性: ${classCompatible()};

        类的私有和保护成员会影响兼容性: ${classPrivateAndProtected()};

        泛型的类型兼容性: ${genericCompatible()};

        泛型的结果类型: ${genericResultType()};
    `);
    console.log('\n');
}