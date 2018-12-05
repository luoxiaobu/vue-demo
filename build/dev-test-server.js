// request that needs to be processed by the server
// there just for test
var axios = require('axios')
module.exports = function(app, server) {
  app.get('/api/getDiscList',getPlaylist);
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