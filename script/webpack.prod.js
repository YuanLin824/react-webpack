/** webpack 生产环境配置 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: 'production', // 生产模式
})
