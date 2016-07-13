var path = require('path');

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = [...arguments];
  return path.join(_root, ...args)
}

exports.root = root;
