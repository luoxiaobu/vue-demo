<template>
  <div>
    singer
  </div>
</template>

<script>
import { getSingerList } from 'service/singer'

const HOT_SINGER_NUM = 10;
const HOT_NAME = 'hot'
export default {
  data () {
    return {
      singerList: []
    }
  },
  methods: {
    getSingerList () {
      getSingerList().then((data) => {
        this.singerList = this.normalizeSinger(data.list);
        console.log(this.singerList)
      }).catch(() => {})
    },
    normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_NUM) {
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M00000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M00000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  mounted () {
    this.getSingerList();
  }
}
</script>

<style lang="stylus">
</style>
