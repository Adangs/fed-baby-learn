<template>
  <view class="m-list">
    <view class="li">
      <view class="item">
        <text>第一阶段</text>
      </view>
    </view>
    <view class="li">
      <view class="item">
        <text>第二阶段</text>
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
    position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex;
    .li{ flex: 1; padding: 20px;}
    .item{
      width: 200px; height: 200px; background: #fafafa; border-radius: 20px; border: 2px solid #eee; text-align: center; display: flex; align-items: center;
      text{ display: block; flex: 1;}
    }
  }
</style>
