import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Account from './views/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Account, props: { tab: 0 }},
    { path: '/signup', component: Account, props: { tab: 1 }}
  ]
})
