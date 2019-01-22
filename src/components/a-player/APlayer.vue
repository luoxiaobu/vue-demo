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
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="normal-top">
          <div class="normal-top-content">
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
        </div>
        <div class="normal-middle" @click="change">
          <div class="normal-middle-card" v-show="showCard">
            <div class="play-card" ref="cdWrapper">
              <div class="song-rollwrap" @click.stop="togglePlaying">
                <div :class="[playStatus,'singer-card']">
                  <img class="image" width="100%" height="100%" :src="currentSong.image">
                </div>
              </div>
              <div class="play-button" @click.stop="togglePlaying">
                <i class="icon-play-mini" v-show="!playing"></i>
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="song-singer">
                <span class="song" v-html="currentSong.name"></span> - <span class="singer" v-html="currentSong.singer"></span>
              </div>
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <a-scroll v-show="!showCard" top="0" class="normal-middle-lyric" ref="lyricList" @scroll="scroll" :listen-scroll="listenScroll">
            <div class="lyric-wrapper" v-if="currentLyric" @touchstart.stop="lyricTouchStart" @touchmove.stop="lyricTouchMove" @touchend="lyricTouchEnd">
              <p ref="oneLyric" :class="['text',{'current': currentLineNum ===index}]" :key="index"
                v-for="(line,index) in currentLyric.lines">{{line.showTime + line.txt}}</p>
                <div class="show-time-line" :style="showTimeStyle">{{showTime}}</div>
            </div>
            <div v-else class="no-Lyric">
              {{playingLyric}}
            </div>
          </a-scroll>
        </div>
        <div class="normal-bottom">
          <progress-bar :total-time="currentSong.duration" :current-time="currentTime" @timeChange="onTimeChange"></progress-bar>
          <div class="operators">
            <div class="icon" @click.stop="changeMode">
              <i :class="iconMode[playMode]"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i @click="prevSong" class="icon-prev"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i @click="togglePlaying" :class="[playIcon, 'i-center']"></i>
            </div>
            <div class="icon" :class="disableCls">
              <i @click="nextSong" class="icon-next"></i>
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
        <div class="mini-player-content">
          <div class="icon">
            <div :class="[playStatus,'singer-card']">
              <img class="image" width="40" height="40" :src="currentSong.image">
            </div>
          </div>
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control">
            <progress-circle :radius="radius" :percent="percent">
              <i @click.stop="togglePlaying" :class="miniIcon"></i>
            </progress-circle>
          </div>
          <div class="control">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="timeUpdate" @ended="ended"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { SHOW_MODE, PLAY_MODE, iconMode } from '@/data/consts';
import { prefixStyle, shuffle } from '@/utils/tools.js';
import { getTranslate, transitionEndEvent } from '@/utils/animation';
import progressBar from 'components/common/ProgressBar';
import progressCircle from 'components/common/ProgressCircle';
import aScroll from 'components/common/AScroll';
import Lyric from 'components/a-player/lyric'
const transform = prefixStyle('transform');
const transition = prefixStyle('transition');
const TITLE_HEIGHT = 30;
const SHOW_LINE = 5;
const BASE = 6 * TITLE_HEIGHT

