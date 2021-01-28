<template>
	<div class="sell-layout">
		<scroll class="sell-scroll" ref="sellScroll" >
			<div class="sell-top">
				<h3 class="sell-title">{{sellerData.name}}</h3>
				<p class="sell-shop-count">月售690单</p>
				<div class="sell-heart-icon">
					<span class="sell-heart-icon-img">❤</span>
					<span>收藏</span>
				</div>
				<ul class="sell-top-nav">
					<li class="sell-top-nav-item">
						<span class="sell-top-nav-item-name">起送价</span>
						<span class="sell-top-nav-item-num">{{sellerData.minPrice}}元</span>
					</li>
					<li class="sell-top-nav-item">
						<span class="sell-top-nav-item-name">商家配送</span>
						<span class="sell-top-nav-item-num">{{sellerData.deliveryPrice}}元</span>
					</li>
					<li class="sell-top-nav-item">
						<span class="sell-top-nav-item-name">平均配送事件</span>
						<span class="sell-top-nav-item-num">{{sellerData.deliveryTime}}元</span>
					</li>
				</ul>
			</div>
			<div class="sell-content">
				<span class="sell-content-title">公告和活动</span>
				<p class="sell-content-text">{{sellerData.bulletin}}</p>
			</div>
			<ul class="sell-discount-nav">
				<li v-for="item in sellerData.supports" class="sell-discount-nav-item">{{item.description}}</li>
			</ul>
			<div class="sell-img-box">
				<span class="sell-img-title">商家实景</span>
				<ul class="sell-img-nav">
					<li class="sell-img-nav-item" v-for="item in sellerData.pics">
						<img class="sell-img-nav-item-img" :src="item" alt="" @load="imgLoad">
					</li>
				</ul>
			</div>
			<div class="sell-shop-msg">
				<span class="sell-img-title">商家信息</span>
				<ul class="sell-shop-nav">
					<li class="sell-shop-item" v-for="item in sellerData.infos">
						{{item}}
					</li>
				</ul>
			</div>
		</scroll>
	</div>
</template>

<script>
	import scroll from 'components/scroll/Scroll.vue'
	import {
		getSellerDate,
	} from 'network/pageData.js'
	export default {
		name: 'Sell',
		components: {
			scroll
		},
		data() {
			return {
				sellerData: {},
			}
		},
		created() {
			//获取商家信息
			getSellerDate().then(res => {
				this.sellerData = res.data.seller
				console.log(this.sellerData);
			})
		},
		activated() {
			this.scrollRefresh()
		},
		methods:{
			scrollRefresh(){
				this.$refs.sellScroll.refresh()
				this.$nextTick(()=>{
					this.$refs.sellScroll.refresh()
				})
			},
			imgLoad(){
				this.scrollRefresh()
			}
		},
		watch:{
			sellerData:'scrollRefresh'
		}
	}
</script>

<style scoped>
	.sell-scroll{
		position: absolute;
		top: 384px;
		left: 0;
		right: 0;
		bottom: 100px;
		overflow: hidden;
	}
	.sell-top {
		margin: 36px;
		padding-bottom: 30px;
		position: relative;
		border-bottom: 50px solid rgb(243, 245, 247);
	}

	.sell-title {
		font-size: 32px;
		line-height: 32px;
		color: rgb(7, 17, 27);
		margin-bottom: 26px;
	}

	.sell-shop-count {
		font-size: 26px;
		line-height: 30px;
		color: rgb(136, 141, 146);
		margin-bottom: 36px;
		height: 30px;
	}

	.sell-heart-icon {
		position: absolute;
		right: 30px;
		top: 15px;
		font-size: 30px;
		line-height: 30px;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.sell-heart-icon-img {
		margin-bottom: 16px;
		font-size: 50px;
	}

	.sell-top-nav {
		padding: 36px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sell-top-nav-item {
		flex: 1;
		text-align: center;
		border-right: 20px solid rgb(243, 245, 247);
		display: flex;
		flex-direction: column;
	}

	.sell-top-nav-item:last-child {
		border-right: none;
	}

	.sell-top-nav-item-name {
		font-size: 24px;
		color: rgb(179, 183, 187);
		line-height: 24px;
		margin-bottom: 40px;
	}

	.sell-top-nav-item-num {
		font-weight: 700;
		font-size: 50px;
		line-height: 28px;
		color: rgb(7, 17, 27);
	}

	.sell-content {
		padding: 36px;
		border-bottom: 3px solid rgb(244, 245, 245);
	}

	.sell-content-title {
		font-size: 32px;
		line-height: 32px;
		color: rgb(7, 17, 27);
		margin-bottom: 26px;
		display: inline-block;
		font-weight: 700;
	}

	.sell-content-text {
		font-size: 28px;
		font-weight: 200;
		line-height: 50px;
		color: rgb(246, 144, 144);
		margin-left: 24px;
		margin-right: 24px;
	}
	
	.sell-discount-nav{
	}
	.sell-discount-nav-item{
		padding: 32px 24px;
		font-size: 24px;
		font-weight: 700;
		line-height: 20px;
		color: rgb(141, 143, 147);
		margin-left: 20px;
		border-bottom: 3px solid rgb(244, 245, 245);
	}
	.sell-img-box{
		border-top: 50px solid rgb(243, 245, 247);
		padding: 36px;
		border-bottom: 50px solid rgb(243, 245, 247);
	}
	.sell-img-title{
		font-size: 32px;
		line-height: 32px;
		color: rgb(7, 17, 27);
		font-weight: 700;
		margin-bottom: 26px;
		display: inline-block;
	}
	.sell-img-nav{
		display: flex;
	}
	.sell-img-nav-item{
		flex: 1;
		margin-right: 12px;
	}
	.sell-img-nav-item:last-child{
		margin-right: 0;
	}
	.sell-img-nav-item-img{
		width: 100%;
		height: 100%;
	}
	.sell-shop-msg{
		padding: 36px;
	}
	.sell-shop-nav{
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.sell-shop-item{
		padding: 32px;
		font-size: 24px;
		line-height: 32px;
		font-weight: 700;
		color: rgb(115, 119, 125);
		border-top: 4px solid rgb(244, 245, 245);
	}
</style>
