<template>
  <div class="progress-bar">
    <div class="time-start">
      {{format(reallyTime)}}
    </div>
    <div class="progress-inner" @click="progressClick">
      <div class="wrap-progress" ref="progressBox">
        <div class="progress-play" :style="{width: percent}" ref="progress">
          <div class="progress-btn"
          ref="btn"
          @touchstart.stop="progressTouchStart"
          @touchmove.stop="progressTouchMove"
          @touchend="progressTouchEnd"></div>
        </div>
      </div>
    </div>
    <div class="time-end">
      {{format(totalTime)}}
    </div>
  </div>
</template>

<script>
import { dataLeftCompleting } from '@/utils/tools'
export default {
  props: {
    totalTime: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      contentBox: {},
      touch: {},
      reallyTime: 0
    }
  },
  watch: {
    currentTime (newTime) {
      if (newTime >= 0 && !this.touch.initiated) {
        this.reallyTime = newTime;
      }
    }
  },
  computed: {
    percent () {
      var s = (this.reallyTime / this.totalTime) >= 1 ? 1 : (this.reallyTime / this.totalTime);
      return `${(s * 100) | 0}%`
    }
  },
  methods: {
    format (interval) {
      interval = interval | 0
      const minute = dataLeftCompleting(2, '0', interval / 60 | 0)
      const second = dataLeftCompleting(2, '0', interval % 60)
      return `${minute}:${second}`
    },
    progressTouchStart (event) {
      if (event.cancelable) {
        event.preventDefault();
      }
      const btn = this.$refs.btn.getBoundingClientRect();
      const progress = this.$refs.progress.getBoundingClientRect();
      const btnClickDetalX = event.touches[0].clientX - btn.left;
      this.touch = {
        initiated: true,
        btnStartLeft: btn.left,
        btnClickDetalX,
        progressWidth: progress.width
      }
    },
    progressTouchMove (event) {
      if (!this.touch.initiated) {
        return
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      const deltaX = event.touches[0].clientX - this.touch.btnClickDetalX - this.touch.btnStartLeft; // btn滑动的距离
      let movePercent = (this.touch.progressWidth + deltaX) / this.progressBox.width
      if (movePercent < 0) {
        movePercent = 0;
      } else if (movePercent > 1) {
        movePercent = 1;
      }
      this.reallyTime = movePercent * this.totalTime;
    },
    progressTouchEnd () {
      this.$emit('timeChange', this.reallyTime);
      this.touch.initiated = false;
    },
    progressClick (event) {
      const deltaX = event.pageX - this.progressBox.left;
      let movePercent = deltaX / this.progressBox.width;
      this.reallyTime = movePercent * this.totalTime;
      this.$emit('timeChange', this.reallyTime);
    }
  },
  mounted () {
    this.progressBox = this.$refs.progressBox.getBoundingClientRect();
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
.progress-bar {
  height: 30px;
  display: flex;
  align-items: center;
  .progress-inner {
    height: 20px;
    flex: 1;
    position: relative;
  }
  .wrap-progress {
    position: relative;
    top: 8px;
    height: 4px;
    background: rgba(255,255,255,.1);
  }
  .progress-play {
    height: 4px
    top: 0;
    position: absolute;
    background: $color-pink;
  }
  .progress-btn {
    position: absolute;
    top: -3px;
    right: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%
    background: #fff;
  }
  .time-start, .time-end {
    width: 55px;
    text-align: center;
    font-size: $font-size-medium;
    color: rgba(225, 225, 225, 0.8);
  }
}
</style>
