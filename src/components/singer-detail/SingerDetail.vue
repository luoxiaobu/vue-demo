<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :title="title" :bg-image="bgImage" :songs="songList"></music-list>
    </div>
  </transition>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex';
import { getSingerDetail } from 'service/singer';
import musicList from '../music-list/MusicList'
import Singer from '../singer/singerData.js';
import { normalizeSongsMixin } from '@/utils/mixin';
export default {
  data () {
    return {
      songList: []
    }
  },
  components: {
    musicList
  },
  mixins: [normalizeSongsMixin],
  props: {
    id: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['getSinger']),
    title () {
      return this.getSinger.name;
    },
    bgImage () {
      return this.getSinger.avatar;
    }
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    getSingerDetail () {
      let id = this.getSinger.id || (this.id)
      if (!id) {
        this.$router.push('/singer');
      }
      getSingerDetail(id).then((data) => {
        this.setSinger(new Singer({
          name: data.singer_name,
          id: data.singer_mid
        }))
        var temp = data.list.map((item) => {
          return item.musicData;
        })
        this.normalizeSongs(temp)
      }).catch(() => {

      })
    }
  },
  created () {
    this.getSingerDetail();
  }
}
</script>
<style scoped lang="stylus">
@import "../../themes/variable"
.singer-detail {
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
