<template>
	<div class="tab-control">
		<ul class="tab-control-nav">
			<li class="tab-control-item"  v-for="(item,index) in titleList" @click="itemClick(index)" :key="index">
				<span :class="{active:currentIndex===index}" >{{item}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		data() {
			return {
				titleList: ['商品', '评价', '商家'],
				currentIndex: 0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				switch(index){
					case 0 : this.$router.replace('/business/mainshop');break;
					case 1 : this.$router.replace('/business/rate');break;
					case 2 : this.$router.replace('/business/sell');break;
				}
			}
		},
		mounted() {
			this.itemClick(0)
		}
	}
</script>

<style scoped>
	.tab-control {
		height: 80px;
		line-height: 28px;
		font-size: 20px;
		background-color: #fff;
		font-weight: bold;
	}

	.tab-control-nav {
		display: flex;
	}

	.tab-control-item {
		flex: 1;
		text-align: center;
		line-height: 80px;
	}

	.active {
		padding: 6px 10px;
		color: rgb(240, 20, 20);
		border-bottom: 6px solid red;
	}
</style>
