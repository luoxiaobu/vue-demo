
import { jsonpRequest } from '../utils/jsonpRequest'
import { qqyBase } from './config'

// may see Cross-Origin Read Blocking (CORB) 

export function getRecommend (data) {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  var opts = {
    name: 'recommend',
    param: 'jsonpCallback'
  }
  var reallyData = Object.assign({}, qqyBase, data)
  return jsonpRequest(url, reallyData, opts)
}
