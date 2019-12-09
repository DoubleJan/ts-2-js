"use strict";
// 函数类型
exports.__esModule = true;
// 函数类型
function defineFunctionType() {
    function add(x, y) {
        return "x<" + typeof x + ">: " + x + ", y<" + typeof y + ">: " + y + ", x + y = " + (x + y);
    }
    return add(1, 3);
}
// 匿名函数的，完整的函数类型定义
// 匿名函数通常要赋值给一个变量，完整的类型定义应当变量，函数参数，函数返回值都有类型注解
// 通常只需要写一边即可
function defineAnonymousFunction() {
    var mAdd = function (x, y) {
        return "x<" + typeof x + ">: " + x + ", y<" + typeof y + ">: " + y + ", x + y = " + (x + y);
    };
    mAdd(2, 5);
}
// 参数约束
// 函数的形参与实参，必须数量相同，类型一一对应
function paramsConstraint() {
    // 剩余参数必须使用rest风格（即...开头），否则只会接收到第一个参数
    var comples = function (str, isPrint, num) {
        if (isPrint === void 0) { isPrint = true; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (isPrint) {
            return "arguments: " + str + ", " + isPrint + ", " + num + ", " + args + ", " + args.length;
        }
        return "isPrint: " + isPrint;
    };
    return comples('can print', undefined, 3, false, true, false);
}
//this类型约束
function thisConstraint() {
    var deck1 = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
            var _this = this;
            return function () {
                // TS使用_this标记当前this，下面的代码是测试一下
                // 如果_this被使用了，会发生什么
                // let _this = 'THIS';
                // console.log(_this);
                var pickedCard = Math.floor(Math.random() * 52);
                var pickedSuit = Math.floor(pickedCard / 13);
                return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
            };
        }
    };
    function noThis() {
        return function () {
            return this.name;
        };
    }
    var printName = { name: 'a string name', noThis: noThis };
    var cp1 = deck1.createCardPicker();
    // 下面将deck1绑定到另一个类型相同，但数据不同的对象上，此时，ts并不报错
    // 因为ts只是检查类型是否一致，不关心对象数据
    var cp2 = deck1.createCardPicker().bind({
        suits: ["hearts", "spades"],
        cards: Array(52),
        createCardPicker: function () {
            var _this = this;
            return function () {
                var pickedCard = Math.floor(Math.random() * 52);
                return { suit: _this.suits[3], card: pickedCard % 13 };
            };
        }
    });
    return "\u6B63\u5E38\u7684Card: " + JSON.stringify(cp1()) + ", \u4E0D\u6B63\u5E38\u4E14\u4E0D\u62A5\u9519\u7684Card: " + JSON.stringify(cp2());
}
// 函数重载
// 如果重载的函数之间参数列表的参数个数不同，多出来的参数必须是可选的
// 函数重载的最后一层，函数实现，必须在之前有同样的参数列表的函数声明，否则最后一行的参数声明会报错
function fnOverride() {
    function printf(x, y, z, isZ) {
        return "x: " + x + ", y: " + y + ", z<" + isZ + ">: " + z;
    }
    return printf(12, '27') + ", " + printf('dff', 4) + ", " + printf('13', 56, 'true') + ", " + printf('13', 56, 'true', false);
}
exports["default"] = (function () {
    console.log('TypeScript 函数类型');
    console.log("\n        \u51FD\u6570\u7C7B\u578B\u5B9A\u4E49: " + defineFunctionType() + ";\n        \n        \u533F\u540D\u51FD\u6570\u7C7B\u578B\u5B9A\u4E49: " + defineAnonymousFunction() + ";\n\n        \u51FD\u6570\u7684\u53C2\u6570\u7EA6\u675F: " + paramsConstraint() + ";\n\n        \u51FD\u6570\u7684this\u7C7B\u578B\u7EA6\u675F: " + thisConstraint() + ";\n\n        \u51FD\u6570\u7684\u91CD\u8F7D: " + fnOverride() + ";\n    ");
    console.log('\n');
});
