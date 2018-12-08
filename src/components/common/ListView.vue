<template>
  <a-scroll class="list-view" ref="listview">
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
      <div class="side-bar-item" v-for="(title, index) in barData" :key="index" :data-index="index">
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
      scrollY: 0
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
    }
  },
  methods: {
    barTouchStart (ev) {
      if (ev.cancelable) {
        ev.preventDefault();
      }
      this.startClientY = ev.touches[0].clientY;
      this.startIndex = parseInt(getData(ev.target, 'index'));
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
      this.scrollY = this.listHeight[index]
      this.$refs.listview.scrollTo(this.scrollY)
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
    padding: 3px;
    line-height: 1;
    color: $color-text-gr;
    font-size: $font-size-small;
    &.current {
      color: $color-theme;
    }
  }
}
</style>
