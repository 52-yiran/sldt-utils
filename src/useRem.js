/**
 * @name: 使用rem 
 * @param {styleWidth Number} 设计稿宽度
 * @param {remUnit Number} 换算remUnit
 */
export default (function () {
  let handler;
  return function (styleWidth = 375, remUnit = 100) {
    if (!handler) {
      const html = document.documentElement;
      handler = function () {
        html.style.fontSize = remUnit * (html.clientWidth / styleWidth) + 'px';
      };
      if (!document.addEventListener) return;
      window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', handler);
      handler();
      document.addEventListener('DOMContentLoaded', handler);
    }
  };
})();
