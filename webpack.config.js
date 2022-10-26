const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

// order matters
const cssLoaders = [parts.autoprefix(), parts.tailwind()];

const commonConfig = merge([
  { output: { path: path.resolve(process.cwd(), 'dist') } },
  parts.clean(),
  { entry: ['./src'] },
  parts.page({ title: 'dddemo' }),
  // parts.loadCSS(),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.loadImages({ limit: 15000 }),
  parts.loadJavaScript(),
  parts.setFreeVariable('HELLO', 'hello from config'),
]);

const productionConfig = merge([
  parts.eliminateUnusedCSS,
  { mode: 'production' },
  parts.generateSourceMaps({ type: 'source-map' }),
  // { optimization: { splitChunks: { chunks: 'all' } } },
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  },
  parts.attachRevision(),
  parts.minifyJavaScript(),
  parts.minifyCss({ options: { preset: ['default'] } }),
  {
    output: {
      chunkFilename: '[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      assetModuleFilename: '[name].[contenthash][ext][query]',
    },
  },
]);

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServer(),
]);

const getConfig = (mode) => {
  switch (mode) {
    case 'prod:legacy':
      process.env.BROWSERSLIST_ENV = 'legacy';
      return merge(commonConfig, productionConfig);
    case 'prod:modern':
      process.env.BROWSERSLIST_ENV = 'modern';
      return merge(commonConfig, productionConfig);
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Unknow mode: ${mode}`);
  }
};
module.exports = getConfig(mode);
