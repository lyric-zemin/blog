---
title: object属性遍历
description: object属性遍历相关方法
aside: false
date: 2022-12-5
tags:
  - javascript
---
# object属性遍历相关方法

## `for...in`

> 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

## `Object.keys(obj)`

> 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

## `Object.getOwnPropertyNames(obj)`

> 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

## `Object.getOwnPropertySymbols(obj)`

> 返回一个数组，只包含对象自身的所有 Symbol 属性的键名。

## `Reflect.ownKeys(obj)`

> 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

:::tip 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。
:::

## 判断某个属性是否为自身属性

. `obj.hasOwnProperty(key)`

. `Object.hasOwn(obj, key)`

:::info
对象的属性分成两种：自身的属性和继承的属性
:::

:::tip
`hasOwnProperty`方法继承自Object实例，对于不继承Object.prototype的对象会报错
:::
