---
title: npm更换源地址
description: npm更换源地址
aside: false
date: 2023-4-26
tags:
  - other
---

# npm更换源地址

> 有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。<br>
> 以淘宝npm镜像举例：

### 临时使用

```cmd
npm --registry https://registry.npm.taobao.org i express
```

### 持久使用

```cmd
npm config set registry https://registry.npm.taobao.org
```

``` cmd
// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
```

:::tip
更灵活的方式是添加.npmrc配置文件
```
registry=https://registry.npm.taobao.org
```
:::
