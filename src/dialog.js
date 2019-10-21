import './styles/base.scss'
import './styles/dialog.scss'

import $ from './dom'
import { extend, isFunction } from './core'
import { whenTransitionEnds } from './transition'
import { getMaxZindex } from './tools'

const visible = '[S_DIALOG_VISIBLE]'
const visibleTimeOutId = '[S_DIALOG_VISIBLE_TIME_OUT_ID]'
const autoCloseTimeOutId = '[S_DIALOG_AUTO_CLOSE_TIME_OUT_ID]'
const effectControl = '[S_DIALOG_EFFECT_CONTROL]'

const inDestroy = '[S_DIALOG_IN_DESTROY]'
const isDestroy = '[S_DIALOG_IS_DESTROY]'

const nextId = '[S_DIALOG_NEXT_ID]'

function getPositionEffectClass (visible, { effect, position }) {
  return effect ? ('s-animate-' + (position || 'fade') + '-' + (visible ? 'enter' : 'leave')) : ''
}

function dialog (options) {
  return new Dialog(options)
}

// 默认参数
dialog.defaultOptions = {
  el: null, // 与dom节点建立联系，为dom节点对象，设此属性后，不会重新构建dom，实例属性el也将等于此dom节点
  className: '', // 弹框class
  effect: true, // 是否使用过渡效果
  position: 'middle', // 弹框显示位置
  mountElem: 'body', // 弹框挂载的容器，为空则不会挂载
  closeBtn: false, // 关闭x,(String,Boolean),为ture则使用内置html字符串，为字符串则使用字符串html
  title: '', // 标题
  content: '', // 字符串html内容
  cancelClass: 's-btn s-dialog-btn-cancel', // 取消按钮class
  cancelText: '', // 取消按钮文字
  cancelColor: '', // 取消按钮颜色
  confirmClass: 's-btn s-dialog-btn-confirm', // 确认按钮class
  confirmText: '', // 确认按钮文字
  confirmColor: '', // 确认按钮颜色
  isOnce: false, // 是否为一次性弹框，关闭后立即销毁，并删除dom
  zindexSelector: '.s-dialog.s-dialog-visible', // z-index层级比较选择器
  zindexStart: 2000, // z-index初始值
  mask: true, // 是否显示遮罩
  maskOpacity: 0.7, // 遮罩透明度
  maskClose: true, // 点击遮罩是否关闭弹框
  lockScroll: false, // 是否阻止外层滚动,
  duration: 0, // 自动关闭时间,number
  preventTouchmove: false, // 是否阻止弹层touchmove滚动，手机上滚动穿透
  // 生命周期
  onInit: undefined, // 初始化
  onShow: undefined, // 显示后
  onHide: undefined, // 关闭后
  onCancel: undefined, // 点击遮罩，取消按钮关闭时
  onConfirm: undefined, // 点击确认按钮关闭时
  onBeforeShow: undefined, // 显示时拦截钩子,参数为next()可异步阻止显示
  onBeforeHide: undefined, // 隐藏时拦截钩子,参数为next()可异步阻止关闭
  onBeforeDestroy: undefined, // 销毁前
  onDestroy: undefined // 销毁后
}

