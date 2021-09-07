<template>
  <view class="m-list">
    <x-navigation-bar title="音频" />
    <view class="ul">
      <view v-for="(item, index) in lists" :key="index" class="li">
        <view class="item">
          <view class="pic">
            <text>{{ item.category }}</text>
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

export default {
  name: 'Print',
  components: {
    XNavigationBar
  },
  props: {},
  data () {
  return {
    lists: [{
      category: '语文',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YW-001.mp3',
      title: '弟子规朗诵'
    }, {
      category: '英语',
      url: 'https://alicdn.madaomall.com/static/videos/2021/YY-001.wav',
      title: '英语课程教科书一年级 A'
    }]
  };
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {

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
