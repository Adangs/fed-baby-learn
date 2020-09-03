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
        <view class="topic-a">{{ current.a }}</view>
        <view class="symbol">{{ current.sign }}</view>
        <view class="topic-b">{{ current.b }}</view>
        <view class="symbol">=</view>
      </view>
      <!--数量-->
      <view class="count">
        <picker :value="endIndex" :range="endList" range-key="name" @change="onChangeEnd">
          {{ count.start }}/{{ count.end }}
        </picker>
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
          <view class="item" @click="onAnswer(item)">{{ item }}</view>
        </view>
      </view>
    </view>
    <!--完成-->
    <view v-if="count.start === count.end" class="finish">
      <view class="content">
        <view class="icon">
          <x-icon name="icon-027" size="120" />
        </view>
        <view class="dt">恭喜您，完成一组</view>
        <view class="dd">{{ error > 0 ? `答错${error}次` : '全部回答正确'}}</view>
        <view class="button">
          <x-button @click="onRefresh">再来一组</x-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  import XButton from '@/components/x-button'

  export default {
    name: 'Compute',
    components: {
      XIcon,
      XButton
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
        endList: [{
          value: 10,
          name: '一组10题'
        }, {
          value: 30,
          name: '一组30题'
        }, {
          value: 50,
          name: '一组50题'
        }, {
          value: 100,
          name: '一组100题'
        }],
        max: uni.getStorageSync('storage-compute-max') || 10,
        end: uni.getStorageSync('storage-compute-end') || 100,
        count: {
          start: 1,
          end: 100
        },
        error: 0,
        list: [],
        history: []
      }
    },
    computed: {
      maxResult() {
        return +this.max + 1
      },
      rangeIndex() {
        return this.range.findIndex(item => item.value === +this.max)
      },
      endIndex() {
        return this.endList.findIndex(item => item.value === +this.end)
      },
      current() {
        return this.list[this.count.start]
      }
    },
    watch: {},
    onLoad() {
      this.onRefresh()
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
        this.error = 0
        this.count = {
          start: 1,
          end: this.end
        }
        this.list = []
        this.onSend()
      },
      onBack() {
        const pages = getCurrentPages();
        if (pages.length > 1) {
          uni.navigateBack({
            delta: 1
          })
        } else {
          uni.redirectTo({
            url: '/pages/index/index'
          })
        }
      },
      // 切换
      onChangePicker({ detail }) {
        const find = this.range[detail.value]
        this.max = find.value
        uni.setStorageSync('storage-compute-max', this.max)
        uni.showToast({
          title: `切换为${find.name}`
        })
        this.onRefresh()
      },
      // 切换题目数
      onChangeEnd({ detail }) {
        const find = this.endList[detail.value]
        this.end = find.value
        uni.setStorageSync('storage-compute-end', this.end)
        uni.showToast({
          title: `切换为${find.name}`
        })
        this.onRefresh()
      },
      // 开始生成题目
      onSend() {
        const round = Math.round(Math.random())
        const a = Math.round(Math.random() * this.max)
        const sign = ['+', '-'][round]
        let b
        if (sign === '+') {
          b = Math.round(Math.random() * (this.max - a))
        } else {
          b = Math.round(Math.random() * a)
        }
        const item = {
          a,
          sign,
          b
        }
        // 去重
        if (this.list.some(s => {
          return s.a === item.a && s.sign === item.sign && s.b === item.b
        })) {
          return this.onSend()
        }
        if (this.list.length < this.count.end) {
          this.list.push(item)
          return this.onSend()
        }
      },
      // 答题
      onAnswer(val) {
        let answer
        if (this.current.sign === '+') {
          answer = this.current.a + this.current.b
        } else {
          answer = this.current.a - this.current.b
        }
        if (answer === val) {
          uni.showToast({
            title: '回答正确',
            duration: 800
          })
          if (this.count.start < this.count.end) {
            this.count.start++
          } else {

          }
        } else {
          this.error++
          uni.showToast({
            icon: 'none',
            title: '错误，再想想',
            duration: 800
          })
        }
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
    .finish{
      position: absolute; width: 100%; height: 100%; background-color: #fff; display: flex; align-items: center;
      .content{
        flex: 1; text-align: center;
        .dt{ font-size: 40px; padding: 20px 0; color: #000;}
        .dd{ color: #999;}
        .button{ width: 300px; margin: 0 auto; padding-top: 100px;}
      }
    }
  }
</style>
