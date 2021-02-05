<template>
  <view class="x-timer">
    <view class="_content">
      <view class="flex">
        <template v-if="time.hour">
          <text class="_hour">{{time.hour}}</text>
          <text class="_span">:</text>
        </template>
        <text class="_minute">{{time.minute}}</text>
        <text class="_span">′</text>
        <text class="_second">{{time.second}}</text>
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
      time: {
        millisecond: 0,
        second: 0,
        minute: 0,
        hour: 0,
      },
      int: null
    }
  },
  computed: {
    millisecondValue() {
      return (Array(3).join(0) + this.time.millisecond).slice(-3)
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
      this.time.millisecond = 0;
      this.time.second = 0;
      this.time.minute = 0;
      this.time.hour = 0;

      if (this.int) {
        clearInterval(this.int)
      }
      this.int = setInterval(this.timer,20);
    },
    timer() {
      this.time.millisecond += 20;
      if (this.time.millisecond >= 1000) {
        this.time.millisecond = 0;
        this.time.second += 1;
      }
      if (this.time.second >= 60) {
        this.time.second = 0;
        this.time.minute += 1;
      }
      if (this.time.minute >= 60) {
        this.time.minute = 0;
        this.time.hour += 1;
      }
    },
    onStop() {
      if (this.int) {
        clearInterval(this.int)
        this.$emit('end', this.time)
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
