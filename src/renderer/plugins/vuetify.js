// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    lang: {
        locales: { ru },
        current: 'ru',
    },
   /* theme: {
        themes: {
          dark: {
            primary: "#14C6FF",
            secondary: "#424242",
          }
        }
    }*/
}



export default new Vuetify(opts)