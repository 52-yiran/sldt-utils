/*!
* sldt-utils v2.6.0
* author 无痕
* (c) Mon Oct 21 2019 16:44:11 GMT+0800 (GMT+08:00)
* @license MIT
*/
// 空方法
function noop () { }
// 设备环境
const inBrowser = () => typeof window !== 'undefined';
const inWeex = () => typeof WXEnvironment !== 'undefined' && !!window.WXEnvironment.platform;
const weexPlatform = () => inWeex() && window.WXEnvironment.platform.toLowerCase();

const ua = () => inBrowser() ? window.navigator.userAgent.toLowerCase() : '';

const isMobile = () => !!ua().match(/AppleWebKit.*Mobile.*/i);
const isWeixin = () => ua().match(/MicroMessenger/i) === 'micromessenger';
const isIE = () => /msie|trident/.test(ua());
const isIE9 = () => ua().indexOf('msie 9.0') > 0;
const isEdge = () => ua().indexOf('edge/') > 0;
const isAndroid = () => (ua().indexOf('android') > 0) || (weexPlatform() === 'android');
const isIOS = () => (/iphone|ipad|ipod|ios/.test(ua())) || (weexPlatform() === 'ios');
const isChrome = () => /chrome\/\d+/.test(ua()) && !isEdge();
const isIPhone = () => ua().indexOf('iphone') > -1; // 是否为iPhone或者QQHD浏览器
const isIPad = () => ua().indexOf('ipad') > -1; // 是否iPad
const isWebApp = () => ua().indexOf('safari') === -1; // 是否web应该程序，没有头部与底部
const hasTouch = () => isMobile();
const mousedown = () => hasTouch() ? 'touchstart' : 'mousedown';
const mousemove = () => hasTouch() ? 'touchmove' : 'mousemove';
const mouseup = () => hasTouch() ? 'touchend' : 'mouseup';

// 判断是否是此对象上的实例属性
function hasOwnProp (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
// 判断数据类型
function protoType (value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
// 判断是否为类数组
function isArrayLike (o) {
  return o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296
}
// 判断是否为function
function isFunction (value) {
  return protoType(value) === 'function'
}
// 判断是否为object
function isObject (value) {
  return protoType(value) === 'object'
}
// 是否为数组
function isArray (value) {
  return Array.isArray ? Array.isArray(value) : protoType(value) === 'array'
}
// 判断是否为number
function isNumber (value) {
  return protoType(value) === 'number'
}
// 判断是否为Date对象
function isDate (value) {
  return protoType(value) === 'date'
}
// 判断是否为promise对象
function isPromise (value) {
  return protoType(value) === 'promise'
}
// 去掉字符串2边空格
function trim (str = '') {
  return str !== null ? (String.prototype.trim ? String.prototype.trim.call(String(str)) : String(str).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')) : ''
}
// 数组和对象循环
function each (obj, callback) {
  if (!obj) return
  if (isArrayLike(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (callback(obj[i], i, obj) === false) {
        break
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      if (callback(obj[key], key, obj) === false) {
        break
      }
    }
  }
}
// 对象拷贝克隆，覆盖传值
function extend (...args) {
  const allowMerge = param => ['object', 'array'].includes(protoType(param));
  const deep = args[0] === true;
  let i = deep ? 1 : 0;
  let result = null;
  const merge = (a, b) => {
    if (allowMerge(b)) {
      each(b, (item, k) => {
        if (protoType(item) === 'object') {
          a[k] = (deep && protoType(a[k]) === 'object') ? a[k] : {};
          merge(a[k], item);
        } else if (protoType(item) === 'array') {
          a[k] = (deep && protoType(a[k]) === 'array') ? a[k] : [];
          merge(a[k], item);
        } else {
          a[k] = item;
        }
      });
    }
  };
  for (const l = args.length; i < l; i++) {
    if (!result && allowMerge(args[i])) {
      result = args[i];
    } else {
      merge(result, args[i]);
    }
  }
  return result
}
// 获取window和css媒体查询同步宽高
function getWindowWidth () {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}
function getWindowHeight () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
// repeat
function repeat (str, num) {
  num = parseInt(num) || 0;
  return num ? new Array(num + 2).join(String(str)) : ''
}
// padStart
function padStart (str, num, padStr) {
  return new Array(num - String(str).length + 1).join(String(padStr)) + str
}
// padEnd
function padEnd (str, num, padStr) {
  return String(str) + new Array(num - String(str).length + 1).join(String(padStr))
}

var core = /*#__PURE__*/Object.freeze({
  __proto__: null,
  noop: noop,
  inBrowser: inBrowser,
  inWeex: inWeex,
  weexPlatform: weexPlatform,
  isMobile: isMobile,
  isWeixin: isWeixin,
  isIE: isIE,
  isIE9: isIE9,
  isEdge: isEdge,
  isAndroid: isAndroid,
  isIOS: isIOS,
  isChrome: isChrome,
  isIPhone: isIPhone,
  isIPad: isIPad,
  isWebApp: isWebApp,
  hasTouch: hasTouch,
  mousedown: mousedown,
  mousemove: mousemove,
  mouseup: mouseup,
  hasOwnProp: hasOwnProp,
  protoType: protoType,
  isArrayLike: isArrayLike,
  isFunction: isFunction,
  isObject: isObject,
  isArray: isArray,
  isNumber: isNumber,
  isDate: isDate,
  isPromise: isPromise,
  trim: trim,
  each: each,
  extend: extend,
  getWindowWidth: getWindowWidth,
  getWindowHeight: getWindowHeight,
  repeat: repeat,
  padStart: padStart,
  padEnd: padEnd
});

/*
 * @Name: regExp
 * @Descripttion: 常用正则验证方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:53:33
 * @LastEditors:
 * @LastEditTime: 2019-10-17 15:39:57
 */
// 是否为整数
function isInteger (val) {
  return /^[1-9]\d*$/.test(val)
}// 是否为数字
function isNumber$1 (val) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/g.test(val)
}// 是否为正确的手机号码格式
function isPhone (val) {
  return /^1[3456789]\d{9}$/g.test(val)
}// 是否为电子邮件
function isEmail (val) {
  return (/^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.)?[A-Za-z0-9_-]+\.(com|cn)$/g.test(val))
}// 是否为带域名的链接地址
function isUrl (val) {
  return /^(https|http|ftp|rtsp|mms)/.test(val)
}// 是否为合法date
function isDate$1 (val) {
  return !/Invalid|NaN/.test(new Date(val).toString())
}function isDateISO (val) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/g.test(val)
}function isDigits (val) {
  return /^\d+$/.test(val)
}

var regExp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isInteger: isInteger,
  isNumber: isNumber$1,
  isPhone: isPhone,
  isEmail: isEmail,
  isUrl: isUrl,
  isDate: isDate$1,
  isDateISO: isDateISO,
  isDigits: isDigits
});

