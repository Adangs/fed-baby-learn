<template>
  <view class="m-print">
    <x-navigation-bar title="打印" />
    <view class="ul">
      <view class="li">
        <view class="item" @click="onNavigateTo('/packages/print/stickers/index')">
          <text>字贴</text>
        </view>
      </view>
      <view class="li">
        <view class="item" @click="onTips">
          <text>口算</text>
        </view>
      </view>
      <view class="li">
        <view class="item" @click="onTips">
          <text>涂色板</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'

export default {
  name: 'Print',
  components: {
    XNavigationBar
  },
  props: {},
  data () {
  return {
    lists: null,
    src: null
  };
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    onNavigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    onTips() {
      uni.showToast({
        title: '开发中~',
        icon: 'none'
      });
    }
  }
};
</script>

<style lang="scss">
  .m-print{
    .ul{ display: flex; flex-wrap: wrap; width: 100%; padding: 50px; }
    .li{ flex: 1; padding: 20px;}
    .item{
      width: 150px; height: 150px; background: #fafafa; border-radius: 20px; border: 2px solid #ddd; text-align: center; display: flex; align-items: center; margin: 0 auto;
      &:active{ opacity: .8;}
      text{ display: block; flex: 1; font-size: 40px;}
    }
  }
</style>
