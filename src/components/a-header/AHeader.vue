<template>
  <div class="a-header">
    <div class="icon"></div>
    <div class="text">my Music</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../../themes/variable"
.a-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon, .text {
    display: inline-block;
    vertical-align: top;
  }
  .icon {
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    background-image: url('./logo.png');
    background-size: 30px 32px;
  }
  .text {
    line-height: 44px;
    font-size: $font-size-large;
    color: #fff;
  }
}
</style>
