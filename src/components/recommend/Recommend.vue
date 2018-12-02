<template>
  <div>
    <a-slider v-if="recommendList.length" :pages="recommendList"></a-slider>
  </div>
</template>

<script>
import { getRecommend, getPlaylist } from 'service/recommend'
import ASlider from 'components/common/a-slider/ASlider'
export default {
  components: {
    ASlider
  },
  data () {
    return {
      recommendList: []
    }
  },
  methods: {
    getRecommend () {
      getRecommend().then((data) => {
        this.recommendList = data.slider;
      }).catch(() => {})
    },
    getPlaylist () {
      getPlaylist().then((data) => {
        console.log(data)
      })
    }
  },
  mounted () {
    this.getRecommend();
    this.getPlaylist();
  }
}
</script>

<style lang="stylus">
</style>
