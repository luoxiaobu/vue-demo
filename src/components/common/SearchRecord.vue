<template>
  <div class="search-record">
    <ul>
      <li class="item">
        <a href="javascript:;" class="record-main">
          <span class="icon iocn-clock"></span>
          <span class="record-text">我曾把完整的镜子打碎</span>
          <span class="icon-close"></span>
        </a>
      </li>
    </ul>
    <p class="record-handle">
      <a href="javascript:;">清除搜索记录</a>
    </p>
  </div>
</template>
<script type="text/javascript">
export default {
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
  .iocn-clock {
    width: 20px;
    height: 20px;
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
  .icon-close {
    width: 20px;
    height: 20px;
  }
  .record-handle {
    text-align: center;
    height: 44px;
    line-height: 44px;
    a  {
      display: inline-block;
      line-height: 44px;
      color: $color-pink;
    }
  }
}
</style>
