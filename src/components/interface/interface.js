"use strict";
// 接口类型
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
// 基本的接口定义和使用
function defineBasicInterface() {
    function printPoint(point) {
        return "Point: { x: " + point.x + ", y: " + point.y + " }";
    }
    var point = { x: 3, y: 4 };
    return printPoint(point);
    // const point3D: Point = { x: 3, y: 4, z: 5 }   // TypeScript error
}
// 带可选属性的接口定义
function defineOptionalInterface() {
    function printPoint(point) {
        return "{ x: " + point.x + ", y: " + point.y + ", z: " + point.z + " }";
    }
    var point = { x: 3, y: 4 };
    return "point: " + printPoint(point) + ", pointOptional: " + printPoint({ x: 1, y: 2, z: 5.78 });
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
    return "origin readonly: " + JSON.stringify(new PointObj(1));
}
// 带索引签名的接口定义
function defineIndexInterface() {
    var sq = { width: 100, 1: 'square', borderd: false };
    return "Square(has index): " + JSON.stringify(sq);
}
// 带函数类型的接口定义
function defineFunctionInterface() {
    var P1 = /** @class */ (function () {
        function P1() {
        }
        P1.prototype.printPoint = function (desc) {
            return "P1 desc: " + desc;
        };
        return P1;
    }());
    var p1 = new P1();
    var p2 = function (desc) {
        return "P2 desc: " + desc;
    };
    return p1.printPoint('p1 implements Point1') + ", " + p2('p2 implements Point2');
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
            return "it is " + this.hour + ": " + this.minute + " clock";
        };
        return DigitalClock;
    }());
    var digital = createClock(DigitalClock, 12, 25);
    return "" + digital.tick();
}
// 类表达式
function classExpression() {
    var Clock = /** @class */ (function () {
        function Clock(h, m) {
        }
        Clock.prototype.tick = function () { return 'class expression'; };
        return Clock;
    }());
    var clock = new Clock(13, 46);
    return "" + clock.tick();
}
// 接口继承与合并
function extendsInterface() {
    var printShape = function (shape) {
        return "Shape: { color: " + shape.color + ", opacity: " + shape.opacity + " }";
    };
    var printSquare = function (square) {
        return "Square: { color: " + square.color + ", opacity: " + square.opacity + ", borderLength: " + square.borderLength + " }";
    };
    return printShape({ color: 'red', opacity: 0.7 }) + ", " + printSquare({ color: 'greed', opacity: 0.9, borderLength: 3 });
}
// 接口继承类
// 接口允许继承类的所有成员（包括属性和方法）的定义。但如果类中包含私有成员和静态成员，必须同时继承类。
function interfaceExtends() {
    var Control = /** @class */ (function () {
        function Control(state) {
            this.state = state;
        }
        Control.prototype.printState = function () {
            return "Control state: " + this.state;
        };
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(state) {
            return _super.call(this, state) || this;
        }
        Button.prototype.select = function () { return 'select'; };
        return Button;
    }(Control));
    // TypeScript error
    // class Select implements SelectableControl{
    //     select() {
    //         console.log('only select');
    //     }
    // }
    var button = new Button(false);
    return "" + button.printState();
}
exports["default"] = (function () {
    console.log('TypeScript 接口类型');
    console.log("\n        \u57FA\u672C\u7684\u63A5\u53E3\u5B9A\u4E49: " + defineBasicInterface() + ";\n\n        \u5E26\u53EF\u9009\u5C5E\u6027\u7684\u63A5\u53E3\u5B9A\u4E49: " + defineOptionalInterface() + ";\n\n        \u5E26\u53EA\u8BFB\u5C5E\u6027\u7684\u63A5\u53E3\u5B9A\u4E49: " + defineReadonlyInterface() + ";\n\n        \u5E26\u7D22\u5F15\u7B7E\u540D\u7684\u63A5\u53E3\u5B9A\u4E49: " + defineIndexInterface() + ";\n\n        \u5E26\u51FD\u6570\u7C7B\u578B\u7684\u63A5\u53E3\u5B9A\u4E49: " + defineFunctionInterface() + ";\n\n        \u63A5\u53E3\u7684\u7C7B\u5B9E\u73B0: " + classImplements() + ";\n\n        \u63A5\u53E3\u5B9E\u73B0\u7684\u7C7B\u8868\u8FBE\u5F0F\u8BED\u6CD5: " + classExpression() + ";\n\n        \u63A5\u53E3\u7684\u7EE7\u627F\u4E0E\u5408\u5E76: " + extendsInterface() + ";\n\n        \u63A5\u53E3\u7EE7\u627F\u7C7B: " + interfaceExtends() + ";\n    ");
    console.log('\n');
});
