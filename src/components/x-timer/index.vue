<template>
  <view class="x-timer">
    <view class="_content">
      <view class="flex">
        <template v-if="hour">
          <text class="_hour">{{hour}}</text>
          <text class="_span">:</text>
        </template>
        <text class="_minute">{{minute}}</text>
        <text class="_span">′</text>
        <text class="_second">{{second}}</text>
        <text class="_span">″</text>
        <text class="_millisecond">{{millisecondValue}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'XTimer',
  components: {},
  props: {},
  data () {
    return {
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      int: null
    }
  },
  computed: {
    millisecondValue() {
      return (Array(3).join(0) + this.millisecond).slice(-3)
    }
  },
  watch: {},
  created () {
    // this.onStart()
  },
  beforeDestroy () {
    if (this.int) {
      clearInterval(this.int)
    }
  },
  methods: {
    onStart() {
      this.millisecond = 0;
      this.second = 0;
      this.minute = 0;
      this.hour = 0;

      if (this.int) {
        clearInterval(this.int)
      }
      this.int = setInterval(this.timer,50);
    },
    timer() {
      this.millisecond += 50;
      if (this.millisecond >= 1000) {
        this.millisecond = 0;
        this.second += 1;
      }
      if (this.second >= 60) {
        this.second = 0;
        this.minute += 1;
      }
      if (this.minute >= 60) {
        this.minute = 0;
        this.hour += 1;
      }
    }
  }
}
</script>

<style lang="scss">
  .x-timer{
    text-align: center;
    ._content{
      display: inline-block;  background-color: rgba(0, 0, 0, .4); color: rgba(255, 255, 255, .8); border-radius: 30px; padding: 5px 25px; font-size: 26px;
      text{ min-width: 26px; text-align: center}
      ._span{ min-width: auto; padding: 0 2px;}
      ._millisecond{ width: 50px;}
    }
    .flex{ display: flex; align-items: center;}
  }
</style>
