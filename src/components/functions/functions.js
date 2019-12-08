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
exports["default"] = (function () {
    console.log('TypeScript 函数类型');
    console.log("\n        \u51FD\u6570\u7C7B\u578B\u5B9A\u4E49: " + defineFunctionType() + ";\n        \n        \u533F\u540D\u51FD\u6570\u7C7B\u578B\u5B9A\u4E49: " + defineAnonymousFunction() + ";\n    ");
});
