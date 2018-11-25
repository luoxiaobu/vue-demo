<template>
  <div class="a-slider">
    <slot></slot>
  </div>
  <div class="a-swipe-dot" v-show="showDot">
    <div class="a-swipe-dot-item"
      v-for="(page, $index) in pages"
      :class="{ 'is-active': $index === index }"></div>
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
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="stylus">
  
</style>