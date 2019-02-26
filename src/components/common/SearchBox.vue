<template>
  <div class="search-box">
    <div class="input-wrap">
      <i class="icon-sousuo"></i>
      <input ref="query" type="search" @keyup.enter="submit" v-model="query" class="box" @focus="focus" :placeholder="placeholder">
      <i @click="clear" v-show="query" class="icon-cuowu"></i>
    </div>
    <div v-show="showCancel" @click.stop="cancelSearch" class="cancel-btn">取消</div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    },
    searchValue: {
      type: String
    }
  },
  watch: {
    searchValue (val) {
      this.query = val;
      this.showCancel = true;
    }
  },
  data () {
    return {
      query: '',
      showCancel: false
    }
  },
  methods: {
    clear () {
      this.query = ''
      this.focus();
    },
    focus () {
      if (this.query) {
        return
      }
      this.showCancel = true
      this.$emit('searchFocus', false, this.query)
    },
    cancelSearch () {
      this.query = '';
      this.showCancel = false;
      this.$emit('cancelSearch', true)
    },
    submit () {
      this.$emit('submit', this.query)
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
    padding: 8px 12px 8px 35px;
    flex: 1;
  }
  .icon-sousuo, .icon-cuowu {
    width: 18px;
    height: 18px;
    color: $color-pink;
    position: absolute;
    top: 9px;
  }
  .icon-sousuo {
    left: 10px;
  }
  .icon-cuowu {
    right: 10px;
  }
  .box {
    line-height: 20px;
    color:$color-text-gr;
    border: none;
    font-size: $font-size-medium;
    height: 20px;
    width: 100%;
    &::placeholder {
      color: $color-text-gr;
    }
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }
  .cancel-btn {
    padding: 0 10px;
    font-size: $font-size-medium;
  }
}
</style>
