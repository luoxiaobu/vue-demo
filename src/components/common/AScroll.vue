<template>
  <div class="scroll-wrap" :style="{top:positionTop}">
    <div class="scroll">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
const HEAD_HEIGHT = '88px'
export default {
  props: {
    top: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    positionTop () {
      return this.top || HEAD_HEIGHT
    }
  }
}
</script>
<style lang="stylus">
.scroll-wrap {
  position: absolute
  width: 100%
  bottom: 0
  .scroll {
    height: 100%
    overflow-x: scroll;
  }
}
</style>
