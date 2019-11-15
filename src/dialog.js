import { extend, isObject } from './core';
import Popup from './popup';
import { getElem } from './dom';
import './css/dialog.scss';

function Dialog (options) {

  return new Promise((resolve, reject) => {

    options = extend({}, Dialog.defaultOptions, isObject(options) ? options : { message: options });

    let instanceDialog;

    const {
      title,
      message,
      cancelClass,
      cancelText,
      cancelColor,
      confirmClass,
      confirmText,
      confirmColor
    } = options;

    const content = getElem('<div class="s-dialog-content"></div>')[0];

    // 标题
    if (title !== '') {
      content.appendChild(getElem('<div class="s-dialog-header">' + title + '</div>')[0]);
    }
    // 内容
    if (message !== '') {
      content.appendChild(getElem('<div class="s-dialog-message">' + message + '</div>')[0]);
    }
    // 按钮
    if (cancelText !== '' || confirmText !== '') {
      const footer = getElem('<div class="s-dialog-footer s-hairline-top"></div>')[0];

      if (cancelText !== '') {
        const cancelBtn = getElem(`<a class="${cancelClass}" style="${cancelColor ? `color:${cancelColor}` : ''}">${cancelText}</a>`)[0];
        cancelBtn.addEventListener('click', function () {
          instanceDialog.hide();
          reject();
        });
        footer.appendChild(cancelBtn);
      }

      if (confirmText !== '') {
        const confirmBtn = getElem(`<a class="${confirmClass}" style="${confirmColor ? `color:${confirmColor}` : ''}">${confirmText}</a>`)[0];
        confirmBtn.addEventListener('click', function () {
          instanceDialog.hide();
          resolve();
        });
        footer.appendChild(confirmBtn);
      }

      content.appendChild(footer);
    }

    options.content = content;

    instanceDialog = Popup(options);
    instanceDialog.show();
  });
}

Dialog.defaultOptions = {
  className: 's-dialog',
  maskClose: false,
  isOnce: true,
  preventTouchmove: true,
  title: '',
  message: '',
  cancelClass: 's-btn s-hairline-right', // 取消按钮class
  cancelText: '', // 取消按钮文字
  cancelColor: '#323233', // 取消按钮颜色
  confirmClass: 's-btn', // 确认按钮class
  confirmText: '确定', // 确认按钮文字
  confirmColor: '#1989fa' // 确认按钮颜色
};

function Alert (options) {
  return Dialog(extend({}, Alert.defaultOptions, isObject(options) ? options : { message: options }));
}

Alert.defaultOptions = {};

function Confirm (options) {
  return Dialog(extend({}, Confirm.defaultOptions, isObject(options) ? options : { message: options }));
}

Confirm.defaultOptions = {
  cancelText: '取消'
};

Dialog.alert = Alert;
Dialog.confirm = Confirm;

export default Dialog;
