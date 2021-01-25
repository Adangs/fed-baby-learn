<template>
  <view class="x-textarea" :style="{'height': height + 'rpx'}">
    <textarea class="_textarea" :value="inputValue" :placeholder-class="placeholderClass" :placeholder="placeholder" :maxlength="maxlength" @input="onInput" @focus="onFocus" @blur="onBlur" @confirm="onConfirm" />
  </view>
</template>

<script>
  export default {
    name: 'XTextarea',
    components: {},
    props: {
      background: {
        type: String,
        default: '#ffffff'
      },
      // 输入框的初始内容
      value: {
        type: String,
        value: ''
      },
      // 高
      height: {
        type: [String, Number],
        default: 300
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      placeholderClass	: {
        type: String,
        default: 'input-placeholder'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      focus: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [String, Number],
        default: 140
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    computed: {

    },
    watch: {
      value(val) {
        this.inputValue = val
      }
    },
    created() {
      this.inputValue = this.value
    },
    methods: {
      onInput({ target }) {
        // console.log(...arguments)
        this.inputValue = target.value
        this.$emit('update:value', target.value)
        this.$emit('input', this.inputValue, target)
      },
      onFocus() {
        this.$emit('focus', this.inputValue)
      },
      onBlur() {
        this.$emit('blur', this.inputValue)
      },
      onConfirm() {
        this.$emit('confirm', this.inputValue)
      }
    }
  }
</script>

<style lang="scss">
  .x-textarea{
    display: flex; align-items: center; padding: 20px 0;
    ._textarea{ height: 100%; font-size: $uni-font-size-sm; flex: 1; background: transparent; color: $uni-text-color;}
  }
</style>
