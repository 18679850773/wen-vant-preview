const {join:pathJoin} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry:{
        app:'./src/main.js' // 入口文件的位置
    },
    output:{
        filename: '[name].bundle.js', // 输出文件名字的格式
        path: pathJoin(__dirname,'./dist') // 输出的绝对路径
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: ['./components', 'node_modules']
        // alias: {
        //   '@': path.join(__dirname, 'src')
        // }
      },

    module: {        
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'template.html',
            filename:'index.html'
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        }
    },
    devServer: {
        open: true
    }
}