/*
 * @Name: base64
 * @Descripttion: base64转码
 * @Author: 无痕
 * @Date: 2019-09-23 15:48:15
 * @LastEditors:
 * @LastEditTime: 2019-10-12 15:08:26
 */
// 下面是64个基本的编码
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];

function utf16to8 (str) {
  var out, i, len, c;
  out = '';
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out
}

function utf8to16 (str) {
  var out, i, len, c;
  var char2, char3;
  out = '';
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        out += str.charAt(i - 1);
        break
      case 12:
      case 13:
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break
      case 14:
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
        break
    }
  }
  return out
}

// 编码的方法
function base64Encode (str = '') {
  str = String(str);
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += '==';
      break
    }
    c2 = str.charCodeAt(i++);
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += '=';
      break
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out
}
// 解码的方法
function base64Decode (str = '') {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = '';
  while (i < len) {
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 === -1)
    if (c1 === -1) {
      break
    }
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 === -1)
    if (c2 === -1) {
      break
    }
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 === 61) {
        return out
      }
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 === -1)
    if (c3 === -1) {
      break
    }
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 === 61) {
        return out
      }
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 === -1)
    if (c4 === -1) {
      break
    }
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out
}

var base64 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  utf16to8: utf16to8,
  utf8to16: utf8to16,
  base64Encode: base64Encode,
  base64Decode: base64Decode
});

/*
 * @Name: cookie
 * @Descripttion: 浏览器cookie封装
 * @Author: 无痕
 * @Date: 2019-09-23 15:46:54
 * @LastEditors:
 * @LastEditTime: 2019-10-21 14:09:45
 */

// 设置cookie
function setCookie (name, value, days, params = {}) {
  if (value !== undefined) {
    let expires;
    if (protoType(days) === 'number') {
      expires = new Date();
      expires.setTime(+expires + days * 864e+5);
    }
    return (document.cookie = [
      encodeURIComponent(name), '=', encodeURIComponent(value),
      expires ? '; expires=' + expires.toUTCString() : '',
      params.path ? '; path=' + params.path : '',
      params.domain ? '; domain=' + (protoType(params.domain) === 'function' ? params.domain(name) : params.domain) : '',
      params.secure ? '; secure' : ''
    ].join(''))
  }
}// 获取cookie
function getCookie (name) {
  let result;
  if (document.cookie) {
    document.cookie.split('; ').some(item => {
      let parts = item.split('=');
      let keyName = parts.shift();
      if (keyName && keyName === encodeURIComponent(name)) {
        result = decodeURIComponent(parts.join('='));
        return true
      }
    });
  }
  return result
}// 删除cookie
function removeCookie (name, params = {}) {
  setCookie(name, '', -1, params);
}// 清除全部cookie
function cleanCookie (params = {}) {
  const cookieNameList = document.cookie.match(/[^ =;]+(?=\=)/g) || [];
  cookieNameList.forEach(name => {
    removeCookie(decodeURIComponent(name), params);
  });
}

var cookie = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setCookie: setCookie,
  getCookie: getCookie,
  removeCookie: removeCookie,
  cleanCookie: cleanCookie
});

/*
 * @Name: format
 * @Descripttion: 常用格式化方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:44:58
 * @LastEditors:
 * @LastEditTime: 2019-10-17 15:44:37
 */
