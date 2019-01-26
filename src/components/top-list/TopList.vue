<template>
  <transition name="slide">
    <div class="top-list">
      <music-list :title="title" :bg-image="bgImage" :songs="songList" :listen-pull="listenPull">
        <div class="banner">
          <div class="album-card flexbox">
            <img class="album-img" width="100%" :src="bgImage">
            <div class="album-bd">
              <h1 class="album-name" >巅峰榜·流行指数</h1>
              <p class="album-desc">第26天</p>
              <p class="album-desc">{{updateTime}}更新</p>
            </div>
          </div>
        </div>
      </music-list>
    </div>
  </transition>
</template>

<script>
import musicList from 'components/music-list/MusicList';
import { getMusicList } from 'service/rank';
import { mapGetters } from 'vuex';
import { normalizeSongsMixin } from '@/utils/mixin';
export default {
  data () {
    return {
      songList: [],
      listenPull: false,
      topinfo: {},
      updateTime: ''
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
    ...mapGetters(['getTopList']),
    title () {
      return this.topinfo.ListName;
    },
    bgImage () {
      return this.topinfo.pic_album;
    }
  },
  methods: {
    getMusicList () {
      let id = this.getTopList.id || (this.id);
      if (!id) {
        this.$router.push('/rank');
      }
      getMusicList(id).then((data) => {
        this.topinfo = data.topinfo;
        this.updateTime = data.update_time
        var temp = data.songlist.map((item) => {
          return item.data;
        })
        this.normalizeSongs(temp);
      }).catch(() => {})
    }
  },
  created () {
    this.getMusicList()
  }
}
</script>
<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
  .top-list {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $background-color-theme;
    .music-list {
      .bg-image {
        filter: blur(36px);
      }
    }
    .banner {
      background-color: rgba(0,0,0,.5);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
    .album-card {
      position-center(relative)
      align-items: center;
      padding: 0 20px;
      color: $color-text-light;
    }
    .album-img {
      width: 125px;
      margin-right: 15px;
    }
    .album-name {
      line-clamp(1.3,2,$font-size-large)
    }
    .album-desc {
      margin-top: 10px;
      line-clamp(1.3,2,$font-size-small)
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
