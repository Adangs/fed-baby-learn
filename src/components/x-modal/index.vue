<template>
  <view :class="classNameList">
    <view class="_mask" @click="onCancel" @touchmove.stop.prevent="moveHandle" />
    <view class="_body" :style="{'background':  background}">
      <view v-if="title" class="_title">
        {{title}}
      </view>
      <view class="_content">
        <slot />
      </view>
      <template v-if="cancelText || confirmText">
        <view class="_footer">
          <view v-if="cancelText" class="_button _cancel" @click="onCancel">
            <view class="text">
              {{ cancelText }}
            </view>
          </view>
          <view v-if="confirmText" class="_button _confirm" @click="onConfirm">
            <block v-if="openType">
              <x-button plain block :open-type="openType" @getUserInfo="getUserInfo">
                <view class="text">
                  {{ confirmText }}
                </view>
              </x-button>
            </block>
            <view v-else class="text">
              {{ confirmText }}
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import XButton from '@/components/x-button'
export default {
  name: 'XModal',
  components: {
    XButton
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
    cancelText: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'success'
    },
    title: {
      type: String,
      default: ''
    },
    openType: {
      type: String,
      default: ''
    },
    isPadding: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    classNameList() {
      const arr = ['x-modal']
      if (this.visible) {
        arr.push('is-show')
      }
      if (this.isPadding) {
        arr.push('is-padding')
      }
      return arr.join(' ')
    }
  },
  watch: {},
  created() {

  },
  methods: {
    // 若需要禁止蒙版下的页面滚动，可使用 @touchmove.stop.prevent="moveHandle"，moveHandle 可以用来处理 touchmove 的事件，也可以是一个空函数
    moveHandle() {},
    onCancel() {
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    onConfirm() {
      if (this.openType) return
      this.$emit('update:visible', false)
      this.$emit('confirm')
    },
    getUserInfo({ detail }) {
      this.$emit('update:visible', false)
      this.$emit('confirm', detail)
    }
  }
}
</script>

<style lang="scss">
  .x-modal{
    position: fixed; width: 100%; height: 100%; z-index: 1000; left: 0; top: 0; display: none;
    &.is-show{
      display: block;
      ._body{ opacity: 1; animation: zoomIn .3s ease-out;}
    }
    &.is-padding{
      ._content{ padding: 30px 26px;}
    }
    ._mask{ background-color: rgba(0,0,0,.5); position: absolute; width: 100%; height: 100%; left: 0; right: 0;}
    ._body{
      opacity: 0; position: absolute; left: 50%; top: 50%; transform: translate3d(-50%, -50%, 0); font-size: 28px; border-radius: 10px; overflow: hidden;
    }
    ._title{ border-bottom: 1px solid #eee; padding: 20px 26px; font-weight: bold; font-size: 30px; text-align: center;}
    ._content{
      width: 540px; overflow: hidden; color: #000;
    }
    ._footer{
      display: flex; align-items: center; border-top: 1px solid #eee;
      ._button{
        flex: 1; border-right: 1px solid #eee;
        .text{ padding: 20px 0; text-align: center;}
        &._confirm .text{ color: #44ae49;}
        &._cancel .text{ color: #111;}
        &:last-child{ border-right: 0;}
      }
    }
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
