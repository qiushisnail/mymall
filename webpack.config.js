const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

// 获取html-webpack-login参数的方法
var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}
// webpack config
let config = {
  mode: 'development',
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    filename: 'js/[name].js',
    //publicPath: "/dist",
    path: resolve(__dirname, 'dist')
  },
  devServer: {
    host: 'localhost',    //服务器的ip地址
    port: 1573,    //端口
    open: true,    //自动打开页面，
    hot: true,    //开启热更新
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader"
        ],
        exclude: /node_modules/,
        include: resolve('./src')
      },
      {
        test: /\.(png|gif|jpg|svg|woff|woff2?|eot|ttf|otf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'resoure/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 把css单独到文件里
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css'
    }),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
    new webpack.HotModuleReplacementPlugin()    //引入热更新插件
  ],
  optimization: {
    // 独立通用模块到js/base.js
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          name: "common",
          filename: 'js/base.js',
          maxInitialRequests: 5,
          minSize: 0 // 默认是30kb，minSize设置为0之后
        },
      }
    }
  }
};

module.exports = config