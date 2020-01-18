<template>
  <view class="m-details">
    <view class="word">
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <text>{{word}}</text>
      <view class="icon" @click="onSetRandom">
        <view class="x-icon">
          <x-icon :name="isRandom ? 'icon-038' : 'icon-037'" size="60" />
        </view>
      </view>
    </view>
    <view class="tools">
      <view class="content">
        <view v-if="!isRandom" class="li">
          <x-icon name="icon-035" size="100" @click="onPrev" />
        </view>
        <view class="li">
          <x-icon name="icon-033" size="100" @click="onPlay" />
        </view>
        <view class="li">
          <x-icon name="icon-034" size="100" @click="onNext" />
        </view>
      </view>
    </view>
    <view class="tips">音频来源百度翻译</view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  import Thesaurus from '@/thesaurus'

  export default {
    name: 'Details',
    components: {
      XIcon
    },
    props: {},
    data() {
      return {
        index: uni.getStorageSync('storage-orderly-index') || 0,
        list: null,
        history: [],
        audio: null,
        word: '永',
        isRandom: uni.getStorageSync('storage-is-random') || false
      }
    },
    computed: {
      isDisabled() {
        return this.index === 0 && !this.isRandom
      }
    },
    watch: {},
    onLoad() {
      this.audio = wx.createInnerAudioContext()
      this.list = Thesaurus.one.split(',')
      this.word = this.list[this.index]
      this.onPlay()
    },
    methods: {
      onPlay() {
        console.log(this.word)
        this.audio.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${decodeURIComponent(this.word)}&spd=5&source=web`
        // this.audio.src = `http://tts.youdao.com/fanyivoice?word=${decodeURIComponent(text)}&le=eng&keyfrom=speaker-target`
        this.audio.play()
      },
      // 上一个
      onPrev() {
        let index = Number(this.index) - 1
        if (index < 0) {
          index = this.list.length - 1
        }
        this.index = index
        this.word = this.list[this.index]
        uni.setStorageSync('storage-orderly-index', this.index)
        this.onPlay()
      },
      // 下一个
      onNext() {
        if (this.isRandom) {
          // 随机

        } else {
          let index = Number(this.index) + 1
          if (index >= this.list.length) {
            index = 0
          }
          this.index = index
          this.word = this.list[this.index]
          uni.setStorageSync('storage-orderly-index', this.index)
        }
        this.onPlay()
      },
      random() {
        const index = Math.floor(Math.random() * (this.list.length + 1))
        const word = this.list[index]
      },
      onSetRandom() {
        this.isRandom = !this.isRandom
        uni.setStorageSync('storage-is-random', this.isRandom)
      }
    }
  };
</script>

<style lang="scss">
  .m-details{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0;
    .word{
      width: 100%; height: 100vw; position: relative;
      .icon{
        position: absolute; width: 100px; height: 100px; bottom: 0; right: 0; text-align: center; display: flex; align-items: center;
        .x-icon{ width: 100%;}
      }
      .li{
        width: 50%; height: 50%; position: absolute; border: 1px solid #eee; overflow: hidden;
        &:after{ content: ''; position: absolute; width: 200%; border-bottom: 2px dashed #eee; }
        &:nth-child(1){
          border-left: 0; border-top: 0;
          &:after{
            transform: rotate(45deg) scale(2); left: 0; bottom: 0;
          }
        }
        &:nth-child(2){
          right: 0; border-right: 0; border-top: 0;
          &:after{
            transform: rotate(-45deg) scale(2); left: 0; top: 0;
          }
        }
        &:nth-child(3){
          bottom: 0; border-bottom-width: 4px; border-left: 0;
          &:after{
            transform: rotate(-45deg) scale(2); left: 0; top: 0;
          }
        }
        &:nth-child(4){
          bottom: 0; right: 0; border-bottom-width: 4px; border-right: 0;
          &:after{
            transform: rotate(45deg) scale(2); left: 0; bottom: 0;
          }
        }
      }
      text{ position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); font-size: 400px;}
    }
    .tools{
      padding: 50px;
      .content{
        display: flex;
        .li{
          flex: 1; text-align: center;
          &.is-disabled{
            opacity: .3;
            &:active{ opacity: .3;}
          }
          &:active{ opacity: .6;}
        }
      }
    }
    .tips{ position: absolute; bottom: 20px; color: #eee; width: 100%; text-align: center; font-size: 22px;}
  }
</style>
