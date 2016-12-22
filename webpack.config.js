/**
 * Created by zz on 2016/9/23.
 */
// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body ${__dirname} 為 ES6 語法對應到 __dirname
const webpack = require('webpack');
const path = require('path');
var env = process.env.NODE_ENV;
const config = {
  entry: {
    index: './src/index.js'//入口文件
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    chunkFilename: 'chunk[id].js?ver' + new Date().getTime(),
    publicPath: 'http://res2.esf.leju.com/Tel_React_SPA/dist/'
  },
  resolve: {
    alias: {//它的作用是把用户的一个请求重定向到另一个路径
      //'redux-devtools/lib': path.join(__dirname, '..', '..', 'src'),//这些但是demo自定义的
      //'redux-devtools': path.join(__dirname, '..', '..', 'src'),
      'react': path.join(__dirname, 'node_modules', 'react'),
      'moment': "moment/min/moment-with-locales.min.js"
    },
    extensions: ['', '.js', '.css']
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    // loaders 則是放欲使用的 loaders，
    // 在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案（
    // 排除了 npm 安裝的套件位置 node_modules）轉譯成瀏覽器可以閱讀的 JavaScript。preset 則是使用的 babel 轉譯規則，這邊使用 react、es2015
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/src`,
        exclude: /bundle\.js$/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },// expose-loader将需要的变量从依赖包中暴露出来
      {
        test: require.resolve("jquery"),
        loader: "expose-loader?$!expose-loader?jQuery"
      }
    ]
  },
  // plugins 放置所使用的插件
  plugins: [
    /*new webpack.DllReferencePlugin({//  ddl打包
     context: __dirname,
     manifest: require('./manifest.json'),
     }),*/
    new webpack.DefinePlugin({//生产环境
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(), //删除类似的重复代码
    new webpack.optimize.AggressiveMergingPlugin()//合并块  貌似这两个都没有什么卵用
  ]
};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({//压缩
      compressor: {
        warnings: false
      }
    })
  )
}
module.exports = config;