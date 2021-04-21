import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Connect from '../views/Connect.vue'
import MyAccount from '../views/MyAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/connect',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'Connect', query: { to: to.path } })
  } else {
    next()
  }
})

export default router
