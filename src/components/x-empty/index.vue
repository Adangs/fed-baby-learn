<template>
  <view class="x-empty" :style="'background:'+background">
    <view v-if="src" class="_pic">
      <x-image mode="aspectFit" :src="src" />
    </view>
    <view class="_content">
      {{content}}
    </view>
  </view>
</template>

<script>
  import XImage from '@/components/x-image'

  export default {
    name: 'XEmpty',
    components: {
      XImage
    },
    props: {
      src: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: '暂无相关数据'
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
  .x-empty{
    text-align: center; padding: 70px 0;
    ._pic{ width: 400px; height: 400px; margin: 0 auto;}
    ._content{ color: #8A8A8A; font-size: 28px; margin-top: -50px;}
  }
</style>
