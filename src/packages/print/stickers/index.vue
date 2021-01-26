<template>
  <view class="m-stickers">
    <x-navigation-bar title="字帖" />
    <view class="preview">
      <canvas canvasId="myCanvas"></canvas>
      <view v-if="src" class="pic">
        <x-image :src="src" mode="aspectFit" />
      </view>
    </view>
    <view class="textarea">
      <x-textarea :value.sync="value" height="200" placeholder="请输入汉字，最多不超过14个" maxlength="14"></x-textarea>
    </view>
    <view class="tools">
      <view class="li"><x-button>保存图片</x-button></view>
    </view>


    <x-canvas v-if="lists" ref="ref-x-canvas" :lists="lists" width="2480" height="3508" auto @canvasImage="onCanvasImage"></x-canvas>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XImage from '@/components/x-image'
import XTextarea from '@/components/x-textarea'
import XButton from '@/components/x-button'
import XCanvas from '@/components/x-canvas'

export default {
  name: 'Calculate',
  components: {
    XNavigationBar,
    XImage,
    XTextarea,
    XButton,
    XCanvas
  },
  props: {},
  data () {
  return {
    src: null,
    value: null,
    lists: null,
    config: {
      x: 96,
      y: 96,
      cell: {
        width: 210,
        height: 210
      }
    },
    canvas: null
  }
  },
  computed: {},
  watch: {},
  created () {
    this.setField()
    // this.onSetData()
  },
  methods: {
    initCanvas() {
      this.canvas = uni.createCanvasContext('myCanvas')
      console.log(this.canvas)
    },
    setField() {
      const ctx = uni.createCanvasContext('myCanvas')
      const cell = this.config.cell
      ctx.moveTo(0, 0)
      ctx.lineTo(cell.width, 0)
      ctx.lineTo(cell.width, cell.height)
      ctx.lineTo(0, cell.height)
      ctx.lineTo(0, 0)
      ctx.stroke()
      ctx.setLineDash([2, 4], 10)
      ctx.beginPath();
      ctx.moveTo(cell.width / 2,0);
      ctx.lineTo(cell.width / 2, cell.height)
      ctx.moveTo(0, cell.height / 2);
      ctx.lineTo(cell.width, cell.height / 2)
      ctx.setStrokeStyle('#999');
      ctx.stroke();

      ctx.draw(false, () => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fileType: 'jpg',
          canvasId: 'myCanvas',
          success: (res) => {
            console.log(res.tempFilePath)
          },
          fail: (res) => {
            console.warn(res);
          }
        });
      })

      console.log(ctx)
    },
    onCanvasImage(res) {
      this.src = res
      console.log(res)
    },
    onTrapezoid(type) {
      let i
      let j
    },
    onSetData(url) {
      const list = []
      list.push({
        type: 'rect',
        width: 2480,
        height: 3508,
        x: 0,
        y: 0,
        color: '#FFF',
      })
      // for (let i = 0; i < 11; i++) {
      //   list.push({
      //     type: 'image',
      //     file: '/static/images/field.png'
      //   })
      // }
      list.push({
        type: 'image',
        file: 'field.png'
      })
      // this.lists = list
    }
  }
}
</script>

<style lang="scss">
  page{ height: 100%;}
  .m-stickers{
    display: flex; flex-direction: column; height: 100%; overflow: hidden;
    .preview{
      flex: 1; background-color: #f9f9f9;
      .pic{ width: 100%; height: 100%;}
      canvas{ width: 420px; height: 420px; display: block !important;}
    }
    .textarea{ padding: 20px;}
    .tools{
      padding: 40px;
      .li{
        margin-bottom: 10px;
        &:last-child{ margin-bottom: 0;}
      }
    }
  }
</style>
