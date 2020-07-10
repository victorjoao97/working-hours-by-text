import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import VueMoment from 'vue-moment'
import Clipboard from 'v-clipboard'
import VTooltip from 'v-tooltip'
import Notifications from 'vue-notification'
import VuejsDialog from 'vuejs-dialog'

import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VueTheMask)
Vue.use(VueMoment)
Vue.use(Clipboard)
Vue.use(VTooltip)
Vue.use(Notifications)
Vue.use(VuejsDialog, {
    okText: 'Continue',
    cancelText: 'Close',
    animation: 'zoom', // Available: "zoom", "bounce", "fade"
    type: 'basic', // coming soon: 'soft', 'hard'
    verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
    verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
    clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
    backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
    customClass: ''
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
