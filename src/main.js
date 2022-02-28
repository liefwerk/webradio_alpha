import Vue from 'vue'
import VueX from 'vuex'
import store from './store'
import App from './App.vue'
import router from './router'
import VueYoutube from 'vue-youtube'
import Toast, { POSITION } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
import titleMixin from './mixins/titleMixin'

Vue.config.productionTip = false

const toastOptions = {
    position: POSITION.BOTTOM_RIGHT
}

Vue.use(VueX)
Vue.use(VueYoutube)
Vue.use(Toast, toastOptions)

Vue.mixin(titleMixin)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
