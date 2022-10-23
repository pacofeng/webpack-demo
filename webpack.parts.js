const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'));

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
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
      filename: '[name].css',
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