// 时间格式化
function formatDate (date, fmt = 'YYYY-MM-DD HH:mm') {
  if (!date) return ''
  const type = protoType(date);
  if (type !== 'date') {
    if (type === 'string') {
      if (/^\d*$/.test(date)) {
        date = new Date(parseInt(date));
      } else {
        if (!/Invalid|NaN/.test(new Date(date).toString())) {
          date = new Date(date);
        } else {
          date = new Date(date.replace(/-/g, '/'));
        }
      }
    } else if (type === 'number') {
      date = new Date(date);
    }
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  };
  const week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
  }
  Object.keys(o).forEach(k => {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('0'.repeat(RegExp.$1.length) + o[k]).substr(('' + o[k]).length)));
    }
  });
  return fmt
}// 时间段
function formatDateRange (startDateTime, endDateTime, separator = ' ~ ', startformat = 'YYYY-MM-DD HH:mm', endformat = 'YYYY-MM-DD HH:mm') {
  return (startDateTime && endDateTime) ? formatDate(startDateTime, startformat) + separator + formatDate(endDateTime, endformat) : ''
}// 格式化秒数为天,小时，分钟，秒 对象
function formatSeconds (seconds) {
  // 天数
  const d = Math.floor(seconds / (60 * 60 * 24));
  // 取模（余数）
  let modulo = seconds % (60 * 60 * 24);
  // 小时数
  const h = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  // 分钟
  const m = Math.floor(modulo / 60);
  // 秒
  const s = modulo % 60;

  return { d, h, m, s }
}// 格式化货币
function formatMoney (number, places, symbol, thousand, decimal) {
  number = number || 0;
  // 保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  // symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  symbol = symbol !== undefined ? symbol : '￥';
  // thousand表示每几位用,隔开,是货币标识
  thousand = thousand || ',';
  // decimal表示小数点
  decimal = decimal || '.';
  // negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  // i表示处理过的纯数字
  var negative = number < 0 ? '-' : '';
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
  var j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '￥1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

var format = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatDate: formatDate,
  formatDateRange: formatDateRange,
  formatSeconds: formatSeconds,
  formatMoney: formatMoney
});

/*
  小方法收集
*/

// 路径拼接
function joinPath (...args) {
  const length = args.length;
  return (length > 1 ? args.map((item, index) => {
    let path = String(item);
    if (index === 0) {
      return path.replace(/\/+$/g, '')
    } else if (index === length - 1) {
      return path.replace(/^\/+/g, '')
    } else {
      return path.replace(/^\/+|\/+$/g, '')
    }
  }) : args).join('/')
}
// 获取url参数
function getUrlParam (name, url) {
  const reg = new RegExp('(\\?|&|^)' + name + '=([^&]*)(&|$)');
  const r = (url || window.location.search).match(reg);
  return r ? unescape(r[2]) : undefined
}

// 获取根节点到匹配节点的链数组
function getMatcheds (list, childrenKey, validator, matcheds = []) {
  for (let i = 0, l = list.length; i < l; i++) {
    const item = list[i];
    if (validator(item, matcheds)) {
      matcheds.push(item);
      return matcheds
    } else if (item[childrenKey] && item[childrenKey].length) {
      const matcheds = getMatcheds(item[childrenKey], childrenKey, validator, matcheds.concat(item));
      if (matcheds) {
        return matcheds
      }
    }
  }
}

// 把手机号4位数字换为*
function privatePhone (phone) {
  return ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2')
}

