<template>
  <div class="search">
    <search-box ref="searchBox" v-model="query" :show-cancel="!showHot" @cancelSearch="showHotKey"></search-box>
    <div class="hot-key" v-show="showHot">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
          <span>{{item.k}}</span>
        </li>
      </ul>
    </div>
    <search-result v-show="query" :pull-up="pullUp" :scroll-height="scrollHeight" :query="query"></search-result>
  </div>
</template>

<script>
import SearchBox from 'components/common/SearchBox';
import SearchResult from 'components/search-result/SearchResult';
import { getHotKey } from 'service/search';
import { HEAD_HEIGHT } from '@/data/consts.js'
export default {
  components: {
    SearchBox, SearchResult
  },
  data () {
    return {
      hotKey: [],
      showHot: true,
      query: '',
      scrollHeight: '0px',
      pullUp: true
    }
  },
  methods: {
    getHotKey () {
      getHotKey().then((data) => {
        this.hotKey = data.hotkey.slice(0, 10)
      }).catch(() => {})
    },
    showHotKey (value) {
      this.showHot = value;
    },
    addQuery (query) {
      this.query = query
      this.showHotKey(false);
    },
    initView () {
      this.scrollHeight = `${this.$refs.searchBox.$el.clientHeight + HEAD_HEIGHT}px`
    }
  },
  created () {
    this.getHotKey()
  },
  mounted () {
    this.initView()
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
.search {
  .hot-key {
    padding: 15px 15px 10px;
    .title {
      font-size: $font-size-medium;
      color: $color-text-d;
      margin-bottom: 8px;
    }
    .item {
      display: inline-block
      padding: 5px 10px
      margin: 0 20px 10px 0
      border-radius: 20px;
      font-size: $font-size-medium;
      color: $color-text-d;
      border: 1px solid $color-text-d;
    }
    .color-pick {
      border: 1px solid $color-pink;
    }
  }
}
</style>
