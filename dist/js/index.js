/*!
* sldt-utils v2.6.6
* author 无痕
* (c) Mon Oct 28 2019 10:45:20 GMT+0800 (GMT+08:00)
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.S = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  // 空方法
  function noop() {} // 设备环境

  var inBrowser = function inBrowser() {
    return typeof window !== 'undefined';
  };

  var ua = function ua() {
    return inBrowser() ? window.navigator.userAgent.toLowerCase() : '';
  };

  var isMobile = function isMobile() {
    return !!ua().match(/AppleWebKit.*Mobile.*/i);
  };
  var isWeixin = function isWeixin() {
    return ua().match(/MicroMessenger/i) === 'micromessenger';
  };
  var isIE = function isIE() {
    return /msie|trident/.test(ua());
  };
  var isIE9 = function isIE9() {
    return ua().indexOf('msie 9.0') > 0;
  };
  var isEdge = function isEdge() {
    return ua().indexOf('edge/') > 0;
  };
  var isAndroid = function isAndroid() {
    return ua().indexOf('android') > 0;
  };
  var isIOS = function isIOS() {
    return /iphone|ipad|ipod|ios/.test(ua());
  };
  var isChrome = function isChrome() {
    return /chrome\/\d+/.test(ua()) && !isEdge();
  };
  var isIPhone = function isIPhone() {
    return ua().indexOf('iphone') > -1;
  }; // 是否为iPhone或者QQHD浏览器

  var isIPad = function isIPad() {
    return ua().indexOf('ipad') > -1;
  }; // 是否iPad

  var isWebApp = function isWebApp() {
    return ua().indexOf('safari') === -1;
  }; // 是否web应该程序，没有头部与底部

  var hasTouch = function hasTouch() {
    return isMobile();
  };
  var mousedown = function mousedown() {
    return hasTouch() ? 'touchstart' : 'mousedown';
  };
  var mousemove = function mousemove() {
    return hasTouch() ? 'touchmove' : 'mousemove';
  };
  var mouseup = function mouseup() {
    return hasTouch() ? 'touchend' : 'mouseup';
  }; // 判断是否是此对象上的实例属性

  function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  } // 判断数据类型

  function protoType(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  } // 判断是否为类数组

  function isArrayLike(o) {
    return o && _typeof(o) === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296;
  } // 判断是否为function

  function isFunction(value) {
    return protoType(value) === 'function';
  } // 判断是否为object

  function isObject(value) {
    return protoType(value) === 'object';
  } // 是否为数组

  function isArray(value) {
    return protoType(value) === 'array';
  } // 判断是否为number

  function isNumber(value) {
    return protoType(value) === 'number';
  } // 判断是否为Date对象

  function isDate(value) {
    return protoType(value) === 'date';
  } // 判断是否为promise对象

  function isPromise(value) {
    return !!value && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function';
  } // 类数组转数组

  function toArray(value) {
    return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
  } // 去掉字符串2边空格

  function trim() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str !== null ? String(str).trim() : '';
  } // 数组和对象循环

  function each(obj, callback) {
    if (!obj) { return; }

    if (isArrayLike(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (callback(obj[i], i, obj) === false) {
          break;
        }
      }
    } else {
      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (callback(obj[key], key, obj) === false) {
          break;
        }
      }
    }
  } // 对象拷贝克隆，覆盖传值

  function extend() {
    var arguments$1 = arguments;

    var allowMerge = function allowMerge(param) {
      return 'object,array'.indexOf(protoType(param)) > -1;
    };

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    var deep = args[0] === true;
    var i = deep ? 1 : 0;
    var result = null;

    var merge = function merge(a, b) {
      if (allowMerge(b)) {
        each(b, function (item, k) {
          if (protoType(item) === 'object') {
            a[k] = deep && protoType(a[k]) === 'object' ? a[k] : {};
            merge(a[k], item);
          } else if (protoType(item) === 'array') {
            a[k] = deep && protoType(a[k]) === 'array' ? a[k] : [];
            merge(a[k], item);
          } else {
            a[k] = item;
          }
        });
      }
    };

    for (var l = args.length; i < l; i++) {
      if (!result && allowMerge(args[i])) {
        result = args[i];
      } else {
        merge(result, args[i]);
      }
    }

    return result;
  } // repeat

  function repeat(str, num) {
    num = parseInt(num) || 0;
    return num ? new Array(num + 2).join(String(str)) : '';
  } // padStart

  function padStart(str, num, padStr) {
    return new Array(num - String(str).length + 1).join(String(padStr)) + str;
  } // padEnd

  function padEnd(str, num, padStr) {
    return String(str) + new Array(num - String(str).length + 1).join(String(padStr));
  }

  var core = /*#__PURE__*/Object.freeze({
    __proto__: null,
    noop: noop,
    inBrowser: inBrowser,
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
    toArray: toArray,
    trim: trim,
    each: each,
    extend: extend,
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
   * @LastEditTime: 2019-10-25 15:41:44
   */
  // 是否为整数
  function isInteger(val) {
    return /^[1-9]\d*$/.test(val);
  }

  function isNumber$1(val) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/g.test(val);
  }

  function isPhone(val) {
    return /^1[3456789]\d{9}$/g.test(val);
  }

  function isEmail(val) {
    return /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.)?[A-Za-z0-9_-]+\.(com|cn)$/g.test(val);
  }

  function isUrl(val) {
    return /^(https|http|ftp|rtsp|mms)/.test(val);
  }

  function isDate$1(val) {
    return !/Invalid|NaN/.test(new Date(val).toString());
  }
  function isDateISO(val) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/g.test(val);
  }
  function isDigits(val) {
    return /^\d+$/.test(val);
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
   * @LastEditTime: 2019-10-22 15:30:26
   */
  // 下面是64个基本的编码
  var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
  function utf16to8(str) {
    var out, i, len, c;
    out = '';
    len = str.length;

    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);

      if (c >= 0x0001 && c <= 0x007F) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }

    return out;
  }
  function utf8to16(str) {
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
          break;

        case 12:
        case 13:
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
          break;

        case 14:
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;
      }
    }

    return out;
  } // 编码的方法

  function base64encode() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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
        break;
      }

      c2 = str.charCodeAt(i++);

      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += '=';
        break;
      }

      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }

    return out;
  } // 解码的方法

  function base64decode() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = '';

    while (i < len) {
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 === -1);

      if (c1 === -1) {
        break;
      }

      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 === -1);

      if (c2 === -1) {
        break;
      }

      out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);

      do {
        c3 = str.charCodeAt(i++) & 0xff;

        if (c3 === 61) {
          return out;
        }

        c3 = base64DecodeChars[c3];
      } while (i < len && c3 === -1);

      if (c3 === -1) {
        break;
      }

      out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

      do {
        c4 = str.charCodeAt(i++) & 0xff;

        if (c4 === 61) {
          return out;
        }

        c4 = base64DecodeChars[c4];
      } while (i < len && c4 === -1);

      if (c4 === -1) {
        break;
      }

      out += String.fromCharCode((c3 & 0x03) << 6 | c4);
    }

    return out;
  }

  var base64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    utf16to8: utf16to8,
    utf8to16: utf8to16,
    base64encode: base64encode,
    base64decode: base64decode
  });

  /*
   * @Name: cookie
   * @Descripttion: 浏览器cookie封装
   * @Author: 无痕
   * @Date: 2019-09-23 15:46:54
   * @LastEditors:
   * @LastEditTime: 2019-10-28 10:44:04
   */
  // 设置cookie
  function setCookie(name, value, days) {
    var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (value !== undefined) {
      var expires;

      if (typeof days === 'number') {
        expires = new Date();
        expires.setTime(+expires + days * 864e+5);
      }

      return document.cookie = [encodeURIComponent(name), '=', encodeURIComponent(value), expires ? '; expires=' + expires.toUTCString() : '', params.path ? '; path=' + params.path : '', params.domain ? '; domain=' + params.domain : '', params.secure ? '; secure' : ''].join('');
    }
  }

  function getCookie(name) {
    var result;

    if (document.cookie) {
      document.cookie.split('; ').some(function (item) {
        var parts = item.split('=');
        var keyName = parts.shift();

        if (keyName && keyName === encodeURIComponent(name)) {
          result = decodeURIComponent(parts.join('='));
          return true;
        }
      });
    }

    return result;
  }

  function removeCookie(name) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setCookie(name, '', -1, params);
  }

  function cleanCookie() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cookieNameList = document.cookie.match(/[^ =;]+(?=\=)/g) || [];
    cookieNameList.forEach(function (name) {
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
   * @LastEditTime: 2019-10-24 15:11:37
   */

  function formatDate(date) {
    var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm';
    if (!date) { return ''; }
    var type = protoType(date);

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

    var o = {
      'M+': date.getMonth() + 1,
      // 月份
      'D+': date.getDate(),
      // 日
      'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
      // 小时
      'H+': date.getHours(),
      // 小时
      'm+': date.getMinutes(),
      // 分
      's+': date.getSeconds(),
      // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3),
      // 季度
      'S+': date.getMilliseconds() // 毫秒

    };
    var week = {
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468' : '') + week[date.getDay() + '']);
    }

    Object.keys(o).forEach(function (k) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('0'.repeat(RegExp.$1.length) + o[k]).substr(('' + o[k]).length));
      }
    });
    return fmt;
  }

  function formatDateRange(startDateTime, endDateTime) {
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ~ ';
    var startformat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'YYYY-MM-DD HH:mm';
    var endformat = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'YYYY-MM-DD HH:mm';
    return startDateTime && endDateTime ? formatDate(startDateTime, startformat) + separator + formatDate(endDateTime, endformat) : '';
  }

  function formatSeconds(seconds) {
    var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd,h,m,s';
    var result = {};
    [{
      attr: 'w',
      modulo: 60 * 60 * 24 * 7
    }, {
      attr: 'd',
      modulo: 60 * 60 * 24
    }, {
      attr: 'h',
      modulo: 60 * 60
    }, {
      attr: 'm',
      modulo: 60
    }, {
      attr: 's',
      modulo: 1
    }].forEach(function (_ref) {
      var attr = _ref.attr,
          modulo = _ref.modulo;

      if (fmt.indexOf(attr) > -1) {
        result[attr] = Math.floor(seconds / modulo);
        seconds -= result[attr] * modulo;
      }
    });
    return result;
  }

  function formatMoney(number, places, symbol, thousand, decimal) {
    number = number || 0; // 保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位

    places = !isNaN(places = Math.abs(places)) ? places : 2; // symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")

    symbol = symbol !== undefined ? symbol : '￥'; // thousand表示每几位用,隔开,是货币标识

    thousand = thousand || ','; // decimal表示小数点

    decimal = decimal || '.'; // negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
    // i表示处理过的纯数字

    var negative = number < 0 ? '-' : '';
    var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '￥1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
  }

  var format = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatDate: formatDate,
    formatDateRange: formatDateRange,
    formatSeconds: formatSeconds,
    formatMoney: formatMoney
  });

  function joinPath() {
    var arguments$1 = arguments;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    var length = args.length;
    return (length > 1 ? args.map(function (item, index) {
      var path = String(item);

      if (index === 0) {
        return path.replace(/\/+$/g, '');
      } else if (index === length - 1) {
        return path.replace(/^\/+/g, '');
      } else {
        return path.replace(/^\/+|\/+$/g, '');
      }
    }) : args).join('/');
  } // 获取url参数

  function getUrlParam(name, url) {
    var reg = new RegExp('(\\?|&|^)' + name + '=([^&]*)(&|$)');
    var r = (url || window.location.search).match(reg);
    return r ? unescape(r[2]) : undefined;
  } // 获取根节点到匹配节点的链数组

  function getMatcheds(list, childrenKey, validator) {
    var matcheds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    for (var i = 0, l = list.length; i < l; i++) {
      var item = list[i];

      if (validator(item, matcheds)) {
        matcheds.push(item);
        return matcheds;
      } else if (item[childrenKey] && item[childrenKey].length) {
        var _matcheds = getMatcheds(item[childrenKey], childrenKey, validator, _matcheds.concat(item));

        if (_matcheds) {
          return _matcheds;
        }
      }
    }
  } // 把手机号4位数字换为*

  function privatePhone(phone) {
    return ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2');
  } // 把不规则的数据格式转换为统一的数组[{key:value}]格式

  function toArrayData(data) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'label';
    var listData = [];

    if (protoType(data) === 'object') {
      each(data, function (item, k) {
        var _listData$push;

        listData.push((_listData$push = {}, _defineProperty(_listData$push, value, String(k)), _defineProperty(_listData$push, label, item), _listData$push));
      });
    } else if (protoType(data) === 'array') {
      each(data, function (item) {
        if (protoType(item) === 'object') {
          listData.push(JSON.parse(JSON.stringify(item)));
        } else {
          var _listData$push2;

          listData.push((_listData$push2 = {}, _defineProperty(_listData$push2, value, String(item)), _defineProperty(_listData$push2, label, item), _listData$push2));
        }
      });
    }

    return listData;
  } // 获取随机数

  function getRandom(num) {
    var str = '';

    for (var i = 0; i < num; i++) {
      str += Math.floor(Math.random() * 10);
    }

    return str;
  } // 加载一张图片

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  } // 浏览器下载blob文件流

  function downloadBlob(blob, filename) {
    var a = document.createElement('a');
    var href = window.URL.createObjectURL(blob);
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
    loadImage: loadImage,
    downloadBlob: downloadBlob
  });

  function getElem(selector, context) {
    var arr = [];

    if (selector) {
      if (typeof selector === 'string') {
        selector = selector.trim();

        if (selector.indexOf('<') >= 0 && selector.indexOf('>') >= 0) {
          var tag = 'div';
          if (selector.indexOf('<li') === 0) { tag = 'ul'; }
          if (selector.indexOf('<tr') === 0) { tag = 'tbody'; }
          if (selector.indexOf('<td') === 0 || selector.indexOf('<th') === 0) { tag = 'tr'; }
          if (selector.indexOf('<tbody') === 0) { tag = 'table'; }
          if (selector.indexOf('<option') === 0) { tag = 'select'; }
          var el = document.createElement(tag);
          el.innerHTML = selector;
          arr = toArray(el.children);
        } else {
          arr = toArray((context || document).querySelectorAll(selector));
        }
      } else if (selector.nodeType) {
        arr = [selector];
      } else {
        arr = toArray(selector).filter(function (el) {
          return el.nodeType;
        });
      }
    }

    return arr;
  } // 添加class

  function addClass(selector, value) {
    if (value = trim(value)) {
      var classes = value.split(/\s+/g);
      getElem(selector).forEach(function (el) {
        var cur = ' ' + (el.getAttribute('class') || '').trim() + ' ';
        classes.forEach(function (cls) {
          if (cur.indexOf(' ' + cls + ' ') < 0) {
            cur += cls + ' ';
          }
        });
        el.setAttribute('class', cur.trim());
      });
    }
  } // 移除class

  function removeClass(selector, value) {
    if (value = trim(value)) {
      var classes = value.split(/\s+/g);
      getElem(selector).forEach(function (el) {
        var cur = (el.getAttribute('class') || '').trim();

        if (cur && (cur = ' ' + cur + ' ')) {
          classes.forEach(function (cls) {
            if (cur.indexOf(' ' + cls + ' ') > -1) {
              cur = cur.replace(' ' + cls + ' ', ' ');
            }
          });

          if (cur && (cur = cur.trim())) {
            el.setAttribute('class', cur);
          } else {
            el.removeAttribute('class');
          }
        }
      });
    }
  } // 获取浏览器中最大z-index值

  function getMaxZindex(selector, minZindex) {
    return Math.max.apply(null, [Math.max(1, parseInt(minZindex) || 1)].concat(getElem(selector).map(function (el) {
      return parseInt(el.style.zIndex) || 1;
    })));
  }

  var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getElem: getElem,
    addClass: addClass,
    removeClass: removeClass,
    getMaxZindex: getMaxZindex
  });

  function toMs(s) {
    return Number(s.slice(0, -1)) * 1000;
  }

  function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  } // 最佳动画执行时机


  function nextFrame(fn) {
    var raf = inBrowser() && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;
    return raf(function () {
      return raf(fn, 5);
    }, 5);
  } // 判断是否支持该css3属性

  function supportCss3(styleKey) {
    var toHumb = function toHumb(str) {
      return str.replace(/-(\w)/g, function ($0, $1) {
        return $1.toUpperCase();
      });
    };

    var preArr = ['webkit', 'Moz', 'ms', 'o'];
    var preStyleArr = [toHumb(styleKey)];
    var htmlStyle = document.documentElement.style;
    preArr.forEach(function (pre) {
      return preStyleArr.push(toHumb("".concat(pre, "-").concat(styleKey)));
    });
    return preStyleArr.some(function (preStyle) {
      return preStyle in htmlStyle;
    });
  } // 获取dom动画信息

  function getTransitionInfo(el) {
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
      var type;
      var timeout = 0;
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
      };
    } else {
      return null;
    }
  }
  /**
   * @name: dom节点动画执行完毕绑定事件为一次性绑定
   * @param el //dom节点
   * @param callback 回调函数
   * @return: { off, trigger } 2个函数处理特殊需求
   */

  function whenTransitionEnds(el) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var status = true;

    var off = function off() {
      status = false;
    };

    var trigger = function trigger() {
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

        var end = function end() {
          el.removeEventListener(event, onEnd);
          trigger();
        };

        var onEnd = function onEnd(e) {
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

    return {
      off: off,
      trigger: trigger
    };
  }

  var transition = /*#__PURE__*/Object.freeze({
    __proto__: null,
    nextFrame: nextFrame,
    supportCss3: supportCss3,
    getTransitionInfo: getTransitionInfo,
    whenTransitionEnds: whenTransitionEnds
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
    var handler;
    return function (styleWidth) {
      if (!handler) {
        var html = document.documentElement;

        handler = function handler() {
          html.style.fontSize = 100 * (html.clientWidth / styleWidth) + 'px';
        };

        if (!document.addEventListener) { return; }
        window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', handler);
        handler();
        document.addEventListener('DOMContentLoaded', handler);
      }
    };
  })();

  var isOnce = '[S_EVENT_EMIT_IS_ONCE]';
  var events = '[S_EVENT_EMIT_EVENTS]';

  function addEvent(name, _fn) {
    var _this = this;

    if (isFunction(_fn)) {
      name = trim(name);

      if (this[isOnce]) {
        _fn = function fn() {
          _this.off(name, _fn);

          _fn.apply(void 0, arguments);
        };
      }

      if (!this[events].hasOwnProperty(name)) {
        this[events][name] = [_fn];
      } else {
        this[events][name].push(_fn);
      }
    }
  }

  var EventEmit =
  /*#__PURE__*/
  function () {
    function EventEmit() {
      _classCallCheck(this, EventEmit);

      this[isOnce] = false; // 执行一次的绑定判断

      this[events] = {}; // 存储函数对象
    } // 订阅消息


    _createClass(EventEmit, [{
      key: "on",
      value: function on() {
        var arguments$1 = arguments;

        var _this2 = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments$1[_key];
        }

        if (isObject(args[0])) {
          each(args[0], function (fn, name) {
            addEvent.call(_this2, name, fn);
          });
        } else {
          addEvent.call.apply(addEvent, [this].concat(args));
        }

        return this;
      } // 订阅一次消息

    }, {
      key: "once",
      value: function once() {
        this[isOnce] = true;
        this.on.apply(this, arguments);
        this[isOnce] = false;
        return this;
      } // 发布消息

    }, {
      key: "emit",
      value: function emit(name) {
        var arguments$1 = arguments;

        var _this3 = this;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments$1[_key2];
        }

        name = trim(name);

        if (this[events] && this[events].hasOwnProperty(name)) {
          each(this[events][name], function (fn) {
            fn.call.apply(fn, [_this3].concat(args));
          });
        }

        return this;
      } // 取消订阅

    }, {
      key: "off",
      value: function off(name, fn) {
        if (arguments.length) {
          name = trim(name);

          if (this[events] && this[events].hasOwnProperty(name)) {
            if (fn !== undefined) {
              var index = this[events][name].indexOf(fn);
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

        return this;
      }
    }]);

    return EventEmit;
  }();

  /**
   * @name: 倒计秒数
   * @param {seconds:Number} 秒数
   * @param {callback:Function(seconds)} 每减一秒回掉
   * @param {complete:Function} 倒计时完后回掉
   * @return: {Object:{start:Function(seconds),stop:Function}} 返回一个对象，可暂停和启动
   */
  function countDown(seconds) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    var interval = 0;

    var handler = function handler() {
      if (seconds > 0) {
        callback(seconds);
        seconds--;
      } else {
        stop();
        complete();
      }
    };

    var start = function start(newSeconds) {
      if (typeof newSeconds === 'number') {
        seconds = newSeconds;
      }

      stop();
      handler();
      interval = setInterval(handler, 1000);
    };

    var stop = function stop() {
      if (interval) {
        clearInterval(interval);
        interval = 0;
      }
    };

    start();
    return {
      start: start,
      stop: stop
    };
  }

  /**
   * @name: 函数防抖
   * @param {fn:Function} 
   * @param {wait:Number} // 等待时间
   * @param {immediate:Boolean} //首次触发是否立即执行
   * @return: Function
   */
  function debounce (fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer = null;
    return function () {
      var arguments$1 = arguments;

      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }

      if (timer) { clearTimeout(timer); } // immediate 为 true 表示第一次触发后执行
      // timer 为空表示首次触发

      if (immediate && !timer) {
        fn.apply(this, args);
      }

      timer = setTimeout(function () {
        fn.apply(_this, args);
      }, wait);
    };
  }

  /**
   * @name: 函数节流
   * @param {fn:Function} 
   * @param {wait:Number} //多少时间内必定执行一次
   * @param {immediate:Boolean} //首次触发是否立即执行
   * @return: Function
   */
  function throttle (fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // previous 是上一次执行 fn 的时间
    // timer 是定时器
    var previous = 0,
        timer = null; // 将 throttle 处理结果当作函数返回

    return function () {
      var arguments$1 = arguments;

      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }

      // 获取当前时间，转换成时间戳，单位毫秒
      var now = +new Date(); // 判断上次触发的时间和本次触发的时间差是否小于时间间隔

      if (now - previous < wait) {
        // 如果小于，则为本次触发操作设立一个新的定时器
        // 定时器时间结束后执行函数 fn 
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(function () {
          previous = now;
          fn.apply(_this, args);
        }, wait);
      } else {
        // 时间间隔超出了设定的时间间隔，执行函数 fn
        // previous为0则表示第一次执行，immediate为true则表示第一次立即执行，
        if (previous || immediate) {
          fn.apply(this, args);
        }

        previous = now;
      }
    };
  }

  var instance = '[S_DIALOG_INSTANCE]';
  var visible = '[S_DIALOG_VISIBLE]';
  var visibleTimeOutId = '[S_DIALOG_VISIBLE_TIME_OUT_ID]';
  var autoCloseTimeOutId = '[S_DIALOG_AUTO_CLOSE_TIME_OUT_ID]';
  var effectControl = '[S_DIALOG_EFFECT_CONTROL]';
  var inDestroy = '[S_DIALOG_IN_DESTROY]';
  var isDestroy = '[S_DIALOG_IS_DESTROY]';
  var nextId = '[S_DIALOG_NEXT_ID]';

  function dialog(options) {
    return new Dialog(options);
  } // 默认参数


  dialog.defaultOptions = {
    el: null,
    // 与dom节点建立联系，为dom节点对象，设此属性后，不会重新构建dom，实例属性el也将等于此dom节点
    className: '',
    // 弹框class
    effect: true,
    // 是否使用过渡效果
    position: 'middle',
    // 弹框显示位置
    mountElem: 'body',
    // 弹框挂载的容器，为空则不会挂载
    closeBtn: false,
    // 关闭x,(String,Boolean),为ture则使用内置html字符串，为字符串则使用字符串html
    title: '',
    // 标题
    content: '',
    // 字符串html内容
    cancelClass: 's-btn s-dialog-cancel-btn',
    // 取消按钮class
    cancelText: '',
    // 取消按钮文字
    cancelColor: '',
    // 取消按钮颜色
    confirmClass: 's-btn s-dialog-confirm-btn',
    // 确认按钮class
    confirmText: '',
    // 确认按钮文字
    confirmColor: '',
    // 确认按钮颜色
    isOnce: false,
    // 是否为一次性弹框，关闭后立即销毁，并删除dom
    zindexSelector: '.s-dialog.s-dialog-visible',
    // z-index层级比较选择器
    zindexStart: 2000,
    // z-index初始值
    mask: true,
    // 是否显示遮罩
    maskOpacity: 0.7,
    // 遮罩透明度
    maskClose: true,
    // 点击遮罩是否关闭弹框
    lockScroll: true,
    // 是否阻止外层滚动,
    duration: 0,
    // 自动关闭时间,number
    preventTouchmove: false,
    // 是否阻止弹层touchmove滚动，手机上滚动穿透
    // 生命周期
    onInit: undefined,
    // 初始化
    onShow: undefined,
    // 显示后
    onHide: undefined,
    // 关闭后
    onCancel: undefined,
    // 点击遮罩，取消按钮关闭时
    onConfirm: undefined,
    // 点击确认按钮关闭时
    onBeforeShow: undefined,
    // 显示时拦截钩子,参数为next()可异步阻止显示
    onBeforeHide: undefined,
    // 隐藏时拦截钩子,参数为next()可异步阻止关闭
    onBeforeDestroy: undefined,
    // 销毁前
    onDestroy: undefined // 销毁后

  };

  var Dialog =
  /*#__PURE__*/
  function () {
    function Dialog(params) {
      _classCallCheck(this, Dialog);

      var self = this;

      var _self$options = self.options = extend({}, dialog.defaultOptions, params),
          el = _self$options.el,
          className = _self$options.className,
          effect = _self$options.effect,
          position = _self$options.position,
          mountElem = _self$options.mountElem,
          closeBtn = _self$options.closeBtn,
          title = _self$options.title,
          content = _self$options.content,
          cancelText = _self$options.cancelText,
          cancelClass = _self$options.cancelClass,
          cancelColor = _self$options.cancelColor,
          confirmText = _self$options.confirmText,
          confirmClass = _self$options.confirmClass,
          confirmColor = _self$options.confirmColor,
          mask = _self$options.mask,
          maskOpacity = _self$options.maskOpacity,
          maskClose = _self$options.maskClose,
          preventTouchmove = _self$options.preventTouchmove,
          onInit = _self$options.onInit,
          onCancel = _self$options.onCancel,
          onConfirm = _self$options.onConfirm; // 弹框显示状态


      self[visible] = false; // 弹框显示隐藏定时器,防止多次显示，隐藏同步切换

      self[visibleTimeOutId] = 0; // 弹框自动关闭定时器

      self[autoCloseTimeOutId] = 0; // 记录动画效果执行完毕回调处理函数执行与否的操作对象

      self[effectControl] = null; // 判断是否在执行销毁中

      self[inDestroy] = false; // 判断是否执行过销毁

      self[isDestroy] = false; // 内部cancel关闭

      function cancel() {
        // 触发取消后生命周期钩子
        isFunction(onCancel) && onCancel.call(self);
        self.hide();
      } // 内部confirm关闭


      function confirm() {
        // 触发确认后生命周期钩子
        isFunction(onConfirm) && onConfirm.call(self);
        self.hide();
      } // 根dom节点


      var elem = getElem(el)[0];

      if (!elem) {
        elem = getElem('<div class="s-dialog"></div>')[0];
        var _wrapper = getElem('<div class="s-dialog-wrapper"></div>')[0]; // 标题

        if (title !== '') {
          _wrapper.appendChild(getElem('<div class="s-dialog-header">' + title + '</div>')[0]);
        } // 内容


        if (content !== '') {
          _wrapper.appendChild(getElem('<div class="s-dialog-content">' + content + '</div>')[0]);
        } // 按钮


        if (cancelText !== '' || confirmText !== '') {
          var footer = getElem('<div class="s-dialog-footer"></div>')[0];

          if (cancelText !== '') {
            var cancelBtn = getElem("<button class=\"".concat(cancelClass, "\" style=\"").concat(cancelColor ? "color:".concat(cancelColor) : '', "\">").concat(cancelText, "</button>"))[0];
            cancelBtn.addEventListener('click', cancel);
            footer.appendChild(cancelBtn);
          }

          if (confirmText !== '') {
            var confirmBtn = getElem("<button class=\"".concat(confirmClass, "\" style=\"").concat(confirmColor ? "color:".concat(confirmColor) : '', "\">").concat(confirmText, "</button>"))[0];
            confirmBtn.addEventListener('click', confirm);
            footer.appendChild(confirmBtn);
          }

          _wrapper.appendChild(footer);
        }

        elem.appendChild(_wrapper);
      } else {
        if (elem[instance]) { return elem[instance]; }
      }

      addClass(elem, position ? 's-dialog-position-' + position : '');
      addClass(elem, effect ? 's-dialog-effect' : '');
      addClass(elem, className);
      elem[instance] = self; // 锁定touchmove滚动

      preventTouchmove && elem.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }); // 弹框实例添加dom节点记录

      self.el = elem; // 是否显示遮罩

      if (mask) {
        self.mask = getElem('<div class="s-dialog-mask" style="background-color: rgba(0, 0, 0, ' + maskOpacity + ');"></div>')[0]; // 点击遮罩是否关闭

        maskClose && self.mask.addEventListener('click', cancel);
        self.mask.addEventListener('touchmove', function (e) {
          e.preventDefault();
        });
        elem.insertBefore(self.mask, elem.firstElementChild);
      }

      var wrapper = getElem('.s-dialog-wrapper', elem)[0]; // 关闭 x

      if (closeBtn === true) {
        self.closeBtn = getElem('<button class="s-btn s-dialog-close-btn"><i class="s-icon-close"></i></button>')[0];
      } else if (typeof closeBtn === 'string' && closeBtn) {
        self.closeBtn = getElem(closeBtn)[0];
      }

      if (wrapper) {
        self.wrapper = wrapper;

        if (self.closeBtn) {
          self.closeBtn.addEventListener('click', cancel);
          wrapper.appendChild(self.closeBtn);
        }
      } // 挂载dom


      var mountNode = getElem(mountElem)[0];
      mountNode && mountNode.appendChild(elem); // 触发初始化后生命周期钩子

      isFunction(onInit) && onInit.call(self);
    } // 显示


    _createClass(Dialog, [{
      key: "show",
      value: function show(callback) {
        var self = this;
        var opt = self.options; // 清除弹框显示隐藏记录

        clearTimeout(self[visibleTimeOutId]);
        self[visibleTimeOutId] = setTimeout(function () {
          if (!self[visible]) {
            // 判断是否有上次未执行完的效果回调，如有，则立即执行
            self[effectControl] && self[effectControl].trigger();

            var next = function next() {
              // 判断是否是最新的next调用，不是则作废
              if (next[nextId] === self[visibleTimeOutId]) {
                self[visible] = true; // 锁定外层滚动

                opt.lockScroll && addClass('body', 's-overflow-hidden'); // z-index层级设置

                self.el.style.zIndex = getMaxZindex(opt.zindexSelector, opt.zindexStart) + 1; // 显示

                addClass(self.el, 's-dialog-visible s-dialog-effect-enter'); // 弹框效果执行完毕,记录效果执行回掉方法控制器

                self[effectControl] = whenTransitionEnds(self.el, function () {
                  // 清除执行效果回调函数执行控制对象对象记录
                  self[effectControl] && (self[effectControl] = null); // 自动关闭

                  var duration = parseInt(opt.duration);

                  if (duration > 0) {
                    clearTimeout(self[autoCloseTimeOutId]);
                    self[autoCloseTimeOutId] = setTimeout(function () {
                      self[visible] && self.hide();
                    }, duration);
                  } // 移除效果class


                  removeClass(self.el, 's-dialog-effect-enter'); // 触发参数回掉

                  isFunction(callback) && callback.call(self); // 触发显示后生命周期钩子

                  isFunction(opt.onShow) && opt.onShow.call(self);
                });
              }
            }; // 记录本次执行的nextId


            next[nextId] = self[visibleTimeOutId]; // 触发显示前生命周期钩子

            if (isFunction(opt.onBeforeShow)) {
              opt.onBeforeShow.call(self, next);
            } else {
              next();
            }
          }
        });
        return self;
      } // 隐藏

    }, {
      key: "hide",
      value: function hide(callback) {
        var self = this;
        var opt = self.options; // 清除弹框显示隐藏记录

        clearTimeout(self[visibleTimeOutId]);
        self[visibleTimeOutId] = setTimeout(function () {
          if (self[visible]) {
            // 判断是否有上次未执行完的效果回调，如有，则立即执行
            self[effectControl] && self[effectControl].trigger();

            var next = function next() {
              // 判断是否是最新的next调用，不是则作废
              if (next[nextId] === self[visibleTimeOutId]) {
                self[visible] = false; // 清除自动关闭定时器

                clearTimeout(self[autoCloseTimeOutId]); // 开始执行效果

                addClass(self.el, 's-dialog-effect-leave'); // 弹框效果执行完毕,记录效果执行回掉方法控制器

                self[effectControl] = whenTransitionEnds(self.el, function () {
                  // 清除执行效果回调函数执行控制对象对象记录
                  self[effectControl] && (self[effectControl] = null); // 关闭隐藏

                  removeClass(self.el, 's-dialog-visible s-dialog-effect-leave');
                  self.el.style.zIndex = ''; // 解除body滚动锁定

                  !getElem('.s-dialog.s-dialog-visible').length && removeClass('body', 's-overflow-hidden'); // 触发参数回掉

                  isFunction(callback) && callback.call(self); // 触发隐藏后生命周期钩子

                  isFunction(opt.onHide) && opt.onHide.call(self); // 是否为一次性弹框，关闭后立即销毁，并删除dom

                  opt.isOnce && self.destroy(true);
                }); // 如果是在销毁中则立即触发移除效果关闭处理

                if (self[inDestroy]) {
                  self[effectControl].trigger();
                }
              }
            }; // 记录本次执行的nextId


            next[nextId] = self[visibleTimeOutId]; // 触发隐藏前生命周期钩子

            if (isFunction(opt.onBeforeHide)) {
              opt.onBeforeHide.call(self, next);
            } else {
              next();
            }
          }
        });
        return self;
      } // 切换

    }, {
      key: "toggle",
      value: function toggle(callback) {
        return this[this[visible] ? 'hide' : 'show'](callback);
      } // 销毁

    }, {
      key: "destroy",
      value: function destroy() {
        var removeElem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var self = this;
        var _self$options2 = self.options,
            className = _self$options2.className,
            position = _self$options2.position,
            onBeforeDestroy = _self$options2.onBeforeDestroy,
            onDestroy = _self$options2.onDestroy;

        if (!self[inDestroy] && !self[isDestroy]) {
          self[inDestroy] = true; // 触发销毁前生命周期钩子

          isFunction(onBeforeDestroy) && onBeforeDestroy.call(self);

          var fn = function fn() {
            clearTimeout(self[visibleTimeOutId]);
            clearTimeout(self[autoCloseTimeOutId]);
            removeClass(self.el, "s-dialog-effect s-dialog-position-".concat(position, " ").concat(className));
            delete self.el[instance];
            self.mask && self.mask.parentNode.removeChild(self.mask);
            self.closeBtn && self.closeBtn.parentNode.removeChild(self.closeBtn);
            removeElem && self.el.parentNode.removeChild(self.el);
            self[inDestroy] = false;
            self[isDestroy] = true; // 触发销毁后生命周期钩子

            isFunction(onDestroy) && onDestroy.call(self);
          };

          self[visible] ? self.hide(fn) : fn();
        }
      }
    }]);

    return Dialog;
  }();

  var instanceToast = null;

  function Toast(options) {
    Toast.clear();
    options = isObject(options) ? options : {
      message: options
    };
    var type = trim(options.type);
    var params = extend({}, Toast.defaultOptions, Toast[type] && Toast[type].defaultOptions, options);
    var icon = params.icon,
        message = params.message;

    if (type) {
      params.className += " s-toast-".concat(type);
    }

    params.content = '';

    if (typeof icon === 'string' && (icon = trim(icon))) {
      params.className += ' s-toast-middle';

      if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(icon) || icon.indexOf('data:image/') > -1) {
        params.content += "<img class=\"s-toast-icon\" src=\"".concat(icon, "\"/>");
      } else {
        params.content += "<i class=\"".concat(icon, " s-toast-icon\"></i>");
      }
    }

    if (message || message === 0) {
      params.content += "<p class=\"s-toast-text\">".concat(message, "</p>");
    }

    instanceToast = dialog(params).show();
    return instanceToast;
  }

  Toast.defaultOptions = {
    className: 's-toast-dialog',
    icon: '',
    message: '',
    duration: 2000,
    position: '',
    mask: false,
    isOnce: true
  };
  [{
    type: 'success',
    options: {
      icon: 's-icon-success'
    }
  }, {
    type: 'fail',
    options: {
      icon: 's-icon-fail'
    }
  }, {
    type: 'loading',
    options: {
      icon: 's-icon-loading-circular',
      effect: false,
      position: 'middle',
      duration: 0,
      preventTouchmove: true
    }
  }].forEach(function (_ref) {
    var type = _ref.type,
        options = _ref.options;

    Toast[type] = function (options) {
      return Toast(extend({
        type: type
      }, isObject(options) ? options : {
        message: options
      }));
    };

    Toast[type].defaultOptions = options;
  });

  Toast.clear = function () {
    if (instanceToast) {
      instanceToast.destroy(true);
      instanceToast = null;
    }
  };

  function Alert(options) {
    return new Promise(function (resolve, reject) {
      var params = extend({}, Alert.defaultOptions, isObject(options) ? options : {
        content: options
      });
      params.onCancel = reject;
      params.onConfirm = resolve;
      dialog(params).show();
    });
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

  function Confirm(options) {
    return Alert(extend({}, Confirm.defaultOptions, isObject(options) ? options : {
      content: options
    }));
  }

  Confirm.defaultOptions = {
    cancelText: '取消',
    cancelColor: '#323233'
  };

  var version = '2.6.6';
  var index = _objectSpread2({
    version: version
  }, core, {}, base64, {}, cookie, {}, format, {}, tools, {}, transition, {}, dom, {
    countDown: countDown,
    useRem: useRem,
    regExp: regExp,
    eventEmit: EventEmit,
    debounce: debounce,
    throttle: throttle,
    dialog: dialog,
    toast: Toast,
    alert: Alert,
    confirm: Confirm
  });

  exports.addClass = addClass;
  exports.alert = Alert;
  exports.base64decode = base64decode;
  exports.base64encode = base64encode;
  exports.cleanCookie = cleanCookie;
  exports.confirm = Confirm;
  exports.countDown = countDown;
  exports.debounce = debounce;
  exports.default = index;
  exports.dialog = dialog;
  exports.downloadBlob = downloadBlob;
  exports.each = each;
  exports.eventEmit = EventEmit;
  exports.extend = extend;
  exports.formatDate = formatDate;
  exports.formatDateRange = formatDateRange;
  exports.formatMoney = formatMoney;
  exports.formatSeconds = formatSeconds;
  exports.getCookie = getCookie;
  exports.getElem = getElem;
  exports.getMatcheds = getMatcheds;
  exports.getMaxZindex = getMaxZindex;
  exports.getRandom = getRandom;
  exports.getTransitionInfo = getTransitionInfo;
  exports.getUrlParam = getUrlParam;
  exports.hasOwnProp = hasOwnProp;
  exports.hasTouch = hasTouch;
  exports.inBrowser = inBrowser;
  exports.isAndroid = isAndroid;
  exports.isArray = isArray;
  exports.isArrayLike = isArrayLike;
  exports.isChrome = isChrome;
  exports.isDate = isDate;
  exports.isEdge = isEdge;
  exports.isFunction = isFunction;
  exports.isIE = isIE;
  exports.isIE9 = isIE9;
  exports.isIOS = isIOS;
  exports.isIPad = isIPad;
  exports.isIPhone = isIPhone;
  exports.isMobile = isMobile;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isPromise = isPromise;
  exports.isWebApp = isWebApp;
  exports.isWeixin = isWeixin;
  exports.joinPath = joinPath;
  exports.loadImage = loadImage;
  exports.mousedown = mousedown;
  exports.mousemove = mousemove;
  exports.mouseup = mouseup;
  exports.nextFrame = nextFrame;
  exports.noop = noop;
  exports.padEnd = padEnd;
  exports.padStart = padStart;
  exports.privatePhone = privatePhone;
  exports.protoType = protoType;
  exports.regExp = regExp;
  exports.removeClass = removeClass;
  exports.removeCookie = removeCookie;
  exports.repeat = repeat;
  exports.setCookie = setCookie;
  exports.supportCss3 = supportCss3;
  exports.throttle = throttle;
  exports.toArray = toArray;
  exports.toArrayData = toArrayData;
  exports.toast = Toast;
  exports.trim = trim;
  exports.useRem = useRem;
  exports.utf16to8 = utf16to8;
  exports.utf8to16 = utf8to16;
  exports.version = version;
  exports.whenTransitionEnds = whenTransitionEnds;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
