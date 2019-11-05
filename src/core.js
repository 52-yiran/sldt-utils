// 空方法
export function noop () { }
// 设备环境
export const inBrowser = () => typeof window !== 'undefined';

const ua = () => inBrowser() ? window.navigator.userAgent.toLowerCase() : '';

export const isMobile = () => !!ua().match(/AppleWebKit.*Mobile.*/i);
export const isWeixin = () => ua().match(/MicroMessenger/i) === 'micromessenger';
export const isIE = () => /msie|trident/.test(ua());
export const isIE9 = () => ua().indexOf('msie 9.0') > 0;
export const isEdge = () => ua().indexOf('edge/') > 0;
export const isAndroid = () => (ua().indexOf('android') > 0);
export const isIOS = () => (/iphone|ipad|ipod|ios/.test(ua()));
export const isChrome = () => /chrome\/\d+/.test(ua()) && !isEdge();
export const isIPhone = () => ua().indexOf('iphone') > -1; // 是否为iPhone或者QQHD浏览器
export const isIPad = () => ua().indexOf('ipad') > -1; // 是否iPad
export const isWebApp = () => ua().indexOf('safari') === -1; // 是否web应该程序，没有头部与底部
export const hasTouch = () => isMobile();
export const mousedown = () => hasTouch() ? 'touchstart' : 'mousedown';
export const mousemove = () => hasTouch() ? 'touchmove' : 'mousemove';
export const mouseup = () => hasTouch() ? 'touchend' : 'mouseup';

// 判断是否是此对象上的实例属性
export function hasOwnProp (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
// 判断数据类型
export function protoType (value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
// 判断是否为类数组
export function isArrayLike (o) {
  return o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296;
}
// 判断是否为function
export function isFunction (value) {
  return protoType(value) === 'function';
}
// 判断是否为object
export function isObject (value) {
  return protoType(value) === 'object';
}
// 是否为数组
export function isArray (value) {
  return protoType(value) === 'array';
}
// 判断是否为number
export function isNumber (value) {
  return protoType(value) === 'number';
}
// 是否为合法date对象
export function isDate (val) {
  return !/Invalid|NaN/.test(new Date(val).toString());
}
// 判断是否为promise对象
export function isPromise (value) {
  return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}
// 类数组转数组
export function toArray (value) {
  return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
}
// 转合法date对象
export function toDate (date) {
  if (!date) return;
  const type = protoType(date);
  if (type !== 'date') {
    if (type === 'string') {
      if (/^\d*$/.test(date)) {
        date = new Date(Number(date));
      } else {
        const newDate = date.replace(/-/g, '/');
        if (isDate(newDate)) {
          date = new Date(newDate);
        } else {
          date = new Date(date);
        }
      }
    } else if (type === 'number') {
      date = new Date(date);
    }
  }
  if (isDate(date)) {
    return date;
  }
}
// 去掉字符串2边空格
export function trim (str = '') {
  return str !== null ? String(str).trim() : '';
}
// 数组和对象循环
export function each (obj, callback) {
  if (!obj) return;
  if (isArrayLike(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      if (callback(obj[key], key, obj) === false) {
        break;
      }
    }
  }
}
// 对象拷贝克隆，覆盖传值
export function extend (...args) {
  const allowMerge = param => 'object,array'.indexOf(protoType(param)) > -1;
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
  return result;
}
// repeat
export function repeat (str, num) {
  num = parseInt(num) || 0;
  return num ? new Array(num + 2).join(String(str)) : '';
}
// padStart
export function padStart (str, num, padStr) {
  return new Array(num - String(str).length + 1).join(String(padStr)) + str;
}
// padEnd
export function padEnd (str, num, padStr) {
  return String(str) + new Array(num - String(str).length + 1).join(String(padStr));
}
