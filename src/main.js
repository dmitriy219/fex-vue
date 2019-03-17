import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
