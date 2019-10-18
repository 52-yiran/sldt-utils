/*
 * @Name: rem.js
 * @Descripttion: 使用rem
 * @Author: 无痕
 * @Date: 2019-09-26 11:44:03
 * @LastEditors: 
 * @LastEditTime: 2019-10-08 14:54:38
 */
export default (function () {
  let handler;
  return function (styleWidth) {
    if (!handler) {
      const html = document.documentElement;
      handler = function () {
        html.style.fontSize = 100 * (html.clientWidth / styleWidth) + 'px';
      };
      if (!document.addEventListener) return;
      window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', handler);
      handler();
      document.addEventListener('DOMContentLoaded', handler);
    }
  };
})();