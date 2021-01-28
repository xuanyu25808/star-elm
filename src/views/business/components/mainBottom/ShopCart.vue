<template>
	<div class="shop-cart-layout" @click="showChange">
		<div class="shop-cart-title">
			<h4 class="shop-cart-title-name">购物车</h4>
			<div class="shop-cart-deleteAll" @click="clearShps">清空</div>
		</div>
		<scroll class="shop-cart-scroll" ref="shopCartScroll">
			<ul class="shop-cart-nav">
				<li class="shop-cart-item" v-for="(item,index) in $store.state.sellFoods" :key="index">
					<div class="shop-cart-item-des">
						<span>{{item.name}}</span>
						<span class="shop-cart-item-price">{{item.price}}</span>
					</div>
					<div class="shop-cart-item-btns">
						<span class="shop-cart-item-btns-remove" @click="goodsRemove(item)"><i class=" icon icon-remove_circle_outline"></i></span>
						<span class="shop-cart-item-count">{{item.count}}</span>
						<span class="shop-cart-item-btns-add" @click="goodsAdd(item)"><i class=" icon icon-add_circle"></i></span>
					</div>
				</li>
			</ul>
		</scroll>
	</div>
</template>

<script>
	import scroll from 'components/scroll/Scroll.vue'
	export default {
		name: 'ShopCart',
		data() {
			return {
				isShow: false
			}
		},
		components: {
			scroll
		},
		methods: {
			// 刷新
			shopCartScrollRefresh() {
				this.$refs.shopCartScroll.refresh();
			},
			// 清空购物车
			clearShps() {
				this.$store.commit('clearSellFoods')
			},
			// 判断是不是在父元素上的点击，若是，则关闭
			showChange(e) {
				// this.isShow = false
				let e1 = e.currentTarget
				let e2 = e.target
				if (e1 === e2) {
					this.$emit('closeShopCart')
				}
			},
			// 增加商品
			goodsAdd(item) {
				this.$store.dispatch('addGoodsChange', item)
			},
			// 删除商品
			goodsRemove(item) {
				this.$store.dispatch('removeGoodsChange', item).then(() => {
					if (this.$store.state.sellFoods.length == 0) {
						setTimeout(() => {
							this.$emit('closeShopCart')
						}, 50)
					}
				})
			}
		},
		watch: {
			isShow: 'shopCartScrollRefresh'
		}
	}
</script>

<style scoped>
	.shop-cart-layout {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(101, 108, 115, .4);
		z-index: 998;
	}

	.shop-cart-scroll {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 100px;
		height: 431px;
		background-color: #fff;
		overflow: hidden;
	}

	.shop-cart-title {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 531px;
		height: 80px;
		background-color: #f3f5f7;
		font-size: 28px;
		color: rgb(7, 17, 27);
		line-height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 36px;
		border-bottom: 3px solid rgba(7, 17, 27, .1);
	}

	.shop-cart-deleteAll {
		font-size: 24px;
		line-height: 80px;
		color: rgb(0, 160, 220);
	}

	.shop-cart-nav {
		padding: 0 36px;
	}

	.shop-cart-item {
		height: 96px;
		background-color: rgb(255, 255, 255);
		font-size: 28px;
		line-height: 48px;
		color: rgb(7, 17, 27);
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}

	.shop-cart-item-des {
		display: flex;
		justify-content: space-between;
		margin-right: 28px;
		flex: 1;
	}

	.shop-cart-item-price {
		font-weight: bold;
		font-size: 32px;
		color: rgb(240, 20, 20);
		line-height: 48px;
	}

	.shop-cart-item-btns {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 5px;
	}

	.shop-cart-item-btns-remove,
	.shop-cart-item-count,
	.shop-cart-item-btns-add {
		display: inline-block;
	}

	.shop-cart-item-count {
		font-size: 20px;
		color: rgb(147, 153, 159);
		padding: 0 24px;
		position: relative;
		top: -3px;
	}

	.icon {
		font-size: 48px;
		color: rgb(0, 160, 220);
	}
</style>
