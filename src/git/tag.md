# 删除远程仓库tag

先删除本地tag

```bash
git tag -d  tag名字
```

再删除远程tag

```bash
git push origin :refs/tags/tag名字
```
