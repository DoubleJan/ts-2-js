const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Plugins = require('./plugins');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build',
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            filename: 'index.html',
        }),
        new Plugins.OutputJavaScriptPlugin()
    ]
}