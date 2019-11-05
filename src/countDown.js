/**
 * @name: 倒计秒数
 * @param {seconds:Number} 秒数
 * @param {callback:Function(seconds)} 每减一秒回掉
 * @param {complete:Function} 倒计时完后回掉
 * @return: {Object:{start:Function(seconds),stop:Function}} 返回一个对象，可暂停和启动
 */
import { noop } from './core';

export default function countDown (seconds, callback = noop, complete = noop) {
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
    interval = setInterval(handler, 1000);
    handler();
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
  };
}
