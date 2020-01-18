<template>
  <view class="x-cell-group">
    <slot />
  </view>
</template>

<script>
  export default {
    name: 'XCellGroup',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {

    },
    methods: {}
  };
</script>

<style lang="scss">
  .x-cell-group{
    .x-cell:last-child{ border-bottom: 0;}
  }
</style>
