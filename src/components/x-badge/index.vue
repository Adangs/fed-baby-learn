<template>
  <view class="x-badge" :style="{'z-index': zIndex}">
    <slot />
    <view v-if="value" class="_number">{{ value }}</view>
  </view>
</template>

<script>
export default {
  name: 'XBadge',
  components: {},
  props: {
    value: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 99
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {}
}
</script>

<style lang="scss">
  .x-badge{
    position: relative; display: inline-block;
    ._number{
      position: absolute; right: -20px; top: -20px; padding: 0 9px; min-width: 30px; line-height: 30px; height: 30px; font-size: 20px; background-color: #000; border-radius: 50%; color: #fff;
    }
  }
</style>
