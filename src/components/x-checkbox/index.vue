<template>
  <view class="x-checkbox" @click.stop="onChange">
    <x-icon :name="icon" size="40" />
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
    }
  },
  data() {
    return {

    }
  },
  computed: {
    icon() {
      return this.checked ? 'icon-38' : 'icon-50'
    }
  },
  watch: {},
  created() {

  },
  methods: {
    onChange() {
      this.$emit('update:checked', !this.checked)
      this.$emit('change', !this.checked)
    }
  }
}
</script>

<style lang="scss">
  .x-checkbox{
    display: flex; align-items: center;
    ._label{ padding-left: 10px; font-size: 28px;}
  }
</style>
