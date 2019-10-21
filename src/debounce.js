/*
 * @Name: debounce
 * @Descripttion: 函数防抖
 * @Author: 无痕
 * @Date: 2019-09-23 15:56:30
 * @LastEditors:
 * @LastEditTime: 2019-10-21 14:13:18
 */
import { isFunction, isObject, isNumber } from './core'

export default function debounce (fn, wait = 300, params) {
  let lastArgs
  let lastThis
  let maxWait
  let result
  let timerId
  let lastCallTime
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true
  if (!isFunction(fn)) {
    throw new TypeError('Expected a function')
  }
  if (!isNumber(wait)) {
    throw new TypeError('wait a number')
  }
  if (isObject(params)) {
    leading = !!params.leading
    maxing = 'maxWait' in params
    maxWait = maxing ? Math.max(Number(params.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in params ? !!params.trailing : trailing
  }
  function invokeFunc (time) {
    var args = lastArgs
    var thisArg = lastThis
    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = fn.apply(thisArg, args)
    return result
  }

  function leadingEdge (time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    var timeWaiting = wait - timeSinceLastCall
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    var time = new Date()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge (time) {
    timerId = undefined
    // Only invoke if we have `lastArgs` which means `fn` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(new Date())
  }
  function debounced (...args) {
    var time = new Date()
    var isInvoking = shouldInvoke(time)
    lastArgs = args
    lastThis = this
    lastCallTime = time
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
};
