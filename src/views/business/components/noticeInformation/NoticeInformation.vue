<template>
	<div class="notice-information">
		<div class="notice-information-content">
			<h3 class="notice-information-title">{{sellerData.name}}</h3>
			<star class="notice-information-star"/>
			<h4 class="notice-information-discount">优惠信息</h4>
			<ul class="notice-information-nav">	
				<li class="notice-information-item" v-for="item in sellerData.supports">
					<span class="noticeInformationItemIcon" :class="'noticeInformationItemIcon'+item.type">减</span>{{item.description}}
				</li>
			</ul>
			<h4 class="notice-information-discount">商家公告</h4>
			<p class="notice-information-text">{{sellerData.bulletin}}</p>
		</div>
		<div @click="handleClose" class="notice-information-close">×</div>
	</div>
</template>

<script>
	import Star from 'components/star/Star.vue'
	export default {
		name: 'NoticeInformation',
		props:{
			sellerData:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		components: {
			Star
		},
		methods:{
			handleClose(){
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.notice-information{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgb(24, 32, 40);
	    padding:1px;
	    box-sizing:border-box;
	    z-index:9999;
			opacity: 0.8;
	}
	.notice-information:after{
	    content: "";
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    position: absolute;
	    background: inherit;
	    filter: blur(2px);
	    z-index: 10000;
	}
	.notice-information-content{
	    position: absolute;
			left: 72px;
			right: 72px;
			top: 128px;
			bottom: 84px;
	    z-index:99999;
	}
	.notice-information-title{
		font-size: 32px;
		line-height: 32px;
		color: rgb(255,255,255);
		text-align: center;
		margin-bottom: 32px;
	}
	.notice-information-star{
		text-align: center;
	}
	.notice-information-discount{
		font-size: 26px;
		color: white;
		text-align: center;
		position: relative;
	}
	.notice-information-discount::after{
		content: '';
		display: block;
		width: 224px;
		height: 4px;
		background-color: rgb(79, 86, 93);
		position: absolute;
		left: 10px;
		top: 9px;
	}
	.notice-information-discount::before{
		content: '';
		display: block;
		width: 224px;
		height: 4px;
		background-color: rgb(79, 86, 93);
		position: absolute;
		right: 10px;
		top: 9px;
	}
	.notice-information-nav{
		margin-top: 30px;	
		margin-bottom: 40px;
	}
	.notice-information-item{
		font-size: 24px;
		line-height: 32px;
		color: white;
		margin-bottom: 54px;
		display: flex;
		align-items: center;
	}
	.noticeInformationItemIcon{
		width: 32px;
		height: 32px;
		background-color: white;
		display: inline-block;
		margin-right: 22px;
		line-height: 32px;
		text-align: center;
		color: black;
		font-weight: bold;
	}
	.noticeInformationItemIcon0{
		color: rgb(248, 157, 157);
	}
	.noticeInformationItemIcon1{
		color: rgb(51, 163, 211);
	}
	.noticeInformationItemIcon2{
		color: rgb(51, 163, 211);
	}
	.noticeInformationItemIcon3{
		color: rgb(78, 202, 119);
	}
	.noticeInformationItemIcon4{
		color: rgb(78, 202, 119);
	}
	.notice-information-text{
		margin: 48px 24px;
		font-size: 24px;
		font-weight: 200;
		color: white;
		line-height: 58px;
	}
	.notice-information-close{
		position: absolute;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		bottom: 82px;
		font-size: 100px;
		left: 50%;
		bottom: 70px;
		transform: translate(-50%);
		z-index: 100000000;
		color: rgb(149, 153, 157);
		padding: 50px;
	}
</style>
