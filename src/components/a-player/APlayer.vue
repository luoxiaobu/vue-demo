<template>
  <div class="a-player">
    <div class="hidden-player" v-if="showMode === SHOW_MODE.HIDDEN" @click.stop="showPlay(SHOW_MODE.NORMAL)">
      <i class="icon-move" v-if="!playing"></i>
      <i class="icon-move move" v-if="playing"></i>
    </div>
    <div class="normal-player" v-if="showMode === SHOW_MODE.NORMAL">
      <div class="background">
        <img width="100%" height="100%" v-lazy="currentSong.image">
      </div>
      <div class="normal-player-top">
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
      <div class="normal-player-middle">
        <div class="play-card">
          <div class="song-rollwrap">
            <img :class="[playStatus,'singer-card']" width="100%" height="100%" v-lazy="currentSong.image">
          </div>
          <div class="play-button" @click.stop="stopPlay()">
            <div class="play-icon" v-show="playing"></div>
          </div>
        </div>
      </div>
      <div class="normal-player-bottom"></div>
    </div>
    <div class="mini-player" v-if="showMode === SHOW_MODE.MINI" @click.stop="showPlay(SHOW_MODE.NORMAL)">mini-player</div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { SHOW_MODE } from '@/data/consts';

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
      'currentSong'
    ]),
    playStatus () {
      return this.playing ? 'play' : 'play pause';
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
    stopPlay () {
      this.seyPlaying(!this.playing);
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.a-player {
  .normal-player {
    background-color: #6d6d6d;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
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
  }
  .normal-player-top {
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
  .normal-player-middle {
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
      .play-icon {
        width: 100%;
        height: 100%;
        background: url("../../assets/play.png");
        background-size: cover;
      }
    }
  }
  .normal-player-bottom {

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
    position: absolute
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
  }
  @keyframes circling {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
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
