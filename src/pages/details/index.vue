<template>
  <view class="m-details">
    <view class="word">
      <text>永</text>
    </view>
    <view class="tools">
      <view class="li"></view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Details',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    onLoad() {

    },
    methods: {}
  };
</script>

<style lang="scss">
  .m-details{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0;
    .word{
      width: 100%; background: #ddd; height: 100vw; position: relative;
      text{ position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); font-size: 400px;}
    }
    .tools{ height: 200px;}
  }
</style>
