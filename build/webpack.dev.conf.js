var utils = require('./utils')  // 引入一些小工具
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')  //配置合并插
var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: !config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#eval-source-map', //#cheap-module-eval-source-map  eval-source-map
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),


  ]
})
