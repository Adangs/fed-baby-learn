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
        <view class="topic-a">100</view>
        <view class="symbol">+</view>
        <view class="topic-b">100</view>
        <view class="symbol">=</view>
      </view>
      <!--数量-->
      <view class="count">
        {{ count.start }}/{{ count.end }}
      </view>
      <!--切换-->
      <view class="icon refresh">
        <view class="x-icon">
          <picker :value="rangeIndex" :range="range" range-key="name" @change="onChangePicker">
            <x-icon name="icon-019" size="50" />
          </picker>
          <view class="name">{{max}}以内</view>
        </view>
      </view>
      <!--换题-->
      <view class="icon" @click="onRefresh">
        <view class="x-icon">
          <x-icon name="icon-013" size="60" />
          <view class="name">重置</view>
        </view>
      </view>
    </view>
    <!--结果列表-->
    <view class="result">
      <view class="ul">
        <view v-for="item in maxResult" :key="item" class="li">
          <view class="item">{{ item }}</view>
        </view>
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
        range: [{
          value: 10,
          name: '10以内加减法'
        }, {
          value: 20,
          name: '20以内加减法'
        }, {
          value: 30,
          name: '30以内加减法'
        }, {
          value: 50,
          name: '50以内加减法'
        }, {
          value: 100,
          name: '100以内加减法'
        }],
        max: uni.getStorageSync('storage-compute-max') || 10,
        count: {
          start: 1,
          end: 100
        },
        list: null,
        history: []
      }
    },
    computed: {
      maxResult() {
        return +this.max + 1
      },
      rangeIndex() {
        return this.range.findIndex(item => item.value === +this.max)
      }
    },
    watch: {},
    onLoad() {

    },
    onShareAppMessage() {
      return {
        imageUrl: '/static/images/144x144.png',
        title: '我正在学算数',
        path: '/pages/compute/index'
      }
    },
    methods: {
      onRefresh() {
        // 重置
        this.count = {
          start: 1,
          end: 100
        }
      },
      onBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 切换
      onChangePicker({ detail }) {
        const find = this.range[detail.value]
        this.max = find.value
        uni.setStorageSync('storage-compute-max', this.max)
        uni.showToast({
          title: `切换为${find.name}`
        })
        console.log(find)
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
        position: absolute; width: 100px; bottom: 20px; right: 0; text-align: center; display: flex; align-items: center;
        &.refresh{ right: auto; left: 0;}
        .x-icon{ width: 100%;}
        .name{ font-size: 22px; text-align: center; color: #999; padding-top: 5px;}
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
        position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex; align-items: center; font-size: 110px;
        .symbol{ padding: 0 15px;}
      }
      .count{ position: absolute; width: 100%; bottom: 10px; padding: 20px; text-align: center; color: #999; font-size: 24px;}
    }
    .result{
      font-size: 40px; flex: 1; overflow: auto; padding: 10px;
      .ul{ display: flex; flex-wrap: wrap; }
      .li{ padding: 10px;}
      .item{
        background-color: #f8f8f8; width: 100px; height: 100px; line-height: 100px; text-align: center;
        &:active{ background-color: #eee;}
      }
    }
  }
</style>
