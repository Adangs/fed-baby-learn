<template>
  <view :class="classNameList">
    <view v-if="fixed && placeholder" class="_placeholder" :style="'background:'+background">
      <view class="_bar" :style="'height:'+statusBarHeight+'px'"/>
      <view class="_title" :style="alipayBarHeight"/>
    </view>
    <view class="_content" :style="'background:' + background + ';color:' + color">
      <view class="_bar" :style="'height:'+statusBarHeight+'px'" @click="onBar"/>
      <view class="_title" :style="alipayBarHeight" @click="onClick">
        <view v-if="isBack || isHome || ifSubscribe" class="_ul">
          <view v-if="isBack" class="_li" @click="onNavigateBack">
            <view class="_item">
              <view class="_icon">
                <x-icon name="icon-008" :color="iconColor" size="50"/>
              </view>
            </view>
          </view>
          <!--#ifdef MP-WEIXIN-->
          <view v-if="isHome" class="_li" @click="onHome">
            <view class="_item">
              <view class="_icon">
                <x-icon name="icon-055" :color="iconColor" size="50"/>
              </view>
            </view>
          </view>
          <!--#endif-->
        </view>
        <view v-if="title" class="_name">{{title}}</view>
        <slot v-else/>
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
        default: '#fff'
      },
      iconColor: {
        type: String,
        default: '#000'
      },
      color: {
        type: String,
        default: '#000'
      },
      // 返回首页要不要弹出订阅消息
      ifSubscribe: {
        type: Boolean,
        default: false
      },
      // 固定悬浮
      fixed: {
        type: Boolean,
        default: true
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
      },
      // 是否订阅了消息
      isSubscribed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
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
        const pages = getCurrentPages();
        return pages && pages.length > 1;
      },
      // 显示返回首页按钮
      isHome(){
        // 不需要加返回首页的页面
        const blackList = [
          'pages/index/index'
        ];
        const pages = getCurrentPages();
        if(pages){
          const page = pages[pages.length - 1];
          return pages.length === 1 && !blackList.includes(page.route);
        }
        return false;
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
      async onHome() {
        // redirectTo
        // switchTab
        // navigateTo
        uni.redirectTo({
          url: '/pages/index/index'
        })
      }
    }
  }
</script>

<style lang="scss">
  .x-navigation-bar {
    &.is-alipay {
      // &.is-back .title{ padding-left: 70px;}
      ._title {
        display: flex;
        align-items: center;
        height: inherit;
        width: 100%;
        padding: 0 14px;

        ._ul {
          position: relative;
          left: 0;
          top: 0;
          margin: 0 15px 0 0;
          width: 62px;

          ._li {
            display: none;
          }
        }

        ._name {
          text-align: left;
          flex: 1;
        }

        ._search {
          flex: 1;
        }

        .x-navigation-bar-search {
          width: 55%;
        }
      }
    }

    &.is-fixed {
      position: relative;
      z-index: 999;

      ._content {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
      }
    }

    &.is-transparent {
      ._title {
        ._ul {
          background: transparent;
        }

        ._li{
          background: rgba(0,0,0,.15); border-radius: 62px;
        }
      }
    }

    ._title {
      height: 88px;
      font-size: 36px;
      font-weight: bold;
      overflow: hidden;
      padding: 0 20px;
      position: relative;

      ._name {
        text-align: center;
        line-height: 88px;
      }

      ._ul {
        position: absolute;
        height: 62px;
        left: 14px;
        top: 50%;
        margin-top: -31px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      ._li {
        height: 100%;
        width: 62px;
        display: flex;
        align-items: center;
        text-align: center;
        background: inherit;
        margin-right: 20px;
        ._item{
          flex: 1; text-align: center; height: 50px; overflow: hidden;
        }
        ._icon {
          width: 50px; height: 50px; text-align: center; display: inline-block; overflow: hidden; margin-top: -2px;
        }
      }
    }
  }
</style>
