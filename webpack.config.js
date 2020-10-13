const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
require('@babel/polyfill')

module.exports = {
    //진입점, 가장 먼저 실행되어야 할 파일
    entry: {
        app: [
            '@babel/polyfill',
            path.join(__dirname, 'main.js')
        ]
    },
    //결과물에 대한 설정
    output: {
        filename: '[name].js', //app.js
        path: path.join(__dirname, 'dist') //확장자가 없으면 디렉토리 이름
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}