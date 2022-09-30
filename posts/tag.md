---
title: tag
description: git中tag命令的一些用法
aside: false
date: 2022-9-29
tags:
  - git
---

# 删除远程仓库 tag

先删除本地 tag

```bash
git tag -d  tag名字
```

再删除远程 tag

```bash
git push origin :refs/tags/tag名字
```
