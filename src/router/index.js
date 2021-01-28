import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Business = () => import('views/business/Business.vue')
const MainShop = () => import('views/business/components/shop/MainShop')
const Rate = () => import('views/business/components/rate/Rate')
const Sell = () => import('views/business/components/sell/Sell')

const Detail = () => import('views/business/components/detail/Detail.vue')

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path:'',
		redirect:'/business'
	},
	{
		path:'/business',
		name:'Business',
		component:Business,
		children:[
			{
				path:'mainshop',
				name:'MainShop',
				component:MainShop
			},
			{
				path:'rate',
				name:'Rate',
				component:Rate
			},
			{
				path:'sell',
				name:'Sell',
				component:Sell
			},
		]
	},
  {
    path: '/detail',
    name: 'Detail',
		component:Detail
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
