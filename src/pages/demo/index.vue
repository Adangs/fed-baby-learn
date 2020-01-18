<template>
  <view class="m-demo-all">
    <x-navigation-bar id="x-navigation-bar" title="UI组件" />
    <x-service />
    <view class="m-demo-content">
      <!--nav-->
      <view class="title">nav</view>
      <view class="nav">
        <navigator class="li" url="/pages/index/index">首页</navigator>
        <navigator class="li" url="/packages/mall/detail/index">分包界面</navigator>
      </view>
      <!--button-->
      <view class="title">button</view>
      <view class="button">
        <view class="li">
          <x-button size="large" @click="onGetUserInfo">主动受权</x-button>
        </view>
        <view class="li">
          <x-button @click="onSetVuex">点击修改vuex数据</x-button>
        </view>
        <view class="li">
          <x-button @click="onClearStorageSync">点击清除本地缓存</x-button>
        </view>
        <view class="li">
          <x-button size="small" disabled>禁用状态</x-button>
        </view>
        <view class="li">
          <x-button loading>加载状态</x-button>
        </view>
      </view>

      <view class="title">x-tabs、x-input</view>
      <view class="tabs">
        <x-fixed ref="x-fixed" :top="navigationHeight">
          <!--x-tabs-->
          <x-tabs underline :list="tabList" />
          <!--x-input-->
          <view class="input">
            <x-input prefix-icon="icon-search" confirm-type="search" placeholder="请输入要搜索的宝贝标题或关键字" @confirm="onConfirm" />
          </view>
        </x-fixed>
      </view>

      <!--x-modal-->
      <view class="title">x-modal</view>
      <view class="modal">
        <view class="li">
          <x-button size="small" type="default" @click="onShowModal">ShowModal</x-button>
        </view>
        <view class="li">

        </view>
        <x-modal title="订单同步成功" content="如有问题请及时联系客服" :visible.sync="modalShow" @close="onModalClose" @success="onModalSuccess" />
      </view>
      <!--loading-->
      <view class="title">x-loading</view>
      <view>
        <x-loading />
      </view>
      <!--icon-->
      <view class="title">x-icon</view>
      <view class="icon">
        <view class="li">
          <x-button plain>
            <x-icon name="icon-icon-tao" />
          </x-button>
        </view>
        <view class="li">
          <x-badge is-dot>
            <x-icon name="icon-kefu-fill" />
          </x-badge>
        </view>
        <view class="li">
          <x-icon name="icon-home" />
        </view>
        <view class="li">
          <x-icon name="icon-hot" />
        </view>
        <view class="li">
          <x-icon name="icon-close" />
        </view>
        <view class="li">
          <x-icon name="icon-sale" />
        </view>
        <view class="li">
          <x-icon name="icon-coupon" />
        </view>
      </view>

      <!--x-image-->
      <view class="title">x-image</view>
      <view class="image">
        <view class="li">
          <x-image src="//m.360buyimg.com/mobilecms/s1350x1350_jfs/t23200/304/1493902573/403015/3371d85f/5b61dbabN209c5c4c.jpg" />
        </view>
        <view class="li">
          <x-image mode="scaleToFill" src="//m.360buyimg.com/mobilecms/s1350x1350_jfs/t23200/304/1493902573/403015/3371d85f/5b61dbabN209c5c4c.jpg" />
        </view>
        <view class="li">
          <x-image mode="aspectFit" src="//m.360buyimg.com/mobilecms/s1350x1350_jfs/t23200/304/1493902573/403015/3371d85f/5b61dbabN209c5c4c.jpg" />
        </view>
        <view class="li">
          <x-image mode="widthFix" src="//m.360buyimg.com/mobilecms/s1350x1350_jfs/t23200/304/1493902573/403015/3371d85f/5b61dbabN209c5c4c.jpg" />
        </view>
        <view class="li">
          <x-image src="/assets/svg/customer.svg" />
        </view>
        <view class="li">
          <view class="bg-img">css引用的外部背景图片，使用cdn('/assets/svg/customer.svg')</view>
        </view>
      </view>

      <view class="title">x-cell</view>
      <view class="cell">
        <x-cell-group>
          <x-cell title="关于余额提现收费规则说明" @click="onCellClick" />
          <x-cell title="余额提现最高限额是多少？" />
          <x-cell title="当前版本" suffix="v1.0.1" :show-arrow="false" />
        </x-cell-group>
      </view>
      <view class="title">x-canvas</view>
      <view class="canvas">
        <canvas
          id="awesomeCanvas"
          width="610"
          height="610"
          class="canvas"
          onTouchStart="log"
          onTouchMove="log"
          onTouchEnd="log"
        />
        <x-button @click="setDrawImage">canvas插入图片</x-button>
      </view>
      <!--x-product-->
      <view class="title">x-product</view>
      <view class="goods">
        <view class="ul">
          <view class="li" v-for="item in goodsList" :key="item.id">
            <x-product :detail="item" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // 自定义全局组件
  import XBadge from '@/components/x-badge'
  import XButton from '@/components/x-button'
  import XCell from '@/components/x-cell'
  import XCellGroup from '@/components/x-cell-group'
  import XEmpty from '@/components/x-empty'
  import XFixed from '@/components/x-fixed'
  import XIcon from '@/components/x-icon'
  import XImage from '@/components/x-image'
  import XInput from '@/components/x-input'
  import XLoading from '@/components/x-loading'
  import XModal from '@/components/x-modal'
  import XNavigationBar from '@/components/x-navigation-bar'
  import XProduct from '@/components/x-product'
  import XService from '@/components/x-service'
  import XTabs from '@/components/x-tabs'
  import XTipsWallet from '@/components/x-tips-wallet'

	export default {
    components: {
      XBadge,
      XButton,
      XCell,
      XCellGroup,
      XEmpty,
      XFixed,
      XIcon,
      XImage,
      XInput,
      XLoading,
      XModal,
      XNavigationBar,
      XProduct,
      XService,
      XTabs,
      XTipsWallet
    },
		data() {
			return {
        modalShow: false,
        navigationHeight: 0,
				title: 'Hello',
        goodsList: [{"goodsId":"568760669219","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i3/2144513623/O1CN01JvlXvA1cdNWGYSpuH_!!0-item_pic.jpg","goodsTitle":"S码122片尿片断码清仓 贝笙电商版婴儿纸尿片（非尿裤） 只有S码","goodsGalleryUrls":["//img.alicdn.com/i1/2144513623/O1CN01Oy2OCI1cdNWEYJZYg_!!2144513623.jpg","//img.alicdn.com/i2/2144513623/O1CN01h5jSTc1cdNW9w7c48_!!2144513623.jpg","//img.alicdn.com/i4/2144513623/O1CN01As2p6l1cdNSkQxaZh_!!2144513623.jpg","//img.alicdn.com/i1/2144513623/O1CN01lQvea81cdNSobgK49_!!2144513623.jpg"],"goodsDesc":"不断裂不起坨不侧漏不红屁屁","goodsDescUrls":["//img.alicdn.com/i1/2144513623/O1CN01Oy2OCI1cdNWEYJZYg_!!2144513623.jpg","//img.alicdn.com/i2/2144513623/O1CN01h5jSTc1cdNW9w7c48_!!2144513623.jpg","//img.alicdn.com/i4/2144513623/O1CN01As2p6l1cdNSkQxaZh_!!2144513623.jpg","//img.alicdn.com/i1/2144513623/O1CN01lQvea81cdNSobgK49_!!2144513623.jpg"],"goodsCoupon":70,"goodsPrice":99,"goodsRebate":1.51,"totalBuy":"225","invalidTime":"2019-12-06","volume":null,"totalAmount":null},{"goodsId":"524357577873","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i3/2648152163/O1CN01Z6xg2o1RqhE7iCZCr_!!0-item_pic.jpg","goodsTitle":"向辉蜂蜜 成熟百花蜜原蜜结晶非野生百花蜜500g/瓶 正品包邮","goodsGalleryUrls":["//img.alicdn.com/i4/2648152163/O1CN01Nfg9xU1RqhE8shMP9_!!2648152163.jpg","//img.alicdn.com/i2/2648152163/O1CN01WrRiYx1RqhE7OgCFF_!!2648152163.jpg","//img.alicdn.com/i4/2648152163/O1CN01bOgcWE1RqhE7hlJIa_!!2648152163.jpg","//img.alicdn.com/i3/2648152163/O1CN01YnLCfS1RqhE7euCIK_!!2648152163.jpg"],"goodsDesc":"","goodsDescUrls":["//img.alicdn.com/i4/2648152163/O1CN01Nfg9xU1RqhE8shMP9_!!2648152163.jpg","//img.alicdn.com/i2/2648152163/O1CN01WrRiYx1RqhE7OgCFF_!!2648152163.jpg","//img.alicdn.com/i4/2648152163/O1CN01bOgcWE1RqhE7hlJIa_!!2648152163.jpg","//img.alicdn.com/i3/2648152163/O1CN01YnLCfS1RqhE7euCIK_!!2648152163.jpg"],"goodsCoupon":70,"goodsPrice":118,"goodsRebate":2.50,"totalBuy":"4","invalidTime":"2019-12-08","volume":null,"totalAmount":null},{"goodsId":"599066576074","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i1/2204164889237/O1CN01JiHLY12I6b0XQdNZl_!!0-item_pic.jpg","goodsTitle":"无线蓝牙耳机双耳迷你适用于iphone华为vivo小米oppo苹果安卓通用","goodsGalleryUrls":["//img.alicdn.com/i3/2204164889237/O1CN01EeVWMG2I6b1BNY5Gs_!!2204164889237.jpg","//img.alicdn.com/i3/2204164889237/O1CN01mEncuy2I6b0hSPS8k_!!2204164889237.jpg","//img.alicdn.com/i1/2204164889237/O1CN01WiFxCZ2I6b0kDMWeY_!!2204164889237.jpg","//img.alicdn.com/i3/2204164889237/O1CN01an9SIX2I6b0X0cL0y_!!2204164889237.png"],"goodsDesc":"智能弹窗 自带充电仓 高清通话 连接不闪灯","goodsDescUrls":["//img.alicdn.com/i3/2204164889237/O1CN01EeVWMG2I6b1BNY5Gs_!!2204164889237.jpg","//img.alicdn.com/i3/2204164889237/O1CN01mEncuy2I6b0hSPS8k_!!2204164889237.jpg","//img.alicdn.com/i1/2204164889237/O1CN01WiFxCZ2I6b0kDMWeY_!!2204164889237.jpg","//img.alicdn.com/i3/2204164889237/O1CN01an9SIX2I6b0X0cL0y_!!2204164889237.png"],"goodsCoupon":100,"goodsPrice":119.8,"goodsRebate":2.32,"totalBuy":"1.7万","invalidTime":"2019-12-02","volume":null,"totalAmount":null},{"goodsId":"41530960417","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i1/759059798/O1CN01IjgJOv2MFXEBDaXYe_!!759059798.jpg","goodsTitle":"专柜正品汉姆斯男士钱包 长款钱包男真皮票夹 商务休闲超薄皮夹","goodsGalleryUrls":["//img.alicdn.com/i2/759059798/TB2ziGoqFXXXXbuXpXXXXXXXXXX_!!759059798.jpg","//img.alicdn.com/i2/759059798/TB2HHmLaFXXXXaSXpXXXXXXXXXX_!!759059798.jpg","//img.alicdn.com/i4/759059798/TB252HEdOCYBuNkSnaVXXcMsVXa_!!759059798.jpg","//img.alicdn.com/i4/759059798/O1CN01TMgKXP2MFXB2JbQyK_!!759059798.png"],"goodsDesc":"","goodsDescUrls":["//img.alicdn.com/i2/759059798/TB2ziGoqFXXXXbuXpXXXXXXXXXX_!!759059798.jpg","//img.alicdn.com/i2/759059798/TB2HHmLaFXXXXaSXpXXXXXXXXXX_!!759059798.jpg","//img.alicdn.com/i4/759059798/TB252HEdOCYBuNkSnaVXXcMsVXa_!!759059798.jpg","//img.alicdn.com/i4/759059798/O1CN01TMgKXP2MFXB2JbQyK_!!759059798.png"],"goodsCoupon":30,"goodsPrice":76,"goodsRebate":4.78,"totalBuy":"17","invalidTime":"2019-12-31","volume":null,"totalAmount":null},{"goodsId":"523005563391","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i1/2379732838/O1CN01tE5Mcb1WpqVddsYpr_!!0-item_pic.jpg","goodsTitle":"燎原全脂牦牛奶粉 无蔗糖全家营养早餐青少年成人中老年奶粉454g","goodsGalleryUrls":["//img.alicdn.com/i1/2379732838/O1CN011WpqVdMSqAgGPES_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB2Fx6UmyOYBuNjSsD4XXbSkFXa_!!2379732838.jpg","//img.alicdn.com/i1/2379732838/TB2xeoYuKOSBuNjy0FdXXbDnVXa_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB2p8MAlFXXXXcMXXXXXXXXXXXX_!!2379732838.jpg"],"goodsDesc":"海拔3000米牧场 官方溯源 最新批次","goodsDescUrls":["//img.alicdn.com/i1/2379732838/O1CN011WpqVdMSqAgGPES_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB2Fx6UmyOYBuNjSsD4XXbSkFXa_!!2379732838.jpg","//img.alicdn.com/i1/2379732838/TB2xeoYuKOSBuNjy0FdXXbDnVXa_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB2p8MAlFXXXXcMXXXXXXXXXXXX_!!2379732838.jpg"],"goodsCoupon":60,"goodsPrice":188,"goodsRebate":2.00,"totalBuy":"50","invalidTime":"2019-12-04","volume":null,"totalAmount":null},{"goodsId":"543174119773","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i4/1844577454/O1CN013hkV6l24vypTmNarX_!!0-item_pic.jpg","goodsTitle":"乔丹篮球鞋男鞋2019秋冬新品高帮战靴学生运动鞋减震黑武士球鞋男","goodsGalleryUrls":["//img.alicdn.com/i1/1844577454/O1CN01qyruPW24vyq4w770w_!!1844577454.jpg","//img.alicdn.com/i3/1844577454/TB2p6Thvk7mBKNjSZFyXXbydFXa_!!1844577454.jpg","//img.alicdn.com/i1/1844577454/O1CN01nRSq3M24vypZ9D7wr_!!1844577454.jpg","//img.alicdn.com/i1/1844577454/O1CN01U0soMm24vypbYO2vN_!!1844577454.jpg"],"goodsDesc":"暗夜骑士篮球鞋 高帮保护减震耐磨","goodsDescUrls":["//img.alicdn.com/i1/1844577454/O1CN01qyruPW24vyq4w770w_!!1844577454.jpg","//img.alicdn.com/i3/1844577454/TB2p6Thvk7mBKNjSZFyXXbydFXa_!!1844577454.jpg","//img.alicdn.com/i1/1844577454/O1CN01nRSq3M24vypZ9D7wr_!!1844577454.jpg","//img.alicdn.com/i1/1844577454/O1CN01U0soMm24vypbYO2vN_!!1844577454.jpg"],"goodsCoupon":30,"goodsPrice":199,"goodsRebate":8.79,"totalBuy":"2123","invalidTime":"2019-12-02","volume":null,"totalAmount":null},{"goodsId":"603452163639","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i2/2059302453/O1CN01Z4Bigl1TzW7ZFFRIf_!!0-item_pic.jpg","goodsTitle":"英国酷易 面板硅胶揉面垫家用加厚和面板大号擀面食品级面包垫子","goodsGalleryUrls":["//img.alicdn.com/i2/2059302453/O1CN01mFAzhl1TzW7PHl6A0_!!2059302453.jpg","//img.alicdn.com/i1/2059302453/O1CN01Cf0zIk1TzW7J5Vsli_!!2059302453.jpg","//img.alicdn.com/i2/2059302453/O1CN01GQBYK21TzW7QGzQIg_!!2059302453.jpg","//img.alicdn.com/i4/2059302453/O1CN019hghAE1TzW7ESLVTb_!!2059302453.jpg"],"goodsDesc":"新增自带收纳功能 母婴级硅胶材质 加大加厚","goodsDescUrls":["//img.alicdn.com/i2/2059302453/O1CN01mFAzhl1TzW7PHl6A0_!!2059302453.jpg","//img.alicdn.com/i1/2059302453/O1CN01Cf0zIk1TzW7J5Vsli_!!2059302453.jpg","//img.alicdn.com/i2/2059302453/O1CN01GQBYK21TzW7QGzQIg_!!2059302453.jpg","//img.alicdn.com/i4/2059302453/O1CN019hghAE1TzW7ESLVTb_!!2059302453.jpg"],"goodsCoupon":20,"goodsPrice":118,"goodsRebate":5.10,"totalBuy":"269","invalidTime":"2019-12-04","volume":null,"totalAmount":null},{"goodsId":"527095725626","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i1/2379732838/O1CN016rMRPh1WpqVeWzqQW_!!0-item_pic.jpg","goodsTitle":"燎原中老年高钙高铁多维配方奶粉 成人早餐奶粉罐装900g","goodsGalleryUrls":["//img.alicdn.com/i3/2379732838/O1CN011WpqVcuEIJb5S5x_!!2379732838.jpg","//img.alicdn.com/i4/2379732838/O1CN01l7Fv4f1WpqVb0HjDW_!!2379732838.jpg","//img.alicdn.com/i1/2379732838/TB2CYTmmByWBuNkSmFPXXXguVXa_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB226nAa8gXBuNjt_hNXXaEiFXa_!!2379732838.jpg"],"goodsDesc":"雪域高原 远离污染","goodsDescUrls":["//img.alicdn.com/i3/2379732838/O1CN011WpqVcuEIJb5S5x_!!2379732838.jpg","//img.alicdn.com/i4/2379732838/O1CN01l7Fv4f1WpqVb0HjDW_!!2379732838.jpg","//img.alicdn.com/i1/2379732838/TB2CYTmmByWBuNkSmFPXXXguVXa_!!2379732838.jpg","//img.alicdn.com/i2/2379732838/TB226nAa8gXBuNjt_hNXXaEiFXa_!!2379732838.jpg"],"goodsCoupon":60,"goodsPrice":168,"goodsRebate":1.68,"totalBuy":"29","invalidTime":"2019-12-04","volume":null,"totalAmount":null},{"goodsId":"524358794734","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i3/2648152163/O1CN01WLiLqX1RqhBjhAMrR_!!0-item_pic.jpg","goodsTitle":"向辉黄芪粉细粉 甘肃黄芪细粉无硫非野生黄芪片打粉 正品包邮","goodsGalleryUrls":["//img.alicdn.com/i4/2648152163/O1CN01YowzOH1RqhBj2BBc3_!!2648152163.jpg","//img.alicdn.com/i2/2648152163/O1CN01AaA1db1RqhBkLz0Fz_!!2648152163.jpg","//img.alicdn.com/i3/2648152163/O1CN01WTY8hL1RqhBhsy5FX_!!2648152163.jpg","//img.alicdn.com/i4/2648152163/O1CN01p2pJH61RqhBjfziMJ_!!2648152163.jpg"],"goodsDesc":"原厂直销 正品保证","goodsDescUrls":["//img.alicdn.com/i4/2648152163/O1CN01YowzOH1RqhBj2BBc3_!!2648152163.jpg","//img.alicdn.com/i2/2648152163/O1CN01AaA1db1RqhBkLz0Fz_!!2648152163.jpg","//img.alicdn.com/i3/2648152163/O1CN01WTY8hL1RqhBhsy5FX_!!2648152163.jpg","//img.alicdn.com/i4/2648152163/O1CN01p2pJH61RqhBjfziMJ_!!2648152163.jpg"],"goodsCoupon":50,"goodsPrice":88,"goodsRebate":1.98,"totalBuy":"38","invalidTime":"2019-12-08","volume":null,"totalAmount":null},{"goodsId":"601265931721","goodsImgUrl":"//img.alicdn.com/bao/uploaded/i3/2201284868463/O1CN01UbKw4B2CO6TBfegdS_!!0-item_pic.jpg","goodsTitle":"适用于airpods2充电仓无线蓝牙耳机xs华为vivo苹果8小米7双耳iphone11pro原装正品华强北洛达通用充电盒单卖","goodsGalleryUrls":null,"goodsDesc":"","goodsDescUrls":null,"goodsCoupon":50,"goodsPrice":128,"goodsRebate":2.03,"totalBuy":"8617","invalidTime":"2019-12-31","volume":null,"totalAmount":null}],
        tabList: [
          {id: 0, name: '热门'},
          {id: 1, name: '食品'},
          {id: 4, name: '母婴'},
          {id: 12, name: '海淘'},
          {id: 13, name: '水果'},
          {id: 14, name: '女装'},
          {id: 15, name: '百货'}
        ]
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
      }
    },
    // 滚动页面
    onPageScroll(e) {
      this.$refs['x-fixed'].scrollTab(e)
    },
    onLoad() {
      uni.login({
        scopes: 'auth_base',
        success: (res) => {
          console.log('auth_base', res)
        }
      })
    },
    mounted() {
      // 计算标题栏高度
      this.getNavigation()
      // this.setDrawImage()
    },
		methods: {
      // 获取用户信息
      onGetUserInfo() {
        uni.login({
          scopes: 'auth_user',
          success: (res) => {
            console.log('auth_user', res)
          }
        })
      },
      // 获取navigation信息
      getNavigation() {
        const query = uni.createSelectorQuery()
        query.select('#x-navigation-bar').boundingClientRect(data => {
          console.log(data)
          this.navigationHeight = data ?  data.height : 0
        }).exec()
      },
      onSetVuex() {
        console.log(this.$store.state.user.token)
        this.$store.dispatch('user/login', 123)
        console.log(this.$store.state.user.token)
      },
      onCellClick() {
        console.log('x-cell click')
      },
      onShowModal() {
        this.modalShow = true
      },
      onHideModal(){
        this.modalShow = false
      },
      onModalClose() {
        uni.showToast({
          title: '关闭弹出层回调'
        })
      },
      onModalSuccess() {
        uni.showToast({
          title: '点击了确定按钮'
        })
      },
      onConfirm() {
        console.log(...arguments)
      },
      setDrawImage() {
        const ctx = uni.createCanvasContext('awesomeCanvas')
        ctx.drawImage('https://mdgw.alipay.com/wsdk/img?fileid=A*5uv1T45JIowAAAAAAAAAAAAAAQAAAQ&bz=am_afts_openhome&zoom=original', 2, 2, 250, 250)
        ctx.draw()
      },
      onClearStorageSync() {
        uni.clearStorageSync()
        uni.showToast({
          title: '执行成功~'
        })
      }
		}
	}
</script>

<style lang="scss">
  .m-demo-content{
    > .title{ padding: 20px; font-weight: bold; border-top: 1px solid #dcdcdc;}
    .button{
      padding: 10px;
      .li{ padding: 5px 0;}
    }
    .nav{
      display: flex; flex-wrap: wrap; padding: 9px;
      .li{ padding: 9px; border: 1px solid #dcdcdc; margin: 2px;}
    }
    .icon{
      display: flex; flex-wrap: wrap; padding: 2px;
      .li{ padding: 20px; background-color: #eee; margin: 2px;}
    }
    .image{
      display: flex; flex-wrap: wrap; padding: 2px;
      .li{ width: 25%; height: 300px; padding: 2px;}
      .bg-img{ height: 100%; background: cdn('/assets/svg/customer.svg') no-repeat; word-break: break-all;}
    }
    .goods{
      overflow: hidden; background: $uni-bg-color-grey;
      .ul{
        display: flex; flex-wrap: wrap; padding: 9px;
        .li{ width: 50%; padding: 9px;}
      }
    }
    .modal{
      display: flex; align-items: center;
      .li{ flex: 1; padding: 10px;}
    }
  }
</style>
