<template>
	<section class="head">
		<mt-header :title="title">
			<mt-button icon="more" slot="right" @click.native="backClick"></mt-button>
		</mt-header>
		<!-- <div class="head-link">
			      <ul>
			        <li>
			           <router-link to="/home">新任务</router-link>
			        </li>
			        <li>
			          <router-link to="/confirm">待确认</router-link>
			        </li>
			        <li>
			          <router-link to="/repair">已确认</router-link>
			        </li>
			      </ul>
			    </div> -->
	</section>
</template>
<script>
	import { Header } from 'mint-ui';
	export default {
		props: {
			title:String
		},
		name: 'head',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}	
		},
		components:{
			Header
		}
}
</script>
<style scoped>
	.mint-header {
		background: #d43c33;
	}
	.head-box {
		width: 100%;
		height: 1rem;
		background: #d43c33;
		color: #fff;
		text-align: center;
		line-height: 1rem;
		font-size: 16px;
	}
	.head-link {
		overflow: hidden;
		background: #d43c33;
	}
	.head-link ul li {
		float: left;
		width: 33.3%;
		line-height: .8rem;
		text-align: center;
		font-size: 14px;
	}
	.head-link ul li a {
		color: #fff;
		padding: 0 .2rem;
		line-height: .8rem;
		display: inline-block;
	}
	.router-link-active {
		font-weight: bold;
		border-bottom: .05rem solid #fff;
	}
</style>