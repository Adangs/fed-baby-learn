<template>
  <view class="x-loading" :style="'background:'+background">
    <view class="_content">
      <view class="_flex">
        <view class="_pic"><x-image src="/static/images/loading.png" /></view>
        <text>{{content}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import XImage from '@/components/x-image'
  export default {
    name: 'XLoading',
    components: {
      XImage
    },
    props: {
      content: {
        type: String,
        default: '正在加载'
      },
      background: {
        type: String,
        default: 'transparent'
      }
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {

    },
    methods: {}
  };
</script>

<style lang="scss">
  .x-loading{
    text-align: center; padding: 20px 0; overflow: hidden;
    ._content{ display: inline-block; font-size: 28px; color: #1E1E1E;}
    ._flex{
      display: flex; align-items: center;
      ._pic{
        width: 30px; height: 30px; animation: rotate .6s steps(12) infinite;
      }
      text{ padding: 0 12px;}
    }
  }
  @keyframes rotate {
    from{
      transform: rotate(0);
      transform-origin: center center;
    }
    to{
      transform: rotate(360deg);
      transform-origin: center center;
    }
  }
</style>
