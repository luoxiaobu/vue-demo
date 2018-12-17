<template>
  <div class="a-player">
    <div class="hidden-player" v-if="showMode === SHOW_MODE.HIDDEN">hidden-player</div>
    <div class="normal-player" v-if="showMode === SHOW_MODE.NORMAL">normal-player</div>
    <div class="mini-player" v-if="showMode === SHOW_MODE.MINI">mini-player</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { SHOW_MODE } from '@/data/consts';

export default {
  data () {
    return {
      SHOW_MODE
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'showMode',
      'playing'
    ])
  }
}
</script>

<style lang="stylus">
.a-player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
}

</style>