// 把不规则的数据格式转换为统一的数组[{key:value}]格式
function toArrayData (data, value = 'value', label = 'label') {
  const listData = [];
  if (protoType(data) === 'object') {
    each(data, (item, k) => {
      listData.push({
        [value]: String(k),
        [label]: item
      });
    });
  } else if (protoType(data) === 'array') {
    each(data, item => {
      if (protoType(item) === 'object') {
        listData.push(JSON.parse(JSON.stringify(item)));
      } else {
        listData.push({
          [value]: String(item),
          [label]: item
        });
      }
    });
  }
  return listData
}
// 获取随机数
function getRandom (num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str
}
// 获取浏览器中最大z-index值
function getMaxZindex (selector, minZindex) {
  let nodes = null;
  selector = selector || '*';
  minZindex = Math.max(1, parseInt(minZindex) || 1);
  if (protoType(selector) === 'string') {
    nodes = document.querySelectorAll(selector);
  } else if (isArrayLike(selector)) {
    nodes = selector;
  } else if (selector instanceof HTMLElement) {
    nodes = [selector];
  }
  return Math.max.apply(null, [minZindex].concat(Array.prototype.slice.call(nodes || []).map(el => {
    return parseInt(el.style.zIndex) || 1
  })))
}
// 加载一张图片
function loadImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  })
}
// 浏览器下载blob文件流
function downloadBlob (blob, filename) {
  const a = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  a.href = href; // 创建下载的链接
  a.download = filename; // 下载后文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}

var tools = /*#__PURE__*/Object.freeze({
  __proto__: null,
  joinPath: joinPath,
  getUrlParam: getUrlParam,
  getMatcheds: getMatcheds,
  privatePhone: privatePhone,
  toArrayData: toArrayData,
  getRandom: getRandom,
  getMaxZindex: getMaxZindex,
  loadImage: loadImage,
  downloadBlob: downloadBlob
});

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// 最佳动画执行时机
function nextFrame (fn) {
  const raf = (inBrowser() && window.requestAnimationFrame) ? window.requestAnimationFrame.bind(window) : setTimeout;
  return raf(() => raf(fn, 5), 5)
}

// 判断是否支持该css3属性
function supportCss3 (styleKey) {
  const toHumb = str => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
  const preArr = ['webkit', 'Moz', 'ms', 'o'];
  const preStyleArr = [toHumb(styleKey)];
  const htmlStyle = document.documentElement.style;
  preArr.forEach(pre => preStyleArr.push(toHumb(`${pre}-${styleKey}`)));
  return preStyleArr.some(preStyle => preStyle in htmlStyle)
}
// 获取dom动画信息
function getTransitionInfo (el) {
  if (supportCss3('transition')) {
    var transition = 'transition';
    var animation = 'animation';
    var styles = window.getComputedStyle(el);
    var transitionDelays = styles[transition + 'Delay'].split(', ');
    var transitionDurations = styles[transition + 'Duration'].split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = styles[animation + 'Delay'].split(', ');
    var animationDurations = styles[animation + 'Duration'].split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);
    var type; var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? transition : animation : null;
    propCount = type ? type === transition ? transitionDurations.length : animationDurations.length : 0;
    var hasTransform = type === transition && /\b(transform|all)(,|$)/.test(styles[transition + 'Property']);
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
function whenTransitionEnds (el, callback = noop) {
  let status = true;

  const off = function () {
    status = false;
  };

  const trigger = function () {
    if (status) {
      status = false;
      callback();
    }
  };

  if (supportCss3('transition')) {
    var transition = 'transition';
    var transitionEndEvent = 'transitionend';
    var animationEndEvent = 'animationend';
    var ref = getTransitionInfo(el);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) {
      trigger();
    } else {
      var event = type === transition ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function () {
        el.removeEventListener(event, onEnd);
        trigger();
      };
      var onEnd = function (e) {
        if (e.target === el) {
          if (++ended >= propCount) {
            end();
          }
        }
      };
      setTimeout(function () {
        if (ended < propCount) {
          end();
        }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
    }
  } else {
    nextFrame(trigger);
  }

  return { off, trigger }
}

var transition = /*#__PURE__*/Object.freeze({
  __proto__: null,
  nextFrame: nextFrame,
  supportCss3: supportCss3,
  getTransitionInfo: getTransitionInfo,
  whenTransitionEnds: whenTransitionEnds
});

/*
 * @Name: Sdom7
 * @Descripttion: 一个常用dom操作方法库,Dom7简化版
 * @Author: 无痕
 * @Date: 2019-10-11 09:57:44
 * @LastEditors:
 * @LastEditTime: 2019-10-12 14:51:12
 */
function unique (arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }
  return uniqueArray
}

function toCamelCase (string) {
  return string.toLowerCase().replace(/-(.)/g, (match, group1) => group1.toUpperCase())
}

function $ (selector, context) {
  const arr = [];
  let i = 0;
  if (selector && !context) {
    if (selector instanceof Sdom7) {
      return selector
    }
  }
  if (selector) {
    // String
    if (typeof selector === 'string') {
      let els;
      let tempParent;
      const html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        let toCreate = 'div';
        if (html.indexOf('<li') === 0) toCreate = 'ul';
        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
        if (html.indexOf('<tbody') === 0) toCreate = 'table';
        if (html.indexOf('<option') === 0) toCreate = 'select';
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          if (context) {
            els = $(context).find(selector.trim());
          } else {
            els = document.querySelectorAll(selector.trim());
          }
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) arr.push(els[i]);
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Sdom7(arr)
}

class Sdom7 {
  constructor (arr) {
    const self = this;
    for (let i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    return this
  }
  find (selector) {
    const foundElements = [];
    for (let i = 0; i < this.length; i += 1) {
      const found = this[i].querySelectorAll(selector);
      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Sdom7(foundElements)
  }
  addClass (className) {
    if (typeof className === 'undefined') {
      return this
    }
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
      }
    }
    return this
  }
  removeClass (className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
      }
    }
    return this
  }
  hasClass (className) {
    if (!this[0] || className === '') return false
    return this[0].classList.contains(className)
  }
  toggleClass (className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
      }
    }
    return this
  }
  attr (attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs)
      return undefined
    }

    // Set attrs
    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (const attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this
  }
  // eslint-disable-next-line
  removeAttr (attr) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this
  }
  // eslint-disable-next-line
  prop (props, value) {
    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) return this[0][props]
    } else {
      // Set props
      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          // eslint-disable-next-line
          for (const propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }
      return this
    }
  }
  data (key, value) {
    let el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key]
        }

        const dataKey = el.getAttribute(`data-${key}`);
        if (dataKey) {
          return dataKey
        }
        return undefined
      }
      return undefined
    }

    // Set value
    for (let i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }
    return this
  }
  removeData (key) {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  }
  dataset () {
    const el = this[0];
    if (!el) return undefined
    const dataset = {}; // eslint-disable-line
    if (el.dataset) {
      // eslint-disable-next-line
      for (const dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (let i = 0; i < el.attributes.length; i += 1) {
        // eslint-disable-next-line
        const attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    // eslint-disable-next-line
    for (const key in dataset) {
      if (dataset[key] === 'false') dataset[key] = false;
      else if (dataset[key] === 'true') dataset[key] = true;
      else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
    }
    return dataset
  }
  val (value) {
    const dom = this;
    if (typeof value === 'undefined') {
      if (dom[0]) {
        if (dom[0].multiple && dom[0].nodeName.toLowerCase() === 'select') {
          const values = [];
          for (let i = 0; i < dom[0].selectedOptions.length; i += 1) {
            values.push(dom[0].selectedOptions[i].value);
          }
          return values
        }
        return dom[0].value
      }
      return undefined
    }

    for (let i = 0; i < dom.length; i += 1) {
      const el = dom[i];
      if (Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === 'select') {
        for (let j = 0; j < el.options.length; j += 1) {
          el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
        }
      } else {
        el.value = value;
      }
    }
    return dom
  }
  // Events
  on (...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }
    if (!capture) capture = false;

    function handleLiveEvent (e) {
      const target = e.target;
      if (!target) return
      const eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) listener.apply(target, eventData);
      else {
        const parents = $(target).parents(); // eslint-disable-line
        for (let k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
        }
      }
    }
    function handleEvent (e) {
      const eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    const events = eventType.split(' ');
    let j;
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
          el.dom7LiveListeners[event].push({
            listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(event, handleLiveEvent, capture);
        }
      }
    }
    return this
  }
  off (...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }
    if (!capture) capture = false;

    const events = eventType.split(' ');
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let handlers;
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (let k = handlers.length - 1; k >= 0; k -= 1) {
            const handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this
  }
  once (...args) {
    const dom = this;
    let [eventName, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventName, listener, capture] = args;
      targetSelector = undefined;
    }
    function onceHandler (...eventArgs) {
      listener.apply(this, eventArgs);
      dom.off(eventName, targetSelector, onceHandler, capture);
      if (onceHandler.dom7proxy) {
        delete onceHandler.dom7proxy;
      }
    }
    onceHandler.dom7proxy = listener;
    return dom.on(eventName, targetSelector, onceHandler, capture)
  }
  trigger (...args) {
    const events = args[0].split(' ');
    const eventData = args[1];
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let evt;
        try {
          evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this
  }
  // Sizing/Styles
  width () {
    if (this[0] === window) {
      return window.innerWidth
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'))
    }

    return null
  }
  outerWidth (includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'))
      }
      return this[0].offsetWidth
    }
    return null
  }
  height () {
    if (this[0] === window) {
      return window.innerHeight
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'))
    }

    return null
  }
  outerHeight (includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'))
      }
      return this[0].offsetHeight
    }
    return null
  }
  offset () {
    if (this.length > 0) {
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = document.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft
      }
    }

    return null
  }
  hide () {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.display = 'none';
    }
    return this
  }
  show () {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this
  }
  styles () {
    if (this[0]) return window.getComputedStyle(this[0], null)
    return {}
  }
  css (props, value) {
    let i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props)
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (let prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this
    }
    return this
  }

  // Dom manipulation
  toArray () {
    const arr = [];
    for (let i = 0; i < this.length; i += 1) {
      arr.push(this[i]);
    }
    return arr
  }
  // Iterate over the collection passing elements to `callback`
  each (callback) {
    // Don't bother continuing without a callback
    if (!callback) return this
    // Iterate over the current collection
    for (let i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this
      }
    }
    // Return `this` to allow chained DOM operations
    return this
  }
  filter (callback) {
    const matchedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
    }
    return new Sdom7(matchedItems)
  }
  map (callback) {
    const modifiedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      modifiedItems.push(callback.call(dom[i], i, dom[i]));
    }
    return new Sdom7(modifiedItems)
  }
  // eslint-disable-next-line
  html (html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this
  }
  // eslint-disable-next-line
  text (text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim()
      }
      return null
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this
  }
  is (selector) {
    const el = this[0];
    let compareWith;
    let i;
    if (!el || typeof selector === 'undefined') return false
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector)
      else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector)
      else if (el.msMatchesSelector) return el.msMatchesSelector(selector)

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true
      }
      return false
    } else if (selector === document) return el === document
    else if (selector === window) return el === window

    if (selector.nodeType || selector instanceof Sdom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true
      }
      return false
    }
    return false
  }
  indexOf (el) {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i] === el) return i
    }
    return -1
  }
  index () {
    let child = this[0];
    let i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }
      return i
    }
    return undefined
  }
  // eslint-disable-next-line
  eq (index) {
    if (typeof index === 'undefined') return this
    const length = this.length;
    let returnIndex;
    if (index > length - 1) {
      return new Sdom7([])
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) return new Sdom7([])
      return new Sdom7([this[returnIndex]])
    }
    return new Sdom7([this[index]])
  }
  append (...args) {
    let newChild;

    for (let k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (let i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Sdom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this
  }
  // eslint-disable-next-line
  appendTo (parent) {
    $(parent).append(this);
    return this
  }
  prepend (newChild) {
    let i;
    let j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Sdom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this
  }
  // eslint-disable-next-line
  prependTo (parent) {
    $(parent).prepend(this);
    return this
  }
  insertBefore (selector) {
    const before = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (let j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  }
  insertAfter (selector) {
    const after = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (let j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  }
  next (selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Sdom7([this[0].nextElementSibling])
        }
        return new Sdom7([])
      }

      if (this[0].nextElementSibling) return new Sdom7([this[0].nextElementSibling])
      return new Sdom7([])
    }
    return new Sdom7([])
  }
  nextAll (selector) {
    const nextEls = [];
    let el = this[0];
    if (!el) return new Sdom7([])
    while (el.nextElementSibling) {
      const next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) nextEls.push(next);
      } else nextEls.push(next);
      el = next;
    }
    return new Sdom7(nextEls)
  }
  prev (selector) {
    if (this.length > 0) {
      const el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Sdom7([el.previousElementSibling])
        }
        return new Sdom7([])
      }

      if (el.previousElementSibling) return new Sdom7([el.previousElementSibling])
      return new Sdom7([])
    }
    return new Sdom7([])
  }
  prevAll (selector) {
    const prevEls = [];
    let el = this[0];
    if (!el) return new Sdom7([])
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) prevEls.push(prev);
      } else prevEls.push(prev);
      el = prev;
    }
    return new Sdom7(prevEls)
  }
  siblings (selector) {
    return this.nextAll(selector).add(this.prevAll(selector))
  }
  parent (selector) {
    const parents = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents))
  }
  parents (selector) {
    const parents = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents))
  }
  closest (selector) {
    let closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Sdom7([])
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest
  }
  children (selector) {
    const children = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      const childNodes = this[i].childNodes;

      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Sdom7(unique(children))
  }
  remove () {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }
    return this
  }
  add (...args) {
    const dom = this;
    let i;
    let j;
    for (i = 0; i < args.length; i += 1) {
      const toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom
  }
  empty () {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.nodeType === 1) {
        for (let j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this
  }
}

const visible = '[S_DIALOG_VISIBLE]';
const visibleTimeOutId = '[S_DIALOG_VISIBLE_TIME_OUT_ID]';
const autoCloseTimeOutId = '[S_DIALOG_AUTO_CLOSE_TIME_OUT_ID]';
const effectControl = '[S_DIALOG_EFFECT_CONTROL]';

const inDestroy = '[S_DIALOG_IN_DESTROY]';
const isDestroy = '[S_DIALOG_IS_DESTROY]';

const nextId = '[S_DIALOG_NEXT_ID]';

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
};

