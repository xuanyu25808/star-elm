import axios from 'axios'

export function request(config){
	const instance = axios.create({
		baseURL:'https://www.fastmock.site/mock/6f2e02ba0321171eabfc238a149738cb/stare'
	})
	
	return instance(config)
}
