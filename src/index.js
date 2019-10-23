/*
 * @Name: sldt-utils
 * @Descripttion: 一个常用方法库
 * @Author: 无痕
 * @Date: 2019-10-14 09:14:21
 * @LastEditors:
 * @LastEditTime: 2019-10-23 14:32:44
 */
import * as core from './core'
import * as regExp from './regExp'
import * as base64 from './base64'
import * as cookie from './cookie'
import * as format from './format'
import * as tools from './tools'
import * as dom from './dom'
import * as transition from './transition'

import useRem from './useRem'
import eventEmit from './eventEmit'
import countDown from './countDown'
import debounce from './debounce'
import throttle from './throttle'
import dialog from './dialog'
import toast from './toast'
import alert from './alert'
import confirm from './confirm'

export const version = '_VERSION_'

export {
  useRem,
  eventEmit,
  countDown,
  debounce,
  throttle,
  regExp,
  dialog,
  toast,
  alert,
  confirm
}

export * from './core'
export * from './base64'
export * from './cookie'
export * from './format'
export * from './tools'
export * from './dom'
export * from './transition'

export default {
  version,
  ...core,
  ...base64,
  ...cookie,
  ...format,
  ...tools,
  ...transition,
  ...dom,
  countDown,
  useRem,
  regExp,
  eventEmit,
  debounce,
  throttle,
  dialog,
  toast,
  alert,
  confirm
}
