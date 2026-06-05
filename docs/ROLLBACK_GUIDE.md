# Rollback Guide

> 本文档是 historical / operational reference，用于人工回滚、备份、操作参考。

> 它不是当前机制正本，不是版本流水正本，不决定当前项目状态。

> 当前版本 / commit / tag / candidate 状态以 git ref / tag 和 `docs/VERSION_LOG.md` 为准。本文件中的旧 tag、旧路径、旧备份方式如果存在，只作为历史操作参考。

> 执行任何回滚前，必须先确认当前 git 状态和用户明确指令。如果本文与 `docs/DOCS_SOURCE_OF_TRUTH.md` 冲突，以 `docs/DOCS_SOURCE_OF_TRUTH.md` 为准。

本文档记录《奶茶实验室》的回滚与保险做法，避免实验性修改破坏稳定版本。

## 1. 稳定点规则

每个稳定候选版本应尽量同时具备：

- git commit
- git tag
- 本地完整备份文件夹
- 可选 zip 备份
- 版本日志记录

当前已使用过的 tag 格式：

```text
v0.0.4.0-candidate
v0.0.4.1-candidate
```

## 2. 查看当前状态

修改前先确认工作区是否干净：

```bash
git status
```

查看近期提交：

```bash
git log --oneline --decorate -n 10
```

查看 tag：

```bash
git tag --list
```

## 3. 回到稳定版本查看

如果只想查看某个稳定版本，不要立刻覆盖当前工作。

可以使用：

```bash
git switch --detach v0.0.4.1-candidate
```

查看完成后回到主分支：

```bash
git switch main
```

## 4. 从本地备份恢复

本地备份一般放在：

```text
/Users/yui/Documents/vibecoding/
```

示例：

```text
奶茶实验室_backup_v0.0.4.0_candidate
奶茶实验室_backup_v0.0.4.1_candidate
```

如果需要从备份恢复，建议先复制备份为一个新文件夹测试，不要直接覆盖当前项目。

## 5. 不建议随手使用的命令

除非明确知道后果，不要随手执行：

```bash
git reset --hard
git clean -fd
git checkout -- .
```

这些命令可能会丢失未提交修改。

## 6. 线上回滚方向

如果 GitHub Pages 上线版本出问题，推荐做法是：

1. 找到上一个稳定 tag。
2. 在本地确认该版本能运行。
3. 从稳定 tag 创建修复提交或回滚提交。
4. 推送到 GitHub。
5. 等 GitHub Pages 重新部署。

不要直接在网页后台乱改部署内容。

## 7. 当前项目迁移位置

当前主项目位置：

```text
/Users/yui/Documents/vibecoding/奶茶实验室
```

历史位置：

```text
/Users/yui/Documents/奶茶实验室
```

本轮已将项目和明确相关备份移动到 `Documents/vibecoding/`，便于和其他 vibe coding 项目集中管理。

## 8. 回滚前检查

任何回滚前至少确认：

- 当前有没有未提交修改
- 要回滚的是功能代码、文档还是资源
- 是否有本地备份
- 是否会影响已推送的 GitHub 版本
- 是否需要先导出当前状态作为临时备份
