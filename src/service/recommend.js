
import { jsonpRequest } from '../utils/jsonpRequest'
import { qqyBase } from './config'

export function getRecommend (data) {
  var opts = {
    name: 'recom6104570528958779',
    param: 'jsonpCallback',
    callback: 'recom6104570528958779'
  }
  var reallyData = Object.assign({}, qqyBase, data)
  return jsonpRequest('https://u.y.qq.com/cgi-bin/musicu.fcg', reallyData, opts)
}
