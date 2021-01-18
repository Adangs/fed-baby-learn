<template>
  <view class="x-quantity">
    <view class="_icon _minus" :class="{'_disabled': minusDisabled}" @click.stop="onChange(-1)">
      <x-icon name="icon-32" :color="minusDisabled ? '#bbb' : '#111'" />
    </view>
    <view class="_num">{{ count }}</view>
    <view class="_icon _push" :class="{'_disabled': pushDisabled}" @click.stop="onChange(1)">
      <x-icon name="icon-31" :color="pushDisabled ? '#bbb' : '#111'" />
    </view>
  </view>
</template>

<script>
import XIcon from '@/components/x-icon'
export default {
  name: 'XQuantity',
  components: {
    XIcon
  },
  props: {
    count: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    minusDisabled() {
      return this.count === this.min
    },
    pushDisabled() {
      return this.count >= 99
    }
  },
  watch: {},
  created() {

  },
  methods: {
    onChange(val) {
      if (val === this.min && this.pushDisabled) return
      if (val === -1 && this.minusDisabled) return
      if (this.loading) return
      const value = this.count + val
      this.$emit('update:count', value)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
  .x-quantity{
    display: flex; align-items: center;
    ._icon{
      width: 40px; height: 40px; background: #f1f1f1; text-align: center; display: flex; align-items: center;
      &._disabled{ background: #fafafa;}
      x-icon{ width: 100%;}
    }
    ._num{ min-width: 70px; line-height: 40px; text-align: center; font-size: 26px;}
  }
</style>
