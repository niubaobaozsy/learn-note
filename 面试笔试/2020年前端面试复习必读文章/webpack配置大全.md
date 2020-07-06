# webpack配置大全

## gzip

用的: `compressionWebpackPlugin`

```js
new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
```

# Gulp/Grunt、Rollup 和 webpack 的比较

## Gulp/Grunt

其实，Gulp/Gunt 和 webpack 应该是没有可比性的，但是他们都可以称为前端自动化构建工具（让我们不再做机械重复的事情，解放我们的双手）

但是 Gulp/Gunt 和 webpack 确实干的不是一件事

**Gulp 本质是 task runner，Webpack 是 module bundler**

我认为 Gulp 正如他的定义一样：**基于流的自动化构建工具**，定义每一个任务，然后自动将一个个任务执行。

而 webpack 是模块化地组织，模块化地依赖，然后模块化地打包。相对来上，场景局限在前端模块化打包上。

## 常见的 plugin

摘自：http://www.css88.com/doc/webpack/plugins/

| Name                          | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| AggressiveSplittingPlugin     | 将原来的 chunk 分成更小的 chunk                            |
| BabiliWebpackPlugin           | 基于 Babel 的裁剪工具：Babili                              |
| BannerPlugin                  | 在每个生成的 chunk 顶部添加 banner                         |
| CommonsChunkPlugin            | 提取 chunks 之间共享的通用模块                             |
| ComponentWebpackPlugin        | 通过 webpack 使用组件                                      |
| CompressionWebpackPlugin      | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务 |
| ContextReplacementPlugin      | 重写 require 表达式的推断上下文                            |
| DefinePlugin                  | 允许在编译时(compile time)配置的全局常量                   |
| DllPlugin                     | 为了极大减少构建时间，进行分离打包                         |
| EnvironmentPlugin             | DefinePlugin 中 process.env 键的简写方式。                 |
| ExtractTextWebpackPlugin      | 从 bundle 中提取文本（CSS）到单独的文件                    |
| HotModuleReplacementPlugin    | 启用模块热替换(Enable Hot Module Replacement - HMR)        |
| HtmlWebpackPlugin             | 简单创建 HTML 文件，用于服务器访问                         |
| I18nWebpackPlugin             | 为 bundle 增加国际化支持                                   |
| IgnorePlugin                  | 从 bundle 中排除某些模块                                   |
| LimitChunkCountPlugin         | 设置 chunk 的最小/最大限制，以微调和控制 chunk             |
| LoaderOptionsPlugin           | 用于从 webpack 1 迁移到 webpack 2                          |
| MinChunkSizePlugin            | 确保 chunk 大小超过指定限制                                |
| NoEmitOnErrorsPlugin          | 在输出阶段时，遇到编译错误跳过                             |
| NormalModuleReplacementPlugin | 替换与正则表达式匹配的资源                                 |
| NpmInstallWebpackPlugin       | 在开发时自动安装缺少的依赖                                 |
| ProvidePlugin                 | 不必通过 import/require 使用模块                           |
| SourceMapDevToolPlugin        | 对 source map 进行更细粒度的控制                           |
| UglifyjsWebpackPlugin         | 可以控制项目中 UglifyJS 的版本                             |
| ZopfliWebpackPlugin           | 通过 node-zopfli 将资源预先压缩的版本                      |

-----

## 压缩js css html 图片

1，去除多余重复的css，压缩成一行

 optimize-css-assets-webpack-plugin

html-webpack-plugin压缩html和js代码

 image-webpack-loader 压缩图片

## 为css文件添加hash值

```
 new ExtractTextPlugin({
     filename:`[name]_[contenthash:8].css`, //为输出的CSS文件加上Hash
 })
```

