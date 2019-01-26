import { createSong } from 'components/singer-detail/song';
import { getplaysongvkey } from 'service/song';
export const normalizeSongsMixin = {
  methods: {
    normalizeSongs (list) {
      let ret = [];
      let songMids = [];
      var keyinfo = {};
      songMids = list.map((item) => {
        return item.songmid;
      })
      list.forEach((item) => {
        if (item.songid && item.albummid) {
          keyinfo[item.songmid] = item;
          ret.push(createSong(item))
        }
      })
      this.songList = ret
      getplaysongvkey(songMids).then((data) => {
        let tempData = data.data;
        let midurlinfo = (tempData && tempData.midurlinfo) || [];
        let doma = (tempData && tempData.sip && tempData.sip[0]) || '';
        let retHaveKey = [];
        midurlinfo.forEach((item) => {
          let musicData = keyinfo[item.songmid];
          if (musicData) {
            musicData.url = doma + item.purl;
            retHaveKey.push(createSong(musicData))
          }
        })
        this.songList = retHaveKey;
      }).catch(() => {})
    }
  }
}
