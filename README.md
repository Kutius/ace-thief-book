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
- Alt+Shift+/Ctrl+M: 切换状态栏显示模式

## 🛠️ 配置项

```json
{
  "ace-thief-book.filePath": "文本文件路径",
  "ace-thief-book.currentPage": "当前页码",
  "ace-thief-book.isAutoTurn": "是否开启自动翻页",
  "ace-thief-book.autoTurnInterval": "自动翻页间隔(ms)"
}
```

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## 📝 许可证

MIT

## 🌟 致谢

- [Reactive VS Code](https://kermanx.github.io/reactive-vscode/)

---
🎯 平平无奇的摸鱼，才是最好的摸鱼