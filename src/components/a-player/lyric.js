const timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})]/g

export default class Lyric {
  constructor (lyc) {
    this.lyc = lyc;
    this.lines = filterLines(lyc)
  }
}

function filterLines (lyric) {
  let lyc = lyric.split('\n');
  var lines = []
  lyc.forEach((item) => {
    let result = timeExp.exec(item)
    if (result) {
      const txt = item.replace(timeExp, '').trim();
      lines.push({
        time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
        txt
      })
    }
  })
  return lines.sort((a, b) => {
    return a.time - b.time
  })
}
