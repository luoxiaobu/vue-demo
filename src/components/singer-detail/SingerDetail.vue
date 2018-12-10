<template>
  <transition name="slide">
    <div class="singer-detail">
      singerdetail
    </div>
  </transition>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
import { getSingerDetail } from 'service/singer'
export default {
  computed: {
    ...mapGetters(['getSinger'])
  },
  methods: {
    getSingerDetail () {
      let { id } = this.getSinger
      if (!id) {
        this.$router.push('/singer');
      }
      getSingerDetail(id).then((data) => {
        console.log(data);
      }).catch(() => {

      })
    }
  },
  created () {
    this.getSingerDetail();
  }
}
</script>
<style scoped lang="stylus">
@import "../../themes/variable"
.singer-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $background-color-theme;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
