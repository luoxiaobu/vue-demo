<template>
  <div class="a-slider">
    <slot></slot>
  </div>
  <div class="a-swipe-dot" v-show="showDot">
    <span :class="['a-swipe-dot-item',{'is-active': currentPageIndex === index }" v-for="(item, index) in dots"></span>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {

      }
    },
    props: {
      showDot: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="stylus">
  
</style>