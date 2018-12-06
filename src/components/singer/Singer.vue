<template>
  <div class="singer">
    <div class="singer-content">
      <listView :data="singerList"></listView>
    </div>
  </div>
</template>

<script>
import { getSingerList } from 'service/singer'
import Singer from './singerData.js'
import listView from '../common/listView/ListView'

const HOT_SINGER_NUM = 10;
const HOT_NAME = 'hot'
export default {
  data () {
    return {
      singerList: []
    }
  },
  components: {
    listView
  },
  methods: {
    getSingerList () {
      getSingerList().then((data) => {
        this.singerList = this.normalizeSinger(data.list);
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
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
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
.singer {
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .singer-content {
    height: 100%
    overflow-x: scroll;
  }
}
</style>
