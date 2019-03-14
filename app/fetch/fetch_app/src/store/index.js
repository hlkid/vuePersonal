import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
//import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	//公用数据
	news_url:"http://10.147.87.80:8080/newsServices",//访问后台地址，开发环境
	news_url:"http://218.22.18.194:8023/newsServices",//访问后台地址，开发环境
	
	permison_url:"http://10.147.87.80:8080/permisonServices",//访问后台地址，开发环境
	permison_url:"http://218.22.18.194:8023/permisonServices",//访问后台地址，开发环境
	
	hostUrl:"http://10.147.87.80:8080/Services",//cas农业项目路径开发环境
	hostUrl:"http://218.22.18.194:8023/Services",//cas农业项目路径开发环境
	
	host:"http://10.147.87.80:8080/",//服务器地址
	host:"http://218.22.18.194:8023/",//服务器地址

	ifLogin:false,//是否登录

	localSeat:"",//当前位置
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})