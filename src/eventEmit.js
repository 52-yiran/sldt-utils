/*
 * @Name: EventEmit
 * @Descripttion: 发布订阅
 * @Author: 无痕
 * @Date: 2019-08-30 14:44:25
 * @LastEditors:
 * @LastEditTime: 2019-10-10 14:16:06
 */
import { isFunction, isObject, trim, each } from './core';

const isOnce = '[S_EVENT_EMIT_IS_ONCE]'
const events = '[S_EVENT_EMIT_EVENTS]'

function addEvent (name, fn) {
  if (isFunction(fn)) {
    name = trim(name)
    if (this[isOnce]) {
      fn = (...args) => {
        this.off(name, fn)
        fn(...args)
      }
    }
    if (!this[events].hasOwnProperty(name)) {
      this[events][name] = [fn]
    } else {
      this[events][name].push(fn)
    }
  }
}

export default class EventEmit {
  constructor () {
    this[isOnce] = false// 执行一次的绑定判断
    this[events] = {}// 存储函数对象
  }
  // 订阅消息
  on (...args) {
    if (isObject(args[0])) {
      each(args[0], (fn, name) => {
        addEvent.call(this, name, fn)
      })
    } else {
      addEvent.call(this, ...args)
    }
    return this
  }
  // 订阅一次消息
  once (...args) {
    this[isOnce] = true
    this.on(...args)
    this[isOnce] = false
    return this
  }
  // 发布消息
  emit (name, ...args) {
    name = trim(name)
    if (this[events] && this[events].hasOwnProperty(name)) {
      each(this[events][name], fn => {
        fn.call(this, ...args)
      })
    }
    return this
  }
  // 取消订阅
  off (name, fn) {
    if (arguments.length) {
      name = trim(name)
      if (this[events] && this[events].hasOwnProperty(name)) {
        if (fn !== undefined) {
          const index = this[events][name].indexOf(fn)
          index > -1 && this[events][name].splice(index, 1)
        } else {
          this[events][name] = []
        }
        if (!this[events][name].length) {
          delete this[events][name]
        }
      }
    } else {
      this[events] = {}
    }
    return this
  }
}
