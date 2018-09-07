<template>
	<section class="login">
		<mt-header title="登录匠人">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="login-from">
			<div class="login-from-phone borBottom">
				<span>手机名</span>
				<input type="text" placeholder="请输入手机号" v-model="dataPhone" maxlength="13">
			</div>
			<div class="login-from-phone borBottom">
				<span>密码</span>
				<input type="password" placeholder="请输入6-12位密码" v-model="password" maxlength="13">
			</div>
			<div class="login-from-btn">
				<a href="javascript:void(0)" @click="login">登录</a>
			</div>
			<div class="login-from-router">
				<router-link to="/register" class="register">注册账号</router-link>
				<router-link to="/forget" class="forget">忘记密码</router-link>
			</div>
		</div>
		<div class="login-xieyi">
			<p>登录代表你已同意《匠人到家用户协议》</p>
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
				dataPhone:"",
				password:"",
			}
		},
		methods :{
			backClick (){
				this.$router.go(-1);
			},
			login () {
				let vm = this;
				let res = vm.dataPhone.replace(/\s*/g,"");
				let params = Qs.stringify({
					phone:res,
					psw:vm.password,
				})
				this.$http({
				  method: 'post',
				  url: '/lib/login_user.php',
				  data: params,
				  xhrFields: {
           			withCredentials: true
       			  },
				}).then(res => {
				    // 成功回调
				    console.log(res)
				    let vm = this;
				    if(res.data.success == -2){
						let instance = Toast({
						  message: '密码错误',
						  position: 'bottom',
						  duration: 5000
						});
						setTimeout(() => {
						  instance.close();
						}, 1500);
					}else if(res.data.success == -1){
						let instance = Toast({
						  message: '用户不存在',
						  position: 'bottom',
						  duration: 5000
						});
						setTimeout(() => {
						  instance.close();
						}, 1500);
					}else if(res.data.success == 1){
						let instance = Toast({
						  message: '登录成功',
						  position: 'bottom',
						  duration: 5000
						});
						setTimeout(() => {
						  instance.close();
						  let key = JSON.stringify(res.data.data);
						  let returnUrl = vm.$route.query.Rurl;
						  localStorage.setItem('userInfo',key);

						  vm.$router.push({ path: returnUrl });
						}, 1500);
					}
				}, res => {
				    // 错误回调
				});
			}
		},
		mounted(){
			
		},
		components:{
			Header
		},
		watch: {
  			// 通过watch来设置空格
  			dataPhone(newValue, oldValue) {
  				if (newValue.length > oldValue.length) { // 文本框中输入
   					if (newValue.length === 3 || newValue.length === 8) {
   						this.dataPhone += ' ';
   					}
  				} else { // 文本框中删除
   					if (newValue.length === 9 || newValue.length === 4) {
   						this.dataPhone = this.dataPhone.trim();
   					}
  				}
  			}
 		}
	}
</script>
<style scoped>
	.login-from {
		padding: .8rem .5rem;
	}
	.login-from .borBottom {
		padding-bottom: .2rem;
		padding-top: .4rem;
		border-bottom: .01rem solid #f8f8f8;
		font-size: 14px;
	}
	.login-from .borBottom input {
		border: 0px;
		outline:none;
		cursor: pointer;
	}
	.login-from-text span {
		float: right;
		color: #999;
	}
	.login-from-phone span {
		width: 1rem;
		display: inline-block;
	}
	.login-from-psw span {
		float: right;
		color: #999;
	}
	.login-from-btn a {
		width: 100%;
		height: .8rem;
		display: block;
		text-align: center;
		line-height: .8rem;
		color: #fff;
		border-radius: .1rem;
		background: #d43c33;
		font-size: 16px;
		margin-top: .5rem;
	}
	.login-from-router {
		padding-top: .3rem;
	}
	.login-from-router a {
		color: #999;
		font-size: 14px;
	}
	.login-from-router a:last-child {
		float: right;
	}
	.login-xieyi {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		position: absolute;
		bottom: 0;
		text-align: center;
	}
	.login-xieyi p {
		text-align: center;
	}
	
</style>