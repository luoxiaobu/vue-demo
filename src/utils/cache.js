import * as storage from './storage.js'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 10

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function loadSearch () {
  return storage.getItem(SEARCH_KEY, [])
}

export function saveSearch (query) {
  let searches = storage.getItem(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.setItem(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query) {
  let searches = storage.getItem(SEARCH_KEY, [])
  deleteArray(searches, (item) => {
    return item === query
  })
  storage.setItem(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.removeItem(SEARCH_KEY)
  return []
}
