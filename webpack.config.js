switch(process.env.npm_lifecycle_event) {
  case 'build':
    process.env.NODE_ENV = process.env.ENV = 'production';
    module.exports = require('./config/webpack.prod.js');
    break;
  case 'test':
    process.env.NODE_ENV = process.env.ENV = 'test';
    module.exports = require('./config/webpack.test.js');
  case 'start':
  default:
    process.env.NODE_ENV = process.env.ENV = 'development';
    module.exports = require('./config/webpack.dev.js');
}
