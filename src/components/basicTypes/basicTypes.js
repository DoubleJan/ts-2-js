"use strict";
// TypeScript 基础类型的类型注解
exports.__esModule = true;
exports["default"] = (function () {
    // 基础类型注解
    var num = 1;
    var str = 'a string';
    var bool = true;
    var numArr = [1, 2, 3];
    var nullValue = null;
    var undefinedValue = undefined;
    var anyValue = 'any value';
    var voidValue = undefined;
    var neverValue;
    console.log('TypeScript 基础类型注解');
    console.log("\n    key: num, type: number, value: " + num + ";\n    key: str, type: string, value: " + str + ";\n    key: bool, type: boolean, value: " + bool + ";\n    key: numArr, type: Array<number>, value: " + numArr + ";\n    key: nullValue, type: null, value: " + nullValue + ";\n    key: undefinedValue, type: undefined, value: " + undefinedValue + ";\n    key: anyValue, type: any->string, value: " + anyValue + ";\n    key: voidValue, type: void, value: " + voidValue + ";\n    key: neverValue, type: never, value: " + neverValue + ";\n    ");
});