class Dialog {
  constructor (params) {
    const self = this
    const {
      el,
      className,
      effect,
      position,
      mountElem,
      closeBtn,
      title,
      content,
      cancelText,
      cancelClass,
      cancelColor,
      confirmText,
      confirmClass,
      confirmColor,
      mask,
      maskOpacity,
      maskClose,
      preventTouchmove,
      onInit,
      onCancel,
      onConfirm
    } = self.options = extend(true, {}, dialog.defaultOptions, params)

    // 添加dom7到实例属性
    self['$'] = $
    // 弹框显示状态
    self[visible] = false
    // 弹框显示隐藏定时器,防止多次显示，隐藏同步切换
    self[visibleTimeOutId] = 0
    // 弹框自动关闭定时器
    self[autoCloseTimeOutId] = 0
    // 记录动画效果执行完毕回调处理函数执行与否的操作对象
    self[effectControl] = null
    // 判断是否在执行销毁中
    self[inDestroy] = false
    // 判断是否执行过销毁
    self[isDestroy] = false

    // 内部cancel关闭
    function cancel () {
      // 触发取消后生命周期钩子
      isFunction(onCancel) && onCancel.call(self)
      self.hide()
    }
    // 内部confirm关闭
    function confirm () {
      // 触发确认后生命周期钩子
      isFunction(onConfirm) && onConfirm.call(self)
      self.hide()
    }
    // 根dom节点
    let $el = $(el)
    if (!$el.length) {
      $el = $('<div class="s-dialog"></div>')
      const $wrapper = $('<div class="s-dialog-wrapper"></div>')

      // 标题
      if (title !== '') {
        $wrapper.append('<div class="s-dialog-header">' + title + '</div>')
      }
      // 内容
      if (content !== '') {
        $wrapper.append('<div class="s-dialog-content">' + content + '</div>')
      }
      // 按钮
      if (cancelText !== '' || confirmText !== '') {
        const $footer = $('<div class="s-dialog-footer"></div>')
        if (cancelText !== '') {
          $footer.append($(`<button class="${cancelClass}" style="${cancelColor ? `color:${cancelColor}` : ''}">${cancelText}</button>`).on('click', cancel))
        }
        if (confirmText !== '') {
          $footer.append($(`<button class="${confirmClass}" style="${confirmColor ? `color:${confirmColor}` : ''}">${confirmText}</button>`).on('click', confirm))
        }
        $wrapper.append($footer)
      }
      $el.append($wrapper)
    } else {
      $el = $el.eq(0)
      const instanceDialog = $el.data('s-dialog')
      if (instanceDialog) return instanceDialog
    }
    // 弹框实例添加dom节点记录
    self.el = $el.addClass(position ? ('s-dialog-position-' + position) : '')
      .addClass(effect ? 's-dialog-effect' : '')
      .addClass(className)
      .data('s-dialog', self)[0]
    // 是否显示遮罩
    if (mask) {
      self.mask = $('<div class="s-dialog-mask" style="background-color: rgba(0, 0, 0, ' + maskOpacity + ');"></div>')[0]
      // 点击遮罩是否关闭
      maskClose && $(self.mask).on('click', cancel)
      $el.prepend(self.mask)
    }
    self.wrapper = $el.find('.s-dialog-wrapper')[0]

    // 关闭 x
    if (closeBtn === true) {
      $(self.wrapper).append(self.closeBtn = $('<button class="s-btn s-dialog-close-btn"><i class="s-icon s-icon-cross"></i></button>').on('click', cancel)[0])
    } else if (typeof closeBtn === 'string' && closeBtn) {
      $(self.wrapper).append(self.closeBtn = $(closeBtn).on('click', cancel)[0])
    }
    // 挂载dom
    $(mountElem).eq(0).append($el)
    // 锁定touchmove滚动
    preventTouchmove && $el.on('touchmove', function (e) {
      e.preventDefault()
    })
    // 触发初始化后生命周期钩子
    isFunction(onInit) && onInit.call(self)
  }
  // 显示
  show (callback) {
    const self = this
    const opt = self.options
    // 清除弹框显示隐藏记录
    clearTimeout(self[visibleTimeOutId])

    self[visibleTimeOutId] = setTimeout(function () {
      if (!self[visible]) {
        // 判断是否有上次未执行完的效果回调，如有，则立即执行
        self[effectControl] && self[effectControl].trigger()

        const next = function () {
          // 判断是否是最新的next调用，不是则作废
          if (next[nextId] === self[visibleTimeOutId]) {
            self[visible] = true

            // 锁定外层滚动
            opt.lockScroll && $('html,body').addClass('s-overflow-hidden')
            $(self.el).css({
              'z-index': getMaxZindex(opt.zindexSelector, opt.zindexStart) + 1
            }).addClass('s-dialog-visible').addClass('s-dialog-effect-enter')
            // 添加内置效果
            $(self.wrapper).addClass(getPositionEffectClass(true, opt))
            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.wrapper, function () {
              // 清除执行效果回调函数执行控制对象对象记录
              self[effectControl] && (self[effectControl] = null)

              // 自动关闭
              const duration = parseInt(opt.duration)
              if (duration > 0) {
                clearTimeout(self[autoCloseTimeOutId])
                self[autoCloseTimeOutId] = setTimeout(function () {
                  self[visible] && self.hide()
                }, duration)
              }
              // 移除效果class
              $(self.el).removeClass('s-dialog-effect-enter')
              // 移除内置效果
              $(self.wrapper).removeClass(getPositionEffectClass(true, opt))
              // 触发参数回掉
              isFunction(callback) && callback.call(self)
              // 触发显示后生命周期钩子
              isFunction(opt.onShow) && opt.onShow.call(self)
            })
          }
        }
        // 记录本次执行的nextId
        next[nextId] = self[visibleTimeOutId]

        // 触发显示前生命周期钩子
        if (isFunction(opt.onBeforeShow)) {
          opt.onBeforeShow.call(self, next)
        } else {
          next()
        }
      }
    })
    return self
  }
  // 隐藏
  hide (callback) {
    const self = this
    const opt = self.options
    // 清除弹框显示隐藏记录
    clearTimeout(self[visibleTimeOutId])

    self[visibleTimeOutId] = setTimeout(function () {
      if (self[visible]) {
        // 判断是否有上次未执行完的效果回调，如有，则立即执行
        self[effectControl] && self[effectControl].trigger()

        const next = function () {
          // 判断是否是最新的next调用，不是则作废
          if (next[nextId] === self[visibleTimeOutId]) {
            self[visible] = false

            // 清除自动关闭定时器
            clearTimeout(self[autoCloseTimeOutId])

            // 开始执行效果
            $(self.el).addClass('s-dialog-effect-leave')
            // 添加内置效果
            $(self.wrapper).addClass(getPositionEffectClass(false, opt))

            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.wrapper, function () {
              // 清除执行效果回调函数执行控制对象对象记录
              self[effectControl] && (self[effectControl] = null)
              // 关闭隐藏
              $(self.el).removeClass('s-dialog-visible').css({
                'z-index': ''
              }).removeClass('s-dialog-effect-leave')
              // 移除内置效果
              $(self.wrapper).removeClass(getPositionEffectClass(false, opt))
              // 解除body滚动锁定
              !$('.s-dialog.s-dialog-visible').length && $('html,body').removeClass('s-overflow-hidden')
              // 触发参数回掉
              isFunction(callback) && callback.call(self)
              // 触发隐藏后生命周期钩子
              isFunction(opt.onHide) && opt.onHide.call(self)
              // 是否为一次性弹框，关闭后立即销毁，并删除dom
              opt.isOnce && self.destroy(true)
            })

            // 如果是在销毁中则立即触发移除效果关闭处理
            if (self[inDestroy]) {
              self[effectControl].trigger()
            }
          }
        }
        // 记录本次执行的nextId
        next[nextId] = self[visibleTimeOutId]

        // 触发隐藏前生命周期钩子
        if (isFunction(opt.onBeforeHide)) {
          opt.onBeforeHide.call(self, next)
        } else {
          next()
        }
      }
    })
    return self
  }
  // 切换
  toggle (callback) {
    return this[this[visible] ? 'hide' : 'show'](callback)
  }
  // 销毁
  destroy (removeElem = false) {
    const self = this
    const { className, position, onBeforeDestroy, onDestroy } = self.options

    if (!self[inDestroy] && !self[isDestroy]) {
      self[inDestroy] = true
      // 触发销毁前生命周期钩子
      isFunction(onBeforeDestroy) && onBeforeDestroy.call(self)

      const fn = function () {
        clearTimeout(self[visibleTimeOutId])
        clearTimeout(self[autoCloseTimeOutId])
        $(self.el).removeClass(`s-dialog-effect s-dialog-position-${position} ${className}`).removeData('s-dialog')
        self.mask && $(self.mask).remove()
        self.closeBtn && $(self.closeBtn).remove()
        removeElem && $(self.el).remove()
        self[inDestroy] = false
        self[isDestroy] = true
        // 触发销毁后生命周期钩子
        isFunction(onDestroy) && onDestroy.call(self)
      }
      self[visible] ? self.hide(fn) : fn()
    }
  }
}

export default dialog
