const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const PackageJson = require('../package.json');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../example/components', PackageJson.name)
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
    }),
    new CopyPlugin([
      //{from: './src/', to: './'}
     {from: './src/', to: './', ignore: ['*main.js']}
    ]),
  ],
}
