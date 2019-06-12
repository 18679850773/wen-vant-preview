# bs-ui-seed 小程序ui组件开发模板

小程序自定义组件开发模板：

* 使用 webpack 构建 js
* 支持自定义组件单元测试
* 支持 eslint

## 使用

### 用Seed创建一个新项目

1. clone seed项目

```
git clone -o boilerplate http://git.bingsheng.tech/phoenix/bs-ui-seed bs\-ui\-xxx (使用命令行时：项目名如果包含'-'则需要转义'\-'，其中xxx表示组件的名称)
git remote rm boilerplate
cd bs-ui-xxx
git remote add origin http://git.bingsheng.tech/phoenix/bs-ui-xxx.git
git push origin master
```

2. 修改 `package.json` 里的 `name` 和`version`为自己的组件名称和version

3. 修改 `example/project.config.json` 里的 `projectname` 为自己组件的名称


* 从 (http://git.bingsheng.tech/phoenix/bs-ui-seed) clone下来进行初始化. 注意：bs-ui-seed的remote名称 `origin` 已更名为 `boilerplate`

### 更新： 从boilerplate更新项目

```sh
git remote add boilerplate http://git.bingsheng.tech/phoenix/bs-ui-seed.git
git fetch boilerplate --no-tags
git merge --squash --no-commit boilerplate/master
# Remove boilerplate remote to avoid interacting with it on the repo graph
git remote rm boilerplate
# ... Review and choose changes to include, reset everything else
git commit
```

!!!请注意
    请在更新合并完成后删除名为 `boilerplate` 的远程连接。

## 开发

1. 安装依赖：

```
npm install
```

2. 执行命令：

```
npm start
```

> ps: 执行`npm run dev`不会监听src目录下文件的变化，只会拷贝到example/miniprogram_npm/[PROJECT_NAME]/目录下。而执行`npm start`则会监听并在发生变动时并进行拷贝。

3. example 目录是一个小程序项目目录，以此目录作为小程序项目目录在开发者工具中打开即可查看自定义组件被使用的效果并可进行多个demo实例演示。
**注意:example下的app.json会根据app.template.json自动生成，如需修改app.json则需修改app.tempalte.json(eg:引用子组件)**



## 目录结构

以下为推荐使用的目录结构，如果有必要开发者也可以自行做一些调整:

```
|--example // 开发环境构建目录 发布至example/miniprogram_npm/[PROJECT_NAME]目录
|   |--utils
|       |--bsPage.js // base page
|--dist // 生产环境构建目录
|--src // 源码
|   |--components // 通用自定义组件
|   |--images // 图片资源
|   |--defaultBhv.js // 默认的behavior 方便继承调用
|   |
|   |--xxx.js/xxx.wxml/xxx.json/xxx.wxss // 暴露的 js 模块/自定义组件入口文件
|   |--main.js // 暂时无用
|
|--test // 测试用例
|--build // 构建相关代码|
|   |--webpack.config.[env].js // 构建相关配置文件
|
```

> PS：  
1.对外暴露的 js 模块/自定义组件请放在 src 目录下，不宜放置在过深的目录。  
3.`defaultBhv.js` 为可选项，为方便页面或组件调用而准备的behavior, **名字目前不要改动**。  
4.`defaultBhv.js` 需要export两个属性`pageBhv`, `compBhv`来分别供page和component来使用


## 测试

* 执行测试用例：

```
npm run test
```

* 检测覆盖率：

```
npm run coverage
```

测试用例放在 test 目录下，使用 **miniprogram-simulate** 工具集进行测试，[点击此处查看](https://github.com/wechat-miniprogram/miniprogram-simulate/blob/master/README.md)使用方法。在测试中可能需要变更或调整工具集中的一些方法，可在 test/utils 下自行实现。


## 发布

> ps: 发布前得确保已经执行构建，小程序 npm 包只有构建出来的目录是真正被使用到的。

1. 如果还没有 npm 帐号，可以到[ npm 官网](https://www.npmjs.com/)注册一个 npm 帐号。
2. 在本地登录 npm 帐号，在本地执行：

```
npm adduser
```

或者

```
npm login
```

3. 在已完成编写的 npm 包根目录下执行：

```
npm publish
```

到此，npm 包就成功发布到 npm 平台了。

> PS：一些开发者在开发过程中可能修改过 npm 的源，所以当进行登录或发布时需要注意要将源切回 npm 的源。
