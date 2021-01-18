<template>
  <view class="x-input" :class="{'is-round': round, 'is-disabled': disabled}" :style="{'background':  background}">
    <view v-if="prefixIcon" class="_prefix">
      <x-icon color="#8A8A8A" :name="prefixIcon" />
    </view>
    <view v-if="prefixPic" class="_prefix">
      <view class="_pic">
        <x-image :src="prefixPic" />
      </view>
    </view>
    <input class="_input" :value="inputValue" :placeholder-class="placeholderClass" :type="type" :disabled="disabled" :placeholder="placeholder" :maxlength="maxlength" @input="onInput" @focus="onFocus" @blur="onBlur" @confirm="onConfirm">
    <view v-if="suffixIcon" class="_suffix">
      <x-icon :name="suffixIcon" size="24" />
    </view>
    <view v-if="inputValue && clear && !disabled" class="_suffix" @click="onClear">
      <x-icon name="icon-03" color="#8A8A8A" size="24" />
    </view>
  </view>
</template>

<script>
import XIcon from '@/components/x-icon'
import XImage from '@/components/x-image'
export default {
  name: 'XInput',
  components: {
    XIcon,
    XImage
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    background: {
      type: String,
      default: '#ffffff'
    },
    // 输入框的初始内容
    value: {
      type: String,
      value: ''
    },
    // 前置icon
    prefixIcon: {
      type: String,
      default: ''
    },
    // 前置图片
    prefixPic: {
      type: String,
      default: ''
    },
    // 后缀icon
    suffixIcon: {
      type: String,
      default: ''
    },
    // 后缀清除按钮
    clear: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    placeholderClass	: {
      type: String,
      default: 'input-placeholder'
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 140
    },
    // 设置键盘右下角按钮的文字
    confirmType: {
      type: String,
      default: 'done'
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
    },
    onClear() {
      this.inputValue = ''
      this.$emit('update:value', this.inputValue)
      this.$emit('clear', this.inputValue)
    }
  }
}
</script>

<style lang="less">
  .x-input{
    height: 72px; display: flex; align-items: center;
    &.is-round{ border-radius: 50px; overflow: hidden;}
    &.is-disabled{
      ._input{ color: #999;}
    }
    ._input{ height: 100%; font-size: 28px; flex: 1; background: transparent; color: #000;}
    ._prefix,
    ._suffix{ width: 64px; height: 64px; line-height: 64px; text-align: center;}
    ._prefix{
      display: flex; align-items: center;
      ._pic{ width: 32px; height: 32px; line-height: 1; margin: 0 auto;}
    }
  }
</style>
