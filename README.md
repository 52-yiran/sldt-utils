# sldt-utils

## 引入方式
#### 1. npm 引入
```
npm i sldt-utils -S

import 'sldt-utils/dist/css/index.min.css'
import * as S from 'sldt-utils'

//引入src下源文件
import * as S from 'sldt-utils/src'
```
#### 2. umd静态引入 全局变量为S
```
dist/css/index.min.css
dist/js/index.min.js
```

## *环境浏览器判断方法 以下均为Function*
```
isMobile,isWeixin,isIE,isIE9,isEdge,isAndroid,isIOS,isChrome,isIPhone,isIPad,isWebApp,hasTouch，
```

## *数据类型判断*
```
S.protoType (value)  //获取数据类型//string,number,array,object

S.isArrayLike(value)//判断是否为类数组
S.isFunction(value)//判断是否为方法
S.isObject(value)//判断是否为对象
S.isArray(value)//判断是否为数组
S.isPromise(value)//判断是否为Promise
```

## *S.extend 深拷贝*
```
S.extend(obj,{})//深拷贝,return obj;
S.extend(true,obj,{})//深度拷贝合并,return obj;
```

## *S.toDate 转合法date日期时间对象*
```
S.toDate (Date对象|字符串时间|时间戳|字符串时间戳) 如果是能转成合法date,则返回date对象,否则返回undefined;
```

## *S.formatDate 时间格式化*
```
S.formatDate (date, fmt = 'YYYY-MM-DD HH:mm')
```

## *S.formatDateRange 时间段*
```
S.formatDateRange (startDateTime, endDateTime, separator = ' ~ ', startformat = 'YYYY-MM-DD HH:mm', endformat = 'YYYY-MM-DD HH:mm')
```

## *S.formatSeconds 格式化倒计时秒数为周,天,小时，分钟，秒 对象*
```
S.formatSeconds (seconds,fmt='d,h,m,s') //fmt全部参数'w,d,h,m,s',返回fmt{ d, h, m, s }
```

## *S.formatDiffTime 格式化时间差，默认与当前时间相比*
```
S.formatDiffTime (date, now=new Date(), maxDays=7, nowStr='刚刚') //'10秒前' ，'10天前'
```

## *S.formatMoney 格式化货币*
```
S.formatMoney (number, places, symbol, thousand, decimal)
S.formatMoney (1000, 2, '$', ',', '.')
```

## *S.countDown 倒计秒数*
```
S.countDown (seconds, callback = noop, complete = noop) //{start:Function(seconds),stop:Function}} 返回一个对象，可暂停和启动
```

## *S.utf16to8*
```
S.utf16to8 (str)
```

## *S.utf8to16*
```
S.utf8to16 (str)
```

## *S.base64encode  base64编码*
```
S.base64encode (str)
```

## *S.base64decode  base64解码*
```
S.base64decode (str)
```

## *S.debounce 函数防抖*
```
S.debounce(fn, wait = 300, immediate = false) //返回一个新函数
```

## *S.throttle 函数节流*
```
S.throttle(fn, wait = 300, immediate = false) //返回一个新函数
```

## *S.regExp 常用校验方法*
```
S.regExp.isInteger(val) //判断是否为正整数
S.regExp.isNumber(val) //判断是否为数字
S.regExp.isPhone(val) //判断是否为正确的手机号码格式
S.regExp.isEmail(val) //判断是否为邮箱格式
S.regExp.isUrl(val) //判断是否为带域名的绝对路径
S.regExp.isIdCard(val) //判断是否为有效的身份证号码

```
## *S.downloadBlob 浏览器下载blob文件流*
```
S.downloadBlob (blob, filename)
```

## *S.getMaxZindex 获取浏览器中最大z-index值*
```
S.getMaxZindex (selector, minZindex=1)
```

## *S.getRandom 获取随机数*
```
S.getRandom（4) //获取4位随机数
```

## *S.getMatcheds 获取根节点到匹配节点的链数组*
```
S.getMatcheds (list, childrenKey, validator, matcheds = []) //validator是一个function
```

