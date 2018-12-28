import Vue from 'vue'
import Router from 'vue-router'

import index from '../components/page/index.vue'

import login from '../components/page/login.vue'//登录页
import register from '../components/page/register.vue'//注册页

import activeMsg from '../components/page/activeMsg.vue'//动态信息
import activeMsg_news from '../components/children/activeMsg_news.vue'//动态信息--新闻动态
import activeMsg_industry from '../components/children/activeMsg_industry.vue'//动态信息--行业动态
import activeMsg_apsAndtat from '../components/children/activeMsg_apsAndtat.vue'//动态信息--SPS/TBT通报

import searchSta from '../components/page/searchSta.vue'//标准查询
import searchSta_internation from '../components/children/searchSta_internation.vue'//标准服务--国际标准
import searchSta_home from '../components/children/searchSta_home.vue'//标准服务--国内标准

import serviceSta from '../components/page/serviceSta.vue'//标准服务
import serviceSta_rev from '../components/children/serviceSta_rev.vue'//标准服务--标准制修订
import serviceSta_rev_content from '../components/children/serviceSta_rev_content.vue'//标准服务--标准制修订--服务内容
import serviceSta_rev_data from '../components/children/serviceSta_rev_data.vue'//标准服务--标准制修订--标准编写的依据和质量
import serviceSta_rev_process from '../components/children/serviceSta_rev_process.vue'//标准服务--标准制修订--服务流程
import serviceSta_rev_contact from '../components/children/serviceSta_rev_contact.vue'//标准服务--标准制修订--联系方式
import serviceSta_rev_add from '../components/children/serviceSta_rev_add.vue'//标准服务--标准制修订--增值服务

import serviceSta_new from '../components/children/serviceSta_new.vue'//标准服务--标准查新
import serviceSta_new_price from '../components/children/serviceSta_new_price.vue'//标准服务--标准查新--服务价格
import serviceSta_new_process from '../components/children/serviceSta_new_process.vue'//标准服务--标准查新--服务流程
import serviceSta_new_line from '../components/children/serviceSta_new_line.vue'//标准服务--标准查新--在线服务
import serviceSta_new_contact from '../components/children/serviceSta_new_contact.vue'//标准服务--标准查新--联系方式

import serviceSta_support from '../components/children/serviceSta_support.vue'//标准服务--标准托管
import serviceSta_support_price from '../components/children/serviceSta_support_price.vue'//标准服务--标准托管--服务价格
import serviceSta_support_process from '../components/children/serviceSta_support_process.vue'//标准服务--标准托管--服务流程
import serviceSta_support_line from '../components/children/serviceSta_support_line.vue'//标准服务--标准托管--在线服务
import serviceSta_support_contact from '../components/children/serviceSta_support_contact.vue'//标准服务--标准托管--联系方式

import serviceSta_ass from '../components/children/serviceSta_ass.vue'//标准服务--标准评估
import serviceSta_ass_price from '../components/children/serviceSta_ass_price.vue'//标准服务--标准评估--服务价格
import serviceSta_ass_process from '../components/children/serviceSta_ass_process.vue'//标准服务--标准评估--服务流程
import serviceSta_ass_line from '../components/children/serviceSta_ass_line.vue'//标准服务--标准评估--在线服务
import serviceSta_ass_contact from '../components/children/serviceSta_ass_contact.vue'//标准服务--标准评估--联系方式
import serviceSta_ass_add from '../components/children/serviceSta_ass_add.vue'//标准服务--标准评估--增值服务

import serviceSta_vs from '../components/children/serviceSta_vs.vue'//标准服务--标准比对
import serviceSta_vs_content from '../components/children/serviceSta_vs_content.vue'//标准服务--标准比对--业务范围
import serviceSta_vs_process from '../components/children/serviceSta_vs_process.vue'//标准服务--标准比对--服务流程
import serviceSta_vs_line from '../components/children/serviceSta_vs_line.vue'//标准服务--标准比对--在线服务
import serviceSta_vs_contact from '../components/children/serviceSta_vs_contact.vue'//标准服务--标准比对--联系方式
import serviceSta_vs_add from '../components/children/serviceSta_vs_add.vue'//标准服务--标准比对--增值服务
import serviceSta_vs_demo from '../components/children/serviceSta_vs_demo.vue'//标准服务--标准比对--比对示例

