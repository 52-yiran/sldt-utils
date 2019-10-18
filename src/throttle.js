/*
 * @Name: throttle
 * @Descripttion: 函数节流
 * @Author: 无痕
 * @Date: 2019-09-23 16:00:25
 * @LastEditors: 
 * @LastEditTime: 2019-10-18 16:51:39
 */
import { isFunction, isObject } from "./core";
import Debounce from "./debounce";

export default function throttle (fn, wait = 300, params) {
  let leading = true;
  let trailing = true;
  if (!isFunction(fn)) {
    throw new TypeError('Expected a function');
  }
  if (isObject(params)) {
    leading = 'leading' in params ? !!params.leading : leading;
    trailing = 'trailing' in params ? !!params.trailing : trailing;
  }
  return Debounce(fn, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
};