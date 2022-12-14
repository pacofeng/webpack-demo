const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { ModuleFederationPlugin } = require('webpack').container;

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'));
const APP_SOURCE = path.join(__dirname, 'src');

exports.devServer = () => ({
  watch: true,
  devServer: {
    hot: true,
  },
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      // liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.page = ({ title }) => ({
  plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
    ],
  },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options,
          },
          'css-loader',
          'sass-loader',
        ].concat(loaders),
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
});

// use tailwind for eliminating unsuaed css demo
// to use tailwind, we have to use PostCSS
exports.tailwind = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: { plugins: [require('tailwindcss')()] },
  },
});

exports.eliminateUnusedCSS = () => ({
  plugin: [
    new PurgeCSSPlugin({
      paths: ALL_FILES,
      extractors: [
        {
          extroctor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['html'],
        },
      ],
    }),
  ],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: { plugins: [require('autoprefixer')()] },
  },
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_SOURCE,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({ devtool: type });

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.minifyJavaScript = () => ({
  optimization: { minimizer: [new TerserPlugin()] },
});

exports.minifyCss = ({ options }) => ({
  optimization: {
    minimizer: [new CssMinimizerPlugin({ minimizerOptions: options })],
  },
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

exports.webpackBundleAnalyzer = {
  plugins: [new BundleAnalyzerPlugin()],
};

exports.page = ({ title, url = '', chunks } = {}) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      chunks,
      filename: `${url && url + '/'}index.html`,
      context: { title },
    }),
  ],
});

exports.federateModule = ({ name, filename, exposes, remotes, shared }) => ({
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename,
      exposes,
      remotes,
      shared,
    }),
  ],
});
