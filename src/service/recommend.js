import { jsonpRequest } from '@/utils/jsonpRequest'
import { axiosRequest } from '@/utils/axiosRequest'
import { qqyBase } from './config'

const requestIns = axiosRequest();
// may see Cross-Origin Read Blocking (CORB)
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  var opts = {
    name: 'recommend',
    param: 'jsonpCallback'
  }
  var reallyData = Object.assign({}, qqyBase, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonpRequest(url, reallyData, opts)
}

export function getPlaylist () {
  const url = '/api/getDiscList'
  var reallyData = Object.assign({}, qqyBase, {
    picmid: 1,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return requestIns(url, {
    params: reallyData
  })
}

export function getSongList (disstid) {
  const url = '/api/getSongList'
  var reallyData = Object.assign({}, qqyBase, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    format: 'json',
    platform: 'yqq.json'
  })
  return requestIns(url, {
    params: reallyData
  })
}
