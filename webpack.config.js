const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

// 获取html-webpack-login参数的方法
let getHtmlConfig = function (name) {
  return {
    template: 'src/view/' + name + '.html',//path.resolve(__dirname, 'src/view/' + name + '.html'),
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['commons', name]
  }
}

// webpack config
let config = {
  mode: 'development',
  entry: {
    'commons': [path.join(__dirname, './src/page/common/index.js')],
    'index': [path.join(__dirname, './src/page/index/index.js')]
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
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new webpack.HotModuleReplacementPlugin(),   //引入热更新插件

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