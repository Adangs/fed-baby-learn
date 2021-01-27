<template>
  <view class="m-stickers">
    <x-navigation-bar title="字帖" />
    <view class="preview">
      <view v-if="src" class="pic" @click="onPreview">
        <x-image :src="src" mode="aspectFit" />
      </view>
    </view>
    <view class="textarea">
      <x-textarea :value.sync="value" :maxlength="maxlength" height="200" placeholder="1、请输入汉字"></x-textarea>
    </view>
    <view class="tools">
      <view class="li"><x-button @click="initCanvas">2、生成字帖</x-button></view>
      <view class="li"><x-button type="primary" @click="onSavePic">3、保存图片</x-button></view>
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
    maxlength: 16,
    config: {
      x: 96,
      y: 96,
      width: 2480,
      height: 3508,
      cell: {
        fontSize: 100, // 文字大小
        fontColor: '#000', // 文字颜色
        spacing: 30, // 间距
        lineWidth: 4, // 边框宽
        width: 180,
        height: 180
      }
    },
    canvas: null
  }
  },
  computed: {},
  watch: {},
  created () {
    this.canvas = uni.createCanvasContext('previewCanvas')
    // this.initCanvas()
  },
  methods: {
    // 生成单个田字格
    setField(font) {
      return new Promise((resolve, reject) => {
        const ctx = uni.createCanvasContext('fieldCanvas')
        const cell = this.config.cell
        // 画底色
        ctx.setFillStyle('#fff')
        ctx.setLineWidth(cell.lineWidth)
        ctx.fillRect(0, 0, cell.width, cell.height)
        // 画边框
        ctx.setLineDash([0, 0], 0)
        ctx.setStrokeStyle('#000')
        ctx.strokeRect(0, 0, cell.width, cell.height)
        // 画虚线
        ctx.setLineDash([3, 6], 1)
        ctx.beginPath();
        ctx.moveTo(cell.width / 2, cell.lineWidth);
        ctx.lineTo(cell.width / 2, cell.height - cell.lineWidth)
        ctx.moveTo(cell.lineWidth, cell.height / 2);
        ctx.lineTo(cell.width - cell.lineWidth, cell.height / 2)
        ctx.setStrokeStyle('#666');
        ctx.stroke();
        // 设置文字
        if (font) {
          ctx.setFontSize(font.size || cell.fontSize)
          ctx.setFillStyle(font.color || cell.fontColor)
          ctx.setTextAlign('center')
          ctx.setTextBaseline('normal')
          const metrics = ctx.measureText(font.content)
          let tx = 1 / 2 * metrics.width
          let ty = 7 / 8 * metrics.width
          tx = tx + (cell.width - metrics.width) / 2
          ty = ty + (cell.height - metrics.width) / 2
          ctx.fillText(font.content, tx, ty)
        }

        ctx.draw(false, () => {
          // 生成单个田字格
          uni.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: cell.width,
            height: cell.height,
            fileType: 'jpg',
            canvasId: 'fieldCanvas',
            success: (res) => {
              resolve(res.tempFilePath)
            },
            fail: (err) => {
              reject(err)
              console.warn(err);
            }
          });
        })
      })
    },
    async initCanvas() {
      uni.showLoading({
        title: '字帖生成中...',
      })
      const ctx = this.canvas
      const config = this.config
      const field = await this.setField()
      const files = []
      const text = this.value ? this.value.replace(/\s/gi, '') : ''
      const list = text.split('')
      for (let i = 0; i < list.length; i++) {
        const first = await this.setField({
          content: list[i]
        });
        const weak = await this.setField({
          content: list[i],
          color: '#aaa'
        })
        files.push({
          first,
          weak
        })
      }
      // 画底色
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, config.width, config.height)
      // 计算每行多少个
      const xLen = Math.ceil((config.width - config.x * 2) / config.cell.width)
      // 计算一共多少行
      const yLen = Math.ceil((config.height - config.y * 2) / (config.cell.height + config.cell.spacing))
      for (let i = 0; i < xLen; i++) {
        for (let j = 0; j < yLen; j++) {
          const dx = config.x + i * (config.cell.width - config.cell.lineWidth)
          const dy = config.y + j * (config.cell.height - config.cell.lineWidth) + (j * config.cell.spacing)
          let file
          switch (i) {
            case 0:
              file = files[j] ? files[j].first : field
              break
            case 1:
              file = files[j] ? files[j].weak : field
              break
            default:
              file = field
              break
          }
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
          },
          complete: () => {
            uni.hideLoading()
          }
        });
      })
    },
    onSavePic() {
      if (this.src) {
        uni.saveImageToPhotosAlbum({
          filePath: this.src,
          success: () => {
            uni.showModal({
              content: '字帖保存成功，请自行打印~',
              showCancel: false
            });
          }
        })
      } else {
        uni.showToast({
          title: '请先生成字帖~',
          icon: 'none'
        });
      }
    },
    // 预览图
    onPreview () {
      // uni.previewMedia({
      //   current: 0,
      //   sources: [{
      //     url: this.src
      //   }]
      // });
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
      padding: 10px; display: flex; align-items: center;
      .li{
        flex: 1; padding: 10px;
        &:last-child{ margin-bottom: 0;}
      }
    }
    .canvas-list{ width: 0; height: 0; overflow: hidden;}
  }
</style>
