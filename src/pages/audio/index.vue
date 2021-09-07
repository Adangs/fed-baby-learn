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
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XIcon from '@/components/x-icon'

export default {
  name: 'Print',
  components: {
    XIcon,
    XNavigationBar
  },
  props: {},
  data () {
  return {
    lists: [{
      category: '语文',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YW-001.mp3',
      title: '弟子规朗诵',
      play: false
    }, {
      category: '英语',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YY-001.wav',
      title: '英语课程教科书一年级 A',
      play: false
    }],
    audio: null,
    current: null
  };
  },
  computed: {},
  watch: {},
  created () {
    this.audio = uni.createInnerAudioContext()
    this.audio.autoplay = true
    // this.audio.onPlay(() => {
    //   console.log('开始播放')
    // })
  },
  methods: {
    onPlay(item) {
      if (this.current && this.current.url !== item.url) {
        this.current = item
      } else {
        this.current = item
      }
      this.audio.src = this.current.url
      if (this.current.play) {
        this.audio.pause()
        item.play = false
      } else {
        this.audio.play()
        item.play = true
      }
    }
  }
};
</script>

<style lang="scss">
  page{ background-color: #fafafa;}
  .m-list{
    .ul{ width: 100%; padding: 10px; }
    .li{ padding: 10px;}
    .item{
      display: flex; align-items: center; background-color: #fff; padding: 5px;
      .pic{
        width: 120px; height: 120px; background-color: #fafafa; display: flex; align-items: center; justify-content: center;
      }
      .dl{ flex: 1; padding-left: 15px;}
      .dd{ font-size: 24px; color: #999; padding-top: 5px;}
    }
  }
</style>