import serviceSys from '../components/page/serviceSys.vue'//技术服务--体系服务
import serviceSys_sta from '../components/children/serviceSys_sta.vue'//技术服务--体系服务--农业标准体系建设
import serviceSys_sta_content from '../components/children/serviceSys_sta_content.vue'//技术服务--体系服务--农业标准体系建设--服务内容
import serviceSys_sta_data from '../components/children/serviceSys_sta_data.vue'//技术服务--体系服务--农业标准体系建设--农业标准体系编制相关资料
import serviceSys_sta_model from '../components/children/serviceSys_sta_model.vue'//技术服务--体系服务--农业标准体系建设--搭建范本
import serviceSys_sta_frame from '../components/children/serviceSys_sta_frame.vue'//技术服务--体系服务--农业标准体系建设--通用标准体系框架图
import serviceSys_sta_process from '../components/children/serviceSys_sta_process.vue'//技术服务--体系服务--农业标准体系建设--服务流程
import serviceSys_sta_contact from '../components/children/serviceSys_sta_contact.vue'//技术服务--体系服务--农业标准体系建设--联系方式
import serviceSys_sta_add from '../components/children/serviceSys_sta_add.vue'//技术服务--体系服务--农业标准体系建设--增值服务



import serviceSys_demo from '../components/children/serviceSys_demo.vue'//技术服务--体系服务--标准化试点示范
import serviceSys_demo_business from '../components/children/serviceSys_demo_business.vue'//技术服务--体系服务--标准化试点示范--业务范围
import serviceSys_demo_process from '../components/children/serviceSys_demo_process.vue'//技术服务--体系服务--标准化试点示范--服务流程
import serviceSys_demo_line from '../components/children/serviceSys_demo_line.vue'//技术服务--体系服务--标准化试点示范--在线服务
import serviceSys_demo_contact from '../components/children/serviceSys_demo_contact.vue'//技术服务--体系服务--标准化试点示范--联系方式
import serviceSys_demo_add from '../components/children/serviceSys_demo_add.vue'//技术服务--体系服务--标准化试点示范--增值服务


import serviceExt from '../components/page/serviceExt.vue'//技术服务--推广服务
import serviceExt_search from '../components/children/serviceExt_search.vue'//技术服务--推广服务--示范区查询
import serviceExt_analysis from '../components/children/serviceExt_analysis.vue'//技术服务--推广服务--示范区建设分析
import serviceExt_case from '../components/children/serviceExt_case.vue'//技术服务--推广服务--典型案例
import serviceExt_chat from '../components/children/serviceExt_chat.vue'//技术服务--推广服务--经验交流
import serviceExt_partner from '../components/children/serviceExt_partner.vue'//技术服务--推广服务--合作伙伴
import serviceExt_demo from '../components/children/serviceExt_demo.vue'//技术服务--推广服务--成果展示

import serviceTrain from '../components/page/serviceTrain.vue'//技术服务--培训服务
import serviceTrain_introduce from '../components/children/serviceTrain_introduce.vue'//技术服务--培训服务--服务介绍
import serviceTrain_plan from '../components/children/serviceTrain_plan.vue'//技术服务--培训服务--培训计划
import serviceTrain_notice from '../components/children/serviceTrain_notice.vue'//技术服务--培训服务--培训通知
import serviceTrain_course from '../components/children/serviceTrain_course.vue'//技术服务--培训服务--培训课程


import aboutUs from '../components/page/aboutUs.vue'//关于我们
import aboutUs_introduce from '../components/children/aboutUs_introduce.vue'//关于我们--平台介绍
import aboutUs_experts from '../components/children/aboutUs_experts.vue'//关于我们--专家风采
import aboutUs_copyright from '../components/children/aboutUs_copyright.vue'//关于我们--版权声明
import aboutUs_standard from '../components/children/aboutUs_standard.vue'//关于我们--管理规范
import aboutUs_remit from '../components/children/aboutUs_remit.vue'//关于我们--汇款方式
import aboutUs_contact from '../components/children/aboutUs_contact.vue'//关于我们--联系我们
import aboutUs_qq from '../components/children/aboutUs_qq.vue'//关于我们--在线QQ
import aboutUs_notice from '../components/children/aboutUs_notice.vue'//关于我们--通知公告

import help from '../components/page/help.vue'//帮助中心
import help_usebook from '../components/children/help_usebook.vue'//帮助中心--平台使用手册
import help_question from '../components/children/help_question.vue'//帮助中心--常见问题

import userCen from '../components/page/userCen.vue'//个人中心
import userCen_library from '../components/children/userCen_library.vue'//个人中心--文库收藏夹
import userCen_course from '../components/children/userCen_course.vue'//个人中心--培训课程收藏夹
import userCen_apply from '../components/children/userCen_apply.vue'//个人中心--我的服务申请
import userCen_account from '../components/children/userCen_account.vue'//个人中心--账户信息

