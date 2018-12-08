<template>
  <a-scroll class="list-view"
  @scroll="scroll"
  :listen-scroll="listenScroll"
  ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul class="list-group-block">
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="side-bar" v-if="barData.length" @touchstart.stop="barTouchStart" @touchmove.stop="barTouchMove">
      <div :class="['side-bar-item',{'current':index===currentIndex}]" v-for="(title, index) in barData" :key="index" :data-index="index">
        {{title}}
      </div>
    </div>
  </a-scroll>
</template>
<script>
import AScroll from './AScroll';
import { getData } from '@/utils/tools.js';
const SID_ITEM_HEIGHT = 18;
export default {
  components: {
    AScroll
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      startClientY: 0,
      startIndex: 0,
      listHeight: [],
      scrollY: 0,
      currentIndex: 0,
      listenScroll: true
    }
  },
  computed: {
    barData () {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      })
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY <= 0) {
        this.currentIndex = 0;
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (newY >= height1 && newY < height2) {
          this.currentIndex = i;
          return
        }
      }
      this.currentIndex = this.listHeight.length - 1;
    }
  },
  methods: {
    barTouchStart (ev) {
      if (ev.cancelable) {
        ev.preventDefault();
      }
      this.startClientY = ev.touches[0].clientY;
      this.startIndex = parseInt(getData(ev.target, 'index'));
      this.scrollTo(this.startIndex);
    },
    barTouchMove (ev) {
      if (ev.cancelable) {
        ev.preventDefault();
      }
      let diff = ev.touches[0].clientY - this.startClientY;
      let moveItem = diff / SID_ITEM_HEIGHT | 0;
      if (moveItem) {
        this.scrollTo(moveItem + this.startIndex);
      }
    },
    calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length - 1; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 1) {
        index = this.listHeight.length - 1
      }
      this.currentIndex = index;
      this.scrollY = this.listHeight[index]
      this.$refs.listview.scrollTo(this.scrollY)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  }
}
</script>
<style lang="stylus">
@import "../../themes/variable"
.list-view {
  .list-group {}
  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: $font-size-small;
    color: $color-text-d;
    background: $color-highlight-background;
  }
  .list-group-item {
    display: flex;
    align-items: center;
    padding: 20px 0 0 30px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      margin-left: 20px;
      color: $color-text-dark;
      font-size: $font-size-medium;
    }
  }
  .list-group-block {
    padding-bottom: 20px;
  }
  .side-bar {
    touch-action: none;
    position: absolute;
    z-index: 30
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    font-family: Helvetica;
    background-color: transparent;
  }
  .side-bar-item {
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    color: $color-text-gr;
    font-size: $font-size-small;
    &.current {
      border-radius: 50%;
      color: #fff;
      background-color:#f7d8e0;
    }
  }
}
</style>
