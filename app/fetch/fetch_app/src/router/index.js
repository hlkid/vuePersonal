import Vue from 'vue'
import Router from 'vue-router'
import fetch from '../page/fetch'//fetch数据获取交互
import breadcrumb from '../page/breadcrumb'//面包屑
import icon from '../page/icon'//icon图标
import pagination from '../page/pagination'//分页
import message from '../page/message'//message提示

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: fetch
    },
    {
      path: '/fetch',
      component: fetch
    },
    {
      path: '/breadcrumb',
      component: breadcrumb,
      meta: ['测试', '面包屑测试'],
    },
    {
      path: '/icon',
      component: icon
    },
    {
      path: '/pagination',
      component: pagination
    },
    {
      path: '/message',
      component: message
    }
  ]
})
