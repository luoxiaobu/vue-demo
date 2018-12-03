<template>
  <div>
    singer
  </div>
</template>

<script>
import { getSingerList } from 'service/singer'
export default {
  data () {
    return {
      singerList: []
    }
  },
  methods: {
    getSingerList () {
      getSingerList().then((data) => {
        console.log(data)
        // this.getSingerList = data.slider;
      }).catch(() => {})
    }
  },
  mounted () {
    this.getSingerList();
  }
}
</script>

<style lang="stylus">
</style>
