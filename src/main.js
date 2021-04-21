import Vue from 'vue'
import VueX from 'vuex'
import store from './store'
import App from './App.vue'
import router from './router'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false

Vue.use(VueX)
Vue.use(VueYoutube)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
