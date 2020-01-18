<template>
  <view :class="classNameList">
    <view v-if="fixed && placeholder" class="_placeholder" :style="'background:'+background">
      <view class="_bar" :style="'height:'+statusBarHeight+'px'" />
      <view class="_title" :style="alipayBarHeight" />
    </view>
    <view class="_content" :style="'background:' + background + ';color:' + color">
      <view class="_bar" :style="'height:'+statusBarHeight+'px'" @click="onBar" />
      <view class="_title" :style="alipayBarHeight" @click="onClick">
        <view v-if="isBack" class="_ul">
          <view class="_li" @click="onNavigateBack">
            <view class="_icon">
              <x-icon name="icon-left" :color="iconColor" />
            </view>
          </view>
        </view>
        <view v-if="title" class="_name">{{title}}</view>
        <view v-else-if="search" class="_search">
          <view class="x-navigation-bar-search" @click="onToSearch">
            <view class="_icon">
              <x-icon name="icon-search" color="#8A8A8A" size="28" />
            </view>
            <view class="_preview">{{search}}</view>
          </view>
          <view/>
        </view>
        <slot v-else />
      </view>
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'

  export default {
    name: 'XNavigationBar',
    components: {
      XIcon
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      background: {
        type: String,
        default: '#FF2025'
      },
      iconColor: {
        type: String,
        default: '#fff'
      },
      color: {
        type: String,
        default: '#fff'
      },
      // 固定悬浮
      fixed: {
        type: Boolean,
        default: true
      },
      // 搜索框
      search: {
        type: String,
        default: ''
      },
      // 透明模式
      transparent: {
        type: Boolean,
        default: false
      },
      // 占位
      placeholder: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {

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
      // 状态栏的高度
      statusBarHeight() {
        let height = uni.getSystemInfoSync().statusBarHeight
        /**
         * 头条获取不到statusBarHeight，直接使用0，ipx上有问题，需要另想方案
         * */
        // #ifdef MP-TOUTIAO
        height = 0
        // #endif
        return height
      },
      // 支付宝
      alipayBarHeight() {
        if (this.isAlipay) {
          return `height:${uni.getSystemInfoSync().titleBarHeight}px`
        }
        return {}
      },
      // class列表
      classNameList() {
        const name = ['x-navigation-bar']
        // 支付宝平台
        if (this.isAlipay) {
          name.push('is-alipay')
        }
        // 固定悬浮
        if (this.fixed) {
          name.push('is-fixed')
        }
        // 搜索框
        if (this.search) {
          name.push('is-search')
        }
        // 透明模式
        if (this.transparent) {
          name.push('is-transparent')
        }
        // 当返回按钮显示时
        const pages = getCurrentPages()
        if (pages.length > 1) {
          name.push('is-back')
        }
        return name.join(' ')
      },
      // 显示返回按钮
      isBack() {
        // 需要确认支付宝是否默认显示返回按钮
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        return page.route === 'packages/mall/detail/index' || pages && pages.length > 1
      }
    },
    created() {

    },
    methods: {
      // 返回上一页
      onNavigateBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 滚动到页面顶部
      onBar() {
        uni.pageScrollTo({
          scrollTop: 0
        })
      },
      onClick(e) {
        this.$emit('click', e)
      },
      onToSearch() {
        uni.navigateTo({
          url: '/packages/mall/search/index'
        })
      }
    }
  };
</script>

<style lang="scss">
  .x-navigation-bar{
    &.is-alipay{
      // &.is-back .title{ padding-left: 70px;}
      ._title{
        display: flex; align-items: center; height: inherit; width: 100%; padding: 0 14px;
        ._ul{
          position: relative; left: 0; top: 0; margin: 0 15px 0 0; width: 62px;
          ._li{ display: none;}
        }
        ._name{ text-align: left; flex: 1;}
        ._search{ flex: 1;}
        .x-navigation-bar-search{ width: 55%; }
      }
    }
    &.is-fixed{
      position: relative; z-index: 999;
      ._content{ position: fixed; width: 100%; top: 0; left: 0;}
    }
    &.is-transparent{
      ._title {
        ._ul{ background: transparent;}
        ._li{ background: transparent; border-color: transparent;}
      }
    }
    ._title{
      height: 88px; font-size: 36px; font-weight: bold; overflow: hidden; padding: 0 20px; position: relative;
      ._name{ text-align: center; line-height: 88px; }
      ._ul{ position: absolute; height: 62px; left: 14px; top: 50%; margin-top: -31px; display: flex; align-items: center; overflow: hidden;}
      ._li{
        width: 50px; height: 100%; display: flex; align-items: center; background: #fff;
        ._icon{ text-align: center; display: block; width: 100%;}
      }
      ._search{
        height: 88px; display: flex; align-items: center;
        > view{ flex: 1;}
        ._preview{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: normal !important;}
      }
      .x-navigation-bar-search{
        overflow: hidden; height: $uni-height-size-sm; background: #fff; border-radius: $uni-border-radius-base; display: flex; align-items: center; font-size: $uni-font-size-sm; color: #A4A4A4;
        ._icon{ width: 62px; text-align: center;}
      }
    }
  }
</style>
