import { jsonpRequest } from '@/utils/jsonpRequest'
import { qqyBase } from './config'

// may see Cross-Origin Read Blocking (CORB)
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  var opts = {
    name: 'hotKey',
    param: 'jsonpCallback'
  }
  var reallyData = Object.assign({}, qqyBase, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonpRequest(url, reallyData, opts)
}
