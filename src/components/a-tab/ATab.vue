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
    font-size: $font-size-medium;
    .tab-item {
      flex: 1;
      text-align: center;
    }
    .router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
    .tab-link {
      color: $color-text-dark;
      border-bottom: 2px solid transparent;
      padding: 0px 10px;
      display: inline-block;
      line-height: 40px;
    }
  }
</style>
