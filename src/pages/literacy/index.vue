<template>
  <view class="m-details">
    <view class="back" :style="'top:' + statusBarHeight + 'px'">
      <view class="x-icon">
        <x-icon name="icon-008" size="60" @click="onBack" />
      </view>
    </view>
    <block v-if="query.type">
      <view class="word">
        <view class="li"></view>
        <view class="li"></view>
        <view class="li"></view>
        <view class="li"></view>
        <text>{{word}}</text>
        <!--切换-->
        <view class="icon" @click="onSetRandom">
          <view class="x-icon">
            <x-icon :name="isRandom ? 'icon-038' : 'icon-037'" size="60" />
          </view>
        </view>
        <!-- 自动播放-->
        <view :class="{'is-auto': autoPlay}" class="icon auto-play" @click="onSetAuto">
          <view class="x-icon">
            <x-icon name="icon-032" size="50" />
          </view>
        </view>
        <!--重置-->
        <view class="icon refresh" @click="onRefresh">
          <view class="x-icon">
            <x-icon name="icon-013" size="50" />
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
      <view v-if="tabs && tabs.length" class="tabs">
        <view v-for="item in tabs" :key="item" class="li">
          <view :class="{'active': current === item}" class="item" @click="onChangeList(item)">{{item}}</view>
        </view>
      </view>
      <view class="tips">音频来源百度翻译</view>
    </block>
    <block v-else>
      <view class="x-empty">
        <text>敬请期待~</text>
      </view>
    </block>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  import Thesaurus from '@/thesaurus'

  export default {
    name: 'Literacy',
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
        current: null,
        word: '永',
        isRandom: uni.getStorageSync('storage-is-random') || false,
        autoPlay: uni.getStorageSync('storage-is-auto-play') || false
      }
    },
    computed: {
      isDisabled() {
        return this.index === 0 && !this.isRandom
      },
      tabs() {
        const list = []
        for (const key in Thesaurus) {
          list.push(key)
        }
        return list
      }
    },
    watch: {},
    onLoad(opt) {
      this.query = opt
      this.current = this.query.type
      if (this.query.index) {
        this.index = +this.query.index
      }
      this.setList()
    },
    onShareAppMessage() {
      const title = `【${this.word}】这个字读什么？`
      return {
        title,
        imageUrl: '/static/images/144x144.png',
        path: `/pages/literacy/index?type=${this.query.type}&index=${this.index}`
      }
    },

    // 本接口为 Beta 版本，暂只在 Android 平台支持
    onShareTimeline() {
      const title = `这个字读【${this.word}】`
      return {
        title,
        imageUrl: '/static/images/144x144.png',
      }
    },
    methods: {
      onChangeList(item) {
        if (this.current !== item) {
          this.current = item
          this.index = 0
          this.setList()
        }
      },
      setList() {
        this.list = Thesaurus[this.current].split('')
        this.word = this.list[this.index]
      },
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
        if (this.autoPlay) {
          this.onPlay()
        }
      },
      // 下一个
      onNext() {
        if (this.isRandom) {
          // 随机
          this.index = Math.floor(Math.random() * this.list.length)
          this.word = this.list[this.index]
        } else {
          let index = Number(this.index) + 1
          if (index >= this.list.length) {
            index = 0
          }
          this.index = index
          this.word = this.list[this.index]
          uni.setStorageSync('storage-orderly-index', this.index)
        }
        if (this.autoPlay) {
          this.onPlay()
        }
      },
      onSetRandom() {
        this.isRandom = !this.isRandom
        uni.showToast({
          title: this.isRandom ? '随机播放' : '顺序播放'
        })
        uni.setStorageSync('storage-is-random', this.isRandom)
      },
      onBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      onRefresh() {
        this.index = 0
        this.word = this.list[this.index]
        this.onPlay()
        uni.setStorageSync('storage-orderly-index', this.index)
        uni.showToast({
          title: '重置成功'
        })
      },
      onSetAuto() {
        this.autoPlay = !this.autoPlay
        uni.setStorageSync('storage-is-auto-play', this.autoPlay)
        uni.showToast({
          title: this.autoPlay ? '自动播放' : '不自动播放'
        })
      }
    }
  };
</script>

<style lang="scss">
  .m-details{
    position: absolute; width: 100%; height: 100%; left: 0; top: 0;
    .back{
      height: 100px; width: 100px; position: absolute; left: 0; display: flex; align-items: center; z-index: 99;
      .x-icon{ flex: 1; text-align: center;}

    }
    .word{
      width: 100%; height: 100vw; position: relative; background-color: #C7EDCC;
      .icon{
        position: absolute; width: 100px; height: 100px; bottom: 0; right: 0; text-align: center; display: flex; align-items: center;
        &.refresh{ right: auto; left: 0;}
        &.auto-play{
          left: 50%; transform: translate(-50%, 0); opacity: .5;
          &.is-auto{ opacity: 1;}
        }
        .x-icon{ width: 100%;}
      }
      .li{
        width: 50%; height: 50%; position: absolute; border: 1px solid #B0D3B8; overflow: hidden;
        &:after{ content: ''; position: absolute; width: 200%; border-bottom: 2px dashed #B0D3B8; }
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
    .tabs{
      display: flex; flex-wrap: wrap;
      padding: 10px;
      .li{
        padding: 10px; width: 25%;
        .item{
          padding: 10px 20px; background: #fafafa; border-radius: 20px; border: 2px solid #ddd; text-align: center;
          &.active{ background-color: #C7EDCC; border-color: #C7EDCC;}
        }
      }
    }
    .tips{ color: #ddd; width: 100%; text-align: center; font-size: 22px; padding: 20px 0;}
    .x-empty{
      position: absolute; width: 100%; height: 100%;
      text{ position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); font-size: 50px; color: #999;}
    }
  }
</style>
