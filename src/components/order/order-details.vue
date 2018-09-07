<template>
	<section class="order_details">
		<mt-header title="订单详情">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		
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
				type:this.$route.query.type,
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
			}	
		},
		mounted(){
			
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
	
</style>