<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in displaySongs" :key ="song.id">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song.displaySong}}</p>
        </div>
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
      this.$emit('select', item, index)
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
  }
}
</style>
