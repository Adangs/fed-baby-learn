<template>
  <view class="m-list">
    <view class="logo">
      <x-image src="/static/images/144x144.png" />
    </view>
    <view class="li">
      <view class="item" @click="onLiteracy">
        <text>识字</text>
      </view>
    </view>
    <view class="li">
      <view class="item" @click="onCompute">
        <text>心算</text>
      </view>
    </view>
    <view class="version">
      <view class="inline-block">
        <x-button transparent open-type="contact">
          <view class="flex">
            <view class="icon">
              <x-icon name="icon-044" color="#555" />
            </view>
            <view>v1.2.0</view>
          </view>
        </x-button>
      </view>
    </view>
  </view>
</template>

<script>
  import XImage from '@/components/x-image'
  import XIcon from '@/components/x-icon'
  import XButton from '@/components/x-button'

  export default {
    name: 'Home',
    components: {
      XImage,
      XIcon,
      XButton
    },
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    onLoad() {

    },

    onShareAppMessage() {
      return {
        imageUrl: '/static/images/144x144.png',
        title: '一起来学习',
        path: '/pages/index/index'
      }
    },

    // 本接口为 Beta 版本，暂只在 Android 平台支持
    onShareTimeline() {
      return {
        title: '一起来学习',
        imageUrl: '/static/images/144x144.png'
      }
    },

    methods: {
      onLiteracy() {
        uni.navigateTo({
          url: '/pages/literacy/index?type=one'
        })
      },
      onCompute() {
        uni.navigateTo({
          url: '/pages/compute/index'
        })
      }
    }
  };
</script>

<style lang="scss">
  .m-list{
    //  flex-direction: column;
    position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex; padding-bottom: 150px;
    .logo{ position: absolute; width: 144px; height: 144px; left: 50%; top: -200px; transform: translate3d(-50%, 0, 0);}
    .li{ flex: 1; padding: 30px;}
    .item{
      width: 220px; height: 220px; background: #fafafa; border-radius: 20px; border: 2px solid #ddd; text-align: center; display: flex; align-items: center;
      &:active{ opacity: .8;}
      text{ display: block; flex: 1; font-size: 50px;}
    }
    .version{
      position: absolute; bottom: 20px; color: #aaa; width: 100%; text-align: center; font-size: 22px;
      .icon{ padding-right: 10px;}
    }
  }
</style>
