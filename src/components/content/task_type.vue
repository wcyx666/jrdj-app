<template>
	<section class="task_type">
		<mt-header title="维修选项">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="task_type_list">
			<ul>
				<li v-for="itmes in repair">
					<router-link :to="{ name:'taskDetails',query:{title:itmes.name}}">
						<div class="left_img">
							<img :src="itmes.img" alt="">
						</div>
						<div class="right_content">
							<h2>{{ itmes.name }}</h2>
							<p>{{ itmes.content }}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
	import { Header,Toast } from 'mint-ui';
	export default {
		data(){
			return {
				repair:[
					{
						
						name:"电器",
						content:"空调、电视、壁挂炉、油烟机、冰箱、微波炉、电磁炉'、洗衣机…",
						img:require('../../assets/task/icons_dianqi.png')
					},
					{
						name:"家具",
						content:'床、柜子、桌椅、晒衣杆、窗帘杆、茶几、橱柜…',
						img:require('../../assets/task/icons_jiaju.png')
					},
					{
						name:"电路、开关、灯具",
						content:'插座、灯具、电路、开关、电表…',
						img:require('../../assets/task/icons_dengju.png')
					},
					{
						name:"水暖",
						content:'暖气、水龙头及阀门、地漏、排风筒、总水表、燃气表、太阳能、卫浴、马桶、上下水管、洗手池…',
						img:require('../../assets/task/icons_shuinuan.png')
					}
				]	
			}
		},
		methods:{
			backClick (){
				this.$router.go(-1);
			},
		},
		mounted(){
			console.log(this.repair)
		},
		compontents:{
			Header
		}
	}
</script>
<style scoped>
	.task_type_list {
		padding: 0 .3rem;
	}
	.task_type_list ul li {
		border-bottom: .01rem solid #f8f8f8;
		padding-bottom: .3rem;
		padding-top: .3rem;
	}
	.task_type_list ul li a {
		display: block;
		display: box;
		display: -webkit-box;
		display: -moz-box;
	}
	.left_img {
		border:.01rem solid #f8f8f8;
		width: 1.5rem;
		height: 1.5rem;
		padding: .1rem;
		
	}
	.left_img img {
		width: 100%;
		height: 100%;
	}
	.right_content {
		box-flex:1;
		-webkit-box-flex:1;
		margin-left: .2rem;
	}
	.right_content h2 {
		font-size: 16px;
		color: #333;
		margin-top: .1rem;
	}
	.right_content p {
		font-size: 14px;
		color: #999;
	}
</style>