<template>
	<div class="detail-layout">
		<div class="detail-goback" @click="goback">&lt;</div>
		<scroll class="detail-scroll" ref="detailScroll">
			<div class="detail-title-ImgBox">
				<img :src="foodsData.image" class="detail-title-ImgBox">
			</div>
			<div class="detail-foods-des">
				<h5 class="detail-foods-name" >{{foodsData.name}}</h5>
				<p class="detail-foods-sale">
					<span class="detail-foods-sale-count">月售{{foodsData.sellCount}}份</span>
					<span>好评率{{foodsData.rating}}%</span>
				</p> 
				<span class="detail-foods-price">￥{{foodsData.price}}元</span>
				<div @click="addFoods()" class="detail-join-cart">加入购物车</div>
			</div>
			<div class="detail-content">
				<h4 v-if="foodsData.info" class="detail-content-title" >商品介绍</h4>
				<p v-if="foodsData.info" class="detail-content-text" >
					{{foodsData.info}}
				</p>
			</div>
			<div class="detail-user-rate">
				<h4 class="detail-rate-title">商品评价</h4>
				<ul class="detail-rate-title-nav">
					<li class="detail-rate-title-item" v-for="item in foodsData.ratings">
						<div class="detail-rate-msg">
							<div class="detail-rate-msg-text">
								<span class="detail-rate-msg-time">{{item.rateTime | calTime}}</span>
								<span class="detail-rate-msg-name" >{{item.username}}</span>
							</div>
							<div class="detail-rate-msg-imgBox">
								<img :src="item.avatar" class="detail-rate-msg-img">
							</div>
						</div>
						<p v-if="item.text" class="detail-user-rate-content">{{item.text}}</p>
					</li>
				</ul>
			</div>
		</scroll>
	</div>
</template>

<script>
	import scroll from 'components/scroll/Scroll.vue'
	import {formatDate} from 'common/utils.js'
	export default {
		name:'Detail',
		data(){
			return{
				foodsData:{},
			}
		},
		components:{
			scroll
		},
		activated() {
			this.foodsData = this.$route.query.foods
		},
		filters:{
			calTime(value){
				let time = new Date(value)
				return formatDate(time,'yyyy MM dd hh:mm')
			}
		},
		methods:{
			addFoods(){
				this.$toast.show('请前往商品列表添加商品，谢谢❤')
			},
			scrollRefresh(){
				this.$refs.detailScroll.refresh()
				this.$nextTick(()=>{
					this.$refs.detailScroll.refresh()
				})
			},
			goback(){
				// 关掉
				this.$bus.$emit('dellNotify','notify')
				history.back()
			}
		},
		watch:{
			foodsData:'scrollRefresh'
		}
	}
</script>

<style scoped>
	.detail-goback{
		width: 80px;
		height: 80px;
		background-color: rgb(100,100,100,.7);
		font-size: 50px;
		line-height: 80px;
		text-align: center;
		position: absolute;
		left: 50px;
		top: 50px;
		border-radius: 50%;
		z-index: 999;
		color: white;
	}
	.detail-scroll{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 100px;
		top: 0;
	}
	.detail-title-ImgBox{
		width: 750px;
		height: 750px; 
	}
	.detail-title-Img{ 
		width: 100%;
		height: 100%;
	}
	.detail-foods-des{
		margin: 30px 36px;
		position: relative;
	}
	.detail-foods-name{
		font-size: 32px;
		font-weight: 700;
		color: rgb(27, 35, 44);
		margin-bottom: 26px;
		line-height: 26px;
	}
	.detail-foods-sale{
		font-size: 24px;
		line-height: 20px;
		color: rgb(179, 183, 187);
		margin-bottom: 28px;
	}
	.detail-foods-sale-count{
		margin-right: 24px;
	}
	.detail-foods-price{
		font-size: 28px;
		line-height: 40px;
		color: rgb(240, 20, 20);
		font-weight: 700;
	}
	.detail-join-cart{
		width: 148px;
		height: 48px;
		font-size: 20px;
		line-height: 48px;
		text-align: center;
		color: white;
		background-color: rgb(0, 160, 220);
		position: absolute;
		right: 0;
		bottom: 0;
		border-radius: 30px;
		padding: 10px 18px ;
	}
	.detail-content{
		border-top: 32px solid rgb(243, 245, 247);
		border-bottom: 32px solid rgb(243, 245, 247);
		padding: 36px;
	}
	.detail-content-title{
		font-size: 28px;
		line-height: 30px;
		color: rgb(14, 24, 33);
		margin-bottom: 12px;
		font-weight: 700;
	}
	.detail-content-text{
		font-size: 24px;
		line-height: 40px;
		color: rgb(128, 133, 139);
		margin-left: 10px;
	}
	.detail-user-rate{
		margin: 36px;
	}
	.detail-rate-title{
		font-size: 28px;
		color: rgb(27, 36, 45);
		font-weight: 700;
	}
	.detail-rate-title-nav{
		margin-top: 20px;
	}
	.detail-rate-title-item{
		border-bottom: 2px solid rgb(238, 238, 239);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 32px 0;
	}
	.detail-rate-msg{
		display: flex;
		align-items: center;
	}
	.detail-rate-msg-text{
		flex:1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24px;
		color: rgb(162, 167, 172);
	}
	.detail-rate-msg-imgBox{
		width: 24px;
		height: 24px;
		margin-left: 10px;
	}
	.detail-rate-msg-img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.detail-user-rate-content{
		margin-top: 16px;
		font-size: 28px;
		line-height: 28px;
		color: rgb(67, 73, 80);
	}
</style>