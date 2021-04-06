import Vue from 'vue'
import Vuex from 'vuex'
import { sendGetRequest } from '../services/api.service'

Vue.use(Vuex)

const SET_DATA = 'SET_DATA'

export default new Vuex.Store({
  state: {
    data: null,
  },
  mutations: {
    [SET_DATA](state, data) {
      state.data = data
    },
  },
  actions: {
    async getData({ commit }) {
      const data = await sendGetRequest('/data.json')
      commit(SET_DATA, data)
    },
  },
  modules: {},
})
