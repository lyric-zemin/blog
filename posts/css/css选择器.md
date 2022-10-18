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
| :first-of-type | p:first-of-type | 选择作为其父的首个 `<p>` 元素的每个 `<p>` 元素。|
| :focus | input:focus | 选择获得焦点的 `<input>` 元素。|
| :hover | a:hover | 选择鼠标悬停其上的链接。|
| :in-range | input:in-range | 选择具有指定范围内的值的 `<input>` 元素。|
| :invalid | input:invalid | 选择所有具有无效值的 `<input>` 元素。|
| :lang(language) | p:lang(it) | 选择每个 lang 属性值以 "it" 开头的 `<p>` 元素。|
| :last-child | p:last-child | 选择作为其父的最后一个子元素的每个 `<p>` 元素。|
| :last-of-type | p:last-of-type | 选择作为其父的最后一个 `<p>` 元素的每个 `<p>` 元素。|
| :link | a:link | 选择所有未被访问的链接。|
| :not(selector) | :not(p) | 选择每个非 `<p>` 元素的元素。|
| :nth-child(n) | p:nth-child(2) | 选择作为其父的第二个子元素的每个 `<p>` 元素。|
| :nth-last-child(n) | p:nth-last-child(2) | 选择作为父的第二个子元素的每个 `<p>` 元素，从最后一个子元素计数。|
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 选择作为父的第二个`<p>`元素的每个 `<p>` 元素，从最后一个子元素计数
| :nth-of-type(n) | p:nth-of-type(2) | 选择作为其父的第二个 `<p>` 元素的每个 `<p>` 元素。|
| :only-of-type | p:only-of-type | 选择作为其父的唯一 `<p>` 元素的每个 `<p>` 元素。|
| :only-child | p:only-child | 选择作为其父的唯一子元素的 `<p>` 元素。|
| :optional | input:optional | 选择不带 "required" 属性的 `<input>` 元素。|
| :out-of-range | input:out-of-range | 选择值在指定范围之外的 `<input>` 元素。|
| :read-only | input:read-only | 选择指定了 "readonly" 属性的 `<input>` 元素。|
| :read-write | input:read-write | 选择不带 "readonly" 属性的 `<input>` 元素。|
| :required | input:required | 选择指定了 "required" 属性的 `<input>` 元素。|
| :root | root | 选择元素的根元素。|
| :target | #news:target | 选择当前活动的 #news 元素（单击包含该锚名称的 URL）。|
| :valid | input:valid | 选择所有具有有效值的 `<input>` 元素。|
| :visited | a:visited | 选择所有已访问的链接。|

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

### CSS [attribute~="value"] 选择器

> [attribute~="value"] 选择器选取属性值包含指定词的元素。下例选取 title 属性包含 "flower" 单词的所有元素

```css
[title~="flower"] {
  border: 5px solid yellow;
}
```

### CSS [attribute|="value"] 选择器

> [attribute|="value"] 选择器用于选取指定属性以指定值开头的元素。下例选取 class 属性以 "top" 开头的所有元素

:::tip
值必须是完整或单独的单词，比如 class="top" 或者后跟连字符的，比如 class="top-text"。
:::

```css
[class|="top"] {
  background: yellow;
}
```

### CSS [attribute^="value"] 选择器

> [attribute^="value"] 选择器用于选取指定属性以指定值开头的元素。下例选取 class 属性以 "top" 开头的所有元素

:::tip
值不必是完整单词！
:::

```css
[class^="top"] {
  background: yellow;
}
```

### CSS [attribute$="value"] 选择器

> [attribute$="value"] 选择器用于选取指定属性以指定值结尾的元素。下例选取 class 属性以 "test" 结尾的所有元素

:::tip
值不必是完整单词！
:::

```css
[class$="test"] {
  background: yellow;
}
```

### CSS [attribute*="value"] 选择器

> [attribute*="value"] 选择器选取属性值包含指定词的元素。下例选取 class 属性包含 "te" 的所有元素

:::tip
值不必是完整单词！
:::

```css
[class*="te"] {
  background: yellow;
}
```

## 相关链接

[W3school CSS 选择器](https://www.w3school.com.cn/css/css_selectors.asp)
