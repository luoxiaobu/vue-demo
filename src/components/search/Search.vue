<template>
  <div class="search">
    <search-box ref="searchBox" v-model="query"
    @submit="submit"
    @cancelSearch="cancelSearch"
    @searchFocus="searchFocus"></search-box>
    <div class="hot-key" v-show="showHot">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
          <span>{{item.k}}</span>
        </li>
      </ul>
    </div>
    <div v-show="showHistory">
      <search-record :searches="getRecord" @delete="deleteSearchHistory" @select="addQuery"></search-record>
      <p class="record-handle" @click.stop="clearSearchHistory">
        <a href="javascript:;">清除搜索记录</a>
      </p>
    </div>
    <search-result v-show="query && searchKey" :pull-up="pullUp" :scroll-height="scrollHeight" :query="searchKey"></search-result>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'components/common/SearchBox';
import SearchRecord from 'components/common/SearchRecord';
import SearchResult from 'components/search-result/SearchResult';
import { getHotKey } from 'service/search';
import { HEAD_HEIGHT } from '@/data/consts.js'
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    SearchBox, SearchResult, SearchRecord
  },
  data () {
    return {
      hotKey: [],
      showHot: true,
      query: '',
      scrollHeight: '0px',
      pullUp: true,
      historyFlag: false,
      searchKey: ''
    }
  },
  computed: {
    ...mapGetters([
      'getRecord'
    ]),
    showHistory () {
      return this.getRecord.length && this.historyFlag
    }
  },
  methods: {
    ...mapActions([
      'saveRecord',
      'deleteRecord',
      'clearRecord'
    ]),
    saveSearch () {
      this.saveRecord(this.query)
    },
    deleteSearchHistory (item) {
      this.deleteRecord(item)
    },
    clearSearchHistory () {
      this.clearRecord()
    },
    getHotKey () {
      getHotKey().then((data) => {
        this.hotKey = data.hotkey.slice(0, 10)
      }).catch(() => {})
    },
    cancelSearch (value) {
      this.showHot = true;
      this.historyFlag = false;
    },
    searchFocus (value) {
      this.showHot = false;
      this.historyFlag = true;
    },
    submit () {
      this.searchKey = this.query;
      this.historyFlag = false;
      this.showHot = false;
      this.saveSearch();
    },
    addQuery (query) {
      this.searchKey = query;
      this.query = query;
      this.showHot = false;
      this.historyFlag = false;
      this.saveSearch()
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
  .record-handle {
    text-align: center;
    height: 44px;
    line-height: 44px;
    a  {
      font-size: $font-size-small;
      display: inline-block;
      line-height: 44px;
      color: $color-pink;
    }
  }
}
</style>
