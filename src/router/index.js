import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home' // 新任务
import Confirm from '@/components/confirm' // 待确认
import Repair from '@/components/repair' // 维修中
import Login from '@/components/login/login' //登录
import Register from '@/components/login/register' //注册
import forgetPas from '@/components/login/forget_pas' //忘记密码
import myIndex from '@/components/my/my_index' //我的
import myTask from '@/components/my/my_task' //历史任务
import myWallet from '@/components/my/my_wallet' //我的钱包
import myInfo from '@/components/my/my_info' //我的钱包
import myAuthentication from '@/components/my/my_authentication' //我的钱包

//维修类型
import taskType from '@/components/content/task_type' //维修类型
import taskDetails from '@/components/content/task_details' //维修类型
import taskMap from '@/components/content/task_map' //维修类型

// 订单
import order from '@/components/order/order' //订单
import orderDetails from '@/components/order/order-details' //订单详情


Vue.use(Router)

import 'mint-ui/lib/style.css';

/*, {
		path: '/confirm',
		name: 'Confirm',
		component: Confirm
	}, {
		path: '/repair',
		name: 'Repair',
		component: Repair
	}, */
const router = new Router({
	routes: [{
		path: '/',
		redirect: '/home'
	}, {
		path: '/home',
		name: 'Home',
		component: Home
	}, {
		path: '/login',
		name: 'Login',
		component: Login
	}, {
		path: '/register',
		name: 'Register',
		component: Register
	}, {
		path: '/forget',
		name: 'forgetPas',
		component: forgetPas
	}, {
		path: '/my',
		name: 'my',
		component: myIndex,
	}, {
		path: '/wallet',
		name: 'myWallet',
		component: myWallet
	}, {
		path: '/info',
		name: 'myInfo',
		component: myInfo
	}, {
		path: '/authentication',
		name: 'myAuthentication',
		component: myAuthentication
	}, {
		path: '/task',
		name: 'taskType',
		component: taskType,
		meta: {
			auth: true
		},

	}, {
		path: '/task/details',
		name: 'taskDetails',
		component: taskDetails,
		meta: {
			auth: true
		},
	}, {
		path: '/task/details/map',
		name: 'taskMap',
		component: taskMap,
		meta: {
			auth: true
		},
	}, {
		path: '/order',
		name: 'order',
		component: order,
		meta: {
			auth: true
		},
	}, {
		path: '/order/details',
		name: 'orderDetails',
		component: orderDetails,
		meta: {
			auth: true
		},
	}]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(m => m.meta.auth)) {
		// 对路由进行验证
		if (localStorage.getItem("userInfo")) { // 已经登陆
			next() // 正常跳转到你设置好的页面
		} else {
			// 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；　　　　　　
			next({
				path: '/login',
				query: {
					Rurl: to.fullPath
				}
			})　　　　　
		}　　　　
	} else {　　　　　　
		next()　　
	}
})

export default router;