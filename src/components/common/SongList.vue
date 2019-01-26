<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in displaySongs" :key ="song.id">
        <div class="list-order">{{index + 1}}</div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song.displaySong}}</p>
        </div>
        <div v-if="song.url" class="play-icon"></div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    displaySongs () {
      return this.songs.map((item) => {
        var s = { ...item }
        s.displaySong = `${item.singer}·${item.album}`;
        return s;
      })
    }
  },
  methods: {
    selectItem (item, index) {
      if (item.url) {
        this.$emit('select', item, index)
      }
    }
  }
}
</script>
<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.song-list {
  .item {
    display: flex;
    align-items: center;
    height: 64px;
    font-size: $font-size-medium;
    .list-order {
      width: 30px;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        no-wrap()
        color: $color-text-dark;
      }
      .desc {
        no-wrap()
        margin-top: 4px;
        color: $color-text-d;
      }
    }
    .play-icon {
      display: inline-block;
      vertical-align: middle;
      height: 28px;
      width: 28px;
      background: url("../../assets/play.png");
      background-size: cover;
    }
  }
}
</style>
