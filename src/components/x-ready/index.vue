<template>
  <view class="x-ready">
    <view class="_content">
      <view v-for="(item, i) in list" :key="item" :class="{'show': index === i+1}" class="_number">{{ i+1 }}</view>
      <view :class="{'show': index === 0}" class="_start">开始</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'XReady',
  components: {},
  props: {
    max: {
      type: [Number, String],
      default: 3
    }
  },
  data () {
    return {
      index: +this.max + 1,
      int: null,
      list: Array(+this.max + 1)
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onStart()
  },
  beforeDestroy () {
    if (this.int) {
      clearInterval(this.int)
    }
  },
  methods: {
    onStart() {
      this.index = +this.max + 1
      this.timer()
    },
    timer() {
      this.index--
      if (this.int) {
        clearInterval(this.int)
      }
      if (this.index >= 0) {
        this.int = setTimeout(this.timer,1000);
      } else {
        this.$emit('change')
      }
    }
  }
}
</script>

<style lang="scss">
  .x-ready{
    position: fixed; z-index: 996; background-color: rgba(0, 0, 0, .9); left: 0; top: 0; width: 100%; height: 100%;
    ._content{
      position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 300px; color: rgba(255, 255, 255, .9);
      ._start,
      ._number{
        opacity: 0; display: none;
        &.show{ opacity: 1; display: block; animation: zoomIn .3s;}
      }
      ._start{ font-size: 160px; text-align: center; white-space: nowrap;}
    }
  }
  @keyframes zoomIn {
    0% { opacity: 0; transform: scale(4);}
    90% { transform: scale(.8);}
    100% { opacity: 1; transform: scale(1);}
  }
</style>
