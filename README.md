# sldt-utils

## 引入方式
#### 1. npm 安装
```
npm i sldt-utils -S

import 'sldt-utils/dist/style/index.min.css'
import S from 'sldt-utils'
```
#### 2. umd静态引入 全局变量为S
```
dist/style/index.min.css
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

## *S.extend*
```
S.extend(true,{},{})//深拷贝
S.extend({},{})//浅拷贝
```

## *S.formatDate 时间格式化*
```
S.formatDate (date, fmt = 'YYYY-MM-DD HH:mm')
```

## *S.formatDateRange 时间段*
```
S.formatDateRange (startDateTime, endDateTime, separator = ' ~ ', startformat = 'YYYY-MM-DD HH:mm', endformat = 'YYYY-MM-DD HH:mm')
```

## *S.formatSeconds 格式化秒数为天,小时，分钟，秒 对象*
```
S.formatSeconds (seconds) //返回{ d, h, m, s }
```

## *S.formatMoney 格式化货币*
```
S.formatMoney (number, places, symbol, thousand, decimal)
S.formatMoney (1000, 2, '$')
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

## *S.base64Encode  base64编码*
```
S.base64Encode (str)
```

## *S.base64Decode  base64解码*
```
S.base64Decode (str)
```

## *S.debounce 函数防抖*
```
S.debounce(fn,3000) //返回一个新函数
```

## *S.throttle 函数节流*
```
S.throttle(fn,300) //返回一个新函数
```

## *S.regExp 常用正则方法*
```
S.regExp.isInteger(val) //判断是否为正整数
S.regExp.isNumber(val) //判断是否为数字
S.regExp.isPhone(val) //判断是否为正确的手机号码格式
S.regExp.isEmail(val) //判断是否为是否为电子邮件
S.regExp.isUrl(val) //判断是否为带域名的绝对路径
S.regExp.isDate(val) //判断是否为合法date
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
S.useRem(设计稿宽度)

10px=0.1rem
```

## *S.$ 操作dom的方法库，dom7简化版*
```
const $=S.$;

$('body').addClass('a').on('click',()=>{}).removeClass('a')
```


## *S.alert*
```
S.alert(1)
S.alert({
  title: '提示',
  content: '1',
  confirmText: '确定',
  confirmColor: '#1989fa',
}).then(()=>{

},()=>{})
```

## *S.confirm*
```
S.confirm(1).then(()=>{

},()=>{})

S.confirm({
  title: '提示',
  content: '1',
  cancelText: '取消',
  cancelColor: '#323233',
  confirmText: '确定',
  confirmColor: '#1989fa',
}).then(()=>{

},()=>{})

```


## *loading*
```
S.showLoading('加载中...')
S.hideLoading()
```


## *S.toast  提示信息弹框*
```
S.toast(1);
S.toast.success(1);
S.toast.fail(1)
S.toast.clear();//清除所有toast
S.toast({
  className: 's-toast-dialog',
  icon: '',
  image: '',
  content: '提示内容',
  duration: 2000
})
```

## *S.dialog  弹框*
```
// 默认参数
dialog.defaultOptions = {
  el: null, // 与dom节点建立联系，为dom节点对象，设此属性后，不会重新构建dom，实例属性el也将等于此dom节点
  className: '', // 弹框class
  effect: true, // 是否使用过渡效果
  position: 'middle', // 弹框显示位置,left,right,top,middle,bottom
  mountElem: 'body', // 弹框挂载的容器，为空则不会挂载
  closeBtn: false, // 关闭x,(String,Boolean),为ture则使用内置html字符串，为字符串则使用字符串html
  title: '', // 标题
  content: '', // 字符串html内容
  cancelClass: 's-btn s-dialog-cancel-btn', // 取消按钮class
  cancelText: '', // 取消按钮文字
  cancelColor: '', // 取消按钮颜色
  confirmClass: 's-btn s-dialog-confirm-btn', // 确认按钮class
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
}
```
#### 1.传统使用方式
```
  html
  
    <div class="s-dialog demoDialog">
      <div class="s-dialog-wrapper">
        123
      </div>
    </div>
    
 js
 
  var demoDialog=S.dialog({
    el:'.demoDialog',
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
  
  demoDialog.show(callback) //显示
  demoDialog.hide(callback) //隐藏
  demoDialog.toggle(callback) //切换
  demoDialog.destroy(removeElem) //销毁，removeElem是否删除dom节点,默认false
```

#### 2.在vue中使用dialog封装弹框组件

```
组件

<template>
  <div class="s-dialog">
    <div class="s-dialog-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import 'sldt-utils/dist/style/index.min.css'//全局引入

import { dialog as Dialog } from 'sldt-utils'

export default {
  name: 'sDialog',
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
      this.$dialog = Dialog({
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
        this.$dialog[this.value ? 'show' : 'hide']()
      })
    }
  },
  beforeDestroy () {
    this.$dialog && this.$dialog.destroy()
  }
}
</script>

<style>
</style>

使用

<template>
  <section>
    <button @click="visible=true">显示</button>
    <s-dialog
      class="demo-dialog"
      v-model="visible"
      :closeBtn="true"
      :beforeHide="beforeHide"
      @hide="hide"
    >
      <button @click="visible=false">关闭</button>
    </s-dialog>
  </section>
</template>

<script>
import sDialog from '@/components/s-dialog'
export default {
  data () {
    return {
      visible: false
    }
  },
  components: {
    sDialog
  },
  methods: {
    beforeHide () {
      return new Promise((resolve, reject) => {
        this.$S.confirm('确定关闭吗？').then(resolve, reject)
      })
    },
    hide () {
      console.log('hide')
    }
  }
}
</script>

<style lang="scss">
.demo-dialog {
  .s-dialog-wrapper {
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 4px;
    font-size: 20px;
  }
}
</style>

```
