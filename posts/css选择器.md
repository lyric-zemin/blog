---
title: css选择器
description: css选择器
aside: false
date: 2022-10-10
tags:
  - css
---

# css选择器

## 简单选择器（根据名称、id、类来选取元素）

```css
p {}

#id {}

.class {}
```

## 组合器选择器（根据它们之间的特定关系来选取元素）

### 后代选择器

> 后代选择器匹配属于指定元素后代的所有元素。下面的例子选择 `<div>` 元素内的所有 `<p>` 元素

```css
div p {
  background-color: yellow;
}
```

### 子选择器

> 子选择器匹配属于指定元素子元素的所有元素。下面的例子选择属于 `<div>` 元素子元素的所有 `<p>` 元素

```css
div > p {
  background-color: yellow;
}
```

### 相邻兄弟选择器

> 相邻兄弟选择器匹配所有作为指定元素的相邻同级的元素。兄弟（同级）元素必须具有相同的父元素，“相邻”的意思是“紧随其后”。下面的例子选择紧随 `<div>` 元素之后的所有 `<p>` 元素

```css
div + p {
  background-color: yellow;
}
```

### 通用兄弟选择器

> 通用兄弟选择器匹配属于指定元素的同级元素的所有元素。下面的例子选择属于 `<div>` 元素的同级元素的所有 `<p>` 元素

```css
div ~ p {
  background-color: yellow;
}
```

## 伪类选择器（根据特定状态选取元素）

|  选择器 | 例子 | 例子描述|
| ------ | ---- | ---- |
| :active | a:active | 选择活动的链接。|
| :checked | input:checked | 选择每个被选中的 `<input>` 元素。|
| :disabled | input:disabled | 选择每个被禁用的 `<input>` 元素。|
| :empty | p:empty | 选择没有子元素的每个 `<p>` 元素。|
| :enabled | input:enabled | 选择每个已启用的 `<input>` 元素。|
| :first-child | p:first-child | 选择作为其父的首个子元素的每个 `<p>` 元素。|

## 伪元素选择器（选取元素的一部分并设置其样式）

|  选择器 | 例子 | 例子描述|
| ------ | ---- | ---- |
| ::after | p::after | 在每个 `<p>` 元素之后插入内容。|
| ::before | p::before | 在每个 `<p>` 元素之前插入内容。|
| ::first-letter | p::first-letter | 选择每个 `<p>` 元素的首字母。|
| ::first-line | p::first-line | 选择每个 `<p>` 元素的首行。|
| ::selection | p::selection | 选择用户选择的元素部分。|

## 属性选择器（根据属性或属性值来选取元素）

### CSS [attribute] 选择器

> [attribute] 选择器用于选取带有指定属性的元素。下例选择所有带有 target 属性的 `<a>` 元素

``` css
a[target] {
  background-color: yellow;
}
```

### CSS [attribute="value"] 选择器

> [attribute="value"] 选择器用于选取带有指定属性和值的元素。下例选取所有带有 target="_blank" 属性的 `<a>` 元素

```css
a[target="_blank"] { 
  background-color: yellow;
}
```
