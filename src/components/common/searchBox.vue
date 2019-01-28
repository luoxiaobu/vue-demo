<template>
  <div class="search-box">
    <div class="input-wrap">
      <i class="icon-sousuo"></i>
      <input ref="query" v-model="query" class="box" @focus="focus" :placeholder="placeholder">
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
    value: String,
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    query (val) {
      // this.$emit('input', val);
    },
    value (val) {
      this.query = val;
    }
  },
  data () {
    return {
      query: ''
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
      this.$emit('cancelSearch', false)
    },
    cancelSearch () {
      this.query = '';
      this.$emit('cancelSearch', true)
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
    -webkit-appearance: none;
    font-size: $font-size-medium;
    height: 20px;
    width: 100%;
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
