---
title: bind
description: javascript中bind的一些用法
aside: false
date: 2022-9-25
tags:
  - javascript
---

## 绑定 this

> 只能绑定一次 this，并返回一个新函数

```js
const fun = function () {};

const fun2 = fun.bind(someThis);
```

## 绑定参数

> 可以一次绑定多个参数，并返回一个新函数

```js
const fun = function () {};

const fun2 = fun.bind(null, arg1, arg2);

const fun3 = fun2.bind(null, arg3, arg4);

console.log(fun3.length === 4);
```
