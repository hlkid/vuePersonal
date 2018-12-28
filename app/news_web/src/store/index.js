import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
//import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	//公用数据
	hostUrl:"http://10.147.87.80:8080/newsServices",//访问后台地址，开发环境
	//hostUrl:"http://192.168.8.185/newsServices",//访问后台地址，开发环境

	baseUrl:"/",//基础地址,开发
	//baseUrl:"/newsServices/",//基础地址,部署

	//新闻列表——已选择展开的列表
	treeArr:[]
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})