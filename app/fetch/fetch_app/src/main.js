// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Icon from 'vue-svg-icon/Icon.vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'//不能缺
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
