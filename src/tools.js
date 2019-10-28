/*
  小方法收集
*/
import { protoType, each } from './core';

// 路径拼接
export function joinPath (...args) {
  const length = args.length;
  return (length > 1 ? args.map((item, index) => {
    let path = String(item);
    if (index === 0) {
      return path.replace(/\/+$/g, '');
    } else if (index === length - 1) {
      return path.replace(/^\/+/g, '');
    } else {
      return path.replace(/^\/+|\/+$/g, '');
    }
  }) : args).join('/');
}

// 获取url参数
export function getUrlParam (name, url) {
  const reg = new RegExp('(\\?|&|^)' + name + '=([^&]*)(&|$)');
  const r = (url || window.location.search).match(reg);
  return r ? unescape(r[2]) : undefined;
}

// 获取根节点到匹配节点的链数组
export function getMatcheds (list, childrenKey, validator, matcheds = []) {
  for (let i = 0, l = list.length; i < l; i++) {
    const item = list[i];
    if (validator(item, matcheds)) {
      matcheds.push(item);
      return matcheds;
    } else if (item[childrenKey] && item[childrenKey].length) {
      const matcheds = getMatcheds(item[childrenKey], childrenKey, validator, matcheds.concat(item));
      if (matcheds) {
        return matcheds;
      }
    }
  }
}

// 把手机号4位数字换为*
export function privatePhone (phone) {
  return ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2');
}

// 把不规则的数据格式转换为统一的数组[{key:value}]格式
export function toArrayData (data, value = 'value', label = 'label') {
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
  return listData;
}

// 获取随机数
export function getRandom (num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

// 加载一张图片
export function loadImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

// 浏览器下载blob文件流
export function downloadBlob (blob, filename) {
  const a = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  a.href = href; // 创建下载的链接
  a.download = filename; // 下载后文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}
