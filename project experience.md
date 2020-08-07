## 项目心得

### 一、项目搭建

#### 1. 解决 yarn 无法下载 node-sass

- 参考链接
  [https://www.jianshu.com/p/b37aa202da5c](https://www.jianshu.com/p/b37aa202da5c)

  1. 修改 yarn 的源为淘宝镜像 yarn config set registry https://registry.npm.taobao.org -g
  2. 查看当前的镜像地址 yarn config get registry
  3. 指定 node-sass 的全局下载地址为淘宝镜像的地址
     yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
  4. yarn add node-sass -D

#### 2. 修改 create-react-app 的默认配置

- 参考链接
  [https://github.com/timarney/react-app-rewired/blob/HEAD/README_zh.md](https://github.com/timarney/react-app-rewired/blob/HEAD/README_zh.md)
  [https://www.cnblogs.com/beyonds/p/11441914.html](https://www.cnblogs.com/beyonds/p/11441914.html)
  [https://blog.csdn.net/weixin_44245226/article/details/104470570](https://blog.csdn.net/weixin_44245226/article/details/104470570)

由于 `eject` 的不可控性太高，所以使用三方插件额外扩展配置是个不错的选择
`yarn add react-app-rewired customize-cra -D`
在根目录中新建`config-overrides.js`
修改 `package.json` 中的命令

```json
// package.json

{
  // ... 其他属性
  "scripts": {
    - "start": "react-scripts start",
    + "start": "react-app-rewired start",
    - "build": "react-scripts build",
    + "build": "react-app-rewired build",
    - "test": "react-scripts test",
    + "test": "react-app-rewired test",
  }
}
```

##### 1. 配置路径别名

```js
// config-overrides.js

const { override, addWebpackAlias, overrideDevServer } = require('customize-cra')
const path = require('path')

module.exports = {
  webpack: override(
    // 添加路径别名
    addWebpackAlias({
      //路径别名
      '@': path.resolve(__dirname, 'src'),
    }),
    (config) => {
      // webpack的config会暴露在这里，修改config后return即可覆盖
      console.log('webpack', config)

      return config
    }
  ),
  devServer: overrideDevServer((config) => {
    // devServer的config会暴露在这里，修改config后return即可覆盖
    // config上不存在的属性额外添加，不会生效，如open、port等
    /**
     * 原因猜测 2020.08.07 09:51
     * 1. 只能对暴露的属性进行覆盖，而open、port等并没有在devServer中配置（翻阅react-script的源码，发现这两个属性确实不在devServer中配置），所以在这里修改这些属性并不生效
     * 2. 因为这些属性在其他模块进行了配置，可能是这些模块的权限更高
     * 3. 我对devServer的认知还停留在webpack3，可能属性有变动，我的认知已经过时了
     * ...
     */
    console.log('devServer', config)

    return config
  }),
}
```

项目采用 typescript，所以还要修改`tsconfig.json`

- 参考链接
  [https://www.jianshu.com/p/ae67ab8574f7](https://www.jianshu.com/p/ae67ab8574f7)

```json
// tsconfig.json

{
  // ... 其他属性
  "compilerOptions": {
    // ... 其他属性
    "baseUrl": "src", // 基础路径
    "paths": {
      "@/*": ["*"] // 路径别名
    }
  }
}
```

但是每次 `yarn start` 运行项目，`tsconfig.json`中的`compilerOptions`会重写
所以让 ts 的配置外链到指定的文件

```json
// tsconfig.json

{
  // ... 其他属性
  "extends": "./path.json" // 在根节点中添加该属性（和compilerOptions平级）
}
```

在根目录中新建`path.json`，然后把路径别名的配置写到该文件

```json
// path.json

{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

```typescript
import faviconPng from '@/assets/favicon.png' // 开始在tsx文件中愉快的使用路径别名
```

##### 2. 关闭自动打开默认浏览器，修改端口号等（终极解决方案）

- 参考链接
  [https://www.html.cn/create-react-app/docs/advanced-configuration/](https://www.html.cn/create-react-app/docs/advanced-configuration/)

修改 `package.json` 中的命令

```json
// package.json

{
  // ... 其他属性
  "scripts": {
    "start:0": "set BROWSER=Chrome&&set PORT=3001&&react-scripts start",
    "start:1": "set BROWSER=none&&set PORT=3001&&react-app-rewired start"
  }
}
```

##### 3. rem 适配布局 webpack 相关配置

- 参考链接
  [https://www.cnblogs.com/beyonds/p/12988329.html](https://www.cnblogs.com/beyonds/p/12988329.html)
  [https://www.cnblogs.com/zhangnan35/p/12682925.html](https://www.cnblogs.com/zhangnan35/p/12682925.html)

`yarn add postcss-pxtorem react-app-rewire-postcss -D`
在`config-overrides.js`中对`postcss`进行重写

```js
// config-overrides.js

// ... 其他模块
const rewirePostcss = require('react-app-rewire-postcss')

module.exports = {
  // ... 其他配置
  webpack: override(
    // ... 其他配置
    (config) => {
      rewirePostcss(config, {
        plugins: () => [
          // ... 其他插件配置，直接从源码中复制即可
          require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: ['*'], // 不知道是啥，但是都写上了
            selectorBlackList: [/ignore/], // 设置忽略转换的类名，可以传入字符串或正则，字符串最终也会生成正则
            minPixelValue: 3, // 小于该值的不会被转换（等于的也会被转换）
            // mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false（好像并不生效）
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      })

      return config
    }
  ),
}
```
