<template>
  <view class="m-stickers">
    <x-navigation-bar title="字帖" />
    <view class="preview">
      <view v-if="src" class="pic">
        <x-image :src="src" mode="aspectFit" />
      </view>
    </view>
    <view class="textarea">
      <x-textarea :value.sync="value" height="200" placeholder="请输入汉字，最多不超过14个" maxlength="14"></x-textarea>
    </view>
    <view class="tools">
      <view class="li"><x-button @click="onSavePic">保存图片</x-button></view>
    </view>
    <view class="canvas-list">
      <canvas :style="'width: '+ config.width +'px; height: '+ config.height +'px;'" canvasId="previewCanvas"></canvas>
      <canvas :style="'width: '+ config.cell.width +'px; height: '+ config.cell.height +'px;'" canvasId="fieldCanvas"></canvas>
    </view>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XImage from '@/components/x-image'
import XTextarea from '@/components/x-textarea'
import XButton from '@/components/x-button'

export default {
  name: 'Calculate',
  components: {
    XNavigationBar,
    XImage,
    XTextarea,
    XButton
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
      width: 2480,
      height: 3508,
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
  },
  methods: {
    setField() {
      const ctx = uni.createCanvasContext('fieldCanvas')
      const cell = this.config.cell
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, cell.width, cell.height)
      ctx.setLineWidth(2)
      ctx.setStrokeStyle('#000')
      ctx.strokeRect(0, 0, cell.width, cell.height)
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
          width: cell.width,
          height: cell.height,
          fileType: 'jpg',
          canvasId: 'fieldCanvas',
          success: (res) => {
            this.initCanvas(res.tempFilePath)
          },
          fail: (err) => {
            console.warn(err);
          }
        });
      })
    },
    initCanvas(file) {
      const ctx = uni.createCanvasContext('previewCanvas')
      const config = this.config
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 14; j++) {
          const dx = config.x + i * (config.cell.width - 2)
          const dy = config.y + j * (config.cell.height - 2) + (j * 30)
          ctx.drawImage(file, dx, dy, config.cell.width, config.cell.height)
        }
      }

      ctx.draw(false, () => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: config.width,
          height: config.height,
          fileType: 'jpg',
          canvasId: 'previewCanvas',
          success: (res) => {
            console.log(res.tempFilePath)
            this.src = res.tempFilePath
          },
          fail: (err) => {
            console.warn(err);
          }
        });
      })
    },
    onSavePic() {
      if (this.src) {
        uni.saveImageToPhotosAlbum({
          filePath: this.src,
          success: () => {
            uni.showToast({
              title: '图片保存成功，请自行打印~',
              icon: 'success'
            });
          }
        })
      } else {
        uni.showToast({
          title: '请先生成图片~',
          icon: 'none'
        });
      }
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
    }
    .textarea{ padding: 20px;}
    .tools{
      padding: 40px;
      .li{
        margin-bottom: 10px;
        &:last-child{ margin-bottom: 0;}
      }
    }
    .canvas-list{ width: 0; height: 0; overflow: hidden;}
  }
</style>
