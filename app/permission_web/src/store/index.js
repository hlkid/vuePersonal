import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
//import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	//公用数据
	hostUrl:"http://10.147.87.80:8080/permisonServices",//访问后台地址，开发环境
	//hostUrl:"http://192.168.8.185/permisonServices",//访问后台地址，开发环境
	
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})