/**
 * @name: 函数节流
 * @param {fn:Function} 
 * @param {wait:Number} //多少时间内必定执行一次
 * @param {immediate:Boolean} //首次触发是否立即执行
 * @return: Function
 */
export default function (fn, wait = 300, immediate = false) {
  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0, timer = null;
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date();
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
    if (now - previous < wait) {
      // 如果小于，则为本次触发操作设立一个新的定时器
      // 定时器时间结束后执行函数 fn 
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fn.apply(this, args);
      }, wait);
    } else {// 时间间隔超出了设定的时间间隔，执行函数 fn
      // previous为0则表示第一次执行，immediate为true则表示第一次立即执行，
      if (previous || immediate) {
        fn.apply(this, args);
      }
      previous = now;
    }
  };
}
