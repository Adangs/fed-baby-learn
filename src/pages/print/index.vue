<template>
  <view class="m-print">
    <x-navigation-bar title="打印" />
    <view class="ul">
      <view class="li">
        <view class="item" @click="onCalculate">
          <text>数学</text>
        </view>
      </view>
      <view class="li">
        <view class="item">
          <text>语文</text>
        </view>
      </view>
      <view class="li">
        <view class="item">
          <text>英语</text>
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
    onCalculate() {
      uni.navigateTo({
        url: '/packages/print/calculate/index'
      })
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
