<template>
  <div class="music-list">
    <transition name="show">
      <div class="ban-back white" ref="back" v-if="showLight" key="white">
        <div class="left-button"  @click.stop="back" >
          <div class="back-arrow"></div>
          <div class="left-title">返回</div>
        </div>
        <h1 class="title" v-html="title"></h1>
      </div>
      <div v-else class="ban-back dark" key="dark">
        <div class="left-button" @click.stop="back">
          <div class="back-arrow"></div>
          <div class="left-title">返回</div>
        </div>
        <h1 class="title" v-html="title"></h1>
      </div>
    </transition>
    <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
    <div class="album" v-if="!pullDown">
      <slot></slot>
    </div>
    <a-scroll :top="scrollHeight" @pull="pull" :pull-down="pullDown" @scroll="scroll" :listen-scroll="listenScroll">
      <div :style="layerStyle" ref="layer"></div>
      <song-list class="song-wrapper" :rank="rank" :songs="songs" @select="selectItem"></song-list>
    </a-scroll>
  </div>
</template>
<script>
import aScroll from 'components/common/AScroll';
import songList from 'components/common/SongList';
import { prefixStyle } from '@/utils/tools.js';
import {mapActions} from 'vuex'
const transform = prefixStyle('transform')
export default {
  data () {
    return {
      layerHeight: '0px',
      imageHeight: '0px',
      scrollY: 0,
      listenScroll: true,
      showLight: true,
      translateY: 0,
      scale: 1,
      scrollHeight: '0px'
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    pullDown: {
      type: Boolean,
      default: true
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  components: {
    aScroll, songList
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    },
    layerStyle () {
      return `height:${this.layerHeight}px`
    }
  },
  watch: {
    scrollY (newY) {
      let showStatus = newY <= this.layerHeight;
      if (showStatus === this.showLight) {
        return;
      }
      this.showLight = showStatus
    },
    translateY (newVal) {
      let scale = 1
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
      }
      if (this.scale === scale) {
        return;
      }
      this.scale = scale
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  methods: {
    ...mapActions([
      'selectPlay'
    ]),
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    pull (translateY) {
      this.translateY = translateY;
    },
    initView () {
      if (this.$refs.back && this.$refs.bgImage) {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.scrollHeight = `${this.$refs.back.clientHeight}px`;
        this.layerHeight = `${this.imageHeight - this.$refs.back.clientHeight}`;
      }
    }
  },
  mounted () {
    this.initView()
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.music-list {
  position: absolute;
  top: 0
  left: 0
  bottom: 0
  right: 0
  .ban-back {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    line-height: $bar-height;
    height: $bar-height;
    z-index: 2;
    text-align: center;
    .left-button {
      position: absolute;
    }
    .left-title {
      font-size: $font-size-medium;
      display: inline-block;
      vertical-align: middle;
      color: $color-pink;
    }
    .back-arrow {
      normal-arrow($color-pink,-45deg);
    }
    .title {
      font-size: $font-size-medium-x;
      color: $color-text-d;
      no-wrap();
    }
  }
  .white {
    .title {
      color: $color-pink;
    }
  }
  .dark {
    background: $color-highlight-background;
    .left-title {
      color: $color-text-d;
    }
    .back-arrow {
      border-top: 1px solid $color-text-d;
      border-left: 1px solid $color-text-d;
    }
  }
  .bg-image {
    width: 100%;
    padding-top: 70%;
    height: 0
    background-size: cover;
    position: absolute;
    /*
    *  attention
    */
    transform-origin: top;
  }
  .album {
    position: absolute;
    padding-top: 70%;
    height: 0;
    width: 100%;
  }
  .song-wrapper {
    background-color: $background-color-theme;
    padding: 20px 20px;
  }
  .show-enter-active, .show-leave-active {
    transition: opacity 0.3s;
  }
  .show-enter, .show-leave-to {
    opacity: 0;
  }
}
</style>
