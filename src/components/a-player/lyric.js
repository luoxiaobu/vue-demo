const timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})]/g

export default class Lyric {
  constructor (lyc) {
    this.lyc = lyc;
    this.lines = filterLines(lyc);
    this.currentLine = '';
    this.currentIndex = 0;
  }
  // startTime is audio currentTime
  play (startTime = 0) {
    if (!this.lines.length) {
      return
    }
    this.nextIndex = this.lines.findIndex((item) => {
      return item.time > startTime
    })
    this.startStamp = +new Date() - startTime
    this.currentLine = this.lines[this.nextIndex - 1];
    if (this.nextIndex < this.lines.length) {
      clearTimeout(this.timer);
      this._playNext()
    }
  }

  _playNext () {
    let line = this.lines[this.nextIndex]
    let delay = line.time - (+new Date() - this.startStamp)
    this.timer = setTimeout(() => {
      this.currentLine = this.lines[this.nextIndex];
      this.nextIndex = this.nextIndex + 1;
      if (this.nextIndex < this.lines.length) {
        this._playNext()
      }
    }, delay)
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
