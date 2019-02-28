import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import singer from './modules/singer'
import playSong from './modules/playSong'
import recommend from './modules/recommend'
import rank from './modules/rank'
import searchRecord from './modules/searchRecord'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    singer,
    playSong,
    recommend,
    rank,
    searchRecord
  },
  plugins: debug ? [createLogger()] : [],
  strict: debug
})
