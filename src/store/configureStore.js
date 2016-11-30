/**
 * Created by zz on 2016/11/7.
 */
// 使用DefinePlugin (Webpack) 或者 loose-envify (Browserify)
// 把开发和生产环境区分开发打包
if (process.env.NODE_ENV) {
  console.log(process.env.NODE_ENV,"prod");
  module.exports = require('./configureStore.prod');
} else {
  console.log(process.env.NODE_ENV,"dev");
  module.exports = require('./configureStore.dev');
}