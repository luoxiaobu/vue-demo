<template>
  <div class="search-box">
    <div class="input-wrap">
      <i class="icon-sousuo"></i>
      <input ref="query" v-model="query" class="box" @focus="focus" :placeholder="placeholder">
      <i @click="clear" v-show="query" class="icon-cuowu"></i>
    </div>
    <div v-show="showCancel" @click="cancelSearch" class="cancel-btn">取消</div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: '',
      showCancel: false
    }
  },
  methods: {
    blur () {
      this.$refs.query.blur()
    },
    clear () {
      this.query = ''
    },
    focus () {
      this.showCancel = true;
    },
    cancelSearch () {
      this.showCancel = false;
      this.query = '';
    }
  },
  mounted () {}
}
</script>

<style scoped lang="stylus">
@import "../../themes/variable"
.search-box {
  display: flex;
  align-items: center;
  padding: 10px
  background: #f4f4f4;
  .input-wrap {
    position: relative;
    border-radius: 3px;
    background: #fff;
    height: 36px;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .icon-sousuo, .icon-cuowu {
    width: 18px;
    height: 18px;
    color: $color-pink;
    margin: 0 9px;
  }
  .box {
    flex: 1;
    height: 20px;
    line-height: 20px;
    color:$color-text-gr;
    border: none;
    -webkit-appearance: none;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-gr;
    }
  }
  .cancel-btn {
    padding: 0 10px;
    font-size: $font-size-medium;
  }
}
</style>
