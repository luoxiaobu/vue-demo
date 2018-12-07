export function isObject (data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function getData (el, dataName, value) {
  let name = 'data-' + dataName
  if (value) {
    el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}
