// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import {store} from "./store/store";
import {lumenRequest} from './Axios Instances/lumenRequest' //importing the instance of axios to interact with Lumen Backend
import 'vuetify/dist/vuetify.css'

import App from './App'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },
  created() {
    let vm = this;
    lumenRequest.get('/persons')
      .then(response => {
        // console.log(response.data)
        vm.$store.dispatch('setDataFetched',response.data)
      })
      .catch(error => console.log(error))
  }
})
