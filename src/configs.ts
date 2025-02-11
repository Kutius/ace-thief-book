import type { NestedScopedConfigs } from './generated-meta'
import { statSync } from 'node:fs'
import { computed, defineConfigObject } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { scopedConfigs } from './generated-meta'

export const config = defineConfigObject<NestedScopedConfigs>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)

export const isBookOk = computed(() => config.filePath ? statSync(config.filePath).isFile() : false)

export function setConfig<T extends keyof NestedScopedConfigs>(key: T, value: NestedScopedConfigs[T]) {
  config.$update(key, value, ConfigurationTarget.Global)
}
