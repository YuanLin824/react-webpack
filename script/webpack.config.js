/** webpack 公用配置 */
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
}
