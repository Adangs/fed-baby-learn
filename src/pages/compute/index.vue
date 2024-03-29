<template>
  <view class="m-details">
    <view class="back" :style="'top:' + statusBarHeight + 'px'">
      <view class="x-icon">
        <x-icon name="icon-008" size="60" @click="onBack" />
      </view>
    </view>
    <view class="word" :class="size">
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="topic">
        <view v-for="(item, index) in current" :key="index" :class="{'symbol': isTypeof(item) === 'string'}">{{ String(item).replace(/\*/gi, '×').replace(/\//gi, '÷') }}</view>
        <view class="symbol">=</view>
        <view class="answer">{{ answer }}</view>
      </view>
      <!--顶部-->
      <view class="header flex" :style="'top:' + statusBarHeight + 'px'">
        <view class="flex-item">
          <view class="inline-block">
            <picker :value="diffIndex" :range="currentDifficulty" range-key="name" @change="onChangeDiff">
              <view class="flex">
                <text>{{ currentDifficulty[diffIndex].name }}</text>
                <x-icon name="icon-040" size="22" color="#999" />
              </view>
            </picker>
          </view>
        </view>
      </view>
      <!--工具-->
      <view class="tools">
        <!--切换-->
        <view class="icon">
          <view class="x-icon">
            <picker :value="rangeIndex" :range="range" range-key="name" @change="onChangePicker">
              <x-icon name="icon-019" size="50" />
            </picker>
            <view class="name">{{max}}以内</view>
          </view>
        </view>
        <!--加减乘除切换-->
        <view class="icon algorithm">
          <view class="x-icon" @click="handleAlgorithm">
            <x-icon name="icon-015" size="50" />
            <view class="name">{{ algorithmName }}</view>
          </view>
        </view>
        <!--数量-->
        <view class="count">
          <view class="inline-block">
            <picker :value="endIndex" :range="endList" range-key="name" @change="onChangeEnd">
              <view class="flex">
                <text>{{ count.start }}/{{ count.end }}</text>
                <x-icon name="icon-040" size="22" color="#999" />
              </view>
            </picker>
          </view>
        </view>
        <!--换题-->
        <view class="icon" @click="onReadInit">
          <view class="x-icon">
            <x-icon name="icon-013" size="60" />
            <view class="name">重置</view>
          </view>
        </view>
        <!--计时器-->
        <view class="timer">
          <x-timer ref="x-timer" @end="onTimerEnd"></x-timer>
        </view>
      </view>
    </view>
    <!--数字键盘-->
    <view class="keyboard">
      <view class="ul">
        <template v-for="item in 10">
          <view v-if="item > 0" :key="item" class="li">
            <view class="item" @click="onSetAnswer(item)">{{ item }}</view>
          </view>
        </template>
      </view>
      <view class="flex">
        <view class="zero">
          <view class="item" @click="onSetAnswer(0)">0</view>
        </view>
        <view class="ac">
          <view class="item" @click="onSetAnswer('ac')">AC</view>
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
        <view v-if="formatTimeCost" class="time">{{formatTimeCost}}</view>
        <view class="button">
          <x-button @click="onReadInit">再来一组</x-button>
        </view>
        <view v-if="currentHistory && currentHistory.length" class="history-list">
          <view v-for="(item, index) in currentHistory" :key="index" class="li">
            <text class="index">{{index + 1}}</text>
            <text>{{getFormatTimeCost(item)}}</text>
          </view>
        </view>
      </view>
    </view>
    <!--准备开始-->
    <x-ready v-if="isReady" :max="3" @change="onReadGo"></x-ready>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  import XButton from '@/components/x-button'
  import XTimer from '@/components/x-timer'
  import XReady from '@/components/x-ready'
  import { evaluate } from '@/libs/eval5.min'

  export default {
    name: 'Compute',
    components: {
      XIcon,
      XButton,
      XTimer,
      XReady
    },
    props: {},
    data() {
      return {
        query: {},
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
        range: [{
          value: 10,
          name: '10以内'
        }, {
          value: 20,
          name: '20以内'
        }, {
          value: 30,
          name: '30以内'
        }, {
          value: 50,
          name: '50以内'
        }, {
          value: 100,
          name: '100以内'
        }],
        endList: [{
          value: 10,
          name: '一组10题'
        }, {
          value: 20,
          name: '一组20题'
        }, {
          value: 30,
          name: '一组30题'
        }, {
          value: 50,
          name: '一组50题'
        }, {
          value: 100,
          name: '一组100题'
        }, {
          value: 500,
          name: '一组500题'
        }, {
          value: 1000,
          name: '一组1000题'
        }],
        difficulty: [{
          value: 3,
          name: 'A ± B ='
        }, {
          value: 5,
          name: 'A ± B ± C ='
        }, {
          value: 7,
          name: 'A ± B ± C ± D ='
        }, {
          value: 9,
          name: 'A ± B ± C ± D ± E ='
        }],
        takeRemove: [{
          value: 3,
          name: 'A ×(÷) B ='
        }],
        diffIndex: uni.getStorageSync('storage-compute-diff') || 0,
        max: uni.getStorageSync('storage-compute-max') || 10,
        end: uni.getStorageSync('storage-compute-end') || 10,
        count: {
          start: 1,
          end: 100
        },
        error: 0,
        list: [],
        history: null,
        timeCost: null,
        isReady: true,
        currentHistory: null,
        answer: '?',
        algorithmType: true
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
      },
      size() {
        return `is-size-${this.diffIndex} is-end-${this.max}`
      },
      // 格式化用时
      formatTimeCost() {
        const arr = ['本次用时：']
        if (this.timeCost) {
          if (this.timeCost.hour) {
            arr.push(`${this.timeCost.hour}:`)
          }
          if (this.timeCost.minute) {
            arr.push(`${this.timeCost.minute}′`)
          }
          if (this.timeCost.second) {
            arr.push(`${this.timeCost.second}″`)
          }
          if (this.timeCost.millisecond) {
            arr.push(`${this.timeCost.millisecond}`)
          }
          return arr.join('')
        }
        return null
      },
      // 缓存计时数据key
      historyKey() {
        return `${this.diffIndex}-${this.rangeIndex}-${this.endIndex}`
      },
      algorithmName() {
        return this.algorithmType ? '加减' : '乘除'
      },
      currentDifficulty() {
        return this.algorithmType ? this.difficulty : this.takeRemove
      }
    },
    watch: {},
    onLoad() {
      this.history = uni.getStorageSync('storage-compute-history') || {}
    },
    onShareAppMessage() {
      const title = `心算一下 ${this.current.join('')}=?`
      return {
        title,
        imageUrl: '/static/images/144x144.png',
        path: '/pages/compute/index'
      }
    },

    // 本接口为 Beta 版本，暂只在 Android 平台支持
    onShareTimeline() {
      const title = `心算一下 ${this.current.join('')}=?`
      return {
        title,
        imageUrl: '/static/images/144x144.png'
      }
    },
    methods: {
      // 准备倒计时
      onReadInit() {
        this.isReady = true
        // 重新开始计时
        const XTimer = this.$refs['x-timer']
        if (XTimer) {
          XTimer.onStop()
        }
      },
      // 倒计时结束，开始生成题目
      onReadGo() {
        this.isReady = false
        this.onRefresh()
        console.log('开始答题~')
      },
      onRefresh() {
        // 重置
        this.error = 0
        this.count = {
          start: 1,
          end: this.end
        }
        this.list = []
        this.onSend()
        // 重新开始计时
        const XTimer = this.$refs['x-timer']
        if (XTimer) {
          XTimer.onStart()
        }
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
        this.onReadInit()
      },
      // 切换题目数
      onChangeEnd({ detail }) {
        const find = this.endList[detail.value]
        this.end = find.value
        uni.setStorageSync('storage-compute-end', this.end)
        uni.showToast({
          title: `切换为${find.name}`
        })
        this.onReadInit()
      },
      // 切换题目数
      onChangeDiff({ detail }) {
        const find = this.currentDifficulty[detail.value]
        this.diffIndex = +detail.value
        this.answer = '?'
        uni.setStorageSync('storage-compute-diff', this.diffIndex)
        uni.showToast({
          title: `切换为${find.name}`
        })
        this.onReadInit()
      },
      // 开始生成题目
      onSend() {
        const item = this.getTopic()
        // console.log(item)
        // 去重
        // console.log(this.list.length)
        if (this.list.some(s => {
          return s.join('') === item.join('')
        })) {
          return this.onSend()
        }
        if (this.list.length < this.count.end) {
          this.list.push(item)
          return this.onSend()
        }
      },
      // 生成单个题目
      getTopic() {
        const len = this.currentDifficulty[this.diffIndex].value
        const arr = []
        for (let i = 0; i < len; i++) {
          const round = Math.round(Math.random())
          if (i === 0) {
            arr.push(this.getNumber())
          } else {
            if (i % 2 !== 0) {
              let sign = ['+', '-'][round]
              if (!this.algorithmType) {
                sign = ['*', '/'][round]
              }
              arr.push(sign)
            } else {
              // +-
              if (this.algorithmType) {
                let sum
                if (arr.length % 2 === 0) {
                  sum = evaluate([...arr, 0].join(''))
                } else {
                  sum = evaluate(arr.join(''))
                }
                arr.push(this.getNumber(arr[i - 1], sum))
              } else {
                // ×÷
                arr.push(this.getNumber(arr[i - 1], 0, arr[i - 2]))
              }
            }
          }
        }
        return arr
      },
      // 生成单个值
      getNumber(sign = '+', a = 0, one) {
        if (sign === '+') {
          return Math.round(Math.random() * (this.max - a))
        } else if (sign === '/') {
          const max = this.max
          function fun() {
            const val = Math.round(Math.random() * max)
            if (one % val === 0) {
              return val
            } else {
              return fun()
            }
          }
          return fun()
        } else {
          const val = this.algorithmType ? a : this.max
          return Math.round(Math.random() * val)
        }
      },
      // 设置答案
      onSetAnswer(val) {
        if (val === 'ac') {
          this.answer = '?'
        } else {
          const answer = this.answer === '?' ? '' : this.answer
          this.answer = String(answer) + String(val)
          this.ifAnswer()
        }
        uni.vibrateShort({
          type: 'light'
        })
      },
      // 判断答案
      ifAnswer() {
        const val = evaluate(this.current.join(''))
        console.log(val)
        const answer = Number(this.answer)
        if (answer === val) {
          uni.showToast({
            title: '回答正确',
            duration: 800
          })
          if (this.count.start < this.count.end) {
            this.count.start++
            this.answer = '?'
            if (this.count.start === this.count.end) {
              // 计时结束
              const timer = this.$refs['x-timer']
              if (timer) {
                timer.onStop()
              }
              // 更新历史记录
              this.setHistory()
              console.log('答题结束')
            }
          }
        } else if (answer > val) {
          this.error++
          this.answer = '?'
          uni.showToast({
            icon: 'none',
            title: '错误，再想想',
            duration: 800
          })
        }
      },
      isTypeof(val) {
        return typeof val
      },
      // 计时结束回调
      onTimerEnd(res) {
        this.timeCost = {
          ...res,
          count: res.millisecond + (res.second * 1000) + (res.minute * 60000) + (res.hour * 120000)
        }
        console.log('用时-> ', this.timeCost)
      },
      // 记录计时数据
      setHistory() {
        const current = this.history[this.historyKey] || []
        current.push(this.timeCost)
        current.sort((a, b) => a.count - b.count)
        this.history[this.historyKey] = current.slice(0, 5)
        this.currentHistory = this.history[this.historyKey]
        uni.setStorageSync('storage-compute-history', this.history)
      },
      // 格式化时间格式
      getFormatTimeCost(item) {
        const arr = []
        if (item.hour) {
          arr.push(`${item.hour}:`)
        }
        if (item.minute) {
          arr.push(`${item.minute}′`)
        }
        if (item.second) {
          arr.push(`${item.second}″`)
        }
        if (item.millisecond) {
          arr.push(`${item.millisecond}`)
        }
        return arr.join('')
      },
      // 切换算法
      handleAlgorithm() {
        this.algorithmType = !this.algorithmType
        this.diffIndex = 0
        this.answer = '?'
        uni.setStorageSync('storage-compute-diff', this.diffIndex)
        uni.showToast({
          title: `切换成${this.algorithmName}法`
        })
        this.onReadInit()
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
      width: 100%; height: 100vw; position: relative; background-color: #C7EDCC;
      .li{
        width: 50%; height: 50%; position: absolute; overflow: hidden; border: 1px solid #B0D3B8;
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
      .topic{
        position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); display: flex; align-items: center; font-size: 110px;
        .symbol{ padding: 0 15px;}
      }
      .header{
        position: absolute; width: 100%; top: 0; text-align: center; height: 100px;
        text{ padding-right: 20px; color: #999;}
      }
      .tools{
        display: flex; align-items: center; position: absolute; bottom: 0; width: 100%; padding: 20px;
        .count{
          flex: 1; padding: 20px; text-align: center; color: #999; font-size: 24px;
          text{ padding-right: 5px;}
          .inline-block{ padding: 10px;}
        }
        .icon{
          text-align: center;
          .x-icon{ width: 100%;}
          .name{ font-size: 22px; text-align: center; color: #999; padding-top: 5px;}
          & + .icon{ margin-left: 20px;}
        }
        .timer{ position: absolute; left: 50%; bottom: 130px; transform: translate(-50%, 0);}
      }

      &.is-size-0{
        .topic{ font-size: 120px;}
        .answer{ width: 120px;}
      }
      &.is-size-1{
        .topic{ font-size: 96px;}
        .answer{ width: 96px;}
      }
      &.is-size-2{
        .topic{ font-size: 75px;}
        .answer{ width: 75px;}

        &.is-end-10,
        &.is-end-20,
        &.is-end-30{
          .topic{ font-size: 90px;}
          .answer{ width: 90px;}
        }
      }
      &.is-size-3{
        .topic{ font-size: 62px;}
        .answer{ width: 62px;}
        &.is-end-10,
        &.is-end-20,
        &.is-end-30{
          .topic{ font-size: 75px;}
          .answer{ width: 75px;}
        }
      }
    }
    // 数据键盘
    .keyboard{
      .item{
        background-color: #f8f8f8; height: 120px; line-height: 120px; text-align: center;
        &:active{ background-color: #eee;}
      }
      .ul{ display: flex; flex-wrap: wrap; font-size: 58px; padding: 10px;}
      .li{ width: 33.33333%; text-align: center; padding: 10px;}
      .flex{ display: flex; flex-wrap: wrap; padding: 0 10px; font-size: 58px;}
      .zero{ width: 66.66666%; padding: 0 10px;}
      .ac{ width: 33.33333%; padding: 0 10px;}
    }
    .finish{
      position: absolute; width: 100%; height: 100%; background-color: #fff; display: flex; align-items: center;
      .content{
        flex: 1; text-align: center;
        .dt{ font-size: 40px; padding: 20px 0; color: #000;}
        .dd{ color: #999; padding-bottom: 20px;}
        .time{ background-color: #C7EDCC; color: #000; border-radius: 30px; padding: 5px 25px; font-size: 26px; display: inline-block;}
        .button{ width: 300px; margin: 0 auto; padding-top: 100px;}
        .history-list{
          padding: 50px 0; width: 400px; margin: 0 auto;
          .li{
            display: flex; align-items: center; padding: 10px; font-size: 24px; color: #999;
            &:nth-child(odd){ background-color: #fafafa;}
            &:nth-child(1){ color: #f44336;}
            .index{ flex: 1; text-align: left;}
          }
        }
      }
    }
  }
</style>
