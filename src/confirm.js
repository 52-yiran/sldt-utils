import { extend, isObject } from './core';
import Alert from './alert';

function Confirm (options) {
  return Alert(extend(true, {}, Confirm.defaultOptions, isObject(options) ? options : { content: options }));
}

Confirm.defaultOptions = {
  cancelText: '取消'
}

export default Confirm;