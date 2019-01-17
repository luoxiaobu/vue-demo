const timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})]/g

export default class Lyric {
  constructor (lyc, hanlder = () => {}) {
    this.lyc = lyc;
    this.lines = filterLines(lyc);
    this.currentLine = '';
    this.currentTxt = '';
    this.currentIndex = 0;
    this.nextTime = 0;
    this.hanlder = hanlder;
  }
  // startTime is audio currentTime
  play (startTime = 0) {
    if (!this.lines.length) {
      return
    }
    this.nextIndex = this.lines.findIndex((item) => {
      return item.time > startTime;
    })
    if (this.nextIndex < 0) {
      this.currentIndex = this.lines.length - 1;
      this.currentTxt = this.lines[this.currentIndex].txt;
      this.nextTime = 10000000;
      this._callhanlder(this.currentIndex);
      return;
    }
    if (this.nextIndex === 0) {
      this.nextIndex = 1;
    }
    this.currentTxt = this.lines[this.nextIndex - 1].txt;
    this.currentIndex = this.nextIndex - 1
    this.nextTime = this.lines[this.nextIndex].time;
    this._callhanlder(this.currentIndex);
  }

  _callhanlder (currentIndex) {
    this.hanlder(currentIndex);
  }
}

function filterLines (lyric) {
  let lyc = lyric.split('\n');
  var lines = []
  lyc.forEach((item) => {
    let result = timeExp.exec(item)
    const txt = item.replace(timeExp, '').trim();
    if (result && txt) {
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
