<template>
  <view class="m-list">
    <view class="li">
      <view class="item" @click="onNavigateTo('one')">
        <text>单字</text>
      </view>
    </view>
    <view class="li">
      <view class="item" @click="onNavigateTo('two')">
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
    methods: {
      onNavigateTo(type) {
        uni.navigateTo({
          url: `/pages/details/index?type=${type}`
        })
      }
    }
  };
</script>

<style lang="scss">
  .m-list{
    //  flex-direction: column;
    position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex;
    .li{ flex: 1; padding: 30px;}
    .item{
      width: 220px; height: 220px; background: #fafafa; border-radius: 20px; border: 2px solid #eee; text-align: center; display: flex; align-items: center;
      text{ display: block; flex: 1; font-size: 40px;}
    }
  }
</style>
