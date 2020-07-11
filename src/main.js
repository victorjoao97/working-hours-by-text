import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import VueMoment from 'vue-moment'
import Clipboard from 'v-clipboard'
import VTooltip from 'v-tooltip'
import VueI18n from 'vue-i18n'
import normalize from 'normalize.css'

import messages from './locales'
import Notifications from 'vue-notification'
import VuejsDialog from 'vuejs-dialog'

import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VueTheMask)
Vue.use(VueMoment)
Vue.use(Clipboard)
Vue.use(VTooltip)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage['langSelected'] || 'pt_br',
  messages
})

Vue.use(normalize)
Vue.use(Notifications)
Vue.use(VuejsDialog, {
  okText: i18n.t('continue'),
  cancelText: i18n.t('close'),
})

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
