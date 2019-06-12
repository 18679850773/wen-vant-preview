const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {from: './src/', to: './'}
    ]),
  ],
}
