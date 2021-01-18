<template>
  <view class="m-calculate">
    <x-navigation-bar title="数学" />
    <view class="preview">

    </view>
    <view class="tools">

    </view>
  </view>
</template>

<script>
import XNavigationBar from '@/components/x-navigation-bar'
import XImage from '@/components/x-image'

export default {
  name: 'Calculate',
  components: {
    XNavigationBar,
    XImage
  },
  props: {},
  data () {
  return {}
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="scss">
  .m-calculate{
    .preview{ background-color: #f9f9f9; height: 500px;}
  }
</style>
