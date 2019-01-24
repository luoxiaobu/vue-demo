<template>
  <transition name="slide">
    <div class="recommend-detial">
      <music-list :title="title" :bg-image="bgImage" :songs="songList"></music-list>
    </div>
  </transition>
</template>

<script>
import musicList from 'components/music-list/MusicList';
import { mapGetters } from 'vuex';
import { getplaysongvkey } from 'service/song';
import { getSongList } from 'service/recommend';
import { createSong } from 'components/singer-detail/song';
export default {
  data () {
    return {
      songList: []
    }
  },
  components: {
    musicList
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
    getSongList () {
      let id = this.getRecommend.dissid;
      if (!id) {
        this.$router.push('/recommend');
      }
      getSongList(id).then((data) => {
        this.normalizeSongs(data.cdlist[0].songlist);
      }).catch(() => {})
    },
    normalizeSongs (list) {
      let ret = [];
      let songMids = [];
      var keyinfo = {};
      songMids = list.map((item) => {
        return item.songmid;
      })
      list.forEach((item) => {
        if (item.songid && item.albummid) {
          keyinfo[item.songmid] = item;
          ret.push(createSong(item))
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
