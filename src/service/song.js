import { jsonpRequest } from '@/utils/jsonpRequest';
import { qqyBase } from './config'

export function getplaysongvkey (songId) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  let rnd = Math.floor(Math.random() * 1000000000000000) + 1;
  let opts = {
    name: `getplaysongvkey${rnd}`,
    param: 'callback'
  };
  let songArray = [songId];
  let data = JSON.stringify({
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '2552350896',
        songmid: songArray,
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