## *S.getUrlParam 获取url参数*
```
S.getUrlParam(key,url=window.location.search)
```

## *S.joinPath 路径之间以/拼接，去掉之间多余的/*
```
S.joinPath('/a/','/b','/c')// 返回'/a/b/c'
```

## *cookie 浏览器cookie操作方法*
```
S.setCookie(name, value, days, params = {})
S.getCookie(name)
S.removeCookie(name, params = {})
S.cleanCookie (params = {})
```
## *S.useRem 使用rem布局*
```
S.useRem(styleWidth = 375,remUnit = 100);

10px=0.1rem
```

## *S.getElem 获取dom或创建dom对象*
```
S.getElem(selecter,context) //返回数组格式
```

## *S.addClass 添加class*
```
S.addClass(selecter,class)
```

## *S.removeClass 移除class*
```
S.removeClass(selecter,class)
```

## *S.setupWebViewJavascriptBridge 与ios 原生app交互*
```
S.setupWebViewJavascriptBridge(callback)
```

## *S.bridgeCallhandler 与ios原生app交互,在需要调用客户端方法的组件中（事先需要与客户端同事约定好方法名）*
```
S.bridgeCallhandler(name, data, callback)
```

## *S.bridgeRegisterhandler 与ios原生app交互, 当客户端需要调用 js 函数时,事先注册约定好的函数即可*
```
S.bridgeRegisterhandler(name, data, callback)
```

## *S.dialog  模态确认框*
```
S.dialog({
  title: '提示',
  content: '1',
  cancelText: '取消',
  cancelColor: '#323233',
  confirmText: '确定',
  confirmColor: '#1989fa',
}).then(()=>{

},()=>{})

S.dialog.alert(1)
S.dialog.alert({
  title: '提示',
  content: '1',
  confirmText: '确定',
  confirmColor: '#1989fa',
}).then(()=>{

},()=>{})

S.dialog.confirm(1).then(()=>{

},()=>{});
```

## *S.toast  提示信息弹框*
```
S.toast(1);
S.toast.success(1);
S.toast.fail(1)
S.toast.loading('加载中...');

S.toast.clear();//清除所有toast

S.toast({
  type: 'success',
  icon: '',//icon图标的class或image的src
  message: '提示内容',
  duration: 2000
})

//修改默认配置

S.toast.defaultOptions={
  icon: '',
  duration: 2000
}

//修改type为success的默认配置
S.toast.success.defaultOptions={
  icon: '',
  duration: 2000
}

```

## *S.popup  底层弹框* 
#### 目前只有一个与dom有关的插件 [popup 效果链接](https://sldt.github.io/sldt-utils/example/popup.html).
```
// 默认参数
popup.defaultOptions = {
  el: null, // 与dom节点建立联系，为dom节点对象，设此属性后，不会重新构建dom，实例属性el也将等于此dom节点
  content: '', // dom节点 | 字符串内容 | function返回值
  className: '', // 弹框class
  effect: true, // 是否使用过渡效果
  position: 'middle', // 弹框显示位置
  mountElem: 'body', // 弹框挂载的容器，为空则不会挂载
  closeBtn: false, // 关闭x,(String,Boolean),为ture则使用内置html字符串，为字符串则使用字符串html
  isOnce: false, // 是否为一次性弹框，关闭后立即销毁，并删除dom
  zindexSelector: '.s-popup.s-popup-visible', // z-index层级比较选择器
  zindexStart: 2000, // z-index初始值
  mask: true, // 是否显示遮罩
  maskOpacity: 0.7, // 遮罩透明度
  maskClose: true, // 点击遮罩是否关闭弹框
  lockScroll: true, // 是否阻止外层滚动,
  duration: 0, // 自动关闭时间,number
  preventTouchmove: false, // 是否阻止弹层touchmove滚动，手机上滚动穿透
  // 生命周期
  onInit: undefined, // 初始化
  onShow: undefined, // 显示后
  onHide: undefined, // 关闭后
  onBeforeShow: undefined, // 显示时拦截钩子,参数为next()可异步阻止显示
  onBeforeHide: undefined, // 隐藏时拦截钩子,参数为next()可异步阻止关闭
  onBeforeDestroy: undefined, // 销毁前
  onDestroy: undefined // 销毁后
};
```
#### 1.传统使用方式
```
  html
  
    <div class="s-popup demoPopup">
      <div class="s-popup-wrapper">
        123
      </div>
    </div>
    
 js
 
  var demoPopup=S.popup({
    el:'.demoPopup',
    position: 'left',
    closeBtn: true,
    maskClose:false,
    // 异步拦截
    onBeforeHide(next){
      setTimeout(() => {
        next()
      }, 2000);
    }
  })
  
  demoPopup.show(callback) //显示
  demoPopup.hide(callback) //隐藏
  demoPopup.toggle(callback) //切换
  demoPopup.destroy(removeElem) //销毁，removeElem是否删除dom节点,默认false
```

