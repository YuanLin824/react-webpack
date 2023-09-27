/** webpack 公用配置 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
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
                /** useBuiltIns: 根据配置的目标环境找出需要的polyfill进行部分引入; corejs: 指定 core-js 版本 */
                { targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', useBuiltIns: 'usage', corejs: 3 },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        use: [
          MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 代替 style-loader
          'css-loader',
          // postcss-loader 可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill;
          // 也包括会自动帮助我们添加 autoprefixer
          { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['postcss-preset-env', {}]] } } },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        /**
         * 限制打包图片的大小;
         * 大于或等于 8192Byte, 按照相应的文件名和路径打包图片;
         * 小于 8192Byte, 将图片转成 base64 格式字符串
         * */
        parser: { dataUrlCondition: { maxSize: 25 * 1024 } },
        /**
         * img: 图片打包的文件夹
         * [name].[ext]: 设定图片按照本来的文件名和扩展名打包, 不用进行额外编码
         * [name].[hash:8].[ext]: 一个项目中如果两个文件夹中的图片重名, 打包图片就会被覆盖, 加上 hash 值的前八位作为图片名, 可以避免重名;
         * */
        generator: { filename: 'imgs/[name].[hash:8][ext]' },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 25 * 1024 } },
        generator: { filename: 'fonts/[name].[hash:8][ext]' },
      },
    ],
  },
  optimization: {
    minimizer: [
      // `...`, // 在 webpack@5 中, 可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      new CssMinimizerPlugin({
        // parallel true:  // 多进程并发执行, 提升构建速度; 默认开启; 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
  },
  plugins: [
    /** 使用自定义模板 */
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../public/index.html') }),
    /** MiniCssExtractPlugin 会将 CSS 提取到单独的文件中, 为每个包含 CSS 的 JS 文件创建一个 CSS 文件, 并且支持 CSS 和 SourceMaps 的按需加载 */
    new MiniCssExtractPlugin({ filename: 'css/[hash:8].css' }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, '../src') },
    /** 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件 */
    /** 如果项目中只有 tsx 或 ts 可以将其写在最前面 */
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  },
}
