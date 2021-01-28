<template>
	<div>
		<tabbar class="business-tabbar" :tabbar-init-date="tabbarInitDate" @click.native="handerClick" />
		<shop-cart v-show="isShowCart" ref="shopCart" @closeShopCart="isShowCart=false" />
	</div>
</template>

<script>
	import {
		getSellerDate,
		TabbarInitDate,
	} from 'network/pageData.js'
	import ShopCart from './ShopCart.vue'
	import Tabbar from './Tabbar.vue'
	export default {
		name:'MainBottom',
		components: {
			ShopCart,
			Tabbar,
		},
		data(){
			return {
				tabbarInitDate: {},
				titleIndex: 0,
				isShowCart: false,
			}
		},
		created() {
			this.$bus.$on('goodsListData',res=>{
				this.goodsData = res
			})
			//获取商家信息
			getSellerDate().then(res => {
				this.sellerData = res.data.seller
				// 购物车初始数据
				this.tabbarInitDate = new TabbarInitDate(this.sellerData)
			})
		},
		methods: {
			handerClick() {
				if (this.$store.state.sellFoods.length !== 0) {
					this.isShowCart = !this.isShowCart
					this.$refs.shopCart.isShow = !this.$refs.shopCart.isShow;
				} else {
					this.isShowCart = false
					this.$refs.shopCart.isShow = false
				}
			},
		}
	}
</script>

<style scoped>

</style>