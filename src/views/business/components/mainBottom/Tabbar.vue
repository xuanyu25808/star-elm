<template>
	<div class="tabbar">
		<div class="tabbar-imgBox" :class="{'tabbar-imgBox-active':totalCount}">
			<i class="icon-shopping_cart" ></i>
			<div class="cart-cricle" v-show="totalCount">{{totalCount}}</div>
		</div>
		<p class="tabbar-money">
			￥<span class="tabbar-money-price" :class="{'tabbar-money-price-active':totalCount}">{{totalMoney}}</span>
		</p>
		<p class="tabbar-diliver">
			另需配送费￥<span class="tabbar-diliver-price">{{tabbarInitDate.deliveryPrice}}</span>元
		</p>
		<div @click.stop="calculateClick" class="tabbar-right" :class="totalClass">
			<span :class="totalClass" >{{totalContent}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Tabbar',
		props:{
			tabbarInitDate:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		computed:{
			// 最终的钱
			totalMoney(){
				let money = 0;
				for (let i of this.$store.state.sellFoods) {
					money += i.price * i.count
				}
				return money
			},
			// 有多少商品
			totalCount(){
				let count = 0;
				for (let i of this.$store.state.sellFoods) {
					count +=  i.count
				}
				return count
			},
			// 右侧显示是否起送
			totalContent(){
				let minPrice = this.tabbarInitDate.minPrice
				let money = this.totalMoney
				if (money === 0) {
					return `￥${minPrice}起送`
				}else if(money>0 && money<minPrice){
					return `还差￥${minPrice-money}起送`
				}else{
					return `去计算`
				}
			},
			totalClass(){
				let minPrice = this.tabbarInitDate.minPrice
				let money = this.totalMoney
				if (money >= minPrice) {
					return 'tabbar-right-price-active'
				}else{
					return 'tabbar-right-price'
				}
			}
		},
		methods:{
			calculateClick(){
				let minPrice = this.tabbarInitDate.minPrice
				let money = this.totalMoney
				if (money<minPrice) return
				this.$toast.show('去计算啦')
			}
		}

	}
</script>

<style scoped>
	.tabbar{
		height: 100px;
		background-color: #141d27;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		color: rgba(255,255,255,.4);
		align-items: center;
		z-index: 999;
	}
	.tabbar-imgBox{
		width: 88px;
		height: 88px;
		border-radius: 50%;
		background-color: rgb(40, 49, 57);
		font-size: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin:0 36px 16px 36px;
		margin-bottom: 16px;
		border: 12px solid #141d27;
		z-index: 999;
		position: relative;
	}
	.tabbar-imgBox-active{
		background-color: rgb(0, 160, 220);
	}
	.tabbar-imgBox-active .icon-shopping_cart{
		color: white;
	}
	.cart-cricle{
		position: absolute;
		top: -10px;
		right: -4px;
		background-color: red;
		padding: 6px 10px;
		border-radius: 20px;
		font-size: 20px;
		color: rgb(252, 253, 252);
	}
	.tabbar-money{
		font-size: 32px;
		color: rgba(255,255,255,.4);
		padding-right: 24px;
		border-right: 1px solid rgba(255,255,255,.4);
		font-weight: bold;
		line-height: 48px;
	}
	.tabbar-money-price{
		font-weight: bold;
	}
	.tabbar-money-price-active{
		color: rgb(252, 253, 252);
	}
	.tabbar-diliver{
		margin-left: 24px;
		font-size: 28px;
	}
	.tabbar-right{
		width: 210px;
		height: 100%;
		position: absolute;
		right: 0;
		font-size: 32px;
		font-weight: bold;
		line-height: 100px;
		text-align: center;
		background-color: rgb(40, 49, 57);
	}
	.tabbar-right-price{
		display: inline-block;
		font-weight: bold;
	}
	.tabbar-right-price-active{
		background-color: rgb(0, 160, 220);
		color: rgb(252, 253, 252);
	}
</style>