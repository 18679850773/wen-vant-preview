const path = require('path')
const webpack = require('webpack')

module.exports = {
  assetsDir: 'assets',
  configureWebpack: {
    resolve: {
      modules: ['./components'],
      alias: {
        '@api': path.join(__dirname, 'src/api'),
        '@mixins': path.join(__dirname, 'src/mixins'),
        '@filters': path.join(__dirname, 'src/filters'),
        '@store': path.join(__dirname, 'src/store'),
        '@constants': path.join(__dirname, 'src/constants'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@utils': path.join(__dirname, 'src/utils')
      }
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // 只打包初始时依赖的第三方
          },
          // commons: {
          //   name: "chunk-comomns",
          //   test: resolve("src/components"), // 可自定义拓展你的规则
          //   minChunks: 2, // 最小共用次数
          //   priority: 5,
          //   reuseExistingChunk: true
          // }
        }
      }
    }
  },
  lintOnSave: false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'vue-plugin-load-script',
    'echarts'
  ],
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, '../dev'),
    proxy: {
        '/phoenix/arctic': {
            target: 'http://arctic.intra.sit.beyonds.gw',
            changeOrigin: true,
        }, 
        '/phoenix/poly': {
            target: 'http://poly.intra.sit.beyonds.gw',
            changeOrigin: true,
        },
        '/cdn': {
            target: 'https://spres.beyonds.com',
            changeOrigin: true,
        }       
    }
  }
}