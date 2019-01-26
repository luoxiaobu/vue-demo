<template>
  <transition name="slide">
    <div class="recommend-detial">
      <music-list :title="title" :bg-image="bgImage" :songs="songList"></music-list>
    </div>
  </transition>
</template>

<script>
import musicList from 'components/music-list/MusicList';
import { mapGetters, mapMutations } from 'vuex';
import { getSongList } from 'service/recommend';
import { normalizeSongsMixin } from '@/utils/mixin';
export default {
  data () {
    return {
      songList: [],
      songData: {}
    }
  },
  components: {
    musicList
  },
  mixins: [normalizeSongsMixin],
  props: {
    dissid: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['getRecommend']),
    title () {
      return this.getRecommend.dissname;
    },
    bgImage () {
      return this.getRecommend.imgurl;
    }
  },
  methods: {
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND'
    }),
    getSongList () {
      let id = this.getRecommend.dissid || (this.dissid);
      if (!id) {
        this.$router.push('/recommend');
      }
      getSongList(id).then((data) => {
        this.songData = data.cdlist[0];
        if (!this.bgImage) {
          this.setRecommend({
            dissname: this.songData.dissname,
            imgurl: this.songData.logo
          })
        }
        this.normalizeSongs(data.cdlist[0].songlist);
      }).catch(() => {})
    }
  },
  created () {
    this.getSongList()
  }
}
</script>
<style scoped lang="stylus">
@import "../../themes/variable"
  .recommend-detial {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $background-color-theme;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
