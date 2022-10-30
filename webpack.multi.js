const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

// process.env.BROWSERSLIST_ENV = 'modern';
const cssLoaders = [parts.autoprefix(), parts.tailwind()];

module.exports = merge(
  {
    mode: 'production',
    entry: { demoEntry: './src/index.js', anotherEntry: './src/multi.js' },
  },
  parts.page({ title: 'Demo', chunks: ['demoEntry'] }),
  parts.page({ title: 'Another', url: 'another', chunks: ['anotherEntry'] }),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.setFreeVariable('HELLO', 'hello from config')
);
