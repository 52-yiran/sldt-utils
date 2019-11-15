import './css/base.scss';
import './css/popup.scss';

import { extend, isFunction } from './core';
import { whenTransitionEnds } from './transition';
import { getElem, addClass, removeClass, getMaxZindex } from './dom';

const instance = '[S_POPUP_INSTANCE]';
const visible = '[S_POPUP_VISIBLE]';
const visibleTimeOutId = '[S_POPUP_VISIBLE_TIME_OUT_ID]';
const autoCloseTimeOutId = '[S_POPUP_AUTO_CLOSE_TIME_OUT_ID]';
const effectControl = '[S_POPUP_EFFECT_CONTROL]';

const inDestroy = '[S_POPUP_IN_DESTROY]';
const isDestroy = '[S_POPUP_IS_DESTROY]';

const nextId = '[S_POPUP_NEXT_ID]';

function popup (options) {
  return new Popup(options);
}

// 默认参数
popup.defaultOptions = {
  el: null, // 与dom节点建立联系，为dom节点对象，设此属性后，不会重新构建dom，实例属性el也将等于此dom节点
  content: '', // dom节点 | 字符串内容 | function返回值
  className: '', // 弹框class
  effect: true, // 是否使用过渡效果
  position: 'middle', // 弹框显示位置
  mountElem: 'body', // 弹框挂载的容器，为空则不会挂载
  closeBtn: false, // 关闭x,(String,Boolean),为ture则使用内置html字符串，为字符串则使用字符串html
  isOnce: false, // 是否为一次性弹框，关闭后立即销毁，并删除dom
  zindexSelector: '.s-popup.s-popup-visible', // z-index层级比较选择器
  zindexStart: 2000, // z-index初始值
  mask: true, // 是否显示遮罩
  maskOpacity: 0.7, // 遮罩透明度
  maskClose: true, // 点击遮罩是否关闭弹框
  lockScroll: true, // 是否阻止外层滚动,
  duration: 0, // 自动关闭时间,number
  preventTouchmove: false, // 是否阻止弹层touchmove滚动，手机上滚动穿透
  // 生命周期
  onInit: undefined, // 初始化
  onShow: undefined, // 显示后
  onHide: undefined, // 关闭后
  onBeforeShow: undefined, // 显示时拦截钩子,参数为next()可异步阻止显示
  onBeforeHide: undefined, // 隐藏时拦截钩子,参数为next()可异步阻止关闭
  onBeforeDestroy: undefined, // 销毁前
  onDestroy: undefined // 销毁后
};

