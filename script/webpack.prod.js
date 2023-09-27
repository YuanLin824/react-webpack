/** webpack 生产环境配置 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: 'production', // 生产模式
})
