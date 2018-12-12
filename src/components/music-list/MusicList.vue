<template>
  <div class="music-list">
    <div class="ban-back white" @click.stop="back" ref="back">
      <div class="left-botton">
        <div class="back-arrow"></div>
        <div class="left-title">返回</div>
      </div>
    </div>
    <div class="ban-back dark">
      <div class="left-botton">
        <div class="back-arrow"></div>
        <div class="left-title">返回</div>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <a-scroll :top="imageHeight" class="list">
      <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
      <div class="scroll-content">
        <div class="bg-image bg-layer" ref="layer"></div>
        <div class="song-wrapper">
          <song-list :songs="songs" @select="selectItem"></song-list>
        </div>
      </div>
    </a-scroll>
  </div>
</template>
<script>
import aScroll from 'components/common/AScroll';
import songList from 'components/common/SongList';
export default {
  data () {
    return {
      imageHeight: '0px'
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
    }
  },
  methods: {
    selectItem () {},
    back () {
      this.$router.back()
    }
  },
  mounted () {
    // this.imageHeight = `${this.$refs.back.clientHeight}px`
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
    .title {
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }
    &.white {
    }
    &.dark {
      display: none;
      text-align: center;
      background: $color-highlight-background;
    }
    .left-botton {
      position: absolute;
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
  }
  .dark {
    .left-title {
      color: $color-text-d;
    }
    .back-arrow {
      border-top: 1px solid $color-text-d;
      border-left: 1px solid $color-text-d;
    }
  }
  .white {
    .back-arrow {
    }
  }
  .list {
    overflow: visible;
    .bg-image {
      width: 100%;
      padding-top: 70%;
      height: 0
      background-size: cover;
      position: absolute;
    }
    .bg-layer {
      position: relative
    }
    .song-wrapper {
      padding: 20px 30px;
    }
    .scroll-content {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
