<template>
  <div class="music-list">
    <div class="back">
      <i></i>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle"></div>
  </div>
</template>
<script>
export default {
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
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
.music-list {
  .back {
    position: relative;
    top: 0;
    text-align: center;
  }
  .bg-image {
    width: 100%;
    padding-top: 70%;
    height: 0
    background-size: cover
  }
}
</style>
