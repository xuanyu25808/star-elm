<template>
	<div class="rate-layout">
		<scroll class="rate-scroll" ref="rateScroll">
			<div class="rate-title-score">
				<div class="rate-title-left">
					<h4 class="rate-title-left-score">{{sellerData.score}}</h4>
					<span class="rate-title-left-text">综合评分</span>
					<p class="rate-title-left-des">高于周边商家{{sellerData.rankRate}}</p>
				</div>
				<div class="rate-title-right">
					<ul class="rate-title-right-nav">
						<li class="rate-title-right-item">
							<span class="rate-title-right-service">服务满意度</span>
							<span class="rate-title-right-score">{{sellerData.serviceScore}}</span>
						</li>
						<li class="rate-title-right-item">
							<span class="rate-title-right-service">食物满意度</span>
							<span class="rate-title-right-score">{{sellerData.foodScore}}</span>
						</li>
						<li class="rate-title-right-item">
							<span class="rate-title-right-service">送达时间</span>
							<span class="rate-title-right-time">{{sellerData.deliveryTime}}分钟</span>
						</li>
					</ul>
				</div>
			</div>
			<ul class="rate-selected-nav">
				<li @click="changeData(index)" class="rate-selected-item" :class="[initTitle(index),{'showBolder':index === currentIIndex}]"
				 v-for="(menu,index) in title">{{menu}}</li>
			</ul>
			<div class="rate-content">
				<div @click="onlyChange" :class="{'circle-active':isOnly}" class="rate-cricle">√</div>
				<p class="rate-content-p">只看有内容的评价</p>
			</div>
			<ul class="rate-rating-nav">
				<li class="rate-rating-item" v-for="item in currentData">
					<div class="rate-user-msg">
						<div class="rate-user-imgBox">
							<img :src="item.avatar" class="rate-user-img">
						</div>
						<div class="rate-rating-item-center">
							<p class="rate-rating-user-name">
								<span>{{item.username}}</span>
								<span>{{item.rateTime | calTime}}</span>
							</p>
							<p v-if="item.deliveryTime" class="rate-rating-user-time">{{item.deliveryTime}}分钟送达</p>
						</div>
					</div>
					<p class="rate-user-content">
						{{item.text}}
					</p>
					<ul class="rate-user-eatFoods-nav">
						<li class="rate-user-atFoods-item" v-for="foods in item.recommend">
							{{foods}}
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
	</div>
</template>

<script>
	import {
		formatDate
	} from 'common/utils.js'
	import {
		getSellerDate,
		getRateDate,
	} from 'network/pageData.js'

	import Scroll from 'components/scroll/Scroll.vue'
	export default {
		name: 'Rate',
		data() {
			return {
				currentIIndex: 0,
				isOnly: false,
				title: ['全部', '满意', '不满意'],
				sellerData: {},
				currentData: [],

				rateData: [],
				satisfiedData: [],
				dissSatisfiedData: [],
				allHaveData: [],
				satisfiedHave: [],
				dissSatisfiedHave: []
			}
		},
		components: {
			Scroll
		},
		computed: {
			initTitle() {
				return function(index) {
					return `rate-selected-item${index}`
				}
			}
		},
		filters: {
			calTime(value) {
				let time = new Date(value)
				return formatDate(time, 'yyyy-MM-dd hh:mm')
			}
		},
		methods: {
			// 刷新
			pageRefresh() {
				this.$refs.rateScroll.refresh()
				this.$nextTick(() => {
					this.$refs.rateScroll.refresh()
				})
			},
			// 改变显示的数据
			changeData(index) {
				this.currentIIndex = index
				switch (index) {
					case 0:
						this.currentData = this.rateData;
						break;
					case 1:
						this.currentData = this.satisfiedData;
						break;
					case 2:
						this.currentData = this.dissSatisfiedData;
						break;
				}
				this.isOnly = false;
				this.pageRefresh();

			},
			onlyChange() {
				this.isOnly = !this.isOnly;
				switch (this.currentIIndex) {
					case 0:
						if (this.isOnly) {
							this.currentData = this.allHaveData;
						} else {
							this.currentData = this.rateData;
						}
						break;
					case 1:
						if (this.isOnly) {
							this.currentData = this.satisfiedHave;
						} else {
							this.currentData = this.satisfiedData;
						}
						break;
					case 2:
						if (this.isOnly) {
							this.currentData = this.dissSatisfiedHave;
						} else {
							this.currentData = this.dissSatisfiedData;
						}
						break;
				}
				this.pageRefresh();
			}

		},
		created() {
			getSellerDate().then(res => {
					this.sellerData = res.data.seller
				}),
				// 获取评价信息
				getRateDate().then(res => {
					// 全部的数据
					this.rateData = res.data.ratings
					// 默认显示全部的数据
					this.currentData = this.rateData

					let tempSatisfied = []
					let tempdisstempSatisfied = []
					// 筛选数据
					for (let i of this.rateData) {
						if (i.score >= 3) {
							tempSatisfied.push(i)
						} else {
							tempdisstempSatisfied.push(i)
						}
					}
					// 满意的数据
					this.satisfiedData = tempSatisfied
					//不满意的数据
					this.dissSatisfiedData = tempdisstempSatisfied

					//全部有内容
					let allHave = this.rateData.filter(n => n.text.length !== 0)
					this.allHaveData = allHave
					//满意有内容
					let satisfiedHave = this.satisfiedData.filter(n => n.text.length !== 0)
					this.satisfiedHave = satisfiedHave
					//不满意有内容
					let disSatisfiedHave = this.dissSatisfiedData.filter(n => n.text.length !== 0)
					this.dissSatisfiedHave = disSatisfiedHave
				})

			//不满意的信息
			// 有内容的信息
		},
		activated() {
			this.pageRefresh()
		},
		watch: {
			rateData: 'pageRefresh'
		}
	}
