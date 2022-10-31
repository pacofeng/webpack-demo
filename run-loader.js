const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders(
  {
    resource: './demo.txt',
    loaders: [
      {
        loader: path.resolve(__dirname, './loaders/demo-loader'),
        options: {
          name: 'demo.[ext]',
        },
      },
      path.resolve(__dirname, './loaders/pitch-loader'),
    ],
    context: {
      emitFile: (url, output) => {
        console.log(`Emitting [${output}] to [${url}]`);
      },
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => (err ? console.error(err) : console.log(result))
);
