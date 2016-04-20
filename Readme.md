# CDP Portal Html5

## 项目概述

1. 此项目为 CDP Portal 移动端版本。
2. 前端核心框架为 [React][1] + [Flux][2] + [ES6][3]，编译工具为 [Webpack][4]。学习框架请参照链接指向的官方或参考网站。
3. 项目起始架构时间为 2015/10/04，距今半年以上历史。鉴于前端技术的更新速度，项目架构在今天看起来已经相当古老。由于外包的时间、精力等限制，未根据时代变化作不断的重构或优化。恳请继任同胞再接再厉。

### 项目启动

安装依赖：

```
npm install
bower install
```

开发模式运行：

```
npm start
```

打包：

```
npm run build
```

注：Windows 环境下，需修改 `package.json` 中的相关命令为 `SET BABEL_ENV=production && webpack`

### 代码缺陷

#### 依赖的外部库已经过时

主要体现在：

* Babel 为 5.x 版本，官方已升级至 6.x，两者配置区别较大。但对项目本身无甚影响，不建议升级。
* Webpack 配置文件未遵循最佳实践，开发版本与发布版本未作区分与公共部分抽提。但对项目本身无甚影响，有兴趣可修改、优化。
* React 为 0.13.x 版本，官方已升级至 0.15.x。如欲升级，会导致较大改动，请参考官方升级指南：

    > https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html
    > https://facebook.github.io/react/blog/2016/04/07/react-v15.html
    
* [React Router][5] 版本为 1.0.x，官方已升级为 2.0.x，改动非常大。请参考链接中 1.0.x 的 API。
    
#### Flux 框架的不成熟

基于 React 单向数据流的实现有：

- Flux（官方）
- Reflux
- Redux：目前业内最成熟，社区最丰富，推荐使用

当然，尽管有代码利用效率低的问题，官方的 Store - Container 模式目前依然可用。

## 如何写一个 React 组件



  [1]: http://facebook.github.io/react/index.html
  [2]: https://facebook.github.io/flux/
  [3]: http://es6.ruanyifeng.com/
  [4]: https://webpack.github.io/
  [5]: https://github.com/reactjs/react-router/tree/1.0.x/docs
