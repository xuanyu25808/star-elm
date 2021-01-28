<template>
	<div class="top-header" v-if="Object.keys(sellerData).length !== 0">
		<div class="top-header-msg">
			<div class="top-header-msg-imgBox">
				<img class="top-header-msg-img" :src="sellerData.avatar" alt="">
			</div>
			<div class="top-header-msg-content">
				<div class="top-header-title">
					<span class="top-header-brand">品牌</span>
					<p class="top-header-title-name">{{sellerData.name}}</p>
				</div>
				<p class="top-header-transport">
					{{sellerData.description}}/{{sellerData.deliveryTime}}送达
				</p>
				<div class="top-header-discount">
					<p><span class="top-header-discount-name">减</span>{{sellerData.supports[0].description}}</p>
				</div>
				<span class="top-header-right">{{sellerData.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
			</div>
		</div>
		<p class="top-header-notice">
			<span class="top-header-notice-name" >公告</span>
			<span class="top-header-notice-des">{{sellerData.bulletin}}</span>
			<span class="top-header-notice-right"><i class="icon-keyboard_arrow_right"></i></span>
		</p>
	</div>
</template>

<script>
	export default {
		name:'TopHeader',
		props:{
			sellerData:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.top-header{
		width: 100%;
		height: 268px;
	}
	.top-header-msg{
		height: 212px;
		background-color: rgb(97, 103, 109);
		display: flex;
		align-items: center;
		position: relative;
	}
	.top-header-msg-imgBox{
		width: 128px;
		height: 128px;
		margin-left: 48px;
		margin-right: 32px;
	}
	.top-header-msg-img{
		width: 100%;
		height: 100%;
	}
	.top-header-msg-content{
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
	}
	.top-header-title{
		font-size: 24px;
		display: flex;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.top-header-brand{
		background-color: red;
		color: #fff;
		padding: 4px;
		margin-right: 12px;
	}
	.top-header-title-name{
		font-size: 23px;
		line-height: 36px;
		font-weight: bold;
		color: #fff;
	}
	.top-header-transport{
		font-size: 24px;
		line-height: 24px;
		color: #fff;
		margin-bottom: 20px;
	}
	.top-header-discount{
		font-size: 20px;
		line-height: 24px;
		color: #fff;
		display: flex;
		justify-content: space-between
	}
	.top-header-discount-name{
		color: red;
		padding: 4px;
		background-color: #fff;
		margin-right: 10px;
	}
	.top-header-right{
		font-size: 20px;
		line-height: 24px;
		margin-right: 24px;
		background-color: rgba(0,0,0,.2);
		padding: 14px 18px;
		position: absolute;
		right: 14px;
		bottom: 40px;
		border-radius: 20px;
		color: #fff;
	}
	.top-header-right .icon-keyboard_arrow_right{
		font-size: 20px;
		padding-left: 4px;
		position: relative;
		top: 2px;
	}
	.top-header-notice{
		height: 56px;
		background-color: rgb(79, 85, 91);
		font-size: 20px;
		color: #fff;
		line-height: 60px;
		display: flex;
		align-items: center;
	}
	.top-header-notice-des{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}
	.top-header-notice-name{
		font-weight: bold;
		padding: 4px 6px;
		color: black;
		background-color: #fff;
		margin-left: 24px;
		margin-right: 8px;
		height: 25px;
		line-height: 25px;
	}
	.top-header-notice-right{
		margin-left: 8px;
		margin-right: 20px;
	}
</style>