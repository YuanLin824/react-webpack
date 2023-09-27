搭建 Webpack 5 + React 项目框架

# 一, Webpack

## 1.1 Webpack 的好处

不使用任何打包工具的情况下, 很难在项目使用 es6+, typescript, React, Vue 语法;

**开发环境:**

- **新特性&新语法:** ESNext 新特性, .less, .ts, tsx/jsx, .vue 等浏览器无法识别的文件格式和语法都能在开发中使用; Webpack 的 Loader 机制能帮助进行转换;
- **模块化:** Webpack 中, 一切皆为模块; 可以使用模块化编程, 把复杂的程序细化为小的模块文件;
- **模块热替换 (HMR):** 提供模块热替换功能, 在修改, 代码后, 不需要重新加载整个页面, 只需要替换修改的模块, 从而提高开发效率;
- **Source Map:** 提供了 Source Map 功能, 可以将编译后的代码映射回原始源代码, 从而方便我们进行调试;

**生产环境:**

- **性能优化:** 可以压缩代码, 合并文件, 从而减少网络请求;
- **代码分割:** 可以进行代码分割, 实现按需加载或者并行加载, 从而减少页面加载时间, 提高用户体验;
- **缓存优化:** 可以根据文件内容生成 hash 值, 从而实现缓存优化, 减少网络请求和服务器负载;

## 1.2 Webpack 的基本概念

- **entry:** 使用哪个模块来作为构建的起始入口;
- **output:** 最终打包后的文件放在哪里, 以及如何命名这些文件;
- **loader:** 是处理文件的转换器, 用于对模块源码进行转换, webpack 只能识别 js、json 文件, 像 css 、ts 、jsx 等文件都需要通过 loader 进行转换;
- **plugin:** 是一种可扩展的机制, 可以打包过程中添加额外的功能;比如打包优化, 资源管理, 注入环境变量等;
- **mode:** 对于不同的环境, 我们往往需要不同的配置, 通过设置  mode  参数来选择环境

# 二, 搭建 React 项目

## 2.1 初始化

**执行命令**

```bash
mkdir create-react
cd create-react
yarn init # 生成 package.json 文件
git init # 生成 git 仓库
```

**创建 .gitignore**

```ignore
# folder
node_modules
dist
build

# file
```

## 2.2 安装配置 react, typescript

### 2.2.1 安装依赖

```bash
yarn add react react-dom
yarn add -D @types/react @types/react-dom typescript
tsc --init # 使用 tsc 命令需要全局安装 typescript
```

### 2.2.2 配置 tsconfig.json

