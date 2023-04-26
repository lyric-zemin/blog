---
title: node-sass安装失败的原因及解决办法
description: node-sass安装失败的原因及解决办法
aside: false
date: 2023-4-26
tags:
  - other
---

# node-sass安装失败的原因及解决办法

## node-sass 安装失败的原因

npm 安装 node-sass 依赖时，会从 github.com 上下载 .node 文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。
这是使用 sass 的同学可能都会遇到的郁闷的问题。

解决方案就是使用其他源，或者使用工具下载，然后将安装源指定到本地。

## 解决方法一：使用淘宝镜像源（推荐）

设置变量 sass_binary_site，指向淘宝镜像地址。示例

```cmd
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

或者设置全局镜像源：

```cmd
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

之后再涉及到 node-sass 的安装时就会从淘宝镜像下载。

## 解决方法二：使用 cnpm

使用 cnpm 安装 node-sass 会默认从淘宝镜像源下载，也是一个办法：

```cmd
cnpm install node-sass
```

## 解决方法三：创建.npmrc文件

在项目根目录创建.npmrc文件，复制下面代码到该文件。

```cmd
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

## 解决方法四：下载 .node 到本地

[到这里](https://github.com/sass/node-sass/releases)去根据版本号、系统环境，选择下载 .node 文件，然后安装时，指定变量 sass_binary_path，如：

```cmd
npm i node-sass --sass_binary_path=/Users/lzwme/Downloads/darwin-x64-48_binding.node
```

安装失败后重新安装问题
之前安装失败，再安装就不去下载了，怎么办呢？那就先卸载再安装：

```cmd
npm uninstall node-sass
npm i node-sass --sass_binary_site=/mirrors/node-sass/
```

相关错误提示
提示没有安装python、build失败等，如：

```cmd
gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "C:\Users\zhuon\AppData\Local\Programs\Python\Python36\python.EXE", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (G:\Workspace\ManYan\manyan-nav\node_modules\node-gyp\lib\configure.js:483:19)
gyp ERR! stack     at PythonFinder.<anonymous> (G:\Workspace\ManYan\manyan-nav\node_modules\node-gyp\lib\configure.js:508:16)
gyp ERR! stack     at G:\Workspace\ManYan\manyan-nav\node_modules\graceful-fs\polyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:152:21)
gyp ERR! System Windows_NT 10.0.15063
gyp ERR! command "C:\\dev\\nodejs\\node.exe" "G:\\Workspace\\ManYan\\manyan-nav\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags="
"--libsass_library="
gyp ERR! cwd G:\Workspace\ManYan\manyan-nav\node_modules\node-sass
gyp ERR! node -v v8.4.0
gyp ERR! node-gyp -v v3.6.2
gyp ERR! not ok
Build failed
npm WARN co-mocha@1.2.0 requires a peer of mocha@>=1.18 <4 but none was installed.
npm WARN egg-restapi-module-tool@1.0.0 No repository field.
npm WARN egg-restapi-module-tool@1.0.0 scripts['server'] should probably be scripts['start'].

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-sass@3.8.0 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the node-sass@3.8.0 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:\nodejs\cache\_logs\2017-09-02T16_06_24_298Z-debug.log
```
