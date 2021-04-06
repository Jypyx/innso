import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import '@/assets/styles/global.scss'

import VueGoodTable from 'vue-good-table'
import VueTooltip from 'v-tooltip'

Vue.config.productionTip = false

Vue.use(VueGoodTable)
Vue.use(VueTooltip)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
