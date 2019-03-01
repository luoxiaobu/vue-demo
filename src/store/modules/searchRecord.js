import {
  SET_SEARCH_RECORD
} from '../mutation-types'

import {loadSearch, saveSearch, deleteSearch, clearSearch} from '@/utils/cache.js'
const state = {
  searchRecord: loadSearch()
}

const getters = {
  getRecord: state => state.searchRecord
}

const mutations = {
  [SET_SEARCH_RECORD] (state, payload) {
    state.searchRecord = payload
  }
}

const actions = {
  saveRecord: ({commit}, query) => {
    commit(SET_SEARCH_RECORD, saveSearch(query))
  },
  deleteRecord: ({commit}, query) => {
    commit(SET_SEARCH_RECORD, deleteSearch(query))
  },
  clearRecord: ({commit}, query) => {
    commit(SET_SEARCH_RECORD, clearSearch())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
