import Dialog from './dialog'
import './css/toast.scss'

import { extend, isObject, trim } from './core'

let instanceToast = null

function Toast (options) {

  Toast.clear()

  options = isObject(options) ? options : { message: options }

  const type = options.type || 'default'
  const params = extend({}, Toast.defaultOptions, (Toast[type] && Toast[type].defaultOptions), options)

  let { icon, message } = params

  params.className += ` s-toast-${type}`

  params.content = ''

  if (typeof icon === 'string' && (icon = icon.trim())) {

    params.className += ' s-toast-middle'

    if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(icon) || icon.indexOf('data:image/') > -1) {
      params.content += `<img class="s-toast-icon" src="${icon}"/>`
    } else {
      params.content += `<i class="${icon} s-toast-icon"></i>`
    }

  }

  if (message || message === 0) {
    params.content += `<p class="s-toast-text">${message}</p>`
  }

  instanceToast = Dialog(params).show()

  return instanceToast
}

Toast.defaultOptions = {
  className: 's-toast-dialog',
  type: 'default',
  icon: '',
  message: '',
  duration: 2000,
  position: '',
  mask: false,
  isOnce: true
};

[
  {
    type: 'success',
    options: {
      icon: 's-icon-success'
    }
  },
  {
    type: 'fail',
    options: {
      icon: 's-icon-fail'
    }
  },
  {
    type: 'loading',
    options: {
      icon: 's-icon-loading-circular',
      effect: false,
      position: 'middle',
      duration: 0,
      preventTouchmove: true
    }
  }
].forEach(({ type, options }) => {
  Toast[type] = function (options) {
    return Toast(extend({ type }, isObject(options) ? options : { message: options }))
  }
  Toast[type].defaultOptions = options
})

Toast.clear = function () {
  if (instanceToast) {
    instanceToast.destroy(true)
    instanceToast = null
  }
}

export default Toast
