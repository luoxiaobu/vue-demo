<template>
  <div>
    recommend
  </div>
</template>

<script>
import { getRecommend } from 'service/recommend'
export default {
  mounted () {
    getRecommend()
  }
}
</script>

<style lang="stylus">
</style>
