// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';//不能缺
import Icon from 'vue-svg-icon/Icon.vue';
import echarts from "echarts";
import 'babel-polyfill'//兼容IE(调试中)
Vue.prototype.$echarts = echarts 

Vue.use(ElementUI);
Vue.component('icon', Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
