import { extend, isObject } from './core';
import Dialog from './dialog';
import './styles/alert.scss';

function Alert (options) {
  return new Promise((resolve, reject) => {
    const params = extend(true, {}, Alert.defaultOptions, isObject(options) ? options : { content: options });

    params.onCancel = reject;
    params.onConfirm = resolve;

    Dialog(params).show();
  })
}

Alert.defaultOptions = {
  className: 's-alert-dialog',
  title: '提示',
  content: '',
  confirmText: '确定',
  confirmColor: '#1989fa',
  cancelColor: '#323233',
  maskClose: false,
  maskOpacity: 0.5,
  isOnce: true
}

export default Alert;