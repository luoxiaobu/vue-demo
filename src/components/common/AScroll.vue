<template>
  <div class="scroll-wrap" :style="{top:positionTop}">
    <div class="scroll" ref="scroll">
      <div class="content" ref="content">
        <div :style="transform">
          <slot></slot>
          <div class="loadmore-bottom" v-if="bottomMethod">
            <span class="arrow" v-show="!this.loading&&!bottomAllLoaded" :class="{ 'is-rotate': bottomStatus === 'drop' }">↓</span>
            <span v-show="this.loading&&!bottomAllLoaded">Loading...</span>
          </div>
        </div>
      </div>
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
    },
    bottomDistance: {
      type: Number,
      default: 60
    },
    bottomAllLoaded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      startClientY: 0,
      startScrollTop: 0,
      currentY: 0,
      translate: 0,
      scrollEle: null,
      bottomReached: false,
      content: null,
      bottomStatus: ''
    }
  },
  computed: {
    positionTop () {
      return this.top || `${HEAD_HEIGHT}px`
    },
    transform () {
      let translateY = `${this.translate}px`
      return this.translate === 0 ? null : `${transform}:${getTranslate(0, translateY)}`;
    },
    loading () {
      return this.bottomStatus === 'loading'
    }
  },
  methods: {
    scrollTo (y) {
      this.$refs.scroll.scrollTop = y;
    },
    init () {
      this.scrollEle = this.$refs.scroll;
      this.content = this.$refs.content;
      this.bottomStatus = 'pull';
      if (this.listenScroll) {
        this.scrollEle.addEventListener('scroll', this.getScrollPosition)
      }
      if (this.pullDown || this.pullUp) {
        this.bindTouchEvents(this.scrollEle)
      }
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull';
      }
    },
    bindTouchEvents (element) {
      // style
      element.addEventListener('touchstart', this.handleTouchStart);
      element.addEventListener('touchmove', this.handleTouchMove);
      element.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchStart (ev) {
      if (this.loading) {
        return
      }
      this.startClientY = ev.touches[0].clientY;
      // touchStart 开始时候 scrollTop 的值
      this.startScrollTop = this.scrollEle.scrollTop;
      this.bottomReached = false;
    },
    handleTouchMove (ev) {
      if (this.loading) {
        return
      }
      if (this.startClientY < this.scrollEle.getBoundingClientRect().top && this.startClientY > this.scrollEle.getBoundingClientRect().bottom) {
        return;
      }
      this.currentClientY = ev.touches[0].clientY;
      let distance = (this.currentClientY - this.startClientY) / this.distanceIndex
      if (this.pullDown) {
        if (this.scrollEle.scrollTop === 0 && distance > 0) {
          // if trigger TouchMove not touch Scroll
          if (ev.cancelable) {
            ev.preventDefault();
          }
          this.translate = distance - this.startScrollTop
          if (this.translate < 0) {
            this.translate = 0;
          }
          this.$emit('pull', this.translate);
          return;
        }
      }
      if (this.pullUp) {
        this.bottomReached = this.bottomReached || this.checkBottomReached();
        if (this.bottomReached && distance < 0 && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
          // if trigger TouchMove not touch Scroll
          if (ev.cancelable) {
            ev.preventDefault();
          }
          this.translate = this.scrollEle.scrollTop - this.startScrollTop + distance;
          if (this.translate > 0) {
            this.translate = 0;
          }
          this.$emit('pullUp', this.translate);
          this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
        }
      }
    },
    handleTouchEnd () {
      if (this.loading) {
        return
      }
      if (this.pullDown) {
        this.translate = '0';
        this.$emit('pull', this.translate);
      } else if (this.pullUp) {
        if (this.bottomReached && this.translate < 0) {
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod && this.bottomMethod();
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
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
    onBottomLoaded () {
      this.bottomStatus = 'pull';
      this.$nextTick(() => {
        this.translate = 0;
      });
    },
    checkBottomReached () {
      return parseInt(this.$el.getBoundingClientRect().bottom) >= parseInt(this.content.getBoundingClientRect().bottom);
    }
  },
  mounted () {
    this.init();
  }
}
</script>
<style lang="stylus">
@import "../../themes/variable"
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
  .content {
    overflow: hidden;
  }
  .loadmore-bottom {
    margin-bottom: -50px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    .arrow {
      vertical-align: middle;
      display: inline-block;
      transition: .2s linear;
    }
    .is-rotate {
      transform: rotate(180deg);
    }
  }
}
</style>