class Dialog {
  constructor (params) {
    const self = this;
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
    } = self.options = extend(true, {}, dialog.defaultOptions, params);

    // 添加dom7到实例属性
    self['$'] = $;
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

    // 内部cancel关闭
    function cancel () {
      // 触发取消后生命周期钩子
      isFunction(onCancel) && onCancel.call(self);
      self.hide();
    }
    // 内部confirm关闭
    function confirm () {
      // 触发确认后生命周期钩子
      isFunction(onConfirm) && onConfirm.call(self);
      self.hide();
    }
    // 根dom节点
    let $el = $(el);
    if (!$el.length) {
      $el = $('<div class="s-dialog"></div>');
      const $wrapper = $('<div class="s-dialog-wrapper"></div>');

      // 标题
      if (title !== '') {
        $wrapper.append('<div class="s-dialog-header">' + title + '</div>');
      }
      // 内容
      if (content !== '') {
        $wrapper.append('<div class="s-dialog-content">' + content + '</div>');
      }
      // 按钮
      if (cancelText !== '' || confirmText !== '') {
        const $footer = $('<div class="s-dialog-footer"></div>');
        if (cancelText !== '') {
          $footer.append($(`<button class="${cancelClass}" style="${cancelColor ? `color:${cancelColor}` : ''}">${cancelText}</button>`).on('click', cancel));
        }
        if (confirmText !== '') {
          $footer.append($(`<button class="${confirmClass}" style="${confirmColor ? `color:${confirmColor}` : ''}">${confirmText}</button>`).on('click', confirm));
        }
        $wrapper.append($footer);
      }
      $el.append($wrapper);
    } else {
      $el = $el.eq(0);
      const instanceDialog = $el.data('s-dialog');
      if (instanceDialog) return instanceDialog
    }
    // 弹框实例添加dom节点记录
    self.el = $el.addClass(position ? ('s-dialog-position-' + position) : '')
      .addClass(effect ? 's-dialog-effect' : '')
      .addClass(className)
      .data('s-dialog', self)[0];
    // 是否显示遮罩
    if (mask) {
      self.mask = $('<div class="s-dialog-mask" style="background-color: rgba(0, 0, 0, ' + maskOpacity + ');"></div>')[0];
      // 点击遮罩是否关闭
      maskClose && $(self.mask).on('click', cancel);
      $el.prepend(self.mask);
    }
    self.wrapper = $el.find('.s-dialog-wrapper')[0];

