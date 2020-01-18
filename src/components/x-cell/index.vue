<template>
  <view class="x-cell" :class="type ? 'is-' + type : ''" @click="onClick">
    <view class="_title">{{title}}</view>
    <view class="_suffix">
      <view class="_suffix">{{suffix}}</view>
      <x-icon name="icon-right" color="#8A8A8A" size="24" />
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'

  export default {
    name: 'XCell',
    components: {
      XIcon
    },
    props: {
      type: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      showArrow: {
        type: Boolean,
        default: true
      },
      suffix: {
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    computed: {
      userState() {
        return this.$store.state.user
      }
    },
    watch: {},
    created() {

    },
    methods: {
      onClick(e) {
        if (this.url) {
          if (this.userState.token) {
            uni.navigateTo({
              url: this.url
            })
            this.$emit('click', e)
          } else {
            this.$emit('click', false, 'auth')
          }
        } else {
          this.$emit('click', false, 'url')
        }
      }
    }
  };
</script>

<style lang="scss">
  .x-cell{
    background: #fff; border-bottom: 1px solid $uni-bg-color-grey; height: 90px; display: flex; align-items: center; padding: 0 30px; font-size: $uni-font-size-sm;
    &:active{ background-color: $uni-bg-color-active;}
    ._title{ flex: 1;}
    ._suffix{
      display: flex; align-items: center;
      ._suffix{ padding: 0 5px; font-size: $uni-font-size-mini;}
    }
    &.is-alert{
      background: $uni-color-primary; background: linear-gradient(to right, $uni-color-secondary, $uni-color-primary); color: #fff; height: 70px;
      .x-icon{ color: #fff !important;}
    }
  }
</style>
