
// 接口类型

// 基本的接口定义和使用
function defineBasicInterface() {
    interface Point {
        x: number,
        y: number
    }

    function printPoint(point: Point) {
        return `Point: { x: ${point.x}, y: ${point.y} }`
    }

    const point: Point = { x: 3, y: 4 }
    return printPoint(point);

    // const point3D: Point = { x: 3, y: 4, z: 5 }   // TypeScript error
}

// 带可选属性的接口定义
function defineOptionalInterface() {
    interface Point {
        x: number,
        y: number,
        z?: number
    }

    function printPoint(point: Point) {
        return `{ x: ${point.x}, y: ${point.y}, z: ${point.z} }`
    }

    const point: Point = { x: 3, y: 4 }
    return `point: ${printPoint(point)}, pointOptional: ${printPoint({ x: 1, y: 2, z: 5.78 })}`;
}

// 带只读属性的接口定义
function defineReadonlyInterface() {
    interface Point {
        x: number,
        y: number,
        readonly z?: number,
        readonly origin: number
    }

    class PointObj {
        readonly origin: number;
        constructor(o: number) {
            this.origin = o;
        }
        setOrigin(o: number) {
            // this.origin = o;   // TypeScript error
        }
    }

    return `origin readonly: ${JSON.stringify(new PointObj(1))}`;
}

// 带索引签名的接口定义
function defineIndexInterface() {
    interface Square {
        color?: string;
        width: number;
        [propName: string]: any
    }
    const sq: Square = { width: 100, 1: 'square', borderd: false }
    return `Square(has index): ${JSON.stringify(sq)}`
}

// 带函数类型的接口定义
function defineFunctionInterface() {
    interface Point1 {
        printPoint(desc: string): string
    }

    interface Point2 {
        (desc: string): string
    }

    class P1 implements Point1 {
        printPoint(desc: string) {
            return `P1 desc: ${desc}`;
        }
    }

    const p1 = new P1();

    const p2: Point2 = (desc: string) => {
        return `P2 desc: ${desc}`;
    }
    
    return `${p1.printPoint('p1 implements Point1')}, ${p2('p2 implements Point2')}`;
}

// 接口的类实现, 类实现时，只对实例部分进行参数检查
function classImplements() {
    interface ClockInterface {
        tick(): string
    }
    
    interface ClockConstruct {
        new (hour: number, minute: number): ClockInterface
    }

    function createClock(ctor: ClockConstruct, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
        hour: number;
        minute: number;
        constructor(h: number, m: number) { 
            this.hour = h; 
            this.minute = m; 
        }
        tick() {
            return `it is ${this.hour}: ${this.minute} clock`;
        }
    }

    const digital = createClock(DigitalClock, 12, 25);
    return `${digital.tick()}`;
}

// 类表达式
function classExpression() {
    interface ClockConstruct {
        new (hour: number, minute: number): ClockInterface;
    }
    
    interface ClockInterface {
        tick(): string;
    }

    const Clock: ClockConstruct = class Clock implements ClockInterface {
        constructor(h: number, m: number) {}
        tick() { return 'class expression' }
    }

    const clock = new Clock(13, 46);
    return `${clock.tick()}`;
}

// 接口继承与合并
function extendsInterface() {
    interface Shape {
        color: string;
    }
    
    interface Shape {
        opacity: number;
    }

    interface Square extends Shape {
        borderLength: number;
    }

    const printShape = (shape: Shape) => {
        return `Shape: { color: ${shape.color}, opacity: ${shape.opacity} }`
    }

    const printSquare = (square: Square) => {
        return `Square: { color: ${square.color}, opacity: ${square.opacity}, borderLength: ${square.borderLength} }`
    }

    return `${printShape({ color: 'red', opacity: 0.7 })}, ${printSquare({ color: 'greed', opacity: 0.9, borderLength: 3 })}`;
}

// 接口继承类
// 接口允许继承类的所有成员（包括属性和方法）的定义。但如果类中包含私有成员和静态成员，必须同时继承类。
function interfaceExtends() {
    class Control {
        private state: boolean;
        constructor(state: boolean) {
            this.state = state;
        }
        printState() {
            return `Control state: ${this.state}`;
        }
    }

    interface SelectableControl extends Control {
        select(): string;
    }

    class Button extends Control implements SelectableControl {
        constructor(state: boolean) {
            super(state)
        }
        select(){ return 'select' }
    }

    // TypeScript error
    // class Select implements SelectableControl{
    //     select() {
    //         console.log('only select');
    //     }
    // }

    const button: Button = new Button(false);
    return `${button.printState()}`;
}




export default () => {
    
    console.log('TypeScript 接口类型');

    console.log(`
        基本的接口定义: ${defineBasicInterface()};

        带可选属性的接口定义: ${defineOptionalInterface()};

        带只读属性的接口定义: ${defineReadonlyInterface()};

        带索引签名的接口定义: ${defineIndexInterface()};

        带函数类型的接口定义: ${defineFunctionInterface()};

        接口的类实现: ${classImplements()};

        接口实现的类表达式语法: ${classExpression()};

        接口的继承与合并: ${extendsInterface()};

        接口继承类: ${interfaceExtends()};
    `)
    
    console.log('\n');
}