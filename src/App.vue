<script>
	export default {
    globalData: {
      assets: 'https://img.alicdn.com/static/assets'
    },
    onLaunch() {
			console.log('App Launch')
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  page{font-size: $uni-font-size-sm; color: $uni-color-default;}
  view,
  text,
  icon,
  button,
  input,
  swiper,
  swiper-item,
  scroll-view,
  navigator { box-sizing: border-box; }
  /*==== flex style ====*/
  .flex {
    display: flex;
    align-items: center;

    &.left {
      justify-content: flex-start
    }

    &.right {
      justify-content: flex-end
    }

    &.center {
      justify-content: center
    }

    &.between {
      justify-content: space-between
    }

    &.around {
      justify-content: space-around
    }

    &.top {
      align-items: flex-start
    }

    &.bottom {
      align-items: flex-end
    }

    &.wrap {
      flex-wrap: wrap
    }

    .flex-item {
      flex: 1;
    }

    .flex-none {
      flex: none;
    }

    &.col {
      flex-direction: column;
    }
  }

</style>
