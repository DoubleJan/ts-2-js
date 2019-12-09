"use strict";
// 类的类型注解
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
// 类的类型约束
function classConstraint() {
    var Animal = /** @class */ (function () {
        function Animal(animalName) {
            this.name = animalName;
            this.id = '001';
            this.code = 'A001';
        }
        Animal.prototype.move = function (meters) {
            if (meters === void 0) { meters = 0; }
            return this.name + " moved " + meters;
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name) {
            return _super.call(this, name) || this;
        }
        Cat.prototype.move = function (meters) {
            if (meters === void 0) { meters = 0; }
            return _super.prototype.move.call(this, meters + 100);
        };
        return Cat;
    }(Animal));
    var cat = new Cat('a cat');
    return cat.move(35);
}
// 抽象类
function abstractClass() {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.move = function (meters) {
            if (meters === void 0) { meters = 0; }
            return "a Dog moved " + (meters + 7);
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    return dog.move(29);
}
// 类类型
function classType() {
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Now, it is " + this.greeting;
        };
        return Greeter;
    }());
    var greeter1 = new Greeter('greeter 1 by Greeter');
    var greetMaker = Greeter;
    greetMaker.standardGreeting = 'HEELO FROM MAKER';
    var greeter2 = new greetMaker('greeter 2 by maker');
    return "1: " + greeter1.greet() + ", 2: " + greeter2.greet() + ", static: " + Greeter.standardGreeting;
}
// 用类做接口
function classUsedInterface() {
    var Point = /** @class */ (function () {
        function Point() {
        }
        Point.origin = 355;
        return Point;
    }());
    var Point3D = /** @class */ (function (_super) {
        __extends(Point3D, _super);
        // 此处可省略形参的类型注解，因为对象内部已经定义了x, y, z的类型
        function Point3D(x, y, z) {
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            _this.z = z;
            return _this;
        }
        return Point3D;
    }(Point));
    var point = new Point3D(3, 4, 7);
    return "Point3D: " + JSON.stringify(point) + ", static origin: " + Point3D.origin;
}
exports["default"] = (function () {
    console.log('TypeScript 类的类型');
    console.log("\n        \u7C7B\u7684\u7C7B\u578B\u7EA6\u675F: " + classConstraint() + ";\n\n        \u62BD\u8C61\u7C7B: " + abstractClass() + ";\n\n        \u7C7B\u7C7B\u578B: " + classType() + ";\n\n        \u7528\u7C7B\u505A\u63A5\u53E3: " + classUsedInterface() + ";\n    ");
    console.log('\n');
});
