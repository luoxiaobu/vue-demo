<template>
  <div class="a-tab flexbox">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../../themes/variable"
  .a-tab {
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    .tab-item {
      flex: 1;
      text-align: center;
    }
    .router-link-active {
      .tab-link {
        color: #fff;
        border-bottom: 2px solid #fff;
      }
    }
    .tab-link {
      color: #fff;
      padding: 5px;
    }
  }
</style>
