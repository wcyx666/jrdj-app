<template>
	<section class="login">
		<mt-header title="注册匠人">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="login-from">
			<div class="login-from-text borBottom">
				<p>手机号归属地<span>中国</span></p>
			</div>
			<div class="login-from-phone borBottom">
				<span>手机名</span>
				<input type="text" placeholder="请输入手机号" v-model="dataPhone" maxlength="13">
			</div>
			<div class="login-from-psw borBottom">
				<span class="name">验证码</span>
				<input type="text" placeholder="请输入验证码" v-model="dataYzm">
				<span @click="getYzm" class="yzm" :class="{'reg-codetxt-no':isCalss}">{{ codetxt }}</span>
			</div>
			<div class="login-from-phone borBottom">
				<span>密码</span>
				<input type="password" placeholder="密码由6-12位数字字母" v-model="password" maxlength="13">
			</div>
			
			<div class="login-from-btn">
				<a href="javascript:void(0)" @click="login">注册</a>
			</div>
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
				isCalss:false,
				dataPhone:"", // 手机号
				dataYzm:"", //验证码
				password:"", // 密码
				codetxt:"获取验证码",// 验证码文本
			}
		},
		methods :{
			backClick (){
				this.$router.go(-1);
			},
			getYzm(){
				let vm = this;
				let res = vm.dataPhone.replace(/\s*/g,"");
				if( vm.mobile == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(res)) ){
					let instance = Toast({
					  message: '手机号码不正确',
					  position: 'bottom',
					  duration: 5000
					});
					setTimeout(() => {
					  instance.close();
					}, 1500);
				}else {
					let params = Qs.stringify({
						yzmtel:res
					})
					this.$http({
					  method: 'post',
					  url: '/smsyzm.php',
					  data: params,
					  dataType : 'json',
					  xhrFields: {
	           			withCredentials: true
	       			  },
					}).then(res => {
						console.log(res)
						if( res.data.code == '000000' ){
							vm.timer();
						}
					}, res => {
					    // 错误回调
					});
				}
			},
			login(){
				let vm = this;
				let phone = vm.dataPhone.replace(/\s*/g,"");
				if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
					let instance = Toast({
					  message: '手机号码不正确',
					  position: 'bottom',
					  duration: 5000
					});
					setTimeout(() => {
					  instance.close();
					}, 1500);
				}else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(vm.password))){
					let instance = Toast({
					  message: '密码格式不正确',
					  position: 'bottom',
					  duration: 5000
					});
					setTimeout(() => {
					  instance.close();
					}, 1500);
				}else{
					let params = Qs.stringify({
						phone:phone,
						psw:vm.password,
						dataYzm:vm.dataYzm
					})
					this.$http({
					  method: 'post',
					  url: '/lib/register_user.php',
					  data: params,
					  xhrFields: {
	           			withCredentials: true
	       			  },
					}).then(res => {
					    if(res.data.success == 1){
					    	let params = Qs.stringify({
								phone:phone,
							})
							this.$http({
							  method: 'post',
							  url: '/lib/coupon/add_coupon.php',
							  data: params,
							  xhrFields: {
			           			withCredentials: true
			       			  },
							}).then(res => {
								let instance = Toast({
								  message: '注册成功',
								  position: 'bottom',
								  duration: 5000
								});
								setTimeout(() => {
								  instance.close();
								  vm.$router.push({ path: '/login' });
								}, 1500);
							})
					    	
					    }else if(res.data.success == 2){
					    	let instance = Toast({
							  message: '系统错误，请稍后注册',
							  position: 'bottom',
							  duration: 5000
							});
							setTimeout(() => {
							  instance.close();
							}, 1500);
					    }else if(res.data.success == -1){
					    	let instance = Toast({
							  message: '手机号码已经注册',
							  position: 'bottom',
							  duration: 5000
							});
							setTimeout(() => {
							  instance.close();
							}, 1500);
					    }else if(res.data.success == -2){
					    	let instance = Toast({
							  message: '验证码不正确',
							  position: 'bottom',
							  duration: 5000
							});
							setTimeout(() => {
							  instance.close();
							}, 1500);
					    }
					}, res => {
					    // 错误回调
					});
				}	
			},
			timer () {	// 定时器	
				let sec = 60;
				let vm = this; 
			    for(let  i=0; i<=60; i++){
					setTimeout(function(){
						if (sec != 0) {
							sec--;
							vm.isCalss = true;
							vm.codetxt = sec + "秒重新发送" ;
						} else {
							sec = 60;//如果倒计时结束就让  获取验证码显示出来
							vm.isCalss = false;
							vm.codetxt = '获取验证码';
						}
					}, i * 1000)
			    }			
			},
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
		display: inline-block;
		width: 1rem;
	}
	.login-from-psw span.name {
		width: 1rem;
		display: inline-block;
	}
	.login-from-psw span.yzm {
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
	.reg-codetxt-no {
		color: red !important;
	}
</style>