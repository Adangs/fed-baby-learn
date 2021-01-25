<template>
  <view :class="classNameList" :style="{'background':  background}">
    <view v-if="prefixIcon" class="_prefix">
      <x-icon color="#8A8A8A" :name="prefixIcon" />
    </view>
    <input class="_input" :style="{'text-align': textAlign}" :value="inputValue" :placeholder-class="placeholderClass" :type="type" :placeholder="placeholder" :maxlength="maxlength" :confirm-type="confirmType" @input="onInput" @focus="onFocus" @blur="onBlur" @confirm="onConfirm">
    <view v-if="suffixIcon" class="_suffix">
      <x-icon :name="suffixIcon" size="24" />
    </view>
    <view v-if="inputValue && clear" class="_suffix" @click="onClear">
      <x-icon name="icon-005" color="#8A8A8A" size="24" />
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  export default {
    name: 'XInput',
    components: {
      XIcon
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
      // 后缀icon
      suffixIcon: {
        type: String,
        default: ''
      },
      // 大小
      size: {
        type: String,
        default: 'medium'
      },
      // 对齐方式
      textAlign: {
        type: String,
        default: 'left'
      },
      // 后缀清除按钮
      clear: {
        type: Boolean,
        default: false
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
      // class列表
      classNameList() {
        const name = ['x-input'];
        name.push(`is-${this.size}`);
        if (this.round) {
          name.push('is-round')
        }
        if (this.disabled) {
          name.push('is-disabled')
        }
        return name.join(' ')
      }
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

<style lang="scss">
  .x-input{
    display: flex; align-items: center;
    &.is-round{ overflow: hidden;}
    ._input{ height: 100%; font-size: $uni-font-size-sm; flex: 1; background: transparent; color: $uni-text-color;}
    ._prefix,
    ._suffix{ width: 64px; height: 64px; line-height: 64px; text-align: center;}

    // 中号
    &.is-medium{
      height: $uni-height-size-base;
      &.is-round{ border-radius: $uni-height-size-base;}
    }
    // 小号
    &.is-small{
      height: $uni-height-size-sm;
      &.is-round{ border-radius: $uni-height-size-sm;}
    }
  }
</style>
