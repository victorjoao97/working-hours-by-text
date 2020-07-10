import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import VueMoment from 'vue-moment'
import Clipboard from 'v-clipboard'
import VTooltip from 'v-tooltip'
import VueI18n from 'vue-i18n'
import normalize from 'normalize.css'

import messages from './locales'

Vue.use(VueTheMask)
Vue.use(VueMoment)
Vue.use(Clipboard)
Vue.use(VTooltip)
Vue.use(VueI18n)
Vue.use(normalize)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'pt_br',
  messages
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
