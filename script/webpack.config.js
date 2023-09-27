/** webpack 公用配置 */
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, '../index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
  resolve: {
    /** 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件 */
    /** 如果项目中只有 tsx 或 ts 可以将其写在最前面 */
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  /** 根据项目去配置 */
                  targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead',
                  /** 会根据配置的目标环境找出需要的polyfill进行部分引入 */
                  useBuiltIns: 'usage',
                  /** 使用 core-js@3 版本 */
                  corejs: 3,
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
    ],
  },
}
