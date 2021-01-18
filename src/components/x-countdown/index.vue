<template>
	<view class="x-countdown">
    <slot :time="time" :remain="timeData.remain" :day="timeData.day" :hour="hour" :minute="minute" :second="second" />
  </view>
</template>

<script>
export default {
	props: {
    end: {
	    type: String,
      default: ''
    },
		// 倒计时时长（单位：毫秒）
		time: {
			type: Number,
			default: 0
		},

		// 是否自动
		auto: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			timer: null,
			timeData: {
				remain: 0,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0
			}
		};
	},
  computed: {
    hour() {
      return this.timeData.hour < 10 ? `0${this.timeData.hour}` : this.timeData.hour
    },
    minute() {
      return this.timeData.minute < 10 ? `0${this.timeData.minute}` : this.timeData.minute
    },
    second() {
      return this.timeData.second < 10 ? `0${this.timeData.second}` : this.timeData.second
    }
  },
	watch: {
		time() {
			this.reset()
		}
	},
	methods: {

		// 设置timeData
		updateTimeData() {
			let t = this.timeData.remain;
			this.timeData.day = Math.floor(t / 1000 / 60 / 60 / 24);
			this.timeData.hour = Math.floor((t / 1000 / 60 / 60) % 24);
			this.timeData.minute = Math.floor((t / 1000 / 60) % 60);
			this.timeData.second = Math.floor((t / 1000) % 60);
		},

		// 开启倒计时
		startTimer() {
			if (this.timer) {
				clearInterval(this.timer);
			}
			if(this.timeData.remain < 1000) {
				 return
			}
			this.timer = setInterval(() => {
				this.timeData.remain -= 1000;
				this.updateTimeData()
				if (this.timeData.remain < 1000) {
					this.pause()
          // 倒计时结束事件
					this.$emit('finish');
				}
			}, 1000);
		},

		// 重置倒计时
		reset() {
		  if (this.end) {
		    const time = +new Date(this.end) - +new Date()
        if (time >= 0) {
          this.timeData.remain = time
        }
      }
		  if (this.time) {
        this.timeData.remain = this.time;
      }
			this.updateTimeData();
			if(this.auto) {
				this.start()
			}

		},

		// 暂停倒计时
		pause() {
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null
			}
		},

		// 开始倒计时
		start() {
			if(this.timer) {
				return
			}
			this.startTimer();
		}
	},
	mounted() {
		this.reset();
	},
	beforeDestroy() {
		this.pause()
	}
};
</script>
