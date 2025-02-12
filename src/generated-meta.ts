// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "kutius"
export const name = "ace-thief-book"
export const version = "0.2.0"
export const displayName = "ace-thief-book"
export const description = undefined
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey = 
  | "ace-thief-book.showFilePicker"
  | "ace-thief-book.nextPage"
  | "ace-thief-book.prevPage"
  | "ace-thief-book.gotoPage"
  | "ace-thief-book.toggleStatusbar"
  | "ace-thief-book.autoTurn"
  | "ace-thief-book.reload"

/**
 * Commands map registed by `kutius.ace-thief-book`
 */
export const commands = {
  /**
   * 选择文本文件
   * @value `ace-thief-book.showFilePicker`
   */
  showFilePicker: "ace-thief-book.showFilePicker",
  /**
   * 下一页
   * @value `ace-thief-book.nextPage`
   */
  nextPage: "ace-thief-book.nextPage",
  /**
   * 上一页
   * @value `ace-thief-book.prevPage`
   */
  prevPage: "ace-thief-book.prevPage",
  /**
   * 跳转到指定页
   * @value `ace-thief-book.gotoPage`
   */
  gotoPage: "ace-thief-book.gotoPage",
  /**
   * 显示/隐藏状态栏
   * @value `ace-thief-book.toggleStatusbar`
   */
  toggleStatusbar: "ace-thief-book.toggleStatusbar",
  /**
   * 自动翻页
   * @value `ace-thief-book.autoTurn`
   */
  autoTurn: "ace-thief-book.autoTurn",
  /**
   * 重新加载
   * @value `ace-thief-book.reload`
   */
  reload: "ace-thief-book.reload",
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey = 
  | "ace-thief-book.filePath"
  | "ace-thief-book.currentPage"
  | "ace-thief-book.autoTurnInterval"
  | "ace-thief-book.lightColor"
  | "ace-thief-book.darkColor"

export interface ConfigKeyTypeMap {
  "ace-thief-book.filePath": string,
  "ace-thief-book.currentPage": number,
  "ace-thief-book.autoTurnInterval": number,
  "ace-thief-book.lightColor": string,
  "ace-thief-book.darkColor": string,
}

export interface ConfigShorthandMap {
  filePath: "ace-thief-book.filePath",
  currentPage: "ace-thief-book.currentPage",
  autoTurnInterval: "ace-thief-book.autoTurnInterval",
  lightColor: "ace-thief-book.lightColor",
  darkColor: "ace-thief-book.darkColor",
}

export interface ConfigShorthandTypeMap {
  filePath: string,
  currentPage: number,
  autoTurnInterval: number,
  lightColor: string,
  darkColor: string,
}

export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {
  key: T,
  default: ConfigKeyTypeMap[T],
}


/**
 * Configs map registered by `kutius.ace-thief-book`
 */
export const configs = {
  /**
   * 文本文件路径
   * @key `ace-thief-book.filePath`
   * @default `""`
   * @type `string`
   */
  filePath: {
    key: "ace-thief-book.filePath",
    default: "",
  } as ConfigItem<"ace-thief-book.filePath">,
  /**
   * 当前页码
   * @key `ace-thief-book.currentPage`
   * @default `1`
   * @type `number`
   */
  currentPage: {
    key: "ace-thief-book.currentPage",
    default: 1,
  } as ConfigItem<"ace-thief-book.currentPage">,
  /**
   * 自动翻页间隔
   * @key `ace-thief-book.autoTurnInterval`
   * @default `2500`
   * @type `number`
   */
  autoTurnInterval: {
    key: "ace-thief-book.autoTurnInterval",
    default: 2500,
  } as ConfigItem<"ace-thief-book.autoTurnInterval">,
  /**
   * 亮色文字颜色
   * @key `ace-thief-book.lightColor`
   * @default `"#ccc"`
   * @type `string`
   */
  lightColor: {
    key: "ace-thief-book.lightColor",
    default: "#ccc",
  } as ConfigItem<"ace-thief-book.lightColor">,
  /**
   * 暗色文字颜色
   * @key `ace-thief-book.darkColor`
   * @default `"#333"`
   * @type `string`
   */
  darkColor: {
    key: "ace-thief-book.darkColor",
    default: "#333",
  } as ConfigItem<"ace-thief-book.darkColor">,
}

export interface ScopedConfigKeyTypeMap {
  "filePath": string,
  "currentPage": number,
  "autoTurnInterval": number,
  "lightColor": string,
  "darkColor": string,
}

export const scopedConfigs = {
  scope: "ace-thief-book",
  defaults: {
    "filePath": "",
    "currentPage": 1,
    "autoTurnInterval": 2500,
    "lightColor": "#ccc",
    "darkColor": "#333",
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  "ace-thief-book": {
    "filePath": string,
    "currentPage": number,
    "autoTurnInterval": number,
    "lightColor": string,
    "darkColor": string,
  },
}

export interface NestedScopedConfigs {
  "filePath": string,
  "currentPage": number,
  "autoTurnInterval": number,
  "lightColor": string,
  "darkColor": string,
}

