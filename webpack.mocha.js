const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./tests', 'webpack-plugin-serve/client'],
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      waitForBuild: true,
    }),
    new MiniHtmlWebpackPlugin(),
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
