<template>
  <view class="m-calculate">
    <x-navigation-bar title="数学" />
    <view class="preview">

    </view>
    <view class="tools">
      <view class="li"><x-button>九九乘法表</x-button></view>
      <view class="li"><x-button>10以内加法口算表</x-button></view>
      <view class="li"><x-button>10以内减法口算表</x-button></view>
      <view class="li"></view>
    </view>

    <x-canvas v-if="value" ref="ref-x-canvas" :lists="value" width="2480" height="3508" auto @canvasImage="onCanvasImage"></x-canvas>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XImage from '@/components/x-image'
import XButton from '@/components/x-button'
import XCanvas from '@/components/x-canvas'

export default {
  name: 'Calculate',
  components: {
    XNavigationBar,
    XImage,
    XButton,
    XCanvas
  },
  props: {},
  data () {
  return {
    value: null,
    tableConfig: {
      cell: {
        width: 300,
        height: 100
      }
    }
  }
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    onCanvasImage() {

    },
    onTrapezoid(type) {
      let i
      let j
    }
  }
}
</script>

<style lang="scss">
  .m-calculate{
    .preview{ background-color: #f9f9f9; height: 500px;}
    .tools{
      padding: 40px;
      .li{
        margin-bottom: 10px;
        &:last-child{ margin-bottom: 0;}
      }
    }
  }
</style>
