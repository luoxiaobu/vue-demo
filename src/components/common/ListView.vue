<template>
  <a-scroll class="list-view">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul class="list-group-block">
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="side-bar" v-if="barData.length" @touchstart="sideBarstart">
      <div class="side-bar-item" v-for="(title, index) in barData" :key="index" :data-index="index">
        {{title}}
      </div>
    </div>
  </a-scroll>
</template>
<script>
import AScroll from './AScroll';
import { getData } from '@/utils/tools.js'
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
      startIndex: 0
    }
  },
  computed: {
    barData () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    sideBarstart (ev) {
      this.startClientY = ev.touches[0].clientY;
      this.startIndex = getData(ev.target);
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
