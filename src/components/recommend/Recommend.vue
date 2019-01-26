<template>
  <div class="recommend">
    <a-scroll>
      <a-slider v-if="recommendList.length" :pages="recommendList"></a-slider>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul class="wrap-item">
          <li v-for="item in discList" class="item" :key="item.dissid" @click="selectItem(item)">
            <div class="card">
              <div class="card-icon">
                <img width="100%" v-lazy="item.imgurl">
                <div class="play-volume">
                  <i class="icon icon-headset"></i>
                  <span class="play-num">{{item.listennum | tenThousand}}</span>
                </div>
              </div>
              <p class="desc">{{item.dissname}}</p>
              <h2 class="name">{{item.creator.name}}</h2>
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
import { toFixedN } from '@/utils/tools'
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
  filters: {
    tenThousand: function (value) {
      return `${toFixedN(value / 10000, 2)}万`;
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
  background-color: $background-color-theme;
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
      padding-left: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .item {
      width: 50%;
      padding-right: 10px;
      align-items: center;
      margin-bottom: 10px;
    }
    .card {
      background-color: #fff;
      .card-icon {
        position: relative;
      }
      .play-volume {
        position: absolute;
        right: 4px;
        top: 0px;
        color: #fff;
      }
      .play-num {
        font-size:$font-size-medium;
      }
      .icon {
        font-weight: bold;
      }
      .name {
        line-height: 20px
        padding-bottom: 8px;
        font-size: $font-size-small-s
        no-wrap()
      }
      .desc {
        line-height: 20px
        color: $color-text-d;
        font-size: $font-size-medium
        no-wrap()
      }
    }
  }
}
</style>
