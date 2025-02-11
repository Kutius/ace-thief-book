import { useIntervalFn } from '@reactive-vscode/vueuse'
import { computed, defineExtension, ref, useCommands, useIsDarkTheme, useStatusBarItem, watchEffect } from 'reactive-vscode'
import { StatusBarAlignment, window } from 'vscode'
import { config, setConfig } from './configs'
import { showFilePicker } from './core/filePicker'
import { useBookReader } from './core/reader'
import { commands as commandsMeta } from './generated-meta'
import { logger } from './utils'

export = defineExtension(() => {
  logger.info('Extension Activated')

  const showStatusText = ref(true)

  const {
    text,
    ready,
    progress,
    nextPage,
    prevPage,
    gotoPage,
    reload,
  } = useBookReader()

  const formattedText = computed(() => text.value ? `${text.value} | ${progress.value}%` : '')

  const isDark = useIsDarkTheme()

  useStatusBarItem({
    alignment: StatusBarAlignment.Left,
    priority: 50,
    text: () => showStatusText.value ? formattedText.value : '📚',
    color: () => (isDark.value ? '#333' : '#ccc'),
    command: commandsMeta.nextPage,
  }).show()

  // 自动翻页
  const { pause, resume } = useIntervalFn(() => nextPage(), config.autoTurnInterval, { immediate: false })

  watchEffect(() => {
    if (ready.value) {
      if (config.isAutoTurn) {
        logger.info('🌳启用自动翻页')
        resume()
      }
      else {
        logger.info('🌳停用自动翻页')
        pause()
      }
    }
  })

  useCommands({
    [commandsMeta.nextPage]: () => {
      nextPage()
      pause()
    },
    [commandsMeta.prevPage]: () => {
      prevPage()
      pause()
    },
    [commandsMeta.gotoPage]: async () => {
      const page = await window.showInputBox({
        prompt: '请输入页码',
        placeHolder: '请输入页码',
      })
      if (!page || Number.isNaN(+page) || +page < 1) {
        window.showErrorMessage('请输入正确的页码')
        return
      }
      gotoPage(+page)
    },
    [commandsMeta.showFilePicker]: showFilePicker,
    [commandsMeta.toggleStatusbar]: () => {
      if (ready.value) {
        if (showStatusText.value) {
          pause()
        }
        else if (config.isAutoTurn) {
          resume()
        }
      }
      showStatusText.value = !showStatusText.value
    },
    [commandsMeta.autoTurn]: () => {
      setConfig('isAutoTurn', !config.isAutoTurn)
    },
    [commandsMeta.reload]: reload,
  })
})
