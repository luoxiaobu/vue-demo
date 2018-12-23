<template>
  <div class="a-player" v-show="playlist.length>0">
    <div class="hidden-player" v-if="showMode === SHOW_MODE.HIDDEN" @click.stop="showPlay(SHOW_MODE.NORMAL)">
      <i class="icon-move" v-if="!playing"></i>
      <i class="icon-move move" v-if="playing"></i>
    </div>
    <transition name="normal"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave">
      <div class="normal-player" v-if="showMode === SHOW_MODE.NORMAL">
        <div class="background">
          <img width="100%" height="100%" v-lazy="currentSong.image">
        </div>
        <div class="normal-top">
          <div class="left-button" @click.stop="showPlay(SHOW_MODE.HIDDEN)">
            <div class="back-arrow"></div>
            <div class="left-title">返回</div>
          </div>
          <div class="normal-player-title">
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle" v-html="currentSong.singer"></h2>
          </div>
          <div class="right-button" @click.stop="showPlay(SHOW_MODE.MINI)">mini</div>
        </div>
        <div class="normal-middle">
          <div class="play-card" ref="cdWrapper">
            <div class="song-rollwrap">
              <img :class="[playStatus,'singer-card']" width="100%" height="100%" v-lazy="currentSong.image">
            </div>
            <div class="play-button" @click.stop="togglePlaying()">
              <i class="icon-play-mini" v-show="!playing"></i>
            </div>
          </div>
        </div>
        <div class="normal-bottom">
          <div class="operators">
            <div class="icon">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i class="icon-prev"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i @click="togglePlaying" :class="[playIcon, 'i-center']"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i class="icon-next"></i>
            </div>
            <div class="icon">
              <i class="icon-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-if="showMode === SHOW_MODE.MINI" @click.stop="showPlay(SHOW_MODE.NORMAL)">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { SHOW_MODE } from '@/data/consts';
import { prefixStyle } from '@/utils/tools.js';
import { getTranslate, transitionEndEvent } from '@/utils/animation';
const transform = prefixStyle('transform')
const transition = prefixStyle('transition')
export default {
  data () {
    return {
      SHOW_MODE
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'showMode',
      'playing',
      'currentSong',
      'playlist'
    ]),
    playStatus () {
      return this.playing ? 'play' : 'play pause';
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    }
  },
  methods: {
    ...mapMutations({
      setShowMode: 'SET_SHOW_MODE',
      seyPlaying: 'SET_PLAYING'
    }),
    showPlay (mode) {
      this.setShowMode(mode)
    },
    togglePlaying () {
      this.seyPlaying(!this.playing);
    },
    beforeEnter: function (el) {
      const {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${x}px`, `${y}px`, 0)} scale(${scale})`
    },
    enter (el, done) {
      this.$refs.cdWrapper.style[transition] = 'all 0.4s';
      // 强制动画刷新？
      this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${0}px`, `${0}px`, 0)} scale(1)`
      this.$refs.cdWrapper.addEventListener(transitionEndEvent, done)
    },
    afterEnter () {
      this.$refs.cdWrapper.style[transition] = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    leave (el, done) {
      this.$refs.cdWrapper.style[transition] = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${x}px`, `${y}px`, 0)} scale(${scale})`
      this.$refs.cdWrapper.addEventListener(transitionEndEvent, done)
    },
    afterLeave () {
      this.$refs.cdWrapper && (this.$refs.cdWrapper.style[transition] = '')
      this.$refs.cdWrapper && (this.$refs.cdWrapper.style[transform] = '')
    },
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.a-player {
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(20px);
    opacity: 0.6;
  }
  .normal-player {
    background-color: #6d6d6d;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  .normal-top {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    color: $color-text-light;
    .left-button {
      width: 60px;
      .left-title {
        font-size: $font-size-medium;
        display: inline-block;
        vertical-align: middle;
      }
      .back-arrow {
        normal-arrow($color-text-light,-45deg);
      }
    }
    .right-button {
      width: 60px;
      color: $color-pink;
      padding-right: 8px;
      text-align: center;
    }
    .normal-player-title {
      height: $bar-height;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      width: 60%
      margin: 0 auto
      .title {
        no-wrap()
        font-size: $font-size-medium-x
      }
      .subtitle {
        no-wrap()
        font-size: $font-size-small
      }
    }
  }
  .normal-middle {
    position: absolute;
    width: 100%;
    top: 80px;
    bottom: 160px;
    .play-card {
      position: relative;
      margin: 0 auto;
      background-color: rgba(30,30,30,0.2);
      border-radius: 100%;
      width: 248px;
      height: 248px;
    }
    .song-rollwrap {
      position-center(relative);
      width: 150px;
      height: 150px;
    }
    .singer-card {
      border-radius: 100%;
      &.play {
        animation: circling 20s infinite linear;
      }
      &.pause {
        animation-play-state: paused
      }
    }
    .play-button {
      position-center(absolute);
      height: 40px;
      width: 40px;
      z-index: 1;
      color: $color-pink;
      .icon-play-mini {
        font-size: 40px;
      }
    }
  }
  .normal-bottom {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .operators {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .icon {
      color: $color-pink;
      &.disable {
        color: $color-theme-d
      }
      i {
        font-size: 30px;
      }
      .i-center {
        font-size: 40px;
      }
    }
  }
  .hidden-player {
    position: absolute;
    right: 0;
    top: 7px;
    z-index: 10;
    .icon-move {
      display: inline-block;
      vertical-align: middle;
      height: 30px;
      width: 30px;
      background: url(../../assets/move.png) no-repeat;
      background-size: cover;
      &.move {
        background-image: url(../../assets/move1.gif);
      }
    }
  }
  .mini-player {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background: #fff;
    .background {
      opacity: 0.8;
    }
    .icon {
      width: 80px
      padding: 0 10px 0 20px
    }
    img {
      border-radius: 50%
      &.play {
        animation: circling 20s infinite linear;
      }
      &.pause {
        animation-play-state: paused
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
    }
    .name {
      margin-bottom: 2px
      no-wrap()
      font-size: $font-size-medium
      color: $color-text-dark;
    }
    .desc {
      no-wrap()
      font-size: $font-size-small
      color: $color-text-d;
    }
    .control {
      width: 50px;
      padding: 0 10px;
      i {
        font-size: 30px;
        color: $color-pink;
      }
    }
  }
  @keyframes circling {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .normal-enter-active, .normal-leave-active {
    transition: all 0.4s
    .normal-top, .normal-bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    }
  }
  .normal-enter, .normal-leave-to {
    opacity: 0
    .normal-top {
      transform: translate3d(0, -100px, 0)
    }
    .normal-bottom {
      transform: translate3d(0, 100px, 0)
    }
  }
  .mini-enter-active, .mini-leave-active {
    transition: all 0.4s
  }
  .mini-enter, .mini-leave-to {
    opacity: 0
  }
}

@media screen and (min-width: 360px) {
  .a-player  {
    .normal-player-middle {
      .play-card {
        width: 296px;
        height: 296px;
      }
      .song-rollwrap {
        width: 184px;
        height: 184px;
      }
    }
  }
}
</style>
