<template>
  <view class="m-list">
    <view class="li">
      <view class="item">
        <text>单字</text>
      </view>
    </view>
    <view class="li">
      <view class="item">
        <text>词语</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Home',
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
  .m-list{
    position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex; flex-direction: column;
    .li{ flex: 1; padding: 30px;}
    .item{
      width: 220px; height: 220px; background: #fafafa; border-radius: 20px; border: 2px solid #eee; text-align: center; display: flex; align-items: center;
      text{ display: block; flex: 1; font-size: 40px;}
    }
  }
</style>
