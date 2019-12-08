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
// 类型推断与类型兼容性
/************************************* 类型推断 ********************************************/
// 最佳通用类型
function bestUniversalType() {
    var tmp = [1, false, 'strings', null];
    return "tmp<" + typeof tmp + ">: " + JSON.stringify(tmp);
}
// 上下文归类
function contextType() {
    window.onmousedown = function (mouseEvent) {
        console.log(mouseEvent.button);
        // console.log(mouseEvent.btn); 
    };
}
/************************************* 类型兼容性 *****************************************/
// 名义类型和结构类型
function structType() {
    // 如果类型指定为更加“保守”的类型，那么就不能使用不一定拥有的属性
    // class Person {
    //     name: string
    //     printName(): string {
    //         return `Person name<${typeof name}>: ${this.name}`
    //     }
    // }
    // const p: Named = new Person();
    // return p.printName();
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('username');
    return "Person name<" + typeof p.name + ">: " + p.name;
}
// 函数的参数类型兼容
function fnParamsCompatible() {
    var x = function (a, b) { return a - b; };
    var y = function (b, increment, c) { return b + increment; };
    // x的所有参数都能在y里面找到
    y = x;
    // x = y;    // TypeScript error
    return "y is x: " + y(12, 5, '-');
}
// 函数的返回值类型兼容
function fnReturnCompatible() {
    var x = function () { return ({ name: 'Double' }); };
    var y = function () { return ({ name: 'Float', location: 'Home' }); };
    // x的返回值的属性，在y中全存在
    x = y;
    // y = x;    // TypeScript error
    return "x is y: " + JSON.stringify(x());
}
// 可选参数和剩余参数不会影响函数类型的精确程度
function optionalParams() {
    function handler(args, callback) {
        return callback.apply(void 0, args);
    }
    return handler([2, 4, 6], function (x, y) { return x + y; }) + ", " + handler([1, 3, 5], function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[2] - args[0];
    }) + ", " + handler([1, 0], function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[2] - args[0];
    });
}
// 枚举类型与数字类型兼容，不同枚举类型之间不兼容
function enumCompatible() {
    var Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    var status = Status.Ready;
    // return `status ==? Color.Red ${status == Color.Red}`    // TypeScript error
    return "status: " + status;
}
// 类的兼容性，检查实例部分，静态部分不被检查
function classCompatible() {
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
        }
        return Animal;
    }());
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var a = new Animal('a animal', 5);
    var p = new Person('a person');
    a = p;
    // p = a;    // OK
    return "animal is person: " + a.name;
}
// 类的私有和保护成员会影响兼容性
function classPrivateAndProtected() {
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
            this.age = age;
        }
        return Animal;
    }());
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    // 拥有同样的受保护成员，类型兼容
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name, age) {
            return _super.call(this, name, age) || this;
        }
        return Cat;
    }(Animal));
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name, age) {
            return _super.call(this, name, age) || this;
        }
        return Dog;
    }(Animal));
    var a = new Animal('a animal', 5);
    var p = new Person('a person', 22);
    // 私有成员来自不同类，类型不兼容
    // a = p;    // TypeScript error
    var c = new Cat('a cat', 2);
    var d = new Dog('a dog', 4);
    a = d;
    d = c;
    return "Animal is " + a.name + ", Dog is " + d.name;
}
// 泛型的类型兼容性，考虑类型变量使用后的结果类型，对于泛型有没有影响
function genericCompatible() {
    var x;
    var y;
    var a;
    var b;
    a = b;
    a = 34;
    return "x != y, but a = b = " + a;
}
// 泛型的类型兼容性，结果类型
function genericResultType() {
    var a = function (x) { return x; };
    var b = function (x) { return x; };
    a = b;
    return "T is U " + a('a is b');
}
exports["default"] = (function () {
    console.log('TypeScript 类型推断与类型兼容性');
    console.log("\n        \u6700\u4F73\u901A\u7528\u7C7B\u578B: " + bestUniversalType() + ";\n\n        \u4E0A\u4E0B\u6587\u5F52\u7C7B: " + contextType() + ";\n\n        \u7ED3\u6784\u7C7B\u578B: " + structType() + ";\n\n        \u51FD\u6570\u7684\u53C2\u6570\u7C7B\u578B\u517C\u5BB9: " + fnParamsCompatible() + ";\n\n        \u51FD\u6570\u7684\u8FD4\u56DE\u503C\u7C7B\u578B\u517C\u5BB9: " + fnReturnCompatible() + ";\n\n        \u53EF\u9009\u53C2\u6570\u548C\u5269\u4F59\u53C2\u6570: " + optionalParams() + ";\n\n        \u679A\u4E3E\u7C7B\u578B\u7684\u517C\u5BB9\u6027: " + enumCompatible() + ";\n\n        \u7C7B\u7684\u7C7B\u578B\u517C\u5BB9\u6027: " + classCompatible() + ";\n\n        \u7C7B\u7684\u79C1\u6709\u548C\u4FDD\u62A4\u6210\u5458\u4F1A\u5F71\u54CD\u517C\u5BB9\u6027: " + classPrivateAndProtected() + ";\n\n        \u6CDB\u578B\u7684\u7C7B\u578B\u517C\u5BB9\u6027: " + genericCompatible() + ";\n\n        \u6CDB\u578B\u7684\u7ED3\u679C\u7C7B\u578B: " + genericResultType() + ";\n    ");
    console.log('\n');
});
