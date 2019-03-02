<template>
  <div class="no-result">
    <h6>无匹配</h6>
    <p class="no-result-text">很抱歉，没有找到与“{{title}}”相关的结果。</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../themes/variable"
.no-result {
  position: relative;
  padding: 210px 0 0;
  text-align: center;
  h6 {
    font-size: 18px;
    color: $color-text-gr;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-small;
    color: $color-text-d;
  }
}
</style>
