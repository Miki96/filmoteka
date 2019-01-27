import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Account from './views/Account.vue'
import ajax from './http-common.js'

Vue.use(Router)

// check for token
const auth = (to, from, next) => {
  if (localStorage.getItem('token')) {
    ajax.post('/validate')
    .then(res => {
        next();
    })
    .catch(e => {
      console.log(e);
      next('/login');
    });
  } else {
    next('/login');
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, props: { page: 0 }, beforeEnter: auth},
    { path: '/movies', component: Home, props: { page: 1 }, beforeEnter: auth},
    { path: '/shows', component: Home, props: { page: 2 }, beforeEnter: auth},
    { path: '/search', component: Home, props: { page: 3 }, beforeEnter: auth},
    { path: '/login', component: Account, props: { tab: 0 }},
    { path: '/signup', component: Account, props: { tab: 1 }}
  ]
})
