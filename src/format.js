/*
 * @Name: format
 * @Descripttion: 常用格式化方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:44:58
 * @LastEditors:
 * @LastEditTime: 2019-11-07 17:27:19
 */
import { toDate } from './core';

// 时间格式化
export function formatDate (date, fmt = 'YYYY-MM-DD HH:mm') {
  if (!(date = toDate(date))) return '';
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
  return fmt;
}
// 时间段
export function formatDateRange (startDateTime, endDateTime, separator = ' ~ ', startformat = 'YYYY-MM-DD HH:mm', endformat = 'YYYY-MM-DD HH:mm') {
  return (startDateTime && endDateTime) ? formatDate(startDateTime, startformat) + separator + formatDate(endDateTime, endformat) : '';
}
// 格式化秒数为周，天,小时，分钟，秒 对象,return {d,h,m,s}
export function formatSeconds (seconds, fmt = 'd,h,m,s') {
  const result = {};
  [
    { attr: 'w', modulo: 60 * 60 * 24 * 7 },
    { attr: 'd', modulo: 60 * 60 * 24 },
    { attr: 'h', modulo: 60 * 60 },
    { attr: 'm', modulo: 60 },
    { attr: 's', modulo: 1 }
  ].forEach(({ attr, modulo }) => {
    if (fmt.indexOf(attr) > -1) {
      result[attr] = Math.floor(seconds / modulo);
      seconds -= result[attr] * modulo;
    }
  });
  return result;
}

// 格式化时间差，默认与当前时间相比
export function formatDiffTime (date, now, maxDays, nowStr) {
  now = now || new Date();
  maxDays = maxDays || 7;
  nowStr = nowStr || '刚刚';

  if (!(date = toDate(date))) return '';
  if (!(now = toDate(now))) return '';

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff === 0) return nowStr;
  const suffix = diff > 0 ? '前' : '后';
  const { d, h, m, s } = formatSeconds(Math.abs(diff));
  if (d > maxDays) {
    return formatDate(date, 'YYYY-MM-DD');
  } if (d) {
    return d + `天${suffix}`;
  } else if (h) {
    return h + `小时${suffix}`;
  } else if (m) {
    return m + `分钟${suffix}`;
  } else if (s) {
    return s + `秒${suffix}`;
  }
}

/**
 * @name: // 格式化货币
 * @param {number Number}  货币数字
 * @param {places Number}  保留的小位数,2
 * @param {symbol String}  货币符号：'￥'
 * @param {thousand String} 用啥隔开：','
 * @param {decimal String} 表示小数点:'.'
 * @return: String
 */
export function formatMoney (number, places, symbol, thousand, decimal) {
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
  const negative = number < 0 ? '-' : '';
  const i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
  const j = i.length > 3 ? i.length % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
}
