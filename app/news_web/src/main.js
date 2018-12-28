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
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import "babel-polyfill"//兼容IE

Vue.use(VueQuillEditor)

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
