<template>
  <button
    hover-class="none"
    :class="classNameList"
    :plain="plain || transparent"
    :disabled="disabled || loading"
    :loading="loading"
    :scope="scope"
    :open-type="openType"
    :show-message-card="showMessageCard"
    :send-message-path="sendMessagePath"
    :send-message-title="sendMessageTitle"
    @click.stop="onClick"
    @getuserinfo="onGetUserInfo"
    @getAuthorize="onGetAuthorize"
    @getPhoneNumber="onGetAuthorize"
    @contact="onContact"
  >
    <template v-if="icon">
      <view class="inline-block">
        <view class="flex">
          <view class="_icon">
            <x-icon :name="icon" :color="iconColor" :size="iconSize" />
          </view>
          <view class="_slot">
            <slot />
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script>
  import XIcon from '@/components/x-icon'

  export default {
    name: 'XButton',
    components: {
      XIcon
    },
    props: {
      size: {
        type: String,
        default: 'medium'
      },
      type: {
        type: String,
        default: 'default'
      },
      lang: {
        type: String,
        default: 'zh_CN'
      },
      scope: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      iconColor: {
        type: String,
        default: '#333'
      },
      iconSize: {
        type: Number,
        default: 32
      },
      round: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      // 按钮是否镂空，背景色透明
      transparent: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      showMessageCard: {
        type: Boolean,
        default: false
      },
      sendMessagePath: {
        type: String,
        default: ''
      },
      sendMessageTitle: {
        type: String,
        default: ''
      },
      openType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    computed: {
      // class列表
      classNameList() {
        const name = ['x-button'];
        name.push(`is-${this.size}`);
        if (this.transparent) {
          // 按钮是否镂空，背景色透明
          name.push('is-transparent')
        } else {
          name.push(`is-${this.type}`)
        }
        if (this.plain) {
          name.push('is-plain')
        }
        if (this.round) {
          name.push('is-round')
        }
        if (this.disabled || this.loading) {
          name.push('is-disabled')
        }
        return name.join(' ')
      }
    },
    watch: {},
    created() {},
    methods: {
      onClick(e) {
        this.$emit('click', e);
      },
      onGetAuthorize() {
        this.$emit('getAuthorize', ...arguments)
      },
      onGetUserInfo() {
        this.$emit('getUserInfo', ...arguments)
      },
      onContact({ detail }) {
        this.$emit('getContact', detail)
      }
    }
  };
</script>

<style lang="scss">
  .x-button{
    border: 0 !important; color: inherit; word-break: break-all; border-radius: 8px; text-align: center; vertical-align: middle;
    ._icon{ margin-right: 5px;}
    &:after{ display: none; }
    // 默认
    &.is-default{
      background-color: $uni-color-info-light-9; color: $uni-text-color;
      &:active{
        background-color: $uni-color-info-light-8;
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-info-light-7; background: linear-gradient(to right, $uni-color-info-light-7, $uni-color-info-light-7); color: #fff !important;
      }
    }
    // 主要
    &.is-primary{
      background-color: $uni-color-primary; color: #fff;
      &:active{
        background-color: $uni-color-secondary;
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-primary-light-5; background: linear-gradient(to right, $uni-color-primary-light-5, $uni-color-primary-light-5); color: #fff !important;
      }
    }
    &.is-warning{
      background: linear-gradient(90deg, $uni-color-warning-light-1, $uni-color-warning); color: #fff;
      &:active{
        background:linear-gradient(90deg, $uni-color-warning, $uni-color-warning-light-1);
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-warning-light-5; background: linear-gradient(to right, $uni-color-warning-light-5, $uni-color-warning-light-5); color: #fff !important;
      }
    }
    &.is-success{
      background: linear-gradient(90deg, $uni-color-success-light-1, $uni-color-success); color: #fff;
      &:active{
        background:linear-gradient(90deg, $uni-color-success, $uni-color-success-light-1);
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-success-light-5; background: linear-gradient(to right, $uni-color-success-light-5, $uni-color-success-light-5); color: #fff !important;
      }
    }
    &.is-error{
      background: linear-gradient(90deg, $uni-color-error-light-1, $uni-color-error); color: #fff;
      &:active{
        background:linear-gradient(90deg, $uni-color-error, $uni-color-error-light-1);
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-error-light-5; background: linear-gradient(to right, $uni-color-error-light-5, $uni-color-error-light-5); color: #fff !important;
      }
    }

    // 大号
    &.is-large{
      height: $uni-height-size-lg; line-height: $uni-height-size-lg; font-size: $uni-font-size-lg;
      &.is-round{ border-radius: $uni-height-size-lg;}
    }
    // 中号
    &.is-medium{
      height: $uni-height-size-base; line-height: $uni-height-size-base; font-size: $uni-font-size-base;
      &.is-round{ border-radius: $uni-height-size-base;}
    }
    // 小号
    &.is-small{
      height: $uni-height-size-sm; line-height: $uni-height-size-sm; font-size: $uni-font-size-sm;
      &.is-round{ border-radius: $uni-height-size-sm;}
    }

    // cover
    &.is-cover{
      margin: 0;border: 0;padding: 0;background: transparent;position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 1;
      &:active{
        background: transparent;
      }
    }

    &.is-plain{
      background: transparent; border: 2px solid $uni-color-primary !important; color: $uni-color-primary;
      &:active{ background: transparent; }
    }

    // 边框
    &.is-border{
      background-color: $uni-color-white; color: $uni-text-color; border: 1px solid #EDEDED !important;
      &:active{
        background-color: $uni-color-info-light-9;
      }

      &.is-disabled,
      &.is-disabled:active{
        background: $uni-color-info-light-7; background: linear-gradient(to right, $uni-color-info-light-7, $uni-color-info-light-7); color: #fff !important;
      }
    }

    &.is-transparent{
      padding: 0; margin: 0; width: auto; height: auto; line-height: inherit; font-size: inherit; border-radius: 0 !important;
      &:active{
        background-color: transparent;
      }
    }
  }
</style>
