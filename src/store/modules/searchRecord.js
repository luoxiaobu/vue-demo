import {
  SET_SEARCH_RECORD
} from '../mutation-types'

import {saveSearch} from '@/utils/cache.js'
const state = {
  searchRecord: []
}

const getters = {
  getSearchRecord: state => state.searchRecord
}

const mutations = {
  [SET_SEARCH_RECORD] (state, payload) {
    state.searchRecord = payload
  }
}

const actions = {
  saveSearchHistory: ({commit}, query) => {
    commit(SET_SEARCH_RECORD, saveSearch(query))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
