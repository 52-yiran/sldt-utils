import { extend, isObject } from './core';
import Dialog from './dialog';
import './css/alert.scss';

function Alert (options) {
  return new Promise((resolve, reject) => {
    const params = extend({}, Alert.defaultOptions, isObject(options) ? options : { content: options });

    params.onCancel = reject;
    params.onConfirm = resolve;

    Dialog(params).show();
  });
}

Alert.defaultOptions = {
  className: 's-alert-dialog',
  title: '',
  content: '',
  confirmText: '确定',
  confirmColor: '#1989fa',
  maskOpacity: 0.5,
  isOnce: true,
  preventTouchmove: true
};

export default Alert;
