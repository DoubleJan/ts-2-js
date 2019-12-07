"use strict";
// 泛型
exports.__esModule = true;
// 类型变量
function printf(arg) {
    return "arg<" + typeof arg + ">: " + arg;
}
exports["default"] = (function () {
    printf({ x: 3, y: 4 });
});
