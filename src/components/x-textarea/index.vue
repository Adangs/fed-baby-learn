<template>
  <textarea
    class="x-textarea"
    :value="inputValue"
    :placeholder="placeholder"
    :placeholder-class="placeholderClass"
    :fixed="fixed"
    :focus="focus"
    :auto-height="autoHeight"
    :maxlength="maxlength"
    :disabled="disabled"
    :show-confirm-bar="showConfirmBar"
    :cursor-spacing="cursorSpacing"
    :hold-keyboard="holdKeyboard"
    :adjust-position="adjustPosition"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @linechange="onLine"
    @confirm="onConfirm"
  />
</template>

<script>
export default {
  name: 'XTextarea',
  components: {},
  props: {
    // 输入框的初始内容
    value: {
      type: String,
      value: ''
    },
    fixed: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition	: {
      type: Boolean,
      default: true
    },
    // focus时，点击页面的时候不收起键盘
    holdKeyboard		: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    placeholderClass	: {
      type: String,
      default: 'textarea-placeholder'
    },
    maxlength: {
      type: Number,
      default: 140
    },
    // 指定光标与键盘的距离
    cursorSpacing	: {
      type: Number,
      default: 0
    },
    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmBar	: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {},
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
      this.inputValue = target.value
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
    },
    onLine({ detail }) {
      this.$emit('line', detail)
    }
  }
}
</script>

<style lang="less">
  .x-textarea{
    width: 100%; font-size: 28px; background-color: #fff; color: #000;
  }
</style>
