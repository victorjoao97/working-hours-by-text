import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import VueMoment from 'vue-moment'
import Clipboard from 'v-clipboard'
import VTooltip from 'v-tooltip'

Vue.use(VueTheMask)
Vue.use(VueMoment)
Vue.use(Clipboard)
Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
