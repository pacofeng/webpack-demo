const loaderUtils = require('loader-utils');

module.exports = function (input) {
  // const callback = this.async();
  // No callback -> return synchronous reaults
  // if (callback) {...}
  // callback(null, input + ' ' + input);

  const { name } = this.loaders[0].options;
  const url = loaderUtils.interpolateName(this, name, { input });

  this.emitFile(url, input);

  const path = `__webpack_public_path__ + ${JSON.stringify(url)};`;

  return `export default ${path}`;
};
