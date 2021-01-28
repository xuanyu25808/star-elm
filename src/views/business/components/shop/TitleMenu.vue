<template>
		<scroll class="title-menu" ref="titleMenuScroll">
			<ul class="title-menu-nav">
				<li :class="{active:currentIndex===index}" class="title-menu-item"  @click="itemClick(index)" v-for="(item,index) in goodsData">
					<span :class="{active:currentIndex===index}" class="title-menu-item-name ">{{item.name}}</span>
				</li>
			</ul>
		</scroll>
</template>

<script>
	import scroll from 'components/scroll/Scroll.vue'
	export default {
		name:'TitleMenu',
		data(){
			return{
				currentIndex:0
			}
		},
		props:{
			goodsData:{
				type:Array,
				default(){
					return {}
				}
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				this.$emit('getTitleIndex',index)
			},
			change(){
				this.$nextTick(()=>{
					this.$refs.titleMenuScroll.refresh()
				})
			}
		},
		components:{
			scroll
		},
		watch:{
			goodsData:'change'
		},
	}
</script>

<style scoped>
	.title-menu{
		position: absolute;
		top: 348px;
		left: 0;
		bottom: 100px;
		width: 160px;
		overflow: hidden;
	}
	.title-menu-nav{
		width: 100%;
		height: 100%;
		font-size: 24px;
		background-color: rgb(243, 245, 247);
	}
	.title-menu-item{
		height: 108px;
		color: rgb(7,17,27,.7);
		padding:0 24px;
		display: flex;
		align-items: center;
		border-bottom: 2px solid rgb(7,17,27,.1);
	}
	.active{
		background-color: #fff;
		font-weight: bold;
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		position: relative;
		top: -2px;
	}
</style>