class Popup {
  constructor(params) {
    const self = this;
    const {
      el,
      className,
      effect,
      position,
      mountElem,
      closeBtn,
      mask,
      maskOpacity,
      maskClose,
      preventTouchmove,
      onInit
    } = self.options = extend({}, popup.defaultOptions, params);

    // 弹框显示状态
    self[visible] = false;
    // 弹框显示隐藏定时器,防止多次显示，隐藏同步切换
    self[visibleTimeOutId] = 0;
    // 弹框自动关闭定时器
    self[autoCloseTimeOutId] = 0;
    // 记录动画效果执行完毕回调处理函数执行与否的操作对象
    self[effectControl] = null;
    // 判断是否在执行销毁中
    self[inDestroy] = false;
    // 判断是否执行过销毁
    self[isDestroy] = false;

    // 根dom节点
    let elem = getElem(el)[0];
    if (!elem) {
      elem = getElem('<div class="s-popup"></div>')[0];
      const wrapper = getElem('<div class="s-popup-wrapper"></div>')[0];

      let content = self.options.content;

      if (isFunction(content)) {
        content = content.call(self);
      }

      if (content instanceof HTMLElement) {
        wrapper.appendChild(content);
      } else if (typeof content !== 'undefined' && content !== '') {
        wrapper.innerHTML = content;
      }

      elem.appendChild(wrapper);
    } else {
      if (elem[instance]) return elem[instance];
    }

    addClass(elem, position ? ('s-popup-position-' + position) : '');
    addClass(elem, effect ? 's-popup-effect' : '');
    addClass(elem, className);
    elem[instance] = self;
    // 锁定touchmove滚动
    preventTouchmove && elem.addEventListener('touchmove', function (e) {
      e.preventDefault();
    });

    // 弹框实例添加dom节点记录
    self.el = elem;
    // 是否显示遮罩
    if (mask) {
      self.mask = getElem('<div class="s-popup-mask" style="background-color: rgba(0, 0, 0, ' + maskOpacity + ');"></div>')[0];
      // 点击遮罩是否关闭
      maskClose && self.mask.addEventListener('click', () => self.hide());
      self.mask.addEventListener('touchmove', function (e) {
        e.preventDefault();
      });
      elem.insertBefore(self.mask, elem.firstElementChild);
    }

    const wrapper = getElem('.s-popup-wrapper', elem)[0];
    // 关闭 x
    if (closeBtn === true) {
      self.closeBtn = getElem('<button class="s-btn s-popup-close-btn"><i class="s-icon-cross"></i></button>')[0];
    } else if (typeof closeBtn === 'string' && closeBtn) {
      self.closeBtn = getElem(closeBtn)[0];
    }

    if (wrapper) {
      self.wrapper = wrapper;
      if (self.closeBtn) {
        self.closeBtn.addEventListener('click', () => self.hide());
        wrapper.appendChild(self.closeBtn);
      }
    }

    // 挂载dom
    const mountNode = getElem(mountElem)[0];
    mountNode && mountNode.appendChild(elem);
    // 触发初始化后生命周期钩子
    isFunction(onInit) && onInit.call(self);
  }
  // 显示
  show (callback) {
    const self = this;
    const opt = self.options;
    // 清除弹框显示隐藏记录
    clearTimeout(self[visibleTimeOutId]);

    self[visibleTimeOutId] = setTimeout(function () {
      if (!self[visible]) {
        // 判断是否有上次未执行完的效果回调，如有，则立即执行
        self[effectControl] && self[effectControl].trigger();

        const next = function () {
          // 判断是否是最新的next调用，不是则作废
          if (next[nextId] === self[visibleTimeOutId]) {
            self[visible] = true;

            // 锁定外层滚动
            opt.lockScroll && addClass('body', 's-overflow-hidden');
            // z-index层级设置
            self.el.style.zIndex = getMaxZindex(opt.zindexSelector, opt.zindexStart) + 1;
            // 显示
            addClass(self.el, 's-popup-visible s-popup-effect-enter');

            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.el, function () {
              // 清除执行效果回调函数执行控制对象对象记录
              self[effectControl] && (self[effectControl] = null);

              // 自动关闭
              const duration = parseInt(opt.duration);
              if (duration > 0) {
                clearTimeout(self[autoCloseTimeOutId]);
                self[autoCloseTimeOutId] = setTimeout(function () {
                  self[visible] && self.hide();
                }, duration);
              }
              // 移除效果class
              removeClass(self.el, 's-popup-effect-enter');
              // 触发参数回掉
              isFunction(callback) && callback.call(self);
              // 触发显示后生命周期钩子
              isFunction(opt.onShow) && opt.onShow.call(self);
            });
          }
        };
        // 记录本次执行的nextId
        next[nextId] = self[visibleTimeOutId];

        // 触发显示前生命周期钩子
        if (isFunction(opt.onBeforeShow)) {
          opt.onBeforeShow.call(self, next);
        } else {
          next();
        }
      }
    });
    return self;
  }
  // 隐藏
  hide (callback) {
    const self = this;
    const opt = self.options;
    // 清除弹框显示隐藏记录
    clearTimeout(self[visibleTimeOutId]);

    self[visibleTimeOutId] = setTimeout(function () {
      if (self[visible]) {
        // 判断是否有上次未执行完的效果回调，如有，则立即执行
        self[effectControl] && self[effectControl].trigger();

        const next = function () {
          // 判断是否是最新的next调用，不是则作废
          if (next[nextId] === self[visibleTimeOutId]) {
            self[visible] = false;

            // 清除自动关闭定时器
            clearTimeout(self[autoCloseTimeOutId]);

            // 开始执行效果
            addClass(self.el, 's-popup-effect-leave');

            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.el, function () {
              // 清除执行效果回调函数执行控制对象对象记录
              self[effectControl] && (self[effectControl] = null);
              // 关闭隐藏
              removeClass(self.el, 's-popup-visible s-popup-effect-leave');
              self.el.style.zIndex = '';

              // 解除body滚动锁定
              !getElem('.s-popup.s-popup-visible').length && removeClass('body', 's-overflow-hidden');
              // 触发参数回掉
              isFunction(callback) && callback.call(self);
              // 触发隐藏后生命周期钩子
              isFunction(opt.onHide) && opt.onHide.call(self);
              // 是否为一次性弹框，关闭后立即销毁，并删除dom
              opt.isOnce && self.destroy(true);
            });

            // 如果是在销毁中则立即触发移除效果关闭处理
            if (self[inDestroy]) {
              self[effectControl].trigger();
            }
          }
        };
        // 记录本次执行的nextId
        next[nextId] = self[visibleTimeOutId];

        // 触发隐藏前生命周期钩子
        if (isFunction(opt.onBeforeHide)) {
          opt.onBeforeHide.call(self, next);
        } else {
          next();
        }
      }
    });
    return self;
  }
  // 切换
  toggle (callback) {
    return this[this[visible] ? 'hide' : 'show'](callback);
  }
  // 销毁
  destroy (removeElem = false) {
    const self = this;
    const { className, position, onBeforeDestroy, onDestroy } = self.options;

    if (!self[inDestroy] && !self[isDestroy]) {
      self[inDestroy] = true;
      // 触发销毁前生命周期钩子
      isFunction(onBeforeDestroy) && onBeforeDestroy.call(self);

      const fn = function () {
        clearTimeout(self[visibleTimeOutId]);
        clearTimeout(self[autoCloseTimeOutId]);
        removeClass(self.el, `s-popup-effect s-popup-position-${position} ${className}`);
        delete self.el[instance];
        self.mask && self.mask.parentNode.removeChild(self.mask);
        self.closeBtn && self.closeBtn.parentNode.removeChild(self.closeBtn);
        removeElem && self.el.parentNode.removeChild(self.el);
        self[inDestroy] = false;
        self[isDestroy] = true;
        // 触发销毁后生命周期钩子
        isFunction(onDestroy) && onDestroy.call(self);
      };
      self[visible] ? self.hide(fn) : fn();
    }
  }
}

export default popup;
