import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  data: {
    user: {
      'id' : localStorage.getItem('id'),
      'token' : localStorage.getItem('token')
    }
  },
  render: h => h(App)
}).$mount('#app')
