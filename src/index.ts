import components from './components';

export default (() => {
    // 类型注解
    components.basicTypes();
    // 枚举类型
    components.enums();
    // 接口类型
    components.interfaces();
    // 泛型类型
    components.generic();
    // 类型推断
    components.inference();
})();