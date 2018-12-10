import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import singer from './modules/singer.js'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    singer
  },
  plugins: debug ? [createLogger()] : [],
  strict: debug
})
