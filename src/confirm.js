import { extend, isObject } from './core';
import Alert from './alert';

function Confirm (options) {
  return Alert(extend({}, Confirm.defaultOptions, isObject(options) ? options : { content: options }));
}

Confirm.defaultOptions = {
  cancelText: '取消',
  cancelColor: '#323233'
};

export default Confirm;
