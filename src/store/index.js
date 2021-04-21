
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isConfirmed: false,
    userId: ''
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('supabase.auth.token')) {
        // state.userId = localStorage.getItem('supabase.auth.token')
        const user = JSON.parse(localStorage.getItem('supabase.auth.token'))
        const userId = user.currentSession.user.id
        state.userId = userId
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setUserId(state, userId) {
      state.userId = userId
      state.isAuthenticated = true
    }
  },
  actions: {},
  modules: {}
})
