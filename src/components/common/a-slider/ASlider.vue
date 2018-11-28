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
          pagesTemp.push(children[0]);
          length = length + 2;
        }
        children.forEach((child, index) => {
          pagesTemp.push(child);
          child.$el.classList.remove('is-active');
          const c = child;
          c.$el.style.width = `${100 / children.length}%`;
          c.$el.style.left = `${(100 * index) / children.length}%`;
          if (index === this.defaultIndex) {
            child.$el.classList.add('is-active');
          }
        });
        this.pages = pagesTemp;
      },
      initSliderItem () {

      }
    }
  }
</script>

<style lang="stylus">
  
</style>