<template>
  <div class="search-record">
    <transition-group name="list" tag="ul">
      <li class="item" :key="item" v-for="item in searches">
        <a href="javascript:;" class="record-main">
          <span class="icon icon-shijian"></span>
          <span class="record-text" @click="selectItem(item)">{{item}}</span>
          <span class="icon-fork" @click.stop="deleteOne(item)"></span>
        </a>
      </li>
    </transition-group>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    searches: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style lang="stylus">
@import "../../themes/variable"
@import "../../themes/mixin"
.search-record {
  .item {
    border-top: 1px solid #ededed;
    padding: 0 15px;
  }
  .record-main {
    display: flex;
    align-items: center;
    position: relative;
    height: 44px;
  }
  .icon-shijian {
    font-size: $font-size-large-m;
    color: $color-pink;
  }
  .record-text {
    margin: 0 20px;
    flex: 1;
    color: #000;
    font-size: 14px;
    height: 44px;
    line-height: 44px;
    no-wrap()
  }
  .icon-fork {
    font-size: $font-size-large-m;
    color: $color-pink;
  }
}
</style>
