
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        isConfirmed: false,
        userId: '',
        userEmail: '',
        supabaseUrl: 'https://epqrpjmozlcsvbgkxjkp.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTE0ODMyNCwiZXhwIjoxOTMwNzI0MzI0fQ.GxLEzrl9Faolqb12sImfJ2OGGIGsYU72FYPJcrA0cO4'
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('supabase.auth.token')) {
                // state.userId = localStorage.getItem('supabase.auth.token')
                const user = JSON.parse(localStorage.getItem('supabase.auth.token'))
                const userId = user.currentSession.user.id
                const userEmail = user.currentSession.user.email
                state.userId = userId
                state.userEmail = userEmail
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
    modules: {},
    plugins: [createPersistedState({
        paths: ['isAuthenticated']
    })]
})
