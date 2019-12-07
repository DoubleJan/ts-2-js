"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// 接口类型
// 基本的接口定义和使用
function defineBasicInterface() {
    function printPoint(point) {
        console.log("Point: { x: " + point.x + ", y: " + point.y + " }");
    }
    var point = { x: 3, y: 4 };
    printPoint(point);
    // const point3D: Point = { x: 3, y: 4, z: 5 }   // TypeScript error
}
// 带可选属性的接口定义
function defineOptionalInterface() {
    function printPoint(point) {
        console.log("PointOptional: { x: " + point.x + ", y: " + point.y + ", z: " + point.z + " }");
    }
    var point = { x: 3, y: 4 };
    printPoint(point);
    printPoint({ x: 1, y: 2, z: 5.78 });
}
// 带只读属性的接口定义
function defineReadonlyInterface() {
    var PointObj = /** @class */ (function () {
        function PointObj(o) {
            this.origin = o;
        }
        PointObj.prototype.setOrigin = function (o) {
            // this.origin = o;   // TypeScript error
        };
        return PointObj;
    }());
}
// 带索引签名的接口定义
function defineIndexInterface() {
    var sq = { width: 100, 1: 'square', borderd: false };
    console.log(sq);
}
// 带函数类型的接口定义
function defineFunctionInterface() {
    var P1 = /** @class */ (function () {
        function P1() {
        }
        P1.prototype.printPoint = function (desc) {
            console.log("P1 desc: " + desc);
        };
        return P1;
    }());
    var p1 = new P1();
    p1.printPoint('p1 implements Point1');
    var p2 = function (desc) {
        console.log("P: " + desc);
    };
    p2('p2 implements Point2');
}
// 接口的类实现, 类实现时，只对实例部分进行参数检查
function classImplements() {
    function createClock(ctor, hour, minute) {
        return new ctor(hour, minute);
    }
    var DigitalClock = /** @class */ (function () {
        function DigitalClock(h, m) {
            this.hour = h;
            this.minute = m;
        }
        DigitalClock.prototype.tick = function () {
            console.log("it is " + this.hour + ": " + this.minute + " clock");
        };
        return DigitalClock;
    }());
    var digital = createClock(DigitalClock, 12, 25);
    digital.tick();
}
// 类表达式
function classExpression() {
    var Clock = /** @class */ (function () {
        function Clock(h, m) {
        }
        Clock.prototype.tick = function () { console.log('class expression'); };
        return Clock;
    }());
    var clock = new Clock(13, 46);
    clock.tick();
}
// 接口继承与合并
function extendsInterface() {
    var printShape = function (shape) {
        console.log("Shape: { color: " + shape.color + ", opacity: " + shape.opacity + " }");
    };
    var printSquare = function (square) {
        console.log("Square: { color: " + square.color + ", opacity: " + square.opacity + ", borderLength: " + square.borderLength + " }");
    };
    printShape({ color: 'red', opacity: 0.7 });
    printSquare({ color: 'greed', opacity: 0.9, borderLength: 3 });
}
// 接口继承类
// 接口允许继承类的所有成员（包括属性和方法）的定义。但如果类中包含私有成员和静态成员，必须同时继承类。
function interfaceExtends() {
    var Control = /** @class */ (function () {
        function Control(state) {
            this.state = state;
        }
        Control.prototype.printState = function () {
            console.log("Control state: " + this.state);
        };
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(state) {
            return _super.call(this, state) || this;
        }
        Button.prototype.select = function () { console.log('select'); };
        return Button;
    }(Control));
    // TypeScript error
    // class Select implements SelectableControl{
    //     select() {
    //         console.log('only select');
    //     }
    // }
    var button = new Button(false);
    button.printState();
}
exports["default"] = (function () {
    defineBasicInterface();
    defineOptionalInterface();
    defineReadonlyInterface();
    defineIndexInterface();
    defineFunctionInterface();
    classImplements();
    classExpression();
    extendsInterface();
    interfaceExtends();
});
