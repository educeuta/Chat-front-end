// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'
import VueMoment from 'vue-moment'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(VueMoment)
Vue.use(VuePaginate)
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
