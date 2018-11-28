<template>
  <div class="a-slider">
    <slot></slot>
  </div>
  <div class="a-swipe-dot" v-show="showDot">
    <span :class="['a-swipe-dot-item',{'is-active': currentPageIndex === index }" v-for="(item, index) in dots"></span>
  </div>
</template>

<script type="text/javascript">
  const NO_DRAG = 1;
  const INSERT_NUM = 2;
  export default {
    data () {
      return {
        noDrag: true,
        currentIndex: 1,
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
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      reInitPages() {
        var pagesTemp = [];
        var children = this.$children;
        var length = children.length;
        this.noDrag = children.length === 1;
        if (!this.noDrag) {
          length = length + 2;
        }
        children.forEach((child, index) => {
          pagesTemp.push(child);
          const childEle = child.$el;
          childEle.classList.remove('is-active');
          childEle.classList.add('slider-item');
          childEle.style.width = `${100 / length}%`;
        });
        if (!this.noDrag) {
          pagesTemp.push(children[0]);
          pagesTemp.unshift(children[children.length-1])
          children[1].$el.classList.add('is-active')
        }
        this.pages = pagesTemp;
      },
      initSliderItem () {

      }
    }
  }
</script>

<style lang="stylus">
  
</style>