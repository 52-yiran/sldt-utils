import Dialog from './dialog';
import './styles/toast.scss';

import { extend, isObject } from './core';

let instanceToast = null;

function Toast (options) {

  Toast.clear();

  const params = extend(true, {}, Toast.defaultOptions, isObject(options) ? options : { content: options });

  const { icon, image, content } = params;

  if (icon || image) {
    params.className += ' s-toast-middle';
  }

  params.content = '';

  if (icon) {
    params.content += `<i class="s-icon s-icon-${icon} s-toast-icon"></i>`;
  } else if (image) {
    params.content += `<img class="s-toast-icon" src="${image}"/>`;
  }

  if (content || content === 0) {
    params.content += `<p class="s-toast-text">${content}</p>`;
  }

  return instanceToast = Dialog(params).show();
}

Toast.defaultOptions = {
  className: 's-toast-dialog',
  icon: '',
  image: '',
  content: '',
  duration: 2000,
  position: '',
  mask: false,
  isOnce: true
}

Toast.success = function (options) {
  return Toast(extend(true, {
    className: 's-toast-dialog s-toast-success',
    icon: 'success'
  }, isObject(options) ? options : { content: options }))
}

Toast.fail = function (options) {
  return Toast(extend(true, {
    className: 's-toast-dialog s-toast-fail',
    icon: 'fail'
  }, isObject(options) ? options : { content: options }))
}

Toast.clear = function () {
  if (instanceToast) {
    instanceToast.destroy(true);
    instanceToast = null;
  }
}

export default Toast;