<template>
  <a-scroll ref="result" :top="scrollHeight" :pull-up="pullUp" class="search-result" :bottom-all-loaded="!hasMore" :bottom-method="searchMore">
    <ul class="search-list" v-for="(list, index) in result" :key="index">
      <li class="search-item" v-for="item in list" :key="item.id" @click="selectItem(item)">
        <template v-if="item.type===TYPE_SINGER">
          <img class="icon-mine" :src="getImg(item.singermid)">
          <h2 class="name">{{item.singername}}</h2>
          <p class="desc"><span>单曲：{{item.songnum}}</span><span>专辑：{{item.albumnum}}</span></p>
        </template>
        <template v-else>
          <div class="icon icon-music"></div>
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{item.singer}}</p>
        </template>
      </li>
    </ul>
    <p class="no-more-text" v-show="!this.loading&&!hasMore&&!noData">没有更多数据了~~</p>
    <no-result v-show="noData" :title="query"></no-result>
  </a-scroll>
</template>
<script>
import AScroll from 'components/common/AScroll'
import NoResult from 'components/common/NoResult'
import { searchResult } from 'service/search';
import { getplaysongvkey } from 'service/song';
import { createSong } from 'components/singer-detail/song';
import Singer from 'components/singer/singerData.js';
import { mapMutations, mapActions } from 'vuex';

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    },
    perpage: {
      type: Number,
      default: 20
    },
    scrollHeight: {
      type: String,
      default: ''
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AScroll, NoResult
  },
  data () {
    return {
      result: [],
      page: 0,
      hasMore: true,
      loading: false,
      TYPE_SINGER,
      cancelSearchResult: null
    }
  },
  watch: {
    query () {
      if (this.query) {
        this.initData();
        this.cancelSearchResult && this.cancelSearchResult('cancel before')
        this.searchResult(this.query, this.page + 1, this.showSinger, this.perpage);
      }
    }
  },
  computed: {
    noData () {
      return (this.result.length === 1) && (this.result[0].length === 0)
    }
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ]),
    initData () {
      this.result = [];
      this.page = 0;
      this.hasMore = true;
      this.loading = false;
    },
    getImg (singermid) {
      return `https://y.gtimg.cn/music/photo_new/T001R68x68M000${singermid}.jpg?max_age=2592000`
    },
    dealResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list.map((item) => {
          return createSong(item)
        }))
      }
      return ret
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        if (item.url) {
          this.insertSong(item);
          return;
        }
        getplaysongvkey([item.mid]).then((data) => {
          let tempData = data.data;
          let midurlinfo = (tempData && tempData.midurlinfo && tempData.midurlinfo[0]) || {};
          let doma = (tempData && tempData.sip && tempData.sip[0]) || '';
          item.url = midurlinfo.purl ? doma + midurlinfo.purl : '';
          this.insertSong(item)
        }).catch(() => {})
      }
    },
    checkMore (data) {
      const song = data.song
      if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    searchResult (query, page, showSinger, perpage) {
      if (this.loading) {
        return
      }
      this.loading = true;
      let search = searchResult(query, page, showSinger, perpage)
      this.cancelSearchResult = search.cancel;
      search.then((data) => {
        this.page++
        this.result.splice(this.page, 0, this.dealResult(data));
        this.checkMore(data);
        this.$refs.result.onBottomLoaded && this.$refs.result.onBottomLoaded();
        this.loading = false;
      }).catch(() => {
        // error still not processe
        this.$refs.result.onBottomLoaded();
        this.loading = false;
      })
    },
    searchMore () {
      if (!this.hasMore || this.loading) {
        return
      }
      this.searchResult(this.query, this.page + 1, this.showSinger, this.perpage);
    }
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
  .search-result {
    .search-item {
      position: relative;
      height: 55px;
      padding-left: 56px;
      overflow: hidden;
      line-height: 18px;
      /*!
       * interesting 1px border css
       */
      &:after {
        content: "";
        position: absolute;
        height: 1px;
        bottom: 0;
        width: 100%;
        background-color: #eee;
      }
    }
    .icon {
      position: absolute;
      top: 18px;
      left: 18px;
      color: $color-pink;
      font-size: $font-size-large-x;
    }
    .icon-mine {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .name {
      no-wrap()
      margin: 10px 0 2px;
      font-size: $font-size-medium-x;
      font-weight: normal;
      color: $color-text-dark;
    }
    .desc {
      no-wrap()
      color: #808080;
      font-size: $font-size-small;
    }
    .no-more-text {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-pink;
    }
  }
</style>
