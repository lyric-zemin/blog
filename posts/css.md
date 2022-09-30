---
title: css
# description: javascript中bind的一些用法
aside: false
date: 2022-9-29
tags:
  - css
---

## css 控制文字显示 2 行

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

## css 修改 input 占位符样式

```css
input::placeholder {
  color: "red";
}
/* 谷歌浏览器 */
input::-webkit-input-placeholder {
  color: "red";
}
```
