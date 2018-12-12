<template>
  <div class="scroll-wrap" :style="{top:positionTop}">
    <div class="scroll" ref="scroll">
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
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positionTop () {
      return this.top || HEAD_HEIGHT
    }
  },
  methods: {
    scrollTo (y) {
      this.$refs.scroll.scrollTop = y;
    },
    initScroll () {
      if (this.listenScroll) {
        let element = this.$refs.scroll;
        element.addEventListener('scroll', this.getScrollPosition)
      }
    },
    getScrollPosition (ev) {
      let element = ev.currentTarget
      this.$emit('scroll', {
        y: element.scrollTop,
        x: element.scrollLeft
      })
    }
  },
  mounted () {
    this.initScroll();
  }
}
</script>
<style lang="stylus">
.scroll-wrap {
  position: absolute;
  width: 100%;
  bottom: 0;
  overflow: hidden;
  .scroll {
    height: 100%
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
