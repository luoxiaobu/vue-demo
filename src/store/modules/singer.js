import {
  SET_SINGER
} from '../mutation-types'

const state = {
  singer: {}
}

// function (state, getters)
const getters = {
  getSinger: state => state.singer
}

// function (state, payload)
const mutations = {
  [SET_SINGER] (state, payload) {
    state.singer = payload
  }
}
// 与 store 实例具有相同方法和属性的 context 对象
// 对 mutation 的封装 和异步操作
// function (context)
// const actions = {
//   setSinger(context) {
//     context.commit(SET_SINGER)
//   }
//   setSinger({commit}) {
//     commit(SET_SINGER)
//   }
// }

export default {
  state,
  getters,
  mutations
}
