<template>
  <view :class="classNameList">
    <scroll-view id="x-tabs" :scroll-left="scrollLeft" :scroll-x="isScroll" :style="{'background': background}" :show-scrollbar="false" enhanced class="_content" scroll-with-animation>
      <view class="_ul">
        <block v-for="(item, index) in list" :key="item[label]">
          <view class="_li" :data-index="index" :class="index === selectedIndex ? '_active' : ''" @click="onChange">
            {{item[label]}}
            <block v-if="underline && index === selectedIndex">
              <view class="_underline">
                <x-image src="/static/png/icon-90.png" />
              </view>
            </block>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import XImage from '@/components/x-image'
  export default {
    name: 'XTabs',
    components: {
      XImage
    },
    props: {
      type: {
        type: String,
        default: 'default' // default | home |
      },
      size: {
        type: String,
        default: 'medium'
      },
      fixed: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: 'transparent'
      },
      active: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: []
      },
      // data key
      label: {
        type: String,
        default: 'name'
      },
      // 选中下划线
      underline: {
        type: Boolean,
        default: true
      },
      // 分割线
      divider: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFixed: false,
        scrollLeft: 0,
        selectedIndex: 0,
        info: null
      }
    },
    computed: {
      // 支付宝平台
      isAlipay() {
        let is = false
        // #ifdef MP-ALIPAY
        is = true
        // #endif
        return is
      },
      // class列表
      classNameList() {
        const name = ['x-tabs']
        if (this.isFixed) {
          name.push('is-fixed')
        }
        if (this.divider) {
          name.push('is-divider')
        }
        if (this.isScroll) {
          name.push('is-scroll')
        } else {
          name.push('is-flex')
        }
        name.push(`is-${this.type}`)
        name.push(`is-${this.size}`)
        return name.join(' ')
      },
      // 是否为滚动形式
      isScroll() {
        return this.list.length > 4
      }
    },
    watch: {
      active: {
        handler(val) {
          this.selectedIndex = val
        },
        immediate: true
      }
    },
    created() {},
    mounted() {
      this.getTabsInfo()
      // this.$nextTick(() => {
      //   this.setOffset()
      // })
    },
    methods: {
      getTabsInfo() {
        const query = uni.createSelectorQuery()
        if (!this.isAlipay) {
          query.in(this)
        }
        query.select('#x-tabs').boundingClientRect(data => {
          this.info = data
        }).exec()
      },
      onChange(e) {
        const index = e.target.dataset.index
        if (this.selectedIndex === index) return
        this.selectedIndex = index
        this.$emit('change', this.selectedIndex)
        // 滚动模式下，点击之后计算位置，进行动态滚动设置
        if (this.isScroll) {
          this.$nextTick(() => {
            this.setOffset()
          })
        }
      },
      // 设置位置
      setOffset() {
        const query = uni.createSelectorQuery()
        if (!this.isAlipay) {
          query.in(this)
        }
        query.selectAll('._li').boundingClientRect(data => {
          // 选中后的样式有变化，宽度不一样了，所以重新计算右侧位置数据
          let offsetLeft = 0
          data.forEach((item, index) => {
            if (index < this.selectedIndex) {
              offsetLeft += item.width
            }
          })
          const item = data[this.selectedIndex]
          this.scrollLeft = (offsetLeft + item.width / 2) - (this.info.width / 2)
        }).exec()
      }
    }
  }
</script>

<style lang="scss">
  .x-tabs{
    // 分割线
    &.is-divider{
      ._li{
        position: relative;
        &:after{ content: ''; position: absolute; width: 2px; height: 22px; background: #E6E6E6; right: 0; top: 50%; transform: translate3d(0, -50%, 0);}
        &:last-child:after{ display: none;}
      }
    }
    // flex
    &.is-flex{
      ._content ._li{ flex: 1; padding: 0;}
    }
    // scroll
    &.is-scroll{
      ._content ._li{ flex-shrink: 0;}
    }
    // 中号
    &.is-medium{
      ._content{ height: 84px; line-height: 84px; font-size: 30px;}
    }
    ._content{
      color: #8A8A8A;
      ._ul{ display: flex; align-items: center;}
      ._li{
        text-align: center; padding: 0 25px;
        &._active{
          color: #FE2829; position: relative; font-weight: bold;
          ._underline{
            position: absolute; bottom: -10px; left: 50%; width: 40px; transform: translate(-50%, 0); padding: 0; margin: 0; line-height: 1;
            image{ width: 40px; height: 40px;}
          }
        }
      }
    }
  }
</style>
