<template>
	<section class="my">
		<mt-header title="我的">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="my_content">
			<div class="my_box">
				<div class="my_box_tx">
					<img :src="icon" alt="">
				</div>
				<div class="my_box_info">
					<p class="name">{{ name }}</p>
					<p class='phone'>{{ phone }}</p>	
				</div>
			</div>
		</div>
		<div class="my_order_all">
			<ul>
				<li>
					<router-link :to="{ path:'/order',query:{ type:0 } }">
						<img src="../../assets/my/icon_confirm.png" alt="">
						<p>待确认</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{ path:'/order',query:{ type:1 } }">
						<img src="../../assets/my/icon_pay.png" alt="">
						<p>待付款</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{ path:'/order',query:{ type:2 } }">
						<img src="../../assets/my/icon_repair.png" alt="">
						<p>维修中</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{ path:'/order',query:{ type:3 } }">
						<img src="../../assets/my/icon_conplete.png" alt="">
						<p>已完成</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{ path:'/order',query:{ type:4 } }">
						<img src="../../assets/my/icon_cancel.png" alt="">
						<p>已取消</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="my_list">
			<ul>
				<li>
					<router-link to="/wallet">我的优惠券</router-link>
				</li>
				<li>
					<router-link to="/info">我的资料</router-link>
				</li>
				<li>
					<router-link to="/info">联系客服</router-link>
				</li>
			</ul>
		</div>
		<div class=""></div>
	</section>
</template>
<script>
	import { Header } from 'mint-ui';
	import Qs from 'qs'
	export default {
		name:"my",
		data(){
			return {
				uid:"",
				title:"",
				icon:'',
				name:"",
				phone:"",
			}
		},
		methods :{
			backClick (){
				this.$router.go(-1);
			},
			// 获取默认信息
			selectInfo(){
		      let vm = this;
		      let params = Qs.stringify({
		        uid:vm.uid,
		      })
		      vm.$http({
		        method: 'post',
		        url: '/lib/user_info.php',
		        data: params,
		        xhrFields: {
		          withCredentials: true
		        },
		      }).then(res =>{
		        let url = 'http://127.0.0.1/lib/';
		        let data = res.data.data;
		        vm.name = data.name,
		        vm.phone = data.phone,
		        vm.icon = url+data.icon
		      }, res => {
		      // 错误回调
		      })
		    },
		},
		mounted(){
			let userInfo = JSON.parse(localStorage.getItem('userInfo'));
			this.uid = userInfo.uid;
			this.selectInfo();
		},
		components:{
			Header
		},
		
	}
</script>
<style scoped>
	.my {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: absolute;
	}
	.my_content {

	}
	.my_box {
		width: 100%;
		overflow: hidden;
		background: #fff;
		padding: .3rem;
		border-bottom: .01rem solid #ededed;
	}
	.my_box_tx {
		width: 1.5rem;
		height: 1.5rem;
		float: left;
		border-radius: 1.5rem;
		border: .01rem solid #ededed;
		overflow: hidden;
	}
	.my_box_tx img {
		width: 100%;
		height: 100%;
	}
	.my_box_info {
		float: left;
		font-size: 16px;
		margin-top: .25rem;
		margin-left: .25rem;
	}
	.my_box_info .name {
		font-weight: bold;
		color: #333;
	}
	.my_box_info .phone {
		color: #999;
		font-size: 12px;
	}
	.my_order_all {
		margin-top: .2rem;
		background: #fff;
		padding: .3rem 0;
	}

	.my_order_all ul li {
		float: left;
		text-align: center;
		width: 20%;
	}
	.my_order_all ul li img {
		width: .5rem;
		height: .5rem;
	}
	.my_order_all ul li p {
		color: #999;
		font-size: 14px;
	}
	.my_list {
		padding: 0 .3rem;
		background: #fff;
		margin-top: .2rem;
	}
	.my_list ul li {
		padding: .3rem 0;
		border-bottom: .01rem solid #f8f8f8;
	}
	.my_list ul li a {
		font-size: 14px;
		color: #333;
	}
</style>