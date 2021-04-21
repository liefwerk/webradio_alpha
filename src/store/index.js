/* eslint-disable space-before-function-paren */
import { Store } from 'vuex'

export default Store({
  state: {
    isAuthenticated: false,
    isConfirmed: false,
    userId: ''
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
      state.isAuthenticated = true
    }
  },
  actions: {},
  modules: {}
})
