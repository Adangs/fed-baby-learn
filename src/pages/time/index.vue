<template>
  <view class="m-time">
    <x-navigation-bar title="时间计算器" />
    <view class="m-time-content">
      <view class="title">
        当前时间
      </view>
      <view class="current-time">
        {{ currentTime}}
      </view>

      <view class="title">
        对比时间
      </view>

      <view class="ul">
        <view class="li">
          <view class="input">
            <input :value="time.h1" :focus="focus.h1" :maxlength="1" type="number" placeholder="H" data-name="h1" @input="handleInput" @blur="handleBlur" />
          </view>
        </view>
        <view class="li">
          <view class="input">
            <input :value="time.h2" :focus="focus.h2" :maxlength="1" type="number" placeholder="H" data-name="h2" @input="handleInput" @blur="handleBlur" />
          </view>
        </view>
        <view class="li is-interval">
          :
        </view>
        <view class="li">
          <view class="input">
            <input :value="time.m1" :focus="focus.m1" :maxlength="1" type="number" placeholder="M" data-name="m1" @input="handleInput" @blur="handleBlur" />
          </view>
        </view>
        <view class="li">
          <view class="input">
            <input :value="time.m2" :focus="focus.m2" :maxlength="1" type="number" placeholder="M" data-name="m2" @input="handleInput" @blur="handleBlur" />
          </view>
        </view>
      </view>
      <view class="submit">
        <x-button @click="handleClear">清除</x-button>
        <x-button class="is-primary" type="primary" @click="handleSubmit">计算</x-button>
      </view>

      <view class="title">
        计算记录
      </view>
      <view class="list">
        <view v-for="(item, index) in list" :key="index" class="item">
          <text class="name">{{ index + 1 }}、相差：</text>
          <template v-if="item.days">
            <text class="value">item.days</text>
            <text>天</text>
          </template>
          <template v-if="item.hours">
            <text class="value">{{ item.hours }}</text>
            <text>小时</text>
          </template>
          <text class="value">{{ item.minutes }}</text>
          <text>分钟</text>
        </view>
      </view>

      <view v-if="list && list.length" class="remove" @click="list = []">清空记录</view>
    </view>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XButton from '@/components/x-button'
import Tools from '@/utils/x-filters'
export default {
  name: 'TimeDiff',
  components: {
    XNavigationBar,
    XButton
  },
  props: {},
  data () {
    return {
      timeInterval: null,
      currentTime: Tools.formatDate(new Date(), 'MM月dd日 hh时mm分ss秒'),
      time: {
        h1: '',
        h2: '',
        m1: '',
        m2: '',
      },
      focus: {
        h1: false,
        h2: false,
        m1: false,
        m2: false
      },
      backspace: 0,
      list: []
    };
  },
  computed: {

  },
  watch: {},
  onLoad () {
    this.timeInterval = setInterval(() => {
      this.currentTime = Tools.formatDate(new Date(), 'MM月dd日 hh时mm分ss秒');
    }, 1000)
  },
  onHide() {
    clearInterval(this.timeInterval)
  },
  onUnload() {

  },
  methods: {
    handleInput(event) {
      // console.log(event)
      const { target, detail } = event
      const { dataset } = target
      const key = dataset.name
      const value = detail.value
      this.time[key] = value
      const { h1, h2, m1, m2 } = this.time

      if (detail.keyCode === 8 && value === '') {
        this.backspace += 1
      }

      switch (key) {
        case 'h1':
          if (/^[0-2]/g.test(value)) {
            this.setFocus('h2')
          } else {
            setTimeout(() => {
              this.time[key] = ''
            }, 100)
          }
          break;
        case 'h2':
          const hour = parseInt(h1 + h2, 10);
          if (/^[0-9]/g.test(value) && !isNaN(hour) && hour >= 0 && hour <= 23) {
            if (h1 === '') {
              this.time.h1 = '0'
            }
            this.setFocus('m1')
          } else {
            setTimeout(() => {
              this.time[key] = ''
            }, 100)
          }
          if (this.backspace >= 2) {
            this.setFocus('h1')
          }
          break;
        case 'm1':
          if (/^[0-5]/g.test(value)) {
            this.setFocus('m2')
          } else {
            setTimeout(() => {
              this.time[key] = ''
            }, 100)
          }
          if (this.backspace >= 2) {
            this.setFocus('h2')
          }
          break;
        case 'm2':
          const minute = parseInt(m1 + m2, 10);
          if (/^[0-9]/g.test(value) && !isNaN(minute) && minute >= 0 && minute <= 59) {
            if (m1 === '') {
              this.time.m1 = '0'
            }
          } else {
            setTimeout(() => {
              this.time[key] = ''
            }, 100)
          }
          if (this.backspace >= 2) {
            this.setFocus('m1')
          }
          break;
      }
    },
    handleFocus(event) {
      const { target } = event
      const { dataset } = target
      const key = dataset.name
      this.setFocus(key)
    },
    handleBlur(event) {
      const { target } = event
      const { dataset } = target
      const key = dataset.name
      this.focus[key] = false
      this.backspace = 0
    },
    setFocus(name) {
      setTimeout(() => {
        for (const key in this.focus) {
          this.focus[key] = key === name
        }
      }, 100)
      this.backspace = 0
    },
    timeDiff(date1, date2) {
      let diffInMs = Math.abs(date2 - date1);

      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      diffInMs -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      diffInMs -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diffInMs / (1000 * 60));
      diffInMs -= minutes * (1000 * 60);

      const seconds = Math.floor(diffInMs / 1000);

      return { days, hours, minutes, seconds };
    },
    handleSubmit() {
      const { h1, h2, m1, m2 } = this.time
      if (h1 === '' || h2 === '' || m1 === '' || m2 === '') {
        return uni.showToast({
          title: '请填写完整时间',
          icon: 'none'
        })
      }
      const hh = parseInt(h1 + h2)
      const mm = parseInt(m1 + m2)
      const current = new Date()
      const yyyy = Tools.formatDate(new Date(), 'yyyy')
      const MM = Tools.formatDate(new Date(), 'MM')
      const dd = Tools.formatDate(new Date(), 'dd')
      const diff = new Date(`${yyyy}/${MM}/${dd} ${hh}:${mm}:00`)
      const res = this.timeDiff(current, diff)
      this.list.unshift(res)
    },
    handleClear() {
      this.time = {
        h1: '',
        h2: '',
        m1: '',
        m2: '',
      }
    }
  }
};
</script>

<style lang="scss">
  page{ background-color: #fafafa;}
  .m-time-content{
    padding: 24px;
    .title{ text-align: center; padding: 10px 0; color: #999;}
    .current-time{ text-align: center; margin-bottom: 30px;}
    .ul{
      display: flex; align-items: center; padding: 20px 50px;
      input{ width: 100%; height: 100%; background: transparent; border: 0; text-align: center; font-size: 42px; font-weight: bold;}
      .li{ flex: 1; display: flex; align-items: center; justify-content: center;}
      .is-interval{ flex: 0; padding: 0 30px; font-size: 42px; font-weight: bold;}
      .input{ background: #fff; border-radius: 10rpx; width: 100px; height: 100px; border: 2px solid #ddd;}
    }
    .submit{
      padding: 40px 0; display: flex; gap: 20px;
      .is-primary{ flex: 1;}
    }
    .list{
      .item{
        display: flex; align-items: center; font-size: 32rpx; padding: 20px 10px; color: #999;
        .name{ flex: 1;}
        .value{ color: #111;}
        &:nth-child(odd){
          background: #fff;
        }
      }
    }
    .remove{ text-align: center; padding: 20px;}
  }
</style>
