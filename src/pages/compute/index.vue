<template>
  <view class="m-details">
    <view class="back" :style="'top:' + statusBarHeight + 'px'">
      <view class="x-icon">
        <x-icon name="icon-008" size="60" @click="onBack" />
      </view>
    </view>
    <view class="word">
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="topic">
        <view class="topic-a">10</view>
        <view class="symbol">+</view>
        <view class="topic-b">10</view>
        <view class="symbol">=</view>
        <view class="answer">({{ answer || '' }})</view>
      </view>
      <!--数量-->
      <view class="count">
        10/100
      </view>
      <!--切换-->
      <view class="icon refresh" @click="onSwitch">
        <view class="x-icon">
          <x-icon name="icon-019" size="50" />
        </view>
      </view>
      <!--换题-->
      <view class="icon" @click="onRefresh">
        <view class="x-icon">
          <x-icon name="icon-013" size="60" />
        </view>
      </view>
    </view>
    <!--结果列表-->
    <view class="result">
      <view v-for="item in 101" :key="item" class="li">
        <view class="item">{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'

  export default {
    name: 'Compute',
    components: {
      XIcon
    },
    props: {},
    data() {
      return {
        query: {},
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
        index: uni.getStorageSync('storage-orderly-index') || 0,
        list: null,
        history: [],
        audio: null,
        answer: null,
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

    },
    onShareAppMessage() {
      return {
        imageUrl: '/static/images/144x144.png',
        title: '我正在学认字',
        path: `/pages/details/index?type=${this.query.type}&index=${this.index}`
      }
    },
    methods: {
      onPlay() {
        const audio = uni.createInnerAudioContext()
        audio.autoplay = true
        audio.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${encodeURIComponent(this.word)}&spd=5&source=wise`
        // this.audio.src = `http://tts.youdao.com/fanyivoice?word=${decodeURIComponent(text)}&le=eng&keyfrom=speaker-target`
        console.log('url -> ', audio.src)
        // audio.onError((err) => {
        //   console.log('onError -> ', err)
        // })
        // audio.onPlay((res) => {
        //   console.log('onPlay -> ', res)
        // })
        audio.play()
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
        // 跳过，下一题
      },
      onRefresh() {
        // 重置
      },
      onBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      onSwitch() {

      }
    }
  };
</script>

<style lang="scss">
  .m-details{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0; display: flex; flex-direction: column; overflow: hidden;
    .back{
      height: 100px; width: 100px; position: absolute; left: 0; display: flex; align-items: center; z-index: 99;
      .x-icon{ flex: 1; text-align: center;}
    }
    .word{
      width: 100%; height: 100vw; position: relative;
      .icon{
        position: absolute; width: 100px; height: 100px; bottom: 0; right: 0; text-align: center; display: flex; align-items: center;
        &.refresh{ right: auto; left: 0;}
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
      .topic{
        position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex; align-items: center; font-size: 100px;
        .symbol{ padding: 0 10px;}
        .answer{ color: #129B00;}
      }
      .count{ position: absolute; width: 100%; bottom: 0; padding: 20px; text-align: center; color: #999;}
    }
    .result{
      display: flex; align-items: center; flex-wrap: wrap; font-size: 40px; flex: 1; overflow: auto; padding: 10px;
      .li{ padding: 10px;}
      .item{ background-color: #f8f8f8; width: 100px; height: 100px; line-height: 100px; text-align: center;}
    }
  }
</style>