    // 关闭 x
    if (closeBtn === true) {
      $(self.wrapper).append(self.closeBtn = $('<button class="s-btn s-dialog-close-btn"><i class="s-icon s-icon-cross"></i></button>').on('click', cancel)[0]);
    } else if (typeof closeBtn === 'string' && closeBtn) {
      $(self.wrapper).append(self.closeBtn = $(closeBtn).on('click', cancel)[0]);
    }
    // 挂载dom
    $(mountElem).eq(0).append($el);
    // 锁定touchmove滚动
    preventTouchmove && $el.on('touchmove', function (e) {
      e.preventDefault();
    });
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
            opt.lockScroll && $('html,body').addClass('s-overflow-hidden');
            $(self.el).css({
              'z-index': getMaxZindex(opt.zindexSelector, opt.zindexStart) + 1
            }).addClass('s-dialog-visible').addClass('s-dialog-effect-enter');
            // 添加内置效果
            $(self.wrapper).addClass(getPositionEffectClass(true, opt));
            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.wrapper, function () {
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
              $(self.el).removeClass('s-dialog-effect-enter');
              // 移除内置效果
              $(self.wrapper).removeClass(getPositionEffectClass(true, opt));
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
    return self
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
            $(self.el).addClass('s-dialog-effect-leave');
            // 添加内置效果
            $(self.wrapper).addClass(getPositionEffectClass(false, opt));

            // 弹框效果执行完毕,记录效果执行回掉方法控制器
            self[effectControl] = whenTransitionEnds(self.wrapper, function () {
              // 清除执行效果回调函数执行控制对象对象记录
              self[effectControl] && (self[effectControl] = null);
              // 关闭隐藏
              $(self.el).removeClass('s-dialog-visible').css({
                'z-index': ''
              }).removeClass('s-dialog-effect-leave');
              // 移除内置效果
              $(self.wrapper).removeClass(getPositionEffectClass(false, opt));
              // 解除body滚动锁定
              !$('.s-dialog.s-dialog-visible').length && $('html,body').removeClass('s-overflow-hidden');
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
    return self
  }
  // 切换
  toggle (callback) {
    return this[this[visible] ? 'hide' : 'show'](callback)
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
        $(self.el).removeClass(`s-dialog-effect s-dialog-position-${position} ${className}`).removeData('s-dialog');
        self.mask && $(self.mask).remove();
        self.closeBtn && $(self.closeBtn).remove();
        removeElem && $(self.el).remove();
        self[inDestroy] = false;
        self[isDestroy] = true;
        // 触发销毁后生命周期钩子
        isFunction(onDestroy) && onDestroy.call(self);
      };
      self[visible] ? self.hide(fn) : fn();
    }
  }
}

