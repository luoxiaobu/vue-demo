import {
  SET_TOP_LIST
} from '../mutation-types'

const state = {
  topList: {}
}

const getters = {
  getTopList: state => state.topList
}

const mutations = {
  [SET_TOP_LIST] (state, payload) {
    state.topList = payload
  }
}

export default {
  state,
  getters,
  mutations
}
