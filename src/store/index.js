import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import singer from './modules/singer'
import playSong from './modules/playSong'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    singer,
    playSong
  },
  plugins: debug ? [createLogger()] : [],
  strict: debug
})
