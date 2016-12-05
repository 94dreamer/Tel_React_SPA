/**
 * Created by zz on 2016/12/5.
 */
if (process.env.NODE_ENV) {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}