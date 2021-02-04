<template>
  <view class="x-ready">
    <view class="_content">
      <view class="_number">3</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'XReady',
  components: {},
  props: {

  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {

   },
  methods: {}
}
</script>

<style lang="scss">
  .x-ready{
    position: fixed; z-index: 996; background-color: rgba(0, 0, 0, .9); left: 0; top: 0; width: 100%; height: 100%;
    ._content{
      position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 300px; color: rgba(255, 255, 255, .9);
      ._number{
        opacity: 1; animation: zoomIn .3s 1s;
      }
    }
  }
  @keyframes zoomIn {
    0% { opacity: 0; transform: scale(3);}
    90% { transform: scale(.8);}
    100% { opacity: 1; transform: scale(1);}
  }
</style>
