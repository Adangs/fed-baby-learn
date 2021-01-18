<template>
  <view :class="classNameList">
    <view class="_mask" @click="onClose" />
    <view class="_body">
      <view class="_content">
        <slot />
      </view>
      <view class="_close" @click="onClose">
        <x-icon name="icon-03" color="#8A8A8A" size="36" />
      </view>
    </view>
  </view>
</template>

<script>
import XIcon from '@/components/x-icon'
export default {
  name: 'XDrawer',
  components: {
    XIcon
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'btt'
    },
    mask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    classNameList() {
      const arr = ['x-drawer']
      if (this.visible) {
        arr.push('is-show')
      }
      arr.push(`is-${this.direction}`)
      return arr.join(' ')
    }
  },
  watch: {},
  created() {

  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
  .x-drawer{
    z-index: 999; position: fixed; width: 100%; height: 100%; left: 0; top: 0;
    ._mask{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,.5);}
    ._body{
      background-color: #fff;
      ._close{ position: absolute; right: 20px; top: 20px;}
    }
    &.is-show{
      display: block;
      ._mask{ animation: fadeIn .3s ease-out;}
      ._body{
        min-height: 100px; position: absolute;
      }

    }
    &.is-btt{
      ._body{ bottom: 0; left: 0; width: 100%; animation: fadeInUp .3s ease-out; }
    }
    &.is-ttb{
      ._body{ top: 0; left: 0; width: 100%; animation: fadeInDown .3s ease-out; }
    }
    &.is-ltr{
      ._body{ left: 0; animation: fadeInLeft .3s ease-out; }
    }
    &.is-rtl{
      ._body{ right: 0; animation: fadeInRight .3s ease-out; }
    }
    &.is-rtl,
    &.is-ltr{
      ._body{
        top: 0; height: 100%; min-width: 100px;
        ._close{ top: auto; bottom: 20px;}
      }
    }
  }

  @keyframes fadeIn {
    0%{opacity: 0;}
    100%{opacity: 1;}
  }
  @keyframes fadeInUp {
    0%{opacity: 0; transform: translateY(500px)}
    100%{opacity: 1; transform: translateY(0)}
  }
  @keyframes fadeInDown {
    0%{opacity: 0; transform: translateY(-500px)}
    100%{opacity: 1; transform: translateY(0)}
  }
  @keyframes fadeInLeft {
    0%{opacity: 0; transform: translateX(-500px)}
    100%{opacity: 1; transform: translateX(0)}
  }
  @keyframes fadeInRight {
    0%{opacity: 0; transform: translateX(500px)}
    100%{opacity: 1; transform: translateX(0)}
  }
</style>
