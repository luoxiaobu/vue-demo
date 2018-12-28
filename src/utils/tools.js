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
