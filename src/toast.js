import Dialog from './dialog';
import './css/toast.scss';

import { extend, isObject, trim } from './core';

let instanceToast;

function Toast (options) {

  Toast.clear();

  options = isObject(options) ? options : { message: options };

  const type = trim(options.type);
  const params = extend({}, Toast.defaultOptions, (Toast[type] && Toast[type].defaultOptions), options);

  let { icon, message } = params;

  if (type) {
    params.className += ` s-toast-${type}`;
  }

  params.content = '';

  if (typeof icon === 'string' && (icon = trim(icon))) {

    params.className += ' s-toast-middle';

    if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(icon) || icon.indexOf('data:image/') > -1) {
      params.content += `<img class="s-toast-icon" src="${icon}"/>`;
    } else {
      params.content += `<i class="${icon} s-toast-icon"></i>`;
    }

  }

  if (message || message === 0) {
    params.content += `<p class="s-toast-text">${message}</p>`;
  }

  instanceToast = Dialog(params).show();

  return instanceToast;
}

Toast.defaultOptions = {
  className: 's-toast-dialog',
  icon: '',
  message: '',
  duration: 2000,
  position: '',
  mask: false,
  isOnce: true
};

function SuccessToast (options) {
  return Toast(extend({ type: 'success' }, isObject(options) ? options : { message: options }));
}
SuccessToast.defaultOptions = {
  icon: 's-icon-success'
};
Toast.success = SuccessToast;

function FailToast (options) {
  return Toast(extend({ type: 'fail' }, isObject(options) ? options : { message: options }));
}
FailToast.defaultOptions = {
  icon: 's-icon-fail'
};
Toast.fail = FailToast;

function LoadingToast (options) {
  return Toast(extend({ type: 'loading' }, isObject(options) ? options : { message: options }));
}
LoadingToast.defaultOptions = {
  icon: 's-icon-loading',
  effect: false,
  position: 'middle',
  duration: 0,
  preventTouchmove: true
};
Toast.loading = LoadingToast;

Toast.clear = function () {
  if (instanceToast) {
    instanceToast.destroy(true);
    instanceToast = null;
  }
};

export default Toast;