import backstageMan from '../components/page/backstageMan/backstageMan.vue'//后台管理
import backstageMan_data from '../components/page/backstageMan/children/data.vue'//后台管理--资料管理
import backstageMan_train from '../components/page/backstageMan/children/train.vue'//后台管理--培训管理
import backstageMan_train_add from '../components/page/backstageMan/children/components/train_add.vue'//后台管理--培训管理新增
import backstageMan_train_edit from '../components/page/backstageMan/children/components/train_edit.vue'//后台管理--培训管理修改

import backstageMan_demoarea from '../components/page/backstageMan/children/demoarea.vue'//后台管理--示范区管理
import backstageMan_demo_add from '../components/page/backstageMan/children/components/demo_add.vue'//后台管理--示范区信息新增
import backstageMan_demo_edit from '../components/page/backstageMan/children/components/demo_edit.vue'//后台管理--示范区信息修改
import backstageMan_casemange_add from '../components/page/backstageMan/children/components/casemange_add.vue'//后台管理--案例管理新增
import backstageMan_casemange_edit from '../components/page/backstageMan/children/components/casemange_edit.vue'//后台管理--案例管理修改
import backstageMan_achieve_add from '../components/page/backstageMan/children/components/achieve_add.vue'//后台管理--成果展示新增
import backstageMan_achieve_edit from '../components/page/backstageMan/children/components/achieve_edit.vue'//后台管理--成功展示修改


import backstageMan_application from '../components/page/backstageMan/children/application.vue'//后台管理--在线申请管理
import backstageMan_settle from '../components/page/backstageMan/children/settle.vue'//后台管理--结算管理
import backstageMan_info from '../components/page/backstageMan/children/info.vue'//后台管理--结算管理
import backstageMan_basic from '../components/page/backstageMan/children/basic.vue'//后台管理--结算管理

import info from '../components/page/backstageMan/children/info_view.vue'//后台管理的信息管理
import basic from '../components/page/backstageMan/children/basic_view.vue'//后台管理的权限管理

import librarySummary from '../components/page/librarySummary.vue'//文库简介详情
import trainSummary from '../components/page/trainSummary.vue'//培训详情及学习 
import caseSummary from '../components/page/caseSummary.vue'//典型案例详情 
import resultSummary from '../components/page/resultSummary.vue'//成果展示详情 

import caseDetail from '../components/page/caseDetail.vue'//案例信息详情页面

