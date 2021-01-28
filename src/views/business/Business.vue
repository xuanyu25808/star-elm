<template>
	<div class="business-layout">
		<top-header :seller-data="sellerData" @click.native="isShowNotice = !isShowNotice" />
		<notice-information @close="isShowNotice=false" v-show="isShowNotice" :sellerData="sellerData" />
		<tab-control />
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import {
		getSellerDate,
	} from 'network/pageData.js'
	import TopHeader from './components/topheader/TopHeader.vue'
	import NoticeInformation from './components/noticeInformation/NoticeInformation.vue'
	import TabControl from './components/tabControl/TabControl.vue'

	export default {
		name: 'Business',
		components: {
			TopHeader,
			NoticeInformation,
			TabControl,
		},
		data() {
			return {
				sellerData: {},
				isShowNotice: false
			}
		},
		created() {
			//获取商家信息
			getSellerDate().then(res => {
				this.sellerData = res.data.seller
			})
		},
	}
</script>

<style scoped>
</style>