let instanceToast = null;

function Toast (options) {
  Toast.clear();

  const params = extend(true, {}, Toast.defaultOptions, isObject(options) ? options : { content: options });

  const { icon, image, content } = params;

  if (icon || image) {
    params.className += ' s-toast-middle';
  }

  params.content = '';

  if (icon) {
    params.content += `<i class="s-icon s-icon-${icon} s-toast-icon"></i>`;
  } else if (image) {
    params.content += `<img class="s-toast-icon" src="${image}"/>`;
  }

  if (content || content === 0) {
    params.content += `<p class="s-toast-text">${content}</p>`;
  }

  instanceToast = dialog(params).show();

  return instanceToast
}

Toast.defaultOptions = {
  className: 's-toast-dialog',
  icon: '',
  image: '',
  content: '',
  duration: 2000,
  position: '',
  mask: false,
  isOnce: true
};

Toast.success = function (options) {
  return Toast(extend(true, {
    className: 's-toast-dialog s-toast-success',
    icon: 'success'
  }, isObject(options) ? options : { content: options }))
};

Toast.fail = function (options) {
  return Toast(extend(true, {
    className: 's-toast-dialog s-toast-fail',
    icon: 'fail'
  }, isObject(options) ? options : { content: options }))
};

Toast.clear = function () {
  if (instanceToast) {
    instanceToast.destroy(true);
    instanceToast = null;
  }
};

function showLoading (options) {
  return Toast(extend(true, showLoading.defaultOptions, isObject(options) ? options : { content: options }))
}

showLoading.defaultOptions = {
  className: 's-toast-dialog s-toast-loading',
  icon: 'loading',
  effect: false,
  position: 'middle',
  duration: 0,
  preventTouchmove: true
};

function hideLoading () {
  Toast.clear();
}

var loading = /*#__PURE__*/Object.freeze({
  __proto__: null,
  showLoading: showLoading,
  hideLoading: hideLoading
});

/*
 * @Name: rem.js
 * @Descripttion: 使用rem
 * @Author: 无痕
 * @Date: 2019-09-26 11:44:03
 * @LastEditors:
 * @LastEditTime: 2019-10-08 14:54:38
 */
var useRem = (function () {
  let handler;
  return function (styleWidth) {
    if (!handler) {
      const html = document.documentElement;
      handler = function () {
        html.style.fontSize = 100 * (html.clientWidth / styleWidth) + 'px';
      };
      if (!document.addEventListener) return
      window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', handler);
      handler();
      document.addEventListener('DOMContentLoaded', handler);
    }
  }
})();

/*
 * @Name: EventEmit
 * @Descripttion: 发布订阅
 * @Author: 无痕
 * @Date: 2019-08-30 14:44:25
 * @LastEditors:
 * @LastEditTime: 2019-10-10 14:16:06
 */

const isOnce = '[S_EVENT_EMIT_IS_ONCE]';
const events = '[S_EVENT_EMIT_EVENTS]';

function addEvent (name, fn) {
  if (isFunction(fn)) {
    name = trim(name);
    if (this[isOnce]) {
      fn = (...args) => {
        this.off(name, fn);
        fn(...args);
      };
    }
    if (!this[events].hasOwnProperty(name)) {
      this[events][name] = [fn];
    } else {
      this[events][name].push(fn);
    }
  }
}

class EventEmit {
  constructor () {
    this[isOnce] = false;// 执行一次的绑定判断
    this[events] = {};// 存储函数对象
  }
  // 订阅消息
  on (...args) {
    if (isObject(args[0])) {
      each(args[0], (fn, name) => {
        addEvent.call(this, name, fn);
      });
    } else {
      addEvent.call(this, ...args);
    }
    return this
  }
  // 订阅一次消息
  once (...args) {
    this[isOnce] = true;
    this.on(...args);
    this[isOnce] = false;
    return this
  }
  // 发布消息
  emit (name, ...args) {
    name = trim(name);
    if (this[events] && this[events].hasOwnProperty(name)) {
      each(this[events][name], fn => {
        fn.call(this, ...args);
      });
    }
    return this
  }
  // 取消订阅
  off (name, fn) {
    if (arguments.length) {
      name = trim(name);
      if (this[events] && this[events].hasOwnProperty(name)) {
        if (fn !== undefined) {
          const index = this[events][name].indexOf(fn);
          index > -1 && this[events][name].splice(index, 1);
        } else {
          this[events][name] = [];
        }
        if (!this[events][name].length) {
          delete this[events][name];
        }
      }
    } else {
      this[events] = {};
    }
    return this
  }
}

