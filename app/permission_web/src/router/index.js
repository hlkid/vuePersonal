import Vue from 'vue'
import Router from 'vue-router'
import user from '../components/page/user.vue'
import role from '../components/page/role.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  base:"/permisonServices/",//部署环境
  routes: [
    {
      path: '/',
      component: user
    },
    {
      path: '/user',
      component: user,
    },
    {
      path: '/role',
      component: role,
    }
  ]
})
