import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuthenticated: false
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }
  },
  actions: {
    setAuthenticated({ commit }, isAuthenticated) {
      commit('SET_AUTHENTICATED', isAuthenticated)
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated
  }
})

export default store
