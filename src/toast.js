import Dialog from './dialog'
import './styles/toast.scss'

import { extend, isObject } from './core'

let instanceToast = null

function Toast (options) {

  Toast.clear()

  let params = isObject(options) ? options : { content: options }
  let type = options.type || 'default'
  params = extend({}, Toast.defaultOptions, (Toast[type] && Toast[type].defaultOptions), params)

  const { image, icon, content } = params

  params.className += ` s-toast-${type}`

  if (icon || image) {
    params.className += ' s-toast-middle'
  }

  params.content = ''

  if (image) {
    params.content += `<img class="s-toast-icon" src="${image}"/>`
  } else if (icon) {
    params.content += `<i class="${icon} s-toast-icon"></i>`
  }

  if (content || content === 0) {
    params.content += `<p class="s-toast-text">${content}</p>`
  }

  instanceToast = Dialog(params).show()

  return instanceToast
}

Toast.defaultOptions = {
  className: 's-toast-dialog',
  type: 'default',
  icon: '',
  image: '',
  content: '',
  duration: 2000,
  position: '',
  mask: false,
  isOnce: true
};

['success', 'error', 'warning', 'loading'].forEach(type => {
  Toast[type] = function (options) {
    return Toast(extend({ type }, isObject(options) ? options : { content: options }))
  }
  Toast[type].defaultOptions = extend({
    type,
    icon: '',
    image: ''
  }, type === 'loading' ? {
    effect: false,
    position: 'middle',
    duration: 0,
    preventTouchmove: true
  } : {})
})

Toast.clear = function () {
  if (instanceToast) {
    instanceToast.destroy(true)
    instanceToast = null
  }
}

export default Toast
