const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  plugins: [
    new CleanPlugin(),
    new CopyPlugin([
      {from: './src/', to: './', ignore: ['main.js']}
    ]),
  ],
}
