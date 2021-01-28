<template>
  <div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<main-bottom></main-bottom>
  </div>
</template>

<script>
	import MainBottom from 'views/business/components/mainBottom/MainBottom.vue'
	export default{
		name:'App',
		components:{
			MainBottom
		}
	}
</script>

<style scoped="scoped" >
	@import url("assets/styles/base.css");
</style>
