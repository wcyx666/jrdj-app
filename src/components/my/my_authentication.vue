<template>
  <div class="authentication">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
    </mt-header>
    <div class="authentication-content">
    	<div class="positive">
			<img src="../../assets/shenfenzheng_2.png" alt="">
			<p>拍身份证头像面照片</p>
		</div>
		<div class="positive">
			<img src="../../assets/shenfenzheng_1.png" alt="">
			<p>拍手持身份证头像面照片</p>
		</div>
		<div class="authentication-info">
			<div class="authentication-info-name buttom">
				<span>姓名</span>
				<input type="text" placeholder="请输入真实姓名">
			</div>
			<div class="authentication-info-name">
				<span>身份证号</span>
				<input type="text" placeholder="请输入真实身份证号">
			</div>
		</div>
		<div class="authentication-tips">
			请确认个人信息，已免审核不通过
		</div>
		<div class="authentication-btn">
			<a href="javascripr:void(0)">提交</a>
		</div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'authentication',
  data () {
    return {
      title: '实名认证'
    }
  },
  methods :{
    backClick (){
      this.$router.go(-1);
    }
  },
  mounted(){

  },
  components:{
    Header
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-header {
    background: #d43c33;
  }
  .authentication {
  	width: 100%;
  	height: 100%;
  	background: #f5f5f5;
  }
  .authentication-content .positive {
  	width: 100%;
  	background: #fff;
  	padding: .3rem;
  	margin-top: .2rem;
  }
  .authentication-content .positive img {
  	width: 100%;
  }
  .authentication-content .positive p {
  	font-size: 14px;
  	color: #333;
  	text-align: center;
  	padding-top: .3rem;
  }
  .authentication-info {
  	background: #fff;
  	margin-top: .2rem;
  }
  .authentication-info-name {
  	padding: .25rem .3rem;
  	font-size:14px; 
  }
  .authentication-info-name span {
  	width: 1.5rem;
  	display: inline-block;
  }
  .authentication-info-name input {
  	outline: none;
  	border:0;
  }
  .buttom {
  	border-bottom: .01rem solid #f8f8f8;
  }
  .authentication-tips {
  	font-size: 14px;
  	color: #999;
  	padding: .3rem;
  }
  .authentication-btn {
  	padding: .3rem;
  }
  .authentication-btn a {
  	display: block;
  	text-align: center;
  	line-height: .8rem;
  	width: 100%;
  	height: .8rem;
  	color: #fff;
  	font-size: 14px;
  	background: #d43c33;
  	border-radius: .1rem;
  }
</style>
