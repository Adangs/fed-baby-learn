<template>
  <view class="m-print">
    <view class="pic">
      <x-image :src="src" mode="aspectFit"></x-image>
    </view>
    <button @click="onSaveImageToPhotosAlbum">保存</button>
    <!--分享图-->
    <x-canvas v-if="lists" ref="ref-x-canvas" :lists="lists" width="2480" height="3508" auto @canvasImage="onCanvasImage">
    </x-canvas>
  </view>
</template>

<script>
import XCanvas from '@/components/x-canvas'
import XImage from '@/components/x-image'

export default {
  name: 'Print',
  components: {
    XCanvas,
    XImage
  },
  props: {},
  data () {
  return {
    lists: null,
    src: null
  };
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  methods: {
    init() {
      const list = []
      list.push({
        type: 'rect',
        width: 2480,
        height: 3508,
        x: 0,
        y: 0,
        color: '#FFF',
      })
      list.push({
        type: 'text',
        content: '立即购买',
        x: 422,
        y: 353,
        color: '#000',
        size: 24
      })
      list.push({
        type: 'rect',
        width: 160,
        height: 50,
        x: 2090,
        y: 3320,
        color: '#FF3F43',
      })
      this.lists = list
    },
    // 图片生成
    onCanvasImage(res) {
      this.src = res
      console.log(res)
    },
    onSaveImageToPhotosAlbum() {
      uni.saveImageToPhotosAlbum({
        filePath: this.src
      })
    }
  }
};
</script>

<style lang="scss">
  .pic{
    width: 500px; height: 500px;
  }
</style>
