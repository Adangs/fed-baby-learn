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
  .inline-block{ display: inline-block;}
  .x-grid{
    display: grid;
    &.span-1{ grid-template-columns: repeat(1, minmax(0px, 1fr));}
    &.span-2{ grid-template-columns: repeat(2, minmax(0px, 1fr));}
    &.span-3{ grid-template-columns: repeat(3, minmax(0px, 1fr));}
    &.span-4{ grid-template-columns: repeat(4, minmax(0px, 1fr));}
    &.span-5{ grid-template-columns: repeat(5, minmax(0px, 1fr));}
    &.span-6{ grid-template-columns: repeat(6, minmax(0px, 1fr));}
    &.span-7{ grid-template-columns: repeat(7, minmax(0px, 1fr));}
    &.span-8{ grid-template-columns: repeat(8, minmax(0px, 1fr));}
    &.span-9{ grid-template-columns: repeat(9, minmax(0px, 1fr));}
  }
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