export default {
  data () {
    return {
      SHOW_MODE,
      songReady: false,
      currentTime: 0,
      radius: 30,
      iconMode,
      currentLyric: null,
      showCard: true,
      listenScroll: true,
      listHeight: [],
      showTimeLine: 1,
      scrollY: 0,
      touch: {}
    }
  },
  components: {
    progressBar, progressCircle, aScroll
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'showMode',
      'playing',
      'currentSong',
      'playlist',
      'playMode',
      'sequenceList'
    ]),
    playStatus () {
      return this.playing ? 'play' : 'play pause';
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    playingLyric () {
      return this.currentLyric ? this.currentLyric.currentTxt : '歌词加载中...'
    },
    nextLyricTime () {
      return this.currentLyric ? this.currentLyric.nextTime : 0
    },
    currentLineNum () {
      return this.currentLyric ? this.currentLyric.currentIndex : 0
    },
    showTimeStyle () {
      return {
        top: `${BASE}px`,
        height: `${0.5 * TITLE_HEIGHT}px`
      }
    },
    showTime () {
      if (this.currentLyric) {
        return this.currentLyric.lines[this.showTimeLine].showTime
      } else {
        return 0;
      }
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      this.currentLyric = null;
      this.listHeight = [];
      this.getLyric();
    }
  },
  methods: {
    ...mapMutations({
      setShowMode: 'SET_SHOW_MODE',
      seyPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'randomPlay'
    ]),
    scroll (pos) {
      this.scrollY = pos.y
    },
    lyricTouchStart (event) {
      this.touch = {
        initiated: true
      }
    },
    lyricTouchMove () {
      if (!this.touch.initiated) {
        return
      }
      if (this.scrollY >= this.listHeight[this.showTimeLine] || this.scrollY <= this.listHeight[this.showTimeLine - 1]) {
        this.showTimeLine = this.listHeight.findIndex((item) => {
          return this.scrollY + BASE < item
        })
      }
    },
    lyricTouchEnd () {
      this.touch.initiated = false;
    },
    change () {
      this.showCard = !this.showCard;
      if (!this.showCard) {
        this.$nextTick(() => {
          this.handleLyric(this.currentLineNum);
          this.calculateHeight();
        })
      }
    },
    calculateHeight () {
      if (this.showCard) {
        return;
      }
      if (this.listHeight.length > 0 || !this.currentLyric) {
        return;
      }
      const list = this.$refs.oneLyric;
      let height = 0;
      for (let i = 0; i < list.length - 1; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    getLyric () {
      this.currentSong.getLyric().then((lyric) => {
        if (this.currentSong.lyric !== lyric) {
          return
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        this.$nextTick(() => {
          this.calculateHeight()
        })
      }).catch(() => {
        this.currentLyric = null;
        this.listHeight = [];
      })
    },
    handleLyric (index) {
      if (this.showCard) {
        return;
      }
      if (index > SHOW_LINE && !this.touch.initiated) {
        var scrollLyricHeight = (index - SHOW_LINE) * TITLE_HEIGHT;
        this.$refs.lyricList && this.$refs.lyricList.scrollTo(scrollLyricHeight);
      }
    },
    random () {
      this.randomPlay(this.sequenceList)
    },
    changeMode () {
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === PLAY_MODE.RANDOM) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index);
    },
    prev (length, isActive) {
      var songTo = isActive - 1;
      songTo = songTo < 0 ? length - 1 : songTo;
      return songTo;
    },
    next (length, isActive) {
      var songTo = isActive + 1;
      songTo = songTo >= length ? 0 : songTo;
      return songTo;
    },
    ended () {
      if (this.playMode === PLAY_MODE.LOOP) {
        this.loop();
      } else {
        this.nextSong();
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.currentLyric && this.currentLyric.play(0)
    },
    showPlay (mode) {
      this.setShowMode(mode)
    },
    ready () {
      this.songReady = true;
      const audio = this.$refs.audio;
      this.playing ? audio.play() : audio.pause();
    },
    error () {
      this.songReady = true
    },
    timeUpdate (e) {
      this.currentTime = e.target.currentTime;
      var tempTime = this.currentTime * 1000
      if ((tempTime >= this.nextLyricTime) && this.currentLyric) {
        this.currentLyric.play(tempTime)
      }
    },
    onTimeChange (currentTime) {
      this.$refs.audio.currentTime = currentTime;
      this.currentLyric && this.currentLyric.play(currentTime * 1000)
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      const audio = this.$refs.audio;
      this.seyPlaying(!this.playing);
      this.playing ? audio.play() : audio.pause();
    },
    prevSong () {
      if (!this.songReady) {
        return
      }
      var index = this.prev(this.playlist.length, this.currentIndex);
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      var index = this.next(this.playlist.length, this.currentIndex);
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    lyricTransition (atrr, value, done) {
      var el = this.$refs.lyricList && this.$refs.lyricList.$el;
      if (!el) {
        done && done()
        return
      }
      done && el.addEventListener(transitionEndEvent, done);
      el.style[atrr] = value
    },
    beforeEnter (el) {
      if (!this.showCard) {
        this.lyricTransition('opacity', 0)
        return
      }
      const {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${x}px`, `${y}px`, 0)} scale(${scale})`
    },
    enter (el, done) {
      if (!this.showCard) {
        this.lyricTransition('transition', 'all 0.4s')
        this.lyricTransition('opacity', 1, done)
        return
      }
      this.$refs.cdWrapper.style[transition] = 'all 0.4s';
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${0}px`, `${0}px`, 0)} scale(1)`
      this.$refs.cdWrapper.addEventListener(transitionEndEvent, done)
    },
    afterEnter () {
      if (!this.showCard) {
        this.lyricTransition('transition', '')
        return
      }
      this.$refs.cdWrapper.style[transition] = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    leave (el, done) {
      if (!this.showCard) {
        this.lyricTransition('transition', 'all 0.4s')
        this.lyricTransition('opacity', 0, done)
        return
      }
      this.$refs.cdWrapper.style[transition] = 'all 0.4s';
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `${getTranslate(`${x}px`, `${y}px`, 0)} scale(${scale})`
      this.$refs.cdWrapper.addEventListener(transitionEndEvent, done)
    },
    afterLeave () {
      if (!this.showCard) {
        this.lyricTransition('transition', '')
        return
      }
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
    filter: blur(20px);
    opacity: 0.6;
  }
  .singer-card {
    height: 100%;
    &.play {
      animation: circling 20s infinite linear;
    }
    &.pause {
      animation-play-state: paused
    }
  }
  .image {
    border-radius: 50%;
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
    position: absolute;
    width: 100%;
    top: 0;
    .normal-top-content {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      color: $color-text-light;
    }
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
    .lyric-wrapper , .playing-lyric-wrapper {
      padding: 0 35px;
      text-align: center;
    }
    .playing-lyric-wrapper {
      margin-top: 25px;
      font-size: $font-size-small;
      color: $color-text-gr;
      .playing-lyric {
        padding-top: 5px;
        line-height: 20px;
        font-size: $font-size-medium;
        color: $color-text-light;
      }
    }
    .lyric-wrapper {
      .text {
        line-height: 30px;
        color: rgba(225,225,225,.6);
        font-size: $font-size-medium
        &.current {
          color: $color-text-light;
        }
      }
    }
    .no-Lyric {
      text-align: center;
      color: $color-text-light;
      font-size: $font-size-medium;
      position-center(relative)
    }
    .show-time-line {
      position: absolute;
      width: 100%;
      opacity: 0.8;
      border-bottom: 2px solid $color-pink;
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
        color: $color-text-gr
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
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background: #fff;
    .mini-player-content {
      height: 60px;
      display: flex;
      align-items: center;
    }
    .background {
      opacity: 0.8;
    }
    .icon {
      width: 80px
      padding: 0 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      color: $color-text-dark;
    }
    .name {
      margin-bottom: 2px
      no-wrap()
      font-size: $font-size-medium
    }
    .desc {
      no-wrap()
      font-size: $font-size-small
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
    .normal-middle {
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
