import jsonpOrigin from 'jsonp'
import { isObject } from './tools'

/**
 * jsonpRequest
 *
 * @param {String} url
 * @param {Object} optional data
 * @param {Function} optional opts
 */

export function jsonpRequest (url, data, opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    opts.timeout = opts.timeout || 30000
    jsonpOrigin(spliceUrl(url, data), opts, (err, data) => {
      if (!err && data.code === 0) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function spliceUrl (url, data) {
  var reallyUrl = ''
  var query = ''
  if (!isObject) {
    return url
  }
  for (var k in data) {
    query += `&${k}=${encodeURIComponent(data[k])}`
  }
  query.replace(/&/, '')
  reallyUrl = `${url}${(~url.indexOf('?') ? '&' : '?')}${query}`
  return reallyUrl
}
