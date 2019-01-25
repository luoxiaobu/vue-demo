<template>
    <a-scroll class="rank">
      <ul class="wrap-item">
        <li v-for="item in topList" class="item flexbox" :key="item.id">
          <div class="icon">
            <img width="90" height="90" v-lazy="item.picUrl">
          </div>
          <div class="text">
            <h3 class="topic_tit">{{item.topTitle}}</h3>
            <div class="name" v-for="(song,index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </div>
          </div>
          <div class="item-arrow">
          </div>
        </li>
      </ul>
    </a-scroll>
</template>

<script>
import { getTopList } from 'service/rank'
import AScroll from 'components/common/AScroll'
export default {
  components: {
    AScroll
  },
  data () {
    return {
      topList: []
    }
  },
  methods: {
    getTopList () {
      getTopList().then((data) => {
        this.topList = data.topList;
      }).catch(() => {})
    }
  },
  created () {
    this.getTopList();
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.rank {
  .wrap-item {
    padding: 0 10px;
  }
  .item {
    align-items: center;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .item-arrow {
    position: relative;
    left: -4px;
    width: 8px;
    height: 8px;
    border-right: 1px solid #cac5c5;
    border-bottom: 1px solid #cac5c5;
    transform: rotate(-45deg);
  }
  .icon {
    padding-right: 20px
  }
  .text {
    flex-direction: column
    justify-content: center
    flex: 1
    line-height: 1.4
    overflow: hidden
    font-size: $font-size-medium
  }
  .item-arrow {
    position: relative;
    left: -4px;
    width: 8px;
    height: 8px;
    border-right: 1px solid #cac5c5;
    border-bottom: 1px solid #cac5c5;
    transform: rotate(-45deg);
  }
  .name {
    no-wrap()
    color: #888;
  }
  .topic_tit {
    color: $color-text-d;
    no-wrap()
  }
}
</style>
