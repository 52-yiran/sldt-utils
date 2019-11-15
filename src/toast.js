import Popup from './popup';
import './css/toast.scss';

import { extend, isObject, trim } from './core';

let instanceToast;

function Toast (options) {

  Toast.clear();

  options = isObject(options) ? options : { message: options };

  const type = trim(options.type);

  options = extend({}, Toast.defaultOptions, (Toast[type] && Toast[type].defaultOptions), options);

  let { icon, message } = options;

  if (type) {
    options.className += ` s-toast-${type}`;
  }

  options.content = '<div class="s-toast-content">';

  if (typeof icon === 'string' && (icon = trim(icon))) {

    options.className += ' s-toast-middle';

    if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(icon) || icon.indexOf('data:image/') > -1) {
      options.content += `<img class="s-toast-icon" src="${icon}"/>`;
    } else {
      options.content += `<i class="${icon} s-toast-icon"></i>`;
    }

  }

  if (message || message === 0) {
    options.content += `<p class="s-toast-text">${message}</p>`;
  }
  options.content += '</div>';

  instanceToast = Popup(options).show();

  return instanceToast;
}

Toast.defaultOptions = {
  className: 's-toast',
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
