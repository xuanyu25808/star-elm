import {request} from './request.js'

export function getRateDate(){
	return request({
		url:'/api/rate'
	})
}

export function getGoodsDate(){
	return request({
		url:'/api/goods'
	})
}

export function getSellerDate(){
	return request({
		url:'/api/seller'
	})
}

// 购物车初始数据
export class TabbarInitDate{
	constructor(sellerData) {
	    this.deliveryPrice = sellerData.deliveryPrice
			this.minPrice = sellerData.minPrice
	}
}