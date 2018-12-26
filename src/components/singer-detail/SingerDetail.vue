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
import { getplaysongvkey } from 'service/song';
import musicList from '../music-list/MusicList'
import Singer from '../singer/singerData.js';
import { createSong } from './song';
export default {
  data () {
    return {
      songList: []
    }
  },
  components: {
    musicList
  },
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
        this.normalizeSongs(data.list)
      }).catch(() => {

      })
    },
    normalizeSongs (list) {
      let ret = [];
      let songMids = [];
      var keyinfo = {};
      songMids = list.map((item) => {
        let {
          musicData
        } = item
        return musicData.songmid;
      })
      list.forEach((item) => {
        let {
          musicData
        } = item;
        if (musicData.songid && musicData.albummid) {
          keyinfo[musicData.songmid] = musicData;
          ret.push(createSong(musicData))
        }
      })
      this.songList = ret
      getplaysongvkey(songMids).then((data) => {
        let tempData = data.data;
        let midurlinfo = (tempData && tempData.midurlinfo) || [];
        let doma = (tempData && tempData.sip && tempData.sip[0]) || '';
        let retHaveKey = [];
        midurlinfo.forEach((item) => {
          let musicData = keyinfo[item.songmid];
          if (musicData) {
            musicData.url = doma + item.purl;
            retHaveKey.push(createSong(musicData))
          }
        })
        this.songList = retHaveKey;
      }).catch(() => {})
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
  z-index: 2;
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
