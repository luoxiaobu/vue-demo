<template>
  <div class="a-player">
    <div class="hidden-player" v-if="showMode === SHOW_MODE.HIDDEN" @click.stop="showPlay(SHOW_MODE.NORMAL)">
      <i class="icon-move" v-if="!playing"></i>
      <i class="icon-move move" v-if="playing"></i>
    </div>
    <div class="normal-player" v-if="showMode === SHOW_MODE.NORMAL">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
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
    ])
  },
  methods: {
    ...mapMutations({
      setShowMode: 'SET_SHOW_MODE'
    }),
    showPlay (mode) {
      this.setShowMode(mode)
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.a-player {
  .normal-player {
    background-color: $background-color-theme;
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
      filter: blur(30px);
      opacity: 0.6;
    }
  }
  .normal-player-top {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    color: $color-text-light;
    .left-button {
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
      color: $color-pink;
      padding-right: 8px;
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
  .hidden-player {
    position: fixed;
    right: 0;
    top: 2px;
    z-index: 10;
    .icon-move {
      display: inline-block;
      vertical-align: middle;
      height: $bar-height;
      width: $bar-height;
      background: url(../../assets/move.png) no-repeat;
      &.move {
        background: url(../../assets/move1.gif) no-repeat;
      }
    }
  }
}

</style>