import newsdetail from '../components/common/newsdetail.vue'//案例信息详情页面

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:"/Services/",//部署环境
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path: '/activeMsg',
          component: activeMsg,
          children:[
            {
              path: '/',
              component: activeMsg_news,
            },
            {
              path: '/activeMsg/news',
              component: activeMsg_news,
            },
            {
              path: '/activeMsg/industry',
              component: activeMsg_industry,
            },
            {
              path: '/activeMsg/apsAndtat',
              component: activeMsg_apsAndtat,
            }
          ]
        },
        {
          path: '/searchSta',
          component: searchSta,
          children:[
            {
              path: '/',
              component: searchSta_internation,
            },
            {
              path: '/searchSta/home',
              component: searchSta_home,
            },
            {
              path: '/searchSta/internation',
              component: searchSta_internation,
            }
          ]
        },
        {
          path: '/serviceSta',
          component: serviceSta,
          children:[
            {
              path: '/',
              component: serviceSta_rev,
            },
            {
              path: '/serviceSta/rev',
              component: serviceSta_rev,
              children:[
                {
                  path: '/',
                  component: serviceSta_rev_content,
                },
                {
                  path: '/serviceSta/rev/content',
                  component: serviceSta_rev_content,
                },
                {
                  path: '/serviceSta/rev/data',
                  component: serviceSta_rev_data,
                },
                {
                  path: '/serviceSta/rev/process',
                  component: serviceSta_rev_process,
                },
                {
                  path: '/serviceSta/rev/contact',
                  component: serviceSta_rev_contact,
                },
                {
                  path: '/serviceSta/rev/add',
                  component: serviceSta_rev_add,
                }
              ]
            },
            {
              path: '/serviceSta/new',
              component: serviceSta_new,
              children:[
                {
                  path: '/',
                  component: serviceSta_new_price,
                },
                {
                  path: '/serviceSta/new/price',
                  component: serviceSta_new_price,
                },
                {
                  path: '/serviceSta/new/process',
                  component: serviceSta_new_process,
                },
                {
                  path: '/serviceSta/new/line',
                  component: serviceSta_new_line,
                },
                {
                  path: '/serviceSta/new/contact',
                  component: serviceSta_new_contact,
                }
              ]
            },
            {
              path: '/serviceSta/support',
              component: serviceSta_support,
              children:[
                {
                  path: '/',
                  component: serviceSta_support_price,
                },
                {
                  path: '/serviceSta/support/price',
                  component: serviceSta_support_price,
                },
                {
                  path: '/serviceSta/support/process',
                  component: serviceSta_support_process,
                },
                {
                  path: '/serviceSta/support/line',
                  component: serviceSta_support_line,
                },
                {
                  path: '/serviceSta/support/contact',
                  component: serviceSta_support_contact,
                }
              ]
            },
            {
              path: '/serviceSta/ass',
              component: serviceSta_ass,
              children:[
                {
                  path: '/',
                  component: serviceSta_ass_price,
                },
                {
                  path: '/serviceSta/ass/price',
                  component: serviceSta_ass_price,
                },
                {
                  path: '/serviceSta/ass/process',
                  component: serviceSta_ass_process,
                },
                {
                  path: '/serviceSta/ass/line',
                  component: serviceSta_ass_line,
                },
                {
                  path: '/serviceSta/ass/contact',
                  component: serviceSta_ass_contact,
                },
                {
                  path: '/serviceSta/ass/add',
                  component: serviceSta_ass_add,
                }
              ]
            },
            {
              path: '/serviceSta/vs',
              component: serviceSta_vs,
              children:[
                {
                  path: '/',
                  component: serviceSta_vs_content,
                },
                {
                  path: '/serviceSta/vs/business',
                  component: serviceSta_vs_content,
                },
                {
                  path: '/serviceSta/vs/process',
                  component: serviceSta_vs_process,
                },
                {
                  path: '/serviceSta/vs/line',
                  component: serviceSta_vs_line,
                },
                {
                  path: '/serviceSta/vs/contact',
                  component: serviceSta_vs_contact,
                },
                {
                  path: '/serviceSta/vs/add',
                  component: serviceSta_vs_add,
                },
                {
                  path: '/serviceSta/vs/demo',
                  component: serviceSta_vs_demo,
                }
              ]
            }
          ]
        },
        {
          path: '/serviceSys',
          component: serviceSys,
          children:[
            {
              path: '/',
              component: serviceSys_sta,
            },
            {
              path: '/serviceSys/sta',
              component: serviceSys_sta,
              children:[
                {
                  path: '/',
                  component: serviceSys_sta_content,
                },
                {
                  path: '/serviceSys/sta/content',
                  component: serviceSys_sta_content,
                },
                {
                  path: '/serviceSys/sta/data',
                  component: serviceSys_sta_data,
                },
                {
                  path: '/serviceSys/sta/model',
                  component: serviceSys_sta_model,
                },
                {
                  path: '/serviceSys/sta/frame',
                  component: serviceSys_sta_frame,
                },
                {
                  path: '/serviceSys/sta/process',
                  component: serviceSys_sta_process,
                },
                {
                  path: '/serviceSys/sta/contact',
                  component: serviceSys_sta_contact,
                },
                {
                  path: '/serviceSys/sta/add',
                  component: serviceSys_sta_add,
                },
              ]
            },
            {
              path: '/serviceSys/demo',
              component: serviceSys_demo,
              children:[
                {
                  path: '/',
                  component: serviceSys_demo_business,
                },
                {
                  path: '/serviceSys/demo/business',
                  component: serviceSys_demo_business,
                },
                {
                  path: '/serviceSys/demo/process',
                  component: serviceSys_demo_process,
                },
                {
                  path: '/serviceSys/demo/line',
                  component: serviceSys_demo_line,
                },
                {
                  path: '/serviceSys/demo/contact',
                  component: serviceSys_demo_contact,
                },
                {
                  path: '/serviceSys/demo/add',
                  component: serviceSys_demo_add,
                }
              ]
            },
           ]
        },
        {
          path: '/serviceExt',
          component: serviceExt,
          children:[
            {
              path: '/',
              component: serviceExt_search,
            },
            {
              path: '/serviceExt/search',
              component: serviceExt_search,
            },
            {
              path: '/serviceExt/analysis',
              component: serviceExt_analysis,
            },
            {
              path: '/serviceExt/case',
              component: serviceExt_case,
            },
            {
              path: '/serviceExt/chat',
              component: serviceExt_chat,
            },
            {
              path: '/serviceExt/partner',
              component: serviceExt_partner,
            },
            {
              path: '/serviceExt/demo',
              component: serviceExt_demo,
            }
          ]
        },
        {
          path: '/serviceTrain',
          component: serviceTrain,
          children:[
            {
              path: '/',
              component: serviceTrain_introduce,
            },
            {
              path: '/serviceTrain/introduce',
              component: serviceTrain_introduce,
            },
            {
              path: '/serviceTrain/plan',
              component: serviceTrain_plan,
            },
            {
              path: '/serviceTrain/notice',
              component: serviceTrain_notice,
            },
            {
              path: '/serviceTrain/course',
              component: serviceTrain_course,
            }
          ]
        },
        {
          path: '/aboutUs',
          component: aboutUs,
          children:[
            {
              path: '/',
              component: aboutUs_introduce,
            },
            {
              path: '/aboutUs/introduce',
              component: aboutUs_introduce,
            },
            {
              path: '/aboutUs/experts',
              component: aboutUs_experts,
            },
            {
              path: '/aboutUs/copyright',
              component: aboutUs_copyright,
            },
            {
              path: '/aboutUs/standard',
              component: aboutUs_standard,
            },
            {
              path: '/aboutUs/remit',
              component: aboutUs_remit,
            },
            {
              path: '/aboutUs/contact',
              component: aboutUs_contact,
            },
            {
              path: '/aboutUs/qq',
              component: aboutUs_qq,
            },
            {
              path: '/aboutUs/notice',
              component: aboutUs_notice,
            }
          ]
        },
        {
          path: '/help',
          component: help,
          children:[
            {
              path: '/',
              component: help_usebook,
            },
            {
              path: '/help/usebook',
              component: help_usebook,
            },
            {
              path: '/help/question',
              component: help_question,
            }
          ]
        },
        {
          path: '/userCen',
          component: userCen,
          children:[
            {
              path: '/',
              component: userCen_library,
            },
            {
              path: '/userCen/library',
              component: userCen_library,
            },
            {
              path: '/userCen/course',
              component: userCen_course,
            },
            {
              path: '/userCen/apply',
              component: userCen_apply,
            },
            {
              path: '/userCen/account',
              component: userCen_account,
            }
          ]
        },
        {
          path: '/librarySummary',
          component: librarySummary,
        },
        {
          path: '/trainSummary',
          component: trainSummary,
        },
        {
          path: '/caseSummary',
          component: caseSummary,
        },
        {
          path: '/resultSummary',
          component: resultSummary,
        },
        {
          path: '/caseDetail',
          component: caseDetail,
        },
        {
          path: '/newsdetail',
          component: newsdetail,
        }
      ]
    },
    {
      path: '/backstageMan',
      component: backstageMan,
      children:[
        {
          path: '/',
          component: backstageMan_data,
        },
        {
          path: '/backstageMan/info_view',
          component: info,
        },
        {
          path: '/backstageMan/basic_view',
          component: basic,
        },    
        {
          path: '/backstageMan/data',
          component: backstageMan_data,
        },
        {
          path: '/backstageMan/train',
          component:backstageMan_train
        },
        {
          path: '/backstageMan/train_add',
          component:backstageMan_train_add
        },
        {
          path: '/backstageMan/train_edit',
          component:backstageMan_train_edit
        },
        {
          path: '/backstageMan/demoarea',
          component: backstageMan_demoarea,
        },
        {
          path: '/backstageMan/demo_add',
          component:backstageMan_demo_add
        },
        {
          path: '/backstageMan/demo_edit',
          component:backstageMan_demo_edit
        },
        {
          path: '/backstageMan/casemange_add',
          component:backstageMan_casemange_add
        },
        {
          path: '/backstageMan/casemange_edit',
          component:backstageMan_casemange_edit
        },
        {
          path: '/backstageMan/achieve_add',
          component:backstageMan_achieve_add
        },
        {
          path: '/backstageMan/achieve_edit',
          component:backstageMan_achieve_edit
        },
        {
          path: '/backstageMan/application',
          component: backstageMan_application,
        },
        {
          path: '/backstageMan/settle',
          component:backstageMan_settle
        },
        {
          path: '/backstageMan/info',
          component:backstageMan_info
        },
        {
          path: '/backstageMan/basic',
          component:backstageMan_basic
        }
      ]
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/register',
      component: register,
    }
  ]
})