```json
{
  /** tsconfig.json */
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    /*         Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "incremental": true,
    /*         Enable constraints that allow a TypeScript project to be used with project references. */
    // "composite": true,
    /*         Specify the path to .tsbuildinfo incremental compilation file. */
    // "tsBuildInfoFile": "./.tsbuildinfo",
    /*         Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSourceOfProjectReferenceRedirect": true,
    /*         Opt a project out of multi-project reference checking when editing. */
    // "disableSolutionSearching": true,
    /*         Reduce the number of projects loaded automatically by TypeScript. */
    // "disableReferencedProjectLoad": true,

    /* Language and Environment */
    /*         Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "target": "es2016",
    /*         Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "lib": [],
    /*         Specify what JSX code is generated. */
    "jsx": "preserve",
    /*         Enable experimental support for legacy experimental decorators. */
    // "experimentalDecorators": true,
    /*         Emit design-type metadata for decorated declarations in source files. */
    // "emitDecoratorMetadata": true,
    /*         Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFactory": "",
    /*         Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxFragmentFactory": "",
    /*         Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "jsxImportSource": "",
    /*         Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "reactNamespace": "",
    /*         Disable including any library files, including the default lib.d.ts. */
    // "noLib": true,
    /*         Emit ECMAScript-standard-compliant class fields. */
    // "useDefineForClassFields": true,
    /*         Control what method is used to detect module-format JS files. */
    // "moduleDetection": "auto",

    /* Modules */
    /*         Specify what module code is generated. */
    "module": "commonjs",
    /*         Specify the root folder within your source files. */
    "rootDir": "./src",
    /*         Specify how TypeScript looks up a file from a given module specifier. */
    "moduleResolution": "Node",
    /*         Specify the base directory to resolve non-relative module names. */
    "baseUrl": "./",
    /*         Specify a set of entries that re-map imports to additional lookup locations. */
    "paths": { "@/*": ["src/*"] },
    /*         Allow multiple folders to be treated as one when resolving modules. */
    // "rootDirs": [],
    /*         Specify multiple folders that act like './node_modules/@types'. */
    // "typeRoots": [],
    /*         Specify type package names to be included without being referenced in a source file. */
    // "types": [],
    /*         Allow accessing UMD globals from modules. */
    // "allowUmdGlobalAccess": true,
    /*         List of file name suffixes to search when resolving a module. */
    // "moduleSuffixes": [],
    /*         Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "allowImportingTsExtensions": true,
    /*         Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonExports": true,
    /*         Use the package.json 'imports' field when resolving imports. */
    // "resolvePackageJsonImports": true,
    /*         Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "customConditions": [],
    /*         Enable importing .json files. */
    // "resolveJsonModule": true,
    /*         Enable importing files with any extension, provided a declaration file is present. */
    // "allowArbitraryExtensions": true,
    /*         Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */
    // "noResolve": true,

    /*         JavaScript Support */
    /*         Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "allowJs": true,
    /*         Enable error reporting in type-checked JavaScript files. */
    // "checkJs": true,
    /*         Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */
    // "maxNodeModuleJsDepth": 1,

    /* Emit */
    /*         Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declaration": true,
    /*         Create sourcemaps for d.ts files. */
    // "declarationMap": true,
    /*         Only output d.ts files and not JavaScript files. */
    // "emitDeclarationOnly": true,
    /*         Create source map files for emitted JavaScript files. */
    "sourceMap": true,
    /*         Include sourcemap files inside the emitted JavaScript. */
    // "inlineSourceMap": true,
    /*         Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outFile": "./",
    /*         Specify an output folder for all emitted files. */
    // "outDir": "./",
    /*         Disable emitting comments. */
    // "removeComments": true,
    /*         Disable emitting files from a compilation. */
    "noEmit": true,
    /*         Allow importing helper functions from tslib once per project, instead of including them per-file. */
    "importHelpers": true,
    /*         Specify emit/checking behavior for imports that are only used for types. */
    // "importsNotUsedAsValues": "remove",
    /*         Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "downlevelIteration": true,
    /*         Specify the root path for debuggers to find the reference source code. */
    // "sourceRoot": "",
    /*         Specify the location where debugger should locate map files instead of generated locations. */
    // "mapRoot": "",
    /*         Include source code in the sourcemaps inside the emitted JavaScript. */
    // "inlineSources": true,
    /*         Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "emitBOM": true,
    /*         Set the newline character for emitting files. */
    // "newLine": "crlf",
    /*         Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "stripInternal": true,
    /*         Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitHelpers": true,
    /*         Disable emitting files if any type checking errors are reported. */
    // "noEmitOnError": true,
    /*         Disable erasing 'const enum' declarations in generated code. */
    // "preserveConstEnums": true,
    /*         Specify the output directory for generated declaration files. */
    // "declarationDir": "./",
    /*         Preserve unused imported values in the JavaScript output that would otherwise be removed. */
    // "preserveValueImports": true,

    /* Interop Constraints */
    /*         Ensure that each file can be safely transpiled without relying on other imports. */
    // "isolatedModules": true,
    /*         Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "verbatimModuleSyntax": true,
    /*         Allow 'import x from y' when a module doesn't have a default export. */
    // "allowSyntheticDefaultImports": true,
    /*         Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "esModuleInterop": true,
    /*         Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    // "preserveSymlinks": true,
    /*         Ensure that casing is correct in imports. */
    "forceConsistentCasingInFileNames": true,

    /* Type Checking */
    /*         Enable all strict type-checking options. */
    "strict": true,
    /*         Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "noImplicitAny": true,
    /*         When type checking, take into account 'null' and 'undefined'. */
    // "strictNullChecks": true,
    /*         When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictFunctionTypes": true,
    /*         Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictBindCallApply": true,
    /*         Check for class properties that are declared but not set in the constructor. */
    // "strictPropertyInitialization": true,
    /*         Enable error reporting when 'this' is given the type 'any'. */
    // "noImplicitThis": true,
    /*         Default catch clause variables as 'unknown' instead of 'any'. */
    // "useUnknownInCatchVariables": true,
    /*         Ensure 'use strict' is always emitted. */
    // "alwaysStrict": true,
    /*         Enable error reporting when local variables aren't read. */
    "noUnusedLocals": true,
    /*         Raise an error when a function parameter isn't read. */
    "noUnusedParameters": true,
    /*         Interpret optional property types as written, rather than adding 'undefined'. */
    // "exactOptionalPropertyTypes": true,
    /*         Enable error reporting for codepaths that do not explicitly return in a function. */
    "noImplicitReturns": true,
    /*         Enable error reporting for fallthrough cases in switch statements. */
    "noFallthroughCasesInSwitch": true,
    /*         Add 'undefined' to a type when accessed using an index. */
    // "noUncheckedIndexedAccess": true,
    /*         Ensure overriding members in derived classes are marked with an override modifier. */
    // "noImplicitOverride": true,
    /*         Enforces using indexed accessors for keys declared using an indexed type. */
    // "noPropertyAccessFromIndexSignature": true,
    /*         Disable error reporting for unused labels. */
    // "allowUnusedLabels": true,
    /*         Disable error reporting for unreachable code. */
    // "allowUnreachableCode": true,

    /* Completeness */
    /*         Skip type checking .d.ts files that are included with TypeScript. */
    // "skipDefaultLibCheck": true,
    /*         Skip type checking all .d.ts files. */
    // "skipLibCheck": true
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### 2.2.3 创建 index.tsx (项目入口文件)

_/src/index.tsx_

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/reset.less'

function App() {
  return <div>hello React + Webpack</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```

