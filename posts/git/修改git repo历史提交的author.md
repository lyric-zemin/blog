---
title: 修改git repo历史提交的author
description: 修改git repo历史提交的author
aside: false
date: 2023-4-26
tags:
  - git
---

# 修改git repo历史提交的author

## 操作步骤

使用 `git rebase -i HEAD~n` 命令，表示要修改前 n 次所有的提交。
这里的示例工程，author 信息最早开始出错的那次提交出现在 HEAD~3 节点之后，因此这里的 n 为 3，所以使用 `git rebase -i HEAD~3`。`-i` 中的 i 是 interactive，交互的意思。

输入此命令后，显示以下结果：

```cmd
pick ac0fcc6 add file2
pick a0cbfbe add file3
pick 16ee6eb add file4

# Rebase d57f11f..16ee6eb onto d57f11f (3 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
```

我们要修改第二行和第三行的提交，根据提示，因此把第二行和第三行的 pick 改成 edit 或 e，保存退出。

保存上面的修改并退出后，git 会依次执行上面的操作，当操作为 pick 时，直接 commit。当操作为 edit 时，会中断，并提示以下信息：

```cmd
You can amend the commit now, with

    git commit --amend 

Once you are satisfied with your changes, run

    git rebase --continue
   
 ```

这里的意思是说，你可以使用 `git commit --amend` 来修改此次提交，修改以后，觉得满意了，执行 `git rebase --continue` 继续剩下的流程。

由于我们的主要目的是修改提交者的信息，因此光用 `git commit --amend` 是不够的，我们要使用 `git commit --amend --author "name <yx@gmail.com>"` 这样的操作，这一点是修改提交者信息的关键所在。

使用上面的命令成功修改此次提交的提交者信息后，一定要记得执行 `git rebase --continue` 继续。

最终完成以后提示如下：

```cmd
$ git rebase --continue
Successfully rebased and updated refs/heads/master.
```
