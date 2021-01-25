<template>
  <view class="x-checkbox" :class="{'is-disabled': disabled}" @click.stop="onChange">
    <x-icon :name="icon" :size="size" :color="color" />
    <view v-if="label" class="_label">{{ label }}</view>
  </view>
</template>

<script>
import XIcon from '@/components/x-icon'
export default {
  name: 'XCheckbox',
  components: {
    XIcon
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {

    }
  },
  computed: {
    icon() {
      return this.checked ? 'icon-018' : 'icon-016'
    },
    color() {
      return this.disabled ? '#ccc' : (this.checked ? '#0170fe' : '#333333')
    }
  },
  watch: {},
  created() {

  },
  methods: {
    onChange() {
      if (this.disabled) return false
      this.$emit('update:checked', !this.checked)
      this.$emit('change', !this.checked)
    }
  }
}
</script>

<style lang="scss">
  .x-checkbox{
    display: flex; align-items: center;
    &.is-disabled{}
    ._label{ padding-left: 10px;}
  }
</style>
