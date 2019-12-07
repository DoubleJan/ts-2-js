"use strict";
// 泛型
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
// 类型变量
function printf(arg) {
    // console.log(`${typeof T}`);   // TypeScript error
    return "arg<" + typeof arg + ">: " + JSON.stringify(arg);
}
// 类型变量数组
function printfList(arg) {
    return "arg<" + typeof arg + ">: " + JSON.stringify(arg);
}
// 泛型接口
function genericInterface() {
    var identity = function (arg) {
        return "arg<" + typeof arg + ">: " + JSON.stringify(arg);
    };
    return identity({ username: 'doublejan', password: 123456 });
}
// 泛型类
function genericClass() {
    var GenericNumber = /** @class */ (function () {
        function GenericNumber() {
        }
        return GenericNumber;
    }());
    var mGenericNumber = new GenericNumber();
    mGenericNumber.zeroValue = 0;
    mGenericNumber.add = function (x, y) {
        console.log("       x: " + x + ", y: " + y);
        return "arg<" + typeof this.zeroValue + ">: " + (x + y);
    };
}
// 泛型约束
// 使用接口，对泛型指定的类型，特殊要求
function logIdentity() {
    function loggingIdentity(arg) {
        return "arg<" + typeof arg + ">: " + JSON.stringify(arg);
    }
    loggingIdentity([3, 7, 5]);
}
// 在泛型约束中使用类型参数
function useGenericTypeParams() {
    function printProperty(obj, key) {
        return obj[key];
    }
    return printProperty({ x: 3, y: 4 }, 'x');
}
// 使用类类型
function useGenericClassParams() {
    var Animal = /** @class */ (function () {
        function Animal(n) {
            this.name = n;
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name) {
            var _this = _super.call(this, name) || this;
            _this.keeper = new CatKeeper();
            _this.keeper.count = 1;
            return _this;
        }
        return Cat;
    }(Animal));
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name) {
            var _this = _super.call(this, name) || this;
            _this.keeper = new DogKeeper();
            _this.keeper.isDog = true;
            return _this;
        }
        return Dog;
    }(Animal));
    var CatKeeper = /** @class */ (function () {
        function CatKeeper() {
        }
        return CatKeeper;
    }());
    var DogKeeper = /** @class */ (function () {
        function DogKeeper() {
        }
        return DogKeeper;
    }());
    function createInstance(obj, name) {
        return new obj(name);
    }
    var cat = createInstance(Cat, 'CAT');
    var dog = createInstance(Dog, 'DOG');
    return cat.name + " Count: " + cat.keeper.count + ", " + dog.name + " isDog: " + dog.keeper.isDog;
}
exports["default"] = (function () {
    console.log('TypeScript 泛型类型');
    console.log("\n        \u7C7B\u578B\u53D8\u91CF(\u663E\u5F0F\u58F0\u660E): " + printf(5) + ";\n\n        \u7C7B\u578B\u53D8\u91CF(\u7C7B\u578B\u63A8\u65AD): " + printf({ x: 3, y: 4 }) + ";\n\n        \u7C7B\u578B\u53D8\u91CF\u6570\u7EC4: " + printfList([true, false]) + ";\n\n        \u6CDB\u578B\u63A5\u53E3: " + genericInterface() + ";\n\n        \u6CDB\u578B\u7C7B: " + genericClass() + ";\n\n        \u6CDB\u578B\u7684\u7C7B\u578B\u7EA6\u675F: " + logIdentity() + ";\n\n        \u4F7F\u7528\u7C7B\u578B\u53C2\u6570\u7684\u6CDB\u578B\u7EA6\u675F: " + useGenericTypeParams() + ";\n\n        \u4F7F\u7528\u7C7B\u7C7B\u578B\u7684\u6CDB\u578B\u53C2\u6570\u7EA6\u675F: " + useGenericClassParams() + ";\n    ");
    console.log('\n');
});
