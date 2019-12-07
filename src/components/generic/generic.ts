// 泛型


// 类型变量
function printf<T>(arg: T): string {
    // console.log(`${typeof T}`);   // TypeScript error
    return `arg<${typeof arg}>: ${JSON.stringify(arg)}`
}

// 类型变量数组
function printfList<T>(arg: T[]): string {
    return `arg<${typeof arg}>: ${JSON.stringify(arg)}`
}

// 泛型接口
function genericInterface(): string {
    interface GenericIdentity {
        <T>(arg: T): string;
    }

    const identity: GenericIdentity = <T>(arg: T) => {
        return `arg<${typeof arg}>: ${JSON.stringify(arg)}`;
    }

    return identity({ username: 'doublejan', password: 123456 });
}

// 泛型类
function genericClass() {
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => string
    }

    const mGenericNumber = new GenericNumber<number>();
    mGenericNumber.zeroValue = 0;
    mGenericNumber.add = function (x, y) {
        console.log(`       x: ${x}, y: ${y}`);
        return `arg<${typeof this.zeroValue}>: ${x + y}`;
    }
}

// 泛型约束
// 使用接口，对泛型指定的类型，特殊要求
function logIdentity() {
    interface Lengthwise {
        length: number
    }
    function loggingIdentity<T extends Lengthwise> (arg: T): string {
        return `arg<${typeof arg}>: ${JSON.stringify(arg)}`;
    }
    loggingIdentity([3, 7, 5]);
}

// 在泛型约束中使用类型参数
function useGenericTypeParams() {
    function printProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
    return printProperty({ x: 3, y: 4 }, 'x');
}

// 使用类类型
function useGenericClassParams(): string {
    class Animal {
        name: string;
        constructor(n: string) {
            this.name = n;
        }
    }
    class Cat extends Animal {
        keeper: CatKeeper
        constructor(name) {
            super(name);
            this.keeper = new CatKeeper();
            this.keeper.count = 1;
        }
    }
    class Dog extends Animal {
        keeper: DogKeeper
        constructor(name) {
            super(name);
            this.keeper = new DogKeeper();
            this.keeper.isDog = true;
        }
    }

    class CatKeeper {
        count: number
    }
    class DogKeeper {
        isDog: boolean
    }

    function createInstance<A extends Animal>(obj: new (n: string) => A, name: string): A {
        return new obj(name);
    }

    const cat = createInstance(Cat, 'CAT');
    const dog = createInstance(Dog, 'DOG');
    return `${cat.name} Count: ${cat.keeper.count}, ${dog.name} isDog: ${dog.keeper.isDog}`;
}


export default () => {
    console.log('TypeScript 泛型类型');
    console.log(`
        类型变量(显式声明): ${printf(<number>5)};

        类型变量(类型推断): ${printf({ x: 3, y: 4 })};

        类型变量数组: ${printfList([true, false])};

        泛型接口: ${genericInterface()};

        泛型类: ${genericClass()};

        泛型的类型约束: ${logIdentity()};

        使用类型参数的泛型约束: ${useGenericTypeParams()};

        使用类类型的泛型参数约束: ${useGenericClassParams()};
    `);
    console.log('\n');
}