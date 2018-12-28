import Vue from 'vue'
import Router from 'vue-router'
import newpage from '../components/page/new.vue'
import editpage from '../components/page/edit.vue'
import list from '../components/page/list.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  base:"/newsServices/",//部署环境
  routes: [
    {
      path: '/',
      component: list
    },
    {
      path: '/list',
      component: list
    },
    {
      path: '/new',
      component: newpage,
    },
    {
      path: '/edit',
      component: editpage,
    }
  ]
})
