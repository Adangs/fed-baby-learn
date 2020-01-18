<template>
  <view class="m-details">
    <view class="word">
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <text>永</text>
    </view>
    <view class="tools">
      <view class="content">
        <view class="li">
          <x-icon name="icon-035" size="100" />
        </view>
        <view class="li">
          <x-icon name="icon-033" size="100" @click="onPlay" />
        </view>
        <view class="li">
          <x-icon name="icon-034" size="100" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  export default {
    name: 'Details',
    components: {
      XIcon
    },
    props: {},
    data() {
      return {
        audio: null
      }
    },
    computed: {},
    watch: {},
    onLoad() {
      this.audio = wx.createInnerAudioContext()
    },
    methods: {
      onPlay() {
        const text = '永'
        // this.audio.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${decodeURIComponent(text)}&spd=5&source=web`
        this.audio.src = `https://translate.google.cn/translate_tts?ie=UTF-8&q=${decodeURIComponent(text)}&tl=zh-CN&total=1&idx=0&textlen=1&tk=597330.1027169&client=webapp`
        // this.audio.src = `http://tts.youdao.com/fanyivoice?word=${decodeURIComponent(text)}&le=eng&keyfrom=speaker-target`
        this.audio.play()
      }
    }
  };
</script>

<style lang="scss">
  .m-details{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0;
    .word{
      width: 100%; height: 100vw; position: relative;
      audio{ display: none;}
      .li{
        width: 50%; height: 50%; position: absolute; border: 1px solid #eee;
        &:nth-child(1){ border-left: 0; border-top: 0;}
        &:nth-child(2){ right: 0; border-right: 0; border-top: 0;}
        &:nth-child(3){ bottom: 0; border-bottom-width: 4px; border-left: 0;}
        &:nth-child(4){ bottom: 0; right: 0; border-bottom-width: 4px; border-right: 0;}
      }
      text{ position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); font-size: 400px;}
    }
    .tools{
      padding: 50px;
      .content{
        display: flex;
        .li{ flex: 1; text-align: center;}
      }
    }
  }
</style>
