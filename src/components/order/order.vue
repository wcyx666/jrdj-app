<template>
	<section class="order">
		<mt-header title="我的订单">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="order_tab">
			<ul>
				<li v-for="(item,index) in tabar" @click="typeClick(item.type)" :class="{ arctive:item.type == type}">
					{{ item.title }}
				</li>
			</ul>
		</div>
		<div class="order_list" v-if="data.length > 1">
			<ul>
				<li v-for="item in data">
					<router-link :to="{ path:'/order/details',query:{ orderId:item.orderId} }">
						<h2>
							{{ item.goods }}
							<span v-if="item.Identification == 0">待确认</span>
							<span v-if="item.Identification == 1">待支付</span>
							<span v-if="item.Identification == 2">维修中</span>
							<span v-if="item.Identification == 3">已完成</span>
							<span v-if="item.Identification == 4">已取消</span>
						</h2>
						<p class="local">{{ item.local }}{{ item.num }}</p>
						<p>{{ item.dates }}</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="order_null_data" v-else>
			<img src="../../assets/my/null_data.png" alt="">
			<p>您还没有相关订单哦~</p>
		</div>
	</section>
</template>
<script>
	import Qs from 'qs'
	import { Header,Toast } from 'mint-ui';
	export default {
		name:"login",
		data(){
			return {
				uid:"",
				title:"",
				type:this.$route.query.type,
				data:"",
				tabar:[
					{ title:"待确认",type:0 },
					{ title:"待支付",type:1 },
					{ title:"维修中",type:2 },
					{ title:"已完成",type:3 },
					{ title:"已取消",type:4 }
				]
			}
		},
		methods :{
			backClick (){
				this.$router.go(-1);
			},
			typeClick(type){
				this.type = type;
				this.init(type);
			},
			// 获取默认订单
			init(type){
				let vm = this;
				let params = Qs.stringify({
					uid:vm.uid,
					type:vm.type
				})
				vm.$http({
					method: 'post',
					url: '/lib/read_order.php',
					data: params,
					xhrFields: {
						withCredentials: true
					},
				}).then(res =>{
					console.log(res);
					vm.data = res.data.data;
				}, res => {
					// 错误回调
				})
			},	
		},
		mounted(){
			let key = JSON.parse(localStorage.getItem('userInfo'));
    		this.uid = key.uid;
		  	this.init(this.type);
		},
		components:{
			Header
		}
	}
</script>
<style scoped>
	.order {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: absolute;
	}
	.order_tab {
		background: #fff;
	}
	.order_tab ul li {
		float: left;
		width: 20%;
		text-align: center;
		font-size: 14px;
		color: #333;
		padding: .2rem 0;
	}
	.order_list {
		padding: 0 .3rem;
		background: #fff;
		margin-top: .2rem;
	}
	.order_list ul li {
		font-size: 14px;
		border-bottom: .01rem solid #ededed;
		padding: .4rem 0;
	}
	.order_list ul li h2 {
		font-weight: bold;
		color: #333;
	}
	.order_list ul li h2 span {
		float: right;
		color: #d43c33;
	}
	.order_list ul li p {
		color: #999;
	}
	.order_list ul li p.local {
		padding: .1rem 0;
	}
	.order_list ul li:last-child {
		border-bottom: none;
	}
	.order_null_data {
		text-align: center;
		margin-top: 2rem;
	}
	.order_null_data p {
		font-size: 14px;
		color: #999;
		padding-top: .3rem;
	}
	.arctive {
		color: #d43c33 !important;
		border-bottom: .01rem solid #d43c33;
	}
</style>