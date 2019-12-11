"use strict";
// TypeScript 高级类型
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// 交叉类型 
// 要求同时满足所有指定的类型的要求
// 函数返回值需要做显式类型转换<T & U>
function intersectionTypes() {
    function extend(first, second) {
        var result = __assign(__assign({}, first), second);
        // for (const prop in first) {
        //     if (first.hasOwnProperty(prop)) {
        //         (<First>result)[prop] = first[prop];
        //     }
        // }
        // for (const prop in second) {
        //     if (second.hasOwnProperty(prop)) {
        //         (<Second>result)[prop] = second[prop];
        //     }
        // }
        return result;
    }
    var Cat = /** @class */ (function () {
        function Cat(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
        return Cat;
    }());
    var Dog = /** @class */ (function () {
        function Dog(n, w) {
            this.name = n;
            this.walkDog = w;
        }
        return Dog;
    }());
    var result = extend({ name: 'a cat', catchMouse: false }, { name: 'a dog', walkDog: true });
    return "Cat & Dog: " + JSON.stringify(result);
}
// 联合类型
// 满足指定的任意类型的要求即可
function unionTypes() {
    function unionAnimal(animal) {
        var result = __assign({}, animal);
        return result;
    }
    var Cat = /** @class */ (function () {
        function Cat(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
        return Cat;
    }());
    var Dog = /** @class */ (function () {
        function Dog(n, w) {
            this.name = n;
            this.walkDog = w;
        }
        return Dog;
    }());
    var result = unionAnimal({ name: 'a cat', catchMouse: false });
    // 只能访问联合类型共有成员
    // return `union: ${result.name}, ${result.walkDog}, ${result.catchMouse}`;    // TypeScript error
    return "union: " + JSON.stringify(result);
}
// 自定义类型守卫和类型谓词
// 如果想确切的使用联合类型某一类型的特有属性时，必须不断地if判断是否存在
// TypeScript提供类型谓词来解决这个问题
function typeGuards(type) {
    var Cat = /** @class */ (function () {
        function Cat(n, c) {
            this.name = n;
            this.catchMouse = c;
        }
        return Cat;
    }());
    var Dog = /** @class */ (function () {
        function Dog(n, w) {
            this.name = n;
            this.walkDog = w;
        }
        return Dog;
    }());
    function isCat(animal) {
        return animal.catchMouse !== undefined;
    }
    // 如果这里定死了Cat，TypeScript会知道，永远进不去else分支，那么就不能使用walkDog
    // 此适else分支被认为是never的： Property 'walkDog' does not exist on type 'never'
    var result = type ? new Cat('a cat', false) : new Dog('a dog', true);
    //TypeScript不仅知道在if分支里是Cat类型； 它还清楚在else分支里，一定不是Cat类型，一定是Dog类型
    if (isCat(result)) {
        return "result is " + JSON.stringify(result);
    }
    else {
        return "another result " + (result.walkDog ? 'can' : 'can\'t') + " walk the dog";
    }
}
// typeof类型守卫
// typeof类型守卫只有两种形式能被识别：typeof v === "typename"和typeof v !== "typename"，
// "typename"必须是"number"，"string"，"boolean"或"symbol"。 
// 但是TypeScript并不会阻止与其它字符串比较，不会把那些表达式识别为类型守卫.
function typeofTypeGuard() {
    // 可以将typeof类型守卫定义为一个函数
    function isNumber(x) {
        return typeof x === 'number';
    }
    // 直接使用typeof，会被默认为类型守卫
    return "'sdd' is Number: " + isNumber('sdd') + ", 'sdd' is string: " + (typeof 'sdd' === 'string');
}
// instanceof类型守卫
// 检查 左侧变量的原型类型，是否是右侧构造函数的原型类型能够产生的任意子类型（子类类型的联合类型）
function instanceofTypeGuard() {
    var Animal = /** @class */ (function () {
        function Animal(n) {
            this.name = n;
        }
        return Animal;
    }());
    var Pet = /** @class */ (function (_super) {
        __extends(Pet, _super);
        function Pet(n) {
            return _super.call(this, n) || this;
        }
        return Pet;
    }(Animal));
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(n, w) {
            var _this = _super.call(this, n) || this;
            _this.name = n;
            _this.walkDog = w;
            return _this;
        }
        return Dog;
    }(Pet));
    var pet = new Pet('a pet') instanceof Animal;
    var dog = new Dog('a dog', false) instanceof Animal;
    return "pet is animal: " + pet + ", dog is Animal: " + dog;
}
// 不为null和undefined
// null和undefined可以是任意类型的子类型，如果要求一个变量不为null或undefined，可以使用!后缀
// 这里只能检查null，undefined，如果没有传参(或者联合类型加上void)，还是会报错
// 即便使用了后缀，也会报错，因为编译后不会
function notNullOrUndefined() {
    function getChar(param) {
        return "" + param.charAt(0);
    }
    // return `${getChar('AHH')}, ${getChar(null)}, ${getChar(undefined)}`;
    return "" + getChar('AHH');
}
// 类型别名
// 使用注意
// 1. 基础类型使用类型别名没有意义
// 2. 类型别名与接口的区别在于，类型别名不会创建一个真实的名字，只是创建一个引用，接口定义真实创建了名字，并且，接口可以被继承和实现，类型别名不可以
// 3. 当使用多个类型的联合类型或交叉类型时，应当使用类型别名。
// 4. 类型别名仅能用于类型注解，不能当作变量使用。
function typeAnotherName() {
    var getName = function (param) {
        return JSON.stringify(param);
    };
    var name = 'a name';
    var age = 25;
    // const info: Info = 25;    // TypeScript error
    var oneof = 11;
    return name + "'s age is " + age + " or " + oneof + ", is never: " + getName({ never: true });
}
// 字符串和数字的字面量类型
function literal() {
    var ab = 'A';
    var bin = 1;
    return "AB: " + ab + ", BIN: " + bin;
}
exports["default"] = (function () {
    console.log('TypeScript 高级类型');
    console.log("\n        \u4EA4\u53C9\u7C7B\u578B: " + intersectionTypes() + ";\n\n        \u8054\u5408\u7C7B\u578B: " + unionTypes() + ";\n\n        \u7C7B\u578B\u8C13\u8BCD: " + typeGuards(true) + ", " + typeGuards(false) + ";\n\n        typeof\u7C7B\u578B\u5B88\u536B: " + typeofTypeGuard() + ";\n\n        instanceof\u7C7B\u578B\u5B88\u536B: " + instanceofTypeGuard() + ";\n\n        \u4E0D\u4E3Anull\u548Cundefined: " + notNullOrUndefined() + ";\n\n        \u7C7B\u578B\u522B\u540D: " + typeAnotherName() + ";\n\n        \u6570\u5B57\u548C\u5B57\u7B26\u4E32\u5B57\u9762\u91CF: " + literal() + ";\n    ");
    console.log('\n');
});
