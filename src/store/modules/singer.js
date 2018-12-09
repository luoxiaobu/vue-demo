const state = {
  singer: null
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
// function (context)
const actions = {
  // setSinger(context) {
  //   context.commit(SET_SINGER)
  // }
  // setSinger({commit}) {
  //   commit(SET_SINGER)
  // }
}