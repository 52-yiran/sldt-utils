import { trim, toArray } from './core'

// 获取或生成dom节点
export function getElem (selector, context) {
  let arr = [];
  if (selector) {
    if (typeof selector === 'string') {
      selector = selector.trim()
      if (selector.indexOf('<') >= 0 && selector.indexOf('>') >= 0) {
        let tag = 'div'
        if (selector.indexOf('<li') === 0) tag = 'ul'
        if (selector.indexOf('<tr') === 0) tag = 'tbody'
        if (selector.indexOf('<td') === 0 || selector.indexOf('<th') === 0) tag = 'tr'
        if (selector.indexOf('<tbody') === 0) tag = 'table'
        if (selector.indexOf('<option') === 0) tag = 'select'
        const el = document.createElement(tag)
        el.innerHTML = selector
        arr = toArray(el.children)
      } else {
        arr = toArray((context || document).querySelectorAll(selector));
      }
    } else if (selector.nodeType) {
      arr = [selector]
    } else {
      arr = toArray(selector).filter(el => el.nodeType)
    }
  }
  return arr;
}

// 添加class
export function addClass (selector, value) {
  if (value = trim(value)) {
    const classes = value.split(/\s+/g)
    getElem(selector).forEach(el => {
      let cur = ' ' + (el.getAttribute('class') || '').trim() + ' '
      classes.forEach(cls => {
        if (cur.indexOf(' ' + cls + ' ') < 0) {
          cur += cls + ' '
        }
      })
      el.setAttribute('class', cur.trim())
    })
  }
}

// 移除class
export function removeClass (selector, value) {
  if (value = trim(value)) {
    const classes = value.split(/\s+/g)
    getElem(selector).forEach(el => {
      let cur = (el.getAttribute('class') || '').trim()
      if (cur && (cur = ' ' + cur + ' ')) {
        classes.forEach(cls => {
          if (cur.indexOf(' ' + cls + ' ') > -1) {
            cur = cur.replace(' ' + cls + ' ', ' ');
          }
        })
        if (cur && (cur = cur.trim())) {
          el.setAttribute('class', cur)
        } else {
          el.removeAttribute('class')
        }
      }
    })
  }
}

// 获取浏览器中最大z-index值
export function getMaxZindex (selector, minZindex) {
  return Math.max.apply(null, [Math.max(1, parseInt(minZindex) || 1)].concat(getElem(selector).map(el => {
    return parseInt(el.style.zIndex) || 1
  })))
}