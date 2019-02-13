<template>
  <div class="scroll-wrap" :style="{top:positionTop}">
    <div class="scroll" ref="scroll"  :style="transform">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
import { prefixStyle } from '@/utils/tools.js';
import { getTranslate } from '@/utils/animation';
import { HEAD_HEIGHT } from '@/data/consts.js'
const transform = prefixStyle('transform')
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
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    distanceIndex: {
      type: Number,
      default: 2
    },
    bottomMethod: {
      type: Function
    }
  },
  data () {
    return {
      startClientY: 0,
      startScrollTop: 0,
      currentY: 0,
      translate: 0,
      scrollEle: null,
      bottomReached: false
    }
  },
  computed: {
    positionTop () {
      return this.top || `${HEAD_HEIGHT}px`
    },
    transform () {
      let translateY = `${this.translate}px`
      return this.translate === 0 ? null : `${transform}:${getTranslate(0, translateY)}`;
    }
  },
  methods: {
    scrollTo (y) {
      this.$refs.scroll.scrollTop = y;
    },
    init () {
      this.scrollEle = this.$refs.scroll;
      if (this.listenScroll) {
        this.scrollEle.addEventListener('scroll', this.getScrollPosition)
      }
      if (this.pullDown || this.pullUp) {
        this.bindTouchEvents(this.scrollEle)
      }
    },
    bindTouchEvents (element) {
      // style
      element.addEventListener('touchstart', this.handleTouchStart);
      element.addEventListener('touchmove', this.handleTouchMove);
      element.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchStart (ev) {
      this.startClientY = ev.touches[0].clientY;
      // touchStart 开始时候 scrollTop 的值
      this.startScrollTop = this.scrollEle.scrollTop;
      this.bottomReached = false;
    },
    handleTouchMove (ev) {
      if (this.startClientY < this.scrollEle.getBoundingClientRect().top && this.startClientY > this.scrollEle.getBoundingClientRect().bottom) {
        return;
      }
      this.currentClientY = ev.touches[0].clientY;
      let distance = (this.currentClientY - this.startClientY) / this.distanceIndex;
      if (this.pullDown) {
        if (this.scrollEle.scrollTop === 0 && distance > 0) {
          // if trigger TouchMove not touch Scroll
          if (ev.cancelable) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          this.translate = distance - this.startScrollTop
        } else {
          this.translate = 0;
        }
        if (this.translate < 0) {
          this.translate = 0;
        }
        this.$emit('pull', this.translate);
      }
      if (this.pullUp) {
        this.bottomReached = this.bottomReached || this.checkBottomReached();
        if (this.bottomReached && distance < 0) {
          // if trigger TouchMove not touch Scroll
          if (ev.cancelable) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          this.translate = this.scrollEle.scrollTop - this.startScrollTop + distance;
        } else {
          this.translate = 0;
        }
        if (this.translate > 0) {
          this.translate = 0;
        }
        this.$emit('pullUp', this.translate);
      }
    },
    handleTouchEnd () {
      this.translate = '0';
      if (this.pullDown) {
        this.$emit('pull', this.translate);
      } else if (this.pullUp) {
        this.$emit('pullUp', this.translate);
      }
    },
    getScrollPosition (ev) {
      let element = ev.currentTarget;
      this.$emit('scroll', {
        y: element.scrollTop,
        x: element.scrollLeft
      })
    },
    checkBottomReached () {
      console.log('this.$el.getBoundingClientRect().bottom', this.$el.getBoundingClientRect().bottom);
      console.log('this.scrollEle.getBoundingClientRect().bottom', this.scrollEle.getBoundingClientRect().bottom);
      return parseInt(this.$el.getBoundingClientRect().bottom) <= parseInt(this.scrollEle.getBoundingClientRect().bottom) + 1;
    }
  },
  mounted () {
    this.init();
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
