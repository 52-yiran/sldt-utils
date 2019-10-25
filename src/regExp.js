/*
 * @Name: regExp
 * @Descripttion: 常用正则验证方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:53:33
 * @LastEditors:
 * @LastEditTime: 2019-10-25 15:41:44
 */
// 是否为整数
export function isInteger (val) {
  return /^[1-9]\d*$/.test(val)
};
// 是否为数字
export function isNumber (val) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/g.test(val)
};
// 是否为正确的手机号码格式
export function isPhone (val) {
  return /^1[3456789]\d{9}$/g.test(val)
};
// 是否为电子邮件
export function isEmail (val) {
  return /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.)?[A-Za-z0-9_-]+\.(com|cn)$/g.test(val)
};
// 是否为带域名的链接地址
export function isUrl (val) {
  return /^(https|http|ftp|rtsp|mms)/.test(val)
};
// 是否为合法date
export function isDate (val) {
  return !/Invalid|NaN/.test(new Date(val).toString())
};
export function isDateISO (val) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/g.test(val)
};
export function isDigits (val) {
  return /^\d+$/.test(val)
};
