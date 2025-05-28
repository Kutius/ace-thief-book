# Ace Thief Book

一个让你在 VS Code 状态栏上阅读文本文件的扩展。优雅地摸鱼，不留痕迹。

<img alt="Version" src="https://img.shields.io/visual-studio-marketplace/v/kutius.ace-thief-book">

## ✨ 特性

- 在 VS Code 状态栏显示文本内容
- 文字颜色更不起眼
- 支持分页阅读和自动翻页
- 可以隐藏文本内容，只显示一个📚图标
- 支持记忆阅读进度
- 完全键盘操作支持

## 🚀 开始使用

1. 在 VS Code 中安装 `Ace-Thief-Book`
2. 使用 Alt+Shift+5 选择要阅读的文本文件
3. 使用快捷键控制阅读进度
4. 需要隐藏时可以使用 Ctrl+M 切换显示模式

## ⌨️ 快捷键

- Alt+Shift+1: 下一页
- Alt+Shift+2: 上一页
- Alt+Shift+3: 跳转到指定页
- Alt+Shift+4: 开启/关闭自动翻页
- Alt+Shift+5: 选择文本文件
- Alt+Shift+7: 关键字搜索
- Alt+Shift+/Ctrl+M: 切换状态栏显示模式

## 📚 命令
<!-- commands -->

| Command                          | Title                    |
| -------------------------------- | ------------------------ |
| `ace-thief-book.showFilePicker`  | Ace Thief Book: 选择文本文件   |
| `ace-thief-book.nextPage`        | Ace Thief Book: 下一页      |
| `ace-thief-book.prevPage`        | Ace Thief Book: 上一页      |
| `ace-thief-book.gotoPage`        | Ace Thief Book: 跳转到指定页   |
| `ace-thief-book.toggleStatusbar` | Ace Thief Book: 显示/隐藏状态栏 |
| `ace-thief-book.autoTurn`        | Ace Thief Book: 自动翻页     |
| `ace-thief-book.reload`          | Ace Thief Book: 重新加载     |
| `ace-thief-book.searchText`      | Ace Thief Book: 关键字搜索    |

<!-- commands -->

## 🛠️ 配置项
<!-- configs -->

| Key                                  | Description                | Type      | Default  |
| ------------------------------------ | -------------------------- | --------- | -------- |
| `ace-thief-book.filePath`            | 文本文件路径                     | `string`  | `""`     |
| `ace-thief-book.currentPage`         | 当前页码                       | `number`  | `1`      |
| `ace-thief-book.autoTurnInterval`    | 自动翻页间隔                     | `number`  | `2500`   |
| `ace-thief-book.lightColor`          | 亮色文字颜色                     | `string`  | `"#ccc"` |
| `ace-thief-book.darkColor`           | 暗色文字颜色                     | `string`  | `"#333"` |
| `ace-thief-book.progressDisplayMode` | 进度显示方式: 百分比或页码             | `string`  | `"page"` |
| `ace-thief-book.webview.enabled`     | 启用/禁用 Ace Thief Book 阅读器面板 | `boolean` | `true`   |

<!-- configs -->

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生成 meta 数据并更新 readme
pnpm run update

# 构建
pnpm build
```

## TODO

- [x] 隐藏时暂停自动翻页
- [x] 手动翻页时暂停自动翻页
- [ ] 支持更多文件格式
- [ ] 支持自定义主题

## 📝 许可证

MIT

## 🌟 致谢

- [Reactive VS Code](https://kermanx.github.io/reactive-vscode/)

---
🎯 平平无奇的摸鱼，才是最好的摸鱼