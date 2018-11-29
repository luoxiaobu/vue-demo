<template>
  <div>
    <a-slider v-if="recommendList.length" :pages="recommendList"></a-slider>
  </div>
</template>

<script>
import { getRecommend } from 'service/recommend'
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
  mounted () {
    getRecommend().then((data) => {
      this.recommendList = data.slider;
    }).catch(() => {
    })
  }
}
</script>

<style lang="stylus">
</style>
