<template>
  <div class="search-result">
    <ul class="search-list" v-for="(list,index) in result" :key="index">
      <li class="search-item" v-for="item in list.song" :key="item.id">
        <div class="icon icon-music"></div>
        <h2 class="name">{{item.name}}</h2>
        <p class="desc">{{item.singer}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
// import AScroll from 'components/common/AScroll'
import { searchResult } from 'service/search';
import { createSong } from 'components/singer-detail/song';
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    zhida: {
      type: Boolean,
      default: true
    },
    perpage: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      result: [],
      page: 1
    }
  },
  watch: {
    query () {
      this.initData();
      if (this.query) {
        this.page = 1;
        this.searchResult(this.query, this.page, this.zhida, this.perpage);
      }
    }
  },
  methods: {
    initData () {
      this.result = [];
      this.page = 1;
    },
    searchResult (query, page, zhida, perpage) {
      searchResult(query, page, zhida, perpage).then((data) => {
        console.log(data)
        var list = data.song.list.map((item) => {
          return createSong(item)
        })
        var temp = {
          song: list,
          zhida: data.zhida
        }
        this.result.push(temp);
        console.log(this.result)
      }).catch(() => {})
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
