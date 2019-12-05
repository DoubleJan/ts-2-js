"use strict";
// TypeScript 基础类型的类型注解
exports.__esModule = true;
exports["default"] = (function () {
    // 类型注解
    var num = 1;
    var str = 'a string';
    var bool = true;
    var numArr = [1, 2, 3];
    var nullValue = null;
    var undefinedValue = undefined;
    var anyValue = 'any value';
    var voidValue = undefined;
    var neverValue;
    // 解构赋值
    var obj = { x: 1, y: 2 };
    var x = obj.x, y = obj.y;
    var XX = obj.x, YY = obj.y;
    console.log('TypeScript 类型注解');
    console.log("\n        \u57FA\u7840\u7C7B\u578B\u6CE8\u89E3\uFF1A\n\n        key: num, type: number, value: " + num + ";\n\n        key: str, type: string, value: " + str + ";\n\n        key: bool, type: boolean, value: " + bool + ";\n\n        key: numArr, type: Array<number>, value: " + numArr + ";\n\n        key: nullValue, type: null, value: " + nullValue + ";\n\n        key: undefinedValue, type: undefined, value: " + undefinedValue + ";\n\n        key: anyValue, type: any->string, value: " + anyValue + ";\n\n        key: voidValue, type: void, value: " + voidValue + ";\n\n        key: neverValue, type: never, value: " + neverValue + ";\n\n        \u89E3\u6784\u8D4B\u503C\u7684\u7C7B\u578B\u6CE8\u89E3\uFF1A\n\n        x: " + x + ", y: " + y + ", XX: " + XX + ", YY: " + YY + ",\n    ");
    console.log('\n');
});
