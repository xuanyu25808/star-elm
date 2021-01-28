<template>
	<div class="main-shop">
		<title-menu :goods-data="goodsData" @getTitleIndex="getTitleIndex" ref="titleMenu" />
		<goods-list :goods-data="goodsData" @getItemIndex="getItemIndex" ref="goodsList" />
	</div>
</template>

<script>
	
	import {
		getSellerDate,
		getGoodsDate,
	} from 'network/pageData.js'
	
	import GoodsList from './GoodsList.vue'
	import TitleMenu from './TitleMenu.vue'
	export default {
		name: 'MainShop',
		components: {
			GoodsList,
			TitleMenu
		},
		data() {
			return {
				sellerData: [],
				goodsData: []
			}
		},
		created() {
			//获取商家信息
			getSellerDate().then(res => {
				this.sellerData = res.data.seller
			})
			//获取商品列表信息
			getGoodsDate().then(res => {
				let temp = res.data.goods
				//给每一项加上count属性
				for (let i of temp) {
					for (let j of i.foods) {
						j.count = 0
					}
				}
				this.goodsData = temp
				
				this.$bus.$emit('goodsListData',this.goodsData)
				
			})
		},
		methods: {
			getItemIndex(index) {
				this.titleIndex = index
				this.$refs.titleMenu.currentIndex = index
			},
			getTitleIndex(index) {
				this.titleIndex = index
				this.$refs.goodsList.titleIndex = index
			},

		}
	}
</script>

<style scoped>

</style>
