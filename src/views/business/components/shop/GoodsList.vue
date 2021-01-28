<template>
	<scroll class="goodsList-layout" ref="goodsListScroll" :probeType='3' @scroll="scrollChange">
		<ul class="goodsList-nav">
			<li :ref="'itemHeight'+type" class="goodsList-item" v-for="(item,type) in goodsData" :key="type">
				<h3 class="goodsList-item-title">{{item.name}}</h3>
				<a class="goodsList-item-link" v-for="(foods,index) in item.foods" :key="index">
					<img @click="toDetail(foods)" class="goodsList-foods-img" :src="foods.image" alt="">
					<div @click="toDetail(foods)" class="goodsList-foods-content">
						<h4 class="goodsList-foods-title">{{foods.name}}</h4>
						<span class="goodsList-foods-des">{{foods.description}}</span>
						<p class="goodsList-foods-sale">
							月售{{foods.sellCount}}份&nbsp;好评率{{foods.rating}}%
						</p>
						<div class="goodsList-foods-buy">
							<p class="goodsList-foods-money">
								<span class="goodsList-foods-money-price">￥{{foods.price}}</span>
								<span v-if="foods.oldPrice" class="goodsList-foods-money-oldprice">￥{{foods.oldPrice}}</span>
							</p>
						</div>
					</div>
					<div class="goodsList-right-btns">
						<span :class="{'goodsList-btns-remove-active':foods.count>=1}" ref="goodsListBtnsRemove" @click="goodsRemove(foods)"
						 class="goodsList-btns-remove"><i class=" icon icon-remove_circle_outline"></i></span>
						<span v-show="foods.count>=1" class="goodsList-goods-count">{{foods.count}}</span>
						<span @click="goodsAdd(foods)" class="goodsList-btns-add"><i class=" icon icon-add_circle"></i></span>
					</div>
				</a>
			</li>
		</ul>
	</scroll>
</template>

<script>
	import scroll from 'components/scroll/Scroll.vue'
	export default {
		name: 'GoodsList',
		components: {
			scroll
		},
		data() {
			return {
				itemTop: [],
				currentIndex: 0,
				titleIndex: 0
			}
		},
		props: {
			goodsData: {
				type: Array,
				default () {
					return {}
				}
			}
		},
		methods: {
			// 判断当前的高度和数组高度做对比，返回当前需要的index值
			scrollChange(position) {
				let positionY = -(position.y)
				// console.log(positionY);
				let itemTop = this.itemTop
				for (let i = 0; i < itemTop.length - 1; i++) {
					if (this.currentIndex != i && (positionY >= itemTop[i] && positionY < itemTop[i + 1])) {
						this.currentIndex = i
						this.$emit('getItemIndex', this.currentIndex)
					}
				}
			},
			// 滑动页面
			changeTop() {
				console.log(this.currentIndex);
				this.$refs.goodsListScroll.scrollTo(0, -this.itemTop[this.titleIndex], 0)
				this.currentIndex = this.titleIndex
			},
			// 增加元素
			goodsAdd(foods) {
				
				this.$store.dispatch('addGoodsChange', foods).then(res => {
					for (let i of this.goodsData) {
						for (let j of i.foods) {
							if (res.name == j.name) {
								this.$set(j,'count',res.count)
							}
						}
					}
				})
			},
			// 删除元素
			goodsRemove(foods) {
				this.$store.dispatch('removeGoodsChange', foods).then(res => {
					for (let i of this.goodsData) {
						for (let j of i.foods) {
							if (res.name == j.name) {
								this.$set(j,'count',res.count)
								// j.count = res.count
							}
						}
					}
				})
			},
			// 等页面数据加载完成后，刷新一下页面，撑出滚动条
			change() {
				this.$nextTick(() => {
					this.$refs.goodsListScroll.refresh()

					// 获取item的高度
					for (let i in this.goodsData) {
						let top = this.$refs['itemHeight' + i][0].offsetTop;
						this.itemTop.push(top)
					}
					// 传入一个最大值
					this.itemTop.push(Number.MAX_VALUE)
				})
			},
			// 跳转到详情页
			toDetail(foods) {
				this.$router.push({
					path:'/detail',
					query:{
						'foods':foods
					}
				})
			}
		},
		watch: {
			goodsData: 'change',
			titleIndex: 'changeTop',
			
		}
	}
</script>

<style scoped>
	.goodsList-layout {
		position: absolute;
		right: 0;
		left: 160px;
		bottom: 100px;
		top: 348px;
		overflow: hidden;
	}

	.goodsList-nav {
		width: 100%;
		height: 100%;
	}

	.goodsList-item-title {
		height: 52px;
		background-color: rgb(243, 245, 247);
		color: rgb(179, 184, 188);
		font-size: 24px;
		line-height: 52px;
		padding-left: 18px;
		border-left: 10px solid rgb(217, 221, 225);
	}

	.goodsList-item-link {
		display: flex;
		padding: 36px;
		border-bottom: 2px solid rgba(7, 17, 27, .1);
		position: relative;
	}

	.goodsList-foods-img {
		width: 105px;
		height: 105px;
	}

	.goodsList-foods-content {
		margin-left: 20px;
		position: relative;
	}

	.goodsList-foods-title {
		font-size: 28px;
		line-height: 28px;
		color: rgb(7, 17, 27);
		font-weight: bold;
		margin-bottom: 16px;
	}

	.goodsList-foods-des {
		font-size: 20px;
		line-height: 25px;
		color: rgba(147, 153, 159);
		display: block;
		padding-right: 50px;
	}

	.goodsList-foods-sale {
		margin: 16px 0;
		font-size: 20px;
		line-height: 20px;
		color: rgba(147, 153, 159);
	}

	.goodsList-foods-buy {
		margin-top: 16px;
		display: flex;
		justify-content: space-between;
		font-size: 26px;
		font-weight: 700;
		line-height: 40px;
		align-items: center;
	}

	.goodsList-foods-money {
		font-weight: 700;
	}

	.goodsList-foods-money-price,
	.goodsList-foods-money-oldprice {
		font-weight: 700;
		position: relative;
	}

	.goodsList-foods-money-price {
		top: -2px;
		left: -4px;
		color: red;
		margin-right: 12px;
		font-size: 32px;
	}

	.goodsList-foods-money-oldprice {
		top: -2px;
		left: 0px;
		text-decoration: line-through;
	}

	.icon {
		font-size: 48px;
		line-height: 48px;
		color: rgb(0, 160, 220);
	}

	.goodsList-goods-count {
		position: absolute;
		right: 52px;
		bottom: 0;
		font-size: 26px;
		line-height: 40px;
		color: rgb(147, 153, 159);
		display: inline-block;
		width: 48px;
		text-align: center;
		position: relative;
		top: -4px;
	}

	.goodsList-btns-add {
		position: absolute;
		z-index: 900;
		right: 0px;
		bottom: 0;
	}

	.goodsList-btns-remove {
		position: absolute;
		right: 0px;
		bottom: 0;
		transform: rotate(0);
		opacity: 0;
		transition: all .5s linear 0s;
	}

	.goodsList-btns-remove-active {
		right: 100px;
		bottom: 0px;
		opacity: 1;
		transform: rotate(180deg);
	}

	.goodsList-right-btns {
		position: absolute;
		right: 42px;
		bottom: 42px;
	}
</style>
