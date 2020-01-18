<template>
  <view id="x-fixed" :class="classNameList">
    <view class="_placeholder" :style="{'height': height + 'px'}" />
    <view id="x-fixed-content" class="_content" :style="{'top': fixedTop + 'px', 'background':  background}">
      <slot />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'XFixed',
    components: {},
    props: {
      background: {
        type: String,
        default: '#ffffff'
      },
      top: {
        type: Number,
        default: 0
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFixed: false,
        height: 0
      };
    },
    computed: {
      // 支付宝平台
      isAlipay() {
        let is = false
        // #ifdef MP-ALIPAY
        is = true
        // #endif
        return is
      },
      classNameList() {
        const name = ['x-fixed']
        // 固定
        if (this.isFixed) {
          name.push('is-fixed')
        }
        return name.join(' ')
      },
      // 距离顶部位置
      fixedTop() {
        const res = uni.getSystemInfoSync()
        return this.isAlipay ? res.titleBarHeight + res.statusBarHeight : this.top
      }
    },
    watch: {},
    created() {
      this.isFixed = this.fixed
    },
    mounted() {
      this.setHeight()
    },
    methods: {
      // 获取navigation信息
      setHeight() {
        const query = uni.createSelectorQuery()
        if (!this.isAlipay) {
          query.in(this)
        }
        query.select('#x-fixed-content').boundingClientRect(data => {
          // console.log(data.height)
          this.height = data.height
        }).exec()
      },
      scrollTab() {
        const view = uni.createSelectorQuery()
        if (!this.isAlipay) {
          view.in(this)
        }
        view.select('#x-fixed').boundingClientRect(res => {
          // 是否为固定悬浮状态
          // console.log(res.top, this.fixedTop)
          this.isFixed = res.top <= this.fixedTop
        }).exec()
      }
    }
  };
</script>

<style lang="less">
  .x-fixed{
    &.is-fixed{
      > ._placeholder{ display: block;}
      > ._content{ position: fixed; width: 100%; left: 0; z-index: 120;}
    }
    > ._placeholder{ display: none;}
  }
</style>
