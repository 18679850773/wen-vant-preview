# bs-vue-seed vue组件开发模板

vue自定义组件开发模板：

* 使用 webpack 构建 js

## 使用

### 用Seed创建一个新项目

1. clone seed项目

```
git clone -o boilerplate http://git.bingsheng.tech/phoenix/bs-vue-seed bs\-vue\-xxx (使用命令行时：项目名如果包含'-'则需要转义'\-'，其中xxx表示组件的名称)
git remote rm boilerplate
cd bs-vue-xxx
git remote add origin http://git.bingsheng.tech/phoenix/bs-vue-xxx.git
git push origin master
```

2. 修改 `package.json` 里的 `name` 和`version`为自己的组件名称和version


* 从 (http://git.bingsheng.tech/phoenix/bs-vue-seed) clone下来进行初始化. 注意：bs-vue-seed的remote名称 `origin` 已更名为 `boilerplate`

### 更新： 从boilerplate更新项目

```sh
git remote add boilerplate http://git.bingsheng.tech/phoenix/bs-vue-seed.git
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
npm init   // 安装 根目录及example目录下所需的依赖
```

2. 执行命令：

```
npm start  // start watch & serve example
```

> ps: 执行`npm run dev`不会监听src目录下文件的变化，只会拷贝到example/components/[PROJECT_NAME]/目录下。而执行`npm start`则会监听并在发生变动时并进行拷贝&打开浏览器预览。
example 目录是一个Vue项目目录，查看自定义组件被使用的效果并可进行多个demo实例演示。


## 目录结构

以下为推荐使用的目录结构，如果有必要开发者也可以自行做一些调整:

```
|--example // 开发环境构建目录 发布至example/components/[PROJECT_NAME]目录
|   
|--dist // 生产环境构建目录
|--src // 源码
|   |-- helloWorld.vue // 自定义组件
|   |-- index.js // 入口文件
|   |-- main.js // 暂时无用
|
|--build // 构建相关代码|
|   |--webpack.config.[env].js // 构建相关配置文件
|
```

> PS：  
1.对外暴露的 js 模块/自定义组件请放在 src 目录下，不宜放置在过深的目录。  


## 发布


1. 如果还没有 npm 帐号，可以到[ npm 官网](https://www.npmjs.com/)注册一个 npm 帐号。  
2. 在本地登录 npm 帐号，在本地执行： (已登录忽略此步骤)

```
npm adduser
```

或者

```
npm login
```

3. 在已完成编写的 npm 包根目录下执行：

```
npm run dist  // 构建

npm publish   // 发布
```

或者

```

npm run release   // 构建 + 发布

```

到此，npm 包就成功发布到 npm 平台了。

> PS：一些开发者在开发过程中可能修改过 npm 的源，所以当进行登录或发布时需要注意要将源切回 npm 的源。
