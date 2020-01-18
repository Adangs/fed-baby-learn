<template>
  <form report-submit @submit="onSubmit" @reset="onReset">
    <button
      hover-class="none"
      :class="classNameList"
      :plain="plain"
      :disabled="disabled || loading"
      :loading="loading"
      :scope="scope"
      :open-type="openType"
      :form-type="formType"
      @click="onClick"
    >
      <slot />
    </button>
  </form>
</template>

<script>
  export default {
    name: 'XButton',
    components: {},
    props: {
      size: {
        type: String,
        default: 'medium'
      },
      type: {
        type: String,
        default: 'primary'
      },
      lang: {
        type: String,
        default: 'zh_CN'
      },
      scope: {
        type: String,
        default: ''
      },
      round: {
        type: Boolean,
        default: true
      },
      // 按钮是否镂空，背景色透明
      plain: {
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
      openType: {
        type: String,
        default: ''
      },
      formType: {
        type: String,
        default: 'submit'
      }
    },
    data() {
      return {};
    },
    computed: {
      // class列表
      classNameList() {
        const name = ['x-button']
        if (this.plain) {
          // 按钮是否镂空，背景色透明
          name.push('is-plain')
        } else {
          name.push(`is-${this.type}`)
          name.push(`is-${this.size}`)
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
    created() {

    },
    methods: {
      onClick() {
        console.log('click')
        this.$emit('click')
      },
      onSubmit({ detail }) {
        const { formId } = detail
        console.log('formId-> ', formId)
        if (formId === 'the formId is a mock one') return
        this.$http({
          method: 'post',
          error: false,
          url: '/mall/form/save',
          data: {
            formId
          }
        })
        this.$emit('submit')
      },
      onReset() {
        this.$emit('reset')
      }
    }
  };
</script>

<style lang="scss">
  .x-button{
    border: 0 !important; color: inherit; word-break: break-all; border-radius: 0; text-align: center; vertical-align: middle;
    &:after{ display: none; }
    &.is-plain{ padding: 0; margin: 0; width: auto; height: auto; line-height: inherit; font-size: inherit;}
    // 默认
    &.is-default{
      background: $uni-color-primary-light-9; color: $uni-color-primary;
      &:active{
        background: $uni-color-warning-light-9;
      }
    }
    // 主要
    &.is-primary{
      background: $uni-color-primary; background: linear-gradient(to right, $uni-color-secondary, $uni-color-primary); color: #fff;
      &:active{
        background: $uni-color-secondary; background: linear-gradient(to right, $uni-color-primary, $uni-color-secondary);
      }
    }

    &.is-linear{
      background:linear-gradient(90deg,rgba(255,97,157,1),rgba(255,29,36,1)); color: #fff;
      &:active{
        background:linear-gradient(90deg,rgba(255,29,36,1),rgba(255,97,157,1));
      }
    }

    &.is-border{
      background:#fff; color: #FE3D6C;border: 2px solid #FE3D6C!important;
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
    &.is-disabled,
    &.is-disabled:active{
      background: $uni-color-primary-light-5; background: linear-gradient(to right, $uni-color-warning-light-5, $uni-color-primary-light-5); color: #fff !important;
    }
  }
</style>
