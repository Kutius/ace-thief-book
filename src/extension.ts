import { useIntervalFn } from '@reactive-vscode/vueuse'
import {
  computed,
  defineExtension,
  ref,
  useCommands,
  useIsDarkTheme,
  useStatusBarItem,
  watchEffect,
} from 'reactive-vscode'
import { StatusBarAlignment, window } from 'vscode'
import { config } from './configs'
import { showFilePicker } from './core/filePicker'
import { useBookReader } from './core/reader'
import { useController } from './core/webview'
import { commands as commandsMeta } from './generated/meta'
import { logger } from './utils'

export = defineExtension(() => {
  logger.info('Extension Activated')

  const isShowText = ref(false)
  const isAutoTurn = ref(false)

  // 搜索结果状态
  interface SearchResult {
    page: number
    content: string
  }
  let searchResults: SearchResult[] = []
  let currentResultIndex = 0

  const isDark = useIsDarkTheme()

  const {
    text,
    ready,
    progress,
    nextPage,
    prevPage,
    gotoPage,
    reload,
    reader,
  } = useBookReader()

  const formattedText = computed(() => text.value ? `${text.value} | ${progress.value}` : '')

  useStatusBarItem({
    alignment: StatusBarAlignment.Left,
    priority: 10,
    tooltip: () => config.currentPage.toString(),
    text: () => isShowText.value ? formattedText.value : '📑',
    color: () => (isDark.value ? config.darkColor : config.lightColor),
    command: () => isShowText.value ? commandsMeta.nextPage : commandsMeta.toggleStatusbar,
  }).show()

  // 自动翻页
  const { pause, resume } = useIntervalFn(() => nextPage(), config.autoTurnInterval, { immediate: false })

  watchEffect(() => {
    if (ready.value) {
      if (isAutoTurn.value) {
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
      isAutoTurn.value = false
    },
    [commandsMeta.prevPage]: () => {
      prevPage()
      isAutoTurn.value = false
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
      if (isShowText.value) {
        // pause()
        isAutoTurn.value = false
      }
      isShowText.value = !isShowText.value
    },
    [commandsMeta.autoTurn]: () => {
      isAutoTurn.value = !isAutoTurn.value
    },
    [commandsMeta.reload]: reload,
    [commandsMeta.searchText]: async () => {
      const keyword = await window.showInputBox({
        prompt: '请输入搜索关键字',
        placeHolder: '请输入要搜索的内容',
      })
      if (!keyword)
        return

      const matches = await reader.value?.searchText(keyword)
      if (!matches?.length) {
        window.showInformationMessage(`未找到包含"${keyword}"的页面`)
        return
      }

      // 保存搜索结果并跳转到第一个匹配结果
      searchResults = matches.map(page => ({ page, content: keyword }))
      currentResultIndex = 0
      gotoPage(searchResults[0].page)

      if (matches.length > 1) {
        window.showInformationMessage(
          `找到${matches.length}个结果，使用"alt+shift+8"查看下一个结果。`,
        )
      }
    },
    [commandsMeta.nextSearchResult]: () => {
      if (!searchResults.length) {
        window.showInformationMessage('没有可用的搜索结果')
        return
      }

      currentResultIndex = (currentResultIndex + 1) % searchResults.length
      gotoPage(searchResults[currentResultIndex].page)
      window.showInformationMessage(
        `跳转到第${currentResultIndex + 1}/${searchResults.length}个结果`,
      )
    },
  })

  useController({
    onUp: prevPage,
    onDown: nextPage,
  })
})
