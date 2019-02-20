<template>
  <a-scroll ref="result" :top="scrollHeight" :pull-up="pullUp" class="search-result" :bottom-all-loaded="!hasMore" :bottom-method="searchMore">
    <ul class="search-list" v-for="(list, index) in result" :key="index">
      <li class="search-item" v-for="item in list" :key="item.id">
        <div class="icon icon-music"></div>
        <h2 class="name">{{item.name}}</h2>
        <p class="desc">{{item.singer}}</p>
      </li>
    </ul>
  </a-scroll>
</template>
<script>
import AScroll from 'components/common/AScroll'
import { searchResult } from 'service/search';
import { createSong } from 'components/singer-detail/song';

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
    AScroll
  },
  data () {
    return {
      result: [],
      page: 1,
      hasMore: true,
      loading: false
    }
  },
  watch: {
    query () {
      if (this.query) {
        this.initData();
        this.searchResult(this.query, this.page, this.showSinger, this.perpage);
      }
    }
  },
  methods: {
    initData () {
      this.result = [];
      this.page = 1;
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
      searchResult(query, page, showSinger, perpage).then((data) => {
        this.result.splice(this.page, 0, this.dealResult(data));
        this.checkMore(data);
        this.$refs.result.onBottomLoaded();
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
      this.page++
      this.searchResult(this.query, this.page, this.showSinger, this.perpage);
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
  }
</style>
