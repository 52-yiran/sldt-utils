/*
 * @Name: sldt-utils
 * @Descripttion: 一个常用方法库
 * @Author: 无痕
 * @Date: 2019-10-14 09:14:21
 * @LastEditors:
 * @LastEditTime: 2019-11-14 09:58:51
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
import dialog from './dialog';
import toast from './toast';
import alert from './alert';
import confirm from './confirm';

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
};
