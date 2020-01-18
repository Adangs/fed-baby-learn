<template>
  <image class="x-image" :src="imgSrc" :mode="mode" :style="{'background-color': background}"></image>
</template>

<script>
  export default {
    name: 'XImage',
    components: {},
    props: {
      isBackground: {
        type: Boolean,
        default: false
      },
      src: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'aspectFill'
      },
      size: {
        type: [String, Number],
        default: 400
      }
    },
    data() {
      return {};
    },
    computed: {
      imgSrc() {
        // 以/assets 开头的路径地址，自动替换为远程cdn地址
        // console.log(this.src)
        // 图片压缩
        let xOssProcess = '?x-oss-process=image/quality,q_80' // 自己oss上面的压缩参数
        let xAliProcess = `_${this.size}x${this.size}q90` // 阿里官方的商品图片压缩参数
        const res = uni.getSystemInfoSync()
        if (res.platform !== 'ios') {
          xOssProcess = '?x-oss-process=image/format,webp'
          xAliProcess = `_${this.size}x${this.size}_.webp`
        }

        const src = this.src.replace(/^\/assets/gi, 'https://img.alicdn.com/static/assets')
        if (src.indexOf('?') !== -1) {
          return src
        } else if (/^https:\/\/alicdn/gi.test(src) && !/\.svg$/gi.test(src)) {
          return src + xOssProcess
        } else if (src.indexOf('alicdn.com') !== -1) {
          return src + xAliProcess
        } else {
          return src
        }
      },
      background() {
        const color = ['#F7FAF7', '#FCECEC', '#F7F8FD', '#FDF2FC', '#FDFBF7']
        return this.isBackground ? color[Math.floor(Math.random() * 5)] : 'transparent'
      }
    },
    watch: {},
    created() {

    }
  };
</script>

<style lang="scss">
  .x-image{ width: 100%; height: 100%; display: block; vertical-align: middle;}
</style>
