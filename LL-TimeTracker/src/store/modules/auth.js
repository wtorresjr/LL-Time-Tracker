// store/modules/auth.js
const state = {
  isAuthenticated: false
}

const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

// ... other code ...
export default state
