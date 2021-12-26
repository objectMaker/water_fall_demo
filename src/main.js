import Vue from 'vue'
import App from './App.vue'
import './install'
import './mockjs'
import './css/reset.css'
Vue.config.productionTip = false
import router from './router/router';
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
