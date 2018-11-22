<template>
  <div>
    recommend
  </div>
</template>

<script>
import { getRecommend } from 'service/recommend'
export default {
  mounted () {
    getRecommend().then((data) => {
      console.log(data)
    })
  }
}
</script>

<style lang="stylus">
</style>
