<template>
  <div class="music-list">
    <transition name="show">
      <div class="ban-back white" @click.stop="back" ref="back" v-if="showLight" key="white">
        <div class="left-botton">
          <div class="back-arrow"></div>
          <div class="left-title">返回</div>
        </div>
      </div>
      <div v-else class="ban-back dark" @click.stop="back" key="dark">
        <div class="left-botton">
          <div class="back-arrow"></div>
          <div class="left-title">返回</div>
        </div>
        <h1 class="title" v-html="title"></h1>
      </div>
    </transition>
    <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
    <a-scroll :top="scrollHeight" @scroll="scroll" :listen-scroll="listenScroll">
      <div :style="layerStyle" ref="layer"></div>
      <song-list class="song-wrapper" :songs="songs" @select="selectItem"></song-list>
    </a-scroll>
  </div>
</template>
<script>
import aScroll from 'components/common/AScroll';
import songList from 'components/common/SongList';
import { getplaysongvkey } from 'service/song'
export default {
  data () {
    return {
      layerHeight: '0px',
      scrollHeight: '0px',
      scrollY: 0,
      listenScroll: true,
      showLight: true
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
    }
  },
  methods: {
    selectItem (item, index) {
      var songMid = item.mid;
      getplaysongvkey(songMid).then((data) => {
        console.log(data)
      })
    },
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    initView () {
      if (this.$refs.back && this.$refs.bgImage) {
        this.scrollHeight = `${this.$refs.back.clientHeight}px`;
        this.layerHeight = `${this.$refs.bgImage.clientHeight - this.$refs.back.clientHeight}`;
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
.music-list {
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  .ban-back {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    line-height: 40px;
    height: 40px;
    z-index: 2;
    .left-botton {
      position: absolute;
    }
    .left-title {
      font-size: $font-size-medium;
      display: inline-block;
      vertical-align: middle;
      color: $color-pink;
    }
    .back-arrow {
      width: 10px;
      height: 10px;
      transform: rotate(-45deg);
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      border-top: 1px solid $color-pink;
      border-left: 1px solid $color-pink;
    }
  }
  .dark {
    text-align: center;
    background: $color-highlight-background;
    .left-title {
      color: $color-text-d;
    }
    .back-arrow {
      border-top: 1px solid $color-text-d;
      border-left: 1px solid $color-text-d;
    }
    .title {
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }
  }
  .bg-image {
    width: 100%;
    padding-top: 70%;
    height: 0
    background-size: cover;
    position: absolute;
  }
  .song-wrapper {
    background-color: $background-color-theme;
    padding: 20px 30px;
  }
  .show-enter-active, .show-leave-active {
    transition: opacity 0.3s;
  }
  .show-enter, .show-leave-to {
    opacity: 0;
  }
}
</style>
