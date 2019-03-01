<template>
  <div class="search-box">
    <div class="input-wrap">
      <i class="icon-sousuo"></i>
      <input ref="query" type="search" @keyup.enter="submit" v-model="query" class="box" @focus="focus" :placeholder="placeholder">
      <i @click="clear" v-show="value" class="icon-cuowu"></i>
    </div>
    <div v-show="showCancel || value" @click.stop="cancelSearch" class="cancel-btn">取消</div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      showCancel: false,
      query: this.value
    }
  },
  watch: {
    value (val) {
      this.query = val;
      this.showCancel = true;
    },
    query (val) {
      this.$emit('input', val);
    }
  },
  methods: {
    clear () {
      this.query = ''
      this.$refs.query.focus()
    },
    focus () {
      if (this.query) {
        return
      }
      this.showCancel = true
      this.$emit('searchFocus', this.query)
    },
    cancelSearch () {
      this.query = '';
      this.showCancel = false;
      this.$emit('cancelSearch', this.query)
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
    padding: 0 12px 0 35px;
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
    line-height: 36px;
    color:$color-text-gr;
    border: none;
    font-size: $font-size-medium;
    height: 36px;
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
    display: block;
  }
}
</style>
