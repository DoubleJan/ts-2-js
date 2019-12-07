

// 泛型

// 类型变量
function printf<T>(arg: T): string {
    return `arg<${typeof arg}>: ${arg}`
}




export default () => {
    printf({ x: 3, y: 4 });
}