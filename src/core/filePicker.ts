import os from 'node:os'
import path from 'node:path'
import { Uri, window } from 'vscode'
import { setConfig } from '../configs'

const defaultPath = path.join(os.homedir(), 'Downloads')

export async function showFilePicker() {
  const fileUris = await window.showOpenDialog({
    defaultUri: Uri.file(defaultPath),
    canSelectMany: false,
    title: '选择文本文件',
    openLabel: '选择文件',
    filters: {
      TXT文件: ['txt'],
    },
  })

  if (!fileUris?.length) {
    return
  }

  setConfig('filePath', fileUris[0].fsPath)

  return fileUris[0].fsPath
}
