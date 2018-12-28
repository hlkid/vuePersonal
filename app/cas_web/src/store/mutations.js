const STATE_CHANGE = 'STATE_CHANGE'
export default {
	[STATE_CHANGE](state, msg) {
		if (state.hasOwnProperty(msg.key) ){
			state[msg.key] = msg.value;
		}else{
			alert("state中不包含这个字段");
		}
	},
}