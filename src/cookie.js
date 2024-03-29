/*
 * @Name: cookie
 * @Descripttion: 浏览器cookie封装
 * @Author: 无痕
 * @Date: 2019-09-23 15:46:54
 * @LastEditors:
 * @LastEditTime: 2019-11-09 16:50:35
 */

// 设置cookie
export function setCookie (name, value, days, params = {}) {
  if (value !== undefined) {
    let expires;
    if (typeof days === 'number') {
      expires = new Date();
      expires.setTime(+expires + days * 864e+5);
    }
    return (document.cookie = [
      encodeURIComponent(name), '=', encodeURIComponent(value),
      expires ? '; expires=' + expires.toUTCString() : '',
      params.path ? '; path=' + params.path : '',
      params.domain ? '; domain=' + params.domain : '',
      params.secure ? '; secure' : ''
    ].join(''));
  }
}
// 获取cookie
export function getCookie (name) {
  let result;
  if (document.cookie) {
    document.cookie.split('; ').some(item => {
      const parts = item.split('=');
      const keyName = parts.shift();
      if (keyName && keyName === encodeURIComponent(name)) {
        result = decodeURIComponent(parts.join('='));
        return true;
      }
    });
  }
  return result;
}
// 删除cookie
export function removeCookie (name, params = {}) {
  setCookie(name, '', -1, params);
}
// 清除全部cookie
export function cleanCookie (params = {}) {
  (document.cookie.match(/[^ =;]+(?==)/g) || []).forEach(name => {
    removeCookie(decodeURIComponent(name), params);
  });
}
