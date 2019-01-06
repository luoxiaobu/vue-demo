import * as types from '@/store/mutation-types';
import { PLAY_MODE, SHOW_MODE } from '@/data/consts';
import { shuffle, findIndex } from '@/utils/tools.js';

const state = {
  playing: false,
  playlist: [],
  sequenceList: [],
  playMode: PLAY_MODE.SEQUENCE,
  currentIndex: -1,
  showMode: SHOW_MODE.HIDDEN
}

const getters = {
  playing: state => state.playing,
  playlist: state => state.playlist,
  sequenceList: state => state.sequenceList,
  playMode: state => state.playMode,
  currentIndex: state => state.currentIndex,
  currentSong: state => {
    return state.playlist[state.currentIndex] || {}
  },
  showMode: state => state.showMode
}

const mutations = {
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SHOW_MODE] (state, showMode) {
    state.showMode = showMode
  }
}

const actions = {
  selectPlay: ({commit, state}, {list, index}) => {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.playMode === PLAY_MODE.RANDOM) {
      let randomList = shuffle(list);
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_SHOW_MODE, SHOW_MODE.NORMAL);
    commit(types.SET_PLAYING, true)
  },
  randomPlay: ({commit, state}, {list}) => {
    commit(types.SET_SEQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAY_MODE, PLAY_MODE.RANDOM);
    commit(types.SET_PLAYLIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_PLAYING, true);
    commit(types.SET_SHOW_MODE, SHOW_MODE.NORMAL);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
