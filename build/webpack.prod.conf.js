var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./config')
var baseWebpackConfig = require('./webpack.base.conf')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  output: {
    path: config.build.assetsRoot,
    filename: 'tree-table-vue-extend.js',
    library: 'tree-table-vue-extend',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
})

module.exports = webpackConfig
