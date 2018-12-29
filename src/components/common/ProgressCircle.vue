<template>
  <div class="progress-circle">
    <!-- viewBox stroke-dasharray stroke-dashoffset are very interesting -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-bar" r="50" :style="{'stroke-width':strokeWidth}" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
    </svg>
    <div class="progress-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 30
    },
    percent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset () {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
.progress-circle {
  position: relative;
  circle {
    transform-origin: center;
  }
  .progress-bar {
    transform: scale(0.9) rotate(-90deg);
    stroke: $color-pink;
  }
  .progress-content {
    top: 0;
    position: absolute;
  }
}
</style>
