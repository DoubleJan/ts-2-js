// 从ts文件导出js文件

const cmd = require('node-cmd');
const path = require('path');
const pluginName = 'OutputJavaScriptPlugin';


class OutputJavaScriptPlugin {
    apply(compiler) {
        compiler.hooks.compile.tap(pluginName, () => {
            cmd.run(`tsc ${path.resolve(__dirname, './../src/index.ts')}`);
        });
    }
}

module.exports = OutputJavaScriptPlugin;