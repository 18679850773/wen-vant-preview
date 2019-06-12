const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const PackageJson = require('../package.json');
const GenerateJsonPlugin = require('./plugin/generate-json-webpack-plugin');
// const appJsonTemplate = require('../example/app.template.json');

// const componentName = JSON.parse(`{"bs-${PackageJson.name.slice(PackageJson.name.lastIndexOf('-') + 1)}": "miniprogram_npm/${PackageJson.name}/index"}`);
// appJsonTemplate.usingComponents = {...componentName, ...appJsonTemplate.usingComponents};

module.exports = {
  mode: 'development',
  entry: './src/runtime.js',
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
     {from: './src/', to: './', ignore: ['main.js', 'runtime.js']}
    ]),
    // new GenerateJsonPlugin('../../../example/app.json', appJsonTemplate, null, 2)
  ],
}
