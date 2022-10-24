const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

// order matters
const cssLoaders = [parts.autoprefix(), parts.tailwind()];
const commonConfig = merge([
  { entry: ['./src'] },
  parts.page({ title: 'dddemo' }),
  // parts.loadCSS(),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.loadImages({ limit: 15000 }),
  parts.loadJavaScript(),
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
