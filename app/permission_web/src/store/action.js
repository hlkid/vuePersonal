//import ajax from '../config/ajax'

export default {
	//直接改变state中字段(保存在msg中)
	stateChangae({ commit, state }, msg) {
		commit('STATE_CHANGE', msg);
	},
}