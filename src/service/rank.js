import { jsonpRequest } from '@/utils/jsonpRequest'
import { qqyBase } from './config'

// may see Cross-Origin Read Blocking (CORB)
export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  var opts = {
    name: 'topList',
    param: 'jsonpCallback'
  }
  var reallyData = Object.assign({}, qqyBase, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonpRequest(url, reallyData, opts)
}
