import {
  SET_SEARCH_RECORD
} from '../mutation-types'

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