import { extend, isObject } from './core';
import Toast from './toast';

export function showLoading (options) {
  return Toast(extend(true, showLoading.defaultOptions, isObject(options) ? options : { content: options }))
}

showLoading.defaultOptions = {
  className: 's-toast-dialog s-toast-loading',
  icon: 'loading',
  effect: false,
  position: 'middle',
  duration: 0
}

export function hideLoading () {
  Toast.clear();
}