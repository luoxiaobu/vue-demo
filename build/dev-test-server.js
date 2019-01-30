// request that needs to be processed by the server
// there just for test
var axios = require('axios')
module.exports = function(app, server) {
  app.get('/api/getDiscList',getPlaylist);
  app.get('/api/lyric',getLyric);
  app.get('/api/getSongList',getSongList);
  app.get('/api/search',getSearchResult)
}

function getPlaylist (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    // handle some error
    console.log(e)
  })
}

function getLyric (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    // handle some error
    console.log(e)
  })
}

function getSongList (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url,{
    headers: {
      referer: `https://y.qq.com/n/yqq/playlist/${req.query.dissid}.html`,
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    // handle some error
    console.log(e)
  })
}

function getSearchResult (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    // handle some error
    console.log(e)
  })
}


