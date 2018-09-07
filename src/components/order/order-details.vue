<template>
	<section class="order_details">
		<mt-header title="订单详情">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="order_details_content">
			<div class="order_details_top">
				<h2>
					{{ data.goods }}
					<span v-if="data.Identification == 0">待确认</span>
					<span v-if="data.Identification == 1">待支付</span>
					<span v-if="data.Identification == 2">维修中</span>
					<span v-if="data.Identification == 3">已完成</span>
					<span v-if="data.Identification == 4">已取消</span>
				</h2>
				<p>[{{ data.problem }}]</p>
			</div>
			<div class="order_details_info">
				<div class="order_details_info_1">
					<p>维修订单：{{ data.orderId }}</p>
					<p>报修时间：{{ data.dates }}</p>
					<p>房屋地址：{{ data.orderId }}</p>
					<p>维修订单：{{ data.local }}{{ data.num }}</p>
					<p>上门联系人：{{ data.name }}（{{ data.phone }}）</p>
				</div>
				<div class="order_details_info_2" v-if="data.Identification == 1 || data.Identification == 2">
					<p>维修价格：{{ data.shifu_money }}元</p>
					<p>维修师傅：{{ data.shifu_name }}</p>
					<p>师傅电话：{{ data.shifu_phone }}</p>
				</div>
			</div>
		</div>
		<div class="order_details_tabs">
			<p>维修投诉请拨打电话</p>
		</div>
		<div class="order_details_btn" v-if="data.Identification == 0">
			<a href="javascript:void(0)" @click="cancel">取消订单</a>
		</div>
		<div class="order_details_btn" v-if="data.Identification == 1">	
			<a href="javascript:void(0)">付款</a>
			<a href="javascript:void(0)" @click="cancel">取消订单</a>
			<a href="javascript:void(0)" @click="callTel(data.shifu_phone)">拨打师傅电话</a>
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
				title:"",
				orderId:this.$route.query.orderId,
				data:"",
			}
		},
		methods :{
			backClick (){
				this.$router.go(-1);
			},
			init (){
				let vm = this;
				let params = Qs.stringify({
					orderId:vm.orderId
				})
				vm.$http({
					method: 'post',
					url: '/lib/read_order_details.php',
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
			cancel(){
				let vm = this;
				let params = Qs.stringify({
					orderId:vm.orderId
				})
				vm.$http({
					method: 'post',
					url: '/lib/cancel_order.php',
					data: params,
					xhrFields: {
						withCredentials: true
					},
				}).then(res =>{
					console.log(res);
				}, res => {
					// 错误回调
				})
			},
			callTel(tel){
				window.location.href="tel:"+tel;
				console.log(tel)
			}
		},
		mounted(){
			this.init();	
		},
		components:{
			Header
		}
	}
</script>
<style scoped>
	.order_details {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: absolute;
	}
	.order_details_top {
		background: #fff;
		padding: .3rem;
	}
	.order_details_top h2 {
		font-size: 14px;
		font-weight: bold;
		color: #333;
		padding-bottom: .1rem;
	}
	.order_details_top h2 span {
		float: right;
		color: #d43c33;
	}
	.order_details_top p {
		font-size: 12px;
		color: #333;
	}
	.order_details_info {
		background: #fff;
		padding: .3rem;
		margin-top: .2rem;
	}
	.order_details_info_1 {
		font-size: 12px;
		color: #333;
	}
	.order_details_info_1 p {
		padding-bottom: .2rem;
	}
	.order_details_info_2 {
		font-size: 12px;
		color: #333;
		border-top: .01rem solid #ededed;
	}
	.order_details_info_2 p {
		padding-top: .2rem;
	}
	.order_details_tabs {
		text-align: center;
		padding: .5rem 0;
		color: #999;
	}
	.order_details_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding: .3rem;
		border-top: .01rem solid #ededed;
	}
	.order_details_btn a {
		display: inline-block;
		padding: .1rem .3rem;
		border: .01rem solid #d43c33;
		color: #d43c33;
		border-radius: 1rem;
		font-size: 12px;
		float: right;
		margin-right: .2rem;	
	}
</style>