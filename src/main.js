import Vue from 'vue'
import './plugins/axios'
import './plugins/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

var v = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
