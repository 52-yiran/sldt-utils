/*
 * @Name: regExp
 * @Descripttion: 常用正则验证方法
 * @Author: 无痕
 * @Date: 2019-09-23 15:53:33
 * @LastEditors:
 * @LastEditTime: 2019-11-05 16:34:28
 */
// 是否为整数
export function isInteger (val) {
  return /^[1-9]\d*$/.test(val);
}
// 是否为正确的手机号码格式
export function isPhone (val) {
  return /^1[3456789]\d{9}$/g.test(val);
}
// 是否为电子邮箱
export function isEmail (val) {
  return /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.)?[A-Za-z0-9_-]+\.(com|cn)$/g.test(val);
}
// 是否为带域名的链接地址
export function isUrl (val) {
  return /^(https|http|ftp|rtsp|mms)/.test(val);
}
// 是否为有效的身份证号码
export function isIdCard (idCard) {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if ((idCard = String(idCard)) && regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      // 将前17位加权因子保存在数组里
      const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      // 用来保存前17位各自乖以加权因子后的总和
      let idCardWiSum = 0;
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      const idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17);//得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast == 'X' || idCardLast == 'x') {
          return true;
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        }
      }
    }
  }
  return false;
}