/**
 * @name: 倒计秒数
 * @param {seconds:Number} 秒数
 * @param {callback:Function(seconds)} 每减一秒回掉
 * @param {complete:Function} 倒计时完后回掉
 * @return: {Object:{start:Function(seconds),stop:Function}} 返回一个对象，可暂停和启动
 */

function countDown (seconds, callback = noop, complete = noop) {
  let interval = 0;

  const handler = function () {
    if (seconds > 0) {
      callback(seconds);
      seconds--;
    } else {
      stop();
      complete();
    }
  };

  const start = function (newSeconds) {
    if (typeof newSeconds === 'number') {
      seconds = newSeconds;
    }
    stop();
    handler();
    interval = setInterval(handler, 1000);
  };

  const stop = function () {
    if (interval) {
      clearInterval(interval);
      interval = 0;
    }
  };

  start();

  return {
    start,
    stop
  }
}

/*
 * @Name: debounce
 * @Descripttion: 函数防抖
 * @Author: 无痕
 * @Date: 2019-09-23 15:56:30
 * @LastEditors:
 * @LastEditTime: 2019-10-21 14:13:18
 */

function debounce (fn, wait = 300, params) {
  let lastArgs;
  let lastThis;
  let maxWait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;
  if (!isFunction(fn)) {
    throw new TypeError('Expected a function')
  }
  if (!isNumber(wait)) {
    throw new TypeError('wait a number')
  }
  if (isObject(params)) {
    leading = !!params.leading;
    maxing = 'maxWait' in params;
    maxWait = maxing ? Math.max(Number(params.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in params ? !!params.trailing : trailing;
  }
  function invokeFunc (time) {
    var args = lastArgs;
    var thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = fn.apply(thisArg, args);
    return result
  }

  function leadingEdge (time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke (time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    var time = new Date();
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge (time) {
    timerId = undefined;
    // Only invoke if we have `lastArgs` which means `fn` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined;
    return result
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(new Date())
  }
  function debounced (...args) {
    var time = new Date();
    var isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced
}

/*
 * @Name: throttle
 * @Descripttion: 函数节流
 * @Author: 无痕
 * @Date: 2019-09-23 16:00:25
 * @LastEditors:
 * @LastEditTime: 2019-10-18 16:51:39
 */

function throttle (fn, wait = 300, params) {
  let leading = true;
  let trailing = true;
  if (!isFunction(fn)) {
    throw new TypeError('Expected a function')
  }
  if (isObject(params)) {
    leading = 'leading' in params ? !!params.leading : leading;
    trailing = 'trailing' in params ? !!params.trailing : trailing;
  }
  return debounce(fn, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  })
}

function Alert (options) {
  return new Promise((resolve, reject) => {
    const params = extend(true, {}, Alert.defaultOptions, isObject(options) ? options : { content: options });

    params.onCancel = reject;
    params.onConfirm = resolve;

    dialog(params).show();
  })
}

Alert.defaultOptions = {
  className: 's-alert-dialog',
  title: '',
  content: '',
  confirmText: '确定',
  confirmColor: '#1989fa',
  maskOpacity: 0.5,
  isOnce: true,
  preventTouchmove: true
};

function Confirm (options) {
  return Alert(extend(true, {}, Confirm.defaultOptions, isObject(options) ? options : { content: options }))
}

Confirm.defaultOptions = {
  cancelText: '取消',
  cancelColor: '#323233'
};

/*
 * @Name: sldt-utils
 * @Descripttion: 一个常用方法库
 * @Author: 无痕
 * @Date: 2019-10-14 09:14:21
 * @LastEditors:
 * @LastEditTime: 2019-10-18 10:06:12
 */

const version = '2.6.0';

var index = {
  version,
  ...core,
  ...base64,
  ...cookie,
  ...format,
  ...tools,
  ...transition,
  ...loading,
  $,
  countDown,
  useRem,
  regExp,
  eventEmit: EventEmit,
  debounce,
  throttle,
  dialog,
  toast: Toast,
  alert: Alert,
  confirm: Confirm
};

export default index;
export { $, Alert as alert, base64Decode, base64Encode, cleanCookie, Confirm as confirm, countDown, debounce, dialog, downloadBlob, each, EventEmit as eventEmit, extend, formatDate, formatDateRange, formatMoney, formatSeconds, getCookie, getMatcheds, getMaxZindex, getRandom, getTransitionInfo, getUrlParam, getWindowHeight, getWindowWidth, hasOwnProp, hasTouch, hideLoading, inBrowser, inWeex, isAndroid, isArray, isArrayLike, isChrome, isDate, isEdge, isFunction, isIE, isIE9, isIOS, isIPad, isIPhone, isMobile, isNumber, isObject, isPromise, isWebApp, isWeixin, joinPath, loadImage, mousedown, mousemove, mouseup, nextFrame, noop, padEnd, padStart, privatePhone, protoType, regExp, removeCookie, repeat, setCookie, showLoading, supportCss3, throttle, toArrayData, Toast as toast, trim, useRem, utf16to8, utf8to16, version, weexPlatform, whenTransitionEnds };
