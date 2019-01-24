import {
  SET_RECOMMEND
} from '../mutation-types'

const state = {
  recommend: {}
}

const getters = {
  getRecommend: state => state.recommend
}

const mutations = {
  [SET_RECOMMEND] (state, payload) {
    state.recommend = payload
  }
}

export default {
  state,
  getters,
  mutations
}
