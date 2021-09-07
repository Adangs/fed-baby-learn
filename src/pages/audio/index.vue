<template>
  <view class="m-list">
    <x-navigation-bar title="音频" />
    <view class="ul">
      <view v-for="(item, index) in lists" :key="index" class="li">
        <view class="item" @click="onPlay(item)">
          <view class="pic">
            <x-icon :name="item.play ? 'icon-036' : 'icon-033'" size="50" />
          </view>
          <view class="dl">
            <view class="dt">{{ item.title }}</view>
            <view class="dd">{{ item.category }}</view>
          </view>
        </view>
      </view>
    </view>
    <div v-if="current" class="audio">
      <x-audio ref="x-audio" :play.sync="current.play" :src="current.url" :name="current.title" :author="current.category" />
    </div>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XIcon from '@/components/x-icon'
import XAudio from '@/components/x-audio'

export default {
  name: 'Print',
  components: {
    XIcon,
    XAudio,
    XNavigationBar
  },
  props: {},
  data () {
  return {
    lists: [{
      category: '语文',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YW-001.mp3',
      title: '弟子规',
      play: false
    }, {
      category: '英语',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YY-001.wav',
      title: '英语课程教科书一年级 A',
      play: false
    }],
    play: false,
    audio: null,
    current: null
  };
  },
  computed: {},
  watch: {},
  onLoad () {
    // this.audio = uni.createInnerAudioContext()
    // this.audio.autoplay = true
    // this.audio.obeyMuteSwitch = false
    // this.audio.onPlay(() => {
    //   console.log('开始播放')
    // })
  },
  onHide() {
    if (this.audio && this.audio.destroy) {
      this.audio.stop()
      this.audio.destroy()
    }
  },
  onUnload() {
    if (this.audio && this.audio.destroy) {
      this.audio.stop()
      this.audio.destroy()
    }
  },
  methods: {
    onPlay(item) {
      if (this.current && this.current.url !== item.url) {
        this.current.play = false
        this.$nextTick(() => {
          this.$refs['x-audio'].audioPause && this.$refs['x-audio'].audioPause()
        })
        this.current = item
      } else {
        this.current = item
      }
      if (this.current.play) {
        this.$nextTick(() => {
          this.$refs['x-audio'].audioPause && this.$refs['x-audio'].audioPause()
        })
        item.play = false
      } else {
        this.$nextTick(() => {
          this.$refs['x-audio'].audioPlay && this.$refs['x-audio'].audioPlay()
        })
        item.play = true
      }
    }
  }
};
</script>

<style lang="scss">
  page{ background-color: #fafafa;}
  .m-list{
    height: 100vh; display: flex; flex-direction: column;
    .ul{ width: 100%; padding: 10px; flex: 1;}
    .li{ padding: 10px;}
    .item{
      display: flex; align-items: center; background-color: #fff; padding: 5px;
      .pic{
        width: 120px; height: 120px; background-color: #fafafa; display: flex; align-items: center; justify-content: center;
      }
      .dl{ flex: 1; padding-left: 15px;}
      .dd{ font-size: 24px; color: #999; padding-top: 5px;}
    }
    .audio{ height: 150px;}
  }
</style>
