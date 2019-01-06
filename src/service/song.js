import { jsonpRequest } from '@/utils/jsonpRequest';
import { axiosRequest } from '@/utils/axiosRequest'
import { qqyBase } from './config'

const requestIns = axiosRequest();

/**
 * getplaysongvkey
 *
 * @param {String} songId
 */
export function getplaysongvkey (songId) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  let rnd = Math.floor(Math.random() * 1000000000000000) + 1;
  let opts = {
    name: `getplaysongvkey${rnd}`,
    param: 'callback'
  };
  let data = JSON.stringify({
    data: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '2552350896',
        songmid: songId,
        songtype: [0],
        uin: '0',
        loginflag: 1,
        platform: '20'
      }
    },
    comm: {
      uin: 0,
      format: 'json',
      ct: 20,
      cv: 0
    }
  })
  var reallyData = Object.assign({}, qqyBase, {
    data
  })
  return jsonpRequest(url, reallyData, opts)
}

/**
 * getLyric
 *
 * @param {String} mid
 */
export function getLyric (mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, qqyBase, {
    songmid: mid,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return requestIns(url, {
    params: data
  })
}
