// 类的类型注解

// 类的类型约束
function classConstraint() {
    class Animal {
        name: string;
        private id: string;
        protected code: string;

        constructor(animalName: string) {
            this.name = animalName;
            this.id = '001';
            this.code = 'A001'
        }

        move(meters: number = 0) {
            return `${this.name} moved ${meters}`;
        }
    }

    class Cat extends Animal {
        constructor(name: string) {
            super(name);
        }
        move(meters: number = 0) {
            return super.move(meters + 100);
        }
    }

    const cat: Animal = new Cat('a cat');
    return cat.move(35);
}

// 抽象类
function abstractClass() {
    abstract class Animal {
        abstract move(meters: number): string;
    }

    class Dog extends Animal {
        move(meters: number = 0): string {
            return `a Dog moved ${meters + 7}`;
        }
    }

    const dog: Animal = new Dog();
    return dog.move(29);
}

// 类类型
function classType() {
    class Greeter {
        static standardGreeting;
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return `Now, it is ${this.greeting}`;
        }
    }

    const greeter1: Greeter = new Greeter('greeter 1 by Greeter');

    const greetMaker: typeof Greeter = Greeter;
    greetMaker.standardGreeting = 'HEELO FROM MAKER';

    const greeter2: Greeter = new greetMaker('greeter 2 by maker');

    return `1: ${greeter1.greet()}, 2: ${greeter2.greet()}, static: ${Greeter.standardGreeting}`
}

// 用类做接口
function classUsedInterface() {
    class Point {
        x: number;
        y: number;
        static origin = 355;
    }

    interface Point3DInterface extends Point {
        z: number;
    }

    class Point3D extends Point implements Point3DInterface {
        x: number;
        y: number;
        z: number;

        // 此处可省略形参的类型注解，因为对象内部已经定义了x, y, z的类型
        constructor(x, y, z) {
            super();
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    const point: Point3D = new Point3D(3, 4, 7);
    return `Point3D: ${JSON.stringify(point)}, static origin: ${Point3D.origin}`;
}






export default () => {
    console.log('TypeScript 类的类型');

    console.log(`
        类的类型约束: ${classConstraint()};

        抽象类: ${abstractClass()};

        类类型: ${classType()};

        用类做接口: ${classUsedInterface()};
    `);

    console.log('\n');
}