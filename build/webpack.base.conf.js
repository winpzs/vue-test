var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var parseArgs = require('minimist')

var CopyWebpackPlugin = require('copy-webpack-plugin')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

vueLoaderConfig.ts = 'ts-loader';
// vueLoaderConfig.esModule = true;

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
//用来屏蔽某些vue模板解析，方便开发迁移调试
var _excludes = [];
var webpackConfig = {
  //入口文件
  entry: { main: './src/main.js' },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename:'[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.scss', '.css', '.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      src: resolve('src'),
      libs: resolve('src') + '/libs',
      '@libs': resolve('src') + '/libs',
      style: resolve('src') + '/style',
      services: resolve('src') + '/services',
      modules: resolve('src') + '/modules'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader",
        // options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.vue$/,
        exclude: _excludes,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: _excludes,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        'options': {
          'plugins': ['lodash'],
          'presets': [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: _excludes,
        options: {
          limit: 10000,
          publicPath: process.env.NODE_ENV === 'production' ? '../img/' : utils.assetsPath('img/'),
          outputPath: utils.assetsPath('img/'),
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: _excludes,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: process.env.NODE_ENV === 'production' ? '../fonts/' : utils.assetsPath('fonts/'),
          outputPath: utils.assetsPath('fonts/'),
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    //webpack在require动态路径时会加载整个目录的文件作为模块，这个插件可以限定要引入的模块
    new webpack.ContextReplacementPlugin(
      /codemirror[\/\\]mode$/,
      /javascript/
    ),
    new webpack.ContextReplacementPlugin(
      /codemirror[\/\\]theme$/,
      /eclipse/
    ),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/config'),
        to: 'config',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/images'),
        to: 'static/images',
        ignore: ['.*']
      }
    ])
  ]
}
if (config.build.bundleAnalyzerReport) {
  //非常酷的插件，自动浏览器预览最后生成的js boundles的内容
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static'
  }));
}
var conf = {
  filename: 'index.html',
  template: 'index.html', //模板路径
  inject: true
}
// 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
module.exports = webpackConfig;
