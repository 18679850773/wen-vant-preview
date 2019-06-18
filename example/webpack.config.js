const {join:pathJoin} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
    return pathJoin(__dirname, '..', dir)
}
  
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
        modules: ['./components', 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': pathJoin(__dirname, './src')
          }
      },

    module: {        
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [pathJoin(__dirname, 'src'), pathJoin(__dirname, 'node_modules/element-ui')],
                exclude: [pathJoin(__dirname, 'node_modules/element-ui/lib/element-ui.common.js')]
                // include: [resolve('src'), resolve('test')]
               },
            {
                test: /\.(scss|css)$/,             
                loader: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,             
                loader: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader'
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader'
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
        open: true,
        port: 9001
    }
}