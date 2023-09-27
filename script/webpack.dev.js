/** webpack 开发环境配置 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: 'development', // 开发模式
  devServer: { open: false, port: 8080 },
})
