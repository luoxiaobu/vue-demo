<template>
  <div class="search-result">
    <ul class="search-list">
      <li class="search-item" v-for="item in result">
        <div class="icon"></div>
        <p class="main-title"></p>
        <p class="sub-title"></p>
      </li>
    </ul>
  </div>
</template>
<script>
import AScroll from 'components/common/AScroll'
import { getSingerList } from 'service/singer';
export default {
  data () {
    return {
      result: []
    }
  },
  methods: {
    search () {
      search().then((data) => {
        console.log()
      }).catch((data) => {})
    },
  },
  created () {
    this.search();
  }
}
</script>

<style lang="stylus">
  .search-result {
    .search-item {
      position: relative;
      height: 55px;
      padding-left: 56px;
      overflow: hidden;
    }
  }
</style>