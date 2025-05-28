import fs from 'node:fs/promises'
import path from 'node:path'

import { computed, ref, shallowRef, watchEffect } from 'reactive-vscode'
import { config, isBookOk, setConfig } from '../configs'
import { logger } from '../utils'

const PAGE_SIZE = 35

export function useBookReader() {
  const text = ref('')
  const ready = ref(false)
  const currentPage = computed({
    get: () => config.currentPage,
    set: value => setConfig('currentPage', value),
  })

  const bookReader = shallowRef<BookReader | null>(null)

  const totalPages = computed(() => bookReader.value?.getTotalPages() || 0)
  const progress = computed(() => {
    if (!bookReader.value) {
      return 0
    }
    if (config.progressDisplayMode === 'page') {
      return `${currentPage.value}/${totalPages.value}`
    }
    else {
      return `${Math.floor((currentPage.value / totalPages.value) * 100)}%`
    }
  })

  function loadBook() {
    if (!isBookOk.value)
      return

    bookReader.value = new BookReader(config.filePath, PAGE_SIZE)
    ready.value = true

    logger.info('Loading book:', config.filePath)
  }

  watchEffect(async (onCleanup) => {
    loadBook()

    onCleanup(() => {
      bookReader.value = null
      ready.value = false
      text.value = ''
    })
  })

  watchEffect(() => {
    if (ready.value) {
      readPage(currentPage.value)
    }
  })

  async function readPage(page: number) {
    if (!bookReader.value)
      return

    logger.info('Reading page:', page)

    const content = await bookReader.value.getPage(page)
    text.value = content.replace(/\n/g, ' ').trim()
  }

  const nextPage = () => {
    if (!bookReader.value || currentPage.value >= totalPages.value) {
      return
    }
    // readPage(currentPage.value + 1)
    currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value <= 1) {
      return
    }
    // readPage(currentPage.value - 1)
    currentPage.value--
  }

  const gotoPage = async (page: number) => {
    if (!bookReader.value || page < 1 || page > totalPages.value) {
      return
    }
    currentPage.value = page
  }

  return {
    text,
    ready,
    progress,
    readPage,
    nextPage,
    prevPage,
    gotoPage,
    reload: loadBook,
    reader: bookReader,
  }
}

class BookReader {
  private filePath: string
  private pageSize: number
  private fileContent: string | null = null

  constructor(filePath: string, pageSize: number) {
    this.filePath = path.resolve(filePath)
    this.pageSize = pageSize
  }

  // 读取文件内容
  private async readFileContent(): Promise<string> {
    if (this.fileContent === null) {
      try {
        this.fileContent = await fs.readFile(this.filePath, 'utf-8')
      }
      catch (error) {
        console.error('Error reading file:', error)
        throw error
      }
    }
    return this.fileContent
  }

  // 获取指定页的内容
  async getPage(pageNumber: number): Promise<string> {
    const content = await this.readFileContent()
    const startIndex = (pageNumber - 1) * this.pageSize

    if (startIndex >= content.length) {
      return ''
    }

    let endIndex = startIndex + this.pageSize
    // 确保不截断字符
    while (endIndex < content.length && /[\p{Extended_Pictographic}\p{Unified_Ideograph}]/u.test(content[endIndex])) {
      endIndex++
    }

    const pageContent = content.slice(startIndex, endIndex)
    return pageContent
  }

  // 获取前一页的内容
  async getPreviousPage(currentPage: number): Promise<string> {
    if (currentPage <= 1) {
      return ''
    }
    return this.getPage(currentPage - 1)
  }

  // 获取后一页的内容
  async getNextPage(currentPage: number): Promise<string> {
    return this.getPage(currentPage + 1)
  }

  getTotalPages() {
    if (!this.fileContent) {
      return 0
    }
    return Math.ceil(this.fileContent!.length / this.pageSize)
  }

  // 搜索文本并返回匹配的页码数组
  async searchText(keyword: string): Promise<number[]> {
    const content = await this.readFileContent()
    const matches: number[] = []
    let pos = 0
    let foundPos = content.indexOf(keyword, pos)

    while (foundPos !== -1) {
      const page = Math.floor(foundPos / this.pageSize) + 1
      if (!matches.includes(page)) {
        matches.push(page)
      }
      pos = foundPos + keyword.length
      foundPos = content.indexOf(keyword, pos)
    }

    return matches
  }
}
