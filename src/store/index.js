import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sellFoods: []
	},
	mutations: {
		//增加商品
		increaseFoods(state, payload) {
			state.sellFoods.push(payload)
		},
		//增加商品数量
		increaseFoodsCount(state, payload) {
			payload.count++;
		},
		//删除商品
		deleteFoods(state, payload) {
			let key = state.sellFoods.indexOf(payload)
			state.sellFoods.splice(key, 1)
		},
		//删除商品数量
		deleteFoodsCount(state, payload) {
			payload.count--;
		},
		// 清空商品
		clearSellFoods(state){
			for (let i of state.sellFoods) {
				i.count = 0
			}
			state.sellFoods.splice(0,state.sellFoods.length)
		}
	},
	actions: {
		// 增加商品
		addGoodsChange(context, payload) {
			return new Promise((resolve)=>{
				let oldGoods = {}
				// 判断数组中是否有这个商品
				for (let i of context.state.sellFoods) {
					// 找到有相同的
					if (i.name === payload.name) {
						oldGoods = i;
						payload = i;
						break;
					}
				}
				if (Object.keys(oldGoods).length == 0) {
					payload.count = 1
					context.commit('increaseFoods', payload)
					resolve(payload)
					// resolve(payload.count)
				} else {
					context.commit('increaseFoodsCount', payload)
					// payload = oldGoods
					// resolve(oldGoods.count++)
					resolve(payload)
				}
			})
		},
		// 删除商品
		removeGoodsChange(context, payload) {
			return new Promise(resolve=>{
				// let oldGoods = {}
				// // 判断数组中是否有这个商品
				// for (let i of context.state.sellFoods) {
				// 	// 找到有相同的
				// 	if (i.name === payload.name) {
				// 		oldGoods = i;
				// 		break;
				// 	}
				// }
				if (payload.count == 1) {
					context.commit('deleteFoods', payload)
					payload.count = 0
					resolve(payload)
				} else {
					context.commit('deleteFoodsCount', payload)
					resolve(payload)
				}
			})

		}
	},
	modules: {}
})
