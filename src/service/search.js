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

export function search (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  var opts = {
    name: 'search',
    param: 'jsonpCallback'
  }
  const reallyData = Object.assign({}, qqyBase, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: zhida ? 1 : 0,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: +new Date()
  })

  return jsonpRequest(url, reallyData, opts)
}
