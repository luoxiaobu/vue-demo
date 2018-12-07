<template>
  <div class="a-slider">
    <div class="a-slider-panel clearfix" :style="[styleTransform,styleTransition,panelWidth]" ref="wrap">
      <div class="slider-item" v-for="(item, index) in container" :style="{width: viewWidth}" :key="index">
        <a :href="item.linkUrl">
          <img v-if="item.picUrl" @error="errorUrl" :src="item.picUrl" width="100%">
        </a>
      </div>
    </div>
    <div class="a-swipe-dot" v-show="showDot">
      <span :class="{'is-active': isActive-1 === index }" v-for="(item, index) in pages" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { transitionEndEvent, getTranslate } from '@/utils/animation';

const moveThreshold = 25;
const maxListShowed = 3;
export default {
  data () {
    return {
      canDrag: false,
      container: [],
      startSwipeLeft: false,
      startSwipeRight: false,
      axis: null,
      startClientX: 0,
      startClientY: 0,
      isActive: 1,
      startTime: 0,
      timer: 0,
      panelTransform: '',
      panelTransition: '',
      errorUrl: () => {}
    }
  },
  props: {
    showDot: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    pages: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    panelWidth () {
      return {
        width: `${this.container.length * 100}%`
      };
    },
    styleTransform () {
      return {
        webkitTransform: this.panelTransform,
        transform: this.panelTransform
      }
    },
    swiping () {
      return this.startSwipeLeft || this.startSwipeRight;
    },
    styleTransition () {
      return {
        webkitTransition: this.panelTransition,
        transition: this.panelTransition
      }
    },
    containerLength () {
      return this.container.length;
    },
    pagesLength () {
      return this.pages.length;
    },
    viewWidth () {
      return `${1 / this.container.length * 100}%`
    }
  },
  methods: {
    reInitPages () {
      var length = this.pages.length;
      this.canDrag = length > 1;
      if (this.canDrag) {
        length = length + 2;
      }
      this.container = this.pages.concat();
      if (this.canDrag) {
        this.container.push(this.pages[0]);
        this.container.unshift(this.pages[this.pages.length - 1])
      }
      this.setPanelTransform(this.isActive);
      if (this.canDrag && this.autoPlay) {
        this.stopCarousel();
        this.carousel();
      }
    },
    prev (length, isActive) {
      var pageto = isActive - 1;
      pageto = pageto < 0 ? length - 1 : pageto;
      return pageto;
    },
    next (length, isActive) {
      var pageto = isActive + 1;
      pageto = pageto >= length ? 0 : pageto;
      return pageto;
    },
    setPanelTransform (index) {
      const x = (-index / this.containerLength) * 100;
      this.panelTransform = getTranslate(`${x}%`);
    },
    setPanelTransition (str = 'transform 0.3s') {
      this.panelTransition = str
    },
    moveView (diff) {
      const x = (-this.isActive / this.containerLength + diff / this.$refs.wrap.clientWidth) * 100
      this.panelTransform = getTranslate(`${x}%`);
    },
    swipeRight () {
      this.startSwipeRight = true;
      this.setPanelTransform(this.isActive - 1);
      this.setPanelTransition();
      this.checkAnimationEnd().then(() => {
        this.isActive = this.prev(this.containerLength, this.isActive);
        this.setPanelTransition('');
        this.startSwipeRight = false;
        if (this.isActive === 0) {
          this.isActive = this.containerLength - 2;
          this.setPanelTransform(this.isActive);
        }
      });
    },
    swipeLeft () {
      this.startSwipeLeft = true;
      this.setPanelTransform(this.isActive + 1);
      this.setPanelTransition();
      this.checkAnimationEnd().then(() => {
        this.isActive = this.next(this.containerLength, this.isActive);
        this.setPanelTransition('');
        this.startSwipeLeft = false;
        if (this.isActive === this.containerLength - 1) {
          this.isActive = 1;
          this.setPanelTransform(this.isActive);
        }
      });
    },
    resetPane () {
      this.moveView(0);
      if (this.canDrag && this.autoPlay) {
        this.stopCarousel();
        this.carousel();
      }
    },
    getDirection (ev) {
      return Math.abs(ev.touches[0].clientY - this.startClientY) - Math.abs(ev.touches[0].clientX - this.startClientX) > 0 ? 'y' : 'x';
    },
    hlPanstart (ev) {
      this.startClientX = ev.touches[0].clientX;
      this.startClientY = ev.touches[0].clientY;
      this.startTime = +new Date();
    },
    hlPanmove (ev) {
      if (!this.axis) {
        this.axis = this.getDirection(ev)
      }
      if (this.axis === 'y') {
        return;
      }
      ev.preventDefault();
      const diff = ev.touches[0].clientX - this.startClientX;
      if (Math.abs(diff) < moveThreshold) {
        return;
      }
      this.moveView(diff);
    },
    hlPanend (ev) {
      if (ev.touches.length > 0) {
        return;
      }
      if (this.axis === 'y') {
        this.axis = null;
        return;
      }
      this.axis = null;
      const partialWidth = this.$el.clientWidth / maxListShowed;
      const duration = +new Date() - this.startTime;
      const diff = (ev.touches[0] || ev.changedTouches[0]).clientX - this.startClientX;
      if (Math.abs(diff) < moveThreshold) {
        this.resetPane();
        return;
      }
      if (Math.abs(diff) > partialWidth || Math.abs(diff) / duration > 0.4) {
        if (diff > 0) {
          this.swipeRight();
        } else if (diff < 0) {
          this.swipeLeft();
        }
      } else {
        this.resetPane();
      }
    },
    checkAnimationEnd () {
      var that = this;
      return new Promise((resolve, reject) => {
        var endFunc = () => {
          resolve();
          if (that.$el) {
            that.$el.removeEventListener(transitionEndEvent, endFunc);
          }
          if (that.canDrag && that.autoPlay) {
            that.stopCarousel();
            that.carousel();
          }
        };
        that.$el.addEventListener(transitionEndEvent, endFunc);
      });
    },
    carousel () {
      this.timer = setTimeout(this.swipeLeft, 4 * 1000);
    },
    stopCarousel () {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  mounted () {
    this.reInitPages()
    var element = this.$refs.wrap;
    element.addEventListener('touchstart', (event) => {
      this.stopCarousel();
      if (this.swiping) {
        return;
      }
      if (this.canDrag) {
        this.hlPanstart(event);
      }
    });
    element.addEventListener('touchmove', (event) => {
      this.stopCarousel();
      if (this.swiping) {
        return;
      }
      if (this.canDrag) {
        this.hlPanmove(event);
      }
    });
    element.addEventListener('touchend', (event) => {
      this.stopCarousel();
      if (this.swiping) {
        return;
      }
      if (this.canDrag) {
        this.hlPanend(event);
      }
    });
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="stylus">
.a-slider {
  overflow: hidden;
  position: relative;
}
.clearfix:after{
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.slider-item {
  float: left;
}
.a-swipe-dot {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  padding: 0 6px;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 4px;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: rgba(144,144,144,.8);
  }
  .is-active {
    background-color: #fff;
  }
  img {
    vertical-align: middle;
    background: #E7E7E7;
  }
}
</style>