#### 2.在vue中使用Popup封装弹框组件

```
组件

<template>
  <div class="s-popup">
    <div class="s-popup-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import 'sldt-utils/dist/css/index.min.css'//全局引入

import { popup as Popup } from 'sldt-utils'

export default {
  name: 's-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'middle'
    },
    effect: {
      type: Boolean,
      default: true
    },
    mountElem: {
      type: String,
      default: 'body'
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskOpacity: {
      type: Number,
      default: 0.7
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    closeBtn: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    preventTouchmove: {
      type: Boolean,
      default: false
    },
    beforeShow: Function, // 显示时拦截钩子,返回promise拦截
    beforeHide: Function // 关闭时拦截钩子,返回promise拦截
  },
  watch: {
    value () {
      this.updateVisible()
    }
  },
  mounted () {
    this.$nextTick(() => {
      const {
        position,
        effect,
        mountElem,
        mask,
        maskOpacity,
        maskClose,
        closeBtn,
        lockScroll,
        preventTouchmove,
        beforeShow,
        beforeHide
      } = this
      this.$popup = Popup({
        el: this.$el,
        position,
        effect,
        mountElem,
        mask,
        maskOpacity,
        maskClose,
        closeBtn,
        lockScroll,
        preventTouchmove,
        onShow: () => {
          this.$emit('input', true)
          this.$emit('show')
        },
        onHide: () => {
          this.$emit('input', false)
          this.$emit('hide')
        },
        onBeforeShow: (next) => {
          if (beforeShow) {
            Promise.resolve(beforeShow()).then(next, () => {
              this.$emit('input', false)
            })
          } else {
            next()
          }
        },
        onBeforeHide: (next) => {
          if (beforeHide) {
            Promise.resolve(beforeHide()).then(next, () => {
              this.$emit('input', true)
            })
          } else {
            next()
          }
        }
      })
      this.updateVisible()
    })
  },
  methods: {
    updateVisible () {
      this.$nextTick(() => {
        this.$popup[this.value ? 'show' : 'hide']()
      })
    }
  },
  beforeDestroy () {
    this.$popup && this.$popup.destroy()
  }
}
</script>

<style>
</style>

使用

<template>
  <section>
    <button @click="visible=true">显示</button>
    <s-popup
      class="demo-popup"
      v-model="visible"
      :closeBtn="true"
      :beforeHide="beforeHide"
      @hide="hide"
    >
      <button @click="visible=false">关闭</button>
    </s-popup>
  </section>
</template>

<script>
import sPopup from '@/components/s-popup'
export default {
  data () {
    return {
      visible: false
    }
  },
  components: {
    sPopup
  },
  methods: {
    beforeHide () {
      return new Promise((resolve, reject) => {
        this.$S.dialog.confirm('确定关闭吗？').then(resolve, reject)
      })
    },
    hide () {
      console.log('hide')
    }
  }
}
</script>

<style lang="scss">
.demo-popup {
  .s-popup-wrapper {
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 4px;
    font-size: 20px;
  }
}
</style>

```
