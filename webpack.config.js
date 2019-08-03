const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

// 获取html-webpack-login参数的方法
let getHtmlConfig = function (name, title) {
  return {
    template: 'src/view/' + name + '.html',//path.resolve(__dirname, 'src/view/' + name + '.html'),
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    title: title,
    favicon: './favicon.ico',
    chunks: ['commons', name]
  }
}

// webpack config
let config = {
  mode: 'development',
  entry: {
    'commons': [path.join(__dirname, './src/page/common/index.js')],
    'index': [path.join(__dirname, './src/page/index/index.js')],
    'list': [path.join(__dirname, './src/page/list/index.js')],
    'detail': [path.join(__dirname, './src/page/detail/index.js')],
    'cart': [path.join(__dirname, './src/page/cart/index.js')],
    'order-confirm': [path.join(__dirname, './src/page/order-confirm/index.js')],
    'order-list': [path.join(__dirname, './src/page/order-list/index.js')],
    'order-detail': [path.join(__dirname, './src/page/order-detail/index.js')],
    // 'payment': [path.join(__dirname, './src/page/payment/index.js')],
    'userLogin': [path.join(__dirname, './src/page/userLogin/index.js')],
    'userReg': [path.join(__dirname, './src/page/userReg/index.js')],
    'userPwdReset': [path.join(__dirname, './src/page/userPwdReset/index.js')],
    'user-center': [path.join(__dirname, './src/page/user-center/index.js')],
    'user-center-update': [path.join(__dirname, './src/page/user-center-update/index.js')],
    'user-pass-update': [path.join(__dirname, './src/page/user-pass-update/index.js')],
    'result': [path.join(__dirname, './src/page/result/index.js')],
    // 'about': [path.join(__dirname, './src/page/about/index.js')],
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: path.join(__dirname, './dist'),//存放文件的路径,必须为绝对路径才有效
    filename: 'js/[name].js',
    publicPath: '/dist/', //访问文件时用的路径
    chunkFilename: "js/[name].js"
  },
  devServer: {
    disableHostCheck: true,
    host: 'localhost',    //服务器的ip地址
    port: 1573,    //端口
    open: true,    //自动打开页面，
    hot: true,    //开启热更新
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      node_modules: __dirname + '/node_modules',
    }
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve('./src')
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      // 图片的配置
      {
        test: /\.(png|jpg|gif|bmp|jpeg)$/, use: [{
          loader: 'url-loader',
          options: {
            limit: 100,
            outputPath: 'resource/',
            name: '[name].[ext]'
          }
        }],
      },
      // 字体图标的配置
      { test: /\.(ttf|eot|svg|woff|woff2)\??.*$/, use: 'url-loader' },
      {
        test: /\.art$/,
        use: [
          {
            loader: "art-template-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    // 把css单独到文件里
    new MiniCssExtractPlugin({ //css文件单独打包
      filename: "css/[name].css", //保存到dist目录下，有一个css文件夹
      chunkFilename: "[id].css"
    }),
    // html模板的处理
    new webpack.HotModuleReplacementPlugin(),   //引入热更新插件
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
    // new HtmlWebpackPlugin(getHtmlConfig('payment' ,'订单支付')),
    new HtmlWebpackPlugin(getHtmlConfig('userLogin', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('userReg', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('userPwdReset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    // new HtmlWebpackPlugin(getHtmlConfig('about','关于mmall')),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 2, // 表示提取公共部分最少的文件数
          minSize: 0  // 表示提取公共部分最小的大小
        }
      }
    }
  }
};

module.exports = config