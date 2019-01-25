export function isObject (data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

// data-*  have compatibility issues , still use getAtrribute
export function getData (el, dataName, value) {
  let name = 'data-' + dataName
  if (value) {
    el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

// completion prefix
let eleStyle = document.createElement('div').style;
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (eleStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * dataLeftCompleting
 * @param {integer} number of format bits
 * @param {string}  completion character
 * @param value
 */
export function dataLeftCompleting (bits, identifier, value) {
  value = Array(bits + 1).join(identifier) + value;
  return value.slice(-bits);
}

export function dataRightCompleting (bits, identifier, value) {
  value = value + Array(bits + 1).join(identifier);
  return value.slice(bits);
}

/**
 * shuffle (disrupt array order)
 * @param { array }
 */
export function shuffle (arr) {
  let _arr = arr.slice();
  let i = _arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [_arr[j], _arr[i]] = [_arr[i], _arr[j]];
  }
  return _arr
}

/**
 * findIndex
 * @param { array }
 */
export function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

/**
 * toFixedN
 * @param {number} value
 * @param {number} n
 */
export function toFixedN (value, n) {
  if (isNaN(value)) {
    return
  }
  var number = Number(value).toString();
  var numberArr = number.split('.');
  var intNum = numberArr[0]; // 整数部分
  var deciNum = numberArr[1]; // 小数部分
  var temp;
  if (!n && n !== 0) {
    return value
  }
  if (n === 0) {
    return +intNum
  } else if (n > 0) {
    if (!deciNum || n >= deciNum.length) {
      return +(intNum + '.' + dataRightCompleting(n, 0, +(deciNum)))
    } else {
      temp = (+deciNum[n]) >= 5 ? 1 : 0;
      return +(intNum + '.' + (+deciNum.slice(0, n) + temp))
    }
  }
  return value
}
