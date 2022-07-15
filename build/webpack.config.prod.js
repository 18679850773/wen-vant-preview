const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const htmlWebpackPlugins = require('html-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    // output: {
    //     path: path.join(__dirname, './dist'),
    //     filename: 'bundle.js'
    // },
    module: {
        // rules: [
        //     //配置处理.css文件第三方loader规则
        //     {
        //         test: /\.css/,
        //         use: ['style-loader', 'css-loader'],
        //         exclude: /node_modules/,

        //     },

        //     {
        //         test: /\.(jpg|png|gif|jpeg|bmp)$/,
        //         use: 'url-loader?limit=12170&name=[hash:8]-[name].[ext]',

        //     },
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         use: {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: ['@babel/preset-env'],
        //                 plugins: ['@babel/plugin-proposal-class-properties']
        //             }
        //         }
        //     },
        //     {
        //         test: /\.vue$/,
        //         loader: 'vue-loader'
        //     }
        // ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new htmlWebpackPlugins({
        //     template: path.join(__dirname, './src/index.html'),
        //     filename: 'index.html'
        // }),
        //请确保引入这个插件！
        // new VueLoaderPlugin(),
        new CopyPlugin([
            { from: './src/', to: './' }
        ]),
    ],
}
