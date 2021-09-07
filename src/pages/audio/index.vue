<template>
  <view class="m-list">
    <x-navigation-bar title="音频" />
    <view v-if="lists" class="ul">
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
    lists: null,
    play: false,
    current: null
  };
  },
  computed: {},
  watch: {},
  onLoad () {
    this.getList()
  },
  onHide() {

  },
  onUnload() {

  },
  methods: {
    getList() {
      uni.request({
        url: 'https://alicdn.madaomall.com/static/videos/2021/list.json',
        success: (res) => {
          this.lists = res.data
        }
      })
    },
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
      } else {
        this.$nextTick(() => {
          this.$refs['x-audio'].handleBtnClick && this.$refs['x-audio'].handleBtnClick()
        })
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
