<template>
  <view :class="classNameList">
    <view class="_mask" @click="hide" @touchmove.stop.prevent="moveHandle" />
    <view class="_body">
      <view class="_content" :style="{'background':  background}">
        <view v-if="iconSrc" class="_icon">
          <x-image :src="iconSrc" />
        </view>
        <view v-if="title" class="_title">{{title}}</view>
        <view v-if="content" class="_desc">{{content}}</view>
        <view v-else class="_slot"><slot /></view>
        <view v-if="showCancel || showConfirm" class="_footer">
          <view v-if="showCancel" class="_li">
            <x-button size="small" type="default" @click="hide">{{cancelText}}</x-button>
          </view>
          <view v-if="showConfirm" class="_li">
            <x-button size="small" @click="success">{{confirmText}}</x-button>
          </view>
        </view>
      </view>
      <view v-if="showClose" class="_cancel">
        <x-icon name="icon-close-line1" size="50" color="#fff" @click="hide" />
      </view>
    </view>
  </view>
</template>

<script>
  import XButton from '@/components/x-button'
  import XIcon from '@/components/x-icon'
  import XImage from '@/components/x-image'

  export default {
    name: 'XModal',
    components: {
      XButton,
      XIcon,
      XImage
    },
    props: {
      background: {
        type: String,
        default: '#fff'
      },
      visible: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'success'
      },
      customClass: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      // 显示底部关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      // 取消按钮
      showCancel: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确定按钮
      showConfirm: {
        type: Boolean,
        default: true
      },
      confirmText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {};
    },
    computed: {
      // class列表
      classNameList() {
        const name = ['x-modal']
        if (this.visible) {
          name.push('is-show')
        }
        // 自定义class
        if (this.customClass) {
          name.push(this.customClass)
        }
        return name.join(' ')
      },
      iconSrc() {
        switch (this.icon) {
          case 'success':
            return '/static/images/modal-success.png'
          case 'fail':
            return '/static/images/modal-fail.png'
          case 'none':
            return false
          default:
            return this.icon
        }
      }
    },
    watch: {},
    onLoad() {

    },
    methods: {
      // 若需要禁止蒙版下的页面滚动，可使用 @touchmove.stop.prevent="moveHandle"，moveHandle 可以用来处理 touchmove 的事件，也可以是一个空函数
      moveHandle() {},
      hide() {
        this.$emit('update:visible', false)
        this.$emit('close')
      },
      success() {
        this.$emit('update:visible', false)
        this.$emit('success')
      }
    }
  };
</script>

<style lang="scss">
  .x-modal{
    position: fixed; width: 100%; height: 100%; z-index: 1000; left: 0; top: 0; display: none;
    &.is-show{
      display: block;
      ._body{ opacity: 1; animation: zoomIn .3s ease-out;}
    }
    ._mask{ background-color: rgba(0,0,0,.5); position: absolute; width: 100%; height: 100%; left: 0; right: 0;}
    ._body{ opacity: 0; position: absolute; left: 50%; top: 50%; transform: translate3d(-50%, -45%, 0);}
    ._content{
      width: 520px; border-radius: 10px; padding: 30px; text-align: center; overflow: hidden;
      > ._icon{ width: 180px; height: 180px; display: inline-block;}
      > ._title{ font-size: 36px; padding: 20px 0; color: $uni-text-color;}
      > ._desc{ font-size: 32px; color: $uni-text-color-placeholder; line-height: 1.4;}
      > ._footer{
        display: flex; align-items: center; padding-top: 40px;
        ._li{ flex: 1; padding: 20px;}
      }
    }
    ._cancel{ text-align: center; padding-top: 60px;}
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale3d(0.1, 0.1, 0.1);
    }

    80% {
      transform: translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1.1);
    }

    100% {
      opacity: 1;
      transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
    }
  }
</style>
