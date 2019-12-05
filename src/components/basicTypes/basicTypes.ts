// TypeScript 基础类型的类型注解

export default () => {
    // 类型注解
    let num: number = 1;
    let str: string = 'a string';
    let bool: boolean = true;
    let numArr: number[] = [1, 2, 3];
    let nullValue: null = null;
    let undefinedValue: undefined = undefined;
    let anyValue: any = 'any value';
    let voidValue: void = undefined;
    let neverValue: never;

    // 解构赋值
    const obj = { x: 1, y: 2 }
    const { x, y } = obj;
    const { x: XX, y: YY }: { x: number, y: number } = obj;

    console.log('TypeScript 类型注解');

    console.log(`
        基础类型注解：

        key: num, type: number, value: ${num};

        key: str, type: string, value: ${str};

        key: bool, type: boolean, value: ${bool};

        key: numArr, type: Array<number>, value: ${numArr};

        key: nullValue, type: null, value: ${nullValue};

        key: undefinedValue, type: undefined, value: ${undefinedValue};

        key: anyValue, type: any->string, value: ${anyValue};

        key: voidValue, type: void, value: ${voidValue};

        key: neverValue, type: never, value: ${neverValue};

        解构赋值的类型注解：

        x: ${x}, y: ${y}, XX: ${XX}, YY: ${YY},
    `);
    console.log('\n');
}
