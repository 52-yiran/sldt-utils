import { inBrowser, noop } from './core'

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }
  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// 最佳动画执行时机
export function nextFrame (fn) {
  const raf = (inBrowser() && window.requestAnimationFrame) ? window.requestAnimationFrame.bind(window) : setTimeout
  return raf(() => raf(fn, 5), 5)
}

// 判断是否支持该css3属性
export function supportCss3 (styleKey) {
  const toHumb = str => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
  const preArr = ['webkit', 'Moz', 'ms', 'o']
  const preStyleArr = [toHumb(styleKey)]
  const htmlStyle = document.documentElement.style
  preArr.forEach(pre => preStyleArr.push(toHumb(`${pre}-${styleKey}`)))
  return preStyleArr.some(preStyle => preStyle in htmlStyle)
}
// 获取dom动画信息
export function getTransitionInfo (el) {
  if (supportCss3('transition')) {
    var transition = 'transition'
    var animation = 'animation'
    var styles = window.getComputedStyle(el)
    var transitionDelays = styles[transition + 'Delay'].split(', ')
    var transitionDurations = styles[transition + 'Duration'].split(', ')
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations)
    var animationDelays = styles[animation + 'Delay'].split(', ')
    var animationDurations = styles[animation + 'Duration'].split(', ')
    var animationTimeout = getTimeout(animationDelays, animationDurations)
    var type; var timeout = 0
    var propCount = 0
    /* istanbul ignore if */
    timeout = Math.max(transitionTimeout, animationTimeout)
    type = timeout > 0 ? transitionTimeout > animationTimeout ? transition : animation : null
    propCount = type ? type === transition ? transitionDurations.length : animationDurations.length : 0
    var hasTransform = type === transition && /\b(transform|all)(,|$)/.test(styles[transition + 'Property'])
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  } else {
    return null
  }
}

/**
 * @name: dom节点动画执行完毕绑定事件为一次性绑定
 * @param el //dom节点
 * @param callback 回调函数
 * @return: { off, trigger } 2个函数处理特殊需求
 */
export function whenTransitionEnds (el, callback = noop) {
  let status = true

  const off = function () {
    status = false
  }

  const trigger = function () {
    if (status) {
      status = false
      callback()
    }
  }

  if (supportCss3('transition')) {
    var transition = 'transition'
    var transitionEndEvent = 'transitionend'
    var animationEndEvent = 'animationend'
    var ref = getTransitionInfo(el)
    var type = ref.type
    var timeout = ref.timeout
    var propCount = ref.propCount
    if (!type) {
      trigger()
    } else {
      var event = type === transition ? transitionEndEvent : animationEndEvent
      var ended = 0
      var end = function () {
        el.removeEventListener(event, onEnd)
        trigger()
      }
      var onEnd = function (e) {
        if (e.target === el) {
          if (++ended >= propCount) {
            end()
          }
        }
      }
      setTimeout(function () {
        if (ended < propCount) {
          end()
        }
      }, timeout + 1)
      el.addEventListener(event, onEnd)
    }
  } else {
    nextFrame(trigger)
  }

  return { off, trigger }
};