</script>

<style scoped>
	.rate-scroll {
		position: absolute;
		top: 348px;
		left: 0;
		right: 0;
		bottom: 100px;
		overflow: hidden;
	}

	.rate-title-score {
		padding: 36px 48px;
		display: flex;
		border-top: 2px solid rgb(236, 237, 237);
		border-bottom: 2px solid rgb(236, 237, 237);
	}

	.rate-title-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 48px 0 20px;
		border-right: 2px solid rgb(236, 237, 237);
	}

	.rate-title-left-score {
		font-size: 48px;
		color: rgb(255, 153, 0);
		line-height: 56px;
		margin-bottom: 12px;
		font-weight: bold;
	}

	.rate-title-left-text {
		font-size: 24px;
		color: rgb(7, 17, 27);
		line-height: 24px;
		margin-bottom: 16px;
		font-weight: bold;
	}

	.rate-title-left-des {
		font-size: 20px;
		color: rgb(166, 171, 176);
		line-height: 20px;
	}

	.rate-title-right {
		flex: 1;
		margin-left: 48px;
		border-left: 1px solid rgb(236, 237, 237);
	}

	.rate-title-right-nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.rate-title-right-item {
		margin-top: 8px;
		margin-bottom: 16px;
		font-size: 24px;
		color: rgb(7, 17, 27);
		line-height: 36px;
	}

	.rate-title-right-service {
		margin-right: 24px;
	}

	.rate-title-right-score {
		font-size: 24px;
		line-height: 36px;
		color: rgb(255, 153, 0);
	}

	.rate-title-right-time {
		font-size: 24px;
		line-height: 36px;
		color: rgb(147, 153, 159);
	}

	.rate-selected-nav {
		border-top: 36px solid rgb(243, 245, 247);
		display: flex;
		padding: 36px 0;
	}

	.rate-selected-item {
		width: 100px;
		height: 40px;
		font-size: 32px;
		padding: 15px 25px;
		line-height: 40px;
		text-align: center;
		color: black;
		margin-right: 30px;
	}

	.rate-selected-item0 {
		background-color: rgb(0, 160, 220);
		color: white;
		margin-left: 30px;
	}

	.rate-selected-item1 {
		background-color: rgb(204, 236, 248);
		color: rgb(92, 104, 112);
	}

	.rate-selected-item2 {
		background-color: rgb(233, 235, 236);
		color: rgb(84, 91, 99);
	}

	.rate-content {
		padding: 36px 0;
		margin: 0 48px;
		border-top: 2px solid rgb(231, 232, 233);
		display: flex;
		align-items: center;
	}

	.rate-cricle {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: rgb(183, 187, 191);
		color: white;
		margin-right: 20px;
		line-height: 30px;
		text-align: center;
	}

	.rate-content-p {
		font-size: 26px;
		line-height: 26px;
		color: rgb(163, 167, 172);
	}

	.rate-rating-nav {
		border-top: 2px solid rgb(243, 245, 247);
	}

	.rate-rating-item {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin: 36px;
		border-bottom: 1px solid rgb(233, 234, 235);
	}

	.rate-user-msg {
		margin-bottom: 12px;
		display: flex;
	}

	.rate-user-imgBox {
		width: 56px;
		height: 56px;
		margin-right: 24px;
	}

	.rate-user-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.rate-rating-item-center {
		flex: 1;
	}

	.rate-rating-user-name {
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		line-height: 24px;
		color: rgb(7, 17, 27);
		margin-bottom: 12px;
	}

	.rate-rating-user-name span {
		display: block;
	}

	.rate-rating-user-time {
		font-size: 20px;
		color: rgb(147, 153, 159);
		line-height: 24px;
		font-weight: 200;
		margin-bottom: 12px;
	}

	.rate-user-content {
		font-size: 24px;
		color: rgb(7, 17, 27);
		line-height: 36px;
		margin-bottom: 16px;
		margin-left: 80px;
		font-weight: 700;
	}

	.rate-user-eatFoods-nav {
		margin-top: 16px;
		margin-left: 80px;
		display: flex;
	}

	.rate-user-atFoods-item {
		width: 100px;
		height: 30px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 16px;
		border: 2px solid rgb(243, 243, 244);
		padding-bottom: 20px;
	}

	.showBolder {
		box-shadow: 0 5px 2px gold;
	}

	.circle-active {
		background-color: rgb(0, 160, 220);
	}
</style>
