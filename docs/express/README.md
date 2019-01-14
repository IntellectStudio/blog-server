# Express.js App

## 介绍
本项目使用Node.js + Express.js 搭建

## 安装与开发
1. 安装Node.js, 安装后执行`node -v`，如果成功显示版本号则安装成功
3. 安装yarn，安装后执行`yarn version`，如果成功显示版本号则安装成功
4. clone repo: `git clone https://github.com/IntellectStudio/blog-server.git`
5. 进入目标文件夹后执行`yarn`，该命令会自动安装所有dependencies
6. 执行yarn app:dev 启动express开发服务，访问`localhost:3000`
7. 执行yarn docs:dev 只启动vuepress开发服务，访问`localhost:3010`

## 如何编写博客
1. 在`$projectRoot/docs`文件夹下新建文件夹并新建md文件，或在已有文件夹内新建md文件
2. 文件夹内的README.md相当于该目录下默认博客
3. vuepress基于文件夹目录进行路由
4. 侧边栏配置在`$projectRoot/docs/.vuepress/config.js`, sidebar即为侧边栏的配置，根据已经配置的侧边栏自行配置
   或参见[文档](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar)
5. 除了基本的md语法之外，剩余的语法参见[文档](https://vuepress.vuejs.org/guide/markdown.html)

## 提交
通过新建分支，然后merge到主分支上提交pull request

## 路径
[文档](http://im.deuslux.org/docs/)

[日志](http://im.deuslux.org/logs)

[错误日志](http://im.deuslux.org/logs/error)

## 命令
````
yarn deploy         部署操作
yarn deploy:update  更新部署
yarn dev            启动express和vuepress开发服务器
yarn build          构建express和vuepress
yarn app:dev        启动express开发服务器
yarn app:build      构建express
yarn docs:dev       启动vuepress开发服务器
yarn docs:build     构建docs
````