## 2.3 配置 Webpack

### 2.3.1 安装 Webpack 相关的包并创建 Webpack 相关配置文件

```bash
yarn add -D webpack webpack-cli webpack-dev-server webpack-merge
```

**/script/webpack.config.js**

```js
/** webpack 公用配置 */
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
}
```

**/script/webpack.dev.js**

```js
/** webpack 开发环境配置 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: 'development', // 开发模式
  devServer: { open: false, port: 8080 },
})
```

**/script/webpack.prod.js**

```js
/** webpack 生产环境配置 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  mode: 'production', // 生产模式
})
```

### 2.3.2 修改 package.json 的 scripts 配置

- 使用 NODE_ENV = production 来设置环境变量
- 为了在不同的平台上都能使用, 使用 cross-env 来兼容; 这样在不同环境也能正确获取环境变量;

```bash
yarn add -D cross-env
```

_package.json_

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack serve -c script/webpack.dev.js",
  "build": "cross-env NODE_ENV=production webpack -c script/webpack.prod.js"
},
```

### 2.3.3 配置 babel

- Webpack 只能识别 js, json 文件, 无法识别 jsx, tsx, vue 文件;
- Webpack 的 Loader 机制能够在构建时, 借助 babel-loader 对 js 代码进行转译;
- Babel 是一个 JavaScript 编译器; 主要用于将高版本的 JavaScript 代码转为向后兼容的 JS 代码, 进而兼容低版本浏览器或其他特殊环境;

**安装 babel**

```bash
yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

**/script/webpack.config.js**

```js
/** webpack 公用配置 */
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  ...,
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
                  corejs: 3 /** 指定 core-js 版本 */,
                  useBuiltIns: 'usage' /** 根据配置的目标环境找出需要的polyfill进行部分引入 */,
                  targets: 'IE 11, last 2 versions, > 0.2%, not dead' /** 适配的运行环境 */,
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
  resolve: {
    alias: { '@': path.resolve(__dirname, '../src') },
    /** 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件 */
    /** 如果项目中只有 tsx 或 ts 可以将其写在最前面 */
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  },
}
```

### 2.3.4 项目启动或打包时生成 html 文件

- 此时执行 `yarn build` 后会生成 dist 目录, 可以看到打包后的 js 文件; 没有生成 html 文件;
- 可以使用 html-webpack-plugin 插件自动生成 html 文件

**安装**

```bash
yarn add -D html-webpack-plugin
```

**创建模板 html 文件**

_public/index.html_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-cli-webpack</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**修改 Webpack 配置**

```js
/** webpack 公用配置 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  ...,
  plugins: [
    /** 使用自定义模板 */
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../public/index.html') }),
  ],
}
```

### 2.3.5 配置 less (scss 同理)

- 1.使用 less-loader 将 less 编译为 css;
- 2.使用 postcss-loader 处理 css 文件;

**安装依赖**

```bash
yarn add -D css-loader postcss postcss-loader less less-loader postcss-preset-env mini-css-extract-plugin css-minimizer-webpack-plugin
```

**修改 Webpack 配置**

```js
/** webpack 公用配置 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  ...,
  module: {
    rules: [
      ...,
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
    ],
  },
  optimization: {
    ...,
    minimizer: [
      // `...`, // 在 webpack@5 中, 可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      new CssMinimizerPlugin({
        // parallel true:  // 多进程并发执行, 提升构建速度; 默认开启; 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
  },
  plugins: [
    ...,
    /** MiniCssExtractPlugin 会将 CSS 提取到单独的文件中, 为每个包含 CSS 的 JS 文件创建一个 CSS 文件, 并且支持 CSS 和 SourceMaps 的按需加载 */
    new MiniCssExtractPlugin({ filename: 'css/[hash:8].css' }),
  ],
}
```

### 2.3.6 图片配置

- 资源模块 (asset module) 是 Webpack 5 的一种模块类型, 它允许使用资源文件 (字体，图标等) 而无需配置额外的 loader;
- 详情参考: [Webpack 资源模块](https://webpack.docschina.org/guides/asset-modules/#root)
- asset/resource: 发送一个单独的文件并导出 URL; 之前通过使用 file-loader 实现;
- asset/inline: 导出一个资源的 data URI;之前通过使用 url-loader 实现;
- asset/source: 导出资源的源代码, 之前通过使用 raw-loader 实现;
- asset: 在导出一个 data URI 和发送一个单独的文件之间自动选择; 之前通过使用 url-loader, 并且配置资源体积限制实现;

**修改 Webpack 配置**

```js
/** webpack 公用配置 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  ...,
  module: {
    rules: [
      ...,
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
}
```

# 三 完结

后续可自行添加 eslint, prettier 配置
