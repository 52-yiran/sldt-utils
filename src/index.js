/*
 * @Name: sldt-utils
 * @Descripttion: 一个常用方法库
 * @Author: 无痕
 * @Date: 2019-10-14 09:14:21
 * @LastEditors:
 * @LastEditTime: 2019-11-15 11:49:26
 */
export const version = '_VERSION_';

export * from './core';
export * from './base64';
export * from './cookie';
export * from './format';
export * from './tools';
export * from './dom';
export * from './transition';
export * from './bridge';

import * as regExp from './regExp';
import useRem from './useRem';
import eventEmit from './eventEmit';
import countDown from './countDown';
import debounce from './debounce';
import throttle from './throttle';
import popup from './popup';
import dialog from './dialog';
import toast from './toast';

export {
  useRem,
  eventEmit,
  countDown,
  debounce,
  throttle,
  regExp,
  popup,
  dialog,
  toast
};
