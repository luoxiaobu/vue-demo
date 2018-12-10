import { jsonpRequest } from '../utils/jsonpRequest'
import { qqyBase } from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  var opts = {
    name: 'GetListJsonCallback',
    param: 'jsonpCallback'
  }
  const data = Object.assign({}, qqyBase, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  })

  return jsonpRequest(url, data, opts)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, qqyBase, {
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
    singermid: singerId
  })
  var opts = {
    name: 'MusicJsonCallbacksinger_track',
    param: 'jsonpCallback'
  }
  return jsonpRequest(url, data, opts)
}
