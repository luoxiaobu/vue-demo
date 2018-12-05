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
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonpRequest(url, data, opts)
}
