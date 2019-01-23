<template>
  <div class="recommend">
    <a-scroll>
      <a-slider v-if="recommendList.length" :pages="recommendList"></a-slider>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul class="wrap-item">
          <li @click="selectItem(item)" v-for="item in discList" class="item flexbox" :key="item.dissid">
            <div class="icon">
              <img width="70" height="70" v-lazy="item.imgurl">
            </div>
            <div class="text flexbox">
              <h2 class="name">{{item.creator.name}}</h2>
              <p class="desc">{{item.dissname}}</p>
            </div>
            <div class="item-arrow">
            </div>
          </li>
        </ul>
      </div>
    </a-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getPlaylist } from 'service/recommend'
import { mapMutations } from 'vuex'
import ASlider from 'components/common/ASlider'
import AScroll from 'components/common/AScroll'
export default {
  components: {
    ASlider, AScroll
  },
  data () {
    return {
      recommendList: [],
      discList: []
    }
  },
  methods: {
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND'
    }),
    getRecommend () {
      getRecommend().then((data) => {
        this.recommendList = data.slider;
      }).catch(() => {})
    },
    getPlaylist () {
      getPlaylist().then((data) => {
        this.discList = data.list;
      }).catch(() => {})
    },
    selectItem (item) {
      this.setRecommend(item)
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
    }
  },
  created () {
    this.getRecommend();
    this.getPlaylist();
  }
}
</script>

<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.recommend {
  .list-title {
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: $font-size-medium-x;
    height: 20px;
    line-height: 20px;
    border-left: 2px solid $color-theme;
  }
  .recommend-list {
    color: $color-text-dark;
    padding-top: 20px;
    .wrap-item {
      padding: 0 10px;
    }
    .item {
      align-items: center;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .text {
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
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
    .icon {
      width: 80px
      padding-right: 20px
    }
    .name {
      margin-bottom: 10px;
      no-wrap()
    }
    .desc {
      color: $color-text-d;
      no-wrap()
    }
  }
}
</style>
